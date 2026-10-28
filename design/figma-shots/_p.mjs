import { start, login, buttons } from './common.mjs';
const { b, p } = await start(); await login(p);
await p.locator('button[title="切換身分、登出"]').click(); await p.waitForTimeout(300);
await p.getByRole('menuitemradio', { name: '系統管理員' }).click(); await p.waitForTimeout(800);
await p.getByRole('button', { name: '閱讀「國文 2下」' }).first().click(); await p.waitForTimeout(2500);
console.log(p.url()); console.log((await buttons(p)).filter(x=>!x.startsWith('|')||x.length>3).slice(0,30).join('\n'));
await b.close();
