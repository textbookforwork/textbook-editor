import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Icon } from '../components/Icon';
import type { IconName } from '../assets/icons.generated';

/** short：按鈕上顯示的短字（例：只顯示箭頭符號），選單裡仍顯示完整的 label。 */
export type DropdownOption = { value: string; label: string; short?: string };

type Props = {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  /** 還沒選時顯示的字（例：「年級」）。 */
  placeholder?: string;
  'aria-label': string;
  /**
   * field：面板裡的欄位，淡灰膠囊撐滿寬（教材設定、補充面板）。
   * tool：浮動工具列上的小鈕，透明底、滑過才有灰底，寬度跟著字。
   * 兩種只有按鈕長得不同，展開的選單一律同一款。
   */
  variant?: 'field' | 'tool';
  title?: string;
  /** 按鈕上放在值前面的圖示，當作這顆下拉的名稱（例：行距）。圖示本身就是標籤，所以放前面。 */
  icon?: IconName;
};

/**
 * 下拉選單。原生 select 的選單長相由作業系統決定、各家不同，這裡自己畫：
 * 淡灰膠囊、箭頭在字後面；展開是白底圓角清單，選中的那一項用品牌深綠加粗。
 *
 * 選單用 portal 掛到 body：放在會捲動、會裁切的抽屜裡（教材設定）也不會被切掉。
 * 下方空間不夠就往上開。
 */
export function Dropdown({ value, options, onChange, placeholder = '請選擇', 'aria-label': label, variant = 'field', title, icon }: Props) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; width: number; top?: number; bottom?: number } | null>(null);
  const current = options.find((o) => o.value === value);

  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const r = triggerRef.current?.getBoundingClientRect();
      if (!r) return;
      const below = window.innerHeight - r.bottom;
      const need = Math.min(options.length * 38 + 16, 320);
      setPos(
        below >= need + 8 || below >= r.top
          ? { left: r.left, width: r.width, top: r.bottom + 6 }
          : { left: r.left, width: r.width, bottom: window.innerHeight - r.top + 6 }
      );
    };
    place();
    window.addEventListener('scroll', place, true);
    window.addEventListener('resize', place);
    return () => {
      window.removeEventListener('scroll', place, true);
      window.removeEventListener('resize', place);
    };
  }, [open, options.length]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (menuRef.current?.contains(t) || triggerRef.current?.contains(t)) return;
      setOpen(false);
    };
    // Esc 只收選單，不要連外面的抽屜一起關：捕獲階段先接走
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.stopPropagation();
      setOpen(false);
      triggerRef.current?.focus();
    };
    window.addEventListener('pointerdown', onDown, true);
    window.addEventListener('keydown', onKey, true);
    return () => {
      window.removeEventListener('pointerdown', onDown, true);
      window.removeEventListener('keydown', onKey, true);
    };
  }, [open]);

  // 打開時游標停在目前選的那一項（沒選就第一項），方向鍵上下移動
  useEffect(() => {
    if (!open || !pos) return;
    const items = menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]');
    if (!items?.length) return;
    const at = Math.max(0, options.findIndex((o) => o.value === value));
    items[at]?.focus();
  }, [open, pos, options, value]);

  const onMenuKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]') ?? []);
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    const next = e.key === 'ArrowDown' ? Math.min(items.length - 1, i + 1) : Math.max(0, i - 1);
    items[next]?.focus();
  };

  return (
    <>
      <Trigger
        ref={triggerRef}
        type="button"
        aria-label={label}
        title={title}
        aria-haspopup="listbox"
        aria-expanded={open}
        $empty={!current}
        $tool={variant === 'tool'}
        onClick={() => setOpen((o) => !o)}
      >
        {icon && <LeadIcon name={icon} size={20} />}
        <TriggerText>{current?.short ?? current?.label ?? placeholder}</TriggerText>
        <Icon name="chevron-down" size={16} />
      </Trigger>
      {open &&
        pos &&
        createPortal(
          <Menu
            ref={menuRef}
            role="listbox"
            aria-label={label}
            // tool 款的按鈕寬度跟著字，選單不能跟它一樣寬，否則較長的選項會被切掉
            style={
              variant === 'tool'
                ? { ...pos, width: undefined, minWidth: pos.width, maxWidth: window.innerWidth - pos.left - 8 }
                : pos
            }
            onKeyDown={onMenuKey}
            data-ui
            // 點選單不要讓編輯區失去游標或取消選取（浮動工具列上的下拉也用這個元件）
            onPointerDown={(e) => e.preventDefault()}
          >
            {options.map((o) => (
              <Item
                key={o.value}
                type="button"
                role="option"
                aria-selected={o.value === value}
                $on={o.value === value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
              >
                {o.label}
              </Item>
            ))}
          </Menu>,
          document.body
        )}
    </>
  );
}

const Trigger = styled.button<{ $empty: boolean; $tool: boolean }>`
  display: flex;
  align-items: center;
  gap: 2px;
  inline-size: ${(p) => (p.$tool ? 'auto' : '100%')};
  flex-shrink: ${(p) => (p.$tool ? 0 : 1)};
  min-inline-size: 0;
  min-block-size: 36px;
  /* 欄位款左右收窄：教材設定一列放三個（階段、年級、學期），「上學期」「3 年級」要放得下 */
  padding: 0 8px 0 12px;
  font: inherit;
  font-size: ${(p) => p.theme.typography.bodySmSize};
  font-weight: 400;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  border: none;
  border-radius: ${(p) => p.theme.radius.control};
  /* 欄位款跟輸入框同一套：muted 底，滑過或展開加一圈框 */
  background: ${(p) => (p.$tool ? 'transparent' : p.theme.surface.muted)};
  /* 工具列款跟膠囊上其他鈕同一個灰字；欄位款是填好的值，用深色 */
  color: ${(p) => (p.$empty ? p.theme.text.tertiary : p.$tool ? p.theme.text.secondary : p.theme.text.primary)};
  cursor: pointer;

  &:hover,
  &[aria-expanded='true'] {
    ${(p) => (p.$tool ? `color: ${p.theme.text.primary};` : '')}
    ${(p) =>
      p.$tool
        ? `background: ${p.theme.surface.sunken};`
        : `box-shadow: inset 0 0 0 1px ${p.theme.border.default};`}
  }
  &:focus-visible { outline: none; box-shadow: inset 0 0 0 1px ${(p) => p.theme.border.hover}; }
  svg { flex: none; color: ${(p) => p.theme.icon.default}; }
`;

/* 名稱圖示跟值之間留一點空，不然圖示和數字黏成一團 */
const LeadIcon = styled(Icon)`
  flex: none;
  margin-inline-end: 4px;
`;

const TriggerText = styled.span`
  flex: 1 1 auto;
  min-inline-size: 0;
  text-align: start;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/* 比教材設定抽屜（z-index 1000）高一層。樣式要跟 TextPanel 的 Pop／MenuItem 一致 */
const Menu = styled.div`
  position: fixed;
  z-index: 1050;
  box-sizing: border-box;
  min-inline-size: 132px;
  writing-mode: horizontal-tb;
  max-block-size: 320px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px;
  /* 浮層一律用淡白底（#FAFAFA），跟設定面板、共享對話框同一色 */
  background: ${(p) => p.theme.surface.page};
  border-radius: ${(p) => p.theme.radius.panel};
  box-shadow: ${(p) => p.theme.shadow.popover};
`;

const Item = styled.button<{ $on: boolean }>`
  display: flex;
  align-items: center;
  min-block-size: 36px;
  padding: 0 12px;
  white-space: nowrap;
  font: inherit;
  font-size: ${(p) => p.theme.typography.bodySmSize};
  text-align: start;
  border: none;
  border-radius: ${(p) => p.theme.radius.card};
  background: transparent;
  color: ${(p) => (p.$on ? p.theme.brand.accentOnLight : p.theme.text.primary)};
  font-weight: ${(p) => (p.$on ? 700 : 400)};
  cursor: pointer;

  /* 選單是淡白底（#FAFAFA），滑過要深一階才看得出 */
  &:hover,
  &:focus-visible { background: ${(p) => p.theme.surface.muted}; outline: none; }
`;
