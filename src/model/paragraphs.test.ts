import { describe, expect, it } from 'vitest';
import { makeRow, makeText } from './document';
import { hanNumber, paraButtons, paraLabel, paragraphIndex } from './paragraphs';
import type { TextBlock } from './types';

const para = (text: string, paragraph?: TextBlock['paragraph']): TextBlock => ({
  ...makeText(text),
  ...(paragraph ? { paragraph } : {}),
});

describe('段號', () => {
  it('照順序自動編，不是段落的元件跳過', () => {
    const a = para('先生不知何許人也', 'start');
    const h = makeText('第二段', 'sectionTitle');
    const b = para('閑靜少言', 'start');
    const idx = paragraphIndex([makeRow([a]), makeRow([h]), makeRow([b])]);
    expect(idx.get(a.id)).toEqual({ no: 1, startId: a.id });
    expect(idx.has(h.id)).toBe(false);
    expect(idx.get(b.id)).toEqual({ no: 2, startId: b.id });
  });

  it('橫排阿拉伯數字，直排國字', () => {
    expect(paraLabel(3, false)).toBe('3');
    expect(paraLabel(3, true)).toBe('三');
    expect([1, 10, 11, 20, 23, 99].map(hanNumber)).toEqual(['一', '十', '十一', '二十', '二十三', '九十九']);
  });
});

describe('圓形按鈕', () => {
  it('只出現填了字的說明，順序固定為旨修句問；有補充才多一顆補', () => {
    const b: TextBlock = { ...para('x', 'start'), paraNotes: { wen: '一、為什麼？', zhi: '說明名號由來', xiu: '  ' } };
    expect(paraButtons(b).map((x) => x.btn)).toEqual(['旨', '問']);
    const withPop: TextBlock = { ...b, popups: [{ id: 'p', kind: 'text', title: '', body: '補充' }] };
    expect(paraButtons(withPop).map((x) => x.btn)).toEqual(['旨', '問', '補']);
  });

  it('整段掛聲音：最上面一顆播放；只有那一個聲音就不出「補」', () => {
    const b: TextBlock = { ...para('x', 'start'), paraNotes: { zhi: '段旨' } };
    const audio = { id: 'a', kind: 'audio' as const, title: '朗讀', assetId: 'x.mp3' };
    expect(paraButtons({ ...b, popups: [audio] }).map((x) => x.key)).toEqual(['play', 'zhi']);
    const text = { id: 't', kind: 'text' as const, title: '', body: '補充' };
    expect(paraButtons({ ...b, popups: [audio, text] }).map((x) => x.key)).toEqual(['play', 'zhi', 'bu']);
  });
});
