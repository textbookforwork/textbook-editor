/**
 * 課堂模組（legacy.js）要用到編輯器的東西時，從這裡拿：真的課本頁、補充資源、目次、換畫面。
 * 由 bridge.tsx 在載入時填進來；放在獨立的檔，兩邊互相引用才不會繞圈。
 */
export const BRIDGE = {
  BookPage: () => null,
  Supplements: () => null,
  outline: () => [],
  goShelf: () => {},
  canExit: () => false,
  exit: () => {},
  exitLabel: () => '返回編輯',
  subject: () => 'other',
  openClassBook: () => {},
};
