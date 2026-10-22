import { useLayoutEffect, useMemo, useRef } from 'react';
import { isMaskShown, maskKey, revealMask, useMaskVersion } from '../viewer/masks';
import styled from 'styled-components';
import { roleStyle, TEXT_SCALE, textFlowStyle } from '../styles/roles';
import { blockBox, type SizingContext } from '../model/blockSizing';
import { spansToHtml } from '../model/inlineDom';
import { markPopups, markReady, rangeKindOf } from '../model/paragraphs';
import { usePopupViewer } from '../viewer/PopupViewer';
import { missingOf, wordGroupPopups } from '../model/popups';
import { EditableText } from './EditableText';
import { ImageBlockView } from './blocks/ImageBlockView';
import { VideoBlockView } from './blocks/VideoBlockView';
import { WebBlockView } from './blocks/WebBlockView';
import { PdfBlockView } from './blocks/PdfBlockView';
import { TableBlockView } from './blocks/TableBlockView';
import { AudioBlockView } from './blocks/AudioBlockView';
import { ModuleBlockView } from './blocks/ModuleBlockView';
import { ShapeBlockView } from './blocks/ShapeBlockView';
import { LineBlockView } from './blocks/LineBlockView';
import type { BlockPatch } from '../model/actions';
import type { Block, DocSettings, InlineSpan } from '../model/types';
import { useNoteNo } from './ParagraphContext';

type Props = {
  block: Block;
  settings: DocSettings;
  sizing: SizingContext;
  /** 唯讀（預覽模式）時不給編輯。 */
  onEditSpans?: (spans: InlineSpan[]) => void;
  /** 改元件屬性（圖說、標題、尺寸）。唯讀時不傳。 */
  onPatch?: (patch: BlockPatch) => void;
  /** 選了一段字。浮動膠囊靠它決定要不要出現。 */
  onSelectRange?: (range: { start: number; end: number } | null) => void;
  /** 點下去選中這個元件。唯讀時不傳。 */
  onSelect?: () => void;
  /** 課文段落的段號（已照書寫方向轉好）。畫在段首第一格；被切到下一頁的那一份不傳。 */
  paraLabel?: string;
  /** 閱讀時這一段正被聚焦：段號反黑。 */
  paraOn?: boolean;
};

/**
 * 區塊的呈現。
 *
 * 編輯與唯讀走同一組 HTML（spansToHtml）與同一個 class（ds-rich），
 * 所以老師編的樣子、學生看的樣子、量測器量的樣子是同一個。
 */
export function BlockView({
  block,
  settings,
  sizing,
  onEditSpans,
  onPatch,
  onSelectRange,
  onSelect,
  paraLabel,
  paraOn,
}: Props) {
  const scale = TEXT_SCALE[settings.textScale];
  // 閱讀模式點「掛了補充的詞」要開檢視器；縮圖裡沒有檢視器，點了什麼都不會發生
  const viewer = usePopupViewer();
  // 生字詞的號碼（①②），全文一串。課文上不標，只出現在彈出的註釋標題
  const noteNo = useNoteNo();
  // innerHTML 的物件要在文字沒變時保持同一個：React 19 比的是物件身分不是字串，
  // 換了物件就重設 innerHTML。閱讀模式每點一下都會重畫，重設會把逐句聚焦的高亮
  // （掛在舊的文字節點上）弄掉，下一下點到的也成了已經被換掉的節點
  const html = block.type === 'text' ? spansToHtml(block.spans) : '';
  const richHtml = useMemo(() => ({ __html: html }), [html]);

  // 遮住的幾個字：閱讀時打開過的要記著，換頁回來（元件重畫）再把它們標回打開
  const maskVersion = useMaskVersion();
  const textRef = useRef<HTMLParagraphElement>(null);
  useLayoutEffect(() => {
    textRef.current?.querySelectorAll<HTMLElement>('[data-mask]').forEach((el) => {
      if (isMaskShown(maskKey(block.id, el.textContent ?? ''))) el.dataset.shown = '1';
    });
  }, [html, maskVersion, block.id]);

  // 非文字區塊：尺寸由 blockSizing 決定，跟量測用的是同一個函式，
  // 所以畫出來的一定等於量到的，不會撐破頁面。
  const box = blockBox(block, sizing);
  const boxStyle = box
    ? sizing.vertical
      ? { width: box.blockSize, height: box.inlineSize }
      : { width: box.inlineSize, height: box.blockSize }
    : undefined;

  switch (block.type) {
    case 'text': {
      // 字級覆寫與單段直橫排都跟量測探針走同一組函式（roleStyle、textFlowStyle）
      const flow = textFlowStyle(block, sizing);
      const s: React.CSSProperties = {
        ...roleStyle(block.role, scale, block.fontSize, block.lineHeight, flow.vertical),
        textAlign: block.align,
        ...flow.style,
      };
      // 跟整本不同向的段落要自己掛方向記號，著重線與底線才會畫在對的那一邊
      const dir = {
        ...(flow.flipped ? (flow.vertical ? { 'data-vertical': 'true' } : { 'data-horizontal': 'true' }) : {}),
        ...(paraLabel ? { 'data-pno': paraLabel } : {}),
        ...(paraLabel && paraOn ? { 'data-pno-on': 'true' } : {}),
      };

      // 帶注音、重點詞、注釋號的段落也能直接編：標記存在 DOM 上，
      // 打字動的是文字節點，碰不到標記本身。
      if (onEditSpans) {
        return (
          <EditableTextStyled
            className="ds-rich"
            style={s}
            {...dir}
            spans={block.spans}
            onFocus={onSelect}
            onChange={onEditSpans}
            onSelect={onSelectRange}
            placeholder={block.role === 'lessonTitle' ? '輸入標題…' : '輸入內容…'}
          />
        );
      }
      return (
        <Text
          ref={textRef}
          className="ds-rich"
          style={s}
          {...dir}
          dangerouslySetInnerHTML={richHtml}
          /* 掛在詞上的補充：點那幾個字只開那一項。檢視器的 open 只認整個元件，
             所以把元件複製一份、只留那一項交過去——一項就會在字旁邊直接彈泡泡 */
          onClick={
            viewer
              ? (e) => {
                  // 遮住的幾個字：點了只打開遮罩，不同時開補充或聚焦
                  const maskEl = (e.target as HTMLElement).closest<HTMLElement>('[data-mask]');
                  if (maskEl && !maskEl.dataset.shown) {
                    e.stopPropagation();
                    maskEl.dataset.shown = '1';
                    revealMask(maskKey(block.id, maskEl.textContent ?? ''));
                    return;
                  }
                  // 標成生字詞的幾個字：在字旁彈出註釋，連到這幾個字的補充接在註釋底下。
                  // 註釋的標題是號碼加那幾個字本身（跟課本注釋一樣）。
                  // 標成句子的不在這裡開：它的旨修句問與補充在頁面右下角那條膠囊上（閱讀模式管）
                  const noteEl = (e.target as HTMLElement).closest<HTMLElement>('[data-note]');
                  const note = noteEl && block.rangeNotes?.find((n) => n.id === noteEl.dataset.note);
                  if (noteEl && note && rangeKindOf(note) === 'sentence') return;
                  if (noteEl && note && markReady(block, note)) {
                    e.stopPropagation();
                    const quote = block.spans.filter((x) => x.noteId === note.id).map((x) => x.text).join('');
                    const title = [noteNo(note.id), quote].filter(Boolean).join(' ');
                    const linked = markPopups(block, note.id);
                    const body = note.body.trim();
                    if (linked.length === 0) {
                      viewer.open({ ...block, popups: [{ id: `note-${note.id}`, kind: 'text', title, body }] }, noteEl);
                    } else {
                      viewer.open({ ...block, popups: linked }, noteEl, body ? { title, body } : undefined);
                    }
                    return;
                  }
                  // 沒標的字只掛補充：開這一組（一項就直接開，多項是一排卡片）
                  const el = (e.target as HTMLElement).closest<HTMLElement>('[data-pop]');
                  const items = el?.dataset.pop ? wordGroupPopups(block, el.dataset.pop).filter((p) => !missingOf(p)) : [];
                  if (!el || items.length === 0) return;
                  e.stopPropagation();
                  viewer.open({ ...block, popups: items }, el);
                }
              : undefined
          }
        />
      );
    }
    case 'image':
      return (
        <ImageBlockView
          block={block}
          boxStyle={boxStyle}
          onPatch={onPatch}
          onSelect={onSelect}
        />
      );
    case 'video':
      return (
        <VideoBlockView
          block={block}
          boxStyle={boxStyle}
          onPatch={onPatch}
          onSelect={onSelect}
        />
      );
    case 'web':
      return (
        <WebBlockView block={block} boxStyle={boxStyle} onPatch={onPatch} onSelect={onSelect} />
      );
    case 'pdf':
      return (
        <PdfBlockView block={block} boxStyle={boxStyle} onPatch={onPatch} onSelect={onSelect} />
      );
    case 'dialogue':
      return (
        <Bubble onPointerDown={onSelect}>
          <Speaker>{block.speaker}</Speaker>
          {block.text}
        </Bubble>
      );
    case 'question':
      return (
        <Card onPointerDown={onSelect}>
          {block.questionType && <Tag>{block.questionType}</Tag>}
          <strong>
            {block.number}. {block.stem.map((s2) => s2.text).join('')}
          </strong>
          <Options>
            {block.options.map((o) => (
              <li key={o.key}>
                ({o.key}) {o.text.map((s2) => s2.text).join('')}
              </li>
            ))}
          </Options>
        </Card>
      );
    case 'table':
      return (
        <TableBlockView block={block} boxStyle={boxStyle} sizing={sizing} scale={scale} onSelect={onSelect} />
      );
    case 'audio':
      return (
        <AudioBlockView block={block} boxStyle={boxStyle} onPatch={onPatch} onSelect={onSelect} />
      );
    case 'module':
      return <ModuleBlockView block={block} boxStyle={boxStyle} onSelect={onSelect} />;
    case 'shape':
      // 圖形裡的文字與尖角都走 onPatch：圖形與文字是同一個元件，不另開一段
      return (
        <ShapeBlockView block={block} boxStyle={boxStyle} onPatch={onPatch} onSelect={onSelect} />
      );
    case 'line':
      return (
        <LineBlockView block={block} boxStyle={boxStyle} onPatch={onPatch} onSelect={onSelect} />
      );
    case 'reference':
      return <Ref onPointerDown={onSelect}>配合{block.target}第 {block.pages} 頁</Ref>;
    default: {
      // 十二種元件都畫過了。之後在 Block union 加一種卻忘了在這裡處理，
      // 這一行會編譯失敗——不會等到畫面上出現一個空白方塊才發現。
      const never: never = block;
      return never;
    }
  }
}

const Text = styled.p`
  margin: 0;
  color: ${(p) => p.theme.text.primary};

  /* 遮住的幾個字（閱讀）：實心淡灰膠囊蓋住，點了才顯示；字的位置照留，打開後版面不動 */
  [data-mask]:not([data-shown]) {
    background: ${(p) => p.theme.surface.muted};
    color: transparent;
    border-radius: 6px;
    cursor: pointer;
    text-decoration-color: transparent;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }
  [data-mask]:not([data-shown]) rt { color: transparent; }
  [data-mask]:not([data-shown]):hover { background: ${(p) => p.theme.border.default}; }
  [data-mask] { transition: background-color 0.2s, color 0.2s; }
`;

const EditableTextStyled = styled(EditableText)`
  margin: 0;
  color: ${(p) => p.theme.text.primary};
  outline: none;

  /* 遮住的幾個字（編輯）：淡灰底加虛線底邊標出來，字照樣看得到、改得到 */
  [data-mask] {
    background: ${(p) => p.theme.surface.muted};
    color: ${(p) => p.theme.text.secondary};
    box-shadow: inset 0 -1.5px 0 ${(p) => p.theme.border.hover};
    border-radius: 4px;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }

  &:empty::before {
    content: attr(data-placeholder);
    color: ${(p) => p.theme.text.tertiary};
    pointer-events: none;
  }
`;







const Bubble = styled.div`
  background: ${(p) => p.theme.surface.sunken};
  border-radius: ${(p) => p.theme.radius.card};
  padding: 12px 16px;
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
`;

const Speaker = styled.span`
  display: block;
  font-size: var(--ds-typography-label-size);
  color: ${(p) => p.theme.text.tertiary};
  margin-block-end: 4px;
`;

const Card = styled.div`
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  border-radius: ${(p) => p.theme.radius.card};
  padding: 16px;
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Tag = styled.span`
  align-self: flex-start;
  background: ${(p) => p.theme.brand.primaryTint};
  color: ${(p) => p.theme.text.primary};
  border-radius: ${(p) => p.theme.radius.control};
  padding: 2px 10px;
  font-size: var(--ds-typography-label-size);
`;

const Options = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${(p) => p.theme.text.secondary};
`;



const Ref = styled.div`
  align-self: flex-start;
  font-size: var(--ds-typography-label-size);
  color: ${(p) => p.theme.text.tertiary};
`;
