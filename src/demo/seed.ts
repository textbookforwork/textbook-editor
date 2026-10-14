import { makeText, textOf } from '../model/document';
import { markSpans, plainOf } from '../model/spans';
import type { ImportResult } from '../model/markdown';
import type { Block, PopupItem, TextBlock } from '../model/types';

/**
 * 示範用的種子。
 *
 * ⚠️ 這裡加的東西**不在 md 裡**，是程式碼掛上去的。
 *
 * 理由：Pop-up 是老師編出來的，md 規格裡沒有這個構造，所以匯入任何一份
 * 真實教材都不會有補充。但那樣一開啟就看不到這次改版最重要的功能，
 * 使用者得自己先掛一個才看得到。
 *
 * 交接後要拿掉很簡單：App.tsx 不要呼叫 seedStars 就好，其餘一行都不必動。
 */

/**
 * 「自然（範例）」的種子。規則是**一個元件只掛一種類型、同一種可以多個**。
 * 為了測閱讀效果，每種類型都示範「一個」與「多個」（大彈窗只能一個），
 * 從標了重點詞「星座」的那一段開始，依閱讀順序一個元件掛一組（順序見 sets）。
 *
 * 同樣**不在 md 裡**。走 ImportResult 而不是 Doc，因為範例是從匯入對話框
 * 載入的；對不到「星座」重點詞的教材原封不動。圖片對到 design/media/ 的開放授權照片
 * （見 sampleMedia 與 credits.json）；影片、聲音用 design/media-samples/ 的測試檔。
 */
export function seedStars(result: ImportResult): ImportResult {
  const isTarget = (b: Block) =>
    b.type === 'text' && b.spans.some((s) => s.keyword && s.text.includes('星座'));

  // 跳轉的目標：同一課後面的「用星圖找星座」
  const jumpTo =
    result.rows.find((r) =>
      r.columns.some((c) =>
        c.blocks.some((b) => b.type === 'text' && textOf(b).includes('用星圖找星座'))
      )
    )?.id ?? null;

  const textPop: PopupItem[] = [
    {
      id: 'star-pop-1',
      kind: 'text',
      title: '什麼是星座？',
      body:
        '國際天文聯合會把整片天空劃分成 88 個星座，天上的每一顆星都屬於其中一個。' +
        '同一個星座裡的星星看起來靠在一起，其實離我們的距離可能差很多。',
    },
    {
      id: 'star-pop-1b',
      kind: 'text',
      title: '星座和星等不一樣',
      body: '星座是天空的分區，星等是星星有多亮。數字越小越亮，最亮的星甚至是負的星等。',
    },
  ];
  const imagePops: PopupItem[] = [
    { id: 'star-pop-2', kind: 'image', title: '把星星連起來：獵戶座', assetId: 'images/orion-lines.jpg' },
    { id: 'star-pop-3', kind: 'image', title: '古人畫的星座圖（1824 年）', assetId: 'images/star-chart.jpg' },
  ];
  const webPop: PopupItem[] = [
    { id: 'star-pop-4', kind: 'web', title: '臺北市立天文科學教育館', url: 'https://www.tam.gov.taipei/', embeddable: false },
    // 維基百科沒有擋嵌入（沒有 X-Frame-Options），天文館有（SAMEORIGIN），兩種都示範到
    { id: 'star-pop-4b', kind: 'web', title: '維基百科：夏季大三角', url: 'https://zh.wikipedia.org/zh-tw/夏季大三角', embeddable: true },
  ];
  const jumpPop: PopupItem[] = jumpTo
    ? [{ id: 'star-pop-5', kind: 'jump', title: '怎麼用星圖找星座', targetRowId: jumpTo }]
    : [];

  const videoPops: PopupItem[] = [
    { id: 'star-pop-6', kind: 'video', title: '星軌縮時', source: 'upload', ref: 'sample-video-star-trails' },
    { id: 'star-pop-6b', kind: 'video', title: '星軌縮時（再看一次）', source: 'upload', ref: 'sample-video-star-trails' },
  ];
  const oneAudio: PopupItem[] = [
    { id: 'star-pop-10', kind: 'audio', title: '三顆主角星', assetId: 'sample-audio-vega' },
  ];
  const audioPops: PopupItem[] = [
    { id: 'star-pop-7', kind: 'audio', title: '夏季大三角旁白', assetId: 'sample-audio-narration' },
    { id: 'star-pop-8', kind: 'audio', title: '三顆主角星', assetId: 'sample-audio-vega' },
  ];
  const para = (id: string, text: string, role: 'body' | 'lessonTitle' | 'sectionTitle' = 'body') => ({
    ...makeText(text, role),
    id,
  });
  const richPages: Block[][] = [
    [
      para('rich-1-h', '夏季大三角怎麼找', 'sectionTitle'),
      {
        id: 'rich-1-img', type: 'image', assetId: 'images/orion-lines.jpg', alt: '把星星連成圖案', caption: '',
        hasCaption: false, aspectRatio: 3 / 2, widthPct: 40, float: 'left', popups: [],
      },
      para(
        'rich-1-p',
        '夏天晚上八、九點往東方天空看，先找最亮的織女星，再往下找牛郎星，' +
          '最後在兩顆星的左邊找到天津四。把三顆星連起來，就是一個大大的三角形。' +
          '這三顆星分別屬於天琴座、天鷹座和天鵝座。'
      ),
    ],
    [
      para('rich-2-h', '看看星星怎麼移動', 'sectionTitle'),
      { id: 'rich-2-v', type: 'video', source: 'upload', ref: 'sample-video-star-trails', title: '星軌縮時', widthPct: 55, float: 'right', popups: [] },
      para('rich-2-p', '把相機對著天空連續拍一整晚，星星會畫出一圈一圈的弧線。這是因為地球在自轉，星星看起來就繞著北極星轉。'),
      { id: 'rich-2-a', type: 'audio', assetId: 'sample-audio-narration', title: '夏季大三角旁白', widthPct: 40, popups: [] },
    ],
    [
      para('rich-3-h', '想知道更多', 'sectionTitle'),
      para('rich-3-p', '到天文館看看星象儀，或上網查夏季大三角的資料。'),
      { id: 'rich-3-w', type: 'web', url: 'https://www.tam.gov.taipei/', title: '臺北市立天文科學教育館', presentation: 'bookmark', chosen: true, widthPct: 60, popups: [] },
    ],
  ] as Block[][];
  const richPop: PopupItem[] = [
    { id: 'star-pop-9', kind: 'rich', title: '夏季大三角小百科', blocks: richPages[0], pages: richPages },
  ];

  // 每種類型都示範「一個」與「多個」（大彈窗一個元件只能掛一個），測閱讀效果用
  const one = <T extends PopupItem>(list: T[]) => list.slice(0, 1);
  const textOne: PopupItem[] = [
    { id: 'star-pop-11', kind: 'text', title: '', body: '沒寫標題的文字補充：泡泡裡直接是內文，不補「文字」兩個字。' },
  ];
  const imageOne: PopupItem[] = [
    { id: 'star-pop-12', kind: 'image', title: '夏季大三角', assetId: 'images/summer-triangle.jpg' },
  ];
  const imageMany: PopupItem[] = [
    ...imagePops,
    { id: 'star-pop-13', kind: 'image', title: '', assetId: 'images/star-trails.jpg' },
  ];
  const jumpMany: PopupItem[] = jumpTo
    ? [
        ...jumpPop,
        { id: 'star-pop-14', kind: 'jump', title: '回到課文開頭', targetRowId: result.rows[0]?.id ?? null },
      ]
    : [];
  const sets: PopupItem[][] = [
    textPop, // 文字：多個
    imageMany, // 圖片：多個
    webPop, // 網頁：多個
    jumpPop, // 跳轉：一個
    videoPops, // 影片：多個
    audioPops, // 聲音：多個
    richPop, // 大彈窗：一個
    oneAudio, // 聲音：一個
    textOne, // 文字：一個
    imageOne, // 圖片：一個
    one(videoPops).map((v) => ({ ...v, id: 'star-pop-15' })), // 影片：一個
    one(webPop).map((w) => ({ ...w, id: 'star-pop-16' })), // 網頁：一個
    jumpMany, // 跳轉：多個
  ].filter((x) => x.length > 0);

  // 從「星座」那段開始，依閱讀順序一個元件掛一組
  const order = result.rows.flatMap((r) => r.columns.flatMap((c) => c.blocks));
  const start = order.findIndex(isTarget);
  // 對不到「星座」：可能是國文，走國文的種子（同樣對不到就原封不動）
  if (start < 0) return seedGuowen(result);
  const plan = new Map<string, PopupItem[]>();
  const slots = order.slice(start).filter((b) => b.type === 'text' || b.type === 'image');
  sets.forEach((set, k) => {
    if (slots[k]) plan.set(slots[k].id, set);
  });

  const rows = result.rows.map((row) => ({
    ...row,
    columns: row.columns.map((col) => ({
      ...col,
      blocks: col.blocks.map((b) => (plan.has(b.id) ? { ...b, popups: plan.get(b.id)! } : b)),
    })),
  }));
  return { ...result, rows };
}

/**
 * 國文範例〈五柳先生傳〉的種子：直排書的補充示範。
 *
 * 用來看直排時泡泡往左長、字跟著直排的效果，所以挑的是一列一列的那幾種
 * （文字、聲音、跳轉）各示範一個與多個，加上網頁（縮圖卡）。
 * 依段落開頭的字對元件；對不到的就跳過，教材本身不動。
 */
function seedGuowen(result: ImportResult): ImportResult {
  const blocks = result.rows.flatMap((r) => r.columns.flatMap((c) => c.blocks));
  const find = (head: string) =>
    blocks.find((b) => b.type === 'text' && textOf(b).replace(/^\s+/, '').startsWith(head));
  const rowOf = (head: string) =>
    result.rows.find((r) => r.columns.some((c) => c.blocks.some((b) => b === find(head))))?.id ?? null;

  const appreciation = rowOf('課文賞析');
  const plan = new Map<string, PopupItem[]>();
  const put = (head: string, items: PopupItem[]) => {
    const b = find(head);
    if (b && items.length > 0) plan.set(b.id, items);
  };

  // 文字：多個
  put('先生不知何許人也', [
    {
      id: 'gw-pop-1',
      kind: 'text',
      title: '五柳先生是誰？',
      body: '五柳先生是陶淵明假託的人物。作者仿照史書替人立傳的寫法，其實寫的是自己。',
    },
    {
      id: 'gw-pop-2',
      kind: 'text',
      title: '「號」是什麼',
      body: '名與字以外的稱呼。取號的方式很多，五柳先生就是因為住家旁有五棵柳樹而以此為號。',
    },
  ]);
  // 聲音：多個
  put('閑靜少言', [
    { id: 'gw-pop-3', kind: 'audio', title: '第二段朗讀', assetId: 'sample-audio-narration' },
    { id: 'gw-pop-4', kind: 'audio', title: '第二段慢速朗讀', assetId: 'sample-audio-vega' },
  ]);
  // 網頁：多個（縮圖卡）。掛在閱讀小叮嚀：課文段落的補充改由段落的「補」按鈕打開，這裡示範一般元件
  put('閱讀時', [
    { id: 'gw-pop-5', kind: 'web', title: '維基百科：陶淵明', url: 'https://zh.wikipedia.org/zh-tw/陶淵明', embeddable: true },
    { id: 'gw-pop-6', kind: 'web', title: '教育部重編國語辭典', url: 'https://dict.revised.moe.edu.tw/', embeddable: false },
  ]);
  // 跳轉：一個
  if (appreciation) {
    put('贊曰', [{ id: 'gw-pop-7', kind: 'jump', title: '課文賞析', targetRowId: appreciation }]);
  }
  // 文字：一個
  put('本文選自陶淵明集', [
    {
      id: 'gw-pop-8',
      kind: 'text',
      title: '什麼是「傳」',
      body: '記載一個人生平事蹟的文體。史書替人物立傳，多半先寫姓名籍貫，再寫事蹟，最後加上評論。',
    },
  ]);
  // 聲音：一個
  put('陶淵明，一名', [{ id: 'gw-pop-9', kind: 'audio', title: '作者介紹朗讀', assetId: 'sample-audio-narration' }]);

  // 課文三段標成段落（第二段在 md 裡被 @頁[115] 隔開，匯入時已併成一段）。
  // 說明內容取自同一課的題解、課文賞析、語文小視窗與問題討論，不另外編
  const paras = new Map<string, Pick<TextBlock, 'paragraph' | 'paraNotes'>>();
  const mark = (head: string, v: Pick<TextBlock, 'paragraph' | 'paraNotes'>) => {
    const b = find(head);
    if (b) paras.set(b.id, v);
  };
  mark('先生不知何許人也', {
    paragraph: 'start',
    paraNotes: {
      zhi: '介紹五柳先生的名號由來。',
      wen: '本文實為陶淵明的自傳，但為何以五柳先生傳為篇名，而不用陶淵明傳，其用意可能為何？',
    },
  });
  mark('閑靜少言', {
    paragraph: 'start',
    paraNotes: {
      zhi: '只擷取幾項具體的生活言行：好讀書卻「不求甚解」、性嗜酒卻「不吝情去留」、面對貧窮卻「晏如也」，勾勒出五柳先生安貧樂道、任真自得的性格。',
      wen: '本文先說五柳先生讀書「不求甚解」，接著又說他讀書「每有會意，便欣然忘食」。兩者間在文意上是否有矛盾之處？請加以說明。',
    },
  });
  mark('贊曰', {
    paragraph: 'start',
    paraNotes: {
      zhi: '引黔婁之妻之言，讚揚五柳先生不慕榮利的個性。',
      xiu: '不直接稱揚五柳先生，而以上古時代無懷氏、葛天氏的人民加以比擬，讚譽他的質樸率真；也照應首句的「先生不知何許人也」，筆法委婉含蓄。',
      wen: '本文分成「傳」和「贊」兩部分，請指出二者有哪些句子的旨意彼此呼應？',
    },
  });

  if (plan.size === 0 && paras.size === 0) return result;
  const rows = result.rows.map((row) => ({
    ...row,
    columns: row.columns.map((col) => ({
      ...col,
      blocks: col.blocks.map((b) => {
        let out = plan.has(b.id) ? { ...b, popups: plan.get(b.id)! } : b;
        if (out.type === 'text' && paras.has(b.id)) out = { ...out, ...paras.get(b.id)! };
        // 框選的說明：第二段的「曾不吝情去留」標成句型（取自語文小視窗的偏義複詞）
        if (out.type === 'text' && out.paragraph) {
          const at = plainOf(out.spans).indexOf('曾不吝情去留');
          if (at >= 0) {
            out = {
              ...out,
              spans: markSpans(out.spans, at, at + 6, { noteId: 'gw-note-1' }),
              rangeNotes: [
                { id: 'gw-note-1', kind: 'ju', body: '「去留」是偏義複詞，在此只取「去」（離開）的意思。' },
              ],
            };
          }
        }
        return out;
      }),
    })),
  }));
  return { ...result, rows };
}
