import { start, login, makeCopy, ring, unring, shot } from './common.mjs';
import { breaks } from './common2.mjs';
const { b, p } = await start();
await p.route('**/api.microlink.io/**', r => r.abort());
await login(p);
await makeCopy(p, '自然科學 5下', '自然');
const bk = await breaks(p);
// s01
const solid = bk.find(x => x.style === 'solid');
const el1 = p.locator(`[data-brk="${solid.i}"]`);
await el1.evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(500);
await ring(p, [el1]); await shot(p, 's01-break-system.png'); await unring(p);

async function pressBreak(rowIndex) {
  const blk = p.locator(`main [data-row-index="${rowIndex}"] [data-block-id]`).first();
  await blk.evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(400);
  await blk.click(); await p.waitForTimeout(400);
  await p.locator('button[title="從這一列開始換到新的一頁"]').click(); await p.waitForTimeout(800);
}
// s02: row 4 (image on page 1)
await pressBreak(4);
let bk2 = await breaks(p);
console.log(JSON.stringify(bk2));
const target2 = await p.evaluate(() => { const r = document.querySelector('main [data-row-index="4"]'); const pg = r.closest('[data-page-index]'); return Number(pg.dataset.pageIndex); });
const b2 = bk2.find(x => x.i === target2);
console.log('s02', target2, b2);
const el2 = p.locator(`[data-brk="${target2}"]`);
await el2.evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(500);
await ring(p, [el2]); await shot(p, 's02-break-mergeable.png'); await unring(p);
await p.keyboard.press('Escape');
// s03: first row of a page after a solid break
bk2 = await breaks(p);
const s = bk2.filter(x => x.style === 'solid')[1] || bk2.find(x => x.style === 'solid');
const firstRow = await p.evaluate(i => document.querySelector(`main [data-page-index="${i}"] [data-row-id]`).dataset.rowIndex, s.i);
console.log('s03 page', s.i, 'row', firstRow);
await pressBreak(firstRow);
const bk3 = await breaks(p);
const pg3 = await p.evaluate(r => Number(document.querySelector(`main [data-row-index="${r}"]`).closest('[data-page-index]').dataset.pageIndex), firstRow);
console.log('s03', JSON.stringify(bk3.find(x => x.i === pg3)));
const el3 = p.locator(`[data-brk="${pg3}"]`);
await el3.evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(500);
await ring(p, [el3]); await shot(p, 's03-break-not-mergeable.png');
await b.close();
