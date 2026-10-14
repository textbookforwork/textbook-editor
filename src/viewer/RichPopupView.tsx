import { useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { Icon } from '../components/Icon';
import { richPagesOf } from '../model/popups';
import styled from 'styled-components';
import { BlockView } from '../components/BlockView';
import type { SizingContext } from '../model/blockSizing';
import type { DocSettings, PopupItem } from '../model/types';
import { PAGE_PADDING } from '../model/pageSize';

export type RichItem = Extract<PopupItem, { kind: 'rich' }>;

/**
 * 大彈窗裡的排版設定。永遠橫排、預設字級——它是一個視窗，不是教材的一頁，
 * 不跟著整本的直排或字級檔位走；學生在直排的國文課本裡點開補充，看到的也是橫排。
 */
export const RICH_SETTINGS: DocSettings = {
  writingMode: 'horizontal',
  aspectRatio: '4:3',
  textScale: 'md',
};

/**
 * 大彈窗的一頁：固定的 16:9 頁座標（1280×720、四周留白 48），比例跟編輯視窗一致，內容寬剛好從頁籤到關閉鈕；
 * 編輯與閱讀都把這一頁整個等比縮放進視窗。所以老師編的那一頁就是學生看到的那一頁，
 * 內容也不會往下長——放不下的要新增頁面。
 */
export const RICH_PAGE = { width: 1280, height: 720 };
export const RICH_PAD = PAGE_PADDING;
export const RICH_SIZING: SizingContext = {
  inlineSize: RICH_PAGE.width - RICH_PAD * 2,
  maxBlockSize: RICH_PAGE.height - RICH_PAD * 2,
  vertical: false,
};

/** 把固定大小的頁縮放進容器的倍率 */
export function useFitScale(ref: RefObject<HTMLElement | null>): number {
  const [scale, setScale] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => setScale(Math.min(el.clientWidth / RICH_PAGE.width, el.clientHeight / RICH_PAGE.height));
    read();
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(read);
    ro?.observe(el);
    return () => ro?.disconnect();
  }, [ref]);
  return scale;
}

/**
 * 大彈窗的閱讀畫面：把補充裡的元件一個接一個畫出來，唯讀。
 *
 * 用的是頁面上同一個 BlockView，所以字級層級、圖說、重點詞的樣子
 * 跟課文一致——老師在編輯器裡看到的就是學生看到的。
 */
export function RichPopupView({ item }: { item: RichItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const scale = useFitScale(ref);
  const pages = richPagesOf(item);
  // 一次看一頁；有好幾頁時下方有左右箭頭與頁數圓點
  const [at, setAt] = useState(0);
  const blocks = pages[Math.min(at, pages.length - 1)] ?? [];

  return (
    <>
      <Stage ref={ref}>
        {scale > 0 && (
          <RichPage style={{ transform: `scale(${scale})` }}>
            {blocks.map((b) => (
              <Item key={b.id} $fit={b.type !== 'text'} $float={b.float}>
                <BlockView block={b} settings={RICH_SETTINGS} sizing={RICH_SIZING} />
              </Item>
            ))}
            {blocks.length === 0 && <Empty>這個大彈窗還沒有內容</Empty>}
          </RichPage>
        )}
      </Stage>
      {pages.length > 1 && (
        <Pager>
          <PageBtn type="button" onClick={() => setAt((i) => Math.max(0, i - 1))} disabled={at === 0} aria-label="上一頁">
            <Icon name="chevron-left" size={20} />
          </PageBtn>
          <Dots aria-label={`第 ${at + 1} 頁，共 ${pages.length} 頁`}>
            {pages.map((_, i) => (
              <Dot key={i} type="button" $on={i === at} aria-label={`第 ${i + 1} 頁`} onClick={() => setAt(i)} />
            ))}
          </Dots>
          <PageBtn
            type="button"
            onClick={() => setAt((i) => Math.min(pages.length - 1, i + 1))}
            disabled={at === pages.length - 1}
            aria-label="下一頁"
          >
            <Icon name="chevron-right" size={20} />
          </PageBtn>
        </Pager>
      )}
    </>
  );
}

const Pager = styled.div`
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.space.gapMd};
  padding: 0 0 ${(p) => p.theme.space.insetMd};
  writing-mode: horizontal-tb;
`;

const PageBtn = styled.button`
  display: grid;
  place-items: center;
  inline-size: 36px;
  block-size: 36px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.sunken};
  color: ${(p) => p.theme.icon.default};
  cursor: pointer;
  &:hover:not(:disabled) { background: ${(p) => p.theme.surface.muted}; }
  &:disabled { color: ${(p) => p.theme.icon.disabled}; cursor: default; }
`;

const Dots = styled.div`
  display: flex;
  gap: 6px;
`;

const Dot = styled.button<{ $on: boolean }>`
  inline-size: ${(p) => (p.$on ? '20px' : '8px')};
  block-size: 8px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${(p) => (p.$on ? p.theme.text.primary : p.theme.border.default)};
  cursor: pointer;
  transition: inline-size 0.15s;
`;

/** 放頁的區域：量它的寬高算倍率，頁置中 */
const Stage = styled.div`
  position: relative;
  flex: none;
  /* 一頁 16:9；視窗太矮就讓它矮一點，頁再等比縮小置中 */
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  max-block-size: calc(100vh - 200px);
  overflow: hidden;
  /* 不管教材是直排還是橫排，大彈窗都橫著讀 */
  writing-mode: horizontal-tb;
`;

/**
 * 一頁（頁座標，縮放靠 transform）。外層 grid 置中用的是縮放前的大小，
 * 所以用負邊距把多出來的版面收掉，視覺上才會剛好置中。
 */
export const richPageCss = `
  box-sizing: border-box;
  inline-size: ${RICH_PAGE.width}px;
  block-size: ${RICH_PAGE.height}px;
  padding: ${PAGE_PADDING}px;
  /* 一般區塊排版（不用 flex）：元件可以靠左／靠右，後面的內容排在旁邊 */
  display: flow-root;
  overflow: hidden;
  writing-mode: horizontal-tb;
`;

/** 頁裡每一項：上下間距 16；靠左／靠右的元件跟旁邊內容也隔 16 */
export const richItemCss = (float?: 'left' | 'right') => `
  margin-block-end: 16px;
  ${
    float === 'left'
      ? 'float: left; margin-inline-end: 16px;'
      : float === 'right'
        ? 'float: right; margin-inline-start: 16px;'
        : ''
  }
`;

const RichPage = styled.div`
  ${richPageCss}
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -${RICH_PAGE.width / 2}px;
  margin-top: -${RICH_PAGE.height / 2}px;
  transform-origin: center;
  background: ${(p) => p.theme.surface.raised};
`;

const Item = styled.div<{ $fit?: boolean; $float?: 'left' | 'right' }>`
  min-inline-size: 0;
  ${(p) => richItemCss(p.$float)}
  ${(p) => p.$fit && 'inline-size: fit-content; max-inline-size: 100%;'}
`;

const Empty = styled.p`
  margin: 0;
  text-align: center;
  font-size: var(--ds-typography-body-sm-size);
  color: ${(p) => p.theme.text.tertiary};
`;
