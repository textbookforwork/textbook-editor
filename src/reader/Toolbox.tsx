import styled from 'styled-components';
import { Icon } from '../components/Icon';
import { toast } from '../editor/Toast';
import { TOOLBOX_SECTIONS, type RailTool } from './tools';

type Props = {
  pinned: RailTool[];
  onTogglePin: (tool: RailTool) => void;
  onClose: () => void;
};

/**
 * 工具箱面板，照 Figma 的 left panel：貼在左欄右側、220 寬、跟畫布同高。
 *
 * 四個編輯工具是真的——點了是「釘到左欄／從左欄收回」，不是直接拿起來；
 * 拿起來是在左欄做的事。其餘格子原型還沒做，點了提示。
 */
export function Toolbox({ pinned, onTogglePin, onClose }: Props) {
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
                  $on={on}
                  aria-pressed={item.rail ? on : undefined}
                  title={
                    item.rail
                      ? on
                        ? `從左欄收回「${item.label}」`
                        : `把「${item.label}」釘到左欄`
                      : `${item.label}：原型還沒做`
                  }
                  onClick={() => {
                    if (item.rail) return onTogglePin(item.rail);
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
  inset-inline-start: 104px;
  inset-block: ${(p) => p.theme.space.insetLg};
  inline-size: 220px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: ${(p) => p.theme.space.insetLg} ${(p) => p.theme.space.insetMd};
  border-radius: ${(p) => p.theme.radius.panel};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  background: ${(p) => p.theme.surface.page};
  box-shadow: ${(p) => p.theme.shadow.card};
  overflow-y: auto;
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

/** 三格一排，格距 10，剛好 188 寬。 */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, ${(p) => p.theme.control.tileMd});
  gap: 10px;
`;

const Tile = styled.button<{ $on: boolean }>`
  inline-size: ${(p) => p.theme.control.tileMd};
  block-size: ${(p) => p.theme.control.tileMd};
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 0;
  border-radius: ${(p) => p.theme.radius.tile};
  border: ${(p) => p.theme.border.widthDefault} solid
    ${(p) => (p.$on ? p.theme.border.accent : p.theme.border.subtle)};
  background: ${(p) => (p.$on ? p.theme.brand.primaryTintSubtle : p.theme.surface.raised)};
  color: ${(p) => (p.$on ? p.theme.brand.accentOnLight : p.theme.text.primary)};
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 1px;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s;

  svg { color: ${(p) => (p.$on ? p.theme.brand.accentOnLight : p.theme.icon.default)}; }

  &:hover { background: ${(p) => (p.$on ? p.theme.brand.primaryTint : p.theme.surface.sunken)}; }
`;
