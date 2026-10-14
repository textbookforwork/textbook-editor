import { describe, expect, it } from 'vitest';
import {
  appendPoint,
  emptyHistory,
  pathOf,
  pushHistory,
  redoInk,
  strokesAt,
  undoInk,
  type Stroke,
} from './ink';

const line = (id: string, tool: Stroke['tool'] = 'pen'): Stroke => ({
  id,
  tool,
  points: [
    [0, 0],
    [100, 0],
  ],
});

describe('appendPoint', () => {
  it('太近的點不收', () => {
    const pts = appendPoint([[0, 0]], [0.5, 0.5]);
    expect(pts).toHaveLength(1);
  });
  it('夠遠就接上，而且不改原陣列', () => {
    const orig: [number, number][] = [[0, 0]];
    const pts = appendPoint(orig, [10, 0]);
    expect(pts).toHaveLength(2);
    expect(orig).toHaveLength(1);
  });
});

describe('pathOf', () => {
  it('一個點也畫得出來', () => {
    expect(pathOf([[3, 4]])).toMatch(/^M3 4 L/);
  });
  it('多點是 M 接 L', () => {
    expect(
      pathOf([
        [0, 0],
        [1, 2],
      ])
    ).toBe('M0 0 L1 2');
  });
});

describe('strokesAt', () => {
  it('線段附近命中、遠處不命中', () => {
    const s = [line('a')];
    expect(strokesAt(s, [50, 5])).toEqual(new Set(['a']));
    expect(strokesAt(s, [50, 40])).toEqual(new Set());
  });
  it('螢光筆比較粗，命中範圍跟著變大', () => {
    expect(strokesAt([line('h', 'highlighter')], [50, 14]).has('h')).toBe(true);
    expect(strokesAt([line('p', 'pen')], [50, 14]).has('p')).toBe(false);
  });
});

describe('history', () => {
  it('復原回到改之前，取消復原再回來', () => {
    const a = [line('a')];
    const b = [line('a'), line('b')];
    const h = pushHistory(emptyHistory(), a);
    const u = undoInk(h, b)!;
    expect(u.strokes).toBe(a);
    const r = redoInk(u.history, u.strokes)!;
    expect(r.strokes).toBe(b);
  });
  it('新動作清掉 future', () => {
    const h = pushHistory(emptyHistory(), []);
    const u = undoInk(h, [line('a')])!;
    const next = pushHistory(u.history, u.strokes);
    expect(next.future).toHaveLength(0);
    expect(redoInk(next, [])).toBeNull();
  });
  it('沒得復原回傳 null', () => {
    expect(undoInk(emptyHistory(), [])).toBeNull();
  });
});
