import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  html, body, #root { height: 100%; }

  /*
   * 捲軸全站同一套，安靜的設計：6px 細條、沒有軌道，平常看不見，
   * 滑鼠移進那一塊、或正在捲動時（scrollReveal.ts 掛 data-scrolling）才淡淡出現；
   * 內容沒有多到要捲時就什麼都沒有。
   * 不要在元件裡另寫 scrollbar-width：Chrome 有設它就會忽略這裡的 ::-webkit-scrollbar。
   */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-thumb { background: transparent; border-radius: 3px; }
  *:hover::-webkit-scrollbar-thumb,
  [data-scrolling]::-webkit-scrollbar-thumb { background: ${(p) => p.theme.border.default}; }

  body {
    margin: 0;
    background: ${(p) => p.theme.surface.sunken};
    color: ${(p) => p.theme.text.primary};
    font-family: ${(p) => p.theme.typography.fontSans};
    font-size: ${(p) => p.theme.typography.bodyLgSize};
    line-height: ${(p) => p.theme.typography.bodyLgLineHeight};
    -webkit-font-smoothing: antialiased;
  }

  /*
   * 表單元素不繼承字體。瀏覽器給它們自己的預設字（Mac 上是 Arial）與
   * 13.33px，中文因此掉回系統字。縮圖、評論卡片、圖片替代文字、徽章
   * 都包在 <button> 裡才能點，少了這行，那些地方的字體和字級就跟
   * 畫布對不起來——同一份內容在縮圖裡和在頁面上長得不一樣。
   */
  button, input, select, textarea { font: inherit; }

  /* 只有鍵盤操作才顯示 focus 環，滑鼠點擊不觸發 */
  :focus-visible {
    outline: ${(p) => p.theme.border.widthFocus} solid ${(p) => p.theme.action.ghostFocusRing};
    outline-offset: 2px;
  }
  :focus:not(:focus-visible) { outline: none; }

  /*
   * 行內標記的樣式。
   *
   * 放在全域而不是 styled-component，因為量測用的隱形探針、編輯區、
   * 預覽、檢視台都要長得一模一樣——注音會撐高行高，四邊只要有一邊
   * 少了這段 CSS，量到的高度就跟畫出來的不一致，內容會被切掉。
   * 這跟 blockSizing 是同一條原則：量測與渲染共用同一個來源。
   */
  .ds-rich {
    white-space: pre-wrap;
    word-break: break-word;

    /*
     * 注音照課本的排法：每個字的右邊一條直的注音欄，橫排、直排都一樣。
     * 不用瀏覽器內建的 ruby 排版——它把注音當一串字橫著攤在字的上方（直排時攤在旁邊、
     * 拉得跟字一樣長），調號也被當成一般的字排進去。
     * 改成：字與注音欄並排（inline-flex，固定橫向）；注音欄的符號直著疊，
     * 調號掛在欄的右側、對齊最後一個符號；輕聲的點在欄頂（zhuyinRt 已經排到最前面）。
     */
    ruby {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      writing-mode: horizontal-tb;
      vertical-align: top;
      text-indent: 0;
    }

    rt {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      /* 字的三成大；內文字小時至少 8px，不然注音糊成一團（注音欄會比字高一點，行距跟著撐開） */
      font-size: max(0.3em, 8px);
      line-height: 1;
      margin-inline-start: 0.1em;
      /* 調號掛在右邊，先把位置留出來，不然會疊到下一個字 */
      padding-inline-end: 0.55em;
      color: ${(p) => p.theme.text.secondary};
      user-select: none;
      text-align: center;
    }

    rt [data-zy] {
      writing-mode: vertical-rl;
      text-orientation: upright;
      letter-spacing: 0;
    }

    rt [data-tone] {
      position: absolute;
      inset-inline-start: calc(100% - 0.6em);
      bottom: 0.45em;
      font-size: 0.9em;
      line-height: 1;
    }

    /* 重點詞（data-kw）只留資料不畫樣式：功能已從工具列拿掉，生字表與搜尋日後仍靠這個標記 */

    [data-bold] { font-weight: 700; }
    [data-color='accent'] { color: ${(p) => p.theme.text.accent}; }
    [data-color='secondary'] { color: ${(p) => p.theme.text.secondary}; }
    /* 任意色值與字體寫在行內 style（spansToHtml 產生），這裡不用列 */

    /*
     * 底線、刪除線、上線走 text-decoration，三條可以同時出現，
     * 所以組合要一一列出——text-decoration-line 是一個屬性，後者會蓋掉前者。
     * 直排時瀏覽器會把底線畫到 line-under（左側）、上線畫到 line-over（右側），
     * 跟數學線段的習慣一致，底下另外釘死 text-underline-position 以免各家不同。
     */
    [data-u] { text-decoration-line: underline; }
    [data-s] { text-decoration-line: line-through; }
    [data-o] { text-decoration-line: overline; }
    [data-u][data-s] { text-decoration-line: underline line-through; }
    [data-u][data-o] { text-decoration-line: underline overline; }
    [data-s][data-o] { text-decoration-line: line-through overline; }
    [data-u][data-s][data-o] { text-decoration-line: underline line-through overline; }
    [data-u], [data-s], [data-o] {
      text-decoration-thickness: 1.5px;
      text-underline-offset: 0.12em;
      text-decoration-skip-ink: none;
    }

    ruby rt {
      font-weight: 400;
      text-decoration: none;
    }

    /*
     * 掛了補充的那幾個字。用底色不用底線：底線已經給底線樣式用了，
     * 疊在一起分不出哪個能點。底色不改變尺寸，量測與畫面一致。
     * 點擊行為在 BlockView（閱讀模式）接，編輯時只是看得到。
     */
    [data-pop] {
      background: ${(p) => p.theme.brand.primaryTint};
      border-radius: 3px;
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
      cursor: pointer;
    }
    [data-pop]:hover { background: ${(p) => p.theme.brand.primary}; }

    /*
     * 注釋號是一個原子，跟注音同一類：看得到、刪得掉，但編不進去。
     * 游標計算會跳過它（見 editor/caret.ts），所以行內標記的範圍
     * 不會因為課文裡有 25 個編號而整段位移。
     */
    /*
     * 目前不顯示：注釋還沒有可以點開的地方（頁底注釋帶、點注釋號彈出都還沒做），
     * 只露一個點了沒反應的數字會讓人以為壞掉。資料照存（spans 的 footnoteRef 與文件層的 footnotes），
     * 做好之後把這行拿掉、改回原本的樣式即可。量測與畫面共用這份 CSS，分頁不會不一致。
     */
    sup[data-fn] {
      display: none;
    }
  }

  /* 直排：底線在左、上線在右（橫排的「上」到直排是右側） */
  [data-vertical] .ds-rich [data-u],
  .ds-rich[data-vertical] [data-u] {
    text-underline-position: left;
  }
  /*
   * 直排頁裡被單段轉回橫排的段落（.ds-rich[data-horizontal]）：
   * 上面兩條直排規則對它不成立，要退回橫排的畫法。
   */
  [data-vertical] .ds-rich[data-horizontal] [data-u] {
    text-underline-position: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }

  /*
   * 逐句聚焦（閱讀模式，見 viewer/SentenceFocus.tsx）。
   *
   * 點一句之後整頁的字先退成第三級色，被點的那一句再用 ::highlight
   * 拉回主要文字色——高亮靠 CSS Custom Highlight API 畫在文字範圍上，
   * 不改 DOM。這是刻意的：量測與渲染共用同一份 HTML，若為了高亮把句子
   * 包進 <span>，量到的與畫出來的就可能不一致。
   *
   * 直排時注音與注釋號是 .ds-rich 的子元素，跟著一起變淡；
   * 它們本來就依附在字旁邊，不需要單獨處理。
   */
  .sentence-dimmed .ds-rich {
    color: ${(p) => p.theme.text.tertiary};
  }
  ::highlight(sentence-focus) {
    color: ${(p) => p.theme.text.primary};
  }
  ::highlight(sentence-mark) {
    background-color: ${(p) => p.theme.brand.primaryTint};
  }
`;
