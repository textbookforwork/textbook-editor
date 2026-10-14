import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

/**
 * 小而安靜的提示：底部置中，兩秒消失。
 *
 * 用模組層級的事件匯流排而不是 context，因為發提示的人（頂部列的按鈕）
 * 和畫提示的人（<Toaster>）不一定在同一棵子樹裡；任何地方 import `toast()`
 * 就能用，不必把 App 的結構改掉。
 */

const DURATION = 2000;

type Listener = (message: string) => void;
const listeners = new Set<Listener>();

export function toast(message: string): void {
  listeners.forEach((fn) => fn(message));
}

/** 掛一個就好。頂部列會自己掛，不需要在 App 另外放。 */
export function Toaster() {
  const [message, setMessage] = useState<string | null>(null);
  // 連續兩則時用 key 讓動畫重跑，否則第二則看起來像沒出現
  const [seq, setSeq] = useState(0);

  useEffect(() => {
    const show: Listener = (m) => {
      setMessage(m);
      setSeq((n) => n + 1);
    };
    listeners.add(show);
    return () => {
      listeners.delete(show);
    };
  }, []);

  useEffect(() => {
    if (message === null) return;
    const timer = setTimeout(() => setMessage(null), DURATION);
    return () => clearTimeout(timer);
  }, [message, seq]);

  if (message === null) return null;

  return createPortal(
    <Bubble key={seq} role="status" aria-live="polite">
      {message}
    </Bubble>,
    document.body
  );
}

const rise = keyframes`
  from { opacity: 0; transform: translate(-50%, 8px); }
  to   { opacity: 1; transform: translate(-50%, 0); }
`;

const Bubble = styled.div`
  position: fixed;
  inset-block-end: ${(p) => p.theme.space.insetLg};
  inset-inline-start: 50%;
  transform: translateX(-50%);
  /* 在對話框（1000）之下、抽屜（950）之上：抽屜開著時提示要看得到 */
  z-index: 980;
  max-inline-size: min(420px, calc(100vw - 32px));
  padding: ${(p) => p.theme.space.insetXs} ${(p) => p.theme.space.insetMd};
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.surface.inverse};
  color: ${(p) => p.theme.text.onInverse};
  font-size: ${(p) => p.theme.typography.bodySmSize};
  line-height: ${(p) => p.theme.typography.bodySmLineHeight};
  box-shadow: ${(p) => p.theme.shadow.card};
  pointer-events: none;
  animation: ${rise} 0.18s ease-out;
`;
