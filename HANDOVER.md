# 交接說明

給接手這份程式碼的人。**先讀這一份，再讀 `CLAUDE.md`**（動手改的時候要遵守的架構規則）。

## 一、這是什麼

老師自編數位教材的編輯器。老師匯入或編寫內容，學生在閱讀模式看到同樣的頁面。
目標是**完全取代**既有自編器（Notion「V1+ Prd」那一套需求），而且比它好。

**核心只有一句：內容是一條連續的流，頁是算出來的。**
資料裡沒有「第幾頁」也沒有 x / y 座標；元件的位置只有「在流裡的第幾列」「那一列怎麼分欄」，
頁由 `paginate()` 依可用空間即時切出來。目次、跳轉、當頁背景存的都是 rowId，不是頁碼。

## 二、來歷

分頁引擎、資料結構、量測、拖曳與第一版介面是 Mika 寫的（合作到 2026-09）。
她的原始交接與當時的架構取捨整份留在 `projects/V1/Mika交接說明.md`——
那裡的「刻意不做」「一條沒有例外的規則」是她 MVP 階段的判斷，2026-10-13 起陸續被推翻，
改核心前先去讀她的理由，再決定怎麼推翻。

## 三、先跑起來

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # tsc -b
npm run test       # vitest，排版引擎的正確性靠這個把關
npm run inspect    # 餵真教材進引擎，把算出來的頁印成文字
npm run tokens     # design/tokens.raw.txt → tokens.css + theme.ts
npm run icons      # design/icons/*.svg → icons.generated.ts
```

## 四、程式碼在哪

```
src/
  model/      純資料與純函式，不碰 React 與 DOM（types、paginate、reducer、history、markdown、spans、snap、clipboard…）
  measure/    真實量測：把元件放進隱形探針問瀏覽器
  hooks/      useEditor（狀態）、usePages（分頁）、useZoom（縮放）
  editor/     編輯用：頂部列、側欄縮圖與目次、浮動膠囊、外框把手、插入面板、媒體庫、當頁背景、快捷鍵、儲存
  viewer/     閱讀用：補充的泡泡與視窗、補充資料面板、逐句聚焦
  components/ 元件的呈現（BlockView 與 blocks/）
design/       token 與圖示的唯一來源（從 Figma 匯出）
```

## 五、現在的規則（跟 Mika 版不同的地方）

- **補充**：一個元件掛一種、可以多個。閱讀時沒有角標，點元件本身打開；圖片、影片、網頁、大彈窗開大視窗，文字、聲音、跳轉彈泡泡，多項時泡泡裡是縮圖卡或列。細節見 CLAUDE.md〈Pop-up〉。
- **課文的點按（閱讀模式）**：第一下點段落裡任何地方＝選段（其他段變淡、右下角膠囊出現段的旨修句問補）；
  段落選著時再點：一般的字＝聚焦那一句；標成句子的字＝聚焦整個標記，膠囊換成那一句的旨修句問補（位置不變）；
  生字詞＝字旁彈出註釋，連到這幾個字的補充接在註釋底下。點空白處或 Esc 全部取消。
  第一下就算點在生字詞上也只選段。不是段落的文字（標題等）沒有段這一層，點一下就聚焦那一句。
  規則在 `reader/ReaderMode.tsx` 的 decide。
- **尺寸**：非文字元件一律拖外框調尺寸（`widthPct` 佔欄寬比例、`blockSize` 頁座標絕對值），拖到 ¼ ⅓ ½ ⅔ 滿欄會吸附。沒有「大中小」。
- **換頁線**：不分手動／自動，只有併得回去的才有「可合併」。
- **空白處**：點＝取消選取或打開插入面板；hover＝最近的縫隙浮現「線＋加號」。每頁最後一列的下方都有插入點。
- **章節**：全系統講「章、節、標題、小標」，不講「課」。
- **顏色與字體**：行內可以自由選色、換字體；字級跟著層級走，層級是無障礙的依據。
- **品牌色**：Lime（#F0FF62），token 已照 Figma 同步；啟用態用淡 Lime 底、深 Lime 字。

## 六、真的、假的

| 項目 | 現況 |
|---|---|
| 上傳的圖片／影片／聲音／PDF | 存成瀏覽器的 object URL，重新整理就沒了；媒體庫列的是這次分頁的上傳 |
| 儲存 | 存 localStorage（`editor/persist.ts`），自動存＋手動存；接真的 API 換那一檔 |
| 共享、封面 | 狀態存 localStorage，沒有真的書櫃 |
| AI 搜尋、AI 生成圖片 | 介面有、模型沒有，按下去會說明原型未接 |
| 網頁能否頁內嵌入 | `embeddable` 恆為 false（要看對方 X-Frame-Options，是伺服器端的事），所以一律提示「不支援預覽」 |

## 七、加一種新元件

1. `model/types.ts` 的 `Block` union 加一支
2. `model/registry.ts` 加一筆
3. `model/blockSizing.ts` 給它尺寸規則
4. `components/blocks/` 加呈現元件，在 `BlockView` 的 switch 接上（漏了會編譯失敗）
5. 要能從面板插入：`InsertPanel` 的 TILES 與 `RowView.blockFor`；要能拖外框：`ResizeHandles.resizeModeOf`

## 八、版權

範例教材都是自製的（「星星的世界」與〈木蘭詩〉正文，古文沒有著作權），不放出版社的真實課文。
公開版在 textbookforwork 帳號的 `textbook-editor`，由這裡整理副本出去（說明文件拿掉了內部人名與路徑）。
