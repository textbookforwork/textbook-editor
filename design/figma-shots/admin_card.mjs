// 管理員自建教材的書卡：建立教材（南一／國文 3上／國中／國語文）→ 發布 → 回書櫃，圈書卡左上版次「115 南一 國中」。
// 對應 Figma：書櫃區 58-admin-own-card(313:2)，說明文字 313:3（2026-11-03 新增，放在 53-admin-create 正下方）
import { start, login, ring, unring, shot } from './common.mjs';
const { b, p } = await start(); p.setDefaultTimeout(8000);
await login(p);
await p.locator('button[title="切換身分、登出"]').click(); await p.waitForTimeout(300);
await p.getByRole('menuitemradio', { name: '系統管理員' }).click(); await p.waitForTimeout(800);
await p.getByRole('button', { name: '建立教材' }).click(); await p.waitForTimeout(500);
const dlg = p.getByRole('dialog', { name: '建立教材' });
await dlg.getByPlaceholder('請輸入出版社名稱').fill('南一');
await dlg.getByPlaceholder('請輸入教材名稱').fill('國文 3上');
await dlg.getByRole('radio', { name: '國中' }).click();
await dlg.getByRole('radio', { name: '國文' }).click();
await dlg.getByRole('button', { name: '建立', exact: true }).click(); await p.waitForTimeout(2500);
await p.locator('button[title^="發布到書櫃"]').click(); await p.waitForTimeout(700);
await p.keyboard.press('Escape'); await p.waitForTimeout(300);
await p.goto('https://textbookforwork.github.io/textbook-editor/#/shelf/textbook'); await p.waitForTimeout(1500);
const card = p.getByRole('button', { name: '閱讀「國文 3上」' }).first().locator('xpath=ancestor::*[.//button[@aria-label="更多"]][1]');
await card.evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(400);
const ed = card.getByText('115 南一 國中', { exact: true }).first();
console.log('edition count', await card.getByText('115 南一 國中', { exact: true }).count());
await p.mouse.move(1430, 890);
await ring(p, [ed]);
// 沒上傳封面的書卡是科目色（國語文＝橘），橘框會融進去：框內外各墊一圈白
await ed.evaluate(e => { e.style.outlineWidth = '3px'; e.style.outlineOffset = '3px'; e.style.boxShadow = '0 0 0 3px #fff, 0 0 0 8px #fff'; e.style.borderRadius = '4px'; });
await shot(p, '58-admin-own-card.png'); await unring(p);
await b.close();
