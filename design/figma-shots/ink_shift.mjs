// 師生連動整合：畫記用頁座標存，頁內捲動後跟文字對不上。對應 Figma：整合區「畫記怎麼存」
import { start, ring, shot } from './common.mjs';
const URL='https://textbookforwork.github.io/textbook-editor/';
const { b, p } = await start(); p.setDefaultTimeout(8000);
await p.goto(URL); await p.evaluate(() => { localStorage.clear(); localStorage.setItem('ds-editor:signed-in','1'); localStorage.setItem('ds-reader:prefs', JSON.stringify({ size: 32, lineHeight: null, font: 'auto', ruby: true })); });
await p.goto(URL + '#/read/book/mulan'); await p.reload(); await p.waitForTimeout(2500);
const pos = await p.evaluate(() => { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) if (n.textContent.includes('唧唧復唧唧')) { const r = document.createRange(); r.setStart(n, 0); r.setEnd(n, 5); const b = r.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height }; } });
console.log(pos);
await p.locator('button', { hasText: '螢光筆' }).first().click(); await p.waitForTimeout(300);
await p.mouse.move(pos.x + pos.w / 2, pos.y + 2); await p.mouse.down(); await p.mouse.move(pos.x + pos.w / 2, pos.y + pos.h - 2, { steps: 12 }); await p.mouse.up();
await p.waitForTimeout(300);
await shot(p, 'ink-before.png');
// 頁內捲動（字放大後這一頁變成可以捲）
await p.mouse.move(700, 450); for (let i = 0; i < 6; i++) { await p.mouse.wheel(0, 200); await p.waitForTimeout(150); }
await p.waitForTimeout(600);
await shot(p, 'ink-after.png');
await b.close();
