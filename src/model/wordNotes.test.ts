import { describe, expect, it } from 'vitest';
import { circled, footnotesToWordNotes, wordNoteNumbers } from './wordNotes';
import { emptyDoc } from './document';
import type { Doc, TextBlock } from './types';

const text = (id: string, spans: TextBlock['spans']): TextBlock =>
  ({ id, type: 'text', role: 'body', spans, popups: [] }) as unknown as TextBlock;

const docOf = (blocks: TextBlock[], footnotes: Doc['footnotes']): Doc => ({
  ...emptyDoc(),
  rows: blocks.map((b, i) => ({ id: `r${i}`, columns: [{ id: `c${i}`, blocks: [b] }] })) as unknown as Doc['rows'],
  footnotes,
});

describe('注釋轉成生字詞的註釋', () => {
  it('緊接在注釋號前面的詞被標起來，注釋號拿掉', () => {
    const doc = docOf([text('b1', [{ text: '先生不知何許', footnoteRef: '1' }, { text: '人也' }])], [
      { id: '1', term: '何許', body: '何處。' },
    ]);
    const out = footnotesToWordNotes(doc);
    const b = out.rows[0].columns[0].blocks[0] as TextBlock;
    expect(b.spans.some((s) => s.footnoteRef)).toBe(false);
    expect(b.spans.filter((s) => s.noteId).map((s) => s.text).join('')).toBe('何許');
    expect(b.rangeNotes).toEqual([{ id: 'fn-b1-1', kind: 'word', body: '何處。' }]);
    expect(out.footnotes).toEqual([]);
  });

  it('注的字不在注釋號正前面（性嗜酒[^7] 注「嗜」）就往前找', () => {
    const doc = docOf([text('b1', [{ text: '性嗜酒', footnoteRef: '7' }])], [{ id: '7', term: '嗜', body: '音ㄕˋ，愛好。' }]);
    const b = footnotesToWordNotes(doc).rows[0].columns[0].blocks[0] as TextBlock;
    expect(b.spans.filter((s) => s.noteId).map((s) => s.text).join('')).toBe('嗜');
  });

  it('找不到被注的字就留著原本的注釋，不丟資料', () => {
    const doc = docOf([text('b1', [{ text: '先生', footnoteRef: '9' }])], [{ id: '9', term: '五柳', body: '…' }]);
    expect(footnotesToWordNotes(doc).footnotes).toHaveLength(1);
  });
});

describe('生字詞號碼', () => {
  it('照課文順序跨元件編號，句子不編', () => {
    const a = text('a', [{ text: '何許', noteId: 'n1' }, { text: '人也' }, { text: '曾不吝情去留', noteId: 's1' }]);
    a.rangeNotes = [
      { id: 'n1', kind: 'word', body: '何處。' },
      { id: 's1', kind: 'sentence', body: '', notes: { ju: '偏義複詞' } },
    ];
    const b = text('b', [{ text: '嗜', noteId: 'n2' }]);
    b.rangeNotes = [{ id: 'n2', kind: 'zi', body: '愛好。' }];
    const nos = wordNoteNumbers(docOf([a, b], []).rows);
    expect([...nos]).toEqual([['n1', 1], ['n2', 2]]);
    expect(circled(1) + circled(21) + circled(50)).toBe('①㉑㊿');
  });
});
