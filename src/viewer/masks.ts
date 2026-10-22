import { useSyncExternalStore } from 'react';

/**
 * 閱讀時打開過的遮罩。
 *
 * 記在這一次的閱讀裡（不寫進教材）：換頁再回來維持原樣，打開過的就開著；
 * 回編輯再進閱讀、或重新打開教材，全部蓋回去。
 * 鍵：整個元件用 blockId；幾個字用 blockId 加那幾個字本身。
 */
const shown = new Set<string>();
const listeners = new Set<() => void>();
let version = 0;

export const maskKey = (blockId: string, words?: string) => (words ? `${blockId}:${words}` : blockId);

export function revealMask(key: string) {
  if (shown.has(key)) return;
  shown.add(key);
  version += 1;
  listeners.forEach((fn) => fn());
}

/** 每次進閱讀模式從頭來：遮罩全部蓋回去（同一次閱讀裡換頁才保留）。 */
export function resetMasks() {
  if (shown.size === 0) return;
  shown.clear();
  version += 1;
  listeners.forEach((fn) => fn());
}

export const isMaskShown = (key: string) => shown.has(key);

/** 有遮罩被打開就重畫一次。回傳值只拿來觸發更新。 */
export function useMaskVersion(): number {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    () => version
  );
}
