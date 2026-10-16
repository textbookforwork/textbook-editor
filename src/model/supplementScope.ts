import { textOf } from './document';
import { readyPopups } from './popups';
import type { Page } from './paginate';
import type { Block, Doc, Row } from './types';

/**
 * 閱讀模式補充資源面板的三種範圍：這一頁、這一節、這一章。
 *
 * 章、節跟目次同一個來源：md 的 `#` 是章（lessonTitle）、`##` 是節（sectionTitle），
 * 由內容的角色算出來，不另外存。老師把標題改成內文，範圍就跟著變。
 */
export type ScopeKind = 'page' | 'section' | 'chapter';

export type ScopeEntry = {
  block: Block;
  /** 這個元件第一次出現在第幾頁（0 起算）。被切成兩頁的段落算前一頁。 */
  page: number;
  rowId: string;
};

export type Scope = { kind: ScopeKind; title: string; entries: ScopeEntry[] };

const headingOf = (row: Row, role: 'lessonTitle' | 'sectionTitle'): string | null => {
  for (const col of row.columns)
    for (const b of col.blocks)
      if (b.type === 'text' && b.role === role) {
        const t = textOf(b).trim();
        if (t) return t;
      }
  return null;
};

/** 從一頁裡撈出有掛補充的元件。被切成兩頁的段落在兩頁都會出現，同一個元件只算一次。 */
export function supplementBlocksOf(page: Page): Block[] {
  const seen = new Set<string>();
  const out: Block[] = [];
  for (const item of page.items)
    for (const col of item.row.columns)
      for (const b of col.blocks) {
        if (readyPopups(b).length === 0 || seen.has(b.id)) continue;
        seen.add(b.id);
        out.push(b);
      }
  return out;
}

/**
 * 某一頁所在的節與章，各自含哪些有補充的元件。
 * 這一頁在第一個 `#` 之前就沒有章；在章裡但還沒進到任何 `##` 就沒有節。
 * 屬於哪一章節看這一頁的第一列：一頁的開頭決定它在目次裡的位置。
 */
export function scopesOf(doc: Doc, pages: Page[], pageIndex: number): { section?: Scope; chapter?: Scope } {
  const pageByRow = new Map<string, number>();
  pages.forEach((p) => p.items.forEach((i) => pageByRow.has(i.row.id) || pageByRow.set(i.row.id, p.index)));

  const firstRow = pages[pageIndex]?.items[0]?.row.id;
  const at = doc.rows.findIndex((r) => r.id === firstRow);
  if (at < 0) return {};

  // 往前找這一頁屬於哪一章、哪一節
  let chapterStart = -1;
  let sectionStart = -1;
  for (let i = at; i >= 0; i--) {
    if (sectionStart < 0 && headingOf(doc.rows[i], 'sectionTitle')) sectionStart = i;
    if (headingOf(doc.rows[i], 'lessonTitle')) {
      chapterStart = i;
      break;
    }
  }
  // 節在章標題之前 = 那是上一章的節，不算
  if (sectionStart < chapterStart) sectionStart = -1;

  const collect = (from: number, stop: (row: Row) => boolean): ScopeEntry[] => {
    const out: ScopeEntry[] = [];
    for (let i = from; i < doc.rows.length; i++) {
      const row = doc.rows[i];
      if (i > from && stop(row)) break;
      for (const col of row.columns)
        for (const b of col.blocks)
          if (readyPopups(b).length > 0) out.push({ block: b, page: pageByRow.get(row.id) ?? 0, rowId: row.id });
    }
    return out;
  };

  const isChapter = (r: Row) => !!headingOf(r, 'lessonTitle');
  const result: { section?: Scope; chapter?: Scope } = {};
  if (chapterStart >= 0)
    result.chapter = {
      kind: 'chapter',
      title: headingOf(doc.rows[chapterStart], 'lessonTitle')!,
      entries: collect(chapterStart, isChapter),
    };
  if (sectionStart >= 0)
    result.section = {
      kind: 'section',
      title: headingOf(doc.rows[sectionStart], 'sectionTitle')!,
      entries: collect(sectionStart, (r) => isChapter(r) || !!headingOf(r, 'sectionTitle')),
    };
  return result;
}
