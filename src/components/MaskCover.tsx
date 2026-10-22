import { useState } from 'react';
import styled from 'styled-components';
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
 * 閱讀時是一片灰白霧面（看得出底下有東西、看不出是什麼），不另外放按鈕，點了淡出；
 * 打開過的記著（見 viewer/masks），同一堂課換頁再回來仍是開的。
 */
export function MaskCover({ blockId, editing, live }: Props) {
  useMaskVersion();
  const key = maskKey(blockId);
  const [fading, setFading] = useState(false);

  // 編輯時只畫一圈虛線、鋪一層極淡的底，內容照樣看得清楚
  if (editing) return <Outline aria-hidden="true" title={LABEL} />;
  if (isMaskShown(key)) return null;
  return (
    <Frost
      as={live ? 'button' : 'div'}
      type={live ? 'button' : undefined}
      aria-label={live ? LABEL : undefined}
      $fading={fading}
      onClick={
        live
          ? (e: React.MouseEvent) => {
              // 點遮罩只打開遮罩，不同時打開這個元件的補充
              e.stopPropagation();
              setFading(true);
              window.setTimeout(() => revealMask(key), 260);
            }
          : undefined
      }
    />
  );
}

const Outline = styled.div`
  position: absolute;
  inset: -4px;
  z-index: 2;
  pointer-events: none;
  border: 1.5px dashed ${(p) => p.theme.border.editing};
  border-radius: 10px;
  background: color-mix(in srgb, ${(p) => p.theme.surface.sunken} 25%, transparent);
`;

/** 閱讀時：霧面玻璃。底下的內容糊成一片，看得出有東西、看不出是什麼 */
const Frost = styled.div<{ $fading: boolean }>`
  position: absolute;
  /* 往外多蓋 4px：圖片自己的圓角比較小，不多蓋一點，四個角會露出底下的顏色 */
  inset: -4px;
  z-index: 2;
  display: grid;
  place-items: center;
  padding: 0;
  border: 1px solid ${(p) => p.theme.border.subtle};
  border-radius: 12px;
  background: color-mix(in srgb, ${(p) => p.theme.surface.sunken} 88%, transparent);
  backdrop-filter: blur(24px) saturate(1.1);
  -webkit-backdrop-filter: blur(24px) saturate(1.1);
  font: inherit;
  cursor: pointer;
  opacity: ${(p) => (p.$fading ? 0 : 1)};
  transition: opacity 0.26s ease;

  &:hover { background: color-mix(in srgb, ${(p) => p.theme.surface.muted} 88%, transparent); }
  &:focus-visible { outline: 2px solid ${(p) => p.theme.border.focus}; outline-offset: 4px; }
`;
