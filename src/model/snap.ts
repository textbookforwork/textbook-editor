/**
 * 拖曳尺寸時的吸附。
 *
 * 版面沒有自由畫布，所以沒有「跟隔壁元件對齊」這回事——對齊的是欄的格線。
 * 吸附點就是常用的分欄比例：四分之一、三分之一、一半、三分之二、滿欄。
 * 拖到附近就吸過去，老師不必盯著數字對準 50。
 */
export const SNAP_STOPS = [25, 100 / 3, 50, 200 / 3, 75, 100] as const;

/** 離吸附點多近（百分點）就吸過去。 */
export const SNAP_TOLERANCE = 3;

export function snapPct(pct: number, stops: readonly number[] = SNAP_STOPS): number {
  let best = pct;
  let dist = SNAP_TOLERANCE;
  for (const s of stops) {
    const d = Math.abs(pct - s);
    if (d < dist) {
      dist = d;
      best = s;
    }
  }
  return best;
}

/** 拖出來的比例是不是正好落在吸附點上。畫面用它決定要不要亮提示。 */
export const isSnapped = (pct: number, stops: readonly number[] = SNAP_STOPS) =>
  stops.some((s) => Math.abs(pct - s) < 0.01);

/** 顯示給老師看的比例：1/3、2/3 用分數，其餘用整數百分比。 */
export function pctLabel(pct: number): string {
  if (Math.abs(pct - 100 / 3) < 0.01) return '⅓';
  if (Math.abs(pct - 200 / 3) < 0.01) return '⅔';
  return `${Math.round(pct)}%`;
}
