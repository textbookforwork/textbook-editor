import { useSyncExternalStore } from 'react';

/**
 * 有沒有登入。原型沒有帳號，登入頁填什麼都放行；記在這台瀏覽器，重新整理後維持，
 * 書櫃右上角頭像選「登出」才回登入頁。第一次打開網址一律從登入頁開始。
 */
const KEY = 'ds-editor:signed-in';
const listeners = new Set<() => void>();

const read = () => {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
};

let current: boolean | null = null;
const get = () => (current ??= read());

function set(value: boolean) {
  try {
    if (value) localStorage.setItem(KEY, '1');
    else localStorage.removeItem(KEY);
  } catch {
    // 存不了就只在這一次有效
  }
  current = value;
  listeners.forEach((fn) => fn());
}

export const signIn = () => set(true);
export const signOut = () => set(false);

export function useSignedIn(): boolean {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    get
  );
}
