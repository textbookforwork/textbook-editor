import { markSpans, plainOf } from './spans';
import { rangeKindOf } from './paragraphs';
import type { Block, Doc, InlineSpan, RangeNote, Row } from './types';

/**
 * 生字詞的註釋：匯入的注釋（md 的 `[^1]`）與老師在面板標的，是同一種東西、同一串號碼。
 *
 * 匯入時把注釋轉成文字元件上的 rangeNotes（kind: 'word'），字上記 noteId——
 * 之後編輯、閱讀、號碼都只走這一條，不再有第二套注釋號。
 */

/**
 * 把文件裡還掛著 footnoteRef 的注釋轉成生字詞註釋。轉得到的從 doc.footnotes 拿掉；
 * 找不到被注釋的字（例如 md 寫錯）就照舊留著，不丟資料。
 *
 * 被注釋的字通常緊接在注釋號前面（「何許[^1]」）；不是的話（「{嗜|ㄕˋ}酒[^7]」注的是「嗜」）
 * 往前找這個詞最後一次出現的位置。
 */
export function footnotesToWordNotes(doc: Doc): Doc {
  const defs = new Map(doc.footnotes.map((f) => [f.id, f]));
  if (defs.size === 0) return doc;
  const used = new Set<string>();

  const convert = (block: Block): Block => {
    if (block.type !== 'text' || !block.spans.some((s) => s.footnoteRef)) return block;
    let spans = block.spans;
    const notes: RangeNote[] = [...(block.rangeNotes ?? [])];
    // 先記下每個注釋號落在第幾個字之後
    const refs: { ref: string; at: number }[] = [];
    let pos = 0;
    for (const s of block.spans) {
      pos += s.text.length;
      if (s.footnoteRef) refs.push({ ref: s.footnoteRef, at: pos });
    }
    const plain = plainOf(block.spans);
    for (const { ref, at } of refs) {
      const def = defs.get(ref);
      if (!def) continue;
      const term = def.term;
      const start = plain.slice(at - term.length, at) === term ? at - term.length : plain.lastIndexOf(term, at - term.length);
      if (start < 0) continue;
      const id = `fn-${block.id}-${ref}`;
      spans = markSpans(spans, start, start + term.length, { noteId: id });
      notes.push({ id, kind: 'word', body: def.body });
      used.add(ref);
    }
    // 轉過去的注釋號拿掉（沒有文字的標記整個拿掉）
    spans = spans
      .map((s): InlineSpan => (s.footnoteRef && used.has(s.footnoteRef) ? { ...s, footnoteRef: undefined } : s))
      .filter((s) => s.text || s.footnoteRef);
    return { ...block, spans, rangeNotes: notes };
  };

  const rows: Row[] = doc.rows.map((row) => ({
    ...row,
    columns: row.columns.map((col) => ({ ...col, blocks: col.blocks.map(convert) })),
  }));
  return { ...doc, rows, footnotes: doc.footnotes.filter((f) => !used.has(f.id)) };
}

/** 全文的生字詞號碼：照課文出現的順序，1 起算。換頁不重編。 */
export function wordNoteNumbers(rows: Row[]): Map<string, number> {
  const out = new Map<string, number>();
  for (const row of rows) {
    for (const col of row.columns) {
      for (const b of col.blocks) {
        if (b.type !== 'text' || !b.rangeNotes?.length) continue;
        const word = new Set(b.rangeNotes.filter((n) => rangeKindOf(n) === 'word').map((n) => n.id));
        for (const s of b.spans) {
          if (s.noteId && word.has(s.noteId) && !out.has(s.noteId)) out.set(s.noteId, out.size + 1);
        }
      }
    }
  }
  return out;
}

/** ①～㊿。超過五十就寫數字（一課的注釋不會到這麼多）。 */
export function circled(n: number): string {
  if (n >= 1 && n <= 20) return String.fromCodePoint(0x2460 + n - 1);
  if (n >= 21 && n <= 35) return String.fromCodePoint(0x3251 + n - 21);
  if (n >= 36 && n <= 50) return String.fromCodePoint(0x32b1 + n - 36);
  return `(${n})`;
}
