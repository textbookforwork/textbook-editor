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
};

const LABEL = '遮住：點擊後出現';

/**
 * 整個元件的遮罩：跟元件一樣大，疊在元件上，不佔版面。
 * 閱讀時是一塊灰色，什麼都不放；點了遮罩慢慢淡掉，底下的內容慢慢浮現。
 * 打開過的記著（見 viewer/masks），同一次閱讀換頁再回來仍是開的。
 */
export function MaskCover({ blockId, editing, live }: Props) {
  useMaskVersion();
  const key = maskKey(blockId);
  const [opening, setOpening] = useState(false);

  // 編輯時：半透明灰白加細斜線、中間一個閉著的眼睛，看得出「這裡會被遮住」；內容照樣看得到、改得到
  if (editing)
    return (
      <Outline aria-hidden="true" title={LABEL}>
        <Eye>
          <Icon name="eye-off" size={24} />
        </Eye>
      </Outline>
    );
  if (isMaskShown(key)) return null;
  return (
    <Cover
      as={live ? 'button' : 'div'}
      type={live ? 'button' : undefined}
      aria-label={live ? LABEL : undefined}
      $opening={opening}
      onClick={
        live
          ? (e: React.MouseEvent) => {
              // 點遮罩只打開遮罩，不同時打開這個元件的補充
              e.stopPropagation();
              if (opening) return;
              setOpening(true);
              window.setTimeout(() => revealMask(key), REVEAL_MS + 80);
            }
          : undefined
      }
    />
  );
}

/** 遮罩淡掉的時間：慢一點，有「漸漸浮現」的感覺 */
const REVEAL_MS = 900;

const Outline = styled.div`
  position: absolute;
  inset: -4px;
  z-index: 2;
  pointer-events: none;
  /* 有遮住的感覺：鋪一層半透明的灰白，底下的內容變淡但還認得出來，老師照樣能改 */
  display: grid;
  place-items: center;
  border: 1.5px dashed ${(p) => p.theme.border.hover};
  border-radius: 10px;
  background-color: color-mix(in srgb, ${(p) => p.theme.surface.muted} 62%, transparent);
  background-image: repeating-linear-gradient(
    135deg,
    color-mix(in srgb, ${(p) => p.theme.border.hover} 55%, transparent) 0 1.5px,
    transparent 1.5px 14px
  );
`;

/**
 * 閱讀時：一塊實心灰色，完全蓋住，什麼都不放。
 * 不用霧面模糊——模糊會把圖片邊緣的深色暈出來，也可能透出答案。
 */
const Cover = styled.div<{ $opening: boolean }>`
  position: absolute;
  /* 往外多蓋 4px：圖片自己的圓角比較小，不多蓋一點，四個角會露出底下的顏色 */
  inset: -4px;
  z-index: 2;
  display: grid;
  place-items: center;
  padding: 0;
  border: 1px solid ${(p) => p.theme.border.subtle};
  border-radius: 12px;
  background-color: ${(p) => p.theme.surface.muted};
  font: inherit;
  cursor: pointer;
  /* 打開時整塊慢慢淡掉，底下的內容慢慢浮現 */
  opacity: ${(p) => (p.$opening ? 0 : 1)};
  transition: opacity ${REVEAL_MS}ms ease, background-color 0.15s;

  &:hover { background-color: ${(p) => p.theme.border.default}; }
  &:focus-visible { outline: 2px solid ${(p) => p.theme.border.focus}; outline-offset: 4px; }
  @media (prefers-reduced-motion: reduce) { transition: opacity 0.2s; }
`;

/** 編輯時中間閉著的眼睛：告訴老師這個元件閱讀時會被遮住 */
const Eye = styled.span`
  display: grid;
  place-items: center;
  inline-size: 56px;
  block-size: 56px;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.text.secondary};
  box-shadow: 0 2px 8px rgba(26, 25, 23, 0.08);
  svg { inline-size: 28px; block-size: 28px; }
`;
