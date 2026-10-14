import { readyPopups } from '../model/popups';
import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Icon } from '../components/Icon';
import { textOf } from '../model/document';
import { POPUP_KIND, missingOf, titleOf } from '../model/popups';
import { blockRegistry } from '../model/registry';
import type { Page } from '../model/paginate';
import type { Block, PopupItem } from '../model/types';

type Props = {
  /** 這一頁上有掛補充的元件。 */
  blocks: Block[];
  onOpen: (block: Block, item?: PopupItem) => void;
  /**
   * 由外面控制開關時給（閱讀模式的左欄有「補充資源」鈕）。給了就不畫右上角那顆按鈕，
   * 面板也不再避開頂部列——閱讀模式沒有頂部列。
   */
  open?: boolean;
  onClose?: () => void;
};

/** 從一頁裡撈出有掛補充的元件。被切成兩頁的段落在兩頁都會出現，同一個元件只算一次。 */
export function supplementBlocksOf(page: Page): Block[] {
  const seen = new Set<string>();
  const out: Block[] = [];
  for (const item of page.items)
    for (const col of item.row.columns)
      for (const b of col.blocks) {
        if (readyPopups(b).length === 0 || seen.has(b.id)) continue;
        seen.add(b.id);
        out.push(b);
      }
  return out;
}

/** 清單上代表這個元件的一行字。要讓人認得出「是頁面上哪一個」，不是型別名稱。 */
function summaryOf(block: Block): string {
  if (block.type === 'text') {
    const t = textOf(block).trim();
    if (!t) return '空白文字';
    return t.length > 20 ? `${t.slice(0, 20)}…` : t;
  }
  if (block.type === 'image') return `圖：${block.caption.trim() || block.alt.trim() || '未命名'}`;
  const label = blockRegistry[block.type].label;
  return block.label ? `${label}：${block.label}` : label;
}

const EDGE = 12;

/**
 * 按鈕貼在頂部列正下方。頂部列是頁面上第一個 <header>（檢視器的標題列是 portal
 * 到 body 尾端的，排在後面），這樣才不會蓋到「離開預覽」。
 */
function useBelowHeader(): number {
  const [top, setTop] = useState(EDGE);
  useLayoutEffect(() => {
    const read = () =>
      setTop((document.querySelector('header')?.getBoundingClientRect().bottom ?? 0) + EDGE);
    read();
    window.addEventListener('resize', read);
    return () => window.removeEventListener('resize', read);
  }, []);
  return top;
}

/**
 * 閱讀／預覽模式的補充資源面板。
 *
 * 一顆「補充資源」按鈕常駐右上角，預設收起；點了從右側拉出一條面板，
 * 把這一頁所有補充依元件分組列出來——老師講課時要能不找角標就知道
 * 這一頁有什麼可以點。面板是浮層，不推動畫布：畫布的分頁是算好的，
 * 任何擠壓它的東西都會讓頁面縮放跳動。
 */
export function SupplementPanel({ blocks, onOpen, open: controlled, onClose }: Props) {
  const [own, setOwn] = useState(false);
  const isControlled = controlled !== undefined;
  const open = isControlled ? controlled : own;
  const setOpen = (v: boolean | ((x: boolean) => boolean)) => {
    const next = typeof v === 'function' ? v(open) : v;
    if (isControlled) {
      if (!next) onClose?.();
    } else setOwn(next);
  };
  const headerTop = useBelowHeader();
  const top = isControlled ? EDGE : headerTop;
  const total = blocks.reduce((n, b) => n + readyPopups(b).length, 0);

  return createPortal(
    <>
      {/* 開著時按鈕落在面板標題列的右端，同一個位置負責開與收。外面控制時不畫 */}
      {!isControlled && (
      <Fab
        style={{ top }}
        $on={open}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="supplement-panel"
      >
        {open ? '收起' : '補充資源'}
        <Icon name={open ? 'chevron-right' : 'library'} size={20} />
      </Fab>
      )}

      {open && (
        <Panel id="supplement-panel" role="dialog" aria-label="補充資源" style={{ top }}>
          <Head>
            <strong>補充資源</strong>
            <Count>{total} 項</Count>
            {isControlled && (
              <CloseBtn type="button" onClick={() => setOpen(false)} aria-label="關閉" title="關閉">
                <Icon name="x" size={20} label="關閉" />
              </CloseBtn>
            )}
          </Head>
          <List>
            {blocks.length === 0 && <Empty>這一頁沒有補充資源</Empty>}
            {blocks.map((b) => (
              <Group key={b.id}>
                <GroupTitle>{summaryOf(b)}</GroupTitle>
                {readyPopups(b).map((item) => {
                  const missing = missingOf(item);
                  return (
                    <Entry key={item.id} onClick={() => onOpen(b, item)}>
                      <Kind>
                        <Icon name={POPUP_KIND[item.kind].icon} size={20} />
                      </Kind>
                      <Label>
                        <span>{titleOf(item)}</span>
                        {missing && <Warn>{missing}</Warn>}
                      </Label>
                      <Icon name="chevron-right" size={16} />
                    </Entry>
                  );
                })}
              </Group>
            ))}
          </List>
        </Panel>
      )}
    </>,
    document.body
  );
}

const CloseBtn = styled.button`
  margin-inline-start: auto;
  display: grid;
  place-items: center;
  inline-size: 32px;
  block-size: 32px;
  padding: 0;
  border: none;
  border-radius: ${(p) => p.theme.radius.control};
  background: transparent;
  color: ${(p) => p.theme.icon.default};
  cursor: pointer;
  &:hover { background: ${(p) => p.theme.surface.sunken}; }
`;

const Fab = styled.button<{ $on: boolean }>`
  position: fixed;
  inset-inline-end: ${EDGE}px;
  /* 在面板之上，它就是面板的開關 */
  z-index: 945;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: ${(p) => p.theme.control.heightSm};
  padding: 0 ${(p) => p.theme.space.insetSm};
  border-radius: ${(p) => p.theme.radius.control};
  border: ${(p) => p.theme.border.widthDefault} solid
    ${(p) => (p.$on ? p.theme.brand.primaryHover : p.theme.border.subtle)};
  background: ${(p) => (p.$on ? p.theme.brand.primaryTint : p.theme.surface.raised)};
  color: ${(p) => (p.$on ? p.theme.text.primary : p.theme.text.secondary)};
  box-shadow: ${(p) => p.theme.shadow.card};
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    border-color: ${(p) => p.theme.border.hover};
    background: ${(p) => p.theme.surface.sunken};
  }
`;

const Panel = styled.aside`
  position: fixed;
  inset-inline-end: 0;
  inset-block-end: 0;
  z-index: 940;
  inline-size: min(360px, 100vw);
  display: flex;
  flex-direction: column;
  background: ${(p) => p.theme.surface.raised};
  border-inline-start: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  border-start-start-radius: ${(p) => p.theme.radius.panel};
  box-shadow: -16px 0 40px rgba(26, 25, 23, 0.14);
`;

const Head = styled.header`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.gapSm};
  /* 右邊留給那顆開關按鈕 */
  padding: 0 120px 0 ${(p) => p.theme.space.insetLg};
  min-block-size: ${(p) => p.theme.control.heightSm};
  border-block-end: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  font-size: var(--ds-typography-body-sm-size);
`;

const Count = styled.span`
  color: ${(p) => p.theme.text.tertiary};
  font-size: var(--ds-typography-label-size);
`;

const List = styled.div`
  flex: 1;
  min-block-size: 0;
  overflow-y: auto;
  padding: ${(p) => p.theme.space.insetSm} 0 ${(p) => p.theme.space.insetLg};
`;

const Empty = styled.p`
  margin: 0;
  padding: ${(p) => p.theme.space.insetLg};
  color: ${(p) => p.theme.text.tertiary};
  font-size: var(--ds-typography-body-sm-size);
`;

const Group = styled.section`
  padding-block: ${(p) => p.theme.space.insetXs};
`;

const GroupTitle = styled.h3`
  margin: 0;
  padding: ${(p) => p.theme.space.insetXs} ${(p) => p.theme.space.insetLg};
  font-size: var(--ds-typography-label-size);
  font-weight: 600;
  color: ${(p) => p.theme.text.tertiary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Entry = styled.button`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.gapMd};
  inline-size: 100%;
  padding: ${(p) => p.theme.space.insetXs} ${(p) => p.theme.space.insetLg};
  /* 上課用平板點的，觸控目標不能小於 44 */
  min-block-size: 44px;
  border: none;
  background: transparent;
  color: ${(p) => p.theme.text.primary};
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  text-align: start;
  cursor: pointer;

  &:hover { background: ${(p) => p.theme.surface.sunken}; }
`;

const Kind = styled.span`
  display: grid;
  place-items: center;
  flex: none;
  inline-size: 36px;
  block-size: 36px;
  border-radius: ${(p) => p.theme.radius.field};
  background: ${(p) => p.theme.surface.sunken};
  color: ${(p) => p.theme.text.secondary};
`;

const Label = styled.span`
  flex: 1;
  min-inline-size: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;

  & > span:first-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Warn = styled.span`
  font-size: var(--ds-typography-label-size);
  color: ${(p) => p.theme.feedback.warningDefault};
`;
