import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { customSwatchCss, swatchCss, swatchRowCss } from './swatch';
import styled, { css } from 'styled-components';
import { Icon } from '../components/Icon';
import { pickFile, putImage, urlOf } from './assets';
import type { PageBackground } from '../model/types';

/**
 * 當頁背景。按鈕貼在頁面左上角的頁外，點開是一排色票與「上傳圖片」。
 *
 * 色票只給淡色：背景是給課文襯的，不是給它搶的。白底為主，
 * 品牌色只拿它的淡色版。深色背景會讓黑字看不清，所以不列。
 */
const SWATCHES: { label: string; color: string | null }[] = [
  { label: '白', color: null },
  { label: '灰', color: '#F5F5F5' },
  { label: '米', color: '#FBF7EE' },
  { label: '萊姆', color: '#F9FFCF' },
  { label: '琥珀', color: '#FDF3D1' },
  { label: '橘', color: '#FFE7DA' },
  { label: '森林', color: '#D9F3E8' },
  { label: '天藍', color: '#D6F5FB' },
  { label: '紫', color: '#E6E2F8' },
];

type Props = {
  value: PageBackground | undefined;
  /** 這一頁是接續上一段開始的，背景掛不上去（它屬於上一頁的那一列）。 */
  disabled?: boolean;
  onChange: (next: PageBackground | null) => void;
};

export function PageBackgroundButton({ value, disabled, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (!open) return;
    const place = () => {
      const r = btnRef.current?.getBoundingClientRect();
      if (r) setPos({ top: r.bottom + 8, left: r.left });
    };
    place();
    const onDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('[data-bg-popover]') || t === btnRef.current) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('pointerdown', onDown, true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('pointerdown', onDown, true);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', place, true);
    };
  }, [open]);

  const has = !!(value?.color || value?.assetId);
  // 不在色票裡的顏色＝老師用選色器挑的，顯示在最後那一格上
  const custom = value?.color && !SWATCHES.some((s) => s.color === value.color) ? value.color : null;
  const pickerRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Btn
        ref={btnRef}
        type="button"
        data-ui
        disabled={disabled}
        $open={open}
        $has={has}
        onClick={() => setOpen((v) => !v)}
        title={disabled ? '這一頁接續上一段，背景跟著上一頁' : '當頁背景'}
        aria-label="當頁背景"
      >
        <Icon name="palette" size={16} />
        {has && (
          <Dot
            style={{
              background: value?.assetId ? `center / cover url(${urlOf(value.assetId)})` : value?.color,
            }}
          />
        )}
      </Btn>

      {open &&
        pos &&
        createPortal(
          <Pop data-bg-popover data-ui style={pos} role="dialog" aria-label="當頁背景">
            <Row>
              {SWATCHES.map((s) => (
                <Swatch
                  key={s.label}
                  type="button"
                  title={s.label}
                  $on={(value?.color ?? null) === s.color && !value?.assetId}
                  style={{ background: s.color ?? '#fff' }}
                  onClick={() => onChange(s.color ? { color: s.color } : null)}
                />
              ))}
              {/* 最後一格開選色器（跟文字面板同一套）。選過的自訂色就留在這一格上 */}
              <Custom
                type="button"
                title="自訂顏色"
                $on={!!custom && !value?.assetId}
                style={custom ? { background: custom } : undefined}
                onClick={() => pickerRef.current?.click()}
              >
                {!custom && <Icon name="plus" size={16} />}
                <input
                  ref={pickerRef}
                  type="color"
                  value={custom ?? '#ffffff'}
                  onChange={(e) => onChange({ color: e.target.value })}
                  aria-label="自訂顏色"
                  tabIndex={-1}
                />
              </Custom>
            </Row>
            <Actions>
              <UploadAct
                type="button"
                onClick={async () => {
                  const file = await pickFile('image/*');
                  if (!file) return;
                  const { assetId } = await putImage(file);
                  onChange({ ...(value?.color ? { color: value.color } : {}), assetId });
                }}
              >
                上傳圖片
                <Icon name="upload" size={16} />
              </UploadAct>
              {has && (
                <Act type="button" onClick={() => onChange(null)}>
                  清除
                  <Icon name="x" size={16} />
                </Act>
              )}
            </Actions>
          </Pop>,
          document.body
        )}
    </>
  );
}

/**
 * 狀態照 Figma 的方塊按鈕：平常白底淺灰框、滑過框變深、彈窗開著（選中）單一圈橄欖綠框、
 * 停用淡框淡圖示。每一頁旁都有一顆，所以平常半透明，滑過或已設背景才全亮。
 * 鍵盤焦點也用那一圈綠框，不另外畫外圈——兩圈疊在一起很亂。
 */
const Btn = styled.button<{ $open: boolean; $has: boolean }>`
  position: absolute;
  inset-inline-start: -40px;
  inset-block-start: 0;
  inline-size: 28px;
  block-size: 28px;
  /* 按鈕預設左右各 6px 內距，28px 扣掉後裝不下 20px 圖示，會被擠歪 */
  padding: 0;
  display: grid;
  place-items: center;
  border-radius: ${(p) => p.theme.radius.field};
  border: ${(p) => p.theme.border.widthFocus} solid
    ${(p) => (p.$open ? p.theme.border.selected : p.theme.border.subtle)};
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.icon.default};
  cursor: pointer;
  opacity: ${(p) => (p.$open || p.$has ? 1 : 0.35)};
  transition: opacity 0.12s, border-color 0.12s;

  &:hover:not(:disabled) {
    opacity: 1;
    border-color: ${(p) => (p.$open ? p.theme.border.selected : p.theme.border.hover)};
  }
  &:focus-visible {
    outline: none;
    opacity: 1;
    border-color: ${(p) => p.theme.border.selected};
  }
  &:disabled {
    cursor: default;
    opacity: 0.35;
    color: ${(p) => p.theme.icon.disabled};
    border-color: ${(p) => p.theme.border.subtle};
  }
`;

const Dot = styled.span`
  position: absolute;
  inset-inline-end: -4px;
  inset-block-end: -4px;
  inline-size: 12px;
  block-size: 12px;
  border-radius: 999px;
  border: 2px solid ${(p) => p.theme.surface.raised};
  box-shadow: 0 0 0 1px ${(p) => p.theme.border.subtle};
`;

const Pop = styled.div`
  position: fixed;
  z-index: 900;
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.gapMd};
  padding: ${(p) => p.theme.space.insetSm};
  border-radius: ${(p) => p.theme.radius.panel};
  /* 浮層一律用淡白底（#FAFAFA），跟設定面板、共享對話框同一色 */
  background: ${(p) => p.theme.surface.page};
  /* 跟其他選單（Dropdown、文字工具的彈窗）同一款：白底圓角、只靠陰影，不畫框 */
  box-shadow: ${(p) => p.theme.shadow.card};
  writing-mode: horizontal-tb;
`;

const Row = styled.div`
  ${swatchRowCss}
`;

const Swatch = styled.button<{ $on: boolean }>`
  ${swatchCss}
`;

const Custom = styled(Swatch)`
  ${customSwatchCss}
`;

/**
 * 兩顆的尺寸、字級、圖示都以「清除」為準（這個彈窗小，用全站主要按鈕的 14px 會太重），
 * 只差配色：上傳是主要動作，黑底；清除是次要動作，白底灰框。
 * 黑底那顆也畫同寬的框（同色），兩顆才會等高。
 */
const actCss = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font: inherit;
  font-size: var(--ds-typography-label-size);
  min-block-size: ${(p) => p.theme.control.heightSm};
  padding: 0 10px;
  cursor: pointer;
  border-radius: ${(p) => p.theme.radius.control};
`;

const UploadAct = styled.button`
  ${actCss}
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.action.primaryBg};
  background: ${(p) => p.theme.action.primaryBg};
  color: ${(p) => p.theme.action.primaryText};
  &:hover {
    background: ${(p) => p.theme.action.primaryBgHover};
    border-color: ${(p) => p.theme.action.primaryBgHover};
  }
`;

/* 上傳圖片（與清除）撐滿整列，跟上面的色票同寬，不會一顆按鈕偏在左邊 */
const Actions = styled.div`
  display: flex;
  gap: 6px;

  & > * { flex: 1; justify-content: center; }
`;

const Act = styled.button`
  ${actCss}
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.text.secondary};
  /* 次要按鈕的滑過：品牌深綠的框與字（跟「新增補充」「插入標籤」同一款） */
  &:hover { border-color: ${(p) => p.theme.border.accent}; color: ${(p) => p.theme.text.accent}; }
`;
