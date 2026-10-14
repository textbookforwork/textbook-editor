import { beforeEach, describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { parseMarkdown } from './markdown';
import { plainOf } from './inline';
import { resetIds } from './ids';
import type { Block, DialogueBlock, ImageBlock, TableBlock, TextBlock, WebBlock } from './types';

const parse = (src: string) => parseMarkdown(src, { autoPageBreak: false });
const blocks = (r: ReturnType<typeof parse>): Block[] =>
  r.rows.flatMap((row) => row.columns[0].blocks);
const first = <T extends Block>(r: ReturnType<typeof parse>, type: Block['type']) =>
  blocks(r).find((b) => b.type === type) as T;

beforeEach(resetIds);

describe('frontmatter', () => {
  const src = `---
id: L01
title: 日治時期的建設帶來什麼影響？
publisher: 示範出版社
stage: 國小                  # 國小 / 國中
grade: 5
direction: 橫排              # 直排 / 橫排
unit: 日治時期的社會變遷
page: [90, 97]
---

　　內文。
`;

  it('讀出書目資料，並忽略註解', () => {
    const r = parse(src);
    expect(r.title).toBe('日治時期的建設帶來什麼影響？');
    expect(r.meta.publisher).toBe('示範出版社');
    expect(r.meta.stage).toBe('國小');
    expect(r.meta.printPageRange).toEqual([90, 97]);
  });

  it('direction 直排會設定整本的書寫方向', () => {
    expect(parse(src.replace('橫排', '直排')).settings.writingMode).toBe('vertical');
  });

  it('frontmatter 不會變成內容', () => {
    expect(blocks(parse(src))).toHaveLength(1);
  });
});

describe('四層標題對應四個角色', () => {
  it('# ## ### #### 分別是 課名 大標 中標 小標', () => {
    const r = parse('# 課\n\n## 區塊\n\n### 項\n\n#### 子項\n\n沒有標記的段落');
    expect(blocks(r).map((b) => (b as TextBlock).role)).toEqual([
      'lessonTitle', 'sectionTitle', 'itemTitle', 'subItemTitle', 'body',
    ]);
  });

  it('自動切頁只切區塊，不切項', () => {
    // 課名自成一頁（扉頁），之後每個區塊起一頁；項不切，否則一課會變二十幾頁
    const src = '# 課\n\n## 區塊一\n\n### 項\n\n## 區塊二\n\n### 項';
    const r = parseMarkdown(src, { autoPageBreak: true });
    expect(r.rows.map((x) => x.breakBefore)).toEqual([false, true, false, true, false]);
  });
});

describe('行內標記是語意，不是樣式', () => {
  it('重點詞標成 keyword，不是粗體', () => {
    const r = parse('例如==嘉南大圳==完成後。');
    const spans = (blocks(r)[0] as TextBlock).spans;
    expect(spans.find((s) => s.keyword)?.text).toBe('嘉南大圳');
    expect(spans.every((s) => !s.bold)).toBe(true);
  });

  it('注音存進 ruby 欄位', () => {
    const spans = (blocks(parse('{閑|ㄒㄧㄢˊ}靜少言')) [0] as TextBlock).spans;
    expect(spans[0]).toMatchObject({ text: '閑', ruby: 'ㄒㄧㄢˊ' });
    expect(plainOf(spans)).toBe('閑靜少言');
  });

  it('重點詞裡面的注音不會被吃掉', () => {
    const spans = (blocks(parse('==瓦旦．{燮|ㄒㄧㄝˋ}謝促==率領下')) [0] as TextBlock).spans;
    const ruby = spans.find((s) => s.ruby);
    expect(ruby).toMatchObject({ text: '燮', ruby: 'ㄒㄧㄝˋ', keyword: true });
  });

  it('注釋參照與注釋定義配得起來', () => {
    const r = parse('先生不知何許[^1]人也。\n\n[^1]: 何許　何處。許，處所。');
    const ref = (blocks(r)[0] as TextBlock).spans.find((s) => s.footnoteRef);
    expect(ref?.footnoteRef).toBe('1');
    expect(r.footnotes[0]).toEqual({ id: '1', term: '何許', body: '何處。許，處所。' });
  });
});

describe('圖片的三種文字職責不同', () => {
  it('替代文字與圖說分開存', () => {
    const r = parse('![臺灣鐵路建設分布圖，以三種線條區分](img/rail.jpg "2 西元 1908 年完成西部縱貫鐵路。")');
    const img = first<ImageBlock>(r, 'image');
    expect(img.alt).toBe('臺灣鐵路建設分布圖，以三種線條區分');
    expect(img.caption).toBe('2 西元 1908 年完成西部縱貫鐵路。');
    expect(img.assetId).toBe('img/rail.jpg');
  });

  it('圖說保留課本的圖號，不重新編', () => {
    const r = parse('![甲](a.jpg "1 第一張")\n\n![乙](b.jpg "1 另一個跨頁又從 1 開始")');
    const caps = blocks(r).map((b) => (b as ImageBlock).caption);
    expect(caps).toEqual(['1 第一張', '1 另一個跨頁又從 1 開始']);
  });
});

describe('原頁碼是錨點，不是換頁線', () => {
  it('@頁 標在下一段內容上，且不造成換頁', () => {
    const r = parse('　　第 90 頁的內容。\n\n@頁[91]\n\n## 交通建設對生活的改變');
    expect(r.rows).toHaveLength(2);
    expect(r.rows[0].printPage).toBeUndefined();
    expect(r.rows[1].printPage).toBe(91);
    expect(r.rows[1].breakBefore).toBe(false);
  });

  it('紙本頁碼與換頁線互不干擾', () => {
    const src = '# 課\n\n@頁[91]\n\n## 區塊';
    const r = parseMarkdown(src, { autoPageBreak: true });
    const marked = r.rows.find((x) => x.printPage === 91)!;
    expect(marked.printPage).toBe(91);
    expect(marked.breakBefore).toBe(true); // 換頁是因為它是區塊，不是因為 @頁
  });
});

describe('自訂指令', () => {
  it('對話框是內容，一句一個', () => {
    const r = parse('@對話[蔗農]{這應該是一千五百斤呀！}\n@對話[糖廠人員]{秤起來是一千兩百斤。}');
    const ds = blocks(r) as DialogueBlock[];
    expect(ds).toHaveLength(2);
    expect(ds[0]).toMatchObject({ speaker: '蔗農', text: '這應該是一千五百斤呀！' });
  });

  it('QR 連結記成 web 元件的第三種呈現', () => {
    const r = parse('@連結[八田與一](https://example.org/hatta){QR}');
    expect(first<WebBlock>(r, 'web')).toMatchObject({ presentation: 'qr', title: '八田與一' });
  });

  it('題型標籤掛在下一個區塊上', () => {
    const r = parse('@題型[快篩訊息]\n\n### 第一題');
    expect(blocks(r)[0].label).toBe('快篩訊息');
  });

  it('模組記下種類，不是內容', () => {
    const r = parse('@模組[朝代時間軸](timeline/dynasty)');
    expect(first(r, 'module')).toMatchObject({ moduleKind: 'timeline/dynasty', title: '朝代時間軸' });
  });

  it('@排版[橫排] 與 @排版[直排] 掛在下一段文字上', () => {
    const r = parse('@排版[橫排]\n\n橫排內文\n\n@排版[直排]\n\n直排內文');
    const bs = blocks(r) as TextBlock[];
    expect(bs[0].writingMode).toBe('horizontal');
    expect(bs[1].writingMode).toBe('vertical');
    expect(r.skipped).toEqual([]);
    expect(r.unrecognized).toEqual([]);
  });

  it('刻意不做的指令記在 skipped，跟格式寫錯分開', () => {
    const r = parse('@排版[未知方向]\n\n內文');
    // skipped＝我們決定不做；unrecognized＝格式可能寫錯。
    // 交接時要說明的是前者，要請人修正的是後者。
    expect(r.skipped).toEqual(['@排版[未知方向]']);
    expect(r.unrecognized).toEqual([]);
  });

  it('真的不認得的指令才進 unrecognized', () => {
    const r = parse('@不存在的指令[xxx]\n\n內文');
    expect(r.unrecognized).toEqual(['@不存在的指令[xxx]']);
    expect(r.skipped).toEqual([]);
  });
});

describe('表格', () => {
  it('解析成儲存格陣列並標出有表頭', () => {
    const r = parse('| 西元（年） | 產量 |\n|---|---|\n| 1923 | 48 |\n| 1934 | 197 |');
    const t = first<TableBlock>(r, 'table');
    expect(t.hasHeader).toBe(true);
    expect(t.cols).toBe(2);
    expect(t.cells).toEqual([['西元（年）', '產量'], ['1923', '48'], ['1934', '197']]);
  });
});

describe('自製範例：13 種構造各用一次', () => {
  // 這一份是自製的，沒有版權問題，所以永遠會被執行。
  // 它的職責是「每一種構造都還認得」，不是「扛得住真實複雜度」。
  const r = parseMarkdown(readFileSync('design/sample-demo.md', 'utf8'), { autoPageBreak: true });
  const all = blocks(r);
  const count = (t: Block['type']) => all.filter((b) => b.type === t).length;
  const spans = all.flatMap((b) => (b.type === 'text' ? (b as TextBlock).spans : []));

  it('沒有任何一行掉進內文，也沒有跳過的', () => {
    expect(r.unrecognized).toEqual([]);
    expect(r.skipped).toEqual([]);
  });

  // 模組（@模組）不放進範例：國文流式模組還在等設計，範例裡只會是一個空殼。解析器的模組語法另有單元測試
  it('每一種區塊型別都出現過', () => {
    for (const t of ['image', 'dialogue', 'table', 'reference', 'web', 'audio', 'video', 'question'] as Block['type'][]) {
      expect({ type: t, n: count(t) }).toMatchObject({ n: expect.any(Number) });
      expect(count(t)).toBeGreaterThan(0);
    }
  });

  it('四層標題都在', () => {
    const roles = all.filter((b) => b.type === 'text').map((b) => (b as TextBlock).role);
    for (const r2 of ['lessonTitle', 'sectionTitle', 'itemTitle', 'subItemTitle']) {
      expect(roles).toContain(r2);
    }
  });

  // 範例不放注釋：注釋還沒有可以點開的地方。注釋的解析另有單元測試（上面的「注釋參照與注釋定義配得起來」）
  it('行內標記都解析出來', () => {
    expect(spans.filter((s2) => s2.keyword).map((s2) => s2.text)).toContain('星座');
    expect(spans.find((s2) => s2.ruby)).toMatchObject({ text: '閑', ruby: 'ㄒㄧㄢˊ' });
  });

  it('frontmatter 的書目資料進 meta', () => {
    expect(r.meta).toMatchObject({ publisher: '範例', subject: '自然', printPageRange: [40, 47] });
  });

  it('紙本頁碼是錨點', () => {
    expect(r.rows.filter((x) => x.printPage).map((x) => x.printPage)).toEqual([40, 41, 42, 43, 44]);
  });

  it('題目的選項是結構化的', () => {
    const q = all.find((b) => b.type === 'question');
    expect(q && q.type === 'question' && q.options.map((o) => o.key)).toEqual(['A', 'B', 'C', 'D']);
  });
});

describe('紙本換頁切開的段落', () => {
  it('頁碼標記後面沒有段首縮排的文字，併回上一段', () => {
    const r = parse('　　閑靜少言，或置酒而招\n\n@頁[115]\n\n之。造飲輒盡，以此自終。\n\n　　贊曰：');
    const texts = blocks(r).filter((b): b is TextBlock => b.type === 'text').map((b) => plainOf(b.spans));
    expect(texts).toEqual(['閑靜少言，或置酒而招之。造飲輒盡，以此自終。', '贊曰：']);
  });

  it('頁碼標記後面是新的一段（有縮排）就照常分開', () => {
    const r = parse('　　第一段。\n\n@頁[115]\n\n　　第二段。');
    expect(blocks(r).filter((b) => b.type === 'text')).toHaveLength(2);
  });
});
