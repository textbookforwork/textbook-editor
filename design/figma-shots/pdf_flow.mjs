import { start, login, ring, unring, shot, makeCopy } from './common.mjs';
const PDF = decodeURIComponent(new URL('./assets/', import.meta.url).pathname) + '觀星學習單.pdf';
const mode = process.argv[2]; // 'import' or 'embed'
const { b, p } = await start(); p.setDefaultTimeout(8000);
await login(p);
await makeCopy(p, '自然科學 5下', '自然');
await p.waitForTimeout(1000);
const row = p.locator('main [data-row-index="1"]');
const rb = await row.boundingBox();
await p.mouse.move(rb.x + rb.width / 2, rb.y + rb.height / 2); await p.waitForTimeout(300);
await row.locator('xpath=..').locator('[aria-label="新增元件"]').last().click({ force: true }); await p.waitForTimeout(500);
const panel = p.locator('[aria-label="插入元件"]');
const pdfTile = panel.locator('button', { hasText: 'PDF' }).first();
if (mode === 'import') { await p.mouse.move(1430, 890); await ring(p, [pdfTile]); await shot(p, 'p1.png'); await unring(p); }
await pdfTile.click(); await p.waitForTimeout(800);
const lib = p.getByRole('dialog', { name: '媒體庫' });
const up = lib.locator('button[aria-label^="上傳PDF"]');
console.log('upload box', await up.count(), await lib.getByRole('tab').allInnerTexts());
if (mode === 'import') { await ring(p, [lib.getByRole('tab', { name: 'PDF' }), up]); await shot(p, 'p2.png'); await unring(p); }
const fc = p.waitForEvent('filechooser');
await up.click();
await (await fc).setFiles(PDF);
await p.waitForTimeout(2500);
if (mode === 'import') {
  const range = p.locator('input[aria-label="要匯入的頁碼"]');
  await range.fill('1, 3'); await p.waitForTimeout(800);
  // checked thumbs wrapper: overlay box spanning pressed cards
  await ring(p, [range]);
  await p.evaluate(() => {
    document.querySelectorAll('button[aria-pressed="true"][aria-label^="第 "]').forEach(el => { el.setAttribute('data-ring','1'); el.style.outline = '4px solid #FF854A'; el.style.outlineOffset = '4px'; });
  });
  await shot(p, 'p3.png'); await unring(p);
  const embedBtn = p.getByRole('button', { name: '嵌入整份' }), impBtn = p.getByRole('button', { name: '匯入圖片' });
  await ring(p, [embedBtn, impBtn]); await shot(p, 'p4.png'); await unring(p);
  await impBtn.click(); await p.waitForTimeout(3000);
  await lib.getByRole('button', { name: '關閉' }).first().click().catch(() => {}); await p.waitForTimeout(600);
  await p.mouse.click(1430, 880);
  const imgs = p.locator('main [data-row-index="2"], main [data-row-index="3"]');
  console.log('rows2-3', await imgs.allInnerTexts());
  await p.locator('input[type="range"]').first().evaluate(e => { const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set; set.call(e, Math.max(Number(e.min)||0, 40)); e.dispatchEvent(new Event('input', { bubbles: true })); e.dispatchEvent(new Event('change', { bubbles: true })); });
  await p.waitForTimeout(800);
  await p.locator('main [data-page-index="1"]').evaluate(e => e.scrollIntoView({ block: 'start' })); await p.waitForTimeout(500);
  await ring(p, [p.locator('main [data-row-index="2"]').first(), p.locator('main [data-row-index="3"]').first()]); await p.mouse.move(1430, 890);
  await shot(p, 'p5.png');
} else {
  await p.getByRole('button', { name: '嵌入整份' }).click(); await p.waitForTimeout(2000);
  await lib.getByRole('button', { name: '關閉' }).first().click().catch(() => {}); await p.waitForTimeout(600);
  const blk = p.locator('main [data-block-id]').filter({ has: p.locator('iframe') }).first();
  await blk.evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(500);
  await blk.evaluate(e => { const o = { bubbles: true, pointerId: 1, isPrimary: true }; e.firstElementChild.dispatchEvent(new PointerEvent('pointerdown', o)); e.firstElementChild.dispatchEvent(new PointerEvent('pointerup', o)); e.firstElementChild.dispatchEvent(new MouseEvent('click', { bubbles: true })); }); await p.waitForTimeout(600);
  const cap = p.locator('button[title="刪除"]').locator('xpath=ancestor::*[.//button[@title="更換 PDF 檔案"]][1]');
  console.log('cap', await cap.count(), await cap.innerText().catch(()=>''));
  await p.mouse.move(1430, 890); await p.waitForTimeout(3000);
  await ring(p, (await cap.count()) ? [blk, cap] : [blk]); await shot(p, 'p6.png'); await unring(p);
  await p.getByRole('button', { name: '閱讀模式' }).click(); await p.waitForTimeout(2500);
  // find page with pdf
  for (let i = 0; i < 3; i++) {
    if (await p.locator('iframe, embed, object').count()) break;
    await p.keyboard.press('ArrowRight'); await p.waitForTimeout(1200);
  }
  console.log('frames', await p.locator('iframe, embed, object').count());
  await p.waitForTimeout(4000);
  const fr = p.locator('iframe, embed, object').first();
  if (await fr.count()) await ring(p, [fr.locator('xpath=..')]);
  await p.mouse.move(1430, 890);
  await shot(p, 'p7.png');
}
await b.close();
