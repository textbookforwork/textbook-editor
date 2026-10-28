import { start, login, makeCopy, ring, unring, shot } from './common.mjs';
const { b, p } = await start(); p.setDefaultTimeout(8000);
await p.route('**/api.microlink.io/**', r => r.abort());
await login(p);
await makeCopy(p, '自然科學 5下', '自然');
await p.waitForTimeout(1500);
// s06
const ce = p.locator('main [data-row-index="1"] [contenteditable="true"]').first();
await ce.click(); await ce.evaluate(e => { const r = document.createRange(); r.selectNodeContents(e); r.collapse(false); const s = getSelection(); s.removeAllRanges(); s.addRange(r); });
await p.keyboard.type('一起來找找看吧！'); await p.waitForTimeout(250);
const dirty = p.locator('button[title^="有尚未儲存"]');
await ring(p, [dirty]); await shot(p, 's06-save-dirty.png'); await unring(p);
await p.waitForTimeout(1800);
const saved = p.locator('button[title^="已自動儲存"]');
await ring(p, [saved]); await shot(p, 's06-save-saved.png'); await unring(p);
// s07: insert web after row 1
await p.mouse.click(5, 500); await p.keyboard.press('Escape');
const r1 = p.locator('main [data-row-index="1"]');
const bb = await r1.boundingBox();
await p.mouse.move(bb.x + 300, bb.y + bb.height + 14); await p.waitForTimeout(400);
const ins = p.locator('main [aria-label="新增元件"]');
console.log('insert buttons', await ins.count());
// choose the visible insert button nearest below row 1
const idx = await ins.evaluateAll((els, y) => { let best=-1, bd=1e9; els.forEach((e,i)=>{const r=e.getBoundingClientRect(); const d=Math.abs(r.top-y); if (r.height>0 && d<bd){bd=d;best=i;}}); return best; }, bb.y + bb.height);
await ins.nth(idx).click({ force: true }); await p.waitForTimeout(500);
await p.locator('[aria-label="插入元件"]').getByText('網頁', { exact: true }).click(); await p.waitForTimeout(800);
await p.locator('input[aria-label="貼上網址"]:visible').first().fill('https://stellarium-web.org/');
await p.getByRole('button', { name: '插入標籤' }).click(); await p.waitForTimeout(1200);
const web = p.locator('main [data-row-index="2"] [data-block-id]').first();
console.log('web text', await web.innerText());
await web.click(); await p.waitForTimeout(500);
await web.evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(400);
await ring(p, [web, p.locator('button[title="以插入標籤呈現"]')]); await shot(p, 's07-web-tag.png'); await unring(p);
await p.locator('button[title="以內嵌網頁呈現"]').click(); await p.waitForTimeout(1500);
const web2 = p.locator('main [data-row-index="2"] [data-block-id]').first();
await web2.evaluate(e => e.scrollIntoView({ block: 'center' })); await p.mouse.move(1430, 890); await p.waitForTimeout(6000);
await ring(p, [web2, p.locator('button[title="以內嵌網頁呈現"]')]); await shot(p, 's07-web-embed.png'); await unring(p);
// s08
await p.keyboard.press('Escape'); await p.mouse.click(5, 600);
const bgBtn = p.locator('main button[aria-label="當頁背景"]').first();
await bgBtn.evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(400);
await bgBtn.click(); await p.waitForTimeout(500);
await ring(p, [bgBtn, p.locator('[role="dialog"][aria-label="當頁背景"]')]); await shot(p, 's08-bg-panel.png'); await unring(p);
await p.keyboard.press('Escape'); await p.mouse.click(5, 600); await p.waitForTimeout(300);
// s09
const shareBtn = p.locator('button[title="共享教材"]');
await shareBtn.click(); await p.waitForTimeout(700);
const dlg = p.getByRole('dialog', { name: '自編教材已共享' });
await ring(p, [dlg, p.locator('button[aria-pressed="true"]', { hasText: '已共享' })]); await shot(p, 's09-cover-dialog.png'); await unring(p);
await dlg.getByRole('button', { name: '取消' }).click(); await p.waitForTimeout(500);
const sh = p.locator('button[aria-pressed="true"]', { hasText: '已共享' });
await ring(p, [sh]); await shot(p, 's09-shared.png');
await b.close();
