import { start } from './common.mjs';
const { b, p } = await start();
await p.setViewportSize({ width: 1024, height: 768 });
const pages = [['觀星學習單','認識夏季大三角','#fde68a'],['織女星','天琴座最亮的星，距離約 25 光年','#bfdbfe'],['牛郎星','天鷹座最亮的星，距離約 17 光年','#bbf7d0'],['天津四','天鵝座最亮的星，距離約 2600 光年','#fbcfe8']];
const imgs = [];
for (const [t,s,c] of pages) {
  await p.setContent(`<body style="margin:0;font-family:'PingFang TC',sans-serif"><section style="width:1024px;height:768px;box-sizing:border-box;padding:70px;background:${c}"><h1 style="font-size:72px;margin:0 0 24px">${t}</h1><p style="font-size:34px">${s}</p><div style="margin-top:50px;width:260px;height:260px;border-radius:50%;background:#1e3a8a"></div></section></body>`);
  imgs.push((await p.screenshot({ type: 'png' })).toString('base64'));
}
await p.setContent(`<html><head><style>@page{size:1024px 768px;margin:0}body{margin:0}img{display:block;width:1024px;height:768px;page-break-after:always}</style></head><body>${imgs.map(i=>`<img src="data:image/png;base64,${i}">`).join('')}</body></html>`);
await p.pdf({ path: decodeURIComponent(new URL('./assets/', import.meta.url).pathname) + '觀星學習單.pdf', width: '1024px', height: '768px', printBackground: true });
await b.close(); console.log('ok');
