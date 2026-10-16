import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { css, keyframes } from 'styled-components';
import { Icon } from '../components/Icon';
import { getAsset, urlOf, youtubeId } from '../editor/assets';
import { Dropdown } from '../editor/Dropdown';
import { PanelBody, PanelClose, PanelDrawer, PanelHead, PanelTab, PanelTabs, PanelTitle } from '../editor/SidePanel';
import { textOf } from '../model/document';
import { paragraphIndex, paraLabel } from '../model/paragraphs';
import { POPUP_KIND, readyPopups, titleOf } from '../model/popups';
import { blockRegistry } from '../model/registry';
import { scopesOf, supplementBlocksOf, type ScopeEntry, type ScopeKind } from '../model/supplementScope';
import type { Page } from '../model/paginate';
import type { Block, Doc, PopupItem, PopupKind } from '../model/types';

export { supplementBlocksOf };

type Props = {
  doc: Doc;
  pages: Page[];
  /** 目前這一頁（0 起算）。 */
  current: number;
  open: boolean;
  onClose: () => void;
  onOpen: (block: Block, item: PopupItem) => void;
  /** 點分組的頁碼：書翻到那一段所在的頁。 */
  onGoRow: (rowId: string) => void;
};

/** 清單上代表這個元件的一行字。要讓人認得出「是頁面上哪一個」，不是型別名稱。 */
function summaryOf(block: Block, max: number): string {
  if (block.type === 'text') {
    const t = textOf(block).trim();
    if (!t) return '空白文字';
    return t.length > max ? `${t.slice(0, max)}…` : t;
  }
  if (block.type === 'image') return `圖：${block.caption.trim() || block.alt.trim() || '未命名'}`;
  const label = blockRegistry[block.type].label;
  return block.label ? `${label}：${block.label}` : label;
}

/**
 * 整節、整章時的分類。大彈窗併進文字：兩者都是「讀的」，只差在放不放得下；
 * 分開會多一格常常是空的分頁籤。順序照補充設定面板的類型順序。
 */
type Tab = Exclude<PopupKind, 'rich'>;
const TAB_ORDER: Tab[] = ['text', 'image', 'video', 'audio', 'web', 'jump'];
const tabOf = (kind: PopupKind): Tab => (kind === 'rich' ? 'text' : kind);

/**
 * 閱讀模式的補充資源面板，從左欄的「補充資源」打開，跟媒體庫同一個彈窗外殼。
 *
 * 預設看這一頁：老師講到哪頁，就看那頁有什麼可以點。照段落分組，分組標題用頁面上
 * 同一款方框段號，眼睛不必在面板與課本之間找對應。
 * 上方可以切成這一節、這一章：依類別分頁籤，再依頁分組，點頁碼書就翻過去。
 *
 * 圖片、影片放縮圖（找圖是用看的）；聲音直接在列上播，上課少一層操作。
 *
 * 橫排書從右邊出來；直排書從左邊（貼著左欄）出來——直排從右往左讀，
 * 右邊是每一頁的開頭，蓋在那裡等於蓋住老師正要講的地方。
 * 面板是浮層，不推動畫布：畫布的分頁是算好的，任何擠壓它的東西都會讓頁面縮放跳動。
 */
export function SupplementPanel({ doc, pages, current, open, onClose, onOpen, onGoRow }: Props) {
  const [scope, setScope] = useState<ScopeKind>('page');
  const [tab, setTab] = useState<Tab>('text');
  // 每次打開都先看這一頁；開著時翻頁（包括點頁碼）不換範圍
  useEffect(() => {
    if (open) setScope('page');
  }, [open]);

  const vertical = doc.settings.writingMode === 'vertical';
  const page = pages[current];
  const scopes = useMemo(() => scopesOf(doc, pages, current), [doc, pages, current]);
  const pageBlocks = useMemo(() => (page ? supplementBlocksOf(page) : []), [page]);
  const paras = useMemo(() => paragraphIndex(doc.rows), [doc.rows]);
  const player = useInlineAudio(open);

  // 翻到別章後原本的範圍可能不存在（例如章名頁沒有節），退回這一頁
  const active = scope === 'page' ? null : scopes[scope] ?? null;
  const kind: ScopeKind = active ? scope : 'page';

  const entries: ScopeEntry[] = active?.entries ?? [];
  const items = entries.flatMap((e) => readyPopups(e.block).map((item) => ({ ...e, item })));
  // 這一章節沒有的類別不出分頁籤
  const tabs = TAB_ORDER.filter((t) => items.some((x) => tabOf(x.item.kind) === t));
  const shownTab = tabs.includes(tab) ? tab : tabs[0];

  // 由大到小：章、節、頁
  const options = [
    ...(scopes.chapter ? [{ value: 'chapter', label: `本章：${scopes.chapter.title}` }] : []),
    ...(scopes.section ? [{ value: 'section', label: `本節：${scopes.section.title}` }] : []),
    { value: 'page', label: `第 ${current + 1} 頁` },
  ];

  const row = (block: Block, item: PopupItem, icon: boolean) => (
    <Row
      key={item.id}
      item={item}
      icon={icon}
      playing={player.playing === item.id}
      progress={player.playing === item.id ? player.progress : 0}
      onOpen={() => (item.kind === 'audio' ? player.toggle(item) : onOpen(block, item))}
    />
  );

  if (!open) return null;
  return createPortal(
    <Drawer id="supplement-panel" role="dialog" aria-label="補充資源" $side={vertical ? 'left' : 'right'}>
      <PanelHead>
        <PanelTitle>補充資源</PanelTitle>
        <PanelClose type="button" onClick={onClose} aria-label="關閉" title="關閉">
          <Icon name="x" size={24} label="關閉" />
        </PanelClose>
      </PanelHead>

      <ScopeRow>
        {options.length > 1 ? (
          <Dropdown
            variant="tool"
            aria-label="範圍"
            value={kind}
            options={options}
            onChange={(v) => setScope(v as ScopeKind)}
          />
        ) : (
          <ScopeLabel>{options[options.length - 1].label}</ScopeLabel>
        )}
      </ScopeRow>

      {kind !== 'page' && tabs.length > 0 && (
        <Tabs role="tablist" aria-label="資源類別" $few={tabs.length < 4}>
          {tabs.map((t) => (
            <PanelTab
              key={t}
              type="button"
              role="tab"
              aria-selected={t === shownTab}
              $on={t === shownTab}
              onClick={() => setTab(t)}
            >
              {POPUP_KIND[t].label}
            </PanelTab>
          ))}
        </Tabs>
      )}

      {/* 換範圍、換分頁籤、翻頁時整片淡入，看得出內容換過了 */}
      <Body key={`${kind}-${kind === 'page' ? current : shownTab}`}>
        {kind === 'page' ? (
          pageBlocks.length === 0 ? (
            <Empty
              title="這一頁沒有補充資源"
              action={
                scopes.section || scopes.chapter
                  ? {
                      label: scopes.section ? '看本節的資源' : '看本章的資源',
                      onClick: () => setScope(scopes.section ? 'section' : 'chapter'),
                    }
                  : undefined
              }
            />
          ) : (
            pageBlocks.map((b) => {
              const para = paras.get(b.id);
              return (
                <Group key={b.id}>
                  <GroupTitle>
                    {para && <ParaNo>{paraLabel(para.no, vertical)}</ParaNo>}
                    <span>{summaryOf(b, para ? 8 : 16)}</span>
                  </GroupTitle>
                  <Rows>{readyPopups(b).map((item) => row(b, item, true))}</Rows>
                </Group>
              );
            })
          )
        ) : items.length === 0 ? (
          <Empty title={kind === 'section' ? '這一節沒有補充資源' : '這一章沒有補充資源'} />
        ) : (
          byPage(items.filter((x) => tabOf(x.item.kind) === shownTab)).map(([n, list]) => {
            const here = n === current;
            return (
              <Group key={n}>
                <PageLink
                  type="button"
                  $here={here}
                  onClick={() => onGoRow(list[0].rowId)}
                  aria-current={here ? 'page' : undefined}
                  title={here ? '就在這一頁' : `翻到第 ${n + 1} 頁`}
                >
                  第 {n + 1} 頁{here ? '・目前這頁' : <Icon name="arrow-right" size={16} />}
                </PageLink>
                <Rows>{list.map((x) => row(x.block, x.item, false))}</Rows>
              </Group>
            );
          })
        )}
      </Body>
    </Drawer>,
    document.body
  );
}

/** 依頁分組，頁碼小的在前。同一頁裡照課文順序。 */
function byPage<T extends { page: number }>(list: T[]): [number, T[]][] {
  const map = new Map<number, T[]>();
  for (const x of list) map.set(x.page, [...(map.get(x.page) ?? []), x]);
  return [...map.entries()].sort((a, b) => a[0] - b[0]);
}

/** 面板裡就地播放聲音。同時只放一段，面板關掉就停。 */
function useInlineAudio(open: boolean) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const stop = () => {
    audio.current?.pause();
    audio.current = null;
    setPlaying(null);
    setProgress(0);
  };
  useEffect(() => {
    if (!open) stop();
  }, [open]);
  useEffect(() => () => audio.current?.pause(), []);
  const toggle = (item: Extract<PopupItem, { kind: 'audio' }>) => {
    if (playing === item.id) return stop();
    audio.current?.pause();
    const a = new Audio(urlOf(item.assetId));
    a.ontimeupdate = () => setProgress(a.duration ? a.currentTime / a.duration : 0);
    a.onended = stop;
    audio.current = a;
    setProgress(0);
    setPlaying(item.id);
    // 被下一段打斷時 play() 會被拒絕，那是預期的
    a.play().catch(() => {});
  };
  return { playing, progress, toggle };
}

/**
 * 一則補充，一行。前面放什麼看種類：圖片、影片是縮圖，聲音是播放鍵（外圈畫進度），
 * 其他種類在本頁檢視放類別圖示；整節、整章已經用分頁籤分好類，就不放。
 */
function Row({
  item,
  icon,
  playing,
  progress,
  onOpen,
}: {
  item: PopupItem;
  icon: boolean;
  playing: boolean;
  progress: number;
  onOpen: () => void;
}) {
  const title = titleOf(item) || (item.kind === 'audio' && item.assetId && getAsset(item.assetId)?.name) || '';
  const lead =
    item.kind === 'image' || item.kind === 'video' ? (
      <Thumb item={item} />
    ) : item.kind === 'audio' ? (
      <Play $on={playing} aria-hidden>
        {playing && (
          <Ring viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="17" pathLength={1} strokeDasharray={`${progress} 1`} />
          </Ring>
        )}
        <Icon name={playing ? 'pause' : 'play'} size={16} />
      </Play>
    ) : icon ? (
      <Kind>
        <Icon name={POPUP_KIND[item.kind].icon} size={20} />
      </Kind>
    ) : null;
  return (
    <RowBtn
      type="button"
      onClick={onOpen}
      $lead={!!lead}
      aria-label={item.kind === 'audio' ? `${playing ? '暫停' : '播放'} ${title}` : undefined}
    >
      {lead}
      <Name>{title}</Name>
    </RowBtn>
  );
}

/** 圖片、影片的縮圖。YouTube 用它自己的縮圖，上傳的影片取第一格畫面。 */
function Thumb({ item }: { item: Extract<PopupItem, { kind: 'image' | 'video' }> }) {
  let media = null;
  if (item.kind === 'image') {
    const src = urlOf(item.assetId);
    if (src) media = <img src={src} alt="" />;
  } else {
    const yt = item.source === 'youtube' ? youtubeId(item.ref) : null;
    const src = yt ? null : urlOf(item.ref);
    if (yt) media = <img src={`https://img.youtube.com/vi/${yt}/mqdefault.jpg`} alt="" />;
    else if (src) media = <video src={`${src}#t=0.1`} muted preload="metadata" playsInline />;
  }
  return (
    <ThumbBox>
      {media ?? <Icon name={POPUP_KIND[item.kind].icon} size={20} />}
      {item.kind === 'video' && media && (
        <VideoMark>
          <Icon name="play" size={16} />
        </VideoMark>
      )}
    </ThumbBox>
  );
}

function Empty({ title, action }: { title: string; action?: { label: string; onClick: () => void } }) {
  return (
    <EmptyBox>
      <strong>{title}</strong>
      {action && (
        <EmptyAction type="button" onClick={action.onClick}>
          {action.label}
          {/* 跟左欄「補充資源」同一個圖示，看得出是去看資源；圖示放在字後面（設計系統的規則） */}
          <Icon name="blocks" size={16} />
        </EmptyAction>
      )}
    </EmptyBox>
  );
}

/* ── 樣式 ───────────────────────────────────────────────── */

/** 進場：從出來的那一側滑進 16px、同時淡入。減少動態的設定下不動 */
const slideIn = (from: number) => keyframes`
  from { opacity: 0; transform: translateX(${from}px); }
  to { opacity: 1; transform: none; }
`;
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: none; }
`;
const EASE = 'cubic-bezier(0.2, 0.8, 0.2, 1)';

/**
 * 外殼跟媒體庫同一套；壓在補充檢視視窗（1000）底下，從面板點開的視窗才蓋得過它。
 * 直排時貼著閱讀模式的左欄（104 寬）出來，上下留白跟右側版本一樣 8px。
 */
const Drawer = styled(PanelDrawer)<{ $side: 'left' | 'right' }>`
  z-index: 940;
  /* 跟頁面卡片上下切齊（閱讀畫面四周留 12）；靠左時貼著左欄，跟工具箱、目次同一個位置 */
  top: 12px;
  bottom: 12px;
  right: 12px;
  ${(p) => p.$side === 'left' && 'right: auto; left: var(--reader-rail, 104px);'}
  animation: ${(p) => slideIn(p.$side === 'left' ? -16 : 16)} 0.22s ${EASE};
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

/** 範圍切換。下拉的字跟標題左緣切齊（tool 款按鈕自帶 8px 內距，往左拉回來） */
const ScopeRow = styled.div`
  display: flex;
  padding: 2px 20px 0 8px;
  flex-shrink: 0;
`;

const ScopeLabel = styled.span`
  padding: 6px 12px;
  font-size: var(--ds-typography-body-sm-size);
  color: ${(p) => p.theme.text.secondary};
`;

/** 類別少時靠左排，不要兩三個字被拉到面板兩端 */
const Tabs = styled(PanelTabs)<{ $few: boolean }>`
  ${(p) => p.$few && 'justify-content: flex-start; gap: 24px;'}
`;

const Body = styled(PanelBody)`
  padding-top: ${(p) => p.theme.space.insetSm};
  gap: ${(p) => p.theme.space.stackMd};
  animation: ${fadeIn} 0.18s ${EASE};
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

const Group = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.gapSm};
`;

const GroupTitle = styled.h3`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  min-inline-size: 0;
  font-size: var(--ds-typography-caption-size);
  font-weight: 500;
  color: ${(p) => p.theme.text.tertiary};

  & > span:last-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

/** 段號：跟課本頁上的方框段號同一款（GlobalStyle 的 [data-pno]），只是縮成標題的字級 */
const ParaNo = styled.span`
  flex: none;
  display: inline-grid;
  place-items: center;
  box-sizing: border-box;
  min-inline-size: 18px;
  block-size: 18px;
  padding: 0 3px;
  border: 1.5px solid currentColor;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  color: ${(p) => p.theme.text.secondary};
`;

/** 一組補充放在同一張白卡裡，每則一行 */
const Rows = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  border-radius: ${(p) => p.theme.radius.card};
  background: ${(p) => p.theme.surface.raised};
`;

const RowBtn = styled.button<{ $lead: boolean }>`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.gapMd};
  /* 上課用平板點的，觸控目標不能小於 44 */
  min-block-size: 44px;
  padding: 4px 12px;
  ${(p) => p.$lead && 'padding-inline-start: 4px;'}
  border: none;
  border-radius: 10px;
  background: transparent;
  font: inherit;
  text-align: start;
  cursor: pointer;
  transition: background 0.12s;
  &:hover { background: ${(p) => p.theme.surface.sunken}; }
  &:active { background: ${(p) => p.theme.surface.muted}; }
  &:hover img, &:hover video { transform: scale(1.06); }
`;

const leadBox = css`
  position: relative;
  display: grid;
  place-items: center;
  flex: none;
  block-size: 36px;
  border-radius: 10px;
  background: ${(p) => p.theme.surface.sunken};
  color: ${(p) => p.theme.icon.default};
`;

const Kind = styled.span`
  ${leadBox}
  inline-size: 36px;
  transition: background 0.12s;
  /* 滑過時整列變灰，圖示格也是灰的就糊成一塊：圖示格改成白底，跟著那一列浮出來 */
  ${RowBtn}:hover & { background: ${(p) => p.theme.surface.raised}; }
  ${RowBtn}:active & { background: ${(p) => p.theme.surface.raised}; }
`;

/** 縮圖：16:10，比圖示格寬一些，畫面才認得出來 */
const ThumbBox = styled.span`
  ${leadBox}
  inline-size: 58px;
  overflow: hidden;
  color: ${(p) => p.theme.icon.secondary};
  img,
  video {
    inline-size: 100%;
    block-size: 100%;
    object-fit: cover;
    /* 直式的畫像從上面裁，留住人物的臉（跟媒體庫的縮圖一樣） */
    object-position: top;
    pointer-events: none;
    transition: transform 0.2s ${EASE};
  }
`;

/** 影片縮圖上的小播放記號，跟圖片分得出來 */
const VideoMark = styled.span`
  position: absolute;
  display: grid;
  place-items: center;
  inline-size: 22px;
  block-size: 22px;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.inverse};
  color: ${(p) => p.theme.text.onInverse};
  opacity: 0.8;
  svg { inline-size: 12px; block-size: 12px; }
`;

/** 聲音的播放鍵：跟泡泡裡的聲音列同一款（白色圓鍵，播放中外圈畫進度） */
const Play = styled.span<{ $on: boolean }>`
  ${leadBox}
  inline-size: 36px;
  border-radius: 999px;
  background: ${(p) => (p.$on ? p.theme.surface.raised : p.theme.surface.sunken)};
  box-shadow: ${(p) => (p.$on ? p.theme.shadow.card : 'none')};
  transition: background 0.15s, box-shadow 0.15s;
`;

const Ring = styled.svg`
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  transform: rotate(-90deg);
  pointer-events: none;
  circle {
    fill: none;
    stroke: ${(p) => p.theme.brand.accentOnLight};
    stroke-width: 2;
    transition: stroke-dasharray 0.25s linear;
  }
`;

const Name = styled.span`
  flex: 1;
  min-inline-size: 0;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 500;
  line-height: 20px;
  color: ${(p) => p.theme.text.primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/** 整節、整章的分組標題：頁碼，點了翻過去。目前這頁改用品牌深綠標出來 */
const PageLink = styled.button<{ $here: boolean }>`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-inline-start: -6px;
  padding: 2px 6px;
  border: none;
  border-radius: ${(p) => p.theme.radius.control};
  background: transparent;
  font: inherit;
  font-size: var(--ds-typography-caption-size);
  font-weight: ${(p) => (p.$here ? 700 : 500)};
  font-variant-numeric: tabular-nums;
  color: ${(p) => (p.$here ? p.theme.brand.accentOnLight : p.theme.text.tertiary)};
  cursor: ${(p) => (p.$here ? 'default' : 'pointer')};
  transition: background 0.12s, color 0.12s;
  svg { transition: transform 0.15s ${EASE}; }
  &:hover {
    ${(p) => !p.$here && `background: ${p.theme.surface.muted}; color: ${p.theme.text.primary};`}
    svg { transform: translateX(2px); }
  }
`;

const EmptyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(p) => p.theme.space.gapSm};
  padding: 32px ${(p) => p.theme.space.insetMd};
  border-radius: ${(p) => p.theme.radius.card};
  background: ${(p) => p.theme.surface.raised};
  text-align: center;

  strong {
    font-size: var(--ds-typography-body-sm-size);
    font-weight: 500;
    color: ${(p) => p.theme.text.secondary};
  }
`;

const EmptyAction = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-block-start: 4px;
  padding: 6px 14px;
  border: none;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.sunken};
  font: inherit;
  font-size: var(--ds-typography-caption-size);
  font-weight: 500;
  color: ${(p) => p.theme.text.primary};
  cursor: pointer;
  &:hover { background: ${(p) => p.theme.surface.muted}; }
`;
