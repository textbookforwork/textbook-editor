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
 * 形狀框的位置不是隨機的：每科固定十款（PRESETS），用教材編號算出是第幾款，同一本書永遠同一款。
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
    [117, 260.9, 322, 1.161, 1, 2],
    [178, 232.7, 191, 1, -1, 3],
    [38, 199.3, 49, 0.844, 1, 2],
    [119.5, 258.7, 292, 1.024, 1, 1],
    [114.2, 277, 346, 0.953, 1, 3],
    [131.3, 276.1, 189, 1.092, 1, 1],
    [36, 199.1, 297, 0.981, -1, 2],
    [48.3, 198.9, 109, 0.869, -1, 3],
    [193, 189.7, 124, 0.8, 1, 3],
    [204.6, 199.9, 142, 1.071, 1, 1],
  ],
  social: [
    [56.1, 205.2, 315, 0.719, -1, 0],
    [46.3, 201.2, 52, 0.764, -1, 0],
    [70.7, 236.3, 120, 0.825, 1, 0],
    [186.7, 189.3, 313, 0.94, 1, 1],
    [56.4, 204.1, 81, 1.157, 1, 1],
    [188.2, 189, 281, 0.722, 1, 1],
    [161.5, 237.3, 53, 0.924, -1, 1],
    [71.8, 240.6, 124, 1.016, 1, 0],
    [120.4, 269.6, 246, 1.064, -1, 1],
    [41, 203.9, 199, 0.986, -1, 2],
  ],
  english: [
    [78.2, 245.2, 211, 1.08, -1, 1],
    [48.7, 214.4, 261, 1.129, -1, 2],
    [36.1, 209.5, 215, 0.905, -1, 2],
    [45, 196.2, 30, 0.867, 1, 3],
    [40.6, 196.2, 74, 0.718, 1, 2],
    [74, 244, 322, 1.15, -1, 2],
    [75.8, 244.1, 36, 1.07, -1, 2],
    [200, 194.1, 96, 1.169, -1, 2],
    [170.5, 226.5, 283, 0.729, 1, 1],
    [61.2, 247.8, 325, 0.725, 1, 1],
  ],
  science: [
    [205.6, 193, 109, 0.855, 1, 0],
    [190.1, 189.8, 29, 1.075, -1, 0],
    [78.8, 243.3, 71, 1.174, 1, 0],
    [124, 263.1, 266, 0.85, -1, 0],
    [167.9, 241.9, 286, 1.084, 1, 0],
    [115.4, 273.6, 190, 0.754, -1, 0],
    [163.7, 240.2, 150, 0.738, -1, 1],
    [184.8, 200.4, 53, 1.184, -1, 0],
    [71.7, 235.4, 349, 1.159, -1, 1],
    [128.9, 259.3, 175, 0.746, -1, 0],
  ],
  math: [
    [66.2, 251.8, 328, 1.173, 1, 1],
    [169.4, 232.4, 75, 1.055, -1, 3],
    [205.4, 190.2, 16, 1.187, 1, 3],
    [169.9, 231.4, 170, 1.038, 1, 1],
    [160.4, 232.9, 18, 0.879, -1, 1],
    [123.5, 277.5, 29, 1.057, -1, 1],
    [165.5, 243.3, 75, 0.855, -1, 1],
    [192, 188.3, 3, 0.796, 1, 3],
    [187.6, 187.9, 188, 1.184, -1, 3],
    [161.7, 236.2, 193, 1.177, 1, 1],
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
  const mix = [d.map((v) => v * 0.84), d, d.map((v, k) => v + (l[k] - v) * 0.28), d.map((v, k) => v + (l[k] - v) * 0.5)][level];
  return `rgb(${mix.map((v) => Math.round(v)).join(',')})`;
}

/** 教材編號 → 第幾款（0–9） */
export function presetIndex(id: string) {
  let h = 2166136261;
  for (const c of id) { h ^= c.codePointAt(0)!; h = Math.imul(h, 16777619); }
  return (h >>> 0) % 10;
}

export function FramedCover({ subject, art, edition, title, seed }: { subject: string; art: string | null | undefined; edition: string; title: string; seed: string }) {
  const shape = shapeOf(subject);
  const def = SHAPES[shape];
  const [cx, cy0, rot, size, flip, level] = PRESETS[shape === 'other' ? 'chinese' : shape][presetIndex(seed)];
  const cy = cy0 * Y;
  const maskRef = useRef<SVGPathElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const clipId = `frame-${seed.replace(/[^a-zA-Z0-9]/g, '')}-${presetIndex(seed)}`;

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
