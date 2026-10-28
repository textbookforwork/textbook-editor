import { start } from './common.mjs';
const URL='https://textbookforwork.github.io/textbook-editor/';
for (const [vw,vh,size] of [[1440,900,null],[1024,768,null],[1440,900,32]]) {
  const { b, p } = await start(); await p.setViewportSize({ width: vw, height: vh });
  await p.goto(URL); await p.evaluate((size) => { localStorage.clear(); localStorage.setItem('ds-editor:signed-in','1'); if (size) localStorage.setItem('ds-editor:reader-prefs:v1', JSON.stringify({ size, lineHeight: null, font: 'auto', ruby: true })); }, size);
  for (const book of ['demo','mulan']) {
    await p.goto(URL + '#/read/book/' + book); await p.reload(); await p.waitForTimeout(2500);
    const t = await p.evaluate(() => { const n = [...document.querySelectorAll('small,span,div')].find(e => /^\/?\s*\d+$/.test(e.textContent.trim()) && e.closest('nav,aside')); return document.body.innerText.match(/共\s*\d+\s*頁|\/\s*\d+/)?.[0] || ''; });
    const pages = await p.evaluate(() => document.querySelectorAll('[data-page-index]').length);
    console.log(vw+'x'+vh, 'size', size, book, 'pages', pages, t);
  }
  await b.close();
}
