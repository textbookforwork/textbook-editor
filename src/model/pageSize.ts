import type { DocSettings } from './types';

/**
 * 頁面的實體尺寸，單位是「頁座標」。
 *
 * 這組數字跟螢幕無關——分頁一律在這個座標系裡算，算完再整頁等比縮放到螢幕上。
 * 這是「老師的第 76 頁＝學生的第 76 頁」的實作方式：各校平板規格不一，
 * 若讓分頁隨螢幕變動，甲校的第 76 頁就不是乙校的第 76 頁。
 */
export const PAGE_SIZE: Record<DocSettings['aspectRatio'], { width: number; height: number }> = {
  // 預設。橫置平板全部比 4:3 寬，這個比例能用滿垂直空間，留邊落在左右。
  '4:3': { width: 1024, height: 768 },
  // 給以投影為主的老師。在 iPad 上只用得到約 75% 的高度。
  '16:9': { width: 1280, height: 720 },
};

/**
 * 頁面四周的留白，同樣是頁座標。原本 64，收成 48 讓內容可用的範圍大一點（4:3 頁面內容區 928×672）。
 * 不能再小：補充的角標放在元件外側的這條留白裡（8 + 約 40 寬），再小就會被頁緣切掉。
 */
export const PAGE_PADDING = 48;

/**
 * 閱讀模式裁掉的留白（頁座標）。不裁到 0：字貼著圓角會被切到，也沒有呼吸空間，
 * 留 16 給視覺邊界，其餘 32 讓給內容放大（4:3 頁面約大 7%）。只改顯示，分頁照整頁算。
 */
export const READER_CROP = PAGE_PADDING - 16;

/** 欄與欄之間的溝寬。與 GAP.module 同值，橫縱格線一致。 */
export const COLUMN_GAP = 48;

export function contentBox(settings: Pick<DocSettings, 'aspectRatio'>) {
  const page = PAGE_SIZE[settings.aspectRatio];
  return {
    width: page.width - PAGE_PADDING * 2,
    height: page.height - PAGE_PADDING * 2,
  };
}
