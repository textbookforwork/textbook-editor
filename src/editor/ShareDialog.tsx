import { useEffect, useState, type DragEvent } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Icon } from '../components/Icon';
import { pickFile, putImage, urlOf } from './assets';

/**
 * 共享的兩個對話框，照 Figma「共享」流程：
 *
 *   按下共享 → 已經共享 → 「自編教材已共享」問要不要放封面
 *       關閉      ＝不更改封面、維持共享
 *       前往上傳  → 「課本封面」上傳框 → 確認上傳 ／ 取消（維持共享、封面不變）
 *
 * 共享本身不在這裡發生（按鈕按下去就共享了），這兩個框只管封面。
 */

const ESC = (onClose: () => void) => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
};

export function SharedDialog({ onClose, onUpload }: { onClose: () => void; onUpload: () => void }) {
  useEffect(() => ESC(onClose), [onClose]);
  return createPortal(
    <Scrim onClick={onClose}>
      <Sheet role="dialog" aria-modal="true" aria-label="自編教材已共享" $narrow onClick={(e) => e.stopPropagation()}>
        <Heading>自編教材已共享</Heading>
        <Lead>放上一張封面，讓教材變完整吧！</Lead>
        <Pair>
          <Secondary type="button" onClick={onClose}>
            關閉
          </Secondary>
          <Accent type="button" onClick={onUpload}>
            前往上傳
          </Accent>
        </Pair>
      </Sheet>
    </Scrim>,
    document.body
  );
}

/** 封面格式與大小上限，照 Figma 的提示文字。 */
const MAX_BYTES = 5 * 1024 * 1024;
const TYPES = ['image/jpeg', 'image/png', 'image/gif'];

export function CoverDialog({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: (coverAssetId: string) => void;
}) {
  const [cover, setCover] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => ESC(onCancel), [onCancel]);

  const accept = async (file: File | null) => {
    if (!file) return;
    if (!TYPES.includes(file.type)) return setError('只支援 JPG、PNG、GIF');
    if (file.size > MAX_BYTES) return setError('檔案不可超過 5MB');
    try {
      const { assetId } = await putImage(file);
      setCover(assetId);
      setError(null);
    } catch {
      setError('讀不到這張圖');
    }
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    void accept(e.dataTransfer.files?.[0] ?? null);
  };

  const url = urlOf(cover);

  return createPortal(
    <Scrim onClick={onCancel}>
      <Sheet role="dialog" aria-modal="true" aria-label="課本封面" onClick={(e) => e.stopPropagation()}>
        <Head>
          <span>課本封面</span>
          <Ghost type="button" onClick={onCancel} aria-label="關閉" title="關閉">
            <Icon name="x" size={24} label="關閉" />
          </Ghost>
        </Head>

        <Drop
          type="button"
          $dragging={dragging}
          $hasCover={!!url}
          title="上傳檔案"
          onClick={() => void pickFile(TYPES.join(',')).then(accept)}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          {url ? (
            <Preview src={url} alt="封面預覽" />
          ) : (
            <Indicator>
              <Icon name="upload" size={24} />
              <span>上傳檔案</span>
            </Indicator>
          )}
        </Drop>
        <Format $bad={!!error}>{error ?? '支援 JPG、PNG、GIF 格式，檔案大小不超過 5MB'}</Format>

        <Pair>
          <Secondary type="button" onClick={onCancel}>
            取消
          </Secondary>
          <Secondary type="button" disabled={!cover} onClick={() => cover && onConfirm(cover)} $primary>
            確認上傳
          </Secondary>
        </Pair>
      </Sheet>
    </Scrim>,
    document.body
  );
}

const Scrim = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  /* Figma 的 backdrop 是 10% 黑；設計系統沒有遮罩 token，從 inverse 面色調出來 */
  background: color-mix(in srgb, ${(p) => p.theme.surface.inverse} 10%, transparent);
  display: grid;
  place-items: center;
  padding: ${(p) => p.theme.space.insetLg};
`;

const Sheet = styled.div<{ $narrow?: boolean }>`
  inline-size: min(${(p) => (p.$narrow ? '500px' : '400px')}, 100%);
  display: flex;
  flex-direction: column;
  gap: ${(p) => (p.$narrow ? '24px' : '20px')};
  align-items: ${(p) => (p.$narrow ? 'center' : 'stretch')};
  padding: ${(p) => p.theme.space.insetLg};
  background: ${(p) => p.theme.surface.page};
  border-radius: ${(p) => p.theme.radius.panel};
  box-shadow: ${(p) => p.theme.shadow.float};
`;

const Heading = styled.p`
  margin: 0;
  padding-block: ${(p) => p.theme.space.insetXs};
  font-size: ${(p) => p.theme.typography.bodyLgSize};
  line-height: ${(p) => p.theme.typography.bodyLgLineHeight};
  font-weight: 600;
  text-align: center;
`;

const Lead = styled.p`
  margin: 0;
  padding-block: ${(p) => p.theme.space.insetLg};
  font-size: ${(p) => p.theme.typography.bodySize};
  line-height: ${(p) => p.theme.typography.bodyLineHeight};
  text-align: center;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${(p) => p.theme.typography.bodyLgSize};
  line-height: ${(p) => p.theme.typography.bodyLgLineHeight};
`;

const Ghost = styled.button`
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

const Pair = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

/** 照 Figma Button：48 高、圓角膠囊、左右內距 32。 */
const Secondary = styled.button<{ $primary?: boolean }>`
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
  &:disabled {
    background: ${(p) => p.theme.action.disabledBg};
    border-color: ${(p) => p.theme.action.disabledBorder};
    color: ${(p) => p.theme.action.disabledText};
    cursor: default;
  }
`;

const Accent = styled(Secondary)`
  border-color: transparent;
  background: ${(p) => p.theme.action.accentBg};
  color: ${(p) => p.theme.action.accentText};
  &:hover:not(:disabled) { background: ${(p) => p.theme.action.accentBgHover}; }
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

const Preview = styled.img`
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
  display: block;
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
