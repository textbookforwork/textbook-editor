import type { CSSProperties } from 'react';
import type { TextBlock, TextRole } from '../model/types';

/**
 * 九種內容角色 → 設計系統的字級 token。
 *
 * 角色決定預設字級與字重，也是內容分類與無障礙的依據。
 * 老師可以用 TextBlock.fontSize 覆寫某一段的大小（見 roleStyle），
 * 但覆寫不改角色——「這是內文還是補充」跟「它多大」是兩件事。
 */
export const ROLE_TOKEN: Record<TextRole, string> = {
  lessonTitle: 'heading-1',
  sectionTitle: 'heading-2',
  itemTitle: 'heading-3',
  subItemTitle: 'heading-4',
  lead: 'lead',
  body: 'body-lg',
  supplement: 'body',
  annotation: 'body-sm',
  // 圖說預設 14（跟注釋同一級）：12 在平板上偏小，圖號看不清楚
  caption: 'body-sm',
};

/** 整本的字級檔位。所有角色一起等比縮放，相對關係不變。 */
export const TEXT_SCALE: Record<'sm' | 'md' | 'lg', number> = {
  sm: 0.875,
  md: 1,
  lg: 1.125,
};

export type RoleStyle = {
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  fontFamily: string;
};

/**
 * 取得某個角色的實際 CSS 值。scale 會乘進字級與行高。
 *
 * fontSize 是老師對這一段的覆寫（頁座標 px）：字級換成它、行高照角色的
 * 比例跟著等比。整本的 textScale 不再乘進來——老師指定 24 就是 24，
 * 那是他看著頁面定的絕對值，不是相對檔位。
 */
export function roleStyle(role: TextRole, scale = 1, fontSize?: number, lineHeight?: number): RoleStyle {
  const base = roleBaseStyle(role, scale, fontSize);
  // 老師設的行距蓋過角色預設；無單位，字級怎麼變都維持同一個倍數
  return lineHeight && lineHeight > 0 ? { ...base, lineHeight: String(lineHeight) } : base;
}

/** 角色預設的行距倍數，四捨五入到小數一位。行距選單顯示「目前」用。 */
export const defaultLineHeight = (role: TextRole): number =>
  Math.round(lineRatio(ROLE_TOKEN[role]) * 10) / 10;

/** 行距下拉選單的可選倍數。 */
export const LINE_HEIGHTS = [1, 1.2, 1.5, 1.8, 2, 2.5];

function roleBaseStyle(role: TextRole, scale: number, fontSize?: number): RoleStyle {
  const t = ROLE_TOKEN[role];
  const scaled = (name: string) =>
    scale === 1
      ? `var(--ds-typography-${t}-${name})`
      : `calc(var(--ds-typography-${t}-${name}) * ${scale})`;
  const weight = `var(--ds-typography-${t}-weight)`;
  // 預設字級跟 token 不同的角色（節 32、內文 20）：字級用指定值乘檔位，行高照角色比例
  const own = ROLE_SIZE[role];
  if (!(fontSize && fontSize > 0) && own) {
    return {
      fontSize: `${own * scale}px`,
      lineHeight: String(lineRatio(t)),
      fontWeight: weight,
      fontFamily: 'var(--ds-typography-font-sans)',
    };
  }
  if (fontSize && fontSize > 0) {
    return {
      fontSize: `${fontSize}px`,
      // 無單位的行高會跟著字級走，所以只要給比例
      lineHeight: String(lineRatio(t)),
      fontWeight: weight,
      fontFamily: 'var(--ds-typography-font-sans)',
    };
  }
  return {
    fontSize: scaled('size'),
    lineHeight: scaled('line-height'),
    fontWeight: weight,
    fontFamily: 'var(--ds-typography-font-sans)',
  };
}

/**
 * 角色的「行高 ÷ 字級」。從頁面上實際生效的 token 讀，不另抄一份數字——
 * 否則 tokens.css 改了比例，這裡就悄悄過期。沒有 DOM（測試）時用 1.5。
 */
const ratioCache = new Map<string, number>();
function lineRatio(token: string): number {
  const hit = ratioCache.get(token);
  if (hit !== undefined) return hit;
  let ratio = 1.5;
  if (typeof document !== 'undefined') {
    const cs = getComputedStyle(document.documentElement);
    const size = parseFloat(cs.getPropertyValue(`--ds-typography-${token}-size`));
    const lh = parseFloat(cs.getPropertyValue(`--ds-typography-${token}-line-height`));
    if (size > 0 && lh > 0) ratio = lh / size;
    else return ratio; // token 還沒載入就先不快取，下次再讀
  }
  ratioCache.set(token, ratio);
  return ratio;
}

/**
 * 預設字級跟設計 token 不一樣的角色（課本上的實際需求）：節 32、內文 20。
 * 字重與行高比例仍照原本的 token，層級關係不變。章維持 token 的 48。
 */
const ROLE_SIZE: Partial<Record<TextRole, number>> = {
  sectionTitle: 32,
  body: 20,
};

/** 各內容角色的預設字級（px）。字級選單的「預設」與顯示用這份。 */
export const ROLE_DEFAULT_SIZE: Record<TextRole, number> = {
  lessonTitle: 48,
  sectionTitle: 32,
  itemTitle: 28,
  subItemTitle: 24,
  lead: 20,
  body: 20,
  supplement: 16,
  annotation: 14,
  caption: 14,
};

/** 字級下拉選單的可選數值（含各層級預設字級）。 */
export const FONT_SIZES = [12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 56, 64, 72, 96];

/**
 * 行內可選的字體。value 是 CSS 的 font-family 值，直接存進 InlineSpan.fontFamily。
 * null 代表整本預設的黑體（不存欄位）。
 *
 * 字族名先列平板與桌機常見的系統字，再列開源字（教育部標楷、源泉圓體）；
 * 一台都沒有就退回黑體，不會變成空白。
 */
export const INLINE_FONTS: { label: string; value: string | null }[] = [
  { label: '黑體', value: null },
  {
    label: '楷體',
    value: '"Kaiti TC", "BiauKai", "TW-MOE-Std-Kai", "DFKai-SB", "TW-Kai", "Noto Serif TC", serif',
  },
  {
    label: '圓體',
    value:
      '"GenSenRounded TW", "Yuanti TC", "YuanTi TC", "Hiragino Maru Gothic ProN", "jf-openhuninn", "Noto Sans TC", sans-serif',
  },
];

/** 跟整本不同向的段落，預設佔頁面 block 軸的多少。跟圖片的預設上限同一個數字。 */
export const FLOW_SHARE_OF_PAGE = 0.45;

export type TextFlow = {
  /** 這一段實際畫成哪個方向。 */
  vertical: boolean;
  /** 跟整本的方向相反。 */
  flipped: boolean;
  /** 要套在 .ds-rich 元素上的行內樣式。量測探針與畫面共用，畫出來的才等於量到的。 */
  style: CSSProperties;
};

/**
 * 單段書寫方向的盒子。
 *
 * 跟整本同向的段落什麼都不設，尺寸由瀏覽器排版決定（可以切頁）。
 * 不同向的段落是一個固定盒子：它在頁面 block 軸上佔 blockSize（沒設就是頁的 45%），
 * 另一軸由文字的行數決定、最多到欄寬，超出就裁掉。
 *
 *   橫排頁裡的直排段落：高度固定、寬度看有幾欄字
 *   直排頁裡的橫排段落：寬度固定、高度看有幾行字
 *
 * 用實體屬性（width/height）而不是邏輯屬性：這個元素自己的 writing-mode
 * 跟頁面相反，邏輯屬性算的會是它自己的軸，不是頁面的。
 */
export function textFlowStyle(
  block: Pick<TextBlock, 'writingMode' | 'blockSize'>,
  ctx: { inlineSize: number; maxBlockSize: number; vertical: boolean }
): TextFlow {
  const vertical = block.writingMode ? block.writingMode === 'vertical' : ctx.vertical;
  const flipped = vertical !== ctx.vertical;
  if (!flipped) return { vertical, flipped, style: {} };

  const box = Math.min(block.blockSize ?? ctx.maxBlockSize * FLOW_SHARE_OF_PAGE, ctx.maxBlockSize);
  const style: CSSProperties = {
    writingMode: vertical ? 'vertical-rl' : 'horizontal-tb',
    overflow: 'hidden',
    ...(ctx.vertical
      ? { width: `${box}px`, height: 'auto', maxHeight: `${ctx.inlineSize}px` }
      : { height: `${box}px`, width: 'auto', maxWidth: `${ctx.inlineSize}px`, marginLeft: 'auto' }),
  };
  return { vertical, flipped, style };
}
