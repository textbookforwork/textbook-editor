import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { customSwatchCss, swatchCss, swatchRowCss } from './swatch';
import styled from 'styled-components';
import { Dropdown } from './Dropdown';
import { Icon } from '../components/Icon';
import { useEditorCtx } from './EditorContext';
import { DEFAULT_TAIL, SHAPE_STROKE_WIDTH } from '../components/blocks/ShapeBlockView';
import { LINE_CAP_LABEL, LINE_STROKE_WIDTH } from '../components/blocks/LineBlockView';
import type { LineBlock, LineCap, ShapeBlock, ShapeKind } from '../model/types';

/**
 * 圖形與線段的上方膠囊工具列。
 * 直接內嵌在浮動膠囊中，不再使用左側抽屜，保持簡潔直覺（Keep it simple）。
 */

const SWATCHES: { label: string; color: string }[] = [
  { label: '白', color: '#FFFFFF' },
  { label: '墨', color: '#1A1917' },
  { label: '橘', color: '#FF854A' },
  { label: '藍', color: '#1A66C2' },
];

const DEFAULT_FILL = '#FFFFFF';
const DEFAULT_STROKE = '#1A1917';
const CAPS: LineCap[] = ['none', 'arrow', 'arrowFilled', 'dot'];
/** 膠囊上只畫端點的樣子，不寫「起點：無」這種字；完整名稱在選單裡與滑過的提示 */
const START_GLYPH: Record<LineCap, string> = { none: '—', arrow: '←', arrowFilled: '◀', dot: '●' };
const END_GLYPH: Record<LineCap, string> = { none: '—', arrow: '→', arrowFilled: '▶', dot: '●' };

// ── 圖形工具 ─────────────────────────────────────────────

type ShapeProps = {
  block: ShapeBlock;
  blockId: string;
};

export function ShapeTools({ block, blockId }: ShapeProps) {
  const ed = useEditorCtx()!;
  const [openPopover, setOpenPopover] = useState<'fill' | 'stroke' | 'opacity' | null>(null);

  const fillRef = useRef<HTMLButtonElement>(null);
  const strokeRef = useRef<HTMLButtonElement>(null);
  const opacityRef = useRef<HTMLButtonElement>(null);

  const fill = block.fill ?? DEFAULT_FILL;
  const stroke = block.stroke ?? DEFAULT_STROKE;
  const strokeWidth = block.strokeWidth ?? SHAPE_STROKE_WIDTH;
  const opacity = Math.round((block.opacity ?? 1) * 100);

  const patch = (p: Partial<ShapeBlock>) =>
    ed.dispatch({ type: 'patchBlock', blockId, blockType: 'shape', patch: p });

  return (
    <>
      {/* 形狀切換 */}
      <Dropdown
        variant="tool"
        value={block.shape}
        aria-label="形狀"
        title="形狀"
        options={[
          { value: 'rect', label: '矩形' },
          { value: 'circle', label: '圓形' },
          { value: 'roundedRect', label: '圓角矩形' },
          { value: 'callout', label: '對話框' },
        ]}
        onChange={(v) => {
          const kind = v as ShapeKind;
          if (kind === block.shape) return;
          if (kind === 'circle') {
            patch({ shape: 'circle', widthPct: undefined, blockSize: undefined });
          } else if (kind === 'callout') {
            const extra = block.shape === 'circle' ? { widthPct: undefined, blockSize: undefined } : {};
            patch({ shape: 'callout', tail: block.tail ?? DEFAULT_TAIL, ...extra });
          } else {
            const extra = block.shape === 'circle' ? { widthPct: undefined, blockSize: undefined } : {};
            patch({ shape: kind, ...extra });
          }
        }}
      />

      {/* 填色 */}
      <ToolBtn
        ref={fillRef}
        $open={openPopover === 'fill'}
        onClick={() => setOpenPopover(openPopover === 'fill' ? null : 'fill')}
        title="填色"
        aria-label="填色"
      >
        填色
        <ColorCircle style={{ background: fill }} />
      </ToolBtn>
      {openPopover === 'fill' && (
        <Popover anchor={fillRef.current} label="填色" onClose={() => setOpenPopover(null)}>
          <ColorPickerMenu
            value={fill}
            label="填色"
            onChange={(c) => patch({ fill: c })}
            onClose={() => setOpenPopover(null)}
          />
        </Popover>
      )}

      {/* 邊框顏色 */}
      <ToolBtn
        ref={strokeRef}
        $open={openPopover === 'stroke'}
        onClick={() => setOpenPopover(openPopover === 'stroke' ? null : 'stroke')}
        title="邊框顏色"
        aria-label="邊框顏色"
      >
        邊框
        <ColorCircle style={{ background: stroke }} />
      </ToolBtn>
      {openPopover === 'stroke' && (
        <Popover anchor={strokeRef.current} label="邊框顏色" onClose={() => setOpenPopover(null)}>
          <ColorPickerMenu
            value={stroke}
            label="邊框顏色"
            onChange={(c) => patch({ stroke: c })}
            onClose={() => setOpenPopover(null)}
          />
        </Popover>
      )}

      {/* 邊框粗細 */}
      <SizeWrap title="邊框粗細">
        <SizeInput
          type="number"
          min={0}
          max={24}
          step={1}
          value={strokeWidth}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (Number.isFinite(v)) patch({ strokeWidth: Math.max(0, Math.min(24, v)) });
          }}
          aria-label="邊框粗細"
        />
        <UnitLabel>px</UnitLabel>
      </SizeWrap>

      {/* 透明度 */}
      <ToolBtn
        ref={opacityRef}
        $open={openPopover === 'opacity'}
        onClick={() => setOpenPopover(openPopover === 'opacity' ? null : 'opacity')}
        title="透明度"
        aria-label="透明度"
      >
        {opacity}%
      </ToolBtn>
      {openPopover === 'opacity' && (
        <Popover anchor={opacityRef.current} label="透明度" onClose={() => setOpenPopover(null)}>
          <OpacityMenu
            value={opacity}
            onChange={(val) => patch({ opacity: val / 100 })}
          />
        </Popover>
      )}
      {/* 圖形裡的文字直排／橫排。跟段落那顆同一個圖示，按下去底色變灰表示已直排 */}
      <ToolBtn
        $on={!!block.textVertical}
        onClick={() => patch({ textVertical: block.textVertical ? undefined : true })}
        title={block.textVertical ? '文字改回橫排' : '文字改成直排'}
        aria-label={block.textVertical ? '文字改回橫排' : '文字改成直排'}
        style={{ padding: 0, inlineSize: 36 }}
      >
        <Icon name="writing-vertical" size={20} />
      </ToolBtn>
    </>
  );
}

// ── 線段工具 ─────────────────────────────────────────────

type LineProps = {
  block: LineBlock;
  blockId: string;
};

export function LineTools({ block, blockId }: LineProps) {
  const ed = useEditorCtx()!;
  const [openPopover, setOpenPopover] = useState<'stroke' | 'opacity' | null>(null);

  const strokeRef = useRef<HTMLButtonElement>(null);
  const opacityRef = useRef<HTMLButtonElement>(null);

  const stroke = block.stroke ?? DEFAULT_STROKE;
  const strokeWidth = block.strokeWidth ?? LINE_STROKE_WIDTH;
  const opacity = Math.round((block.opacity ?? 1) * 100);

  const patch = (p: Partial<LineBlock>) =>
    ed.dispatch({ type: 'patchBlock', blockId, blockType: 'line', patch: p });

  return (
    <>
      {/* 線條顏色 */}
      <ToolBtn
        ref={strokeRef}
        $open={openPopover === 'stroke'}
        onClick={() => setOpenPopover(openPopover === 'stroke' ? null : 'stroke')}
        title="線條顏色"
        aria-label="線條顏色"
      >
        <ColorCircle style={{ background: stroke }} />
      </ToolBtn>
      {openPopover === 'stroke' && (
        <Popover anchor={strokeRef.current} label="線條顏色" onClose={() => setOpenPopover(null)}>
          <ColorPickerMenu
            value={stroke}
            label="線條顏色"
            onChange={(c) => patch({ stroke: c })}
            onClose={() => setOpenPopover(null)}
          />
        </Popover>
      )}

      {/* 線條粗細 */}
      <SizeWrap title="線條粗細">
        <SizeInput
          type="number"
          min={0.5}
          max={24}
          step={0.5}
          value={strokeWidth}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (Number.isFinite(v)) patch({ strokeWidth: Math.max(0.5, Math.min(24, v)) });
          }}
          aria-label="線條粗細"
        />
        <UnitLabel>px</UnitLabel>
      </SizeWrap>

      {/* 實線／虛線 */}
      <ToolBtn
        $on={!!block.dashed}
        onClick={() => patch({ dashed: !block.dashed })}
        title={block.dashed ? '切換為實線' : '切換為虛線'}
      >
        {block.dashed ? '虛線' : '實線'}
      </ToolBtn>

      {/* 起點樣式 */}
      <Dropdown
        variant="tool"
        value={block.startCap ?? 'none'}
        aria-label="起點樣式"
        title="起點"
        options={CAPS.map((c) => ({ value: c, label: `${START_GLYPH[c]}  ${LINE_CAP_LABEL[c]}`, short: START_GLYPH[c] }))}
        onChange={(v) => patch({ startCap: v as LineCap })}
      />

      {/* 終點樣式 */}
      <Dropdown
        variant="tool"
        value={block.endCap ?? 'none'}
        aria-label="終點樣式"
        title="終點"
        options={CAPS.map((c) => ({ value: c, label: `${END_GLYPH[c]}  ${LINE_CAP_LABEL[c]}`, short: END_GLYPH[c] }))}
        onChange={(v) => patch({ endCap: v as LineCap })}
      />

      {/* 透明度 */}
      <ToolBtn
        ref={opacityRef}
        $open={openPopover === 'opacity'}
        onClick={() => setOpenPopover(openPopover === 'opacity' ? null : 'opacity')}
        title="透明度"
        aria-label="透明度"
      >
        {opacity}%
      </ToolBtn>
      {openPopover === 'opacity' && (
        <Popover anchor={opacityRef.current} label="透明度" onClose={() => setOpenPopover(null)}>
          <OpacityMenu
            value={opacity}
            onChange={(val) => patch({ opacity: val / 100 })}
          />
        </Popover>
      )}
    </>
  );
}

// ── 彈出選單（就地掛在膠囊下方） ────────────────────────

function Popover({
  anchor,
  label,
  onClose,
  children,
}: {
  anchor: HTMLElement | null;
  label: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    const place = () => {
      const r = anchor?.getBoundingClientRect();
      if (r) {
        setPos({
          top: r.bottom + 8,
          left: Math.max(8, Math.min(r.left, window.innerWidth - 220)),
        });
      }
    };
    place();
    const onDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('[data-shape-popover]') || (anchor && anchor.contains(t))) return;
      onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.stopPropagation();
      onClose();
    };
    window.addEventListener('pointerdown', onDown, true);
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('pointerdown', onDown, true);
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('scroll', place, true);
    };
  }, [anchor, onClose]);

  if (!pos) return null;
  return createPortal(
    <Pop
      data-shape-popover
      data-ui
      role="dialog"
      aria-label={label}
      style={pos}
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest('input')) e.stopPropagation();
        else e.preventDefault();
      }}
    >
      {children}
    </Pop>,
    document.body
  );
}

/** 一排色票加選色器 */
function ColorPickerMenu({
  value,
  label,
  onChange,
  onClose,
}: {
  value: string;
  label: string;
  onChange: (color: string) => void;
  onClose: () => void;
}) {
  const pickerRef = useRef<HTMLInputElement>(null);
  const current = value.toUpperCase();
  const custom = SWATCHES.some((s) => s.color === current) ? null : value;

  return (
    <SwatchRow>
      {SWATCHES.map((s) => (
        <Swatch
          key={s.label}
          type="button"
          title={s.label}
          $on={current === s.color}
          style={{ background: s.color }}
          onClick={() => {
            onChange(s.color);
            onClose();
          }}
        />
      ))}
      <Custom
        type="button"
        title="自訂顏色"
        $on={!!custom}
        style={custom ? { background: custom } : undefined}
        onClick={() => pickerRef.current?.click()}
      >
        {!custom && <Icon name="plus" size={16} />}
        <input
          ref={pickerRef}
          type="color"
          value={custom ?? '#ffffff'}
          onChange={(e) => {
            onChange(e.target.value.toUpperCase());
          }}
          aria-label={`自訂${label}`}
          tabIndex={-1}
        />
      </Custom>
    </SwatchRow>
  );
}

/** 透明度選單：滑桿與快捷鍵 */
function OpacityMenu({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <SliderBox>
      <SliderLabel>透明度</SliderLabel>
      <Slider
        type="range"
        min={0}
        max={100}
        step={5}
        value={value}
        style={{ '--fill': `${value}%` } as React.CSSProperties}
        aria-label="透明度"
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <SliderVal>{value}%</SliderVal>
    </SliderBox>
  );
}

// ── 樣式元件 ─────────────────────────────────────────────

const ToolBtn = styled.button<{ $on?: boolean; $open?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  cursor: pointer;
  border-radius: 999px;
  padding: 6px 12px;
  min-block-size: 36px;
  font: inherit;
  white-space: nowrap;
  flex-shrink: 0;
  /* $on＝開／關切換已開啟（灰，比滑過深一階；不用黃，黃色在畫面上太多）；$open＝這顆打開的選單還開著（淡灰，跟下拉一致） */
  background: ${(p) => (p.$on ? p.theme.surface.muted : p.$open ? p.theme.surface.sunken : 'transparent')};
  color: ${(p) => (p.$on || p.$open ? p.theme.text.primary : p.theme.text.secondary)};

  &:hover {
    background: ${(p) => (p.$on ? p.theme.surface.muted : p.theme.surface.sunken)};
  }
`;

const ColorCircle = styled.span`
  display: inline-block;
  inline-size: 18px;
  block-size: 18px;
  border-radius: 999px;
  border: 1.5px solid ${(p) => p.theme.border.default};
  box-shadow: inset 0 0 0 1.5px ${(p) => p.theme.surface.raised};
  flex-shrink: 0;
`;

const SizeWrap = styled.div`
  display: inline-flex;
  align-items: center;
  padding-inline: 4px 8px;
  min-block-size: 36px;
  border-radius: 999px;
  color: ${(p) => p.theme.text.secondary};

  &:hover,
  &:focus-within {
    background: ${(p) => p.theme.surface.sunken};
  }
`;

const SizeInput = styled.input`
  inline-size: 38px;
  min-block-size: 28px;
  padding: 2px 4px;
  font: inherit;
  font-variant-numeric: tabular-nums;
  /* 跟膠囊上其他字同一個灰 */
  color: ${(p) => p.theme.text.secondary};
  background: transparent;
  border: none;
  border-radius: 4px;
  text-align: end;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;

  &:focus {
    outline: none;
  }
`;

const UnitLabel = styled.span`
  color: ${(p) => p.theme.text.secondary};
  margin-inline-start: 2px;
  user-select: none;
`;

const Pop = styled.div`
  position: fixed;
  z-index: 950;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border-radius: ${(p) => p.theme.radius.panel};
  /* 浮層一律用淡白底（#FAFAFA），跟設定面板、共享對話框同一色 */
  background: ${(p) => p.theme.surface.page};
  box-shadow: ${(p) => p.theme.shadow.card};
  writing-mode: horizontal-tb;
  /* 跟工具列同字級 */
  font-size: ${(p) => p.theme.typography.bodySmSize};
`;

const SwatchRow = styled.div`
  ${swatchRowCss}
`;

const Swatch = styled.button<{ $on: boolean }>`
  ${swatchCss}
`;

const Custom = styled(Swatch)`
  ${customSwatchCss}
`;

/** 透明度只留拉桿與數字，不放預設值按鈕：拉桿已經能一次到位，按鈕只是多一排要看的東西。 */
const SliderBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-inline-size: 220px;
  padding: 4px 4px 4px 8px;
`;

/** 拉過的那段填品牌深綠、沒拉到的淡灰；白色圓鈕加灰邊。看起來細，可以點的高度有 28px。 */
const Slider = styled.input`
  flex: 1;
  min-inline-size: 0;
  margin: 0;
  block-size: 28px;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  cursor: pointer;

  &::-webkit-slider-runnable-track {
    block-size: 8px;
    border-radius: 100px;
    background: linear-gradient(
      to right,
      ${(p) => p.theme.brand.accentOnLight} var(--fill),
      ${(p) => p.theme.surface.muted} var(--fill)
    );
  }
  &::-moz-range-progress {
    block-size: 8px;
    border-radius: 100px;
    background: ${(p) => p.theme.brand.accentOnLight};
  }
  &::-moz-range-track {
    block-size: 8px;
    border-radius: 100px;
    background: ${(p) => p.theme.surface.muted};
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    inline-size: 22px;
    block-size: 22px;
    margin-block-start: -7px;
    border-radius: 100px;
    background: ${(p) => p.theme.surface.raised};
    border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.default};
    box-shadow: 0 1px 3px rgba(26, 25, 23, 0.14);
  }
  &::-moz-range-thumb {
    inline-size: 22px;
    block-size: 22px;
    border-radius: 100px;
    background: ${(p) => p.theme.surface.raised};
    border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.default};
  }
  &:focus-visible { outline: none; }
  &:focus-visible::-webkit-slider-thumb { border-color: ${(p) => p.theme.border.selected}; }
`;

/** 拉桿左邊的名稱，跟拉桿同一列 */
const SliderLabel = styled.span`
  flex: none;
  font-size: var(--ds-typography-body-sm-size);
  color: ${(p) => p.theme.text.secondary};
`;

const SliderVal = styled.span`
  min-inline-size: 3em;
  text-align: end;
  font-size: ${(p) => p.theme.typography.bodySmSize};
  font-variant-numeric: tabular-nums;
  color: ${(p) => p.theme.text.primary};
`;
