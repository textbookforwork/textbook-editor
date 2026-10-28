// 元件膠囊（影片、聲音、網頁、表格）＋圈膠囊。對應 Figma：g06a(181:28) g06b(181:31) g06c(181:34) g06e(181:37)；g06d 沒有對應節點
// PDF 要畫出來得用完整 Chromium：PW_CHANNEL=chromium node g06.mjs
import { start, login, shot, makeCopy, unring } from './common.mjs';
const { b, p } = await start(); p.setDefaultTimeout(8000);
await p.route('**/api.microlink.io/**', r => r.abort());
await login(p);
await makeCopy(p, '自然科學 5下', '自然');
async function capShot(blk, name, fx = 8, fy = 8) {
  await blk.evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(400);
  const bb = await blk.boundingBox();
  await p.mouse.click(bb.x + (fx < 1 ? bb.width * fx : fx), bb.y + (fy < 1 ? bb.height * fy : fy)); await p.waitForTimeout(600);
  await p.mouse.move(1430, 890);
  const ok = await p.evaluate(() => {
    const del = [...document.querySelectorAll('button[title="刪除"]')].find(b => b.offsetParent);
    if (!del) return 'no capsule';
    let c = del.parentElement; while (c && c.querySelectorAll('button').length < 3) c = c.parentElement;
    c.setAttribute('data-ring','1'); c.style.outline = '4px solid #FF854A'; c.style.outlineOffset = '4px';
    return [...c.querySelectorAll('button')].map(b => b.title || b.innerText).join(' / ');
  });
  await blk.evaluate(e => { e.setAttribute('data-ring','1'); e.style.outline = '4px solid #FF854A'; e.style.outlineOffset = '4px'; });
  console.log(name, ok);
  await shot(p, name); await unring(p);
  await p.keyboard.press('Escape'); await p.mouse.click(1430, 880); await p.waitForTimeout(300);
}
const blkOf = (r) => p.locator(`main [data-row-index="${r}"] [data-block-id]`).first();
await capShot(blkOf(18), 'g06a.png');
await capShot(blkOf(24), 'g06b.png', 0.6, 0.5);
await capShot(blkOf(27), 'g06c.png');
// PDF insert
const row = p.locator('main [data-row-index="1"]');
await row.evaluate(e => e.scrollIntoView({ block: 'center' })); await row.hover();
await row.locator('xpath=..').locator('[aria-label="新增元件"]').last().click({ force: true }); await p.waitForTimeout(400);
await p.locator('[aria-label="插入元件"]').getByText('PDF', { exact: true }).click(); await p.waitForTimeout(800);
await p.getByRole('button', { name: '學習單-夏季大三角', exact: true }).click(); await p.waitForTimeout(1500);
await p.getByRole('button', { name: '嵌入整份' }).click(); await p.waitForTimeout(1500);
await p.getByRole('button', { name: '關閉' }).first().click().catch(() => {}); await p.waitForTimeout(500);
await capShot(blkOf(2), 'g06d.png', 0.5, 0.5);
await capShot(blkOf(8), 'g06e.png');
await b.close();
