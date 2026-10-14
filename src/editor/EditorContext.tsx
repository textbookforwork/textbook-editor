import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useRowDrag, type DragSubject } from './useRowDrag';
import { copyBlock, hasClipboard, pasteBlock } from '../model/clipboard';
import { findBlock } from '../model/document';
import type { DropTarget } from '../model/actions';
import type { Block } from '../model/types';
import { usePopupViewer } from '../viewer/PopupViewer';
import type { useEditor } from '../hooks/useEditor';

type Editor = ReturnType<typeof useEditor>;

export type EditorUI = {
  /** 目前選中的元件。選取外框由它決定。 */
  selectedBlockId: string | null;
  select: (blockId: string | null) => void;
  /** 全部放掉：選取、選字、文字游標。點空白處與按 Esc 走這裡。 */
  deselect: () => void;
  /**
   * 貼上剪貼簿裡的元件。落點是目前選取那一段的後面；
   * 沒選東西就放到全文最後。回傳貼上的元件 id，沒東西可貼回傳 null。
   */
  paste: () => string | null;

  /**
   * 展開插入面板的位置＝要插在 doc.rows 的第幾個之前。
   * null 代表沒有展開——插入點平常是安靜的，滑過才浮現提示，按下才展開。
   */
  insertAt: number | null;
  openInsert: (index: number | null) => void;
  /**
   * 媒體庫開著時要插在 doc.rows 的第幾個之前。
   * null 代表媒體庫沒開；插入素材時保持開啟，由使用者自行關閉。
   */
  libraryAt: number | null;
  openLibrary: (index: number | null) => void;
  /**
   * 游標停在空白處時，離它最近的縫隙。那一條「線＋加號」會浮現，跟著游標走——
   * 老師不必精準對準 20px 的感應線，整片空白都在告訴他「這裡可以加東西」。
   * null 代表游標不在空白處。
   */
  hoverGap: number | null;
  setHoverGap: (index: number | null) => void;

  /** 正在被拖曳的列。 */
  draggingRowId: string | null;
  setDraggingRowId: (id: string | null) => void;

  /** 目前滑過的落點。落點是離散的幾個，不是連續平面。 */
  dropTarget: DropTarget | null;
  setDropTarget: (t: DropTarget | null) => void;

  /**
   * 目前選起來的那一段字，以及它屬於哪個元件。
   *
   * slice 是這個片段在原文的位置——段落被切到第二頁時，畫面上的
   * 第 0 個字並不是原文的第 0 個字，套用標記前要先加回去。
   */
  inlineSelection: InlineSelection | null;
  setInlineSelection: (s: InlineSelection | null) => void;

  /**
   * 補充設定面板開在哪個元件上。null 代表沒開。
   *
   * 跟 selectedBlockId 分開存：選取是「我在看這一塊」，開面板是
   * 「我要編它的補充」。合成一個的話，選別的元件面板就會亂跳。
   */
  popupFor: string | null;
  openPopupPanel: (blockId: string | null) => void;

  /** 用學生看到的樣子預覽這個元件的補充。 */
  previewPopups: (block: Block) => void;

  /** 從握把開始拖曳。 */
  startDrag: (e: PointerEvent, subject: DragSubject) => void;
};

export type InlineSelection = {
  blockId: string;
  range: { start: number; end: number };
  slice?: { start: number; end: number };
};

const Ctx = createContext<(Editor & EditorUI) | null>(null);

export function EditorProvider({ editor, children }: { editor: Editor; children: ReactNode }) {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [insertAt, setInsertAt] = useState<number | null>(null);
  const [libraryAt, openLibrary] = useState<number | null>(null);
  const [hoverGap, setHoverGap] = useState<number | null>(null);
  const [draggingRowId, setDraggingRowId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<DropTarget | null>(null);
  const [inlineSelection, setInlineSelection] = useState<InlineSelection | null>(null);
  const [popupFor, openPopupPanel] = useState<string | null>(null);
  const viewer = usePopupViewer();
  const previewPopups = useCallback((b: Block) => viewer?.open(b), [viewer]);

  const openInsert = useCallback((index: number | null) => {
    setInsertAt(index);
    // 媒體庫開著時，若使用者點了其他頁或別處的插入點，同步更新媒體庫要插入的位置
    if (index !== null) {
      openLibrary((prev) => (prev !== null ? index : prev));
    }
  }, []);

  const select = useCallback(
    (blockId: string | null) => {
      setInlineSelection(null);
      const active = document.activeElement as HTMLElement | null;
      if (active && active !== document.body && active.closest('main')) {
        if (!blockId || !active.closest(`[data-block-id="${CSS.escape(blockId)}"]`)) {
          active.blur();
        }
      }
      setSelectedBlockId(blockId);
      if (blockId !== null) {
        const hit = findBlock(editor.doc, blockId);
        if (hit) {
          const rIdx = editor.doc.rows.findIndex((r) => r.id === hit.row.id);
          if (rIdx >= 0) {
            openLibrary((prev) => (prev !== null ? rIdx + 1 : prev));
          }
        }
      }
    },
    [editor.doc]
  );

  // 讓檢視器知道「編輯」該做什麼。只有編輯模式會註冊，
  // 學生端與預覽沒有人註冊，檢視器上就不會出現那顆按鈕。
  useEffect(() => {
    viewer?.registerEdit(openPopupPanel);
    return () => viewer?.registerEdit(null);
  }, [viewer]);

  const commit = useCallback(
    (subject: DragSubject, target: DropTarget) =>
      editor.dispatch(
        subject.columnId
          ? { type: 'moveColumn', rowId: subject.rowId, columnId: subject.columnId, target }
          : { type: 'moveRow', rowId: subject.rowId, target }
      ),
    [editor]
  );
  const { startDrag } = useRowDrag(setDraggingRowId, setDropTarget, commit);

  const deselect = useCallback(() => {
    const active = document.activeElement as HTMLElement | null;
    // 文字游標還留在段落裡的話，外框消失了鍵盤卻還在打字——看起來像壞掉
    if (active && active !== document.body && active.closest('main')) active.blur();
    setSelectedBlockId(null);
    setInlineSelection(null);
  }, []);

  const paste = useCallback((): string | null => {
    const block = pasteBlock();
    if (!block) return null;
    const hit = selectedBlockId ? findBlock(editor.doc, selectedBlockId) : null;
    const index = hit ? editor.doc.rows.findIndex((r) => r.id === hit.row.id) + 1 : editor.doc.rows.length;
    editor.dispatch({ type: 'insertRow', index, blocks: [block] });
    setSelectedBlockId(block.id);
    return block.id;
  }, [editor, selectedBlockId]);

  /**
   * 鍵盤快捷鍵。
   *
   * 游標在文字裡時全部讓給瀏覽器：那時候 Backspace 是刪字、Cmd+C 是複製字，
   * 不是刪元件、複製元件。只有「選了一個元件、但沒有在裡面打字」才接手。
   */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing =
        !!t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
      const mod = e.metaKey || e.ctrlKey;

      if (e.key === 'Escape') {
        if (selectedBlockId || inlineSelection || typing) {
          e.preventDefault();
          deselect();
        }
        return;
      }
      if (typing) return;

      // 復原重做。游標在文字裡時交給瀏覽器自己的，否則兩套會打架
      if (mod && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) editor.redo();
        else editor.undo();
        return;
      }
      if (mod && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        editor.redo();
        return;
      }

      if (mod && e.key.toLowerCase() === 'v') {
        if (!hasClipboard()) return;
        e.preventDefault();
        paste();
        return;
      }
      if (!selectedBlockId) return;
      const hit = findBlock(editor.doc, selectedBlockId);
      if (!hit) return;

      if (mod && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        copyBlock(hit.block);
      } else if (mod && e.key.toLowerCase() === 'x') {
        e.preventDefault();
        copyBlock(hit.block);
        editor.dispatch({ type: 'deleteBlock', blockId: hit.block.id });
        setSelectedBlockId(null);
      } else if (mod && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        copyBlock(hit.block);
        paste();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        editor.dispatch({ type: 'deleteBlock', blockId: hit.block.id });
        setSelectedBlockId(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [editor, selectedBlockId, inlineSelection, deselect, paste]);

  const value = useMemo(
    () => ({
      ...editor,
      selectedBlockId,
      select,
      deselect,
      paste,
      insertAt,
      openInsert,
      libraryAt,
      openLibrary,
      hoverGap,
      setHoverGap,
      draggingRowId,
      setDraggingRowId,
      dropTarget,
      setDropTarget,
      inlineSelection,
      setInlineSelection,
      popupFor,
      openPopupPanel,
      previewPopups,
      startDrag,
    }),
    [
      editor,
      selectedBlockId,
      select,
      deselect,
      paste,
      insertAt,
      openInsert,
      libraryAt,
      hoverGap,
      draggingRowId,
      dropTarget,
      inlineSelection,
      popupFor,
      previewPopups,
      startDrag,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** 唯讀（預覽模式）時回傳 null，元件據此關掉所有編輯行為。 */
export function useEditorCtx() {
  return useContext(Ctx);
}
