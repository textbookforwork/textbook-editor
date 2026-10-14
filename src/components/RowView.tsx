import { useRef } from 'react';
import styled from 'styled-components';
import { BlockView } from './BlockView';
import { BlockErrorBoundary } from './BlockErrorBoundary';
import { Icon } from './Icon';
import { InsertPoint } from './InsertPoint';
import { InsertPanel, type InsertKey } from './InsertPanel';
import type { Asset } from '../editor/assets';
import { useEditorCtx } from '../editor/EditorContext';
import { FlowResizeHandle, ResizeHandles, resizeModeOf } from '../editor/ResizeHandles';
import { textFlowStyle, FLOW_SHARE_OF_PAGE } from '../styles/roles';
import { usePopupViewer } from '../viewer/PopupViewer';
import { readyElementPopups } from '../model/popups';
import { PopupBadge } from './PopupBadge';
import { useParagraphIndex, useParaFocus } from './ParagraphContext';
import { paraLabel } from '../model/paragraphs';
import { COLUMN_GAP } from '../model/pageSize';
import { blockBox, fitTwoPerPage } from '../model/blockSizing';
import { blockRegistry } from '../model/registry';
import { snapPct } from '../model/snap';
import { makeText } from '../model/document';
import { newId } from '../model/ids';
import { newTable } from '../model/tableOps';
import { openLibraryTab } from '../editor/MediaLibrary';
import { openTableInsert } from '../editor/TablePanel';
import { useTableFrames } from './blocks/TableBlockView';
import { DEFAULT_TAIL } from './blocks/ShapeBlockView';
import type { PageItem } from '../model/paginate';
import type { Block, DocSettings } from '../model/types';

type Props = {
  item: PageItem;
  settings: DocSettings;
  contentInline: number;
  contentBlock: number;
  /** 這一列在 doc.rows 裡的位置。插入與拖曳都要用它。 */
  rowIndex: number;
  /** 全文共幾列。目前沒用到，留著給之後要分辨「全文最後一列」的功能。 */
  rowCount?: number;
};

/** 插入選單選了之後要產生什麼。真正的內容由使用者接著填。媒體庫走另一條（見 blockFromAsset）。 */
export function blockFor(key: Exclude<InsertKey, 'library'>, table?: { rows: number; cols: number }): Block {
  const id = newId('blk');
  switch (key) {
    case 'text':
      return makeText('', 'body');
    case 'image':
      // 所有非文字嵌入元件預設統一佔 50% 欄寬，預設不開圖說。
      // 還沒上傳時用 16:9，跟空的影片元件同大小；上傳後換成圖片的真實比例（putImage）
      return { id, type: 'image', assetId: null, alt: '', caption: '', hasCaption: false, aspectRatio: 16 / 9, widthPct: 50, popups: [] };
    case 'image-ai':
      // aiPrompt 有值（即使是空字串）就代表這張圖要用生成的，元件會改顯示描述框
      return { id, type: 'image', assetId: null, alt: '', caption: '', hasCaption: false, aspectRatio: 16 / 9, widthPct: 50, popups: [], aiPrompt: '' };
    case 'video':
      return { id, type: 'video', source: 'upload', ref: '', title: '', widthPct: 50, popups: [] };
    case 'audio':
      // 音檔預設佔欄寬 2/9（一條播放列，只放播放鍵和上傳鈕，不需要太長）
      return { id, type: 'audio', assetId: null, title: '', widthPct: 200 / 9, popups: [] };
    // 圖形預設尺寸由 blockSizing 決定（矩形／圓角／對話框佔 1/4 欄寬、圓形為 1:1 正圓），白底墨框
    case 'shape':
      return { id, type: 'shape', shape: 'rect', label: '', spans: [], popups: [] };
    case 'shape-circle':
      return { id, type: 'shape', shape: 'circle', label: '', spans: [], popups: [] };
    case 'shape-rounded':
      return { id, type: 'shape', shape: 'roundedRect', label: '', spans: [], popups: [] };
    case 'shape-callout':
      // 尖角預設指向右下，落在框外——框是分頁量的，尖角不佔版面
      return { id, type: 'shape', shape: 'callout', label: '', spans: [], tail: DEFAULT_TAIL, popups: [] };
    case 'line':
      // 一條橫跨框中線的實線，兩端沒有箭頭；端點選取後可以各自拖
      return { id, type: 'line', from: { x: 0, y: 0.5 }, to: { x: 1, y: 0.5 }, widthPct: 50, popups: [] };
    case 'table':
      // 大小由插入面板的子選單決定；白底黑框、空格，預設同其他非文字元件佔 50% 寬度
      return { ...newTable(table?.rows, table?.cols), widthPct: 50 };
    case 'web':
      return { id, type: 'web', url: '', title: '', presentation: 'bookmark', widthPct: 50, popups: [], chosen: false };
    case 'pdf':
      return { id, type: 'pdf', assetId: null, title: '', widthPct: 50, popups: [] };
  }
}

/**
 * 從媒體庫挑了一個素材：依種類變成對應的元件，檔名當標題。
 * 拖檔案到畫布（EditStage）上傳完也走這裡，所以匯出——兩邊建出來的元件要一樣。
 */
export function blockFromAsset(a: Asset, webPresentation: 'bookmark' | 'embed' = 'bookmark'): Block {
  const id = newId('blk');
  switch (a.kind) {
    case 'image':
      return { id, type: 'image', assetId: a.assetId, alt: a.name, caption: '', hasCaption: false, aspectRatio: a.aspectRatio ?? 1.5, widthPct: 50, popups: [] };
    case 'video':
      // YouTube 連結存在媒體庫的影片清單裡：ref 是網址，不是 assetId
      return a.source === 'youtube'
        ? { id, type: 'video', source: 'youtube', ref: a.url ?? '', title: '', widthPct: 50, popups: [] }
        : { id, type: 'video', source: 'upload', ref: a.assetId, title: a.name, widthPct: 50, popups: [] };
    case 'audio':
      return { id, type: 'audio', assetId: a.assetId, title: a.name, widthPct: 200 / 9, popups: [] };
    case 'web':
      return webPresentation === 'embed'
        ? { id, type: 'web', url: a.url ?? '', title: a.name, presentation: 'embed', widthPct: 100, popups: [] }
        : { id, type: 'web', url: a.url ?? '', title: a.name, presentation: 'bookmark', widthPct: 50, popups: [] };
    default:
      return { id, type: 'pdf', assetId: a.assetId, title: a.name, widthPct: 50, popups: [] };
  }
}

export function RowView({
  item,
  settings,
  contentInline,
  contentBlock,
  rowIndex,
}: Props) {
  const ed = useEditorCtx();
  // 檢視器在編輯與預覽兩邊都在：老師看到的補充就是學生看到的那一個
  const viewer = usePopupViewer();
  const paraIndex = useParagraphIndex();
  // 只有閱讀模式有：點段號聚焦那一段
  const paraFocus = useParaFocus();
  const vertical = settings.writingMode === 'vertical';
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  // 插入面板改用視窗座標定位，這兩個零尺寸的錨點只負責告訴它「插入點在哪」
  const headAnchor = useRef<HTMLDivElement>(null);
  const tailAnchor = useRef<HTMLDivElement>(null);

  /** 插入面板選了什麼。媒體庫不是元件，先開面板，挑完才插（且插入時不關閉面板）。 */
  const pick = (index: number) => (key: InsertKey, table?: { rows: number; cols: number }) => {
    ed?.openInsert(null);
    if (key === 'library') {
      ed?.openLibrary(index);
      return;
    }
    // PDF 跟媒體庫走同一套：直接打開媒體庫的 PDF 分頁（上傳 → 選頁 → 匯入）
    if (key === 'pdf') {
      openLibraryTab('pdf');
      ed?.openLibrary(index);
      return;
    }
    if (key === 'table') {
      openTableInsert(index);
      return;
    }
    const block = fitTwoPerPage(blockFor(key, table), settings);
    ed?.dispatch({ type: 'insertRow', index, blocks: [block] });
    // 插入文字後直接可以打字：選取新段落、把游標放進去。新的列要等分頁重算、畫出來才有
    // DOM，所以接下來幾幀內找它，找到可以編輯的那一塊就聚焦（最多試約半秒）
    if (block.type === 'text' && ed) {
      ed.select(block.id);
      let tries = 30;
      const focusNew = () => {
        const el = document.querySelector<HTMLElement>(`[data-block-id="${block.id}"] [contenteditable="true"]`);
        if (el) {
          el.focus();
          return;
        }
        if (--tries > 0) requestAnimationFrame(focusNew);
      };
      requestAnimationFrame(focusNew);
    }
  };
  // 表格的高度是量出來的，把手外框要跟著畫出來的高度走（見 useTableFrames）
  const tableFrames = useTableFrames();

  const row = item.row;
  const selected = ed?.selectedBlockId
    ? row.columns.some((c) => c.blocks.some((b) => b.id === ed.selectedBlockId))
    : false;

  const dropHere =
    ed?.dropTarget?.mode === 'column' && ed.dropTarget.rowId === row.id
      ? ed.dropTarget.side
      : null;
  /**
   * 被切到下一頁的段落，在兩頁上各畫一次，而且兩份的 rowIndex 相同。
   *
   * 所以「插在這一列之前」只能由**起點那一份**負責，「插在之後」只能由
   * **結尾那一份**負責——否則同一個插入點會在上下兩頁同時展開，
   * 而且中間那一份的位置根本不對：它的上緣是接續處，不是列的開頭。
   */
  const isStart = !item.continuedFromPrev;
  const isEnd = !item.continuesOnNext;

  const dropAbove = isStart && ed?.dropTarget?.mode === 'row' && ed.dropTarget.index === rowIndex;
  const dropBelow = isEnd && ed?.dropTarget?.mode === 'row' && ed.dropTarget.index === rowIndex + 1;

  const dragging = ed?.draggingRowId === row.id;

  return (
    <Slot ref={ref} $dragging={dragging}>
      {/* 落點一：插進順序裡。用絕對定位的細線，不佔版面高度——
          佔高度的話一開始拖曳，整頁的列都會跳動。 */}
      {dropAbove && <DropLine $where="start" $vertical={vertical} />}
      {dropBelow && <DropLine $where="end" $vertical={vertical} />}

      {/*
        插入點一律畫在列的**下方** 16px（見 InsertPoint 的 end）——距離才會一致。
        以前畫在下一列的上緣，而列與列之間的間距隨角色變（緊貼 20、換節 80），
        同一條線有時貼著字、有時飄在半空。只有全文第一列上方多一條，否則最前面加不了東西。
      */}
      {ed && isStart && rowIndex === 0 && !ed.draggingRowId && (
        <InsertPoint
          vertical={vertical}
          open={ed.insertAt === 0}
          hinted={ed.hoverGap === 0}
          onOpen={() => ed.openInsert(ed.insertAt === 0 ? null : 0)}
        />
      )}
      <PanelAnchor ref={headAnchor} />
      {ed?.insertAt === 0 && isStart && rowIndex === 0 && (
        <InsertPanel
          anchorRef={headAnchor}
          vertical={vertical}
          onClose={() => ed.openInsert(null)}
          onPick={pick(0)}
        />
      )}

      {/*
        識別屬性只有可編輯時才掛。縮圖列與預覽畫的是同一個 RowView，
        若兩邊都掛，整份文件就會有兩組同樣的 id；而縮圖列在 DOM 裡排在
        前面，document.querySelector 會先找到縮圖那一份——浮動膠囊、
        捲到某一頁、跳到某一段全部會指到左邊那條 180px 的縮圖上。
      */}
      <Frame
        ref={frameRef}
        data-row-id={ed ? row.id : undefined}
        data-row-index={ed ? rowIndex : undefined}
        $selected={selected}
        style={{ marginBlockStart: item.gapBefore }}
      >
        {/* 抓取點。用 pointer events 而不是 HTML5 拖曳——
            HTML5 拖曳在觸控裝置上完全不能用，而老師是用平板的。 */}
        {ed && (
          <Grip
            data-ui
            $vertical={vertical}
            onPointerDown={(e) => {
              e.preventDefault();
              ed.startDrag(e.nativeEvent, { rowId: row.id });
            }}
            aria-label="拖曳搬移"
            title="拖曳搬移這一列"
          >
            <Icon name="grip" size={16} />
          </Grip>
        )}

        {/* 落點二：推到元件側邊 → 跟它併成兩欄、三欄。
            畫成貼在那一側、跟整列一樣長的直線，刻意跟落點一（橫線）不同形態 */}
        {dropHere && (
          <SideDrop $side={dropHere === 'left' ? 'start' : 'end'} $vertical={vertical}>
            <span>併成{'零一二三四五'[row.columns.length + 1]}欄</span>
          </SideDrop>
        )}

        {item.continuedFromPrev && <Continues>接上頁</Continues>}

        <Columns data-columns>
          {row.columns.map((col, ci) => {
            const gaps = COLUMN_GAP * (row.columns.length - 1);
            const colInline = ((contentInline - gaps) * col.widthPct) / 100;
            return (
              <ColumnWrap
                key={col.id}
                data-col-id={ed ? col.id : undefined}
                style={{ flexBasis: `${col.widthPct}%` }}
              >
                {/* 多欄時每一欄各有握把，否則併起來就拆不開了 */}
                {ed && row.columns.length > 1 && (
                  <ColGrip
                    data-ui
                    $vertical={vertical}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      ed.startDrag(e.nativeEvent, { rowId: row.id, columnId: col.id });
                    }}
                    aria-label="拖曳搬移這一欄"
                    title="拖曳搬移這一欄。往上或往下放可以拆回獨立的一列"
                  >
                    <Icon name="grip" size={16} />
                  </ColGrip>
                )}
                {col.blocks.map((b) => {
                  const sizing = { inlineSize: colInline, maxBlockSize: contentBlock, vertical };
                  const isSelected = ed?.selectedBlockId === b.id;
                  const mode = ed && isSelected ? resizeModeOf(b) : null;
                  const box0 = mode ? blockBox(b, sizing) : null;
                  const box = box0 && b.type === 'table' ? tableFrames.frame(b.id, box0, vertical) : box0;
                  // 閱讀時不放角標：有補充的元件本身就能點，點下去直接打開。
                  // 元件裡自己會動的東西（播放鈕、連結、注釋號）照舊，不被搶走
                  // 連到字上的補充不在這裡：點那幾個字才開
                  const ready = readyElementPopups(b);
                  // 課文段落不靠點元件本身打開：點段號聚焦，再按右側的圓形按鈕（「補」就是這些補充）
                  const para = b.type === 'text' ? paraIndex.get(b.id) : undefined;
                  const tap = !ed && viewer && ready.length > 0 && !para
                    ? (el: HTMLElement) => viewer.open({ ...b, popups: ready }, el)
                    : null;
                  // 聚焦某一段時，其他元件調暗；同一段被換頁切開的後半一起亮
                  const dim = !!paraFocus?.focusId && para?.startId !== paraFocus.focusId;
                  // 點段號：編輯時打開這一段的說明面板，閱讀時聚焦這一段；縮圖裡不能點
                  const paraClick =
                    para && isStart && (ed || paraFocus)
                      ? (shell: HTMLElement) => {
                          if (ed) {
                            ed.select(b.id);
                            ed.openPopupPanel(b.id);
                          } else paraFocus?.toggle(para.startId, shell);
                        }
                      : null;
                  return (
                  <BlockShell
                    key={b.id}
                    $tap={!!tap}
                    role={tap ? 'button' : undefined}
                    tabIndex={tap ? 0 : undefined}
                    aria-label={tap ? '打開補充內容' : undefined}
                    onPointerDown={
                      paraClick
                        ? (e) => {
                            // 先記下「點在段號上」，閱讀模式外層放掉聚焦的判斷要看它（外層的 pointerdown 在這之後）
                            const el = e.currentTarget;
                            if (hitParaNo(el, e.clientX, e.clientY)) el.dataset.paraHit = '1';
                            else delete el.dataset.paraHit;
                          }
                        : undefined
                    }
                    onPointerMove={
                      paraClick
                        ? (e) => {
                            const el = e.currentTarget;
                            el.style.cursor = hitParaNo(el, e.clientX, e.clientY) ? 'pointer' : '';
                          }
                        : undefined
                    }
                    onClick={
                      paraClick
                        ? (e) => {
                            if (hitParaNo(e.currentTarget, e.clientX, e.clientY)) paraClick(e.currentTarget);
                          }
                        : tap
                        ? (e) => {
                            const t = e.target as HTMLElement;
                            if (t.closest('button, a, input, video, audio, iframe, sup[data-fn]')) return;
                            tap(e.currentTarget);
                          }
                        : undefined
                    }
                    onKeyDown={
                      tap
                        ? (e) => {
                            if (e.target !== e.currentTarget || (e.key !== 'Enter' && e.key !== ' ')) return;
                            e.preventDefault();
                            tap(e.currentTarget);
                          }
                        : undefined
                    }
                    ref={b.type === 'table' && ed ? tableFrames.ref(b.id) : undefined}
                    data-block-id={ed ? b.id : undefined}
                    $selected={isSelected}
                    /* 有把手時外框由把手那一層畫，這裡不再畫一圈 */
                    $framed={!!mode}
                    /* 非文字元件只佔自己那麼大：縮成一半的圖，右邊那一半是空白，
                       點下去要算點到空白，不是點到圖 */
                    $fit={b.type !== 'text'}
                    $dim={dim}
                  >
                    {/* 段號畫在文字元件裡（段首第一格，見 GlobalStyle 的 [data-pno]）。它是 ::before 點不到，
                        所以點擊與游標靠 paraHit 判斷位置；鍵盤用這顆看不見的按鈕 */}
                    {para && isStart && (ed || paraFocus) && (
                      <SrOnly
                        type="button"
                        onClick={(e) => {
                          const shell = e.currentTarget.parentElement as HTMLElement;
                          if (ed) {
                            ed.select(b.id);
                            ed.openPopupPanel(b.id);
                          } else paraFocus?.toggle(para.startId, shell);
                        }}
                      >
                        {ed ? `第 ${para.no} 段：編輯段落說明` : `第 ${para.no} 段`}
                      </SrOnly>
                    )}
                    {ed && mode && box && (
                      <ResizeHandles
                        mode={mode}
                        box={box}
                        columnInline={colInline}
                        vertical={vertical}
                        onResize={(next) =>
                          ed.dispatch({ type: 'resizeBlock', blockId: b.id, ...next })
                        }
                      />
                    )}
                    {/* 跟整本不同向的段落：拖延伸那一邊調盒子大小，取代原本工具列的「框高」欄位 */}
                    {ed && isSelected && b.type === 'text' && textFlowStyle(b, sizing).flipped && (
                      <FlowResizeHandle
                        size={Math.min(b.blockSize ?? contentBlock * FLOW_SHARE_OF_PAGE, contentBlock)}
                        max={contentBlock}
                        vertical={vertical}
                        onResize={(blockSize) =>
                          ed.dispatch({ type: 'patchBlock', blockId: b.id, blockType: 'text', patch: { blockSize } })
                        }
                      />
                    )}
                    {/* 閱讀時的課文段落不畫角標：它的補充收在右側的「補」按鈕裡 */}
                    {ready.length > 0 && !tap && !(para && !ed) && (
                      <PopupBadge
                        count={ready.length}
                        /* 把角標本身交出去：一項的補充直接在角標旁彈泡泡，多項才開中央視窗。只交出填完的項目 */
                        /* 角標只在編輯時能按：打開右側的補充內容面板去改。閱讀時不畫角標（點元件本身）；
                           縮圖裡沒有編輯器，只畫記號 */
                        onClick={
                          ed
                            ? () => {
                                ed.select(b.id);
                                ed.openPopupPanel(b.id);
                              }
                            : undefined
                        }
                        vertical={vertical}
                        side={row.columns.length > 1 && ci === 0 ? 'start' : 'end'}
                      />
                    )}
                    <BlockErrorBoundary label={blockRegistry[b.type]?.label}>
                    <BlockView
                      block={b}
                      settings={settings}
                      sizing={sizing}
                      onEditSpans={
                        ed ? (spans) => ed.editSpans(b.id, spans, item.textSlice) : undefined
                      }
                      onPatch={
                        ed
                          ? (patch) =>
                              ed.dispatch({
                                type: 'patchBlock',
                                blockId: b.id,
                                blockType: b.type,
                                patch,
                              })
                          : undefined
                      }
                      onSelectRange={
                        ed
                          ? (range) =>
                              ed.setInlineSelection(
                                range ? { blockId: b.id, range, slice: item.textSlice } : null
                              )
                          : undefined
                      }
                      onSelect={ed ? () => ed.select(b.id) : undefined}
                      paraLabel={para && isStart ? paraLabel(para.no, vertical) : undefined}
                      paraOn={!!para && paraFocus?.focusId === para.startId}
                    />
                    </BlockErrorBoundary>
                  </BlockShell>
                  );
                })}
                {ed && ci < row.columns.length - 1 && (
                  <Divider
                    rowId={row.id}
                    widths={row.columns.map((c) => c.widthPct)}
                    index={ci}
                    vertical={vertical}
                    onChange={(widths) =>
                      ed.dispatch({ type: 'setColumnWidths', rowId: row.id, widths })
                    }
                  />
                )}
              </ColumnWrap>
            );
          })}
        </Columns>

        {item.continuesOnNext && <Continues $end>接下頁</Continues>}
      </Frame>

      {/* 這一列之後的插入點：每一列都有，離內容固定 16px。被切到下一頁的列只在結尾那一份畫 */}
      {ed && isEnd && !ed.draggingRowId && (
        <InsertPoint
          vertical={vertical}
          where="end"
          open={ed.insertAt === rowIndex + 1}
          hinted={ed.hoverGap === rowIndex + 1}
          onOpen={() => ed.openInsert(ed.insertAt === rowIndex + 1 ? null : rowIndex + 1)}
        />
      )}
      <PanelAnchor ref={tailAnchor} />
      {ed?.insertAt === rowIndex + 1 && isEnd && (
        <InsertPanel
          anchorRef={tailAnchor}
          vertical={vertical}
          onClose={() => ed.openInsert(null)}
          onPick={pick(rowIndex + 1)}
        />
      )}
    </Slot>
  );
}

/** 欄分隔線：只調兩欄比例。拖到常用的分欄比例（1/4、1/3、一半…）會吸附。 */
function Divider({
  widths,
  index,
  vertical,
  onChange,
}: {
  rowId: string;
  widths: number[];
  index: number;
  vertical: boolean;
  onChange: (widths: number[]) => void;
}) {
  const start = useRef<{ pos: number; a: number; b: number; span: number } | null>(null);

  /**
   * 用容器的「實際渲染寬度」換算百分比，不用頁座標。
   *
   * 頁面是 transform: scale() 縮放過的，指標事件給的是視窗像素。
   * 拿視窗像素去除以頁座標的寬度，比例會差一個縮放倍率——
   * 縮到 62% 時，拖 100px 只會動到該動的六成。
   * 兩邊都用視窗像素就自動對齊，不必把倍率傳進來。
   */
  const axis = (e: React.PointerEvent) => (vertical ? e.clientY : e.clientX);

  return (
    <Handle
      role="separator"
      aria-label="調整欄寬"
      data-ui
      $vertical={vertical}
      onPointerDown={(e) => {
        const columns = e.currentTarget.closest<HTMLElement>('[data-columns]');
        const box = columns?.getBoundingClientRect();
        const span = (vertical ? box?.height : box?.width) ?? 0;
        if (span <= 0) return;

        start.current = { pos: axis(e), a: widths[index], b: widths[index + 1], span };
        // 包在 try 裡：它會對無效的 pointerId 丟例外，
        // 一丟就把上面的初始化整個中斷，拖曳靜靜地失效。
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* 沒有捕捉也能拖 */
        }
      }}
      onPointerMove={(e) => {
        const s = start.current;
        if (!s) return;
        const deltaPct = ((axis(e) - s.pos) / s.span) * 100;
        // 兩欄各自至少留一成，否則會被拖到看不見。
        // 吸附看的是這一欄佔「這兩欄合起來」的比例，多欄時才會對到 1/3
        const pair = s.a + s.b;
        const raw = Math.max(10, Math.min(pair - 10, s.a + deltaPct));
        const a = (snapPct((raw / pair) * 100) * pair) / 100;
        const next = widths.slice();
        next[index] = a;
        next[index + 1] = s.a + s.b - a;
        onChange(next);
      }}
      onPointerUp={() => {
        start.current = null;
      }}
      onPointerCancel={() => {
        start.current = null;
      }}
    />
  );
}

const Slot = styled.div<{ $dragging: boolean }>`
  position: relative;
  flex: none;
  inline-size: 100%;
  opacity: ${(p) => (p.$dragging ? 0.4 : 1)};
`;

/**
 * 插入面板的錨點：零尺寸，只用來回報「插入點在畫面上的哪個位置」。
 * 面板本身改用視窗座標畫在頁面之外，才不會被固定畫布的邊緣裁掉。
 */
const PanelAnchor = styled.div`
  inline-size: 0;
  block-size: 0;
`;

/* 選取外框只畫在元件上（BlockShell），列本身不畫——兩層都畫會變成雙框 */
const Frame = styled.div<{ $selected: boolean }>`
  position: relative;
  inline-size: 100%;
  display: flex;
  flex-direction: column;
`;

const Grip = styled.div<{ $vertical: boolean }>`
  position: absolute;
  ${(p) => (p.$vertical ? 'top: -36px; right: 0;' : 'left: -36px; top: 0;')}
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: ${(p) => p.theme.radius.field};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.icon.secondary};
  cursor: grab;
  writing-mode: horizontal-tb;

  /* 平常很淡但看得見——完全隱形的話沒人知道可以拖 */
  opacity: 0.35;
  transition: opacity 0.12s, border-color 0.12s, color 0.12s;

  ${Frame}:hover & {
    opacity: 1;
  }
  &:hover {
    border-color: ${(p) => p.theme.border.hover};
    color: ${(p) => p.theme.text.primary};
  }
  &:active {
    cursor: grabbing;
  }
`;

/**
 * 落點一：插進順序裡。
 * 一條貼在列前後緣的細線，兩端各一個圓點——語意是「落在這個縫隙」。
 * 絕對定位，不佔版面高度。
 */
const DropLine = styled.div<{ $where: 'start' | 'end'; $vertical: boolean }>`
  position: absolute;
  ${(p) =>
    p.$vertical
      ? `top: 0; bottom: 0; width: 3px; ${p.$where === 'start' ? 'right: -3px;' : 'left: -3px;'}`
      : `left: 0; right: 0; height: 3px; ${p.$where === 'start' ? 'top: -3px;' : 'bottom: -3px;'}`}
  z-index: 12;
  border-radius: 999px;
  background: ${(p) => p.theme.text.primary};
  writing-mode: horizontal-tb;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 9px;
    height: 9px;
    border-radius: 999px;
    background: ${(p) => p.theme.text.primary};
    ${(p) => (p.$vertical ? 'left: -3px;' : 'top: -3px;')}
  }
  &::before {
    ${(p) => (p.$vertical ? 'top: -4px;' : 'left: -4px;')}
  }
  &::after {
    ${(p) => (p.$vertical ? 'bottom: -4px;' : 'right: -4px;')}
  }
`;

/** 落點二：貼在側邊的直向落區。跟落點一視覺刻意完全不同。 */
/**
 * 併欄落點的提示：一條貼在列外側的實線，加一個小標籤。
 *
 * 絕對定位、不佔版面。一律用實體屬性——直排時列的「側邊」是上下，
 * 這個元件又設了 horizontal-tb，邏輯屬性會算成它自己的方向。
 */
const SideDrop = styled.div<{ $side: 'start' | 'end'; $vertical: boolean }>`
  position: absolute;
  z-index: 10;
  pointer-events: none;
  writing-mode: horizontal-tb;
  background: ${(p) => p.theme.border.hover};
  border-radius: ${(p) => p.theme.radius.control};
  ${(p) =>
    p.$vertical
      ? `left: 0; right: 0; block-size: 3px; ${p.$side === 'start' ? 'top: -14px;' : 'bottom: -14px;'}`
      : `top: 0; bottom: 0; inline-size: 3px; ${p.$side === 'start' ? 'left: -14px;' : 'right: -14px;'}`}

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    padding: 2px 10px;
    border-radius: ${(p) => p.theme.radius.control};
    background: ${(p) => p.theme.text.primary};
    color: ${(p) => p.theme.surface.raised};
    font-size: var(--ds-typography-label-size);
    line-height: var(--ds-typography-label-line-height);
    box-shadow: 0 2px 8px rgba(26, 25, 23, 0.18);
  }
`

const Columns = styled.div`
  display: flex;
  inline-size: 100%;
  gap: ${COLUMN_GAP}px;
  align-items: flex-start;
`;

const ColGrip = styled.div<{ $vertical: boolean }>`
  position: absolute;
  top: -10px;
  ${(p) => (p.$vertical ? 'right: -10px;' : 'left: -10px;')}
  z-index: 11;
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: ${(p) => p.theme.radius.field};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.icon.secondary};
  cursor: grab;
  writing-mode: horizontal-tb;
  opacity: 0.35;
  transition: opacity 0.12s, border-color 0.12s, color 0.12s;

  &:hover {
    opacity: 1;
    border-color: ${(p) => p.theme.border.hover};
    color: ${(p) => p.theme.text.primary};
  }
  &:active { cursor: grabbing; }
`;

const ColumnWrap = styled.div`
  position: relative;
  min-inline-size: 0;
`;

const Handle = styled.div<{ $vertical: boolean }>`
  position: absolute;
  inset-block: 0;
  inset-inline-end: -${COLUMN_GAP / 2}px;
  inline-size: 16px;
  /* 直排時欄是上下排的，拖曳軸也要跟著轉 */
  cursor: ${(p) => (p.$vertical ? 'row-resize' : 'col-resize')};
  display: grid;
  place-items: center;
  writing-mode: horizontal-tb;
  touch-action: none;
  opacity: 0;
  transition: opacity 0.12s;

  &::before {
    content: '';
    position: absolute;
    inset-block: 0;
    inline-size: 2px;
    background: ${(p) => p.theme.border.hover};
  }
  &:hover,
  &:active {
    opacity: 1;
  }
`;

const Continues = styled.div<{ $end?: boolean }>`
  font-size: var(--ds-typography-caption-size);
  line-height: var(--ds-typography-caption-line-height);
  color: ${(p) => p.theme.text.tertiary};
  margin-block: ${(p) => (p.$end ? '8px 0' : '0 8px')};

  &::before {
    content: '${(p) => (p.$end ? '↓ ' : '↑ ')}';
  }
`;

/**
 * 元件的外框。
 *
 * 存在的理由有兩個：給浮動膠囊一個可以定位的錨點（data-block-id），
 * 以及畫選取態。外框用 outline 不用 border——border 會改變元素尺寸，
 * 而尺寸是分頁算過的，一改就跟量測對不起來。
 */
const BlockShell = styled.div<{ $selected?: boolean; $framed?: boolean; $fit?: boolean; $tap?: boolean; $dim?: boolean }>`
  position: relative;
  border-radius: 4px;
  transition: opacity 0.2s;
  ${(p) => p.$dim && 'opacity: 0.28;'}
  /*
   * 閱讀時有補充的元件：不畫框線；滑過時鋪一層淡灰底，往外多鋪 8px（用陰影鋪，不佔版面），
   * 告訴學生這裡點得下去。框線只在用鍵盤移到它時出現（無障礙）
   */
  ${(p) =>
    p.$tap &&
    `cursor: pointer;
     outline: none !important;
     border-radius: 8px;
     transition: background-color 0.15s, box-shadow 0.15s;
     &:hover { background-color: ${p.theme.surface.sunken}; box-shadow: 0 0 0 8px ${p.theme.surface.sunken}; }
     &:focus-visible { outline: 2px solid ${p.theme.border.focus} !important; outline-offset: 8px; }`}
  ${(p) => p.$fit && 'inline-size: fit-content; max-inline-size: 100%;'}
  outline: ${(p) =>
    p.$selected && !p.$framed
      ? `${p.theme.border.widthSelected} solid ${p.theme.tool.border}`
      : 'none'};
  outline-offset: 4px;

  /* 外框已經畫在這裡，裡面的文字取得焦點時就不要再畫一圈 */
  ${(p) => p.$selected && '[contenteditable]:focus-visible { outline: none; }'}
`;

/**
 * 點的位置是不是段首那一格段號。段號是 ::before 畫的、點不到，所以用位置判斷：
 * 橫排是第一行最前面那一格，直排是第一欄最上面那一格。
 * 頁面整頁縮放過，字級量到的是縮放前的值，要乘上縮放比換成螢幕座標。
 */
function hitParaNo(shell: HTMLElement, x: number, y: number): boolean {
  const el = shell.querySelector<HTMLElement>('.ds-rich[data-pno]');
  if (!el) return false;
  const r = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  const fs = parseFloat(cs.fontSize);
  const lh = parseFloat(cs.lineHeight) || fs * 1.6;
  const vertical = cs.writingMode.startsWith('vertical');
  const k = vertical ? (el.offsetHeight ? r.height / el.offsetHeight : 1) : el.offsetWidth ? r.width / el.offsetWidth : 1;
  // 方框約 1em（後面空一格不算，點空格是點文字）
  const reach = fs * k;
  return vertical
    ? x >= r.right - lh * k && x <= r.right && y >= r.top && y <= r.top + reach
    : x >= r.left && x <= r.left + reach && y >= r.top && y <= r.top + lh * k;
}

/** 只給鍵盤與報讀軟體的按鈕：看不見，但 Tab 得到。 */
const SrOnly = styled.button`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  border: 0;
  &:focus-visible {
    width: auto;
    height: auto;
    clip: auto;
    margin: 0;
    padding: 2px 6px;
    top: 0;
    right: 0;
    background: ${(p) => p.theme.surface.raised};
    outline: 2px solid ${(p) => p.theme.border.focus};
  }
`;
