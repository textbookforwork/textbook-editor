import { useCallback, useRef } from 'react';
import type { DropTarget } from '../model/actions';

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

        // 併欄：僅在橫排時允許側邊推入併欄。
        // 直排模式下握把位於頂端，拖曳重排是在水平方向滑動，
        // 殘影中心自然落在頂端（t < 0.3），若允許併欄會誤判成「併成二欄」而破壞換順序。
        const inside = best.dist === 0;
        const i0 = vertical ? r.top : r.left;
        const span = vertical ? r.height : r.width;
        const t = (ci - i0) / span;
        const cols = frame.querySelectorAll('[data-col-id]').length || 1;
        if (!vertical && inside && !onSelf && cols < MAX_COLUMNS) {
          if (t < SIDE_FRACTION) return { mode: 'column', rowId, side: 'left' };
          if (t > 1 - SIDE_FRACTION) return { mode: 'column', rowId, side: 'right' };
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
