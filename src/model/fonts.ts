import type { Doc } from './types';

/**
 * 舊版字型選單存下的字型設定 → 現在選單上對應的那一套。
 *
 * 字型選項存的是整串 CSS font-family（見 styles/roles.ts 的 INLINE_FONTS），選單換了字，
 * 舊存檔裡的值就對不上任何一個選項：畫面還是舊的字，選單也標不出現在是哪一個。
 * 讀檔時換成新的值。以後再改 INLINE_FONTS 的值，要把舊值加進這張表。
 */
const RENAMED: Record<string, string> = {
  // 2026-10-22 之前的「楷體」→ 標楷體
  '"Kaiti TC", "BiauKai", "TW-MOE-Std-Kai", "DFKai-SB", "TW-Kai", "Noto Serif TC", serif':
    '"BiauKai", "DFKai-SB", "TW-MOE-Std-Kai", "TW-Kai", "Kaiti TC", "Noto Serif TC", serif',
  // 2026-10-22 之前的「圓體」→ 源泉圓體
  '"GenSenRounded TW", "Yuanti TC", "YuanTi TC", "Hiragino Maru Gothic ProN", "jf-openhuninn", "Noto Sans TC", sans-serif':
    '"GenSenRounded TW", "Noto Sans TC", sans-serif',
};

/** 走過整份教材（段落的字、圖形、彈窗裡的內容都在內），把舊的字型設定換成新的。沒有要換的就回傳原物件。 */
export function withCurrentFonts(doc: Doc): Doc {
  let changed = false;
  const walk = (v: unknown): unknown => {
    if (Array.isArray(v)) {
      const next = v.map(walk);
      return next.some((x, i) => x !== v[i]) ? next : v;
    }
    if (!v || typeof v !== 'object') return v;
    const obj = v as Record<string, unknown>;
    let out: Record<string, unknown> | null = null;
    for (const [k, x] of Object.entries(obj)) {
      const y = k === 'fontFamily' && typeof x === 'string' && RENAMED[x] ? RENAMED[x] : walk(x);
      if (y !== x) {
        out ??= { ...obj };
        out[k] = y;
        changed = true;
      }
    }
    return out ?? obj;
  };
  const next = walk(doc) as Doc;
  return changed ? next : doc;
}
