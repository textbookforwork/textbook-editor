import { describe, expect, it } from 'vitest';
import { isSnapped, pctLabel, snapPct } from './snap';

describe('拖曳尺寸的吸附', () => {
  it('靠近吸附點就吸過去', () => {
    expect(snapPct(48.5)).toBe(50);
    expect(snapPct(98)).toBe(100);
    expect(snapPct(34)).toBeCloseTo(100 / 3);
  });

  it('離得遠就照原值', () => {
    expect(snapPct(40)).toBe(40);
    expect(snapPct(58)).toBe(58);
  });

  it('兩個吸附點中間取較近的那個', () => {
    expect(snapPct(31)).toBeCloseTo(100 / 3);
    expect(snapPct(27)).toBe(25);
  });

  it('分不清是誰的時候不吸', () => {
    // 25 與 33.3 之間的 29.2 離兩邊都超過容許值
    expect(snapPct(29.2)).toBe(29.2);
  });

  it('看得出有沒有吸住', () => {
    expect(isSnapped(50)).toBe(true);
    expect(isSnapped(snapPct(34))).toBe(true);
    expect(isSnapped(40)).toBe(false);
  });

  it('三分之一用分數顯示，其餘用百分比', () => {
    expect(pctLabel(100 / 3)).toBe('⅓');
    expect(pctLabel(200 / 3)).toBe('⅔');
    expect(pctLabel(50)).toBe('50%');
    expect(pctLabel(41.6)).toBe('42%');
  });
});
