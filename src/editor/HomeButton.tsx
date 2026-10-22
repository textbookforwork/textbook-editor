import { useId } from 'react';
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

type Shape = 'chinese' | 'english' | 'science' | 'social' | 'math' | 'other';

/**
 * 科目造型：五個科目各一個幾何形狀與顏色，沒設定科目或不在這五科的維持萊姆鵝卵石（品牌主視覺）。
 * 形狀取自 Figma「色彩與形狀」（node 8:17）那張 60 個形狀的圖，原檔在 design/subject-shapes/。
 *   國語文 B7 方格（轉正）：方塊字一個字一格           Sun
 *   社會   C9 缺一角：疆界與拼圖，人和群體相接           Violet
 *   英語文 D6 帶尖角的圓：對話框的尾巴，開口說           Amber
 *   自然   E2 近六角：蜂巢、雪花、分子                 Forest
 *   數學   E7 往下尖的三角：角度、推理                 Sky
 * 顏色分兩種用法（乙練定的）：書櫃的科目標題用深色，閱讀與自編的回首頁鈕用淺色。
 * 深淺兩色照 Figma「色彩與形狀」的輔助色配對（node 13:500 的 SECONDARY）。2026-10-22 試套，還沒上線。
 */
const SUBJECTS: Record<Exclude<Shape, 'other'>, string[]> = {
  chinese: ['國語', '國文', '國語文'],
  english: ['英語', '英文', '英語文'],
  science: ['自然', '自然科學'],
  social: ['社會', '歷史', '地理'],
  math: ['數學'],
};

export function shapeOf(subject?: string): Shape {
  if (!subject) return 'other';
  const hit = (Object.keys(SUBJECTS) as (keyof typeof SUBJECTS)[]).find((k) => SUBJECTS[k].includes(subject));
  return hit ?? 'other';
}

/** w、h 是路徑自己的座標範圍；畫的時候等比縮進 32×32 的格子裡置中。 */
type ShapeDef = { d: string; w: number; h: number; light: string; dark: string };

const SHAPES: Record<Shape, ShapeDef> = {
  other: { d: PEBBLE_PATH, w: 32, h: 32, light: LIME, dark: LIME },
  chinese: {
    d: 'M72.05 77.02C50.63 73.57 26.63 72.79 0 74.69L6.88 0L74.61 0L72.05 77.02Z',
    w: 74.61,
    h: 77.02,
    light: '#FFC2A5',
    dark: '#FF854A',
  },
  english: {
    d: 'M20.02 0.0032267C29.02 0.143227 45.63 9.14323 52.58 16.8832C59.07 23.7732 75.62 30.8532 74.9501 39.9932C74.16 47.4732 56.88 59.5232 46.69 64.0832C37.89 68.5932 27.63 74.5432 22.27 72.5632C14.79 70.7032 5.59005 64.4832 1.55005 53.4332C-0.499952 44.8232 -0.959953 27.0832 2.94005 15.5632C5.13005 8.94323 12.67 -0.196773 20.02 0.0032267Z',
    w: 74.97,
    h: 72.95,
    light: '#FCDD9D',
    dark: '#F3C11B',
  },
  science: {
    d: 'M36.2 0L69.89 12.18L85.32 42.7L67.64 65.74L46.26 80.76L18.93 75.47L0 52.1L9.6 13.77L36.2 0Z',
    w: 85.32,
    h: 80.76,
    light: '#66E497',
    dark: '#00A36E',
  },
  social: {
    d: 'M7.94 60.9C6.13 54.77 3.48 45.25 0 32.37C13.54 19.83 22.73 9.04 27.53 0C38.08 7.32 52.53 10.72 70.89 10.19C71.55 21.14 70.75 34.42 68.5 50.05L42.03 71.5C27.6 67.26 16.24 63.72 7.94 60.9Z',
    w: 71.11,
    h: 71.5,
    light: '#CEA8FF',
    dark: '#7F6CDF',
  },
  math: {
    d: 'M0 29.72L67.64 0L87.9 55.54L41.96 97.11L0 29.72Z',
    w: 87.9,
    h: 97.11,
    light: '#82E6F8',
    dark: '#03C5E9',
  },
};

/** 把形狀等比縮進 32×32、四周留一點邊（鵝卵石本來就畫在 32×32 裡，不動）。 */
function fit(def: ShapeDef): string {
  if (def.w === 32 && def.h === 32) return '';
  const k = 26 / Math.max(def.w, def.h);
  return `translate(${(32 - def.w * k) / 2} ${(32 - def.h * k) / 2}) scale(${k})`;
}

/** 32×32 的剪影。 */
function Silhouette({ shape }: { shape: Shape }) {
  const def = SHAPES[shape];
  const k = 26 / Math.max(def.w, def.h);
  return (
    <g transform={fit(def) || undefined}>
      {/* 懸停的灰圈沿著形狀外緣描，不是一塊圓底：多邊形、凹口都照著走。縮放過的形狀要把線寬除回來 */}
      <path className="halo" d={def.d} fill="none" strokeWidth={fit(def) ? 4 / k : 4} strokeLinejoin="round" />
      <path d={def.d} fill={def.light} />
    </g>
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
      // 回書櫃：從數位教科書（原本）的閱讀畫面回來停在「數位教科書」分頁，其他都回「自編教材」
      onClick={onClick ?? (() => goShelf(window.location.hash.startsWith('#/read/book/') ? 'textbook' : 'mine'))}
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

/** 書櫃分區標題前的科目記號：跟回首頁鈕同一組造型，用深色（回首頁鈕用淺色）。 */
export function SubjectMark({ subject, size = 24 }: { subject?: string; size?: number }) {
  const def = SHAPES[shapeOf(subject)];
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <g transform={fit(def) || undefined}>
        <path d={def.d} fill={def.dark} />
      </g>
    </svg>
  );
}

/**
 * 沒有封面時的預設封面：整張鋪科目的淺色，中間挖出科目形狀透出白紙，不放書名（書名在卡片下方）。
 * 乙練 2026-10-22 從三種做法裡選的 B：淺色底＋鏤空。沒有科目的用萊姆鵝卵石。
 */
export function SubjectCover({ subject }: { subject?: string }) {
  const def = SHAPES[shapeOf(subject)];
  const id = `cover-${useId().replace(/:/g, '')}`;
  const W = 228;
  const H = 283;
  const k = 120 / Math.max(def.w, def.h);
  const t = `translate(${(W - def.w * k) / 2} ${(H - def.h * k) / 2}) scale(${k})`;
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <mask id={id}>
          <rect width={W} height={H} fill="white" />
          <path d={def.d} transform={t} fill="black" />
        </mask>
      </defs>
      <rect width={W} height={H} fill="#FFFFFF" />
      <rect width={W} height={H} fill={def.light} mask={`url(#${id})`} />
    </svg>
  );
}
