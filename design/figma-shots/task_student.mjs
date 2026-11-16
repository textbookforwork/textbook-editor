// 派任務學生端新流程（2026-11-16 上線 c44a166）截圖：從線上版拍，老師、學生兩個分頁
// 對應 Figma「學習夥伴/上課閱讀/師生連動」141:576：
//   選擇題區 145:135 → be-7-3 c3、be-7-4 c4、be-7-5 tf5、be-補-submit-choice c-sub、be-補-submit-tf tf-sub
//   文字／手寫／聲音區 145:168 → be-8-2 t2、be-補-submit-text t-sub、新框 t-edit；be-8-7 s7、be-8-8 s8、be-補-submit-shot s-sub、新框 s-away；
//                               be-8-12 p12；be-8-13 v13、be-補-submit-voice v-sub、新框 v-re1、v-re2
// 用法：node task_student.mjs [輸出資料夾]
import { chromium } from '/Users/elaine/.claude/skills/gstack/node_modules/playwright/index.mjs';

const OUT = process.argv[2] || new URL('./out/', import.meta.url).pathname;
const BASE = 'https://textbookforwork.github.io/textbook-editor/?v=' + Date.now();
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const t = await ctx.newPage();
const W = (p, ms = 600) => p.waitForTimeout(ms);
const log = (...a) => console.log(...a);

const clickTxt = (p, x) => p.evaluate((x) => { const bs = [...document.querySelectorAll('button')].filter((e) => e.innerText.trim() === x && e.offsetParent); if (!bs.length) return false; bs[bs.length - 1].click(); return true; }, x);
const ring = (p, sels) => p.evaluate((sels) => {
  document.querySelectorAll('.ring-x').forEach((x) => x.remove());
  for (const sel of sels) {
    let el;
    if (sel.startsWith('txt=')) { const q = sel.slice(4); el = [...document.querySelectorAll('body *')].filter((e) => e.textContent.includes(q) && e.getBoundingClientRect().width > 0).sort((a, b) => { const A = a.getBoundingClientRect(), B = b.getBoundingClientRect(); return A.width * A.height - B.width * B.height; })[0]; if (el && el.closest('button')) el = el.closest('button'); }
    else el = document.querySelector(sel);
    if (!el) { console.warn('noring', sel); continue; }
    const r = el.getBoundingClientRect(); const o = document.createElement('div'); o.className = 'ring-x';
    Object.assign(o.style, { position: 'fixed', left: (r.left - 6) + 'px', top: (r.top - 6) + 'px', width: (r.width + 12) + 'px', height: (r.height + 12) + 'px', border: '5px solid #FF854A', borderRadius: '12px', pointerEvents: 'none', zIndex: 999999, boxSizing: 'border-box' });
    document.body.appendChild(o);
  }
}, sels);
const shot = async (p, n) => { await p.mouse.move(1, 899); await W(p, 300); await p.screenshot({ path: OUT + n }); await p.evaluate(() => document.querySelectorAll('.ring-x').forEach((x) => x.remove())); log('shot', n); };
const bubble = (p) => p.evaluate(() => { const e = [...document.querySelectorAll('body *')].find((x) => /交出去了|送出去了/.test(x.textContent) && x.children.length === 0); return e ? e.textContent : ''; });
const quiet = async (p) => { for (let i = 0; i < 12; i++) { if (!(await bubble(p))) return; await W(p, 500); } };
const newTask = async (type) => {
  for (let i = 0; i < 6; i++) {
    if (await t.locator('.type-card').count()) break;
    if (await clickTxt(t, '結束作答')) { await W(t, 700); continue; }
    if (await clickTxt(t, '再派一題')) { await W(t, 700); continue; }
    if (await clickTxt(t, 'B')) { await W(t, 700); continue; }
    if (await clickTxt(t, 'O')) { await W(t, 700); continue; }
    await t.getByRole('button', { name: '派任務' }).first().click(); await W(t, 600);
  }
  await t.locator('.type-card', { hasText: type }).click(); await W(t, 500);
};

// 老師登入、開書、翻到「夜空裡的星座」、開始上課
await t.goto(BASE);
await t.evaluate(() => sessionStorage.setItem('ds-editor:role', 'teacher'));
await t.getByText('進入數位教科書').first().click(); await W(t, 1500);
// 乾淨瀏覽器沒有班級：先建 501 自然（預設 30 位學生）
await t.goto(BASE + '#/classes'); await W(t, 1500);
await t.getByText('新增班級').first().click(); await W(t, 600); await clickTxt(t, '新增'); await W(t, 800);
await t.goto(BASE + '#/read/book/demo'); await W(t, 2500);
for (let i = 0; i < 6; i++) { if (await t.evaluate(() => document.body.innerText.includes('夜空裡的星座'))) break; await t.getByRole('button', { name: '下一頁' }).first().click(); await W(t, 800); }
await t.getByRole('button', { name: '開始上課' }).first().click(); await W(t, 800);
await t.evaluate(() => { const bs = [...document.querySelectorAll('button')].filter((x) => x.innerText.trim() === '開始上課'); bs[bs.length - 1].click(); });
await W(t, 1500);
log('teacher', (await t.evaluate(() => document.body.innerText.slice(0, 200))).replace(/\n/g, ' '));

// 學生加入
const s = await ctx.newPage();
await s.addInitScript(() => sessionStorage.setItem('ds-editor:role', 'student'));
await s.goto(BASE + '#/read/book/demo'); await W(s, 3000);
const join = s.locator('.scrim button', { hasText: '加入課堂' }); if (await join.count()) { await join.click(); await W(s, 1500); }
log('student', (await s.evaluate(() => document.body.innerText.slice(0, 160))).replace(/\n/g, ' ')); await s.screenshot({ path: OUT + '_student.png' });
const openTask = async () => { if (!(await s.locator('.ans-dlg').count())) { await s.locator('.taskbar button').click(); await W(s, 500); } };

// 選擇題
await newTask('選擇題'); await clickTxt(t, '派出'); await W(t, 1500); await openTask();
await s.locator('.abtn').nth(1).click(); await W(s, 300);
await ring(s, ['.abtns', '.ans-dlg .dialog-foot .btn']); await shot(s, 'c3.png');
await s.locator('.ans-dlg .dialog-foot .btn').click(); await W(s, 700);
await ring(s, ['.taskbar', 'txt=' + await bubble(s)]); await shot(s, 'c-sub.png');
await quiet(s);
await s.locator('.taskbar button').click(); await W(s, 600);
await s.locator('.abtn').nth(2).click(); await W(s, 300);
await ring(s, ['.taskbar', '.abtns', '.ans-dlg .dialog-foot .btn']); await shot(s, 'c4.png');
await s.locator('.ans-dlg .dialog-foot .btn').click(); await W(s, 600); await quiet(s);

// 是非題
await newTask('是非題'); await clickTxt(t, '派出'); await W(t, 1500); await openTask();
await s.locator('.abtn').nth(0).click(); await W(s, 300);
await ring(s, ['.abtns', '.ans-dlg .dialog-foot .btn']); await shot(s, 'tf5.png');
await s.locator('.ans-dlg .dialog-foot .btn').click(); await W(s, 700);
await ring(s, ['.taskbar', 'txt=' + await bubble(s)]); await shot(s, 'tf-sub.png'); await quiet(s);

// 文字題
await newTask('文字題');
if (await clickTxt(t, '題目')) { await W(t, 300); const q = t.locator('#task-q'); if (await q.count()) await q.fill('怎麼找到北極星？'); }
await clickTxt(t, '派出'); await W(t, 1500); await openTask();
await s.locator('#text-ans').fill('先找到北斗七星，把勺口兩顆星連起來，往外延長五倍就是北極星。'); await W(s, 300);
await ring(s, ['#text-ans', '.ans-dlg .dialog-foot .btn']); await shot(s, 't2.png');
await s.locator('.ans-dlg .dialog-foot .btn').click(); await W(s, 700);
await ring(s, ['.taskbar', 'txt=' + await bubble(s)]); await shot(s, 't-sub.png'); await quiet(s);
await s.locator('.taskbar button').click(); await W(s, 600);
await s.locator('#text-ans').fill('先找到北斗七星，把勺口兩顆星連起來，往外延長五倍就是北極星。它幾乎不會移動。'); await W(s, 300);
await ring(s, ['.taskbar', '#text-ans', '.ans-dlg .dialog-foot .btn']); await shot(s, 't-edit.png');
await s.locator('.ans-dlg .dialog-foot .btn').click(); await W(s, 600); await quiet(s);

// 聲音題
await newTask('聲音題'); await clickTxt(t, '派出'); await W(t, 1500); await openTask();
await s.locator('.rec-btn').click(); await W(s, 3200); await s.locator('.rec-btn').click(); await W(s, 400);
await ring(s, ['.rec', '.ans-dlg .dialog-foot']); await shot(s, 'v13.png');
await clickTxt(s, '送出'); await W(s, 700);
await ring(s, ['.taskbar', 'txt=' + await bubble(s)]); await shot(s, 'v-sub.png'); await quiet(s);
await s.locator('.taskbar button').click(); await W(s, 600);
await ring(s, ['.taskbar', '.rec-btn', '.ans-dlg .dialog-foot .btn']); await shot(s, 'v-re1.png');
await clickTxt(s, '重錄'); await W(s, 400);
await s.locator('.rec-btn').click(); await W(s, 2200); await s.locator('.rec-btn').click(); await W(s, 400);
await ring(s, ['.ans-dlg .dialog-foot']); await shot(s, 'v-re2.png');
await clickTxt(s, '重新送出'); await W(s, 600); await quiet(s);

// 手寫題（寫在課本）
await newTask('手寫題'); await clickTxt(t, '派出'); await W(t, 1500); await W(s, 800);
// 學生在課本上畫一筆
const sheet = await s.locator('.pageframe .sheet, .pageframe').first().boundingBox();
if (sheet) { const x0 = sheet.x + sheet.width * 0.25, y0 = sheet.y + sheet.height * 0.55; await s.mouse.move(x0, y0); await s.mouse.down(); for (let i = 0; i <= 20; i++) await s.mouse.move(x0 + i * 14, y0 + Math.sin(i / 3) * 18); await s.mouse.up(); await W(s, 300); }
await ring(s, ['.taskbar']); await shot(s, 's7.png');
await s.locator('.taskbar button').click(); await W(s, 700);
await ring(s, ['.submit-dlg .dialog-foot']); await shot(s, 's8.png');
await clickTxt(s, '送出'); await W(s, 700);
await ring(s, ['.taskbar', 'txt=' + await bubble(s)]); await shot(s, 's-sub.png'); await quiet(s);
// 學生自己翻到別頁（先解除跟隨）
await s.getByRole('button', { name: '下一頁' }).first().click(); await W(s, 900);
await ring(s, ['.taskbar']); await shot(s, 's-away.png');
await s.locator('.taskbar button').click(); await W(s, 800);

// 手寫題（寫在紙上）
await newTask('手寫題');
const paper = t.locator('.paper-seg button', { hasText: '方格' }); if (await paper.count()) { await paper.first().click(); await W(t, 300); }
await clickTxt(t, '派出'); await W(t, 1500); await W(s, 1000);
await ring(s, ['.taskbar']); await shot(s, 'p12.png');

log('done', await s.evaluate(() => document.querySelector('.taskbar')?.innerText.replace(/\n/g, ' ')));
await b.close();
