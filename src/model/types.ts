/**
 * 文件模型。
 *
 * 核心：內容是一條連續的流，頁是算出來的。這裡沒有任何跟「數位頁」有關的欄位，
 * 頁由 paginate() 依可用空間切出來。也沒有 x / y 座標——元件的位置只有
 * 「在流裡的第幾列」和「那一列怎麼分欄」兩個維度。
 *
 * 欄位對應《教科書 md 標記規格》。兩份文件用同一套詞彙，
 * 對照時不需要翻譯。
 */

// ── 內容角色 ─────────────────────────────────────────────
/**
 * 九種文字角色。字級／行高／字重由角色決定，老師不能逐段調整。
 *
 * 前四個是標題，跟 md 標記規格的四層一一對應：
 *   #    課    → lessonTitle   課名 48/700
 *   ##   區塊  → sectionTitle  大標 36/700
 *   ###  項    → itemTitle     中標 28/700
 *   #### 子項  → subItemTitle  小標 24/700
 *
 * 其餘五個不由階層決定，由內容型別決定（圖說跟著圖、注釋跟著 footnote）。
 */
export type TextRole =
  | 'lessonTitle'
  | 'sectionTitle'
  | 'itemTitle'
  | 'subItemTitle'
  | 'lead' // 導言 20/500
  | 'body' // 內文 18/400（預設）
  | 'supplement' // 補充 16/400
  | 'annotation' // 注釋 14/400
  | 'caption'; // 圖說 12/400

export const HEADING_ROLES: TextRole[] = [
  'lessonTitle',
  'sectionTitle',
  'itemTitle',
  'subItemTitle',
];

/**
 * 內容分類。這是「系統讀不讀得懂教材」的關鍵欄位——沒有它，
 * 生字表、全書搜尋、正確順序的朗讀都做不到。
 *
 * ⚠️ 暫定值。正式清單尚未定案，取值範圍確定後只需要改這個 union，
 * 資料結構不受影響。詳見 HANDOVER.md。
 */
export type ContentCategory =
  | 'courseText'
  | 'annotation'
  | 'vocabulary'
  | 'objective'
  | 'activity'
  | 'exercise'
  | 'caption'
  | 'extension';

// ── 行內 ─────────────────────────────────────────────────
/** 行內強調。字級不在這裡——字級由角色（或整段的 fontSize）決定，行內只能改樣式與語意標記。 */
export type InlineSpan = {
  text: string;
  bold?: boolean;
  underline?: boolean;
  /** 刪除線。 */
  strike?: boolean;
  /** 上線：數學的線段 AB 上方那一條。直排時畫在右側。 */
  overline?: boolean;
  /**
   * 文字顏色。可以是設計系統的語意色（'accent'、'secondary'；'default' 等於沒設），
   * 也可以是任意 CSS 色值（#RRGGBB、rgb()…）——老師可以自由選色，
   * 字級才是由層級決定、不能逐字改的那一個（無障礙的依據）。
   */
  color?: string;
  /**
   * 字體：CSS 的 font-family 值。只在老師特別選了字體時才有，
   * 沒設就跟整本的黑體。選項定在 styles/roles.ts 的 INLINE_FONTS。
   */
  fontFamily?: string;
  /**
   * 這幾個字點下去會開的補充：一組字的代號，對到 TextBlock.popups 裡 id 或 wordGroup 是它的那幾項
   * （見 popups.ts 的 groupOf）。只開這一組，不開整段的——補充是掛在詞上的，不是掛在整段上。
   */
  popupId?: string;
  /** 這幾個字標成生字、語詞或句子，指向所屬 TextBlock.rangeNotes 裡的 id。只有課文段落會有。 */
  noteId?: string;
  href?: string;
  /**
   * 注音（md 規格的 `{閑|ㄒㄧㄢˊ}`）。
   * MVP 不算繪，但欄位保留——正式系統日後接上注音時是「補上算繪」，
   * 不是「改資料結構再回填全部教材」。
   */
  ruby?: string;
  /**
   * 重點詞（md 規格的 `==嘉南大圳==`）。
   * 這是語意不是樣式——生字表與全書搜尋都靠它，不能只做成粗體。
   */
  keyword?: boolean;
  /** 注釋參照（md 規格的 `[^1]`）。對應 Doc.footnotes 裡的 id。 */
  footnoteRef?: string;
  /** 遮住這幾個字（像挖空）：閱讀時蓋一條灰底，點了才顯示。 */
  masked?: boolean;
};

/** 注釋。國文一課可能有二十五條，是內容不是註腳裝飾。 */
export type Footnote = {
  id: string;
  /** 被注釋的詞，例如「何許」。 */
  term: string;
  /** 注釋內容，例如「何處。許，處所。」 */
  body: string;
};

// ── 段落 ─────────────────────────────────────────────────
/** 段落說明的種類：段旨、修辭、句型、提問。「補」是元件原本的補充（popups），不在這裡。 */
export type ParaNoteKind = 'zhi' | 'xiu' | 'ju' | 'wen';
/** 每種一則，可以換行分點（例如提問的「一、……二、……」）。空字串視同沒有。 */
export type ParaNotes = Partial<Record<ParaNoteKind, string>>;
/**
 * 框選的字標成什麼：生字詞（一則註釋，一行說明，例如「音ㄕˋ，愛好。」），
 * 或句子（底下再掛旨修句問，存在 notes，跟整段一樣）。
 * 舊資料：kind 是旨修句問其中一種（內容在 body）讀成句子；'zi'、'ci'（生字、語詞分開的版本）讀成生字詞——見 paragraphs.ts 的 rangeKindOf。
 */
export type RangeKind = 'word' | 'sentence';
/** 掛在幾個字上的一則說明。 */
export type RangeNote = { id: string; kind: RangeKind | 'zi' | 'ci' | ParaNoteKind; body: string; notes?: ParaNotes };

// ── Pop-up ───────────────────────────────────────────────
/**
 * Pop-up 是元件的屬性，不是第十種元件。一個元件可以掛多個。
 *
 * 行為規則（無例外、不依數量變化）：有掛補充就開檢視器，
 * 每一項的行動鈕依它自己的 kind 決定。
 */
export type PopupItem = (
  | { id: string; kind: 'text'; title: string; body: string }
  | { id: string; kind: 'image'; title: string; assetId: string | null }
  | {
      id: string;
      kind: 'video';
      title: string;
      /** YouTube 走白名單比對，能在檢視台裡直接播；上傳檔案同理。 */
      source: 'upload' | 'youtube';
      ref: string;
    }
  | { id: string; kind: 'audio'; title: string; assetId: string | null }
  | {
      id: string;
      kind: 'web';
      title: string;
      url: string;
      /**
       * 能否在頁內嵌入。MVP 恆為 false——真實判斷要看對方的
       * X-Frame-Options / CSP，那是伺服器端的檢查，屬於後端。
       * 接上之後把這個欄位打開就有頁內瀏覽，不必改資料結構或檢視器。
       */
      embeddable: boolean;
    }
  | { id: string; kind: 'jump'; title: string; targetRowId: string | null }
  /**
   * 大彈窗：內容是幾個元件（有層級的文字、圖片），用跟頁面一樣的 Block，
   * 所以老師編它的方式跟編頁面一樣，學生看到的字級層級也跟頁面一致。
   * 「彈出文字」只能放純文字、補充一多就只好改用跳頁——這一種就是為了
   * 讓補充資料留在補充的位置，不變成主教材的一頁。
   */
  | {
      id: string;
      kind: 'rich';
      title: string;
      /** 第 1 頁的內容。舊資料只有這一欄；有 pages 時以 pages 為準，這裡同步存第 1 頁。 */
      blocks: Block[];
      /** 大彈窗可以有好幾頁，學生一次看一頁、左右翻。讀的時候用 richPagesOf()。 */
      pages?: Block[][];
    }) & {
  /**
   * 連到幾個字上時，屬於哪一組字。字上記的 popupId 是這一組的代號；
   * 第一項的代號就是它自己的 id（舊資料都是這樣，不必回填），同一組字後加的項目把代號記在這裡。
   * 所以同一組字可以掛好幾項，字上的標記不必改成清單。
   */
  wordGroup?: string;
};


export type PopupKind = PopupItem['kind'];

// ── 區塊 ─────────────────────────────────────────────────
type BlockBase = {
  id: string;
  /**
   * 只用在大彈窗：元件靠左或靠右，後面的文字、圖片排在它旁邊（文繞圖）。
   * 大彈窗是一頁自由編排的視窗，不走課本頁的分欄；課本頁不讀這個欄位。
   */
  float?: 'left' | 'right';
  /** 掛在這個元件上的補充，順序可拖曳調整。 */
  popups: PopupItem[];
  category?: ContentCategory;
  /** 課本印在旁邊的小標籤，例如題型「快篩訊息」（md 規格的 `@題型[]`）。 */
  label?: string;
  /**
   * 老師拖外框調過的尺寸。沒設就走 blockSizing 的預設規則。
   *
   * inline 軸（橫排＝寬）存「佔欄寬的百分比」，欄寬變了元件跟著縮放；
   * block 軸（橫排＝高）存頁座標的絕對值，只有沒有內在比例的元件
   * （圖形、網頁框、模組）會用到——圖片與影片的高度由比例算出來。
   * 預設與文字對齊同一組邊界，縮小是老師主動的決定。
   */
  widthPct?: number;
  blockSize?: number;
  /**
   * 遮住：閱讀時原地蓋一層，點了才顯示（取代現行網站的「點擊後消失／出現」）。
   * 遮罩跟元件一樣大，不佔額外版面，所以分頁不受影響。
   */
  masked?: boolean;
};

export type TextBlock = BlockBase & {
  type: 'text';
  role: TextRole;
  spans: InlineSpan[];
  /**
   * 覆寫角色預設字級，頁座標 px；行高跟著等比。沒設就走角色的 token。
   * 層級（role）仍然是內容分類與無障礙的依據，這裡只動大小。
   */
  fontSize?: number;
  /**
   * 行距：無單位的倍數（1.5＝字級的 1.5 倍），跟著字級等比。沒設就走角色預設的比例。
   * 直排時是行與行（直行之間）的距離。
   */
  lineHeight?: number;
  /**
   * 課文段落：段號自動編（橫排 1、2、3，直排一、二、三）。沒設＝不是段落。
   * 一段永遠只有一塊——紙本換頁切開的兩半在匯入時就併回去（見 markdown.ts）。
   * 段號畫在段首外側的頁邊，不佔版面，所以分頁不受影響。
   */
  paragraph?: 'start';
  /** 段落的說明，閱讀時一種一顆圓形按鈕。 */
  paraNotes?: ParaNotes;
  /** 框選幾個字標的說明（例如某一句的主旨）。字上記 noteId，內容存這裡；閱讀時點那幾個字彈出。 */
  rangeNotes?: RangeNote[];
  /** 對齊。用邏輯值，直排時 start 是上、end 是下。沒設＝start。 */
  align?: 'start' | 'center' | 'end' | 'justify';
  /**
   * 單段的書寫方向。沒設＝跟整本（DocSettings.writingMode）。
   * 跟整本不同向的段落在分頁裡是不可切開的盒子：它在頁面 block 軸上
   * 佔固定的尺寸（blockSize，沒設就是頁的 45%），另一軸由文字的行數決定。
   */
  writingMode?: 'horizontal' | 'vertical';
};

export type ImageBlock = BlockBase & {
  type: 'image';
  assetId: string | null;
  /**
   * 一張圖上有三種文字，職責不同（md 規格明列）：
   *   alt      圖在傳達什麼資訊，只有螢幕報讀軟體看得到
   *   caption  課本印在圖下面那行字，照抄含課本圖號，所有人看得到
   *   longDesc 複雜圖表的完整說明，alt 裝不下時才用，只有螢幕報讀軟體
   *
   * 圖說要保留課本的編號——社會的圖號每個跨頁重編，不能讓系統自動編。
   */
  alt: string;
  caption: string;
  /** 是否開啟圖說。預設為 false（不顯示圖說）；老師可在浮動工具列開啟。 */
  hasCaption?: boolean;
  /**
   * 裁切範圍（原圖的比例，0–1）。沒設＝整張。aspectRatio 永遠是原圖的比例，
   * 顯示用的比例由 imageRatio() 算：原圖比例 × 裁切寬 ÷ 裁切高。
   */
  crop?: { x: number; y: number; w: number; h: number };
  longDescription?: string;
  /**
   * 用 AI 生成的圖：這裡存老師打的描述。有這個欄位（即使是空字串）
   * 代表這張圖是走「AI 生成」插進來的，還沒有圖時畫面顯示描述輸入框而不是上傳鈕。
   * 模型與帳單在正式系統那邊，原型只保留入口。
   */
  aiPrompt?: string;
  /**
   * 圖片本身的長寬比（寬÷高）。
   *
   * ⚠️ md 匯入時給的是暫定值——md 只有檔案路徑，讀不到尺寸。
   * 真實比例要在「上傳圖片」時從 naturalWidth / naturalHeight 讀出來寫進來，
   * 那是圖片元件的工作（見 HANDOVER）。在那之前版面高度會是估的。
   */
  aspectRatio: number;
};

export type VideoBlock = BlockBase & {
  type: 'video';
  source: 'upload' | 'youtube';
  ref: string;
  title: string;
  /** 字幕檔（md 規格的 `{字幕=video/x.vtt}`）。無障礙需要。 */
  captionsRef?: string;
};

export type AudioBlock = BlockBase & {
  type: 'audio';
  assetId: string | null;
  title: string;
};

/**
 * 圖形的種類。面板只給前四種；三角形與星形是舊資料才有的，
 * 既有教材照常顯示，但不再提供新建。
 */
export type ShapeKind = 'rect' | 'circle' | 'roundedRect' | 'callout' | 'triangle' | 'star';

/**
 * 圖形。圖形與裡面的文字是同一個元件：雙擊圖形就能打字，拖曳整個一起走。
 *
 * 尺寸只有外框（widthPct、blockSize），對話框的尖角不算在內——
 * 外框是分頁量的，尖角畫在框外、不佔版面，所以可以指到任何方向。
 */
export type ShapeBlock = BlockBase & {
  type: 'shape';
  shape: ShapeKind;
  /** 舊欄位：純文字標籤。新資料寫 spans；沒有 spans 時退回來讀它。 */
  label: string;
  /** 圖形裡的文字，走跟段落一樣的行內標記機制。 */
  spans?: InlineSpan[];
  /** 填色。CSS 色值；沒設就用設計系統的預設（白底）。 */
  fill?: string;
  /** 邊框顏色。沒設就用設計系統的預設（墨色）。 */
  stroke?: string;
  /** 邊框粗細（px）。 */
  strokeWidth?: number;
  /** 透明度 0～1，只套在形狀（填色與邊框），裡面的字不受影響。 */
  opacity?: number;
  /**
   * 對話框尖角的尖端，以外框為基準的相對座標（0,0＝左上、1,1＝右下），
   * 通常落在 0～1 之外，因為尖角要指到框外。只有 callout 用。
   */
  tail?: { x: number; y: number };
  /** 圖形裡的文字直排。沒設＝橫排（圖形自己的文字方向，不跟整本走）。 */
  textVertical?: boolean;
  /** 圖形裡的字級，頁座標 px。沒設＝14px。整個圖形的字一起改，不逐字。 */
  fontSize?: number;
  /** 圖形裡的字體：CSS font-family，選項同 INLINE_FONTS。沒設＝整本的黑體。 */
  fontFamily?: string;
  /** 圖形裡的字色。沒設＝依填色深淺自動選墨色或白色。 */
  textColor?: string;
};

/** 線段兩端的樣式。 */
export type LineCap = 'none' | 'arrow' | 'arrowFilled' | 'dot';

/**
 * 線段。佔一個方框（寬用 widthPct、高用 blockSize），兩個端點存在框內的
 * 相對座標（0～1）。框是分頁量的，端點只是框內的畫法，拖端點不會改版面。
 */
export type LineBlock = BlockBase & {
  type: 'line';
  from: { x: number; y: number };
  to: { x: number; y: number };
  /** 顏色。CSS 色值；沒設就用設計系統的預設（墨色）。 */
  stroke?: string;
  /** 粗細（px）。 */
  strokeWidth?: number;
  dashed?: boolean;
  startCap?: LineCap;
  endCap?: LineCap;
  /** 透明度 0～1。 */
  opacity?: number;
};

export type TableBlock = BlockBase & {
  type: 'table';
  rows: number;
  cols: number;
  cells: string[][];
  hasHeader: boolean;
  /**
   * 老師拖格線調過的欄寬，存「佔表寬的百分比」，總和 100。
   * 沒設就平分。存比例不存像素：表格本身拖外框變寬時，欄要跟著縮放。
   */
  colWidths?: number[];
  /**
   * 老師拖格線調過的列高，頁座標，是**下限**不是定值——
   * 格子裡的字換行撐高了，列就比這個高。真正的高度由量測器量。
   */
  rowHeights?: number[];
  /** 框線顏色，CSS 色值。沒設就用設計系統的主要文字色（白底黑框）。 */
  borderColor?: string;
  /** 框線粗細，頁座標。沒設是 1；0 就是無框線。 */
  borderWidth?: number;
  /** 單格背景，鍵是 "列,欄"（從 0 起）。只存老師設過的格子。 */
  cellBg?: Record<string, string>;
  /** 快速樣式。決定表頭、斑馬紋這類整體的底色規則，單格的 cellBg 蓋在它上面。 */
  preset?: TablePreset;
};

/** 表格的快速樣式。只有四種，老師要的多半是「看起來像一張表」，不是設計工具。 */
export type TablePreset = 'plain' | 'header' | 'zebra' | 'borderless';

export type WebBlock = BlockBase & {
  type: 'web';
  url: string;
  title: string;
  /**
   * 書籤是一張小卡片；嵌入是一個完整的網頁框；
   * qr 是課本印的 QR 碼（md 規格的 `@連結[](url){QR}`）。
   */
  presentation: 'bookmark' | 'embed' | 'qr';
  /** 是否已在畫布上選過呈現方式（網址連結／網頁內嵌）。剛插入畫布時為 false。 */
  chosen?: boolean;
};

/**
 * PDF。老師手上的學習單、講義多半就是 PDF，直接放進頁面比轉成圖片省事。
 * 編輯時不真的載入（理由同影片：非同步版面會攪亂量測），閱讀時交給
 * 瀏覽器內建的檢視器，翻頁是它的事。
 */
export type PdfBlock = BlockBase & {
  type: 'pdf';
  assetId: string | null;
  title: string;
  /** 預設翻到第幾頁 */
  page?: number;
};

/** 對話框。社會的課首情境圖、國文的角色對白都是真內容，不是裝飾。 */
export type DialogueBlock = BlockBase & {
  type: 'dialogue';
  speaker: string;
  text: string;
};

/** 頁尾參照，例如「配合習作第 24〜25 頁」。 */
export type ReferenceBlock = BlockBase & {
  type: 'reference';
  target: string;
  pages: string;
};

/**
 * 互動模組。版面上跨課重複出現、由系統產生的元件，
 * 例如國文頁側的朝代時間軸——它每一課都出現，只是反白的朝代不同。
 * 同時也是需求裡的「預留擴充空間」。
 */
export type ModuleBlock = BlockBase & {
  type: 'module';
  moduleKind: string | null;
  title?: string;
  /** 模組的參數，例如朝代時間軸要反白哪個朝代。原樣保留給模組自己解讀。 */
  params?: Record<string, string>;
};

/**
 * 題目。題型標籤（快篩訊息／瞄準文心／文意理解／作法探討）決定它在
 * 檢測站裡屬於哪一類，選項是結構化的，不是壓成一段的文字。
 */
export type QuestionBlock = BlockBase & {
  type: 'question';
  /** 題號，沿用教材上的編號。 */
  number: string;
  /** 題型標籤。沒有標的題目就是 undefined。 */
  questionType?: string;
  stem: InlineSpan[];
  options: { key: string; text: InlineSpan[] }[];
  /** 多選題。從題幹的「（多選題）」判斷。 */
  multiple: boolean;
};

export type Block =
  | TextBlock
  | ImageBlock
  | VideoBlock
  | AudioBlock
  | ShapeBlock
  | LineBlock
  | TableBlock
  | WebBlock
  | PdfBlock
  | DialogueBlock
  | ReferenceBlock
  | ModuleBlock
  | QuestionBlock;

export type BlockType = Block['type'];

// ── 流 ───────────────────────────────────────────────────
/**
 * 一頁的背景。掛在「那一頁的第一列」上，不掛在頁上——頁是算出來的，
 * 沒有東西可以掛。所以前面加了內容、這一列被推到下一頁時，背景跟著走。
 */
export type PageBackground = {
  /** 設計系統的語意色名，或直接的 CSS 色值。 */
  color?: string;
  /** 背景圖。鋪滿整頁，置中裁切。 */
  assetId?: string;
};

export type Column = {
  id: string;
  /** 佔該列寬度的百分比。同一列的總和恆為 100。 */
  widthPct: number;
  blocks: Block[];
};

export type Row = {
  id: string;
  /** 一到五欄（上限見 useRowDrag 的 MAX_COLUMNS）。 */
  columns: Column[];
  /**
   * 使用者自己放的換頁線：這一列一定從新的一頁開始，位置不隨內容移動。
   * 系統放的換頁線不存在資料裡——那是 paginate() 算出來的。
   */
  breakBefore: boolean;
  /**
   * 紙本原頁碼（md 規格的 `@頁[91]`）。
   *
   * ⚠️ 這是錨點，不是換頁線，兩者完全獨立。數位頁是 4:3、字級固定、
   * 間距放鬆，裝的資訊量跟紙本跨頁本來就不同，老師還會插補充、移圖片——
   * 數位頁與紙本頁不會一致，也不應該一致。
   *
   * 它的用途是查表：老師說「翻到 93 頁」時，找到 printPage 為 93 的列，
   * 再看它落在數位的第幾頁。一個紙本頁可以橫跨兩個數位頁，反之亦然。
   */
  printPage?: number;
  /** 這一列所在那一頁的背景。只有當這一列是該頁的第一列時才生效。 */
  pageBackground?: PageBackground;
};

// ── 整本設定 ─────────────────────────────────────────────
export type DocSettings = {
  /** 決定文字方向、版面配置與翻頁方向。整本一致，不能逐頁改。 */
  writingMode: 'horizontal' | 'vertical';
  /** 預設 4:3——橫置平板全部比 4:3 寬，4:3 能用滿垂直空間。 */
  aspectRatio: '4:3' | '16:9';
  /**
   * 整本的字級檔位，所有角色一起等比縮放。
   * 這是老師面對未知平板尺寸唯一的補償手段，不是裝飾性設定。
   */
  textScale: 'sm' | 'md' | 'lg';
  /**
   * 版型。目前只有流式（頁由內容流算出來）；自由排版是規劃中的模組，
   * 介面先列出來讓老師知道有這個方向，但不能選。未設定視同 'flow'。
   */
  /**
   * 版型。paged＝目前這套：內容是流、頁由系統自動切（預設）。
   * flow＝整篇連續捲動的流式排版（國文直排模組的方向），還在規劃。
   */
  layout?: 'paged' | 'flow';
};

/** 來自 md frontmatter，用於書目與查找，不影響排版。 */
export type DocMeta = {
  sourceId?: string;
  publisher?: string;
  stage?: string;
  grade?: string;
  term?: string;
  subject?: string;
  unit?: string;
  /** 紙本課本的頁碼範圍，例如 [90, 97]。 */
  printPageRange?: [number, number];
};

export type Doc = {
  id: string;
  title: string;
  settings: DocSettings;
  meta: DocMeta;
  rows: Row[];
  /** 注釋表。InlineSpan.footnoteRef 指向這裡的 id。 */
  footnotes: Footnote[];
  /**
   * 書與單元。MVP 的介面不做這兩層，欄位先留著，
   * 之後接上整本書的管理不需要改結構。
   */
  bookId: string | null;
  unitId: string | null;
};
