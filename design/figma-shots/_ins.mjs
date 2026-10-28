import { start } from './common.mjs';
const URL = process.argv[2];
const { b, p } = await start(); p.setDefaultTimeout(8000);
await p.goto(URL); await p.evaluate(() => { localStorage.clear(); localStorage.setItem('ds-editor:signed-in','1'); localStorage.setItem('ds-editor:role','admin'); });
await p.goto(URL + '#/read/book/mulan'); await p.reload(); await p.waitForTimeout(2500);
await p.getByRole('button', { name: '進入自編' }).click(); await p.waitForTimeout(2500);
// 第一頁最後一個插入點：插在「雄兔」那段後面，元件會被推到第二頁
const plus = p.locator('button[aria-label="新增元件"]');
const n = await plus.count(); console.log('plus', n);
const info = await plus.evaluateAll(els => els.map(e => { const r = e.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y)]; }));
console.log(JSON.stringify(info));
// 選第一頁裡最左邊（直排最後）的那個
const idx = 8;
await plus.nth(idx).evaluate(e => e.click()); await p.waitForTimeout(600);
await p.screenshot({ path: 'out/_ins0.png' });
const before = await p.evaluate(() => new Set([...document.querySelectorAll('[data-block-id]')].map(e => e.dataset.blockId)).size);
const ids0 = await p.evaluate(() => [...document.querySelectorAll('[data-block-id]')].map(e => e.dataset.blockId));
await p.getByRole('button', { name: '圖片' }).last().click(); await p.waitForTimeout(800);
await p.waitForTimeout(1800);
const r = await p.evaluate((ids0) => { const el = [...document.querySelectorAll('[data-block-id]')].find(e => !ids0.includes(e.dataset.blockId)); if (!el) return 'none'; const b = el.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), innerWidth, innerHeight]; }, ids0);
console.log('new block rect', r);
await p.screenshot({ path: 'out/_ins.png' });
await b.close();
