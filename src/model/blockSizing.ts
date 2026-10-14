import type { Block, DocSettings } from './types';
import { contentBox } from './pageSize';
import { GAP } from './spacing';

/**
 * 非文字區塊的尺寸規則。
 *
 * 這是量測與渲染的**唯一來源**。兩邊各算各的會讓分頁與畫面不一致——
 * 量測說 240、實際畫出 626，內容就會撐破頁面被切掉，看起來像滿版出血。
 *
 * 文字不走這裡：文字的高度只有瀏覽器排一次才知道。
 */

/**
 * 圖片預設佔一頁的多少。
 *
 * 曾經讓圖片吃滿欄寬，理由是要跟文字對齊同一組邊界。但實際編起來
 * 才發現代價太大：4:3 的頁面下，一張 3:2 的圖吃滿欄寬就是 597px，
 * 佔掉整頁的 93%——插一張圖就等於用掉一頁，老師沒辦法圖文混排。
 *
 * 所以改成「先照比例算，超過這個比例就縮」。老師要放大就自己調
 * （ImageBlock.widthPct），那是他的決定；預設值要讓他有空間繼續編。
 */
const MAX_SHARE_OF_PAGE = 0.45;

/** 圖片實際顯示的長寬比：有裁切就用裁切後的比例（量測與渲染都走這裡）。 */
export function imageRatio(block: { aspectRatio: number; crop?: { w: number; h: number } }): number {
  const c = block.crop;
  return c && c.w > 0 && c.h > 0 ? (block.aspectRatio * c.w) / c.h : block.aspectRatio;
}

/** 圖形（矩形、圓角矩形、對話框）沒設寬度時的預設欄寬百分比。 */
export const SHAPE_DEFAULT_WIDTH_PCT = 25;

/** 沒有內在比例的區塊，就用固定的 block 尺寸。 */
const FIXED: Record<string, number> = {
  audio: 64,
  // 圖形與線段都是「方框」：裡面怎麼畫（圓、尖角、端點）不影響框的大小，
  // 對話框的尖角畫在框外。所以只有框要量，框的高沒拖過就用這個
  shape: 120,
  line: 80,
  web: 112,
  // 一頁 A4 在欄寬內大約要這個高度才讀得到字；老師嫌高可以拖外框改
  pdf: 480,
  dialogue: 88,
  reference: 40,
  module: 200,
  question: 220,
};

/**
 * 表格的幾何常數。頁座標。
 *
 * 表格的高度**不在這裡算**——格子裡的字會換行，高度只有瀏覽器排一次才知道，
 * 所以表格跟文字一樣交給 domMeasurer 真的去量。這裡只定義「每一列至少多高」
 * 「格子內距多少」這些量測與渲染都要用到的數字；兩邊共用，量到的才等於畫出來的。
 */
/** 一列的預設下限。老師拖格線調過的列高存在 TableBlock.rowHeights，蓋過這個值。 */
export const TABLE_ROW = 36;
/** 直排時表格橫著放，一欄佔的寬。直排的表格不在範圍內（已確認），只求不撐破頁。 */
export const TABLE_COL = 160;
/** 格子的內距：上下、左右。 */
export const TABLE_PAD_Y = 6;
export const TABLE_PAD_X = 10;
/** 框線預設粗細。 */
export const TABLE_BORDER = 1;
/** 截斷提示那一條帶子的高度。放不下的表格最後這一段要留給提示，不能被格子蓋掉。 */
export const TABLE_HINT = 32;

/** 每一欄佔表寬的百分比。沒設就平分；數量對不上（加減過欄）也重新平分，不讓舊資料把版面拉歪。 */
export function tableColWidths(block: { cols: number; colWidths?: number[] }): number[] {
  const w = block.colWidths;
  if (w && w.length === block.cols && w.every((v) => v > 0)) {
    const sum = w.reduce((a, b) => a + b, 0);
    return w.map((v) => (v / sum) * 100);
  }
  return Array.from({ length: block.cols }, () => 100 / block.cols);
}

/** 每一列的最低高度。老師拖過的用他的，其餘用預設。 */
export function tableRowMins(block: { rows: number; rowHeights?: number[] }): number[] {
  // 存 0 代表「用預設」（見 tableOps 的 normalizeHeights）
  return Array.from({ length: block.rows }, (_, r) => block.rowHeights?.[r] || TABLE_ROW);
}

/**
 * 表格「至少」佔的 block 尺寸：每列的下限加上框線。
 *
 * 這是下限不是真值——真值要量。它的用途是在還沒量之前給一個不會太離譜的數字
 * （blockBox 的回傳、把手的外框），以及讓直排維持舊有的固定尺寸規則。
 */
export function tableMinBlockSize(block: {
  rows: number;
  rowHeights?: number[];
  borderWidth?: number;
}): number {
  const border = block.borderWidth ?? TABLE_BORDER;
  return tableRowMins(block).reduce((a, b) => a + b, 0) + border * (block.rows + 1);
}

/**
 * 一頁裝得下這張表的前幾列。
 *
 * 表格切不開（一半的表格在另一頁上沒有表頭，看不懂），所以比一頁還高的
 * 表格只能截斷。但**截斷必須說出來**——資料表格靜靜少了幾列，老師不會
 * 發現，學生看到的就是一份缺資料的課本。
 *
 * rowSizes 是每一列**量出來**的高度（渲染端從自己的 DOM 讀，探針端從探針讀），
 * 不是列數乘常數——格子換行之後每列高度都不同。
 * 回傳 null 代表整張都放得下。
 */
export function tableOverflow(
  rowSizes: number[],
  room: number
): { shown: number; hidden: number } | null {
  const total = rowSizes.reduce((a, b) => a + b, 0);
  if (total <= room) return null;
  // 提示自己要有位置，所以能用的高度要先扣掉它
  const usable = room - TABLE_HINT;
  let used = 0;
  let shown = 0;
  for (const size of rowSizes) {
    if (used + size > usable) break;
    used += size;
    shown += 1;
  }
  // 至少留一列，否則變成空表加一行警告
  shown = Math.max(1, shown);
  return { shown, hidden: rowSizes.length - shown };
}

export type SizingContext = {
  /** 該欄的 inline 尺寸（橫排＝寬，直排＝高）。 */
  inlineSize: number;
  /** 一整頁的可用 block 尺寸。 */
  maxBlockSize: number;
  vertical: boolean;
};

/**
 * 有內在長寬比的區塊（圖片、影片）在 block 軸上佔多少。
 *
 * 橫排：寬度吃滿欄寬，高度由比例決定。
 * 直排：高度吃滿欄高，寬度由比例決定——block 軸是水平的。
 */
export function aspectBlockSize(
  aspectRatio: number,
  ctx: SizingContext,
  /** 老師自己設過尺寸時，上限放寬到整頁——他的決定要算數。 */
  explicitSize = false
): number {
  const natural = ctx.vertical
    ? ctx.inlineSize * aspectRatio
    : ctx.inlineSize / aspectRatio;
  const cap = explicitSize ? ctx.maxBlockSize : ctx.maxBlockSize * MAX_SHARE_OF_PAGE;
  return Math.min(natural, cap);
}

/**
 * 區塊在 inline 與 block 兩軸上的實際尺寸。
 * 渲染時直接用這組數字設定行內樣式，畫出來的就等於量到的。
 */
export function blockBox(
  block: Block,
  ctx: SizingContext
): { inlineSize: number; blockSize: number } | null {
  if (block.type === 'text') return null;

  // 老師拖外框設過的 inline 尺寸（佔欄寬的比例）。沒設就吃滿欄寬。
  const explicit = block.widthPct != null;
  const wanted = (ctx.inlineSize * (block.widthPct ?? 100)) / 100;

  if (block.type === 'image' || block.type === 'video') {
    const ratio = block.type === 'image' ? imageRatio(block) : 16 / 9;
    // 老師調過尺寸就照他的，沒調過就用預設上限
    const blockSize = aspectBlockSize(ratio, { ...ctx, inlineSize: wanted }, explicit);
    // 若因為超出一頁而被縮小，inline 軸要跟著縮，否則會變形
    const inlineSize = ctx.vertical ? blockSize / ratio : blockSize * ratio;
    return {
      inlineSize: Math.min(inlineSize, wanted),
      blockSize,
    };
  }

  if (block.type === 'table') {
    const across = tableMinBlockSize(block);
    if (ctx.vertical) {
      // 表格永遠是橫著的格線，所以直排時它佔的是一條垂直的帶子：
      // block 軸（水平）由欄數決定，inline 軸（垂直）由列數決定。
      // 直排的表格不在範圍內，這裡維持固定尺寸，只求不撐破頁。
      const along = block.cols * TABLE_COL;
      return { inlineSize: wanted, blockSize: Math.min(along, ctx.maxBlockSize) };
    }
    // 橫排：寬由這裡決定（量測與渲染同一個數字），高只是**下限**。
    // 真正的高度由 domMeasurer 把表格放進探針量出來——格子裡的字會換行，
    // 列數乘常數算不出來。渲染端只拿這裡的 inlineSize，高度交給內容。
    return { inlineSize: wanted, blockSize: Math.min(across, ctx.maxBlockSize) };
  }

  // PDF 沒拖過高度時跟圖片、影片一樣是 16:9（插入時也一樣走 fitTwoPerPage，一頁放得下兩個）
  if (block.type === 'pdf' && block.blockSize == null) {
    const ratio = 16 / 9;
    const blockSize = aspectBlockSize(ratio, { ...ctx, inlineSize: wanted }, explicit);
    const inlineSize = ctx.vertical ? blockSize / ratio : blockSize * ratio;
    return { inlineSize: Math.min(inlineSize, wanted), blockSize };
  }

  if (block.type === 'web') {
    const webInline = (ctx.inlineSize * (block.widthPct ?? 50)) / 100;
    if (block.chosen === false) {
      // 還沒選呈現方式的空框跟空的圖片、影片一樣大（16:9），插入時三者看起來是同一種東西
      if (block.blockSize != null) {
        return { inlineSize: webInline, blockSize: Math.min(block.blockSize, ctx.maxBlockSize) };
      }
      const ratio = 16 / 9;
      const blockSize = aspectBlockSize(ratio, { ...ctx, inlineSize: webInline }, block.widthPct != null);
      const inlineSize = ctx.vertical ? blockSize / ratio : blockSize * ratio;
      return { inlineSize: Math.min(inlineSize, webInline), blockSize };
    }
    // 內嵌網頁預設佔滿一整頁：太小的網頁裡的字看不清，老師多半要它單獨一頁給學生操作
    const defaultBlock =
      block.presentation === 'embed' ? ctx.maxBlockSize
      : block.presentation === 'qr' ? 88
      : 68;
    return {
      inlineSize: webInline,
      blockSize: Math.min(block.blockSize ?? defaultBlock, ctx.maxBlockSize),
    };
  }

  if (block.type === 'shape') {
    if (block.shape === 'circle') {
      // 圓形預設兩軸等長（正圓）；老師拖過才照他設的寬高畫成橢圓或正圓
      const diameter = Math.min(
        block.blockSize ?? (block.widthPct != null ? wanted : FIXED.shape),
        ctx.inlineSize,
        ctx.maxBlockSize
      );
      const inlineSize = block.widthPct != null ? wanted : diameter;
      const blockSize = Math.min(block.blockSize ?? inlineSize, ctx.maxBlockSize);
      return { inlineSize, blockSize };
    }
    const shapeInline = (ctx.inlineSize * (block.widthPct ?? SHAPE_DEFAULT_WIDTH_PCT)) / 100;
    return {
      inlineSize: shapeInline,
      blockSize: Math.min(block.blockSize ?? FIXED.shape, ctx.maxBlockSize),
    };
  }

  // 音檔未指定寬度時預設佔 50% 欄寬（其他元件插入時已在 RowView 統一設為 widthPct: 50）
  const defaultPct = block.type === 'audio' ? 50 : 100;
  const fixedInline = (ctx.inlineSize * (block.widthPct ?? defaultPct)) / 100;
  return {
    inlineSize: fixedInline,
    blockSize: Math.min(block.blockSize ?? FIXED[block.type] ?? 120, ctx.maxBlockSize),
  };
}

/**
 * 新插入的圖片、影片、還沒選方式的網頁：預設高度要讓一頁連續放得下兩個。
 *
 * 一頁扣掉兩個之間的模組間距、再預留一個標題（課名 56 加它後面的模組間距 48，再多留一點），剩下的對半分，
 * 就是一個元件最多能多高；再依比例換回要佔欄寬幾成。只會縮、不會放大（上限仍是半欄），
 * 只在插入時套用——之後老師拖外框就照他拖的。
 */
const HEADING_ALLOWANCE = 112;

export function fitTwoPerPage(block: Block, settings: Pick<DocSettings, 'aspectRatio' | 'writingMode'>): Block {
  let ratio: number;
  if (block.type === 'image') ratio = imageRatio(block);
  else if (block.type === 'video') ratio = 16 / 9;
  else if (block.type === 'web' && block.chosen === false) ratio = 16 / 9;
  else if (block.type === 'pdf' && block.blockSize == null) ratio = 16 / 9;
  else return block;
  if (block.widthPct == null) return block;

  const box = contentBox(settings);
  const vertical = settings.writingMode === 'vertical';
  const inlineSize = vertical ? box.height : box.width;
  const blockMax = vertical ? box.width : box.height;
  const each = (blockMax - GAP.module - HEADING_ALLOWANCE) / 2;
  // 橫排：寬＝高×比例；直排：inline 是高，高＝寬÷比例
  const inline = vertical ? each / ratio : each * ratio;
  const pct = Math.floor(Math.min(block.widthPct, (inline / inlineSize) * 100));
  return pct === block.widthPct ? block : { ...block, widthPct: pct };
}
