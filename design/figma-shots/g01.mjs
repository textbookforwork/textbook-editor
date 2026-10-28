import { start, login, ring, unring, shot, makeCopy, SHOTS } from './common.mjs';
const IMG = decodeURIComponent(new URL('./assets/', import.meta.url).pathname);
const { b, p } = await start(); p.setDefaultTimeout(8000);
await p.route('**/api.microlink.io/**', r => r.abort());
await login(p);
// make a cover test image: shelf cover of 自然 card
await p.locator('img').nth(2).screenshot({ path: IMG + 'cover.png' }).catch(e => console.log('img fail', e.message));
await makeCopy(p, '國文 2下', '木蘭詩');
const home = p.getByRole('button', { name: '回首頁' });
await ring(p, [home]);
await p.screenshot({ path: SHOTS + 'g01a.png', clip: { x: 0, y: 0, width: 720, height: 110 } }); await unring(p);
await home.click(); await p.waitForTimeout(1200);
await p.getByRole('tab', { name: '數位教科書' }).click(); await p.waitForTimeout(500);
await makeCopy(p, '自然科學 5下', '自然');
const home2 = p.getByRole('button', { name: '回首頁' });
await ring(p, [home2]);
await p.screenshot({ path: SHOTS + 'g01b.png', clip: { x: 0, y: 0, width: 720, height: 110 } }); await unring(p);
// g02
const title = p.getByLabel('教材名稱');
await title.click(); await p.keyboard.press('End'); await p.keyboard.type('（第一單元）');
await ring(p, [title]); await shot(p, 'g02.png'); await unring(p);
await p.keyboard.press('Enter'); await p.waitForTimeout(300);
// g03
await p.locator('button[title="共享教材"]').click(); await p.waitForTimeout(600);
await p.getByRole('button', { name: '前往上傳' }).click(); await p.waitForTimeout(700);
const dlg = p.getByRole('dialog', { name: '課本封面' });
console.log('cover btns', await dlg.locator('button').evaluateAll(es => es.map(e => (e.innerText || e.title || e.getAttribute('aria-label')).trim())));
await p.mouse.move(1430, 890);
await ring(p, [dlg.getByRole('button', { name: '上傳檔案' }), dlg.getByRole('button', { name: '選擇圖片' })]); await shot(p, 'g03a.png'); await unring(p);
const [fc] = await Promise.all([p.waitForEvent('filechooser'), dlg.getByRole('button', { name: '選擇圖片' }).click()]);
await fc.setFiles(IMG + 'cover.png'); await p.waitForTimeout(1500);
console.log('cover btns2', await dlg.locator('button').evaluateAll(es => es.map(e => (e.innerText || e.title || e.getAttribute('aria-label')).trim())));
const frame = dlg.locator('[title="拖曳調整位置"]');
console.log('frame', await frame.boundingBox());
await ring(p, [frame, dlg.getByRole('button', { name: '確認上傳' })]); await shot(p, 'g03b.png');
await b.close();
