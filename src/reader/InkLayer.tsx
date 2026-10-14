import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { appendPoint, pathOf, STROKE_WIDTH, type Point, type Stroke } from './ink';
import type { Ink } from './useInk';
import type { InkTool } from './tools';

type Props = {
  ink: Ink;
  /** 目前拿著哪支工具。null 時這一層完全讓路，點擊穿過去給逐句聚焦與補充角標。 */
  tool: InkTool | null;
  /** 頁面的實體尺寸（頁座標）。viewBox 對到它，筆跡就跟著整頁縮放。 */
  pageWidth: number;
  pageHeight: number;
  scale: number;
};

/**
 * 蓋在一頁上方的透明畫布。
 *
 * 絕對定位、不佔版面、不碰頁面的 DOM——頁面裝得下多少是分頁算過的，
 * 任何擠進頁面裡的東西都會讓量到的與畫出來的不一致。所以筆跡畫在頁外的一層，
 * 座標用頁座標、靠 viewBox 跟頁一起縮放。
 *
 * 沒拿工具時 pointer-events: none，頁面本來的互動（逐句聚焦、角標）照常。
 */
export function InkLayer({ ink, tool, pageWidth, pageHeight, scale }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  /** 正在畫的那個指標。用自己的記錄而不是 hasPointerCapture：合成事件拿不到 capture，測試會做不出筆跡。 */
  const drawing = useRef<number | null>(null);
  const active = tool !== null;

  /** 螢幕座標 → 頁座標。 */
  const toPage = (e: PointerEvent | React.PointerEvent): Point => {
    const rect = ref.current!.getBoundingClientRect();
    return [(e.clientX - rect.left) / scale, (e.clientY - rect.top) / scale];
  };

  // 拿著筆時，點在畫布上的 click 不要再往上冒到預覽區：
  // 逐句聚焦聽的是原生事件，React 的 stopPropagation 攔不到它，要掛原生的
  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;
    const stop = (e: Event) => e.stopPropagation();
    el.addEventListener('click', stop);
    el.addEventListener('dblclick', stop);
    return () => {
      el.removeEventListener('click', stop);
      el.removeEventListener('dblclick', stop);
    };
  }, [active]);

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!tool || e.button !== 0) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // 合成事件沒有真的指標可以抓；畫面上的滑鼠與觸控筆都抓得到
    }
    drawing.current = e.pointerId;
    const p = toPage(e);
    if (tool === 'eraser') ink.beginErase(p);
    else ink.beginStroke(tool, p);
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!tool || drawing.current !== e.pointerId) return;
    const p = toPage(e);
    if (tool === 'eraser') ink.eraseAt(p);
    else ink.extendStroke((points) => appendPoint(points, p));
  };

  const onPointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!tool || drawing.current !== e.pointerId) return;
    drawing.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    if (tool === 'eraser') ink.endErase();
    else ink.endStroke();
  };

  const onPointerCancel = () => {
    drawing.current = null;
    if (tool === 'eraser') ink.endErase();
    else ink.cancelStroke();
  };

  return (
    <Canvas
      ref={ref}
      data-ink-layer
      $active={active}
      $tool={tool}
      viewBox={`0 0 ${pageWidth} ${pageHeight}`}
      preserveAspectRatio="none"
      aria-hidden
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onContextMenu={(e) => active && e.preventDefault()}
    >
      {ink.strokes.map((s) => (
        <StrokePath key={s.id} stroke={s} />
      ))}
      {ink.draft && <StrokePath stroke={ink.draft} />}
    </Canvas>
  );
}

function StrokePath({ stroke }: { stroke: Stroke }) {
  return (
    <Path $tool={stroke.tool} d={pathOf(stroke.points)} strokeWidth={STROKE_WIDTH[stroke.tool]} />
  );
}

const Canvas = styled.svg<{ $active: boolean; $tool: InkTool | null }>`
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  overflow: visible;
  /* 在補充角標（z 3）之上，拿著筆時才接事件 */
  z-index: 4;
  pointer-events: ${(p) => (p.$active ? 'auto' : 'none')};
  touch-action: ${(p) => (p.$active ? 'none' : 'auto')};
  cursor: ${(p) => (p.$tool === 'eraser' ? 'cell' : p.$active ? 'crosshair' : 'default')};
  /* 螢光筆疊在字上要像真的螢光筆：用疊色讓字透出來 */
  mix-blend-mode: multiply;
`;

const Path = styled.path<{ $tool: Stroke['tool'] }>`
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: ${(p) => (p.$tool === 'highlighter' ? p.theme.brand.primary : p.theme.text.primary)};
  opacity: ${(p) => (p.$tool === 'highlighter' ? 0.85 : 1)};
`;
