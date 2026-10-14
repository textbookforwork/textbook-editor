import { readyPopups } from './popups';
import type { ParaNoteKind, Row, TextBlock } from './types';

/**
 * 課文段落：段號怎麼編、閱讀時有哪幾顆圓形按鈕。
 *
 * 段號不存在資料裡，每次照順序算：插入或刪掉一段，後面的號碼自己跟著變，
 * 老師不必手改。被換頁切開的後半標成「接續上一段」，不編號，歸在上一段。
 */

/** 圓形按鈕的順序與名稱。按鈕上只放一個字，泡泡標題用全名。 */
export const PARA_NOTE_KINDS: { key: ParaNoteKind; btn: string; name: string }[] = [
  { key: 'zhi', btn: '旨', name: '段旨' },
  { key: 'xiu', btn: '修', name: '修辭' },
  { key: 'ju', btn: '句', name: '句型' },
  { key: 'wen', btn: '問', name: '提問' },
];

export type ParaInfo = {
  /** 第幾段（1 起算）。接續的那一塊是 null。 */
  no: number | null;
  /** 這一段第一塊的元件 id。說明與補充都掛在它身上，聚焦也用它當代號。 */
  startId: string;
};

/**
 * 整份文件的段落索引：元件 id → 第幾段、屬於哪一段。不是段落的元件不在裡面。
 * 前面沒有段落可以接的「接續」，當成新的一段。
 */
export function paragraphIndex(rows: Row[]): Map<string, ParaInfo> {
  const out = new Map<string, ParaInfo>();
  let no = 0;
  let current: string | null = null;
  for (const row of rows) {
    for (const col of row.columns) {
      for (const b of col.blocks) {
        if (b.type !== 'text' || !b.paragraph) continue;
        if (b.paragraph === 'continue' && current) {
          out.set(b.id, { no: null, startId: current });
          continue;
        }
        no += 1;
        current = b.id;
        out.set(b.id, { no, startId: b.id });
      }
    }
  }
  return out;
}

const DIGITS = '〇一二三四五六七八九';

/** 1–99 的國字：一、十、十一、二十、九十九。段落不會超過這個數。 */
export function hanNumber(n: number): string {
  if (n < 10) return DIGITS[n];
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  return (tens === 1 ? '' : DIGITS[tens]) + '十' + (ones ? DIGITS[ones] : '');
}

/** 段號照書寫方向：橫排阿拉伯數字，直排國字。 */
export const paraLabel = (no: number, vertical: boolean) => (vertical ? hanNumber(no) : String(no));

/** 這一段閱讀時有哪幾顆按鈕：填了字的說明，加上有可以打開的補充時的「補」。 */
export function paraButtons(block: TextBlock): { key: ParaNoteKind | 'bu'; btn: string; name: string }[] {
  const notes = PARA_NOTE_KINDS.filter((k) => block.paraNotes?.[k.key]?.trim());
  return readyPopups(block).length > 0 ? [...notes, { key: 'bu', btn: '補', name: '補充' }] : notes;
}
