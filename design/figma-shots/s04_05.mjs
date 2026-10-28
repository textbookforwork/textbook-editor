import { start, login, makeCopy, ring, unring, shot } from './common.mjs';
const { b, p } = await start();
await login(p);
await makeCopy(p, '自然科學 5下', '自然');
const box = async (sel) => p.locator(sel).first().boundingBox();
// scroll page 1 into view
await p.locator('main [data-row-index="3"]').evaluate(e => e.scrollIntoView({ block: 'center' }));
await p.waitForTimeout(500);
async function ringDrag(kind) {
  await p.evaluate((kind) => {
    const mark = (el) => { el.setAttribute('data-ring','1'); el.style.outline = '4px solid #FF854A'; el.style.outlineOffset = '4px'; };
    // ghost: body child with transform translate
    const g = [...document.body.children].find(c => c.style && c.style.transform && c.style.transform.includes('translate'));
    if (g && kind === "row") mark(g); else console.log('no ghost');
    if (kind === 'row') {
      const dl = [...document.querySelectorAll('main div')].find(d => d.offsetHeight === 3 && getComputedStyle(d).position === 'absolute' && d.offsetWidth > 200);
      if (dl) { mark(dl); dl.style.borderRadius = '999px'; }
      return [!!g, !!dl];
    } else {
      const sp = [...document.querySelectorAll('main span')].find(s => s.innerText.startsWith('併成'));
      if (sp) mark(sp.parentElement);
      return [!!g, !!sp, sp && sp.innerText];
    }
  }, kind).then(r => console.log(kind, r));
}
// s04: drag row 10 up into lower half of row 8
await p.locator('main [data-row-index="9"]').evaluate(e => e.scrollIntoView({ block: 'center' }));
await p.waitForTimeout(500);
const g3 = await box('main [data-row-index="10"] [aria-label="拖曳搬移"]');
const r8 = await box('main [data-row-index="8"]');
const sx0 = g3.x + g3.width/2, sy0 = g3.y + g3.height/2;
const ty = r8.y + r8.height*0.3, tx = sx0 + 40;
await p.mouse.move(sx0, sy0); await p.mouse.down();
for (let i = 1; i <= 8; i++) { await p.mouse.move(sx0 + (tx-sx0)*i/8, sy0 + (ty - sy0) * i/8); await p.waitForTimeout(60); }
await p.waitForTimeout(300);
await ringDrag('row');
await shot(p, 's04-drag-row.png');
await unring(p);
await p.mouse.move(sx0, sy0, { steps: 4 });
await p.mouse.up();
await p.waitForTimeout(500);
// s05: drag image row 4 to right side of row 5 paragraph
await p.locator('main [data-row-index="10"]').evaluate(e => e.scrollIntoView({ block: 'center' }));
await p.waitForTimeout(500);
const g4 = await box('main [data-row-index="9"] [aria-label="拖曳搬移"]');
const f4 = await box('main [data-row-index="9"]');
const f5 = await box('main [data-row-index="10"]');
const sx = g4.x + g4.width/2, sy = g4.y + g4.height/2;
const offX = (f4.x + f4.width/2) - sx; // ghost center relative to cursor approx (frame)
const destX = sx + f5.width*0.3, destY = f5.y + f5.height/2;
await p.mouse.move(sx, sy); await p.mouse.down();
for (let i = 1; i <= 10; i++) { await p.mouse.move(sx + (destX - sx) * i/10, sy + (destY - sy) * i/10); await p.waitForTimeout(60); }
await p.waitForTimeout(300);
await ringDrag('col');
await shot(p, 's05-drag-merge.png');
await b.close();
