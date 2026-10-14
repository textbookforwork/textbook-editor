import type { InlineSpan } from './types';
import { zhuyinOfChar, zhuyinOfText } from './zhuyin';

/**
 * 行內樣式陣列的純函式操作。
 *
 * 分頁把長段落切成兩頁、行內編輯把改過的片段寫回原文，用的是同一組操作：
 * 都是「用字元位置切開或接起一串帶標記的文字」。
 *
 * 以前這件事是用 spans.map(s => s.text).join('') 攤平成純文字做的，
 * 於是跨頁的段落一到第二頁就沒有注音、重點詞和注釋號了——
 * 〈五柳先生傳〉的正文正好跨頁。
 */

export const plainOf = (spans: InlineSpan[]) => spans.map((s) => s.text).join('');

export const lengthOf = (spans: InlineSpan[]) => plainOf(spans).length;

/**
 * 沒有文字、只帶注釋號的標記段。
 *
 * 注釋號在課文裡是一個位置不是一段字（md 的 `[^1]`），
 * md 匯入時就是這個形狀。合併與切片都不能把它當成空字串丟掉，
 * 否則老師一打字，那一課的 25 條注釋就全斷了。
 */
export const isFootnoteMarker = (s: InlineSpan) => !s.text && !!s.footnoteRef;

/** 兩段的標記是否完全相同。注音自成一段，永遠不合併。 */
export function sameMarks(a: InlineSpan, b: InlineSpan): boolean {
  if (a.ruby || b.ruby) return false;
  return (
    !!a.bold === !!b.bold &&
    !!a.underline === !!b.underline &&
    !!a.strike === !!b.strike &&
    !!a.overline === !!b.overline &&
    !!a.keyword === !!b.keyword &&
    normalColor(a.color) === normalColor(b.color) &&
    (a.fontFamily ?? undefined) === (b.fontFamily ?? undefined) &&
    (a.popupId ?? undefined) === (b.popupId ?? undefined) &&
    a.href === b.href &&
    a.footnoteRef === b.footnoteRef
  );
}

/** 'default' 跟沒設是同一件事，比對時視為相同，才不會因為一個寫了 default 就併不起來。 */
const normalColor = (c: string | undefined) => (c && c !== 'default' ? c : undefined);

/**
 * 可以對一段選取套用的標記。注釋號不在內：它是位置點不是範圍。
 */
export type SpanMarks = Pick<
  InlineSpan,
  | 'bold'
  | 'underline'
  | 'strike'
  | 'overline'
  | 'keyword'
  | 'color'
  | 'fontFamily'
  | 'popupId'
  | 'ruby'
>;

/**
 * 對字元區間 [start, end) 套上（或拿掉）一組標記。
 *
 * patch 裡值為 undefined 的欄位代表「拿掉」——例如把顏色清回預設、
 * 把補充的連結解掉。其餘欄位原樣保留，所以在已經是粗體的字上加底線，
 * 粗體不會掉。
 */
export function markSpans(
  spans: InlineSpan[],
  start: number,
  end: number,
  patch: Partial<SpanMarks>
): InlineSpan[] {
  if (start >= end) return spans;
  const marked = sliceSpans(spans, start, end).map((s) => {
    const next: InlineSpan = { ...s };
    for (const key of Object.keys(patch) as (keyof SpanMarks)[]) {
      const value = patch[key];
      if (value === undefined || value === false || value === 'default' || value === '')
        delete next[key];
      else (next as Record<string, unknown>)[key] = value;
    }
    return next;
  });
  return spliceSpans(spans, start, end, marked);
}

/**
 * 判斷這一段 spans 裡所有可注音的中文字是否都已經標了注音。
 *
 * 「整段都已經是」才算開著——半段是的時候按下去應該是全部套上，再按一次才全部清掉。
 */
export function hasAllRuby(spans: InlineSpan[]): boolean {
  let hasRuby = false;
  for (const s of spans) {
    if (isFootnoteMarker(s) || !s.text) continue;
    if (s.ruby) {
      hasRuby = true;
      continue;
    }
    for (const ch of s.text) {
      if (zhuyinOfChar(ch)) return false;
    }
  }
  return hasRuby;
}

/**
 * 對字元區間 [start, end) 直接切換注音（按一下自動標上，再按一下清除）。
 *
 * - 若區間內所有可注音的中文字都已有注音 → 全部清除。
 * - 否則依全文語境自動查表逐字補上注音（原本已標注音的字保留原讀音）。
 */
export function toggleRubySpans(spans: InlineSpan[], start: number, end: number): InlineSpan[] {
  if (start >= end) return spans;
  const picked = sliceSpans(spans, start, end);
  if (hasAllRuby(picked)) {
    return markSpans(spans, start, end, { ruby: undefined });
  }

  const readings = zhuyinOfText(plainOf(spans));
  const out: InlineSpan[] = [];
  let offset = start;
  let changed = false;

  for (const s of picked) {
    if (isFootnoteMarker(s)) {
      out.push({ ...s });
      continue;
    }
    if (s.ruby) {
      out.push({ ...s });
      offset += s.text.length;
      continue;
    }
    for (let i = 0; i < s.text.length; i++) {
      const ch = s.text[i];
      const zy = readings[offset + i];
      const isLast = i === s.text.length - 1;
      const piece: InlineSpan = { ...s, text: ch };
      if (!isLast && piece.footnoteRef) delete piece.footnoteRef;
      if (zy) {
        piece.ruby = zy;
        changed = true;
      }
      out.push(piece);
    }
    offset += s.text.length;
  }

  if (!changed) return spans;
  return spliceSpans(spans, start, end, out);
}

/**
 * 對字元區間 [start, end) 設定或清除注音（ruby）。
 *
 * - 空字串或 undefined → 清除區間內的注音。
 * - 若選了多個字（例「閑靜」）且輸入以空白分隔、數量相等的注音（例「ㄒㄧㄢˊ ㄐㄧㄥˋ」），
 *   自動逐字拆開對應，讓每個字各自成為獨立的 <ruby>。
 * - 其餘情況整段選取共用同一個 <ruby>。
 */
export function setRubySpans(
  spans: InlineSpan[],
  start: number,
  end: number,
  ruby: string | undefined
): InlineSpan[] {
  if (start >= end) return spans;
  const trimmed = ruby?.trim() ?? '';
  if (!trimmed) {
    return markSpans(spans, start, end, { ruby: undefined });
  }
  const len = end - start;
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (len > 1 && parts.length === len) {
    const chars: InlineSpan[] = [];
    for (let i = 0; i < len; i++) {
      const piece = sliceSpans(spans, start + i, start + i + 1);
      for (const s of piece) {
        if (isFootnoteMarker(s)) chars.push(s);
        else chars.push({ ...s, ruby: parts[i] });
      }
    }
    return spliceSpans(spans, start, end, chars);
  }
  const picked = sliceSpans(spans, start, end);
  const text = plainOf(picked);
  const base = picked.find((s) => !isFootnoteMarker(s)) ?? { text };
  const footnotes = picked.filter(isFootnoteMarker);
  return spliceSpans(spans, start, end, [{ ...base, text, ruby: trimmed }, ...footnotes]);
}

/** 把相鄰且標記相同的段落併起來，避免每打一個字就多一段。 */
export function mergeSpans(spans: InlineSpan[]): InlineSpan[] {
  const out: InlineSpan[] = [];
  for (const s of spans) {
    if (isFootnoteMarker(s)) {
      out.push({ ...s });
      continue;
    }
    if (!s.text) continue;
    const last = out[out.length - 1];
    if (last && sameMarks(last, s)) last.text += s.text;
    else out.push({ ...s });
  }
  return out;
}

/**
 * 取出字元區間 [start, end)，標記跟著走。
 *
 * 注音被切一半時只留字、不留注音——半個注音貼在半個詞上是錯的，
 * 寧可少一個注音也不要標錯位置。
 */
export function sliceSpans(spans: InlineSpan[], start: number, end: number): InlineSpan[] {
  const out: InlineSpan[] = [];
  let pos = 0;

  for (const s of spans) {
    const from = pos;
    const to = pos + s.text.length;
    pos = to;

    // 注釋號沒有寬度，用「它落在哪個位置」判斷。屬於它前面那個字，
    // 所以區間的結尾算含它、開頭算不含。
    if (isFootnoteMarker(s)) {
      if (from > start && from <= end) out.push({ ...s });
      continue;
    }

    if (to <= start) continue;
    if (from >= end) break;

    const a = Math.max(start, from) - from;
    const b = Math.min(end, to) - from;
    const text = s.text.slice(a, b);
    if (!text) continue;

    if (a === 0 && b === s.text.length) {
      out.push({ ...s, text });
      continue;
    }

    // 被切成兩半時，兩種標記都不能兩邊都留：
    //   注音標的是整個詞，半個詞配半個音是錯的
    //   注釋號標在這一段的結尾，只有含結尾的那一半該留著，
    //   否則跨頁的段落會在兩頁上各出現一次同一個編號
    const piece: InlineSpan = { ...s, text };
    if (s.ruby) piece.ruby = undefined;
    if (s.footnoteRef && b !== s.text.length) piece.footnoteRef = undefined;
    out.push(piece);
  }

  return mergeSpans(out);
}

/**
 * 用新的內容取代字元區間 [start, end)。
 *
 * 這是「這一頁只看得到半段課文，老師改了這半段」的寫回路徑：
 * 前後兩半原封不動，只有中間換掉。
 */
export function spliceSpans(
  spans: InlineSpan[],
  start: number,
  end: number,
  replacement: InlineSpan[]
): InlineSpan[] {
  const total = lengthOf(spans);
  const head = sliceSpans(spans, 0, start);
  const tail = sliceSpans(spans, end, total);
  const merged = mergeSpans([...head, ...replacement, ...tail]);
  return merged.length > 0 ? merged : [{ text: '' }];
}
