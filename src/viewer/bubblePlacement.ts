/**
 * 泡泡的位置規則。純函式，不碰 DOM——這樣規則可以直接用測試驗證，
 * 不必開瀏覽器一個角落一個角落點。
 *
 * 座標一律是視窗座標（getBoundingClientRect 讀到的那一套），
 * 泡泡本身是 position: fixed，所以算出來的 top / left 可以直接用。
 */

export type Box = { top: number; left: number; width: number; height: number };
export type Size = { width: number; height: number };

export type Placement = {
  /** 泡泡本體（不含尖角）的左上角。 */
  top: number;
  left: number;
  /**
   * 泡泡在錨點的哪一邊：above＝尖角朝下在本體底部，below＝尖角朝上在本體頂部；
   * left / right 只有直排書會用到——尖角在本體的右緣／左緣，朝元件指過去。
   */
  side: 'above' | 'below' | 'left' | 'right';
  /** 尖角中心沿著它所在那條邊的位置：上下兩邊量離左緣多遠，左右兩邊量離上緣多遠。 */
  arrow: number;
};

/** 尖角頂點與角標（或元件下緣）之間的距離。 */
export const BUBBLE_GAP = 12;
/** 泡泡離視窗邊界至少這麼多。 */
export const BUBBLE_EDGE = 12;
/** 尖角的高度（三角形從本體邊緣凸出多少）。 */
export const ARROW_HEIGHT = 8;
/** 尖角中心離本體左右兩端至少這麼多（半個尖角加圓角），才不會畫到圓角上。 */
export const ARROW_INSET = 16;

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), Math.max(lo, hi));

const overlaps = (a: Box, b: Box) =>
  a.left < b.left + b.width &&
  a.left + a.width > b.left &&
  a.top < b.top + b.height &&
  a.top + a.height > b.top;

/**
 * @param anchor  角標的位置。尖角對準它的水平中心。
 * @param target  被點的元件的位置。泡泡不能壓到它；上下都放不下時改從它的下緣中心彈出。
 * @param size    泡泡本體量出來的真實尺寸——內容會變（圖、影片），不要用估的。
 * @param viewport 視窗大小。
 */
export function placeBubble(anchor: Box, target: Box, size: Size, viewport: Size): Placement {
  const { width: w, height: h } = size;
  const leftFor = (tipX: number) => clamp(tipX - w / 2, BUBBLE_EDGE, viewport.width - BUBBLE_EDGE - w);
  const arrowFor = (tipX: number, left: number) => clamp(tipX - left, ARROW_INSET, w - ARROW_INSET);
  const tipX = anchor.left + anchor.width / 2;
  const left = leftFor(tipX);

  // 上方：本體底部再加尖角，尖角頂點距角標 12px
  const aboveTop = anchor.top - BUBBLE_GAP - ARROW_HEIGHT - h;
  const aboveBox: Box = { top: aboveTop, left, width: w, height: h + ARROW_HEIGHT };
  if (aboveTop >= BUBBLE_EDGE && !overlaps(aboveBox, target)) {
    return { top: aboveTop, left, side: 'above', arrow: arrowFor(tipX, left) };
  }

  // 下方：直排時角標在元件下面，往上彈會蓋到元件，就走這條
  const belowTop = anchor.top + anchor.height + BUBBLE_GAP + ARROW_HEIGHT;
  const belowBox: Box = { top: belowTop - ARROW_HEIGHT, left, width: w, height: h + ARROW_HEIGHT };
  if (belowTop + h <= viewport.height - BUBBLE_EDGE && !overlaps(belowBox, target)) {
    return { top: belowTop, left, side: 'below', arrow: arrowFor(tipX, left) };
  }

  // 元件太大，角標上下都沒空間：從元件下緣中心彈出。
  // 這時候可能會壓到元件，但至少尖角指著「是從這裡來的」。
  const centerX = target.left + target.width / 2;
  const fallbackLeft = leftFor(centerX);
  const wanted = target.top + target.height + BUBBLE_GAP + ARROW_HEIGHT;
  const top = clamp(wanted, BUBBLE_EDGE, viewport.height - BUBBLE_EDGE - h);
  return { top, left: fallbackLeft, side: 'below', arrow: arrowFor(centerX, fallbackLeft) };
}

/**
 * 直排書的泡泡：往左長。直排的閱讀方向是由右往左，泡泡放在元件左邊，
 * 讀完元件眼睛往左移就接到補充；尖角在本體右緣，對準錨點的垂直中心。
 *
 * 左邊放不下才放右邊，兩邊都不行（元件幾乎佔滿整個寬度）就退回上下的規則。
 */
export function placeBubbleVertical(anchor: Box, target: Box, size: Size, viewport: Size): Placement {
  const { width: w, height: h } = size;
  const tipY = anchor.top + anchor.height / 2;
  const top = clamp(tipY - h / 2, BUBBLE_EDGE, viewport.height - BUBBLE_EDGE - h);
  const arrow = clamp(tipY - top, ARROW_INSET, h - ARROW_INSET);
  const edge = Math.min(anchor.left, target.left);
  const leftSide = edge - BUBBLE_GAP - ARROW_HEIGHT - w;
  if (leftSide >= BUBBLE_EDGE) return { top, left: leftSide, side: 'left', arrow };
  const far = Math.max(anchor.left + anchor.width, target.left + target.width);
  const rightSide = far + BUBBLE_GAP + ARROW_HEIGHT;
  if (rightSide + w <= viewport.width - BUBBLE_EDGE) return { top, left: rightSide, side: 'right', arrow };
  return placeBubble(anchor, target, size, viewport);
}
