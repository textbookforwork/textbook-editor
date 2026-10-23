import styled from 'styled-components';
import type { ReaderFont, ReaderPrefs } from './readerPrefs';

type Props = {
  prefs: ReaderPrefs;
  onChange: (next: ReaderPrefs) => void;
  /** 教材的內文字級與行距：沒調過時顯示這兩個數字。 */
  baseSize: number;
  baseLineHeight: number;
  /** 流式排版才能調字級、行距（自動切頁整頁縮放，字一放大就撐破頁）。 */
  canResize: boolean;
};

const SIZE = { min: 16, max: 40, step: 2 };
const LH = { min: 1.2, max: 3, step: 0.2 };
const FONTS: [ReaderFont, string][] = [
  ['auto', '原本'],
  ['kai', '楷體'],
  ['hei', '黑體'],
];

const round1 = (n: number) => Math.round(n * 10) / 10;

/**
 * 閱讀設定的浮層：貼在左欄「設定」旁邊，四列——文字大小、行距、字體、顯示注音。
 * 再按一次「設定」、按 Esc 或點浮層外面就收起來（ReaderMode 管）。
 * 右邊的控制項一律同寬同高（156×44）、灰色膠囊底，右緣對齊；選中的是黑底白字，跟開關打開時同一個黑。
 */
export function ReadSettings({ prefs, onChange, baseSize, baseLineHeight, canResize }: Props) {
  const size = prefs.size ?? baseSize;
  const lh = prefs.lineHeight ?? baseLineHeight;
  const set = (patch: Partial<ReaderPrefs>) => onChange({ ...prefs, ...patch });
  const off = canResize ? undefined : '這本是自動切頁，整頁一起縮放，不能另外調';

  return (
    <Panel id="reader-settings" role="dialog" aria-label="閱讀設定">
      <Row title={off}>
        <span>文字大小</span>
        <Stepper>
          <button type="button" aria-label="文字小一點" disabled={!canResize || size <= SIZE.min}
            onClick={() => set({ size: Math.max(SIZE.min, size - SIZE.step) })}>−</button>
          <b>{size}</b>
          <button type="button" aria-label="文字大一點" disabled={!canResize || size >= SIZE.max}
            onClick={() => set({ size: Math.min(SIZE.max, size + SIZE.step) })}>+</button>
        </Stepper>
      </Row>
      <Row title={off}>
        <span>行距</span>
        <Stepper>
          <button type="button" aria-label="行距小一點" disabled={!canResize || lh <= LH.min + 0.01}
            onClick={() => set({ lineHeight: round1(Math.max(LH.min, lh - LH.step)) })}>−</button>
          <b>{lh.toFixed(1)}</b>
          <button type="button" aria-label="行距大一點" disabled={!canResize || lh >= LH.max - 0.01}
            onClick={() => set({ lineHeight: round1(Math.min(LH.max, lh + LH.step)) })}>+</button>
        </Stepper>
      </Row>
      <Row>
        <span>字體</span>
        <Seg role="radiogroup" aria-label="字體">
          {FONTS.map(([k, label]) => (
            <button key={k} type="button" role="radio" aria-checked={prefs.font === k} data-on={prefs.font === k || undefined}
              onClick={() => set({ font: k })}>{label}</button>
          ))}
        </Seg>
      </Row>
      <Row>
        <span>顯示注音</span>
        <Switch type="button" role="switch" aria-checked={prefs.ruby} aria-label="顯示注音" data-on={prefs.ruby || undefined}
          onClick={() => set({ ruby: !prefs.ruby })}>
          <i />
        </Switch>
      </Row>
    </Panel>
  );
}

/** 貼在左欄右側、靠下（「設定」在左欄最下面）。淡白底浮層。 */
const Panel = styled.div`
  position: absolute;
  inset-inline-start: var(--reader-rail, 104px);
  inset-block-end: ${(p) => p.theme.space.insetSm};
  z-index: 20;
  inline-size: 360px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.gapSm};
  padding: 18px 20px;
  border-radius: ${(p) => p.theme.radius.panel};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  background: ${(p) => p.theme.surface.page};
  box-shadow: ${(p) => p.theme.shadow.popover};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-block-size: 44px;
  font-size: 15px;
  color: ${(p) => p.theme.text.primary};
`;

const pill = `
  inline-size: 156px;
  block-size: 44px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 999px;
`;

const Stepper = styled.div`
  ${pill}
  justify-content: space-between;
  background: ${(p) => p.theme.surface.muted};
  button {
    inline-size: 36px;
    block-size: 36px;
    border: none;
    border-radius: 999px;
    background: transparent;
    font: inherit;
    font-size: 18px;
    color: ${(p) => p.theme.text.primary};
    cursor: pointer;
  }
  button:hover:not(:disabled) { background: ${(p) => p.theme.surface.raised}; }
  button:disabled { color: ${(p) => p.theme.text.disabled}; cursor: default; }
  b {
    font-family: ${(p) => p.theme.typography.fontDisplay};
    font-size: 15px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
`;

const Seg = styled.div`
  ${pill}
  gap: 2px;
  background: ${(p) => p.theme.surface.muted};
  button {
    flex: 1;
    block-size: 36px;
    padding: 0;
    border: none;
    border-radius: 999px;
    background: transparent;
    font: inherit;
    font-size: 14px;
    font-weight: 500;
    color: ${(p) => p.theme.text.secondary};
    cursor: pointer;
  }
  button:hover:not([data-on]) { background: ${(p) => p.theme.surface.raised}; color: ${(p) => p.theme.text.primary}; }
  button[data-on] { background: ${(p) => p.theme.action.primaryBg}; color: ${(p) => p.theme.action.primaryText}; }
`;

const Switch = styled.button`
  position: relative;
  inline-size: 64px;
  block-size: 36px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.muted};
  cursor: pointer;
  transition: background 0.2s;
  i {
    position: absolute;
    inset-block-start: 5px;
    inset-inline-start: 5px;
    inline-size: 26px;
    block-size: 26px;
    border-radius: 999px;
    background: ${(p) => p.theme.surface.raised};
    box-shadow: ${(p) => p.theme.shadow.card};
    transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  &[data-on] { background: ${(p) => p.theme.action.primaryBg}; }
  &[data-on] i { transform: translateX(28px); }
`;
