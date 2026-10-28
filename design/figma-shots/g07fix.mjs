import { start, login, ring, unring, shot, makeCopy } from './common.mjs';
const { b, p } = await start(); p.setDefaultTimeout(8000);
await login(p);
await makeCopy(p, '自然科學 5下', '自然');
const blkOf = (r) => p.locator(`main [data-row-index="${r}"] [data-block-id]`).first();
// g08a: badge single column (row 3)
let blk = blkOf(3);
await blk.evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(400);
const badge3 = p.locator('main [data-row-index="3"] [aria-label^="補充內容"]').first();
await ring(p, [blk, badge3]); await shot(p, 'x-g08a-fix.png'); await unring(p);
// g07: row 12 text -> vertical
blk = blkOf(12);
await blk.evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(300);
let bb = await blk.boundingBox();
await p.mouse.click(bb.x + bb.width * 0.3, bb.y + bb.height / 2); await p.waitForTimeout(500);
await p.locator('button[aria-label="切換為直排"]').click(); await p.waitForTimeout(800);
blk = blkOf(12);
await blk.evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(400);
await p.mouse.move(1430, 890);
await ring(p, [blk, p.locator('button[aria-label="轉回橫排"]')]); await shot(p, 'g07-fix.png'); await unring(p);
await p.keyboard.press('Escape'); await p.mouse.click(1430, 880); await p.waitForTimeout(300);
// g08b: merge row 4 (image) to right of row 5 (paragraph)
await p.locator('main [data-row-index="5"]').evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(400);
const g4 = await p.locator('main [data-row-index="4"] [aria-label="拖曳搬移"]').boundingBox();
const f5 = await p.locator('main [data-row-index="5"]').boundingBox();
const sx = g4.x + g4.width / 2, sy = g4.y + g4.height / 2;
const dx = sx + f5.width * 0.3, dy = f5.y + f5.height / 2;
await p.mouse.move(sx, sy); await p.mouse.down();
for (let i = 1; i <= 10; i++) { await p.mouse.move(sx + (dx - sx) * i / 10, sy + (dy - sy) * i / 10); await p.waitForTimeout(50); }
await p.waitForTimeout(300);
console.log('sidedrop', await p.locator('main span', { hasText: '併成' }).count());
await p.mouse.up(); await p.waitForTimeout(800);
const multi = await p.evaluate(() => [...document.querySelectorAll('main [data-row-id]')].filter(r => r.querySelectorAll('[data-col-id]').length > 1).map(r => r.dataset.rowIndex));
console.log('multi rows', multi);
const mr = p.locator(`main [data-row-index="${multi[0]}"]`);
await mr.evaluate(e => e.scrollIntoView({ block: 'center' })); await p.mouse.move(1430, 890); await p.waitForTimeout(400);
const badges = mr.locator('[aria-label^="補充內容"]');
console.log('badges in multi', await badges.count());
await ring(p, [badges.first()]);
if (await badges.count() > 1) await badges.nth(1).evaluate(e => { e.setAttribute('data-ring','1'); e.style.outline='4px solid #FF854A'; e.style.outlineOffset='4px'; });
console.log(JSON.stringify(await badges.evaluateAll(els => els.map(e => { const r = e.getBoundingClientRect(); const pg = e.closest('[data-page-index]').getBoundingClientRect(); const cs = getComputedStyle(e); return { r: [r.left, r.top, r.width, r.height].map(Math.round), pageLeft: Math.round(pg.left), pageTop: Math.round(pg.top), hit: document.elementFromPoint(r.left + r.width/2, r.top + r.height/2)?.closest('[aria-label^="補充內容"]') === e }; }))));
await unring(p); await p.screenshot({ path: decodeURIComponent(new URL('./out/', import.meta.url).pathname) + 'x-g08b-zoom.png', clip: { x: 230, y: 280, width: 400, height: 160 } });
await ring(p, [badges.first()]); if (await badges.count() > 1) await badges.nth(1).evaluate(e => { e.setAttribute('data-ring','1'); e.style.outline='4px solid #FF854A'; e.style.outlineOffset='4px'; });
await shot(p, 'g08b-fix.png');
await b.close();
