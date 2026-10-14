import { describe, expect, it } from 'vitest';
import { emptyDoc, ensureUniqueDocIds, makeRow, makeText } from './document';

describe('ensureUniqueDocIds', () => {
  it('沒有重複 id 時保持原本內容', () => {
    const doc = emptyDoc();
    const result = ensureUniqueDocIds(doc);
    expect(result).toBe(doc);
  });

  it('重複的 block id 會被重新配發唯一 id', () => {
    const t1 = makeText('A');
    const t2 = { ...makeText('B'), id: t1.id }; // duplicate id
    const doc = {
      ...emptyDoc(),
      rows: [makeRow([t1]), makeRow([t2])],
    };
    const result = ensureUniqueDocIds(doc);
    const b1 = result.rows[0].columns[0].blocks[0];
    const b2 = result.rows[1].columns[0].blocks[0];
    expect(b1.id).not.toBe(b2.id);
  });

  it('重複的 row id 與 col id 也會被重新配發唯一 id', () => {
    const doc = {
      ...emptyDoc(),
      rows: [
        {
          id: 'row_dup',
          breakBefore: false,
          columns: [{ id: 'col_dup', widthPct: 100, blocks: [makeText('1')] }],
        },
        {
          id: 'row_dup',
          breakBefore: false,
          columns: [{ id: 'col_dup', widthPct: 100, blocks: [makeText('2')] }],
        },
      ],
    };
    const result = ensureUniqueDocIds(doc);
    expect(result.rows[0].id).not.toBe(result.rows[1].id);
    expect(result.rows[0].columns[0].id).not.toBe(result.rows[1].columns[0].id);
  });
});
