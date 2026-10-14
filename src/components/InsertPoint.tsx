import styled, { css } from 'styled-components';
import { Icon } from './Icon';

type Props = {
  open: boolean;
  onOpen: () => void;
  /** 教材是不是直排。決定這條線要橫著還是豎著。 */
  vertical: boolean;
  /** 貼在列的開頭還是結尾。結尾的只有全文最後一列才有。 */
  where?: 'start' | 'end';
  /** 游標停在附近的空白處。線與加號浮現，跟滑過線本身一樣——整片空白都是入口。 */
  hinted?: boolean;
};

/**
 * 插入點的三段浮現。
 *
 *   靜止   完全不顯示，畫面乾淨
 *   滑過   淡入提示（0.15s）；游標停在附近的空白處也算滑過
 *   按下   展開插入面板
 *
 * 這是「浮現的＝可以按的入口」。常駐的分隔線是換頁線，
 * 那是內容的狀態標示，兩者形態刻意不同、不可混用。
 */
export function InsertPoint({ open, onOpen, vertical, where = 'start', hinted = false }: Props) {
  return (
    <Zone $open={open || hinted} $vertical={vertical} $where={where}>
      <Hit type="button" onClick={onOpen} aria-label="新增元件" $vertical={vertical}>
        <Line $vertical={vertical} />
        {/* 打開時做記號：插入面板以這顆＋為中心彈出（見 InsertPanel 的 place） */}
        <Pill data-insert-pill={open ? 'open' : undefined}>
          <Icon name="plus" size={16} />
        </Pill>
        <Line $vertical={vertical} />
      </Hit>
    </Zone>
  );
}

/**
 * 感應區比看得見的提示大，滑過才不用精準對準那條線。
 *
 * **絕對定位，完全不佔版面。** 一頁裝得下多少是分頁算過的，插入點若
 * 佔到空間，量到的與畫出來的就不一致，內容會被擠出頁面。
 *
 * 曾經用 `block-size: 20px; margin-block: -10px` 把自己抵銷掉，橫排看
 * 起來沒事；但這個元件同時把自己設成 horizontal-tb，那組邏輯屬性算的是
 * 它自己的水平方向，直排時父層要的是它的「寬度」，而寬度沒有被抵銷——
 * 每個插入點多吃掉約 100px，一頁五列就把內容推出頁面。所以這裡一律用
 * 實體屬性，並且由外面告訴它現在是直排還是橫排。
 */
const Zone = styled.div<{ $open: boolean; $vertical: boolean; $where: 'start' | 'end' }>`
  position: absolute;
  z-index: 5;
  display: flex;
  align-items: center;
  /* 提示本身永遠正著看，不跟著課文轉 */
  writing-mode: horizontal-tb;

  ${(p) =>
    p.$vertical
      ? css`
          top: 0;
          bottom: 0;
          width: 20px;
          /* 直排由右往左流：列的開頭在右邊。兩種都離內容 16px */
          ${p.$where === 'start' ? 'right: -26px;' : 'left: -26px;'}
        `
      : css`
          left: 0;
          right: 0;
          height: 20px;
          /* 線離內容 16px，前後一致 */
          ${p.$where === 'start' ? 'top: -26px;' : 'bottom: -26px;'}
        `}

  opacity: ${(p) => (p.$open ? 1 : 0)};
  transition: opacity 0.15s;

  &:hover,
  &:focus-within {
    opacity: 1;
  }
`;

const Hit = styled.button<{ $vertical: boolean }>`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.gapXs};
  inline-size: 100%;
  block-size: 100%;
  flex-direction: ${(p) => (p.$vertical ? 'column' : 'row')};
`;

const Line = styled.span<{ $vertical: boolean }>`
  flex: 1;
  ${(p) =>
    p.$vertical
      ? css`
          width: 0;
          border-left: ${p.theme.border.widthSelected} solid ${p.theme.border.hover};
        `
      : css`
          height: 0;
          border-top: ${p.theme.border.widthSelected} solid ${p.theme.border.hover};
        `}
`;

/** 只有一個 ＋：線本身已經說明了位置，不需要再寫字。 */
const Pill = styled.span`
  flex: none;
  display: grid;
  place-items: center;
  inline-size: 20px;
  block-size: 20px;
  border-radius: ${(p) => p.theme.radius.control};
  /* 照 Figma 自編頁的插入點：白底灰框、深色圖示。藍色只留給選取中的元件外框 */
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.icon.default};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.default};
  box-shadow: 0 0 0 3px ${(p) => p.theme.surface.raised};
  transition: transform 0.15s;

  button:hover > & { transform: scale(1.15); }
`;
