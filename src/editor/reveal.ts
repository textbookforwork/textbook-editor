/**
 * 插進來的元件可能落在畫面外（插入點在別頁、或這一頁裝不下被推到下一頁），
 * 老師會以為沒插進去。等它畫出來就捲到看得見的地方（直排往左右、橫排往上下都算）。
 */
export function revealBlock(id: string) {
  let tries = 30;
  const run = () => {
    const el = document.querySelector<HTMLElement>(`[data-block-id="${id}"]`);
    if (el) el.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
    else if (--tries > 0) requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
}
