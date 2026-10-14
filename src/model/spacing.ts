import { isBoxLike } from './registry';
import { HEADING_ROLES } from './types';
import type { Block, Row, TextRole } from './types';

/**
 * 間距編碼「歸屬」：相鄰兩塊越相關，垂直間距越小；越是換模組、換節，間距越大。
 *
 * 屬於同一件事的（標題與內文、圖與圖說）維持貼近；不同的東西之間留得寬，
 * 讓每個盒狀模組像 bento 格子一樣各自成立，而不是擠成一疊。
 * 相關的貼、無關的開——兩端拉得越開，「歸屬」越一眼看得出來。
 * 模組間距與欄寬溝（COLUMN_GAP）同值，橫向與縱向的格線才一致。
 */
export const GAP = {
  /** 緊貼：小標與其正文（最小的標題）。更大的標題見 AFTER_HEADING */
  tight: 20,
  /** 附屬：正文與其注釋、圖與其圖說 */
  attached: 16,
  /** 連續：同一節內相鄰的正文段落 */
  continuous: 28,
  /** 換模組：圖、書籤卡、表格等盒狀模組前後 */
  module: 48,
  /** 換頁線：換頁記號的上下留白（編輯畫面用，不影響分頁計算） */
  pageBreak: 48,
  /** 換節：進入新的大標／中標 */
  section: 80,
} as const;

// 四個標題角色對應 md 標記規格的 課 / 區塊 / 項 / 子項

/**
 * 標題接它自己的內文時留多少。
 *
 * 不是一律同值：48 的課名下面只留 20，大字壓在小字頭上，看起來擠成一團。
 * 字越大，下面要留越多，視覺上的距離才會一致——所以課名與大標接內文
 * 的數字會比段落間距（continuous）大，這是刻意的，不是歸屬變遠了：
 * 對大字來說，這個距離看起來仍然是「緊接著」。
 */
export const AFTER_HEADING: Partial<Record<TextRole, number>> = {
  lessonTitle: 40,
  sectionTitle: 32,
  itemTitle: 24,
  subItemTitle: GAP.tight,
};

const firstBlock = (row: Row): Block | null => row.columns[0]?.blocks[0] ?? null;
const lastBlock = (row: Row): Block | null => {
  const col = row.columns[row.columns.length - 1];
  return col?.blocks[col.blocks.length - 1] ?? null;
};

const roleOf = (b: Block | null): TextRole | null =>
  b && b.type === 'text' ? b.role : null;

const rowIsBoxLike = (row: Row): boolean =>
  row.columns.some((c) => c.blocks.some((b) => isBoxLike(b.type)));

/**
 * 前一列與這一列之間該留多少。
 *
 * 判斷順序有意義：先問「這兩塊是不是同一件事」，是就取小值，否則取大值。
 * 換節永遠最大，讓大標自帶呼吸。
 */
export function gapBefore(prev: Row | null, next: Row): number {
  if (!prev) return 0;

  const nextRole = roleOf(firstBlock(next));
  const prevRole = roleOf(lastBlock(prev));

  // 換節：進入新的大標或中標，永遠最大
  if (nextRole === 'sectionTitle' || nextRole === 'itemTitle') return GAP.section;

  // 附屬：圖說跟著它的圖、注釋跟著它的正文
  if (nextRole === 'caption' || nextRole === 'annotation') return GAP.attached;

  // 換模組：盒狀模組一律用固定間距與前後隔開，不因內容多寡改變
  if (rowIsBoxLike(next) || rowIsBoxLike(prev)) return GAP.module;

  // 緊貼：標題與它自己的內文或導言
  if (prevRole && HEADING_ROLES.includes(prevRole)) return AFTER_HEADING[prevRole] ?? GAP.tight;

  // 連續：同一節內相鄰的段落
  return GAP.continuous;
}
