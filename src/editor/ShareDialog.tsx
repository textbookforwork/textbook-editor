import { useEffect, useState, type DragEvent } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Icon } from '../components/Icon';
import { pickFile } from './assets';
import { CoverCropper } from './CoverCropper';

/**
 * 共享的兩個對話框，照 Figma「共享」流程：
 *
 *   按下共享 → 已經共享 → 「自編教材已共享」問要不要放封面
 *       關閉      ＝不更改封面、維持共享
 *       前往上傳  → 「課本封面」上傳框 → 確認上傳 ／ 取消（維持共享、封面不變）
 *
 * 共享本身不在這裡發生（按鈕按下去就共享了），這兩個框只管封面。
 */

export const ESC = (onClose: () => void) => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
};

export function SharedDialog({ onClose, onUpload, published }: { onClose: () => void; onUpload: () => void; published?: boolean }) {
  useEffect(() => ESC(onClose), [onClose]);
  return createPortal(
    <Scrim onClick={onClose}>
      <Sheet role="dialog" aria-modal="true" aria-label={published ? '教材已發布' : '自編教材已共享'} $narrow onClick={(e) => e.stopPropagation()}>
        {/* 不放 ×：按「取消」或點框外就能關，多一顆只是重複 */}
        <Heading>{published ? '教材已發布' : '自編教材已共享'}</Heading>
        <Lead>{published ? '老師現在可以在數位教科書看到這本、建立自編。放上一張封面，讓教材變完整吧！' : '放上一張封面，讓教材變完整吧！'}</Lead>
        <Pair>
          <Secondary type="button" onClick={onClose}>
            取消
          </Secondary>
          <Secondary type="button" $primary onClick={onUpload}>
            前往上傳
          </Secondary>
        </Pair>
      </Sheet>
    </Scrim>,
    document.body
  );
}

/** 封面格式與大小上限，照 Figma 的提示文字。 */
const MAX_BYTES = 10 * 1024 * 1024;
const TYPES = ['image/jpeg', 'image/png', 'image/gif'];

export function CoverDialog({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  /** 裁切好的封面（data URL）。 */
  onConfirm: (cover: string) => void;
}) {
  // 選進來的原圖，與目前選取框裁出來的那一張
  const [src, setSrc] = useState<string | null>(null);
  const [cropped, setCropped] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => ESC(onCancel), [onCancel]);
  useEffect(() => () => {
    if (src) URL.revokeObjectURL(src);
  }, [src]);

  const accept = (file: File | null) => {
    if (!file) return;
    if (!TYPES.includes(file.type)) return setError('只支援 JPG、PNG、GIF');
    if (file.size > MAX_BYTES) return setError('檔案不可超過 10MB');
    setSrc(URL.createObjectURL(file));
    setCropped(null);
    setError(null);
  };
  const pick = () => void pickFile(TYPES.join(',')).then(accept);

  const dropHandlers = {
    onDragOver: (e: DragEvent) => {
      e.preventDefault();
      setDragging(true);
    },
    onDragLeave: () => setDragging(false),
    onDrop: (e: DragEvent) => {
      e.preventDefault();
      setDragging(false);
      accept(e.dataTransfer.files?.[0] ?? null);
    },
  };

  return createPortal(
    <Scrim onClick={onCancel}>
      <Sheet role="dialog" aria-modal="true" aria-label="課本封面" onClick={(e) => e.stopPropagation()}>
        <Head>
          <span>課本封面</span>
          <Ghost type="button" onClick={onCancel} aria-label="關閉" title="關閉">
            <Icon name="x" size={24} label="關閉" />
          </Ghost>
        </Head>

        {/* 還沒選圖：整塊灰色區域可以點、也可以拖檔案進來。選了圖：換成裁切框，拖檔案進來一樣換圖 */}
        {src ? (
          <Drop as="div" $dragging={dragging} $hasCover {...dropHandlers}>
            <CoverCropper src={src} onChange={setCropped} />
          </Drop>
        ) : (
          <Drop type="button" $dragging={dragging} $hasCover={false} title="上傳檔案" onClick={pick} {...dropHandlers}>
            <Indicator>
              <Icon name="upload" size={24} />
              <span>上傳檔案</span>
            </Indicator>
          </Drop>
        )}
        {src && !error ? (
          <Format $bad={false}>
            拖四個角調整範圍、按住圖片移動位置
          </Format>
        ) : (
          <Format $bad={!!error}>{error ?? '支援 JPG、PNG、GIF 格式，檔案大小不超過 10MB'}</Format>
        )}

        {/* 上傳區本身就能點、能拖，左邊不再放「選擇圖片」：還沒選圖是取消，選了圖是換一張（編輯器與書櫃共用這個框） */}
        <Pair>
          <Secondary type="button" onClick={src ? pick : onCancel}>
            {src ? '換一張' : '取消'}
          </Secondary>
          <Secondary type="button" disabled={!cropped} onClick={() => cropped && onConfirm(cropped)} $primary>
            確認上傳
          </Secondary>
        </Pair>
      </Sheet>
    </Scrim>,
    document.body
  );
}

export const Scrim = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  /* Figma 的 backdrop 是 10% 黑；設計系統沒有遮罩 token，從 inverse 面色調出來 */
  background: color-mix(in srgb, ${(p) => p.theme.surface.inverse} 10%, transparent);
  display: grid;
  place-items: center;
  padding: ${(p) => p.theme.space.insetLg};
`;

export const Sheet = styled.div<{ $narrow?: boolean }>`
  inline-size: min(${(p) => (p.$narrow ? '500px' : '400px')}, 100%);
  display: flex;
  flex-direction: column;
  gap: ${(p) => (p.$narrow ? '24px' : '20px')};
  align-items: stretch;
  padding: ${(p) => p.theme.space.insetLg};
  background: ${(p) => p.theme.surface.page};
  border-radius: ${(p) => p.theme.radius.panel};
  box-shadow: ${(p) => p.theme.shadow.float};
`;

const Heading = styled.p`
  margin: 0;
  font-size: ${(p) => p.theme.typography.bodyLgSize};
  line-height: ${(p) => p.theme.typography.bodyLgLineHeight};
  font-weight: 600;
`;

const Lead = styled.p`
  margin: 0;
  font-size: ${(p) => p.theme.typography.bodySize};
  line-height: ${(p) => p.theme.typography.bodyLineHeight};
  color: ${(p) => p.theme.text.secondary};
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${(p) => p.theme.typography.bodyLgSize};
  line-height: ${(p) => p.theme.typography.bodyLgLineHeight};
`;

export const Ghost = styled.button`
  display: grid;
  place-items: center;
  inline-size: 24px;
  block-size: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: ${(p) => p.theme.icon.default};
  cursor: pointer;
`;

export const Pair = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

/** 照 Figma Button：48 高、圓角膠囊、左右內距 32。 */
export const Secondary = styled.button<{ $primary?: boolean }>`
  block-size: ${(p) => p.theme.control.heightLg};
  padding: 0 ${(p) => p.theme.space.insetXl};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.action.secondaryBorder};
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.action.secondaryBg};
  color: ${(p) => p.theme.action.secondaryText};
  font-size: ${(p) => p.theme.typography.bodySize};
  font-weight: 500;
  cursor: pointer;

  &:hover:not(:disabled) { background: ${(p) => p.theme.action.secondaryBgHover}; }
  /* 主要動作（確認上傳、建立）：黑色實心，跟全站的主要按鈕同色 */
  ${(p) =>
    p.$primary &&
    `&:not(:disabled) { border-color: transparent; background: ${p.theme.action.primaryBg}; color: ${p.theme.action.primaryText}; }
     &:hover:not(:disabled) { background: ${p.theme.action.primaryBgHover}; }`}
  &:disabled {
    background: ${(p) => p.theme.action.disabledBg};
    border-color: ${(p) => p.theme.action.disabledBorder};
    color: ${(p) => p.theme.action.disabledText};
    cursor: default;
  }
`;

const Drop = styled.button<{ $dragging: boolean; $hasCover: boolean }>`
  display: grid;
  place-items: center;
  inline-size: 100%;
  block-size: 283px;
  padding: 12px 16px;
  overflow: hidden;
  cursor: pointer;
  border: ${(p) => p.theme.border.widthDefault} solid
    ${(p) => (p.$dragging ? p.theme.border.accent : 'transparent')};
  border-radius: ${(p) => p.theme.radius.tile};
  background: ${(p) => (p.$hasCover ? p.theme.surface.media : p.theme.surface.sunken)};
  color: ${(p) => p.theme.text.placeholder};
  font-size: ${(p) => p.theme.typography.bodySmSize};
`;

const Indicator = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 17px;
  svg { inline-size: 60px; block-size: 60px; }
`;

const Format = styled.p<{ $bad: boolean }>`
  margin: -8px 0 0;
  text-align: center;
  font-size: ${(p) => p.theme.typography.labelSize};
  line-height: ${(p) => p.theme.typography.labelLineHeight};
  letter-spacing: 0.5px;
  font-weight: 500;
  color: ${(p) => (p.$bad ? p.theme.feedback.errorDefault : p.theme.text.tertiary)};
`;
