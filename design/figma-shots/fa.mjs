import { start, login, ring, unring, shot, cardMore } from './common.mjs';
const { b, p } = await start(); p.setDefaultTimeout(8000);
await p.route('**/api.microlink.io/**', r => r.abort());
await login(p);
await p.locator('button[title="切換身分、登出"]').click(); await p.waitForTimeout(300);
await p.getByRole('menuitemradio', { name: '系統管理員' }).click(); await p.waitForTimeout(600);
await p.getByRole('button', { name: '建立教材' }).click(); await p.waitForTimeout(500);
const dlg = p.getByRole('dialog', { name: '建立教材' });
await dlg.getByPlaceholder('請輸入教材名稱').fill('木蘭詩');
await dlg.getByRole('radio', { name: '國語文' }).click().catch(e => console.log('no 國語文 chip'));
await dlg.getByPlaceholder('請輸入出版社名稱').fill('範例');
await ring(p, [dlg]); await shot(p, 'fa1.png'); await unring(p);
await dlg.getByRole('button', { name: '建立', exact: true }).click(); await p.waitForTimeout(2500);
// fa2
await p.locator('button[title="教材設定、匯入"]').click(); await p.waitForTimeout(500);
await p.getByRole('button', { name: '匯入 .md 檔' }).click(); await p.waitForTimeout(600);
const imp = p.getByRole('dialog', { name: '匯入 .md 檔' });
await imp.getByRole('button', { name: '國文（範例・直排）' }).click(); await p.waitForTimeout(500);
await ring(p, [imp.getByRole('button', { name: '國文（範例・直排）' }), imp.getByRole('button', { name: '匯入', exact: true })]);
await shot(p, 'fa2.png'); await unring(p);
await imp.getByRole('button', { name: '匯入', exact: true }).click(); await p.waitForTimeout(2500);
// fa3
await p.mouse.move(1430, 890);
const pg0 = p.locator('main [data-page-index="0"]').first();
await ring(p, [pg0]); await shot(p, 'fa3.png'); await unring(p);
// fa4
const blk = p.locator('main [data-block-id]').filter({ hasText: '唧唧復唧唧' }).last();
await blk.evaluate(e => e.scrollIntoView({ block: 'center', inline: 'center' })); await p.waitForTimeout(400);
const bb = await blk.boundingBox();
await p.mouse.click(bb.x + bb.width / 2, bb.y + bb.height * 0.5); await p.waitForTimeout(700);
const cap = p.locator('button[title="新增補充資源"], button[aria-label="補充"]').first().locator('xpath=ancestor::*[.//button[@title="刪除" or @aria-label="刪除"]][1]');
await ring(p, [blk, cap]); await shot(p, 'fa4.png'); await unring(p);
// fa5
await p.keyboard.press('Escape'); await p.mouse.click(1430, 880); await p.waitForTimeout(300);
await p.locator('button[title^="發布到書櫃"]').click(); await p.waitForTimeout(700);
const dlg5 = p.getByRole('dialog', { name: '教材已發布' });
await ring(p, [dlg5, p.locator('button[aria-pressed="true"]', { hasText: '已發布' })]); await shot(p, 'fa5.png');
// fa6：已發布的數位教科書，管理員從書櫃「⋯」→ 進入編輯
await p.keyboard.press('Escape'); await p.waitForTimeout(300);
await p.getByRole('button', { name: '回首頁' }).click(); await p.waitForTimeout(1200);
await p.getByRole('tab', { name: '數位教科書' }).click(); await p.waitForTimeout(800);
const more = cardMore(p, '國文 2下');
await more.evaluate(e => e.scrollIntoView({ block: 'center' })); await more.click(); await p.waitForTimeout(400);
const edit = p.getByRole('menuitem', { name: /進入編輯/ });
await p.mouse.move(1430, 890);
await ring(p, [edit]); await shot(p, 'fa6.png'); await unring(p);
// fa7：直接進編輯器改這本
await edit.click(); await p.waitForTimeout(2500);
await p.mouse.move(1430, 890);
await ring(p, [p.locator('main [data-page-index="0"]').first()]); await shot(p, 'fa7.png');
await b.close();
