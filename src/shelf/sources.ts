import { findTextbook, textbookDoc } from './catalog';
import { adoptedFrom, findBook, isOriginal, loadBookDoc } from './library';
import { chaptersOf } from './chapters';
import type { Doc } from '../model/types';

/**
 * 一本數位教科書（原本）在書櫃上要顯示的東西。原本有兩種來源：
 * 內建的（catalog.ts，出版社上稿的範例）與管理員從空白本建立的（library.ts 的 original）。
 * 副本只記 sourceId，要顯示科目、出版社、預設封面時都回來這裡查。
 */
export type Source = {
  id: string;
  subject: string;
  edition: string;
  publisher: string;
  title: string;
  /** 沒有封面（管理員剛建立的空白本）時，書櫃用科目色的預設封面。 */
  cover: string | null;
  /** 去掉出版社字的封面圖；沒有就用 cover。 */
  art?: string;
  /** 內建的原本不能直接改；管理員建立的可以。 */
  builtIn: boolean;
};

const RENAMED_SUBJECT: Record<string, string> = { 英語: '英語文' };

/** 民國學年度：卡片左上「115 南一」那一個數字。 */
export const rocYear = () => new Date().getFullYear() - 1911;

export function findSource(id: string): Source | null {
  const t = findTextbook(id);
  if (t) return { id: t.id, subject: t.subject, edition: t.edition, publisher: t.publisher, title: t.title, cover: t.cover, art: t.art, builtIn: true };
  const b = findBook(id);
  if (b && isOriginal(b)) {
    return {
      id: b.id,
      // 科目改過名（2026-10-22「英語」→「英語文」），舊資料讀出來時對到新名字，書櫃才不會分成兩區
      subject: RENAMED_SUBJECT[b.subject ?? ''] ?? b.subject ?? '其他',
      edition: `${new Date(b.createdAt).getFullYear() - 1911} ${b.publisher ?? ''}`.trim(),
      publisher: b.publisher ?? '',
      title: b.title,
      cover: b.cover,
      builtIn: false,
    };
  }
  return null;
}

/** 原本的內容：建立副本時從這裡拿一份乾淨的。 */
export function sourceDoc(id: string): Doc | null {
  const t = findTextbook(id);
  if (t) return textbookDoc(t);
  const doc = loadBookDoc(id);
  if (!doc) return null;
  // 10-27 前從「只有課名」的內建課本接手或複製的存檔沒有章節，建立自編時沒得勾：改用那本課本現在的章節骨架
  const root = adoptedFrom(id) ?? findBook(id)?.sourceId;
  const base = root ? findTextbook(root) : null;
  if (base && !base.md && chaptersOf(doc).every((g) => g.sections.length === 0)) return { ...textbookDoc(base), title: doc.title };
  return { ...doc, rows: doc.rows };
}
