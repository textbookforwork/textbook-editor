import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Icon } from '../components/Icon';
import { POPUP_KIND, missingOf, titleOf } from '../model/popups';
import { getAsset, urlOf, youtubeId } from '../editor/assets';
import { placeBubble, placeBubbleVertical, type Placement } from './bubblePlacement';
import { Missing } from './VideoBody';
import type { Block, PopupItem } from '../model/types';

/**
 * 泡泡要跟著什麼。
 *
 * 傳元素進來，泡泡才能在捲動時跟著它、也才知道被點的元件在哪
 * （角標是元件外框的直接子元素，父層就是元件）。
 * 傳 DOMRect 只是一次性的位置快照，給沒有元素可傳的呼叫端用。
 */
export type Anchor = DOMRect | Element;

type AudioItem = Extract<PopupItem, { kind: 'audio' }>;

type Props = {
  block: Block;
  item: PopupItem;
  anchor: Anchor;
  onClose: () => void;
  onJump?: (rowId: string) => void;
  /** 編輯模式才有：從泡泡直接去改這個元件的補充。 */
  onEdit?: (blockId: string) => void;
  /**
   * 掛了好幾項：泡泡裡改成一排縮圖卡（照 Figma 補充資源的彈出狀態），不放標題列。
   * 點一張就由 PopupViewer 換成那一項的畫面，返回會回到這個泡泡。
   */
  items?: PopupItem[];
  onPick?: (item: PopupItem) => void;
};

const rectOf = (a: Anchor) => (a instanceof Element ? a.getBoundingClientRect() : a);
const targetOf = (a: Anchor) =>
  a instanceof Element && a.parentElement ? a.parentElement.getBoundingClientRect() : rectOf(a);

const samePlace = (a: Placement, b: Placement) =>
  a.top === b.top && a.left === b.left && a.side === b.side && a.arrow === b.arrow;

/**
 * 錨點在直排書裡。先看它自己的書寫方向，再看它在哪一頁：
 * 圖形、圖片這類元件的外框本身是橫的（只有裡面的字直排），光看自己會判斷成橫排。
 * 單段轉成橫排的段落（data-horizontal）照它自己的方向。
 */
export const isVertical = (a: Anchor) =>
  a instanceof Element &&
  (getComputedStyle(a).writingMode.startsWith('vertical') ||
    (!a.closest('[data-horizontal]') && !!a.closest('[data-vertical]')));

/**
 * 只掛一項時直接彈出的泡泡。
 *
 * 用 portal 掛到 body、以視窗座標定位——頁面是 overflow: hidden 又整頁縮放的畫布，
 * 留在裡面會被邊緣裁掉、字也會跟著縮小（跟插入面板、浮動膠囊同一條理由）。
 * 位置規則在 bubblePlacement.ts，這裡只負責量尺寸、聽事件、畫出來。
 */
export function Bubble({ block, item, anchor, onClose, onJump, onEdit, items, onPick }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [place, setPlace] = useState<Placement | null>(null);
  const vertical = isVertical(anchor);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => {
      // 角標被重畫掉了（內容改了、換了頁），泡泡就沒有可以跟的東西
      if (anchor instanceof Element && !anchor.isConnected) {
        onClose();
        return;
      }
      // 量真實尺寸不要用估的——內容會隨圖、播放器載入而變
      const box = el.getBoundingClientRect();
      const next = (vertical ? placeBubbleVertical : placeBubble)(
        rectOf(anchor),
        targetOf(anchor),
        { width: box.width, height: box.height },
        { width: window.innerWidth, height: window.innerHeight }
      );
      setPlace((prev) => (prev && samePlace(prev, next) ? prev : next));
    };
    read();
    window.addEventListener('scroll', read, true);
    window.addEventListener('resize', read);
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(read);
    ro?.observe(el);
    return () => {
      window.removeEventListener('scroll', read, true);
      window.removeEventListener('resize', read);
      ro?.disconnect();
    };
  }, [anchor, onClose, vertical]);

  // 點泡泡外面就關。用 capture 是因為角標會把 pointerdown 擋下來不冒泡
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (ref.current?.contains(e.target as Node)) return;
      onClose();
    };
    document.addEventListener('pointerdown', onDown, true);
    return () => document.removeEventListener('pointerdown', onDown, true);
  }, [onClose]);

  const missing = missingOf(item);
  const side = place?.side ?? 'above';
  // 量到尺寸之前先藏著，不然會先閃一下在左上角
  const style = place
    ? { top: place.top, left: place.left }
    : { top: 0, left: 0, visibility: 'hidden' as const };

  // 單一音檔：跟多個音檔同一種列，泡泡彈出就直接播放
  if (!items && item.kind === 'audio' && !missingOf(item)) {
    return createPortal(
      <Shell ref={ref} role="dialog" aria-label={`補充內容：${titleOf(item)}`} style={style} $wide $vertical={vertical}>
        <Arrow $side={side} $at={place?.arrow ?? 0} />
        <AudioList items={[item]} autoPlay />
      </Shell>,
      document.body
    );
  }

  // 單一跳轉：泡泡本身就是那一列（目的地＋↗），整顆按下去就跳，不再放一顆大黑鈕
  if (!items && item.kind === 'jump' && !missingOf(item)) {
    return createPortal(
      <Shell ref={ref} role="dialog" aria-label={`補充內容：${titleOf(item)}`} style={style} $wide $vertical={vertical}>
        <Arrow $side={side} $at={place?.arrow ?? 0} />
        <Rows $bare>
          <TextRow
            type="button"
            $bare
            onClick={() => {
              onClose();
              if (item.targetRowId) onJump?.(item.targetRowId);
            }}
          >
            <TextCol>
              <TextHead>{item.title.trim() || '前往'}</TextHead>
            </TextCol>
            <JumpIcon $vertical={vertical} name="arrow-up-right" size={20} />
          </TextRow>
        </Rows>
      </Shell>,
      document.body
    );
  }

  if (items && onPick) {
    // 文字、跳轉、聲音是一列一列的字，直排書裡跟著直排；縮圖卡維持橫的，改成由上往下疊
    const textual = items.every((it) => it.kind === 'text' || it.kind === 'jump' || it.kind === 'audio');
    return createPortal(
      <Shell ref={ref} role="dialog" aria-label={`補充內容 ${items.length} 項`} style={style} $wide $vertical={vertical && textual}>
        <Arrow $side={side} $at={place?.arrow ?? 0} />
        {items.every((it) => it.kind === 'audio') ? (
          <AudioList items={items as AudioItem[]} />
        ) : items.every((it) => it.kind === 'jump') ? (
          /* 跳轉沒有內容可以預覽：直排一列一個目的地，右邊是前往的箭頭 */
          <Rows>
            {items.map((it) => (
              <TextRow key={it.id} type="button" onClick={() => onPick(it)}>
                <TextCol>
                  <TextHead>{it.title.trim() || '前往'}</TextHead>
                </TextCol>
                <JumpIcon $vertical={vertical} name="arrow-up-right" size={20} />
              </TextRow>
            ))}
          </Rows>
        ) : items.every((it) => it.kind === 'text') ? (
          /* 文字沒有畫面可以當縮圖：直排一列一則 */
          <Rows>
            {items.map((it) => (
              <TextRow key={it.id} type="button" onClick={() => onPick(it)}>
                {/* 只放標題；沒寫標題才用內文開頭（兩行）讓學生分得出是哪一則 */}
                <TextCol>
                  {it.title.trim() ? (
                    <TextHead>{it.title}</TextHead>
                  ) : (
                    it.kind === 'text' && <Excerpt $lines={2}>{it.body}</Excerpt>
                  )}
                </TextCol>
                {/* 直排的「往下讀」是往下，箭頭跟著轉 */}
                <Icon name={vertical ? 'chevron-down' : 'chevron-right'} size={20} />
              </TextRow>
            ))}
          </Rows>
        ) : (
        <Cards $vertical={vertical}>
          {items.map((it) => (
            <Card key={it.id} type="button" onClick={() => onPick(it)}>
              <Thumb item={it} />
              {/* 老師沒寫標題就不放字，不補「圖片」這種種類名 */}
              {it.title.trim() && <CardTitle>{it.title}</CardTitle>}
            </Card>
          ))}
        </Cards>
        )}
      </Shell>,
      document.body
    );
  }

  return createPortal(
    <Shell ref={ref} role="dialog" aria-label={`補充內容：${titleOf(item)}`} style={style} $vertical={vertical}>
      <Arrow $side={side} $at={place?.arrow ?? 0} />
      {/* 沒寫標題：不留標題列，按鈕浮在右上角，內文從原本標題的位置開始 */}
      <Head $float={!item.title.trim()}>
        {/* 學生端的泡泡不放種類圖示：內容本身就看得出是什麼，標題直接開頭 */}
        {/* 沒寫標題就留白，不補種類名 */}
        <Title>{item.title.trim()}</Title>
        {onEdit && (
          <Ghost
            onClick={() => {
              onClose();
              onEdit(block.id);
            }}
            aria-label="編輯補充內容"
            title="編輯補充內容"
          >
            <Icon name="pencil" size={16} />
          </Ghost>
        )}
        <Ghost onClick={onClose} aria-label="關閉">
          <Icon name="x" size={16} label="關閉" />
        </Ghost>
      </Head>
      <Body $top={!item.title.trim()} $vertical={vertical}>
        {missing ? (
          <Missing>{missing}</Missing>
        ) : (
          <Content item={item} />
        )}
      </Body>
    </Shell>,
    document.body
  );
}

/**
 * 好幾段聲音：直排一列一段，左邊播放鍵、右邊檔名，按了就在原地播（照 Figma「多個音檔」）。
 * 同時只放一段；播放中的那顆換成暫停，外圈畫進度。
 */
function AudioList({ items, autoPlay = false }: { items: AudioItem[]; autoPlay?: boolean }) {
  // 只有一段：泡泡本身就是播放器，不再包一條膠囊（框裡又一個框）
  const bare = items.length === 1;
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => () => audio.current?.pause(), []);
  // 只有一段：點下去就是要聽，泡泡彈出來就開始播
  useEffect(() => {
    if (autoPlay && items[0]) toggle(items[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const toggle = (it: AudioItem) => {
    if (playing === it.id) {
      audio.current?.pause();
      setPlaying(null);
      return;
    }
    audio.current?.pause();
    const a = new Audio(urlOf(it.assetId));
    a.ontimeupdate = () => setProgress(a.duration ? a.currentTime / a.duration : 0);
    a.onended = () => {
      setPlaying(null);
      setProgress(0);
    };
    audio.current = a;
    setProgress(0);
    setPlaying(it.id);
    // 被下一段打斷（或開發模式重跑效果）時 play() 會被拒絕，那是預期的，不當錯誤
    a.play().catch(() => {});
  };
  return (
    <Rows $bare={bare}>
      {items.map((it) => {
        const on = playing === it.id;
        return (
          <AudioRow key={it.id} $bare={bare}>
            <PlayBtn type="button" $on={on} onClick={() => toggle(it)} aria-label={on ? `暫停 ${titleOf(it)}` : `播放 ${titleOf(it)}`}>
              {on && (
                <Ring viewBox="0 0 36 36" aria-hidden>
                  <circle cx="18" cy="18" r="17" pathLength={1} strokeDasharray={`${progress} 1`} />
                </Ring>
              )}
              <Icon name={on ? 'pause' : 'play'} size={16} />
            </PlayBtn>
            {/* 沒寫標題就顯示檔名 */}
            <RowTitle>{it.title.trim() || (it.assetId && getAsset(it.assetId)?.name) || ''}</RowTitle>
          </AudioRow>
        );
      })}
    </Rows>
  );
}

/** 卡片縮圖：圖片、影片看得到畫面；其他種類放大大的種類圖示 */
function Thumb({ item }: { item: PopupItem }) {
  if (item.kind === 'image' && item.assetId) return <ThumbBox><img src={urlOf(item.assetId)} alt="" /></ThumbBox>;
  if (item.kind === 'video') {
    const yt = item.source === 'youtube' ? youtubeId(item.ref) : null;
    if (yt) return <ThumbBox><img src={`https://img.youtube.com/vi/${yt}/hqdefault.jpg`} alt="" /></ThumbBox>;
    const src = urlOf(item.ref);
    if (src) return <ThumbBox><video src={`${src}#t=0.1`} muted preload="metadata" playsInline /></ThumbBox>;
  }
  return (
    <ThumbBox $icon>
      <Icon name={POPUP_KIND[item.kind].icon} size={24} />
    </ThumbBox>
  );
}

/**
 * 小泡泡裡攤開的內容。現在只剩文字會走到這裡：
 * 聲音、跳轉在上面另有一列的畫法；圖片、影片、網頁、大彈窗只掛一項時由 PopupViewer 直接開大視窗。
 * 其餘幾支留著是讓 switch 窮盡，之後加新的 kind 漏了會編譯失敗。
 */
function Content({ item }: { item: PopupItem }) {
  switch (item.kind) {
    case 'text':
      return <Text>{item.body}</Text>;
    case 'image':
    case 'video':
    case 'web':
    case 'rich':
    case 'audio':
    case 'jump':
      return null;
  }
}

const Shell = styled.div<{ $wide?: boolean; $vertical?: boolean }>`
  position: fixed;
  /* 在浮動膠囊（900）與編輯面板（950）之上、遮罩（1000）之下 */
  z-index: 960;
  /* 直排：由右往左排，行內方向（inline）變成上下，所以上限改看視窗高 */
  ${(p) => p.$vertical && 'writing-mode: vertical-rl;'}
  /*
   * 直排的列（文字、聲音、跳轉）高度跟著最長的標題縮，不固定撐到 360——標題常常只有幾個字。
   * 關閉鈕釘在右上角（跟點開後的視窗同一個位置），標題一欄排在它左邊。
   */
  ${(p) =>
    p.$vertical &&
    `& > div { inline-size: auto; min-inline-size: 160px; max-inline-size: min(360px, calc(100vh - 24px)); }
     & > header { margin-right: 40px; padding-top: 16px; }
     & > header > button:last-of-type { position: absolute; top: 8px; right: 8px; }`}
  ${(p) => {
    const vp = p.$vertical ? '100vh' : '100vw';
    return p.$wide
      ? `inline-size: max-content; max-inline-size: calc(${vp} - 24px);`
      : `inline-size: min(360px, calc(${vp} - 24px));`;
  }}
  display: flex;
  flex-direction: column;
  background: ${(p) => p.theme.surface.raised};
  /* 不畫框線，只靠陰影浮起來（跟其他浮層一樣） */
  /* 圓角要比尖角的內縮（ARROW_INSET）小，尖角才不會畫到弧線上 */
  border-radius: ${(p) => p.theme.radius.tile};
  box-shadow: ${(p) => p.theme.shadow.float};
`;

/*
 * 尖角：一個轉 45 度的小方塊，一半藏在本體後面。
 * 12px 的方塊對角線約 17px，露出來的那一半約 8.5px，對應 ARROW_HEIGHT。
 * 邊線只畫露出來的兩邊，看起來才像從本體長出來的。
 */
/* 用實體的 width / height / top / left：泡泡直排時邏輯軸會轉向，尖角不能跟著轉 */
const Arrow = styled.span<{ $side: Placement['side']; $at: number }>`
  position: absolute;
  width: 12px;
  height: 12px;
  background: ${(p) => p.theme.surface.raised};
  ${(p) => {
    switch (p.$side) {
      case 'above':
        return `bottom: -6px; left: ${p.$at}px; transform: translateX(-50%) rotate(45deg);`;
      case 'below':
        return `top: -6px; left: ${p.$at}px; transform: translateX(-50%) rotate(45deg);`;
      case 'left':
        return `right: -6px; top: ${p.$at}px; transform: translateY(-50%) rotate(45deg);`;
      case 'right':
        return `left: -6px; top: ${p.$at}px; transform: translateY(-50%) rotate(45deg);`;
    }
  }}
  pointer-events: none;
`;

/** 標題列：圖示、標題、編輯與關閉兩顆小圓鈕；不畫分隔線，跟內文之間只靠留白分開 */
const Head = styled.header<{ $float?: boolean }>`
  ${(p) => p.$float && 'position: absolute; top: 0; right: 0; z-index: 1;'}
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.gapSm};
  padding: ${(p) => p.theme.space.insetXs} ${(p) => p.theme.space.insetXs} 0 ${(p) => p.theme.space.insetMd};
`

const Title = styled.strong`
  flex: 1;
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 500;
`

const Ghost = styled.button`
  display: grid;
  place-items: center;
  flex: none;
  inline-size: 32px;
  block-size: 32px;
  padding: 0;
  border: none;
  background: transparent;
  color: ${(p) => p.theme.icon.secondary};
  cursor: pointer;
  border-radius: ${(p) => p.theme.radius.control};

  &:hover { background: ${(p) => p.theme.action.ghostBgHover}; color: ${(p) => p.theme.icon.default}; }
`

const Body = styled.div<{ $top?: boolean; $vertical?: boolean }>`
  padding: ${(p) => p.theme.space.gapXs} ${(p) => p.theme.space.insetMd} ${(p) => p.theme.space.insetMd};
  /* 內文很長時在泡泡裡捲，不要把泡泡撐到比視窗高 */
  max-block-size: min(60vh, 480px);
  overflow: auto;
  /* 沒標題時：上緣對齊原本標題那一行，右邊讓出按鈕的位置 */
  /* 直排時按鈕仍在右上角，要讓開的是第一行的開頭（上方），不是結尾 */
  ${(p) =>
    p.$top &&
    (p.$vertical
      ? `padding-block-start: ${p.theme.space.insetMd}; padding-inline-start: 48px;`
      : `padding-block-start: ${p.theme.space.insetMd}; padding-inline-end: 48px;`)}
`;

const Text = styled.p`
  margin: 0;
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
  color: ${(p) => p.theme.text.secondary};
  white-space: pre-wrap;
`;

/**
 * 多項：一排卡片，超過視窗寬就左右滑。
 * 直排書裡改成由上往下疊（泡泡在元件左邊，橫著排會寬到放不下），超過高度就上下捲。
 */
const Cards = styled.div<{ $vertical?: boolean }>`
  display: flex;
  ${(p) => p.$vertical && 'flex-direction: column; max-height: min(70vh, 560px);'}
  gap: ${(p) => p.theme.space.gapMd};
  padding: ${(p) => p.theme.space.insetMd};
  overflow: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const Card = styled.button`
  flex: none;
  inline-size: 200px;
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.gapSm};
  padding: 0;
  border: none;
  background: transparent;
  font: inherit;
  text-align: start;
  cursor: pointer;
  &:hover img, &:hover video { transform: scale(1.04); }
  &:hover > span:first-child { background: ${(p) => p.theme.surface.muted}; }
`;

const ThumbBox = styled.span<{ $icon?: boolean }>`
  display: grid;
  place-items: center;
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.field};
  background: ${(p) => p.theme.surface.sunken};
  color: ${(p) => p.theme.icon.secondary};
  transition: background 0.15s;
  img, video {
    inline-size: 100%;
    block-size: 100%;
    object-fit: cover;
    transition: transform 0.2s;
    pointer-events: none;
  }
`;

const CardTitle = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-body-sm-size);
  color: ${(p) => p.theme.text.secondary};
`;

const Rows = styled.div<{ $bare?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.gapSm};
  inline-size: min(360px, calc(100vw - 24px), calc(100vh - 24px));
  padding: ${(p) => p.theme.space.insetMd};
  box-sizing: border-box;
  /* 三段以上在泡泡裡捲，露出下一段的一角，看得出還有 */
  max-block-size: 340px;
  overflow: auto;
  ${(p) => p.$bare && `padding: ${p.theme.space.insetSm} ${p.theme.space.insetMd};`}
`;

/** 一段聲音：跟課本頁上的聲音條同一款（淡灰膠囊、白色圓播放鍵） */
const AudioRow = styled.div<{ $bare?: boolean }>`
  flex: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 12px;
  min-block-size: 56px;
  /* 用邏輯方向：直排時膠囊是直的，留白在上下兩端 */
  padding-block: 0;
  padding-inline: 12px;
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  border-radius: 999px;
  background: ${(p) => p.theme.surface.sunken};
  ${(p) => p.$bare && 'min-block-size: 0; padding: 0; border: none; background: transparent;'}
  ${(p) => p.$bare && `button { border: ${p.theme.border.widthDefault} solid ${p.theme.border.subtle}; box-shadow: none; }`}
`

const PlayBtn = styled.button<{ $on: boolean }>`
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  inline-size: 36px;
  block-size: 36px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.raised};
  box-shadow: ${(p) => p.theme.shadow.card};
  color: ${(p) => p.theme.icon.default};
  cursor: pointer;
  &:hover { background: ${(p) => p.theme.surface.page}; }
`

const Ring = styled.svg`
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  transform: rotate(-90deg);
  pointer-events: none;
  circle {
    fill: none;
    stroke: ${(p) => p.theme.icon.default};
    stroke-width: 2;
  }
`

const RowTitle = styled.span`
  flex: 1;
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-body-sm-size);
  color: ${(p) => p.theme.text.primary};
`

const TextRow = styled.button<{ $bare?: boolean }>`
  flex: none;
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.gapMd};
  padding: ${(p) => p.theme.space.insetSm} ${(p) => p.theme.space.insetMd};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  border-radius: ${(p) => p.theme.radius.tile};
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.icon.secondary};
  font: inherit;
  text-align: start;
  cursor: pointer;
  &:hover { background: ${(p) => p.theme.surface.sunken}; color: ${(p) => p.theme.icon.default}; }
  ${(p) => p.$bare && `border-color: transparent; padding-inline: ${p.theme.space.insetSm};`}
`;

/** 跳轉的箭頭：直排書指向左下（↙），跟直排往下讀、往左翻的方向一致。 */
const JumpIcon = styled(Icon)<{ $vertical?: boolean }>`
  flex: none;
  ${(p) => p.$vertical && 'transform: rotate(180deg);'}
`;

const TextCol = styled.span`
  flex: 1;
  min-inline-size: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TextHead = styled.strong`
  font-size: var(--ds-typography-body-size);
  font-weight: 500;
  color: ${(p) => p.theme.text.primary};
`;

const Excerpt = styled.span<{ $lines: number }>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(p) => p.$lines};
  overflow: hidden;
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
  color: ${(p) => p.theme.text.secondary};
`;
