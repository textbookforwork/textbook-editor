import { start, login, ring, unring, shot, makeCopy } from './common.mjs';
const { b, p } = await start(); p.setDefaultTimeout(8000);
await login(p);
await makeCopy(p, '國文 2下', '木蘭詩');
const blk = p.locator('main [data-block-id]').filter({ hasText: '萬里赴戎機' }).last();
await blk.evaluate(e => e.scrollIntoView({ block: 'center', inline: 'center' })); await p.waitForTimeout(400);
const row = blk.locator('xpath=ancestor::*[@data-row-id][1]');
const badge = row.locator('[aria-label^="補充內容"]').first();
console.log('badge', await badge.count(), await badge.getAttribute('aria-label').catch(() => null));
await p.mouse.move(1430, 890);
await ring(p, [blk, badge]); await shot(p, 'g08c.png'); await unring(p);
// g08d: select 鐵衣
const ce = blk.locator('[contenteditable="true"]').first();
const bb = await blk.boundingBox();
await p.mouse.click(bb.x + bb.width / 2, bb.y + 30); await p.waitForTimeout(300);
await ce.evaluate((root) => {
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement.closest('rt') ? 2 : 1 });
  let n; while ((n = w.nextNode())) { const i = n.data.indexOf('鐵衣'); if (i >= 0) { const r = document.createRange(); r.setStart(n, i); r.setEnd(n, i + 2); const s = getSelection(); s.removeAllRanges(); s.addRange(r); return; } }
});
await p.waitForTimeout(600);
const kind = p.locator('button[title="標記成生字詞或句子"]');
console.log('kind btn', await kind.count());
await kind.click(); await p.waitForTimeout(400);
const menu = p.getByRole('button', { name: '生字詞', exact: true });
await p.mouse.move(1430, 890);
await ring(p, [kind, menu]); await shot(p, 'g08d.png'); await unring(p);
await menu.click(); await p.waitForTimeout(500);
// g08e: 掛補充
const bu = p.locator('button[title="讓這幾個字點了會開補充"], button[title="編輯這幾個字的補充"]').first();
console.log('bu', await bu.count());
await bu.click(); await p.waitForTimeout(900);
const panel = p.getByRole('dialog', { name: '補充內容設定' });
console.log('panel', await panel.count(), (await panel.innerText().catch(() => '')).slice(0, 200));
await p.mouse.move(700, 890);
await ring(p, [bu, panel]); await panel.evaluate(e => e.style.outlineOffset = '-8px');
await shot(p, 'g08e.png');
await b.close();
