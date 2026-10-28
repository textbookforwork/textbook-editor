import { start, login, ring, unring, shot, makeCopy } from './common.mjs';
const [,, src, name, rowN, url, title, suffix] = process.argv;
const { b, p } = await start(); p.setDefaultTimeout(8000);
await p.route('**/api.microlink.io/**', r => r.abort());
await login(p);
await makeCopy(p, src, name);
await p.waitForTimeout(1000);
const row = p.locator(`main [data-row-index="${rowN}"]`);
await row.evaluate(e => e.scrollIntoView({ block: 'center', inline: 'center' })); await p.waitForTimeout(300);
const rb = await row.boundingBox();
await p.mouse.move(rb.x + rb.width / 2, rb.y + rb.height / 2); await p.waitForTimeout(300);
const ins = row.locator('xpath=..').locator('[aria-label="新增元件"]');
console.log('ins', await ins.count());
await ins.last().click({ force: true }); await p.waitForTimeout(500);
await p.locator('[aria-label="插入元件"]').getByText('網頁', { exact: true }).click(); await p.waitForTimeout(800);
await p.locator('input[aria-label="貼上網址"]:visible').first().fill(url);
await p.getByRole('button', { name: '插入標籤' }).click(); await p.waitForTimeout(1200);
const label = url.replace(/^https?:\/\//i, '').replace(/\/$/, '');
const t = p.locator(`main [contenteditable][data-placeholder="${label}"]`);
console.log('title els', await t.count());
const web = t.locator('xpath=ancestor::*[@data-block-id][1]');
await t.evaluate(e => e.setAttribute('spellcheck', 'false')); await t.click(); await p.keyboard.press('Meta+A'); await p.keyboard.type(title); await p.keyboard.press('Enter'); await p.waitForTimeout(400);
const wb0 = await web.boundingBox(); await p.mouse.click(wb0.x + 12, wb0.y + 12); await p.waitForTimeout(500);
await web.evaluate(e => e.scrollIntoView({ block: 'center', inline: 'center' })); await p.waitForTimeout(400);
console.log('tag box', await web.boundingBox(), await web.innerText());
await p.mouse.move(1430, 890);
await ring(p, [web, p.locator('button[title="以插入標籤呈現"]')]); await shot(p, `s07-web-tag-${suffix}.png`); await unring(p);
await p.locator('button[title="以內嵌網頁呈現"]').click(); await p.waitForTimeout(1000);
const web2 = p.locator('main [data-block-id]').filter({ has: p.locator('iframe') }).last();
await web2.evaluate(e => e.scrollIntoView({ block: 'center', inline: 'center' })); await p.mouse.move(1430, 890); await p.waitForTimeout(7000);
const fr = p.frameLocator('main iframe').last();
for (const sel of ['.cdx-dialog__header button', '.mw-dismissable-notice-close a', 'button[aria-label="關閉"]', 'button.cdx-button--icon-only']) {
  const n = await fr.locator(sel).count().catch(() => 0);
  for (let i = 0; i < n; i++) await fr.locator(sel).nth(i).click({ timeout: 1500 }).catch(() => {});
}

await p.mouse.move(1430, 890); await p.waitForTimeout(800);
await ring(p, [web2, p.locator('button[title="以內嵌網頁呈現"]')]); await shot(p, `s07-web-embed-${suffix}.png`);
await b.close();
