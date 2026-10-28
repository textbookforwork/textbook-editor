// 文字膠囊相關：04-select-block(86:48) el-text-capsule(129:5) el-text-size(129:8) el-text-font(129:11)
// mask-2-edit-words-capsule(118:8) mask-3-edit-marked(118:11)
import { open, ring, unring, shot } from './gcommon.mjs';
import { textPoint } from './common3.mjs';
const { b, p } = await open('自然科學 5下', '自然');
const sel = 'main [data-row-index="1"]';
const blk = p.locator(sel).locator('[data-block-id]').first();
const bb = await blk.boundingBox();
await p.mouse.click(bb.x + bb.width * 0.7, bb.y + bb.height / 2); await p.waitForTimeout(700);
const capsule = p.locator('button[title="字型"]').first().locator('xpath=ancestor::*[count(.//button)>=8][1]');
await p.mouse.move(1430, 890);
await ring(p, [blk]); await shot(p, '04-select-block.png'); await unring(p);
await ring(p, [capsule]); await shot(p, 'el-text-capsule.png'); await unring(p);
await p.locator('button[title="字級"]').first().click(); await p.waitForTimeout(400);
await ring(p, [p.locator('button[title="字級"]').first(), p.getByRole('listbox').last()]); await shot(p, 'el-text-size.png'); await unring(p);
await p.keyboard.press('Escape'); await p.waitForTimeout(300);
await p.locator('button[title="字型"]').first().click(); await p.waitForTimeout(400);
const pop = p.locator('[role="listbox"], [role="menu"], [role="dialog"]').last();
await ring(p, (await pop.count()) ? [p.locator('button[title="字型"]').first(), pop] : [p.locator('button[title="字型"]').first()]); await shot(p, 'el-text-font.png'); await unring(p);
await p.keyboard.press('Escape'); await p.waitForTimeout(300);
// 選幾個字：選字膠囊（遮住、補充前有分隔線）
const a = await textPoint(p, sel, '一閃一閃的光點', 0);
const z = await textPoint(p, sel, '一閃一閃的光點', 6);
await p.mouse.move(a.x - 8, a.y); await p.mouse.down();
await p.mouse.move(z.x, z.y, { steps: 8 }); await p.mouse.move(z.x + 8, z.y, { steps: 2 }); await p.mouse.up();
await p.waitForTimeout(700);
const eye = p.locator('button[title="遮住：點擊後出現"]').first();
await ring(p, [eye]); await shot(p, 'mask-2-edit-words-capsule.png'); await unring(p);
await eye.click(); await p.waitForTimeout(500);
await p.mouse.click(1430, 880); await p.waitForTimeout(500);
const masked = p.locator('main [data-masked], main .masked, main [data-mask]').first();
await shot(p, 'mask-3-edit-marked.png');
await b.close();
