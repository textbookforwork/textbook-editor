import { useSyncExternalStore } from 'react';

/**
 * 原型沒有帳號，用右上角頭像切換身分，看兩種人的書櫃：
 *   老師       從數位教科書建立副本來改（自編教材）
 *   系統管理員 從空白本建立數位教科書，可以填出版社
 * 記在這台瀏覽器，重新整理後維持。
 */
export type Role = 'teacher' | 'admin';

const KEY = 'ds-editor:role';
const listeners = new Set<() => void>();

const read = (): Role => {
  try {
    return localStorage.getItem(KEY) === 'admin' ? 'admin' : 'teacher';
  } catch {
    return 'teacher';
  }
};

export function setRole(role: Role) {
  try {
    localStorage.setItem(KEY, role);
  } catch {
    // 存不了就只在這一次有效
  }
  current = role;
  listeners.forEach((fn) => fn());
}

let current: Role | null = null;
export const getRole = () => (current ??= read());

export function useRole(): Role {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    getRole
  );
}

export const ROLE_NAME: Record<Role, string> = { teacher: '方小明', admin: '系統管理員' };
