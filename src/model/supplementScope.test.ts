import { beforeEach, describe, expect, it } from 'vitest';
import { emptyDoc, makeRow, makeText } from './document';
import { resetIds } from './ids';
import { scopesOf } from './supplementScope';
import type { Page } from './paginate';
import type { Doc, Row, TextRole } from './types';

const withPop = (t: string) => ({ ...makeText(t), popups: [{ id: `p-${t}`, kind: 'text' as const, title: t, body: '' }] });

/** 每一列一頁，頁碼就是列的順序 */
const pagesOf = (doc: Doc): Page[] =>
  doc.rows.map((row: Row, index) => ({ index, items: [{ row }], startedBy: 'auto', usedBlockSize: 0 }) as unknown as Page);

beforeEach(resetIds);

describe('補充資源的章節範圍', () => {
  const h = (t: string, r: TextRole) => makeRow([makeText(t, r)]);
  const doc: Doc = {
    ...emptyDoc(),
    rows: [
      h('木蘭詩', 'lessonTitle'),
      h('題解', 'sectionTitle'),
      makeRow([withPop('甲')]),
      h('課文', 'sectionTitle'),
      makeRow([withPop('乙')]),
      makeRow([withPop('丙')]),
      h('下一章', 'lessonTitle'),
      makeRow([withPop('丁')]),
    ],
  };
  const pages = pagesOf(doc);
  const titles = (s?: { entries: { block: { popups: { title: string }[] } }[] }) =>
    s?.entries.map((e) => e.block.popups[0].title);

  it('章到下一個 # 為止，節到下一個 ## 為止', () => {
    const s = scopesOf(doc, pages, 4);
    expect(s.chapter?.title).toBe('木蘭詩');
    expect(titles(s.chapter)).toEqual(['甲', '乙', '丙']);
    expect(s.section?.title).toBe('課文');
    expect(titles(s.section)).toEqual(['乙', '丙']);
  });

  it('記下每個元件在第幾頁', () => {
    expect(scopesOf(doc, pages, 4).chapter?.entries.map((e) => e.page)).toEqual([2, 4, 5]);
  });

  it('章名頁還沒進到任何節：只有章', () => {
    const s = scopesOf(doc, pages, 0);
    expect(s.section).toBeUndefined();
    expect(s.chapter?.title).toBe('木蘭詩');
  });

  it('上一章的節不算進下一章', () => {
    const s = scopesOf(doc, pages, 7);
    expect(s.chapter?.title).toBe('下一章');
    expect(s.section).toBeUndefined();
    expect(titles(s.chapter)).toEqual(['丁']);
  });
});
