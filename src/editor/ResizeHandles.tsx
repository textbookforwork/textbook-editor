import { useRef } from 'react';
import styled, { css } from 'styled-components';
import { snapPct } from '../model/snap';
import type { Block } from '../model/types';

/**
 * 元件外框的把手。選取非文字元件時出現，拖它調尺寸。
 *
 * 版面沒有座標，所以把手拖的不是「位置」而是「佔欄寬的比例」：
 * inline 軸存成 widthPct，欄寬變了元件跟著縮放；沒有內在比例的元件
 * （圖形、網頁框）另外存 block 軸的絕對值。拖到常用比例會吸附（snap.ts）。
 *
 * 把手本身絕對定位、不佔版面——這一頁裝得下多少是分頁算過的，
 * 把手若把元件撐大一點點，量到的與畫出來的就不一致。
 */

/** 哪些軸可以拖。 */
export type ResizeMode =
  /** 有內在比例：寬高連動，拖任何一邊都是改比例 */
  | 'aspect'
  /** 只能改 inline 軸：橫向的卡片拉寬只是多顯示幾個字，沒有拉高的情境 */
  | 'inline'
  /** 兩軸獨立；拖角落等比 */
  | 'free'
  /**
   * 只能改實體的寬，不管書寫方向：網頁標籤是一張永遠橫著的卡片，直排也是左右拉長短。
   * 橫排時寬就是 inline 軸，跟 'inline' 一樣；直排時寬是 block 軸，改的是 blockSize
   */
  | 'width';

export function resizeModeOf(block: Block): ResizeMode | null {
  switch (block.type) {
    // 圖片：拖邊只改那一邊的長度（圖在框裡裁成填滿），拖四角才是等比縮放
    case 'image':
      return 'free';
    case 'video':
      return 'aspect';
    case 'audio':
    case 'table':
      return 'inline';
    case 'web':
      return block.presentation === 'embed' ? 'free' : 'width';
    case 'shape':
    // 線段的框也沒有內在比例：端點是框內的相對座標，框怎麼拉線都跟著
    case 'line':
    case 'module':
    // PDF 框沒有內在比例：高一點多看幾行，窄一點讓文字排在旁邊
    case 'pdf':
      return 'free';
    default:
      return null;
  }
}

type Handle = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
const CORNERS: Handle[] = ['ne', 'nw', 'se', 'sw'];

type Props = {
  mode: ResizeMode;
  /** 元件目前的尺寸（頁座標），跟畫出來的是同一組數字。 */
  box: { inlineSize: number; blockSize: number };
  /** 這一欄的 inline 尺寸，百分比以它為分母。 */
  columnInline: number;
  vertical: boolean;
  /** 沒帶 widthPct 的話，比例維持原樣（直排的標籤拉左右只改 blockSize）。 */
  onResize: (next: { widthPct?: number; blockSize?: number }) => void;
};

export function ResizeHandles({ mode: given, box, columnInline, vertical, onResize }: Props) {
  // 橫排時「寬」就是 inline 軸，照 inline 模式走；只有直排要另外處理
  const mode: ResizeMode = given === 'width' && !vertical ? 'inline' : given;
  const frameRef = useRef<HTMLDivElement>(null);

  // 實體寬高：直排時 inline 軸是垂直的
  const width = vertical ? box.blockSize : box.inlineSize;
  const height = vertical ? box.inlineSize : box.blockSize;

  // inline 軸在哪個實體方向上，決定 inline-only 模式顯示哪幾個把手
  const inlineIsHorizontal = !vertical;
  const handles: Handle[] =
    mode === 'width'
      ? ['e', 'w', ...CORNERS]
      : mode === 'inline'
      ? inlineIsHorizontal
        ? ['e', 'w', ...CORNERS]
        : ['n', 's', ...CORNERS]
      : ['n', 's', 'e', 'w', ...CORNERS];

  const start = (hd: Handle) => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const el = frameRef.current;
    if (!el) return;
    // 頁面是 transform: scale() 縮放過的，指標給的是視窗像素；
    // 用畫面上的寬除以版面寬就是倍率，不必從外面傳進來
    const scale = el.getBoundingClientRect().width / (el.offsetWidth || 1);
    const x0 = e.clientX;
    const y0 = e.clientY;
    const ratio = width / height;

    const move = (ev: PointerEvent) => {
      const dx = (ev.clientX - x0) / scale;
      const dy = (ev.clientY - y0) / scale;
      let w = width;
      let h = height;
      if (hd.includes('e')) w = width + dx;
      if (hd.includes('w')) w = width - dx;
      if (hd.includes('s')) h = height + dy;
      if (hd.includes('n')) h = height - dy;

      const corner = CORNERS.includes(hd);
      const onlyBlockEdge = inlineIsHorizontal
        ? hd === 'n' || hd === 's'
        : hd === 'e' || hd === 'w';

      if (mode === 'aspect') {
        // 寬高連動：拖上下邊看高，拖左右邊與角落看寬。這是實體方向，直排也一樣——
        // 之前用「block 軸那兩邊」判斷，直排時軸轉了九十度，拖哪一邊都被另一邊沒變的長度蓋回去，只剩四角拉得動
        if (hd === 'n' || hd === 's') w = h * ratio;
        else h = w / ratio;
      } else if (corner) {
        // 角落等比，以寬的變化為準（包含 inline 模式的四角縮放）
        const f = Math.max(0.05, w / width);
        h = height * f;
      } else if (mode === 'width') {
        // 直排的標籤拉左右：只改寬（block 軸），高與比例不動
        onResize({ blockSize: Math.max(24, Math.round(w)) });
        return;
      } else if (mode === 'inline') {
        // 拉左右側：只改 inline 軸（變寬以顯示更多標題文字），高度原封不動
        if (inlineIsHorizontal) h = height;
        else w = width;
      }

      const inline = vertical ? h : w;
      let block = vertical ? w : h;
      const rawPct = Math.max(10, Math.min(100, (inline / columnInline) * 100));
      const pct = mode === 'free' && onlyBlockEdge ? rawPct : snapPct(rawPct);

      if ((mode === 'free' || mode === 'inline' || mode === 'width') && corner) {
        // 角落等比：以吸附後的 inline 軸為準，正圓拖角落才能維持正圓
        const baseInline = vertical ? height : width;
        const baseBlock = vertical ? width : height;
        const nextInline = (pct / 100) * columnInline;
        block = baseBlock * Math.max(0.05, nextInline / (baseInline || 1));
      }

      onResize(
        mode === 'free' || ((mode === 'inline' || mode === 'width') && corner)
          ? { widthPct: pct, blockSize: Math.max(24, Math.round(block)) }
          : { widthPct: pct }
      );
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  };

  return (
    // 外層用邏輯屬性貼到元件的起點（直排時在右上），尺寸用實體值
    <Anchor ref={frameRef} style={{ width, height }} data-ui>
      <Physical>
        {handles.map((h) => (
          <Grip key={h} $h={h} onPointerDown={start(h)} aria-label="調整尺寸" />
        ))}
      </Physical>
    </Anchor>
  );
}

const Anchor = styled.div`
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 0;
  pointer-events: none;
  z-index: 6;
`;

/** 把手用實體方位擺，所以這一層固定橫排。 */
const Physical = styled.div`
  position: relative;
  inline-size: 100%;
  block-size: 100%;
  writing-mode: horizontal-tb;
  outline: ${(p) => p.theme.border.widthSelected} solid ${(p) => p.theme.tool.border};
  outline-offset: -1px;
`;

/** 四角是圓點，四邊是順著邊放的小膠囊（上下橫放、左右直放）。 */
const DOT = 14;
const PILL_LONG = 24;
const PILL_SHORT = 8;
const shapeOf = (h: Handle) =>
  CORNERS.includes(h)
    ? css`width: ${DOT}px; height: ${DOT}px;`
    : h === 'n' || h === 's'
      ? css`width: ${PILL_LONG}px; height: ${PILL_SHORT}px;`
      : css`width: ${PILL_SHORT}px; height: ${PILL_LONG}px;`;
const pos = (h: Handle) => {
  const y = h.includes('n') ? 'top: 0' : h.includes('s') ? 'bottom: 0' : 'top: 50%';
  const x = h.includes('w') ? 'left: 0' : h.includes('e') ? 'right: 0' : 'left: 50%';
  const tx = h.includes('w') ? '-50%' : h.includes('e') ? '50%' : '-50%';
  const ty = h.includes('n') ? '-50%' : h.includes('s') ? '50%' : '-50%';
  const cursor =
    h === 'n' || h === 's' ? 'ns-resize'
    : h === 'e' || h === 'w' ? 'ew-resize'
    : h === 'ne' || h === 'sw' ? 'nesw-resize'
    : 'nwse-resize';
  return css`
    ${y};
    ${x};
    transform: translate(${tx}, ${ty});
    cursor: ${cursor};
  `;
};

/**
 * 白底、細灰框、淡陰影的圓點與膠囊；藍色只留給外框那條線。
 * 外框本身的直角不動。看起來小、點起來大：::after 往外多抓 8px，平板上也按得到。
 */
const Grip = styled.div<{ $h: Handle }>`
  position: absolute;
  pointer-events: auto;
  touch-action: none;
  box-sizing: border-box;
  ${(p) => shapeOf(p.$h)}
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.surface.raised};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.default};
  box-shadow: 0 1px 3px rgba(26, 25, 23, 0.18);
  ${(p) => pos(p.$h)}

  &::after {
    content: '';
    position: absolute;
    inset: -8px;
  }
  &:hover {
    border-color: ${(p) => p.theme.border.hover};
  }
`;

/**
 * 跟整本不同向的文字段落：只有 block 軸能拖（盒子在頁面上佔多高；直排頁是多寬）。
 * 另一軸由字數決定，所以不畫整圈把手，只在盒子延伸的那一邊放一條可拖的邊：
 * 橫排頁拖下緣，直排頁的 block 軸往左長，拖左緣。
 * 用實體屬性定位——這一層外面的 writing-mode 可能是直排，邏輯屬性會算錯軸。
 */
export function FlowResizeHandle({
  size,
  max,
  vertical,
  onResize,
}: {
  /** 目前盒子在 block 軸上的尺寸（頁座標）。 */
  size: number;
  max: number;
  /** 頁面（整本）是不是直排。 */
  vertical: boolean;
  onResize: (blockSize: number) => void;
}) {
  const start = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const shell = e.currentTarget.parentElement;
    const scale = shell ? shell.getBoundingClientRect().width / (shell.offsetWidth || 1) : 1;
    const x0 = e.clientX;
    const y0 = e.clientY;
    const move = (ev: PointerEvent) => {
      const d = vertical ? -(ev.clientX - x0) / scale : (ev.clientY - y0) / scale;
      onResize(Math.round(Math.max(24, Math.min(max, size + d))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  };
  return (
    <FlowEdge $vertical={vertical} onPointerDown={start} aria-label="拖曳調整框的大小" data-ui>
      <FlowGrip $vertical={vertical} />
    </FlowEdge>
  );
}

const FlowEdge = styled.div<{ $vertical: boolean }>`
  position: absolute;
  z-index: 6;
  touch-action: none;
  ${(p) =>
    p.$vertical
      ? css`top: 0; bottom: 0; left: -10px; width: 12px; cursor: ew-resize;`
      : css`left: 0; right: 0; bottom: -10px; height: 12px; cursor: ns-resize;`}
`;

/** 看得到的把手，跟其他元件外框的邊把手同一款：順著邊放的小膠囊，在邊的正中間。 */
const FlowGrip = styled.span<{ $vertical: boolean }>`
  position: absolute;
  box-sizing: border-box;
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.surface.raised};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.default};
  box-shadow: 0 1px 3px rgba(26, 25, 23, 0.18);
  writing-mode: horizontal-tb;
  ${(p) =>
    p.$vertical
      ? css`width: ${PILL_SHORT}px; height: ${PILL_LONG}px; top: 50%; left: 2px; transform: translateY(-50%);`
      : css`width: ${PILL_LONG}px; height: ${PILL_SHORT}px; left: 50%; top: 2px; transform: translateX(-50%);`}
`;
