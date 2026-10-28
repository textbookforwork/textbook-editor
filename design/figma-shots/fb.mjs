// 流程 B（直排・國文）：書櫃 → 建立自編 → 改編 → 加補充資源 → 共享 → 書櫃自編 → 學生閱讀
// 對應 Figma：flowB-1～7（94:27、94:31、94:35、94:39、94:43、94:47、94:51）
import { start, login, ring, unring, shot } from './common.mjs';
import { textPoint } from './common3.mjs';
const { b, p } = await start(); p.setDefaultTimeout(8000);
await login(p);
// fb1：國文 2下 的「⋯」→ 建立自編
const more = p.getByRole('button', { name: '更多' }).first();
await more.click(); await p.waitForTimeout(400);
const item = p.getByRole('menuitem', { name: /建立自編/ });
await p.mouse.move(1430, 890);
await ring(p, [item]); await shot(p, 'fb1.png'); await unring(p);
await item.click(); await p.waitForTimeout(600);
// fb2：建立自編對話框（可選章節）
const dlg = p.getByRole('dialog', { name: '建立自編' });
await dlg.getByPlaceholder('請輸入自編名稱').fill('木蘭詩');
await ring(p, [dlg]); await shot(p, 'fb2.png'); await unring(p);
await dlg.getByRole('button', { name: '建立', exact: true }).click(); await p.waitForTimeout(2500);
// fb3：選第一段，出現文字膠囊
const blk = p.locator('main [data-block-id]').filter({ hasText: '唧唧復唧唧' }).last();
await blk.evaluate(e => e.scrollIntoView({ block: 'center', inline: 'center' })); await p.waitForTimeout(400);
const bb = await blk.boundingBox();
await p.mouse.click(bb.x + bb.width / 2, bb.y + bb.height * 0.5); await p.waitForTimeout(700);
const addBtn = p.locator('button[title="新增補充資源"], button[aria-label="補充"]').first();
const cap = addBtn.locator('xpath=ancestor::*[.//button[@title="刪除" or @aria-label="刪除"]][1]');
await ring(p, [blk, cap]); await shot(p, 'fb3.png'); await unring(p);
// fb4：段落面板（最上面是朗讀）
await addBtn.click(); await p.waitForTimeout(900);
const panel = p.getByRole('dialog', { name: '補充內容設定' });
await ring(p, [addBtn, panel]); await panel.evaluate(e => e.style.outlineOffset = '-8px'); await p.mouse.move(700, 890); await shot(p, 'fb4.png'); await unring(p);
await panel.getByRole('button', { name: '關閉' }).first().click(); await p.waitForTimeout(400);
await p.keyboard.press('Escape'); await p.mouse.click(1430, 880); await p.waitForTimeout(300);
// fb5：共享
await p.locator('button[title="共享教材"], button[aria-label="共享教材"]').first().click(); await p.waitForTimeout(700);
const d5 = p.getByRole('dialog').last();
await ring(p, [d5]); await shot(p, 'fb5.png'); await unring(p);
const ok = d5.getByRole('button', { name: /確認|共享|好/ }).last();
await ok.click().catch(() => p.keyboard.press('Escape')); await p.waitForTimeout(500);
// fb6：回書櫃「自編教材」
await p.getByRole('button', { name: '回首頁' }).click(); await p.waitForTimeout(1200);
await p.getByRole('tab', { name: '自編教材' }).click(); await p.waitForTimeout(800);
const readBtn = p.getByRole('button', { name: '閱讀「木蘭詩」' }).first();
await readBtn.evaluate(e => e.setAttribute('data-card', '1'));
await p.mouse.move(1430, 890);
await ring(p, [p.locator('[data-card]'), p.getByRole('tab', { name: '自編教材' })]); await shot(p, 'fb6.png'); await unring(p);
// fb7：學生閱讀，點第一段：段落膠囊最上面是朗讀播放鍵
await readBtn.click(); await p.waitForTimeout(2500);
const pt = await textPoint(p, '[data-para]', '軍書十二卷', 1);
await p.mouse.click(pt.x, pt.y); await p.waitForTimeout(600);
await ring(p, [p.locator('[data-para]').first(), p.locator('[aria-label$="段的說明"]').first()]);
await p.mouse.move(1430, 890); await shot(p, 'fb7.png');
await b.close();
