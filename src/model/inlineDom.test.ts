// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { htmlToSpans, spansToHtml } from './inlineDom';
import { plainOf } from './spans';
import type { InlineSpan } from './types';

const mount = (html: string): HTMLElement => {
  const el = document.createElement('div');
  el.innerHTML = html;
  return el;
};

const roundTrip = (spans: InlineSpan[]) => htmlToSpans(mount(spansToHtml(spans)));

/** 國文正文的形狀：注音、重點詞、注釋號同時出現在一段裡。 */
const sample: InlineSpan[] = [
  { text: '先生不知' },
  { text: '何許', keyword: true, footnoteRef: '1' },
  { text: '人也，宅邊有五' },
  { text: '柳', ruby: 'ㄌㄧㄡˇ' },
  { text: '樹。' },
];

describe('spans ⇄ DOM', () => {
  it('來回一趟之後完全一樣', () => {
    expect(roundTrip(sample)).toEqual(sample);
  });

  it('注音是原子，打字碰不到裡面', () => {
    const el = mount(spansToHtml(sample));
    const ruby = el.querySelector('ruby')!;
    expect(ruby.getAttribute('contenteditable')).toBe('false');
    expect(ruby.querySelector('rt')?.textContent).toBe('ㄌㄧㄡˇ');
  });

  it('注釋號是原子，讀回來時不會被當成內文', () => {
    const el = mount(spansToHtml(sample));
    const sup = el.querySelector('sup[data-fn]')!;
    expect(sup.getAttribute('contenteditable')).toBe('false');

    // 畫面上看得到編號，但它不是課文的字——讀回模型時只留參照
    expect(sup.textContent).toBe('1');
    expect(plainOf(htmlToSpans(el))).toBe('先生不知何許人也，宅邊有五柳樹。');
  });

  it('md 匯入的空標記形式也能來回', () => {
    // 解析器產出的形狀：注釋號自成一段、沒有文字
    const fromMd: InlineSpan[] = [{ text: '因以為號焉' }, { text: '', footnoteRef: '2' }];
    const back = roundTrip(fromMd);
    // 讀回來時掛到前一段上，但畫出來的 HTML 完全一樣——所以是穩定的
    expect(back).toEqual([{ text: '因以為號焉', footnoteRef: '2' }]);
    expect(spansToHtml(back)).toBe(spansToHtml(fromMd));
  });

  it('打字之後注釋號還在——這是 25 條注釋不斷掉的關鍵', () => {
    const fromMd: InlineSpan[] = [{ text: '因以為號焉' }, { text: '', footnoteRef: '2' }];
    const el = mount(spansToHtml(fromMd));
    el.childNodes[0].textContent = '因以為別號焉';

    const out = htmlToSpans(el);
    expect(out.find((s) => s.footnoteRef)?.footnoteRef).toBe('2');
  });

  it('在重點詞裡打字，重點詞還在', () => {
    const el = mount(spansToHtml(sample));
    const kw = el.querySelector('[data-kw]')!;
    kw.textContent = '何許何';

    const out = htmlToSpans(el);
    expect(out.find((s) => s.keyword)).toMatchObject({
      text: '何許何',
      keyword: true,
      footnoteRef: '1',
    });
    // 其他標記一個都沒掉
    expect(out.find((s) => s.ruby)?.ruby).toBe('ㄌㄧㄡˇ');
  });

  it('在無標記的地方打字不會沾到旁邊的標記', () => {
    const el = mount(spansToHtml(sample));
    el.childNodes[0].textContent = '先生實不知';

    const out = htmlToSpans(el);
    expect(out[0]).toEqual({ text: '先生實不知' });
    expect(out[0].keyword).toBeUndefined();
  });

  it('整個刪掉注音那一塊，其餘不受影響', () => {
    const el = mount(spansToHtml(sample));
    el.querySelector('ruby')!.remove();

    const out = htmlToSpans(el);
    expect(plainOf(out)).toBe('先生不知何許人也，宅邊有五樹。');
    expect(out.some((s) => s.ruby)).toBe(false);
    expect(out.find((s) => s.keyword)?.keyword).toBe(true);
  });

  it('認得瀏覽器自己插入的 <b>', () => {
    const out = htmlToSpans(mount('平常<b>粗的</b>'));
    expect(out).toEqual([{ text: '平常' }, { text: '粗的', bold: true }]);
  });

  it('相鄰的相同標記會併起來，不會愈打愈碎', () => {
    const out = htmlToSpans(mount('<span>甲</span><span>乙</span><span>丙</span>'));
    expect(out).toEqual([{ text: '甲乙丙' }]);
  });

  it('尖括號被跳脫，不會變成標籤', () => {
    const out = roundTrip([{ text: '<script>不是標籤' }]);
    expect(out).toEqual([{ text: '<script>不是標籤' }]);
  });

  it('全空的內容回傳一段空文字，不是空陣列', () => {
    expect(htmlToSpans(mount(''))).toEqual([{ text: '' }]);
  });
});

describe('新的行內樣式 ⇄ DOM', () => {
  const styled: InlineSpan[] = [
    { text: '底', underline: true },
    { text: '刪', strike: true },
    { text: '上', overline: true },
    { text: '三線', underline: true, strike: true, overline: true },
    { text: '強調', color: 'accent' },
    { text: '自訂色', color: '#ff6600' },
    { text: '楷', fontFamily: '"Kaiti TC", serif' },
    { text: '補充', popupId: 'pop_1' },
  ];

  it('來回一趟之後完全一樣', () => {
    expect(roundTrip(styled)).toEqual(styled);
  });

  it('語意色只掛 data-color，任意色值才寫行內 style', () => {
    const el = mount(spansToHtml(styled));
    const accent = el.querySelector<HTMLElement>('[data-color="accent"]')!;
    expect(accent.getAttribute('style')).toBeNull();
    const custom = el.querySelector<HTMLElement>('[data-color="#ff6600"]')!;
    expect(custom.style.color).toMatch(/#ff6600|rgb\(255, 102, 0\)/);
  });

  it('字體寫成行內 font-family，也留在 data-font 供讀回', () => {
    const el = mount(spansToHtml(styled));
    const kai = el.querySelector<HTMLElement>('[data-font]')!;
    expect(kai.style.fontFamily).toContain('Kaiti TC');
    expect(htmlToSpans(el).find((s) => s.fontFamily)?.fontFamily).toBe('"Kaiti TC", serif');
  });

  it('掛補充的字帶 data-pop，讀回來是 popupId', () => {
    const el = mount(spansToHtml(styled));
    expect(el.querySelector('[data-pop="pop_1"]')?.textContent).toBe('補充');
  });

  it('長得不像色值或字族名的字串不會被寫進 style', () => {
    const html = spansToHtml([
      { text: '壞', color: 'red;background:url(x)' },
      { text: '壞', fontFamily: 'a}body{display:none' },
    ]);
    expect(html).not.toContain('style=');
    expect(html).not.toContain('data-font');
  });

  it('認得瀏覽器自己插入的 <u> 與 <s>', () => {
    expect(htmlToSpans(mount('<u>底</u><s>刪</s>'))).toEqual([
      { text: '底', underline: true },
      { text: '刪', strike: true },
    ]);
  });

  it('在有底線的字裡打字，底線延續', () => {
    const el = mount(spansToHtml(styled));
    el.querySelector('[data-u]:not([data-s])')!.textContent = '底底';
    expect(htmlToSpans(el)[0]).toEqual({ text: '底底', underline: true });
  });

  it('有注音的字也能同時保留粗體、底線、上線、刪除線', () => {
    const rubyWithMarks: InlineSpan[] = [
      { text: '柳', ruby: 'ㄌㄧㄡˇ', bold: true, underline: true, strike: true, overline: true },
    ];
    const html = spansToHtml(rubyWithMarks);
    expect(html).toContain('data-bold="1"');
    expect(html).toContain('data-u="1"');
    expect(html).toContain('data-s="1"');
    expect(html).toContain('data-o="1"');
    expect(roundTrip(rubyWithMarks)).toEqual(rubyWithMarks);
  });
});

