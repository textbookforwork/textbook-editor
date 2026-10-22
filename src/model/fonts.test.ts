import { describe, expect, it } from 'vitest';
import { withCurrentFonts } from './fonts';
import { emptyDoc, makeRow, makeText } from './document';
import { INLINE_FONTS } from '../styles/roles';
import type { ShapeBlock } from './types';

const OLD_KAI = '"Kaiti TC", "BiauKai", "TW-MOE-Std-Kai", "DFKai-SB", "TW-Kai", "Noto Serif TC", serif';
const OLD_ROUND = '"GenSenRounded TW", "Yuanti TC", "YuanTi TC", "Hiragino Maru Gothic ProN", "jf-openhuninn", "Noto Sans TC", sans-serif';
const valueOf = (label: string) => INLINE_FONTS.find((f) => f.label === label)!.value;

describe('withCurrentFonts', () => {
  it('段落裡的字與圖形的舊字型都換成現在選單上的值', () => {
    const text = { ...makeText('', 'body'), spans: [{ text: '木蘭', fontFamily: OLD_KAI }, { text: '詩' }] };
    const shape: ShapeBlock = { id: 's', type: 'shape', shape: 'rect', label: '', popups: [], fontFamily: OLD_ROUND };
    const doc = { ...emptyDoc(), rows: [makeRow([text]), makeRow([shape])] };
    const next = withCurrentFonts(doc);
    const t = next.rows[0].columns[0].blocks[0];
    const s = next.rows[1].columns[0].blocks[0] as ShapeBlock;
    expect(t.type === 'text' && t.spans[0].fontFamily).toBe(valueOf('標楷體'));
    expect(s.fontFamily).toBe(valueOf('源泉圓體'));
  });

  it('沒有舊值就原物件奉還（不佔一次重繪）', () => {
    const doc = { ...emptyDoc(), rows: [makeRow([makeText('你好', 'body')])] };
    expect(withCurrentFonts(doc)).toBe(doc);
  });
});
