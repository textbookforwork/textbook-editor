import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { BlockView } from '../components/BlockView';
import { Icon } from '../components/Icon';
import { primaryButtonCss } from '../components/buttonStyles';
import { makeText } from '../model/document';
import { newId } from '../model/ids';
import { RICH_PAD, RICH_PAGE, RICH_SETTINGS, RICH_SIZING, richItemCss, richPageCss, useFitScale } from '../viewer/RichPopupView';
import { blockBox } from '../model/blockSizing';
import { ResizeHandles, resizeModeOf } from './ResizeHandles';
import type { Block, TextRole } from '../model/types';
import { pickFile, putFile, putImage } from './assets';
import { blockFor } from '../components/RowView';
import { SCRIM } from '../styles/scrim';

type Props = {
  title: string;
  pages: Block[][];
  /** 按「儲存」才寫回；按關閉就放棄這次的修改。 */
  onSave: (pages: Block[][]) => void;
  onClose: () => void;
};

/** 空白行旁邊浮出的小工具：把這一行設成標題，或在下面插一張圖。H1＝章、H2＝節、H3＝小節，其餘是內文 */
const HEADINGS: { label: string; role: TextRole; size: number; weight: number; title: string }[] = [
  // 按鈕本身的字就畫成那個層級的樣子：H1 最大最粗、往下遞減，「內文」不粗——一眼分得出來
  { label: 'H1', role: 'lessonTitle', size: 17, weight: 700, title: '大標題（章）' },
  { label: 'H2', role: 'sectionTitle', size: 15, weight: 700, title: '中標題（節）' },
  { label: 'H3', role: 'itemTitle', size: 13, weight: 700, title: '小標題' },
  { label: '內文', role: 'body', size: 13, weight: 400, title: '內文（一般段落）' },
];

const emptyBody = () => makeText('', 'body');
/** 段落間距、一行內文的高、元件最矮多少才值得放（頁座標） */
const GAP = 16;
const LINE = 32;
const MIN_MEDIA = 96;

/**
 * 大彈窗的編輯器（照 Figma「彈出頁面」）：接近全螢幕的大視窗，中間像寫文件一樣一行一段——
 * 按 Enter 換下一段、空白段按 Backspace 刪掉；游標所在那一段旁邊浮出 H1／H2／H3／圖片。
 * 上方頁籤可以新增頁面，學生看的時候一次一頁、左右翻。
 *
 * 改的是一份草稿，按「儲存」才寫回；按關閉就放棄（老師可以放心試）。
 */
export function RichPopupModal({ pages: initial, onSave, onClose }: Props) {
  const [pages, setPages] = useState<Block[][]>(() =>
    initial.map((p) => (p.length > 0 ? p : [emptyBody()]))
  );
  const [at, setAt] = useState(0);
  const [focusId, setFocusId] = useState<string | null>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  // 換頁、新增頁面時把目前這頁的頁籤捲進畫面
  useEffect(() => {
    tabsRef.current?.querySelector<HTMLElement>('[data-on]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [at, pages.length]);
  const stageRef = useRef<HTMLDivElement>(null);
  const scale = useFitScale(stageRef);
  // 一頁就是這個框：寬高都固定，不往下長。元件最大就是整頁（扣掉內距）
  const sizing = RICH_SIZING;
  const blocks = pages[at] ?? [];
  // 選取中的元件（圖片、影片、聲音、網頁）：出現外框把手可調大小、可拖曳換位置、浮出刪除鈕
  const [selId, setSelId] = useState<string | null>(null);
  // 拖曳換位置時，放下去會插在哪（線的位置，Area 座標）
  const [drop, setDrop] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  // 這一頁塞不下了：剛做的那一步（插入、拉大、換段）退回去，並提示一下
  const [full, setFull] = useState(false);
  const undoRef = useRef<Block[] | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onClose]);

  /** 把游標放進某一段（等它畫出來）。 */
  const focusBlock = (id: string, atEnd = true) => {
    let tries = 20;
    const run = () => {
      const el = areaRef.current?.querySelector<HTMLElement>(`[data-rich-id="${id}"] [contenteditable="true"]`);
      if (!el) {
        if (--tries > 0) requestAnimationFrame(run);
        return;
      }
      el.focus();
      const sel = window.getSelection();
      if (sel) {
        sel.selectAllChildren(el);
        if (atEnd) sel.collapseToEnd();
        else sel.collapseToStart();
      }
    };
    requestAnimationFrame(run);
  };

  const setPage = (next: Block[]) => setPages((ps) => ps.map((p, i) => (i === at ? next : p)));
  /** 會讓頁面變長的動作走這裡：畫出來若超出這一頁，就退回上一步 */
  const tryPage = (next: Block[]) => {
    undoRef.current = blocks;
    setPage(next);
  };
  useLayoutEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    const ls = [...el.querySelectorAll<HTMLElement>('[data-rich-id]')];
    const bottom = ls.length ? Math.max(...ls.map((l) => l.offsetTop + l.offsetHeight)) : 0;
    const over = bottom > RICH_PAGE.height - RICH_PAD + 1;
    if (over && undoRef.current) {
      const prev = undoRef.current;
      undoRef.current = null;
      setPage(prev);
      setFull(true);
      return;
    }
    undoRef.current = null;
  });
  useEffect(() => {
    if (!full) return;
    const t = setTimeout(() => setFull(false), 2400);
    return () => clearTimeout(t);
  }, [full]);
  // 換頁就取消選取
  useEffect(() => setSelId(null), [at]);
  const replace = (id: string, next: Block) => setPage(blocks.map((b) => (b.id === id ? next : b)));
  const insertAfter = (id: string, b: Block) => {
    const i = blocks.findIndex((x) => x.id === id);
    const next = blocks.slice();
    next.splice(i + 1, 0, b);
    tryPage(next);
  };
  // 刪掉元件後頁面不能沒有可以打字的地方
  const lines = () => [...(areaRef.current?.querySelectorAll<HTMLElement>('[data-rich-id]') ?? [])];
  const dropIndexAt = (y: number) => {
    const ls = lines();
    const i = ls.findIndex((l) => {
      const r = l.getBoundingClientRect();
      return y < r.top + r.height / 2;
    });
    return i < 0 ? ls.length : i;
  };
  /** 按住選取中的元件拖：上下移動找落點，放開插過去。點一下（沒移動）只是選取 */
  const startMove = (e: React.PointerEvent, id: string) => {
    const t = e.target as HTMLElement;
    if (t.closest('button, input, textarea, a, iframe, video, audio, [aria-label="調整尺寸"]')) {
      setSelId(id);
      return;
    }
    e.preventDefault();
    setSelId(id);
    (document.activeElement as HTMLElement | null)?.blur?.();
    const x0 = e.clientX;
    const y0 = e.clientY;
    let moving = false;
    /** 指標下的落點：在某一項的左右四分之一＝放到它旁邊；其他＝插在它上面或下面 */
    type Target = { index: number; side?: 'left' | 'right' };
    const targetAt = (cx: number, cy: number): Target => {
      const ls = lines();
      for (let k = 0; k < ls.length; k++) {
        const l = ls[k];
        if (l.dataset.richId === id) continue;
        const r = l.getBoundingClientRect();
        if (cy < r.top || cy > r.bottom) continue;
        const rel = (cx - r.left) / (r.width || 1);
        if (rel < 0.25 && cx >= r.left - 24) return { index: k, side: 'left' };
        if (rel > 0.75 && cx <= r.right + 24) return { index: k, side: 'right' };
        return { index: cy < r.top + r.height / 2 ? k : k + 1 };
      }
      return { index: dropIndexAt(cy) };
    };
    const show = (tg: Target) => {
      const ls = lines();
      if (ls.length === 0) return setDrop(null);
      if (tg.side) {
        const l = ls[tg.index];
        const x = tg.side === 'left' ? l.offsetLeft - 9 : l.offsetLeft + l.offsetWidth + 7;
        return setDrop({ top: l.offsetTop, left: x, width: 2, height: l.offsetHeight });
      }
      const top = tg.index < ls.length ? ls[tg.index].offsetTop - 9 : ls[ls.length - 1].offsetTop + ls[ls.length - 1].offsetHeight + 7;
      setDrop({ top, left: RICH_PAD, width: RICH_PAGE.width - RICH_PAD * 2, height: 2 });
    };
    const move = (ev: PointerEvent) => {
      if (!moving && Math.hypot(ev.clientX - x0, ev.clientY - y0) < 5) return;
      moving = true;
      show(targetAt(ev.clientX, ev.clientY));
    };
    const up = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      setDrop(null);
      if (!moving) return;
      const tg = targetAt(ev.clientX, ev.clientY);
      const from = blocks.findIndex((b) => b.id === id);
      if (from < 0) return;
      const next = blocks.slice();
      const [b] = next.splice(from, 1);
      const to = tg.index > from ? tg.index - 1 : tg.index;
      // 放到旁邊＝靠左／靠右，排在那一項前面，那一項就繞著它排；放在上下＝取消靠邊
      next.splice(to, 0, { ...b, float: tg.side } as Block);
      tryPage(next);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const remove = (id: string) => {
    const next = blocks.filter((b) => b.id !== id);
    setPage(next.some((b) => b.type === 'text') ? next : [...next, emptyBody()]);
  };

  /**
   * 插入元件時這一頁還剩多高（頁座標）。插在空白段落上會換掉那一段，它的高度也算回來；
   * 元件後面要接一段可以打字的，也先扣掉。
   */
  const roomFor = (id: string) => {
    const el = areaRef.current;
    if (!el) return 0;
    const ls = [...el.querySelectorAll<HTMLElement>('[data-rich-id]')];
    const bottom = ls.length ? Math.max(...ls.map((l) => l.offsetTop + l.offsetHeight)) : RICH_PAD;
    const cur = blocks.find((x) => x.id === id);
    const curEl = el.querySelector<HTMLElement>(`[data-rich-id="${id}"]`);
    const freed = cur && cur.type === 'text' && !cur.spans.some((x) => x.text.trim()) && curEl ? curEl.offsetHeight : -GAP;
    return RICH_PAGE.height - RICH_PAD - bottom + freed - GAP - LINE;
  };
  /** 依剩下的高度決定寬度（佔欄寬的百分比）：最多半頁高、最多滿寬；太小就不放 */
  const pctFor = (room: number, ratio: number) => {
    const h = Math.min(room, RICH_SIZING.maxBlockSize / 2);
    if (h < MIN_MEDIA) return null;
    return Math.max(10, Math.min(100, Math.floor(((h * ratio) / RICH_SIZING.inlineSize) * 100)));
  };

  const addImageAfter = async (id: string) => {
    const file = await pickFile('image/*');
    if (!file) return;
    const { assetId, aspectRatio } = await putImage(file);
    const widthPct = pctFor(roomFor(id), aspectRatio);
    if (widthPct === null) return setFull(true);
    const img: Block = {
      id: newId('blk'),
      type: 'image',
      assetId,
      alt: file.name,
      caption: '',
      hasCaption: false,
      aspectRatio,
      widthPct,
      popups: [],
    };
    const i = blocks.findIndex((x) => x.id === id);
    const cur = blocks[i];
    const next = blocks.slice();
    // 在空白段落上插圖：直接換成圖，不留一段空白在上面
    if (cur && cur.type === 'text' && !cur.spans.some((s) => s.text.trim())) next.splice(i, 1, img);
    else next.splice(i + 1, 0, img);
    // 圖後面一定接一段可以打字的
    const after = next.indexOf(img) + 1;
    if (!next[after] || next[after].type !== 'text') {
      const t = emptyBody();
      next.splice(after, 0, t);
      setFocusId(t.id);
      focusBlock(t.id);
    }
    tryPage(next);
  };

  /** 影片、聲音、網頁：在這一段後面放一個空的元件（空白段落就直接換掉），後面再接一段可以打字的 */
  const addMediaAfter = async (id: string, key: 'video' | 'audio' | 'web') => {
    // 大彈窗是一個視窗不是一頁，元件預設撐滿寬；聲音是一條播放列，半寬就好
    // 影片、網頁是 16:9，依剩下的空間縮小放進來；聲音是一條播放列，半寬
    const widthPct = key === 'audio' ? (roomFor(id) >= 64 ? 50 : null) : pctFor(roomFor(id), 16 / 9);
    if (widthPct === null) return setFull(true);
    let media = { ...blockFor(key), widthPct } as Block;
    // 聲音只能上傳：按下去直接開檔案夾，選好才放進來（取消就什麼都不加）
    if (key === 'audio') {
      const file = await pickFile('audio/*');
      if (!file) return;
      media = { ...media, assetId: putFile(file), title: file.name } as Block;
    }
    const i = blocks.findIndex((x) => x.id === id);
    const cur = blocks[i];
    const next = blocks.slice();
    if (cur && cur.type === 'text' && !cur.spans.some((x) => x.text.trim())) next.splice(i, 1, media);
    else next.splice(i + 1, 0, media);
    const after = next.indexOf(media) + 1;
    if (!next[after] || next[after].type !== 'text') next.splice(after, 0, emptyBody());
    tryPage(next);
    // 游標接到元件後面那一段，繼續打字
    const t = next[after];
    if (t) {
      setFocusId(t.id);
      focusBlock(t.id);
    }
  };

  /** Enter 換下一段、空白段 Backspace 刪掉並回到上一段。輸入法選字中的 Enter 不算 */
  const onKeyDown = (e: React.KeyboardEvent, b: Block) => {
    if (b.type !== 'text' || e.nativeEvent.isComposing) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const t = emptyBody();
      insertAfter(b.id, t);
      setFocusId(t.id);
      focusBlock(t.id);
    } else if (e.key === 'Backspace' && !b.spans.some((s) => s.text)) {
      const i = blocks.findIndex((x) => x.id === b.id);
      if (i <= 0 || blocks.length === 1) return;
      e.preventDefault();
      const prev = blocks[i - 1];
      remove(b.id);
      if (prev.type === 'text') {
        setFocusId(prev.id);
        focusBlock(prev.id);
      }
    }
  };

  // 打開、換頁、新增頁面時游標直接進到這頁的第一段，不用先點一下才能打字
  useEffect(() => {
    const first = (pages[at] ?? []).find((b) => b.type === 'text');
    if (first) focusBlock(first.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [at, pages.length]);

  const addPage = () => {
    setPages((ps) => [...ps, [emptyBody()]]);
    setAt(pages.length);
  };
  const removePage = (i: number) => {
    if (pages.length <= 1) return;
    setPages((ps) => ps.filter((_, j) => j !== i));
    setAt((cur) => Math.max(0, cur > i || cur === pages.length - 1 ? cur - 1 : cur));
  };

  // 存檔時把每頁結尾多出來的空白段拿掉，免得學生翻到一頁空白
  const save = () =>
    onSave(
      pages
        .map((p) => p.filter((b, i) => !(b.type === 'text' && !b.spans.some((s) => s.text.trim()) && i === p.length - 1 && p.length > 1)))
        .filter((p, _i, all) => all.length === 1 || p.some((b) => b.type !== 'text' || b.spans.some((s) => s.text.trim())))
    );

  return createPortal(
    <Scrim onPointerDown={(e) => e.target === e.currentTarget && onClose()}>
      <Panel role="dialog" aria-label="編輯大彈窗">
        <Head>
          {/* 頁籤取代標題：一頁一個，超過寬度往右滑；新增頁面固定在頁籤後面，不會被擠出去 */}
          <TabsScroll role="tablist" aria-label="頁面" ref={tabsRef}>
            {pages.map((_, i) => (
              <Tab key={i} type="button" role="tab" aria-selected={i === at} data-on={i === at || undefined} $on={i === at} onClick={() => setAt(i)}>
                第 {i + 1} 頁
                {i === at && pages.length > 1 && (
                  <TabX
                    role="button"
                    aria-label={`刪除第 ${i + 1} 頁`}
                    onClick={(e) => {
                      e.stopPropagation();
                      removePage(i);
                    }}
                  >
                    <Icon name="x" size={16} />
                  </TabX>
                )}
              </Tab>
            ))}
          </TabsScroll>
          <AddPage type="button" onClick={addPage}>
            新增頁面
            <Icon name="plus" size={16} />
          </AddPage>
          <HeadActions>
          {/* 儲存放在標題列右邊（一般大小的黑色按鈕），不另外佔一整條底部 */}
          <Save type="button" onClick={save}>
            儲存
          </Save>
          <Close type="button" onClick={onClose} aria-label="關閉（不儲存）">
            <Icon name="x" size={24} />
          </Close>
          </HeadActions>
        </Head>



        <Stage ref={stageRef}>
        <Area
          ref={areaRef}
          style={{ transform: `scale(${scale || 1})`, visibility: scale > 0 ? undefined : 'hidden' }}
          /* 點元件下面的空白處＝接著打字：游標進最後一段；最後一個是圖片影片這類，就在後面補一段 */
          onPointerDown={(e) => {
            if (e.target !== e.currentTarget) return;
            e.preventDefault();
            setSelId(null);
            const last = blocks[blocks.length - 1];
            if (last && last.type === 'text') return focusBlock(last.id);
            const t = emptyBody();
            setPage([...blocks, t]);
            focusBlock(t.id);
          }}
        >
          {scale > 0 &&
            blocks.map((b) => (
              <Line
                key={b.id}
                /* 提示字：整頁只有這一段，或游標正在這個空白段落上（元件後面接著打字時看得到自己在哪） */
                $hint={blocks.length === 1 || focusId === b.id}
                $fit={b.type !== 'text'}
                data-rich-id={b.id}
                $movable={selId === b.id}
                $float={b.float}
                onFocusCapture={() => {
                  setFocusId(b.id);
                  if (b.type === 'text') setSelId(null);
                }}
                onKeyDownCapture={(e) => onKeyDown(e, b)}
                onPointerDownCapture={b.type !== 'text' ? (e) => startMove(e, b.id) : undefined}
              >
                {selId === b.id && resizeModeOf(b) && blockBox(b, sizing) && (
                  <ResizeHandles
                    mode={resizeModeOf(b)!}
                    box={blockBox(b, sizing)!}
                    columnInline={sizing.inlineSize}
                    vertical={false}
                    onResize={(next) => {
                      // 聲音條縮太窄，裡面的播放鈕和上傳鈕會擠出框外：最窄 360px
                      const min = b.type === 'audio' ? Math.ceil((360 / Math.max(1, sizing.inlineSize)) * 100) : 0;
                      const fixed = { ...next, widthPct: Math.max(min, next.widthPct ?? b.widthPct ?? 100) };
                      tryPage(blocks.map((x) => (x.id === b.id ? ({ ...x, ...fixed } as Block) : x)));
                    }}
                  />
                )}
                <BlockView
                  block={b}
                  settings={RICH_SETTINGS}
                  sizing={sizing}
                  onEditSpans={b.type === 'text' ? (spans) => tryPage(blocks.map((x) => (x.id === b.id ? { ...b, spans } : x))) : undefined}
                  onPatch={(patch) => replace(b.id, { ...b, ...patch } as Block)}
                />
                {focusId === b.id && b.type === 'text' && (
                  <Mini onPointerDown={(e) => e.preventDefault()}>
                    {HEADINGS.map((h) => (
                      <MiniBtn
                        key={h.role}
                        type="button"
                        $on={b.role === h.role}
                        title={h.title}
                        aria-pressed={b.role === h.role}
                        style={{ fontSize: h.size, fontWeight: h.weight }}
                        onClick={() => replace(b.id, { ...b, role: h.role, fontSize: undefined })}
                      >
                        {h.label}
                      </MiniBtn>
                    ))}
                    <MiniSep />
                    {/* 插入：圖片直接開選檔；影片、聲音、網頁先放空的元件，在元件上貼網址或上傳（跟頁面上一樣） */}
                    <MiniBtn type="button" $on={false} title="插入圖片" aria-label="插入圖片" onClick={() => void addImageAfter(b.id)}>
                      <Icon name="image" size={20} />
                    </MiniBtn>
                    <MiniBtn type="button" $on={false} title="插入影片" aria-label="插入影片" onClick={() => addMediaAfter(b.id, 'video')}>
                      <Icon name="video" size={20} />
                    </MiniBtn>
                    <MiniBtn type="button" $on={false} title="插入聲音" aria-label="插入聲音" onClick={() => void addMediaAfter(b.id, 'audio')}>
                      <Icon name="music" size={20} />
                    </MiniBtn>
                    <MiniBtn type="button" $on={false} title="插入網頁" aria-label="插入網頁" onClick={() => addMediaAfter(b.id, 'web')}>
                      <Icon name="globe" size={20} />
                    </MiniBtn>
                  </Mini>
                )}
              </Line>
            ))}
          {drop && <DropLine style={drop} />}
          {full && <FullNote role="status">這一頁放不下了，請新增頁面</FullNote>}
        </Area>
        </Stage>
        {selId && blocks.some((b) => b.id === selId) && (
          <SelBar anchorId={selId} areaRef={areaRef} onDelete={() => { remove(selId); setSelId(null); }} />
        )}

      </Panel>
    </Scrim>,
    document.body
  );
}

/* 遮罩：設計系統還沒有 scrim token，跟其他大視窗同一個半透明黑 */
const Scrim = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: grid;
  place-items: center;
  padding: 24px;
  background: ${SCRIM};
`;

/** 照 Figma：淡白底、圓角 20，接近全螢幕（最大 1248×748） */
const Panel = styled.div`
  inline-size: min(1248px, 100%);
  /* 高度跟著頁走：頁是 16:9、寬從頁籤左緣到關閉鈕右緣；視窗太矮才壓縮 */
  max-block-size: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.gapMd};
  padding: ${(p) => p.theme.space.insetLg};
  box-sizing: border-box;
  border-radius: ${(p) => p.theme.radius.panel};
  background: ${(p) => p.theme.surface.page};
  box-shadow: ${(p) => p.theme.shadow.float};
  writing-mode: horizontal-tb;
`;

const Head = styled.header`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.gapSm};
`;


const Close = styled.button`
  display: grid;
  place-items: center;
  inline-size: 36px;
  block-size: 36px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: ${(p) => p.theme.icon.default};
  cursor: pointer;
  &:hover { background: ${(p) => p.theme.surface.sunken}; }
`;

const TabsScroll = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.gapSm};
  min-inline-size: 0;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
  > * { flex: none; }
`;

/** 頁籤：目前這頁是淡灰底深字（不用黑底，黑色留給主要按鈕），其他頁透明灰字 */
const Tab = styled.button<{ $on: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-block-size: 32px;
  padding: 0 14px;
  border: none;
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => (p.$on ? p.theme.surface.muted : 'transparent')};
  color: ${(p) => (p.$on ? p.theme.text.primary : p.theme.text.secondary)};
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: ${(p) => (p.$on ? 500 : 400)};
  cursor: pointer;
  &:hover { background: ${(p) => (p.$on ? p.theme.surface.muted : p.theme.surface.sunken)}; }
`;

const TabX = styled.span`
  display: grid;
  place-items: center;
  margin-inline-end: -6px;
  inline-size: 20px;
  block-size: 20px;
  border-radius: 999px;
  &:hover { background: ${(p) => p.theme.border.subtle}; }
`;

const AddPage = styled.button`
  flex: none;
  margin-inline-end: auto;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-block-size: 32px;
  padding: 0 12px;
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.text.secondary};
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  cursor: pointer;
  &:hover { border-color: ${(p) => p.theme.border.accent}; color: ${(p) => p.theme.text.accent}; }
`;

/** 編輯區：白紙，像寫文件 */
/** 放頁的區域：量寬高算倍率，頁置中 */
const Stage = styled.div`
  position: relative;
  flex: 0 1 auto;
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  min-block-size: 0;
`;

/** 一頁：跟閱讀時同一個 16:9 頁座標，等比縮放。塞不下的動作會被退回，所以內容不會往下長 */
const Area = styled.div`
  ${richPageCss}
  flex: none;
  /* 把手、浮出的小工具要能超出頁緣一點 */
  overflow: visible;
  /* 絕對定位置中：頁本身不參與版面，Stage 多大由彈窗決定，頁再縮放進去（不然 768 高的頁會把彈窗撐破） */
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -${RICH_PAGE.width / 2}px;
  margin-top: -${RICH_PAGE.height / 2}px;
  transform-origin: center;
  border-radius: ${(p) => p.theme.radius.card};
  background: ${(p) => p.theme.surface.raised};
  cursor: text;
`;

const Line = styled.div<{ $hint: boolean; $fit?: boolean; $movable?: boolean; $float?: 'left' | 'right' }>`
  position: relative;
  ${(p) => richItemCss(p.$float)}
  ${(p) => p.$movable && 'cursor: grab; &:active { cursor: grabbing; }'}
  /* 非文字元件只佔自己那麼大，刪除鈕才會貼在元件的右上角而不是整行最右邊 */
  ${(p) => p.$fit && 'inline-size: fit-content; max-inline-size: 100%;'}
  min-inline-size: 0;
  overflow-wrap: anywhere;
  /* 提示字只在整頁還是空的時候出現；開始打字之後，新的空白段落不再顯示 */
  ${(p) => (p.$hint ? '' : `[contenteditable='true']:empty::before { content: none !important; }`)}
  [contenteditable='true']:empty::before {
    content: '輸入內容';
    color: ${(p) => p.theme.text.placeholder};
    pointer-events: none;
  }
`;

const DropLine = styled.div`
  position: absolute;
  border-radius: 999px;
  background: ${(p) => p.theme.tool.border};
  pointer-events: none;
  z-index: 7;
`;

const FullNote = styled.div`
  position: absolute;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  padding: 8px 16px;
  border-radius: 999px;
  background: ${(p) => p.theme.text.primary};
  color: ${(p) => p.theme.surface.raised};
  font-size: var(--ds-typography-body-sm-size);
  white-space: nowrap;
  pointer-events: none;
  z-index: 8;
`;

/**
 * 選取中元件的刪除鈕：浮在元件右邊**外面**（畫在 body 上，不佔頁面空間、不壓到元件裡的按鈕）。
 */
function SelBar({ anchorId, areaRef, onDelete }: { anchorId: string; areaRef: React.RefObject<HTMLDivElement | null>; onDelete: () => void }) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  useLayoutEffect(() => {
    const el = areaRef.current?.querySelector<HTMLElement>(`[data-rich-id="${anchorId}"]`);
    const area = areaRef.current?.getBoundingClientRect();
    if (!el || !area) return setPos(null);
    const r = el.getBoundingClientRect();
    const H = 40;
    // 放在元件右邊、對齊上緣；元件很矮（聲音條）就垂直置中
    const top = r.height < H * 2 ? r.top + (r.height - H) / 2 : r.top;
    const next = { top, left: r.right + 12 };
    setPos((p) => (p && p.top === next.top && p.left === next.left ? p : next));
  });
  if (!pos) return null;
  return createPortal(
    <Bar style={pos} onPointerDown={(e) => e.stopPropagation()}>
      <BarBtn type="button" aria-label="刪除這個元件" title="刪除" onClick={onDelete}>
        <Icon name="trash" size={20} />
      </BarBtn>
    </Bar>,
    document.body
  );
}

const Bar = styled.div`
  position: fixed;
  z-index: 1200;
  display: flex;
  padding: 2px;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.page};
  box-shadow: ${(p) => p.theme.shadow.card};
`;

const BarBtn = styled.button`
  display: grid;
  place-items: center;
  inline-size: 36px;
  block-size: 36px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: ${(p) => p.theme.icon.default};
  cursor: pointer;
  &:hover { background: ${(p) => p.theme.surface.sunken}; color: ${(p) => p.theme.text.primary}; }
`;


/** 游標所在那一段下面浮出的小工具（照 Figma：白色膠囊、淡框） */
/* 浮在這一段下方，不佔頁面空間（不然一打開就把下面的內容往下推、也會被算進頁高） */
const Mini = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 5;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  box-shadow: ${(p) => p.theme.shadow.card};
  padding: 4px 8px;
  border-radius: ${(p) => p.theme.radius.control};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  background: ${(p) => p.theme.surface.raised};
`;

const MiniSep = styled.span`
  inline-size: 1px;
  block-size: 18px;
  margin-inline: 2px;
  background: ${(p) => p.theme.border.subtle};
`;

/** 目前這一段的層級：淡灰底；其他透明 */
const MiniBtn = styled.button<{ $on: boolean }>`
  display: grid;
  place-items: center;
  min-inline-size: 32px;
  block-size: 28px;
  padding: 0 6px;
  border: none;
  border-radius: ${(p) => p.theme.radius.field};
  background: ${(p) => (p.$on ? p.theme.surface.muted : 'transparent')};
  color: ${(p) => p.theme.icon.default};
  font-family: ${(p) => p.theme.typography.fontDisplay};
  line-height: 1;
  cursor: pointer;
  &:hover { background: ${(p) => p.theme.surface.sunken}; }
`;

const HeadActions = styled.div`
  flex: none;
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.gapSm};
`;

/** 一般大小的黑色主要按鈕（36 高） */
const Save = styled.button`
  ${primaryButtonCss}
`;
