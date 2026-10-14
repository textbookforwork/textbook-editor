import { useCallback, useEffect, useRef } from 'react';
import { htmlToSpans, spansToHtml } from '../model/inlineDom';
import { caretOffset, placeCaret, selectRange, selectionRange } from '../editor/caret';
import type { InlineSpan } from '../model/types';

export type Props = {
  spans: InlineSpan[];
  onChange: (next: InlineSpan[]) => void;
  /** 選取範圍改變（字元位置）。浮動膠囊靠它決定要不要出現。 */
  onSelect?: (range: { start: number; end: number } | null) => void;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  onFocus?: () => void;
  /** 單段覆寫書寫方向時的記號，讓 GlobalStyle 把著重線與底線畫在對的那一邊。 */
  'data-vertical'?: string;
  'data-horizontal'?: string;
};

/**
 * 可以直接打字、而且保得住行內標記的文字。
 *
 * 兩個關鍵：
 *
 * 一、非受控。打字時不把 React 的值寫回 DOM，否則每按一鍵都會重設內容、
 *    游標跳回開頭。只有當外部的值跟「我們最後送出去的」不一樣時才同步——
 *    那是復原、套用標記、匯入、換教材造成的，而不是自己打的字。
 *
 * 二、標記存在 DOM 上，不是靠純文字。注音與注釋號是 contenteditable=false
 *    的原子，可以整個刪掉但打字碰不到裡面；粗體與重點詞是一般的行內元素，
 *    在裡面打字會自然延續。改一個字不會弄丟旁邊的注釋參照。
 */
export function EditableText({
  spans,
  onChange,
  onSelect,
  className,
  style,
  placeholder,
  onFocus,
  ...dataAttrs
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  /** 我們最後送出去的 HTML。用來分辨「自己打的」與「外面改的」。 */
  const emitted = useRef<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const want = spansToHtml(spans);
    if (want === emitted.current) return;

    // 外部改動：套用標記時焦點還在這裡，所以要把游標放回原位，
    // 否則按一次「重點詞」游標就跳到開頭。
    // 有選著字就把那一段重新選起來——膠囊才不會在按完一顆之後消失，
    // 老師可以接著再按底線、換顏色。
    const focused = document.activeElement === el;
    const range = focused ? selectionRange(el) : null;
    const caret = focused ? caretOffset(el) : null;
    el.innerHTML = want;
    emitted.current = want;
    if (range) selectRange(el, range.start, range.end);
    else if (caret !== null) placeCaret(el, caret);
  }, [spans]);

  /** 上一次回報的是不是「有選字」。選取離開這一段時要負責回報一次 null。 */
  const owned = useRef(false);

  /**
   * 回報選取範圍。
   *
   * 每一段都在聽同一個 document 的 selectionchange，所以不能看到選取不在自己
   * 身上就回報 null——那會把別段剛回報的範圍蓋掉（誰的監聽器排在最後誰贏，
   * 套用一次標記之後重新訂閱的順序就變了，膠囊因此消失）。
   * 規則：選取在自己身上才回報；曾經回報過範圍、現在選取跑掉了，才補一個 null。
   */
  const report = useCallback(() => {
    const el = ref.current;
    if (!el || !onSelect) return;
    const sel = document.getSelection();
    const inside = !!sel && sel.rangeCount > 0 && el.contains(sel.getRangeAt(0).startContainer);
    if (inside) {
      const range = selectionRange(el);
      owned.current = range !== null;
      onSelect(range);
    } else if (owned.current) {
      // 焦點移進浮動工具列的彈出選單（例如在「注音」輸入框打字）時，
      // 保留原本的選取範圍，不要把工具列連同輸入框一起收掉。
      if (document.activeElement?.closest('[data-text-popover]')) return;
      owned.current = false;
      onSelect(null);
    }
  }, [onSelect]);

  // 選取要監聽 document：拖曳選字時 mouseup 可能落在元件外面
  useEffect(() => {
    if (!onSelect) return;
    document.addEventListener('selectionchange', report);
    return () => document.removeEventListener('selectionchange', report);
  }, [onSelect, report]);

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-multiline="true"
      data-placeholder={placeholder}
      {...dataAttrs}
      onFocus={onFocus}
      onClick={(e) => {
        const el = ref.current;
        const rubyEl = (e.target as HTMLElement).closest('ruby');
        if (!el || !rubyEl || !el.contains(rubyEl)) return;
        const baseNode = Array.from(rubyEl.childNodes).find((n) => n.nodeType === Node.TEXT_NODE);
        if (!baseNode) return;
        const r = document.createRange();
        r.selectNodeContents(baseNode);
        const sel = document.getSelection();
        if (sel) {
          sel.removeAllRanges();
          sel.addRange(r);
        }
      }}
      onInput={(e) => {
        const next = htmlToSpans(e.currentTarget);
        // 記下正規化後的樣子，下一輪才認得出這是自己造成的改變
        emitted.current = spansToHtml(next);
        onChange(next);
      }}
      onPaste={(e) => {
        // 貼上一律轉純文字：保留段落，丟掉來源的字體大小顏色。
        // 帶格式貼上會讓內容重新變成「有樣式的文字」而不是「有分類的內容」，
        // 那正是這次改版要解決的問題。
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
      }}
    />
  );
}
