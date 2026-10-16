import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { CompactAction, emptyCompactCss } from './emptyCompact';
import { fieldCss } from '../../editor/SidePanel';
import styled from 'styled-components';
import { Icon } from '../Icon';
import { useEditorCtx } from '../../editor/EditorContext';
import { safeHttpUrl } from '../../viewer/safeUrl';
import { fetchSiteTitle, linkLabel } from '../../editor/siteTitle';
import type { BlockPatch } from '../../model/actions';
import type { WebBlock } from '../../model/types';

/* ── 網頁網址編輯狀態（供浮動膠囊「更改網址」按鈕觸發） ── */

let editingWebBlockId: string | null = null;
const webEditListeners = new Set<() => void>();
const emitWebEdit = () => webEditListeners.forEach((l) => l());
const subscribeWebEdit = (l: () => void) => {
  webEditListeners.add(l);
  return () => webEditListeners.delete(l);
};

export function useEditingWebBlockId(): string | null {
  return useSyncExternalStore(subscribeWebEdit, () => editingWebBlockId);
}

export function setEditingWebBlockId(id: string | null) {
  if (editingWebBlockId === id) return;
  editingWebBlockId = id;
  emitWebEdit();
}

type Props = {
  block: WebBlock;
  boxStyle?: React.CSSProperties;
  onPatch?: (patch: BlockPatch) => void;
  onSelect?: () => void;
};

/**
 * 網頁。課本上有三種樣子，資料是同一個：
 *
 *  bookmark 插入標籤（先在元件上直接貼網址，貼上後轉為有標題與右側縮圖的橫向卡片）
 *  embed    內嵌網頁（直接在元件上貼網址，貼上後顯示內嵌網頁框、右上角 12px 處有刪除 × 鈕、hover 置中顯示網頁名稱）
 *  qr       課本印的 QR 碼
 */
export function WebBlockView({ block, boxStyle, onPatch, onSelect }: Props) {
  const ed = useEditorCtx();
  const editingBlockId = useEditingWebBlockId();
  const isEditingUrl = Boolean(onPatch && editingBlockId === block.id);
  const inputRef = useRef<HTMLInputElement>(null);
  // 還沒選呈現方式時先貼的網址，選了方式才一起寫進去
  const [draftUrl, setDraftUrl] = useState('');

  const host = hostOf(block.url);
  const safe = safeHttpUrl(block.url);
  const isChosen = block.chosen !== false;

  useEffect(() => {
    if (isEditingUrl && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingUrl]);

  const commitUrl = (raw: string) => {
    if (!onPatch) return;
    const v = raw.trim();
    if (v) {
      // 先顯示連結，再去抓網站標題；抓到了而且老師還沒自己改過，就換成標題
      const fallback = linkLabel(v);
      const keep = block.title && block.url && v === block.url;
      onPatch({ url: v, chosen: true, ...(keep ? {} : { title: fallback }) });
      if (!keep) {
        void fetchSiteTitle(v).then((t) => {
          if (t) onPatch({ title: t });
        });
      }
    } else if (block.url && isEditingUrl) {
      // 若在「更改網址」時清空，保留原網址或清空皆可；此處若清空則回到待貼網址狀態
      onPatch({ url: '' });
    }
    setEditingWebBlockId(null);
  };

  // 尚未選擇呈現方式：先在上面貼網址，再在下面選「插入標籤」或「內嵌網頁」——
  // 順著「要放哪個網頁 → 怎麼放」的順序，選完就直接成形，不必再貼一次
  if (onPatch && !isChosen) {
    const choose = (presentation: 'bookmark' | 'embed') => {
      onSelect?.();
      const v = draftUrl.trim();
      onPatch({
        presentation,
        chosen: true,
        // 標籤是一條小卡，佔欄寬三分之一就夠；內嵌預設佔滿整頁（寬撐滿欄、高交給 blockSizing 撐滿一頁）
        widthPct: presentation === 'bookmark' ? 100 / 3 : 100,
        blockSize: undefined,
        ...(v ? { url: v, ...(block.title ? {} : { title: hostOf(v) || '連結標題' }) } : {}),
      });
    };
    return (
      <EmptyFrame style={boxStyle} onPointerDown={onSelect}>
        {/* 框太小放不下網址欄（見 emptyCompact）：只留「貼上網址」，再小只剩網頁圖示；拉大就會出現網址欄 */}
        <CompactAction label="貼上網址" action="link" kind="globe" primary={false} title="把框拉大就能貼網址" />
        <Pick
          data-full
          onPointerDown={(e) => {
            onSelect?.();
            e.stopPropagation();
          }}
        >
          {/* 網址與兩顆選擇同寬、上下對齊，看起來是一張小表單：先貼網址，再按要怎麼放 */}
          <Chooser>
            <DirectUrlInput
              value={draftUrl}
              placeholder="貼上網址（https://…）"
              aria-label="貼上網址"
              onChange={(e) => setDraftUrl(e.target.value)}
            />
            <ChoiceRow role="group" aria-label="選擇呈現的方式">
              <PickBtn type="button" onClick={() => choose('bookmark')} title="以小卡片連到網頁">
                插入標籤
              </PickBtn>
              <PickBtn type="button" onClick={() => choose('embed')} title="把網頁直接放在頁面裡，佔滿一頁">
                內嵌網頁
              </PickBtn>
            </ChoiceRow>
          </Chooser>
        </Pick>
      </EmptyFrame>
    );
  }

  if (block.presentation === 'qr') {
    return (
      <QrRow style={boxStyle} onPointerDown={onSelect}>
        <QrBox>
          <Icon name="zoom-in" size={24} />
        </QrBox>
        <div>
          <strong>{block.title || '掃描開啟'}</strong>
          <Url>{host}</Url>
        </div>
      </QrRow>
    );
  }

  if (block.presentation === 'embed') {
    const labelText = block.title || host || '網頁名稱';
    const showInput = Boolean(onPatch && (!block.url || isEditingUrl));

    return (
      <EmbedWrap style={boxStyle} $empty={showInput || !safe} onPointerDown={onSelect}>
        {showInput ? (
          <EmbedPlaceholder
            onPointerDown={(e) => {
              onSelect?.();
              e.stopPropagation();
            }}
          >
            <Icon name="globe" size={24} />
            <DirectUrlInput
              ref={inputRef}
              defaultValue={block.url}
              placeholder="貼上網址（https://…）"
              aria-label="貼上網址"
              onPaste={(e) => {
                const pasted = e.clipboardData.getData('text').trim();
                if (pasted && (!block.url || isEditingUrl)) {
                  e.preventDefault();
                  commitUrl(pasted);
                }
              }}
              onBlur={(e) => commitUrl(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  commitUrl(e.currentTarget.value);
                } else if (e.key === 'Escape') {
                  e.preventDefault();
                  setEditingWebBlockId(null);
                }
              }}
            />
          </EmbedPlaceholder>
        ) : safe ? (
          <EmbedFrame
            src={safe}
            title={labelText}
            referrerPolicy="no-referrer"
            $interactive={!onPatch}
          />
        ) : (
          <EmbedPlaceholder>
            <Icon name="globe" size={24} />
            <span>尚未設定網址</span>
          </EmbedPlaceholder>
        )}

        {/* 右上角刪除 × 按鈕：距離外框右上端點 12px，樣式依新設計系統 */}
        {onPatch && ed && (
          <EmbedCloseBtn
            type="button"
            aria-label="刪除內嵌網頁"
            title="刪除"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              ed.dispatch({ type: 'deleteBlock', blockId: block.id });
              ed.select(null);
            }}
          >
            <Icon name="x" size={16} label="刪除" />
          </EmbedCloseBtn>
        )}

        {/* 已貼上網址後，hover 時中間顯示網頁名稱，外框最大寬度 200px，無下陰影 */}
        {!showInput && Boolean(block.url) && (
          <EmbedTitleBadge
            contentEditable={!!onPatch}
            suppressContentEditableWarning
            data-placeholder={host || '網頁名稱'}
            onPointerDown={(e) => {
              if (onPatch) e.stopPropagation();
            }}
            onBlur={(e) => onPatch?.({ title: e.currentTarget.textContent ?? '' })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                e.currentTarget.blur();
              }
            }}
          >
            {onPatch ? block.title : labelText}
          </EmbedTitleBadge>
        )}
      </EmbedWrap>
    );
  }

  // 插入標籤（bookmark）：
  // 還沒貼網址（或按了「更改網址」）時，直接在元件上顯示貼上網址輸入框；
  // 貼上後轉為有標題與右側縮圖的橫向卡片。
  if (onPatch && (!block.url || isEditingUrl)) {
    return (
      <EmptyFrame style={boxStyle} onPointerDown={onSelect}>
        {/* 框太小放不下網址欄（見 emptyCompact）：只留「貼上網址」，再小只剩網頁圖示；拉大就會出現網址欄 */}
        <CompactAction label="貼上網址" action="link" kind="globe" primary={false} title="把框拉大就能貼網址" />
        <Pick
          data-full
          onPointerDown={(e) => {
            onSelect?.();
            e.stopPropagation();
          }}
        >
          <DirectUrlInput
            ref={inputRef}
            defaultValue={block.url}
            placeholder="貼上網址（https://…）"
            aria-label="貼上網址"
            onPaste={(e) => {
              const pasted = e.clipboardData.getData('text').trim();
              if (pasted && (!block.url || isEditingUrl)) {
                e.preventDefault();
                commitUrl(pasted);
              }
            }}
            onBlur={(e) => commitUrl(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                commitUrl(e.currentTarget.value);
              } else if (e.key === 'Escape') {
                e.preventDefault();
                setEditingWebBlockId(null);
              }
            }}
          />
        </Pick>
      </EmptyFrame>
    );
  }

  // 已貼上網址後的「插入標籤」卡片：
  // 1. 移除網址列，只顯示標題（超過字數截斷顯示「…」）
  // 2. 拉左右側變寬可顯示更多標題文字；拉四角等比縮放時依 blockSize 比例縮放內容
  const scaleFactor = block.blockSize ? Math.max(0.6, Math.min(2.2, block.blockSize / 68)) : 1;
  // 左邊的圖示格：撐滿卡片內高（68 − 上下內距 8×2 − 框線），4:3
  const thumbH = Math.round(50 * scaleFactor);
  const thumbW = Math.round((thumbH * 4) / 3);
  const fontSizePx = Math.round(15 * scaleFactor);

  return (
    <Card
      style={boxStyle}
      $clickable={!!safe}
      onPointerDown={onSelect}
      // 閱讀時點一下就開；編輯時點一下是選取元件，點兩下才開連結
      onClick={() => {
        if (!onPatch && safe) window.open(safe, '_blank', 'noopener,noreferrer');
      }}
      onDoubleClick={() => {
        if (onPatch && safe) window.open(safe, '_blank', 'noopener,noreferrer');
      }}
      title={onPatch && safe ? '點兩下開啟連結' : undefined}
    >
      {/* 照媒體庫的網頁列：左邊淡灰圖示格（地球），右邊標題 */}
      <CardThumb style={{ inlineSize: `${thumbW}px`, blockSize: `${thumbH}px` }}>
        <Icon name="globe" size={24} />
      </CardThumb>
      <Title style={{ fontSize: `${fontSizePx}px` }}>{block.title || linkLabel(block.url) || '連結標題'}</Title>
    </Card>
  );
}

function hostOf(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

/** 尚未選擇呈現方式或尚未貼網址時的外框：與空的圖片、影片元件一致（淡底虛線、置中控制項）。 */
const EmptyFrame = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  ${emptyCompactCss}
  border-radius: ${(p) => p.theme.radius.field};
  border: ${(p) => p.theme.border.widthDefault} dashed ${(p) => p.theme.border.default};
  background: ${(p) => p.theme.surface.page};
  box-sizing: border-box;
  overflow: hidden;
`;

const Pick = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  inline-size: 100%;
  box-sizing: border-box;
  writing-mode: horizontal-tb;
`;

const Chooser = styled.div`
  display: grid;
  gap: ${(p) => p.theme.space.gapSm};
  inline-size: min(360px, calc(100% - 48px));
`;

const ChoiceRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(p) => p.theme.space.gapSm};
`;

const PickBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  min-block-size: 40px;
  padding: 0 12px;
  cursor: pointer;
  white-space: nowrap;
  border-radius: ${(p) => p.theme.radius.control};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.text.secondary};
  transition: border-color 0.12s, color 0.12s;

  /* 滑過是品牌深綠的框與字 */
  &:hover {
    border-color: ${(p) => p.theme.border.accent};
    color: ${(p) => p.theme.text.accent};
  }
`;

const DirectUrlInput = styled.input`
  ${fieldCss}
  font-size: var(--ds-typography-body-size);
  /* 跟圖片的「描述要生成的圖片」同一款灰膠囊：平常無框，打字時白底加灰框，不疊瀏覽器的焦點外圈 */
  /* 膠囊幾乎撐滿框寬（左右只留框本身的內距），不要離兩側太遠 */
  inline-size: 100%;
  min-block-size: 40px;
  padding: 0 16px;
  box-sizing: border-box;
  &:focus-visible { outline: none; }
`;

const Card = styled.div<{ $clickable?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  border-radius: ${(p) => p.theme.radius.tile};
  background: ${(p) => p.theme.surface.raised};
  padding: 8px 16px 8px 8px;
  color: ${(p) => p.theme.text.secondary};
  box-sizing: border-box;
  writing-mode: horizontal-tb;
  cursor: ${(p) => (p.$clickable ? 'pointer' : 'default')};
`;

const Title = styled.div`
  flex: 1;
  min-inline-size: 0;
  color: ${(p) => p.theme.text.primary};
  font-size: var(--ds-typography-body-sm-size);
  line-height: 1.4;
  font-weight: 500;
  outline: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;

  &:empty::before {
    content: attr(data-placeholder);
    color: ${(p) => p.theme.text.tertiary};
  }
`;

const CardThumb = styled.div`
  flex: none;
  display: grid;
  place-items: center;
  border-radius: ${(p) => p.theme.radius.field};
  background: ${(p) => p.theme.surface.sunken};
  color: ${(p) => p.theme.icon.secondary};
`;

const Url = styled.div`
  color: ${(p) => p.theme.text.tertiary};
  font-family: ${(p) => p.theme.typography.fontDisplay};
  font-size: var(--ds-typography-label-size);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/**
 * 內嵌網頁中間的網頁名稱標籤：
 * hover 時顯示，外框寬度最大 200px，刻意不加下陰影（box-shadow: none），
 * 免得看起來像可以點擊的按鈕。
 */
const EmbedTitleBadge = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  max-inline-size: 200px;
  padding: 6px 12px;
  border-radius: ${(p) => p.theme.radius.field};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.text.primary};
  font-size: var(--ds-typography-caption-size);
  line-height: 1.4;
  font-weight: 500;
  box-shadow: none;
  outline: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s;

  &:empty::before {
    content: attr(data-placeholder);
    color: ${(p) => p.theme.text.tertiary};
  }
`;

const EmbedWrap = styled.div<{ $empty?: boolean }>`
  position: relative;
  border: ${(p) => p.theme.border.widthDefault} ${(p) => (p.$empty ? 'dashed' : 'solid')}
    ${(p) => (p.$empty ? p.theme.border.default : p.theme.border.subtle)};
  border-radius: ${(p) => p.theme.radius.field};
  background: ${(p) => (p.$empty ? p.theme.surface.page : p.theme.surface.sunken)};
  box-sizing: border-box;
  writing-mode: horizontal-tb;

  &:hover > ${EmbedTitleBadge},
  &:focus-within > ${EmbedTitleBadge} {
    opacity: 1;
    visibility: visible;
  }
`;

const EmbedFrame = styled.iframe<{ $interactive: boolean }>`
  display: block;
  inline-size: 100%;
  block-size: 100%;
  border: none;
  border-radius: ${(p) => p.theme.radius.field};
  background: ${(p) => p.theme.surface.raised};
  pointer-events: ${(p) => (p.$interactive ? 'auto' : 'none')};
`;

const EmbedPlaceholder = styled.div`
  inline-size: 100%;
  block-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  box-sizing: border-box;
  color: ${(p) => p.theme.text.secondary};
  font-size: var(--ds-typography-caption-size);
`;

/**
 * 內嵌網頁右上角的刪除 × 按鈕：
 * 距離外框右上端點 12px（top: 12px; right: 12px），位置與系統其他彈窗/卡片一致，
 * 樣式依新設計系統。
 */
const EmbedCloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 4;
  inline-size: 28px;
  block-size: 28px;
  padding: 0;
  display: grid;
  place-items: center;
  border-radius: ${(p) => p.theme.radius.control};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.icon.default};
  cursor: pointer;
  transition: background 0.12s, color 0.12s;

  &:hover {
    background: ${(p) => p.theme.action.ghostBgHover};
  }
`;

const QrRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${(p) => p.theme.text.secondary};
  box-sizing: border-box;
`;

const QrBox = styled.div`
  display: grid;
  place-items: center;
  inline-size: 72px;
  block-size: 72px;
  border-radius: ${(p) => p.theme.radius.field};
  background: ${(p) => p.theme.surface.sunken};
  flex: none;
`;
