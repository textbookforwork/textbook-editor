// 書櫃區 10 張。對應 Figma：41-shelf-books(95:14) 43-create(95:17) 45-shelf-own(95:20) 56-shelf-see-all(114:4)
// 57-shelf-subject(114:7) 52-admin-shelf(97:4) 53-admin-create(97:7) 55-published(97:10) 46-cover-upload(95:23) 47-cover-crop(95:26)
import { start, login, ring, unring, shot, cardMore } from './common.mjs';
const IMG = decodeURIComponent(new URL('./assets/', import.meta.url).pathname);
const { b, p } = await start(); p.setDefaultTimeout(8000);
await login(p);
await p.mouse.move(1430, 890);
await shot(p, '41-shelf-books.png');
// 43：建立自編（可選章節）
await cardMore(p, '國文 2下').click(); await p.waitForTimeout(300);
await p.getByRole('menuitem', { name: /建立自編/ }).click(); await p.waitForTimeout(600);
const dlg = p.getByRole('dialog', { name: '建立自編' });
await ring(p, [dlg]); await shot(p, '43-create.png'); await unring(p);
await dlg.getByRole('button', { name: '取消' }).click(); await p.waitForTimeout(400);
// 45：自編教材
await p.getByRole('tab', { name: '自編教材' }).click(); await p.waitForTimeout(800);
await shot(p, '45-shelf-own.png');
// 56：查看全部
const seeAll = p.getByRole('button', { name: /查看全部/ }).first();
await ring(p, [seeAll]); await shot(p, '56-shelf-see-all.png'); await unring(p);
await seeAll.click(); await p.waitForTimeout(900);
await shot(p, '57-shelf-subject.png');
// 46、47：自編換封面
await p.getByRole('button', { name: /返回|回到書櫃|上一頁/ }).first().click().catch(() => p.goBack()); await p.waitForTimeout(800);
await cardMore(p, '國文 2上').click(); await p.waitForTimeout(300);
await p.getByRole('menuitem', { name: /更換封面/ }).click(); await p.waitForTimeout(600);
let cd = p.getByRole('dialog').last();
await ring(p, [cd]); await shot(p, '46-cover-upload.png'); await unring(p);
await cd.locator('input[type=file]').setInputFiles(IMG + 'cover.png'); await p.waitForTimeout(900);
cd = p.getByRole('dialog').last();
await ring(p, [cd]); await shot(p, '47-cover-crop.png'); await unring(p);
await cd.getByRole('button', { name: '換一張' }).evaluate(() => {}).catch(() => {});
await p.keyboard.press('Escape'); await p.waitForTimeout(400);
// 52、53：管理員
await p.locator('button[title="切換身分、登出"]').click(); await p.waitForTimeout(300);
await p.getByRole('menuitemradio', { name: '系統管理員' }).click(); await p.waitForTimeout(800);
await p.getByRole('tab', { name: '數位教科書' }).click(); await p.waitForTimeout(600);
const create = p.getByRole('button', { name: '建立教材' });
await p.mouse.move(1430, 890);
await ring(p, [create]); await shot(p, '52-admin-shelf.png'); await unring(p);
await create.click(); await p.waitForTimeout(500);
const d53 = p.getByRole('dialog', { name: '建立教材' });
await d53.getByPlaceholder('請輸入教材名稱').fill('國文 3上');
await d53.getByRole('radio', { name: '國語文' }).click().catch(() => {});
await d53.getByPlaceholder('請輸入出版社名稱').fill('南一');
await ring(p, [d53]); await shot(p, '53-admin-create.png'); await unring(p);
await d53.getByRole('button', { name: '建立', exact: true }).click(); await p.waitForTimeout(2500);
// 55：發布
await p.locator('button[title^="發布到書櫃"]').click(); await p.waitForTimeout(700);
const d55 = p.getByRole('dialog', { name: '教材已發布' });
await ring(p, [d55]); await shot(p, '55-published.png');
await b.close();
