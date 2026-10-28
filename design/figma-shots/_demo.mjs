import { start } from './common.mjs';
const { b, p } = await start();
await p.goto('https://claude.ai/artifact/UMLPzod61m342THQRvAYbi', { waitUntil: 'domcontentloaded' }).catch(e=>console.log('err',e.message));
await p.waitForTimeout(8000);
console.log(p.url(), p.frames().map(f=>f.url().slice(0,80)));
await p.screenshot({ path: 'out/_demo.png' });
await b.close();
