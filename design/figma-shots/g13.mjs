import { open, ring, unring, shot, dragFile, IMG } from './gcommon.mjs';
const { b, p } = await open('自然科學 5下', '自然');
const r1 = await p.locator('main [data-row-index="1"]').boundingBox();
const x = r1.x + 400, y = r1.y + r1.height + 30;
await p.mouse.move(5, 600);
await dragFile(p, 'main', IMG + 'sky.png', 'image/png', ['dragenter', 'dragover'], x, y);
await p.waitForTimeout(400);
await dragFile(p, 'main', IMG + 'sky.png', 'image/png', ['dragover'], x, y);
await p.waitForTimeout(300);
await ring(p, [p.locator('main').first()]); await p.locator('main').first().evaluate(e => e.style.outlineOffset = '-6px'); await shot(p, 'g13a.png'); await unring(p);
// find insertion line candidates
console.log(await p.evaluate(() => [...document.querySelectorAll('main *')].filter(e => { const r = e.getBoundingClientRect(); return r.height > 0 && r.height <= 4 && r.width > 300; }).map(e => e.tagName + '.' + e.className.toString().slice(0, 30) + ' ' + JSON.stringify(e.getBoundingClientRect().toJSON())).slice(0, 10)));
await dragFile(p, 'main', IMG + 'sky.png', 'image/png', ['drop'], x, y);
await p.waitForTimeout(300);
const ph = p.locator('main [data-row-index="2"] [data-block-id]').first(); console.log('ph', await ph.innerText()); await ring(p, [ph]); await shot(p, 'g13b.png');
await b.close();
