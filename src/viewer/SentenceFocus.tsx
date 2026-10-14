import { useEffect, type RefObject } from 'react';
import { locate, offsetOf, textNodes } from '../editor/caret';

/**
 * 逐句聚焦：閱讀模式下點一句，那一句留黑、其餘調暗；雙擊標黃；
 * 方向鍵換上一句／下一句；Esc 或點空白處取消。
 *
 * 三件事決定了做法：
 *
 *  - **句子的範圍在純文字上算，不在 DOM 上算。** 一句話在 DOM 裡可能
 *    由好幾個 <span>、<ruby>、<sup> 組成；注音與注釋號又不是內文。
 *    所以先把 .ds-rich 的內文抽成一條字串（跳過 <rt> 與 sup[data-fn]，
 *    跟 editor/caret.ts 用同一套規則），在字串上切句，再把「第幾個字」
 *    換算回 DOM 位置。
 *
 *  - **高亮不改 DOM。** 量測與渲染共用同一份 HTML，若為了高亮把句子
 *    包進 <span>，量到的與畫出來的就可能不一致、頁面被撐破。
 *    CSS Custom Highlight API 只對一段 Range 套樣式，DOM 一個節點都不動。
 *    瀏覽器不支援時整個功能安靜地不啟用。
 *
 *  - **只掛在閱讀模式。** active 為 false 時什麼監聽都不掛，
 *    編輯區的 contenteditable 完全不受影響。
 */

/* ------------------------------------------------------------------ */
/* 純函式：切句與前後句。沒有 DOM，可以直接測。                         */
/* ------------------------------------------------------------------ */

export type SentenceSpan = { start: number; end: number };

/** 句末標點。歸前一句。 */
const TERMINATORS = new Set(['。', '！', '？', '；', '…', '!', '?', ';']);
/** 跟在句末標點後面的收尾符號，也歸前一句——「他說：『走吧。』」不該在句號就斷開。 */
const CLOSERS = new Set(['」', '』', '）', '】', '〕', '》', '〉', '"', "'", ')', ']']);

/**
 * 把純文字切成句子。回傳每一句在字串裡的 [start, end) 區間。
 *
 * 以句末標點與換行為界；標點（含連續的標點與收尾引號）歸前一句；
 * 換行本身不屬於任何一句；只有空白的片段不算句子。
 */
export function splitSentences(text: string): SentenceSpan[] {
  const out: SentenceSpan[] = [];
  const chars = Array.from(text);
  // 用 code unit 的位置，因為 DOM 的 offset 與 Text.length 都是 code unit
  let pos = 0;
  let start = 0;
  let i = 0;

  const flush = (end: number) => {
    if (text.slice(start, end).trim().length > 0) out.push({ start, end });
  };

  while (i < chars.length) {
    const ch = chars[i];
    const len = ch.length;

    if (ch === '\n') {
      flush(pos);
      pos += len;
      start = pos;
      i += 1;
      continue;
    }

    if (TERMINATORS.has(ch)) {
      // 吃掉後面接連的標點與收尾符號：「？！」「。」」都算同一句的尾巴
      let j = i + 1;
      let endPos = pos + len;
      while (j < chars.length && (TERMINATORS.has(chars[j]) || CLOSERS.has(chars[j]))) {
        endPos += chars[j].length;
        j += 1;
      }
      flush(endPos);
      pos = endPos;
      start = pos;
      i = j;
      continue;
    }

    pos += len;
    i += 1;
  }
  flush(pos);
  return out;
}

/** 第幾個字落在第幾句。落在句與句之間的空隙（換行）時取後一句；超出結尾取最後一句。 */
export function sentenceIndexAt(sentences: SentenceSpan[], offset: number): number {
  if (sentences.length === 0) return -1;
  for (let i = 0; i < sentences.length; i += 1) {
    if (offset < sentences[i].end) return i;
  }
  return sentences.length - 1;
}

export type SentencePos = { para: number; index: number };

/**
 * 往前或往後一句。到段落結尾就跨到下一段的第一句（往前則是上一段的最後一句）。
 * `counts` 是每一段有幾句；沒有句子的段落會被跳過。走到頭回傳 null。
 */
export function stepSentence(
  counts: number[],
  pos: SentencePos,
  delta: 1 | -1
): SentencePos | null {
  let { para, index } = pos;
  index += delta;
  while (index < 0 || index >= (counts[para] ?? 0)) {
    para += delta;
    if (para < 0 || para >= counts.length) return null;
    index = delta > 0 ? 0 : counts[para] - 1;
  }
  return { para, index };
}

/* ------------------------------------------------------------------ */
/* DOM：把 .ds-rich 的內文抽出來、把句子換算成 Range。                   */
/* ------------------------------------------------------------------ */

/** 內文的純文字，跟 caret.ts 的「第幾個字」用同一套規則（跳過注音與注釋號）。 */
export function richText(rich: HTMLElement): string {
  return textNodes(rich)
    .map((t) => t.data)
    .join('');
}

/** 把一句換算成 DOM Range。 */
export function sentenceRange(rich: HTMLElement, s: SentenceSpan): Range {
  const a = locate(rich, s.start);
  const b = locate(rich, s.end);
  const range = document.createRange();
  range.setStart(a.node, a.offset);
  range.setEnd(b.node, b.offset);
  return range;
}

/** 這個元素在它的 .ds-rich 裡排在第幾個字之前。給落在注音或注釋號上的點用。 */
function offsetBefore(rich: HTMLElement, el: Node): number {
  let count = 0;
  for (const t of textNodes(rich)) {
    // DOCUMENT_POSITION_FOLLOWING：t 在 el 之後
    if (el.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING) break;
    count += t.length;
  }
  return count;
}

/** 唯讀的課文段落。編輯區的那一份是 contenteditable，不在聚焦的對象裡。 */
function isReadOnlyRich(el: Element | null): el is HTMLElement {
  return !!el && el.classList.contains('ds-rich') && !(el as HTMLElement).isContentEditable;
}

function richElements(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>('.ds-rich')).filter(
    (el) => isReadOnlyRich(el) && richText(el).trim().length > 0
  );
}

/** 螢幕座標 → 哪個 .ds-rich 的第幾個字。沒點在課文上就是 null。 */
function hitTest(root: HTMLElement, x: number, y: number): { rich: HTMLElement; offset: number } | null {
  let node: Node | null = null;
  let offset = 0;
  if (typeof document.caretPositionFromPoint === 'function') {
    const p = document.caretPositionFromPoint(x, y);
    if (!p) return null;
    node = p.offsetNode;
    offset = p.offset;
  } else if (typeof document.caretRangeFromPoint === 'function') {
    // Safari 還沒有 caretPositionFromPoint
    const r = document.caretRangeFromPoint(x, y);
    if (!r) return null;
    node = r.startContainer;
    offset = r.startOffset;
  }
  if (!node || !root.contains(node)) return null;

  const el = node.nodeType === Node.TEXT_NODE ? node.parentElement : (node as Element);
  const rich = el?.closest('.ds-rich') ?? null;
  if (!isReadOnlyRich(rich)) return null;

  // 點在注音或注釋號上：它們不算字，當成點在它們所依附的那個位置
  const aside = el?.closest('rt, [data-fn]');
  if (aside) return { rich, offset: offsetBefore(rich, aside) };

  // 落在元素節點上（offset 是第幾個子節點）：caret.ts 只處理 root 本身，
  // 內層的 <span> 要自己換算——取那個子節點前面有幾個字
  if (node.nodeType === Node.ELEMENT_NODE && node !== rich) {
    const child = node.childNodes[offset];
    if (child) return { rich, offset: offsetBefore(rich, child) };
    return { rich, offset: offsetBefore(rich, node) + richText(node as HTMLElement).length };
  }

  return { rich, offset: offsetOf(rich, node, offset) };
}

/* ------------------------------------------------------------------ */
/* 元件                                                                */
/* ------------------------------------------------------------------ */

type Props = {
  /** 閱讀模式才啟用。false 時什麼監聽都不掛。 */
  active: boolean;
  /** 頁面所在的容器。調暗的 class 掛在它身上，點擊與鍵盤也只聽它裡面的。 */
  root: RefObject<HTMLElement | null>;
};

const FOCUS = 'sentence-focus';
const MARK = 'sentence-mark';
const DIMMED = 'sentence-dimmed';

function supportsHighlight(): boolean {
  return typeof CSS !== 'undefined' && 'highlights' in CSS && typeof Highlight === 'function';
}

export function SentenceFocus({ active, root }: Props) {
  useEffect(() => {
    const el = root.current;
    if (!active || !el) return;
    if (!supportsHighlight()) {
      console.info('逐句聚焦需要 CSS Custom Highlight API，這個瀏覽器不支援，功能未啟用。');
      return;
    }

    // 目前聚焦的那一句。rich 是它所在的段落，index 是段落裡的第幾句
    let current: { rich: HTMLElement; sentences: SentenceSpan[]; index: number } | null = null;
    let marked = false;

    const paint = () => {
      if (!current) return;
      const range = sentenceRange(current.rich, current.sentences[current.index]);
      CSS.highlights.set(FOCUS, new Highlight(range));
      if (marked) CSS.highlights.set(MARK, new Highlight(range));
      else CSS.highlights.delete(MARK);
      el.classList.add(DIMMED);
      // 預覽是一頁一畫布，正常情況下不會捲動；這是給容器會捲動的場合用的
      (range.startContainer.parentElement ?? current.rich).scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    };

    const clear = () => {
      current = null;
      marked = false;
      CSS.highlights.delete(FOCUS);
      CSS.highlights.delete(MARK);
      el.classList.remove(DIMMED);
    };

    const focusAt = (rich: HTMLElement, index: number) => {
      const sentences = splitSentences(richText(rich));
      if (index < 0 || index >= sentences.length) return;
      const same = current?.rich === rich && current.index === index;
      // 換到別句就把標黃清掉；點同一句維持原狀，雙擊才會切換標黃
      if (!same) marked = false;
      current = { rich, sentences, index };
      paint();
    };

    const focusFromEvent = (e: MouseEvent): boolean => {
      const hit = hitTest(el, e.clientX, e.clientY);
      if (!hit) return false;
      const sentences = splitSentences(richText(hit.rich));
      const index = sentenceIndexAt(sentences, hit.offset);
      if (index < 0) return false;
      focusAt(hit.rich, index);
      return true;
    };

    /** 按鈕、連結、角標有自己的行為，不碰。 */
    const isInteractive = (e: Event) =>
      e.defaultPrevented || !!(e.target as Element | null)?.closest?.('button, a, [role="button"]');

    const onClick = (e: MouseEvent) => {
      if (isInteractive(e)) return;
      // 沒點到課文就是點空白處：取消
      if (!focusFromEvent(e)) clear();
    };

    const onDblClick = (e: MouseEvent) => {
      if (isInteractive(e)) return;
      const hit = hitTest(el, e.clientX, e.clientY);
      if (!hit || !current || hit.rich !== current.rich) return;
      // 雙擊的那一句就是目前聚焦的那一句才切換標黃（第二下 click 已經把焦點移過去了）
      if (sentenceIndexAt(current.sentences, hit.offset) !== current.index) return;
      marked = !marked;
      paint();
      // 雙擊預設會選取一個詞，蓋在高亮上面
      document.getSelection()?.removeAllRanges();
    };

    const step = (delta: 1 | -1) => {
      if (!current) return;
      const riches = richElements(el);
      const para = riches.indexOf(current.rich);
      if (para < 0) return clear();
      const counts = riches.map((r) => splitSentences(richText(r)).length);
      const next = stepSentence(counts, { para, index: current.index }, delta);
      if (next) focusAt(riches[next.para], next.index);
    };

    const onKey = (e: KeyboardEvent) => {
      if (!current) return;
      if (e.key === 'Escape') {
        clear();
        // 已經在逐句聚焦裡，Esc 先取消聚焦；外層的「Esc 離開預覽」要再按一次
        e.stopPropagation();
        return;
      }
      // 橫排用左右鍵、直排用上下鍵——都是文字行進的方向
      const vertical = !!el.querySelector('[data-vertical]');
      const next = vertical ? 'ArrowDown' : 'ArrowRight';
      const prev = vertical ? 'ArrowUp' : 'ArrowLeft';
      if (e.key !== next && e.key !== prev) return;
      e.preventDefault();
      // 聚焦中方向鍵是換句不是翻頁，不要讓外層的翻頁監聽也收到
      e.stopPropagation();
      step(e.key === next ? 1 : -1);
    };

    // 翻頁會把整頁 DOM 換掉：聚焦的段落不在了就把調暗一起收掉，
    // 否則新的一頁會整頁灰、卻沒有任何一句是黑的
    const observer = new MutationObserver(() => {
      if (current && !current.rich.isConnected) clear();
    });
    observer.observe(el, { childList: true, subtree: true });

    el.addEventListener('click', onClick);
    el.addEventListener('dblclick', onDblClick);
    // 用 capture 掛在 document，才能搶在 window 上的翻頁監聽之前處理
    document.addEventListener('keydown', onKey, true);

    return () => {
      observer.disconnect();
      el.removeEventListener('click', onClick);
      el.removeEventListener('dblclick', onDblClick);
      document.removeEventListener('keydown', onKey, true);
      clear();
    };
  }, [active, root]);

  return null;
}
