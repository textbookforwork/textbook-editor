import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Matter from 'matter-js';
import { LIME, PEBBLE_PATH } from '../editor/HomeButton';
import { signIn } from './session';

/**
 * 登入頁（照 Claude Design「形狀夥伴」原型的登入畫面）。原型沒有帳號，填什麼都放行。
 *
 * 畫面是一張 1440 寬的舞台，等比縮放塞進視窗；視窗比 16:10 高（例如 4:3 平板）時舞台跟著拉高，
 * 地板永遠貼齊視窗底邊，logo 與表單在多出來的高度裡置中。右半邊八個形狀從上方
 * 依序掉下來堆在地上，用 Matter.js 算碰撞。形狀的座標都在舞台座標裡，縮放不影響物理。
 * 點形狀會跳一下。偏好減少動態的人直接看到堆好的樣子。
 */
const STAGE_W = 1440;
const STAGE_H = 900;

/** 形狀外框與尺寸取自原型；顏色換成品牌輔色（V1 色彩與形狀計畫） */
const SHAPES = [
  { key: 'orange', color: '#FF854A', w: 212, h: 218, d: 'M42 34 C60 4 90 -4 120 4 C150 12 176 24 188 36 C210 54 214 82 210 104 C200 140 150 190 112 214 C80 222 56 200 40 184 C20 164 2 140 0 112 C-2 80 26 60 42 34Z' },
  { key: 'cyan', color: '#03C5E9', w: 180, h: 176, d: 'M28 20 C46 6 90 0 112 2 C130 4 142 18 152 28 C172 48 182 90 178 120 C176 150 160 166 132 174 C96 182 50 176 20 158 C0 146 -2 126 4 106 C12 80 14 40 28 20Z' },
  { key: 'amber', color: '#F3C11B', w: 183, h: 160, d: 'M10 30 C30 4 90 -2 128 2 C160 6 172 28 182 70 C190 104 176 126 140 146 C110 162 60 160 36 146 C14 134 6 104 2 80 C-2 56 0 42 10 30Z' },
  { key: 'purple', color: '#7F6CDF', w: 165, h: 140, d: 'M18 22 C40 6 70 -2 96 2 C124 8 156 12 162 26 C166 38 158 60 150 88 C140 106 126 118 108 124 C90 130 70 140 50 138 C36 136 24 120 14 102 C2 80 -2 40 18 22Z' },
  { key: 'brown', color: '#93663C', w: 125, h: 130, d: 'M30 30 C42 10 52 0 68 2 C92 6 120 18 124 36 C128 60 120 84 106 104 C92 120 70 128 46 130 C28 130 20 118 14 100 C6 80 -2 64 4 52 C10 42 22 40 30 30Z' },
  { key: 'pink', color: '#FF87C7', w: 144, h: 138, d: 'M35 1 L98 0 L144 41 L130 90 L105 128 L55 138 L9 112 L0 42Z' },
  { key: 'green', color: '#00A36E', w: 104, h: 116, d: 'M8 22 C20 4 46 -2 66 6 C88 14 102 32 104 56 C106 80 98 100 78 110 C56 120 30 116 20 98 C8 80 -2 60 0 42 C2 32 4 28 8 22Z' },
  { key: 'lime', color: LIME, w: 165, h: 112, d: 'M10 8 C40 0 140 -4 160 6 C166 30 166 52 160 66 C148 90 132 108 112 108 C92 108 76 92 56 86 C36 80 14 62 6 44 C0 30 2 14 10 8Z' },
];

/** 沿著外框取樣成多邊形，給物理引擎當碰撞形狀 */
function samplePath(d: string, n: number) {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('style', 'position:absolute;width:0;height:0;visibility:hidden');
  const p = document.createElementNS(NS, 'path');
  p.setAttribute('d', d);
  svg.appendChild(p);
  document.body.appendChild(svg);
  const len = p.getTotalLength();
  const pts = Array.from({ length: n }, (_, i) => {
    const q = p.getPointAtLength((len * i) / n);
    return { x: q.x, y: q.y };
  });
  svg.remove();
  return pts;
}

/** 視窗裝得下 1440×900 的倍率，以及舞台要拉多高才能剛好填滿視窗的高 */
const measure = () => {
  const scale = Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H);
  return { scale, height: window.innerHeight / scale };
};

function useStage() {
  const [stage, setStage] = useState(measure);
  useEffect(() => {
    const fit = () => setStage(measure());
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  return stage;
}

function FallingShapes({ floor }: { floor: number }) {
  const els = useRef<(HTMLDivElement | null)[]>([]);
  const hops = useRef<((i: number) => void) | null>(null);
  const moveFloor = useRef<((y: number) => void) | null>(null);
  const floorRef = useRef(floor);

  useLayoutEffect(() => {
    const { Engine, Bodies, Body, Composite, Vertices } = Matter;
    const engine = Engine.create();
    engine.gravity.y = 1.15;
    const wall = { isStatic: true, friction: 0.8 };
    const ground = Bodies.rectangle(1080, floorRef.current + 50, 900, 100, wall);
    Composite.add(engine.world, [
      ground,
      Bodies.rectangle(706, 1000, 24, 4000, wall),
      Bodies.rectangle(1452, 1000, 24, 4000, wall),
    ]);

    const bodies = SHAPES.map((s) => {
      // hull 只用到 x、y，型別要的 Vertex 其他欄位不影響
      const hull = Vertices.hull(samplePath(s.d, 40) as Matter.Vertex[]);
      const centre = Vertices.centre(hull);
      const minX = 730 + s.w / 2;
      const maxX = 1430 - s.w / 2;
      const body = Bodies.fromVertices(minX + Math.random() * (maxX - minX), -160, [hull], {
        restitution: 0.25,
        friction: 0.55,
        frictionAir: 0.012,
        density: 0.002,
      });
      Body.setAngle(body, (Math.random() - 0.5) * 0.8);
      return { body, centre };
    });

    const draw = () =>
      bodies.forEach(({ body, centre }, i) => {
        const el = els.current[i];
        if (el) el.style.transform = `translate(${body.position.x}px,${body.position.y}px) rotate(${body.angle}rad) translate(${-centre.x}px,${-centre.y}px)`;
      });

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers: number[] = [];
    if (reduced) {
      // 不播掉落：一次放進去、先算到堆好再畫
      bodies.forEach(({ body }, i) => {
        Body.setPosition(body, { x: body.position.x, y: -160 - i * 260 });
        Composite.add(engine.world, body);
      });
      for (let t = 0; t < 900; t++) Engine.update(engine, 1000 / 60);
      draw();
    } else {
      // 大的先掉，一個接一個
      bodies.forEach(({ body }, i) => timers.push(window.setTimeout(() => Composite.add(engine.world, body), 200 + i * 230)));
    }

    let raf = 0;
    const tick = () => {
      Engine.update(engine, 1000 / 60);
      draw();
      raf = requestAnimationFrame(tick);
    };
    if (!reduced) tick();

    moveFloor.current = (y) => {
      Body.setPosition(ground, { x: 1080, y: y + 50 });
      // 地板往下移，形狀要掉下去；減少動態時沒有持續在算，自己算到落地
      if (reduced) {
        for (let t = 0; t < 240; t++) Engine.update(engine, 1000 / 60);
        draw();
      }
    };

    hops.current = (i) => {
      const { body } = bodies[i];
      Body.setVelocity(body, { x: (Math.random() - 0.5) * 6, y: -13 });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.15);
      if (reduced) {
        // 沒有持續在算，跳完要自己算到落地
        for (let t = 0; t < 240; t++) Engine.update(engine, 1000 / 60);
        draw();
      }
    };

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      Engine.clear(engine);
    };
  }, []);

  useEffect(() => {
    if (floorRef.current === floor) return;
    floorRef.current = floor;
    moveFloor.current?.(floor);
  }, [floor]);

  return (
    <>
      {SHAPES.map((s, i) => (
        <Shape key={s.key} ref={(el) => void (els.current[i] = el)} onClick={() => hops.current?.(i)}>
          <svg width={s.w} height={s.h} viewBox={`0 0 ${s.w} ${s.h}`} aria-hidden="true">
            <path d={s.d} fill={s.color} />
          </svg>
        </Shape>
      ))}
    </>
  );
}

export function Login() {
  const { scale, height } = useStage();
  const [email, setEmail] = useState('');

  return (
    <Screen>
      <Stage
        style={{ height, transform: `translateX(-50%) scale(${scale})`, '--dy': `${(height - STAGE_H) / 2}px` } as React.CSSProperties}
      >
        <Brand>
          <svg width={52} height={54} viewBox="0 0 32 32" aria-hidden="true">
            <path d={PEBBLE_PATH} fill={LIME} />
          </svg>
          <span>
            <BrandZh>數位教科書</BrandZh>
            <BrandEn>Digital Textbook</BrandEn>
          </span>
        </Brand>

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          <Welcome>WELCOME !</Welcome>
          <Label>
            電子信箱
            <Input type="email" autoComplete="username" placeholder="請輸入電子郵件" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Label>
          <Label>
            密碼
            <Input type="password" autoComplete="current-password" placeholder="請輸入密碼" />
          </Label>
          <Enter type="submit">
            進入數位教科書
            <Arrow aria-hidden="true">→</Arrow>
          </Enter>
        </Form>

        <Divider />
        <FallingShapes floor={height} />
      </Stage>
    </Screen>
  );
}

const Screen = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: ${(p) => p.theme.surface.raised};
`;

/** 舞台貼齊視窗底邊；高度由 useStage 算，--dy 是比 900 多出來的一半，讓 logo 與表單置中 */
const Stage = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  width: ${STAGE_W}px;
  transform-origin: 50% 100%;
  overflow: hidden;
  color: ${(p) => p.theme.text.primary};
`;

const Brand = styled.div`
  position: absolute;
  left: 133px;
  top: calc(122px + var(--dy));
  display: flex;
  align-items: center;
  gap: 14px;
`;

/** 同書櫃左上角：「數位教科書」用品牌字繁 Think 黑，品牌字只用在 logo */
const BrandZh = styled.span`
  display: block;
  font-family: 'FanThinkGrotesk', var(--ds-typography-font-sans);
  font-weight: 700;
  font-size: 26px;
  letter-spacing: 0.2em;
  line-height: 1.2;
`;

const BrandEn = styled.span`
  display: block;
  font-family: ${(p) => p.theme.typography.fontDisplay};
  font-size: 18px;
  line-height: 1.3;
`;

const Form = styled.form`
  position: absolute;
  left: 200px;
  top: calc(268px + var(--dy));
  width: 342px;
  display: flex;
  flex-direction: column;
`;

const Welcome = styled.h1`
  margin: 0 0 26px;
  font-family: ${(p) => p.theme.typography.fontDisplay};
  font-size: 64px;
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 1.1;
  white-space: nowrap;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-block-end: 20px;
  font-size: 14px;
  color: ${(p) => p.theme.text.secondary};

  &:last-of-type { margin-block-end: 32px; }
`;

const Input = styled.input`
  block-size: 48px;
  padding: 0 24px;
  border: ${(p) => p.theme.border.widthDefault} solid transparent;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.sunken};
  font: inherit;
  font-size: 16px;
  color: ${(p) => p.theme.text.primary};
  outline: none;

  &::placeholder { color: ${(p) => p.theme.text.placeholder}; }
  &:focus {
    background: ${(p) => p.theme.surface.raised};
    border-color: ${(p) => p.theme.border.default};
  }
`;

const Enter = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  block-size: 56px;
  padding: 0 8px 0 24px;
  border: none;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.inverse};
  color: ${(p) => p.theme.text.onInverse};
  font: inherit;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  &:focus-visible { outline: 2px solid ${(p) => p.theme.border.default}; outline-offset: 2px; }
`;

const Arrow = styled.span`
  display: grid;
  place-items: center;
  inline-size: 40px;
  block-size: 40px;
  border-radius: 999px;
  background: ${(p) => p.theme.brand.primary};
  color: ${(p) => p.theme.text.primary};
  font-size: 18px;
  transition: transform 0.2s;

  ${Enter}:hover & { transform: translateX(3px); }
`;

const Divider = styled.div`
  position: absolute;
  left: 720px;
  top: calc(250px + var(--dy));
  width: 1px;
  height: 400px;
  background: ${(p) => p.theme.border.subtle};
`;

/** 位置由物理引擎每一格寫進 transform；一開始先藏在畫面外 */
const Shape = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(-9999px, 0);
  transform-origin: 0 0;
  will-change: transform;
  cursor: pointer;

  svg { display: block; }
`;
