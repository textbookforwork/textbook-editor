import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { SHAPES, shapeOf, type Shape } from '../editor/HomeButton';

/**
 * 書櫃封面（2026-10-27 乙練定，mockup：claude.ai/artifact/DmBu48LCu2jL5ptuN6QquB）
 *
 * 兩種封面：
 *   PublisherCover  數位教科書：出版社封面（去掉原本的字）鋪滿，上方漸暗，左上疊白字的出版社＋課名，不套科目框
 *   PlainCover      數位教科書沒有封面圖：科目色平塗＋課名，也不套科目框
 *   FramedCover     自編、共享：科目色平塗＋紙紋，科目形狀當遮罩框露出原書封面圖；沒有封面圖就是白色形狀
 *
 * 形狀框的位置不是隨機的：每科固定十款（PRESETS）。同一本原書的第 n 份副本用第 n 款（存在 MyBook.frame），
 * 幾位老師副本同一本，框裡露出同一張封面也看得出是不同份；舊資料沒存，用教材編號算。
 * 十款的水平位置左三、中四、右三，避免整排都擠在同一側（2026-10-27 乙練）。
 * 游標移到封面上，形狀框像探照燈跟著游標走、放大、轉一點；移開慢慢回原位。封面圖本身不動。
 */

const VB_W = 240;
const VB_H = 300; // 4:5，同書卡比例
/** mockup 是 240×320（3:4）量的，y 座標照比例換到 4:5 */
const Y = VB_H / 320;

/** 每款：[形狀中心 x, 中心 y, 角度, 大小, 左右翻轉 1/-1, 底色色階 0–3] */
type Preset = [number, number, number, number, number, number];
const PRESETS: Record<Exclude<Shape, 'other'>, Preset[]> = {
  chinese: [
    [60, 260.9, 322, 1.2, 1, 1],
    [180, 232.7, 191, 1, -1, 5],
    [120, 234.9, 49, 0.8, 1, 2],
    [195, 258.7, 292, 1, 1, 3],
    [75, 277, 346, 1, 1, 1],
    [135, 276.1, 189, 1.1, 1, 2],
    [165, 234.8, 297, 1, -1, 5],
    [50, 234.8, 109, 0.9, -1, 3],
    [110, 231.1, 124, 0.8, 1, 2],
    [150, 235.2, 142, 1.1, 1, 1],
  ],
  social: [
    [60, 237.3, 315, 0.7, -1, 4],
    [180, 235.7, 52, 0.8, -1, 0],
    [120, 236.3, 120, 0.8, 1, 1],
    [70, 215, 313, 0.9, 1, 2], // 原本跟兩款都露右下同一塊，改左上（2026-10-28）
    [75, 236.8, 81, 1.2, 1, 4],
    [135, 230.8, 281, 0.7, 1, 1],
    [130, 215, 53, 0.9, -1, 0], // 同上，改中上
    [50, 240.6, 124, 1, 1, 2],
    [110, 269.6, 246, 1.1, -1, 4],
    [150, 236.8, 199, 1, -1, 1],
  ],
  english: [
    [60, 245.2, 211, 1.1, -1, 1],
    [180, 241, 99, 1.1, 1, 5],
    [120, 205, 145, 0.85, 1, 1], // 中上（乙練 2026-10-28）
    [195, 233.7, 30, 0.9, 1, 3],
    [190, 205, 286, 0.85, -1, 2], // 右上（乙練 2026-10-28）
    [135, 244, 322, 1.1, -1, 3],
    [165, 222, 324, 1.1, 1, 5], // 往上露臉（2026-10-28）
    [50, 232.8, 96, 1.2, -1, 2],
    [110, 215, 283, 0.85, 1, 1], // 往上露臉
    [70, 215, 325, 0.85, 1, 3], // 左、往上露臉
  ],
  science: [
    [60, 232.4, 109, 0.9, 1, 4],
    [180, 231.1, 29, 1.1, -1, 0],
    [120, 243.3, 71, 1.2, 1, 1],
    [190, 220, 266, 0.9, -1, 4], // 往上露出小丑魚（2026-10-28）
    [75, 241.9, 286, 1.1, 1, 0],
    [120, 225, 190, 0.95, -1, 1], // 往上露出小丑魚
    [165, 215, 150, 0.85, -1, 4], // 往上露出小丑魚
    [50, 235.4, 53, 1.2, -1, 0],
    [110, 235.4, 349, 1.2, -1, 1],
    [150, 215, 175, 0.85, -1, 4], // 往上露出小丑魚
  ],
  math: [
    [60, 251.8, 328, 1.2, 1, 6],
    [180, 232.4, 75, 1.1, -1, 3],
    [120, 231.3, 16, 1.2, 1, 1],
    [195, 231.4, 170, 1, 1, 5],
    [75, 232.9, 18, 0.9, -1, 3],
    [135, 277.5, 29, 1.1, -1, 6],
    [165, 243.3, 75, 0.9, -1, 5],
    [50, 230.5, 3, 0.8, 1, 1],
    [110, 230.4, 188, 1.2, -1, 6],
    [150, 236.2, 193, 1.2, 1, 3],
  ],
};

/**
 * 底色色階：0＝深色再壓暗、1＝科目深色、2、3＝往淺色推。
 * 字色每科固定（乙練定：同一科統一）：國語文、英語文、數學黑字，社會、自然科學白字；
 * 黑字科目不用最暗那階，白字科目只用字看得清楚（對比 3:1 以上）的那幾階——十款表裡已經照這個挑過。
 */
const INK: Record<Shape, string> = { chinese: '#1A1A1A', english: '#1A1A1A', math: '#1A1A1A', social: '#FFFFFF', science: '#FFFFFF', other: '#1A1A1A' };

function tone(shape: Shape, level: number) {
  const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const d = hex(SHAPES[shape].dark), l = hex(SHAPES[shape].light);
  // 0 壓暗、1 科目深色、2／3 往淺色推；4 更深、5 更淺；6 微暗（數學 0 太暗、2 跟 1 分不出來時用，2026-10-28 加）
  const mix = [d.map((v) => v * 0.84), d, d.map((v, k) => v + (l[k] - v) * 0.28), d.map((v, k) => v + (l[k] - v) * 0.5), d.map((v) => v * 0.7), d.map((v, k) => v + (l[k] - v) * 0.75), d.map((v) => v * 0.95)][level];
  return `rgb(${mix.map((v) => Math.round(v)).join(',')})`;
}

/** 舊資料沒存第幾款：教材編號 → 0–9 */
export function presetIndex(id: string) {
  let h = 2166136261;
  for (const c of id) { h ^= c.codePointAt(0)!; h = Math.imul(h, 16777619); }
  return (h >>> 0) % 10;
}

export function FramedCover({ subject, art, edition, title, seed, frame }: { subject: string; art: string | null | undefined; edition: string; title: string; seed: string; frame?: number }) {
  const shape = shapeOf(subject);
  const def = SHAPES[shape];
  const idx = frame ?? presetIndex(seed);
  const [cx, cy0, rot, size, flip, level] = PRESETS[shape === 'other' ? 'chinese' : shape][idx];
  const cy = cy0 * Y;
  const maskRef = useRef<SVGPathElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const clipId = `frame-${seed.replace(/[^a-zA-Z0-9]/g, '')}-${idx}`;

  // 探照燈：只在滑過、或還沒回到原位時跑動畫
  useEffect(() => {
    const box = boxRef.current, mask = maskRef.current;
    if (!box || !mask) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const base = 206 / Math.max(def.w, def.h);
    const rest = { x: cx, y: cy, r: rot, s: size };
    const st = { ...rest, tx: cx, ty: cy, tr: rot, ts: size, hover: false, lastX: null as number | null };
    let raf = 0;
    const draw = (now: number) => {
      const k = reduce ? 1 : st.hover ? 0.1 : 0.08;
      const wob = st.hover && !reduce ? Math.sin(now / 520) * 1.5 : 0;
      st.x += (st.tx - st.x) * k; st.y += (st.ty - st.y) * k; st.r += (st.tr + wob - st.r) * k; st.s += (st.ts - st.s) * k;
      const sc = base * st.s;
      mask.setAttribute('transform', `translate(${st.x.toFixed(2)} ${st.y.toFixed(2)}) rotate(${st.r.toFixed(2)}) scale(${(sc * flip).toFixed(4)} ${sc.toFixed(4)}) translate(${-def.w / 2} ${-def.h / 2})`);
      // 形狀框移到上方課名時，課名先淡掉
      if (metaRef.current) metaRef.current.style.opacity = st.hover && st.y < 112 ? '0' : '1';
      const settled = !st.hover && Math.abs(st.x - st.tx) < 0.1 && Math.abs(st.y - st.ty) < 0.1 && Math.abs(st.r - st.tr) < 0.1 && Math.abs(st.s - st.ts) < 0.001;
      raf = settled ? 0 : requestAnimationFrame(draw);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const local = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      const k = Math.max(VB_W / r.width, VB_H / r.height);
      return [(e.clientX - r.left) * k - (r.width * k - VB_W) / 2, (e.clientY - r.top) * k - (r.height * k - VB_H) / 2];
    };
    const enter = () => { st.hover = true; kick(); };
    const move = (e: PointerEvent) => {
      const [x, y] = local(e);
      st.tx = x; st.ty = y; st.ts = 1.14;
      if (st.lastX != null) st.tr += (x - st.lastX) * 0.3;
      st.lastX = x; kick();
    };
    const leave = () => { st.hover = false; st.tx = rest.x; st.ty = rest.y; st.tr = rest.r; st.ts = rest.s; st.lastX = null; kick(); };
    draw(performance.now());
    box.addEventListener('pointerenter', enter);
    box.addEventListener('pointermove', move);
    box.addEventListener('pointerleave', leave);
    return () => { cancelAnimationFrame(raf); box.removeEventListener('pointerenter', enter); box.removeEventListener('pointermove', move); box.removeEventListener('pointerleave', leave); };
  }, [cx, cy, rot, size, flip, def]);

  return (
    <Frame ref={boxRef} style={{ background: tone(shape, level) }}>
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        {art ? (
          <>
            <defs><clipPath id={clipId}><path ref={maskRef} d={def.d} /></clipPath></defs>
            <image href={art} x="0" y="0" width={VB_W} height={VB_H} preserveAspectRatio="xMidYMid slice" clipPath={`url(#${clipId})`} />
          </>
        ) : (
          <path ref={maskRef} d={def.d} fill="#FFFFFF" />
        )}
      </svg>
      <Meta ref={metaRef} style={{ color: INK[shape] }}>
        <small>{edition}</small>
        <b>{title}</b>
      </Meta>
    </Frame>
  );
}

/** 數位教科書沒有封面圖時（範例書、管理員剛建的空白本）：科目深色平塗＋紙紋＋課名，不套形狀框（形狀框只用在自編、共享） */
export function PlainCover({ subject, edition, title }: { subject: string; edition: string; title: string }) {
  const shape = shapeOf(subject);
  return (
    <Frame style={{ background: tone(shape, 1) }}>
      <Meta style={{ color: INK[shape] }}>
        <small>{edition}</small>
        <b>{title}</b>
      </Meta>
    </Frame>
  );
}

export function PublisherCover({ art, edition, title }: { art: string; edition: string; title: string }) {
  return (
    <Frame $publisher>
      <img src={art} alt="" draggable={false} />
      <Scrim />
      <Meta style={{ color: '#FFFFFF', textShadow: '0 1px 2px rgba(0,0,0,.25)' }}>
        <small>{edition}</small>
        <b>{title}</b>
      </Meta>
    </Frame>
  );
}

const Frame = styled.div<{ $publisher?: boolean }>`
  position: absolute;
  inset: 0;
  overflow: hidden;
  touch-action: none;

  svg, img {
    position: absolute;
    inset: 0;
    inline-size: 100%;
    block-size: 100%;
    display: block;
    object-fit: cover;
  }

  /* 紙紋：一層很淡的雜訊，平塗色才不會像塑膠；出版社封面不加 */
  ${(p) =>
    !p.$publisher &&
    `&::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.22;
      mix-blend-mode: multiply;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .5  0 0 0 0 .45  0 0 0 0 .4  0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
    }`}
`;

const Scrim = styled.div`
  position: absolute;
  inset: 0 0 auto;
  block-size: 52%;
  background: linear-gradient(rgba(20, 20, 20, 0.55), rgba(20, 20, 20, 0));
  pointer-events: none;
`;

const Meta = styled.div`
  position: absolute;
  inset-inline: 9%;
  inset-block-start: 7%;
  z-index: 1;
  pointer-events: none;
  transition: opacity 0.25s;

  small {
    display: block;
    font-size: 12px;
    font-weight: 500;
    opacity: 0.88;
  }
  b {
    display: block;
    margin-block-start: 2px;
    font-size: 26px;
    line-height: 1.25;
    font-weight: 700;
    /* 課名最多兩行，再長才「⋯」 */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
`;
