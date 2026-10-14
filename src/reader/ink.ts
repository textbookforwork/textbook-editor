/**
 * 筆跡：純資料與純函式，不碰 React 與 DOM。
 *
 * 座標一律是**頁座標**（未縮放的頁面像素），跟分頁引擎同一套。
 * 畫布用 viewBox 對到頁面尺寸，所以整頁縮放時筆跡自動跟著縮，
 * 存下來的資料也跟螢幕大小無關——平板上畫的、投影機上看是同一個位置。
 *
 * 筆跡以頁為單位存，鍵含教材 id 與頁碼。頁是算出來的，內容一改頁碼會變，
 * 但閱讀模式看的是定稿，這個取捨可以接受。
 */

export type Point = [number, number];

export type Stroke = {
  id: string;
  tool: 'pen' | 'highlighter';
  points: Point[];
};

/** 筆的粗細（頁座標）。螢光筆用疊色，顏色由 CSS token 決定，這裡只管形狀。 */
export const STROKE_WIDTH: Record<Stroke['tool'], number> = {
  pen: 2.5,
  highlighter: 16,
};

/** 橡皮擦的命中半徑（頁座標）。 */
export const ERASER_RADIUS = 8;

/** 兩個取樣點近到這個距離就不收，免得慢慢畫時一筆存幾千個點。 */
const MIN_STEP = 1.2;

export function inkKey(docId: string, pageIndex: number): string {
  return `ds-reader:ink:${docId}:${pageIndex}`;
}

export function loadInk(key: string): Stroke[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const list = JSON.parse(raw) as unknown;
    return Array.isArray(list) ? (list as Stroke[]) : [];
  } catch {
    return [];
  }
}

export function saveInk(key: string, strokes: Stroke[]): void {
  try {
    if (strokes.length === 0) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(strokes));
  } catch {
    // 存不進去就只留在這次的畫面上
  }
}

/** 把新的取樣點接到筆跡後面；太靠近上一點就略過。回傳新陣列，不改原本的。 */
export function appendPoint(points: Point[], p: Point): Point[] {
  const last = points[points.length - 1];
  if (last && Math.hypot(p[0] - last[0], p[1] - last[1]) < MIN_STEP) return points;
  return [...points, p];
}

/** SVG path 的 d。只有一個點時補一小段，點一下也要看得到一個點。 */
export function pathOf(points: Point[]): string {
  if (points.length === 0) return '';
  const [x0, y0] = points[0];
  if (points.length === 1) return `M${x0} ${y0} L${x0 + 0.01} ${y0}`;
  let d = `M${x0} ${y0}`;
  for (let i = 1; i < points.length; i += 1) d += ` L${points[i][0]} ${points[i][1]}`;
  return d;
}

/** 點到線段的距離。 */
function distToSegment(p: Point, a: Point, b: Point): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(p[0] - a[0], p[1] - a[1]);
  let t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}

/** 這個點碰到哪些筆跡。橡皮擦是整筆擦，不是擦掉一截——學生擦錯一筆再畫，比擦出一個缺口好處理。 */
export function strokesAt(strokes: Stroke[], p: Point, radius = ERASER_RADIUS): Set<string> {
  const hit = new Set<string>();
  for (const s of strokes) {
    const reach = radius + STROKE_WIDTH[s.tool] / 2;
    if (s.points.length === 1) {
      if (Math.hypot(p[0] - s.points[0][0], p[1] - s.points[0][1]) <= reach) hit.add(s.id);
      continue;
    }
    for (let i = 1; i < s.points.length; i += 1) {
      if (distToSegment(p, s.points[i - 1], s.points[i]) <= reach) {
        hit.add(s.id);
        break;
      }
    }
  }
  return hit;
}

/* ------------------------------------------------------------------ */
/* 復原／取消復原：只管筆跡，跟教材的 history 無關。                       */
/* ------------------------------------------------------------------ */

export type InkHistory = { past: Stroke[][]; future: Stroke[][] };

/** 留多少步。一頁的筆跡不會多到哪去，50 步足夠。 */
const HISTORY_LIMIT = 50;

export const emptyHistory = (): InkHistory => ({ past: [], future: [] });

/** 記下「改之前」的狀態。任何新動作都把 future 清掉，跟一般編輯器一樣。 */
export function pushHistory(h: InkHistory, before: Stroke[]): InkHistory {
  const past = [...h.past, before];
  if (past.length > HISTORY_LIMIT) past.shift();
  return { past, future: [] };
}

export function undoInk(
  h: InkHistory,
  present: Stroke[]
): { history: InkHistory; strokes: Stroke[] } | null {
  const before = h.past[h.past.length - 1];
  if (!before) return null;
  return {
    history: { past: h.past.slice(0, -1), future: [...h.future, present] },
    strokes: before,
  };
}

export function redoInk(
  h: InkHistory,
  present: Stroke[]
): { history: InkHistory; strokes: Stroke[] } | null {
  const after = h.future[h.future.length - 1];
  if (!after) return null;
  return {
    history: { past: [...h.past, present], future: h.future.slice(0, -1) },
    strokes: after,
  };
}
