import { css } from 'styled-components';

/**
 * 方塊按鈕（圖示在上、字在下），插入面板與補充內容的「新增」共用。
 * 照 Figma 方塊按鈕的四種狀態：default 無底無框、hover 淡灰底、
 * focus（鍵盤停在上面、按下去）白底加 border-selected 綠框、disabled 淡灰底淡字。
 * 框一直留著透明的位置，切換狀態時內容不會跳動。字可以直接放，也可以包在 <span> 裡。
 */
export const tileCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  block-size: 72px;
  padding: 0;
  border-radius: ${(p) => p.theme.radius.tile};
  border: 2px solid transparent;
  background: transparent;
  cursor: pointer;
  font-family: inherit;
  /* 圖示和字同一個顏色、一起轉深：圖示全黑配灰字，看起來像兩個不同的東西疊在一起 */
  color: ${(p) => p.theme.text.secondary};
  transition: background 0.12s, border-color 0.12s, color 0.12s;

  /* 字級跟下拉選單、浮動列一樣用 14px，不要獨自小一號 */
  &, span {
    font-size: var(--ds-typography-body-sm-size);
    line-height: 1;
    color: inherit;
  }

  /* 浮層是淡白底（#FAFAFA），滑過要深一階才看得出；字和圖示同時轉深 */
  &:hover {
    background: ${(p) => p.theme.surface.muted};
    color: ${(p) => p.theme.text.primary};
  }
  &:focus-visible,
  &:active {
    outline: none;
    background: ${(p) => p.theme.surface.raised};
    border-color: ${(p) => p.theme.border.selected};
    color: ${(p) => p.theme.text.primary};
  }
  &:disabled {
    cursor: default;
    background: ${(p) => p.theme.surface.sunken};
    color: ${(p) => p.theme.action.disabledText};
  }
`;
