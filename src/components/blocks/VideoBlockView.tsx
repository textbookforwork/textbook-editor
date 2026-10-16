import { useEffect, useRef, useState } from 'react';
import { CompactAction, emptyCompactCss } from './emptyCompact';
import { primaryButtonCss } from '../buttonStyles';
import { fieldCss } from '../../editor/SidePanel';
import styled from 'styled-components';
import { Icon } from '../Icon';
import { pickFile, putFile, urlOf, youtubeId } from '../../editor/assets';
import { UploadedVideoPlayer } from '../../viewer/VideoBody';
import { usePopupViewer } from '../../viewer/PopupViewer';
import type { BlockPatch } from '../../model/actions';
import type { VideoBlock } from '../../model/types';

type Props = {
  block: VideoBlock;
  boxStyle?: React.CSSProperties;
  onPatch?: (patch: BlockPatch) => void;
  onSelect?: () => void;
};

/**
 * 影片。
 *
 * 編輯時只放縮圖與標題，不掛 iframe——一頁上有五支影片就是五個外部
 * 播放器同時載入，編輯會整個卡住，而且分頁量測會被 iframe 的非同步
 * 版面改變攪亂。真正的播放在檢視台，那時候一次只有一支。
 *
 * YouTube 的縮圖是靜態圖片，沒有這個問題。
 *
 * 唯讀（預覽、學生端）時上傳的影片直接換成自訂播放器——一次只看一頁，
 * 一頁上的播放器數量有限；而且尺寸是外層算好的，播放器不會改變版面。
 * YouTube 維持原樣（iframe 裡的控制列改不到）。
 *
 * 編輯時按中間的播放鍵，只有這一支在原地換成播放器——老師不必切到預覽就能確認放對了影片，
 * 同時間也只有一個播放器。點框的其他地方是選取（拖外框改大小照舊）；
 * 點到這個元件以外的地方就停播、換回靜態框。
 */
export function VideoBlockView({ block, boxStyle, onPatch, onSelect }: Props) {
  const id = block.source === 'youtube' ? youtubeId(block.ref) : null;
  const poster = id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
  const uploadedUrl = block.source === 'upload' ? urlOf(block.ref) : undefined;
  const uploaded = !!uploadedUrl;
  const ready = !!poster || uploaded;
  // 側欄縮圖也是唯讀的 RowView，但那裡沒有檢視器（WithoutPopupViewer）——
  // 縮圖只畫靜態的框，不然每一頁的縮圖都會多載一個 <video>
  const viewer = usePopupViewer();
  const [playing, setPlaying] = useState(false);
  const figRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!playing) return;
    const shell = figRef.current?.closest('[data-block-id]') ?? figRef.current;
    const onDown = (e: PointerEvent) => {
      if (!shell?.contains(e.target as Node)) setPlaying(false);
    };
    window.addEventListener('pointerdown', onDown, true);
    return () => window.removeEventListener('pointerdown', onDown, true);
  }, [playing]);

  // 唯讀（閱讀模式、大彈窗）的 YouTube：直接放播放器。不然學生看到的是一張點了沒反應的縮圖
  if (!onPatch && viewer && id) {
    return (
      <Figure>
        <Embed
          style={boxStyle}
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={block.title || 'YouTube 影片'}
          allow="encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </Figure>
    );
  }

  if (!onPatch && uploadedUrl && viewer) {
    return (
      <Figure>
        <UploadedVideoPlayer src={uploadedUrl} title={block.title} style={boxStyle} />
      </Figure>
    );
  }

  if (onPatch && playing && ready) {
    return (
      <Figure ref={figRef} onPointerDown={onSelect}>
        {uploadedUrl ? (
          <UploadedVideoPlayer src={uploadedUrl} title={block.title} style={boxStyle} autoPlay />
        ) : (
          <Embed
            style={boxStyle}
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
            title={block.title || 'YouTube 影片'}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}
      </Figure>
    );
  }

  return (
    <Figure ref={figRef} onPointerDown={onSelect}>
      <Frame style={boxStyle} $poster={poster} $empty={!ready && !poster}>
        {ready ? (
          <Play
            as={onPatch ? 'button' : 'span'}
            type={onPatch ? 'button' : undefined}
            aria-label={onPatch ? '在這裡播放' : undefined}
            title={onPatch ? '在這裡播放' : undefined}
            $live={!!onPatch}
            onClick={onPatch ? () => setPlaying(true) : undefined}
          >
            <Icon name="play" size={24} />
          </Play>
        ) : (
          onPatch && <Source block={block} onPatch={onPatch} onSelect={onSelect} />
        )}
        {!ready && !onPatch && <Missing>還沒設定影片來源</Missing>}
      </Frame>
    </Figure>
  );
}

/** 跟圖片同一招：table 排版讓標題跟著影片框的寬度，外框不會比框大。 */
const Figure = styled.figure`
  margin: 0;
  display: table;
  inline-size: auto;
`;

/**
 * 還沒設定來源時的兩條路。
 *
 * 上傳走的是 session 內的暫存（assets.ts），重新整理就沒了——
 * 真正的上傳與 CDN 屬於後端。但「貼一個 YouTube 網址」不需要
 * 任何後端，所以這裡就要能做完，否則插進來的影片是一條死路。
 */
function Source({
  block,
  onPatch,
  onSelect,
}: {
  block: VideoBlock;
  onPatch: (patch: BlockPatch) => void;
  onSelect?: () => void;
}) {
  const upload = async () => {
    const file = await pickFile('video/*');
    if (!file) return;
    onPatch({ source: 'upload', ref: putFile(file), title: block.title || file.name });
  };
  const stop = (e: React.PointerEvent) => {
    onSelect?.();
    e.stopPropagation();
  };
  return (
    <>
    <Pick data-full onPointerDown={stop}>
      <Url
        defaultValue={block.source === 'youtube' ? block.ref : ''}
        placeholder="貼上 YouTube 網址"
        onBlur={(e) => {
          const v = e.target.value.trim();
          if (v) onPatch({ source: 'youtube', ref: v });
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.currentTarget.blur();
        }}
      />
      <Or>或</Or>
      <Upload onClick={upload}>
        上傳影片
        <Icon name="upload" size={16} />
      </Upload>
    </Pick>
    {/* 框太小放不下網址欄與上傳鈕（見 emptyCompact）：只留「上傳影片」，再小只剩影片圖示 */}
    <CompactAction label="上傳影片" action="upload" kind="video" onPointerDown={stop} onClick={upload} />
    </>
  );
}

const Frame = styled.div<{ $poster: string | null; $empty: boolean }>`
  position: relative;
  display: grid;
  place-items: center;
  border-radius: ${(p) => p.theme.radius.field};
  /* 還沒有來源時跟空的圖片同一種樣子：淡底虛線，不是一塊深灰 */
  border: ${(p) => p.theme.border.widthDefault} ${(p) => (p.$empty ? 'dashed' : 'solid')}
    ${(p) => (p.$empty ? p.theme.border.default : 'transparent')};
  background: ${(p) => (p.$empty ? p.theme.surface.page : p.theme.surface.media)}
    ${(p) => (p.$poster ? `center / cover url(${p.$poster})` : '')};
  overflow: hidden;
  ${(p) => p.$empty && emptyCompactCss}
`;

const Play = styled.span<{ $live: boolean }>`
  display: grid;
  place-items: center;
  inline-size: 56px;
  block-size: 56px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.text.accent};
  box-shadow: 0 6px 18px rgba(26, 25, 23, 0.28);
  cursor: ${(p) => (p.$live ? 'pointer' : 'default')};
  transition: transform 0.12s;
  ${(p) => p.$live && '&:hover { transform: scale(1.08); }'}
`;

const Embed = styled.iframe`
  display: block;
  border: none;
  border-radius: ${(p) => p.theme.radius.field};
  background: ${(p) => p.theme.surface.inverse};
`;

const Missing = styled.span`
  position: absolute;
  inset-block-end: 8px;
  font-size: var(--ds-typography-caption-size);
  color: ${(p) => p.theme.text.secondary};
`;



const Pick = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px;
  inline-size: 100%;
  /* 直排時這一組控制項要正著看 */
  writing-mode: horizontal-tb;
`;

const Url = styled.input`
  ${fieldCss}
  font-size: var(--ds-typography-body-size);
  /* 跟圖片的「描述要生成的圖片」同一款灰膠囊：平常無框，打字時白底加灰框，不疊瀏覽器的焦點外圈 */
  inline-size: min(280px, 100%);
  min-block-size: 40px;
  padding: 0 16px;
  box-sizing: border-box;
  &:focus-visible { outline: none; }
`;

const Or = styled.span`
  font-size: var(--ds-typography-body-sm-size);
  color: ${(p) => p.theme.text.tertiary};
`;

const Upload = styled.button`
  ${primaryButtonCss}
`;
