// 師生同步 Demo：截圖題三步（老師派題指定這一頁 → 學生收到通知按「到那一頁」→ 學生畫記作答）。對應 Figma 整合區 ②
import { start } from './common.mjs';
const { b, p } = await start(); await p.setViewportSize({ width: 1800, height: 1100 });
await p.goto('http://localhost:5288/index.html'); await p.waitForTimeout(2500);
const view = async (side) => { await p.locator('.bar .seg button', { hasText: side }).first().click(); await p.waitForTimeout(600); };
const devShot = async (side, name) => { await view(side); await p.locator('.dev').first().screenshot({ path: 'out/' + name }); await view('並排'); };
const run = async (until) => { for (let i = 0; i < 25; i++) { const t = await p.locator('.step.now .txt').first().innerText().catch(() => ''); if (until(t)) return t; await p.locator('.step.now .mini-primary').first().click(); await p.waitForTimeout(900); } };
await p.locator('.chapters button', { hasText: '任務' }).click(); await p.waitForTimeout(1000);
console.log(await run((t) => t.includes('再派截圖題')));
// 學生先自己翻到別頁（第 5 頁）
const devs = p.locator('.dev');
const stu = devs.nth(1);
for (let i = 0; i < 3; i++) { await stu.locator('.pager button').last().click().catch(() => {}); await p.waitForTimeout(400); }
// 老師：用提示圈一步步點到派出前的畫面
const tea = devs.nth(0);
for (let i = 0; i < 6; i++) {
  const txt = await tea.innerText();
  if (/帶入|這一頁|p\.2/.test(txt) && await tea.locator('.hint').count() && (await tea.locator('.hint').first().innerText()).includes('派')) break;
  const h = tea.locator('.hint').first(); if (!(await h.count())) break;
  console.log('click hint:', (await h.innerText()).slice(0, 20)); await h.click(); await p.waitForTimeout(700);
}
await devShot('老師端', 'demo-shot2-teacher-compose.png');
await tea.locator('.hint').first().click(); await p.waitForTimeout(1200);
await devShot('學生端', 'demo-shot2-student-notice.png');
console.log('student hint:', await stu.locator('.hint').first().innerText().catch(() => 'none'));
await b.close();
