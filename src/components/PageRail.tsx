import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Icon } from './Icon';
import { SegmentedControl } from './SegmentedControl';
import { PageThumbs } from '../editor/PageThumbs';
import { OutlineList, TOC_DEPTH } from '../editor/OutlineList';
import { ZoomBar } from '../editor/ZoomBar';
import { outlineOf } from '../model/outline';
import type { Action } from '../model/actions';
import type { Page } from '../model/paginate';
import type { Doc } from '../model/types';

/**
 * 欄寬裡縮圖以外的部分：右緣拖曳帶、清單左右內距、捲軸、頁碼與它旁邊的間距。
 * 縮圖寬＝欄寬減掉這段，所以拖寬縮圖就跟著變大。捲軸寬在 PageThumbs 裡釘成 6px，
 * 不吃系統設定——Windows 與「一律顯示捲軸」的 Mac 預設要佔約 15px，少算就壓到頁碼。
 */
const THUMB_CHROME = 50;
/** 展開的預設寬度、拖的範圍、收合後的窄條。拖到比最窄還窄就吸附收合。預設照 Gamma 收窄。 */
export const RAIL_INLINE = 152;
const RAIL_MIN = 120;
const RAIL_MAX = 320;
const CLOSED_INLINE = 28;
/** 右緣可拖的帶子寬度。留在欄的內距裡，不跟清單的捲軸疊在一起。 */
const EDGE = 8;

type Props = {
  doc: Doc;
  pages: Page[];
  /** 目前這一頁：預覽是正在看的那頁，編輯是捲到畫面中的那頁。 */
  current: number;
  onGoPage: (index: number) => void;
  onGoRow: (rowId: string) => void;
  /** 不給就是唯讀（預覽模式）：縮圖不能刪不能拖，目次不能改名不能刪。 */
  dispatch?: (action: Action) => void;
  /** 縮放控制，固定在欄底。預覽是一次一頁、整頁塞進畫面，沒有縮放，所以不給。 */
  zoom?: { percent: number; onZoom: (z: number) => void; onZoomIn: () => void; onZoomOut: () => void };
};

/**
 * 左側的頁面縮圖與目次。縮放不在這裡（見 ZoomBar）：這一欄只放「教材有什麼」。
 *
 * 縮圖與目次都畫在 EditorProvider 之外（App 的擺法），理由見 PageThumbs。
 * 可收合成一條窄條，但預設展開：老師要看得到頁面縮圖。
 */
export function PageRail({ doc, pages, current, onGoPage, onGoRow, dispatch, zoom }: Props) {
  const [tab, setTab] = useState<'pages' | 'outline'>('pages');
  const [open, setOpen] = useState(true);
  const [width, setWidth] = useState(RAIL_INLINE);
  const drag = useRef<{ x: number; w: number } | null>(null);

  /** 拖右緣調寬；拖到比最窄還窄就收合，收合狀態往右拖一點就展開。 */
  const startResize = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, w: open ? width : CLOSED_INLINE };
    const el = e.currentTarget;
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      /* 沒有捕捉也能拖 */
    }
    const move = (ev: PointerEvent) => {
      const d = drag.current;
      if (!d) return;
      const w = d.w + (ev.clientX - d.x);
      if (w < RAIL_MIN - 24) {
        setOpen(false);
        return;
      }
      setOpen(true);
      setWidth(Math.max(RAIL_MIN, Math.min(RAIL_MAX, w)));
    };
    const up = () => {
      drag.current = null;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    e.preventDefault();
  };
  const outlineCount = outlineOf(doc).filter((i) => i.depth <= TOC_DEPTH).length;

  if (!open) {
    return (
      <Rail data-page-rail $inline={CLOSED_INLINE}>
        <Edge
          role="separator"
          aria-label="展開側欄"
          title="往右拖或點一下展開"
          $vertical
          onPointerDown={startResize}
          onClick={() => setOpen(true)}
        >
          <Icon name="chevron-right" size={16} />
        </Edge>
      </Rail>
    );
  }

  return (
    <Rail data-page-rail $inline={width} style={{ paddingInlineEnd: EDGE }}>
      <Head>
        <SegmentedControl
          compact
          aria-label="側欄內容"
          value={tab}
          options={[
            { value: 'pages', label: `頁面 ${pages.length}` },
            { value: 'outline', label: `目次 ${outlineCount}` },
          ]}
          onChange={setTab}
        />
      </Head>

      {tab === 'pages' ? (
        <PageThumbs
          doc={doc}
          pages={pages}
          current={current}
          thumbInline={width - THUMB_CHROME}
          onGoPage={onGoPage}
          dispatch={dispatch}
        />
      ) : (
        <OutlineList doc={doc} pages={pages} current={current} onGoRow={onGoRow} dispatch={dispatch} />
      )}

      {zoom && <ZoomBar {...zoom} />}

      {/* 右緣整條都可以拖：拖寬拖窄，拖到底就收合。不放按鈕，捲軸就遮不到它 */}
      <Edge role="separator" aria-label="調整側欄寬度" title="拖曳調整寬度，拖到底收合" onPointerDown={startResize} />

    </Rail>
  );
}

const Rail = styled.nav<{ $inline: number }>`
  position: relative;
  inline-size: ${(p) => p.$inline}px;
  flex: none;
  display: flex;
  flex-direction: column;
  background: ${(p) => p.theme.surface.raised};
  /* 縮圖列永遠橫排，即使教材是直排——它是介面不是內容 */
  writing-mode: horizontal-tb;
`;

const Head = styled.div`
  /* 切換鈕撐滿整欄寬 */
  display: grid;
  /* 上緣不留白：切換鈕的頂端跟右邊編輯區的灰卡切齊 */
  padding: 0 6px;
`;

/**
 * 右緣的拖曳帶。平常看不見（側欄白底跟編輯區灰底的色差就分得開，不再畫硬線），滑過才出現一條藍線；收合後整條窄欄就是它，
 * 中間露一個往右的箭頭提示可以拖開或點開。
 */
const Edge = styled.div<{ $vertical?: boolean }>`
  position: absolute;
  inset-block: 0;
  inset-inline-end: 0;
  inline-size: ${(p) => (p.$vertical ? '100%' : `${EDGE}px`)};
  display: grid;
  place-items: center;
  cursor: col-resize;
  touch-action: none;
  color: ${(p) => p.theme.icon.secondary};
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    inset-block: 0;
    inset-inline-end: 0;
    inline-size: 1px;
    background: transparent;
    transition: inline-size 0.12s, background 0.12s;
  }
  &:hover::before,
  &:active::before {
    inline-size: 3px;
    background: ${(p) => p.theme.border.hover};
  }
`;

