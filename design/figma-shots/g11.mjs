// 表格欄選單與放不下的提示。對應 Figma：g11a(181:104) g11b(181:107)
import { open, ring, unring, shot } from './gcommon.mjs';
const { b, p } = await open('自然科學 5下', '自然');
const tbl = p.locator('main [data-row-index="7"] [data-block-id]').first();
await tbl.evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(300);
const tb = await tbl.boundingBox();
await p.mouse.click(tb.x + tb.width - 6, tb.y + tb.height / 2); await p.waitForTimeout(500);
const h = p.getByRole('button', { name: '第 3 欄' }).or(p.locator('[aria-label="第 3 欄"]')).first();
console.log('handle', await h.count(), await h.boundingBox(), await h.isVisible());
const hb = await h.boundingBox();
await p.mouse.click(hb.x + hb.width / 2, hb.y + hb.height / 2); await p.waitForTimeout(500);
const menu = p.locator('[data-table-menu]');
console.log('menu', await menu.count(), await menu.innerText().catch(() => ''));
await p.mouse.move(1430, 890);
await ring(p, [h, menu]); await shot(p, 'g11a.png'); await unring(p);
await p.keyboard.press('Escape'); await p.waitForTimeout(300);
for (let i = 0; i < 14; i++) {
  if (await p.locator('main [data-ui]', { hasText: '放不下這一頁' }).count()) break;
  const add = p.locator('[aria-label="新增一列"]');
  if (!(await add.isVisible().catch(() => false))) { const t2 = await tbl.boundingBox(); await p.mouse.click(t2.x + t2.width - 6, t2.y + 40); await p.waitForTimeout(300); }
  await add.click(); await p.waitForTimeout(250);
}
const cut = p.locator('main [data-ui]', { hasText: '放不下這一頁' }).first();
console.log('cut', await cut.count(), await cut.innerText().catch(()=>''));
await cut.evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(400);
await p.mouse.move(1430, 890);
await ring(p, [cut]); await cut.evaluate(e => { e.style.outlineOffset = '-4px'; }); await shot(p, 'g11b.png');
await b.close();
