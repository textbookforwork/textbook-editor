import { useState } from 'react';
import { primaryButtonCss } from '../buttonStyles';
import styled from 'styled-components';
import { CompactAction, emptyCompactCss } from './emptyCompact';
import { Icon } from '../Icon';
import { pickFile, putImage, urlOf } from '../../editor/assets';
import { toast } from '../../editor/Toast';
import { sampleCredit } from '../../editor/sampleMedia';
import { ImageCropper, setCroppingId, useCroppingId } from './ImageCropper';
import type { BlockPatch } from '../../model/actions';
import type { ImageBlock } from '../../model/types';

type Props = {
  block: ImageBlock;
  /** 媒體框的實際尺寸，跟量測用的是同一個函式算出來的。 */
  boxStyle?: React.CSSProperties;
  /** 唯讀（預覽、檢視台）時不傳。 */
  onPatch?: (patch: BlockPatch) => void;
  onSelect?: () => void;
};

/**
 * 圖片。
 *
 * 上傳時一定要把真實的 naturalWidth / naturalHeight 寫回 aspectRatio——
 * md 匯入只有檔名，比例是估的，分頁算出來的高度就會跟畫面差一截。
 * 這裡是整個系統唯一拿得到真實尺寸的地方。
 */
export function ImageBlockView({ block, boxStyle, onPatch, onSelect }: Props) {
  const [busy, setBusy] = useState(false);
  const [prompt, setPrompt] = useState(block.aiPrompt ?? '');
  const src = urlOf(block.assetId);
  const credit = sampleCredit(block.assetId);
  const cropping = useCroppingId() === block.id && !!onPatch;

  const upload = async () => {
    if (!onPatch || busy) return;
    const file = await pickFile('image/*');
    if (!file) return;
    setBusy(true);
    try {
      const { assetId, aspectRatio } = await putImage(file);
      // 比例跟著圖一起寫回去，兩個欄位必須同時更新，
      // 否則會出現「新的圖、舊的比例」那一幀
      onPatch({ assetId, aspectRatio, alt: block.alt || file.name });
    } finally {
      setBusy(false);
    }
  };

  const generate = () => {
    if (!onPatch) return;
    const v = prompt.trim();
    if (!v) {
      toast('請先輸入要生成的圖片描述');
      return;
    }
    onPatch({ aiPrompt: v });
    toast('原型還沒接上生成模型');
  };

  return (
    <Figure onPointerDown={onSelect}>
      {src ? (
        <Box style={boxStyle} $cropping={cropping}>
          {/* 有裁切時，整張圖放大、往左上移，框只露出裁切那一塊（框本身的比例已經是裁切後的） */}
          <Media
            src={src}
            alt={block.alt}
            style={
              block.crop
                ? {
                    position: 'absolute',
                    width: `${100 / block.crop.w}%`,
                    height: `${100 / block.crop.h}%`,
                    left: `${(-block.crop.x / block.crop.w) * 100}%`,
                    top: `${(-block.crop.y / block.crop.h) * 100}%`,
                    maxWidth: 'none',
                    objectFit: 'fill',
                    borderRadius: 0,
                  }
                : block.blockSize != null
                  ? { objectFit: 'cover' } /* 老師單獨拉過一邊：框的比例跟圖不同，裁成填滿，不留白邊 */
                  : undefined
            }
          />
          {cropping && onPatch && typeof boxStyle?.width === 'number' && typeof boxStyle?.height === 'number' && (
            <ImageCropper
              src={src}
              crop={block.crop}
              boxW={boxStyle.width}
              boxH={boxStyle.height}
              onCancel={() => setCroppingId(null)}
              onDone={(crop) => {
                // 裁切決定了比例，之前單獨拉過的框高就不再適用
                onPatch({ crop, blockSize: undefined });
                setCroppingId(null);
              }}
            />
          )}
          {/* 開放授權的範例圖要標示作者與授權。疊在圖上、不佔版面——
              圖說下面多一行會改變高度，跟分頁量到的對不起來 */}
          {credit && (
            <Credit
              href={credit.source}
              target="_blank"
              rel="noreferrer"
              onPointerDown={(e) => e.stopPropagation()}
              title={`${credit.author}｜${credit.license}`}
            >
              {credit.author} · {credit.license}
            </Credit>
          )}
        </Box>
      ) : (
        <EmptyFrame style={boxStyle}>
          {onPatch ? (
            // 點在描述框、上傳鈕這一區也要選取元件（不然要點兩次）；只是不往外傳，免得畫布當成點空白處
            <Pick
              data-full
              onPointerDown={(e) => {
                onSelect?.();
                e.stopPropagation();
              }}
            >
              <PromptBar>
                <PromptInput
                  value={prompt}
                  placeholder="描述要生成的圖片"
                  aria-label="描述要生成的圖片"
                  onChange={(e) => setPrompt(e.target.value)}
                  onBlur={() => {
                    const v = prompt.trim();
                    if (v !== (block.aiPrompt ?? '')) onPatch({ aiPrompt: v || undefined });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      generate();
                    }
                  }}
                />
                <GenBtn type="button" onClick={generate}>
                  生成
                </GenBtn>
              </PromptBar>
              <Or>或</Or>
              <Upload type="button" onClick={upload} disabled={busy}>
                {busy ? '讀取中…' : '上傳圖片'}
                <Icon name={busy ? 'loader' : 'upload'} size={16} />
              </Upload>
            </Pick>
          ) : null}
          {/* 框太小放不下生成與上傳（見 emptyCompact）：只留「上傳圖片」，再小只剩圖片圖示 */}
          {onPatch ? (
            <CompactAction
              label={busy ? '讀取中…' : '上傳圖片'}
              action={busy ? 'loader' : 'upload'}
              kind="image"
              onPointerDown={(e) => {
                onSelect?.();
                e.stopPropagation();
              }}
              onClick={upload}
              disabled={busy}
            />
          ) : (
            <Missing data-alt>{block.alt || '還沒設定圖片來源'}</Missing>
          )}
          {onPatch && block.alt && !busy && <Missing data-alt>{block.alt}</Missing>}
        </EmptyFrame>
      )}

      {/* 圖說要照抄課本的圖號，預設關閉，由老師在浮動列選擇開啟 */}
      {(block.hasCaption ?? (block.caption.trim().length > 0)) && (onPatch || block.caption) && (
        <Caption
          contentEditable={!!onPatch}
          suppressContentEditableWarning
          data-placeholder="圖說"
          onBlur={(e) => onPatch?.({ caption: e.currentTarget.textContent ?? '' })}
        >
          {block.caption}
        </Caption>
      )}
    </Figure>
  );
}

/**
 * 用 table 排：圖說是 table-caption，寬度跟著圖走。
 * 否則圖縮成一半、圖說還是一整欄寬，外框就會比圖大一倍，
 * 點圖右邊的空白會算成點到圖。
 */
const Figure = styled.figure`
  margin: 0;
  display: table;
  inline-size: auto;
`;

/* 裁切中要讓攤開的整張原圖露出框外，暫時不裁 */
const Box = styled.div<{ $cropping?: boolean }>`
  position: relative;
  overflow: ${(p) => (p.$cropping ? 'visible' : 'hidden')};
  border-radius: ${(p) => p.theme.radius.field};
`;

const Media = styled.img`
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: contain;
  border-radius: ${(p) => p.theme.radius.field};
  background: ${(p) => p.theme.surface.media};
`;

/** 還沒有圖片時的外框：跟空的影片元件同一種樣式（淡底虛線、置中控制項）。 */
const EmptyFrame = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  ${emptyCompactCss}
  border-radius: ${(p) => p.theme.radius.field};
  border: ${(p) => p.theme.border.widthDefault} dashed ${(p) => p.theme.border.default};
  background: ${(p) => p.theme.surface.page};
  overflow: hidden;
`;

const Pick = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px;
  inline-size: 100%;
  box-sizing: border-box;
  /* 直排時這一組控制項要正著看 */
  writing-mode: horizontal-tb;
`;

/** 跟面板裡的輸入框同一款：淡灰膠囊、不畫框，打字時才出現灰色細框；「生成」黑色膠囊嵌在右端。 */
const PromptBar = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  inline-size: min(280px, 100%);
  min-block-size: 40px;
  padding: 4px 4px 4px 16px;
  box-sizing: border-box;
  border: ${(p) => p.theme.border.widthDefault} solid transparent;
  border-radius: ${(p) => p.theme.radius.control};
  /* 底色用 muted（#E5E5E5）：放在 #FAFAFA 的空框上，sunken 幾乎看不出來 */
  background: ${(p) => p.theme.surface.muted};
  transition: border-color 0.12s, background 0.12s;

  &:hover { border-color: ${(p) => p.theme.border.default}; }
  &:focus-within {
    background: ${(p) => p.theme.surface.raised};
    border-color: ${(p) => p.theme.border.hover};
  }
`;

const PromptInput = styled.input`
  flex: 1;
  min-inline-size: 0;
  font: inherit;
  font-size: var(--ds-typography-body-size);
  border: none;
  background: transparent;
  color: ${(p) => p.theme.text.primary};
  outline: none;
  &::placeholder { color: ${(p) => p.theme.text.tertiary}; }
`;

const GenBtn = styled.button`
  ${primaryButtonCss}
  flex: none;
  min-block-size: 32px;
  padding: 0 14px;
`;

const Or = styled.span`
  font-size: var(--ds-typography-body-sm-size);
  color: ${(p) => p.theme.text.tertiary};
`;

const Upload = styled.button`
  ${primaryButtonCss}
`;

const Missing = styled.span`
  position: absolute;
  /* 直排頁裡也橫著寫：檔名、替代文字直排會變成一長條 */
  writing-mode: horizontal-tb;
  inset-block-end: 8px;
  max-inline-size: calc(100% - 16px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-caption-size);
  color: ${(p) => p.theme.text.tertiary};
`;

const Caption = styled.figcaption`
  display: table-caption;
  caption-side: bottom;
  /* 字級、行高、上方間距都要跟分頁量測（domMeasurer 用 caption 角色 + GAP.attached）一致 */
  margin-block-start: 16px;
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
  color: ${(p) => p.theme.text.secondary};
  outline: none;

  &:empty::before {
    content: attr(data-placeholder);
    color: ${(p) => p.theme.text.tertiary};
  }
`;

/** 圖片出處。小而安靜，貼在右下角，滑過才變清楚。 */
const Credit = styled.a`
  position: absolute;
  inset-block-end: 6px;
  inset-inline-end: 6px;
  max-inline-size: calc(100% - 12px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  writing-mode: horizontal-tb;
  padding: 2px 8px;
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.surface.inverse};
  color: ${(p) => p.theme.text.onInverse};
  font-size: var(--ds-typography-label-size);
  line-height: var(--ds-typography-label-line-height);
  text-decoration: none;
  opacity: 0.6;
  transition: opacity 0.15s;

  &:hover { opacity: 0.9; }
`;
