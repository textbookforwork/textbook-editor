import type { ImportResult } from './markdown';
import type {
  AudioBlock,
  Block,
  DialogueBlock,
  DocMeta,
  DocSettings,
  ImageBlock,
  InlineSpan,
  LineBlock,
  ModuleBlock,
  PageBackground,
  PdfBlock,
  PopupItem,
  ReferenceBlock,
  Row,
  ShapeBlock,
  TableBlock,
  TextBlock,
  TextRole,
  VideoBlock,
  WebBlock,
} from './types';

/**
 * 元件屬性的修補。
 *
 * 把各型別的欄位聯集起來再全部變成選填，所以送 { caption } 或
 * { url, presentation } 都能通過型別檢查，但送一個不存在的欄位名不行。
 * 型別對不對得起來由 patchBlock 的 blockType 再擋一次。
 */
export type BlockPatch = Partial<
  Omit<ImageBlock, 'type' | 'id' | 'popups'> &
    Omit<VideoBlock, 'type' | 'id' | 'popups'> &
    Omit<WebBlock, 'type' | 'id' | 'popups'> &
    Omit<PdfBlock, 'type' | 'id' | 'popups'> &
    Omit<AudioBlock, 'type' | 'id' | 'popups'> &
    Omit<DialogueBlock, 'type' | 'id' | 'popups'> &
    Omit<ReferenceBlock, 'type' | 'id' | 'popups'> &
    Omit<ModuleBlock, 'type' | 'id' | 'popups'> &
    Omit<ShapeBlock, 'type' | 'id' | 'popups'> &
    Omit<LineBlock, 'type' | 'id' | 'popups'> &
    Omit<TableBlock, 'type' | 'id' | 'popups'> &
    // 文字只開放排版欄位（字級、對齊、方向、框高）；內容與角色各有自己的動作
    Omit<TextBlock, 'type' | 'id' | 'popups' | 'spans' | 'role'>
>;

/**
 * 拖曳的落點只有兩種，因為版面沒有自由畫布：
 * - row：插進順序裡，自成一列、佔滿整寬
 * - column：跟旁邊的元件併成同一列的兩欄
 */
export type DropTarget =
  | { mode: 'row'; index: number }
  | {
      mode: 'column';
      rowId: string;
      side: 'left' | 'right';
      /**
       * 目標那一列只有一欄、元件沒佔滿時：原本那一欄併欄後留多少（%），新的一欄從它後面接起。
       * 由拖曳當下量畫面算出來（reducer 不知道元件實際多大）。沒有就平均分。
       */
      keepPct?: number;
      /** 原本那一欄的元件併欄後的 widthPct：欄變窄了，元件要佔得比較多，畫出來才一樣大。文字元件沒有這個。 */
      fitPct?: number;
    };

export type Action =
  | { type: 'setTitle'; title: string }
  | { type: 'setSettings'; patch: Partial<DocSettings> }
  /** 書目資料（出版社、年級、科目…）。老師在設定面板改，不是只能改 md。 */
  | { type: 'setMeta'; patch: Partial<DocMeta> }
  | { type: 'insertRow'; index: number; blocks: Block[] }
  /** 一次插入好幾列（例：PDF 匯入的每一頁各一列），只算一次復原。 */
  | { type: 'insertRows'; index: number; rows: Block[][] }
  /**
   * 匯入一份 md 的解析結果。
   *
   * 走 reducer 而不是直接換掉整份文件，匯入才會進復原堆疊——
   * 老師匯錯檔案時能一鍵退回，不必重編一課。
   */
  | { type: 'importDoc'; result: ImportResult }
  | { type: 'deleteRow'; rowId: string }
  /**
   * 一次刪掉一批列。
   *
   * 「刪頁」就是這個：頁是算出來的，沒有頁可刪，刪的是那一頁上的列。
   * 從上一頁接續下來的那一列屬於上一頁，呼叫端不該把它算進來。
   * 一個 id 都對不上就回傳原本的文件，不佔一次復原。
   */
  | { type: 'deleteRows'; rowIds: string[] }
  /**
   * 把一批列整組搬到某一列之前（null＝搬到最後），彼此的順序保留。
   *
   * 「拖頁排序」就是這個：把來源頁的列搬到目標頁第一列之前。
   * beforeRowId 不存在、或它自己也在搬的那批裡，就什麼都不做。
   */
  | { type: 'moveRows'; rowIds: string[]; beforeRowId: string | null }
  /**
   * 刪一個元件。它是那一欄裡唯一的元件時連欄一起拿掉，
   * 是那一列裡唯一的欄時連列一起拿掉——不留看不見的空殼。
   */
  | { type: 'deleteBlock'; blockId: string }
  | { type: 'moveRow'; rowId: string; target: DropTarget }
  /**
   * 把一欄從多欄的列裡搬出去。
   *
   * 沒有這個動作，兩塊併成兩欄之後就再也拆不開——因為握把是掛在
   * 「列」上的，搬的是整列。老師併錯了會卡住。
   */
  | { type: 'moveColumn'; rowId: string; columnId: string; target: DropTarget }
  | { type: 'setColumnWidths'; rowId: string; widths: number[] }
  | { type: 'setBreakBefore'; rowId: string; value: boolean }
  /** 這一列所在那一頁的背景。null 清掉。 */
  | { type: 'setPageBackground'; rowId: string; background: PageBackground | null }
  /**
   * 拖外框調尺寸。跟 patchBlock 分開是為了合併成一次復原——
   * 拖一下會連續送幾十個，每一個都佔一次復原的話 Cmd+Z 要按到天荒地老。
   * 兩個欄位都不給就是「回到預設尺寸」。
   */
  | { type: 'resizeBlock'; blockId: string; widthPct?: number; blockSize?: number }
  | { type: 'setText'; blockId: string; text: string }
  /**
   * 連同行內標記一起換掉整段。
   *
   * setText 只能寫純文字，會把注音、重點詞、注釋號洗掉；
   * 行內編輯走這一條，改一個字不會弄丟旁邊的 25 個注釋參照。
   */
  | { type: 'setSpans'; blockId: string; spans: InlineSpan[] }
  /** 對選取範圍加上或拿掉一種行內標記。範圍是字元位置。 */
  | { type: 'toggleMark'; blockId: string; start: number; end: number; mark: 'bold' | 'keyword'; on: boolean }
  | { type: 'setTextRole'; blockId: string; role: TextRole }
  /**
   * 改元件的屬性（圖說、網址、寬度…）。
   *
   * blockType 是給 reducer 對照用的：id 過期或指到別種元件時就整個不動，
   * 免得把 { url } 蓋到一段文字上。
   */
  | { type: 'patchBlock'; blockId: string; blockType: Block['type']; patch: BlockPatch }
  /** forWords：要連到幾個字上的補充，自成一組，不受「一個元件一種」的限制（種類由面板管）。 */
  | { type: 'addPopup'; blockId: string; item: PopupItem; forWords?: boolean }
  | { type: 'updatePopup'; blockId: string; item: PopupItem }
  | { type: 'removePopup'; blockId: string; popupId: string }
  | { type: 'reorderPopups'; blockId: string; from: number; to: number };

export type ActionType = Action['type'];

/** 這些動作連續發生時會合併成一次復原，否則打字每個字都要按一次 Cmd+Z。 */
export const COALESCING: ActionType[] = [
  'setMeta',
  'setText',
  'setSpans',
  'setTitle',
  'setColumnWidths',
  'resizeBlock',
];

export const rowOf = (rows: Row[], rowId: string) => rows.find((r) => r.id === rowId) ?? null;
