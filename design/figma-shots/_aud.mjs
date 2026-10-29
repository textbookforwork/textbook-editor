import { start } from './common.mjs';
import { insertAfter } from './gcommon.mjs';
const URL='http://localhost:5191/';
const { b, p } = await start(); p.setDefaultTimeout(8000);
await p.goto(URL); await p.evaluate(() => { localStorage.clear(); localStorage.setItem('ds-editor:signed-in','1'); localStorage.setItem('ds-editor:role','admin'); });
await p.goto(URL + '#/read/book/mulan'); await p.reload(); await p.waitForTimeout(2500);
await p.locator('button', { hasText: '進入自編' }).first().click(); await p.waitForTimeout(3000);
await insertAfter(p, 3, '聲音'); await p.waitForTimeout(1200);
const blk = p.locator('main [data-block-id]:has(button[aria-label="上傳音檔"])').first(); await blk.screenshot({ path: 'out/_aud_empty.png' });
const btn = p.locator('main button:visible', { hasText: '上傳音檔' }).first();
console.log('buttons', await p.locator('button[aria-label="上傳音檔"]').count(), await btn.isVisible());

const fcP = p.waitForEvent('filechooser', { timeout: 4000 });
await btn.click(); const fc = await fcP; await fc.setFiles('/Users/elaine/vault/projects/V1/底層改造/design/media-samples/mulan-recite-1.mp3'); await p.waitForTimeout(1500);
console.log('after:', await p.locator('button[aria-label="上傳音檔"]').count(), 'play enabled:', await p.locator('main button[aria-label="播放"]:not([disabled])').count(), 'title:', await p.evaluate(() => [...document.querySelectorAll('main [data-block-id]')].map(e=>e.innerText).filter(t=>t.includes('mp3')).join('|')));

await b.close();
