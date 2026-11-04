// 編輯時按元件角標打開右側「補充內容」面板（已掛兩則文字，下方「＋ 新增一則」）。對應 Figma：22-h-image-popup(86:57)
// 2026-11-03 新增：新增類按鈕的＋改到文字左邊，原圖沒有腳本，補寫這支
import { open, shot } from './gcommon.mjs';
const { b, p } = await open('自然科學 5下', '星星的世界');
const blk = p.locator('main [data-block-id]').filter({ hasText: '晴朗的夜晚' }).last();
await blk.evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(400);
const bb = await blk.boundingBox(); await p.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2); await p.waitForTimeout(500);
await blk.locator('xpath=ancestor::*[@data-row-index][1]').getByRole('button', { name: /^補充內容 \d+ 項$/ }).click(); await p.waitForTimeout(800);
await p.mouse.move(1430, 890);
await shot(p, '22-h-image-popup.png');
await b.close();
