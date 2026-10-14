import { css } from 'styled-components';

/**
 * 色票圓點，文字顏色、圖形填色與框線、頁面背景三處共用，長相照 Figma 的色票：
 * 平常只有色塊（加一條極淡的內框，白色、淡色在白底上才看得見邊）；
 * 選中的外面隔一圈跟浮層同色的淡白，再一圈品牌深綠。外圈用 box-shadow 畫，不佔版面、不推擠旁邊。
 */
export const swatchCss = css<{ $on: boolean }>`
  display: grid;
  place-items: center;
  inline-size: 28px;
  block-size: 28px;
  padding: 0;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: ${(p) =>
    p.$on
      ? `inset 0 0 0 1px ${p.theme.border.subtle}, 0 0 0 2px ${p.theme.surface.page}, 0 0 0 4px ${p.theme.brand.accentOnLight}`
      : `inset 0 0 0 1px ${p.theme.border.subtle}`};
  transition: box-shadow 0.12s;

  &:hover {
    box-shadow: ${(p) =>
      p.$on
        ? `inset 0 0 0 1px ${p.theme.border.subtle}, 0 0 0 2px ${p.theme.surface.page}, 0 0 0 4px ${p.theme.brand.accentOnLight}`
        : `inset 0 0 0 1px ${p.theme.border.subtle}, 0 0 0 2px ${p.theme.surface.page}, 0 0 0 3px ${p.theme.border.default}`};
  }
`;

/** 自訂顏色那一格：淡灰底、虛線框、深色加號。真正的 <input type="color"> 藏在裡面。 */
export const customSwatchCss = css<{ $on: boolean }>`
  position: relative;
  line-height: 0;
  color: ${(p) => p.theme.icon.default};
  background: ${(p) => p.theme.surface.sunken};
  /* 2px 的虛線段落比較長；細於 2px 在小圓上會斷得太碎。也不要一般色票那條內框，會跟虛線疊在一起 */
  border: 2px dashed ${(p) => p.theme.border.default};
  box-shadow: ${(p) =>
    p.$on ? `0 0 0 2px ${p.theme.surface.page}, 0 0 0 4px ${p.theme.brand.accentOnLight}` : 'none'};
  &:hover {
    border-color: ${(p) => p.theme.border.hover};
    box-shadow: ${(p) =>
      p.$on ? `0 0 0 2px ${p.theme.surface.page}, 0 0 0 4px ${p.theme.brand.accentOnLight}` : 'none'};
  }

  svg { display: block; }

  input {
    position: absolute;
    inset: 0;
    opacity: 0;
    inline-size: 100%;
    block-size: 100%;
    cursor: pointer;
  }
`;

/** 一排五格；間距留給選中的外圈。 */
export const swatchRowCss = css`
  display: grid;
  grid-template-columns: repeat(5, 28px);
  gap: 10px;
  padding: 4px;
`;
