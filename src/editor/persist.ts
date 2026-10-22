/**
 * 本機儲存。
 *
 * 原型沒有後端，教材存進瀏覽器的 localStorage。整份 Doc 是純 JSON
 * （沒有 Map、Date、函式），所以直接 stringify 就能存。
 *
 * ⚠️ 限制：上傳的圖片與影片存不回來。
 * `assets.ts` 把上傳的檔案存成 object URL，那個 URL 只活在這一次的分頁，
 * 重新整理後 `urlOf(assetId)` 查不到東西，畫面上會是空的媒體框。
 * 這裡**刻意保留 assetId 不清掉**：接上真的上傳 API 之後，`urlOf` 能依
 * assetId 回查到 CDN 網址，舊教材就自動接回來，資料不必重新整理。
 * （內建範例的圖走 `sampleMedia`，id 對得到檔案，重新整理後還在。）
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { ensureUniqueDocIds, oneBlockPerColumn, withoutModules } from '../model/document';
import type { Doc } from '../model/types';
import { footnotesToWordNotes } from '../model/wordNotes';
import { withCurrentFonts } from '../model/fonts';
import { findBook, loadBookDoc, saveBookDoc, updateBook } from '../shelf/library';
import { toast } from './Toast';

const AUTOSAVE_DELAY = 1000;

/**
 * 正在編的是哪一本自編教材（書櫃的清單見 shelf/library.ts）。
 * 編輯器一次只開一本，由 App 打開時設定；存檔、共享狀態都寫到這一本。
 */
let activeBookId: string | null = null;
export function setActiveBook(id: string | null) {
  activeBookId = id;
}

/**
 * 正在編的是不是數位教科書的原本（管理員從空白本建立的）。
 * 原本的「共享」叫「發布」：發布了才上架到書櫃，老師才看得到、能建副本。
 */
export const isActiveOriginal = () => (activeBookId ? findBook(activeBookId)?.kind === 'original' : false);

/**
 * 存整份教材。localStorage 滿了或被關掉（隱私模式）不中斷編輯，但要讓老師知道：
 * 跳一次提示，存回來之前不重複跳。正式版改成存到後端、網路回來後補存。
 */
let failed = false;
export function saveDoc(doc: Doc): void {
  if (!activeBookId) return;
  const ok = saveBookDoc(activeBookId, doc);
  if (!ok && !failed) toast('存不進去：這台瀏覽器的空間滿了。刪掉用不到的教材或大圖，下次修改時會再存');
  failed = !ok;
}

/** 讀回這一本存的內容；沒有或壞掉就回 null。 */
export function loadDoc(id: string): Doc | null {
  try {
    const doc = loadBookDoc(id);
    // 最低限度的形狀檢查：舊版本存的東西結構不同時，寧可從頭開始也不要炸在半路。
    if (!doc || typeof doc !== 'object' || !Array.isArray(doc.rows)) return null;
    // 舊存檔裡還沒轉的注釋，讀進來時一併轉成生字詞的註釋
    // 一欄裡擠了兩個元件的舊壞資料也在這裡拆回一個元件一欄（見 oneBlockPerColumn）
    // 舊版字型選單存下的字型設定換成現在選單上的那一套（見 model/fonts.ts）
    return withCurrentFonts(oneBlockPerColumn(footnotesToWordNotes(withoutModules(ensureUniqueDocIds({ ...doc, footnotes: doc.footnotes ?? [] })))));
  } catch {
    return null;
  }
}

/**
 * 內容一改就自動存，debounce 一秒。
 *
 * 打字時每個字都會產生新的 doc，逐次 stringify 整份教材太浪費；
 * 停一秒再存，而且元件卸載時把等待中的那次補存，不漏掉最後幾個字。
 */
export function useAutosave(doc: Doc): { pending: boolean; flush: () => void } {
  const latest = useRef(doc);
  latest.current = doc;
  // 內容改了、還沒存到的那一秒鐘。按鈕據此顯示「儲存」或「已儲存」
  const [pending, setPending] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    // 剛開啟時讀進來的就是存過的那一份，不算有改動
    if (first.current) {
      first.current = false;
      return;
    }
    setPending(true);
    const timer = setTimeout(() => {
      saveDoc(latest.current);
      setPending(false);
    }, AUTOSAVE_DELAY);
    return () => clearTimeout(timer);
  }, [doc]);

  const flush = useCallback(() => {
    saveDoc(latest.current);
    setPending(false);
  }, []);

  useEffect(() => {
    return () => saveDoc(latest.current);
  }, []);

  return { pending, flush };
}

/** 共享狀態，記在書櫃清單的那一本上：共享了就出現在「共享教材」，封面是裁切好的圖。 */
export type ShareState = {
  shared: boolean;
  cover: string | null;
};

export function loadShare(): ShareState {
  const b = activeBookId ? findBook(activeBookId) : null;
  return { shared: b?.shared ?? false, cover: b?.cover ?? null };
}

export function saveShare(state: ShareState): void {
  if (activeBookId) updateBook(activeBookId, { shared: state.shared, cover: state.cover });
}
