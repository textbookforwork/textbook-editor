import styled from 'styled-components';
import { PAGE_PADDING, PAGE_SIZE, contentBox } from '../model/pageSize';
import { RowView } from './RowView';
import { urlOf } from '../editor/assets';
import type { Page } from '../model/paginate';
import type { DocSettings, PageBackground } from '../model/types';

/**
 * 這一頁的背景。掛在「這一頁的第一列」上；那一列若是從上一頁接續下來的，
 * 它的背景屬於上一頁，這一頁就沒有。
 */
export function backgroundOf(page: Page): PageBackground | undefined {
  const first = page.items[0];
  if (!first || first.continuedFromPrev) return undefined;
  return first.row.pageBackground;
}

function backgroundStyle(bg: PageBackground | undefined): React.CSSProperties {
  if (!bg) return {};
  const url = bg.assetId ? urlOf(bg.assetId) : undefined;
  return {
    ...(bg.color ? { backgroundColor: bg.color } : {}),
    ...(url ? { backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}),
  };
}

type Props = {
  page: Page;
  settings: DocSettings;
  /** 整頁縮放倍率。分頁在頁座標裡算完，這裡只負責把它縮到螢幕上。 */
  scale: number;
  /** 這一列在 doc.rows 裡的位置。插入與拖曳都要用它。唯讀時不傳。 */
  rowIndexOf?: (rowId: string) => number;
  /** 全文共幾列。最後一列要多畫一個「加在結尾」的插入點。 */
  rowCount?: number;
  /** 縮圖模式：不顯示捲軸、不攔截滾輪。 */
  thumbnail?: boolean;
};

/**
 * 一頁。
 *
 * 頁面本身永遠是固定尺寸，靠 transform 等比縮放——
 * 不是重新排版。所以任何螢幕上看到的都是同一份分頁結果。
 */
export function PageView({ page, settings, scale, rowIndexOf, rowCount = 0, thumbnail = false }: Props) {
  const size = PAGE_SIZE[settings.aspectRatio];
  const vertical = settings.writingMode === 'vertical';
  const flow = settings.layout === 'flow';
  const box = contentBox(settings);
  // 邏輯軸：橫排的 inline 是寬、直排的 inline 是高
  const contentInline = vertical ? box.height : box.width;
  const contentBlock = vertical ? box.width : box.height;
  const horizontalPanels = flow && !vertical && (page.panels?.length ?? 0) > 1;

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!flow || thumbnail) return;
    // 在流式排版的頁面內，若使用者用滑鼠滾輪（只有垂直 deltaY），
    // 自動轉為頁面內的橫向滑動（直排由右往左、橫排由左往右）；滑到底才放行給外部捲動。
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    const el = e.currentTarget;
    if (el.scrollWidth <= el.clientWidth + 2) return;
    const before = el.scrollLeft;
    el.scrollLeft += vertical ? -e.deltaY : e.deltaY;
    if (el.scrollLeft !== before) {
      e.stopPropagation();
    }
  };

  return (
    // 只有可編輯的那一份掛頁碼，否則縮圖列會先被 querySelector 找到
    <Frame
      data-page-index={rowIndexOf ? page.index : undefined}
      style={{ width: size.width * scale, height: size.height * scale }}
    >
      <Sheet
        $vertical={vertical}
        $flow={flow}
        $horizontalPanels={horizontalPanels}
        $thumbnail={thumbnail}
        data-vertical={vertical || undefined}
        data-layout={flow ? 'flow' : 'paged'}
        onWheel={onWheel}
        style={{
          width: size.width,
          height: size.height,
          transform: `scale(${scale})`,
          ...backgroundStyle(backgroundOf(page)),
        }}
      >
        {horizontalPanels
          ? page.panels!.map((panelItems, pi) => (
              <FlowPanel
                key={pi}
                data-flow-panel={pi}
                style={{ width: contentInline, height: contentBlock }}
              >
                {panelItems.map((item) => (
                  <RowView
                    key={`${item.row.id}-${item.textSlice?.start ?? 0}`}
                    item={item}
                    settings={settings}
                    contentInline={contentInline}
                    contentBlock={contentBlock}
                    rowIndex={rowIndexOf ? rowIndexOf(item.row.id) : -1}
                    rowCount={rowCount}
                  />
                ))}
              </FlowPanel>
            ))
          : page.items.map((item) => (
              <RowView
                key={`${item.row.id}-${item.textSlice?.start ?? 0}`}
                item={item}
                settings={settings}
                contentInline={contentInline}
                contentBlock={contentBlock}
                rowIndex={rowIndexOf ? rowIndexOf(item.row.id) : -1}
                rowCount={rowCount}
              />
            ))}
      </Sheet>
    </Frame>
  );
}

const Frame = styled.div`
  position: relative;
  flex: none;
`;

const Sheet = styled.div<{
  $vertical: boolean;
  $flow?: boolean;
  $horizontalPanels?: boolean;
  $thumbnail?: boolean;
}>`
  transform-origin: top left;
  background: ${(p) => p.theme.surface.raised};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  /* 近直角，模擬紙張 */
  border-radius: 2px;
  padding: ${PAGE_PADDING}px;
  overflow-x: ${(p) => (p.$flow && !p.$thumbnail ? 'auto' : 'hidden')};
  overflow-y: hidden;
  /* 只有頁面內真的能橫向捲（流式排版）才把橫向捲動留在頁內；分頁模式要放行給外層，
     否則放大後游標停在頁面上就左右滑不動 */
  overscroll-behavior-x: ${(p) => (p.$flow && !p.$thumbnail ? 'contain' : 'auto')};
  writing-mode: ${(p) => (p.$vertical ? 'vertical-rl' : 'horizontal-tb')};
  display: flex;
  flex-direction: ${(p) => (p.$horizontalPanels ? 'row' : 'column')};
  gap: ${(p) => (p.$horizontalPanels ? `${PAGE_PADDING}px` : '0')};

  ${(p) =>
    p.$flow &&
    !p.$thumbnail &&
    p.$vertical &&
    `
    &::after {
      content: '';
      flex: none;
      block-size: ${PAGE_PADDING}px;
    }
  `}

  ${(p) =>
    p.$horizontalPanels &&
    !p.$thumbnail &&
    `
    &::after {
      content: '';
      flex: none;
      inline-size: 1px;
    }
  `}
`;

/** 橫排流式排版下的每一屏分欄：高度固定為一頁內容區高，橫向並排，讓還沒主動切頁的內容往左滑動閱讀。 */
const FlowPanel = styled.div`
  flex: none;
  display: flex;
  flex-direction: column;
  position: relative;

  & + & {
    padding-inline-start: ${PAGE_PADDING}px;
    border-inline-start: 1px dashed ${(p) => p.theme.border.subtle};
  }
`;
