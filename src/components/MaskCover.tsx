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

/**
 * 整個元件的遮罩：跟元件一樣大，疊在元件上，不佔版面。
 * 閱讀時點了淡出；打開過的記著（見 viewer/masks），換頁再回來仍是開的。
 */
export function MaskCover({ blockId, editing, live }: Props) {
  useMaskVersion();
  const key = maskKey(blockId);
  const [fading, setFading] = useState(false);

  if (editing) {
    return (
      <Hatch aria-hidden="true">
        <Tag>
          <Icon name="eye-off" size={16} />
          遮住
        </Tag>
      </Hatch>
    );
  }
  if (isMaskShown(key)) return null;
  return (
    <Cover
      as={live ? 'button' : 'div'}
      type={live ? 'button' : undefined}
      $fading={fading}
      onClick={
        live
          ? (e: React.MouseEvent) => {
              // 點遮罩只打開遮罩，不同時打開這個元件的補充
              e.stopPropagation();
              setFading(true);
              window.setTimeout(() => revealMask(key), 200);
            }
          : undefined
      }
    >
      {live && <Hint>點我看</Hint>}
    </Cover>
  );
}

/** 編輯時：斜線底紋，看得到底下的內容 */
const Hatch = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  border-radius: 6px;
  background: repeating-linear-gradient(
    135deg,
    color-mix(in srgb, ${(p) => p.theme.text.tertiary} 22%, transparent) 0 2px,
    transparent 2px 8px
  );
  box-shadow: inset 0 0 0 1px color-mix(in srgb, ${(p) => p.theme.text.tertiary} 45%, transparent);
`;

const Tag = styled.span`
  position: absolute;
  inset-block-start: 6px;
  inset-inline-start: 6px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px 2px 6px;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.text.secondary};
  font-size: 12px;
  line-height: 18px;
  writing-mode: horizontal-tb;
  box-shadow: 0 1px 3px rgba(26, 25, 23, 0.12);
`;

/** 閱讀時：淡灰色實心遮罩 */
const Cover = styled.div<{ $fading: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  place-items: center;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: ${(p) => p.theme.surface.muted};
  font: inherit;
  cursor: pointer;
  opacity: ${(p) => (p.$fading ? 0 : 1)};
  transition: opacity 0.2s ease, background-color 0.15s;
  &:hover { background: color-mix(in srgb, ${(p) => p.theme.surface.muted} 85%, ${(p) => p.theme.text.tertiary}); }
  &:focus-visible { outline: 2px solid ${(p) => p.theme.border.focus}; outline-offset: 4px; }
`;

const Hint = styled.span`
  padding: 6px 14px;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.text.secondary};
  font-size: 15px;
  writing-mode: horizontal-tb;
`;
