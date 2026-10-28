// 管理員改已發布的數位教科書：兩個入口 → 編輯器。對應 Figma：A-2 區 admin-edit-1～3（247:6、247:9、247:13）
import { start, login, ring, unring, shot, cardMore } from './common.mjs';
const { b, p } = await start(); p.setDefaultTimeout(8000);
await login(p);
await p.locator('button[title="切換身分、登出"]').click(); await p.waitForTimeout(300);
await p.getByRole('menuitemradio', { name: '系統管理員' }).click(); await p.waitForTimeout(800);
// ① 書櫃「⋯」→ 進入編輯
await cardMore(p, '國文 2下').click(); await p.waitForTimeout(400);
const edit = p.getByRole('menuitem', { name: /進入編輯/ });
await p.mouse.move(1430, 890);
await ring(p, [edit]); await shot(p, 'admin-edit-1.png'); await unring(p);
await p.reload(); await p.waitForTimeout(1500);
// ② 閱讀數位教科書時，左欄「進入自編」
await p.getByRole('button', { name: '閱讀「國文 2下」' }).first().click(); await p.waitForTimeout(2500);
const enter = p.locator('button', { hasText: '進入自編' }).first();
await p.mouse.move(1430, 890);
await ring(p, [enter]); await shot(p, 'admin-edit-2.png'); await unring(p);
// ③ 直接改這本
await enter.click(); await p.waitForTimeout(2500);
await p.mouse.move(1430, 890);
await ring(p, [p.locator('main [data-page-index="0"]').first()]); await shot(p, 'admin-edit-3.png');
await b.close();
