import styled from 'styled-components';
import { Icon } from './Icon';

/**
 * 掛了補充的元件角上的記號。
 *
 * 絕對定位，而且不佔版面——這一頁的高度是分頁算過的，角標若把元件
 * 撐大一點點，量到的與畫出來的就不一致，內容會被切掉。
 * 選取外框用 outline 不用 border 也是同一個理由。
 *
 * 只在編輯時出現：老師按它打開右側的補充內容面板。閱讀時不畫，學生點元件本身；沒掛補充的元件不會有這個記號，
 * 所以「哪些地方點得下去」在頁面上一眼看得完。
 */
type Props = {
  count: number;
  /**
   * 點下去時把角標自己的元素交出去，檢視器才知道泡泡要彈在哪、
   * 捲動時要跟著誰。呼叫端通常接成 `(anchor) => viewer.open(block, anchor)`。
   */
  onClick?: (anchor: HTMLElement) => void;
  /** 直排時角標改放在元件下方的溝裡。由外面告訴它，不靠邏輯屬性猜。 */
  vertical?: boolean;
  /**
   * 放在元件行進方向的哪一側。預設是結尾側（橫排在右）；
   * 多欄列的第一欄改放開頭側（橫排在左），才會落在頁邊留白而不是壓到隔壁欄。
   */
  side?: 'start' | 'end';
};

export function PopupBadge({ count, onClick, vertical = false, side = 'end' }: Props) {
  // 縮圖裡沒有檢視器可開，而且縮圖本身就是一顆按鈕——按鈕裡不能再放按鈕。
  // 那裡只畫記號，不做成能按的樣子
  if (!onClick) {
    return (
      <Badge as="span" aria-hidden $vertical={vertical} $side={side}>
        <Icon name="blocks" size={16} />
        {count > 1 && <Num>{count}</Num>}
      </Badge>
    );
  }
  return (
    <Badge
      $vertical={vertical}
      $side={side}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e.currentTarget);
      }}
      aria-label={`補充內容 ${count} 項`}
      title={`補充內容 ${count} 項`}
    >
      <Icon name="blocks" size={16} />
      {count > 1 && <Num>{count}</Num>}
    </Badge>
  );
}

/**
 * 角標放在元件**外面**，不壓在元件上。
 *
 * 以前是貼在右上角往外凸 10px，大半仍蓋在元件裡——課文最後幾個字
 * 就被它遮住。現在整顆移到元件外側的頁邊留白（PAGE_PADDING 48）：
 * 橫排放在右邊（多欄的第一欄放左邊），直排放在下方（多欄第一欄放上方）。
 * 橫向膠囊約 40 寬，塞不進 32 的欄距，所以不放在欄與欄之間。
 *
 * 一律用實體屬性判斷方向——這個元件設了 horizontal-tb，
 * 邏輯屬性算的會是它自己的方向，不是頁面的。
 */
const OUT = 'calc(100% + 8px)';
const place = (vertical: boolean, side: 'start' | 'end') => {
  if (vertical) return side === 'end' ? `top: ${OUT}; right: 0;` : `bottom: ${OUT}; right: 0;`;
  return side === 'end' ? `left: ${OUT}; top: 0;` : `right: ${OUT}; top: 0;`;
};

const Badge = styled.button<{ $vertical: boolean; $side: 'start' | 'end' }>`
  position: absolute;
  z-index: 3;
  ${(p) => place(p.$vertical, p.$side)}

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  block-size: 24px;
  min-inline-size: 24px;
  padding: 0 7px;

  border: none;
  border-radius: 999px;
  background: ${(p) => p.theme.tool.accent};
  color: ${(p) => p.theme.tool.onAccent};
  box-shadow: 0 2px 8px rgba(26, 25, 23, 0.24);
  cursor: pointer;
  /* 直排時整個角標要正著看，不跟著文字轉 */
  writing-mode: horizontal-tb;
  white-space: nowrap;

  &:hover { background: ${(p) => p.theme.tool.accentHover}; }

  /*
   * 看起來 24、點起來更大。頁面是整頁縮放的，小螢幕上縮完會點不到，
   * 用看不見的擴張區把觸控目標撐開，視覺尺寸與版面都不受影響。
   */
  &::after {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: inherit;
  }
`;

const Num = styled.span`
  font-size: var(--ds-typography-label-size);
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
`;
