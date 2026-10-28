import { start, login, ring, unring, shot, makeCopy } from './common.mjs';
export { start, login, ring, unring, shot, makeCopy };
export const IMG = decodeURIComponent(new URL('./assets/', import.meta.url).pathname);
export async function open(book, name) {
  const { b, p } = await start(); p.setDefaultTimeout(8000);
  await p.route('**/api.microlink.io/**', r => r.abort());
  await login(p);
  await makeCopy(p, book, name);
  await p.waitForTimeout(1000);
  return { b, p };
}
export async function insertAfter(p, rowN, tile) {
  const row = p.locator(`main [data-row-index="${rowN}"]`);
  await row.evaluate(e => e.scrollIntoView({ block: 'center', inline: 'center' })); await p.waitForTimeout(300);
  const rb = await row.boundingBox();
  await p.mouse.move(rb.x + rb.width / 2, rb.y + rb.height / 2); await p.waitForTimeout(200);
  await row.locator('xpath=..').locator('[aria-label="新增元件"]').last().click({ force: true }); await p.waitForTimeout(500);
  await p.locator('[aria-label="插入元件"]').getByText(tile, { exact: true }).click(); await p.waitForTimeout(800);
}
// file drag simulation: build DataTransfer with a File from bytes
export async function dragFile(p, targetSel, path, type, phase, x, y) {
  const fs = await import('fs');
  const b64 = fs.readFileSync(path).toString('base64');
  const name = path.split('/').pop();
  await p.evaluate(({ targetSel, b64, name, type, phase, x, y }) => {
    const bin = atob(b64); const arr = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    const f = new File([arr], name, { type });
    const dt = new DataTransfer(); dt.items.add(f);
    const el = document.querySelector(targetSel);
    const r = el.getBoundingClientRect();
    const cx = x ?? r.x + r.width / 2, cy = y ?? r.y + r.height / 2;
    const target = document.elementFromPoint(cx, cy) || el;
    for (const t of phase) target.dispatchEvent(new DragEvent(t, { bubbles: true, cancelable: true, dataTransfer: dt, clientX: cx, clientY: cy }));
  }, { targetSel, b64, name, type, phase, x, y });
}
