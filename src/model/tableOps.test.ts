import { describe, expect, it } from 'vitest';
import {
  applyPreset,
  deleteCol,
  deleteRow,
  insertCol,
  insertRow,
  moveCol,
  moveRow,
  newTable,
  setCell,
  setCellBg,
  setRowHeight,
} from './tableOps';
import { tableColWidths } from './blockSizing';
import type { TableBlock } from './types';

/** 2×3，每格寫自己的座標，搬動之後看得出誰去了哪裡。 */
const base = (): TableBlock => ({
  ...newTable(2, 3),
  cells: [
    ['00', '01', '02'],
    ['10', '11', '12'],
  ],
  colWidths: [20, 30, 50],
  rowHeights: [40, 0],
  cellBg: { '0,1': '#aaa', '1,2': '#bbb' },
});

describe('表格的結構操作', () => {
  it('新表格是空格、白底黑框、沒有表頭', () => {
    const t = newTable();
    expect(t.rows).toBe(3);
    expect(t.cols).toBe(4);
    expect(t.cells.flat().every((c) => c === '')).toBe(true);
    expect(t.preset).toBe('plain');
    expect(t.hasHeader).toBe(false);
  });

  it('改一格只動那一格', () => {
    const t = setCell(base(), 1, 1, '改');
    expect(t.cells[1][1]).toBe('改');
    expect(t.cells[0]).toEqual(['00', '01', '02']);
    // 內容沒變就回同一個物件，不佔一次復原
    expect(setCell(t, 1, 1, '改')).toBe(t);
  });

  it('插一欄：內容、欄寬、底色的鍵一起搬', () => {
    const t = insertCol(base(), 1);
    expect(t.cols).toBe(4);
    expect(t.cells[0]).toEqual(['00', '', '01', '02']);
    // 新欄從其他欄平均分出來，比例關係保留，總和仍是 100
    expect(t.colWidths!.reduce((a, b) => a + b, 0)).toBeCloseTo(100, 6);
    expect(t.colWidths![2] / t.colWidths![3]).toBeCloseTo(30 / 50, 6);
    expect(t.cellBg).toEqual({ '0,2': '#aaa', '1,3': '#bbb' });
  });

  it('刪一欄：那一欄的底色跟著消失，後面的往前補', () => {
    const t = deleteCol(base(), 1);
    expect(t.cols).toBe(2);
    expect(t.cells[1]).toEqual(['10', '12']);
    expect(t.colWidths).toEqual([20, 50]);
    expect(tableColWidths(t)).toEqual([20 / 70 * 100, 50 / 70 * 100]);
    expect(t.cellBg).toEqual({ '1,1': '#bbb' });
  });

  it('只剩一欄或一列時不刪', () => {
    const one = newTable(1, 1);
    expect(deleteCol(one, 0)).toBe(one);
    expect(deleteRow(one, 0)).toBe(one);
  });

  it('搬欄：把第 0 欄搬到最後，欄寬與底色同步', () => {
    const t = moveCol(base(), 0, 2);
    expect(t.cells[0]).toEqual(['01', '02', '00']);
    expect(t.colWidths).toEqual([30, 50, 20]);
    expect(t.cellBg).toEqual({ '0,0': '#aaa', '1,1': '#bbb' });
  });

  it('插一列：列高下限與底色的鍵一起搬', () => {
    const t = insertRow(base(), 0);
    expect(t.rows).toBe(3);
    expect(t.cells[0]).toEqual(['', '', '']);
    expect(t.cells[1]).toEqual(['00', '01', '02']);
    expect(t.rowHeights).toEqual([0, 40, 0]);
    expect(t.cellBg).toEqual({ '1,1': '#aaa', '2,2': '#bbb' });
  });

  it('刪一列', () => {
    const t = deleteRow(base(), 0);
    expect(t.rows).toBe(1);
    expect(t.cells).toEqual([['10', '11', '12']]);
    expect(t.rowHeights).toEqual([0]);
    expect(t.cellBg).toEqual({ '0,2': '#bbb' });
  });

  it('搬列', () => {
    const t = moveRow(base(), 1, 0);
    expect(t.cells.map((r) => r[0])).toEqual(['10', '00']);
    expect(t.rowHeights).toEqual([0, 40]);
    expect(t.cellBg).toEqual({ '1,1': '#aaa', '0,2': '#bbb' });
  });

  it('列高全部清回預設時整個欄位拿掉，不留一串零', () => {
    const t = setRowHeight(base(), 0, 0);
    expect(t.rowHeights).toBeUndefined();
  });

  it('單格底色：清到沒有就把整個欄位拿掉', () => {
    let t = setCellBg(base(), 0, 1, null);
    t = setCellBg(t, 1, 2, null);
    expect(t.cellBg).toBeUndefined();
  });

  it('套快速樣式會把單格底色與框線顏色清掉——整張重來', () => {
    const t = applyPreset({ ...base(), borderColor: '#f00' }, 'zebra');
    expect(t.preset).toBe('zebra');
    expect(t.cellBg).toBeUndefined();
    expect(t.borderColor).toBeUndefined();
    expect(applyPreset(t, 'borderless').borderWidth).toBe(0);
  });

  it('md 匯入的參差表格先補方再操作', () => {
    const ragged: TableBlock = { ...newTable(2, 3), cells: [['a'], ['b', 'c']] };
    expect(insertRow(ragged, 2).cells).toEqual([['a', '', ''], ['b', 'c', ''], ['', '', '']]);
  });
});
