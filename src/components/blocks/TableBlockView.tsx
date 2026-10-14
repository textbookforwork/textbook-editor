import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Icon } from '../Icon';
import { useEditorCtx } from '../../editor/EditorContext';
import { setTableCell, useTableSelection } from '../../editor/TablePanel';
import {
  TABLE_BORDER,
  TABLE_HINT,
  TABLE_PAD_X,
  TABLE_PAD_Y,
  tableColWidths,
  tableOverflow,
  tableRowMins,
  type SizingContext,
} from '../../model/blockSizing';
import * as ops from '../../model/tableOps';
import { roleStyle } from '../../styles/roles';
import type { TableBlock } from '../../model/types';

/*
 * 表格。
 *
 * 高度是量出來的，不是列數乘常數：格子裡的字會換行，一列多高只有瀏覽器
 * 排一次才知道。所以表格跟文字一樣走 domMeasurer 的探針——探針裡放的
 * HTML 由下面的 tableToHtml() 產生，畫面上的 <table> 由同一組 tableStyles()
 * 決定樣式。**兩邊的樣式只有這一個來源**，任何一邊多一條 CSS，量到的就
 * 跟畫出來的不一樣，那一頁就會被撐破或留一截空白。
 *
 * 編輯用的東西（格線把手、欄列的「更多」、加欄加列的加號、截斷提示）
 * 全部絕對定位、不佔版面，量測時也不存在。
 */

// ── 量測與渲染共用的樣式 ───────────────────────────────────

/** 表格的樣式。所有值都是字串，才能直接轉成探針用的 style 屬性。 */
export type TableStyles = {
  table: Record<string, string>;
  colWidths: number[];
  rowMins: number[];
  cell: (r: number, c: number) => Record<string, string>;
};

/**
 * 從資料算出樣式。inlineSize 是表格的實際寬（頁座標），scale 是整本的字級檔位。
 *
 * 顏色一律是 CSS 變數或老師自己選的色值，沒有字面色——設計系統換色時
 * 表格跟著換，老師選過的格子維持他選的。
 */
export function tableStyles(
  block: TableBlock,
  inlineSize: number,
  scale = 1,
  live?: { colWidths?: number[]; rowMins?: number[] }
): TableStyles {
  const font = roleStyle('supplement', scale);
  const borderWidth = block.borderWidth ?? TABLE_BORDER;
  const borderColor = safeColor(block.borderColor, 'var(--ds-text-primary)');
  const border = borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : 'none';
  const preset = block.preset ?? 'plain';
  const headerRow = block.hasHeader || preset === 'header';
  const colWidths = live?.colWidths ?? tableColWidths(block);
  const rowMins = live?.rowMins ?? tableRowMins(block);

  const bgOf = (r: number, c: number): string => {
    const own = safeColor(block.cellBg?.[`${r},${c}`], '');
    if (own) return own;
    if (headerRow && r === 0) return 'var(--ds-surface-sunken)';
    if (preset === 'zebra' && r % 2 === 1) return 'var(--ds-surface-sunken)';
    return 'transparent';
  };

  return {
    table: {
      width: `${inlineSize}px`,
      'border-collapse': 'collapse',
      'table-layout': 'fixed',
      'font-size': font.fontSize,
      'line-height': font.lineHeight,
      'font-weight': font.fontWeight,
      'font-family': font.fontFamily,
      color: 'var(--ds-text-primary)',
      // 格線永遠是橫著的，即使課文是直排——表格是資料不是行文
      'writing-mode': 'horizontal-tb',
    },
    colWidths,
    rowMins,
    cell: (r, c) => ({
      border,
      padding: `${TABLE_PAD_Y}px ${TABLE_PAD_X}px`,
      'box-sizing': 'border-box',
      'vertical-align': 'top',
      'text-align': 'start',
      // 可以換行。word-break 跟 .ds-rich 一致
      'white-space': 'pre-wrap',
      'word-break': 'break-word',
      overflow: 'hidden',
      'font-weight': headerRow && r === 0 ? '600' : 'inherit',
      background: bgOf(r, c),
    }),
  };
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * 老師能輸入的顏色（選色器、日後也可能來自匯入資料）只收這幾種寫法。
 * 不合的當沒設——顏色是寫進 style 的值，寬鬆收會讓資料裡的字串跑進樣式。
 */
export const SAFE_COLOR = /^(#[0-9a-f]{3,8}|var\(--[a-z0-9-]+\)|transparent|rgba?\([\d\s.,%]+\))$/i;
const safeColor = (v: string | undefined, fallback: string) =>
  v && SAFE_COLOR.test(v) ? v : fallback;

/** 字串鍵的樣式套到元素上。用 setProperty 不拼字串，值不會跳出屬性。 */
const applyStyle = (el: HTMLElement, style: Record<string, string>) => {
  for (const [k, v] of Object.entries(style)) el.style.setProperty(k, v);
};

/**
 * 探針用的 <table>。結構與樣式跟 React 畫出來的一模一樣；
 * 用 DOM API 建而不是拼 HTML，顏色與文字都走屬性賦值，沒有注入的路。
 */
export function buildTableElement(block: TableBlock, inlineSize: number, scale = 1): HTMLTableElement {
  const s = tableStyles(block, inlineSize, scale);
  const table = document.createElement('table');
  applyStyle(table, s.table);
  const colgroup = document.createElement('colgroup');
  for (const w of s.colWidths) {
    const col = document.createElement('col');
    col.style.width = `${w}%`;
    colgroup.appendChild(col);
  }
  table.appendChild(colgroup);
  const tbody = document.createElement('tbody');
  for (let r = 0; r < block.rows; r++) {
    const tr = document.createElement('tr');
    tr.style.height = `${s.rowMins[r]}px`;
    for (let c = 0; c < block.cols; c++) {
      const td = document.createElement('td');
      applyStyle(td, s.cell(r, c));
      // 空格也要有高度，否則一列空白的表格會塌成 0
      td.textContent = block.cells[r]?.[c] || '​';
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  return table;
}

/** 把字串鍵的樣式轉成 React 的 style 物件。 */
const toReact = (style: Record<string, string>): CSSProperties => {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(style)) {
    out[k.replace(/-([a-z])/g, (_, ch: string) => ch.toUpperCase())] = v;
  }
  return out as CSSProperties;
};

// ── 把手外框要跟著量出來的高度走 ──────────────────────────────

/**
 * 給 RowView 用：表格的高度由內容決定，blockBox 只給得出下限，
 * 把手的外框得跟著畫出來的高度走。用 ResizeObserver 讀 BlockShell 的實際高度，
 * 讀到的是版面座標（transform 縮放前），跟 blockBox 同一個座標系。
 */
export function useTableFrames() {
  const [sizes, setSizes] = useState<Record<string, number>>({});
  const refs = useRef(new Map<string, (el: HTMLElement | null) => void>());
  const ids = useRef(new WeakMap<Element, string>());
  const observer = useRef<ResizeObserver | null>(null);

  const ref = (id: string) => {
    let cb = refs.current.get(id);
    if (!cb) {
      cb = (el) => {
        if (!el) return;
        if (!observer.current && typeof ResizeObserver !== 'undefined') {
          observer.current = new ResizeObserver((entries) => {
            setSizes((prev) => {
              let next = prev;
              for (const e of entries) {
                const key = ids.current.get(e.target);
                const h = (e.target as HTMLElement).offsetHeight;
                if (key && prev[key] !== h) next = { ...next, [key]: h };
              }
              return next;
            });
          });
        }
        ids.current.set(el, id);
        observer.current?.observe(el);
        return () => observer.current?.unobserve(el);
      };
      refs.current.set(id, cb);
    }
    return cb;
  };

  const frame = <T extends { blockSize: number; inlineSize: number }>(id: string, box: T, vertical = false): T =>
    sizes[id] ? (vertical ? { ...box, inlineSize: sizes[id] } : { ...box, blockSize: sizes[id] }) : box;

  return { ref, frame };
}

// ── 元件 ─────────────────────────────────────────────────

type Props = {
  block: TableBlock;
  boxStyle?: CSSProperties;
  /** 跟量測用的是同一組尺寸，用來判斷放不放得下一頁。 */
  sizing: SizingContext;
  /** 整本的字級檔位。表格的字跟內文一起縮放。 */
  scale?: number;
  onSelect?: () => void;
};

type Menu = { kind: 'col' | 'row'; index: number; rect: DOMRect };
type RowRect = { top: number; height: number };

/** 拖了多遠才算拖曳，而不是點一下。 */
const SLOP = 4;

export function TableBlockView({ block, boxStyle, sizing, scale = 1, onSelect }: Props) {
  const ed = useEditorCtx();
  const editable = !!ed;
  const selected = !!ed && ed.selectedBlockId === block.id;
  const vertical = sizing.vertical;

  // 寬一律來自 blockBox（BlockView 已經換好軸）；高度交給內容，
  // 直排時由欄數決定寬度，可用高度為當頁垂直空間（inlineSize）
  const width = typeof boxStyle?.width === 'number' ? boxStyle.width : sizing.inlineSize;
  const room = vertical ? sizing.inlineSize : sizing.maxBlockSize;

  const wrapRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  // 拖格線時的即時值：只在放開時才寫回文件，否則每一步都佔一次復原
  const [live, setLive] = useState<{ colWidths?: number[]; rowMins?: number[] } | null>(null);
  const styles = tableStyles(block, width, scale, live ?? undefined);

  // 每一列畫出來的位置。格線把手、列的「更多」、截斷提示都靠它
  const [rowRects, setRowRects] = useState<RowRect[]>([]);
  useLayoutEffect(() => {
    const t = tableRef.current;
    if (!t) return;
    const next = Array.from(t.rows, (tr) => ({ top: tr.offsetTop, height: tr.offsetHeight }));
    setRowRects((prev) =>
      prev.length === next.length &&
      prev.every((p, i) => p.top === next[i].top && p.height === next[i].height)
        ? prev
        : next
    );
  });

  // 比一頁還高的表格只能截斷（切一半的表格在下一頁沒有表頭，看不懂），
  // 但一定要說出來——少幾列而沒人發現，學生看到的就是缺資料的課本
  const over = tableOverflow(rowRects.map((r) => r.height), room);

  // ── 選格與打字 ──
  const sel = useTableSelection();
  const cell = selected && sel.cell?.blockId === block.id ? sel.cell : null;
  const [editing, setEditing] = useState(false);
  const [lineSel, setLineSel] = useState<{ kind: 'col' | 'row'; index: number } | null>(null);
  const [menu, setMenu] = useState<Menu | null>(null);
  const [dropAt, setDropAt] = useState<{ kind: 'col' | 'row'; index: number } | null>(null);

  // 表格被取消選取時，格子的選取也一起放掉。
  // 只有可編輯的那一份負責：縮圖列畫的是同一個元件但沒有編輯脈絡，
  // 它永遠是「未選取」，讓它也跑會把剛選好的格子立刻清掉
  useEffect(() => {
    if (!editable || selected) return;
    setEditing(false);
    setLineSel(null);
    setMenu(null);
    if (sel.cell?.blockId === block.id) setTableCell(null);
  }, [editable, selected, sel.cell, block.id]);

  // 選了一格但沒在打字：焦點放在格子上，鍵盤才有地方去（Enter 開始打字、Delete 清空）
  useEffect(() => {
    if (!cell || editing) return;
    const td = tableRef.current?.rows[cell.r]?.cells[cell.c] as HTMLElement | undefined;
    if (td && document.activeElement !== td) td.focus({ preventScroll: true });
  }, [cell, editing]);

  const patch = (next: TableBlock) => {
    if (!ed || next === block) return;
    const { id: _id, type: _type, popups: _p, ...rest } = next;
    ed.dispatch({ type: 'patchBlock', blockId: block.id, blockType: 'table', patch: rest });
  };

  /**
   * 讓格子立刻可以打字。同步改屬性是為了讓這一次 pointerdown 的預設行為就把游標放進去。
   * seed 是「直接打字」時的第一個字：格子本來就有焦點，瀏覽器不會把它當成編輯區，
   * 要先放掉焦點再拿回來，並把游標放到字的後面。
   */
  const startEditing = (td: HTMLElement, seed?: string) => {
    td.contentEditable = 'true';
    if (seed !== undefined) {
      td.textContent = seed;
      td.blur();
    }
    td.focus({ preventScroll: true });
    if (seed !== undefined) {
      const range = document.createRange();
      range.selectNodeContents(td);
      range.collapse(false);
      const s = window.getSelection();
      s?.removeAllRanges();
      s?.addRange(range);
    }
    setEditing(true);
  };

  const commit = (td: HTMLElement, r: number, c: number) => {
    // innerText 保留換行；最後一個換行是 contentEditable 自己補的
    const text = td.innerText.replace(/\n$/, '');
    td.contentEditable = 'false';
    setEditing(false);
    patch(ops.setCell(block, r, c, text));
  };

  /** 頁面是 transform: scale() 縮放過的，指標給的是視窗像素，要除回版面座標。 */
  const scaleOf = () => {
    const el = wrapRef.current;
    return el ? el.getBoundingClientRect().width / (el.offsetWidth || 1) : 1;
  };

  // ── 拖格線：欄寬 ──
  const startColResize = (c: number) => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const k = scaleOf();
    const x0 = e.clientX;
    const base = tableColWidths(block);
    let next = base;
    const move = (ev: PointerEvent) => {
      const dPct = ((ev.clientX - x0) / k / width) * 100;
      const pair = base[c] + base[c + 1];
      // 兩欄各至少留 5%，否則會被拖到看不見
      const a = Math.max(5, Math.min(pair - 5, base[c] + dPct));
      next = base.slice();
      next[c] = a;
      next[c + 1] = pair - a;
      setLive({ colWidths: next });
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      setLive(null);
      if (next !== base) patch(ops.setColWidths(block, next));
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  // ── 拖格線：列高（下限） ──
  const startRowResize = (r: number) => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const k = scaleOf();
    const y0 = e.clientY;
    const h0 = rowRects[r]?.height ?? styles.rowMins[r];
    let next: number | null = null;
    const move = (ev: PointerEvent) => {
      next = Math.max(TABLE_PAD_Y * 2 + 8, Math.round(h0 + (ev.clientY - y0) / k));
      const mins = tableRowMins(block).slice();
      mins[r] = next;
      setLive({ rowMins: mins });
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      setLive(null);
      if (next !== null) patch(ops.setRowHeight(block, r, next));
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  // ── 「更多」把手：按住拖曳調順序，點一下開選單 ──
  const startHandle = (kind: 'col' | 'row', index: number) => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const handle = e.currentTarget as HTMLElement;
    const k = scaleOf();
    const x0 = e.clientX;
    const y0 = e.clientY;
    let dragging = false;
    let target = index;

    const edges = () => {
      // 每一欄／列的中點：指標過了中點就算落到它後面
      if (kind === 'col') {
        let acc = 0;
        return styles.colWidths.map((w) => {
          const mid = ((acc + w / 2) / 100) * width;
          acc += w;
          return mid;
        });
      }
      return rowRects.map((r) => r.top + r.height / 2);
    };
    const move = (ev: PointerEvent) => {
      if (!dragging && Math.hypot(ev.clientX - x0, ev.clientY - y0) < SLOP) return;
      dragging = true;
      setMenu(null);
      const rect = wrapRef.current!.getBoundingClientRect();
      const pos = kind === 'col' ? (ev.clientX - rect.left) / k : (ev.clientY - rect.top) / k;
      const mids = edges();
      target = mids.filter((m) => m < pos).length;
      // 把第 index 個搬到「第 target 個之前」：自己之後的位置要扣掉自己
      setDropAt({ kind, index: target });
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      setDropAt(null);
      if (!dragging) {
        // 點一下：選整欄／整列，開選單
        setLineSel({ kind, index });
        setTableCell(null);
        setEditing(false);
        setMenu({ kind, index, rect: handle.getBoundingClientRect() });
        return;
      }
      const to = target > index ? target - 1 : target;
      if (to === index) return;
      patch(kind === 'col' ? ops.moveCol(block, index, to) : ops.moveRow(block, index, to));
      setLineSel({ kind, index: to });
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  // 點了選單以外的地方就收起
  useEffect(() => {
    if (!menu) return;
    const onDown = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest('[data-table-menu]')) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(null);
    window.addEventListener('pointerdown', onDown, true);
    window.addEventListener('keydown', onKey, true);
    return () => {
      window.removeEventListener('pointerdown', onDown, true);
      window.removeEventListener('keydown', onKey, true);
    };
  }, [menu]);

  const menuAct = (what: 'insert' | 'delete') => {
    if (!menu) return;
    const { kind, index } = menu;
    setMenu(null);
    setLineSel(null);
    if (kind === 'col') patch(what === 'insert' ? ops.insertCol(block, index + 1) : ops.deleteCol(block, index));
    else patch(what === 'insert' ? ops.insertRow(block, index + 1) : ops.deleteRow(block, index));
  };

  // ── 格子的指標與鍵盤 ──
  const onCellDown = (r: number, c: number) => (e: React.PointerEvent<HTMLTableCellElement>) => {
    if (!editable) return;
    setLineSel(null);
    if (!selected) return; // 第一下交給 Wrap 選整個表格
    const td = e.currentTarget;
    if (cell && cell.r === r && cell.c === c) {
      // 再點一次已選的格子：出現游標
      if (!editing) startEditing(td);
      return;
    }
    e.preventDefault();
    setTableCell({ blockId: block.id, r, c });
    setEditing(false);
  };

  const onCellKey = (r: number, c: number) => (e: React.KeyboardEvent<HTMLTableCellElement>) => {
    const td = e.currentTarget;
    // 焦點可能還留在剛放掉的格子上；不是選中的那一格就不接手，讓外面的快捷鍵處理
    if (!cell || cell.r !== r || cell.c !== c) return;
    if (editing) {
      if (e.key === 'Enter' && !e.shiftKey) {
        // Enter 收游標，格子仍是選取的；Shift+Enter 才換行
        e.preventDefault();
        e.stopPropagation();
        td.blur();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        td.blur();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        e.stopPropagation();
        td.blur();
        const n = e.shiftKey ? r * block.cols + c - 1 : r * block.cols + c + 1;
        if (n >= 0 && n < block.rows * block.cols)
          setTableCell({ blockId: block.id, r: Math.floor(n / block.cols), c: n % block.cols });
      }
      return;
    }
    // 選了格子但沒在打字
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      startEditing(td);
    } else if (e.key === 'Escape') {
      // 第一次 Esc 放掉格子，第二次才會傳到外面放掉整個表格
      e.preventDefault();
      e.stopPropagation();
      setTableCell(null);
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      // 外面的快捷鍵會把整個表格刪掉——選著一格時刪的是格子的內容
      e.preventDefault();
      e.stopPropagation();
      patch(ops.setCell(block, r, c, ''));
    } else if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
      // 直接打字：第一個字取代原本的內容，後面的字由瀏覽器接著打進去
      e.preventDefault();
      e.stopPropagation();
      startEditing(td, e.key);
    }
  };

  /**
   * 每一格的 innerHTML 物件要在文字沒變時保持同一個：React 19 比的是物件
   * 身分不是字串，換了物件就會重設 innerHTML——打字途中列高一變、重畫一次，
   * 剛打的字就被清掉。所以同一段文字永遠對到同一個物件。
   */
  const htmlCache = useRef(new Map<string, { __html: string }>());
  const htmlOf = (text: string) => {
    let h = htmlCache.current.get(text);
    if (!h) {
      h = { __html: esc(text) || '&#8203;' };
      htmlCache.current.set(text, h);
    }
    return h;
  };

  const colLeft = (c: number) => styles.colWidths.slice(0, c).reduce((a, b) => a + b, 0);
  const showTools = selected && !vertical;

  return (
    <Wrap
      ref={wrapRef}
      style={vertical ? { width: boxStyle?.width } : { width }}
      onPointerDown={onSelect}
      data-table-block
    >
      <Clip style={{ maxHeight: room }}>
        <table ref={tableRef} style={toReact(styles.table)}>
          <colgroup>
            {styles.colWidths.map((w, c) => (
              <col key={c} style={{ width: `${w}%` }} />
            ))}
          </colgroup>
          <tbody>
            {Array.from({ length: block.rows }, (_, r) => (
              <tr key={r} style={{ height: styles.rowMins[r] }}>
                {Array.from({ length: block.cols }, (_, c) => {
                  const text = block.cells[r]?.[c] ?? '';
                  const isCell = !!cell && cell.r === r && cell.c === c;
                  return (
                    <Cell
                      key={c}
                      style={toReact(styles.cell(r, c))}
                      $selected={isCell}
                      $editing={isCell && editing}
                      tabIndex={editable && selected ? -1 : undefined}
                      contentEditable={isCell && editing ? 'true' : undefined}
                      suppressContentEditableWarning
                      onPointerDown={onCellDown(r, c)}
                      onKeyDown={editable ? onCellKey(r, c) : undefined}
                      onBlur={isCell && editing ? (e) => commit(e.currentTarget, r, c) : undefined}
                      // 用 innerHTML 而不是子節點：打字時瀏覽器會自己動 DOM，React 若握著舊的
                      // 文字節點，寫回之後畫面上會出現兩份字。文字變了才整個換掉（見 htmlOf）
                      dangerouslySetInnerHTML={htmlOf(text)}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {over && (
          <Cut data-ui>
            還有 {over.hidden} 列放不下這一頁。表格不能跨頁，請拆成兩個表格。
          </Cut>
        )}
      </Clip>

      {showTools && (
        <>
          {/* 整欄／整列選取的框 */}
          {lineSel && lineSel.kind === 'col' && (
            <LineBox
              style={{
                left: `${colLeft(lineSel.index)}%`,
                width: `${styles.colWidths[lineSel.index]}%`,
                top: 0,
                height: Math.min(rowRects.reduce((a, r) => a + r.height, 0), room),
              }}
            />
          )}
          {lineSel && lineSel.kind === 'row' && rowRects[lineSel.index] && (
            <LineBox
              style={{
                left: 0,
                width: '100%',
                top: rowRects[lineSel.index].top,
                height: rowRects[lineSel.index].height,
              }}
            />
          )}

          {/* 拖欄／列時的落點線 */}
          {dropAt && dropAt.kind === 'col' && (
            <DropLine $vertical style={{ left: `${colLeft(dropAt.index)}%` }} />
          )}
          {dropAt && dropAt.kind === 'row' && (
            <DropLine
              style={{
                top:
                  dropAt.index < rowRects.length
                    ? rowRects[dropAt.index].top
                    : rowRects.reduce((a, r) => a + r.height, 0),
              }}
            />
          )}

          {/* 格線把手：欄與欄之間、列與列之間。hover 變成箭頭，拖了就改尺寸 */}
          {styles.colWidths.slice(0, -1).map((_, c) => (
            <ColLine
              key={`c${c}`}
              data-ui
              style={{ left: `${colLeft(c + 1)}%` }}
              onPointerDown={startColResize(c)}
              aria-label="調整欄寬"
            />
          ))}
          {rowRects.map((r, i) => (
            <RowLine
              key={`r${i}`}
              data-ui
              style={{ top: r.top + r.height }}
              onPointerDown={startRowResize(i)}
              aria-label="調整列高"
            />
          ))}

          {/* 欄的「更多」：按住拖曳調順序，點一下開選單 */}
          {styles.colWidths.map((w, c) => (
            <ColHandle
              key={`h${c}`}
              data-ui
              $on={(lineSel?.kind === 'col' && lineSel.index === c) || (menu?.kind === 'col' && menu.index === c)}
              style={{ left: `${colLeft(c) + w / 2}%` }}
              onPointerDown={startHandle('col', c)}
              title="拖曳調整順序，點一下開選單"
              aria-label={`第 ${c + 1} 欄`}
            >
              <Dots />
            </ColHandle>
          ))}
          {rowRects.map((r, i) => (
            <RowHandle
              key={`rh${i}`}
              data-ui
              $on={(lineSel?.kind === 'row' && lineSel.index === i) || (menu?.kind === 'row' && menu.index === i)}
              style={{ top: r.top + r.height / 2 }}
              onPointerDown={startHandle('row', i)}
              title="拖曳調整順序，點一下開選單"
              aria-label={`第 ${i + 1} 列`}
            >
              <Dots $vertical />
            </RowHandle>
          ))}

          {/* 右側加欄、下方加列 */}
          <AddCol
            data-ui
            type="button"
            title="新增一欄"
            aria-label="新增一欄"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => patch(ops.insertCol(block, block.cols))}
          >
            <Icon name="plus" size={16} />
          </AddCol>
          <AddRow
            data-ui
            type="button"
            title="新增一列"
            aria-label="新增一列"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => patch(ops.insertRow(block, block.rows))}
          >
            <Icon name="plus" size={16} />
          </AddRow>
        </>
      )}

      {menu &&
        createPortal(
          <MenuPop
            data-table-menu
            data-ui
            role="menu"
            style={
              menu.kind === 'col'
                ? { top: menu.rect.bottom + 6, left: menu.rect.left + menu.rect.width / 2, transform: 'translateX(-50%)' }
                : { top: menu.rect.top + menu.rect.height / 2, left: menu.rect.left - 6, transform: 'translate(-100%, -50%)' }
            }
          >
            <MenuItem type="button" role="menuitem" onClick={() => menuAct('insert')}>
              {menu.kind === 'col' ? '向右新增一欄' : '向下新增一列'}
            </MenuItem>
            <MenuItem
              type="button"
              role="menuitem"
              disabled={menu.kind === 'col' ? block.cols <= 1 : block.rows <= 1}
              onClick={() => menuAct('delete')}
            >
              {menu.kind === 'col' ? '刪除此欄' : '刪除此列'}
            </MenuItem>
          </MenuPop>,
          document.body
        )}
    </Wrap>
  );
}

// ── 樣式 ─────────────────────────────────────────────────

const Wrap = styled.div`
  position: relative;
  box-sizing: border-box;
  writing-mode: horizontal-tb;
`;

/**
 * 只有這一層裁切。把手畫在它外面，才不會被一起裁掉。
 * 用 clip 不用 hidden：hidden 仍是可捲動容器，在被裁掉的格子裡打字時
 * 瀏覽器會把游標捲進來，整張表就在框裡偷偷位移，截斷提示也跟著跑掉。
 */
const Clip = styled.div`
  position: relative;
  overflow: hidden;
  overflow: clip;
`;

const Cell = styled.td<{ $selected: boolean; $editing: boolean }>`
  /*
   * 選取框用內縮的 box-shadow 畫：不改尺寸（量測端看不到它是對的），
   * 也不會被全域的「滑鼠點的焦點不畫框」規則蓋掉——outline 會。
   * 打字中換成淡一點的框，表示現在框裡的是游標不是整格。
   */
  box-shadow: ${(p) =>
    p.$editing
      ? `inset 0 0 0 2px ${p.theme.tool.borderSubtle}`
      : p.$selected
        ? `inset 0 0 0 2px ${p.theme.tool.border}`
        : 'none'};
  cursor: ${(p) => (p.$editing ? 'text' : 'default')};
  &:focus,
  &:focus-visible { outline: none; }
`;

const Cut = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  block-size: ${TABLE_HINT}px;
  padding: 0 ${TABLE_PAD_X}px;
  font-size: var(--ds-typography-label-size);
  color: ${(p) => p.theme.feedback.warningDefault};
  background: ${(p) => p.theme.feedback.warningSurface};
`;

const LineBox = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 7;
  outline: ${(p) => p.theme.border.widthSelected} solid ${(p) => p.theme.tool.border};
  outline-offset: -1px;
  background: ${(p) => p.theme.tool.surfaceSubtle};
  opacity: 0.6;
`;

const DropLine = styled.div<{ $vertical?: boolean }>`
  position: absolute;
  pointer-events: none;
  z-index: 9;
  background: ${(p) => p.theme.text.primary};
  ${(p) =>
    p.$vertical
      ? 'top: 0; bottom: 0; width: 3px; transform: translateX(-50%);'
      : 'left: 0; right: 0; height: 3px; transform: translateY(-50%);'}
`;

/** 格線的感應帶。平常看不見，hover 才亮一條線。 */
const ColLine = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 10px;
  transform: translateX(-50%);
  cursor: col-resize;
  touch-action: none;
  /* 跟橫的格線交會處直的在上——交會處總得有一個贏，往旁邊移一點就抓得到另一條 */
  z-index: 9;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    transform: translateX(-50%);
    background: ${(p) => p.theme.text.primary};
    opacity: 0;
    transition: opacity 0.12s;
  }
  &:hover::after,
  &:active::after { opacity: 1; }
`;

const RowLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 10px;
  transform: translateY(-50%);
  cursor: row-resize;
  touch-action: none;
  z-index: 8;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 2px;
    transform: translateY(-50%);
    background: ${(p) => p.theme.text.primary};
    opacity: 0;
    transition: opacity 0.12s;
  }
  &:hover::after,
  &:active::after { opacity: 1; }
`;

/** 欄的「更多」：貼在表格上緣外側。 */
const ColHandle = styled.div<{ $on: boolean }>`
  position: absolute;
  top: -10px;
  transform: translate(-50%, -100%);
  z-index: 9;
  display: grid;
  place-items: center;
  inline-size: 28px;
  block-size: 16px;
  border-radius: ${(p) => p.theme.radius.control};
  border: ${(p) => p.theme.border.widthDefault} solid
    ${(p) => (p.$on ? p.theme.brand.primaryHover : p.theme.border.subtle)};
  background: ${(p) => (p.$on ? p.theme.brand.primaryTint : p.theme.surface.raised)};
  color: ${(p) => (p.$on ? p.theme.text.primary : p.theme.icon.secondary)};
  cursor: grab;
  touch-action: none;
  opacity: ${(p) => (p.$on ? 1 : 0.5)};
  transition: opacity 0.12s, border-color 0.12s;
  &:hover { opacity: 1; border-color: ${(p) => p.theme.border.hover}; color: ${(p) => p.theme.text.primary}; }
  &:active { cursor: grabbing; }
`;

/** 列的「更多」：貼在表格左緣外側。 */
const RowHandle = styled(ColHandle)`
  top: auto;
  left: -10px;
  transform: translate(-100%, -50%);
  inline-size: 16px;
  block-size: 28px;
`;

const Dots = styled.span<{ $vertical?: boolean }>`
  display: inline-block;
  inline-size: ${(p) => (p.$vertical ? '3px' : '11px')};
  block-size: ${(p) => (p.$vertical ? '11px' : '3px')};
  background: radial-gradient(circle, currentColor 1.2px, transparent 1.4px) 0 0 / 4px 4px;
`;

const AddBtn = styled.button`
  position: absolute;
  z-index: 9;
  display: grid;
  place-items: center;
  inline-size: 20px;
  block-size: 20px;
  padding: 0;
  border-radius: ${(p) => p.theme.radius.control};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.icon.secondary};
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.12s, border-color 0.12s;
  &:hover { opacity: 1; border-color: ${(p) => p.theme.border.hover}; color: ${(p) => p.theme.text.primary}; }
`;

const AddCol = styled(AddBtn)`
  top: 50%;
  right: -8px;
  transform: translate(100%, -50%);
`;

const AddRow = styled(AddBtn)`
  left: 50%;
  bottom: -8px;
  transform: translate(-50%, 100%);
`;

const MenuPop = styled.div`
  position: fixed;
  z-index: 960;
  display: flex;
  flex-direction: column;
  padding: 4px;
  min-inline-size: 140px;
  border-radius: ${(p) => p.theme.radius.field};
  background: ${(p) => p.theme.surface.raised};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  box-shadow: ${(p) => p.theme.shadow.float};
  writing-mode: horizontal-tb;
`;

const MenuItem = styled.button`
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  text-align: start;
  padding: 8px 12px;
  border: none;
  border-radius: ${(p) => p.theme.radius.field};
  background: transparent;
  color: ${(p) => p.theme.text.primary};
  cursor: pointer;
  &:hover:not(:disabled) { background: ${(p) => p.theme.surface.sunken}; }
  &:disabled { color: ${(p) => p.theme.text.disabled}; cursor: default; }
`;
