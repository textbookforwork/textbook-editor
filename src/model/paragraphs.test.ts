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

  it('被換頁切開的後半標成接續：不編號、歸在上一段，下一段的號碼不會被多算', () => {
    // 〈五柳先生傳〉第二段在 md 裡被 @頁[115] 切成兩塊
    const p1 = para('先生不知何許人也', 'start');
    const p2a = para('閑靜少言……或置酒而招', 'start');
    const p2b = para('之。造飲輒盡……以此自終', 'continue');
    const p3 = para('贊曰', 'start');
    const idx = paragraphIndex([makeRow([p1]), makeRow([p2a]), makeRow([p2b]), makeRow([p3])]);
    expect(idx.get(p2b.id)).toEqual({ no: null, startId: p2a.id });
    expect(idx.get(p3.id)?.no).toBe(3);
  });

  it('前面沒有段落可以接的「接續」當成新的一段', () => {
    const lone = para('孤單的一塊', 'continue');
    expect(paragraphIndex([makeRow([lone])]).get(lone.id)).toEqual({ no: 1, startId: lone.id });
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
});
