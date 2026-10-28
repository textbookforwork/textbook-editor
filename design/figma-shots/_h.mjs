import { start } from './common.mjs';
const { b, p } = await start(); await p.setViewportSize({ width: 1800, height: 1100 });
await p.goto('http://localhost:5288/index.html'); await p.waitForTimeout(2500);
await p.locator('.chapters button', { hasText: '任務' }).click(); await p.waitForTimeout(1000);
for (let i = 0; i < 25; i++) { const t = await p.locator('.step.now .txt').first().innerText().catch(() => ''); if (t.includes('再派截圖題')) break; await p.locator('.step.now .mini-primary').first().click(); await p.waitForTimeout(900); }
console.log(await p.locator(".dev").first().evaluate(d => [...d.querySelectorAll("button")].filter(x=>x.offsetParent).map(x => (x.innerText||x.getAttribute("aria-label")||"").trim().slice(0,14)).join(" | ")));
console.log(await p.evaluate(() => [...document.querySelectorAll('.dev-label b')].map(x => x.textContent)));
await b.close();
