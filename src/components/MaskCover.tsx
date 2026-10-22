import { useState } from 'react';
import styled from 'styled-components';
import { Icon } from './Icon';
import { isMaskShown, maskKey, revealMask, useMaskVersion } from '../viewer/masks';

type Props = {
  blockId: string;
  /** 編輯時不真的蓋住，只標出「這個會被遮住」，老師才看得到內容繼續改。 */
  editing: boolean;
  /** 能點開（閱讀畫面）。縮圖裡只畫遮罩、點不開。 */
  live: boolean;
  /** 直排：遮罩由右往左退開（閱讀起點在右）。 */
  vertical?: boolean;
};

const LABEL = '遮住：點擊後出現';

/**
 * 整個元件的遮罩：跟元件一樣大，疊在元件上，不佔版面。
 * 閱讀時是一片灰白斜線遮罩，中間一個閉著的眼睛；點了眼睛睜開，遮罩順著閱讀方向慢慢退開
 * （橫排由左往右、直排由右往左）。
 * 打開過的記著（見 viewer/masks），同一次閱讀換頁再回來仍是開的。
 */
export function MaskCover({ blockId, editing, live, vertical }: Props) {
  useMaskVersion();
  const key = maskKey(blockId);
  const [opening, setOpening] = useState(false);

  // 編輯時只鋪一層半透明灰白、畫一圈虛線，內容照樣看得到、改得到
  if (editing) return <Outline aria-hidden="true" title={LABEL} />;
  if (isMaskShown(key)) return null;
  return (
    <Cover
      as={live ? 'button' : 'div'}
      type={live ? 'button' : undefined}
      aria-label={live ? LABEL : undefined}
      $opening={opening}
      $vertical={!!vertical}
      onClick={
        live
          ? (e: React.MouseEvent) => {
              // 點遮罩只打開遮罩，不同時打開這個元件的補充
              e.stopPropagation();
              if (opening) return;
              setOpening(true);
              window.setTimeout(() => revealMask(key), REVEAL_MS + 200);
            }
          : undefined
      }
    >
      <Eye $opening={opening}>
        <Icon name={opening ? 'eye' : 'eye-off'} size={24} />
      </Eye>
    </Cover>
  );
}

/** 遮罩退開的時間：慢一點，有「漸漸揭曉」的感覺 */
const REVEAL_MS = 700;

const Outline = styled.div`
  position: absolute;
  inset: -4px;
  z-index: 2;
  pointer-events: none;
  /* 有遮住的感覺：鋪一層半透明的灰白，底下的內容變淡但還認得出來，老師照樣能改 */
  border: 1.5px dashed ${(p) => p.theme.border.hover};
  border-radius: 10px;
  background: color-mix(in srgb, ${(p) => p.theme.surface.muted} 62%, transparent);
`;

/**
 * 閱讀時：灰白底加細斜線（像一道道刪除線），完全蓋住。
 * 不用霧面模糊——模糊會把圖片邊緣的深色暈出來，也可能透出答案。
 * 打開時用 clip-path 從閱讀起點那一側往另一側收掉。
 */
const Cover = styled.div<{ $opening: boolean; $vertical: boolean }>`
  position: absolute;
  /* 往外多蓋 4px：圖片自己的圓角比較小，不多蓋一點，四個角會露出底下的顏色 */
  inset: -4px;
  z-index: 2;
  display: grid;
  place-items: center;
  padding: 0;
  border: 1px solid ${(p) => p.theme.border.subtle};
  border-radius: 12px;
  background-color: ${(p) => p.theme.surface.sunken};
  background-image: repeating-linear-gradient(
    135deg,
    ${(p) => p.theme.border.subtle} 0 1.5px,
    transparent 1.5px 14px
  );
  font: inherit;
  cursor: pointer;
  clip-path: ${(p) =>
    p.$opening
      ? p.$vertical
        ? 'inset(0 100% 0 0 round 12px)'
        : 'inset(0 0 0 100% round 12px)'
      : 'inset(0 0 0 0 round 12px)'};
  transition: clip-path ${REVEAL_MS}ms cubic-bezier(0.65, 0, 0.35, 1) 120ms;

  /* 滑過只讓中間的眼睛放大一點，不換底色（換了會跟斜線同色、斜線就不見了） */
  &:focus-visible { outline: 2px solid ${(p) => p.theme.border.focus}; outline-offset: 4px; }
  @media (prefers-reduced-motion: reduce) { transition: opacity 0.2s; ${(p) => p.$opening && 'opacity: 0;'} }
`;

/** 中間閉著的眼睛；點了先睜開，再隨遮罩退開 */
const Eye = styled.span<{ $opening: boolean }>`
  display: grid;
  place-items: center;
  inline-size: 56px;
  block-size: 56px;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => (p.$opening ? p.theme.text.primary : p.theme.text.tertiary)};
  box-shadow: 0 2px 8px rgba(26, 25, 23, 0.08);
  transition: color 0.15s, transform 0.15s;
  svg { inline-size: 28px; block-size: 28px; }
  button:hover > & { transform: scale(1.05); color: ${(p) => p.theme.text.secondary}; }
`;
