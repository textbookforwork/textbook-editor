import { useSyncExternalStore } from 'react';

/**
 * 畫面之間的切換：書櫃、編輯某一本自編、閱讀某一本。
 *
 * 用網址的 # 記位置（GitHub Pages 沒有伺服器，只能用 hash），重新整理會停在同一個畫面，
 * 瀏覽器的上一頁也能回書櫃。
 *   #/                     書櫃
 *   #/shelf/<分頁>/<科目>  書櫃某一科的全部教材（查看全部）
 *   #/edit/<自編 id>       編輯器
 *   #/read/<自編 id>       閱讀自編
 *   #/read/book/<課本 id>  閱讀數位教科書（原本，唯讀）
 */
export type Route =
  | { page: 'shelf'; tab?: ShelfTab; subject?: string }
  | { page: 'edit'; id: string }
  | { page: 'read'; id: string }
  | { page: 'readTextbook'; id: string };

export type ShelfTab = 'textbook' | 'shared' | 'mine';

export function parseRoute(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  if (parts[0] === 'edit' && parts[1]) return { page: 'edit', id: parts[1] };
  if (parts[0] === 'read' && parts[1] === 'book' && parts[2]) return { page: 'readTextbook', id: parts[2] };
  if (parts[0] === 'read' && parts[1]) return { page: 'read', id: parts[1] };
  const tab = parts[0] === 'shelf' ? (parts[1] as ShelfTab | undefined) : undefined;
  if (!tab || !['textbook', 'shared', 'mine'].includes(tab)) return { page: 'shelf', tab: undefined };
  return parts[2] ? { page: 'shelf', tab, subject: parts[2] } : { page: 'shelf', tab };
}

const subscribe = (fn: () => void) => {
  window.addEventListener('hashchange', fn);
  return () => window.removeEventListener('hashchange', fn);
};

export function useRoute(): Route {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash);
  return parseRoute(hash);
}

const go = (hash: string) => {
  window.location.hash = hash;
};

/** 回書櫃。從編輯器回來時停在「自編教材」分頁（設計稿：按左上角回到書櫃的自編教材）。 */
export const goShelf = (tab: ShelfTab = 'mine', subject?: string) =>
  go(`#/shelf/${tab}${subject ? `/${encodeURIComponent(subject)}` : ''}`);
export const goEdit = (id: string) => go(`#/edit/${encodeURIComponent(id)}`);
export const goRead = (id: string) => go(`#/read/${encodeURIComponent(id)}`);
export const goReadTextbook = (id: string) => go(`#/read/book/${encodeURIComponent(id)}`);
