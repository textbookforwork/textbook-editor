import { newId } from './ids';
import type {
  Block,
  Column,
  Doc,
  Row,
  TextBlock,
  TextRole,
} from './types';

export function makeColumn(blocks: Block[], widthPct = 100): Column {
  return { id: newId('col'), widthPct, blocks };
}

/** 插入永遠先自成一列；要併欄是之後拖曳的結果，不是插入時決定的。 */
export function makeRow(blocks: Block[], breakBefore = false): Row {
  return { id: newId('row'), columns: [makeColumn(blocks)], breakBefore };
}

export function makeText(text: string, role: TextRole = 'body'): TextBlock {
  return { id: newId('blk'), type: 'text', role, popups: [], spans: [{ text }] };
}

export function textOf(block: TextBlock): string {
  return block.spans.map((s) => s.text).join('');
}

export function emptyDoc(title = '未命名教材'): Doc {
  return {
    id: newId('doc'),
    title,
    settings: { writingMode: 'horizontal', aspectRatio: '4:3', textScale: 'md' },
    meta: {},
    rows: [makeRow([makeText('', 'lessonTitle')])],
    footnotes: [],
    bookId: null,
    unitId: null,
  };
}

/** 依序走訪所有區塊。朗讀順序與全書搜尋都靠這個順序，不是畫面位置。 */
export function* walkBlocks(doc: Doc): Generator<{ row: Row; column: Column; block: Block }> {
  for (const row of doc.rows) {
    for (const column of row.columns) {
      for (const block of column.blocks) {
        yield { row, column, block };
      }
    }
  }
}

export function findBlock(doc: Doc, blockId: string) {
  for (const hit of walkBlocks(doc)) {
    if (hit.block.id === blockId) return hit;
  }
  return null;
}

/**
 * 確保整份文件所有 row, col, block, popup 的 id 都是唯一的。
 * 舊版存進 localStorage 的資料或計數歸零可能產生重複 id，
 * 在載入時自動為重複的節點重新配發唯一 id，防止一次選定到多個元件。
 */
export function ensureUniqueDocIds(doc: Doc): Doc {
  const seen = new Set<string>();
  let changed = false;

  const nextRows = doc.rows.map((row) => {
    let rowId = row.id;
    if (seen.has(rowId)) {
      rowId = newId('row');
      changed = true;
    }
    seen.add(rowId);

    let colsChanged = false;
    const nextCols = row.columns.map((col) => {
      let colId = col.id;
      if (seen.has(colId)) {
        colId = newId('col');
        changed = true;
        colsChanged = true;
      }
      seen.add(colId);

      let blocksChanged = false;
      const nextBlocks = col.blocks.map((block) => {
        let blockId = block.id;
        if (seen.has(blockId)) {
          blockId = newId('blk');
          changed = true;
          blocksChanged = true;
        }
        seen.add(blockId);

        let popupsChanged = false;
        const nextPopups = block.popups.map((pop) => {
          let popId = pop.id;
          if (seen.has(popId)) {
            popId = newId('pop');
            changed = true;
            popupsChanged = true;
          }
          seen.add(popId);
          return popId !== pop.id ? { ...pop, id: popId } : pop;
        });

        if (blockId !== block.id || popupsChanged) {
          return { ...block, id: blockId, popups: nextPopups };
        }
        return block;
      });

      if (colId !== col.id || blocksChanged) {
        colsChanged = true;
        return { ...col, id: colId, blocks: nextBlocks };
      }
      return col;
    });

    if (rowId !== row.id || colsChanged) {
      return { ...row, id: rowId, columns: nextCols };
    }
    return row;
  });

  return changed ? { ...doc, rows: nextRows } : doc;
}

/**
 * 拿掉所有模組（@模組）。國文流式模組還在等設計，現在畫出來只是一個空殼，
 * 所以匯入與讀回存檔時一律不留；解析器仍認得這個語法（不會掉進內文），日後要開回來只改這裡。
 * 模組被拿掉後空掉的欄、空掉的列一併移除。
 */
export function withoutModules<T extends { rows: Row[] }>(doc: T): T {
  const rows = doc.rows
    .map((r) => ({
      ...r,
      columns: r.columns
        .map((c) => ({ ...c, blocks: c.blocks.filter((b) => b.type !== 'module') }))
        .filter((c) => c.blocks.length > 0),
    }))
    .filter((r) => r.columns.length > 0);
  return { ...doc, rows };
}
