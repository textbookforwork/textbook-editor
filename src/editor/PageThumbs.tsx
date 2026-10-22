import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import styled from 'styled-components';
import { PageView } from '../components/PageView';
import { Icon } from '../components/Icon';
import { ConfirmDialog } from './ConfirmDialog';
import { WithoutPopupViewer } from '../viewer/PopupViewer';
import { PAGE_SIZE } from '../model/pageSize';
import { makeText } from '../model/document';
import type { Action } from '../model/actions';
import type { Page } from '../model/paginate';
import type { Doc } from '../model/types';

/** 縮圖之間的間距；落點線畫在間距正中。 */
const GAP = 8;
/** 超過這個距離才算拖曳，否則只是點一下。 */
const DRAG_THRESHOLD_PX = 4;
/** 游標離清單上下邊緣多近就開始自動捲動，以及每一幀捲多少。 */
const AUTO_EDGE_PX = 40;
const AUTO_SPEED_PX = 10;

/**
 * 這一頁自己的列。
 *
 * 從上一頁接續下來的那一列屬於上一頁，不算——它是同一段課文被切開的後半，
 * 資料裡只有一列。刪頁、拖頁都只動這些列。
 */
export function ownRowIds(page: Page): string[] {
  return page.items.filter((i) => !i.continuedFromPrev).map((i) => i.row.id);
}

/** 這一頁不能刪的理由；能刪就回傳 null。 */
export function deleteBlockedReason(doc: Doc, page: Page): string | null {
  const own = ownRowIds(page);
  if (own.length === 0) return '這一頁是上一段的接續，要刪請刪上一頁的那一段';
  // 全部刪光會剩一份沒有任何列的文件，連插入點都沒地方掛，老師會卡住
  if (own.length >= doc.rows.length) return '這是教材僅有的內容，不能整頁刪掉';
  return null;
}

/**
 * 把「第 from 頁拖到第 slot 個縫隙」換成搬列的動作。
 *
 * slot 是縫隙編號：0＝最前面、頁數＝最後面。來源頁前後那兩個縫隙都是原地不動。
 * 落點＝縫隙後面第一個「有自己的列」的那一頁的第一列；後面都沒有就搬到最後。
 * 跳過只有接續列的頁，是因為那一列屬於再前面那一頁，插在它前面會把一段課文拆成兩半。
 */
export function moveRowsFor(pages: Page[], from: number, slot: number): Action | null {
  if (slot === from || slot === from + 1) return null;
  const rowIds = ownRowIds(pages[from]);
  if (rowIds.length === 0) return null;
  let beforeRowId: string | null = null;
  for (let i = slot; i < pages.length; i++) {
    if (i === from) continue;
    const own = ownRowIds(pages[i]);
    if (own.length > 0) {
      beforeRowId = own[0];
      break;
    }
  }
  return { type: 'moveRows', rowIds, beforeRowId };
}

type Props = {
  doc: Doc;
  pages: Page[];
  current: number;
  /** 縮圖的寬度（螢幕像素）。倍率由它跟頁寬算出來。 */
  thumbInline: number;
  onGoPage: (index: number) => void;
  /** 不給就是唯讀（預覽模式）：只能跳頁，不能刪、不能拖。 */
  dispatch?: (action: Action) => void;
};

type Confirm = { title: string; run: () => void };

/**
 * 左側欄的頁面縮圖，一欄直排。
 *
 * 縮圖是用**同一個 PageView 縮小**畫的，不是另外做一套簡化的示意圖——
 * 兩套渲染遲早會不一樣，而縮圖跟內文不一樣就等於沒有用。量測結果是共用快取的，
 * 所以縮圖不會讓分頁重算一次。
 *
 * **這個元件必須畫在 EditorProvider 之外。** RowView 只要摸得到編輯脈絡就會掛
 * data-row-id，縮圖也掛的話整份文件會有兩組同樣的 id，捲到某一頁、跳到某一段
 * 都會指到縮圖那一份。
 *
 * 拖曳用 pointer events 不用 HTML5 拖放，理由同 useRowDrag：觸控裝置上 HTML5 拖放
 * 完全不能用，而老師是用平板的。
 */
export function PageThumbs({ doc, pages, current, thumbInline, onGoPage, dispatch }: Props) {
  const size = PAGE_SIZE[doc.settings.aspectRatio];
  const scale = thumbInline / size.width;
  const listRef = useRef<HTMLDivElement>(null);
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [markTop, setMarkTop] = useState<number | null>(null);
  const [confirm, setConfirm] = useState<Confirm | null>(null);
  // 拖曳結束時瀏覽器還是會補一個 click，要吞掉，否則放下的瞬間會跳頁
  const suppressClick = useRef(false);
  // 新增頁面後要跳到新的那一頁，但頁是 dispatch 之後才重算出來的，先記著要去第幾頁
  const [goAfterAdd, setGoAfterAdd] = useState<number | null>(null);
  useEffect(() => {
    if (goAfterAdd === null || pages.length <= goAfterAdd) return;
    onGoPage(goAfterAdd);
    setGoAfterAdd(null);
  }, [goAfterAdd, pages.length, onGoPage]);

  /**
   * 新增頁面＝在最後放一條換頁線，接一段空白文字。跟元件膠囊上的「換頁」是同一種線，
   * 所以上面照樣會出現「可合併」，按了就併回上一頁——切分與合併的規則不另外改。
   * 放空白文字而不是空列：空列連插入點都沒地方掛，老師進到新頁會無處下手。
   */
  const addPage = () => {
    if (!dispatch) return;
    dispatch({ type: 'insertRow', index: doc.rows.length, blocks: [makeText('', 'body')], breakBefore: true });
    setGoAfterAdd(pages.length);
  };

  // 目前這一頁的縮圖要一直看得到：捲動編輯區時，左側跟著捲過去
  useEffect(() => {
    if (dragFrom !== null) return;
    listRef.current
      ?.querySelector(`[data-thumb="${current}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [current, dragFrom]);

  const askDelete = (index: number) => {
    const page = pages[index];
    if (!dispatch || !page || deleteBlockedReason(doc, page)) return;
    const rowIds = ownRowIds(page);
    setConfirm({
      title: `刪除第 ${index + 1} 頁？`,
      run: () => dispatch({ type: 'deleteRows', rowIds }),
    });
  };

  /** 所有縮圖的位置，依頁碼排（DOM 順序就是頁碼順序）。 */
  const thumbRects = () =>
    [...(listRef.current?.querySelectorAll<HTMLElement>('[data-thumb]') ?? [])].map((el) => ({
      i: Number(el.dataset.thumb),
      r: el.getBoundingClientRect(),
    }));

  /** 游標在哪個縫隙：第一張「中心在游標下方」的縮圖之前；都不是就是最後。 */
  const slotAt = (y: number): { slot: number; top: number } | null => {
    const list = listRef.current;
    const items = thumbRects();
    if (!list || items.length === 0) return null;
    const host = list.getBoundingClientRect();
    const toLocal = (clientY: number) => clientY - host.top + list.scrollTop;
    for (const it of items) {
      if (y < it.r.top + it.r.height / 2) return { slot: it.i, top: toLocal(it.r.top) - GAP / 2 };
    }
    const last = items[items.length - 1];
    return { slot: last.i + 1, top: toLocal(last.r.bottom) + GAP / 2 };
  };

  const beginDrag = (e: React.PointerEvent, from: number) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-thumb]');
    const list = listRef.current;
    if (!el || !list) return;
    const startX = e.clientX;
    const startY = e.clientY;
    let started = false;
    let ghost: HTMLElement | null = null;
    let offsetX = 0;
    let offsetY = 0;
    let lastY = startY;
    let slot: number | null = null;
    let raf = 0;
    let vy = 0;

    const update = () => {
      const hit = slotAt(lastY);
      slot = hit?.slot ?? null;
      setMarkTop(hit?.top ?? null);
    };

    /** 游標貼近清單上下邊緣就自動捲動；捲動時落點也要跟著重算。 */
    const tick = () => {
      raf = 0;
      if (!vy) return;
      list.scrollTop += vy;
      update();
      raf = requestAnimationFrame(tick);
    };
    const autoScroll = (y: number) => {
      const r = list.getBoundingClientRect();
      vy = y < r.top + AUTO_EDGE_PX ? -AUTO_SPEED_PX : y > r.bottom - AUTO_EDGE_PX ? AUTO_SPEED_PX : 0;
      if (vy && !raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (ev: PointerEvent) => {
      if (!started) {
        if (Math.hypot(ev.clientX - startX, ev.clientY - startY) < DRAG_THRESHOLD_PX) return;
        started = true;
        setDragFrom(from);
        const r = el.getBoundingClientRect();
        offsetX = startX - r.left;
        offsetY = startY - r.top;
        // 跟著游標的殘影：讓人知道「我正握著這一頁」
        ghost = el.cloneNode(true) as HTMLElement;
        ghost.removeAttribute('data-thumb');
        Object.assign(ghost.style, {
          position: 'fixed',
          left: '0',
          top: '0',
          width: `${r.width}px`,
          margin: '0',
          pointerEvents: 'none',
          zIndex: '9999',
          opacity: '0.9',
          background: 'var(--ds-surface-raised)',
          boxShadow: 'var(--ds-shadow-float)',
        });
        document.body.appendChild(ghost);
      }
      lastY = ev.clientY;
      if (ghost) ghost.style.transform = `translate(${ev.clientX - offsetX}px, ${ev.clientY - offsetY}px)`;
      update();
      autoScroll(ev.clientY);
    };

    const finish = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', finish);
      window.removeEventListener('pointercancel', finish);
      vy = 0;
      cancelAnimationFrame(raf);
      ghost?.remove();
      if (!started) return;
      // 放開的位置才是真正的落點；click 會在 pointerup 之後補來，吞掉這一次
      suppressClick.current = true;
      setTimeout(() => (suppressClick.current = false), 0);
      setDragFrom(null);
      setMarkTop(null);
      if (slot === null || !dispatch) return;
      const action = moveRowsFor(pages, from, slot);
      if (action) dispatch(action);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', finish);
    window.addEventListener('pointercancel', finish);
    e.preventDefault();
  };

  const onKey = (e: ReactKeyboardEvent, i: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onGoPage(i);
    }
  };

  return (
    <>
      <List ref={listRef} role="list" aria-label="頁面縮圖">
        {pages.map((p, i) => {
          const on = i === current;
          const reason = dispatch ? deleteBlockedReason(doc, p) : null;
          const draggable = !!dispatch && ownRowIds(p).length > 0;
          return (
            <Thumb
              key={p.index}
              data-thumb={i}
              role="listitem"
              tabIndex={0}
              aria-current={on ? 'page' : undefined}
              aria-label={`第 ${i + 1} 頁`}
              $on={on}
              $dragging={dragFrom === i}
              $draggable={draggable}
              onPointerDown={(e) => {
                if (e.button !== 0 || !draggable) return;
                if ((e.target as HTMLElement).closest('[data-trash]')) return;
                beginDrag(e, i);
              }}
              onClick={() => {
                if (suppressClick.current) return;
                onGoPage(i);
              }}
              onKeyDown={(e) => onKey(e, i)}
            >
              {/* 頁碼在縮圖左側，跟閱讀順序一致：先看到第幾頁，再看到長相 */}
              <Num $on={on}>{i + 1}</Num>
              <ShotWrap>
                <Shot $on={on} style={{ width: size.width * scale, height: size.height * scale }}>
                  {/* 縮圖不能被點進去編輯，所以不傳 rowIndexOf——
                      沒有它就是唯讀，跟預覽走同一條路徑 */}
                  <WithoutPopupViewer>
                    <PageView page={p} settings={doc.settings} scale={scale} thumbnail />
                  </WithoutPopupViewer>
                </Shot>
                {/* 不能刪的縮圖留著按鈕但停用，滑過看得到理由；整顆拿掉老師會以為是壞掉 */}
                {dispatch && (
                  <TrashWrap data-trash title={reason ?? `刪除第 ${i + 1} 頁`}>
                    <Trash
                      type="button"
                      disabled={!!reason}
                      aria-label={`刪除第 ${i + 1} 頁`}
                      onClick={(e) => {
                        e.stopPropagation();
                        askDelete(i);
                      }}
                    >
                      <Icon name="trash" size={16} />
                    </Trash>
                  </TrashWrap>
                )}
              </ShotWrap>
            </Thumb>
          );
        })}
        {/* 新增頁面：排在最後一張縮圖後面，跟縮圖同大小的虛線框，一看就知道是「下一頁放這裡」 */}
        {dispatch && (
          <AddThumb type="button" onClick={addPage} aria-label="新增頁面" title="在最後新增一頁">
            <Num $on={false} />
            <AddShot style={{ width: size.width * scale, height: size.height * scale }}>
              <Icon name="plus" size={20} />
            </AddShot>
          </AddThumb>
        )}
        {markTop !== null && <DropMark style={{ top: markTop }} />}
      </List>

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

const List = styled.div`
  position: relative;
  flex: 1;
  min-block-size: 0;
  overflow-y: auto;
  overflow-x: hidden;
  /* 捲軸樣式在 GlobalStyle（全站同一套）。這裡一直預留它的 6px，
     出現與否都不會把內容擠動、也不會壓到頁碼 */
  scrollbar-gutter: stable;
  /* 左右留白壓到最小：這一欄本來就窄，頁碼貼著邊就好 */
  padding: ${(p) => p.theme.space.insetSm} 2px ${(p) => p.theme.space.insetSm} 6px;
  display: flex;
  flex-direction: column;
  gap: ${GAP}px;
`;

/** 縮圖的圓角，與灰底到縮圖的距離。兩者相加就是灰底的圓角。 */
const SHOT_RADIUS = 4;
const THUMB_INSET = 6;

const Thumb = styled.div<{ $on: boolean; $dragging: boolean; $draggable: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  /* 縮圖上、右、下三邊跟灰底等距，灰底圓角＝縮圖圓角＋這段距離，內外兩層的弧線才是同心的 */
  padding: ${THUMB_INSET}px ${THUMB_INSET}px ${THUMB_INSET}px 2px;
  border-radius: ${SHOT_RADIUS + THUMB_INSET}px;
  cursor: ${(p) => (p.$draggable ? 'grab' : 'pointer')};
  /* 「目前這一頁」用淡灰底加粗體頁碼：只是告訴老師你在哪，不用顏色——
     藍留給選取中的元件，淡黃留給按下／啟用的按鈕，畫面上的黃才不會太多 */
  background: ${(p) => (p.$on ? p.theme.surface.sunken : 'transparent')};
  color: ${(p) => (p.$on ? p.theme.text.primary : p.theme.text.tertiary)};
  transition: background 0.12s;

  /* 滑過比目前這一頁再淡一階，兩者分得出來 */
  &:hover { background: ${(p) => (p.$on ? p.theme.surface.sunken : p.theme.surface.page)}; }
  opacity: ${(p) => (p.$dragging ? 0.35 : 1)};
  /* 觸控拖曳時不要讓瀏覽器拿去捲頁 */
  touch-action: none;
  user-select: none;
`;

const Num = styled.span<{ $on: boolean }>`
  flex: none;
  inline-size: 16px;
  padding-block-start: 2px;
  text-align: end;
  font-size: var(--ds-typography-label-size);
  line-height: var(--ds-typography-label-line-height);
  font-weight: ${(p) => (p.$on ? 700 : 500)};
  font-variant-numeric: tabular-nums;
  color: ${(p) => (p.$on ? p.theme.text.primary : p.theme.text.tertiary)};
`;

/** 新增頁面那一格：外層跟縮圖同一套內距，框的大小與圓角也一樣，只是換成虛線、不上陰影。 */
const AddThumb = styled.button`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  padding: ${THUMB_INSET}px ${THUMB_INSET}px ${THUMB_INSET}px 2px;
  border: none;
  border-radius: ${SHOT_RADIUS + THUMB_INSET}px;
  background: transparent;
  cursor: pointer;
  font: inherit;
  color: ${(p) => p.theme.icon.secondary};

  &:hover { color: ${(p) => p.theme.icon.default}; }
  &:hover > span:last-child { border-color: ${(p) => p.theme.border.hover}; background: ${(p) => p.theme.surface.page}; }
  &:focus-visible { outline: 2px solid ${(p) => p.theme.border.focus}; outline-offset: -2px; }
`;

const AddShot = styled.span`
  flex: none;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  border-radius: ${SHOT_RADIUS}px;
  /* 跟空的圖片、網頁元件同一種虛線框 */
  border: ${(p) => p.theme.border.widthDefault} dashed ${(p) => p.theme.border.default};
  transition: border-color 0.12s, background 0.12s;
`;

/** 包住縮圖，好讓垃圾桶貼在它的右上角。 */
const ShotWrap = styled.span`
  position: relative;
  flex: none;
  display: block;
`;

/** 選中的那一頁用外框標出來，跟編輯區的選取框同一種語言。 */
const Shot = styled.div<{ $on: boolean }>`
  overflow: hidden;
  border-radius: ${SHOT_RADIUS}px;
  /* 不畫硬框，用卡片陰影讓白紙在白底上浮出來；目前這一頁的標示由外層的淡黃底負責 */
  box-shadow: ${(p) => p.theme.shadow.card};
  /* 縮圖只是給人認位置的，點的是整塊，裡面不該吃到任何事件 */
  pointer-events: none;
  /* 這幾個值要跟 body（GlobalStyle）一致：縮圖要跟頁面一模一樣才有用 */
  text-align: start;
  color: ${(p) => p.theme.text.primary};
  font-weight: 400;
  font-size: ${(p) => p.theme.typography.bodyLgSize};
  line-height: ${(p) => p.theme.typography.bodyLgLineHeight};
  white-space: normal;
`;

/** 垃圾桶貼在縮圖右上角，滑過或用鍵盤走到才出現。停用時由這層外殼負責顯示理由。 */
const TrashWrap = styled.span`
  position: absolute;
  inset-block-start: 4px;
  inset-inline-end: 4px;
  opacity: 0;
  transition: opacity 0.12s;

  ${Thumb}:hover &,
  ${Thumb}:focus-within & { opacity: 1; }
`;

const Trash = styled.button`
  inline-size: 24px;
  block-size: 24px;
  /* 按鈕預設左右各 6px 內距，24px 寬扣掉後裝不下 16px 圖示，會被擠歪 */
  padding: 0;
  display: grid;
  place-items: center;
  border: none;
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.icon.default};
  box-shadow: 0 0 0 ${(p) => p.theme.border.widthDefault} ${(p) => p.theme.border.subtle};
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

/** 落點線。畫在縫隙正中，絕對定位，不佔版面——否則一開始拖，整欄縮圖都會跳動。 */
const DropMark = styled.div`
  position: absolute;
  inset-inline: ${(p) => p.theme.space.insetSm} ${(p) => p.theme.space.gapXs};
  block-size: 3px;
  margin-block-start: -1.5px;
  border-radius: 2px;
  background: ${(p) => p.theme.text.primary};
  pointer-events: none;
`;
