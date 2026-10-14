import { newId } from './ids';
import type { IconName } from '../assets/icons.generated';
import type { Block, PopupItem, PopupKind } from './types';

/**
 * Pop-up 是元件的屬性，不是第十種元件。
 *
 * 一個元件只掛一種類型、同一種可以多個（大彈窗只能一個）。學生點元件之後看到什麼，
 * 由種類與數量決定，規則寫在 CLAUDE.md〈Pop-up〉，實作在 viewer/PopupViewer.tsx 的 open()。
 */

export const POPUP_KIND: Record<PopupKind, { label: string; icon: IconName; action: string }> = {
  text: { label: '文字', icon: 'file-text', action: '閱讀' },
  // 排在文字旁邊：它是「文字放不下時的下一步」，老師找的時候會從文字那格往旁邊看
  rich: { label: '大彈窗', icon: 'popup', action: '開啟' },
  image: { label: '圖片', icon: 'image', action: '看大圖' },
  video: { label: '影片', icon: 'video', action: '播放' },
  audio: { label: '聲音', icon: 'music', action: '播放' },
  web: { label: '網頁', icon: 'globe', action: '開啟' },
  jump: { label: '跳轉', icon: 'arrow-up-right', action: '前往' },
};

// 跳轉放最後：它不是一份內容，是帶學生去課本的另一段
export const POPUP_KINDS: PopupKind[] = ['text', 'rich', 'image', 'video', 'audio', 'web', 'jump'];

/** 新增一項時的空白值。標題留空，由老師填。 */
export function newPopup(kind: PopupKind): PopupItem {
  const id = newId('pop');
  switch (kind) {
    case 'text':
      return { id, kind, title: '', body: '' };
    case 'image':
      return { id, kind, title: '', assetId: null };
    case 'video':
      return { id, kind, title: '', source: 'youtube', ref: '' };
    case 'audio':
      return { id, kind, title: '', assetId: null };
    case 'web':
      // embeddable 恆為 false：能不能嵌入要看對方的 X-Frame-Options，
      // 那是伺服器端的檢查，屬於後端
      return { id, kind, title: '', url: '', embeddable: false };
    case 'jump':
      return { id, kind, title: '', targetRowId: null };
    case 'rich':
      // 空的：第一個段落由老師在編輯器裡按「文字」加，不預先塞一段空白——
      // 預塞的空段落會讓「還沒填」的提示失靈
      return { id, kind, title: '', blocks: [], pages: [[]] };
  }
}

/** 這一項還缺什麼才算填完。老師要在編輯時就看得出來，不是上課才發現。 */
export function missingOf(item: PopupItem): string | null {
  switch (item.kind) {
    case 'text':
      // 標題、內容都是選填，至少要有一個——兩個都空，學生點開是一片空白
      return item.body.trim() || item.title.trim() ? null : '還沒填標題或內容';
    case 'image':
    case 'audio':
      return item.assetId ? null : '還沒選檔案';
    case 'video':
      return item.ref.trim() ? null : '還沒填影片來源';
    case 'web':
      return item.url.trim() ? null : '還沒填網址';
    case 'jump':
      return item.targetRowId ? null : '還沒選要跳到哪裡';
    case 'rich':
      return richPagesOf(item).some(hasRichContent) ? null : '還沒放內容';
  }
}

/**
 * 大彈窗算不算有內容：至少一個元件真的有東西。
 * 空白段落、還沒上傳的圖都不算——老師按了「文字」又沒打字，上課點開會是一片空白。
 */
function hasRichContent(blocks: Block[]): boolean {
  return blocks.some((b) => {
    if (b.type === 'text') return b.spans.some((s) => s.text.trim());
    if (b.type === 'image') return b.assetId !== null;
    if (b.type === 'video') return !!b.ref.trim();
    if (b.type === 'audio') return b.assetId !== null;
    if (b.type === 'web') return !!b.url.trim();
    return true;
  });
}

/** 大彈窗的每一頁。舊資料只有 blocks（一頁）。 */
export function richPagesOf(item: Extract<PopupItem, { kind: 'rich' }>): Block[][] {
  return item.pages && item.pages.length > 0 ? item.pages : [item.blocks];
}

/** 寫回大彈窗的頁：pages 存全部，blocks 同步存第 1 頁（給還只認 blocks 的地方）。 */
export function withRichPages<T extends Extract<PopupItem, { kind: 'rich' }>>(item: T, pages: Block[][]): T {
  const safe = pages.length > 0 ? pages : [[]];
  return { ...item, pages: safe, blocks: safe[0] };
}

/** 沒填標題時顯示什麼。清單上總要有字，不能是空白列。 */
export const titleOf = (item: PopupItem) => item.title.trim() || POPUP_KIND[item.kind].label;

/**
 * 角標、泡泡、補充資源只算填完的項目。沒加成功的（網址沒填、檔案沒選）不該讓學生看到一個點下去是空的角標；
 * 補充面板關掉時也會把它們刪掉，這裡是保險（例如舊檔案裡留下來的）。
 */
export function readyPopups<T extends { popups: PopupItem[] }>(block: T): PopupItem[] {
  return block.popups.filter((p) => !missingOf(p));
}
