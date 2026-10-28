// 聲音播放中。對應 Figma：g15(181:124)
import { open, insertAfter, ring, unring, shot, IMG } from './gcommon.mjs';
const { b, p } = await open('自然科學 5下', '自然');
await insertAfter(p, 1, '聲音');
const up = p.getByRole('button', { name: '上傳音檔' }).first();
console.log('up', await up.count());
const [fc] = await Promise.all([p.waitForEvent('filechooser'), up.click()]);
await fc.setFiles(IMG + 'sound.wav'); await p.waitForTimeout(1000);
const blk = p.locator('main [data-row-index="2"] [data-block-id]').first();
console.log(await blk.innerText());
const play = blk.locator('button[aria-label="播放"]').first();
await play.click(); await p.waitForTimeout(400);
const pause = blk.locator('button[aria-label="暫停"]').first();
console.log('pause', await pause.count());
await p.mouse.move(1430, 890);
await ring(p, [pause, blk]); await shot(p, 'g15.png');
await b.close();
