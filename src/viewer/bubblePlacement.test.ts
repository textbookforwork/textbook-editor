import { describe, expect, it } from 'vitest';
import {
  ARROW_HEIGHT,
  ARROW_INSET,
  BUBBLE_EDGE,
  BUBBLE_GAP,
  placeBubble,
  placeBubbleVertical,
  type Box,
} from './bubblePlacement';

const vp = { width: 1200, height: 800 };
const size = { width: 320, height: 200 };

/** 橫排：角標貼在元件右側外面、與元件頂緣切齊。 */
const block: Box = { top: 400, left: 300, width: 400, height: 120 };
const badge: Box = { top: 400, left: 708, width: 32, height: 24 };

describe('泡泡的位置', () => {
  it('預設在角標上方，尖角頂點距角標 12px，尖角對準角標中心', () => {
    const p = placeBubble(badge, block, size, vp);
    expect(p.side).toBe('above');
    expect(p.top + size.height + ARROW_HEIGHT).toBe(badge.top - BUBBLE_GAP);
    const tipX = badge.left + badge.width / 2;
    expect(p.left + p.arrow).toBe(tipX);
  });

  it('靠近右邊時本體被夾在視窗內，尖角仍跟著角標', () => {
    const nearRight = { ...badge, left: vp.width - 60 };
    const p = placeBubble(nearRight, { ...block, left: vp.width - 460 }, size, vp);
    expect(p.left + size.width).toBe(vp.width - BUBBLE_EDGE);
    expect(p.left + p.arrow).toBe(nearRight.left + nearRight.width / 2);
  });

  it('靠近左邊時也一樣', () => {
    const nearLeft = { ...badge, left: 24 };
    const p = placeBubble(nearLeft, { ...block, left: -400 }, size, vp);
    expect(p.left).toBe(BUBBLE_EDGE);
    expect(p.left + p.arrow).toBe(nearLeft.left + nearLeft.width / 2);
  });

  it('角標貼到視窗邊時，尖角停在圓角之前，不畫到圓角上', () => {
    const edge = { ...badge, left: 0 };
    const p = placeBubble(edge, { ...block, left: -400 }, size, vp);
    expect(p.arrow).toBe(ARROW_INSET);
  });

  it('上方空間不夠就往下彈', () => {
    const top = 60;
    // 一行字的元件，跟角標一樣高：往下彈不會壓到它
    const short: Box = { ...block, top, height: 24 };
    const p = placeBubble({ ...badge, top }, short, size, vp);
    expect(p.side).toBe('below');
    expect(p.top - ARROW_HEIGHT).toBe(top + badge.height + BUBBLE_GAP);
  });

  it('上方不夠、往下又會壓到元件（橫排角標在元件側邊）時，改從元件下緣中心彈出', () => {
    const top = 60;
    const p = placeBubble({ ...badge, top }, { ...block, top }, size, vp);
    expect(p.side).toBe('below');
    expect(p.top - ARROW_HEIGHT).toBe(top + block.height + BUBBLE_GAP);
    expect(p.left + p.arrow).toBe(block.left + block.width / 2);
  });

  it('直排時角標在元件下方，往上彈會蓋到元件，所以往下', () => {
    const under: Box = { top: block.top + block.height + 8, left: 668, width: 32, height: 24 };
    const p = placeBubble(under, block, size, vp);
    expect(p.side).toBe('below');
    expect(p.top).toBeGreaterThan(block.top + block.height);
  });

  it('元件很大、上下都不夠時，從元件下緣中心彈出', () => {
    const huge: Box = { top: 40, left: 100, width: 800, height: 700 };
    const b: Box = { top: 40, left: 908, width: 32, height: 24 };
    const p = placeBubble(b, huge, size, vp);
    expect(p.side).toBe('below');
    expect(p.left + p.arrow).toBe(huge.left + huge.width / 2);
    // 下緣已經超出視窗，本體被夾回視窗內
    expect(p.top + size.height).toBe(vp.height - BUBBLE_EDGE);
  });

  it('元件下方還有空間時，尖角頂點距元件下緣 12px', () => {
    const tall: Box = { top: 40, left: 100, width: 800, height: 500 };
    const b: Box = { top: 40, left: 908, width: 32, height: 24 };
    const p = placeBubble(b, tall, size, vp);
    expect(p.top - ARROW_HEIGHT).toBe(tall.top + tall.height + BUBBLE_GAP);
  });
});

describe('直排書的泡泡', () => {
  /** 直排的一個元件：窄而高的一欄。 */
  const col: Box = { top: 120, left: 600, width: 90, height: 500 };

  it('預設在元件左邊，尖角在本體右緣、對準元件的垂直中心', () => {
    const p = placeBubbleVertical(col, col, size, vp);
    expect(p.side).toBe('left');
    expect(p.left + size.width + ARROW_HEIGHT).toBe(col.left - BUBBLE_GAP);
    expect(p.top + p.arrow).toBe(col.top + col.height / 2);
  });

  it('左邊放不下就放右邊', () => {
    const nearLeft = { ...col, left: 100 };
    const p = placeBubbleVertical(nearLeft, nearLeft, size, vp);
    expect(p.side).toBe('right');
    expect(p.left - ARROW_HEIGHT).toBe(nearLeft.left + nearLeft.width + BUBBLE_GAP);
  });

  it('左右都放不下就退回上下的規則', () => {
    const wide: Box = { top: 120, left: 200, width: 800, height: 300 };
    const p = placeBubbleVertical(wide, wide, size, vp);
    expect(['above', 'below']).toContain(p.side);
  });
});
