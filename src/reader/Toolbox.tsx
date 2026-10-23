import styled from 'styled-components';
import { Icon } from '../components/Icon';
import { toast } from '../editor/Toast';
import { TOOLBOX_SECTIONS, type RailTool } from './tools';

type Props = {
  pinned: RailTool[];
  onTogglePin: (tool: RailTool) => void;
  onClose: () => void;
  /** 「設定」打開閱讀設定 */
  onSettings: () => void;
};

/**
 * 工具箱面板，照 Figma 的 left panel：貼在左欄右側、220 寬、跟畫布同高。
 *
 * 四個編輯工具是真的——點了是「釘到左欄／從左欄收回」，不是直接拿起來；
 * 拿起來是在左欄做的事。其餘格子原型還沒做，點了提示。
 */
export function Toolbox({ pinned, onTogglePin, onClose, onSettings }: Props) {
  return (
    <Panel id="reader-toolbox" role="dialog" aria-label="工具箱">
      <Head>
        <strong>工具箱</strong>
        <Close type="button" title="關閉工具箱" onClick={onClose}>
          <Icon name="x" size={16} label="關閉" />
        </Close>
      </Head>

      {TOOLBOX_SECTIONS.map((section) => (
        <Section key={section.title}>
          <SectionTitle>{section.title}</SectionTitle>
          <Grid>
            {section.items.map((item) => {
              const on = item.rail ? pinned.includes(item.rail) : false;
              return (
                <Tile
                  key={item.id}
                  type="button"
                  aria-pressed={item.rail ? on : undefined}
                  title={
                    item.rail
                      ? on
                        ? `從左欄收回「${item.label}」`
                        : `把「${item.label}」釘到左欄`
                      : item.id === 'settings'
                        ? '閱讀設定'
                        : `${item.label}：原型還沒做`
                  }
                  onClick={() => {
                    if (item.rail) return onTogglePin(item.rail);
                    if (item.id === 'settings') return onSettings();
                    toast(`${item.label}：原型還沒做`);
                  }}
                >
                  <Icon name={item.icon} size={24} />
                  <span>{item.label}</span>

                </Tile>
              );
            })}
          </Grid>
        </Section>
      ))}
    </Panel>
  );
}

const Panel = styled.aside`
  position: absolute;
  /* 緊貼左欄右側，上下跟畫布對齊 */
  inset-inline-start: var(--reader-rail, 104px);
  inset-block: ${(p) => p.theme.space.insetSm};
  inline-size: 244px;
  box-sizing: border-box;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: ${(p) => p.theme.space.insetLg} ${(p) => p.theme.space.insetMd};
  border-radius: ${(p) => p.theme.radius.panel};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  background: ${(p) => p.theme.surface.raised};
  box-shadow: ${(p) => p.theme.shadow.card};
  overflow-y: auto;
  /*
   * 不顯示捲軸：捲軸會吃掉右側寬度（格子左寬右窄），在圓角處也會被切掉。
   * 最後一組露出半截，看得出還能往下捲
   */
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const Head = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1.8px;
  color: ${(p) => p.theme.text.primary};
`;

const Close = styled.button`
  display: grid;
  place-items: center;
  inline-size: ${(p) => p.theme.control.height2xs};
  block-size: ${(p) => p.theme.control.height2xs};
  padding: 0;
  border: none;
  border-radius: ${(p) => p.theme.radius.control};
  background: transparent;
  color: ${(p) => p.theme.icon.default};
  cursor: pointer;

  &:hover { background: ${(p) => p.theme.surface.sunken}; }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1.2px;
  color: ${(p) => p.theme.text.secondary};
`;

/** 一組工具放在淡灰的底塊裡，白色工具格浮在上面。三格一排平分寬度，左右留白永遠對稱 */
const Grid = styled.div`
  padding: 12px;
  border-radius: ${(p) => p.theme.radius.card};
  background: ${(p) => p.theme.surface.sunken};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

/**
 * 工具格：一律白卡、不分有沒有釘在左欄——哪些在左欄上，左欄本身（虛線框加 ×）已經看得到，
 * 這裡再標一次只是多一層顏色。整片 Lime 太亮，跟白底為主的視覺衝突。
 * 平常白卡細框；滑過浮起來（淡陰影、上移 1px）；按下往下沉（淡灰、縮一點）。
 */
const Tile = styled.button`
  position: relative;
  /* 正方形，寬度跟著格線平分 */
  inline-size: 100%;
  aspect-ratio: 1;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 0;
  border-radius: ${(p) => p.theme.radius.tile};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.text.primary};
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 1px;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.15s, box-shadow 0.15s, transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);

  svg { color: ${(p) => p.theme.icon.default}; }

  &:hover {
    box-shadow: ${(p) => p.theme.shadow.card};
    transform: translateY(-1px);
  }
  &:active {
    background: ${(p) => p.theme.surface.sunken};
    box-shadow: none;
    transform: scale(0.96);
  }
  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.border.focus};
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover, &:active { transform: none; }
  }
`;
