import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { primaryButtonCss } from '../components/buttonStyles';
import styled from 'styled-components';
import { Icon } from '../components/Icon';
import { Dropdown } from './Dropdown';
import { PanelBody as Body, PanelClose as Ghost, PanelDrawer as Drawer, PanelHead as Head, PanelTitle as Title, fieldCss, useExclusivePanel } from './SidePanel';
import { SegmentedControl } from '../components/SegmentedControl';
import type { Doc, DocMeta, DocSettings } from '../model/types';

type Props = {
  doc: Doc;
  onPatch: (patch: Partial<DocSettings>) => void;
  onMeta: (patch: Partial<DocMeta>) => void;
  onTitle: (title: string) => void;
  onClose: () => void;
  /** 匯入 md：換掉這本的內容，所以放在教材設定裡而不是頂部列。 */
  onImport?: () => void;
  /** 自編教材是數位教科書的副本，出版社沿用原本、不能改（版本管理，見 PRD「書櫃｜三種教材的關係」）。 */
  publisherLocked?: boolean;
};

/**
 * 教材設定。
 *
 * 由上到下：版型、排版方向、頁面比例（都是**整本**的設定，改了整份重新分頁）、
 * 書目資料、匯入教材。教材名稱在頂部列直接改，這裡不重複放。字級由每段的層級決定，不在這裡整本調。
 */
export function BookSettings({ doc, onPatch, onMeta, onClose, onImport, publisherLocked }: Props) {
  useExclusivePanel(true, onClose);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const s = doc.settings;
  const meta = doc.meta;
  // 年級依教育階段列：國小一到六年級、國中一到三年級（課本上就是這樣寫的）
  const grades = meta.stage === '國中' ? ['1', '2', '3'] : ['1', '2', '3', '4', '5', '6'];
  const subjects = SUBJECTS[meta.stage === '國中' ? '國中' : '國小'];
  // 舊資料的科目不在清單裡（例：生活）也要列出來，不然一打開就看不到原本的值
  const subjectOptions =
    meta.subject && !subjects.includes(meta.subject) ? [meta.subject, ...subjects] : subjects;

  return createPortal(
    <Drawer role="dialog" aria-label="教材設定">
      <Head>
        <Title>設定</Title>
        <Ghost onClick={onClose} aria-label="關閉">
          <Icon name="x" size={24} label="關閉" />
        </Ghost>
      </Head>

      <Body>
        {/* 版型：自動切頁（頁由系統依空間自動切開）與流式排版（未主動切頁時在同一頁內繼續橫向滑動）。
            設定存 settings.layout，未設定視同 paged（自動切頁）。 */}
        <Group>
          <GroupLabel>版型</GroupLabel>
          <SegmentedControl
            aria-label="版型"
            value={s.layout ?? 'paged'}
            options={[
              { value: 'paged', label: '自動切頁' },
              { value: 'flow', label: '流式排版' },
            ]}
            onChange={(layout) => onPatch({ layout })}
          />
        </Group>

        <Group>
          <GroupLabel>排版</GroupLabel>
          <SegmentedControl
            aria-label="排版"
            value={s.writingMode}
            options={[
              { value: 'horizontal', label: '橫排' },
              { value: 'vertical', label: '直排' },
            ]}
            onChange={(writingMode) => onPatch({ writingMode })}
          />
        </Group>

        <Group>
          <GroupLabel>
            頁面比例
            {/* 點一下或滑過才出現，平板沒有滑過，所以做成按鈕、靠 focus 打開 */}
            <Hint type="button" aria-label="頁面比例怎麼選" aria-describedby="ratio-hint">
              <Icon name="info" size={16} />
              <HintText id="ratio-hint" role="tooltip">學生使用 iPad 選 4:3，Chromebook 選 16:9。</HintText>
            </Hint>
          </GroupLabel>
          <SegmentedControl
            aria-label="頁面比例"
            value={s.aspectRatio}
            options={(['4:3', '16:9'] as const).map((r) => ({ value: r, label: r }))}
            onChange={(aspectRatio) => onPatch({ aspectRatio })}
          />
        </Group>

        {/* 書目資料：md 的 frontmatter 會帶進來，老師也能在這裡改。
            單元與紙本頁碼是匯入時的對照用資料，不給改也不顯示。 */}
        <Group>
          <Label>
            出版社
            <Input
              value={meta.publisher ?? ''}
              disabled={publisherLocked}
              onChange={(e) => onMeta({ publisher: e.target.value })}
              placeholder="出版社名稱"
            />
          </Label>
          <Label as="div">
            適用年級
            <Triple>
              <Dropdown
                aria-label="教育階段"
                placeholder="階段"
                value={meta.stage ?? ''}
                options={['國小', '國中'].map((x) => ({ value: x, label: x }))}
                // 換階段時年級、科目可能不在新的清單裡（國小 5 年級 → 國中、國語 → 國文），一起清掉
                onChange={(v) =>
                  onMeta({
                    stage: v || undefined,
                    grade: undefined,
                    subject: meta.subject && SUBJECTS[v === '國中' ? '國中' : '國小'].includes(meta.subject) ? meta.subject : undefined,
                  })
                }
              />
              <Dropdown
                aria-label="年級"
                placeholder="年級"
                value={meta.grade ?? ''}
                options={grades.map((g) => ({ value: g, label: `${g} 年級` }))}
                onChange={(v) => onMeta({ grade: v || undefined })}
              />
              <Dropdown
                aria-label="學期"
                placeholder="學期"
                value={meta.term ?? ''}
                options={[
                  { value: '上', label: '上學期' },
                  { value: '下', label: '下學期' },
                ]}
                onChange={(v) => onMeta({ term: v || undefined })}
              />
            </Triple>
          </Label>
          <Label as="div">
            科目
            <Dropdown
              aria-label="科目"
              placeholder="選擇科目"
              value={meta.subject ?? ''}
              options={subjectOptions.map((x) => ({ value: x, label: x }))}
              onChange={(v) => onMeta({ subject: v || undefined })}
            />
          </Label>
        </Group>

        {/* 匯入會換掉這一本的內容，放在最後：先看完、設定完這本，最後才是整本換掉 */}
        {onImport && (
          <Group>
            <GroupLabel>匯入教材</GroupLabel>
            <ImportButton type="button" onClick={onImport}>
              匯入 .md 檔
              <Icon name="upload" size={16} />
            </ImportButton>
          </Group>
        )}
      </Body>
    </Drawer>,
    document.body
  );
}

/**
 * 外觀照 Figma 自編頁「目次＿彈窗」：圓角 20、淡白底、只靠陰影浮起來，不畫外框也不畫標題分隔線。
 * 從視窗頂端 8px 起，整個蓋住頂部列右側的按鈕（不露出啟用中的黃底）；高度跟著內容走，碰到視窗底才捲。
 */
/** 科目依教育階段列主科。 */
const SUBJECTS: Record<'國小' | '國中', string[]> = {
  國小: ['國語', '英語', '數學', '自然', '社會'],
  國中: ['國文', '英文', '數學', '歷史', '地理'],
};

const Input = styled.input`
  ${fieldCss}
  &:disabled {
    background: ${(p) => p.theme.surface.disabled};
    color: ${(p) => p.theme.text.disabled};
    border-color: transparent;
    cursor: not-allowed;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.gapSm};
  font-size: var(--ds-typography-label-size);
  font-weight: var(--ds-typography-label-weight);
  color: ${(p) => p.theme.text.secondary};
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.gapSm};
`;

const GroupLabel = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: var(--ds-typography-label-size);
  font-weight: var(--ds-typography-label-weight);
  color: ${(p) => p.theme.text.secondary};
`;

/** 跟標題同色、跟字一樣大、置中對齊，看起來是標題的一部分，不是另一顆按鈕 */
const Hint = styled.button`
  position: relative;
  /* 圖示的圓只佔外框 20/24，放大到 1.1em，圓才跟中文字一樣高 */
  inline-size: 1.1em;
  block-size: 1.1em;
  margin-inline-start: 4px;
  display: grid;
  place-items: center;
  font-size: inherit;
  padding: 0;
  border: none;
  background: transparent;
  color: ${(p) => p.theme.icon.secondary};
  cursor: help;

  svg { inline-size: 100%; block-size: 100%; }
  &:hover, &:focus-visible { color: ${(p) => p.theme.icon.default}; }
`;

/** 跟其他浮層同一套：淡白底、細框、浮起的陰影；字用主要色，要讀得清楚 */
const HintText = styled.span`
  position: absolute;
  inset-block-start: calc(100% + 6px);
  inset-inline-start: -8px;
  z-index: 10;
  padding: 8px 12px;
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  border-radius: ${(p) => p.theme.radius.field};
  background: ${(p) => p.theme.surface.page};
  box-shadow: ${(p) => p.theme.shadow.float};
  color: ${(p) => p.theme.text.primary};
  font-size: var(--ds-typography-label-size);
  font-weight: 400;
  line-height: 1.5;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.12s;

  ${Hint}:hover &,
  ${Hint}:focus & { opacity: 1; }
`;

const Triple = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${(p) => p.theme.space.gapXs};
`;

const ImportButton = styled.button`
  ${primaryButtonCss}
`;

