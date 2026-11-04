/**
 * 科目清單：整個編輯器只用這一份（建立教材、教材設定、回首頁鈕的造型都從這裡讀）。
 *
 * 學制決定科目（2026-11-03 定案）：
 *   國小：國語、英語、數學、自然、社會（沒有生活）
 *   國中：國文、英語、數學、理化、生物、地科、歷史、地理、公民
 *   沒選學制（測試推廣不限學制）：國小國中的科目都能選
 *
 * 書櫃另有五個科目分區（領域），國中分科歸到所屬的領域：理化、生物、地科→自然科學；歷史、地理、公民→社會。
 */

export type Stage = '國小' | '國中';

export const STAGES: Stage[] = ['國小', '國中'];

export const SUBJECTS_BY_STAGE: Record<Stage, string[]> = {
  國小: ['國語', '英語', '數學', '自然', '社會'],
  國中: ['國文', '英語', '數學', '理化', '生物', '地科', '歷史', '地理', '公民'],
};

/** 這個學制能選的科目；沒有學制（不限）就是國小國中全部。 */
export function subjectsOf(stage?: string): string[] {
  if (stage === '國小' || stage === '國中') return SUBJECTS_BY_STAGE[stage];
  return [...new Set([...SUBJECTS_BY_STAGE.國小, ...SUBJECTS_BY_STAGE.國中])];
}

/** 書櫃的科目分區，也是書櫃上由上到下的順序（乙練定的：國語文、社會、英語文、自然科學、數學）。 */
export const SHELF_AREAS = ['國語文', '社會', '英語文', '自然科學', '數學'];

/** 每個分區包含的科目（含舊資料的寫法，例：英文）。 */
const AREA_MEMBERS: Record<string, string[]> = {
  國語文: ['國語', '國文'],
  社會: ['社會', '歷史', '地理', '公民'],
  英語文: ['英語', '英文'],
  自然科學: ['自然', '理化', '生物', '地科'],
  數學: ['數學'],
};

/** 科目 → 書櫃分區。本來就是分區名稱的原樣回傳；對不到的回 undefined。 */
export function areaOf(subject?: string): string | undefined {
  if (!subject) return undefined;
  if (SHELF_AREAS.includes(subject)) return subject;
  return SHELF_AREAS.find((a) => AREA_MEMBERS[a].includes(subject));
}

/** 書櫃分區 → 教材設定裡的科目（內建課本沒有學制時用）。 */
export const AREA_TO_SUBJECT: Record<string, string> = { 國語文: '國語', 英語文: '英語', 自然科學: '自然' };
