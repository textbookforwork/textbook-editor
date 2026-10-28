import { readyPopups } from '../model/popups';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ComponentProps, type RefObject } from 'react';
import { resetMasks } from '../viewer/masks';
import styled, { createGlobalStyle } from 'styled-components';
import { PageView } from '../components/PageView';
import { Icon } from '../components/Icon';
import { READER_CROP, PAGE_SIZE, type PageDims } from '../model/pageSize';
import { outlineOf, pageOfRow } from '../model/outline';
import type { Page } from '../model/paginate';
import type { Doc, RangeNote, TextBlock } from '../model/types';
import { SentenceFocus, type Decision } from '../viewer/SentenceFocus';
import { SupplementPanel, supplementBlocksOf } from '../viewer/SupplementPanel';
import { usePopupViewer } from '../viewer/PopupViewer';
import { toast } from '../editor/Toast';
import { InkLayer } from './InkLayer';
import { ReaderRail } from './ReaderRail';
import { Toolbox } from './Toolbox';
import { RAIL_TOOLS, loadPinned, savePinned, type InkTool, type RailTool } from './tools';
import { useInk } from './useInk';
import { ParaFocusCtx, type ParaFocus } from '../components/ParagraphContext';
import { PARA_NOTE_KINDS, markPopups, markRange, markReady, paraAudio, paraButtons, paraSupplements, paragraphIndex, rangeKindOf, sentenceNotesOf } from '../model/paragraphs';
import { urlOf } from '../editor/assets';
import { findBlock } from '../model/document';
import { defaultLineHeight, defaultSizeOf } from '../styles/roles';
import { ReadSettings } from './ReadSettings';
import { READER_FONTS, ReaderTextCtx, loadPrefs, savePrefs, type ReaderPrefs, type ReaderText } from './readerPrefs';

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
  /** 不給就沒有「返回編輯」（唯讀的數位教科書）。 */
  onExit?: () => void;
  /** 左欄那顆離開閱讀的按鈕要寫什麼，預設「返回編輯」 */
  exitLabel?: string;
  /** 目次點了跳到那一段所在的頁。 */
  onGoRow: (rowId: string) => void;
  /** 流式排版：頁面大小跟著螢幕走（App 的 reflowSize），要跟分頁用的同一個。不給就是固定頁座標。 */
  pageSize?: PageDims;
};

/** 補充資源面板。要在 PopupViewerProvider 裡面才拿得到 viewer。開關由左欄的「補充資源」控制。 */
function Supplements(props: Omit<ComponentProps<typeof SupplementPanel>, 'onOpen'>) {
  const viewer = usePopupViewer();
  if (!viewer) return null;
  // 只開點的那一項：當成只掛這一項的元件交給檢視器，圖片、影片、網頁、大彈窗直接開大視窗。
  // 不傳 anchor：從面板點的沒有元件可對，開中央視窗。跳轉例外，直接翻頁
  return (
    <SupplementPanel
      {...props}
      onOpen={(block, item) => {
        // 跳轉按了就直接翻過去，不再彈一個「前往」的視窗
        if (item.kind === 'jump') {
          if (item.targetRowId) props.onGoRow(item.targetRowId);
          return;
        }
        viewer.open({ ...block, popups: [item] });
      }}
    />
  );
}

/**
 * 閱讀模式，照 Figma「閱讀模式-改版」：左欄（頁數、工具箱、筆）＋ 一頁的畫布。
 *
 * 筆跡畫在頁面上方的透明層，不碰頁面的 DOM；逐句聚焦與補充面板照舊，
 * 沒拿工具時點頁面還是它們在接。
 */
export function ReaderMode({ doc, pages, current, go, scale, stageRef, onExit, exitLabel, onGoRow, pageSize }: Props) {
  const page = pages[Math.min(current, pages.length - 1)];
  const size = pageSize ?? PAGE_SIZE[doc.settings.aspectRatio];

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

  // 閱讀設定：每個人自己的，存在這台裝置（見 readerPrefs）
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [prefs, setPrefsState] = useState<ReaderPrefs>(loadPrefs);
  const setPrefs = (next: ReaderPrefs) => {
    setPrefsState(next);
    savePrefs(next);
  };
  const vertical = doc.settings.writingMode === 'vertical';
  const baseSize = defaultSizeOf('body', vertical);
  const readerText = useMemo<ReaderText>(
    () => ({
      scale: prefs.size ? prefs.size / baseSize : 1,
      lineHeight: prefs.lineHeight ?? undefined,
    }),
    [prefs.size, prefs.lineHeight, baseSize]
  );

  const ink = useInk(doc.id, page?.index ?? 0);

  // 聚焦的段落：點段落裡任何地方（或段號）開，點空白處關；翻頁就放掉（那一段可能不在這一頁了）
  // 每次進閱讀，遮住的東西全部蓋回去（畫面出來之前就重設，不會先閃一下打開的樣子）
  useLayoutEffect(() => resetMasks(), []);
  const [para, setPara] = useState<{ id: string; el: HTMLElement } | null>(null);
  // 段落裡聚焦到的那一句若標成句子，右下角的膠囊換成它的旨修句問與補充
  const [sentenceId, setSentenceId] = useState<string | null>(null);
  useEffect(() => setPara(null), [current]);
  useEffect(() => setSentenceId(null), [para?.id]);

  /**
   * 點課文時聚焦哪裡：第一下選段，第二下才是段裡的句子或生字詞。
   * 老師在大螢幕上點不到頁邊的段號，所以整段都是選段的範圍；
   * 第一下就算剛好點在生字詞上也只選段，免得想指著某段講時一按就彈出泡泡蓋住課文。
   */
  const decide = (rich: HTMLElement, offset: number, target: Element, e: MouseEvent): Decision => {
    // 點在還沒打開的遮罩上：只打開遮罩（文字元件自己處理），不選段、不聚焦句子
    if (target.closest('[data-mask]:not([data-shown])')) return { kind: 'stop' };
    const shell = rich.closest<HTMLElement>('[data-para]');
    // 不是段落（標題、一般內文）：沒有段這一層，點一下就聚焦那一句
    if (!shell) {
      setPara(null);
      // 掛在字上的補充由文字元件自己彈出，不另外聚焦
      return target.closest('[data-pop]') ? { kind: 'stop' } : { kind: 'sentence' };
    }
    // 點在段號上：段號自己會切換聚焦（RowView 的 paraClick）
    if (shell.dataset.paraHit) return { kind: 'stop' };
    const id = shell.dataset.para!;
    if (para?.id !== id) {
      // 擋下這一下，文字元件就不會接著彈出生字詞或掛在字上的補充
      e.stopPropagation();
      setPara({ id, el: shell });
      return { kind: 'stop' };
    }
    const block = findBlock(doc, id)?.block;
    if (block?.type !== 'text') return { kind: 'sentence' };
    const noteEl = target.closest<HTMLElement>('[data-note]');
    const note = noteEl ? block.rangeNotes?.find((n) => n.id === noteEl.dataset.note) : undefined;
    if (note && markReady(block, note)) {
      if (rangeKindOf(note) === 'word') return { kind: 'stop' };
      // 標成句子：聚焦整個標記，範圍照老師框的，不照標點切
      const r = markRange(block.spans, note.id);
      if (r && offset >= r.start && offset <= r.end) return { kind: 'range', ...r };
    }
    if (target.closest('[data-pop]')) return { kind: 'stop' };
    return { kind: 'sentence' };
  };

  /** 聚焦換了：方向鍵走到別段就跟著換段；落在標成句子的字上，膠囊換成那一句的 */
  const onSentenceMove = (at: { rich: HTMLElement; start: number; end: number } | null) => {
    if (!at) return setSentenceId(null);
    const shell = at.rich.closest<HTMLElement>('[data-para]');
    if (!shell) {
      setPara(null);
      return setSentenceId(null);
    }
    const id = shell.dataset.para!;
    if (para?.id !== id) setPara({ id, el: shell });
    const block = findBlock(doc, id)?.block;
    const hit =
      block?.type === 'text'
        ? block.rangeNotes?.find((n) => {
            if (rangeKindOf(n) !== 'sentence' || !markReady(block, n)) return false;
            const r = markRange(block.spans, n.id);
            return !!r && r.start < at.end && r.end > at.start;
          })
        : undefined;
    setSentenceId(hit?.id ?? null);
  };
  const paraFocus = useMemo<ParaFocus>(
    () => ({
      focusId: para?.id ?? null,
      toggle: (id, el) => setPara((cur) => (cur?.id === id ? null : { id, el })),
    }),
    [para]
  );

  // 點工具箱以外的地方就收起來。左欄不算「外面」：收回（×）和工具箱鈕本身都在左欄上，
  // 點它們是在整理工具箱，不是要離開。用 pointerdown 的捕獲階段，點頁面時不會同時觸發選句
  useEffect(() => {
    if (!toolboxOpen) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (t?.closest('#reader-toolbox, nav[aria-label="閱讀工具"]')) return;
      e.stopPropagation();
      setToolboxOpen(false);
    };
    document.addEventListener('pointerdown', onDown, true);
    return () => document.removeEventListener('pointerdown', onDown, true);
  }, [toolboxOpen]);

  const togglePin = useCallback(
    (t: RailTool) => {
      setPinned((list) => {
        const next = list.includes(t)
          ? list.filter((x) => x !== t)
          : RAIL_TOOLS.filter((x) => x === t || list.includes(x));
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
        if (toolboxOpen || outlineOpen || settingsOpen) {
          setToolboxOpen(false);
          setOutlineOpen(false);
          setSettingsOpen(false);
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
  }, [tool, toolboxOpen, outlineOpen, settingsOpen, ink, para]);

  return (
    <Root
      data-reader-font={prefs.font === 'auto' ? undefined : prefs.font}
      data-reader-noruby={prefs.ruby ? undefined : ''}
      style={prefs.font === 'auto' ? undefined : ({ '--reader-font': READER_FONTS[prefs.font] } as React.CSSProperties)}
    >
      <ReaderVars />
      <ReaderRail
        subject={doc.meta.subject}
        onExit={onExit}
        exitLabel={exitLabel}
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
        onGoPage={(n) => go(n - 1 - current)}
        toolboxOpen={toolboxOpen}
        settingsOpen={settingsOpen}
        onSettings={() => {
          setSettingsOpen((v) => !v);
          setToolboxOpen(false);
          setOutlineOpen(false);
        }}
        onToolbox={() => {
          setToolboxOpen((v) => !v);
          setOutlineOpen(false);
          setSettingsOpen(false);
          // 打開工具箱是在整理左欄，不是在畫：手上的工具放下
          setTool(null);
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

      <Main onPointerDown={() => settingsOpen && setSettingsOpen(false)}>
        <ReaderTextCtx.Provider value={readerText}>
        <ParaFocusCtx.Provider value={paraFocus}>
        <Stage ref={stageRef as RefObject<HTMLElement>}>
          {/* 點課文：第一下選段、第二下選句；點空白處全部取消。它不畫任何 DOM，只掛監聽 */}
          <SentenceFocus
            active
            root={stageRef}
            decide={decide}
            onBlank={() => setPara(null)}
            onMove={onSentenceMove}
          />
          {page && (
            <Sheet
              style={{
                width: (size.width - 2 * READER_CROP) * scale,
                height: (size.height - 2 * READER_CROP) * scale,
              }}
            >
              {/*
                閱讀時不顯示頁面四周的留白：整頁往左上推一個留白的距離，外框只露出內容區，
                縮放也照內容區算（App 的 useZoom），字大約 7%。只改顯示、不改排版，分頁不動。
                筆跡層跟著頁面一起推，座標仍是整頁的
              */}
              <Crop style={{ margin: -READER_CROP * scale }}>
                <PageView page={page} settings={doc.settings} scale={scale} pageSize={pageSize} />
                <InkLayer
                  ink={ink}
                  tool={tool}
                  pageWidth={size.width}
                  pageHeight={size.height}
                  scale={scale}
                />
              </Crop>
              {/* 放在頁面裡，才會落在頁底的留白上，不管頁面被縮放成多大 */}
              {para && <ParaRail doc={doc} focus={para} sentenceId={sentenceId} />}
              {doc.settings.layout === 'flow' && <FlowScrollbar vertical={doc.settings.writingMode === 'vertical'} pageKey={page.index} />}
            </Sheet>
          )}
          {page && (
            <Supplements
              doc={doc}
              pages={pages}
              current={page.index}
              open={supplementOpen}
              onClose={() => setSupplementOpen(false)}
              onGoRow={onGoRow}
            />
          )}
        </Stage>
        </ParaFocusCtx.Provider>
        </ReaderTextCtx.Provider>
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
        <Toolbox
          pinned={pinned}
          onTogglePin={togglePin}
          onClose={() => setToolboxOpen(false)}
          onSettings={() => {
            setToolboxOpen(false);
            setSettingsOpen(true);
          }}
        />
      )}

      {settingsOpen && (
        <ReadSettings
          prefs={prefs}
          onChange={setPrefs}
          baseSize={baseSize}
          baseLineHeight={defaultLineHeight('body')}
        />
      )}
    </Root>
  );
}

/**
 * 聚焦段落時頁面右下角那條直的膠囊：旨、修、句、問（填了才有），有補充再加一個補。
 * 位置固定，學生不用找；是哪一段由「其他段落變淡」交代，不另放段號。
 * 段裡聚焦到標成句子的字時，同一條換成那一句的旨修句問與補充，位置不變。
 * 按下去泡泡對準段落（或那一句）彈出（用的是補充同一個泡泡，直排時一樣往左長、字是直的）。
 */
function ParaRail({ doc, focus, sentenceId }: { doc: Doc; focus: { id: string; el: HTMLElement }; sentenceId: string | null }) {
  const viewer = usePopupViewer();
  const hit = findBlock(doc, focus.id);
  const block = hit?.block.type === 'text' ? hit.block : null;
  const audio = block && !sentenceId ? paraAudio(block) : null;
  const player = useParaAudio(audio ? urlOf(audio.assetId) : undefined);
  if (!block || !viewer) return null;
  const sentence = sentenceId ? block.rangeNotes?.find((n) => n.id === sentenceId) ?? null : null;
  const buttons = sentence ? sentenceButtons(block, sentence) : paraButtons(block);
  // 沒有說明就整條不出現，不寫「沒有說明」
  if (buttons.length === 0) return null;
  const no = paragraphIndex(doc.rows).get(block.id)?.no;
  // 泡泡對準整個段落元件；句子對準那幾個字
  const anchor = (sentence && focus.el.querySelector<HTMLElement>(`[data-note="${sentence.id}"]`)) || focus.el;
  const notes = sentence ? sentenceNotesOf(sentence) : block.paraNotes;
  const popups = sentence ? markPopups(block, sentence.id) : paraSupplements(block);
  return (
    // data-para-hit：在頁面裡按這條，不算「點段落以外的地方」，聚焦不會被放掉
    <Rail data-para-hit aria-label={sentence ? '這一句的說明' : no ? `第 ${no} 段的說明` : '這一段的說明'}>
      {buttons.map((b) => (
        <RailBtn
          key={b.key}
          type="button"
          aria-label={b.key === 'play' ? `${player.playing ? '暫停' : '播放'}${audio?.title ? ` ${audio.title}` : ''}` : b.name}
          aria-pressed={b.key === 'play' ? player.playing : undefined}
          onClick={() => {
            if (b.key === 'play') {
              player.toggle();
              return;
            }
            if (b.key === 'bu') {
              viewer.open({ ...block, popups }, anchor);
              return;
            }
            const body = notes?.[b.key] ?? '';
            viewer.open({ ...block, popups: [{ id: `para-${b.key}`, kind: 'text', title: b.name, body }] }, anchor);
          }}
        >
          {/* 補充用左欄「補充資源」同一個圖示，其餘是旨修句問的字 */}
          {b.key === 'play' ? (
            <>
              {/* 外圈畫播到哪，跟補充資源面板的播放鍵同一個樣子 */}
              {player.playing && (
                <PlayRing viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="17" pathLength={1} strokeDasharray={`${player.progress} 1`} />
                </PlayRing>
              )}
              <Icon name={player.playing ? 'pause' : 'play'} size={20} />
            </>
          ) : b.key === 'bu' ? (
            <Icon name="blocks" size={20} />
          ) : (
            b.btn
          )}
        </RailBtn>
      ))}
    </Rail>
  );
}

/** 整段的聲音就地播放：換段、放掉聚焦（膠囊收起）就停。 */
function useParaAudio(src: string | undefined) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const stop = () => {
    audio.current?.pause();
    audio.current = null;
    setPlaying(false);
    setProgress(0);
  };
  useEffect(() => stop, [src]);
  const toggle = () => {
    if (playing || !src) return stop();
    const a = new Audio(src);
    a.ontimeupdate = () => setProgress(a.duration ? a.currentTime / a.duration : 0);
    a.onended = stop;
    audio.current = a;
    setPlaying(true);
    a.play().catch(() => {});
  };
  return { playing, progress, toggle };
}

/** 標成句子的那幾個字：填了的旨修句問，加上連到這幾個字的補充時的「補」。跟整段同一個順序。 */
function sentenceButtons(block: TextBlock, note: RangeNote) {
  const notes = sentenceNotesOf(note);
  const out: { key: (typeof PARA_NOTE_KINDS)[number]['key'] | 'bu'; btn: string; name: string }[] =
    PARA_NOTE_KINDS.filter((k) => notes[k.key]?.trim());
  if (markPopups(block, note.id).length > 0) out.push({ key: 'bu', btn: '補', name: '補充' });
  return out;
}

/** 頁面右下角、直的一條，浮在頁邊的留白上 */
const Rail = styled.nav`
  position: absolute;
  right: 12px;
  bottom: 12px;
  flex-direction: column;
  /* 在筆跡層之上，畫筆開著也按得到 */
  z-index: 15;
  display: flex;
  align-items: center;
  gap: 2px;
  /* 四邊同樣留 4：裡面的圓跟膠囊外框同一個圓心，滑過的灰圓不會貼到左右邊 */
  padding: 4px;
  border-radius: 999px;
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  background: ${(p) => p.theme.surface.raised};
  box-shadow: ${(p) => p.theme.shadow.card};
`;

/** 字本身就是按鈕，不再各畫一個圓。圓 40，加上膠囊四邊的 4，手指點的範圍是 48（平板的下限 44 以上） */
const PlayRing = styled.svg`
  position: absolute;
  inset: 2px;
  transform: rotate(-90deg);
  pointer-events: none;
  circle {
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
  }
`;

const RailBtn = styled.button`
  position: relative;
  display: grid;
  place-items: center;
  inline-size: 40px;
  block-size: 40px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: none;
  color: ${(p) => p.theme.text.primary};
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: ${(p) => p.theme.surface.sunken}; }
  &:active { background: ${(p) => p.theme.surface.muted}; }
  &:focus-visible { outline: 2px solid ${(p) => p.theme.border.focus}; outline-offset: -2px; }
`;

const Root = styled.div`
  flex: 1;
  min-inline-size: 0;
  display: flex;
  position: relative;
  /* 整個閱讀畫面是淡灰底（畫布底色 #F2F2F2）：白色圓角的頁面浮在上面，左欄的工具直接放在灰底上 */
  background: ${(p) => p.theme.surface.backdrop};
`;

/** 頁面外圍：上、右、下各留 12（左邊緊鄰左欄，左欄自己有留白）。平板上一圈留白都直接吃掉頁面大小，所以收到最小 */
const Main = styled.div`
  flex: 1;
  min-inline-size: 0;
  position: relative;
  display: flex;
  padding: ${(p) => p.theme.space.insetSm} ${(p) => p.theme.space.insetSm}
    ${(p) => p.theme.space.insetSm} 0;
`;

const Stage = styled.main`
  flex: 1;
  min-inline-size: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 不再多包一層灰色卡片：頁面本身就是那張卡片 */
  overflow: hidden;
`;

/**
 * 流式頁面左右捲時的捲軸。原生捲軸畫在頁面最底邊，閱讀模式把頁邊裁掉（READER_CROP）就剛好被切掉，
 * 所以在卡片底部自己畫一條：同全站的細條灰色，長短與位置照實際捲到哪裡，
 * 只在捲動時出現，停下 0.8 秒淡出（跟 scrollReveal 同一個節奏）。直排由右往左捲，條子也從右邊走。
 */
function FlowScrollbar({ vertical, pageKey }: { vertical: boolean; pageKey: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState<{ size: number; at: number } | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const scroller = ref.current?.parentElement?.querySelector<HTMLElement>('[data-layout="flow"]');
    if (!scroller) return;
    let timer = 0;
    const read = () => {
      const max = scroller.scrollWidth - scroller.clientWidth;
      // 直排的捲動從 0 往負的走（由右往左），取絕對值。數值沒變就不更新，免得多重畫
      const next = max <= 1 ? null : { size: scroller.clientWidth / scroller.scrollWidth, at: Math.min(1, Math.abs(scroller.scrollLeft) / max) };
      setBar((prev) => (prev === next || (prev && next && prev.size === next.size && prev.at === next.at) ? prev : next));
    };
    const onScroll = () => {
      read();
      setShown(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setShown(false), 800);
    };
    read();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    };
    // 換頁才重新掛（捲動的那一塊會換掉）。每次重畫都重掛的話，收起來的計時器會一直被清掉，捲軸就常駐了
  }, [pageKey]);

  return (
    <Track ref={ref} aria-hidden data-flow-scrollbar $shown={shown && !!bar}>
      {bar && (
        <Thumb
          style={{
            width: `${bar.size * 100}%`,
            [vertical ? 'right' : 'left']: `${bar.at * (1 - bar.size) * 100}%`,
          }}
        />
      )}
    </Track>
  );
}

/** 卡片底部那一條：左右各留一點，跟卡片圓角錯開 */
const Track = styled.div<{ $shown: boolean }>`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 6px;
  height: 6px;
  pointer-events: none;
  z-index: 14;
  opacity: ${(p) => (p.$shown ? 1 : 0)};
  transition: opacity 0.2s;
`;

const Thumb = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  border-radius: 3px;
  background: ${(p) => p.theme.border.default};
`;

/** 頁面加上它上方的畫布層。畫布絕對定位，不佔頁面尺寸。 */
/** 頁面就是一張白色圓角卡片（跟工具格、彈窗同一套圓角與淡陰影），浮在灰底上 */
const Sheet = styled.div`
  position: relative;
  flex: none;
  border-radius: ${(p) => p.theme.radius.panel};
  overflow: hidden;
  /*
   * 不畫陰影也不畫框：白色的頁直接放在灰底上就分得出來。
   * 陰影會被畫布區（Stage 會裁掉超出去的東西）切成一條直線；框線看起來髒
   */
`;


/**
 * 左欄的尺寸跟著螢幕走：學生的載具大小不一，螢幕矮或窄時左欄收窄、工具格變矮，
 * 省下來的全部給頁面。掛在 :root 上，因為工具箱、目次、補充資源面板（portal 到 body）
 * 都要貼著左欄右緣，同一個變數才不會對不齊。字保留——小朋友靠字認工具。
 */
const ReaderVars = createGlobalStyle`
  :root {
    --reader-rail: 104px;
    /* 工具格一律正方形 */
    --reader-tile-w: 56px;
    --reader-tile-h: 56px;
    --reader-label: var(--ds-typography-label-size);
  }
  /* 閱讀設定：字體一律換掉（老師逐字設的也一起換）；注音另外固定黑體，不跟著換。關掉注音就把注音藏起來 */
  [data-reader-font] .ds-rich,
  [data-reader-font] .ds-rich *:not(rt):not(rt *) {
    font-family: var(--reader-font) !important;
  }
  [data-reader-noruby] .ds-rich rt {
    display: none !important;
  }
  @media (max-height: 820px), (max-width: 1100px) {
    :root {
      --reader-rail: 80px;
      --reader-tile-w: 52px;
      --reader-tile-h: 52px;
      --reader-label: 10px;
    }
  }
`;

const Crop = styled.div`
  position: relative;
`;

/** 目次面板：貼在左欄右側，跟工具箱同一個位置。 */
const Outline = styled.div`
  position: absolute;
  inset-block: ${(p) => p.theme.space.insetSm};
  inset-inline-start: var(--reader-rail, 104px);
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
