import { describe, expect, it } from 'vitest';
import { formatRange, parseRange } from './pageRange';

describe('PDF 選頁的頁碼寫法', () => {
  it('逗號與區間', () => {
    expect(parseRange('1, 3, 5-7', 37)).toEqual([1, 3, 5, 6, 7]);
  });
  it('全形符號、頓號、波浪號都接受', () => {
    expect(parseRange('1，3、5～6', 10)).toEqual([1, 3, 5, 6]);
  });
  it('超出總頁數、0、寫錯的片段略過，其餘照算', () => {
    expect(parseRange('0, 2, abc, 9-12', 10)).toEqual([2, 9, 10]);
  });
  it('倒過來寫的區間也認得', () => {
    expect(parseRange('7-5', 10)).toEqual([5, 6, 7]);
  });
  it('寫回字串：連續三頁以上才縮成區間', () => {
    expect(formatRange([1, 3, 5, 6, 7])).toBe('1, 3, 5-7');
    expect(formatRange([2, 3])).toBe('2, 3');
    expect(formatRange([])).toBe('');
  });
  it('寫回去再讀一次，結果一樣', () => {
    const pages = [1, 2, 3, 8, 10, 11];
    expect(parseRange(formatRange(pages), 20)).toEqual(pages);
  });
});
