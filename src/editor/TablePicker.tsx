import { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../components/Icon';
import { TABLE_DEFAULT, TABLE_PICK_MAX } from '../model/tableOps';

type Props = {
  onBack: () => void;
  onInsert: (size: { rows: number; cols: number }) => void;
};

/** 數字輸入的上限。格子圖最多 8×8，要更大的表格就打數字；再大一頁也裝不下。 */
const MAX_ROWS = 30;
const MAX_COLS = 12;

/**
 * 插入面板裡的表格子選單：在格子圖上滑或拖就選好大小，也可以直接打數字。
 * 跟圖片的子選單同一層，一樣有「返回」。
 */
export function TablePicker({ onBack, onInsert }: Props) {
  const [size, setSize] = useState(TABLE_DEFAULT);
  // 滑過格子圖時的預覽，不改已經定下來的數字；離開就回到定下來的
  const [hover, setHover] = useState<{ rows: number; cols: number } | null>(null);

  const clamp = (v: number, max: number) => Math.max(1, Math.min(max, Math.floor(v) || 1));
  const insert = () => onInsert(size);

  return (
    <Panel>
      <Back type="button" onClick={onBack} aria-label="返回">
        <Icon name="chevron-left" size={16} />
        表格
      </Back>

      <SizeCard>
        {/* 格子圖：同時區分「目前選定 (size)」與「滑過預覽 (hover)」，點一下定下來、按著拖也可以 */}
        <Grid
          role="grid"
          aria-label="表格大小"
          onPointerLeave={() => setHover(null)}
        >
          {Array.from({ length: TABLE_PICK_MAX * TABLE_PICK_MAX }, (_, i) => {
            const r = Math.floor(i / TABLE_PICK_MAX) + 1;
            const c = (i % TABLE_PICK_MAX) + 1;
            const selected = r <= size.rows && c <= size.cols;
            const preview = hover !== null && r <= hover.rows && c <= hover.cols;
            const dimming = hover !== null && selected && !preview;
            return (
              <Cellp
                key={i}
                type="button"
                $selected={selected}
                $preview={preview}
                $dimming={dimming}
                aria-label={`${c} 欄 × ${r} 列`}
                aria-pressed={selected}
                onPointerEnter={(e) => {
                  setHover({ rows: r, cols: c });
                  // 按著拖：拖到哪裡就定到哪裡
                  if (e.buttons === 1) setSize({ rows: r, cols: c });
                }}
                onPointerDown={() => setSize({ rows: r, cols: c })}
                onDoubleClick={insert}
              />
            );
          })}
        </Grid>

        <Inputs>
          <InputGroup>
            <Num
              type="number"
              min={1}
              max={MAX_COLS}
              value={size.cols}
              aria-label="欄數"
              onChange={(e) => setSize((s) => ({ ...s, cols: clamp(Number(e.target.value), MAX_COLS) }))}
            />
            <Unit>欄</Unit>
          </InputGroup>
          <InputGroup>
            <Num
              type="number"
              min={1}
              max={MAX_ROWS}
              value={size.rows}
              aria-label="列數"
              onChange={(e) => setSize((s) => ({ ...s, rows: clamp(Number(e.target.value), MAX_ROWS) }))}
            />
            <Unit>列</Unit>
          </InputGroup>
        </Inputs>
      </SizeCard>

      <Go type="button" onClick={insert}>
        插入表格
      </Go>
    </Panel>
  );
}

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.gapSm};
`;

const Back = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  align-self: flex-start;
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  color: ${(p) => p.theme.text.secondary};
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: ${(p) => p.theme.radius.control};
  &:hover { background: ${(p) => p.theme.surface.sunken}; color: ${(p) => p.theme.text.primary}; }
`;

const SizeCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.gapMd};
  padding: ${(p) => p.theme.space.insetSm};
  border-radius: ${(p) => p.theme.radius.card};
  background: ${(p) => p.theme.surface.sunken};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${TABLE_PICK_MAX}, 1fr);
  gap: 4px;
  touch-action: none;
`;

/**
 * 格子有三種視覺層次，讓使用者一眼分出「目前選定的」與「準備再選一次的」：
 * 1. 已選定 ($selected)：實心萊姆黃底 + 橄欖綠實線框（若滑鼠正在預覽更小範圍 $dimming，則降為淡底保留原邊界記憶）
 * 2. 滑過預覽但尚未選定 ($preview && !$selected)：淡萊姆底 + 橄欖綠虛線框，清楚預告點下後會擴展到哪裡
 * 3. 未選也未滑過：白底細框
 */
const Cellp = styled.button<{ $selected: boolean; $preview: boolean; $dimming: boolean }>`
  aspect-ratio: 1;
  padding: 0;
  border-radius: 6px;
  cursor: pointer;
  border: 1.5px
    ${(p) => (p.$preview && !p.$selected ? 'dashed' : 'solid')}
    ${(p) =>
      p.$selected && !p.$dimming
        ? p.theme.brand.accentOnLight
        : p.$preview || p.$dimming
          ? p.theme.brand.primaryActive
          : p.theme.border.subtle};
  background: ${(p) =>
    p.$selected && !p.$dimming
      ? p.theme.brand.primary
      : p.$preview
        ? p.theme.brand.primaryTintSubtle
        : p.$dimming
          ? p.theme.brand.primaryTint
          : p.theme.surface.raised};
  transition: background 0.08s, border-color 0.08s;
`;

const Inputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(p) => p.theme.space.gapMd};
  align-items: center;
`;

const InputGroup = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  min-inline-size: 0;
`;

const Num = styled.input`
  flex: 1;
  min-inline-size: 0;
  min-block-size: 40px;
  padding: 0 14px;
  font: inherit;
  font-size: var(--ds-typography-body-size);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  border: ${(p) => p.theme.border.widthDefault} solid transparent;
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.surface.muted};
  color: ${(p) => p.theme.text.primary};
  transition: border-color 0.12s, background 0.12s;

  &:focus {
    outline: none;
    background: ${(p) => p.theme.surface.raised};
    border-color: ${(p) => p.theme.border.focus};
  }
`;

const Unit = styled.span`
  flex: none;
  font-size: var(--ds-typography-body-sm-size);
  color: ${(p) => p.theme.text.secondary};
`;

const Go = styled.button`
  margin-block-start: 2px;
  min-block-size: 44px;
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 600;
  border: none;
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.action.primaryBg};
  color: ${(p) => p.theme.action.primaryText};
  cursor: pointer;
  &:hover { background: ${(p) => p.theme.action.primaryBgHover}; }
`;
