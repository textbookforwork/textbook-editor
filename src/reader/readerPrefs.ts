import { createContext, useContext } from 'react';
import { INLINE_FONTS } from '../styles/roles';

/**
 * 閱讀設定：每個人自己的文字大小、行距、字體、要不要顯示注音。只存在這台裝置，不同步給別人。
 *
 * 只改閱讀畫面、不改教材：老師在自編設的字級、行距、字體是預設值，這裡是讀的人自己再調。
 * 字變大不重新切頁：頁只照原本的切法（換頁線、章節，或自動切頁算好的位置），老師的第 5 頁和學生的第 5 頁
 * 一定是同一頁；放不下的部分在這一頁裡捲動。自動切頁的教材因此可能被撐開，看起來不再是老師排的樣子。
 */
export type ReaderFont = 'auto' | 'kai' | 'hei';
export type ReaderPrefs = {
  /** 內文字級（px）。null＝照教材。 */
  size: number | null;
  /** 行距倍數。null＝照教材。 */
  lineHeight: number | null;
  /** auto＝預設：照教材（老師設的字體）。 */
  font: ReaderFont;
  ruby: boolean;
};

export const DEFAULT_PREFS: ReaderPrefs = { size: null, lineHeight: null, font: 'auto', ruby: true };

export const READER_FONTS: Record<Exclude<ReaderFont, 'auto'>, string> = {
  kai: INLINE_FONTS.find((f) => f.label === '標楷體')?.value ?? 'serif',
  hei: 'var(--ds-typography-font-sans)',
};

const KEY = 'ds-reader:prefs';

export function loadPrefs(): ReaderPrefs {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...DEFAULT_PREFS, ...(JSON.parse(raw) as Partial<ReaderPrefs>) } : DEFAULT_PREFS;
  } catch {
    return DEFAULT_PREFS;
  }
}

export function savePrefs(p: ReaderPrefs): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // 隱私模式或空間滿了：記不住就算了，這次閱讀照樣生效
  }
}

/**
 * 文字元件讀的閱讀設定：字級倍數、行距。編輯畫面、縮圖、量測探針都沒有包這一層，
 * 拿到的是預設值（倍數 1、不覆寫行距），所以只有閱讀畫面會變。
 */
export type ReaderText = { scale: number; lineHeight?: number };
export const ReaderTextCtx = createContext<ReaderText>({ scale: 1 });
export const useReaderText = () => useContext(ReaderTextCtx);
