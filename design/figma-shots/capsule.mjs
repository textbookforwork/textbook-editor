// 元件膠囊（圖片、表格）各狀態。對應 Figma：21-h-select-image(86:51) img-edge(127:5) el-image-crop(129:14)
// 31-table-select(92:11) 32-table-style(92:14) cols-1-selected(127:8) cols-2-dragging(127:11)
// mask-1-edit-element(118:5) el-empty-compact(129:20)
// 只跑其中幾組：node capsule.mjs star edge crop cols mask empty
import { open, shot, insertAfter } from './gcommon.mjs';
const only = process.argv.slice(2);
const want = (k) => !only.length || only.includes(k);
const blkOf = (p, r) => p.locator(`main [data-row-index="${r}"] [data-block-id]`).first();
async function select(p, r, fx = 0.5, fy = 0.5) {
  const blk = blkOf(p, r);
  await blk.evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(400);
  const bb = await blk.boundingBox();
  await p.mouse.click(bb.x + bb.width * fx, bb.y + bb.height * fy); await p.waitForTimeout(600);
  await p.mouse.move(1430, 890); await p.waitForTimeout(200);
  return blk;
}
// 改存檔再重新載入（多欄、空白小框這種 UI 不好一步做出來的狀態）
async function editDoc(p, fn) {
  await p.waitForTimeout(800);
  await p.evaluate((src) => {
    const k = Object.keys(localStorage).find(k => k.startsWith('ds-editor:book:'));
    const doc = JSON.parse(localStorage.getItem(k));
    (new Function('doc', src))(doc);
    localStorage.setItem(k, JSON.stringify(doc));
  }, fn);
  await p.reload({ waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
}

// 21-h-select-image、31-table-select、32-table-style
if (want('star')) {
  const { b, p } = await open('自然科學 5下', '星星的世界');
  await select(p, 4); await shot(p, '21-h-select-image.png');
  await p.keyboard.press('Escape'); await p.mouse.click(1430, 880);
  await select(p, 7, 0.99, 0.5); await shot(p, '31-table-select.png');
  await p.locator('button', { hasText: '表格' }).filter({ visible: true }).first().click(); await p.waitForTimeout(700);
  await p.mouse.move(1430, 890); await shot(p, '32-table-style.png');
  await b.close();
}
// img-edge：拖下緣把圖拉高
if (want('edge')) {
  const { b, p } = await open('自然科學 5下', '拖邊');
  const blk = await select(p, 4);
  const bb = await blk.boundingBox();
  // 下緣中間那顆「調整尺寸」把手
  const grips = p.locator('[aria-label="調整尺寸"]');
  let best = null;
  for (let i = 0; i < await grips.count(); i++) {
    const g = await grips.nth(i).boundingBox(); if (!g) continue;
    const d = Math.abs(g.x + g.width / 2 - (bb.x + bb.width / 2)) + Math.abs(g.y + g.height / 2 - (bb.y + bb.height));
    if (!best || d < best.d) best = { d, g };
  }
  console.log('grip', best);
  const x = best.g.x + best.g.width / 2, y = best.g.y + best.g.height / 2;
  await p.mouse.move(x, y); await p.mouse.down();
  await p.mouse.move(x, y + 60, { steps: 6 }); await p.mouse.move(x, y + 120, { steps: 6 }); await p.mouse.up();
  await p.waitForTimeout(600); await p.mouse.move(1430, 890); await p.waitForTimeout(300);
  await shot(p, 'img-edge.png');
  await b.close();
}
// el-image-crop：按裁切
if (want('crop')) {
  const { b, p } = await open('自然科學 5下', '元件示意');
  await select(p, 4);
  await p.locator('button[title="裁切圖片"]').click(); await p.waitForTimeout(700);
  await p.mouse.move(1430, 890); await shot(p, 'el-image-crop.png');
  await b.close();
}
// mask-1-edit-element：圖片按遮住
if (want('mask')) {
  const { b, p } = await open('自然科學 5下', '遮住示意');
  await select(p, 4);
  await p.locator('button[title="遮住：點擊後出現"]').filter({ visible: true }).first().click(); await p.waitForTimeout(600);
  await p.mouse.move(1430, 890); await shot(p, 'mask-1-edit-element.png');
  await b.close();
}
// cols-1-selected、cols-2-dragging：圖片併到上一段旁邊成兩欄
if (want('cols')) {
  const { b, p } = await open('自然科學 5下', '多欄');
  await editDoc(p, `
    const r3 = doc.rows[3], r4 = doc.rows[4];
    r3.columns[0].widthPct = 55; const c = r4.columns[0]; c.widthPct = 45;
    r3.columns.push(c); doc.rows.splice(4, 1);`);
  const img = p.locator('main [data-row-index="3"] [data-block-id]').filter({ has: p.locator('img') }).first();
  await p.locator('main [data-row-index="2"]').evaluate(e => e.scrollIntoView({ block: 'start' })); await p.mouse.wheel(0, -60); await p.waitForTimeout(400);
  const ib = await img.boundingBox();
  await p.mouse.click(ib.x + ib.width / 2, ib.y + ib.height / 2); await p.waitForTimeout(600);
  await p.mouse.move(1430, 890); await shot(p, 'cols-1-selected.png');
  const h = p.locator('[aria-label="調整欄寬"]').filter({ visible: true }).first();
  const hb = await h.boundingBox();
  console.log('col handle', hb);
  await h.hover(); await p.waitForTimeout(300);
  await p.mouse.down(); await p.mouse.move(hb.x + hb.width / 2 + 60, hb.y + hb.height / 2, { steps: 10 }); await p.waitForTimeout(400);
  await shot(p, 'cols-2-dragging.png');
  await p.mouse.up();
  await b.close();
}
// el-empty-compact：頁首一個很小的空白圖片框
if (want('empty')) {
  const { b, p } = await open('自然科學 5下', '元件示意');
  await insertAfter(p, 0, '圖片'); await p.keyboard.press('Escape');
  await editDoc(p, `
    const r = doc.rows.splice(1, 1)[0]; r.columns[0].blocks[0].widthPct = 14; doc.rows.unshift(r);`);
  await select(p, 0); await shot(p, 'el-empty-compact.png');
  await b.close();
}
