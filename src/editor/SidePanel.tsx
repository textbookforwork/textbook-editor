import { useEffect, useRef } from 'react';
import { css } from 'styled-components';
import styled from 'styled-components';

/**
 * 右側面板同一時間只開一個（設定、補充內容、媒體庫、表格都從同一個位置跳出，疊在一起會蓋住彼此）。
 * 打開時把前一個關掉。close 用 ref 存最新的一份，不必讓呼叫端 memo。
 */
let currentPanel: { id: object; close: () => void } | null = null;

export function useExclusivePanel(open: boolean, close: () => void) {
  const closeRef = useRef(close);
  closeRef.current = close;
  const id = useRef({}).current;
  useEffect(() => {
    if (!open) return;
    if (currentPanel && currentPanel.id !== id) currentPanel.close();
    currentPanel = { id, close: () => closeRef.current() };
    return () => {
      if (currentPanel?.id === id) currentPanel = null;
    };
  }, [open, id]);
}

/**
 * 右側浮動面板的外殼，教材設定、補充內容、媒體庫、表格共用，長相照 Figma 自編頁「目次＿彈窗」：
 * 淡白底、圓角 20、只靠陰影，不畫外框也不畫標題分隔線。
 * 從視窗頂端 8px 起，整個蓋住頂部列右側的按鈕（不露出啟用中的黃底）；
 * 一打開就是整條（上下各留 8px），不跟著內容長短伸縮——內容少時半截的面板看起來像沒開完。
 */
export const PanelDrawer = styled.aside`
  position: fixed;
  top: 8px;
  right: 16px;
  z-index: 1000;
  bottom: 8px;
  inline-size: min(300px, calc(100vw - 32px));
  display: flex;
  flex-direction: column;
  background: ${(p) => p.theme.surface.page};
  border-radius: ${(p) => p.theme.radius.panel};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  box-sizing: border-box;
`;

export const PanelHead = styled.header`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.gapSm};
  padding: ${(p) => p.theme.space.insetMd} ${(p) => p.theme.space.insetSm} 0 20px;
  flex-shrink: 0;
`;

export const PanelTitle = styled.strong`
  flex: 1;
  white-space: nowrap;
  font-size: ${(p) => p.theme.typography.bodySize};
  line-height: ${(p) => p.theme.typography.bodyLineHeight};
  font-weight: 500;
  color: ${(p) => p.theme.text.primary};
`;

/** 面板裡的透明小鈕：右上角的關閉（放 24px 的 x）、補充卡片的上移下移刪除。 */
export const PanelClose = styled.button`
  display: inline-flex;
  align-items: center;
  border: none;
  background: transparent;
  color: ${(p) => p.theme.action.ghostText};
  cursor: pointer;
  border-radius: ${(p) => p.theme.radius.control};
  padding: 8px;
  min-block-size: 40px;

  &:disabled { color: ${(p) => p.theme.action.disabledText}; cursor: default; }
  &:not(:disabled):hover { background: ${(p) => p.theme.action.ghostBgHover}; }
`;

export const PanelBody = styled.div`
  flex: 1;
  overflow-y: auto;
  /* 左右 20：面板只有 300 寬，一列三個下拉（階段、年級、學期）才放得下 */
  /* 上方只留 8：標題列本身已經有 40 高的關閉鈕撐開，再加 16 會讓標題跟第一段離太遠 */
  padding: ${(p) => p.theme.space.insetXs} 20px 20px;
  /* 捲軸上下內縮，不要一路畫到底被面板右下角的圓角切掉 */
  &::-webkit-scrollbar-track { margin-top: 4px; margin-bottom: 20px; }
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.stackMd};
`;

/**
 * 面板裡的分頁籤（媒體庫的素材種類、補充資源的類別）。照 Figma：純文字、
 * 選中的是品牌深綠加底線，不畫分隔線。
 */
export const PanelTabs = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${(p) => p.theme.space.gapMd} 20px 0;
  flex-shrink: 0;
`;

export const PanelTab = styled.button<{ $on: boolean }>`
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: ${(p) => (p.$on ? 700 : 500)};
  position: relative;
  padding: 6px 2px 8px;
  border: none;
  background: transparent;
  /* 底線從中間長出來，換分頁籤時看得出移到哪 */
  &::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    block-size: 2px;
    border-radius: 2px;
    background: ${(p) => p.theme.brand.accentOnLight};
    transform: scaleX(${(p) => (p.$on ? 1 : 0)});
    transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  @media (prefers-reduced-motion: reduce) { &::after { transition: none; } }
  color: ${(p) => (p.$on ? p.theme.brand.accentOnLight : p.theme.text.secondary)};
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.15s;
  &:hover { color: ${(p) => (p.$on ? p.theme.brand.accentOnLight : p.theme.text.primary)}; }
  /* 鍵盤選到時：全站共用的方框貼著字太擠，換成圓角的焦點環（同一個顏色），往外留一點空間 */
  border-radius: 8px;
  &:focus-visible {
    outline: ${(p) => p.theme.border.widthFocus} solid ${(p) => p.theme.action.ghostFocusRing};
    outline-offset: 2px;
  }
`;

/**
 * 面板裡的輸入框：跟 Dropdown 同一款淡灰膠囊、不畫框；打字時才出現灰色細框。
 * 左邊留白跟 Dropdown 一樣 12px，輸入框和下拉的字切齊。多行文字框另外把圓角收小（見 fieldAreaCss）。
 */
export const fieldCss = css`
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 400;
  min-block-size: ${(p) => p.theme.control.heightSm};
  padding: 0 12px;
  border: ${(p) => p.theme.border.widthDefault} solid transparent;
  border-radius: ${(p) => p.theme.radius.control};
  /* 底色用 muted（#E5E5E5）：面板是 #FAFAFA，sunken 跟它幾乎同色。輸入時轉白底加框 */
  background: ${(p) => p.theme.surface.muted};
  color: ${(p) => p.theme.text.primary};
  transition: border-color 0.12s, background 0.12s;

  &::placeholder { color: ${(p) => p.theme.text.tertiary}; }
  &:hover { border-color: ${(p) => p.theme.border.default}; }
  &:focus {
    outline: none;
    background: ${(p) => p.theme.surface.raised};
    border-color: ${(p) => p.theme.border.hover};
  }
`;

export const fieldAreaCss = css`
  ${fieldCss}
  padding: 10px 12px;
  border-radius: ${(p) => p.theme.radius.card};
  resize: vertical;
`;
