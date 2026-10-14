import credits from '../../design/media/credits.json';
import type { ImportResult } from '../model/markdown';
import type { Block, Row } from '../model/types';

/**
 * 內建範例的圖片。
 *
 * md 裡的圖只有路徑（`img/U4-L1-hsinchu.jpg`），沒有檔案，所以匯入後
 * 只看得到空格子。範例教材附上一組開放授權的照片（design/media/，
 * 出處與授權見同目錄的 credits.json），路徑對得上就直接顯示。
 *
 * 對應方式是**檔名去掉副檔名**：md 寫的目錄（img/、images/）各課不同，
 * 而兩張星空照在 md 裡是 .png，實際存成 .jpg——照片存 PNG 會大上四倍。
 *
 * 老師自己上傳的圖不受影響：上傳的 assetId 是 asset-N，對不到這裡的任何一張。
 */

type Credit = {
  width: number;
  height: number;
  author: string;
  license: string;
  source: string;
};
const CREDITS = credits as Record<string, Credit>;

const files = import.meta.glob<string>('../../design/media/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
});

const stem = (path: string) => (path.split('/').pop() ?? path).replace(/\.[^.]+$/, '');

const urlByStem = new Map(Object.entries(files).map(([path, url]) => [stem(path), url]));
const sizeByStem = new Map(Object.entries(CREDITS).map(([file, c]) => [stem(file), c]));

/**
 * 範例圖片的出處。CC BY／BY-SA 規定散布時要標示作者與授權，
 * 所以圖片元件會把這一行疊在圖上（見 ImageBlockView）。
 */
export const sampleCredit = (assetId: string | null): Credit | undefined =>
  assetId ? sizeByStem.get(stem(assetId)) : undefined;

/** 範例圖片的網址。對不到就是 undefined，元件照常顯示空格子。 */
export const sampleUrl = (assetId: string): string | undefined => urlByStem.get(stem(assetId));

/**
 * 把對得到範例圖的圖片元件換上真實長寬比。
 *
 * md 只有路徑、讀不到尺寸，匯入時給的是暫定的 1.5。圖既然在這裡，
 * 尺寸就是已知的——不換的話分頁照 1.5 算、畫面照真圖畫，那一頁就對不上。
 * 比例來自 credits.json 裡記下的像素尺寸，不必等圖載入。
 */
export function withSampleMedia(result: ImportResult): ImportResult {
  const fix = (b: Block): Block => {
    if (b.type !== 'image' || !b.assetId) return b;
    const size = sizeByStem.get(stem(b.assetId));
    return size ? { ...b, aspectRatio: size.width / size.height } : b;
  };
  const rows: Row[] = result.rows.map((row) => ({
    ...row,
    columns: row.columns.map((col) => ({ ...col, blocks: col.blocks.map(fix) })),
  }));
  return { ...result, rows };
}
