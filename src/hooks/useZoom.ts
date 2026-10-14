import { useCallback, useEffect, useState, type RefObject } from 'react';

export const ZOOM_MIN = 0.25;
export const ZOOM_MAX = 3;
/** 加減號一次走幾個百分點。 */
const STEP_PCT = 10;

type Opts = {
  /** 頁面的實體尺寸（頁座標）。 */
  pageWidth: number;
  pageHeight: number;
  /** 編輯區四周要扣掉的空間（螢幕像素），寬與高各自算：內距、翻頁鈕都算在內。 */
  reserveX: number;
  reserveY: number;
  /**
   * 這個值一變就重量一次。ref 指到的元素換掉時（預覽⇄編輯）ref 物件本身不變，
   * effect 不會自己知道，所以由呼叫端給一個會跟著模式變的值。
   */
  watch?: unknown;
};

const clamp = (z: number) => Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z));
const pctOf = (z: number) => Math.round(z * 100);

/**
 * 整頁縮放。
 *
 * **100% 的定義是「整頁剛好放進編輯區」**——寬與高都放得下，取較小的那一個當 fit，
 * 使用者的倍率再乘上去。只用寬度算的話 16:9 的頁在矮的視窗裡會被切掉下緣；
 * 以 fit 當 100% 則不管 1440×900 還是 1920×1080，一進來都看得到整頁，
 * 而且數字有意義：100% 永遠是整頁，不是某個跟螢幕無關的像素比。
 *
 * 回傳的 scale 直接餵給 PageView；zoom 是給介面顯示與調整的倍率。
 */
export function useZoom(
  ref: RefObject<HTMLElement | null>,
  { pageWidth, pageHeight, reserveX, reserveY, watch }: Opts
) {
  const [fit, setFit] = useState(1);
  const [zoom, setZoomRaw] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const recompute = () => {
      // 版面還沒完成、或分頁被隱藏時量到的尺寸不足以放下任何內容，
      // 算出來是負數或零。量不到就下一幀再試，不要把錯的結果寫進狀態。
      // （分頁隱藏時 requestAnimationFrame 不會觸發，所以不會空轉。）
      const usableW = el.clientWidth - reserveX;
      const usableH = el.clientHeight - reserveY;
      if (usableW <= 0 || usableH <= 0) {
        raf = requestAnimationFrame(recompute);
        return;
      }
      setFit(Math.min(usableW / pageWidth, usableH / pageHeight));
    };
    recompute();
    window.addEventListener('resize', recompute);
    // 從隱藏切回顯示時尺寸會變，但不一定有 resize 事件
    document.addEventListener('visibilitychange', recompute);
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(recompute);
    ro?.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', recompute);
      document.removeEventListener('visibilitychange', recompute);
      ro?.disconnect();
    };
  }, [ref, pageWidth, pageHeight, reserveX, reserveY, watch]);

  // 存兩位小數就夠：拉桿是以百分點在動，再細的差異畫面上看不出來
  const setZoom = useCallback((z: number) => setZoomRaw(clamp(Math.round(z * 100) / 100)), []);
  // 加減號走到下一個整十：從 37% 按加號到 40%，不是 47%——跟拉桿的刻度對得上
  const zoomIn = useCallback(
    () => setZoomRaw((z) => clamp((Math.floor(pctOf(z) / STEP_PCT) * STEP_PCT + STEP_PCT) / 100)),
    []
  );
  const zoomOut = useCallback(
    () => setZoomRaw((z) => clamp((Math.ceil(pctOf(z) / STEP_PCT) * STEP_PCT - STEP_PCT) / 100)),
    []
  );
  const resetZoom = useCallback(() => setZoomRaw(1), []);

  return { scale: fit * zoom, zoom, percent: pctOf(zoom), setZoom, zoomIn, zoomOut, resetZoom };
}
