import { useEffect, useRef, useState, type CSSProperties } from 'react';
import styled, { useTheme } from 'styled-components';
import { EditableText } from '../EditableText';
import { useEditorCtx } from '../../editor/EditorContext';
import { placeCaret } from '../../editor/caret';
import { spansToHtml } from '../../model/inlineDom';
import { lengthOf } from '../../model/spans';
import type { BlockPatch } from '../../model/actions';
import type { InlineSpan, ShapeBlock, ShapeKind } from '../../model/types';

/**
 * 圖形。課本上用來框住重點、標示區域的色塊，也可以當對話框。
 *
 * 圖形與裡面的文字是同一個元件：點一下只選取，雙擊中央出現插入點可以打字，
 * 拖曳握把整個一起走。文字走跟段落一樣的 spans 機制（EditableText），
 * 所以行內標記保得住，匯出時也是同一套資料。
 *
 * 尺寸只有外框：外框是 blockSizing 量的，裡面的形狀用 SVG 照框畫，
 * 對話框的尖角畫在框外、不佔版面——所以尖角可以指到任何方向，
 * 而分頁算到的框永遠跟畫出來的一樣。
 */

type Props = {
  block: ShapeBlock;
  boxStyle?: React.CSSProperties;
  /** 改文字（spans）或尖角（tail）。唯讀時不傳。 */
  onPatch?: (patch: BlockPatch) => void;
  onSelect?: () => void;
};

/** 每一種形狀的圓角。矩形 4、圓角矩形 20、對話框 8，拉寬拉高都不變。 */
const RADIUS: Partial<Record<ShapeKind, number>> = { rect: 4, roundedRect: 20, callout: 8 };

/** 對話框尖角預設指向右下：框插進來靠欄的左邊，右側有空間，尖角不會超出畫布。 */
export const DEFAULT_TAIL = { x: 1.12, y: 0.75 };

/** 圖形沒設邊框粗細時的預設。 */
export const SHAPE_STROKE_WIDTH = 1;

/** 圓角矩形的輪廓，順時針從左上角的圓角結束處出發。 */
function roundedRectPath(w: number, h: number, r: number): string {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  return [
    `M ${rr},0`,
    `H ${w - rr}`,
    `A ${rr},${rr} 0 0 1 ${w},${rr}`,
    `V ${h - rr}`,
    `A ${rr},${rr} 0 0 1 ${w - rr},${h}`,
    `H ${rr}`,
    `A ${rr},${rr} 0 0 1 0,${h - rr}`,
    `V ${rr}`,
    `A ${rr},${rr} 0 0 1 ${rr},0`,
    'Z',
  ].join(' ');
}

/**
 * 對話框：圓角矩形加一個尖角。
 *
 * 尖角接在離尖端最近的那一邊，底邊的位置是「中心到尖端」那條線穿過邊的地方，
 * 夾在圓角之間不會把圓角吃掉。尖端本身可以在框外任何地方。
 * tail 是以框為基準的相對座標（0～1 是框內）。
 */
export function calloutPath(
  w: number,
  h: number,
  r: number,
  tail: { x: number; y: number }
): string {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  const tx = tail.x * w;
  const ty = tail.y * h;
  const cx = w / 2;
  const cy = h / 2;
  const dx = tx - cx;
  const dy = ty - cy;
  // 用半寬半高正規化，才不會因為框是長的就永遠判成左右邊
  const ax = dx / (w / 2 || 1);
  const ay = dy / (h / 2 || 1);
  const side: 'left' | 'right' | 'top' | 'bottom' =
    Math.abs(ax) >= Math.abs(ay) ? (ax < 0 ? 'left' : 'right') : ay < 0 ? 'top' : 'bottom';

  const tip = `${tx},${ty}`;
  if (side === 'left' || side === 'right') {
    const edgeLen = h - 2 * rr;
    const base = Math.min(28, Math.max(8, edgeLen * 0.35));
    const x = side === 'left' ? 0 : w;
    // 中心到尖端的線穿過這一邊的高度；dx 為 0 時直接用中心
    const y0 = dx === 0 ? cy : cy + dy * ((x - cx) / dx);
    const y = Math.min(h - rr - base / 2, Math.max(rr + base / 2, y0));
    const y1 = y - base / 2;
    const y2 = y + base / 2;
    return [
      `M ${rr},0`,
      `H ${w - rr}`,
      `A ${rr},${rr} 0 0 1 ${w},${rr}`,
      // 右邊由上往下
      side === 'right' ? `V ${y1} L ${tip} L ${w},${y2}` : '',
      `V ${h - rr}`,
      `A ${rr},${rr} 0 0 1 ${w - rr},${h}`,
      `H ${rr}`,
      `A ${rr},${rr} 0 0 1 0,${h - rr}`,
      // 左邊由下往上
      side === 'left' ? `V ${y2} L ${tip} L 0,${y1}` : '',
      `V ${rr}`,
      `A ${rr},${rr} 0 0 1 ${rr},0`,
      'Z',
    ]
      .filter(Boolean)
      .join(' ');
  }

  const edgeLen = w - 2 * rr;
  const base = Math.min(28, Math.max(8, edgeLen * 0.35));
  const y = side === 'top' ? 0 : h;
  const x0 = dy === 0 ? cx : cx + dx * ((y - cy) / dy);
  const x = Math.min(w - rr - base / 2, Math.max(rr + base / 2, x0));
  const x1 = x - base / 2;
  const x2 = x + base / 2;
  return [
    `M ${rr},0`,
    // 上邊由左往右
    side === 'top' ? `H ${x1} L ${tip} L ${x2},0` : '',
    `H ${w - rr}`,
    `A ${rr},${rr} 0 0 1 ${w},${rr}`,
    `V ${h - rr}`,
    `A ${rr},${rr} 0 0 1 ${w - rr},${h}`,
    // 下邊由右往左
    side === 'bottom' ? `H ${x2} L ${tip} L ${x1},${h}` : '',
    `H ${rr}`,
    `A ${rr},${rr} 0 0 1 0,${h - rr}`,
    `V ${rr}`,
    `A ${rr},${rr} 0 0 1 ${rr},0`,
    'Z',
  ]
    .filter(Boolean)
    .join(' ');
}

/** 五角星：外圈碰到框的邊，內圈是外圈的 0.4。 */
function starPath(w: number, h: number): string {
  const cx = w / 2;
  const cy = h / 2;
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const outer = i % 2 === 0;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const kx = outer ? 1 : 0.4;
    pts.push(`${cx + Math.cos(a) * cx * kx},${cy + Math.sin(a) * cy * kx}`);
  }
  return `M ${pts.join(' L ')} Z`;
}

/** 形狀在 w×h 的框裡怎麼畫。對話框才會用到 tail。 */
export function shapePath(
  kind: ShapeKind,
  w: number,
  h: number,
  tail: { x: number; y: number } = DEFAULT_TAIL
): string {
  switch (kind) {
    case 'circle': {
      const rx = w / 2;
      const ry = h / 2;
      return `M ${rx},0 A ${rx},${ry} 0 1 1 ${rx},${h} A ${rx},${ry} 0 1 1 ${rx},0 Z`;
    }
    case 'callout':
      return calloutPath(w, h, RADIUS.callout ?? 8, tail);
    case 'triangle':
      return `M ${w / 2},0 L ${w},${h} L 0,${h} Z`;
    case 'star':
      return starPath(w, h);
    case 'roundedRect':
    case 'rect':
    default:
      return roundedRectPath(w, h, RADIUS[kind] ?? 4);
  }
}

/** 圖形裡的文字：新資料在 spans，舊資料只有 label。 */
export const spansOfShape = (block: ShapeBlock): InlineSpan[] =>
  block.spans ?? (block.label ? [{ text: block.label }] : []);

/**
 * 填色夠深就把字換成反白。只認 #rrggbb；其他寫法（名稱、rgb()）當淺色處理，
 * 老師看到字不清楚自己會換色。
 */
export function isDarkColor(color: string | undefined): boolean {
  if (!color) return false;
  const m = /^#([0-9a-f]{6})$/i.exec(color.trim());
  if (!m) return false;
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.5;
}

export function ShapeBlockView({ block, boxStyle, onPatch, onSelect }: Props) {
  const theme = useTheme();
  const ed = useEditorCtx();
  const selected = !!ed && ed.selectedBlockId === block.id;
  const frameRef = useRef<HTMLDivElement>(null);
  // 雙擊才進入打字狀態；平常文字層不吃指標事件，點到的是圖形本身
  const [editing, setEditing] = useState(false);
  // 拖尖角時先放在本地，放開才寫進文件：patchBlock 不會合併復原，
  // 拖一下就寫幾十次的話 Cmd+Z 要按到天荒地老
  const [liveTail, setLiveTail] = useState<{ x: number; y: number } | null>(null);

  // boxStyle 是實體寬高（直排時已經換過軸），SVG 照這個尺寸畫
  const w = typeof boxStyle?.width === 'number' ? boxStyle.width : 0;
  const h = typeof boxStyle?.height === 'number' ? boxStyle.height : 0;
  const sw = block.strokeWidth ?? SHAPE_STROKE_WIDTH;
  const tail = liveTail ?? block.tail ?? DEFAULT_TAIL;
  // 邊框畫在框內：路徑往內縮半個線寬，粗邊框才不會超出分頁量到的框
  const inner = { w: Math.max(0, w - sw), h: Math.max(0, h - sw) };
  const d = shapePath(block.shape, inner.w, inner.h, tail);
  const spans = spansOfShape(block);
  // 字不跟著淡，所以深色填色調到半透明以下時，底已經接近白紙，字要換回墨色
  const darkBehind = isDarkColor(block.fill) && (block.opacity ?? 1) >= 0.5;
  const textColor = block.textColor ?? (darkBehind ? theme.text.onInverse : theme.text.primary);
  const textStyle: CSSProperties = {
    color: textColor,
    ...(block.fontFamily ? { fontFamily: block.fontFamily } : {}),
    // 行高跟著字級等比；token 的行高是寫死給 14px 用的
    ...(block.fontSize ? { fontSize: block.fontSize, lineHeight: 1.5 } : {}),
  };

  // 取消選取就離開打字狀態，否則外框消失了游標卻還在裡面
  useEffect(() => {
    if (!selected) setEditing(false);
  }, [selected]);

  // 進入打字狀態時把插入點放到文字尾端——雙擊的落點不一定在字上
  useEffect(() => {
    if (!editing) return;
    const el = frameRef.current?.querySelector<HTMLElement>('[contenteditable]');
    if (!el) return;
    el.focus();
    placeCaret(el, lengthOf(spans));
    // 只在進入時定位一次，之後的游標由老師自己控制
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const startTailDrag = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const el = frameRef.current;
    if (!el || !onPatch) return;
    const rect = el.getBoundingClientRect();
    const sheet = el.closest<HTMLElement>('[data-layout]')?.getBoundingClientRect();
    // 頁面是 transform: scale() 縮過的，指標給的是視窗像素
    const scale = rect.width / (el.offsetWidth || 1);
    let last = tail;
    const move = (ev: PointerEvent) => {
      const cx = sheet
        ? Math.max(sheet.left + 8, Math.min(sheet.right - 8, ev.clientX))
        : ev.clientX;
      const cy = sheet
        ? Math.max(sheet.top + 8, Math.min(sheet.bottom - 8, ev.clientY))
        : ev.clientY;
      const x = (cx - rect.left) / scale / (w || 1);
      const y = (cy - rect.top) / scale / (h || 1);
      // 尖角可以指到框外，但夾在畫布之內，不會飛到看不見的地方
      last = { x: Math.max(-1.5, Math.min(2.5, x)), y: Math.max(-1.5, Math.min(2.5, y)) };
      setLiveTail(last);
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      setLiveTail(null);
      onPatch({ tail: last });
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  };

  return (
    <Frame
      ref={frameRef}
      style={boxStyle}
      onPointerDown={onSelect}
      onDoubleClick={() => {
        if (onPatch) setEditing(true);
      }}
    >
      {/* 形狀。overflow visible 讓對話框的尖角畫得到框外；透明度只套在形狀，字不跟著淡 */}
      <Svg width={w} height={h} aria-hidden="true" style={{ opacity: block.opacity ?? 1 }}>
        <g transform={`translate(${sw / 2} ${sw / 2})`}>
          <path
            d={d}
            style={{
              fill: block.fill ?? theme.surface.raised,
              stroke: block.stroke ?? theme.text.primary,
              strokeWidth: sw,
              strokeLinejoin: 'round',
            }}
          />
        </g>
      </Svg>

      {/* 文字層。量測不看它——框的高是固定的，字多了會被裁，不會撐破頁 */}
      <TextLayer $editing={editing} $vertical={!!block.textVertical} style={textStyle}>
        {onPatch ? (
          <Editable
            className="ds-rich"
            spans={spans}
            placeholder={editing ? '輸入文字…' : ''}
            onChange={(next) => onPatch({ spans: next })}
            onFocus={() => {
              onSelect?.();
              setEditing(true);
            }}
          />
        ) : (
          spans.length > 0 && (
            <Static className="ds-rich" dangerouslySetInnerHTML={{ __html: spansToHtml(spans) }} />
          )
        )}
      </TextLayer>

      {/* 尖角的控制點：選取對話框時出現，拖它改指向。絕對定位，不佔版面 */}
      {selected && onPatch && block.shape === 'callout' && (
        <TailGrip
          data-ui
          style={{ left: tail.x * w, top: tail.y * h }}
          onPointerDown={startTailDrag}
          aria-label="拖曳改變尖角方向"
          title="拖曳改變尖角方向"
        />
      )}
    </Frame>
  );
}

const Frame = styled.div`
  position: relative;
  box-sizing: border-box;
  writing-mode: horizontal-tb;
`;

const Svg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;
  display: block;
`;

/**
 * 文字置中。沒在打字時不吃指標事件——點到的是圖形，點一下只選取；
 * 雙擊之後才讓它接手，游標才放得進去。
 */
const TextLayer = styled.div<{ $editing: boolean; $vertical: boolean }>`
  position: absolute;
  /* 直排：由右往左排，字還是在圖形正中間 */
  writing-mode: ${(p) => (p.$vertical ? 'vertical-rl' : 'horizontal-tb')};
  inset: 0;
  display: grid;
  place-items: center;
  padding: 12px;
  overflow: hidden;
  pointer-events: ${(p) => (p.$editing ? 'auto' : 'none')};
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
  text-align: center;
`;

const Editable = styled(EditableText)`
  max-inline-size: 100%;
  max-block-size: 100%;
  overflow: hidden;
  outline: none;
  /* 空的時候也要有一行的高度，插入點才有地方站 */
  min-inline-size: 1em;

  &:empty::before {
    content: attr(data-placeholder);
    color: ${(p) => p.theme.text.tertiary};
    pointer-events: none;
  }
`;

const Static = styled.div`
  max-inline-size: 100%;
  max-block-size: 100%;
  overflow: hidden;
`;

const TailGrip = styled.div`
  position: absolute;
  z-index: 7;
  inline-size: 12px;
  block-size: 12px;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  background: ${(p) => p.theme.surface.raised};
  border: 2px solid ${(p) => p.theme.tool.border};
  box-shadow: 0 1px 3px rgba(26, 25, 23, 0.18);
  cursor: move;
  touch-action: none;

  /* 看起來 12、點起來 28——頁面縮小之後 12 在平板上按不到 */
  &::after {
    content: '';
    position: absolute;
    inset: -8px;
  }
  &:hover {
    background: ${(p) => p.theme.tool.surface};
  }
`;
