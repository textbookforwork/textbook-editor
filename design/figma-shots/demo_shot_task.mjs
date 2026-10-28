// 師生同步 Demo（claude.ai/artifact/UMLPzod61m342THQRvAYbi，第 35 版）的截圖題三張圖
// 對應 Figma 整合區 ②（熊熊 254:2、BE 254:31）
//   shot-1-teacher-assign.png  老師：派任務 → 截圖題，派出前（指定目前這一頁 p.2）
//   shot-2-student-go.png      學生自己翻到 p.5，收到「老師派了截圖題」通知，按「前往 p.2 作答」之前
//   shot-3-student-draw.png    學生按下後被帶到 p.2，用畫筆在課本上作答（還沒送出）
// 用法：DEMO=<Demo 的 index.html 所在資料夾> node demo_shot_task.mjs
//   （Demo 原始檔用 Artifact 工具 read 下載；腳本自己開一個本機伺服器讓 assets/ 讀得到）
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '/Users/elaine/.claude/skills/gstack/node_modules/playwright/index.mjs';

const DEMO = process.env.DEMO || '/private/tmp/claude-501/-Users-elaine-vault/930de306-0dca-4c39-8e67-5a1b8c2535c6/scratchpad/demo';
const OUT = decodeURIComponent(new URL('./out/', import.meta.url).pathname);
const TYPES = { '.html': 'text/html; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  const f = path.join(DEMO, decodeURIComponent(req.url.split('?')[0]) === '/' ? 'index.html' : decodeURIComponent(req.url.split('?')[0]));
  fs.readFile(f, (err, buf) => { if (err) { res.writeHead(404); res.end(); return; } res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); res.end(buf); });
}).listen(0);
const port = server.address().port;

const b = await chromium.launch();
// 裝置畫面剛好 1440×900（縮放 1），存圖 2 倍
const p = await b.newPage({ viewport: { width: 1472, height: 1300 }, deviceScaleFactor: 2 });
p.on('pageerror', (e) => console.log('PAGEERR', e.message));
await p.goto(`http://localhost:${port}/index.html`);
await p.waitForTimeout(2000);
const quiet = () => p.evaluate(() => { S.toasts = { teacher: [], student: [], admin: [] }; refresh(); });
const dev = () => p.locator('.dev').first();
const save = async (name) => { await quiet(); await p.waitForTimeout(400); await dev().screenshot({ path: OUT + name }); console.log('saved', name, await dev().evaluate((e) => [e.offsetWidth, e.offsetHeight])); };

// 1. 老師：派任務 → 截圖題（派出前）
await p.evaluate(() => {
  goChapter(5); S.guide = false; S.view = 'teacher';
  S.t.page = 0; S.t.tool = null; S.focus = null; S.task = null;
  S.t.pop = 'task'; S.compose = 'shot'; S.draft = { q: '', showQ: false, showOpt: false, n: 4, opts: ['', '', '', '', '', ''] };
  refresh();
});
await p.waitForTimeout(800);
await save('shot-1-teacher-assign.png');

// 2. 學生自己翻到 p.5，老師派出截圖題，學生收到通知
await p.evaluate(() => {
  S.view = 'student';
  if (S.cls.mode === 'lock') setMode('free');
  setFollow(false); S.s.page = 1; S.s.tool = null; S.s.pop = null;
  sendTask('shot', {}); S.t.pop = null;
  refresh();
});
await p.waitForTimeout(1000);
await save('shot-2-student-go.png');

// 3. 按「前往 p.2 作答」，在照片上用畫筆連出三顆亮星
await dev().getByRole('button', { name: /前往 p\.2 作答/ }).click();
await p.waitForTimeout(800);
const box = await dev().locator('.sheet.pg').boundingBox();
const at = ([x, y]) => [box.x + (x / 1000) * box.width, box.y + (y / 1000) * box.width];
const tri = [[141, 247], [359, 370], [77, 419], [141, 247]];
await p.mouse.move(...at(tri[0])); await p.mouse.down();
for (let i = 1; i < tri.length; i++) {
  const [a, c] = [tri[i - 1], tri[i]];
  for (let t = 0.1; t <= 1.001; t += 0.1) await p.mouse.move(...at([a[0] + (c[0] - a[0]) * t, a[1] + (c[1] - a[1]) * t]));
}
await p.mouse.up();
// 標題底下再畫一道底線
const ul = [[20, 64], [180, 66]];
await p.mouse.move(...at(ul[0])); await p.mouse.down();
for (let t = 0.1; t <= 1.001; t += 0.1) await p.mouse.move(...at([ul[0][0] + (ul[1][0] - ul[0][0]) * t, ul[0][1] + (ul[1][1] - ul[0][1]) * t]));
await p.mouse.up();
await p.evaluate(() => { S.s.inkPop = false; refresh(); });
await save('shot-3-student-draw.png');
console.log(await p.evaluate(() => ({ answering: !!document.querySelectorAll('.sheet.answering').length, oldFlag: document.body.innerText.includes('老師正在收這一頁'), mine: S.task.mine.length })));
await b.close();
server.close();
