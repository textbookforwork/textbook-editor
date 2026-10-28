import { start, login, ring, unring, shot, makeCopy } from './common.mjs';
const { b, p } = await start(); p.setDefaultTimeout(8000);
await login(p);
await makeCopy(p, '自然科學 5下', '自然');
// g05a hover thumb
const th = p.locator('[aria-label="第 2 頁"]');
await th.hover(); await p.waitForTimeout(500);
const trash = p.locator('button[aria-label="刪除第 2 頁"]');
await ring(p, [th, trash]); await shot(p, 'g05a.png'); await unring(p);
// g05b drag thumb 3 down
const t3 = await p.locator('[aria-label="第 3 頁"]').boundingBox();
const t5 = await p.locator('[aria-label="第 5 頁"]').boundingBox();
const sx = t3.x + t3.width / 2, sy = t3.y + t3.height / 2;
await p.mouse.move(sx, sy); await p.mouse.down();
for (let i = 1; i <= 10; i++) { await p.mouse.move(sx + 6, sy + (t5.y + t5.height * 0.3 - sy) * i / 10); await p.waitForTimeout(50); }
await p.waitForTimeout(300);
const info = await p.evaluate(() => [...document.body.children].filter(c => c.style && c.style.transform).map(c => c.tagName + c.style.transform));
console.log('ghost?', info);
await p.evaluate(() => { const g = [...document.body.children].find(c => c.style && c.style.transform && c.style.transform.includes('translate')); if (g) { g.setAttribute('data-ring','1'); g.style.outline='4px solid #FF854A'; g.style.outlineOffset='4px'; } });
await shot(p, 'g05b.png'); await unring(p);
await p.mouse.move(sx, sy, { steps: 3 }); await p.keyboard.press('Escape'); await p.mouse.up(); await p.waitForTimeout(400);
// g04
await p.getByText(/^目次/).first().click(); await p.waitForTimeout(500);
const entries = p.locator('[title="點一下跳過去，點兩下改名"]');
console.log('entries', await entries.allInnerTexts());
await entries.nth(1).dblclick(); await p.waitForTimeout(300);
const ren = p.getByLabel('重新命名');
await p.keyboard.press('Meta+A'); await p.keyboard.type('夏夜的星座');
await ring(p, [ren]); await shot(p, 'g04a.png'); await unring(p);
await p.keyboard.press('Escape'); await p.waitForTimeout(300);
const e2 = entries.nth(2); await e2.hover(); await p.waitForTimeout(300);
const del = p.locator('button[aria-label^="刪除「"]').nth(2);
console.log('del label', await del.getAttribute('aria-label'));
await del.click(); await p.waitForTimeout(500);
const cd = p.getByRole('dialog').last();
console.log('dialog', await cd.innerText());
await ring(p, [cd]); await shot(p, 'g04b.png');
await b.close();
