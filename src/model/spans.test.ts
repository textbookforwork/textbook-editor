import { describe, expect, it } from 'vitest';
import {
  hasAllRuby,
  lengthOf,
  markSpans,
  mergeSpans,
  plainOf,
  setRubySpans,
  sliceSpans,
  spliceSpans,
  toggleRubySpans,
} from './spans';
import type { InlineSpan } from './types';

/** 一段有注音、有重點詞、有注釋號的課文，形狀跟國文正文一樣。 */
const sample: InlineSpan[] = [
  { text: '先生不知' },
  { text: '何許', keyword: true, footnoteRef: '1' },
  { text: '人也，亦不詳其姓字，宅邊有五' },
  { text: '柳', ruby: 'ㄌㄧㄡˇ' },
  { text: '樹，因以為號焉。' },
];

describe('sliceSpans', () => {
  it('切出來的純文字等於原文的同一段', () => {
    const plain = plainOf(sample);
    for (const [a, b] of [[0, 4], [2, 10], [4, 8], [0, plain.length]]) {
      expect(plainOf(sliceSpans(sample, a, b))).toBe(plain.slice(a, b));
    }
  });

  it('標記跟著字走', () => {
    // 「何許」整個落在區間內，重點詞與注釋號都要留著
    const s = sliceSpans(sample, 4, 8);
    expect(s[0]).toMatchObject({ text: '何許', keyword: true, footnoteRef: '1' });
  });

  it('注音被切一半時只留字，不留注音', () => {
    const ruby: InlineSpan[] = [{ text: '嘉南', ruby: 'ㄐㄧㄚ ㄋㄢˊ' }];
    expect(sliceSpans(ruby, 0, 1)).toEqual([{ text: '嘉', ruby: undefined }]);
    // 完整涵蓋就保留
    expect(sliceSpans(ruby, 0, 2)[0].ruby).toBe('ㄐㄧㄚ ㄋㄢˊ');
  });

  it('空區間是空的', () => {
    expect(sliceSpans(sample, 3, 3)).toEqual([]);
  });
});

describe('spliceSpans', () => {
  it('只換掉中間那一段，前後原封不動', () => {
    // 4..8 是「何許人也」——連重點詞帶注釋號一起換掉
    const next = spliceSpans(sample, 4, 8, [{ text: '在下' }]);
    expect(plainOf(next)).toBe('先生不知在下，亦不詳其姓字，宅邊有五柳樹，因以為號焉。');
    // 後半的注音還在
    expect(next.find((s) => s.ruby)?.ruby).toBe('ㄌㄧㄡˇ');
  });

  it('改第二頁那半段不會弄丟第一頁那半段', () => {
    // 分頁把段落切在第 12 個字，老師編的是後半
    const cut = 12;
    const tail = sliceSpans(sample, cut, lengthOf(sample));
    const edited = [...tail, { text: '（老師加註）' }];
    const merged = spliceSpans(sample, cut, lengthOf(sample), edited);

    expect(plainOf(merged).startsWith(plainOf(sample).slice(0, cut))).toBe(true);
    expect(plainOf(merged).endsWith('（老師加註）')).toBe(true);
    // 前半的重點詞與注釋參照沒被洗掉
    expect(merged.find((s) => s.footnoteRef)?.footnoteRef).toBe('1');
  });

  it('全部刪光仍然是一段空文字，不是空陣列', () => {
    expect(spliceSpans(sample, 0, lengthOf(sample), [])).toEqual([{ text: '' }]);
  });
});

describe('mergeSpans', () => {
  it('相鄰且標記相同的併起來', () => {
    expect(mergeSpans([{ text: '甲' }, { text: '乙' }])).toEqual([{ text: '甲乙' }]);
  });

  it('標記不同的不併', () => {
    const out = mergeSpans([{ text: '甲' }, { text: '乙', bold: true }]);
    expect(out).toHaveLength(2);
  });

  it('兩個注音各自獨立，不會被併成一個', () => {
    const out = mergeSpans([
      { text: '閑', ruby: 'ㄒㄧㄢˊ' },
      { text: '靜', ruby: 'ㄐㄧㄥˋ' },
    ]);
    expect(out).toHaveLength(2);
  });
});

describe('切開帶注釋號的段落', () => {
  // 注釋號標在段尾，所以切開時只有含段尾的那一半留著
  const withFn: InlineSpan[] = [{ text: '閑靜少言', footnoteRef: '3' }, { text: '不慕榮利' }];

  it('前半不帶注釋號', () => {
    expect(sliceSpans(withFn, 0, 2)).toEqual([{ text: '閑靜' }]);
  });

  it('後半才帶注釋號', () => {
    expect(sliceSpans(withFn, 2, 4)).toEqual([{ text: '少言', footnoteRef: '3' }]);
  });

  it('跨頁時同一個編號不會在兩頁上各出現一次', () => {
    const head = sliceSpans(withFn, 0, 3);
    const tail = sliceSpans(withFn, 3, lengthOf(withFn));
    const count = [...head, ...tail].filter((s) => s.footnoteRef === '3').length;
    expect(count).toBe(1);
  });

  it('沒有文字的標記段落在切片時不會消失', () => {
    const marker: InlineSpan[] = [{ text: '因以為號焉' }, { text: '', footnoteRef: '2' }];
    expect(sliceSpans(marker, 0, 5)).toEqual(marker);
    // 起點之前的不算進來
    expect(sliceSpans(marker, 0, 3)).toEqual([{ text: '因以為' }]);
  });
});

describe('新的行內樣式', () => {
  it('底線、刪除線、上線、顏色、字體、補充連結任一不同就不合併', () => {
    const base = { text: '甲' };
    const variants: InlineSpan[] = [
      { text: '乙', underline: true },
      { text: '乙', strike: true },
      { text: '乙', overline: true },
      { text: '乙', color: '#ff0000' },
      { text: '乙', fontFamily: 'serif' },
      { text: '乙', popupId: 'pop1' },
    ];
    for (const v of variants) expect(mergeSpans([base, v])).toHaveLength(2);
  });

  it("color 寫 'default' 跟沒寫是同一件事，可以合併", () => {
    expect(mergeSpans([{ text: '甲', color: 'default' }, { text: '乙' }])).toHaveLength(1);
  });

  it('同一組樣式會合併', () => {
    const out = mergeSpans([
      { text: '甲', underline: true, color: 'accent', fontFamily: 'serif' },
      { text: '乙', underline: true, color: 'accent', fontFamily: 'serif' },
    ]);
    expect(out).toEqual([{ text: '甲乙', underline: true, color: 'accent', fontFamily: 'serif' }]);
  });

  it('切片時樣式跟著字走，補充連結兩半都留著', () => {
    const spans: InlineSpan[] = [{ text: '嘉南大圳', underline: true, popupId: 'p1', color: '#123456' }];
    expect(sliceSpans(spans, 1, 3)).toEqual([
      { text: '南大', underline: true, popupId: 'p1', color: '#123456' },
    ]);
  });
});

describe('markSpans', () => {
  it('對區間套上一種標記，其餘標記不受影響', () => {
    const out = markSpans(sample, 0, 6, { underline: true });
    // 「先生不知何許」底線；「何許」原本的重點詞與注釋號還在
    expect(out[0]).toMatchObject({ text: '先生不知', underline: true });
    expect(out[1]).toMatchObject({ text: '何許', underline: true, keyword: true, footnoteRef: '1' });
    expect(plainOf(out)).toBe(plainOf(sample));
  });

  it('值給 undefined 或 false 代表拿掉', () => {
    const marked = markSpans(sample, 0, 4, { color: '#ff0000', fontFamily: 'serif' });
    expect(marked[0]).toMatchObject({ color: '#ff0000', fontFamily: 'serif' });
    const cleared = markSpans(marked, 0, 4, { color: undefined, fontFamily: undefined });
    expect(cleared[0]).toEqual({ text: '先生不知' });
    const off = markSpans(markSpans(sample, 0, 2, { strike: true }), 0, 2, { strike: false });
    expect(off[0].strike).toBeUndefined();
  });

  it("顏色 'default' 等於清掉", () => {
    const out = markSpans(markSpans(sample, 0, 2, { color: 'accent' }), 0, 2, { color: 'default' });
    expect(out[0].color).toBeUndefined();
  });

  it('只動區間裡的字，注音在區間外完整保留', () => {
    const out = markSpans(sample, 0, 2, { popupId: 'p9' });
    expect(out.find((s) => s.ruby)).toEqual({ text: '柳', ruby: 'ㄌㄧㄡˇ' });
    expect(out.filter((s) => s.popupId).map((s) => s.text).join('')).toBe('先生');
  });

  it('空區間什麼都不改', () => {
    expect(markSpans(sample, 3, 3, { bold: true })).toBe(sample);
  });
});

describe('setRubySpans', () => {
  it('對單一字設定與清除注音', () => {
    const spans: InlineSpan[] = [{ text: '閑靜少言' }];
    const withRuby = setRubySpans(spans, 0, 1, 'ㄒㄧㄢˊ');
    expect(withRuby).toEqual([{ text: '閑', ruby: 'ㄒㄧㄢˊ' }, { text: '靜少言' }]);

    const cleared = setRubySpans(withRuby, 0, 1, '');
    expect(cleared).toEqual([{ text: '閑靜少言' }]);
  });

  it('對多字輸入空白分隔的注音時，自動逐字拆開對應', () => {
    const spans: InlineSpan[] = [{ text: '閑靜少言' }];
    const withRuby = setRubySpans(spans, 0, 2, 'ㄒㄧㄢˊ ㄐㄧㄥˋ');
    expect(withRuby).toEqual([
      { text: '閑', ruby: 'ㄒㄧㄢˊ' },
      { text: '靜', ruby: 'ㄐㄧㄥˋ' },
      { text: '少言' },
    ]);
  });
});

describe('toggleRubySpans & hasAllRuby', () => {
  it('按一下直接產生注音，不需要手動輸入', () => {
    const spans: InlineSpan[] = [{ text: '閑靜少言' }];
    expect(hasAllRuby(spans)).toBe(false);

    const withRuby = toggleRubySpans(spans, 0, 2);
    expect(withRuby[0]).toMatchObject({ text: '閑', ruby: 'ㄒㄧㄢˊ' });
    expect(withRuby[1]).toMatchObject({ text: '靜', ruby: 'ㄐㄧㄥˋ' });
    expect(withRuby[2]).toMatchObject({ text: '少言' });
    expect(hasAllRuby(withRuby.slice(0, 2))).toBe(true);

    // 再按一次直接清除
    const cleared = toggleRubySpans(withRuby, 0, 2);
    expect(plainOf(cleared)).toBe('閑靜少言');
    expect(cleared.some((s) => s.ruby)).toBe(false);
  });

  it('保留既有特定字詞讀音，並替其餘中文字自動注音', () => {
    const spans: InlineSpan[] = [
      { text: '曾', ruby: 'ㄗㄥ' },
      { text: '不吝情去留' },
    ];
    const toggled = toggleRubySpans(spans, 0, lengthOf(spans));
    // 原有的 ㄗㄥ 完整保留
    expect(toggled[0]).toMatchObject({ text: '曾', ruby: 'ㄗㄥ' });
    expect(toggled[1]).toMatchObject({ text: '不', ruby: 'ㄅㄨˋ' });
    expect(toggled[2]).toMatchObject({ text: '吝', ruby: 'ㄌㄧㄣˋ' });
  });

  it('標點符號不標注音，只標中文字', () => {
    const spans: InlineSpan[] = [{ text: '夜空，星星！' }];
    const toggled = toggleRubySpans(spans, 0, lengthOf(spans));
    expect(toggled.find((s) => s.text === '，')?.ruby).toBeUndefined();
    expect(toggled.find((s) => s.text === '！')?.ruby).toBeUndefined();
    expect(toggled.find((s) => s.text === '夜')?.ruby).toBe('ㄧㄝˋ');
  });
});
