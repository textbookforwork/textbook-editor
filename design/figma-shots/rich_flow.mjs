import { start, login, ring, unring, shot, makeCopy } from './common.mjs';
const IMG = decodeURIComponent(new URL('./assets/', import.meta.url).pathname) + '夏季大三角.png';
const { b, p } = await start(); p.setDefaultTimeout(8000);
await login(p);
await makeCopy(p, '自然科學 5下', '自然');
await p.waitForTimeout(1000);
const blk = p.locator('main [data-row-index="1"] [data-block-id]').first();
await blk.click(); await p.waitForTimeout(600);
const add = p.locator('button[title="新增補充資源"]');
const cap = add.locator('xpath=ancestor::*[.//button[@title="刪除"]][1]');
await p.mouse.move(1430, 890);
await ring(p, [add, blk]); await shot(p, 'r1.png'); await unring(p);
await add.click(); await p.waitForTimeout(800);
const panel = p.getByRole('dialog', { name: '補充內容設定' });
const richItem = panel.getByRole('menuitem', { name: '大彈窗' });
console.log('menu', await panel.getByRole('menuitem').allInnerTexts());
await ring(p, [richItem]); await panel.evaluate(()=>{}); await shot(p, 'r2.png'); await unring(p);
await richItem.click(); await p.waitForTimeout(800);
const editBtn = panel.getByRole('button', { name: '編輯內容' });
console.log('edit btn', await editBtn.count());
await editBtn.click(); await p.waitForTimeout(1000);
const modal = p.getByRole('dialog', { name: '編輯大彈窗' });
await p.mouse.move(1430, 890);
await ring(p, [modal]); await modal.evaluate(e => e.style.outlineOffset = '-6px'); await shot(p, 'r3.png'); await unring(p);
// type
const ce = modal.locator('[contenteditable="true"]').first();
await ce.click(); await p.keyboard.type('夏季大三角'); await p.waitForTimeout(500);
const mini = modal.locator('button[title="章"]').locator('xpath=..');
await ring(p, [mini]); await shot(p, 'r4.png'); await unring(p);
await modal.locator('button[title="章"]').click(); await p.waitForTimeout(300);
await p.keyboard.press('End'); await p.keyboard.press('Enter'); await p.waitForTimeout(300);
await p.keyboard.type('織女星、牛郎星和天津四，是夏天晚上最容易找到的三顆亮星。把它們連起來，就是一個大三角形。'); await p.waitForTimeout(400);
const fc = p.waitForEvent('filechooser');
await modal.locator('button[title="插入圖片"]').last().click();
await (await fc).setFiles(IMG); await p.waitForTimeout(2000);
await p.mouse.move(1430, 890);
const lines = modal.locator('[data-rich-id]');
await ring(p, [lines.nth(0), lines.nth(2)]); await shot(p, 'r5.png'); await unring(p);
// r6
const addPage = modal.getByRole('button', { name: '新增頁面' });
await addPage.click(); await p.waitForTimeout(800);
await ring(p, [modal.getByRole('tablist', { name: '頁面' }), addPage]); await p.mouse.move(1430, 890); await shot(p, 'r6.png'); await unring(p);
// r7
const ce2 = modal.locator('[contenteditable="true"]').first();
await ce2.click(); await p.keyboard.type('夏季星空觀察紀錄'); await p.waitForTimeout(300);
let got = false;
for (let i = 0; i < 6 && !got; i++) {
  const fc2 = p.waitForEvent('filechooser');
  await modal.locator('button[title="插入圖片"]').last().click({ timeout: 3000 }).catch(e => console.log('no mini', i));
  try { await (await fc2).setFiles(IMG); } catch { console.log('no chooser'); break; }
  for (let k = 0; k < 10; k++) { await p.waitForTimeout(150); if (await modal.getByRole('status').count()) { got = true; break; } }
  console.log('insert', i, got);
  if (!got) { // put caret into last text line for next mini
    const last = modal.locator('[contenteditable="true"]').last(); await last.click().catch(()=>{});
  }
}
if (got) { const st = modal.getByRole('status'); await ring(p, [st]); await p.mouse.move(1430, 890); await shot(p, 'r7.png'); await unring(p); }
// save
await modal.getByRole('button', { name: '儲存', exact: true }).click(); await p.waitForTimeout(800);
await panel.getByRole('button', { name: '關閉' }).first().click(); await p.waitForTimeout(500);
await p.keyboard.press('Escape'); await p.mouse.click(1430, 880); await p.waitForTimeout(500);
const badge = p.locator('main [data-row-index="1"]').locator('xpath=..').locator('[aria-label^="補充內容"]').first();
console.log('badge', await badge.count());
await ring(p, [badge, blk]); await p.mouse.move(1430, 890); await shot(p, 'r8.png'); await unring(p);
// r9
await p.getByRole('button', { name: '閱讀模式' }).click(); await p.waitForTimeout(2500);
const t = p.getByText('抬頭看看夜空').first();
await t.click(); await p.waitForTimeout(1200);
const dots = p.locator('[aria-label^="第 1 頁，共"]');
console.log('dots', await dots.count(), await p.locator('[role="dialog"]').evaluateAll(es => es.map(e => e.getAttribute('aria-label'))));
const dlg = p.locator('[role="dialog"]').last();
await p.evaluate(() => {
  const box = (r, pad, rad) => { const d = document.createElement('div'); Object.assign(d.style, { position: 'fixed', left: (r.left - pad) + 'px', top: (r.top - pad) + 'px', width: (r.width + pad * 2) + 'px', height: (r.height + pad * 2) + 'px', border: '4px solid #FF854A', borderRadius: rad, zIndex: 999999, pointerEvents: 'none', boxSizing: 'border-box' }); document.body.appendChild(d); };
  const dlg = [...document.querySelectorAll('[role=dialog]')].pop();
  box(dlg.getBoundingClientRect(), 8, getComputedStyle(dlg).borderRadius);
  const prev = [...dlg.querySelectorAll('button[aria-label="上一頁"]')].pop(), next = [...dlg.querySelectorAll('button[aria-label="下一頁"]')].pop();
  const a = prev.getBoundingClientRect(), b = next.getBoundingClientRect();
  box(new DOMRect(a.left, Math.min(a.top, b.top), b.right - a.left, Math.max(a.bottom, b.bottom) - Math.min(a.top, b.top)), 6, '999px');
});
await p.mouse.move(1430, 890); await shot(p, 'r9.png');
await b.close();
