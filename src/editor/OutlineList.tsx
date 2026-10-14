import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../components/Icon';
import { ConfirmDialog } from './ConfirmDialog';
import { outlineOf, pageOfRow, type OutlineItem } from '../model/outline';
import { rowOf, type Action } from '../model/actions';
import type { Page } from '../model/paginate';
import type { Doc, TextBlock } from '../model/types';

/** 目次列到第幾層：0＝章、1＝節。 */
export const TOC_DEPTH = 1;

type Props = {
  doc: Doc;
  pages: Page[];
  /** 目前這一頁：預覽是正在看的那頁，編輯是捲到畫面中的那頁。 */
  current: number;
  onGoRow: (rowId: string) => void;
  /** 不給就是唯讀（預覽模式）：只能跳，不能改名、不能刪。 */
  dispatch?: (action: Action) => void;
};

type Confirm = { title: string; run: () => void };

const kindOf = (item: OutlineItem) => (item.depth === 0 ? '章' : '節');

/**
 * 那一條目次對應的標題元件。outline 只記 rowId，改名要找到元件才送得了 setText。
 * 先找同一列裡角色相同的那一段（章、節的標題就是它），找不到才退回第一段文字。
 */
function headingBlockOf(doc: Doc, item: OutlineItem): TextBlock | null {
  const row = rowOf(doc.rows, item.rowId);
  if (!row) return null;
  const texts = row.columns.flatMap((c) => c.blocks).filter((b): b is TextBlock => b.type === 'text');
  return texts.find((b) => b.role === item.role) ?? texts[0] ?? null;
}

/**
 * 刪整章／整節的範圍：從這個標題那一列起，到下一個「層級相同或更高」的標題之前。
 * 用完整的目次算（不是只列到 TOC_DEPTH 的那份）——中標小標都在這一節裡，要一起走。
 */
function sectionRowIds(doc: Doc, full: OutlineItem[], item: OutlineItem): string[] {
  const at = full.findIndex((i) => i.rowId === item.rowId && i.role === item.role);
  const end = full.slice(at + 1).find((i) => i.depth <= item.depth);
  const ids = doc.rows.map((r) => r.id);
  const s = ids.indexOf(item.rowId);
  const e = end ? ids.indexOf(end.rowId) : ids.length;
  return s < 0 ? [] : ids.slice(s, e);
}

/**
 * 左側欄的目次分頁。
 *
 * 目次由內容的角色算出來（outline.ts），不另外存：老師把一段從「節」改成「內文」，
 * 目次就該跟著少一條。這裡只做三件事：跳過去、改名、刪整段。
 */
export function OutlineList({ doc, pages, current, onGoRow, dispatch }: Props) {
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [confirm, setConfirm] = useState<Confirm | null>(null);

  const full = outlineOf(doc);
  // 只列章與節。中標以下太細，列出來整條欄都是字，反而找不到大段落；
  // 要找細的段落用頁面縮圖
  const outline = full.filter((i) => i.depth <= TOC_DEPTH);
  const pageOf = outline.map((i) => pageOfRow(pages, i.rowId));
  // 目前所在的那一節：頁碼不超過目前這一頁的最後一個標題。只亮一條——
  // 同一頁有兩個標題時全部一起亮，就看不出自己在哪一節
  const activeIndex = pageOf.reduce((acc, pg, i) => (pg >= 0 && pg <= current ? i : acc), -1);

  // 目前那一節要一直看得到：捲動編輯區時，目次跟著捲過去
  const onRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    onRef.current?.scrollIntoView({ block: 'nearest' });
  }, [current]);

  const startRename = (item: OutlineItem) => {
    if (!dispatch) return;
    setEditing(item.rowId);
    setDraft(item.text);
  };

  const commitRename = (item: OutlineItem) => {
    setEditing(null);
    const text = draft.trim();
    // 空的標題會從目次消失，老師會以為刪掉了；沒改就不送，不佔一次復原
    if (!dispatch || !text || text === item.text) return;
    const block = headingBlockOf(doc, item);
    if (block) dispatch({ type: 'setText', blockId: block.id, text });
  };

  const deleteReason = (item: OutlineItem): string | null => {
    const rowIds = sectionRowIds(doc, full, item);
    // 刪到整本只剩空白也可以：reducer 會留一段空標題，刪錯了能復原
    if (rowIds.length === 0) return '找不到這一段的範圍';
    return null;
  };

  const askDelete = (item: OutlineItem) => {
    if (!dispatch || deleteReason(item)) return;
    const rowIds = sectionRowIds(doc, full, item);
    setConfirm({
      title: `刪除「${item.text}」整${kindOf(item)}？`,
      run: () => dispatch({ type: 'deleteRows', rowIds }),
    });
  };

  return (
    <>
      <Scroll>
        {outline.length === 0 && <Empty>尚無標題</Empty>}
        {outline.map((item, i) => {
          const page = pageOf[i];
          const on = i === activeIndex;
          const reason = dispatch ? deleteReason(item) : null;
          return (
            <Entry key={item.rowId} ref={on ? onRef : undefined} $on={on} $depth={item.depth}>
              {editing === item.rowId ? (
                <Rename
                  autoFocus
                  value={draft}
                  aria-label="重新命名"
                  onChange={(e) => setDraft(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  onBlur={() => commitRename(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      commitRename(item);
                    } else if (e.key === 'Escape') {
                      e.preventDefault();
                      setEditing(null);
                    }
                  }}
                />
              ) : (
                <Go
                  type="button"
                  $on={on}
                  $depth={item.depth}
                  aria-current={on ? 'location' : undefined}
                  onClick={() => onGoRow(item.rowId)}
                  onDoubleClick={() => startRename(item)}
                  title={dispatch ? '點一下跳過去，點兩下改名' : undefined}
                >
                  <EntryText>{item.text}</EntryText>
                  {page >= 0 && <EntryPage $on={on}>{page + 1}</EntryPage>}
                </Go>
              )}
              {dispatch && editing !== item.rowId && (
                <TrashWrap title={reason ?? `刪除整${kindOf(item)}`}>
                  <Trash
                    type="button"
                    disabled={!!reason}
                    aria-label={`刪除「${item.text}」整${kindOf(item)}`}
                    onClick={() => askDelete(item)}
                  >
                    <Icon name="trash" size={16} />
                  </Trash>
                </TrashWrap>
              )}
            </Entry>
          );
        })}
      </Scroll>

      {confirm && (
        <ConfirmDialog
          title={confirm.title}
          confirmLabel="刪除"
          onConfirm={() => {
            confirm.run();
            setConfirm(null);
          }}
          onCancel={() => setConfirm(null)}
        />
      )}
    </>
  );
}

const Scroll = styled.div`
  flex: 1;
  min-block-size: 0;
  overflow-y: auto;
  overflow-x: hidden;
  /* 捲軸樣式在 GlobalStyle（全站同一套）。這裡一直預留它的 6px，出現與否都不會把內容擠動 */
  scrollbar-gutter: stable;
  padding: ${(p) => p.theme.space.insetSm} ${(p) => p.theme.space.gapXs} ${(p) => p.theme.space.insetSm} ${(p) => p.theme.space.gapXs};
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

/**
 * 目次的一條：跳轉鈕佔滿、垃圾桶疊在右端滑過才出現。
 * 兩顆都是按鈕，所以外殼不能是 button（按鈕不能包按鈕）。
 * 選中用中性灰底，頁碼跟縮圖的頁碼一樣轉成藍色——兩個分頁的「目前位置」長得一致。
 */
const Entry = styled.div<{ $on: boolean; $depth: number }>`
  position: relative;
  display: flex;
  align-items: center;
  /* 縮排就是標題層級，不必再標「章／節」。縮在整列上，灰底才會跟著縮進去 */
  margin-inline-start: ${(p) => p.$depth * 12}px;
  border-radius: ${(p) => p.theme.radius.field};
  background: ${(p) => (p.$on ? p.theme.surface.sunken : 'transparent')};
  transition: background 0.12s;

  &:hover { background: ${(p) => p.theme.surface.sunken}; }
`;

const Go = styled.button<{ $depth: number; $on: boolean }>`
  flex: 1;
  min-inline-size: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  text-align: start;
  font-size: var(--ds-typography-body-sm-size);
  line-height: 1.4;
  padding: 8px;
  /* 滑過時右端讓給垃圾桶，長標題在它前面就截斷，不會被壓住 */
  ${Entry}:hover & { padding-inline-end: 36px; }
  min-block-size: 36px;
  cursor: pointer;
  border: none;
  border-radius: ${(p) => p.theme.radius.field};
  background: transparent;
  color: ${(p) => (p.$depth === 0 || p.$on ? p.theme.text.primary : p.theme.text.secondary)};
  font-weight: ${(p) => (p.$depth === 0 ? 600 : p.$on ? 500 : 400)};
`;

const EntryText = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EntryPage = styled.span<{ $on: boolean }>`
  flex: none;
  color: ${(p) => (p.$on ? p.theme.text.primary : p.theme.text.tertiary)};
  font-size: var(--ds-typography-label-size);
  font-variant-numeric: tabular-nums;
  /* 滑過時讓位給垃圾桶 */
  ${Entry}:hover & { visibility: hidden; }
`;

const Rename = styled.input`
  flex: 1;
  min-inline-size: 0;
  margin: 2px;
  padding: 0 6px;
  min-block-size: 32px;
  font-size: var(--ds-typography-body-sm-size);
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.focus};
  border-radius: ${(p) => p.theme.radius.field};
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.text.primary};
  outline: none;
`;

const TrashWrap = styled.span`
  position: absolute;
  inset-inline-end: 4px;
  inset-block-start: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.12s;

  ${Entry}:hover &,
  ${Entry}:focus-within & { opacity: 1; }
`;

const Trash = styled.button`
  inline-size: 28px;
  block-size: 28px;
  /* 按鈕預設左右各 6px 內距，24px 寬扣掉後裝不下 16px 圖示，會被擠歪 */
  padding: 0;
  display: grid;
  place-items: center;
  border: none;
  border-radius: ${(p) => p.theme.radius.control};
  background: transparent;
  color: ${(p) => p.theme.icon.default};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${(p) => p.theme.feedback.errorSurface};
    color: ${(p) => p.theme.feedback.errorDefault};
  }
  &:disabled {
    color: ${(p) => p.theme.icon.disabled};
    cursor: default;
  }
`;

const Empty = styled.p`
  margin: 0;
  padding: ${(p) => p.theme.space.insetSm};
  font-size: var(--ds-typography-label-size);
  line-height: 1.6;
  color: ${(p) => p.theme.text.tertiary};
`;
