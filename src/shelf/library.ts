/**
 * 老師的自編教材清單（書櫃的「自編教材」與「共享教材」）。
 *
 * 書櫃有三種教材，是同一份教材在不同階段的樣子（規則寫在 Notion PRD「書櫃｜三種教材的關係與版本管理」）：
 *   數位教科書  出版社／系統管理員上稿的原本：內建的在 catalog.ts；管理員從空白本建立的存在這裡（kind = original）
 *   自編教材    老師從數位教科書建立的副本，存在這裡（kind = copy）
 *   共享教材    自編教材按了「共享」（shared = true）
 *
 * 原型沒有後端：清單一個 key，每本的內容各一個 key，都在 localStorage。
 * 封面存成裁切好的小張 data URL（約 460×570），整份清單才不會撐爆 localStorage。
 */

import type { Doc } from '../model/types';

export type MyBook = {
  id: string;
  /** original＝管理員從空白本建立的數位教科書；copy＝老師的自編（副本）。舊資料沒有這個欄位，一律當副本。 */
  kind?: 'original' | 'copy';
  /** 副本：從哪一本數位教科書建立的（catalog.ts 或 original 的 id）。原本：空字串。 */
  sourceId: string;
  /** 原本才有：書櫃分區的科目與出版社。副本跟著原本走。 */
  subject?: string;
  publisher?: string;
  title: string;
  /** 老師上傳並裁切過的封面；沒有就用原本的封面。 */
  cover: string | null;
  shared: boolean;
  createdAt: number;
  updatedAt: number;
};

const LIB_KEY = 'ds-editor:library:v1';
const bookKey = (id: string) => `ds-editor:book:${id}`;
// 書櫃之前只有一份教材，存在這個 key。第一次打開書櫃時把它收成一本自編教材，老師之前編的不會不見
const LEGACY_DOC_KEY = 'ds-editor:doc:v2';

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((fn) => fn());
export function subscribeLibrary(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function read(): MyBook[] {
  try {
    const raw = localStorage.getItem(LIB_KEY);
    const list = raw ? (JSON.parse(raw) as MyBook[]) : null;
    if (Array.isArray(list)) return list;
  } catch {
    // 壞掉就當空的
  }
  return migrateLegacy();
}

function write(list: MyBook[]) {
  try {
    localStorage.setItem(LIB_KEY, JSON.stringify(list));
  } catch {
    // 配額不足：原型不擋，下一次再試
  }
  cache = list;
  notify();
}

function migrateLegacy(): MyBook[] {
  try {
    const raw = localStorage.getItem(LEGACY_DOC_KEY);
    if (!raw) return [];
    const doc = JSON.parse(raw) as Doc;
    if (!doc || !Array.isArray(doc.rows)) return [];
    const id = `book-${Date.now().toString(36)}`;
    localStorage.setItem(bookKey(id), raw);
    const now = Date.now();
    const list: MyBook[] = [
      { id, sourceId: doc.meta?.subject === '自然' ? 'demo' : 'mulan', title: doc.title, cover: null, shared: false, createdAt: now, updatedAt: now },
    ];
    localStorage.setItem(LIB_KEY, JSON.stringify(list));
    localStorage.removeItem(LEGACY_DOC_KEY);
    return list;
  } catch {
    return [];
  }
}

let cache: MyBook[] | null = null;
/** 新建的排最前面。給 useSyncExternalStore 用，同一份清單回傳同一個陣列。 */
export function listBooks(): MyBook[] {
  cache ??= read();
  return cache;
}

export const findBook = (id: string) => listBooks().find((b) => b.id === id) ?? null;

export function loadBookDoc(id: string): Doc | null {
  try {
    const raw = localStorage.getItem(bookKey(id));
    return raw ? (JSON.parse(raw) as Doc) : null;
  } catch {
    return null;
  }
}

/** 存內容，順手把書名與更新時間同步到清單（書櫃卡片顯示的是清單裡的書名）。存不進去（空間滿了）回傳 false。 */
export function saveBookDoc(id: string, doc: Doc): boolean {
  let ok = true;
  try {
    localStorage.setItem(bookKey(id), JSON.stringify(doc));
  } catch {
    ok = false;
  }
  const list = listBooks();
  const i = list.findIndex((b) => b.id === id);
  if (i < 0) return ok;
  // 原本（管理員建立的）在教材設定改了出版社，書櫃卡片上的「115 南一」也要跟著變
  const publisher = list[i].kind === 'original' ? doc.meta.publisher ?? '' : list[i].publisher;
  if (list[i].title !== doc.title || list[i].publisher !== publisher || Date.now() - list[i].updatedAt > 5000) {
    write(list.map((b, j) => (j === i ? { ...b, title: doc.title, publisher, updatedAt: Date.now() } : b)));
  }
  return ok;
}

export const isOriginal = (b: MyBook) => b.kind === 'original';

export function createBook(sourceId: string, doc: Doc, original?: { subject: string; publisher: string }): MyBook {
  const now = Date.now();
  const book: MyBook = {
    id: `book-${now.toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    kind: original ? 'original' : 'copy',
    ...original,
    sourceId,
    title: doc.title,
    cover: null,
    shared: false,
    createdAt: now,
    updatedAt: now,
  };
  try {
    localStorage.setItem(bookKey(book.id), JSON.stringify(doc));
  } catch {
    // 同 write
  }
  write([book, ...listBooks()]);
  return book;
}

export function updateBook(id: string, patch: Partial<Pick<MyBook, 'title' | 'cover' | 'shared' | 'publisher' | 'subject'>>) {
  write(listBooks().map((b) => (b.id === id ? { ...b, ...patch, updatedAt: Date.now() } : b)));
}

export function deleteBook(id: string) {
  try {
    localStorage.removeItem(bookKey(id));
  } catch {
    // 同 write
  }
  write(listBooks().filter((b) => b.id !== id));
}
