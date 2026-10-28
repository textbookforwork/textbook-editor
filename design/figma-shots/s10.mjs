import { start, login, ring, unring, shot } from './common.mjs';
import { textPoint, ringEval } from './common3.mjs';
const { b, p } = await start(); p.setDefaultTimeout(8000);
await login(p);
const card = p.locator('button[aria-label="用「國文 2下」建立自編"]').locator('xpath=ancestor::*[.//button[normalize-space()="閱讀課本"]][1]');
await card.getByRole('button', { name: '閱讀課本' }).click();
await p.waitForTimeout(2500);
const P1 = '[data-para]';
let pt = await textPoint(p, P1, '軍書十二卷', 1);
await p.mouse.click(pt.x, pt.y); await p.waitForTimeout(600);
const railSel = '[aria-label$="段的說明"]';
console.log('rail', await p.locator(railSel).count());
await ring(p, [p.locator(P1).first(), p.locator(railSel).first()]);
await p.mouse.move(1430, 890);
await shot(p, 's10-reader-para.png'); await unring(p);
// sentence
pt = await textPoint(p, P1, '問女何所思', 2);
await p.mouse.click(pt.x, pt.y); await p.waitForTimeout(600);
// ring the sentence range: build overlay box from range rect
await p.evaluate(() => {
  const root = document.querySelector('[data-para]');
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement.closest('rt') ? 2 : 1 });
  let n; let text=''; const nodes=[]; while ((n = w.nextNode())) { nodes.push([n, text.length]); text += n.data; }
  const s = text.indexOf('問女何所思？'); const e = s + '問女何所思？'.length;
  const f = pos => { const [nd,o] = nodes.filter(([x,o])=>o<=pos).pop(); return [nd,pos-o]; };
  const r = document.createRange(); r.setStart(...f(s)); r.setEnd(...f(e - 1)); r.setEnd(r.endContainer, r.endOffset + 1);
  const b = r.getBoundingClientRect();
  const d = document.createElement('div'); d.setAttribute('data-ring-box','1');
  Object.assign(d.style, { position:'fixed', left:(b.left-6)+'px', top:(b.top-6)+'px', width:(b.width+12)+'px', height:(b.height+12)+'px', border:'4px solid #FF854A', borderRadius:'8px', zIndex: 99999, pointerEvents:'none', boxSizing:'border-box' });
  document.body.appendChild(d);
});
await p.mouse.move(1430, 890);
await shot(p, 's10-reader-sentence.png');
await p.evaluate(() => document.querySelectorAll('[data-ring-box]').forEach(e => e.remove()));
// word: reset by clicking blank, then para, then word
await p.keyboard.press('Escape'); await p.waitForTimeout(300);
const word = p.locator('[data-note="ml-note-zhu"]').first();
const wb = await word.boundingBox();
console.log('word', wb, await word.innerText());
await p.mouse.click(wb.x + wb.width / 2, wb.y + wb.height / 2); await p.waitForTimeout(600);
// is para selected? click again on word
await p.mouse.click(wb.x + wb.width / 2, wb.y + wb.height / 2); await p.waitForTimeout(800);
const bubble = p.locator('[role="dialog"]').last();
console.log('dialogs', await p.locator('[role="dialog"]').count(), await bubble.getAttribute('aria-label'));
await ring(p, [word, bubble]);
await p.mouse.move(1430, 890);
await shot(p, 's10-reader-word.png');
await b.close();
