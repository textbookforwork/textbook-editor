import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../components/Icon';
import type { IconName } from '../assets/icons.generated';
import type { Doc } from '../model/types';
import { HomeButton } from './HomeButton';
import { CoverDialog, SharedDialog } from './ShareDialog';
import { Toaster, toast } from './Toast';
import { loadShare, saveShare, useAutosave, type ShareState } from './persist';

export type TopBarProps = {
  doc: Doc;
  onTitle: (title: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  /** 匯入對話框開著。匯入的入口在教材設定裡，這裡只用來讓「設定」亮著。 */
  importing: boolean;
  settingsOpen: boolean;
  onSettings: () => void;
  /** 閱讀模式＝目前 App 的 preview */
  reading: boolean;
  onReading: () => void;
};

/** 手動按下儲存後，按鈕亮著多久。 */
const SAVED_FLASH = 1200;

/**
 * 頂部列。照 Figma「右上角按鈕列」：左邊回首頁與教材名稱，右邊一排 Tool Tile。
 *
 * 所有按鈕都是同一種 56×56 的 Tool Tile（圖示在上、字在下），不分三種樣式——
 * 復原重做、匯入設定在 Figma 裡沒有，這裡照同一款做，用細線分成三組。
 *
 * 共享照 Figma 的流程：按下去**先共享**，再問要不要放封面；
 * 已共享時再按一次直接取消。儲存與共享的狀態存 localStorage（persist.ts），
 * 不經過 reducer：它們不是教材內容，不該佔掉一次復原。
 */
export function TopBar({
  doc,
  onTitle,
  undo,
  redo,
  canUndo,
  canRedo,
  importing,
  settingsOpen,
  onSettings,
  reading,
  onReading,
}: TopBarProps) {
  // 內容一改就自動存，所以按鈕平常就是「已儲存」；改動後到存好之前那一秒顯示「儲存」。
  // 手動按是給老師安心用的：立刻存、按鈕亮一下
  const autosave = useAutosave(doc);

  const [dialog, setDialog] = useState<'none' | 'shared' | 'cover'>('none');
  const [share, setShare] = useState<ShareState>(loadShare);
  const [justSaved, setJustSaved] = useState(false);

  // 兩秒內連按兩次「儲存」，計時器要重來，不然第二次會提早消失
  const savedTimer = useRef<number>(0);
  useEffect(() => () => clearTimeout(savedTimer.current), []);

  const save = () => {
    autosave.flush();
    setJustSaved(true);
    clearTimeout(savedTimer.current);
    savedTimer.current = window.setTimeout(() => setJustSaved(false), SAVED_FLASH);
  };

  const commitShare = useCallback((next: ShareState) => {
    setShare(next);
    saveShare(next);
  }, []);

  const toggleShare = () => {
    if (share.shared) {
      commitShare({ ...share, shared: false });
      toast('已取消共享');
      return;
    }
    // 先共享、再問封面：Figma 的順序。老師按下去的那一刻就已經分享出去了
    commitShare({ ...share, shared: true });
    setDialog('shared');
  };

  return (
    <Bar>
      <HomeButton subject={doc.meta.subject} />
      <TitleField value={doc.title} onChange={onTitle} />

      <Right>
        <Group>
          <Tile icon="undo" label="復原" title="復原（Cmd+Z）" disabled={!canUndo} onClick={undo} />
          <Tile icon="redo" label="重做" title="重做（Shift+Cmd+Z）" disabled={!canRedo} onClick={redo} />
        </Group>
        <Divider />
        <Group>
          {/* 匯入 md 是「換掉這本的內容」，也是設定這本的事，所以放在教材設定裡 */}
          <Tile icon="settings" label="設定" title="教材設定、匯入" $focus={settingsOpen || importing} onClick={onSettings} />
          <Tile
            icon="save"
            label={autosave.pending ? '儲存' : '已儲存'}
            title={autosave.pending ? '有尚未儲存的改動，按一下立刻儲存' : '已自動儲存到這台電腦，按一下再存一次'}
            $on={justSaved}
            onClick={save}
          />
          <Tile
            icon="share"
            label={share.shared ? '已共享' : '共享'}
            title={share.shared ? '再按一次取消共享' : '共享教材'}
            $on={share.shared}
            aria-pressed={share.shared}
            onClick={toggleShare}
          />
          <Tile
            icon="eye"
            label={reading ? '回到編輯' : '閱讀模式'}
            title={reading ? '回到編輯' : '用學生看到的樣子翻閱'}
            $on={reading}
            aria-pressed={reading}
            onClick={onReading}
          />
        </Group>
      </Right>

      {dialog === 'shared' && (
        <SharedDialog onClose={() => setDialog('none')} onUpload={() => setDialog('cover')} />
      )}
      {dialog === 'cover' && (
        <CoverDialog
          onCancel={() => setDialog('none')}
          onConfirm={(coverAssetId) => {
            commitShare({ ...share, shared: true, coverAssetId });
            setDialog('none');
            toast('封面已更新');
          }}
        />
      )}

      <Toaster />
    </Bar>
  );
}

/* ---------- 教材名稱 ---------- */

/**
 * 三態：平常只有字；滑過時旁邊浮出鉛筆，提示這裡可以改；
 * 進入編輯有外框，Enter 或點別處就回到平常。
 *
 * <input> 不會隨內容變寬，所以用一個看不見的同字副本（::after）撐出寬度，
 * 輸入框疊在同一格裡填滿它。副本與輸入框必須同字型、同內距，寬度才會剛好。
 */
function TitleField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <TitleFit data-value={value || '未命名教材'}>
      <Title
        /* size=1：拿掉輸入框自帶的約 20 字寬，寬度只由名稱長度決定 */
        size={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === 'Escape') e.currentTarget.blur();
        }}
        placeholder="未命名教材"
        aria-label="教材名稱"
        title="教材名稱，點一下就能改"
      />
    </TitleFit>
  );
}

/**
 * 教材名稱：平常只有字，滑過變成一顆淡灰膠囊提示能改，進入編輯膠囊加框。
 * 20px 粗體、字距 0.4、行高 34，照 Figma 的 titleInput。
 *
 * <input> 不會隨內容變寬，所以用一個看不見的同字副本（::after）撐出寬度，
 * 輸入框疊在同一格裡填滿它。副本與輸入框必須同字型、同內距，寬度才會剛好。
 */
const TitleFit = styled.div`
  display: inline-grid;
  flex: 0 1 auto;
  min-inline-size: 0;

  &::after,
  & > input {
    grid-area: 1 / 1;
    font: inherit;
    font-size: 20px;
    line-height: 34px;
    letter-spacing: 0.4px;
    font-weight: 700;
    padding: 4px 16px;
    border: ${(p) => p.theme.border.widthDefault} solid transparent;
  }
  &::after {
    content: attr(data-value);
    visibility: hidden;
    white-space: pre;
    overflow: hidden;
  }
`;

const Title = styled.input`
  inline-size: 100%;
  min-inline-size: 3ch;
  text-overflow: ellipsis;
  border-radius: ${(p) => p.theme.radius.control};
  background: transparent;
  color: ${(p) => p.theme.text.primary};
  transition: background 0.12s, border-color 0.12s;

  &:hover { background: ${(p) => p.theme.surface.sunken}; }
  &:focus {
    border-color: ${(p) => p.theme.border.focus};
    background: ${(p) => p.theme.surface.sunken};
    outline: none;
  }
`;

/* ---------- Tool Tile ---------- */

type TileProps = {
  icon: IconName;
  label: string;
  title: string;
  disabled?: boolean;
  /** 開著相關面板：Figma 的 focus 態，跟 on 同一種淡 Lime 底 */
  $focus?: boolean;
  /** 已啟用（已儲存、已共享、閱讀中） */
  $on?: boolean;
  onClick: () => void;
  'aria-pressed'?: boolean;
  'aria-expanded'?: boolean;
};

function Tile({ icon, label, title, disabled, $focus = false, $on = false, onClick, ...aria }: TileProps) {
  return (
    <TileButton
      type="button"
      title={title}
      disabled={disabled}
      $active={$on || $focus}
      onClick={onClick}
      {...aria}
    >
      <Icon name={icon} size={20} />
      <span>{label}</span>
    </TileButton>
  );
}

/**
 * 照 Figma 的 Tool Tile（圓角 12、白底無框、中粗字），尺寸收小一階。
 * 啟用（focus／on）換成淡 Lime 底、深 Lime 字；滑過是淡灰底；停用是淡字。
 */
const TileButton = styled.button<{ $active: boolean }>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  /* 比 Figma 的 56 方塊收小一階（48 高、字 11；圖示維持設計系統的 20），頂部列比較精緻；四個字的「閱讀模式」靠左右內距撐開 */
  min-inline-size: 48px;
  block-size: 48px;
  padding: 0 6px;
  border: none;
  border-radius: ${(p) => p.theme.radius.tile};
  cursor: pointer;
  font-size: var(--ds-typography-label-size);
  font-weight: 500;
  line-height: var(--ds-typography-label-line-height);
  white-space: nowrap;
  background: ${(p) => (p.$active ? p.theme.brand.primaryTint : p.theme.action.inverseBg)};
  color: ${(p) => (p.$active ? p.theme.brand.accentOnLight : p.theme.text.secondary)};
  transition: background 0.12s, color 0.12s;

  svg { color: ${(p) => (p.$active ? p.theme.brand.accentOnLight : p.theme.icon.default)}; }

  &:hover:not(:disabled) {
    background: ${(p) => (p.$active ? p.theme.brand.primaryTint : p.theme.surface.sunken)};
  }
  &:disabled {
    cursor: default;
    color: ${(p) => p.theme.text.disabled};
    svg { color: ${(p) => p.theme.icon.disabled}; }
  }
`;

const Bar = styled.header`
  display: flex;
  align-items: center;
  flex: none;
  gap: ${(p) => p.theme.space.gapMd};
  padding: ${(p) => p.theme.space.insetXs} ${(p) => p.theme.space.insetLg};
  background: ${(p) => p.theme.surface.raised};
`;

/** 右側整組推到最右邊；名稱是唯一會被擠壓的東西。 */
const Right = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.gapLg};
  flex: none;
  margin-inline-start: auto;
`;

const Group = styled.div`
  display: flex;
  gap: ${(p) => p.theme.space.gapSm};
  align-items: center;
`;

const Divider = styled.span`
  inline-size: 1px;
  block-size: 24px;
  background: ${(p) => p.theme.border.subtle};
`;
