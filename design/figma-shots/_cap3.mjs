import { start } from './common.mjs';
const URL='http://localhost:5191/';
const { b, p } = await start(); p.setDefaultTimeout(8000);
await p.goto(URL); await p.evaluate(() => { localStorage.clear(); localStorage.setItem('ds-editor:signed-in','1'); localStorage.setItem('ds-editor:role','admin'); });
await p.goto(URL + '#/read/book/demo'); await p.reload(); await p.waitForTimeout(2500);
await p.locator('button', { hasText: '進入自編' }).first().click(); await p.waitForTimeout(3000);
for (const [name, sel] of [['web','main [data-row-index="2"] [data-block-id]']]) {
  const el = p.locator(sel).first(); const n = await el.count(); if (!n) { console.log('no', name); continue; }
  const blk = el;
  await blk.evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(500);
  const bb = await blk.boundingBox(); await p.mouse.click(bb.x + 6, bb.y + 6); await p.waitForTimeout(700);
  const del = p.locator('button[title="刪除"]').first(); const d = await del.boundingBox();
  await p.screenshot({ path: `out/_cap_${name}.png`, clip: { x: Math.max(0, d.x - 380), y: d.y - 16, width: 440, height: 72 } });
  console.log('ok', name);
}
await b.close();
