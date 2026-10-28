import { makeText, textOf } from '../model/document';
import { markSpans, plainOf } from '../model/spans';
import type { ImportResult } from '../model/markdown';
import type { Block, PopupItem, RangeNote, TextBlock } from '../model/types';

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
 * 國文範例〈木蘭詩〉的種子：直排書的補充示範，也是補充資源面板「本頁／本節／本章」的測試教材。
 *
 * 一章三節（題解、課文、語文小視窗），七種補充散在不同節、不同頁；
 * 課文裡補充分整段、句子、生字詞三層掛，每一層有說明與補充的各種組合（閱讀時三層點按的示範）；
 * 章名頁不掛，用來看「這一頁沒有補充」的樣子。
 * 依段落開頭的字對元件；對不到的就跳過，教材本身不動。
 * 圖片、聲音、影片是開放授權的檔案（出處見 design/media/credits.json 與 sampleLibrary）。
 */
function seedGuowen(result: ImportResult): ImportResult {
  const blocks = result.rows.flatMap((r) => r.columns.flatMap((c) => c.blocks));
  const find = (head: string) =>
    blocks.find((b) => b.type === 'text' && textOf(b).replace(/^\s+/, '').startsWith(head));
  const rowOf = (head: string) =>
    result.rows.find((r) => r.columns.some((c) => c.blocks.some((b) => b === find(head))))?.id ?? null;

  const plan = new Map<string, PopupItem[]>();
  const put = (head: string, items: PopupItem[]) => {
    const b = find(head);
    if (b && items.length > 0) plan.set(b.id, items);
  };

  const textBlock = (id: string, text: string, role: 'body' | 'sectionTitle' = 'body') => ({ ...makeText(text, role), id });
  const image = (id: string, assetId: string, alt: string, aspectRatio: number) =>
    ({ id, type: 'image', assetId, alt, caption: '', hasCaption: false, aspectRatio, widthPct: 45, float: 'right', popups: [] }) as Block;
  const richPages: Block[][] = [
    [
      textBlock('ml-rich-1-h', '換回女裝的木蘭', 'sectionTitle'),
      image('ml-rich-1-img', 'images/mulan-silk-painting.jpg', '清代絹本設色的木蘭像', 699 / 1200),
      textBlock('ml-rich-1-p', '「脫我戰時袍，著我舊時裳。當窗理雲鬢，對鏡貼花黃。」這幅清代的絹畫裡，木蘭穿著女裝，身上仍背著弓箭。'),
    ],
    [
      textBlock('ml-rich-2-h', '木蘭當戶織', 'sectionTitle'),
      image('ml-rich-2-img', 'images/mulan-loom.jpg', '明清時期的木織機', 1200 / 800),
      textBlock('ml-rich-2-p', '詩一開頭的「唧唧」是織布機的聲音。照片是杭州國家版本館展出的木織機。'),
    ],
  ];

  // ── 題解 ──
  // 圖片：一個（掛在節標題上）
  put('題解', [{ id: 'ml-pop-img-1', kind: 'image', title: '木蘭像（1772 年木刻版畫）', assetId: 'images/mulan-portrait.jpg' }]);
  // 文字：多個
  put('本詩選自', [
    {
      id: 'ml-pop-text-1',
      kind: 'text',
      title: '什麼是樂府',
      body: '樂府原本是漢代掌管音樂的官署，負責採集各地民歌配樂演唱。後來把這些可以入樂的詩歌也稱為「樂府」。',
    },
    {
      id: 'ml-pop-text-2',
      kind: 'text',
      title: '樂府雙璧',
      body: '〈木蘭詩〉與〈孔雀東南飛〉都是長篇的樂府敘事詩，一北一南，後人合稱「樂府雙璧」。',
    },
  ]);

  // ── 課文 ──
  // 補充分三層掛：整段（段落的「補」）、標成句子的字（句子的「補」）、標成生字詞或沒標的幾個字（點字彈出）。
  // 整段只留跟整段有關的；講某一句、某個詞的，掛到那幾個字上（見下面的 wordMarks）
  // 影片：多個（整段）
  put('萬里赴戎機', [
    { id: 'ml-pop-video-1', kind: 'video', title: '敦煌的漢代長城', source: 'upload', ref: 'sample-video-mulan-wall' },
    { id: 'ml-pop-video-2', kind: 'video', title: '草原上的馬群', source: 'upload', ref: 'sample-video-mulan-horses' },
  ]);
  // 大彈窗：一個
  put('爺孃聞女來', [{ id: 'ml-pop-rich-1', kind: 'rich', title: '木蘭的樣子', blocks: richPages[0], pages: richPages }]);
  // 跳轉：一個
  const opening = rowOf('唧唧復唧唧');
  if (opening) put('雄兔腳撲朔', [{ id: 'ml-pop-jump-1', kind: 'jump', title: '回到課文開頭', targetRowId: opening }]);

  // ── 語文小視窗 ──
  // 網頁：多個（掛在節標題上）
  put('語文小視窗', [
    { id: 'ml-pop-web-1', kind: 'web', title: '維基百科：木蘭辭', url: 'https://zh.wikipedia.org/zh-tw/木蘭辭', embeddable: true },
    { id: 'ml-pop-web-2', kind: 'web', title: '維基文庫：木蘭詩全文', url: 'https://zh.wikisource.org/zh-hant/木蘭詩', embeddable: false },
  ]);
  // 跳轉：多個（回到課文裡的兩組互文）
  const east = rowOf('東市買駿馬');
  const war = rowOf('萬里赴戎機');
  const backs: PopupItem[] = [];
  if (east) backs.push({ id: 'ml-pop-jump-2', kind: 'jump', title: '回到「東市買駿馬」', targetRowId: east });
  if (war) backs.push({ id: 'ml-pop-jump-3', kind: 'jump', title: '回到「將軍百戰死」', targetRowId: war });
  put('互文是', backs);

  // 課文六段標成段落，段旨照各段內容寫，不另外延伸
  const paras = new Map<string, Pick<TextBlock, 'paragraph' | 'paraNotes' | 'readAloud'>>();
  // 前兩段有朗讀（系統語音念的），閱讀時膠囊最上面是播放鍵；其餘段落沒有，看得出差別
  const READ_ALOUD: Record<string, string> = {
    唧唧復唧唧: 'sample-audio-mulan-recite-1',
    東市買駿馬: 'sample-audio-mulan-recite-2',
  };
  const mark = (head: string, paraNotes: TextBlock['paraNotes']) => {
    const b = find(head);
    if (b) paras.set(b.id, { paragraph: 'start', paraNotes, ...(READ_ALOUD[head] ? { readAloud: READ_ALOUD[head] } : {}) });
  };
  // 旨修句問的組合每段不同，閱讀時右下角膠囊的按鈕數跟著變：兩顆、三顆、四顆都有
  mark('唧唧復唧唧', {
    zhi: '木蘭停下織布嘆息，因為父親被徵召，決定代父從軍。',
    xiu: '設問：「問女何所思？問女何所憶？」先提出疑問，再由木蘭自己回答。',
    wen: '一、木蘭為什麼停下織布嘆息？\n二、她最後做了什麼決定？',
  });
  mark('東市買駿馬', {
    zhi: '木蘭備齊鞍馬出征，一路上思念爹娘。',
    xiu: '互文：東、西、南、北四市各買一樣，意思是跑遍各處市集把裝備買齊。',
    ju: '「不聞……，但聞……」：聽不到爹娘的呼喚，只聽得到水聲、馬鳴，寫出離家越來越遠的思念。',
  });
  mark('萬里赴戎機', {
    zhi: '木蘭在邊塞征戰多年。',
    xiu: '誇飾：「萬里赴戎機，關山度若飛」，寫行軍又遠又快。\n對偶：「朔氣傳金柝，寒光照鐵衣」。',
  });
  mark('歸來見天子', {
    zhi: '木蘭立功歸來，不要官位，只想回到故鄉。',
    wen: '木蘭為什麼不接受尚書郎的官位？從這裡可以看出她是怎樣的人？',
  });
  mark('爺孃聞女來', {
    zhi: '家人歡迎木蘭回家，木蘭換回女裝，同袍大為驚訝。',
    xiu: '排比：「爺孃聞女來」「阿姊聞妹來」「小弟聞姊來」，依序寫家人的歡迎。',
    ju: '「開我……，坐我……」「脫我……，著我……」：一連串的「我」，寫木蘭回到自己家的熟悉與歡喜。',
    wen: '同袍為什麼「皆驚惶」？',
  });
  mark('雄兔腳撲朔', {
    zhi: '用雙兔並跑難辨雄雌作比，收束全詩。',
    xiu: '譬喻：以雙兔並跑比喻男女在戰場上難以分辨。\n設問：「安能辨我是雄雌？」答案在問題的反面。',
  });

  /**
   * 框選的字。閱讀時第一下點段落、第二下點這些字：
   * 生字詞在字旁彈出註釋（有補充就接在註釋底下）；句子聚焦整個標記，旨修句問與補充換到右下角的膠囊；
   * 沒標的字只掛補充，點了直接彈出。一組字可以掛好幾項：字上記第一項的 id，其餘項目用 wordGroup 認這一組。
   */
  type WordMark = { id: string; phrase: string; note?: Omit<RangeNote, 'id'>; popups?: PopupItem[] };
  const wordMarks: WordMark[] = [
    // 句子：修辭＋補充
    {
      id: 'ml-note-loom',
      phrase: '唧唧復唧唧，木蘭當戶織',
      note: { kind: 'sentence', body: '', notes: { xiu: '摹寫：「唧唧」摹寫織布機的聲音。' } },
      popups: [{ id: 'ml-pop-audio-1', kind: 'audio', title: '織布機的聲音', assetId: 'sample-audio-mulan-loom' }],
    },
    // 生字詞：註釋＋補充
    {
      id: 'ml-note-zhu',
      phrase: '機杼',
      note: { kind: 'word', body: '織布機。杼，織布的梭子。' },
      // 一組字掛兩項
      popups: [
        { id: 'ml-pop-img-loom', kind: 'image', title: '明清時期的木織機', assetId: 'images/mulan-loom.jpg' },
        { id: 'ml-pop-img-weaver', kind: 'image', title: '雲南麗江，在織機前織布的婦女', assetId: 'images/mulan-weaver.jpg' },
      ],
    },
    // 生字詞：只有註釋
    { id: 'ml-note-jian', phrase: '鞍韉', note: { kind: 'word', body: '馬鞍和馬鞍下的墊子。' } },
    // 沒標的字：只掛補充
    {
      id: 'ml-word-river',
      phrase: '黃河',
      popups: [{ id: 'ml-pop-img-2', kind: 'image', title: '黃河（壺口瀑布）', assetId: 'images/mulan-yellow-river.jpg' }],
    },
    // 句子：只有補充
    {
      id: 'ml-note-neigh',
      phrase: '但聞燕山胡騎鳴啾啾',
      note: { kind: 'sentence', body: '', notes: {} },
      popups: [{ id: 'ml-pop-audio-2', kind: 'audio', title: '馬的嘶鳴', assetId: 'sample-audio-mulan-neigh' }],
    },
    // 句子：只有句型（「黃河」第一次出現在上一句，這一句的黃河沒掛補充，兩者不重疊）
    {
      id: 'ml-note-dan',
      phrase: '旦辭黃河去，暮至黑山頭',
      note: { kind: 'sentence', body: '', notes: { ju: '「旦……，暮……」：早晚兩個時間對舉，寫出行軍的迅速。' } },
    },
    // 句子：只有提問
    {
      id: 'ml-note-yuan',
      phrase: '願為市鞍馬，從此替爺征',
      note: { kind: 'sentence', body: '', notes: { wen: '木蘭可以不去，為什麼還是決定替父親從軍？' } },
    },
    // 句子：只有修辭（跟語文小視窗講的同一件事）
    {
      id: 'ml-note-1',
      phrase: '將軍百戰死，壯士十年歸',
      note: { kind: 'sentence', body: '', notes: { xiu: '互文：將軍和壯士都身經百戰，有的戰死，有的多年後才歸來。' } },
    },
    // 生字詞：只有註釋（原本掛在整段的文字補充，講的其實是這幾個字）
    {
      id: 'ml-note-xun',
      phrase: '策勳十二轉',
      note: {
        kind: 'word',
        body: '記功時勳位連升了很多級。「十二」和詩中的「軍書十二卷」「同行十二年」一樣，是表示多的虛數，不是實際的數目。',
      },
    },
  ];
  const applyMarks = (b: TextBlock): TextBlock => {
    let out = b;
    for (const m of wordMarks) {
      // 只標第一次出現的地方（「黃河」在第二段出現三次）
      const at = plainOf(out.spans).indexOf(m.phrase);
      if (at < 0) continue;
      const end = at + m.phrase.length;
      let spans = out.spans;
      if (m.note) spans = markSpans(spans, at, end, { noteId: m.id });
      // 字上記第一項的 id 當這一組的代號，其餘項目用 wordGroup 認它
      const head = m.popups?.[0]?.id;
      if (head) spans = markSpans(spans, at, end, { popupId: head });
      const grouped = (m.popups ?? []).map((p, k) => (k === 0 ? p : { ...p, wordGroup: head }));
      out = {
        ...out,
        spans,
        rangeNotes: m.note ? [...(out.rangeNotes ?? []), { id: m.id, ...m.note }] : out.rangeNotes,
        popups: [...out.popups, ...grouped],
      };
    }
    return out;
  };

  if (plan.size === 0 && paras.size === 0) return result;
  const rows = result.rows.map((row) => ({
    ...row,
    columns: row.columns.map((col) => ({
      ...col,
      blocks: col.blocks.map((b) => {
        let out = plan.has(b.id) ? { ...b, popups: plan.get(b.id)! } : b;
        if (out.type === 'text' && paras.has(b.id)) out = { ...out, ...paras.get(b.id)! };
        // 框選的字：生字詞、句子、只掛補充的詞，各種組合都有一則（閱讀時三層點按的示範）
        if (out.type === 'text' && out.paragraph) out = applyMarks(out);
        return out;
      }),
    })),
  }));

  // 預設版面：「題解」標題跟它那一段併成同一列的上下兩欄（直排），標題只佔兩個字的長度，
  // 內文緊接在它正下方——跟老師在編輯器裡拖出來的一樣（見 useRowDrag 的 measureKeep）
  const headAt = rows.findIndex((r) => r.columns.some((c) => c.blocks.some((b) => b.type === 'text' && textOf(b).trim() === '題解')));
  const body = rows[headAt + 1];
  const bodyBlock = body?.columns.length === 1 ? body.columns[0].blocks[0] : undefined;
  if (headAt >= 0 && body && bodyBlock?.type === 'text' && textOf(bodyBlock).trim().startsWith('本詩選自')) {
    const head = rows[headAt];
    const merged = {
      ...head,
      columns: [
        { ...head.columns[0], widthPct: 12 },
        { ...body.columns[0], widthPct: 88 },
      ],
    };
    rows.splice(headAt, 2, merged);
  }
  return { ...result, rows };
}
