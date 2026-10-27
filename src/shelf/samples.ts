import type { MyBook } from './library';

/**
 * 示範用的自編、共享教材（2026-10-27 乙練）：讓書櫃一打開就看得到自編、共享的科目形狀框封面。
 * 每科十本，一半已共享；不存進 localStorage，老師自己建的自編照常排在一起。
 *   點封面：閱讀原本（示範教材沒有自己的內容）
 *   進入編輯：先用原本建一份真的自編再進編輯器
 *   更換封面、刪除：示範教材不能改
 * 書名、分享老師都是示意用。
 */
export type SampleBook = MyBook & { sample: true; teacher: string };

const TEACHERS = ['陳小明', '林怡君', '王建宏', '黃淑芬', '張志偉'];
const SETS: [string, string[]][] = [
  ['guoyu-6b', ['國語 6下', '國語 6上', '國語 5下', '國語 5上', '國語 4下']],
  ['mulan', ['國文 2下', '國文 2上', '國文 1下', '國文 1上', '國文 3上']],
  ['social-5b', ['社會 5下', '社會 5上', '社會 6上', '社會 6下', '社會 4下', '社會 4上', '社會 3下', '社會 3上', '社會 1上', '社會 2下']],
  ['english-6', ['英語 6', '英語 5', '英語 7', '英語 8', '英語 4', '英語 3', '英語 2', '英語 1', '英語 9', '英語 10']],
  ['demo', ['自然 5下', '自然 5上', '自然 6上', '自然 6下', '自然 4下', '自然 4上', '自然 3下', '自然 3上', '自然 2上', '自然 1下']],
  ['math-2b', ['數學 2下', '數學 2上', '數學 1下', '數學 1上', '數學 3上', '數學 3下', '數學 6上', '數學 6下', '數學 5上', '數學 5下']],
];

const T0 = Date.UTC(2026, 9, 1);
export const SAMPLE_BOOKS: SampleBook[] = SETS.flatMap(([sourceId, titles]) =>
  titles.map((title, i) => ({
    id: `sample-${sourceId}-${i}`,
    kind: 'copy' as const,
    sourceId,
    title,
    cover: null,
    shared: i % 2 === 0,
    createdAt: T0 - i * 86400000,
    updatedAt: T0 - i * 86400000,
    sample: true as const,
    teacher: TEACHERS[i % TEACHERS.length],
  })),
);

export const isSample = (b: MyBook): b is SampleBook => (b as SampleBook).sample === true;
