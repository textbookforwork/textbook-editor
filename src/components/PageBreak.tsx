import styled from 'styled-components';
import type { Page } from '../model/paginate';

type Props = {
  startedBy: Page['startedBy'];
  /**
   * 老師放的換頁線，而且上一頁裝得下這一頁的第一列——按下去就併回去。
   * 系統自己換的頁沒有這個選項：它本來就是排滿了才換的。
   */
  onMerge?: () => void;
};

/**
 * 換頁線。
 *
 * 畫面上不寫「手動／自動」——老師不在乎是誰換的頁，在乎的是
 * 「這裡能不能合併」。兩種線都用低飽和的灰，安靜地待在頁與頁之間：
 * 系統排滿才換的是一條實線（那是事實，動不了）；
 * 老師放的、併得回去的是虛線，中間長一顆「可合併」（這條線是暫時的，按一下就沒了）。
 * 要固定換頁走元件膠囊上的「換頁」，不在這裡。
 */
export function PageBreak({ startedBy, onMerge }: Props) {
  const dashed = startedBy === 'manual';
  if (!onMerge) return <Solo $dashed={dashed} />;
  return (
    <Wrap>
      <Line $dashed={dashed} />
      <Label type="button" onClick={onMerge} title="把這一頁併回上一頁">
        可合併
      </Label>
      <Line $dashed={dashed} />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.gapMd};
  width: 100%;
  max-width: 1024px;
  margin-block: ${(p) => p.theme.space.gapSm};
`;

const Line = styled.div<{ $dashed: boolean }>`
  flex: 1;
  height: 0;
  border-block-start: 1.5px ${(p) => (p.$dashed ? 'dashed' : 'solid')} ${(p) => p.theme.border.default};
`;

/** 沒有按鈕時就是一整條線，中間不留縫。 */
const Solo = styled(Line)`
  flex: none;
  width: 100%;
  max-width: 1024px;
  margin-block: ${(p) => p.theme.space.gapSm};
`;

const Label = styled.button`
  flex: none;
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.default};
  font-family: inherit;
  font-size: var(--ds-typography-label-size);
  line-height: var(--ds-typography-label-line-height);
  letter-spacing: 0.06em;
  padding: 3px 12px;
  border-radius: ${(p) => p.theme.radius.control};
  color: ${(p) => p.theme.text.secondary};
  background: ${(p) => p.theme.surface.raised};
  cursor: pointer;
  transition: background 0.12s, color 0.12s, border-color 0.12s;

  &:hover {
    border-color: ${(p) => p.theme.border.hover};
    color: ${(p) => p.theme.text.primary};
  }
`;
