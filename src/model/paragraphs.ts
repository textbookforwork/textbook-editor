import { groupOf, missingOf, readyElementPopups } from './popups';
import type { InlineSpan, ParaNoteKind, ParaNotes, PopupItem, RangeKind, RangeNote, Row, TextBlock } from './types';

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

/** 掛在整段上的聲音（課文朗讀這類）：閱讀時膠囊直接放播放鍵，不必先開泡泡。只取第一個，其餘照舊進「補」。 */
export const paraAudio = (block: TextBlock): Extract<PopupItem, { kind: 'audio' }> | null =>
  readyElementPopups(block).find((p): p is Extract<PopupItem, { kind: 'audio' }> => p.kind === 'audio') ?? null;

/** 整段的補充扣掉放到播放鍵的那一個，這些才進「補」。 */
export const paraSupplements = (block: TextBlock) => {
  const audio = paraAudio(block);
  return readyElementPopups(block).filter((p) => p !== audio);
};

/** 這一段閱讀時有哪幾顆按鈕：整段有聲音時最上面一顆播放，接著填了字的說明，有其他補充再加「補」。 */
export function paraButtons(block: TextBlock): { key: ParaNoteKind | 'bu' | 'play'; btn: string; name: string }[] {
  const notes = PARA_NOTE_KINDS.filter((k) => block.paraNotes?.[k.key]?.trim());
  const audio = paraAudio(block);
  return [
    ...(audio ? [{ key: 'play' as const, btn: '▶', name: '播放' }] : []),
    ...notes,
    ...(paraSupplements(block).length > 0 ? [{ key: 'bu' as const, btn: '補', name: '補充' }] : []),
  ];
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

/** 連到標記那幾個字上、填完的補充。標成生字詞或句子的字，補充跟著那幾個字走，不歸整段的「補」。 */
export function markPopups(block: Pick<TextBlock, 'spans' | 'popups'>, noteId: string): PopupItem[] {
  const ids = new Set(block.spans.filter((s) => s.noteId === noteId && s.popupId).map((s) => s.popupId!));
  return block.popups.filter((p) => ids.has(groupOf(p)) && !missingOf(p));
}

/** 閱讀時點得開：有說明，或有連到這幾個字的補充。 */
export const markReady = (block: Pick<TextBlock, 'spans' | 'popups'>, n: RangeNote) =>
  rangeNoteFilled(n) || markPopups(block, n.id).length > 0;

/** 標記在純文字上的位置（第幾個字到第幾個字）。中間被別的字隔開時取頭尾。 */
export function markRange(spans: InlineSpan[], noteId: string): { start: number; end: number } | null {
  let pos = 0;
  let start = -1;
  let end = -1;
  for (const s of spans) {
    if (s.noteId === noteId) {
      if (start < 0) start = pos;
      end = pos + s.text.length;
    }
    pos += s.text.length;
  }
  return start < 0 ? null : { start, end };
}
