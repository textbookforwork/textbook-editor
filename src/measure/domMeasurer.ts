import { blockBox } from '../model/blockSizing';
import { GAP } from '../model/spacing';
import type { Measurer } from '../model/paginate';
import type { Block, DocSettings, TextBlock } from '../model/types';
import { TEXT_SCALE, roleStyle, textFlowStyle } from '../styles/roles';
import { spansToHtml } from '../model/inlineDom';
// 探針裡的表格跟畫面上的 <table> 出自同一組樣式函式，量到的才等於畫出來的
import { buildTableElement } from '../components/blocks/TableBlockView';

/**
 * 真實量測：把區塊放進一個隱形容器，用瀏覽器自己的排版結果回答高度。
 *
 * 為什麼不用估算：中文的斷行、標點擠壓、注音、直排的行高，
 * 沒有一項算得準。唯一可靠的來源是瀏覽器自己排一次。
 *
 * 容器完全套用與真實頁面相同的 token，所以量到的就是畫出來的。
 */

export type DomMeasurerOptions = {
  settings: Pick<DocSettings, 'writingMode' | 'textScale'>;
  /** 掛載隱形容器的地方。預設是 document.body。 */
  host?: HTMLElement;
};

export type DomMeasurer = Measurer & { dispose(): void };

export function createDomMeasurer(opts: DomMeasurerOptions): DomMeasurer {
  const vertical = opts.settings.writingMode === 'vertical';
  const scale = TEXT_SCALE[opts.settings.textScale];
  const host = opts.host ?? document.body;

  const stage = document.createElement('div');
  // 移出畫面而不是 display:none——隱藏的元素量不到排版結果
  stage.setAttribute('aria-hidden', 'true');
  stage.style.cssText = [
    'position:absolute',
    'top:0',
    'left:-99999px',
    'visibility:hidden',
    'pointer-events:none',
    'contain:strict',
  ].join(';');
  host.appendChild(stage);

  /**
   * 確保探針還在文件裡。
   *
   * 離開文件的元素量出來的每一個尺寸都是 0，而 0 會被當成「放得下」，
   * 於是所有內容都不切頁、整份文件的頁數只剩下標題的換頁在撐，
   * 畫面上則是內容直接溢出頁面——而且錯的 0 還會被寫進量測快取。
   *
   * 探針之所以會離開文件，是因為 dispose() 可能在還要繼續用的時候被呼叫
   * （React 的 StrictMode 會 mount → cleanup → mount 跑一次）。與其要求
   * 每個呼叫端都不要提早 dispose，不如讓量測本身自己保證前提成立。
   */
  const ensureAttached = () => {
    if (!stage.isConnected) host.appendChild(stage);
  };

  const probe = document.createElement('div');
  // 書寫方向與 data-vertical 每次量測時依那一段設定（見 layoutText）：
  // 整本是橫排，某一段仍可能是直排
  // 跟編輯區與預覽同一個 class：注音撐高的行高在這裡也要算進去，
  // 否則帶注音的段落每一行都會少量一截
  probe.className = 'ds-rich';
  stage.appendChild(probe);

  /** block 軸的尺寸：橫排量高、直排量寬。 */
  const blockAxis = (rect: { width: number; height: number }) =>
    vertical ? rect.width : rect.height;

  function layoutText(block: TextBlock, inlineSize: number, maxBlockSize: number) {
    ensureAttached();
    // 字級覆寫跟畫面走同一個函式，量到的才是畫出來的
    // 單段覆寫書寫方向：盒子的尺寸規則跟 BlockView 共用（textFlowStyle）；直排的內文預設字級不同，先算方向
    const flow = textFlowStyle(block, { inlineSize, maxBlockSize, vertical });
    const s = roleStyle(block.role, scale, block.fontSize, block.lineHeight, flow.vertical);
    probe.style.fontSize = s.fontSize;
    probe.style.lineHeight = s.lineHeight;
    probe.style.fontWeight = s.fontWeight;
    probe.style.fontFamily = s.fontFamily;
    probe.style.textAlign = block.align ?? '';
    probe.style.writingMode = flow.vertical ? 'vertical-rl' : 'horizontal-tb';
    // 直排的著重線與底線畫在另一邊，會影響行寬——探針也要掛同一個記號
    if (flow.vertical) probe.dataset.vertical = 'true';
    else delete probe.dataset.vertical;
    if (flow.flipped && !flow.vertical) probe.dataset.horizontal = 'true';
    else delete probe.dataset.horizontal;
    // 段號佔段首一格，框的大小固定，掛什麼號碼量起來都一樣
    if (block.paragraph) probe.dataset.pno = '一';
    else delete probe.dataset.pno;
    probe.style.maxWidth = '';
    probe.style.maxHeight = '';
    probe.style.overflow = '';
    if (flow.flipped) {
      Object.assign(probe.style, flow.style);
    } else if (vertical) {
      // inline 軸＝文字行進方向：橫排是寬，直排是高
      probe.style.height = `${inlineSize}px`;
      probe.style.width = 'max-content';
    } else {
      probe.style.width = `${inlineSize}px`;
      probe.style.height = 'auto';
    }
    // 用與畫面相同的 HTML，不是攤平的純文字——注音與注釋號會影響排版
    probe.innerHTML = spansToHtml(block.spans) || '&#8203;';
    return probe;
  }

  return {
    blockSize(block: Block, inlineSize: number, maxBlockSize: number): number {
      if (block.type === 'text') {
        const el = layoutText(block, inlineSize, maxBlockSize);
        // 不夾在一頁之內。夾住的話，一段比整頁還長的課文會量成
        // 「剛好等於一頁」，分頁器就認為它放得下，整段塞進去然後溢出，
        // 而且永遠不會觸發切頁。放不下要由 paginate 決定怎麼處理。
        // （跟整本不同向的段落例外：它本來就是固定高的盒子，量到的就是那個盒子，
        //   textFlowStyle 已經把它夾在一頁之內。）
        return blockAxis(el.getBoundingClientRect());
      }
      ensureAttached();
      // 非文字區塊走共用的尺寸規則——渲染端用的是同一個函式，
      // 所以量到的一定等於畫出來的。
      const box = blockBox(block, { inlineSize, maxBlockSize, vertical });
      if (!box) return 0;

      if (block.type === 'table' && !vertical) {
        // 表格跟文字一樣真的放進探針量：格子裡的字會換行，列數乘常數算不出高度。
        // 寬仍由 blockBox 給（跟渲染同一個數字），高由內容決定。
        // 直排的表格不在範圍內，維持 blockBox 的固定尺寸。
        probe.style.width = `${inlineSize}px`;
        probe.style.height = 'auto';
        // 用 DOM API 建，不拼 HTML 字串：顏色是老師可輸入的值，拼字串會有注入的風險
        probe.replaceChildren(buildTableElement(block, box.inlineSize, scale));
        const el = probe.firstElementChild as HTMLElement | null;
        const size = el ? el.getBoundingClientRect().height : box.blockSize;
        // 這裡夾在一頁之內是對的，跟文字相反：文字放不下由 paginate 切行，
        // 表格切不開，比一頁高只能截斷——渲染端也用同一個上限裁切並提示。
        return Math.min(size, maxBlockSize);
      }

      // 圖說在有開啟時會佔掉版面，量測必須含進去。
      // 間距用「附屬」那一階——圖與它的圖說是同一件事。
      // PDF 的標題畫在同一個位置、同一種字，也一樣要算。
      // 影片標題改在播放器內部浮現，不佔外部版面。
      const captionText =
        block.type === 'image' && (block.hasCaption ?? (block.caption.trim().length > 0))
          ? (block.caption || '圖說')
          : block.type === 'pdf'
            ? block.title
            : '';
      if (captionText) {
        const caption = layoutText(
          // blockSize 是這張圖自己的高度，不是圖說的，不能一起帶過去
          { ...block, type: 'text', role: 'caption', spans: [{ text: captionText }], blockSize: undefined },
          inlineSize,
          maxBlockSize
        );
        const captionSize = blockAxis(caption.getBoundingClientRect());
        return box.blockSize + GAP.attached + captionSize;
      }
      return box.blockSize;
    },

    /**
     * 每一行的 block 軸尺寸。用 Range 取行框——瀏覽器對每個行框
     * 各回一個 rect，這是唯一能拿到真實斷行位置的方法。
     */
    textLineSizes(block: TextBlock, inlineSize: number): number[] {
      // 切頁只對跟整本同向的段落發生（paginate 的 splittableTextOf），
      // 所以這裡不會拿到覆寫方向的段落；maxBlockSize 給一個不會夾住的值
      const el = layoutText(block, inlineSize, Number.POSITIVE_INFINITY);
      if (!el.firstChild) return [];

      // 選整個容器而不是第一個子節點：帶行內標記的段落由多個節點組成，
      // 只選第一個會漏掉後面的行
      const range = document.createRange();
      range.selectNodeContents(el);
      const rects = Array.from(range.getClientRects()).filter(
        (r) => r.width > 0 && r.height > 0
      );
      range.detach?.();

      if (rects.length === 0) {
        return [blockAxis(el.getBoundingClientRect())];
      }
      return rects.map(blockAxis);
    },

    dispose() {
      stage.remove();
    },
  };
}
