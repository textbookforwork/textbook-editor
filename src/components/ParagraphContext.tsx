import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { paragraphIndex, type ParaInfo } from '../model/paragraphs';
import type { Row } from '../model/types';
import { circled, wordNoteNumbers } from '../model/wordNotes';

/**
 * 段號要看整份文件才算得出來，但畫段號的 RowView 只拿得到自己那一列，
 * 所以由 App 算一次往下傳。縮圖、編輯、閱讀共用同一份，號碼不會對不上。
 */
const IndexCtx = createContext<Map<string, ParaInfo>>(new Map());

export function ParagraphProvider({ rows, children }: { rows: Row[]; children: ReactNode }) {
  const index = useMemo(() => paragraphIndex(rows), [rows]);
  const nos = useMemo(() => wordNoteNumbers(rows), [rows]);
  return (
    <IndexCtx.Provider value={index}>
      <NoteNoCtx.Provider value={nos}>{children}</NoteNoCtx.Provider>
    </IndexCtx.Provider>
  );
}

export const useParagraphIndex = () => useContext(IndexCtx);

/** 生字詞的號碼（①②）也要看整份文件才算得出來，跟段號同一個地方算、往下傳。 */
const NoteNoCtx = createContext<Map<string, number>>(new Map());
export const useWordNoteNumbers = () => useContext(NoteNoCtx);
/** 給 spansToHtml 的號碼函式 */
export function useNoteNo() {
  const nos = useContext(NoteNoCtx);
  return useCallback((id: string) => {
    const n = nos.get(id);
    return n ? circled(n) : undefined;
  }, [nos]);
}

/**
 * 閱讀時聚焦哪一段。只有閱讀模式提供；編輯與縮圖拿到 null，段號就只是記號。
 *
 * el 是被點的段號：右側的圓形按鈕彈泡泡時，泡泡對準這一段的元件（段號的父層）。
 */
export type ParaFocus = {
  focusId: string | null;
  toggle: (startId: string, el: HTMLElement) => void;
};

export const ParaFocusCtx = createContext<ParaFocus | null>(null);
export const useParaFocus = () => useContext(ParaFocusCtx);
