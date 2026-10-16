import styled from 'styled-components';
import { Icon } from '../components/Icon';
import { HomeButton } from '../editor/HomeButton';
import { INK_RAIL_TOOLS, RAIL_TOOL_META, type InkTool, type RailTool } from './tools';

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
  /** 輸入頁碼直接跳到那一頁（1 起算） */
  onGoPage?: (page: number) => void;
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
  onGoPage,
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


      {/* 翻頁放在回首頁與畫筆之間。上下箭頭夾著頁碼，看得出是翻頁，不另放「頁數」標籤 */}
      <PageGroup title={`第 ${pageNumber} 頁，共 ${pageCount} 頁`}>
        {onPrevPage && (
          <PageStepBtn
            type="button"
            onClick={onPrevPage}
            disabled={pageNumber <= 1}
            aria-label="上一頁"
            title="上一頁"
          >
            <Icon name="chevron-up" size={16} />
          </PageStepBtn>
        )}
        {/* 頁碼本身就是輸入框：點下去打數字，Enter 或點別處就跳過去；超出範圍夾在第一頁到最後一頁 */}
        <PageInput
          key={pageNumber}
          defaultValue={pageNumber}
          inputMode="numeric"
          aria-label={`第 ${pageNumber} 頁，共 ${pageCount} 頁，輸入頁碼跳頁`}
          onFocus={(e) => e.currentTarget.select()}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur();
            if (e.key === 'Escape') {
              e.currentTarget.value = String(pageNumber);
              e.currentTarget.blur();
            }
          }}
          onBlur={(e) => {
            const n = parseInt(e.currentTarget.value.replace(/[^0-9]/g, ''), 10);
            if (!Number.isFinite(n)) {
              e.currentTarget.value = String(pageNumber);
              return;
            }
            const to = Math.min(Math.max(n, 1), pageCount);
            e.currentTarget.value = String(to);
            if (to !== pageNumber) onGoPage?.(to);
          }}
        />
        {onNextPage && (
          <PageStepBtn
            type="button"
            onClick={onNextPage}
            disabled={pageNumber >= pageCount}
            aria-label="下一頁"
            title="下一頁"
          >
            <Icon name="chevron-down" size={16} />
          </PageStepBtn>
        )}
      </PageGroup>



      {pinned.filter((t) => INK_RAIL_TOOLS.includes(t)).map((t) => {
        const meta = RAIL_TOOL_META[t];
        const isClear = t === 'clear';
        return (
          <PinSlot key={t}>
            <Tile
              type="button"
              $active={!isClear && tool === t}
              $editing={toolboxOpen}
              tabIndex={toolboxOpen ? -1 : undefined}
              aria-disabled={toolboxOpen || undefined}
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
            {toolboxOpen && <UnpinBtn tool={t} onUnpin={onUnpin} />}
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

      {/*
        系統工具：返回編輯在工具箱上面、補充資源在下面，都可以收進工具箱。
        返回編輯不用 Lime 底：Lime 在這一欄代表「正在用的工具」
      */}
      {pinned.includes('exit') && (
        <PinSlot>
          <Tile type="button" $editing={toolboxOpen}
              tabIndex={toolboxOpen ? -1 : undefined}
              aria-disabled={toolboxOpen || undefined} onClick={onExit} title="返回編輯">
            <Icon name={RAIL_TOOL_META.exit.icon} size={20} />
            <span>{RAIL_TOOL_META.exit.label}</span>
          </Tile>
          {toolboxOpen && <UnpinBtn tool="exit" onUnpin={onUnpin} />}
        </PinSlot>
      )}

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

      {/*
        補充資源：這一頁有補充時才框成白卡、右上角掛數量，學生一眼知道這頁有東西可以看。
        沒有時跟其他工具一樣平放——白卡沒數字看起來像壞掉或被選中。仍然按得下去：整節、整章可能有。
        工具箱開著時角標讓給「收回」
      */}
      {pinned.includes('supplements') && (
        <PinSlot>
          <Tile
            type="button"
            $boxed={supplementCount > 0 && !toolboxOpen}
            $editing={toolboxOpen}
              tabIndex={toolboxOpen ? -1 : undefined}
              aria-disabled={toolboxOpen || undefined}
            $active={supplementOpen && !toolboxOpen}
            aria-expanded={supplementOpen}
            onClick={onSupplements}
            title="這一頁的補充資源"
          >
            <Icon name={RAIL_TOOL_META.supplements.icon} size={20} />
            <span>{RAIL_TOOL_META.supplements.label}</span>
          </Tile>
          {toolboxOpen ? (
            <UnpinBtn tool="supplements" onUnpin={onUnpin} />
          ) : (
            supplementCount > 0 && <Badge aria-label={`${supplementCount} 項`}>{supplementCount}</Badge>
          )}
        </PinSlot>
      )}
    </Rail>
  );
}

/** 工具箱開著時，釘著的工具右上角那顆「收回」 */
function UnpinBtn({ tool, onUnpin }: { tool: RailTool; onUnpin: (t: RailTool) => void }) {
  const { label } = RAIL_TOOL_META[tool];
  return (
    <Unpin type="button" title={`把「${label}」收回工具箱`} onClick={() => onUnpin(tool)}>
      <Icon name="x" size={16} label={`收回${label}`} />
    </Unpin>
  );
}

/** Figma：整欄 104，左右各留 24，內容 56 寬，群組間距 12。 */
/**
 * 整欄 104 寬、內容 56 寬（照 Figma）。高度要一整條放得下：工具格 52 高、間距 4，
 * 頁數的上下鈕並排，一般筆電螢幕不必捲動就看得到最下面的「補充資源」。
 */
const Rail = styled.nav`
  flex: none;
  inline-size: var(--reader-rail, 104px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(p) => p.theme.space.gapXs};
  padding: ${(p) => p.theme.space.insetSm} 0;
  /* 透明：工具直接放在閱讀畫面的淡灰底上 */
  background: transparent;
  overflow: hidden auto;
  scrollbar-width: none;
`

/** 一顆 56 寬的膠囊：上箭頭、頁碼、下箭頭，箭頭橫跨整欄寬，矮但好按。 */
const PageGroup = styled.div`
  inline-size: var(--reader-tile-w, 56px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-block: 4px;
  padding: 4px 0;
  /* 膠囊：上下兩端整個圓起來 */
  border-radius: 999px;
  /* 灰底上用白色膠囊，跟「補充資源」一樣是最常按的，要一眼找得到 */
  background: ${(p) => p.theme.surface.raised};
`;

const PageInput = styled.input`
  box-sizing: border-box;
  inline-size: 40px;
  margin-block: 2px;
  padding: 2px 0;
  border: none;
  border-radius: 999px;
  background: transparent;
  font-family: ${(p) => p.theme.typography.fontDisplay};
  font-size: 14px;
  line-height: 1.2;
  text-align: center;
  font-variant-numeric: tabular-nums;
  color: ${(p) => p.theme.text.primary};
  cursor: text;
  &:hover { background: ${(p) => p.theme.surface.sunken}; }
  &:focus { outline: none; background: ${(p) => p.theme.surface.sunken}; }
`

/**
 * 上一頁／下一頁：看得到的是 24 的小正圓（滑過只亮這一圈），
 * 但手指點的範圍用看不見的 ::after 撐到整個膠囊寬、往外多 10px，平板上好按，版面高度不變。
 * 往頁碼那一側只多 2px，不搶頁碼輸入框的點擊。
 */
const PageStepBtn = styled.button`
  position: relative;
  inline-size: 24px;
  block-size: 24px;
  &::after {
    content: '';
    position: absolute;
    inset-inline: -16px;
  }
  &:first-child::after { top: -12px; bottom: -2px; }
  &:last-child::after { top: -2px; bottom: -12px; }
  display: grid;
  place-items: center;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: ${(p) => p.theme.icon.default};
  cursor: pointer;
  transition: background 0.12s;

  /* 膠囊是白的，滑過的小圓用淡灰 */
  &:hover:not(:disabled) { background: ${(p) => p.theme.surface.sunken}; }
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
  /* 尺寸跟著螢幕走（ReaderMode 的 ReaderVars） */
  inline-size: var(--reader-tile-w, 56px);
  block-size: var(--reader-tile-h, 56px);
  flex: none;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 0;
  border-radius: ${(p) => p.theme.radius.tile};
  /* 使用中：最淡的 Lime 底加一圈深綠細框，不用整片亮黃 */
  border: ${(p) => p.theme.border.widthDefault} ${(p) => (p.$editing ? 'dashed' : 'solid')}
    ${(p) =>
      p.$editing
        ? p.theme.border.editing
        : p.$active
          ? p.theme.border.accent
          : p.$boxed
            ? p.theme.border.subtle
            : 'transparent'};
  /*
   * 放在灰底上：平常透明；「補充資源」（$boxed）是白底卡片；
   * $accent 返回編輯與 $active 啟用中的工具：淡 Lime 底、深綠字
   */
  /* 使用中用最淡的 Lime（tint-subtle），整欄才不會一片亮黃；深綠字負責標出「這顆在用」 */
  background: ${(p) =>
    p.$active || p.$accent ? p.theme.brand.primaryTintSubtle : p.$boxed ? p.theme.surface.raised : 'transparent'};
  color: ${(p) => (p.$active || p.$accent ? p.theme.brand.accentOnLight : p.theme.text.primary)};
  font-size: var(--reader-label, var(--ds-typography-label-size));
  line-height: 14px;
  white-space: nowrap;
  cursor: pointer;
  /*
   * 編輯工具箱時（虛線框）只能收回，不能拿起來用：整格不接點擊、不顯示使用中，
   * 右上角的 × 是另一顆按鈕，照樣按得到
   */
  ${(p) => p.$editing && 'pointer-events: none;'}
  transition: background 0.12s, color 0.12s, box-shadow 0.12s, transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);

  svg { color: ${(p) => (p.$active || p.$accent ? p.theme.brand.accentOnLight : p.theme.icon.default)}; }

  /* 滑過：灰底上浮出一塊白（跟頁面、補充資源同色），一眼看得出指到哪一顆 */
  &:hover:not(:disabled) {
    background: ${(p) => (p.$active || p.$accent ? p.theme.brand.primaryTintSubtle : p.theme.surface.raised)};
    box-shadow: ${(p) => (p.$active || p.$accent ? 'none' : p.theme.shadow.card)};
  }
  &:active:not(:disabled) { transform: scale(0.96); box-shadow: none; }
  &:focus-visible { outline: 2px solid ${(p) => p.theme.border.focus}; outline-offset: 2px; }
  @media (prefers-reduced-motion: reduce) { &:active:not(:disabled) { transform: none; } }
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
  border-block-start: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.default};
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
  /* 數字要看筆畫置中，不是看行框：Outfit 的數字落在行框下半部，不裁的話會比圓心低約 4px。
     text-box 把行框裁到數字的頂（cap）與底（alphabetic），grid 置中的就是筆畫本身 */
  line-height: 1;
  text-box: trim-both cap alphabetic;
  pointer-events: none;
`;

/** 右上角那顆 ×。Figma 放在 (43, -13.5)，24px。 */
/**
 * 「收回」：20 的實心小圓（深綠底、白色 ×），圓心壓在工具格右上角的轉角上，
 * 跟著格子的右緣走，格子縮小時位置不會跑掉。外圈一圈底色，跟虛線框分得開
 */
const Unpin = styled.button`
  position: absolute;
  inset-inline-end: -7px;
  inset-block-start: -7px;
  z-index: 1;
  display: grid;
  place-items: center;
  inline-size: 20px;
  block-size: 20px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${(p) => p.theme.brand.accentOnLight};
  box-shadow: 0 0 0 2px ${(p) => p.theme.surface.sunken};
  color: ${(p) => p.theme.surface.raised};
  cursor: pointer;
  transition: background 0.12s, transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);
  svg { inline-size: 12px; block-size: 12px; stroke-width: 2.5; }

  &:hover { background: ${(p) => p.theme.feedback.errorDefault}; transform: scale(1.1); }
  &:active { transform: scale(0.94); }
`;
