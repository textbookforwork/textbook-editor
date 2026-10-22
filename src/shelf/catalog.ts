import mulanMd from '../../design/sample-mulan.md?raw';
import demoMd from '../../design/sample-demo.md?raw';
import guowenCover from './covers/guowen-2b.jpg';
import scienceCover from './covers/science-5b.jpg';
import guoyuCover from './covers/guoyu-6b.jpg';
import socialCover from './covers/social-5b.jpg';
import englishCover from './covers/english-6.jpg';
import mathCover from './covers/math-2b.jpg';
import { applyImport, parseMarkdown } from '../model/markdown';
import { emptyDoc } from '../model/document';
import { seedStars } from '../demo/seed';
import { withSampleMedia } from '../editor/sampleMedia';
import type { Doc } from '../model/types';

/**
 * 書櫃「數位教科書」分頁：出版社／系統管理員上稿的原本，老師只能閱讀或建立副本（自編教材）。
 *
 * 有內容的兩份：國文〈木蘭詩〉、自然〈星星的世界〉，內容是 design/ 的範例 md。
 * 其餘是只有封面的空白本，讓書櫃每一科都有東西：封面是乙練放在 Notion「2025教材」頁的出版社課本封面（2026-10-22）；
 * 沒有封面的（cover: null）示範管理員還沒放封面時的樣子：科目造型當預設封面。
 */
export type Textbook = {
  id: string;
  /** 書櫃分區用的科目名稱。 */
  subject: string;
  /** 卡片左上的一行：學年度＋出版社。 */
  edition: string;
  publisher: string;
  title: string;
  cover: string | null;
  /** 沒有 md＝空白本，只有課名。 */
  md?: string;
};

export const TEXTBOOKS: Textbook[] = [
  { id: 'mulan', subject: '國語文', edition: '115 南一', publisher: '南一', title: '國文 2下', cover: guowenCover, md: mulanMd },
  { id: 'guoyu-6b', subject: '國語文', edition: '115 康軒', publisher: '康軒', title: '國語 6下', cover: guoyuCover },
  { id: 'guoyu-5a', subject: '國語文', edition: '115 範例', publisher: '範例', title: '國語 5上', cover: null },
  { id: 'social-5b', subject: '社會', edition: '115 翰林', publisher: '翰林', title: '社會 5下', cover: socialCover },
  { id: 'social-6a', subject: '社會', edition: '115 範例', publisher: '範例', title: '社會 6上', cover: null },
  { id: 'english-6', subject: '英語', edition: '114 康軒', publisher: '康軒', title: 'Wonder World 6', cover: englishCover },
  { id: 'english-5a', subject: '英語', edition: '115 範例', publisher: '範例', title: 'English 5上', cover: null },
  { id: 'demo', subject: '自然科學', edition: '114 南一', publisher: '南一', title: '自然科學 5下', cover: scienceCover, md: demoMd },
  { id: 'science-6a', subject: '自然科學', edition: '115 範例', publisher: '範例', title: '自然科學 6上', cover: null },
  { id: 'math-2b', subject: '數學', edition: '114 翰林', publisher: '翰林', title: '數學 2下', cover: mathCover },
  { id: 'math-5a', subject: '數學', edition: '115 範例', publisher: '範例', title: '數學 5上', cover: null },
];

export const findTextbook = (id: string) => TEXTBOOKS.find((t) => t.id === id) ?? null;

/** 書櫃分區的科目名稱 → 教材設定裡的科目（決定回首頁鈕的造型）。 */
const META_SUBJECT: Record<string, string> = { 國語文: '國語', 自然科學: '自然' };

/** 原本的內容。每次都重新解析，拿到的是乾淨的一份，建副本時改了不會動到原本。 */
export function textbookDoc(t: Textbook): Doc {
  if (!t.md) {
    // 空白本：只有課名一列
    const doc = emptyDoc(t.title);
    const first = doc.rows[0].columns[0].blocks[0];
    if (first.type === 'text') first.spans = [{ text: t.title }];
    return { ...doc, meta: { publisher: t.publisher, subject: META_SUBJECT[t.subject] ?? t.subject } };
  }
  const doc = applyImport(emptyDoc(), seedStars(withSampleMedia(parseMarkdown(t.md, { autoPageBreak: true }))));
  // 出版社跟著原本走（副本不能改，見 BookSettings）
  return { ...doc, meta: { ...doc.meta, publisher: t.publisher } };
}
