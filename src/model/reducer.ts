import { elementPopups, groupOf } from './popups';
import { canHavePopup } from './registry';
import { newId } from './ids';
import type { Action, DropTarget } from './actions';
import type { Block, Column, Doc, Row } from './types';
import { mergeSpans, sliceSpans, spliceSpans } from './spans';
import { applyImport } from './markdown';
import { makeRow, makeText } from './document';

/** 元件最窄一成、最寬滿欄。再窄就點不到、再寬就擠到頁外。 */
const clampPct = (pct: number) => Math.max(10, Math.min(100, pct));

/** 同一列的欄寬總和恆為 100。 */
function normalizeWidths(columns: Column[]): Column[] {
  const total = columns.reduce((s, c) => s + c.widthPct, 0) || 1;
  return columns.map((c) => ({ ...c, widthPct: (c.widthPct / total) * 100 }));
}

function mapBlock(doc: Doc, blockId: string, fn: (b: Block) => Block): Doc {
  let touched = false;
  const rows = doc.rows.map((row) => ({
    ...row,
    columns: row.columns.map((col) => ({
      ...col,
      blocks: col.blocks.map((b) => {
        if (b.id !== blockId) return b;
        const next = fn(b);
        // 回傳同一個物件＝什麼都沒改。這時整份文件也要維持同一個物件，
        // 否則「把粗體設成粗體」這種沒有效果的操作會佔掉一次復原。
        if (next === b) return b;
        touched = true;
        return next;
      }),
    })),
  }));
  return touched ? { ...doc, rows } : doc;
}

/** 抽出一列，回傳剩下的列與被抽出的那一列。 */
function detachRow(rows: Row[], rowId: string): { rest: Row[]; taken: Row | null } {
  const taken = rows.find((r) => r.id === rowId) ?? null;
  return { rest: rows.filter((r) => r.id !== rowId), taken };
}

function applyDrop(rows: Row[], moved: Row, target: DropTarget): Row[] {
  if (target.mode === 'row') {
    const index = Math.max(0, Math.min(target.index, rows.length));
    const next = rows.slice();
    // 整列搬家：原本幾欄就還是幾欄。以前會壓成一欄，兩個元件擠進同一欄、只剩整列一個握把，
    // 其中一個就再也拖不出來（直排時還會變成左右並排）。從多欄拆出來的那一欄自然是單欄、佔滿整寬
    next.splice(index, 0, { ...moved, columns: normalizeWidths(moved.columns) });
    return next;
  }

  return rows.map((row) => {
    if (row.id !== target.rowId) return row;
    // 拖過來的是多欄的一整列：各欄照樣是各欄，永遠不壓成一欄（理由同上）。
    // 會不會超過一列的上限由拖曳那邊擋：超過就不給併（useRowDrag 的 draggedCols）
    if (moved.columns.length > 1) {
      const merged = target.side === 'left' ? [...moved.columns, ...row.columns] : [...row.columns, ...moved.columns];
      return { ...row, columns: normalizeWidths(merged.map((c) => ({ ...c, widthPct: 100 / merged.length }))) };
    }
    const incoming: Column = {
      id: newId('col'),
      widthPct: 100 / (row.columns.length + 1),
      blocks: moved.columns.flatMap((c) => c.blocks),
    };
    // 原本只有一欄、元件沒佔滿：照元件實際用掉的長度留給它，新的一欄接在它正後面（直排就是正下方），
    // 元件本身維持原本的大小。否則平均分配；使用者可以再拖分隔線調整
    if (row.columns.length === 1 && target.keepPct !== undefined) {
      const keep = Math.max(10, Math.min(90, target.keepPct));
      const fit = target.fitPct;
      const old = row.columns[0];
      const kept: Column = {
        ...old,
        widthPct: keep,
        blocks:
          fit === undefined
            ? old.blocks
            : old.blocks.map((b) => (b.type === 'text' ? b : { ...b, widthPct: clampPct(fit) })),
      };
      const added = { ...incoming, widthPct: 100 - keep };
      return { ...row, columns: normalizeWidths(target.side === 'left' ? [added, kept] : [kept, added]) };
    }
    const columns =
      target.side === 'left' ? [incoming, ...row.columns] : [...row.columns, incoming];
    const even = columns.map((c) => ({ ...c, widthPct: 100 / columns.length }));
    return { ...row, columns: normalizeWidths(even) };
  });
}

/** 移除空掉的欄與空掉的列，避免拖曳之後留下看不見的殘骸。 */
function prune(rows: Row[]): Row[] {
  return rows
    .map((row) => {
      const columns = row.columns.filter((c) => c.blocks.length > 0);
      return columns.length === row.columns.length
        ? row
        : { ...row, columns: normalizeWidths(columns) };
    })
    .filter((row) => row.columns.length > 0);
}

/**
 * 純 reducer：同樣的輸入永遠得到同樣的輸出，不碰任何外部狀態。
 * 復原／重做與自動儲存都建立在這個性質上。
 */
export function applyAction(doc: Doc, action: Action): Doc {
  switch (action.type) {
    case 'setTitle':
      return { ...doc, title: action.title };

    case 'setSettings':
      return { ...doc, settings: { ...doc.settings, ...action.patch } };

    case 'setMeta':
      return { ...doc, meta: { ...doc.meta, ...action.patch } };

    case 'insertRow': {
      const index = Math.max(0, Math.min(action.index, doc.rows.length));
      const rows = doc.rows.slice();
      rows.splice(index, 0, {
        id: newId('row'),
        breakBefore: action.breakBefore ?? false,
        columns: [{ id: newId('col'), widthPct: 100, blocks: action.blocks }],
      });
      return { ...doc, rows };
    }

    case 'insertRows': {
      if (action.rows.length === 0) return doc;
      const index = Math.max(0, Math.min(action.index, doc.rows.length));
      const rows = doc.rows.slice();
      rows.splice(
        index,
        0,
        ...action.rows.map((blocks) => ({
          id: newId('row'),
          breakBefore: false,
          columns: [{ id: newId('col'), widthPct: 100, blocks }],
        }))
      );
      return { ...doc, rows };
    }

    case 'deleteRow': {
      const rows = doc.rows.filter((r) => r.id !== action.rowId);
      // 沒刪到東西就回傳原本的文件，否則會佔掉一次復原
      return rows.length === doc.rows.length ? doc : { ...doc, rows };
    }

    case 'deleteRows': {
      const drop = new Set(action.rowIds);
      const rows = doc.rows.filter((r) => !drop.has(r.id));
      // 一個都沒刪到就回傳原本的文件，否則會佔掉一次復原
      if (rows.length === doc.rows.length) return doc;
      // 整本刪光（例如刪掉唯一的一章）時留一段空標題，跟新教材一樣，老師有地方重新開始
      return { ...doc, rows: rows.length > 0 ? rows : [makeRow([makeText('', 'lessonTitle')])] };
    }

    case 'moveRows': {
      const pick = new Set(action.rowIds);
      const moving = doc.rows.filter((r) => pick.has(r.id));
      if (moving.length === 0) return doc;
      // 落點在搬的那批裡沒有意義（搬到自己之前）；落點不存在就是過期的 id
      if (action.beforeRowId !== null) {
        if (pick.has(action.beforeRowId)) return doc;
        if (!doc.rows.some((r) => r.id === action.beforeRowId)) return doc;
      }
      const rest = doc.rows.filter((r) => !pick.has(r.id));
      const at =
        action.beforeRowId === null ? rest.length : rest.findIndex((r) => r.id === action.beforeRowId);
      const rows = [...rest.slice(0, at), ...moving, ...rest.slice(at)];
      // 搬完順序沒變（例如搬到自己原本的位置）就不佔一次復原
      if (rows.every((r, i) => r === doc.rows[i])) return doc;
      return { ...doc, rows };
    }

    case 'deleteBlock': {
      let touched = false;
      const rows = doc.rows.map((row) => ({
        ...row,
        columns: row.columns.map((col) => {
          const blocks = col.blocks.filter((b) => b.id !== action.blockId);
          if (blocks.length === col.blocks.length) return col;
          touched = true;
          return { ...col, blocks };
        }),
      }));
      return touched ? { ...doc, rows: prune(rows) } : doc;
    }

    case 'moveColumn': {
      const src = doc.rows.find((r) => r.id === action.rowId);
      // 單欄的列請用 moveRow——這裡只處理「從多欄拆一欄出來」
      if (!src || src.columns.length < 2) return doc;
      const col = src.columns.find((c) => c.id === action.columnId);
      if (!col) return doc;

      const trimmed: Row = {
        ...src,
        columns: normalizeWidths(src.columns.filter((c) => c.id !== col.id)),
      };
      const rest = doc.rows.map((r) => (r.id === src.id ? trimmed : r));
      const moved: Row = { id: newId('row'), breakBefore: false, columns: [col] };
      return { ...doc, rows: prune(applyDrop(rest, moved, action.target)) };
    }

    case 'moveRow': {
      const fromIndex = doc.rows.findIndex((r) => r.id === action.rowId);
      if (fromIndex < 0) return doc;
      const { rest, taken } = detachRow(doc.rows, action.rowId);
      if (!taken) return doc;
      const target =
        action.target.mode === 'row' && action.target.index > fromIndex
          ? { ...action.target, index: action.target.index - 1 }
          : action.target;
      const rows = prune(applyDrop(rest, taken, target));
      if (
        rows.length === doc.rows.length &&
        rows.every((r, i) => r.id === doc.rows[i].id && r.columns.length === doc.rows[i].columns.length)
      ) {
        return doc;
      }
      return { ...doc, rows };
    }


    case 'setColumnWidths':
      return {
        ...doc,
        rows: doc.rows.map((row) =>
          row.id === action.rowId && action.widths.length === row.columns.length
            ? {
                ...row,
                columns: normalizeWidths(
                  row.columns.map((c, i) => ({ ...c, widthPct: action.widths[i] }))
                ),
              }
            : row
        ),
      };

    case 'setBreakBefore': {
      const target = doc.rows.find((r) => r.id === action.rowId);
      if (!target || target.breakBefore === action.value) return doc;
      return {
        ...doc,
        rows: doc.rows.map((r) =>
          r.id === action.rowId ? { ...r, breakBefore: action.value } : r
        ),
      };
    }

    case 'setPageBackground': {
      const target = doc.rows.find((r) => r.id === action.rowId);
      if (!target) return doc;
      const same =
        (target.pageBackground?.color ?? null) === (action.background?.color ?? null) &&
        (target.pageBackground?.assetId ?? null) === (action.background?.assetId ?? null);
      if (same) return doc;
      return {
        ...doc,
        rows: doc.rows.map((r) => {
          if (r.id !== action.rowId) return r;
          if (!action.background) {
            const { pageBackground: _drop, ...rest } = r;
            return rest;
          }
          return { ...r, pageBackground: action.background };
        }),
      };
    }

    case 'resizeBlock':
      return mapBlock(doc, action.blockId, (b) => {
        if (b.type === 'text') return b;
        const widthPct = action.widthPct === undefined ? undefined : clampPct(action.widthPct);
        const blockSize = action.blockSize === undefined ? undefined : Math.max(24, action.blockSize);
        if (b.widthPct === widthPct && b.blockSize === blockSize) return b;
        const { widthPct: _w, blockSize: _h, ...rest } = b;
        return {
          ...rest,
          ...(widthPct === undefined ? {} : { widthPct }),
          ...(blockSize === undefined ? {} : { blockSize }),
        } as typeof b;
      });

    case 'importDoc':
      return applyImport(doc, action.result);

    case 'setText':
      return mapBlock(doc, action.blockId, (b) =>
        b.type === 'text' ? { ...b, spans: [{ text: action.text }] } : b
      );

    case 'setSpans':
      return mapBlock(doc, action.blockId, (b) =>
        b.type === 'text' ? { ...b, spans: mergeSpans(action.spans) } : b
      );

    case 'toggleMark':
      return mapBlock(doc, action.blockId, (b) => {
        if (b.type !== 'text' || action.start >= action.end) return b;
        const marked = sliceSpans(b.spans, action.start, action.end).map((s) => ({
          ...s,
          [action.mark]: action.on ? true : undefined,
        }));
        return { ...b, spans: spliceSpans(b.spans, action.start, action.end, marked) };
      });

    case 'setTextRole':
      // 換層級就回到那個層級的預設字級：拿掉這段原本手動調過的字級（之後還是可以再調）
      return mapBlock(doc, action.blockId, (b) =>
        b.type === 'text' ? { ...b, role: action.role, fontSize: undefined } : b
      );

    case 'patchBlock':
      return mapBlock(doc, action.blockId, (b) =>
        b.type === action.blockType ? ({ ...b, ...action.patch } as typeof b) : b
      );

    case 'addPopup':
      // 整個元件的補充只掛一種類型（可以多個）：跟已經掛的種類不同就不收；大彈窗只能一個。
      // 連到幾個字上的補充自成一組，不算進來（forWords）
      return mapBlock(doc, action.blockId, (b) => {
        if (!canHavePopup(b.type)) return b;
        if (action.forWords) return { ...b, popups: [...b.popups, action.item] };
        const peers = elementPopups(b);
        return peers.length === 0 ||
          // 大彈窗一個元件只能一個（要更多內容就在大彈窗裡加頁）
          (peers[0].kind === action.item.kind && action.item.kind !== 'rich')
          ? { ...b, popups: [...b.popups, action.item] }
          : b;
      });

    case 'updatePopup':
      return mapBlock(doc, action.blockId, (b) => ({
        ...b,
        popups: b.popups.map((p) => (p.id === action.item.id ? action.item : p)),
      }));

    case 'removePopup':
      return mapBlock(doc, action.blockId, (b) => {
        const removed = b.popups.find((p) => p.id === action.popupId);
        const next = { ...b, popups: b.popups.filter((p) => p.id !== action.popupId) };
        // 同一組字刪到一項都不剩，那幾個字才放掉，否則它們還是一副可以點的樣子，點了卻什麼都沒有。
        // 還有別項時字上的代號留著：代號只是組名，第一項刪掉了，後面幾項照樣認得它
        const group = removed ? groupOf(removed) : action.popupId;
        if (next.type === 'text' && !next.popups.some((p) => groupOf(p) === group) && next.spans.some((s) => s.popupId === group)) {
          next.spans = mergeSpans(
            next.spans.map((s) => (s.popupId === group ? { ...s, popupId: undefined } : s))
          );
        }
        return next;
      });

    case 'reorderPopups':
      return mapBlock(doc, action.blockId, (b) => {
        const popups = b.popups.slice();
        const [moved] = popups.splice(action.from, 1);
        if (!moved) return b;
        // 夾住範圍：負的 to 會被 splice 當成「從尾端數回來」，
        // 靜靜地插到錯的位置。UI 有擋，但 reducer 是純核心，
        // 不能靠呼叫端保證輸入正確。
        const to = Math.max(0, Math.min(action.to, popups.length));
        if (to === action.from) return b;
        popups.splice(to, 0, moved);
        return { ...b, popups };
      });

    default: {
      const never: never = action;
      return never;
    }
  }
}
