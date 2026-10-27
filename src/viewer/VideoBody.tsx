import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../components/Icon';
import { urlOf, youtubeId } from '../editor/assets';
import type { PopupItem } from '../model/types';

/**
 * 影片只有在這裡才真的載入播放器——一次一支。
 * 編輯畫面上放 iframe 會讓一頁同時載入好幾個外部播放器，
 * 而且它們的非同步版面會攪亂分頁量測。
 *
 * 中央視窗與泡泡共用，所以獨立成一個檔。
 */
export function VideoBody({ item }: { item: Extract<PopupItem, { kind: 'video' }> }) {
  if (item.source === 'youtube') {
    const id = youtubeId(item.ref);
    if (!id) return <Missing>影片網址無法辨識</Missing>;
    return (
      <Embed
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={item.title || '影片'}
        allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }
  // 上傳的影片：ref 存的是 assetId
  const src = urlOf(item.ref || null);
  return src ? <UploadedVideoPlayer src={src} title={item.title} /> : <Missing>影片還沒上傳</Missing>;
}

/** 「還缺什麼」的提示字。檢視器與泡泡都用同一個樣子。 */
export const Missing = styled.span`
  font-size: var(--ds-typography-label-size);
  color: ${(p) => p.theme.feedback.warningDefault};
`;

const Embed = styled.iframe`
  display: block;
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  border: none;
  border-radius: ${(p) => p.theme.radius.field};
`;

/* ── 上傳影片的播放器 ─────────────────────────────────────── */

/** 播放中或游標不動多久後把控制列與上方標題收起來（3-5 秒）。 */
const IDLE_HIDE = 3000;

const fmt = (sec: number): string => {
  if (!Number.isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

/**
 * 上傳影片的自訂播放器。
 *
 * 瀏覽器內建的控制列長什麼樣由各家瀏覽器決定，顏色跟產品對不起來，
 * 平板上的按鈕也小；所以控制列自己畫，影片本身還是交給 <video>。
 * 只有上傳的影片走這裡——YouTube 的播放器在 iframe 裡，改不到。
 *
 * 樣式依 Figma「媒體庫-影片播放器」：上方放置影片標題（3-5 秒淡出、游標移回時浮現），
 * 左邊一顆膠囊放播放鍵、時間、進度條，右邊一顆放音量與全螢幕；播放中游標離開就收起來，hover 回來再浮現。
 */
export function UploadedVideoPlayer({
  src,
  title,
  style,
  autoPlay,
}: {
  src: string;
  title?: string;
  /** 編輯畫面按播放鍵換上來的播放器：一出現就開始播，不必再按一次 */
  autoPlay?: boolean;
  /** 外層算好的尺寸（頁面上的影片框）。沒傳就吃滿寬、照 16:9。 */
  style?: React.CSSProperties;
}) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const idle = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showTitle, setShowTitle] = useState(true);
  const [volumeOpen, setVolumeOpen] = useState(false);

  // 控制列與上方標題的顯示：
  // 載入後顯示 3 秒淡出；播放中游標靜止 3 秒收起；
  // 游標移回畫面時重新浮現（標題與進度條、音量連動）
  const poke = () => {
    setShowControls(true);
    setShowTitle(true);
    if (idle.current) window.clearTimeout(idle.current);
    idle.current = window.setTimeout(() => {
      setShowTitle(false);
      if (video.current && !video.current.paused) setShowControls(false);
    }, IDLE_HIDE);
  };

  useEffect(() => {
    idle.current = window.setTimeout(() => {
      setShowTitle(false);
      if (video.current && !video.current.paused) setShowControls(false);
    }, IDLE_HIDE);
    return () => {
      if (idle.current) window.clearTimeout(idle.current);
    };
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    // play() 很快被 pause 打斷時會 reject，那是正常操作不是錯
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const seek = (ratio: number) => {
    const v = video.current;
    if (!v || !Number.isFinite(v.duration)) return;
    v.currentTime = Math.max(0, Math.min(1, ratio)) * v.duration;
    setTime(v.currentTime);
  };

  const setVol = (val: number) => {
    const v = video.current;
    if (!v) return;
    const next = Math.max(0, Math.min(1, val));
    v.volume = next;
    // 拉到最左就是靜音；再往右拉就自動解除，不必另外按一次喇叭
    v.muted = next === 0;
    setVolume(next);
    setMuted(v.muted);
  };

  const toggleMute = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const fullscreen = () => {
    const el = box.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.();
  };

  return (
    <Player
      ref={box}
      style={style}
      $idle={!showControls && !showTitle}
      onPointerEnter={poke}
      onPointerMove={poke}
      onPointerLeave={() => {
        setShowTitle(false);
        if (playing) setShowControls(false);
      }}
    >
      <Video
        ref={video}
        src={src}
        title={title}
        playsInline
        autoPlay={autoPlay}
        onClick={toggle}
        onPlay={() => { setPlaying(true); poke(); }}
        onPause={() => { setPlaying(false); poke(); }}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onVolumeChange={(e) => { setVolume(e.currentTarget.volume); setMuted(e.currentTarget.muted); }}
      />

      {title && (
        <TitleOverlay $visible={showTitle}>
          <TitlePill>{title}</TitlePill>
        </TitleOverlay>
      )}

      <Controls $visible={showControls} onPointerDown={(e) => e.stopPropagation()}>
        <Pill>
          <Ctl type="button" onClick={toggle} aria-label={playing ? '暫停' : '播放'}>
            <Glyph name={playing ? 'pause' : 'play'} />
          </Ctl>
          <Time>
            {fmt(time)} / {fmt(duration)}
          </Time>
          <Slider
            aria-label="播放進度"
            value={duration > 0 ? time / duration : 0}
            onChange={seek}
          />
        </Pill>

        <Pill
          $compact
          onPointerEnter={() => setVolumeOpen(true)}
          onPointerLeave={() => setVolumeOpen(false)}
        >
          <Ctl type="button" onClick={toggleMute} aria-label={muted ? '取消靜音' : '靜音'}>
            <Glyph name={muted || volume === 0 ? 'volume-x' : 'volume'} />
          </Ctl>
          {/* hover 喇叭才展開音量滑桿，平常收著讓位給進度條 */}
          <VolumeWrap $open={volumeOpen}>
            <Slider aria-label="音量" value={muted ? 0 : volume} onChange={setVol} />
          </VolumeWrap>
          <Ctl type="button" onClick={fullscreen} aria-label="全螢幕">
            <Glyph name="maximize" />
          </Ctl>
        </Pill>
      </Controls>
    </Player>
  );
}

/**
 * 進度條與音量共用的滑桿：一條軌、走過的部分填色、一顆白圓點。
 * 用 <input type=range> 做底，鍵盤與螢幕報讀都有；外觀用 CSS 蓋掉瀏覽器預設。
 * 媒體庫的試聽也用它，所以匯出。
 */
export function Slider({
  value,
  onChange,
  'aria-label': label,
}: {
  value: number;
  onChange: (v: number) => void;
  'aria-label': string;
}) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 1000) / 10;
  return (
    <Range
      type="range"
      min={0}
      max={1000}
      value={Math.round(value * 1000)}
      aria-label={label}
      style={{ '--fill': `${pct}%` } as React.CSSProperties}
      onChange={(e) => onChange(Number(e.target.value) / 1000)}
    />
  );
}

export type GlyphName = 'play' | 'pause' | 'volume' | 'volume-x' | 'maximize';

/** 播放器與音訊控制列共用的圖示包裝，直接對應 design/icons 內的 SVG。 */
export function Glyph({ name, size = 20 }: { name: GlyphName; size?: 16 | 20 | 24 }) {
  return <Icon name={name} size={size} />;
}

const Player = styled.div<{ $idle: boolean }>`
  position: relative;
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  border-radius: ${(p) => p.theme.radius.field};
  background: ${(p) => p.theme.surface.inverse};
  overflow: hidden;
  /* 控制列收起時連游標一起藏，看影片時畫面上不要有東西 */
  cursor: ${(p) => (p.$idle ? 'none' : 'default')};
  /* 直排教材裡播放器也要正著看 */
  writing-mode: horizontal-tb;

  &:fullscreen {
    border-radius: 0;
  }
`;

const Video = styled.video`
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: contain;
`;

const TitleOverlay = styled.div<{ $visible: boolean }>`
  position: absolute;
  inset-inline: 12px;
  inset-block-start: 12px;
  display: flex;
  align-items: center;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 2;
`;

const TitlePill = styled.span`
  display: inline-flex;
  align-items: center;
  max-inline-size: min(80%, 480px);
  /* 跟下方控制列同高（36），兩顆膠囊看起來是同一套 */
  block-size: 36px;
  box-sizing: border-box;
  padding: 0 14px;
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.text.primary};
  font-size: var(--ds-typography-caption-size);
  font-weight: 500;
  line-height: var(--ds-typography-caption-line-height);
  box-shadow: ${(p) => p.theme.shadow.card};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Controls = styled.div<{ $visible: boolean }>`
  position: absolute;
  inset-inline: 12px;
  inset-block-end: 12px;
  display: flex;
  gap: 8px;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  pointer-events: ${(p) => (p.$visible ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
  z-index: 2;
`;

const Pill = styled.div<{ $compact?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  flex: ${(p) => (p.$compact ? 'none' : 1)};
  min-inline-size: 0;
  block-size: 36px;
  padding: 0 6px;
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.text.primary};
  box-shadow: ${(p) => p.theme.shadow.card};
`;

const Ctl = styled.button`
  /* 按鈕預設左右各 6px 內距，小按鈕扣掉後會把圖示擠歪 */
  padding: 0;
  display: grid;
  place-items: center;
  flex: none;
  inline-size: 28px;
  block-size: 28px;
  border: none;
  border-radius: ${(p) => p.theme.radius.control};
  background: transparent;
  color: ${(p) => p.theme.icon.default};
  cursor: pointer;

  &:hover { background: ${(p) => p.theme.action.ghostBgHover}; }
`;

const Time = styled.span`
  flex: none;
  font-size: var(--ds-typography-caption-size);
  font-variant-numeric: tabular-nums;
  color: ${(p) => p.theme.text.secondary};
  white-space: nowrap;
`;

/** hover 才展開；用 inline-size 由 0 變寬，膠囊會跟著長出來 */
const VolumeWrap = styled.div<{ $open: boolean }>`
  inline-size: ${(p) => (p.$open ? '96px' : '0')};
  overflow: hidden;
  transition: inline-size 0.16s;
  display: flex;
  align-items: center;
`;

/*
 * 滑桿：走過的部分用 --fill 畫在軌道上。
 * 軌道用 media 色、走過的用次要文字色、圓點是白的加陰影——跟 Figma 的播放器一致。
 */
const Range = styled.input`
  flex: 1;
  min-inline-size: 72px;
  block-size: 20px;
  margin: 0;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  cursor: pointer;

  &::-webkit-slider-runnable-track {
    block-size: 4px;
    border-radius: 999px;
    background: linear-gradient(
      to right,
      ${(p) => p.theme.text.secondary} 0 var(--fill),
      ${(p) => p.theme.surface.media} var(--fill) 100%
    );
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    inline-size: 14px;
    block-size: 14px;
    margin-block-start: -5px;
    border-radius: 999px;
    border: none;
    background: ${(p) => p.theme.surface.raised};
    box-shadow: ${(p) => p.theme.shadow.card};
  }
  &::-moz-range-track {
    block-size: 4px;
    border-radius: 999px;
    background: ${(p) => p.theme.surface.media};
  }
  &::-moz-range-progress {
    block-size: 4px;
    border-radius: 999px;
    background: ${(p) => p.theme.text.secondary};
  }
  &::-moz-range-thumb {
    inline-size: 14px;
    block-size: 14px;
    border-radius: 999px;
    border: none;
    background: ${(p) => p.theme.surface.raised};
    box-shadow: ${(p) => p.theme.shadow.card};
  }
`;
