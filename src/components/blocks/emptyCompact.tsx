import type { ComponentProps } from 'react';
import styled, { css } from 'styled-components';
import type { IconName } from '../../assets/icons.generated';
import { Icon } from '../Icon';
import { primaryButtonCss } from '../buttonStyles';

/**
 * 還沒放東西的圖片、影片、網頁、聲音框，依框實際的大小分兩段：
 *
 *  - 夠大（約 200×150 以上）：整組控制項（生成框、網址欄、上傳鈕，data-full）。
 *  - 比這小：只剩種類圖示（圖片、影片、網頁、音樂符號，data-compact），淡灰、沒有黑色按鈕；
 *    動作名稱（上傳圖片…）放在滑過的提示與報讀裡，點了照樣上傳。
 *    替代文字（data-alt）在小框裡一律藏起來：檔名在直排頁裡會跟著變成直的一長條。
 *
 * 框的寬高是外面給的（boxStyle），size 容器不會改變它的尺寸，分頁量到的不變。
 * 套在空白框本身：它的直接子元素裡要有 data-full 與 data-compact 兩組。
 */
export const emptyCompactCss = css`
  container-type: size;
  & > [data-compact] {
    display: none;
  }
  @container (max-width: 200px) or (max-height: 150px) {
    & > [data-full],
    & > [data-alt] {
      display: none;
    }
    & > [data-compact] {
      display: inline-flex;
    }
    & > [data-compact] [data-label],
    & > [data-compact] [data-action] {
      display: none;
    }
    & > [data-compact] [data-kind] {
      display: inline-flex;
    }
    /* 淡灰的小圓鈕：黑色實心的小點看起來像錯誤記號 */
    & > [data-compact] {
      min-block-size: 0;
      padding: 8px;
      border-radius: 999px;
      background: transparent;
      color: ${(p) => p.theme.icon.secondary};
    }
    & > [data-compact]:hover:not(:disabled) {
      background: ${(p) => p.theme.surface.sunken};
      color: ${(p) => p.theme.icon.default};
    }
  }
`;

/**
 * 小框裡的那一顆：平常是「動作名稱＋動作圖示」（上傳圖片 ↑），
 * 小到放不下字時只剩種類圖示（圖片、影片、網頁），名稱留給滑過的提示與報讀。
 * 圖示放在字後面（設計系統的規則）。
 */
export function CompactAction({
  label,
  action,
  kind,
  primary = true,
  ...rest
}: {
  label: string;
  action: IconName;
  kind: IconName;
  /** 按下去真的會做事（上傳）：跟大框裡同一顆黑色主要按鈕。只是提示（網頁要拉大才能貼網址）就給 false */
  primary?: boolean;
} & Omit<ComponentProps<'button'>, 'ref'>) {
  return (
    <CompactBtn data-compact type="button" title={label} aria-label={label} $primary={primary} {...rest}>
      <span data-label>{label}</span>
      <span data-action>
        <Icon name={action} size={16} />
      </span>
      <span data-kind>
        <Icon name={kind} size={20} />
      </span>
    </CompactBtn>
  );
}

const CompactBtn = styled.button<{ $primary: boolean }>`
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: none;
  border-radius: 999px;
  background: none;
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  color: ${(p) => p.theme.text.secondary};
  ${(p) => p.$primary && primaryButtonCss}
  /* 直排頁裡也正著看 */
  writing-mode: horizontal-tb;
  white-space: nowrap;
  cursor: pointer;
  & > span { display: inline-flex; }
  & > [data-kind] { display: none; }
  ${(p) =>
    !p.$primary &&
    css`
      &:hover {
        background: ${p.theme.surface.sunken};
        color: ${p.theme.text.primary};
      }
    `}
  &:disabled { cursor: default; }
`;
