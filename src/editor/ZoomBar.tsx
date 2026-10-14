import type React from 'react';
import styled from 'styled-components';
import { ZOOM_MAX, ZOOM_MIN } from '../hooks/useZoom';

type Props = {
  percent: number;
  onZoom: (zoom: number) => void;
};

/**
 * 縮放控制：一列，固定在側欄最底部。只有拉桿與數字，不放加減鈕——
 * 側欄窄，按鈕會把拉桿擠得太短。拉桿可用鍵盤方向鍵微調。兩個都讀同一個 percent。
 *
 * 拉桿不是線性的：左半段 25%→100%、右半段 100%→300%，所以 100% 的時候
 * 滑塊剛好在正中間——「整頁放得下」是基準，往左縮、往右放。
 */
const MID = 100;
const toSlider = (pct: number) =>
  pct <= MID
    ? ((pct - ZOOM_MIN * 100) / (MID - ZOOM_MIN * 100)) * 50
    : 50 + ((pct - MID) / (ZOOM_MAX * 100 - MID)) * 50;
const fromSlider = (v: number) =>
  v <= 50
    ? ZOOM_MIN * 100 + (v / 50) * (MID - ZOOM_MIN * 100)
    : MID + ((v - 50) / 50) * (ZOOM_MAX * 100 - MID);
export function ZoomBar({ percent, onZoom }: Props) {
  return (
    <Pill aria-label="縮放" data-ui>
      <Slider
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={toSlider(percent)}
        style={{ '--fill': `${toSlider(percent)}%` } as React.CSSProperties}
        onChange={(e) => onZoom(Math.round(fromSlider(Number(e.target.value))) / 100)}
        aria-label="縮放倍率"
        aria-valuetext={`${percent}%`}
      />
      <Percent type="button" onClick={() => onZoom(1)} title="回到 100%">
        {percent}%
      </Percent>
    </Pill>
  );
}

const Pill = styled.div`
  flex: none;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: ${(p) => p.theme.surface.raised};
  writing-mode: horizontal-tb;
`;

/**
 * 拉桿照 Figma 的 BottomPanel：淡色軌道、白色圓鈕，不用藍色——縮放只是看的方式，
 * 藍留給編輯中的選取。瀏覽器預設的樣子各家不同，所以整個自己畫。
 */
const Slider = styled.input`
  flex: 1;
  min-inline-size: 0;
  margin: 0;
  /* 看起來細，但可以點的高度有 24px，好抓 */
  block-size: 24px;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  cursor: pointer;

  /* 滑塊左邊填一階淺灰，看得出目前拉到哪，但不搶眼 */
  &::-webkit-slider-runnable-track {
    block-size: 6px;
    border-radius: 100px;
    background: linear-gradient(
      to right,
      ${(p) => p.theme.border.default} var(--fill),
      ${(p) => p.theme.surface.sunken} var(--fill)
    );
  }
  &::-moz-range-progress {
    block-size: 6px;
    border-radius: 100px;
    background: ${(p) => p.theme.border.default};
  }
  &::-moz-range-track {
    block-size: 6px;
    border-radius: 100px;
    background: ${(p) => p.theme.surface.sunken};
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    inline-size: 14px;
    block-size: 14px;
    margin-block-start: -4px;
    border-radius: 100px;
    background: ${(p) => p.theme.surface.raised};
    border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.default};
  }
  &::-moz-range-thumb {
    inline-size: 14px;
    block-size: 14px;
    border-radius: 100px;
    background: ${(p) => p.theme.surface.raised};
    border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.default};
  }
  &:focus-visible { outline: none; }
  &:focus-visible::-webkit-slider-thumb { border-color: ${(p) => p.theme.border.hover}; }
`;

/* 按數字回到 100%。外觀維持純文字，不畫成按鈕。 */
const Percent = styled.button`
  min-inline-size: 34px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  text-align: end;
  font-weight: 500;
  font-size: ${(p) => p.theme.typography.captionSize};
  font-variant-numeric: tabular-nums;
  color: ${(p) => p.theme.text.primary};
`;
