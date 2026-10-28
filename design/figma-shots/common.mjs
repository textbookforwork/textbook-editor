import { chromium } from '/Users/elaine/.claude/skills/gstack/node_modules/playwright/index.mjs';
export const SHOTS = decodeURIComponent(new URL('./out/', import.meta.url).pathname);
export async function start() {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  p.on('pageerror', e => console.log('PAGEERR', e.message));
  return { b, p };
}
export async function login(p) {
  await p.goto('https://textbookforwork.github.io/textbook-editor/', { waitUntil: 'networkidle' });
  const inputs = p.locator('input');
  const n = await inputs.count();
  for (let i = 0; i < n; i++) { const t = await inputs.nth(i).getAttribute('type'); if (t === 'email') await inputs.nth(i).fill('a@a.tw'); else if (t !== 'checkbox') await inputs.nth(i).fill('a'); }
  await p.getByText('進入數位教科書').click();
  await p.waitForTimeout(1500);
}
// ring element(s)
export async function ring(p, locs) {
  for (const l of locs) {
    await l.evaluate(el => { const r = getComputedStyle(el).borderRadius; el.setAttribute('data-ring','1'); el.style.outline = '4px solid #FF854A'; el.style.outlineOffset = '4px'; if (r) el.style.borderRadius = r; });
  }
}
export async function unring(p) { await p.evaluate(() => document.querySelectorAll('[data-ring]').forEach(el => { el.style.outline=''; el.style.outlineOffset=''; el.removeAttribute('data-ring'); })); }
export async function shot(p, name) { await p.screenshot({ path: SHOTS + name }); console.log('saved', name); }
export async function buttons(p) { return p.evaluate(() => [...document.querySelectorAll('button,[role=button],a,[role=tab]')].filter(e=>e.offsetParent).map(e => (e.innerText||'').trim().slice(0,20) + '|' + (e.getAttribute('aria-label')||'') + '|' + (e.title||''))); }
export async function makeCopy(p, src, name) {
  await cardMore(p, src).click(); await p.waitForTimeout(300);
  await p.getByRole('menuitem', { name: /建立自編/ }).click(); await p.waitForTimeout(500);
  await p.getByPlaceholder('請輸入自編名稱').fill(name);
  await p.getByRole('dialog').getByRole('button', { name: '建立', exact: true }).click();
  await p.waitForTimeout(2500);
}
// 書櫃卡片的「⋯」：用卡片上「閱讀「書名」」那顆找同一張卡的「更多」
export function cardMore(p, title) {
  return p.getByRole('button', { name: `閱讀「${title}」` }).first().locator('xpath=ancestor::*[.//button[@aria-label="更多"]][1]').getByRole('button', { name: '更多' });
}
