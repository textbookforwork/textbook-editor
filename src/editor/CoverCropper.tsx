import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import styled from 'styled-components';

/** 書櫃卡片封面的比例 4:5（2026-10-27 定）。 */
export const COVER_RATIO = 4 / 5;
const OUT_W = 456;
const OUT_H = 570;
const MIN_W = 48;

type Rect = { x: number; y: number; w: number; h: number };
type Corner = 'nw' | 'ne' | 'sw' | 'se';

/**
 * 封面裁切：照 Figma，圖片完整顯示在框裡，上面疊一個固定比例的選取框。
 * 拖四個角的白色輔助線＝等比例放大縮小選取框；按住框裡面拖＝移動位置。框外面調暗。
 * onChange 回傳裁好的圖（data URL，JPEG），按「確認上傳」才由外面套用。
 */
export function CoverCropper({ src, onChange }: { src: string; onChange: (dataUrl: string) => void }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  // 圖在框裡實際畫出來的位置與大小（contain）
  const [fit, setFit] = useState<Rect | null>(null);
  const [crop, setCrop] = useState<Rect | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      const box = boxRef.current!.getBoundingClientRect();
      const s = Math.min(box.width / img.naturalWidth, box.height / img.naturalHeight);
      const f = { w: img.naturalWidth * s, h: img.naturalHeight * s, x: 0, y: 0 };
      f.x = (box.width - f.w) / 2;
      f.y = (box.height - f.h) / 2;
      setFit(f);
      // 一開始選最大、置中的一塊
      const w = Math.min(f.w, f.h * COVER_RATIO);
      const h = w / COVER_RATIO;
      setCrop({ x: f.x + (f.w - w) / 2, y: f.y + (f.h - h) / 2, w, h });
    };
    img.src = src;
  }, [src]);

  // 選取框一變就重畫輸出；拖曳中每一格都畫太浪費，等手停 120ms
  useEffect(() => {
    if (!crop || !fit || !imgRef.current) return;
    const t = setTimeout(() => {
      const img = imgRef.current!;
      const s = img.naturalWidth / fit.w;
      const canvas = document.createElement('canvas');
      canvas.width = OUT_W;
      canvas.height = OUT_H;
      canvas.getContext('2d')!.drawImage(img, (crop.x - fit.x) * s, (crop.y - fit.y) * s, crop.w * s, crop.h * s, 0, 0, OUT_W, OUT_H);
      onChange(canvas.toDataURL('image/jpeg', 0.85));
    }, 120);
    return () => clearTimeout(t);
  }, [crop, fit, onChange]);

  const drag = (e: ReactPointerEvent, corner: Corner | null) => {
    if (!crop || !fit) return;
    e.preventDefault();
    e.stopPropagation();
    const start = { x: e.clientX, y: e.clientY, crop };
    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - start.x;
      const dy = ev.clientY - start.y;
      const c = start.crop;
      if (!corner) {
        setCrop({
          ...c,
          x: Math.min(Math.max(c.x + dx, fit.x), fit.x + fit.w - c.w),
          y: Math.min(Math.max(c.y + dy, fit.y), fit.y + fit.h - c.h),
        });
        return;
      }
      // 等比例：以對角為固定點，取水平、垂直兩個方向裡拉得比較多的那一個
      const east = corner.includes('e');
      const south = corner.includes('s');
      const ax = east ? c.x : c.x + c.w;
      const ay = south ? c.y : c.y + c.h;
      let w = Math.max(east ? c.w + dx : c.w - dx, (south ? c.h + dy : c.h - dy) * COVER_RATIO);
      // 不能超出圖片：往哪邊長，就看那一邊還剩多少空間
      const roomX = east ? fit.x + fit.w - ax : ax - fit.x;
      const roomY = south ? fit.y + fit.h - ay : ay - fit.y;
      w = Math.max(MIN_W, Math.min(w, roomX, roomY * COVER_RATIO));
      const h = w / COVER_RATIO;
      setCrop({ x: east ? ax : ax - w, y: south ? ay : ay - h, w, h });
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <Box ref={boxRef}>
      {fit && <img src={src} alt="" style={{ left: fit.x, top: fit.y, width: fit.w, height: fit.h }} />}
      {crop && (
        <Frame style={{ left: crop.x, top: crop.y, width: crop.w, height: crop.h }} onPointerDown={(e) => drag(e, null)} title="拖曳調整位置">
          {(['nw', 'ne', 'sw', 'se'] as Corner[]).map((c) => (
            <Handle key={c} $c={c} onPointerDown={(e) => drag(e, c)} aria-label="拖曳調整大小" />
          ))}
        </Frame>
      )}
    </Box>
  );
}

const Box = styled.div`
  position: relative;
  inline-size: 100%;
  block-size: 100%;
  overflow: hidden;
  touch-action: none;
  user-select: none;

  & > img {
    position: absolute;
    pointer-events: none;
  }
`;

/** 選取框：外面一圈大陰影把框外調暗，框本身一條細白線 */
const Frame = styled.div`
  position: absolute;
  cursor: move;
  box-shadow: 0 0 0 9999px rgba(26, 25, 23, 0.45);
  outline: 1px solid rgba(255, 255, 255, 0.9);
`;

/** 四角的白色 L 形輔助線，可以點的範圍比看到的大 */
const Handle = styled.span<{ $c: Corner }>`
  position: absolute;
  inline-size: 28px;
  block-size: 28px;
  ${(p) => (p.$c.includes('n') ? 'top: -6px;' : 'bottom: -6px;')}
  ${(p) => (p.$c.includes('w') ? 'left: -6px;' : 'right: -6px;')}
  cursor: ${(p) => (p.$c === 'nw' || p.$c === 'se' ? 'nwse-resize' : 'nesw-resize')};

  &::before {
    content: '';
    position: absolute;
    inline-size: 16px;
    block-size: 16px;
    ${(p) => (p.$c.includes('n') ? 'top: 4px;' : 'bottom: 4px;')}
    ${(p) => (p.$c.includes('w') ? 'left: 4px;' : 'right: 4px;')}
    border: 0 solid #fff;
    ${(p) => (p.$c.includes('n') ? 'border-top-width: 3px;' : 'border-bottom-width: 3px;')}
    ${(p) => (p.$c.includes('w') ? 'border-left-width: 3px;' : 'border-right-width: 3px;')}
  }
`;
