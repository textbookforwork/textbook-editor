import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { READER_CROP, PAGE_SIZE, type PageDims } from './model/pageSize';
import { usePages } from './hooks/usePages';
import { useEditor } from './hooks/useEditor';
import { PageView } from './components/PageView';
import { PageBreak } from './components/PageBreak';
import { EditorProvider, useEditorCtx } from './editor/EditorContext';
import type { ImportedPage } from './editor/PdfPagePicker';
import { fitTwoPerPage } from './model/blockSizing';
import { FloatingToolbar } from './editor/FloatingToolbar';
import { PopupPanel } from './editor/PopupPanel';
import { MediaLibrary } from './editor/MediaLibrary';
import { uploadIntoDoc } from './editor/uploading';
import { TablePanel } from './editor/TablePanel';
import { blockFor, blockFromAsset } from './components/RowView';
import type { Asset } from './editor/assets';
import { newId } from './model/ids';
import { PopupViewerProvider } from './viewer/PopupViewer';
import { ReaderMode } from './reader/ReaderMode';
import { TopBar } from './editor/TopBar';
import { setActiveBook } from './editor/persist';
import { findBook } from './shelf/library';
import { PageRail } from './components/PageRail';
import { useZoom } from './hooks/useZoom';
import { ImportDialog } from './editor/ImportDialog';
import { BookSettings } from './editor/BookSettings';
import { EditStage } from './editor/EditStage';
import { PageBackgroundButton } from './editor/PageBackgroundButton';
import { seedStars } from './demo/seed';
import { revealBlock } from './editor/reveal';
import { withSampleMedia } from './editor/sampleMedia';
import { contentBox } from './model/pageSize';
import { gapBefore } from './model/spacing';
import type { Page } from './model/paginate';
import type { Doc, DocSettings } from './model/types';
import { ParagraphProvider } from './components/ParagraphContext';

/**
 * 內建範例，讓人不必先準備檔案就能看見結果。
 *
 * 「自然（範例）」與「國文（範例）」都是自製的（國文只有〈木蘭詩〉的正文，古文沒有著作權），可以公開。
 * 範例是「有檔案才出現」：design/ 底下少了哪一份，選單就少那一項，程式不用改。
 */
const sampleFiles = import.meta.glob<string>('../design/sample-*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});
const SAMPLE_LABELS: [file: string, label: string][] = [
  ['sample-mulan', '國文（範例・直排）'],
  ['sample-demo', '自然（範例・橫排）'],
];
const SAMPLES: Record<string, string> = Object.fromEntries(
  SAMPLE_LABELS.flatMap(([f, label]) => {
    const md = sampleFiles[`../design/${f}.md`];
    return md ? [[label, md]] : [];
  })
);

type Props = {
  /** 打開的這一本：自編教材的 id。原本（數位教科書）唯讀，沒有 id。 */
  bookId: string | null;
  /** 打開時的內容：自編從存檔讀，原本從課本 md 解析（見 Root）。 */
  initialDoc: Doc;
  /** 一打開就是閱讀模式（書櫃的「閱讀課本」）。 */
  startReading?: boolean;
  /** 唯讀：只能閱讀，沒有返回編輯（數位教科書的原本）。 */
  readOnly?: boolean;
  /** 唯讀時左欄的「進入自編」（只有管理員讀數位教科書時有） */
  onEnterEdit?: () => void;
};

export function App({ bookId, initialDoc, startReading = false, readOnly = false, onEnterEdit }: Props) {
  const [preview, setPreview] = useState(startReading || readOnly);
  const [current, setCurrent] = useState(0);
  const [importing, setImporting] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // 存檔寫到這一本（見 persist.ts）。在第一次 render 前就設定，自動存才不會寫到上一本
  const [initial] = useState(() => {
    setActiveBook(readOnly ? null : bookId);
    return initialDoc;
  });
  const editor = useEditor(initial);
  const { doc, dispatch, undo, redo, canUndo, canRedo } = editor;
  const rowIndexOf = useCallback(
    (rowId: string) => doc.rows.findIndex((r) => r.id === rowId),
    [doc.rows]
  );
  // 流式排版的閱讀畫面：頁面大小跟著螢幕走，字不縮放（見 useReflowSize）
  const stageRef = useRef<HTMLDivElement>(null);
  const reflow = useReflowSize(stageRef, preview && doc.settings.layout === 'flow');
  const { pages } = usePages(doc, reflow?.size);
  // 管理員從空白本建立的數位教科書（原本）；老師的自編是副本
  const isOriginalBook = !!bookId && findBook(bookId)?.kind === 'original';

  const patch = (p: Partial<DocSettings>) => dispatch({ type: 'setSettings', patch: p });

  // 整頁等比縮放：整頁剛好放進編輯區＝100%，再乘上使用者的倍率
  const pageSize = PAGE_SIZE[doc.settings.aspectRatio];
  const { scale, percent, setZoom, zoomIn, zoomOut, resetZoom } = useZoom(stageRef, {
    // 閱讀模式不顯示頁面四周的留白（見 ReaderMode 的 Crop），縮放照內容區算，字大約 7%
    pageWidth: preview ? pageSize.width - 2 * READER_CROP : pageSize.width,
    pageHeight: preview ? pageSize.height - 2 * READER_CROP : pageSize.height,
    // 閱讀模式的畫布四周各留 24（內距 24×2 = 48）；切換頁面鈕固定在左欄「頁數」下方
    reserveX: preview ? 0 : 112, // 編輯：EditStage 左右各 56px 留白
    reserveY: preview ? 0 : 64,
    watch: preview,
  });
  // 一進編輯模式就是 100%，不沿用上次放大過的倍率
  useEffect(() => {
    resetZoom();
  }, [preview, resetZoom]);


  // 翻頁方向依整本設定：橫排往右翻、直排往左翻
  const vertical = doc.settings.writingMode === 'vertical';
  const go = useCallback(
    (delta: number) => setCurrent((c) => Math.max(0, Math.min(pages.length - 1, c + delta))),
    [pages.length]
  );

  useEffect(() => {
    if (!preview) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return readOnly || setPreview(false);
      // 直排往左翻：左鍵是「下一頁」
      if (e.key === 'ArrowRight') go(vertical ? -1 : 1);
      if (e.key === 'ArrowLeft') go(vertical ? 1 : -1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [preview, vertical, go]);

  useEffect(() => {
    if (current > pages.length - 1) setCurrent(Math.max(0, pages.length - 1));
  }, [pages.length, current]);

  /**
   * 「跳到某一段」的落點。
   *
   * 兩種模式的意思不同：預覽是一次一頁，要換到那一段所在的頁；
   * 編輯是連續捲動，捲到它就好。跳的目標是「某一列」不是「第幾頁」，
   * 因為頁是算出來的，內容一改頁碼就變了。
   */
  const jumpToRow = useCallback(
    (rowId: string) => {
      const index = pages.findIndex((p) => p.items.some((i) => i.row.id === rowId));
      if (index < 0) return;
      if (preview) {
        setCurrent(index);
        return;
      }
      // 跳到那一頁的頁首（跟點縮圖一樣），不是把那一段捲到畫面中間——
      // 段落在頁中間時，只捲到段落看起來像沒換頁
      document
        .querySelector(`[data-page-index="${index}"]`)
        ?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    },
    [pages, preview]
  );

  /**
   * 換頁線上的「可合併」。
   *
   * 只有老師放的換頁、而且上一頁真的裝得下這一頁的第一列才給。
   * 系統放的換頁本來就是排滿了才換，沒有併回去這回事；
   * 老師放的但裝不下，按了也只是把實線換成虛線，畫面不會動，不給按。
   */
  const mergeOf = (p: Page, prev: Page | undefined) => {
    const first = p.items[0];
    if (!first || !prev || p.startedBy !== 'manual') return undefined;
    if (doc.settings.layout !== 'flow') {
      const prevLast = prev.items[prev.items.length - 1]?.row ?? null;
      const box = contentBox(doc.settings);
      const room = vertical ? box.width : box.height;
      const need = prev.usedBlockSize + gapBefore(prevLast, first.row) + first.blockSize;
      if (need > room) return undefined;
    }
    return () => dispatch({ type: 'setBreakBefore', rowId: first.row.id, value: false });
  };

  /**
   * 編輯模式下「正在編哪一頁」：捲到畫面上方三分之一的那一頁。
   * 左側縮圖跟著選中，老師才知道自己現在在第幾頁。
   */
  const [editPage, setEditPage] = useState(0);
  useEffect(() => {
    const el = stageRef.current;
    if (preview || !el) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      const line = el.getBoundingClientRect().top + el.clientHeight / 3;
      let found = 0;
      el.querySelectorAll<HTMLElement>('[data-page-index]').forEach((pg) => {
        if (pg.getBoundingClientRect().top <= line) found = Number(pg.dataset.pageIndex);
      });
      setEditPage(found);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onScroll);
    };
  }, [preview, pages.length]);

  /** 編輯模式是連續捲動的，縮圖列點下去就是捲到那一頁。 */
  const scrollToPage = useCallback((index: number) => {
    document
      .querySelector(`[data-page-index="${index}"]`)
      ?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, []);

  return (
    <Layout>
      {/* 閱讀模式全螢幕：沒有頂部列、沒有縮圖欄，左欄的鵝卵石就是「回到編輯」 */}
      {!preview && (
      <TopBar
        doc={doc}
        onTitle={(title) => dispatch({ type: 'setTitle', title })}
        undo={undo}
        redo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        importing={importing}
        settingsOpen={settingsOpen}
        onSettings={() => setSettingsOpen((v) => !v)}
        reading={preview}
        onReading={() => setPreview((p) => !p)}
      />
      )}

      <PopupViewerProvider onJump={jumpToRow}>
      <ParagraphProvider rows={doc.rows}>
      <Main>
        {/* 縮圖欄只在編輯時出現；閱讀模式用左欄的「目次」跳頁 */}
        {!preview && (
        <PageRail
          doc={doc}
          pages={pages}
          current={preview ? current : editPage}
          onGoPage={(i) => (preview ? setCurrent(i) : scrollToPage(i))}
          onGoRow={jumpToRow}
          dispatch={preview ? undefined : dispatch}
          zoom={preview ? undefined : { percent, onZoom: setZoom, onZoomIn: zoomIn, onZoomOut: zoomOut }}
        />
        )}
      {preview ? (
        /* 閱讀模式照 Figma 做在 src/reader/；翻頁仍沿用這裡的 go／current */
        <ReaderMode
          doc={doc}
          pages={pages}
          current={current}
          go={go}
          scale={reflow ? reflow.zoom : scale}
          pageSize={reflow?.size}
          stageRef={stageRef}
          onExit={readOnly ? onEnterEdit : () => setPreview(false)}
          exitLabel={readOnly ? '進入自編' : undefined}
          onGoRow={jumpToRow}
        />
      ) : (
        <EditorProvider editor={editor}>
          <EditStage ref={stageRef}>
            {pages.map((p, i) => {
              const first = p.items[0];
              // 這一頁從上一段的中間開始的話，背景屬於上一頁那一列，掛不上去
              const bgRow = first && !first.continuedFromPrev ? first.row : null;
              return (
                <PageSlot key={p.index}>
                  {i > 0 && <PageBreak startedBy={p.startedBy} onMerge={mergeOf(p, pages[i - 1])} />}
                  <PageTools>
                    <PageBackgroundButton
                      value={bgRow?.pageBackground}
                      disabled={!bgRow}
                      onChange={(bg) =>
                        bgRow &&
                        dispatch({ type: 'setPageBackground', rowId: bgRow.id, background: bg })
                      }
                    />
                    <PageView
                      page={p}
                      settings={doc.settings}
                      scale={scale}
                      rowIndexOf={rowIndexOf}
                      rowCount={doc.rows.length}
                    />
                  </PageTools>
                </PageSlot>
              );
            })}
          </EditStage>
          <FloatingToolbar />
          <PopupPanel />
          <EditorMediaLibrary
            pages={pages}
            editPage={editPage}
            rowIndexOf={rowIndexOf}
            stageRef={stageRef}
          />
          {/* 新增表格與表格樣式的浮動彈窗。要放在 EditorProvider 裡面，拿不到編輯器它就什麼都不畫 */}
          <TablePanel />
        </EditorProvider>
      )}
      </Main>
      </ParagraphProvider>
      </PopupViewerProvider>

      {importing && (
        <ImportDialog
          samples={SAMPLES}
          onClose={() => setImporting(false)}
          onApply={(result) => {
            // 走 dispatch 而不是 replaceDoc，匯入才退得回去——
            // 老師匯錯檔案不該是不可逆的
            dispatch({ type: 'importDoc', result: seedStars(withSampleMedia(result)) });
            setCurrent(0);
            setImporting(false);
          }}
        />
      )}

      {settingsOpen && (
        <BookSettings
          doc={doc}
          onPatch={patch}
          onMeta={(p) => dispatch({ type: 'setMeta', patch: p })}
          onTitle={(title) => dispatch({ type: 'setTitle', title })}
          onClose={() => setSettingsOpen(false)}
          publisherLocked={!isOriginalBook}
          // 匯入 md 會換掉整份內容，等於從頭建立一本：只有管理員的原本可以（出版社上稿走這條），老師的副本不行
          onImport={
            isOriginalBook
              ? () => {
                  setSettingsOpen(false);
                  setImporting(true);
                }
              : undefined
          }
        />
      )}
    </Layout>
  );
}


/**
 * 媒體庫面板。掛在編輯區最外層，不綁在單一 RowView 上——
 * 否則分頁重新排版時 RowView 被移到下一頁會造成媒體庫被強制關閉。
 * 插入素材時保持開啟，且依使用者當前要插入的那一頁與位置插入，
 * 直到使用者主動關閉面板為止。
 */
function EditorMediaLibrary({
  pages,
  editPage,
  rowIndexOf,
  stageRef,
}: {
  pages: Page[];
  editPage: number;
  rowIndexOf: (rowId: string) => number;
  stageRef: React.RefObject<HTMLDivElement | null>;
}) {
  const ed = useEditorCtx();
  const libraryAt = ed?.libraryAt ?? null;

  // 計算某個縫隙編號屬於第幾頁
  const pageIndexOfGap = useCallback(
    (gapIndex: number): number => {
      if (!ed || gapIndex <= 0 || ed.doc.rows.length === 0) return 0;
      const targetRow = ed.doc.rows[Math.min(gapIndex - 1, ed.doc.rows.length - 1)];
      if (!targetRow) return 0;
      for (const p of pages) {
        if (p.items.some((it) => it.row.id === targetRow.id && !it.continuesOnNext)) {
          return p.index;
        }
      }
      for (const p of pages) {
        if (p.items.some((it) => it.row.id === targetRow.id)) {
          return p.index;
        }
      }
      return 0;
    },
    [ed, pages]
  );

  // 計算某一頁末尾的插入位置
  const endGapOfPage = useCallback(
    (pageIndex: number): number => {
      if (!ed) return 0;
      const page = pages[pageIndex];
      if (!page || page.items.length === 0) return ed.doc.rows.length;
      const last = page.items[page.items.length - 1];
      const idx = rowIndexOf(last.row.id);
      return idx >= 0 ? idx + 1 : ed.doc.rows.length;
    },
    [ed, pages, rowIndexOf]
  );

  // 當媒體庫開著時，若使用者捲動或從側欄切換到其他頁，將插入目標同步到當前頁面
  const prevEditPage = useRef(editPage);
  useEffect(() => {
    if (prevEditPage.current === editPage) return;
    prevEditPage.current = editPage;
    if (!ed || ed.libraryAt === null) return;
    const curGapPage = pageIndexOfGap(ed.libraryAt);
    if (curGapPage !== editPage) {
      ed.openLibrary(endGapOfPage(editPage));
    }
  }, [editPage, ed, pageIndexOfGap, endGapOfPage]);

  if (!ed || libraryAt === null) return null;

  // 若原本要插入的頁面已經不在視窗可視範圍內，改插在目前畫面中的頁面
  const resolveTargetIndex = (): number => {
    const curGapPage = pageIndexOfGap(libraryAt);
    const stage = stageRef.current;
    if (stage) {
      const pageEl = stage.querySelector<HTMLElement>(`[data-page-index="${curGapPage}"]`);
      if (pageEl) {
        const pr = pageEl.getBoundingClientRect();
        const sr = stage.getBoundingClientRect();
        const isVisible = pr.bottom > sr.top + 30 && pr.top < sr.bottom - 30;
        if (!isVisible && curGapPage !== editPage) {
          return endGapOfPage(editPage);
        }
      }
    }
    return libraryAt;
  };

  const handleChoose = (asset: Asset) => {
    const at = resolveTargetIndex();
    ed.openInsert(null);
    const block = fitTwoPerPage(blockFromAsset(asset), ed.doc.settings);
    ed.dispatch({ type: 'insertRow', index: at, blocks: [block] });
    revealBlock(block.id);
    // 插入時不關閉媒體庫版面，順延插入點方便繼續插入
    ed.openLibrary(at + 1);
  };

  const handleGenerate = (prompt?: string) => {
    const at = resolveTargetIndex();
    const b = blockFor('image-ai');
    if (b.type === 'image' && prompt) b.aiPrompt = prompt;
    ed.openInsert(null);
    ed.dispatch({ type: 'insertRow', index: at, blocks: [b] });
    ed.openLibrary(at + 1);
  };

  // PDF 選好的頁面：一頁一列、各自佔滿一頁（寬撐滿欄，高度被一頁的上限截住、寬跟著等比縮），
  // 一次插入只算一次復原
  const handleImportPdf = (asset: Asset, imported: ImportedPage[]) => {
    const at = resolveTargetIndex();
    ed.openInsert(null);
    const name = asset.name.replace(/\.pdf$/i, '');
    const ids = imported.map(() => newId('blk'));
    ed.dispatch({
      type: 'insertRows',
      index: at,
      rows: imported.map((p, i) => [
        {
          id: ids[i],
          type: 'image',
          assetId: p.assetId,
          alt: `${name} 第 ${p.page} 頁`,
          caption: '',
          hasCaption: false,
          aspectRatio: p.aspectRatio,
          widthPct: 100,
          popups: [],
        },
      ]),
    });
    if (ids[0]) revealBlock(ids[0]);
    ed.openLibrary(at + imported.length);
  };

  return (
    <MediaLibrary
      onClose={() => ed.openLibrary(null)}
      onChoose={handleChoose}
      onImportPdf={handleImportPdf}
      onGenerate={handleGenerate}
      onUpload={async (file) => {
        const at = resolveTargetIndex();
        ed.openInsert(null);
        const r = await uploadIntoDoc(ed, file, at);
        if (r) revealBlock(r.blockId);
        // 跟從清單點素材一樣：媒體庫保持開著，插入點往後挪
        ed.openLibrary(at + 1);
      }}
    />
  );
}

const Layout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  flex: 1;
  min-block-size: 0;
  display: flex;
  /* 白底襯著，編輯區的圓角灰卡才浮得出來（body 是灰底） */
  background: ${(p) => p.theme.surface.raised};
`;

/** 頁面加上貼在頁外的工具（背景按鈕）。工具絕對定位，不佔頁面尺寸。 */
const PageTools = styled.div`
  position: relative;
`;

const PageSlot = styled.div`
  display: flex;
  flex-direction: column;
  /* 放大到比編輯區寬時改靠左起算，整頁才捲得到（同 EditStage） */
  align-items: safe center;
  gap: 24px;
  /* 左右多留一條給頁面外的工具（背景按鈕在頁左 40px、段落把手在 36px），改這裡要一起改 reserveX。
     寬度至少撐滿編輯區、頁面放大時跟著變寬：留白算在自己的寬度裡，捲到最右邊也留得住 */
  box-sizing: border-box;
  padding-inline: 56px;
  min-inline-size: 100%;
  inline-size: max-content;
`;

/**
 * 流式排版的閱讀畫面用滿螢幕：頁面大小＝畫布大小換算回頁座標，字的大小固定（不整頁縮放）。
 * 流式只在換頁線與章、節換頁，頁數不受螢幕影響；變的只是一頁裡的內容怎麼排、要捲多少。
 *   學生平板（1024×768、1280×800）：zoom 1，內文 24px，高於 20px 的下限
 *   教室大螢幕（畫布寬 1700 以上）：zoom 1.5，整體放大給遠處的學生看（乙練 2026-10-22 定；
 *   依視角算，86 吋、最後一排 6–7 公尺至少要 1.3–1.5 倍，螢幕小或教室深要更大）
 * 畫布四周各留 24，頁邊再裁掉 READER_CROP（跟固定頁一樣），所以頁座標要把裁掉的加回去。
 */
const REFLOW_MARGIN = 24;
function useReflowSize(ref: React.RefObject<HTMLElement | null>, active: boolean): { size: PageDims; zoom: number } | null {
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);
  useEffect(() => {
    if (!active) {
      setBox(null);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const read = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w > 0 && h > 0) setBox((b) => (b && b.w === w && b.h === h ? b : { w, h }));
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, active]);
  if (!active || !box) return null;
  const zoom = box.w >= 1700 ? 1.5 : 1;
  return {
    zoom,
    size: {
      width: Math.round((box.w - REFLOW_MARGIN * 2) / zoom + READER_CROP * 2),
      height: Math.round((box.h - REFLOW_MARGIN * 2) / zoom + READER_CROP * 2),
    },
  };
}

