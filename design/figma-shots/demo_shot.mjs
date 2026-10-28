// 師生同步 Demo 截圖（整合區 ①②，熊熊 254:2、BE 254:31）：①跟隨翻頁 老師/學生 ②截圖題 老師派題/學生作答
import { start } from './common.mjs';
const { b, p } = await start(); await p.setViewportSize({ width: 1800, height: 1100 });
await p.goto('http://localhost:5288/index.html'); await p.waitForTimeout(2500);
const dev = async (side, name) => {
  await p.locator('.bar .seg button', { hasText: side }).first().click(); await p.waitForTimeout(700);
  await p.locator('.dev').first().screenshot({ path: 'out/' + name });
  await p.locator('.bar .seg button', { hasText: '並排' }).first().click(); await p.waitForTimeout(400);
};
const run = async (until) => { for (let i = 0; i < 25; i++) { const t = await p.locator('.step.now .txt').first().innerText().catch(() => ''); if (until(t)) return; await p.locator('.step.now .mini-primary').first().click(); await p.waitForTimeout(900); } };
// ①：開課與同步，學生加入跟隨
await p.locator('.chapters button', { hasText: '開課與同步' }).click(); await p.waitForTimeout(1000);
await run((t) => t.includes('鎖定螢幕'));
await dev('老師端', 'demo-follow-teacher.png'); await dev('學生端', 'demo-follow-student.png');
// ②：任務 → 截圖題
await p.locator('.chapters button', { hasText: '任務' }).click(); await p.waitForTimeout(1000);
await run((t) => t.includes('直接在課本上作答'));
await dev('老師端', 'demo-shot-teacher.png');
await p.locator('.step.now .mini-primary').first().click(); await p.waitForTimeout(1200);
await dev('學生端', 'demo-shot-student.png');
await b.close();
