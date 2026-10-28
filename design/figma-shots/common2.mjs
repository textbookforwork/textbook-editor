export async function breaks(p) {
  return p.evaluate(() => {
    const pgs = document.querySelectorAll('[data-page-index]');
    let stage = pgs[0].parentElement;
    while (stage && stage.children.length < pgs.length) stage = stage.parentElement;
    const out = [];
    [...stage.children].forEach((slot, i) => {
      if (slot.children.length < 2) return;
      const f = slot.firstElementChild;
      const btn = f.querySelector(':scope > button');
      const ln = btn ? f.firstElementChild : f;
      f.setAttribute('data-brk', i);
      const r = f.getBoundingClientRect();
      out.push({ i, style: getComputedStyle(ln).borderTopStyle, merge: !!btn, y: Math.round(r.top) });
    });
    return out;
  });
}
