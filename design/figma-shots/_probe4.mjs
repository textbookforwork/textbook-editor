import { open } from './gcommon.mjs';
const { b, p } = await open('國文 2下', '木蘭詩');
const rows = await p.evaluate(() => [...document.querySelectorAll('main [data-row-index]')].map(r => r.getAttribute('data-row-index') + ': ' + (r.innerText||'').replace(/\s+/g,' ').slice(0,30)));
console.log(rows.slice(0,12).join('\n'));
await b.close();
