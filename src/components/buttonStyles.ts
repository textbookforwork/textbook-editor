import { css } from 'styled-components';

/**
 * 主要按鈕（上傳、匯入這類「把東西帶進來」的動作），照 Figma Button 的主要樣式：
 * 黑色實心膠囊、白字、圖示在文字之後。全站的上傳鈕都用這一份，長相才會一致；
 * 上傳鈕的圖示一律是 16px 的 upload（向上箭頭），不依內容換成圖片、影片圖示。
 * 次要動作（清除、取消）不用這個，維持白底灰框。
 */
export const primaryButtonCss = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.space.gapSm};
  min-block-size: ${(p) => p.theme.control.heightSm};
  padding: 0 20px;
  border: none;
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.action.primaryBg};
  color: ${(p) => p.theme.action.primaryText};
  font: inherit;
  font-size: ${(p) => p.theme.typography.bodySmSize};
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;

  svg { flex: none; }
  &:hover:not(:disabled) { background: ${(p) => p.theme.action.primaryBgHover}; }
  &:disabled {
    cursor: default;
    background: ${(p) => p.theme.action.disabledBg};
    color: ${(p) => p.theme.action.disabledText};
  }
`;
