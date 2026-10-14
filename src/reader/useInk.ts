import { useCallback, useReducer, useRef } from 'react';
import {
  emptyHistory,
  inkKey,
  loadInk,
  pushHistory,
  redoInk,
  saveInk,
  strokesAt,
  undoInk,
  type InkHistory,
  type Point,
  type Stroke,
} from './ink';

/**
 * 這一頁的筆跡：讀、畫、擦、清、復原。
 *
 * 筆跡狀態跟著「教材 id + 頁碼」走：翻頁就換一份，翻回來從 localStorage 讀回來。
 * 復原的歷史按頁各留一份（不進 localStorage），翻走再翻回來這次還能復原，
 * 重新整理後就只剩筆跡本身。
 *
 * 資料放在 ref、state 只拿來觸發重畫：指標事件一個接一個來得很快，
 * 用 closure 裡的 state 會讀到上一個事件之前的值，放開時那一筆就不見了。
 *
 * 一筆的過程（按下→移動→放開）只在放開時進歷史、存檔；拖的時候只更新畫面。
 * 橡皮擦同理：一次拖曳擦掉幾筆算一步。
 */
export function useInk(docId: string, pageIndex: number) {
  const key = inkKey(docId, pageIndex);
  const [, repaint] = useReducer((n: number) => n + 1, 0);

  const data = useRef<{ key: string; strokes: Stroke[]; draft: Stroke | null }>({
    key,
    strokes: loadInk(key),
    draft: null,
  });
  // 翻頁：當場換成那一頁的筆跡。同一個 key 重算是冪等的，render 幾次都一樣
  if (data.current.key !== key) data.current = { key, strokes: loadInk(key), draft: null };

  const histories = useRef(new Map<string, InkHistory>());
  const historyOf = (k: string) => histories.current.get(k) ?? emptyHistory();

  const setStrokes = (strokes: Stroke[]) => {
    data.current.strokes = strokes;
    repaint();
  };

  /** 定案：寫歷史、存檔、更新畫面。 */
  const commit = useCallback((before: Stroke[], after: Stroke[]) => {
    const k = data.current.key;
    histories.current.set(k, pushHistory(historyOf(k), before));
    saveInk(k, after);
    setStrokes(after);
  }, []);

  const beginStroke = useCallback((tool: Stroke['tool'], p: Point) => {
    data.current.draft = {
      id: `s_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
      tool,
      points: [p],
    };
    repaint();
  }, []);

  const extendStroke = useCallback((next: (points: Point[]) => Point[]) => {
    const d = data.current.draft;
    if (!d) return;
    const points = next(d.points);
    if (points === d.points) return;
    data.current.draft = { ...d, points };
    repaint();
  }, []);

  const endStroke = useCallback(() => {
    const d = data.current.draft;
    if (!d) return;
    data.current.draft = null;
    commit(data.current.strokes, [...data.current.strokes, d]);
  }, [commit]);

  const cancelStroke = useCallback(() => {
    data.current.draft = null;
    repaint();
  }, []);

  // 橡皮擦：按下時記住原狀，拖的時候只改畫面，放開才算一步
  const eraseBase = useRef<Stroke[] | null>(null);
  const eraseAt = useCallback((p: Point) => {
    if (!eraseBase.current) return;
    const { strokes } = data.current;
    const hit = strokesAt(strokes, p);
    if (hit.size) setStrokes(strokes.filter((s) => !hit.has(s.id)));
  }, []);
  const beginErase = useCallback(
    (p: Point) => {
      eraseBase.current = data.current.strokes;
      eraseAt(p);
    },
    [eraseAt]
  );
  const endErase = useCallback(() => {
    const base = eraseBase.current;
    eraseBase.current = null;
    if (!base || base.length === data.current.strokes.length) return;
    commit(base, data.current.strokes);
  }, [commit]);

  const clear = useCallback(() => {
    if (data.current.strokes.length === 0) return;
    commit(data.current.strokes, []);
  }, [commit]);

  const undo = useCallback(() => {
    const k = data.current.key;
    const r = undoInk(historyOf(k), data.current.strokes);
    if (!r) return;
    histories.current.set(k, r.history);
    saveInk(k, r.strokes);
    setStrokes(r.strokes);
  }, []);

  const redo = useCallback(() => {
    const k = data.current.key;
    const r = redoInk(historyOf(k), data.current.strokes);
    if (!r) return;
    histories.current.set(k, r.history);
    saveInk(k, r.strokes);
    setStrokes(r.strokes);
  }, []);

  const history = historyOf(key);
  return {
    strokes: data.current.strokes,
    draft: data.current.draft,
    beginStroke,
    extendStroke,
    endStroke,
    cancelStroke,
    beginErase,
    eraseAt,
    endErase,
    clear,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    hasInk: data.current.strokes.length > 0,
  };
}

export type Ink = ReturnType<typeof useInk>;
