import { start, login, SHOTS } from './common.mjs';
const { b, p } = await start();
await login(p);
await p.goto('https://textbookforwork.github.io/textbook-editor/#/read/book/demo', { waitUntil: 'networkidle' }); await p.waitForTimeout(2000);
for (const n of [2, 5]) {
  // go to page n via pager input
  const inp = p.locator('input[aria-label*="頁"]').first();
  if (await inp.count()) { await inp.fill(String(n)); await inp.press('Enter'); } 
  await p.waitForTimeout(1200);
  const btn = p.locator('button', { hasText: '補充資源' }).first();
  if (!(await p.locator('#supplement-panel').count())) await btn.click();
  await p.waitForTimeout(900);
  const txt = await p.locator('#supplement-panel').innerText();
  console.log('=== page', n, '\n' + txt);
  const imgs = await p.locator('#supplement-panel img').evaluateAll(es => es.map(e => e.src.slice(0, 80)));
  console.log(imgs);
  await p.screenshot({ path: SHOTS + `_supp${n}.png` });
}
await b.close();
