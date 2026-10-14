import { beforeEach, describe, expect, it } from 'vitest';
import { paginate } from './paginate';
import { makeRow, makeText } from './document';
import { resetIds } from './ids';
import { fakeMeasurer, linesOfText, pageOptions } from './testing';
import type { TextBlock } from './types';

/**
 * 單段覆寫書寫方向。
 *
 * 跟整本不同向的段落是不可切開的盒子：它的行跟頁面不同向，
 * 行的邊界不落在頁的 block 軸上，切半會把直排的欄攔腰截斷。
 */
beforeEach(resetIds);

const run = (rows: ReturnType<typeof makeRow>[]) => paginate(rows, pageOptions, fakeMeasurer);

const vertical = (lines: number): TextBlock => ({ ...makeText(linesOfText(lines)), writingMode: 'vertical' });

describe('橫排頁裡的直排段落', () => {
  it('放不下時整塊移到下一頁，不被切半', () => {
    // 可用 400：前一段用掉 10 行（280），直排段 6 行（168）放不下
    const filler = makeRow([makeText(linesOfText(10))]);
    const flipped = makeRow([vertical(6)]);
    const pages = run([filler, flipped]);

    expect(pages).toHaveLength(2);
    expect(pages[0].items.map((i) => i.row.id)).toEqual([filler.id]);
    expect(pages[0].items[0].continuesOnNext).toBe(false);
    expect(pages[1].items[0].row.id).toBe(flipped.id);
    expect(pages[1].items[0].continuedFromPrev).toBe(false);
    expect(pages[1].items[0].textSlice).toBeUndefined();
  });

  it('同樣長度、沒有覆寫的段落會被切半——證明差別來自覆寫', () => {
    const filler = makeRow([makeText(linesOfText(10))]);
    const normal = makeRow([makeText(linesOfText(6))]);
    const pages = run([filler, normal]);
    expect(pages).toHaveLength(2);
    expect(pages[0].items).toHaveLength(2);
    expect(pages[0].items[1].continuesOnNext).toBe(true);
  });

  it('放得下就留在原頁', () => {
    const pages = run([makeRow([makeText('短')]), makeRow([vertical(2)])]);
    expect(pages).toHaveLength(1);
  });

  it('比一整頁還大時獨佔一頁、接受溢出，不會無限迴圈', () => {
    const pages = run([makeRow([makeText('短')]), makeRow([vertical(30)])]);
    expect(pages).toHaveLength(2);
    expect(pages[1].items).toHaveLength(1);
    expect(pages[1].items[0].continuesOnNext).toBe(false);
  });
});
