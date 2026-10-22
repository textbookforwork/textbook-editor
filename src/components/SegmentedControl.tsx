import type { ReactNode } from 'react';
import styled from 'styled-components';

type Option<T extends string> = { value: T; label: ReactNode };

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  'aria-label': string;
  /** compact：左側欄頁面／目次那種小字窄版；預設是教材設定的欄位大小。 */
  compact?: boolean;
};

/**
 * 膠囊切換：淡灰軌道上一顆白膠囊。白膠囊是獨立的一塊，切換時從原本的位置滑過去，
 * 不是在兩顆按鈕之間閃換——看得出「換到另一邊了」。
 *
 * 每一格等寬，所以白膠囊的寬與位置用格數算得出來，不必量 DOM。
 * 用實體的 translateX：這一層固定橫排（左側欄、教材設定都是介面，不跟教材直排）。
 */
export function SegmentedControl<T extends string>({ options, value, onChange, compact, 'aria-label': label }: Props<T>) {
  const at = options.findIndex((o) => o.value === value);
  const gap = compact ? 2 : 4;
  return (
    <Track role="tablist" aria-label={label} $n={options.length} $gap={gap}>
      {at >= 0 && (
        <Thumb
          aria-hidden
          $n={options.length}
          $gap={gap}
          style={{ transform: `translateX(calc(${at} * (100% + ${gap}px)))` }}
        />
      )}
      {options.map((o) => (
        <Item
          key={o.value}
          type="button"
          role="tab"
          aria-selected={o.value === value}
          $on={o.value === value}
          $compact={!!compact}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </Item>
      ))}
    </Track>
  );
}

const PAD = 4;

const Track = styled.div<{ $n: number; $gap: number }>`
  position: relative;
  display: grid;
  grid-template-columns: repeat(${(p) => p.$n}, minmax(0, 1fr));
  gap: ${(p) => p.$gap}px;
  padding: ${PAD}px;
  border-radius: ${(p) => p.theme.radius.control};
  /* 跟畫布底色同一個灰（#F2F2F2），左欄的「頁面／目次」與畫布外的灰才是同一色 */
  background: ${(p) => p.theme.surface.backdrop};
  writing-mode: horizontal-tb;
`;

const Thumb = styled.span<{ $n: number; $gap: number }>`
  position: absolute;
  top: ${PAD}px;
  bottom: ${PAD}px;
  left: ${PAD}px;
  width: calc((100% - ${PAD * 2}px - ${(p) => (p.$n - 1) * p.$gap}px) / ${(p) => p.$n});
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.surface.raised};
  box-shadow: 0 1px 3px rgba(26, 25, 23, 0.14);
  transition: transform 0.28s cubic-bezier(0.3, 0.7, 0.4, 1);
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Item = styled.button<{ $on: boolean; $compact: boolean }>`
  position: relative;
  z-index: 1;
  min-inline-size: 0;
  white-space: nowrap;
  font: inherit;
  font-size: ${(p) => (p.$compact ? 'var(--ds-typography-label-size)' : 'var(--ds-typography-body-sm-size)')};
  min-block-size: ${(p) => (p.$compact ? '30px' : '32px')};
  padding: 0 4px;
  cursor: pointer;
  border: none;
  border-radius: ${(p) => p.theme.radius.control};
  background: transparent;
  color: ${(p) => (p.$on ? p.theme.text.primary : p.theme.text.secondary)};
  font-weight: ${(p) => (p.$on ? 500 : 400)};
  transition: color 0.2s;

  &:hover { color: ${(p) => p.theme.text.primary}; }
`;
