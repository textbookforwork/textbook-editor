import { useSyncExternalStore } from 'react';

/**
 * 原型沒有帳號，用右上角頭像切換身分：
 *   老師       從數位教科書建立副本來改（自編教材）、開課、派任務、管班級
 *   學生       12 號陳小宇：讀課本、加入老師的課堂
 *   系統管理員 從空白本建立數位教科書，管學校與師生帳號
 *
 * 每個分頁（瀏覽器的 tab）各記各的身分，同一台電腦開兩個分頁，一個當老師、一個當學生，
 * 就能試上課同步（見 classroom/legacy.js 的 BroadcastChannel）。新開的分頁沿用最後一次選的身分。
 */
export type Role = 'teacher' | 'admin' | 'student';

const KEY = 'ds-editor:role';
const listeners = new Set<() => void>();
const ROLES: Role[] = ['teacher', 'admin', 'student'];

const parse = (v: string | null): Role | null => (ROLES.includes(v as Role) ? (v as Role) : null);

const read = (): Role => {
  try {
    return parse(sessionStorage.getItem(KEY)) ?? parse(localStorage.getItem(KEY)) ?? 'teacher';
  } catch {
    return 'teacher';
  }
};

export function setRole(role: Role) {
  try {
    sessionStorage.setItem(KEY, role);
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

export const ROLE_NAME: Record<Role, string> = { teacher: '方小明', admin: '系統管理員', student: '陳小宇' };
export const ROLE_LABEL: Record<Role, string> = { teacher: '老師', admin: '系統管理員', student: '學生' };
/** 頭像裡的字：老師取姓、管理員「管」、學生是座號 */
export const ROLE_AVATAR: Record<Role, string> = { teacher: '方', admin: '管', student: '12' };
