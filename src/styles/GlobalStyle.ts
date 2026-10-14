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
     * 段號：段首第一格的方框字（照國文 prototype）。畫成 ::before，不進文字內容，
     * 游標與「第幾個字」的換算都碰不到它。框的大小固定，不隨號碼變——
     * 量測探針只要知道「是段落」就量得準，不必知道第幾段。
     * 兩位數在直排裡用直中橫擠進同一格。
     */
    &[data-pno]::before {
      content: attr(data-pno);
      display: inline-block;
      box-sizing: border-box;
      inline-size: 1.4em;
      block-size: 1.4em;
      /* 框後空一個全形字：這裡的 em 是框自己縮成 0.7 的字級，除回去才是內文的一個字寬 */
      margin-inline-end: calc(1em / 0.7);
      border: 1.5px solid currentColor;
      border-radius: 4px;
      font-size: 0.7em;
      font-weight: 600;
      line-height: calc(1.4em - 3px);
      text-align: center;
      text-indent: 0;
      vertical-align: middle;
      text-combine-upright: all;
      transition: background 0.15s, color 0.15s;
    }
    /* 直排用 middle 會往右偏約 0.2 字（它對齊的是西文的 x 字高）；用 baseline 才落在字欄正中 */
    [data-vertical] &[data-pno]::before,
    &[data-vertical][data-pno]::before { vertical-align: baseline; }
    &[data-horizontal][data-pno]::before { vertical-align: middle; }
    &[data-pno-on]::before {
      background: ${(p) => p.theme.text.primary};
      border-color: ${(p) => p.theme.text.primary};
      color: ${(p) => p.theme.surface.raised};
    }

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
    /*
     * 只有底線時畫成設計系統的深綠（border.accent，跟啟用狀態同一個綠）。
     * 跟刪除線、上線疊在一起時，CSS 一個元素只能有一個裝飾線顏色，就維持字色。
     */
    [data-u]:not([data-s]):not([data-o]) { text-decoration-color: ${(p) => p.theme.border.accent}; }
    /*
     * 標成生字、語詞、句子的字已經有側邊點點線，不再畫底線（兩條線並排分不出哪條能點）。
     * 刪除線、上線照留。
     */
    [data-note][data-u] { text-decoration-line: none; }
    [data-note][data-u][data-s] { text-decoration-line: line-through; }
    [data-note][data-u][data-o] { text-decoration-line: overline; }
    [data-note][data-u][data-s][data-o] { text-decoration-line: line-through overline; }

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
     * 標了段落說明（旨修句問）的幾個字：旁邊一條點線，跟國文 prototype 一樣。
     * 畫在 block 方向的邊框上——行內元素這個方向的邊框不撐行高，量測與畫面一致。
     * 橫排畫在字下，直排畫在字右（下面的直排規則）。
     */
    [data-note] {
      border-block-end: 2px dotted ${(p) => p.theme.text.tertiary};
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
      cursor: pointer;
    }
    /*
     * 帶注音的字是一個橫的小盒子（見上面的 ruby），邊框會畫錯邊、還會撐開它。
     * 改用背景畫點線：不佔空間。橫排畫在字下，直排的規則在下面（畫在字的右緣、注音的左邊）。
     */
    ruby[data-note] {
      border: none;
      background-image: linear-gradient(to right, ${(p) => p.theme.text.tertiary} 50%, transparent 0);
      background-size: 4px 2px;
      background-repeat: repeat-x;
      background-position: 0 100%;
    }

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

  /*
   * 直排的注音字：字是一個橫的小盒子，注音欄原本並排在字的右邊、一起佔寬度，
   * 盒子又是靠右對齊，結果字被往左推、離開整欄的中線；行高沿用整段的 1.9 倍，前後也各多空半個字。
   * 直排時改成：盒子只有字本身（行高 1、對齊基線，跟一般字落在同一條中線），
   * 注音欄浮在字的右邊、伸進欄與欄之間的空隙，不佔位置。
   */
  [data-vertical] .ds-rich:not([data-horizontal]) ruby,
  .ds-rich[data-vertical] ruby {
    position: relative;
    line-height: 1;
    vertical-align: baseline;
  }
  [data-vertical] .ds-rich:not([data-horizontal]) ruby > rt,
  .ds-rich[data-vertical] ruby > rt {
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
  /*
   * 直排：點點線畫在字的左側（block-end 在直排就是左邊），跟底線同一側——標了的字不畫底線，不會疊在一起。
   * 注音字的點點線另外畫一條，不佔位置（佔了會把字推離中線），位置對齊一般字的邊框：
   * 一般字的邊框在字型框外緣，比字面寬出約 0.225 字，再加上邊框本身 2px。
   */
  [data-vertical] .ds-rich:not([data-horizontal]) ruby[data-note],
  .ds-rich[data-vertical] ruby[data-note] {
    border: none;
    background: none;
  }
  [data-vertical] .ds-rich:not([data-horizontal]) ruby[data-note]::before,
  .ds-rich[data-vertical] ruby[data-note]::before {
    content: '';
    position: absolute;
    left: calc(-0.225em - 2px);
    top: 0;
    bottom: 0;
    width: 2px;
    background-image: linear-gradient(to bottom, ${(p) => p.theme.text.tertiary} 50%, transparent 0);
    background-size: 2px 4px;
  }
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
