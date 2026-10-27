import { describe, expect, it } from 'vitest';
import { roleStyle, textFlowStyle } from './roles';

describe('roleStyle 的字級覆寫', () => {
  it('沒覆寫就用角色的 token', () => {
    const s = roleStyle('supplement');
    expect(s.fontSize).toBe('var(--ds-typography-body-size)');
    expect(s.lineHeight).toBe('var(--ds-typography-body-line-height)');
  });

  it('預設字級跟 token 不同的角色：章 48、節 32、內文 20，乘上整本檔位', () => {
    expect(roleStyle('lessonTitle').fontSize).toBe('var(--ds-typography-heading-1-size)');
    expect(roleStyle('sectionTitle').fontSize).toBe('32px');
    expect(roleStyle('body').fontSize).toBe('20px');
    expect(roleStyle('body', 1.125).fontSize).toBe('22.5px');
  });

  it('覆寫時字級是絕對 px，行高是跟著字級走的無單位比例', () => {
    const s = roleStyle('body', 1.125, 24);
    expect(s.fontSize).toBe('24px');
    expect(Number(s.lineHeight)).toBeGreaterThan(1);
    // 字重仍由角色決定——層級沒有變
    expect(s.fontWeight).toBe('var(--ds-typography-body-lg-weight)');
  });

  it('行距覆寫蓋過角色預設，字級覆寫與否都一樣', () => {
    expect(roleStyle('supplement', 1, undefined, 2).lineHeight).toBe('2');
    expect(roleStyle('body', 1, 24, 1.2).lineHeight).toBe('1.2');
    expect(roleStyle('body', 1, 24, 1.2).fontSize).toBe('24px');
  });
});

describe('textFlowStyle：單段書寫方向的盒子', () => {
  const ctx = { inlineSize: 600, maxBlockSize: 400, vertical: false };

  it('跟整本同向就什麼都不設，尺寸交給瀏覽器排版', () => {
    expect(textFlowStyle({}, ctx)).toEqual({ vertical: false, flipped: false, style: {} });
    expect(textFlowStyle({ writingMode: 'horizontal' }, ctx).flipped).toBe(false);
  });

  it('橫排頁裡的直排段落：高度固定（預設頁的 45%），寬度由內容決定並靠左', () => {
    const f = textFlowStyle({ writingMode: 'vertical' }, ctx);
    expect(f.flipped).toBe(true);
    expect(f.style.writingMode).toBe('vertical-rl');
    expect(f.style.height).toBe('180px');
    expect(f.style.width).toBe('auto');
    expect(f.style.maxWidth).toBe('600px');
    expect(f.style.marginLeft).toBeUndefined();
  });

  it('老師設過框高就照他的，但不超過一頁', () => {
    expect(textFlowStyle({ writingMode: 'vertical', blockSize: 300 }, ctx).style.height).toBe('300px');
    expect(textFlowStyle({ writingMode: 'vertical', blockSize: 900 }, ctx).style.height).toBe('400px');
  });

  it('直排頁裡的橫排段落：寬度固定，高度由行數決定', () => {
    const f = textFlowStyle({ writingMode: 'horizontal' }, { ...ctx, vertical: true });
    expect(f.vertical).toBe(false);
    expect(f.style.writingMode).toBe('horizontal-tb');
    expect(f.style.width).toBe('180px');
    expect(f.style.height).toBe('auto');
    expect(f.style.maxHeight).toBe('600px');
  });
});
