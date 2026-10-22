import mulanMd from '../../design/sample-mulan.md?raw';
import demoMd from '../../design/sample-demo.md?raw';
import guowenCover from './covers/guowen-2b.jpg';
import scienceCover from './covers/science-5b.jpg';
import { applyImport, parseMarkdown } from '../model/markdown';
import { emptyDoc } from '../model/document';
import { seedStars } from '../demo/seed';
import { withSampleMedia } from '../editor/sampleMedia';
import type { Doc } from '../model/types';

/**
 * 書櫃「數位教科書」分頁：出版社／系統管理員上稿的原本，老師只能閱讀或建立副本（自編教材）。
 *
 * 目前上稿兩份：國文〈木蘭詩〉、自然〈星星的世界〉。內容是 design/ 的範例 md；
 * 封面是乙練放在 Notion「2025教材」頁的出版社課本封面（2026-10-22）。
 */
export type Textbook = {
  id: string;
  /** 書櫃分區用的科目名稱。 */
  subject: string;
  /** 卡片左上的一行：學年度＋出版社。 */
  edition: string;
  publisher: string;
  title: string;
  cover: string;
  md: string;
};

export const TEXTBOOKS: Textbook[] = [
  { id: 'mulan', subject: '國語文', edition: '115 南一', publisher: '南一', title: '國文 2下', cover: guowenCover, md: mulanMd },
  { id: 'demo', subject: '自然科學', edition: '114 南一', publisher: '南一', title: '自然科學 5下', cover: scienceCover, md: demoMd },
];

export const findTextbook = (id: string) => TEXTBOOKS.find((t) => t.id === id) ?? null;

/** 原本的內容。每次都重新解析，拿到的是乾淨的一份，建副本時改了不會動到原本。 */
export function textbookDoc(t: Textbook): Doc {
  const doc = applyImport(emptyDoc(), seedStars(withSampleMedia(parseMarkdown(t.md, { autoPageBreak: true }))));
  // 出版社跟著原本走（副本不能改，見 BookSettings）
  return { ...doc, meta: { ...doc.meta, publisher: t.publisher } };
}
