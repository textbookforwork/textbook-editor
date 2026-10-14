import { useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { tileCss } from './tileButton';
import styled from 'styled-components';
import { Icon } from './Icon';
import { TablePicker } from '../editor/TablePicker';
import { blockRegistry } from '../model/registry';
import type { IconName } from '../assets/icons.generated';
import type { BlockType } from '../model/types';

/**
 * 面板上能選的東西。大多是元件；兩個不是：
 *   library   媒體庫——挑一個上傳過的素材，變成對應的元件
 *   image-ai  用 AI 生成一張圖——插進來的是圖片元件，只是入口不同
 * 模組（跨課重複出現、由系統產生的元件）只從 md 匯入，不放在這裡給老師插。
 */
export type InsertKey =
  | Exclude<BlockType, 'module' | 'dialogue' | 'reference' | 'question'>
  | 'library'
  | 'image-ai'
  /* 圖形的子選單：'shape' 本身是矩形，其餘三種各一個鍵；線段用它自己的型別鍵 'line' */
  | 'shape-circle'
  | 'shape-rounded'
  | 'shape-callout';

/** 圖形子選單的順序。跟樣式面板的形狀列一致，老師在兩邊看到的是同一排。 */
const SHAPE_TILES: { key: InsertKey; label: string; glyph: 'rect' | 'circle' | 'rounded' | 'callout' | 'line' }[] = [
  { key: 'shape', label: '矩形', glyph: 'rect' },
  { key: 'shape-circle', label: '圓形', glyph: 'circle' },
  { key: 'shape-rounded', label: '圓角矩形', glyph: 'rounded' },
  { key: 'shape-callout', label: '對話框', glyph: 'callout' },
  { key: 'line', label: '線段', glyph: 'line' },
];

/** 子選單的小圖：沒有對應的 Lucide 圖示，直接用 SVG 畫，線條色跟著文字色走。 */
function ShapeGlyph({ glyph }: { glyph: (typeof SHAPE_TILES)[number]['glyph'] }) {
  const common = { fill: 'currentColor', stroke: 'none' } as const;
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" aria-hidden="true">
      {glyph === 'rect' && <rect x="3" y="3" width="18" height="18" rx="2" {...common} />}
      {glyph === 'circle' && <circle cx="12" cy="12" r="9" {...common} />}
      {glyph === 'rounded' && <rect x="3" y="3" width="18" height="18" rx="6" {...common} />}
      {glyph === 'callout' && (
        <path d="M5 3h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-1-1.7V5a2 2 0 0 1 2-2z" {...common} />
      )}
      {glyph === 'line' && (
        <path d="M3 12h18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  );
}

/** 九宮格的順序與圖示。 */
const TILES: { key: InsertKey; icon: IconName; label: string }[] = [
  { key: 'text', icon: 'type', label: blockRegistry.text.label },
  { key: 'image', icon: 'image', label: blockRegistry.image.label },
  { key: 'video', icon: 'video', label: blockRegistry.video.label },
  { key: 'audio', icon: 'music', label: blockRegistry.audio.label },
  { key: 'shape', icon: 'shapes', label: blockRegistry.shape.label },
  { key: 'web', icon: 'globe', label: blockRegistry.web.label },
  { key: 'table', icon: 'table', label: blockRegistry.table.label },
  { key: 'pdf', icon: 'file-text', label: blockRegistry.pdf.label },
  { key: 'library', icon: 'library', label: '媒體庫' },
];

type Props = {
  /** 選了什麼。表格會多帶大小（子選單裡選的）。 */
  onPick: (key: InsertKey, table?: { rows: number; cols: number }) => void;
  onClose: () => void;
  /** 插入點在畫面上的位置。面板貼著它出現。 */
  anchorRef: RefObject<HTMLElement | null>;
  /** 教材是不是直排。決定面板往哪一邊展開。 */
  vertical: boolean;
};

/** 面板寬度。高度不寫死——內容改了就會不準，要當場量。 */
const PANEL_INLINE = 252;
const EDGE = 12;

/**
 * 面板要出現在哪裡。
 *
 * 用視窗座標而不是頁面座標，原因有兩個：
 *
 * 一、頁面是 overflow: hidden 的固定畫布，面板留在裡面會被裁掉——
 *     直排時被右緣裁（因為版面由右往左流），橫排時點最下面那一列會被下緣裁。
 * 二、頁面是整頁等比縮放的，面板留在裡面會跟著縮，字變小、觸控目標變小。
 *
 * 展開方向跟著書寫方向走：橫排往下、直排往左（因為直排的下一段在左邊）。
 * 一律用實體屬性判斷，不用 inset-inline 那類邏輯屬性——這個元件為了讓
 * 選單文字正著看而設了 horizontal-tb，邏輯屬性算的會是它自己的方向，
 * 直排時就會被推到頁面外。
 */
function place(anchor: DOMRect, panel: DOMRect, vertical: boolean): React.CSSProperties {
  // 頂部的界線取工具列的下緣，不是視窗頂端——面板蓋住工具列的話，
  // 面板開著的時候就按不到預覽與設定
  const top0 = (document.querySelector('header')?.getBoundingClientRect().bottom ?? 0) + EDGE;
  const clampX = (v: number, half: number) =>
    Math.min(Math.max(v, half + EDGE), window.innerWidth - half - EDGE);
  const clampY = (v: number, half: number) =>
    Math.min(Math.max(v, half + top0), window.innerHeight - half - EDGE);

  if (vertical) {
    const top = clampY(anchor.top + anchor.height / 2, panel.height / 2);
    // 左邊塞不下就翻到右邊
    const openLeft = anchor.left > panel.width + EDGE * 2;
    return {
      top,
      left: openLeft ? anchor.left - EDGE : anchor.right + EDGE,
      transform: openLeft ? 'translate(-100%, -50%)' : 'translate(0, -50%)',
    };
  }

  const left = clampX(anchor.left + anchor.width / 2, panel.width / 2);
  // 下面塞不下就翻到上面；翻上去還是會蓋到工具列的話，就維持往下並貼齊下緣
  const openDown = anchor.bottom + panel.height + EDGE < window.innerHeight;
  if (openDown) return { left, top: anchor.bottom + EDGE, transform: 'translate(-50%, 0)' };
  const up = anchor.top - EDGE - panel.height;
  return up >= top0
    ? { left, top: anchor.top - EDGE, transform: 'translate(-50%, -100%)' }
    : { left, top: window.innerHeight - EDGE, transform: 'translate(-50%, -100%)' };
}

/**
 * 插入面板：九格一次呈現，無搜尋、無捲動。
 *
 * 這是「面板」那一類——只做「加新東西」。它以浮層覆蓋在內容之上，
 * 不推動下方內容，否則按下插入點時整頁會跳動。
 */
export function InsertPanel({ onPick, onClose, anchorRef, vertical }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  // 表格要先選大小，點了那一格出子選單
  const [tableMenu, setTableMenu] = useState(false);
  // 圖形有五種（四種圖形加線段），點了那一格先選形狀
  const [shapeMenu, setShapeMenu] = useState(false);
  // 先畫在看不見的地方，量到真實高度再擺位。高度會隨內容變，寫死遲早不準
  const [style, setStyle] = useState<React.CSSProperties>({ visibility: 'hidden', top: 0, left: 0 });

  useLayoutEffect(() => {
    const read = () => {
      // 對準按下的那顆＋；找不到（例如用鍵盤從別處打開）才退回列上的定位點。
      // 定位點是列起點一個 0 寬的點，以它為中心會把面板推到左側欄上
      const pill = document.querySelector<HTMLElement>('[data-insert-pill="open"]');
      const a = pill ?? anchorRef.current;
      const p = panelRef.current;
      if (a && p) setStyle(place(a.getBoundingClientRect(), p.getBoundingClientRect(), vertical));
    };
    read();
    window.addEventListener('scroll', read, true);
    window.addEventListener('resize', read);
    return () => {
      window.removeEventListener('scroll', read, true);
      window.removeEventListener('resize', read);
    };
  }, [anchorRef, vertical, shapeMenu, tableMenu]);

  return createPortal(
    <Panel
      ref={panelRef}
      role="dialog"
      aria-label="插入元件"
      style={style}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      {tableMenu ? (
        <TablePicker onBack={() => setTableMenu(false)} onInsert={(size) => onPick('table', size)} />
      ) : shapeMenu ? (
        <Grid>
          {SHAPE_TILES.map((t) => (
            <Tile key={t.key} type="button" onClick={() => onPick(t.key)}>
              <ShapeGlyph glyph={t.glyph} />
              <span>{t.label}</span>
            </Tile>
          ))}
        </Grid>
      ) : (
        <Grid>
          {TILES.map((t) => (
            <Tile
              key={t.key}
              type="button"
              onClick={() =>
                t.key === 'shape' ? setShapeMenu(true)
                : onPick(t.key)
              }
            >
              <Icon name={t.icon} size={20} />
              <span>{t.label}</span>
            </Tile>
          ))}
        </Grid>
      )}
    </Panel>,
    document.body
  );
}

const Panel = styled.div`
  position: fixed;
  z-index: 900;
  inline-size: ${PANEL_INLINE}px;
  /* 浮層一律用淡白底（#FAFAFA），跟設定面板、共享對話框同一色 */
  background: ${(p) => p.theme.surface.page};
  /* 跟其他選單、彈窗同一款：白底圓角、只靠陰影，不畫框 */
  border-radius: ${(p) => p.theme.radius.panel};
  box-shadow: ${(p) => p.theme.shadow.card};
  padding: ${(p) => p.theme.space.gapSm};
  writing-mode: horizontal-tb;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(p) => p.theme.space.gapXs};
`;

const Tile = styled.button`
  ${tileCss}
`;

