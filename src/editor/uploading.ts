import { useSyncExternalStore } from 'react';
import { blockFor, blockFromAsset } from '../components/RowView';
import { fitTwoPerPage } from '../model/blockSizing';
import type { BlockPatch, Action } from '../model/actions';
import type { Doc } from '../model/types';
import { kindOfFile, type Asset } from './assets';
import { uploadFile } from './MediaLibrary';
import { toast } from './Toast';

/**
 * 上傳到畫布：檔案還在傳的時候，畫布上先放一個「載入中」的佔位框，傳完換成真的內容。
 *
 * 佔位框就是一個還沒有檔案的同種元件（blockFor），只是記在這裡的「上傳中」清單，
 * BlockView 看到就畫閃動的骨架、不畫空的上傳框。位置與大小先佔好，傳完不會跳版。
 * 媒體庫的上傳框（面板那一側）同時顯示轉圈；兩邊樣式不同（乙練 2026-10-22）。
 */
const uploading = new Set<string>();
const listeners = new Set<() => void>();
let version = 0;
const notify = () => {
  version += 1;
  listeners.forEach((fn) => fn());
};
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export function useIsUploading(blockId: string): boolean {
  useSyncExternalStore(subscribe, () => version);
  return uploading.has(blockId);
}

/** 原型的上傳是本機檔案、一瞬間就好，看不到載入中；至少留這麼久讓畫面出得來。正式版接後端就拿掉。 */
const MIN_VISIBLE_MS = 700;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Ed = { doc: Doc; dispatch: (a: Action) => void; select: (id: string | null) => void };

/**
 * 把一個檔案上傳並插在 index（兩列之間的縫）。回傳插好的元件 id；格式不支援或失敗回傳 null（已跳提示）。
 * PDF 不走這裡：上傳完要先選頁（媒體庫的選頁畫面）。
 */
export async function uploadIntoDoc(ed: Ed, file: File, index: number): Promise<{ blockId: string; asset: Asset } | null> {
  const kind = kindOfFile(file);
  if (kind !== 'image' && kind !== 'video' && kind !== 'audio' && kind !== 'pdf') {
    const r = await uploadFile(file);
    if ('error' in r) toast(r.error);
    return null;
  }
  const placeholder = fitTwoPerPage(blockFor(kind), ed.doc.settings);
  uploading.add(placeholder.id);
  notify();
  ed.dispatch({ type: 'insertRow', index, blocks: [placeholder] });
  const [r] = await Promise.all([uploadFile(file), sleep(MIN_VISIBLE_MS)]);
  uploading.delete(placeholder.id);
  notify();
  if ('error' in r) {
    ed.dispatch({ type: 'deleteBlock', blockId: placeholder.id });
    toast(r.error);
    return null;
  }
  // 換成真的內容：同一個元件 id，位置不動；比例照檔案重算
  const { id: _drop, ...rest } = fitTwoPerPage(blockFromAsset(r.asset), ed.doc.settings);
  void _drop;
  ed.dispatch({ type: 'patchBlock', blockId: placeholder.id, blockType: placeholder.type, patch: rest as BlockPatch });
  return { blockId: placeholder.id, asset: r.asset };
}
