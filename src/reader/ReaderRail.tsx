import styled from 'styled-components';
import { Icon } from '../components/Icon';
import { HomeButton } from '../editor/HomeButton';
import { RAIL_TOOL_META, type InkTool, type RailTool } from './tools';

type Props = {
  /** 科目：決定左上角鵝卵石的形狀，跟編輯模式的回首頁鈕同一顆。 */
  subject?: string;
  /** 左上角鵝卵石：閱讀模式沒有頂部列，它就是「回到編輯」。 */
  onExit: () => void;
  outlineOpen: boolean;
  onOutline: () => void;
  /** 這一頁的補充有幾項。0 項時按鈕仍在，只是沒有數字。 */
  supplementCount: number;
  supplementOpen: boolean;
  onSupplements: () => void;
  /** 1 起算的頁碼，給人看的。 */
  pageNumber: number;
  pageCount: number;
  /** 切換頁面的按鈕放在「頁數」下方。 */
  onPrevPage?: () => void;
  onNextPage?: () => void;
  toolboxOpen: boolean;
  onToolbox: () => void;
  /** 左欄上釘著哪些工具（順序已固定）。 */
  pinned: RailTool[];
  /** 工具箱開著時，釘著的工具會出現「拿掉」的角標。 */
  onUnpin: (tool: RailTool) => void;
  tool: InkTool | null;
  onTool: (tool: InkTool | null) => void;
  onClear: () => void;
  canClear: boolean;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

/**
 * 閱讀模式的左欄，照 Figma「品樂_學生版閱讀模式」：
 * 上面是頁數與上下頁，再來工具箱入口，一條線之後是釘上來的工具，底部固定復原／取消復原。
 *
 * 工具箱開著時釘著的工具換成虛線框、右上角一顆 ×，表示「這些是你從工具箱拿出來的，可以收回去」。
 */
export function ReaderRail({
  subject,
  onExit,
  supplementCount,
  supplementOpen,
  onSupplements,
  pageNumber,
  pageCount,
  onPrevPage,
  onNextPage,
  toolboxOpen,
  onToolbox,
  pinned,
  onUnpin,
  tool,
  onTool,
  onClear,
  canClear,
  undo,
  redo,
  canUndo,
  canRedo,
}: Props) {
  return (
    <Rail aria-label="閱讀工具">
      {/* 左上角是回首頁（書櫃），不是回編輯——回編輯是下面那顆「返回編輯」，給老師用的 */}
      <HomeButton subject={subject} large />

      <PageGroup title={`第 ${pageNumber} 頁，共 ${pageCount} 頁`}>
        <PageLabel>頁數</PageLabel>
        <PageNumber aria-live="polite">{pageNumber}</PageNumber>
        {onPrevPage && onNextPage && (
          <StepRow>
            <PageStepBtn
              type="button"
              onClick={onPrevPage}
              disabled={pageNumber <= 1}
              aria-label="上一頁"
              title="上一頁"
            >
              <Icon name="chevron-up" size={16} />
            </PageStepBtn>
            <PageStepBtn
              type="button"
              onClick={onNextPage}
              disabled={pageNumber >= pageCount}
              aria-label="下一頁"
              title="下一頁"
            >
              <Icon name="chevron-down" size={16} />
            </PageStepBtn>
          </StepRow>
        )}
      </PageGroup>


      {pinned.map((t) => {
        const meta = RAIL_TOOL_META[t];
        const isClear = t === 'clear';
        return (
          <PinSlot key={t}>
            <Tile
              type="button"
              $active={!isClear && tool === t}
              $editing={toolboxOpen}
              aria-pressed={isClear ? undefined : tool === t}
              disabled={isClear && !canClear}
              title={isClear ? '清掉這一頁的筆跡' : meta.label}
              onClick={() => {
                if (isClear) return onClear();
                // 再按一次就放下工具
                onTool(tool === t ? null : (t as InkTool));
              }}
            >
              <Icon name={meta.icon} size={20} />
              <span>{meta.label}</span>
            </Tile>
            {toolboxOpen && (
              <Unpin type="button" title={`把「${meta.label}」收回工具箱`} onClick={() => onUnpin(t)}>
                <Icon name="circle-x" size={24} label={`收回${meta.label}`} />
              </Unpin>
            )}
          </PinSlot>
        );
      })}

      <Tile type="button" title="復原筆跡" disabled={!canUndo} onClick={undo}>
        <Icon name="corner-up-left" size={20} />
        <span>復原</span>
      </Tile>
      <Tile type="button" title="取消復原筆跡" disabled={!canRedo} onClick={redo}>
        <Icon name="corner-up-right" size={20} />
        <span>取消復原</span>
      </Tile>

      <Line />

      {/* 給老師的：從閱讀模式回到編輯，放在工具箱上面、預設是啟用色，一眼找得到 */}
      <Tile type="button" $accent onClick={onExit} title="返回編輯">
        <Icon name="pencil" size={20} />
        <span>返回編輯</span>
      </Tile>


      <Tile
        type="button"
        $active={toolboxOpen}
        aria-expanded={toolboxOpen}
        aria-controls="reader-toolbox"
        onClick={onToolbox}
      >
        <Icon name="archive" size={20} />
        <span>工具箱</span>
      </Tile>

      {/* 補充資源：這一頁所有補充的入口。框起來、右上角掛數量，學生一眼知道這頁有東西可以看 */}
      <PinSlot>
        <Tile type="button" $boxed $active={supplementOpen} aria-expanded={supplementOpen} onClick={onSupplements} title="這一頁的補充資源">
          <Icon name="blocks" size={20} />
          <span>補充資源</span>
        </Tile>
        {supplementCount > 0 && <Badge aria-label={`${supplementCount} 項`}>{supplementCount}</Badge>}
      </PinSlot>
    </Rail>
  );
}

/** Figma：整欄 104，左右各留 24，內容 56 寬，群組間距 12。 */
/**
 * 整欄 104 寬、內容 56 寬（照 Figma）。高度要一整條放得下：工具格 52 高、間距 4，
 * 頁數的上下鈕並排，一般筆電螢幕不必捲動就看得到最下面的「補充資源」。
 */
const Rail = styled.nav`
  flex: none;
  inline-size: 104px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(p) => p.theme.space.gapXs};
  padding: ${(p) => p.theme.space.insetSm} 0;
  background: ${(p) => p.theme.surface.raised};
  overflow: hidden auto;
  scrollbar-width: none;
`

const PageGroup = styled.div`
  inline-size: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-block: 4px;
  padding: 10px 0;
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.surface.sunken};
`;

/** 上一頁、下一頁：一整排兩顆白底小鈕，各佔一半 */
/** 上一頁、下一頁：兩顆白色圓鈕，直的排 */
const StepRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const PageLabel = styled.span`
  font-size: var(--ds-typography-label-size);
  font-weight: 500;
  color: ${(p) => p.theme.text.secondary};
`

const PageNumber = styled.output`
  inline-size: 40px;
  padding: 4px 0;
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.surface.raised};
  font-family: ${(p) => p.theme.typography.fontDisplay};
  font-size: 14px;
  line-height: 1.2;
  text-align: center;
  font-variant-numeric: tabular-nums;
  color: ${(p) => p.theme.text.primary};
`

const PageStepBtn = styled.button`
  inline-size: 28px;
  block-size: 28px;
  display: grid;
  place-items: center;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.icon.default};
  cursor: pointer;
  transition: background 0.12s;

  &:hover:not(:disabled) { background: ${(p) => p.theme.surface.page}; }
  &:disabled {
    color: ${(p) => p.theme.icon.disabled};
    cursor: default;
  }
`;


/**
 * 56×52 的工具格，圖示 20 在上、11px 字在下（收小一點，整欄才放得進一個螢幕高）。
 * 啟用是淡 Lime 底、深 Lime 字（跟頂部列同一套）；工具箱開著時釘著的工具改成虛線框。
 */
const Tile = styled.button<{ $active?: boolean; $editing?: boolean; $boxed?: boolean; $accent?: boolean }>`
  inline-size: ${(p) => p.theme.control.tileMd};
  block-size: 52px;
  flex: none;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 0;
  border-radius: ${(p) => p.theme.radius.tile};
  border: ${(p) => p.theme.border.widthDefault} ${(p) => (p.$editing ? 'dashed' : 'solid')}
    ${(p) => (p.$editing ? p.theme.border.editing : p.$boxed ? p.theme.border.subtle : 'transparent')};
  /* $accent：返回編輯——預設就跟按下的工具（畫筆啟用時）同一個樣子：淡 Lime 底、深綠字 */
  background: ${(p) => (p.$active || p.$accent ? p.theme.brand.primaryTint : 'transparent')};
  color: ${(p) => (p.$active || p.$accent ? p.theme.brand.accentOnLight : p.theme.text.primary)};
  font-size: var(--ds-typography-label-size);
  line-height: 14px;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;

  svg { color: ${(p) => (p.$active || p.$accent ? p.theme.brand.accentOnLight : p.theme.icon.default)}; }

  &:hover:not(:disabled) {
    background: ${(p) => (p.$active || p.$accent ? p.theme.brand.primaryTint : p.theme.surface.sunken)};
  }
  &:disabled {
    cursor: default;
    color: ${(p) => p.theme.text.disabled};
    svg { color: ${(p) => p.theme.icon.disabled}; }
  }
`;

const Line = styled.hr`
  inline-size: 40px;
  block-size: 0;
  margin: 4px 0;
  border: none;
  border-block-start: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
`;




const PinSlot = styled.div`
  position: relative;
`;

const Badge = styled.span`
  position: absolute;
  inset-inline-end: -6px;
  inset-block-start: -6px;
  min-inline-size: 20px;
  block-size: 20px;
  padding: 0 5px;
  display: grid;
  place-items: center;
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.surface.inverse};
  color: ${(p) => p.theme.text.onInverse};
  font-size: 11px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
`;

/** 右上角那顆 ×。Figma 放在 (43, -13.5)，24px。 */
const Unpin = styled.button`
  position: absolute;
  inset-inline-start: 43px;
  inset-block-start: -13px;
  inline-size: 24px;
  block-size: 24px;
  padding: 0;
  border: none;
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.surface.accentStrong};
  cursor: pointer;

  &:hover { color: ${(p) => p.theme.feedback.errorDefault}; }
`;
