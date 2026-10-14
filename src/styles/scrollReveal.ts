/**
 * 捲動中的那一塊掛上 data-scrolling，GlobalStyle 據此把捲軸亮出來；停下來 800ms 後拿掉。
 *
 * 捲軸平常看不見（安靜的設計），滑鼠移進去才出現——但用觸控板、滑鼠滾輪不在那一塊上、
 * 或平板用手指滑時沒有「滑過」，捲軸就一直看不到，不知道自己捲到哪。這裡補上「正在捲」也算。
 * 只掛一個全域監聽（捕獲階段，任何元素的捲動都收得到），不必每個面板各寫一份。
 */
const HIDE_AFTER_MS = 800;

export function installScrollReveal(): void {
  const timers = new WeakMap<Element, number>();
  window.addEventListener(
    'scroll',
    (e) => {
      const el = e.target instanceof Element ? e.target : document.scrollingElement;
      if (!el) return;
      el.setAttribute('data-scrolling', '');
      const prev = timers.get(el);
      if (prev) window.clearTimeout(prev);
      timers.set(
        el,
        window.setTimeout(() => el.removeAttribute('data-scrolling'), HIDE_AFTER_MS)
      );
    },
    { capture: true, passive: true }
  );
}
