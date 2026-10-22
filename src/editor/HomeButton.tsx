import styled from 'styled-components';
import { goShelf } from '../shelf/nav';

/**
 * 回首頁：預設是一顆品牌色 Lime 的有機鵝卵石，依科目換成橘、綠、藍的造型（見 shapeOf）。
 *
 * 這裡的顏色是整個編輯器唯一允許寫字面色值的地方：
 * 它是 logo 不是介面色，不跟著配色 token 換。
 */

export const LIME = '#F0FF62';

/** 依照設計規格繪製的有機鵝卵石造型路徑（對齊 32×32 viewBox） */
export const PEBBLE_PATH =
  'M 11.2 3.0 C 12.66 2.81, 14.21 2.81, 15.72 3.0 C 17.23 3.19, 18.73 3.38, 20.24 4.13 C 21.75 4.88, 23.54 6.2, 24.76 7.52 C 25.99 8.84, 26.98 10.53, 27.59 12.04 C 28.2 13.55, 28.62 15.02, 28.43 16.57 C 28.24 18.12, 27.4 19.82, 26.46 21.37 C 25.52 22.92, 24.15 24.62, 22.78 25.89 C 21.41 27.16, 19.77 28.58, 18.26 29.0 C 16.75 29.42, 15.25 28.85, 13.74 28.43 C 12.23 28.01, 10.73 27.5, 9.22 26.46 C 7.71 25.43, 5.64 23.68, 4.7 22.22 C 3.76 20.76, 3.71 19.21, 3.57 17.7 C 3.43 16.19, 3.71 14.72, 3.85 13.17 C 3.99 11.62, 3.89 9.88, 4.41 8.37 C 4.93 6.86, 5.83 5.02, 6.96 4.13 C 8.09 3.23, 9.74 3.19, 11.2 3.0 Z';

type Shape = 'language' | 'stem' | 'social' | 'other';

/**
 * 依科目換左上角的造型與顏色。三大類：語文、數理、社會；沒設定科目或不在這三類的維持萊姆鵝卵石。
 * 形狀照設計給的三張參考圖描成 32×32 的路徑（不是 Figma 原檔，邊角是目測的）。
 */
const LANGUAGE = ['國語', '英語', '國文', '英文', '國語文'];
const STEM = ['數學', '自然', '自然科學'];
const SOCIAL = ['社會', '歷史', '地理'];

export function shapeOf(subject?: string): Shape {
  if (!subject) return 'other';
  if (LANGUAGE.includes(subject)) return 'language';
  if (STEM.includes(subject)) return 'stem';
  if (SOCIAL.includes(subject)) return 'social';
  return 'other';
}

const SHAPES: Record<Shape, { d: string; fill: string }> = {
  other: { d: PEBBLE_PATH, fill: LIME },
  /* 語文：圓潤的橘色塊 */
  language: {
    d: 'M 11.75 4 C 14.12 2.88, 16.96 2.46, 19.25 3.00 C 21.54 3.54, 24.04 5.42, 25.50 7.25 C 26.96 9.08, 27.92 11.50, 28.00 14.00 C 28.08 16.50, 27.04 19.92, 26.00 22.25 C 24.96 24.58, 23.83 26.88, 21.75 28.00 C 19.67 29.12, 16.00 29.42, 13.50 29.00 C 11.00 28.58, 8.42 27.25, 6.75 25.50 C 5.08 23.75, 3.79 21.12, 3.50 18.50 C 3.21 15.88, 3.62 12.17, 5.00 9.75 C 6.38 7.33, 9.38 5.12, 11.75 4.00 Z',
    fill: '#F8DA9A',
  },
  /* 數理：不規則多邊形，綠 */
  stem: {
    d: 'M 22.35 3 L 27.35 11.9 L 28.85 20.2 L 20.35 29 L 13.35 24.1 L 3.15 21.1 L 6.45 12.7 L 11.45 6.6 Z',
    fill: '#8AE2A0',
  },
  /* 社會：兩道凹口的七邊形，藍 */
  social: {
    d: 'M 6.84 7.2 Q 11 8.2 13.12 4.75 L 23.24 3.35 L 29 12.95 L 27.6 23.94 L 18 28.65 Q 12.6 24.3 7.54 24.29 L 3 17.3 Z',
    fill: '#9AE1F3',
  },
};

/** 32×32 的剪影。 */
function Silhouette({ shape }: { shape: Shape }) {
  const { d, fill } = SHAPES[shape];
  return (
    <>
      {/* 懸停的灰圈沿著形狀外緣描，不是一塊圓底：多邊形、凹口都照著走 */}
      <path className="halo" d={d} fill="none" strokeWidth={4} strokeLinejoin="round" />
      <path d={d} fill={fill} />
    </>
  );
}

type Props = {
  subject?: string;
  /** 不給就是「回首頁」。閱讀模式拿它當「回到編輯」。 */
  onClick?: () => void;
  title?: string;
  /** 56×56，跟閱讀模式左欄的 Tool Tile 同大。 */
  large?: boolean;
};

export function HomeButton({ subject, onClick, title, large }: Props) {
  const label = title ?? '回首頁';
  const px = large ? 56 : 40;
  return (
    <Pebble
      type="button"
      title={label}
      aria-label={label}
      $large={!!large}
      onClick={onClick ?? (() => goShelf())}
    >
      <svg width={px} height={px} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <Silhouette shape={shapeOf(subject)} />
      </svg>
    </Pebble>
  );
}

const Pebble = styled.button<{ $large: boolean }>`
  flex: none;
  width: ${(p) => (p.$large ? p.theme.control.tileMd : p.theme.control.heightMd)};
  height: ${(p) => (p.$large ? p.theme.control.tileMd : p.theme.control.heightMd)};
  display: grid;
  place-items: center;
  padding: 0;
  border: none;
  border-radius: ${(p) => p.theme.radius.control};
  background: transparent;
  cursor: pointer;
  transition: transform 0.15s ease-out, background 0.12s;

  svg { overflow: visible; transition: transform 0.15s ease-out; }
  .halo { stroke: transparent; transition: stroke 0.12s; }

  &:hover,
  &:focus-visible {
    outline: none;
    .halo { stroke: ${(p) => p.theme.surface.muted}; }
    svg { transform: scale(1.12) rotate(-10deg); }
  }
  &:active svg { transform: scale(0.96); }
`;

/** 書櫃分區標題前的科目記號：跟回首頁鈕同一組造型與顏色，24×24。 */
export function SubjectMark({ subject, size = 24 }: { subject?: string; size?: number }) {
  const { d, fill } = SHAPES[shapeOf(subject)];
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d={d} fill={fill} />
    </svg>
  );
}
