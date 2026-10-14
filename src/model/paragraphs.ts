import { readyElementPopups } from './popups';
import type { ParaNoteKind, ParaNotes, RangeKind, RangeNote, Row, TextBlock } from './types';

/**
 * 課文段落：段號怎麼編、閱讀時有哪幾顆圓形按鈕。
 *
 * 段號不存在資料裡，每次照順序算：插入或刪掉一段，後面的號碼自己跟著變，
 * 老師不必手改。
 */

/** 圓形按鈕的順序與名稱。按鈕上只放一個字，泡泡標題用全名。 */
export const PARA_NOTE_KINDS: { key: ParaNoteKind; btn: string; name: string }[] = [
  { key: 'zhi', btn: '旨', name: '段旨' },
  { key: 'xiu', btn: '修', name: '修辭' },
  { key: 'ju', btn: '句', name: '句型' },
  { key: 'wen', btn: '問', name: '提問' },
];

export type ParaInfo = {
  /** 第幾段（1 起算）。 */
  no: number;
  /** 段落元件的 id。聚焦用它當代號。 */
  startId: string;
};

/** 整份文件的段落索引：元件 id → 第幾段。不是段落的元件不在裡面。 */
export function paragraphIndex(rows: Row[]): Map<string, ParaInfo> {
  const out = new Map<string, ParaInfo>();
  let no = 0;
  for (const row of rows) {
    for (const col of row.columns) {
      for (const b of col.blocks) {
        if (b.type !== 'text' || !b.paragraph) continue;
        no += 1;
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
  return readyElementPopups(block).length > 0 ? [...notes, { key: 'bu', btn: '補', name: '補充' }] : notes;
}

/**
 * 框選的字可以標成的兩種。name 是工具列「標記」選單上的名稱，note 是面板卡片與說明的名稱，dot 是卡片上的圓圈字。
 * 生字詞統一叫「註釋」；句子底下是跟整段一樣的旨修句問。
 */
export const RANGE_KINDS: { key: RangeKind; dot: string; name: string; note: string }[] = [
  { key: 'word', dot: '註', name: '生字詞', note: '註釋' },
  { key: 'sentence', dot: '句', name: '句子', note: '句子' },
];

const isParaKind = (k: string): k is ParaNoteKind => PARA_NOTE_KINDS.some((x) => x.key === k);

/** 這則標成哪一種。舊資料直接存旨修句問的算句子，生字、語詞分開存的算生字詞。 */
export const rangeKindOf = (n: RangeNote): RangeKind =>
  isParaKind(n.kind) || n.kind === 'sentence' ? 'sentence' : 'word';

/** 句子底下的旨修句問。舊資料（kind 是旨修句問其中一種）換算成同一個樣子。 */
export function sentenceNotesOf(n: RangeNote): ParaNotes {
  if (isParaKind(n.kind)) return { [n.kind]: n.body };
  return n.notes ?? {};
}

/** 有沒有填東西。空的不出現在閱讀端，面板關掉時連字上的標記一起清掉。 */
export function rangeNoteFilled(n: RangeNote): boolean {
  return rangeKindOf(n) === 'sentence'
    ? Object.values(sentenceNotesOf(n)).some((v) => v?.trim())
    : !!n.body.trim();
}
