import { useCallback, useRef } from 'react';
import type { DropTarget } from '../model/actions';
import { COLUMN_GAP } from '../model/pageSize';

/**
 * 拖曳重排，用 pointer events。
 *
 * 刻意不用 HTML5 的 drag-and-drop：它在觸控裝置上完全不能用，
 * 而老師是用平板的；它還需要 dataTransfer.setData() 才會啟動，
 * 漏了就安靜地什麼都不發生。
 *
 * 落點只有兩類，因為版面沒有自由畫布：
 *  - 殘影拖到某列的左右兩側 → 跟它併成兩欄、三欄
 *  - 其餘位置               → 插在最近那一列之前或之後
 */

/**
 * 併欄區佔一列寬度的比例（每一側）。
 *
 * 判斷用的是**殘影的中心**，不是游標。曾經用游標加固定 72px 的邊緣區：
 * 握把在最左邊，往下拖的整條路徑都在左側感應區裡，常常誤併；
 * 而真的想併欄時又得把游標精準移進那 72px，很難對準。
 * 改看殘影中心之後，直直往下拖時中心在列的中間＝換位；
 * 把殘影往旁邊推過三成＝併欄——手上看到的位置就是落點。
 */
const SIDE_FRACTION = 0.3;

/** 一列最多幾欄。五欄時每欄約 140，放圖示、小圖、短字還可以；再多就什麼都擠不下。 */
export const MAX_COLUMNS = 5;
/**
 * 直排一列最多幾欄。直排的欄是上下疊的，內容區高 672：三欄每欄約 224，
 * 24px 的字還放得下八、九個；再多一欄直排字就排不下一句。
 */
export const MAX_COLUMNS_VERTICAL = 3;

/**
 * 直排併欄要「往上或往下推」過這段距離才算（頁高的比例）。
 * 直排的握把在元件頂端，一拿起來游標就在每一列的上方三成裡；只看位置的話，
 * 想左右換順序也會被當成「併在上面」。所以還要看手是不是真的往上（往下）推了。
 * 距離跟「沒有推的位置」比：握把在自己那一列的高度，換到目標那一列上（各列上緣不一定一樣高，跨頁也一樣算）。
 */
const VERTICAL_PUSH = 0.01;
/** 直排併欄：游標可以超出那一列上下緣多少（頁高的比例）——頂端那一列要往上推，推進頁邊的留白、甚至頁面外的灰底都算——範圍太窄老師推不到。 */
const VERTICAL_REACH = 0.15;
/** 直排併欄：游標在那一列左右多遠內都算（畫面 px）。標題列在直排裡只有一個字寬，要剛好對準太難 */
const VERTICAL_SLACK_PX = 24;
/** 直排併欄的「下方」：那一列下方四成。上方靠「往上推」判斷，不靠範圍（握把本來就在上面） */
const VERTICAL_BOTTOM = 0.6;

/** 超過這個距離才算拖曳，否則只是點一下握把。 */
const DRAG_THRESHOLD_PX = 4;

/** 拖曳的對象：整列，或多欄列裡的其中一欄。 */
export type DragSubject = { rowId: string; columnId?: string };

export type DragApi = {
  startDrag: (e: PointerEvent, subject: DragSubject) => void;
};

/**
 * 跟著游標的殘影。讓人知道「我正握著這一塊」。
 *
 * **跟原本一樣大**：頁面是整頁等比縮放的，複製出來的節點掛到 body 之後
 * 就脫離了那層縮放，字會變回頁座標的原尺寸——看起來像是一拿起來就變大。
 * 所以寬度用版面寬（offsetWidth，未縮放），再用同一個倍率縮回去；
 * 也不加內距，加了就又比原本大一圈。
 */
function makeGhost(source: HTMLElement): { ghost: HTMLElement; scale: number } {
  const r = source.getBoundingClientRect();
  const layoutWidth = source.offsetWidth || r.width;
  const layoutHeight = source.offsetHeight || r.height;
  const scale = r.width / layoutWidth;
  const ghost = source.cloneNode(true) as HTMLElement;
  ghost.removeAttribute('data-row-id');
  ghost.removeAttribute('data-row-index');
  ghost.querySelectorAll('[data-row-id], [data-col-id]').forEach((n) => {
    n.removeAttribute('data-row-id');
    n.removeAttribute('data-col-id');
  });
  ghost.querySelectorAll('[contenteditable]').forEach((n) => {
    (n as HTMLElement).contentEditable = 'false';
  });
  const isVert = getComputedStyle(source).writingMode.startsWith('vertical');
  Object.assign(ghost.style, {
    position: 'fixed',
    left: '0',
    top: '0',
    width: `${layoutWidth}px`,
    ...(isVert ? { height: `${layoutHeight}px` } : {}),
    margin: '0',
    pointerEvents: 'none',
    zIndex: '9999',
    opacity: '0.92',
    background: 'var(--ds-surface-raised)',
    borderRadius: '8px',
    // 外框用陰影畫，不佔尺寸
    boxShadow: '0 0 0 1.5px var(--ds-border-hover), 0 18px 40px rgba(26, 25, 23, 0.18)',
    transformOrigin: 'top left',
    // 掛到 body 之後也要保持原本的書寫方向
    writingMode: getComputedStyle(source).writingMode,
  });
  document.body.appendChild(ghost);
  return { ghost, scale };
}

/**
 * 目標那一列只有一欄、元件沒佔滿時，量它實際用掉多少，併欄時新的一欄就接在它正後面（直排是正下方）。
 * 平均分的話，一張只佔三成的圖片併進一段文字，文字會被放到後半欄，中間空一大塊。
 * 量的是畫面，因為元件實際多大要看分頁與縮放；reducer 只照這兩個數字分欄。
 */
function measureKeep(frame: HTMLElement, vertical: boolean): { keepPct?: number; fitPct?: number } {
  const cols = frame.querySelectorAll<HTMLElement>('[data-col-id]');
  if (cols.length !== 1) return {};
  const col = cols[0];
  const blocks = col.querySelectorAll<HTMLElement>('[data-block-id]');
  if (blocks.length !== 1) return {};
  const c = col.getBoundingClientRect();
  const b = blocks[0].getBoundingClientRect();
  const total = vertical ? c.height : c.width;
  // 元件要從欄的起點開始（置中、靠右的元件前面有空，不適用）
  const lead = vertical ? b.top - c.top : b.left - c.left;
  const used = vertical ? b.bottom - c.top : b.right - c.left;
  if (total <= 0 || Math.abs(lead) > 2 || used / total > 0.85) return {};
  // 併欄後兩欄之間有一道欄距，原本那一欄要扣掉它來算，元件才會一樣大
  const scale = col.offsetWidth ? c.width / col.offsetWidth : 1;
  const gap = COLUMN_GAP * scale;
  return { keepPct: (used / (total - gap)) * 100, fitPct: 100 };
}

export function useRowDrag(
  setDraggingRowId: (id: string | null) => void,
  setDropTarget: (t: DropTarget | null) => void,
  commit: (subject: DragSubject, target: DropTarget) => void
): DragApi {
  const target = useRef<DropTarget | null>(null);
  const dragging = useRef<DragSubject | null>(null);

  const startDrag = useCallback(
    (e: PointerEvent, subject: DragSubject) => {
      const handle = e.currentTarget as HTMLElement | null;
      const source = subject.columnId
        ? (e.target as HTMLElement)
            .closest<HTMLElement>('[data-row-id]')
            ?.querySelector<HTMLElement>(`[data-col-id="${subject.columnId}"]`) ?? null
        : (e.target as HTMLElement).closest<HTMLElement>('[data-row-id]');
      const startX = e.clientX;
      const startY = e.clientY;
      // 直排併欄看「往上／往下推了多少」：記下握把在自己那一列的哪個高度。
      // 拖到別列時，游標停在「那一列的上緣＋同樣的高度」就是沒有推；各列的上緣不一定一樣高，所以不能跟起點直接比
      const startRow = source?.closest<HTMLElement>('[data-row-id]')?.getBoundingClientRect() ?? null;
      // 拖的是幾欄：拖整列就是那一列的欄數，拖一欄就是一欄。併進去會超過上限就不給併
      const draggedCols = subject.columnId ? 1 : source?.querySelectorAll('[data-col-id]').length || 1;
      const gripOffset = startRow ? startY - startRow.top : null;

      let started = false;
      let ghost: HTMLElement | null = null;
      let offsetX = 0;
      let offsetY = 0;

      let scale = 1;
      let ghostW = 0;
      let ghostH = 0;

      /**
       * 落點。x、y 是游標位置。
       *
       * 不靠 elementFromPoint 找「游標底下是哪一列」：列與列之間有留白，
       * 游標停在留白裡就什麼都找不到，拖起來像是不靈敏。改成在所有的列
       * 裡找沿著堆疊方向最近的那一列。
       *
       * 方向一律從那一列自己的書寫方向判斷：橫排的列由上往下堆、欄是左右排；
       * 直排的列由右往左堆、欄是上下排。
       */
      const targetAt = (x: number, y: number): DropTarget | null => {
        // 先依游標位置找出最靠近的頁面（以及流排分欄），落點才不會跨頁跑到其他頁
        const pages = [...document.querySelectorAll<HTMLElement>('main [data-page-index]')];
        let targetScope: HTMLElement | null = null;
        let minPageDist = Infinity;
        for (const pg of pages) {
          const r = pg.getBoundingClientRect();
          const dy = y < r.top ? r.top - y : y > r.bottom ? y - r.bottom : 0;
          const dx = x < r.left ? r.left - x : x > r.right ? x - r.right : 0;
          const dist = Math.hypot(dx, dy);
          if (dist < minPageDist) {
            minPageDist = dist;
            targetScope = pg;
          }
        }

        if (targetScope) {
          const flowPanels = [...targetScope.querySelectorAll<HTMLElement>('[data-flow-panel]')];
          if (flowPanels.length > 0) {
            let minPanelDist = Infinity;
            let targetPanel: HTMLElement | null = null;
            for (const p of flowPanels) {
              const pr = p.getBoundingClientRect();
              const dist = x < pr.left ? pr.left - x : x > pr.right ? x - pr.right : 0;
              if (dist < minPanelDist) {
                minPanelDist = dist;
                targetPanel = p;
              }
            }
            if (targetPanel) targetScope = targetPanel;
          }
        }

        let frames = [...(targetScope ?? document).querySelectorAll<HTMLElement>('[data-row-id]')];
        // 如果該頁的所有列就是被拖曳的整列自己，擴展到全文尋找其他落點
        const otherAvailable = frames.some(
          (f) => f.dataset.rowId !== dragging.current?.rowId || dragging.current?.columnId
        );
        if (frames.length === 0 || !otherAvailable) {
          frames = [...document.querySelectorAll<HTMLElement>('main [data-row-id]')];
        }
        if (frames.length === 0) return null;

        const vertical =
          frames[0].closest('[data-vertical]') !== null ||
          getComputedStyle(frames[0]).writingMode.startsWith('vertical');

        // 堆疊方向（block）與行進方向（inline）上的座標
        const blockOf = (px: number, py: number) => (vertical ? -px : py);
        const pb = blockOf(x, y);
        // 殘影中心——併欄看的是它，不是游標
        const cx = x - offsetX + ghostW / 2;
        const cy = y - offsetY + ghostH / 2;
        const ci = vertical ? cy : cx;

        let best: { frame: HTMLElement; r: DOMRect; dist: number } | null = null;
        for (const frame of frames) {
          // 拖整列時，自己不是落點；拖一欄時自己那一列可以（拆出來）
          const self = frame.dataset.rowId === dragging.current?.rowId;
          if (self && !dragging.current?.columnId) continue;
          const r = frame.getBoundingClientRect();
          const b0 = vertical ? -r.right : r.top;
          const b1 = vertical ? -r.left : r.bottom;
          const blockDist = pb < b0 ? b0 - pb : pb > b1 ? pb - b1 : 0;

          // 計算在 inline 軸上的距離。在垂直模式下，各頁的 x 座標相同，
          // 若跨頁比較候選列，必須納入 y 軸（inline）距離，否則永遠只會選中第一頁的列！
          const i0 = vertical ? r.top : r.left;
          const i1 = vertical ? r.bottom : r.right;
          const pi = vertical ? y : x;
          const inlineDist = pi < i0 ? i0 - pi : pi > i1 ? pi - i1 : 0;
          const dist = Math.hypot(blockDist, inlineDist);

          if (!best || dist < best.dist) best = { frame, r, dist };
        }
        if (!best) return null;

        const { frame, r } = best;
        const index = Number(frame.dataset.rowIndex);
        const rowId = frame.dataset.rowId!;
        const onSelf = rowId === dragging.current?.rowId;

        const cols = frame.querySelectorAll('[data-col-id]').length || 1;

        // 直排併欄：欄是上下疊的。游標（不是殘影中心）在那一列的上方三成、而且手往上推過一段＝併在上面；
        // 下方四成、往下推過一段＝併在下面。左右放寬 VERTICAL_SLACK_PX。只左右移動是換順序（理由見 VERTICAL_PUSH）
        if (vertical && !onSelf && cols + draggedCols <= MAX_COLUMNS_VERTICAL && gripOffset !== null) {
          const page = frame.closest<HTMLElement>('[data-page-index]')?.getBoundingClientRect();
          const overRow = x >= r.left - VERTICAL_SLACK_PX && x <= r.right + VERTICAL_SLACK_PX;
          if (page && page.height > 0 && overRow) {
            const moved = (y - (r.top + gripOffset)) / page.height;
            const reach = VERTICAL_REACH * page.height;
            const near = y > r.top - reach && y < r.bottom + reach;
            const tc = (y - r.top) / r.height;
            if (near && tc < SIDE_FRACTION && moved < -VERTICAL_PUSH)
              return { mode: 'column', rowId, side: 'left', ...measureKeep(frame, true) };
            if (near && tc > VERTICAL_BOTTOM && moved > VERTICAL_PUSH)
              return { mode: 'column', rowId, side: 'right', ...measureKeep(frame, true) };
          }
        }

        // 橫排併欄：看殘影中心推進那一列左右三成
        const inside = best.dist === 0;
        const i0 = vertical ? r.top : r.left;
        const span = vertical ? r.height : r.width;
        const t = (ci - i0) / span;
        if (!vertical && inside && !onSelf && cols + draggedCols <= MAX_COLUMNS) {
          if (t < SIDE_FRACTION) return { mode: 'column', rowId, side: 'left', ...measureKeep(frame, false) };
          if (t > 1 - SIDE_FRACTION) return { mode: 'column', rowId, side: 'right', ...measureKeep(frame, false) };
        }

        // 前半插在它之前、後半插在它之後
        const mid = vertical ? -(r.left + r.width / 2) : r.top + r.height / 2;
        return { mode: 'row', index: pb > mid ? index + 1 : index };
      };

      const onMove = (ev: PointerEvent) => {
        if (!started) {
          const moved = Math.hypot(ev.clientX - startX, ev.clientY - startY);
          if (moved < DRAG_THRESHOLD_PX) return;
          started = true;
          dragging.current = subject;
          setDraggingRowId(subject.rowId);
          if (source) {
            const r = source.getBoundingClientRect();
            offsetX = startX - r.left;
            offsetY = startY - r.top;
            ghostW = r.width;
            ghostH = r.height;
            ({ ghost, scale } = makeGhost(source));
          }
        }

        if (ghost) {
          ghost.style.transform = `translate(${ev.clientX - offsetX}px, ${ev.clientY - offsetY}px) scale(${scale})`;
        }
        const next = targetAt(ev.clientX, ev.clientY);
        // 要併欄時殘影變淡，讓底下那條「併成兩欄」的提示看得見
        if (ghost) ghost.style.opacity = next?.mode === 'column' ? '0.4' : '0.92';
        target.current = next;
        setDropTarget(next);
      };

      const finish = (ev: PointerEvent) => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', finish);
        window.removeEventListener('pointercancel', finish);
        try {
          handle?.releasePointerCapture?.(ev.pointerId);
        } catch {
          /* 沒捕捉到就沒得釋放 */
        }

        // 放開的位置才是真正的落點。中途若完全沒有 move 事件
        // （拖太快、事件被合併），這裡補算一次。
        const t = started ? (targetAt(ev.clientX, ev.clientY) ?? target.current) : null;
        const subj = dragging.current;

        ghost?.remove();
        ghost = null;
        dragging.current = null;
        target.current = null;
        setDraggingRowId(null);
        setDropTarget(null);

        if (subj && t) commit(subj, t);
      };

      // 抓住指標，滑出視窗也不會卡在拖曳中。
      // 包在 try 裡是因為它會對無效的 pointerId 丟例外——
      // 若讓它往外拋，下面的監聽就不會註冊，整個拖曳靜靜地失效。
      // 指標捕捉只是加強，不是拖曳能否運作的前提。
      try {
        handle?.setPointerCapture?.(e.pointerId);
      } catch {
        /* 沒有捕捉也能拖，只是滑出視窗時可能中斷 */
      }
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', finish);
      window.addEventListener('pointercancel', finish);
      e.preventDefault();
    },
    [setDraggingRowId, setDropTarget, commit]
  );

  return { startDrag };
}
