import { open, insertAfter, ring, unring, shot, IMG } from './gcommon.mjs';
// g09a horizontal
if (!process.env.SKIPA) {
  const { b, p } = await open('自然科學 5下', '自然');
  const img = p.locator('main [data-row-index="4"] [data-block-id]').first();
  await img.evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(300);
  await img.click(); await p.waitForTimeout(500);
  const btn = p.locator('button[title="關閉圖說"]');
  console.log('cap btn', await btn.count());
  const cap = img.locator('figcaption').first();
  await p.mouse.move(1430, 890);
  await ring(p, [cap, btn]); await shot(p, 'g09a.png');
  await b.close();
}
// g09b vertical
{
  const { b, p } = await open('國文 2下', '木蘭詩');
  await insertAfter(p, 3, '圖片');
  const [fc] = await Promise.all([p.waitForEvent('filechooser'), p.getByRole('button', { name: '上傳圖片' }).first().click()]);
  await fc.setFiles(IMG + 'sky.png'); await p.waitForTimeout(2500);
  const img = p.locator('main [data-block-id]').filter({ has: p.locator('img[src^="blob:"], img[src^="data:"]') }).last();
  console.log('img', await img.count());
  await img.evaluate(e => e.scrollIntoView({ block: 'center', inline: 'center' })); await p.waitForTimeout(300);
  await img.click(); await p.waitForTimeout(400);
  await p.locator('button[title="開啟圖說"]').click(); await p.waitForTimeout(500);
  await p.keyboard.type('圖 1 北方的夜空（示意圖）'); await p.waitForTimeout(300);
  await img.click(); await p.waitForTimeout(500);
  const cap = img.locator('figcaption').first();
  await p.mouse.move(1430, 890);
  await ring(p, [cap, p.locator('button[title="關閉圖說"]')]); await shot(p, 'g09b.png');
  await b.close();
}
