import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import { Icon } from '../components/Icon';
// 快速樣式的三張縮圖直接用 Figma 匯出的圖（4892:7906），不在程式裡重畫
import presetHeader from '../assets/table-presets/header.svg';
import presetZebra from '../assets/table-presets/zebra.svg';
import presetBanded from '../assets/table-presets/banded.svg';
import { primaryButtonCss } from '../components/buttonStyles';
import { PanelBody, PanelClose, PanelDrawer, PanelHead, PanelTitle, useExclusivePanel } from './SidePanel';
import { customSwatchCss, swatchCss } from './swatch';
import { useEditorCtx } from './EditorContext';
import { findBlock } from '../model/document';
import { TABLE_BORDER } from '../model/blockSizing';
import {
  TABLE_DEFAULT,
  newTable,
  applyPreset,
  setCellBg,
  resizeTable,
} from '../model/tableOps';
import { SAFE_COLOR } from '../components/blocks/TableBlockView';
import type { TableBlock, TablePreset } from '../model/types';

/*
 * 表格的左側浮動彈窗（新增表格 / 樣式設定）
 *
 * 依最新設計規格：
 * 1. 浮動卡片樣式：固定於視窗左側（top: 16px, bottom: 16px, left: 16px），
 *    寬度 360px，圓角 24px，浮於上方列之上（z-index: 1000）。
 * 2. 包含五大區塊：
 *    - 快速樣式（橫向卡片縮圖：表頭淡黃、斑馬紋、無框線/簡約）
 *    - 尺寸（8×6 格子拖選 + [ 3 ] 行 [ 4 ] 列 輸入框）
 *    - 儲存格背景（白、淡黃、米黃、粉紅、水藍 + 自訂選色器，橄欖綠選取環）
 *    - 框線顏色（墨黑、深灰、中灰、淺灰、橄欖綠 + 自訂選色器，橄欖綠選取環）
 *    - 線條粗細（步進器）
 * 3. 底部全寬膠囊按鈕：
 *    - 新增模式：新增表格
 *    - 編輯模式：完成
 */

// ── 選格與彈窗狀態的 store ──────────────────────────────────

export type TableCell = { blockId: string; r: number; c: number };
type TableUi = {
  cell: TableCell | null;
  panel: boolean;
  insertAt: number | null;
};

let state: TableUi = { cell: null, panel: false, insertAt: null };
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useTableSelection(): TableUi {
  return useSyncExternalStore(subscribe, () => state);
}

export function setTableCell(cell: TableCell | null) {
  if (state.cell === cell) return;
  state = { ...state, cell };
  emit();
}

export function setTablePanel(open: boolean) {
  if (state.panel === open) return;
  state = { ...state, panel: open };
  emit();
}

export function openTableInsert(index: number | null) {
  if (state.insertAt === index) return;
  state = { ...state, insertAt: index };
  emit();
}

// ── 色票規格 ────────────────────────────────────────────────

const CELL_SWATCHES: { label: string; color: string }[] = [
  { label: '白', color: '#FFFFFF' },
  { label: '淡黃', color: '#F4FBA2' },
  { label: '米黃', color: '#FDF3D1' },
  { label: '粉紅', color: '#F8BBD0' },
  { label: '水藍', color: '#80DEEA' },
];

const BORDER_SWATCHES: { label: string; color: string }[] = [
  { label: '墨黑', color: '#1A1917' },
  { label: '深灰', color: '#4A4947' },
  { label: '中灰', color: '#787672' },
  { label: '淺灰', color: '#CCCCCC' },
  { label: '橄欖綠', color: '#4D581A' },
];

const MAX_BORDER = 6;
const GRID_COLS = 9;
const GRID_ROWS = 6;

// ── 面板主體 ────────────────────────────────────────────────

export function TablePanel({ blockId: propBlockId }: { blockId?: string } = {}) {
  const ed = useEditorCtx();
  const ui = useTableSelection();

  // 判斷目前是新增模式還是編輯模式
  const isInsertMode = ui.insertAt !== null;
  const isEditMode = ui.panel;

  // 取得目標 blockId
  const activeBlockId =
    propBlockId || (isEditMode && ed?.selectedBlockId ? ed.selectedBlockId : null);

  const hit = ed && activeBlockId ? findBlock(ed.doc, activeBlockId) : null;
  const editingBlock = hit && hit.block.type === 'table' ? (hit.block as TableBlock) : null;

  // 按 Esc 關閉
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (ui.insertAt !== null) openTableInsert(null);
        if (ui.panel) setTablePanel(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [ui.insertAt, ui.panel]);

  if (!ed) return null;
  if (!isInsertMode && (!isEditMode || !editingBlock)) return null;

  return createPortal(
    <LeftCardModal
      isInsertMode={isInsertMode}
      editingBlock={editingBlock}
      insertAt={ui.insertAt}
      onClose={() => {
        if (isInsertMode) openTableInsert(null);
        if (isEditMode) setTablePanel(false);
      }}
    />,
    document.body
  );
}

function LeftCardModal({
  isInsertMode,
  editingBlock,
  insertAt,
  onClose,
}: {
  isInsertMode: boolean;
  editingBlock: TableBlock | null;
  insertAt: number | null;
  onClose: () => void;
}) {
  const ed = useEditorCtx()!;
  const ui = useTableSelection();
  useExclusivePanel(true, onClose);

  // 下面還有沒捲到的內容時，捲軸常駐顯示；捲到底就恢復成平常（滑動時才出現）
  const bodyRef = useRef<HTMLDivElement>(null);
  const [more, setMore] = useState(false);
  const checkMore = () => {
    const el = bodyRef.current;
    if (el) setMore(el.scrollTop + el.clientHeight < el.scrollHeight - 2);
  };
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    checkMore();
    const ro = new ResizeObserver(checkMore);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // 尺寸狀態（預設 3 行 4 列）
  const [rows, setRows] = useState(editingBlock ? editingBlock.rows : TABLE_DEFAULT.rows);
  const [cols, setCols] = useState(editingBlock ? editingBlock.cols : TABLE_DEFAULT.cols);
  const [hoverGrid, setHoverGrid] = useState<{ r: number; c: number } | null>(null);

  // 樣式狀態
  const [preset, setPreset] = useState<TablePreset>(editingBlock?.preset ?? 'header');
  const [cellBg, setCellBgState] = useState<string | null>(null);
  const [borderColor, setBorderColor] = useState<string>(editingBlock?.borderColor ?? '#1A1917');
  const [borderWidth, setBorderWidth] = useState<number>(editingBlock?.borderWidth ?? TABLE_BORDER);

  const pickBgRef = useRef<HTMLInputElement>(null);
  const pickBorderRef = useRef<HTMLInputElement>(null);

  // 同步編輯中表格的最新值
  useEffect(() => {
    if (editingBlock) {
      setRows(editingBlock.rows);
      setCols(editingBlock.cols);
      setPreset(editingBlock.preset ?? 'plain');
      setBorderColor(editingBlock.borderColor ?? '#1A1917');
      setBorderWidth(editingBlock.borderWidth ?? TABLE_BORDER);
    }
  }, [editingBlock?.id, editingBlock?.rows, editingBlock?.cols, editingBlock?.preset, editingBlock?.borderColor, editingBlock?.borderWidth]);

  const patchEditing = (patchObj: Partial<TableBlock>) => {
    if (!editingBlock) return;
    ed.dispatch({
      type: 'patchBlock',
      blockId: editingBlock.id,
      blockType: 'table',
      patch: patchObj,
    });
  };

  const handlePresetSelect = (p: TablePreset) => {
    setPreset(p);
    if (editingBlock) {
      const next = applyPreset(editingBlock, p);
      const { id: _id, type: _type, popups: _p, ...rest } = next;
      patchEditing(rest);
    }
  };

  const handleResize = (newRows: number, newCols: number) => {
    const clampedR = Math.max(1, Math.min(30, newRows));
    const clampedC = Math.max(1, Math.min(12, newCols));
    setRows(clampedR);
    setCols(clampedC);
    if (editingBlock) {
      const next = resizeTable(editingBlock, clampedR, clampedC);
      const { id: _id, type: _type, popups: _p, ...rest } = next;
      patchEditing(rest);
    }
  };

  // 當前選取格子的底色
  const cell = ui.cell && editingBlock && ui.cell.blockId === editingBlock.id ? ui.cell : null;
  const currentCellColor = editingBlock && cell ? editingBlock.cellBg?.[`${cell.r},${cell.c}`] ?? null : cellBg;

  const handleCellBg = (color: string | null) => {
    setCellBgState(color);
    if (editingBlock) {
      if (cell) {
        const next = setCellBg(editingBlock, cell.r, cell.c, color);
        patchEditing({ cellBg: next.cellBg });
      } else {
        // 沒有選中特定單一格時，若套用顏色則設為全表格底色預設
        const allBg: Record<string, string> = {};
        if (color) {
          for (let r = 0; r < editingBlock.rows; r++) {
            for (let c = 0; c < editingBlock.cols; c++) {
              allBg[`${r},${c}`] = color;
            }
          }
        }
        patchEditing({ cellBg: color ? allBg : undefined });
      }
    }
  };

  const handleBorderColor = (color: string) => {
    setBorderColor(color);
    if (editingBlock) {
      patchEditing({ borderColor: color });
    }
  };

  const handleBorderWidth = (w: number) => {
    const clamped = Math.max(0, Math.min(MAX_BORDER, w));
    setBorderWidth(clamped);
    if (editingBlock) {
      patchEditing({ borderWidth: clamped });
    }
  };

  // 點擊底部按鈕：新增表格或完成
  const handleAction = () => {
    if (isInsertMode && insertAt !== null) {
      const table = newTable(rows, cols);
      table.preset = preset;
      table.borderColor = borderColor;
      table.borderWidth = borderWidth;
      if (cellBg) {
        const bgMap: Record<string, string> = {};
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            bgMap[`${r},${c}`] = cellBg;
          }
        }
        table.cellBg = bgMap;
      }
      ed.dispatch({
        type: 'insertRow',
        index: insertAt,
        blocks: [table],
      });
      openTableInsert(null);
      ed.select(table.id);
    } else {
      onClose();
    }
  };

  // 驗證色碼
  const colorFilter = (v: string) => (SAFE_COLOR.test(v) ? v : null);

  const activeR = hoverGrid ? hoverGrid.r : rows;
  const activeC = hoverGrid ? hoverGrid.c : cols;

  return (
    <CardContainer
      role="dialog"
      aria-label="表格設定"
      data-ui
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <Head>
        <Title>表格</Title>
        <Ghost type="button" onClick={onClose} aria-label="關閉">
          <Icon name="x" size={24} label="關閉" />
        </Ghost>
      </Head>

      <ScrollBody ref={bodyRef} onScroll={checkMore} $more={more}>
        {/* 快速樣式 */}
        <Section>
          <SectionLabel>快速樣式</SectionLabel>
          <Box>
          <PresetGrid>
            <PresetTile
              type="button"
              $active={preset === 'header'}
              onClick={() => handlePresetSelect('header')}
              title="表頭強調"
            >
              <PresetImg src={presetHeader} alt="" />
            </PresetTile>
            <PresetTile
              type="button"
              $active={preset === 'zebra'}
              onClick={() => handlePresetSelect('zebra')}
              title="斑馬紋"
            >
              <PresetImg src={presetZebra} alt="" />
            </PresetTile>
            <PresetTile
              type="button"
              $active={preset === 'plain' || preset === 'borderless'}
              onClick={() => handlePresetSelect('plain')}
              title="簡約白底"
            >
              <PresetImg src={presetBanded} alt="" />
            </PresetTile>
          </PresetGrid>
          </Box>
        </Section>

        {/* 尺寸 */}
        <Section>
          <SectionLabel>尺寸</SectionLabel>
          <Box>
          <GridPickerCard
            onPointerLeave={() => setHoverGrid(null)}
          >
            {Array.from({ length: GRID_ROWS }, (_, rIdx) => {
              const r = rIdx + 1;
              return (
                <GridRow key={r}>
                  {Array.from({ length: GRID_COLS }, (_, cIdx) => {
                    const c = cIdx + 1;
                    const highlighted = r <= activeR && c <= activeC;
                    return (
                      <GridCell
                        key={c}
                        type="button"
                        $highlighted={highlighted}
                        aria-label={`${r} 行 ${c} 列`}
                        onPointerEnter={(e) => {
                          setHoverGrid({ r, c });
                          if (e.buttons === 1) handleResize(r, c);
                        }}
                        onPointerDown={() => handleResize(r, c)}
                      />
                    );
                  })}
                </GridRow>
              );
            })}
          </GridPickerCard>

          <DimensionInputs>
            <PillBox>
              <NumberInput
                type="number"
                min={1}
                max={30}
                value={rows}
                aria-label="行數"
                onChange={(e) => handleResize(Number(e.target.value), cols)}
              />
            </PillBox>
            <DimText>行</DimText>

            <PillBox>
              <NumberInput
                type="number"
                min={1}
                max={12}
                value={cols}
                aria-label="列數"
                onChange={(e) => handleResize(rows, Number(e.target.value))}
              />
            </PillBox>
            <DimText>列</DimText>
          </DimensionInputs>
          </Box>
        </Section>

        {/* 儲存格背景 */}
        <Section>
          <SectionLabel>儲存格背景</SectionLabel>
          <Box>
          <SwatchPillRow>
            {CELL_SWATCHES.map((s) => {
              const isSelected =
                currentCellColor === s.color || (!currentCellColor && s.color === '#FFFFFF');
              return (
                <ColorSwatch
                  key={s.label}
                  type="button"
                  title={s.label}
                  style={{ background: s.color }}
                  $on={isSelected}
                  onClick={() => handleCellBg(s.color)}
                />
              );
            })}
            <CustomPickerBtn
              type="button"
              title="自訂儲存格背景"
              $on={!!currentCellColor && !CELL_SWATCHES.some((s) => s.color === currentCellColor)}
              style={
                currentCellColor && !CELL_SWATCHES.some((s) => s.color === currentCellColor)
                  ? { background: currentCellColor }
                  : undefined
              }
              onClick={() => pickBgRef.current?.click()}
            >
              <Icon name="plus" size={16} />
              <input
                ref={pickBgRef}
                type="color"
                value={currentCellColor ?? '#ffffff'}
                onChange={(e) => {
                  const val = colorFilter(e.target.value);
                  if (val) handleCellBg(val);
                }}
                tabIndex={-1}
                aria-label="自訂儲存格背景"
              />
            </CustomPickerBtn>
          </SwatchPillRow>
          </Box>
        </Section>

        {/* 框線顏色 */}
        <Section>
          <SectionLabel>框線顏色</SectionLabel>
          <Box>
          <SwatchPillRow>
            {BORDER_SWATCHES.map((s) => {
              const isSelected = borderColor === s.color;
              return (
                <ColorSwatch
                  key={s.label}
                  type="button"
                  title={s.label}
                  style={{ background: s.color }}
                  $on={isSelected}
                  onClick={() => handleBorderColor(s.color)}
                />
              );
            })}
            <CustomPickerBtn
              type="button"
              title="自訂框線顏色"
              $on={!BORDER_SWATCHES.some((s) => s.color === borderColor)}
              style={!BORDER_SWATCHES.some((s) => s.color === borderColor) ? { background: borderColor } : undefined}
              onClick={() => pickBorderRef.current?.click()}
            >
              <Icon name="plus" size={16} />
              <input
                ref={pickBorderRef}
                type="color"
                value={borderColor}
                onChange={(e) => {
                  const val = colorFilter(e.target.value);
                  if (val) handleBorderColor(val);
                }}
                tabIndex={-1}
                aria-label="自訂框線顏色"
              />
            </CustomPickerBtn>
          </SwatchPillRow>
          </Box>
        </Section>

        {/* 線條粗細 */}
        <Section>
          <SectionLabel>線條粗細</SectionLabel>
          <Box>
          <UnitField>
            <UnitInput
              type="number"
              min={0}
              max={MAX_BORDER}
              value={borderWidth}
              aria-label="線條粗細"
              onChange={(e) => handleBorderWidth(Number(e.target.value))}
            />
            <span>px</span>
          </UnitField>
          </Box>
        </Section>
      </ScrollBody>

      <Footer>
        <ActionButton type="button" onClick={handleAction}>
          {isInsertMode ? '新增表格' : '完成'}
        </ActionButton>
      </Footer>
    </CardContainer>
  );
}

// ── 縮圖呈現 ────────────────────────────────────────────────


// ── 樣式元件 ────────────────────────────────────────────────
// 版面照 Figma「表格」面板（每段一塊淡灰底卡、9 欄格子、淡萊姆選格、快速樣式用 Figma 匯出的縮圖），
// 尺寸比照「設定」面板：同一個外殼（寬 300、標題 16、內距 16／20）、欄位名 11、輸入框與按鈕 36 高

const CardContainer = PanelDrawer;
const Head = PanelHead;
const Title = PanelTitle;
const Ghost = PanelClose;
/* 下面還有沒捲到的內容時，捲軸一直顯示（平常的捲軸只在滑動或游標停著時出現），提示可以往下滑 */
const ScrollBody = styled(PanelBody)<{ $more?: boolean }>`
  ${(p) => (p.$more ? `&::-webkit-scrollbar-thumb { background: ${p.theme.border.default}; }` : '')}
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.gapSm};
`;

/** 欄位名稱：跟設定面板的欄位標題同一款（11、中粗、次要灰） */
const SectionLabel = styled.span`
  font-size: var(--ds-typography-label-size);
  font-weight: var(--ds-typography-label-weight);
  color: ${(p) => p.theme.text.secondary};
`;

/** 每一段的淡灰底卡 */
const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.gapSm};
  padding: ${(p) => p.theme.space.insetXs};
  border-radius: ${(p) => p.theme.radius.card};
  background: ${(p) => p.theme.surface.sunken};
`;

const PresetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(p) => p.theme.space.gapSm};
`;

/** 白底小卡；選中的往外畫 2px 品牌深綠框（outline，卡片本身不變大） */
const PresetTile = styled.button<{ $active: boolean }>`
  block-size: 52px;
  border-radius: ${(p) => p.theme.radius.tile};
  padding: 6px;
  border: none;
  display: grid;
  place-items: center;
  cursor: pointer;
  background: ${(p) => p.theme.surface.raised};
  outline: 2px solid ${(p) => (p.$active ? p.theme.brand.accentOnLight : 'transparent')};
  transition: outline-color 0.12s;

  &:hover { outline-color: ${(p) => (p.$active ? p.theme.brand.accentOnLight : p.theme.border.default)}; }
`;

const PresetImg = styled.img`
  display: block;
  inline-size: 60px;
  block-size: 40px;
`;

const GridPickerCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${GRID_COLS}, 1fr);
  gap: 3px;
`;

/** 選到的格子：淡萊姆底（#F6FF99）加萊姆框，照 Figma；沒選到的是白格 */
const GridCell = styled.button<{ $highlighted: boolean }>`
  block-size: 20px;
  padding: 0;
  border-radius: 4px;
  cursor: pointer;
  border: 1.5px solid ${(p) => (p.$highlighted ? p.theme.brand.primaryHover : 'transparent')};
  background: ${(p) => (p.$highlighted ? p.theme.brand.primaryTint : p.theme.surface.raised)};
  transition: background 0.08s, border-color 0.08s;
`;

/** 行、列兩個輸入框各佔一半，單位字跟在後面 */
const DimensionInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr auto;
  align-items: center;
  gap: ${(p) => p.theme.space.gapSm};
`;

const PillBox = styled.div`
  display: contents;
`;

/** 跟設定面板的輸入框同一款：36 高的灰膠囊、14 字 */
const inputPill = css`
  min-inline-size: 0;
  inline-size: 100%;
  block-size: ${(p) => p.theme.control.heightSm};
  box-sizing: border-box;
  padding: 0 ${(p) => p.theme.space.insetSm};
  border: none;
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.surface.muted};
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  font-variant-numeric: tabular-nums;
  color: ${(p) => p.theme.text.primary};
  outline: none;
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
`;

const NumberInput = styled.input`
  ${inputPill}
  &:focus { box-shadow: inset 0 0 0 1px ${(p) => p.theme.border.hover}; background: ${(p) => p.theme.surface.raised}; }
`;

const DimText = styled.span`
  font-size: var(--ds-typography-body-sm-size);
  color: ${(p) => p.theme.text.secondary};
`;

/** 線條粗細：同一款膠囊，數字靠左、px 靠右 */
const UnitField = styled.label`
  ${inputPill}
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.gapSm};
  &:focus-within { box-shadow: inset 0 0 0 1px ${(p) => p.theme.border.hover}; background: ${(p) => p.theme.surface.raised}; }
`;

const UnitInput = styled.input`
  flex: 1;
  min-inline-size: 0;
  border: none;
  background: transparent;
  font: inherit;
  color: inherit;
  outline: none;
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
`;

/** 一排六格色票平均撐滿灰底卡 */
const SwatchPillRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
`;

const ColorSwatch = styled.button<{ $on: boolean }>`
  ${swatchCss}
`;

const CustomPickerBtn = styled(ColorSwatch)`
  ${customSwatchCss}
`;

/**
 * 底部主要按鈕（跟設定面板的「匯入教材」同一款）。
 */
const Footer = styled.footer`
  position: relative;
  padding: ${(p) => p.theme.space.gapMd} 20px 20px;
  flex-shrink: 0;
  /* 不畫陰影或分隔線（看起來像一條硬線）；下面還有內容時，捲動區的捲軸會露出來提示 */
`;

const ActionButton = styled.button`
  ${primaryButtonCss}
  inline-size: 100%;
`;
