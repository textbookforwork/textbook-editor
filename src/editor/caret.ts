/**
 * 游標與選取範圍的位置，用「第幾個字」表示。
 *
 * DOM 的 Selection 講的是「哪個節點的第幾個位置」，但資料模型講的是
 * 「整段的第幾個字」。行內標記讓兩者不一致——一段話可能由五個 <span>
 * 組成，DOM 位置沒辦法直接拿來切 spans。
 *
 * 注音的 <rt> 與注釋號的 <sup> 都不算字：它們是標在字旁邊的記號，
 * 不是內文的一部分。少扣一個，套用標記時整段的位置就會位移，標到錯的字上。
 */

/** 走訪內文的文字節點，跳過注音與注釋號。 */
export function textNodes(root: HTMLElement): Text[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) =>
      n.parentElement?.closest('rt, [data-fn]')
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT,
  });
  const out: Text[] = [];
  let n = walker.nextNode();
  while (n) {
    out.push(n as Text);
    n = walker.nextNode();
  }
  return out;
}

/** 計算某個節點在排版中的有效純文字字元長度（排除注音 <rt> 與注釋號 [data-fn]）。 */
function textLengthOf(node: Node): number {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.parentElement?.closest('rt, [data-fn]') ? 0 : (node.textContent?.length ?? 0);
  }
  if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node as HTMLElement;
    if (el.closest('rt, [data-fn]')) return 0;
    let sum = 0;
    for (const child of Array.from(el.childNodes)) {
      sum += textLengthOf(child);
    }
    return sum;
  }
  return 0;
}

/** DOM 位置 → 第幾個字。 */
export function offsetOf(root: HTMLElement, node: Node, offset: number): number {
  let count = 0;
  for (const t of textNodes(root)) {
    if (t === node) return count + offset;
    count += t.length;
  }
  // 落在元素節點上（例如整段被選起來或邊界落在元素節點），用它前面的有效字數計算
  if (node === root) {
    let seen = 0;
    for (let i = 0; i < offset && i < root.childNodes.length; i += 1) {
      seen += textLengthOf(root.childNodes[i]);
    }
    return seen;
  }
  if (root.contains(node)) {
    let prefix = 0;
    for (let i = 0; i < offset && i < node.childNodes.length; i += 1) {
      prefix += textLengthOf(node.childNodes[i]);
    }
    let beforeNode = 0;
    for (const t of textNodes(root)) {
      if (node.contains(t)) break;
      const pos = node.compareDocumentPosition(t);
      if (pos & Node.DOCUMENT_POSITION_PRECEDING) {
        beforeNode += t.length;
      } else {
        break;
      }
    }
    return beforeNode + prefix;
  }
  return count;
}

/** 第幾個字 → DOM 位置。超出結尾就放在最後。 */
export function locate(root: HTMLElement, offset: number): { node: Node; offset: number } {
  let left = offset;
  const nodes = textNodes(root);
  for (const t of nodes) {
    if (left <= t.length) return { node: t, offset: left };
    left -= t.length;
  }
  const last = nodes[nodes.length - 1];
  return last ? { node: last, offset: last.length } : { node: root, offset: 0 };
}

/** 目前游標在第幾個字。沒有游標或游標不在這裡就是 null。 */
export function caretOffset(root: HTMLElement): number | null {
  const sel = document.getSelection();
  if (!sel || sel.rangeCount === 0) return null;
  const r = sel.getRangeAt(0);
  if (!root.contains(r.startContainer)) return null;
  return offsetOf(root, r.startContainer, r.startOffset);
}

/** 把游標放回第幾個字。 */
export function placeCaret(root: HTMLElement, offset: number): void {
  const sel = document.getSelection();
  if (!sel) return;
  const { node, offset: o } = locate(root, offset);
  const range = document.createRange();
  range.setStart(node, o);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}

/**
 * 把 [start, end) 這一段字重新選起來。
 *
 * 套用行內標記之後 DOM 會整段重畫，原本的選取跟著消失；
 * 只放回游標的話膠囊就會收掉，老師想接著再套第二種樣式得重選一次。
 */
export function selectRange(root: HTMLElement, start: number, end: number): void {
  const sel = document.getSelection();
  if (!sel) return;
  const a = locate(root, start);
  const b = locate(root, end);
  const range = document.createRange();
  range.setStart(a.node, a.offset);
  range.setEnd(b.node, b.offset);
  sel.removeAllRanges();
  sel.addRange(range);
}

/**
 * 目前選了哪一段。折疊（只有游標、沒有選字）時回傳 null——
 * 浮動膠囊只在真的選了字的時候出現。
 */
export function selectionRange(root: HTMLElement): { start: number; end: number } | null {
  const sel = document.getSelection();
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return null;
  const r = sel.getRangeAt(0);
  if (!root.contains(r.startContainer) || !root.contains(r.endContainer)) return null;
  const start = offsetOf(root, r.startContainer, r.startOffset);
  const end = offsetOf(root, r.endContainer, r.endOffset);
  return start === end ? null : { start: Math.min(start, end), end: Math.max(start, end) };
}
