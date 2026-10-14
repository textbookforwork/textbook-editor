import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { SCRIM } from '../styles/scrim';

type Props = {
  title: string;
  message?: string;
  /** 確認鈕的字。刪東西就寫「刪除」，不要寫「確定」——老師要一眼看出按下去會發生什麼。 */
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * 確認對話框。
 *
 * 不用 window.confirm：它長得跟系統一樣、跟設計系統對不上，而且在 iPad 的
 * WebView 裡有時會被整個吞掉。這裡只做「一句話＋取消／確認」，
 * 要更複雜的表單請另外做，不要往這裡堆。
 *
 * 跟匯入對話框用同一套遮罩與浮層樣式；遮罩沒有 token（見 HANDOVER 第八節），
 * 色值暫時寫死，跟 ImportDialog 一致。
 */
export function ConfirmDialog({ title, message, confirmLabel = '確認', onConfirm, onCancel }: Props) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // 焦點放在確認鈕：鍵盤使用者按 Enter 就是確認、Esc 就是取消
    confirmRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCancel();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCancel]);

  return createPortal(
    <Scrim onClick={onCancel}>
      <Sheet role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <Title>{title}</Title>
        {message && <Message>{message}</Message>}
        <Foot>
          <Ghost type="button" onClick={onCancel}>
            取消
          </Ghost>
          <Danger ref={confirmRef} type="button" onClick={onConfirm}>
            {confirmLabel}
          </Danger>
        </Foot>
      </Sheet>
    </Scrim>,
    document.body
  );
}

const Scrim = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1100;
  background: ${SCRIM};
  display: grid;
  place-items: center;
  padding: ${(p) => p.theme.space.insetLg};
`;

const Sheet = styled.div`
  inline-size: min(400px, 100%);
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.gapSm};
  padding: ${(p) => p.theme.space.insetLg};
  /* 浮層一律用淡白底（#FAFAFA），跟設定面板、共享對話框同一色 */
  background: ${(p) => p.theme.surface.page};
  border-radius: ${(p) => p.theme.radius.panel};
  box-shadow: ${(p) => p.theme.shadow.float};
`;

const Title = styled.strong`
  font-size: var(--ds-typography-body-lg-size);
  font-weight: 700;
  color: ${(p) => p.theme.text.primary};
`;

const Message = styled.p`
  margin: 0;
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
  color: ${(p) => p.theme.text.secondary};
`;

const Foot = styled.footer`
  display: flex;
  justify-content: flex-end;
  gap: ${(p) => p.theme.space.gapSm};
  margin-block-start: ${(p) => p.theme.space.gapMd};
`;

const Ghost = styled.button`
  border: none;
  background: transparent;
  color: ${(p) => p.theme.action.ghostText};
  font-size: var(--ds-typography-label-size);
  cursor: pointer;
  border-radius: ${(p) => p.theme.radius.control};
  /* 跟刪除鈕同寬的左右留白：Figma 的 Button 一律是膠囊，兩顆並排形狀要一致 */
  padding: 0 20px;
  min-block-size: ${(p) => p.theme.control.heightMd};

  &:hover { background: ${(p) => p.theme.action.ghostBgHover}; }
`;

const Danger = styled.button`
  border: none;
  background: ${(p) => p.theme.action.dangerBg};
  color: ${(p) => p.theme.action.dangerText};
  font-size: var(--ds-typography-label-size);
  cursor: pointer;
  border-radius: ${(p) => p.theme.radius.control};
  padding: 0 20px;
  min-block-size: ${(p) => p.theme.control.heightMd};

  &:hover { background: ${(p) => p.theme.action.dangerBgHover}; }
  &:focus-visible { outline-color: ${(p) => p.theme.action.dangerFocusRing}; }
`;
