let counter = 0;

/**
 * 產生節點 id。前綴是為了在除錯時一眼看出是什麼東西。
 * 測試環境使用確定性的遞增計數，以便重現測試結果。
 * 瀏覽器端加上隨機後綴，避免重新整理後載入舊文件與新插入的元件 id 衝突。
 */
export function newId(prefix: string): string {
  counter += 1;
  const isTest =
    (typeof globalThis !== 'undefined' &&
      (globalThis as unknown as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV === 'test') ||
    (import.meta as unknown as { env?: { MODE?: string } }).env?.MODE === 'test';
  if (isTest) {
    return `${prefix}_${counter.toString(36)}`;
  }
  const rand = Math.random().toString(36).slice(2, 7);
  return `${prefix}_${counter.toString(36)}_${rand}`;
}

/** 測試用：把計數歸零，讓每個測項的 id 從頭開始。 */
export function resetIds(): void {
  counter = 0;
}
