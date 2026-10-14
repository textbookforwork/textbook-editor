// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { spansToHtml } from '../model/inlineDom';
import {
  richText,
  sentenceIndexAt,
  sentenceRange,
  splitSentences,
  stepSentence,
} from './SentenceFocus';
import type { InlineSpan } from '../model/types';

const pick = (text: string) => splitSentences(text).map((s) => text.slice(s.start, s.end));

describe('切句', () => {
  it('以句末標點為界，標點歸前一句', () => {
    expect(pick('先生不知何許人也。宅邊有五柳樹！因以為號焉？')).toEqual([
      '先生不知何許人也。',
      '宅邊有五柳樹！',
      '因以為號焉？',
    ]);
  });

  it('分號與刪節號也斷句', () => {
    expect(pick('閑靜少言；不慕榮利…好讀書')).toEqual(['閑靜少言；', '不慕榮利…', '好讀書']);
  });

  it('連續的標點與收尾引號跟著前一句走', () => {
    expect(pick('他說：「走吧。」然後呢？！真的嗎')).toEqual([
      '他說：「走吧。」',
      '然後呢？！',
      '真的嗎',
    ]);
  });

  it('換行是界線，但換行本身不屬於任何一句', () => {
    const text = '第一行\n第二行。\n\n第三行';
    const spans = splitSentences(text);
    expect(spans.map((s) => text.slice(s.start, s.end))).toEqual(['第一行', '第二行。', '第三行']);
    // 區間不含換行
    for (const s of spans) expect(text.slice(s.start, s.end)).not.toContain('\n');
  });

  it('只有空白的片段不算句子；空字串沒有句子', () => {
    expect(pick('。。  \n  ')).toEqual(['。。']);
    expect(pick('')).toEqual([]);
  });
});

describe('第幾個字落在第幾句', () => {
  const s = splitSentences('一二三。四五六。七八');
  it('句首、句中、句末標點都算同一句', () => {
    expect(sentenceIndexAt(s, 0)).toBe(0);
    expect(sentenceIndexAt(s, 3)).toBe(0);
    expect(sentenceIndexAt(s, 4)).toBe(1);
  });
  it('超出結尾取最後一句', () => {
    expect(sentenceIndexAt(s, 99)).toBe(2);
    expect(sentenceIndexAt([], 0)).toBe(-1);
  });
});

describe('上一句／下一句', () => {
  // 三段：2 句、0 句、3 句
  const counts = [2, 0, 3];
  it('段落內往後走', () => {
    expect(stepSentence(counts, { para: 0, index: 0 }, 1)).toEqual({ para: 0, index: 1 });
  });
  it('到段落結尾就跨到下一段的第一句，沒有句子的段落跳過', () => {
    expect(stepSentence(counts, { para: 0, index: 1 }, 1)).toEqual({ para: 2, index: 0 });
  });
  it('往前跨段落時落在上一段的最後一句', () => {
    expect(stepSentence(counts, { para: 2, index: 0 }, -1)).toEqual({ para: 0, index: 1 });
  });
  it('走到頭回傳 null', () => {
    expect(stepSentence(counts, { para: 0, index: 0 }, -1)).toBeNull();
    expect(stepSentence(counts, { para: 2, index: 2 }, 1)).toBeNull();
  });
});

describe('DOM 換算', () => {
  const spans: InlineSpan[] = [
    { text: '先生不知' },
    { text: '何許', keyword: true, footnoteRef: '1' },
    { text: '人也。宅邊有五' },
    { text: '柳', ruby: 'ㄌㄧㄡˇ' },
    { text: '樹。' },
  ];
  const mount = () => {
    const el = document.createElement('p');
    el.className = 'ds-rich';
    el.innerHTML = spansToHtml(spans);
    document.body.append(el);
    return el;
  };

  it('內文不含注音與注釋號', () => {
    const el = mount();
    expect(el.textContent).toHaveLength(21);
    expect(richText(el)).toBe('先生不知何許人也。宅邊有五柳樹。');
  });

  it('句子的 Range 只框住那一句的字', () => {
    const el = mount();
    const sentences = splitSentences(richText(el));
    expect(sentences).toHaveLength(2);
    const first = sentenceRange(el, sentences[0]);
    // 注釋號「1」跟在「何許」後面、夾在這一句中間——Range 的文字含它，
    // 但框的範圍正好到句號為止，沒有多吃到下一句的字
    expect(first.toString()).toBe('先生不知何許1人也。');
    const second = sentenceRange(el, sentences[1]);
    expect(second.toString()).toBe('宅邊有五柳ㄌㄧㄡˇ樹。');
  });
});
