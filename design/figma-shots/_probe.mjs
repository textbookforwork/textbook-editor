import { start, login, buttons } from './common.mjs';
const { b, p } = await start(); await login(p);
await p.getByRole('button', { name: '更多' }).first().click(); await p.waitForTimeout(400);
console.log('MENU', await p.evaluate(() => [...document.querySelectorAll('[role=menu] *, [role=menuitem]')].filter(e=>e.getAttribute('role')==='menuitem').map(e=>e.innerText)));
await p.getByRole('menuitem', { name: /建立自編/ }).click(); await p.waitForTimeout(600);
console.log('DIALOGS', await p.evaluate(() => [...document.querySelectorAll('[role=dialog]')].map(d => (d.getAttribute('aria-label')||'') + ' :: ' + d.innerText.replace(/\n/g,' | ').slice(0,300))));
console.log(await p.evaluate(() => [...document.querySelectorAll('[role=dialog] input')].map(i => i.type + ':' + i.placeholder + ':' + (i.getAttribute('aria-label')||''))));
await p.screenshot({ path: 'out/_probe.png' });
await b.close();
