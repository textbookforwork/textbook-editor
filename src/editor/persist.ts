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
import { ensureUniqueDocIds, withoutModules } from '../model/document';
import type { Doc } from '../model/types';

const DOC_KEY = 'ds-editor:doc';
const SHARE_KEY = 'ds-editor:share';
const AUTOSAVE_DELAY = 1000;

/** 存整份教材。localStorage 滿了或被關掉（隱私模式）就靜靜略過，不中斷編輯。 */
export function saveDoc(doc: Doc): void {
  try {
    localStorage.setItem(DOC_KEY, JSON.stringify(doc));
  } catch {
    // 配額不足或 storage 不可用：原型不需要警告，下一次自動存會再試。
  }
}

/** 讀回上次存的教材；沒有或壞掉就回 null，由呼叫端決定用什麼開啟。 */
export function loadDoc(): Doc | null {
  try {
    const raw = localStorage.getItem(DOC_KEY);
    if (!raw) return null;
    const doc = JSON.parse(raw) as Doc;
    // 最低限度的形狀檢查：舊版本存的東西結構不同時，寧可從頭開始也不要炸在半路。
    if (!doc || typeof doc !== 'object' || !Array.isArray(doc.rows)) return null;
    return withoutModules(ensureUniqueDocIds(doc));
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

/** 共享狀態。封面只記 assetId，理由與上面相同：換成真的上傳 API 就接得回來。 */
export type ShareState = {
  shared: boolean;
  coverAssetId: string | null;
};

export function loadShare(): ShareState {
  try {
    const raw = localStorage.getItem(SHARE_KEY);
    if (raw) {
      const s = JSON.parse(raw) as Partial<ShareState>;
      return { shared: s.shared === true, coverAssetId: s.coverAssetId ?? null };
    }
  } catch {
    // 壞掉就當沒共享過
  }
  return { shared: false, coverAssetId: null };
}

export function saveShare(state: ShareState): void {
  try {
    localStorage.setItem(SHARE_KEY, JSON.stringify(state));
  } catch {
    // 同 saveDoc
  }
}
