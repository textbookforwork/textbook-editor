import { useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useEditorCtx } from '../../editor/EditorContext';
import type { BlockPatch } from '../../model/actions';
import type { LineBlock, LineCap } from '../../model/types';

/**
 * 線段。佔一個方框，框內兩個端點各存 0～1 的相對座標。
 *
 * 框是 blockSizing 量的；端點只是框內的畫法，拖端點改的是線的走向，
 * 不改版面。選取時兩端各一個控制點，拖哪一端就只動那一端。
 * 箭頭與圓點用 SVG marker 畫，顏色跟著線走。
 */

type Props = {
  block: LineBlock;
  boxStyle?: React.CSSProperties;
  /** 拖端點。唯讀時不傳。 */
  onPatch?: (patch: BlockPatch) => void;
  onSelect?: () => void;
};

/** 線段沒設粗細時的預設。 */
export const LINE_STROKE_WIDTH = 2;

/** 端點樣式在介面上的名字。 */
export const LINE_CAP_LABEL: Record<LineCap, string> = {
  none: '無',
  arrow: '線箭頭',
  arrowFilled: '實心箭頭',
  dot: '圓點',
};

/** 端點座標夾在框內。 */
export const clampPoint = (p: { x: number; y: number }) => ({
  x: Math.max(0, Math.min(1, p.x)),
  y: Math.max(0, Math.min(1, p.y)),
});

/**
 * 一種端點樣式的 marker。尺寸以線寬為單位（markerUnits=strokeWidth），
 * 線變粗箭頭跟著變大；refX 放在尖端，線的端點就是箭頭的尖。
 */
function CapMarker({ id, cap, color }: { id: string; cap: LineCap; color: string }) {
  if (cap === 'none') return null;
  const common = {
    id,
    markerWidth: 10,
    markerHeight: 10,
    refY: 5,
    markerUnits: 'strokeWidth' as const,
    // 起點的 marker 自動反向，同一個定義兩端都能用
    orient: 'auto-start-reverse' as const,
  };
  switch (cap) {
    case 'arrow':
      return (
        <marker {...common} refX={8}>
          <path
            d="M1,1 L8,5 L1,9"
            style={{ fill: 'none', stroke: color, strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }}
          />
        </marker>
      );
    case 'arrowFilled':
      return (
        <marker {...common} refX={9}>
          <path d="M0,0.5 L9,5 L0,9.5 Z" style={{ fill: color, stroke: 'none' }} />
        </marker>
      );
    case 'dot':
      return (
        <marker {...common} refX={5}>
          <circle cx={5} cy={5} r={3.5} style={{ fill: color, stroke: 'none' }} />
        </marker>
      );
  }
}

export function LineBlockView({ block, boxStyle, onPatch, onSelect }: Props) {
  const theme = useTheme();
  const ed = useEditorCtx();
  const selected = !!ed && ed.selectedBlockId === block.id;
  const frameRef = useRef<HTMLDivElement>(null);
  // 拖端點時先放在本地，放開才寫進文件（理由同圖形的尖角：patchBlock 不合併復原）
  const [live, setLive] = useState<{ end: 'from' | 'to'; p: { x: number; y: number } } | null>(null);

  const w = typeof boxStyle?.width === 'number' ? boxStyle.width : 0;
  const h = typeof boxStyle?.height === 'number' ? boxStyle.height : 0;
  const sw = block.strokeWidth ?? LINE_STROKE_WIDTH;
  const color = block.stroke ?? theme.text.primary;
  const from = live?.end === 'from' ? live.p : block.from;
  const to = live?.end === 'to' ? live.p : block.to;
  const startCap = block.startCap ?? 'none';
  const endCap = block.endCap ?? 'none';
  // marker 的 id 要全文件唯一：縮圖列與編輯區畫的是同一個元件，
  // 兩邊各有一份 SVG，但 id 相同時瀏覽器只認第一個，顏色仍然一致所以無妨
  const idStart = `${block.id}-cap-start`;
  const idEnd = `${block.id}-cap-end`;

  const startDrag = (end: 'from' | 'to') => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const el = frameRef.current;
    if (!el || !onPatch) return;
    const rect = el.getBoundingClientRect();
    // 頁面是 transform: scale() 縮過的，指標給的是視窗像素
    const scale = rect.width / (el.offsetWidth || 1);
    let last = end === 'from' ? block.from : block.to;
    const move = (ev: PointerEvent) => {
      last = clampPoint({
        x: (ev.clientX - rect.left) / scale / (w || 1),
        y: (ev.clientY - rect.top) / scale / (h || 1),
      });
      setLive({ end, p: last });
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      setLive(null);
      onPatch({ [end]: last });
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  };

  return (
    <Frame ref={frameRef} style={{ ...boxStyle, opacity: block.opacity ?? 1 }} onPointerDown={onSelect}>
      {/* overflow visible：箭頭在框的邊緣時不能被切掉 */}
      <Svg width={w} height={h} aria-hidden="true">
        <defs>
          <CapMarker id={idStart} cap={startCap} color={color} />
          <CapMarker id={idEnd} cap={endCap} color={color} />
        </defs>
        <line
          x1={from.x * w}
          y1={from.y * h}
          x2={to.x * w}
          y2={to.y * h}
          markerStart={startCap !== 'none' ? `url(#${idStart})` : undefined}
          markerEnd={endCap !== 'none' ? `url(#${idEnd})` : undefined}
          style={{
            stroke: color,
            strokeWidth: sw,
            strokeLinecap: 'round',
            // 虛線的節奏跟著粗細走，細線不會變成一排點、粗線不會黏成實線
            strokeDasharray: block.dashed ? `${sw * 3} ${sw * 2}` : undefined,
          }}
        />
      </Svg>

      {/* 兩端的控制點：選取時出現，拖哪一端只動那一端。絕對定位，不佔版面 */}
      {selected && onPatch && (
        <>
          <EndGrip
            data-ui
            style={{ left: from.x * w, top: from.y * h }}
            onPointerDown={startDrag('from')}
            aria-label="拖曳線段起點"
            title="拖曳線段起點"
          />
          <EndGrip
            data-ui
            style={{ left: to.x * w, top: to.y * h }}
            onPointerDown={startDrag('to')}
            aria-label="拖曳線段終點"
            title="拖曳線段終點"
          />
        </>
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

const EndGrip = styled.div`
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
