import { describe, expect, it } from 'vitest';
import { TABLE_HINT, TABLE_ROW, blockBox, tableColWidths, tableMinBlockSize, tableOverflow, tableRowMins, fitTwoPerPage } from './blockSizing';
import { contentBox } from './pageSize';
import { newId } from './ids';
import type { ImageBlock, PdfBlock, TableBlock, TextBlock } from './types';

const image = (aspectRatio = 1.5): ImageBlock => ({
  id: newId('blk'), type: 'image', assetId: null, alt: '', caption: '',
  aspectRatio, popups: [],
});
const table = (): TableBlock => ({
  id: newId('blk'), type: 'table', rows: 3, cols: 3,
  cells: [], hasHeader: true, popups: [],
});

const CTX = { inlineSize: 896, maxBlockSize: 640, vertical: false };

describe('區塊尺寸是量測與渲染的唯一來源', () => {
  it('文字不走這裡——它的高度只有瀏覽器排一次才知道', () => {
    const text: TextBlock = {
      id: newId('blk'), type: 'text', role: 'body', popups: [], spans: [{ text: 'x' }],
    };
    expect(blockBox(text, CTX)).toBeNull();
  });

  it('圖片永遠放得進一頁', () => {
    for (const ratio of [0.4, 1, 1.5, 3]) {
      const box = blockBox(image(ratio), CTX)!;
      expect(box.blockSize).toBeLessThanOrEqual(CTX.maxBlockSize);
      expect(box.inlineSize).toBeLessThanOrEqual(CTX.inlineSize);
    }
  });

  it('很高的圖會被等比縮小，不會變形', () => {
    const ratio = 0.5; // 高的直式圖
    const box = blockBox(image(ratio), CTX)!;
    expect(box.inlineSize / box.blockSize).toBeCloseTo(ratio, 5);
  });

  it('直排時 block 軸是水平的，尺寸規則跟著換軸', () => {
    const v = { inlineSize: 640, maxBlockSize: 896, vertical: true };
    const box = blockBox(image(1.5), v)!;
    // 直排：吃滿欄「高」，寬度由比例決定
    expect(box.blockSize).toBeLessThanOrEqual(v.maxBlockSize);
    expect(box.inlineSize).toBeLessThanOrEqual(v.inlineSize);
  });

  it('盒狀模組比一頁大時縮到放得進去', () => {
    const tiny = { ...CTX, maxBlockSize: 100 };
    expect(blockBox(table(), tiny)!.blockSize).toBeLessThanOrEqual(100);
  });

  it('pdf 預設跟圖片一樣大（16:9），比一頁大時縮到放得進去', () => {
    const pdf: PdfBlock = { id: newId('blk'), type: 'pdf', assetId: null, title: '', widthPct: 50, popups: [] };
    expect(blockBox(pdf, CTX)).toEqual(blockBox({ ...image(16 / 9), widthPct: 50 }, CTX));
    const tiny = { ...CTX, maxBlockSize: 100 };
    expect(blockBox(pdf, tiny)!.blockSize).toBeLessThanOrEqual(100);
    // 老師拖高過一頁也一樣要被夾住
    expect(blockBox({ ...pdf, blockSize: 900 }, CTX)!.blockSize).toBe(CTX.maxBlockSize);
  });

  it('一張圖不會佔掉整頁——老師還要能圖文混排', () => {
    const box = blockBox(image(1.5), CTX)!;
    expect(box.blockSize).toBeLessThanOrEqual(CTX.maxBlockSize * 0.5);
    // 縮小之後仍然等比，不變形
    expect(box.inlineSize / box.blockSize).toBeCloseTo(1.5, 5);
  });

  it('老師縮過的圖用他設的比例', () => {
    const half = { ...image(1.5), widthPct: 50 };
    const box = blockBox(half, CTX)!;
    expect(box.inlineSize).toBe(CTX.inlineSize / 2);
  });
});

describe('沒設定尺寸不等於滿版', () => {
  const ctx = { inlineSize: 896, maxBlockSize: 640, vertical: false };
  const img = (widthPct?: number): ImageBlock => ({
    id: 'b', type: 'image', assetId: null, alt: '', caption: '',
    aspectRatio: 1.5, widthPct, popups: [],
  });

  it('沒設定時會縮到不超過頁面的 45%', () => {
    // 否則 4:3 的頁面插一張 3:2 的圖就用掉整頁，老師沒辦法圖文混排
    const box = blockBox(img(), ctx)!;
    expect(box.blockSize).toBeLessThanOrEqual(ctx.maxBlockSize * 0.45 + 0.5);
    expect(box.inlineSize).toBeLessThan(ctx.inlineSize);
  });

  it('選了滿版就真的滿版，不再受那個上限約束', () => {
    // 膠囊上亮著「滿版」而畫出來是縮過的，就是介面在說謊
    const box = blockBox(img(100), ctx)!;
    expect(Math.round(box.inlineSize)).toBe(ctx.inlineSize);
    expect(box.blockSize).toBeGreaterThan(ctx.maxBlockSize * 0.45);
  });

  it('選過的尺寸就是實際佔的比例', () => {
    for (const pct of [35, 50, 70]) {
      const box = blockBox(img(pct), ctx)!;
      expect(Math.round((box.inlineSize / ctx.inlineSize) * 100)).toBe(pct);
    }
  });
});

describe('比一頁還高的表格', () => {
  const room = 640;
  // 列高是量出來的，這裡用固定值模擬；真的量會因換行而每列不同
  const rows = (n: number, each = 36) => Array.from({ length: n }, () => each);

  it('放得下就不回報', () => {
    // 社會第一張表是 11 列
    expect(tableOverflow(rows(11), room)).toBeNull();
  });

  it('放不下要說出來，不能靜靜切掉', () => {
    // 資料表格少了幾列而沒人發現，學生看到的就是一份缺資料的課本
    const over = tableOverflow(rows(25), room)!;
    expect(over).not.toBeNull();
    expect(over.shown + over.hidden).toBe(25);
    expect(over.hidden).toBeGreaterThan(0);
  });

  it('提示自己也要有位置，所以顯示的列數要扣掉提示帶的高度', () => {
    const fits = Math.floor(room / 36);
    const usable = Math.floor((room - TABLE_HINT) / 36);
    expect(tableOverflow(rows(fits + 1), room)!.shown).toBe(usable);
  });

  it('換行撐高的列照它量出來的高度算', () => {
    // 前兩列各 300，第三列就放不下了
    const over = tableOverflow([300, 300, 100, 36], room)!;
    expect(over.shown).toBe(2);
    expect(over.hidden).toBe(2);
  });

  it('至少留一列，不會變成空表', () => {
    expect(tableOverflow(rows(99), 60)!.shown).toBeGreaterThanOrEqual(1);
  });
});

describe('表格的幾何', () => {
  const base: TableBlock = {
    id: 't', type: 'table', rows: 2, cols: 3, cells: [], hasHeader: false, popups: [],
  };

  it('沒設欄寬就平分', () => {
    expect(tableColWidths(base)).toEqual([100 / 3, 100 / 3, 100 / 3]);
  });

  it('欄寬數量跟欄數對不上就重新平分，不讓舊資料拉歪版面', () => {
    expect(tableColWidths({ ...base, colWidths: [50, 50] })).toEqual([100 / 3, 100 / 3, 100 / 3]);
  });

  it('欄寬總和不是 100 也會被正規化', () => {
    expect(tableColWidths({ ...base, colWidths: [1, 1, 2] })).toEqual([25, 25, 50]);
  });

  it('列高下限：老師拖過的用他的，其餘用預設', () => {
    expect(tableRowMins({ ...base, rowHeights: [80, 0] })).toEqual([80, TABLE_ROW]);
    expect(tableRowMins(base)).toEqual([TABLE_ROW, TABLE_ROW]);
  });

  it('橫排時 blockBox 給的高只是下限，寬就是欄寬', () => {
    const box = blockBox(base, CTX)!;
    expect(box.inlineSize).toBe(CTX.inlineSize);
    expect(box.blockSize).toBe(tableMinBlockSize(base));
  });
});

describe('網頁元件的尺寸規則', () => {
  it('未選擇呈現方式（chosen: false）時跟空的圖片一樣大（半欄、16:9）', () => {
    const unchosenWeb = {
      id: 'w',
      type: 'web' as const,
      url: '',
      title: '',
      presentation: 'bookmark' as const,
      widthPct: 50,
      chosen: false,
      popups: [],
    };
    const box = blockBox(unchosenWeb, CTX)!;
    const image = blockBox(
      { id: 'i', type: 'image', assetId: null, alt: '', caption: '', aspectRatio: 16 / 9, widthPct: 50, popups: [] },
      CTX
    )!;
    expect(box).toEqual(image);
  });

  it('插入標籤（bookmark）預設高 68px', () => {
    const bookmark = {
      id: 'w',
      type: 'web' as const,
      url: 'https://example.com',
      title: '範例',
      presentation: 'bookmark' as const,
      widthPct: 50,
      popups: [],
    };
    const box = blockBox(bookmark, CTX)!;
    expect(box.inlineSize).toBe(CTX.inlineSize / 2);
    expect(box.blockSize).toBe(68);
  });

  it('內嵌網頁（embed）預設佔滿一整頁', () => {
    const embed = {
      id: 'w',
      type: 'web' as const,
      url: 'https://example.com',
      title: '範例',
      presentation: 'embed' as const,
      widthPct: 100,
      popups: [],
    };
    const box = blockBox(embed, CTX)!;
    expect(box.inlineSize).toBe(CTX.inlineSize);
    expect(box.blockSize).toBe(CTX.maxBlockSize);
  });
});

describe('新插入的圖片、影片、網頁：一頁放得下兩個', () => {
  for (const aspectRatio of ['4:3', '16:9'] as const) {
    for (const writingMode of ['horizontal', 'vertical'] as const) {
      it(`${aspectRatio}・${writingMode === 'vertical' ? '直排' : '橫排'}`, () => {
        const settings = { aspectRatio, writingMode };
        const box = contentBox(settings);
        const vertical = writingMode === 'vertical';
        const ctx = {
          inlineSize: vertical ? box.height : box.width,
          maxBlockSize: vertical ? box.width : box.height,
          vertical,
        };
        const image = fitTwoPerPage(
          { id: 'i', type: 'image', assetId: null, alt: '', caption: '', aspectRatio: 16 / 9, widthPct: 50, popups: [] },
          settings
        );
        const size = blockBox(image, ctx)!;
        // 兩個加上中間的模組間距，再加一個課名標題（56）與它後面的間距（48），要裝得下
        expect(size.blockSize * 2 + 48 + 56 + 48).toBeLessThanOrEqual(ctx.maxBlockSize);
      });
    }
  }
});
