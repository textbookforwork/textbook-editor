import { outlineOf, type OutlineItem } from '../model/outline';
import type { Doc } from '../model/types';

/**
 * 建立自編時可勾選的章節。
 *
 * 一份教材是一條內容流，章節不是另外存的單位，而是由標題算出來的（見 model/outline）：
 * 課名（第一層標題）是一組，底下的第二層標題各是一節。勾選的是節；
 * 一節的範圍＝從它的標題到下一個同層或更上層標題之前。
 * 課名到第一節之間的內容（例如課名本身、導言）跟著這一課走，只要有一節留下就保留。
 *
 * 這是 PRD「建立自編可選章節」的做法二：一整本是一份教材，複製部分章節＝依目次範圍複製。
 */
export type ChapterGroup = { lesson: OutlineItem | null; sections: OutlineItem[] };

export function chaptersOf(doc: Doc): ChapterGroup[] {
  const groups: ChapterGroup[] = [];
  for (const item of outlineOf(doc)) {
    if (item.depth === 0) groups.push({ lesson: item, sections: [] });
    else if (item.depth === 1) {
      if (groups.length === 0) groups.push({ lesson: null, sections: [] });
      groups[groups.length - 1].sections.push(item);
    }
  }
  return groups;
}

/** 只留勾選的節（以節標題的 rowId 表示），回傳新的一份教材。 */
export function keepSections(doc: Doc, keep: Set<string>): Doc {
  const outline = outlineOf(doc).filter((i) => i.depth <= 1);
  const headingAt = new Map(outline.map((i) => [i.rowId, i]));

  // 先算每一課有沒有留下任何一節，課名與導言才知道要不要留
  const lessonKept = new Map<string, boolean>();
  let lesson = '';
  for (const i of outline) {
    if (i.depth === 0) lesson = i.rowId;
    else if (keep.has(i.rowId)) lessonKept.set(lesson, true);
  }

  let currentLesson = '';
  let currentSection: string | null = null;
  const rows = doc.rows.filter((row) => {
    const h = headingAt.get(row.id);
    if (h?.depth === 0) {
      currentLesson = row.id;
      currentSection = null;
    } else if (h?.depth === 1) currentSection = row.id;
    return currentSection ? keep.has(currentSection) : lessonKept.get(currentLesson) === true;
  });
  // 第一列前面不該有換頁：被刪掉的那幾節原本可能是第一頁
  if (rows[0]?.breakBefore) rows[0] = { ...rows[0], breakBefore: false };
  return { ...doc, rows };
}
