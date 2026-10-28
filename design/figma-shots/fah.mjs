import { start, login, ring, unring, shot, cardMore } from './common.mjs';
const { b, p } = await start(); p.setDefaultTimeout(8000);
await p.route('**/api.microlink.io/**', r => r.abort());
await login(p);
await p.locator('button[title="切換身分、登出"]').click(); await p.waitForTimeout(300);
await p.getByRole('menuitemradio', { name: '系統管理員' }).click(); await p.waitForTimeout(600);
await p.getByRole('button', { name: '建立教材' }).click(); await p.waitForTimeout(500);
const dlg = p.getByRole('dialog', { name: '建立教材' });
await dlg.getByPlaceholder('請輸入教材名稱').fill('自然');
await dlg.getByRole('radio', { name: '自然科學' }).click().catch(e => console.log('no 國語文 chip'));
await dlg.getByPlaceholder('請輸入出版社名稱').fill('範例');
await ring(p, [dlg]); await shot(p, 'fa1h.png'); await unring(p);
await dlg.getByRole('button', { name: '建立', exact: true }).click(); await p.waitForTimeout(2500);
// fa2
await p.locator('button[title="教材設定、匯入"]').click(); await p.waitForTimeout(500);
await p.getByRole('button', { name: '匯入 .md 檔' }).click(); await p.waitForTimeout(600);
const imp = p.getByRole('dialog', { name: '匯入 .md 檔' });
await imp.getByRole('button', { name: '自然（範例・橫排）' }).click(); await p.waitForTimeout(500);
await ring(p, [imp.getByRole('button', { name: '自然（範例・橫排）' }), imp.getByRole('button', { name: '匯入', exact: true })]);
await shot(p, 'fa2h.png'); await unring(p);
await imp.getByRole('button', { name: '匯入', exact: true }).click(); await p.waitForTimeout(2500);
// fa3
await p.mouse.move(1430, 890);
const pg0 = p.locator('main [data-page-index="0"]').first();
await ring(p, [pg0]); await shot(p, 'fa3h.png'); await unring(p);
// fa4
const blk = p.locator('main [data-block-id]').filter({ hasText: '晴朗的夜晚' }).last();
await blk.evaluate(e => e.scrollIntoView({ block: 'center', inline: 'center' })); await p.waitForTimeout(400);
const bb = await blk.boundingBox();
await p.mouse.click(bb.x + bb.width / 2, bb.y + bb.height * 0.5); await p.waitForTimeout(700);
const cap = p.locator('button[title="新增補充資源"], button[aria-label="補充"]').first().locator('xpath=ancestor::*[.//button[@title="刪除" or @aria-label="刪除"]][1]');
await ring(p, [blk, cap]); await shot(p, 'fa4h.png'); await unring(p);
// fa5
await p.keyboard.press('Escape'); await p.mouse.click(1430, 880); await p.waitForTimeout(300);
await p.locator('button[title^="發布到書櫃"]').click(); await p.waitForTimeout(700);
const dlg5 = p.getByRole('dialog', { name: '教材已發布' });
await ring(p, [dlg5, p.locator('button[aria-pressed="true"]', { hasText: '已發布' })]); await shot(p, 'fa5h.png');
await b.close();
