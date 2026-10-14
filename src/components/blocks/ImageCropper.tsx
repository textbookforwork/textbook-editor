import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { primaryButtonCss } from '../buttonStyles';

export type Crop = { x: number; y: number; w: number; h: number };
const FULL: Crop = { x: 0, y: 0, w: 1, h: 1 };

// ── 哪一張圖正在裁切（浮動工具列的「裁切」打開，圖片元件讀） ──
let cropping: string | null = null;
const listeners = new Set<() => void>();
export function setCroppingId(id: string | null) {
  cropping = id;
  listeners.forEach((l) => l());
}
export function useCroppingId(): string | null {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => cropping
  );
}

type Handle = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw' | 'move';
const HANDLES: Handle[] = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
const MIN = 0.05;

type Props = {
  src: string;
  /** 目前生效的裁切（沒設就是整張） */
  crop?: Crop;
  /** 圖片框目前的實際尺寸（頁座標），就是目前裁切範圍的大小 */
  boxW: number;
  boxH: number;
  onDone: (crop: Crop | undefined) => void;
  onCancel: () => void;
};

/**
 * 就地裁切：把整張原圖攤開在圖片框的位置上（框外的部分壓暗），拖框的四角、四邊調範圍，拖框內移動。
 * 框是以原圖的比例（0–1）記，所以換尺寸、換頁都不會跑掉。按「完成」才寫回；Esc 或「取消」放棄。
 */
export function ImageCropper({ src, crop, boxW, boxH, onDone, onCancel }: Props) {
  const c0 = crop ?? FULL;
  // 整張原圖畫多大：目前框裡是 c0 那一塊，所以整張＝框 ÷ 裁切比例
  const fullW = boxW / c0.w;
  const fullH = boxH / c0.h;
  const [draft, setDraft] = useState<Crop>(c0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onCancel();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        finish();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  });

  const finish = () => {
    const full = draft.x <= 0.001 && draft.y <= 0.001 && draft.w >= 0.999 && draft.h >= 0.999;
    onDone(full ? undefined : draft);
  };

  const start = (handle: Handle) => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const el = wrapRef.current;
    if (!el) return;
    // 頁面整頁縮放過：指標的視窗像素換回頁座標
    const scale = el.getBoundingClientRect().width / (el.offsetWidth || 1);
    const x0 = e.clientX;
    const y0 = e.clientY;
    const d0 = draft;
    const move = (ev: PointerEvent) => {
      const dx = (ev.clientX - x0) / scale / fullW;
      const dy = (ev.clientY - y0) / scale / fullH;
      let { x, y, w, h } = d0;
      if (handle === 'move') {
        x = clamp(d0.x + dx, 0, 1 - d0.w);
        y = clamp(d0.y + dy, 0, 1 - d0.h);
      } else {
        if (handle.includes('w')) {
          x = clamp(d0.x + dx, 0, d0.x + d0.w - MIN);
          w = d0.w + (d0.x - x);
        }
        if (handle.includes('e')) w = clamp(d0.w + dx, MIN, 1 - d0.x);
        if (handle.includes('n')) {
          y = clamp(d0.y + dy, 0, d0.y + d0.h - MIN);
          h = d0.h + (d0.y - y);
        }
        if (handle.includes('s')) h = clamp(d0.h + dy, MIN, 1 - d0.y);
      }
      setDraft({ x, y, w, h });
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <>
    {/* 裁切時畫面上其他東西都碰不到（滑過、點擊、游標樣式都不反應），只剩裁切框能操作 */}
    <LockOthers />
    <Wrap
      ref={wrapRef}
      data-cropper
      style={{ left: -c0.x * fullW, top: -c0.y * fullH, width: fullW, height: fullH }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <img src={src} alt="" draggable={false} />
      <Rect
        style={{ left: draft.x * fullW, top: draft.y * fullH, width: draft.w * fullW, height: draft.h * fullH }}
        onPointerDown={start('move')}
      >
        {HANDLES.map((h) => (
          <Grip key={h} $h={h} onPointerDown={start(h)} />
        ))}
      </Rect>
      <Bar style={{ left: draft.x * fullW, top: (draft.y + draft.h) * fullH + 10, width: draft.w * fullW }}>
        <Ghost type="button" onClick={onCancel}>
          取消
        </Ghost>
        <Ghost type="button" onClick={() => setDraft(FULL)}>
          整張
        </Ghost>
        <Done type="button" onClick={finish}>
          完成
        </Done>
      </Bar>
    </Wrap>
    </>
  );
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

const LockOthers = createGlobalStyle`
  body * { pointer-events: none !important; }
  [data-cropper], [data-cropper] * { pointer-events: auto !important; }
  [data-cropper] img { pointer-events: none !important; }
`;

/** 整張原圖：疊在圖片框上方，框外的部分由 Rect 的大陰影壓暗 */
const Wrap = styled.div`
  position: absolute;
  z-index: 30;
  overflow: visible;
  img {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    user-select: none;
    pointer-events: none;
  }
`;

const Rect = styled.div`
  position: absolute;
  box-sizing: border-box;
  border: 2px solid ${(p) => p.theme.surface.raised};
  box-shadow: 0 0 0 9999px rgba(26, 25, 23, 0.5);
  cursor: move;
  touch-action: none;
`;

const POS: Record<Exclude<Handle, 'move'>, string> = {
  nw: 'left: -7px; top: -7px; cursor: nwse-resize;',
  ne: 'right: -7px; top: -7px; cursor: nesw-resize;',
  se: 'right: -7px; bottom: -7px; cursor: nwse-resize;',
  sw: 'left: -7px; bottom: -7px; cursor: nesw-resize;',
  n: 'left: calc(50% - 12px); top: -5px; width: 24px; height: 8px; cursor: ns-resize;',
  s: 'left: calc(50% - 12px); bottom: -5px; width: 24px; height: 8px; cursor: ns-resize;',
  e: 'right: -5px; top: calc(50% - 12px); width: 8px; height: 24px; cursor: ew-resize;',
  w: 'left: -5px; top: calc(50% - 12px); width: 8px; height: 24px; cursor: ew-resize;',
};

/** 把手：跟縮放外框同一款（白色、淡框） */
const Grip = styled.span<{ $h: Handle }>`
  position: absolute;
  inline-size: 14px;
  block-size: 14px;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.raised};
  box-shadow: 0 0 0 1px ${(p) => p.theme.border.default};
  touch-action: none;
  ${(p) => (p.$h === 'move' ? '' : POS[p.$h])}
`;

const Bar = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  gap: 6px;
  min-inline-size: 200px;
  writing-mode: horizontal-tb;
`;

const Ghost = styled.button`
  min-block-size: 32px;
  padding: 0 14px;
  border: none;
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.surface.raised};
  box-shadow: ${(p) => p.theme.shadow.card};
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  color: ${(p) => p.theme.text.secondary};
  cursor: pointer;
  &:hover { color: ${(p) => p.theme.text.primary}; }
`;

const Done = styled.button`
  ${primaryButtonCss}
  min-block-size: 32px;
  padding: 0 16px;
`;
