import { describe, expect, it } from 'vitest';
import { chaptersOf, keepSections } from './chapters';
import { findTextbook, textbookDoc } from './catalog';
import { outlineOf } from '../model/outline';

describe('建立自編的章節', () => {
  const doc = textbookDoc(findTextbook('mulan')!);

  it('木蘭詩：課名一組，底下是題解、課文、語文小視窗', () => {
    const groups = chaptersOf(doc);
    expect(groups).toHaveLength(1);
    expect(groups[0].lesson?.text).toBe('木蘭詩');
    expect(groups[0].sections.map((s) => s.text)).toEqual(['題解', '課文', '語文小視窗']);
  });

  it('只勾課文：題解與語文小視窗拿掉，課名留著', () => {
    const [{ sections }] = chaptersOf(doc);
    const kept = keepSections(doc, new Set([sections[1].rowId]));
    const titles = outlineOf(kept).filter((i) => i.depth <= 1).map((i) => i.text);
    expect(titles).toEqual(['木蘭詩', '課文']);
    expect(kept.rows[0].breakBefore).toBe(false);
  });

  it('全部都不勾：什麼都不留', () => {
    expect(keepSections(doc, new Set()).rows).toHaveLength(0);
  });
});
