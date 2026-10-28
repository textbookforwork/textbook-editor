// 流程 B（橫排・自然）。對應 Figma：flowB-1-h～7-h（185:15～185:21）
import { start, login, ring, unring, shot, cardMore } from './common.mjs';
import { textPoint } from './common3.mjs';
const { b, p } = await start(); p.setDefaultTimeout(8000);
await login(p);
const more = cardMore(p, '自然科學 5下');
await more.evaluate(e => e.scrollIntoView({ block: 'center' })); await more.click(); await p.waitForTimeout(400);
const item = p.getByRole('menuitem', { name: /建立自編/ });
await p.mouse.move(1430, 890);
await ring(p, [item]); await shot(p, 'fb1h.png'); await unring(p);
await item.click(); await p.waitForTimeout(600);
const dlg = p.getByRole('dialog', { name: '建立自編' });
await dlg.getByPlaceholder('請輸入自編名稱').fill('自然');
await ring(p, [dlg]); await shot(p, 'fb2h.png'); await unring(p);
await dlg.getByRole('button', { name: '建立', exact: true }).click(); await p.waitForTimeout(2500);
// fb3
const blk = p.locator('main [data-block-id]').filter({ hasText: '晴朗的夜晚' }).last();
await blk.evaluate(e => e.scrollIntoView({ block: 'center', inline: 'center' })); await p.waitForTimeout(400);
const bb = await blk.boundingBox();
await p.mouse.click(bb.x + bb.width / 2, bb.y + bb.height * 0.5); await p.waitForTimeout(700);
const addBtn = p.locator('button[title="新增補充資源"], button[aria-label="補充"]').first();
const cap = addBtn.locator('xpath=ancestor::*[.//button[@title="刪除" or @aria-label="刪除"]][1]');
await ring(p, [blk, cap]); await shot(p, 'fb3h.png'); await unring(p);
// fb4
await addBtn.click(); await p.waitForTimeout(900);
const panel = p.getByRole('dialog', { name: '補充內容設定' });
await ring(p, [addBtn, panel]); await panel.evaluate(e => e.style.outlineOffset = '-8px'); await p.mouse.move(700, 890); await shot(p, 'fb4h.png'); await unring(p);
await panel.getByRole('button', { name: '關閉' }).first().click(); await p.waitForTimeout(400);
await p.keyboard.press('Escape'); await p.mouse.click(1430, 880); await p.waitForTimeout(300);
// fb5
await p.locator('button[title="共享教材"], button[aria-label="共享教材"]').first().click(); await p.waitForTimeout(700);
const d5 = p.getByRole('dialog').last();
await ring(p, [d5]); await shot(p, 'fb5h.png'); await unring(p);
await d5.getByRole('button', { name: /確認|共享|好/ }).last().click().catch(() => p.keyboard.press('Escape')); await p.waitForTimeout(500);
// fb6
await p.getByRole('button', { name: '回首頁' }).click(); await p.waitForTimeout(1200);
await p.getByRole('tab', { name: '自編教材' }).click(); await p.waitForTimeout(800);
const readBtn = p.getByRole('button', { name: '閱讀「自然」' }).first();
await readBtn.evaluate(e => { e.scrollIntoView({ block: 'center' }); e.setAttribute('data-card', '1'); }); await p.waitForTimeout(300);
await p.mouse.move(1430, 890);
await ring(p, [p.locator('[data-card]'), p.getByRole('tab', { name: '自編教材' })]); await shot(p, 'fb6h.png'); await unring(p);
// fb7
await readBtn.click(); await p.waitForTimeout(2500);
await p.keyboard.press('ArrowRight'); await p.waitForTimeout(1200);
const S = '晴朗的夜晚抬頭往天空看，可以看到許多一閃一閃的星星。古時候的人把亮度接近、位置相鄰的星星連起來想像成圖案，這些圖案就叫做星座。';
const pt = await textPoint(p, 'body', S, 6); console.log('pt', pt);
await p.mouse.click(pt.x, pt.y); await p.waitForTimeout(700);
await p.evaluate((S) => {
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement.closest('rt') ? 2 : 1 });
  let n; let text=''; const nodes=[]; while ((n = w.nextNode())) { nodes.push([n, text.length]); text += n.data; }
  const s = text.indexOf(S); const e = s + S.length;
  const f = pos => { const [nd,o] = nodes.filter(([x,o])=>o<=pos).pop(); return [nd,pos-o]; };
  const r = document.createRange(); r.setStart(...f(s)); const [en, eo] = f(e - 1); r.setEnd(en, eo + 1);
  const b = r.getBoundingClientRect();
  const d = document.createElement('div');
  Object.assign(d.style, { position:'fixed', left:(b.left-8)+'px', top:(b.top-8)+'px', width:(b.width+16)+'px', height:(b.height+16)+'px', border:'4px solid #FF854A', borderRadius:'8px', zIndex: 99999, pointerEvents:'none', boxSizing:'border-box' });
  document.body.appendChild(d);
}, S);
await ring(p, [p.getByRole('dialog').last()]); await p.mouse.move(1430, 890); await shot(p, 'fb7h.png');
await b.close();
