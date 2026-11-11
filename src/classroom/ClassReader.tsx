import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { PageView } from '../components/PageView';
import { ParaFocusCtx, type ParaFocus } from '../components/ParagraphContext';
import { READER_CROP, PAGE_SIZE, type PageDims } from '../model/pageSize';
import type { Page } from '../model/paginate';
import type { Doc } from '../model/types';
import { findBlock } from '../model/document';
import { outlineOf, pageOfRow } from '../model/outline';
import { markRange, markReady, rangeKindOf } from '../model/paragraphs';
import { defaultLineHeight, defaultSizeOf } from '../styles/roles';
import { SentenceFocus, sentenceRange, type Decision } from '../viewer/SentenceFocus';
import { PopupViewerProvider, WithoutPopupViewer, usePopupViewer } from '../viewer/PopupViewer';
import { SupplementPanel } from '../viewer/SupplementPanel';
import { ParaRail, ReaderVars } from '../reader/ReaderMode';
import { ReadSettings } from '../reader/ReadSettings';
import { DEFAULT_PREFS, READER_FONTS, ReaderTextCtx, type ReaderPrefs, type ReaderText } from '../reader/readerPrefs';
import { ParagraphProvider } from '../components/ParagraphContext';
import * as L from './legacy.js';
import { goArea } from '../shelf/nav';
import { BRIDGE } from './bridgeSlot.js';

/** 課堂狀態變了就重畫（S 是同一份物件、就地改，用版本號當訊號） */
export function useClassroom(): number {
  return useSyncExternalStore(L.subscribe, L.getVersion);
}

export type Side = 'teacher' | 'student';

type Book = {
  doc: Doc;
  pages: Page[];
  /** 流式排版的頁面大小（跟螢幕走）；固定頁不給 */
  size?: PageDims;
  side: Side;
};
const BookCtx = createContext<Book | null>(null);

/* 目前打開的這一本（BookPage、補充資源、目次從這裡拿） */
let current: { book: Book; key: string; onExit?: () => void; exitLabel?: string } | null = null;

const P = (side: Side) => (side === 'teacher' ? L.getS().t : L.getS().s);
const pageOf = (side: Side) => (side === 'teacher' ? L.getS().t.page : L.sPage());

/**
 * 課堂與閱讀共用的閱讀畫面：左欄、上課膠囊、派任務、計時器這些用課堂模組（legacy.js）的，
 * 課本那一頁換成編輯器真的頁（PageView），點課文、補充資源、目次、閱讀設定也用編輯器的。
 *
 * 上課時老師點哪一段、哪一句（S.focus）、翻到哪一頁（S.t.page）寫進課堂狀態，
 * 學生跟隨老師時照著聚焦與翻頁；鎖定螢幕時老師開哪一則補充，學生跟著開。
 */
export function ClassReader({
  doc,
  pages,
  size,
  side,
  bookKey,
  onExit,
  exitLabel,
}: {
  doc: Doc;
  pages: Page[];
  size?: PageDims;
  side: Side;
  /** 這一本的代號（textbook:<id> 或 mine:<id>）：開課時記下來，學生加入就打開同一本 */
  bookKey: string;
  onExit?: () => void;
  exitLabel?: string;
}) {
  useClassroom();
  const book = useMemo<Book>(() => ({ doc, pages, size, side }), [doc, pages, size, side]);
  current = { book, key: bookKey, onExit, exitLabel };

  // 頁：id 帶書的代號，換書時筆跡不會串到別本
  const dims = size ?? PAGE_SIZE[doc.settings.aspectRatio];
  const r = (dims.width - 2 * READER_CROP) / (dims.height - 2 * READER_CROP);
  L.setPages(pages.map((p, i) => ({ id: `${bookKey}:${i}`, nums: [i + 1], title: titleOfPage(doc, p), label: doc.title, r })));

  // 進來就是閱讀畫面；換了書，頁碼從頭開始
  const S = L.getS();
  const ps = P(side);
  const entered = useRef(false);
  if (!entered.current) {
    entered.current = true;
    ps.screen = 'reader';
  }
  if (ps.book !== bookKey) {
    ps.book = bookKey;
    ps.page = 0;
    ps.pop = null;
    ps.tool = null;
    if (side === 'teacher') S.focus = null;
  }
  const max = Math.max(0, pages.length - 1);
  if (S.t.page > max && side === 'teacher') S.t.page = max;
  if (S.s.page > max && side === 'student') S.s.page = max;

  // 視窗大小（課本的紙張照這個算）
  useLayoutEffect(() => {
    const fit = () => L.setStage(window.innerWidth, window.innerHeight);
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  // 方向鍵翻頁（直排往左翻：左鍵是下一頁）
  const vertical = doc.settings.writingMode === 'vertical';
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      if (side === 'student' && L.locked()) return;
      const d = e.key === 'ArrowRight' ? (vertical ? -1 : 1) : vertical ? 1 : -1;
      L.turn(side, d);
      L.act(() => {})();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [side, vertical]);

  const App = side === 'teacher' ? L.TeacherApp : L.StudentApp;
  return (
    <BookCtx.Provider value={book}>
      <ParagraphProvider rows={doc.rows}>
        <ViewerHost side={side}>
          <ReaderVars />
          <CrStage side={side}>
            <App />
            {S.cheer && (side === 'teacher' || S.s.inClass) && <L.Cheer key={S.cheer.id} />}
          </CrStage>
        </ViewerHost>
      </ParagraphProvider>
    </BookCtx.Provider>
  );
}

/** 課堂模組的畫面要放在 .cr .stage 裡（它的樣式都以這兩層為準），撐滿整個視窗 */
export function CrStage({ side, children }: { side: string; children: ReactNode }) {
  return (
    <div className="cr cr-fixed">
      <div
        className="stage"
        style={{ width: '100%', height: '100%' }}
        onClick={() => {
          const S = L.getS();
          const ps = side === 'admin' ? S.admin : side === 'teacher' ? S.t : S.s;
          if (ps.menu || S.t.cardMenu != null || S.admin.rowMenu) {
            ps.menu = false;
            S.t.cardMenu = null;
            S.admin.rowMenu = null;
            L.act(() => {})();
          }
        }}
      >
        {children}
        <L.Toasts side={side} />
      </div>
    </div>
  );
}

/** 補充內容的檢視器：上課鎖定螢幕時，老師開哪一則學生跟著開、老師關了學生也關 */
function ViewerHost({ side, children }: { side: Side; children: ReactNode }) {
  const onJump = useCallback(
    (rowId: string) => {
      const b = current?.book;
      if (!b) return;
      const i = pageOfRow(b.pages, rowId);
      if (i >= 0) {
        L.turn(side, i - pageOf(side));
        L.act(() => {})();
      }
    },
    [side]
  );
  const onOpened = useCallback(
    (block: import('../model/types').Block | null) => {
      if (side !== 'teacher') return;
      const S = L.getS();
      if (!S.cls.live || S.cls.mode !== 'lock' || !S.s.inClass) {
        if (!block && S.s.suppBlock?.byTeacher) S.s.suppBlock = null;
        return;
      }
      S.s.suppBlock = block ? { block, byTeacher: true, at: Date.now() } : null;
      if (block) S.flags.suppSynced = true;
      L.act(() => {})();
    },
    [side]
  );
  return (
    <PopupViewerProvider onJump={onJump} onOpened={onOpened}>
      {side === 'student' && <FollowSupp />}
      {children}
    </PopupViewerProvider>
  );
}

/** 學生端：老師鎖定螢幕時開的補充，這裡跟著開 */
function FollowSupp() {
  useClassroom();
  const viewer = usePopupViewer();
  const s = L.getS().s;
  const at = s.suppBlock?.at ?? 0;
  useEffect(() => {
    if (!viewer) return;
    if (s.suppBlock?.block) viewer.open(s.suppBlock.block);
    else viewer.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [at, viewer]);
  return null;
}

/* ───────── 課本的一頁（給 legacy 的 Sheet、縮圖用） ───────── */

type FocusState = { page: number; blk: string; sn?: { i: number; start: number; end: number } | null } | null;

function BookPage({ page, w, f, tap, thumb }: { page: number; w: number; f?: FocusState; tap?: boolean; thumb?: boolean }) {
  useClassroom();
  const book = useContext(BookCtx) ?? current?.book ?? null;
  const rootRef = useRef<HTMLDivElement>(null);
  const [self, setSelf] = useState<FocusState>(null);
  const [sentenceId, setSentenceId] = useState<string | null>(null);
  const [paraEl, setParaEl] = useState<HTMLElement | null>(null);
  if (!book) return null;
  const pg = book.pages[page];
  if (!pg) return null;
  const dims = book.size ?? PAGE_SIZE[book.doc.settings.aspectRatio];
  const innerW = dims.width - 2 * READER_CROP;
  const innerH = dims.height - 2 * READER_CROP;
  const scale = w / innerW;

  if (thumb) {
    return (
      <WithoutPopupViewer>
        <div style={{ width: w, height: innerH * scale, overflow: 'hidden', position: 'relative', background: '#fff' }}>
          <div style={{ margin: -READER_CROP * scale }}>
            <PageView page={pg} settings={book.doc.settings} scale={scale} pageSize={book.size} thumbnail />
          </div>
        </div>
      </WithoutPopupViewer>
    );
  }

  return (
    <LivePage
      book={book}
      pg={pg}
      page={page}
      w={w}
      h={innerH * scale}
      scale={scale}
      follow={f ?? null}
      tap={!!tap}
      rootRef={rootRef}
      self={self}
      setSelf={setSelf}
      sentenceId={sentenceId}
      setSentenceId={setSentenceId}
      paraEl={paraEl}
      setParaEl={setParaEl}
    />
  );
}

function LivePage({
  book,
  pg,
  page,
  w,
  h,
  scale,
  follow,
  tap,
  rootRef,
  self,
  setSelf,
  sentenceId,
  setSentenceId,
  paraEl,
  setParaEl,
}: {
  book: Book;
  pg: Page;
  page: number;
  w: number;
  h: number;
  scale: number;
  follow: FocusState;
  tap: boolean;
  rootRef: React.RefObject<HTMLDivElement | null>;
  self: FocusState;
  setSelf: (f: FocusState) => void;
  sentenceId: string | null;
  setSentenceId: (id: string | null) => void;
  paraEl: HTMLElement | null;
  setParaEl: (el: HTMLElement | null) => void;
}) {
  const { doc, side } = book;
  const S = L.getS();
  const teacher = side === 'teacher';
  // 學生跟隨老師時：照老師的聚焦，自己不能點；其他時候自己點（老師點的寫進課堂狀態，給學生跟）
  const following = !teacher && !!follow;
  const mine: FocusState = teacher ? (S.focus && S.focus.page === page ? S.focus : null) : self;
  const focus = following ? follow : mine;
  const setFocus = (f: FocusState) => {
    if (teacher) {
      S.focus = f;
      if (f) S.flags.focusSent = true;
      L.act(() => {})();
    } else setSelf(f);
  };

  // 段落元素（給右下角的旨修句問膠囊對位）
  useLayoutEffect(() => {
    const el = focus?.blk ? rootRef.current?.querySelector<HTMLElement>(`[data-para="${focus.blk}"]`) ?? null : null;
    setParaEl(el);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus?.blk, page, pg]);
  useEffect(() => setSentenceId(null), [focus?.blk, setSentenceId]);

  // 跟隨：把老師聚焦的那一句畫出來（逐句聚焦的高亮不改 DOM）
  useEffect(() => {
    const root = rootRef.current;
    if (!following || !root || typeof CSS === 'undefined' || !('highlights' in CSS)) return;
    const sn = follow?.sn;
    const shell = follow?.blk ? root.querySelector<HTMLElement>(`[data-para="${follow.blk}"]`) : root;
    const rich = shell ? shell.querySelectorAll<HTMLElement>('.ds-rich')[sn?.i ?? 0] : null;
    if (!sn || !rich) {
      CSS.highlights.delete('sentence-focus');
      root.classList.remove('sentence-dimmed');
      return;
    }
    try {
      CSS.highlights.set('sentence-focus', new Highlight(sentenceRange(rich, { start: sn.start, end: sn.end })));
      root.classList.add('sentence-dimmed');
    } catch {
      // 學生字調大後老師那句的位置對不上：只留段落聚焦
    }
    return () => {
      CSS.highlights.delete('sentence-focus');
      root.classList.remove('sentence-dimmed');
    };
  }, [following, follow?.blk, follow?.sn?.i, follow?.sn?.start, follow?.sn?.end, page, rootRef]);

  /** 第一下選段，第二下才是段裡的句子；有補充的詞也是第二下才打開（乙練 2026-11-10 定） */
  const decide = (rich: HTMLElement, offset: number, target: Element, e: MouseEvent): Decision => {
    if (target.closest('[data-mask]:not([data-shown])')) return { kind: 'stop' };
    const shell = rich.closest<HTMLElement>('[data-para]');
    if (!shell) return target.closest('[data-pop]') ? { kind: 'stop' } : { kind: 'sentence' };
    if (shell.dataset.paraHit) return { kind: 'stop' };
    const id = shell.dataset.para!;
    if (focus?.blk !== id) {
      e.stopPropagation();
      setFocus({ page, blk: id, sn: null });
      return { kind: 'stop' };
    }
    const block = findBlock(doc, id)?.block;
    if (block?.type !== 'text') return { kind: 'sentence' };
    const noteEl = target.closest<HTMLElement>('[data-note]');
    const note = noteEl ? block.rangeNotes?.find((n) => n.id === noteEl.dataset.note) : undefined;
    if (note && markReady(block, note)) {
      if (rangeKindOf(note) === 'word') return { kind: 'stop' };
      const r = markRange(block.spans, note.id);
      if (r && offset >= r.start && offset <= r.end) return { kind: 'range', ...r };
    }
    if (target.closest('[data-pop]')) return { kind: 'stop' };
    return { kind: 'sentence' };
  };

  const onMove = (at: { rich: HTMLElement; start: number; end: number } | null) => {
    if (!at) {
      setSentenceId(null);
      if (focus?.sn) setFocus({ ...focus, sn: null });
      return;
    }
    const shell = at.rich.closest<HTMLElement>('[data-para]');
    if (!shell) {
      // 不是段落的文字（標題、一般內文）：用整頁第幾段文字記，學生端照這個對位
      const root = rootRef.current;
      const i = root ? Array.from(root.querySelectorAll('.ds-rich')).indexOf(at.rich) : -1;
      setFocus({ page, blk: '', sn: { i: Math.max(0, i), start: at.start, end: at.end } });
      setSentenceId(null);
      return;
    }
    const id = shell.dataset.para!;
    const i = Array.from(shell.querySelectorAll('.ds-rich')).indexOf(at.rich);
    setFocus({ page, blk: id, sn: { i: Math.max(0, i), start: at.start, end: at.end } });
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
      focusId: focus?.blk || null,
      toggle: (id) => {
        if (following) return;
        setFocus(focus?.blk === id ? null : { page, blk: id, sn: null });
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [focus?.blk, following, page]
  );

  // 閱讀設定（每個人自己的，存在課堂狀態的自己那一份）
  const prefs = prefsOf(side);
  const vertical = doc.settings.writingMode === 'vertical';
  const baseSize = defaultSizeOf('body', vertical);
  const readerText = useMemo<ReaderText>(
    () => ({ scale: prefs.size ? prefs.size / baseSize : 1, lineHeight: prefs.lineHeight ?? undefined }),
    [prefs.size, prefs.lineHeight, baseSize]
  );

  return (
    <div
      ref={rootRef}
      className="book-page"
      data-reader-font={prefs.font === 'auto' ? undefined : prefs.font}
      data-reader-noruby={prefs.ruby ? undefined : ''}
      style={{
        width: w,
        height: h,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 'inherit',
        ...(prefs.font === 'auto' ? {} : ({ '--reader-font': READER_FONTS[prefs.font] } as React.CSSProperties)),
      }}
    >
      <ReaderTextCtx.Provider value={readerText}>
        <ParaFocusCtx.Provider value={paraFocus}>
          <SentenceFocus active={tap && !following} root={rootRef} decide={decide} onBlank={() => setFocus(null)} onMove={onMove} />
          <div style={{ margin: -READER_CROP * scale }}>
            <PageView page={pg} settings={doc.settings} scale={scale} pageSize={book.size} />
          </div>
          {focus && paraEl && <ParaRail doc={doc} focus={{ id: focus.blk, el: paraEl }} sentenceId={sentenceId} />}
        </ParaFocusCtx.Provider>
      </ReaderTextCtx.Provider>
    </div>
  );
}

/* ───────── 閱讀設定：用編輯器的面板，值存在課堂狀態裡自己那一份 ───────── */

function prefsOf(side: Side): ReaderPrefs {
  const ps = P(side);
  // 注音預設關（乙練 2026-11-10 定）
  return (ps.prefs ??= { ...DEFAULT_PREFS, ruby: false });
}

function ReadSettingsHost({ side }: { side: Side }) {
  useClassroom();
  const book = current?.book;
  const vertical = book?.doc.settings.writingMode === 'vertical';
  return (
    <div className="cr-readsettings">
      <ReadSettings
        prefs={prefsOf(side)}
        onChange={(next) => {
          P(side).prefs = next;
          L.act(() => {})();
        }}
        baseSize={defaultSizeOf('body', !!vertical)}
        baseLineHeight={defaultLineHeight('body')}
      />
    </div>
  );
}

/* ───────── 補充資源面板：用編輯器的 ───────── */

function SupplementsHost({ side }: { side: Side }) {
  useClassroom();
  const viewer = usePopupViewer();
  const book = current?.book;
  if (!book || !viewer) return null;
  const page = pageOf(side);
  return (
    <SupplementPanel
      doc={book.doc}
      pages={book.pages}
      current={page}
      open
      onClose={() => {
        P(side).pop = null;
        L.act(() => {})();
      }}
      onGoRow={(rowId) => {
        const i = pageOfRow(book.pages, rowId);
        if (i >= 0) {
          L.turn(side, i - page);
          L.act(() => {})();
        }
      }}
      onOpen={(block, item) => {
        if (item.kind === 'jump') {
          const i = item.targetRowId ? pageOfRow(book.pages, item.targetRowId) : -1;
          if (i >= 0) {
            L.turn(side, i - page);
            L.act(() => {})();
          }
          return;
        }
        viewer.open({ ...block, popups: [item] });
      }}
    />
  );
}

/* ───────── 目次：真的課本章節 ───────── */

function outline(): { ch: string; items: { t: string; page: number }[] }[] {
  const book = current?.book;
  if (!book) return [];
  const items = outlineOf(book.doc).filter((i) => i.depth <= 1);
  const out: { ch: string; items: { t: string; page: number }[] }[] = [];
  for (const it of items) {
    const page = Math.max(0, pageOfRow(book.pages, it.rowId));
    if (it.depth === 0 || !out.length) out.push({ ch: it.text, items: [] });
    out[out.length - 1].items.push({ t: it.text, page });
  }
  return out.length ? out : [{ ch: book.doc.title, items: book.pages.map((_, i) => ({ t: `第 ${i + 1} 頁`, page: i })) }];
}

function titleOfPage(doc: Doc, p: Page): string {
  for (const it of p.items) {
    for (const col of it.row.columns)
      for (const b of col.blocks) {
        if (b.type === 'text' && (b.role === 'lessonTitle' || b.role === 'sectionTitle' || b.role === 'itemTitle')) {
          const t = b.spans.map((s) => s.text).join('').trim();
          if (t) return t;
        }
      }
  }
  return doc.title;
}

/* ───────── 填進 legacy 用的接口 ───────── */

Object.assign(BRIDGE, {
  BookPage,
  Supplements: SupplementsHost,
  ReadSettings: ReadSettingsHost,
  outline,
  bookKey: () => current?.key ?? null,
  subject: () => current?.book.doc.meta.subject || 'other',
  canExit: () => !!current?.onExit,
  exit: () => current?.onExit?.(),
  exitLabel: () => current?.exitLabel ?? '返回編輯',
  goShelf: () => BRIDGE.onShelf?.(),
  openClassBook: () => {},
  goArea,
});
