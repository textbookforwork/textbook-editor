import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Icon } from '../components/Icon';
import { ESC, Ghost, Head, Pair, Scrim, Secondary, Sheet } from '../editor/ShareDialog';
import { chaptersOf, keepSections } from './chapters';
import type { Doc } from '../model/types';

/**
 * 建立自編：照 Figma「書櫃」的建立流程。
 *   點了鉛筆 → 跳出這個框，游標停在「自編名稱」
 *   章節預設全選，點 checkbox 可以取消
 *   名稱填了、至少留一節，「建立」才能按 → 建立後直接進編輯器
 */
export function CreateDialog({
  source,
  onCancel,
  onCreate,
}: {
  /** 原本（數位教科書）的內容。 */
  source: Doc;
  onCancel: () => void;
  onCreate: (name: string, doc: Doc) => void;
}) {
  const groups = useMemo(() => chaptersOf(source), [source]);
  const allIds = useMemo(() => groups.flatMap((g) => g.sections.map((s) => s.rowId)), [groups]);
  const [name, setName] = useState('');
  const [keep, setKeep] = useState(() => new Set(allIds));
  const [open, setOpen] = useState(() => new Set(groups.map((_, i) => i)));
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => ESC(onCancel), [onCancel]);
  useEffect(() => inputRef.current?.focus(), []);

  const toggle = (ids: string[], on: boolean) =>
    setKeep((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => (on ? next.add(id) : next.delete(id)));
      return next;
    });

  const ready = name.trim().length > 0 && keep.size > 0;
  const create = () => {
    if (!ready) return;
    const doc = keepSections(source, keep);
    onCreate(name.trim(), { ...doc, title: name.trim() });
  };

  return createPortal(
    <Scrim onClick={onCancel}>
      <Sheet role="dialog" aria-modal="true" aria-label="建立自編" onClick={(e) => e.stopPropagation()}>
        <Head>
          <span>建立自編</span>
          <Ghost type="button" onClick={onCancel} aria-label="關閉" title="關閉">
            <Icon name="x" size={24} label="關閉" />
          </Ghost>
        </Head>

        <Field>
          <span>自編名稱</span>
          <NameInput
            ref={inputRef}
            value={name}
            placeholder="請輸入自編名稱"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && create()}
          />
        </Field>

        <Tree role="group" aria-label="要放進自編的章節">
          {groups.map((g, gi) => {
            const ids = g.sections.map((s) => s.rowId);
            const on = ids.filter((id) => keep.has(id)).length;
            const expanded = open.has(gi);
            return (
              <div key={gi}>
                <Row $head>
                  <Fold
                    type="button"
                    aria-expanded={expanded}
                    onClick={() =>
                      setOpen((prev) => {
                        const next = new Set(prev);
                        if (next.has(gi)) next.delete(gi);
                        else next.add(gi);
                        return next;
                      })
                    }
                  >
                    <Icon name={expanded ? 'chevron-down' : 'chevron-right'} size={16} />
                    <span>{g.lesson?.text ?? '未命名的課'}</span>
                  </Fold>
                  <Check
                    checked={on === ids.length && ids.length > 0}
                    mixed={on > 0 && on < ids.length}
                    label={`整課：${g.lesson?.text ?? ''}`}
                    onChange={(v) => toggle(ids, v)}
                  />
                </Row>
                {expanded &&
                  g.sections.map((s) => (
                    <Row key={s.rowId}>
                      <span>{s.text}</span>
                      <Check checked={keep.has(s.rowId)} label={s.text} onChange={(v) => toggle([s.rowId], v)} />
                    </Row>
                  ))}
              </div>
            );
          })}
        </Tree>

        <Pair>
          <Secondary type="button" onClick={onCancel}>
            取消
          </Secondary>
          <Secondary type="button" $primary disabled={!ready} onClick={create}>
            建立
          </Secondary>
        </Pair>
      </Sheet>
    </Scrim>,
    document.body
  );
}

/** 品牌深綠的方形勾選框；整課半選時顯示一條橫線。 */
function Check({ checked, mixed, label, onChange }: { checked: boolean; mixed?: boolean; label: string; onChange: (v: boolean) => void }) {
  return (
    <Box
      type="button"
      role="checkbox"
      aria-checked={mixed ? 'mixed' : checked}
      aria-label={label}
      $on={checked || !!mixed}
      onClick={() => onChange(!(checked || mixed))}
    >
      {checked && <Icon name="check" size={16} />}
      {mixed && !checked && <Icon name="minus" size={16} />}
    </Box>
  );
}

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.gapSm};
  font-size: ${(p) => p.theme.typography.labelSize};
  color: ${(p) => p.theme.text.secondary};
`;

/** 跟教材設定的輸入框同一款：灰底膠囊，打字時白底加框 */
const NameInput = styled.input`
  block-size: ${(p) => p.theme.control.heightMd};
  padding: 0 16px;
  border: ${(p) => p.theme.border.widthDefault} solid transparent;
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.surface.sunken};
  font: inherit;
  font-size: ${(p) => p.theme.typography.bodySmSize};
  color: ${(p) => p.theme.text.primary};
  outline: none;

  &::placeholder { color: ${(p) => p.theme.text.placeholder}; }
  &:focus {
    background: ${(p) => p.theme.surface.raised};
    border-color: ${(p) => p.theme.border.default};
  }
`;

const Tree = styled.div`
  max-block-size: 240px;
  overflow-y: auto;
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  border-radius: ${(p) => p.theme.radius.field};
  background: ${(p) => p.theme.surface.raised};
`;

const Row = styled.div<{ $head?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-block-size: 40px;
  padding: 0 12px 0 ${(p) => (p.$head ? '8px' : '32px')};
  font-size: ${(p) => p.theme.typography.bodySmSize};
  background: ${(p) => (p.$head ? p.theme.surface.sunken : 'transparent')};
  font-weight: ${(p) => (p.$head ? 500 : 400)};
  & + & { border-block-start: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle}; }
`;

const Fold = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
`;

const Box = styled.button<{ $on: boolean }>`
  flex: none;
  display: grid;
  place-items: center;
  inline-size: 20px;
  block-size: 20px;
  padding: 0;
  border-radius: 5px;
  border: 1.5px solid ${(p) => (p.$on ? p.theme.brand.accentOnLight : p.theme.border.default)};
  background: ${(p) => (p.$on ? p.theme.brand.accentOnLight : p.theme.surface.raised)};
  color: ${(p) => p.theme.text.onInverse};
  cursor: pointer;
`;
