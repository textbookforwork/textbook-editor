// rect of a substring inside root selector (skips rt)
export async function textPoint(p, rootSel, needle, k = 0) {
  return p.evaluate(({ rootSel, needle, k }) => {
    const root = document.querySelector(rootSel);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement.closest('rt') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    let n; const nodes = []; let text = '';
    while ((n = w.nextNode())) { nodes.push([n, text.length]); text += n.data; }
    const at = text.indexOf(needle); if (at < 0) return null;
    const pos = at + k;
    const [node, off] = nodes.filter(([nd, o]) => o <= pos).pop();
    const r = document.createRange(); r.setStart(node, pos - off); r.setEnd(node, pos - off + 1);
    const b = r.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
  }, { rootSel, needle, k });
}
// mark an element matching a selector-evaluating fn
export async function ringEval(p, fnSrc) {
  await p.evaluate((fnSrc) => { const els = (new Function('return ' + fnSrc))()(); els.filter(Boolean).forEach(el => { el.setAttribute('data-ring','1'); el.style.outline = '4px solid #FF854A'; el.style.outlineOffset = '4px'; }); }, fnSrc);
}
