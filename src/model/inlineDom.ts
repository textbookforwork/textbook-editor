import type { InlineSpan } from './types';
import { sameMarks } from './spans';

/**
 * 行內樣式與 DOM 的雙向轉換。
 *
 * 直接把帶標記的文字丟給 contentEditable 會有兩種壞法：
 *  - 打字之後 <ruby>、注釋號、重點詞被壓成純文字，25 條注釋的連結全斷
 *  - 或者為了保住標記而整段唯讀，老師根本不能編
 *
 * 所以要能把 spans 畫成 DOM，也能把使用者改過的 DOM 讀回 spans。
 *
 * 兩種標記的處理方式不同：
 *  - 可以在裡面打字的（粗體、底線、刪除線、上線、重點詞、顏色、字體、補充連結）→ 一般的行內元素
 *  - 不該被拆開的（注音、注釋號）→ 原子，contenteditable=false，
 *    可以整個刪掉但不能編到內部
 */

// 引號也要跳脫：字體的字族名帶引號（"Kaiti TC"），寫進屬性值會把屬性截斷
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * 注釋號一律畫成獨立的 <sup> 原子，而不是掛在某一段文字上。
 *
 * 因為它在課文裡是一個「點」不是一個「範圍」：
 * `何許[^1]` 的注釋屬於那個位置，不屬於整句話。掛在文字上的話，
 * 老師在那段話裡打字，新字也會繼承注釋號。
 */
const supOf = (n: string) => `<sup data-fn="${esc(n)}" contenteditable="false">${esc(n)}</sup>`;

/** 設計系統的語意色。這幾個不寫行內樣式，交給 GlobalStyle 用 token 畫。 */
const SEMANTIC_COLORS = new Set(['accent', 'secondary']);

/**
 * 色值與字體會被寫進 style 屬性，所以只收「長得像色值／字族名」的字串。
 * 內容是老師自己的，但資料也可能從 md 或舊檔來，不能讓一個欄位夾帶整段樣式。
 */
const isSafeColor = (c: string) =>
  /^(#[0-9a-f]{3,8}|[a-z]+|rgba?\([\d\s.,%/]+\)|hsla?\([\d\s.,%/deg]+\))$/i.test(c);
const isSafeFont = (f: string) => /^[^;{}<>\\]+$/.test(f);

/**
 * 注音的 <rt>。照課本的排法拆成兩塊：聲母韻母直排成一欄，二三四聲的調號另外一塊
 * 掛在欄的右側；輕聲的「˙」放在欄的最上面（資料裡記在最後，例：ㄉㄜ˙）。
 * 讀回資料一律看 ruby 上的 data-ruby，所以這裡怎麼拆都不影響存檔。
 */
const TONES = 'ˊˇˋ';
function zhuyinRt(zy: string): string {
  const neutral = zy.includes('˙');
  const plain = zy.replace('˙', '');
  const last = plain.slice(-1);
  const tone = TONES.includes(last) ? last : '';
  const symbols = tone ? plain.slice(0, -1) : plain;
  const body = (neutral ? '˙' : '') + symbols;
  // 只有一個符號（ㄘˊ、ㄕˋ）：調號掛在右上，不是置中——CSS 數不出有幾個符號，這裡標出來
  const one = Array.from(symbols).length === 1 ? ' data-one' : '';
  return `<rt${one}><span data-zy>${esc(body)}</span>${tone ? `<span data-tone>${esc(tone)}</span>` : ''}</rt>`;
}

/**
 * 生字詞、句子、補充的標記鍵。相連且鍵相同的字（例如「鞍」與帶注音的「韉」）共用一層外框：
 * 點點線由那一層的邊框畫成一整條。每個字各畫一段的話，點的節奏在接縫處重來、
 * 帶注音的字又是另一種盒子，線就斷斷續續、對不齊。
 */
const markKey = (s: InlineSpan) => (s.text && (s.noteId || s.popupId) ? `${s.noteId ?? ''}|${s.popupId ?? ''}` : '');

export function spansToHtml(spans: InlineSpan[]): string {
  let html = '';
  for (let i = 0; i < spans.length; ) {
    const key = markKey(spans[i]);
    if (!key) {
      html += spanToHtml(spans[i]);
      i += 1;
      continue;
    }
    let j = i;
    while (j < spans.length && markKey(spans[j]) === key) j += 1;
    const first = spans[i];
    // 外框帶標記，也帶字型：點點線的位置由外框的字型決定，跟裡面的字不同（例如課文設成明體）線就會偏。
    // 讀回時外框的標記與字型會往裡傳（htmlToSpans 的 inherited），資料不變
    const outer: string[] = [];
    if (first.popupId) outer.push(`data-pop="${esc(first.popupId)}"`);
    if (first.noteId) outer.push(`data-note="${esc(first.noteId)}"`);
    if (first.fontFamily && isSafeFont(first.fontFamily)) {
      outer.push(`data-font="${esc(first.fontFamily)}"`, `style="${esc(`font-family:${first.fontFamily}`)}"`);
    }
    html += `<span ${outer.join(' ')}>${spans.slice(i, j).map((s) => spanToHtml(s, false)).join('')}</span>`;
    i = j;
  }
  return html;
}

/** 一段字的 HTML。withMarks 為 false 時不寫生字詞、補充的標記（由外框帶，見 spansToHtml）。 */
function spanToHtml(s: InlineSpan, withMarks = true): string {
  const mark = s.footnoteRef ? supOf(s.footnoteRef) : '';
  if (!s.text) return mark;

  const attrs: string[] = [];
  const style: string[] = [];
  if (s.keyword) attrs.push('data-kw="1"');
  if (s.bold) attrs.push('data-bold="1"');
  if (s.underline) attrs.push('data-u="1"');
  if (s.strike) attrs.push('data-s="1"');
  if (s.overline) attrs.push('data-o="1"');
  if (s.masked) attrs.push('data-mask="1"');
  if (s.color && s.color !== 'default' && isSafeColor(s.color)) {
    attrs.push(`data-color="${esc(s.color)}"`);
    // 語意色由 GlobalStyle 的 [data-color='accent'] 之類畫；任意色值只能寫成行內樣式
    if (!SEMANTIC_COLORS.has(s.color)) style.push(`color:${s.color}`);
  }
  if (s.fontFamily && isSafeFont(s.fontFamily)) {
    attrs.push(`data-font="${esc(s.fontFamily)}"`);
    style.push(`font-family:${s.fontFamily}`);
  }
  if (withMarks && s.popupId) attrs.push(`data-pop="${esc(s.popupId)}"`);
  if (withMarks && s.noteId) attrs.push(`data-note="${esc(s.noteId)}"`);
  if (s.href) attrs.push(`data-href="${esc(s.href)}"`);
  if (style.length > 0) attrs.push(`style="${esc(style.join(';'))}"`);

  if (s.ruby) {
    // 注音是原子：整個刪得掉，但不能編到裡面，否則注音會跟字分家
    const attrStr = attrs.length > 0 ? ` ${attrs.join(' ')}` : '';
    return (
      `<ruby data-ruby="${esc(s.ruby)}" contenteditable="false"${attrStr}>` +
      `${esc(s.text)}${zhuyinRt(s.ruby)}</ruby>${mark}`
    );
  }

  const text = withUprightDigits(esc(s.text));
  return (attrs.length > 0 ? `<span ${attrs.join(' ')}>${text}</span>` : text) + mark;
}

/**
 * 數字包一層 data-num，直排時由 GlobalStyle 立起來（2026-10-27 定：直排裡數字直立、英文橫躺）。
 * 瀏覽器預設把數字跟英文一起轉成橫躺，CSS 選不到單一個字，只能在這裡包。
 * 這一層不帶任何標記，htmlToSpans 讀回時直接穿過去，存檔不會多出東西；
 * 量測和畫面都走這裡，所以立起來之後分頁量到的也是立著的高度。
 */
const withUprightDigits = (html: string) => html.replace(/[0-9０-９]+/g, (d) => `<span data-num>${d}</span>`);

/** 把使用者編過的 DOM 讀回 spans。相鄰且標記相同的會被合併。 */
export function htmlToSpans(root: HTMLElement): InlineSpan[] {
  const out: InlineSpan[] = [];

  const push = (span: InlineSpan) => {
    if (!span.text) return;
    const last = out[out.length - 1];
    // 相鄰且標記完全相同就併起來，避免每打一個字就多一個 span
    if (last && sameMarks(last, span)) {
      last.text += span.text;
      return;
    }
    out.push(span);
  };

  /**
   * 收下一個注釋號。
   *
   * 能掛在前一段文字上就掛上去，這樣模型裡的段落數不會愈編愈多；
   * 前面沒有東西可掛（開頭就是注釋號、或前一段已經有一個）時，
   * 才留成一個沒有文字的標記。兩種形式畫出來的 HTML 完全一樣。
   */
  const pushFootnote = (id: string, inherited: Omit<InlineSpan, 'text'>) => {
    const last = out[out.length - 1];
    if (last && last.text && !last.footnoteRef && !last.ruby) last.footnoteRef = id;
    else out.push({ ...inherited, text: '', footnoteRef: id });
  };

  const walk = (node: Node, inherited: Omit<InlineSpan, 'text'>) => {
    if (node.nodeType === Node.TEXT_NODE) {
      push({ ...inherited, text: node.textContent ?? '' });
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const el = node as HTMLElement;

    // 注釋號的數字是畫出來的，不是內文——不能讀進 text
    if (el.dataset.fn) {
      pushFootnote(el.dataset.fn, inherited);
      return;
    }

    if (el.tagName === 'RUBY') {
      const ruby = el.dataset.ruby ?? el.querySelector('rt')?.textContent ?? '';
      // 只取基字，不要把 <rt> 的注音也讀成內文
      const base = Array.from(el.childNodes)
        .filter((n) => n.nodeName !== 'RT')
        .map((n) => n.textContent ?? '')
        .join('');
      const marks: Omit<InlineSpan, 'text'> = { ...inherited };
      if (el.dataset.kw) marks.keyword = true;
      if (el.dataset.bold) marks.bold = true;
      if (el.dataset.u) marks.underline = true;
      if (el.dataset.s) marks.strike = true;

      if (el.dataset.o) marks.overline = true;
      if (el.dataset.mask) marks.masked = true;
      if (el.dataset.color) marks.color = el.dataset.color;
      if (el.dataset.font) marks.fontFamily = el.dataset.font;
      if (el.dataset.pop) marks.popupId = el.dataset.pop;
      if (el.dataset.note) marks.noteId = el.dataset.note;
      if (el.dataset.href) marks.href = el.dataset.href;
      push({ ...marks, text: base, ruby });
      return;
    }
    // 注音的 <rt> 已經在上面處理掉了，單獨遇到就跳過
    if (el.tagName === 'RT') return;

    // 瀏覽器有時會自己插入 <b> / <i>，一併認得
    const marks: Omit<InlineSpan, 'text'> = { ...inherited };
    if (el.dataset.kw) marks.keyword = true;
    if (el.dataset.bold || el.tagName === 'B' || el.tagName === 'STRONG') marks.bold = true;
    if (el.dataset.u || el.tagName === 'U') marks.underline = true;
    if (el.dataset.s || el.tagName === 'S' || el.tagName === 'STRIKE' || el.tagName === 'DEL')
      marks.strike = true;
    if (el.dataset.o) marks.overline = true;
    if (el.dataset.mask) marks.masked = true;
    // 顏色與字體從 data-* 讀，不從 style 讀：style 是畫出來用的，data 才是資料
    if (el.dataset.color) marks.color = el.dataset.color;
    if (el.dataset.font) marks.fontFamily = el.dataset.font;
    if (el.dataset.pop) marks.popupId = el.dataset.pop;
    if (el.dataset.note) marks.noteId = el.dataset.note;
    if (el.dataset.href) marks.href = el.dataset.href;

    for (const child of Array.from(el.childNodes)) walk(child, marks);
  };

  for (const child of Array.from(root.childNodes)) walk(child, {});
  return out.length > 0 ? out : [{ text: '' }];
}
