// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { DEFAULT_TAIL, calloutPath, isDarkColor, shapePath, spansOfShape } from './ShapeBlockView';
import { clampPoint } from './LineBlockView';
import { blockBox } from '../../model/blockSizing';
import { PAGE_PADDING } from '../../model/pageSize';
import type { LineBlock, ShapeBlock } from '../../model/types';

const ctx = { inlineSize: 400, maxBlockSize: 600, vertical: false };

describe('圖形與線段的尺寸只有外框', () => {
  const shape: ShapeBlock = { id: 's', type: 'shape', shape: 'callout', label: '', popups: [] };
  const circle: ShapeBlock = { id: 'c', type: 'shape', shape: 'circle', label: '', popups: [] };
  const line: LineBlock = { id: 'l', type: 'line', from: { x: 0, y: 0.5 }, to: { x: 1, y: 0.5 }, popups: [] };

  it('沒拖過就用固定預設，拖過就照老師的', () => {
    expect(blockBox(shape, ctx)).toEqual({ inlineSize: 100, blockSize: 120 });
    expect(blockBox(line, ctx)).toEqual({ inlineSize: 400, blockSize: 80 });
    expect(blockBox({ ...line, widthPct: 50, blockSize: 120 }, ctx)).toEqual({ inlineSize: 200, blockSize: 120 });
  });

  it('圓形預設是正圓（寬高相等），不會變成扁的橢圓', () => {
    const box = blockBox(circle, { inlineSize: 896, maxBlockSize: 640, vertical: false })!;
    expect(box.inlineSize).toBe(box.blockSize);
    expect(box).toEqual({ inlineSize: 120, blockSize: 120 });
  });

  it('對話框預設大小搭配預設尖角不會超出頁邊留白', () => {
    const box = blockBox(shape, { inlineSize: 896, maxBlockSize: 640, vertical: false })!;
    // 尖角朝右：框靠欄的左邊插入，尖角最遠到框寬 × x，要落在內容寬加右側留白之內
    expect(DEFAULT_TAIL.x).toBeGreaterThan(1);
    expect(DEFAULT_TAIL.x * box.inlineSize).toBeLessThan(896 + PAGE_PADDING);
  });

  it('尖角與端點不影響框——它們是框內的畫法，不是版面', () => {
    expect(blockBox({ ...shape, tail: { x: -2, y: 3 } }, ctx)).toEqual(blockBox(shape, ctx));
    expect(blockBox({ ...line, from: { x: 1, y: 0 } }, ctx)).toEqual(blockBox(line, ctx));
  });

  it('直排時 block 軸是水平的，框跟著換軸', () => {
    expect(blockBox(shape, { ...ctx, vertical: true })).toEqual({ inlineSize: 100, blockSize: 120 });
  });
});

describe('對話框的尖角', () => {
  it('尖端在框外的左下，尖角接在左邊', () => {
    const d = calloutPath(200, 100, 8, { x: -0.3, y: 0.8 });
    expect(d).toContain('L -60,80');
    // 左邊那一段：從下往上走，先到底邊基點、再到尖端、再回上邊基點
    expect(d).toMatch(/V [\d.]+ L -60,80 L 0,[\d.]+ V 8/);
  });

  it('尖端在上方，尖角接在上邊', () => {
    const d = calloutPath(200, 100, 8, { x: 0.5, y: -0.5 });
    expect(d).toMatch(/M 8,0 H [\d.]+ L 100,-50 L [\d.]+,0 H 192/);
  });

  it('尖角的底邊夾在圓角之間，不會把圓角吃掉', () => {
    // 尖端貼著右上角外面，底邊仍然從 r 以下開始
    const d = calloutPath(200, 100, 8, { x: 1.5, y: 0 });
    const m = /V ([\d.]+) L 300,0 L 200,([\d.]+)/.exec(d);
    expect(m).not.toBeNull();
    expect(Number(m![1])).toBeGreaterThanOrEqual(8);
    expect(Number(m![2])).toBeLessThanOrEqual(92);
  });

  it('其他形狀不帶尖角', () => {
    expect(shapePath('rect', 100, 50)).not.toContain('L -');
    expect(shapePath('roundedRect', 100, 50)).toContain('A 20,20');
    expect(shapePath('circle', 100, 50)).toContain('A 50,25');
  });

  it('舊資料的三角形與星形照常畫', () => {
    expect(shapePath('triangle', 100, 50)).toBe('M 50,0 L 100,50 L 0,50 Z');
    expect(shapePath('star', 100, 100)).toMatch(/^M .* Z$/);
  });
});

describe('圖形裡的文字', () => {
  it('新資料讀 spans，舊資料退回 label', () => {
    const base: ShapeBlock = { id: 's', type: 'shape', shape: 'rect', label: '舊', popups: [] };
    expect(spansOfShape(base)).toEqual([{ text: '舊' }]);
    expect(spansOfShape({ ...base, spans: [{ text: '新', bold: true }] })).toEqual([{ text: '新', bold: true }]);
    expect(spansOfShape({ ...base, label: '' })).toEqual([]);
  });

  it('深色填色才把字反白', () => {
    expect(isDarkColor(undefined)).toBe(false);
    expect(isDarkColor('#FFFFFF')).toBe(false);
    expect(isDarkColor('#1A1917')).toBe(true);
    expect(isDarkColor('#1A66C2')).toBe(true);
    expect(isDarkColor('#F0FF62')).toBe(false);
  });
});

describe('線段端點', () => {
  it('拖出框外會被夾回框內', () => {
    expect(clampPoint({ x: -0.2, y: 1.4 })).toEqual({ x: 0, y: 1 });
    expect(clampPoint({ x: 0.3, y: 0.7 })).toEqual({ x: 0.3, y: 0.7 });
  });
});
