import { readyPopups } from '../model/popups';
import { useCallback, useEffect, useMemo, useState, type RefObject } from 'react';
import styled from 'styled-components';
import { PageView } from '../components/PageView';
import { PAGE_SIZE } from '../model/pageSize';
import { outlineOf, pageOfRow } from '../model/outline';
import type { Page } from '../model/paginate';
import type { Doc } from '../model/types';
import { SentenceFocus } from '../viewer/SentenceFocus';
import { SupplementPanel, supplementBlocksOf } from '../viewer/SupplementPanel';
import { usePopupViewer } from '../viewer/PopupViewer';
import { toast } from '../editor/Toast';
import { InkLayer } from './InkLayer';
import { ReaderRail } from './ReaderRail';
import { Toolbox } from './Toolbox';
import { loadPinned, savePinned, type InkTool, type RailTool } from './tools';
import { useInk } from './useInk';
import { ParaFocusCtx, type ParaFocus } from '../components/ParagraphContext';
import { paraButtons } from '../model/paragraphs';
import { findBlock } from '../model/document';

type Props = {
  doc: Doc;
  pages: Page[];
  /** 目前這一頁（0 起算）。翻頁沿用 App 的 go／current。 */
  current: number;
  go: (delta: number) => void;
  scale: number;
  /** 量縮放用的容器。App 的 useZoom 看它的尺寸算「整頁剛好放進來」。 */
  stageRef: RefObject<HTMLElement | null>;
  /** 回到編輯。閱讀模式沒有頂部列，左上角的鵝卵石就是出口。 */
  onExit: () => void;
  /** 目次點了跳到那一段所在的頁。 */
  onGoRow: (rowId: string) => void;
};

/** 補充資料面板。要在 PopupViewerProvider 裡面才拿得到 viewer。開關由左欄的「補充資源」控制。 */
function Supplements({ page, open, onClose }: { page: Page; open: boolean; onClose: () => void }) {
  const viewer = usePopupViewer();
  const blocks = useMemo(() => supplementBlocksOf(page), [page]);
  if (!viewer) return null;
  // 不傳 anchor：從面板點的沒有角標可對，開中央視窗
  return (
    <SupplementPanel blocks={blocks} open={open} onClose={onClose} onOpen={(block) => viewer.open(block)} />
  );
}

/**
 * 閱讀模式，照 Figma「閱讀模式-改版」：左欄（頁數、工具箱、筆）＋ 一頁的畫布。
 *
 * 筆跡畫在頁面上方的透明層，不碰頁面的 DOM；逐句聚焦與補充面板照舊，
 * 沒拿工具時點頁面還是它們在接。
 */
export function ReaderMode({ doc, pages, current, go, scale, stageRef, onExit, onGoRow }: Props) {
  const page = pages[Math.min(current, pages.length - 1)];
  const size = PAGE_SIZE[doc.settings.aspectRatio];

  const [tool, setTool] = useState<InkTool | null>(null);
  const [toolboxOpen, setToolboxOpen] = useState(false);
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [supplementOpen, setSupplementOpen] = useState(false);
  const supplementCount = useMemo(
    () => (page ? supplementBlocksOf(page).reduce((n, b) => n + readyPopups(b).length, 0) : 0),
    [page]
  );
  const outline = useMemo(() => outlineOf(doc).filter((i) => i.depth <= 1), [doc]);
  const [pinned, setPinned] = useState<RailTool[]>(loadPinned);

  const ink = useInk(doc.id, page?.index ?? 0);

  // 聚焦的段落：點段號開、再點一次或點空白處關；翻頁就放掉（那一段可能不在這一頁了）
  const [para, setPara] = useState<{ id: string; el: HTMLElement } | null>(null);
  useEffect(() => setPara(null), [current]);
  const paraFocus = useMemo<ParaFocus>(
    () => ({
      focusId: para?.id ?? null,
      toggle: (id, el) => setPara((cur) => (cur?.id === id ? null : { id, el })),
    }),
    [para]
  );

  const togglePin = useCallback(
    (t: RailTool) => {
      setPinned((list) => {
        const next = list.includes(t)
          ? list.filter((x) => x !== t)
          : (['pen', 'highlighter', 'eraser', 'clear'] as RailTool[]).filter(
              (x) => x === t || list.includes(x)
            );
        savePinned(next);
        return next;
      });
      // 把手上的工具收回去了，就放下它
      if (tool === t) setTool(null);
    },
    [tool]
  );

  const clear = useCallback(() => {
    ink.clear();
    toast('已清掉這一頁的筆跡');
  }, [ink]);

  // 鍵盤：Esc 先放下工具（再按一次才離開閱讀模式）；Cmd/Ctrl+Z 復原筆跡。
  // 用 capture 掛在 document，才搶得過 App 掛在 window 上的「Esc 離開預覽」
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (toolboxOpen || outlineOpen) {
          setToolboxOpen(false);
          setOutlineOpen(false);
          e.stopPropagation();
          return;
        }
        if (tool) {
          setTool(null);
          e.stopPropagation();
          return;
        }
        // 泡泡開著時 Esc 先由檢視器收泡泡（它在捕獲階段接走），再按一次才放掉聚焦
        if (para) setPara(null);
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey ? !ink.canRedo : !ink.canUndo) return;
        e.preventDefault();
        e.stopPropagation();
        if (e.shiftKey) ink.redo();
        else ink.undo();
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [tool, toolboxOpen, outlineOpen, ink, para]);

  return (
    <Root>
      <ReaderRail
        subject={doc.meta.subject}
        onExit={onExit}
        outlineOpen={outlineOpen}
        onOutline={() => {
          setOutlineOpen((v) => !v);
          setToolboxOpen(false);
        }}
        supplementCount={supplementCount}
        supplementOpen={supplementOpen}
        onSupplements={() => setSupplementOpen((v) => !v)}
        pageNumber={current + 1}
        pageCount={pages.length}
        onPrevPage={() => go(-1)}
        onNextPage={() => go(1)}
        toolboxOpen={toolboxOpen}
        onToolbox={() => {
          setToolboxOpen((v) => !v);
          setOutlineOpen(false);
        }}
        pinned={pinned}
        onUnpin={togglePin}
        tool={tool}
        onTool={setTool}
        onClear={clear}
        canClear={ink.hasInk}
        undo={ink.undo}
        redo={ink.redo}
        canUndo={ink.canUndo}
        canRedo={ink.canRedo}
      />

      <Main>
        <ParaFocusCtx.Provider value={paraFocus}>
        <Stage
          ref={stageRef as RefObject<HTMLElement>}
          onPointerDown={(e) => {
            // 點段號以外的地方就放掉聚焦（段號自己會切換）
            if (para && !(e.target as HTMLElement).closest('[data-para-no]')) setPara(null);
          }}
        >
          {/* 點一句留黑、其餘調暗；它不畫任何 DOM，只掛監聽 */}
          <SentenceFocus active root={stageRef} />
          {page && (
            <Sheet>
              <PageView page={page} settings={doc.settings} scale={scale} />
              <InkLayer
                ink={ink}
                tool={tool}
                pageWidth={size.width}
                pageHeight={size.height}
                scale={scale}
              />
            </Sheet>
          )}
          {page && <Supplements page={page} open={supplementOpen} onClose={() => setSupplementOpen(false)} />}
        </Stage>
        </ParaFocusCtx.Provider>
        {para && <ParaRail doc={doc} focus={para} />}
      </Main>

      {outlineOpen && (
        <Outline id="reader-outline" role="dialog" aria-label="目次">
          <OutlineHead>目次</OutlineHead>
          {outline.length === 0 && <OutlineEmpty>這份教材還沒有章節標題</OutlineEmpty>}
          {outline.map((item) => {
            const pg = pageOfRow(pages, item.rowId);
            return (
              <OutlineItem
                key={item.rowId}
                type="button"
                $depth={item.depth}
                $on={pg === current}
                onClick={() => {
                  onGoRow(item.rowId);
                  setOutlineOpen(false);
                }}
              >
                <span>{item.text}</span>
                {pg >= 0 && <small>{pg + 1}</small>}
              </OutlineItem>
            );
          })}
        </Outline>
      )}

      {toolboxOpen && (
        <Toolbox pinned={pinned} onTogglePin={togglePin} onClose={() => setToolboxOpen(false)} />
      )}
    </Root>
  );
}

/**
 * 聚焦段落時右側那排圓形按鈕：旨、修、句、問（填了才有），有補充再加一顆補。
 * 按下去在那一段旁邊彈泡泡——用的是補充同一個泡泡，直排時一樣往左長、字是直的。
 */
function ParaRail({ doc, focus }: { doc: Doc; focus: { id: string; el: HTMLElement } }) {
  const viewer = usePopupViewer();
  const hit = findBlock(doc, focus.id);
  const block = hit?.block.type === 'text' ? hit.block : null;
  if (!block || !viewer) return null;
  const buttons = paraButtons(block);
  // 泡泡對準整個段落元件（段號的父層），不是對準小小的段號
  const anchor = focus.el.parentElement ?? focus.el;
  return (
    <Rail aria-label="這一段的說明">
      {buttons.length === 0 && <RailEmpty>這一段沒有說明</RailEmpty>}
      {buttons.map((b) => (
        <RoundBtn
          key={b.key}
          type="button"
          title={b.name}
          aria-label={b.name}
          onClick={() => {
            if (b.key === 'bu') {
              viewer.open({ ...block, popups: readyPopups(block) }, anchor);
              return;
            }
            const body = block.paraNotes?.[b.key] ?? '';
            viewer.open({ ...block, popups: [{ id: `para-${b.key}`, kind: 'text', title: b.name, body }] }, anchor);
          }}
        >
          {b.btn}
        </RoundBtn>
      ))}
    </Rail>
  );
}

const Rail = styled.nav`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 15;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RoundBtn = styled.button`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: 999px;
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.default};
  background: ${(p) => p.theme.surface.raised};
  box-shadow: ${(p) => p.theme.shadow.card};
  color: ${(p) => p.theme.text.primary};
  font: inherit;
  font-size: var(--ds-typography-body-size);
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: ${(p) => p.theme.surface.sunken}; }
  &:focus-visible { outline: 2px solid ${(p) => p.theme.border.focus}; outline-offset: 2px; }
`;

const RailEmpty = styled.span`
  writing-mode: vertical-rl;
  font-size: var(--ds-typography-caption-size);
  color: ${(p) => p.theme.text.tertiary};
`;

const Root = styled.div`
  flex: 1;
  min-inline-size: 0;
  display: flex;
  position: relative;
  background: ${(p) => p.theme.surface.raised};
`;

/** 畫布外圍：右與上下留 24，小細胞掛在右下角、半壓在畫布上。 */
const Main = styled.div`
  flex: 1;
  min-inline-size: 0;
  position: relative;
  display: flex;
  padding: ${(p) => p.theme.space.insetLg} ${(p) => p.theme.space.insetLg}
    ${(p) => p.theme.space.insetLg} 0;
`;

const Stage = styled.main`
  flex: 1;
  min-inline-size: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(p) => p.theme.space.insetLg};
  border-radius: ${(p) => p.theme.radius.panel};
  background: ${(p) => p.theme.surface.sunken};
  box-shadow: ${(p) => p.theme.shadow.card};
  overflow: hidden;
`;

/** 頁面加上它上方的畫布層。畫布絕對定位，不佔頁面尺寸。 */
const Sheet = styled.div`
  position: relative;
  flex: none;
  box-shadow: ${(p) => p.theme.shadow.float};
`;


/** 目次面板：貼在左欄右側，跟工具箱同一個位置。 */
const Outline = styled.div`
  position: absolute;
  inset-block: ${(p) => p.theme.space.insetLg};
  inset-inline-start: 104px;
  z-index: 20;
  inline-size: 240px;
  overflow-y: auto;
  padding: ${(p) => p.theme.space.insetSm};
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: ${(p) => p.theme.surface.raised};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  border-radius: ${(p) => p.theme.radius.panel};
  box-shadow: ${(p) => p.theme.shadow.float};
`;

const OutlineHead = styled.strong`
  padding: 8px 10px;
  font-size: ${(p) => p.theme.typography.bodySmSize};
`;

const OutlineEmpty = styled.p`
  margin: 0;
  padding: 8px 10px;
  font-size: var(--ds-typography-label-size);
  color: ${(p) => p.theme.text.tertiary};
`;

const OutlineItem = styled.button<{ $depth: number; $on: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px 8px ${(p) => 10 + p.$depth * 14}px;
  min-block-size: 40px;
  border: none;
  border-radius: ${(p) => p.theme.radius.field};
  background: ${(p) => (p.$on ? p.theme.surface.sunken : 'transparent')};
  color: ${(p) => p.theme.text.primary};
  font-size: ${(p) => p.theme.typography.bodySmSize};
  font-weight: ${(p) => (p.$depth === 0 ? 600 : 400)};
  text-align: start;
  cursor: pointer;

  span { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  small { color: ${(p) => p.theme.text.tertiary}; font-variant-numeric: tabular-nums; }
  &:hover { background: ${(p) => p.theme.surface.sunken}; }
`;
