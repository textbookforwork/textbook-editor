import { newId } from './ids';
import { tableColWidths } from './blockSizing';
import type { TableBlock, TablePreset } from './types';

/**
 * 表格的結構操作：加減欄列、調順序、換樣式。
 *
 * 全部是純函式，回傳新的 TableBlock，交給 patchBlock 寫回。
 * 放在 model 而不是元件裡，是因為每一個操作都要同時搬三樣東西——
 * cells、colWidths／rowHeights、cellBg 的鍵——漏一樣，格子的底色就會跑到別格。
 * 純函式才測得到這件事。
 */

/** 快速樣式的清單與名字。順序就是面板上的順序。 */
export const TABLE_PRESETS: { key: TablePreset; label: string }[] = [
  { key: 'plain', label: '白底黑框' },
  { key: 'header', label: '表頭淡灰' },
  { key: 'zebra', label: '斑馬紋' },
  { key: 'borderless', label: '無框線' },
];

/** 面板上一次能拖選的最大尺寸。再大的表格一頁也裝不下。 */
export const TABLE_PICK_MAX = 8;
/** 新表格的預設大小（Figma：3 列 × 4 欄）。 */
export const TABLE_DEFAULT = { rows: 3, cols: 4 };

/** 一張新的空白表格。白底黑框，沒有表頭——老師自己填的表不一定有表頭。 */
export function newTable(rows = TABLE_DEFAULT.rows, cols = TABLE_DEFAULT.cols): TableBlock {
  return {
    id: newId('blk'),
    type: 'table',
    rows,
    cols,
    cells: Array.from({ length: rows }, () => Array.from({ length: cols }, () => '')),
    hasHeader: false,
    preset: 'plain',
    popups: [],
  };
}

const key = (r: number, c: number) => `${r},${c}`;
const parse = (k: string): [number, number] => {
  const [r, c] = k.split(',').map(Number);
  return [r, c];
};

/** 把 cellBg 的鍵依「列、欄的新位置」重算。回傳 null 的格子就是被刪掉的。 */
function remapBg(
  bg: Record<string, string> | undefined,
  map: (r: number, c: number) => [number, number] | null
): Record<string, string> | undefined {
  if (!bg) return undefined;
  const next: Record<string, string> = {};
  for (const [k, color] of Object.entries(bg)) {
    const [r, c] = parse(k);
    const to = map(r, c);
    if (to) next[key(to[0], to[1])] = color;
  }
  return Object.keys(next).length > 0 ? next : undefined;
}

/** 補齊 cells 的形狀：md 匯入的表格每列長度可能不一，先補成方的再操作。 */
export function squareCells(block: TableBlock): string[][] {
  return Array.from({ length: block.rows }, (_, r) =>
    Array.from({ length: block.cols }, (_, c) => block.cells[r]?.[c] ?? '')
  );
}

/** 改一格的文字。 */
export function setCell(block: TableBlock, r: number, c: number, text: string): TableBlock {
  const cells = squareCells(block);
  if (cells[r][c] === text) return block;
  cells[r] = cells[r].slice();
  cells[r][c] = text;
  return { ...block, cells };
}

/**
 * 在第 at 欄的位置插入一欄（at＝cols 就是加在最後）。
 * 新欄的寬從其他欄平均分出來，老師調過的比例關係保留。
 */
export function insertCol(block: TableBlock, at: number): TableBlock {
  const cells = squareCells(block).map((row) => [...row.slice(0, at), '', ...row.slice(at)]);
  const widths = tableColWidths(block);
  const share = 100 / (block.cols + 1);
  const scaled = widths.map((w) => (w * (100 - share)) / 100);
  const colWidths = [...scaled.slice(0, at), share, ...scaled.slice(at)];
  return {
    ...block,
    cols: block.cols + 1,
    cells,
    colWidths,
    cellBg: remapBg(block.cellBg, (r, c) => [r, c >= at ? c + 1 : c]),
  };
}

/** 刪第 at 欄。只剩一欄時不刪——表格至少要有一格。 */
export function deleteCol(block: TableBlock, at: number): TableBlock {
  if (block.cols <= 1) return block;
  const cells = squareCells(block).map((row) => row.filter((_, c) => c !== at));
  const widths = tableColWidths(block).filter((_, c) => c !== at);
  return {
    ...block,
    cols: block.cols - 1,
    cells,
    colWidths: widths,
    cellBg: remapBg(block.cellBg, (r, c) => (c === at ? null : [r, c > at ? c - 1 : c])),
  };
}

/** 把第 from 欄搬到第 to 欄的位置。 */
export function moveCol(block: TableBlock, from: number, to: number): TableBlock {
  if (from === to || from < 0 || to < 0 || from >= block.cols || to >= block.cols) return block;
  const order = Array.from({ length: block.cols }, (_, i) => i);
  order.splice(from, 1);
  order.splice(to, 0, from);
  const cells = squareCells(block).map((row) => order.map((c) => row[c]));
  const widths = tableColWidths(block);
  // 舊位置 → 新位置
  const pos = new Map(order.map((old, i) => [old, i]));
  return {
    ...block,
    cells,
    colWidths: order.map((c) => widths[c]),
    cellBg: remapBg(block.cellBg, (r, c) => [r, pos.get(c)!]),
  };
}

/** 在第 at 列的位置插入一列（at＝rows 就是加在最後）。 */
export function insertRow(block: TableBlock, at: number): TableBlock {
  const cells = squareCells(block);
  cells.splice(at, 0, Array.from({ length: block.cols }, () => ''));
  // 新列用預設高度（存 0）
  const heights = block.rowHeights
    ? normalizeHeights([...block.rowHeights.slice(0, at), 0, ...block.rowHeights.slice(at)], block.rows + 1)
    : undefined;
  return {
    ...block,
    rows: block.rows + 1,
    cells,
    rowHeights: heights,
    cellBg: remapBg(block.cellBg, (r, c) => [r >= at ? r + 1 : r, c]),
  };
}

/** 刪第 at 列。只剩一列時不刪。 */
export function deleteRow(block: TableBlock, at: number): TableBlock {
  if (block.rows <= 1) return block;
  const cells = squareCells(block).filter((_, r) => r !== at);
  const heights = block.rowHeights?.filter((_, r) => r !== at);
  return {
    ...block,
    rows: block.rows - 1,
    cells,
    rowHeights: heights,
    cellBg: remapBg(block.cellBg, (r, c) => (r === at ? null : [r > at ? r - 1 : r, c])),
  };
}

/** 把第 from 列搬到第 to 列的位置。 */
export function moveRow(block: TableBlock, from: number, to: number): TableBlock {
  if (from === to || from < 0 || to < 0 || from >= block.rows || to >= block.rows) return block;
  const order = Array.from({ length: block.rows }, (_, i) => i);
  order.splice(from, 1);
  order.splice(to, 0, from);
  const square = squareCells(block);
  const pos = new Map(order.map((old, i) => [old, i]));
  return {
    ...block,
    cells: order.map((r) => square[r]),
    rowHeights: block.rowHeights ? order.map((r) => block.rowHeights![r]) : undefined,
    cellBg: remapBg(block.cellBg, (r, c) => [pos.get(r)!, c]),
  };
}

/**
 * rowHeights 裡沒設的列存 0（表示「用預設」）。全部都是 0 就整個拿掉，
 * 免得資料裡留一串沒有意義的零。
 */
function normalizeHeights(heights: (number | undefined)[], rows: number): number[] | undefined {
  const out = Array.from({ length: rows }, (_, i) => heights[i] || 0);
  return out.some((h) => h > 0) ? out : undefined;
}

/** 設某一列的下限高度。 */
export function setRowHeight(block: TableBlock, r: number, height: number): TableBlock {
  const heights = Array.from({ length: block.rows }, (_, i) => block.rowHeights?.[i] ?? 0);
  heights[r] = Math.max(0, Math.round(height));
  return { ...block, rowHeights: normalizeHeights(heights, block.rows) };
}

/** 設全部欄寬（百分比）。呼叫端保證總和 100。 */
export function setColWidths(block: TableBlock, widths: number[]): TableBlock {
  return { ...block, colWidths: widths };
}

/** 設單格底色。null 清掉。 */
export function setCellBg(block: TableBlock, r: number, c: number, color: string | null): TableBlock {
  const next: Record<string, string> = { ...block.cellBg };
  if (color) next[key(r, c)] = color;
  else delete next[key(r, c)];
  return { ...block, cellBg: Object.keys(next).length > 0 ? next : undefined };
}

/**
 * 套用快速樣式。
 *
 * 照 Figma：點了快速樣式之後，單格底色與框線顏色都回到未選取——
 * 快速樣式的意思就是「整張重來」，不是疊在老師調過的顏色上。
 */
export function applyPreset(block: TableBlock, preset: TablePreset): TableBlock {
  return {
    ...block,
    preset,
    cellBg: undefined,
    borderColor: undefined,
    borderWidth: preset === 'borderless' ? 0 : undefined,
  };
}

/** 調整表格尺寸（列數與欄數）。保留已有內容與樣式，新增的補空字串，刪除的欄列被截掉。 */
export function resizeTable(block: TableBlock, newRows: number, newCols: number): TableBlock {
  const targetRows = Math.max(1, newRows);
  const targetCols = Math.max(1, newCols);
  let next = block;
  while (next.rows < targetRows) next = insertRow(next, next.rows);
  while (next.rows > targetRows) next = deleteRow(next, next.rows - 1);
  while (next.cols < targetCols) next = insertCol(next, next.cols);
  while (next.cols > targetCols) next = deleteCol(next, next.cols - 1);
  return next;
}
