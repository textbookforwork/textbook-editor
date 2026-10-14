import { forwardRef, useRef, useState, type ReactNode } from 'react';
import styled from 'styled-components';
import { useEditorCtx } from './EditorContext';
import { fitTwoPerPage } from '../model/blockSizing';
import { uploadFile } from './MediaLibrary';
import { toast } from './Toast';
import { blockFromAsset } from '../components/RowView';

/**
 * 編輯區的空白處。
 *
 * 點空白處只做一件事，依當下狀態決定是哪一件：
 *   插入面板開著   → 收起來
 *   有選取的元件   → 放掉
 *   什麼都沒有     → 在離點擊最近的縫隙打開插入面板
 *
 * 「空白」＝不在元件上、不在任何按鈕或握把上。點在元件上的事元件自己管。
 * 用 click 不用 pointerdown：拖曳的起點也會落在空白處，按下去就動作的話
 * 一拖就先把選取放掉。
 */
const SLOP = 4;

export const EditStage = forwardRef<HTMLElement, { children: ReactNode }>(function EditStage(
  { children },
  ref
) {
  const ed = useEditorCtx();
  const down = useRef<{ x: number; y: number; wasOpen: boolean; wasSelected: boolean } | null>(null);
  // 正在把本機檔案拖過來。只為了畫一圈提示，讓老師知道放開就會上傳
  const [dragOver, setDragOver] = useState(false);

  // 上一次算出來的縫隙。pointermove 一秒幾十次，同一個值就不要再 setState
  const lastGap = useRef<number | null>(null);
  const setGap = (index: number | null) => {
    if (lastGap.current === index) return;
    lastGap.current = index;
    ed?.setHoverGap(index);
  };

  /**
   * 把本機檔案拖進畫布：依 MIME 上傳，完成後插在離放開位置最近的縫隙。
   * 不用先開媒體庫；上傳的檔案也會進媒體庫對應的分頁（uploadFile 走的是同一條）。
   * 不支援的格式用提示說支援什麼，不是靜靜不理。
   */
  const dropFiles = async (files: File[], x: number, y: number) => {
    if (!ed) return;
    let index = nearestGap(x, y);
    for (const file of files) {
      const r = await uploadFile(file);
      if ('error' in r) {
        toast(r.error);
        continue;
      }
      ed.dispatch({ type: 'insertRow', index, blocks: [fitTwoPerPage(blockFromAsset(r.asset), ed.doc.settings)] });
      // 一次拖好幾個：照拖進來的順序排在一起，不要全部擠到同一個縫隙倒著放
      index += 1;
    }
  };

  return (
    <Stage
      ref={ref}
      $dragOver={dragOver}
      onDragOver={(e) => {
        // 只接本機檔案；頁面內的拖曳走 pointer events，不會到這裡
        if (!e.dataTransfer.types.includes('Files')) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        if (!dragOver) setDragOver(true);
      }}
      onDragLeave={(e) => {
        // 離開到子元素也會觸發 dragleave；真的離開編輯區才收提示
        if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
        setDragOver(false);
      }}
      onDrop={(e) => {
        if (!e.dataTransfer.types.includes('Files')) return;
        e.preventDefault();
        setDragOver(false);
        void dropFiles([...e.dataTransfer.files], e.clientX, e.clientY);
      }}
      /* 游標停在可以新增的空白處時整片都是手形，不必移到加號上才知道能按 */
      style={ed?.hoverGap !== null && ed?.hoverGap !== undefined ? { cursor: 'pointer' } : undefined}
      /*
        空白處的引導：游標停在哪裡，離它最近的那條「線＋新增元件」就浮現。
        老師不必找到那條 20px 的感應線——整片空白都在指著「東西會加在這裡」。
        面板開著、正在拖曳、或游標在元件與控制項上時不提示，免得到處閃。
      */
      onPointerMove={(e) => {
        if (!ed || e.pointerType === 'touch') return;
        if (ed.insertAt !== null || ed.draggingRowId) return setGap(null);
        const t = e.target as HTMLElement;
        if (t.closest('[data-block-id], button, input, select, textarea, [contenteditable], [data-ui], a'))
          return setGap(null);
        setGap(nearestGap(e.clientX, e.clientY));
      }}
      onPointerLeave={() => setGap(null)}
      onPointerDown={(e) => {
        if (!ed) return;
        // 狀態在按下的那一刻就記下來：有些控制項會在 click 之前先改狀態
        //（插入點的按鈕一按就切換），click 時再讀就讀到改過的值
        const typing = (document.activeElement as HTMLElement | null)?.isContentEditable ?? false;
        down.current = {
          x: e.clientX,
          y: e.clientY,
          wasOpen: ed.insertAt !== null,
          wasSelected: !!ed.selectedBlockId || !!ed.inlineSelection || typing,
        };
      }}
      onClick={(e) => {
        const d = down.current;
        down.current = null;
        if (!ed || !d) return;
        if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > SLOP) return;

        const t = e.target as HTMLElement;
        // 控制項自己會處理，不當成空白
        if (t.closest('button, input, select, textarea, [contenteditable], [data-ui], a')) return;

        if (t.closest('[data-block-id]')) {
          if (d.wasOpen) ed.openInsert(null);
          return;
        }

        if (d.wasOpen) {
          ed.openInsert(null);
          return;
        }
        if (d.wasSelected) {
          ed.deselect();
          return;
        }
        // 開面板時把提示收掉：面板本身就貼在那條線上，兩個一起亮很吵
        setGap(null);
        ed.openInsert(nearestGap(e.clientX, e.clientY));
      }}
    >
      {children}
    </Stage>
  );
});

/**
 * 離點擊最近的縫隙＝要插在 doc.rows 的第幾個之前。
 *
 * 跟拖曳的落點用同一個判斷：先找游標所在的頁面，再沿堆疊方向找該頁最近的那一列，
 * 落在它前半就插在它之前、後半就插在之後。沒有任何列時插在 0。
 */
function nearestGap(x: number, y: number): number {
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

  // 若該頁有多個橫向流排分欄（horizontalPanels），進一步鎖定最靠近的分欄
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

  const frames = [
    ...(targetScope ?? document).querySelectorAll<HTMLElement>('[data-row-id]'),
  ];
  if (frames.length === 0) return 0;
  const vertical = getComputedStyle(frames[0]).writingMode.startsWith('vertical');
  const pb = vertical ? -x : y;

  let best: { r: DOMRect; index: number; dist: number } | null = null;
  for (const f of frames) {
    const r = f.getBoundingClientRect();
    const b0 = vertical ? -r.right : r.top;
    const b1 = vertical ? -r.left : r.bottom;
    const dist = pb < b0 ? b0 - pb : pb > b1 ? pb - b1 : 0;
    const index = Number(f.dataset.rowIndex);
    if (!best || dist < best.dist) best = { r, index, dist };
  }
  if (!best) return 0;
  const mid = vertical ? -(best.r.left + best.r.width / 2) : best.r.top + best.r.height / 2;
  const rawGap = pb > mid ? best.index + 1 : best.index;

  // 第一頁以外的頁面，該頁頂端在畫面上沒有「第一列之前」的插入點（它屬於前一頁的下緣），
  // 該頁能插入的第一個位置是第一列之後，避免點該頁頂部時反而跑到前一頁去
  const firstRowIdx = Number(frames[0].dataset.rowIndex);
  const isLaterPage = targetScope?.closest('[data-page-index]')?.getAttribute('data-page-index') !== '0';
  if (isLaterPage) {
    return Math.max(firstRowIdx + 1, rawGap);
  }
  return rawGap;
}

const Stage = styled.main<{ $dragOver?: boolean }>`
  flex: 1;
  min-block-size: 0;
  overflow: auto;
  /* 左右的 56px 留白不放這裡，放在 App 的 PageSlot 上：可捲動的 flex 容器捲到最右時
     不算自己右側的 padding，放大後頁面右緣會直接貼到編輯區邊界、看起來捲不過去 */
  padding: ${(p) => p.theme.space.insetXl} 0;
  background: ${(p) => (p.$dragOver ? p.theme.surface.muted : p.theme.surface.sunken)};
  /* 編輯區是一塊灰卡，右邊留白；下緣貼齊視窗底，左右兩邊筆直到底，只有上方兩角是圓的 */
  border-start-start-radius: ${(p) => p.theme.radius.panel};
  border-start-end-radius: ${(p) => p.theme.radius.panel};
  margin-inline-end: ${(p) => p.theme.space.insetLg};
  /* 拖檔案進來時在內緣畫一圈，用 inset 的 box-shadow 不佔版面 */
  box-shadow: ${(p) => (p.$dragOver ? `inset 0 0 0 ${p.theme.border.widthEmphasis} ${p.theme.border.hover}` : 'none')};
  display: flex;
  flex-direction: column;
  /* 放大到比編輯區還寬時，一般的 center 會把左緣推到捲不到的地方；
     safe 讓它改成靠左起算，整頁都捲得到 */
  align-items: safe center;
  gap: 32px;
`;
