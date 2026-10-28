import { start } from './common.mjs';
const URL='http://localhost:5191/';
const { b, p } = await start(); p.setDefaultTimeout(8000);
await p.goto(URL); await p.evaluate(() => { localStorage.clear(); localStorage.setItem('ds-editor:signed-in','1'); localStorage.setItem('ds-editor:role','admin'); });
await p.goto(URL + '#/read/book/demo'); await p.reload(); await p.waitForTimeout(2500);
await p.locator('button', { hasText: '進入自編' }).first().click(); await p.waitForTimeout(2500);
for (const [name, sel] of [['web','[data-block-type="web"], main a[href^="http"]'],['audio','main audio, [data-block-type="audio"]']]) {
  const el = p.locator(sel).first(); if (!(await el.count())) { console.log('no', name); continue; }
  await el.evaluate(e => e.scrollIntoView({ block: 'center' })); const bb0 = await el.boundingBox(); await p.mouse.click(bb0.x + 4, bb0.y + 4); await p.waitForTimeout(600);
  const del = p.locator('button[title="刪除"]').first(); const bb = await del.boundingBox();
  await p.screenshot({ path: `out/_cap_${name}.png`, clip: { x: Math.max(0, bb.x - 420), y: bb.y - 20, width: 480, height: 80 } });
}
await b.close();
