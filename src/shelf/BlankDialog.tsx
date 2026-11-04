import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { ESC, Pair, Scrim, Secondary, Sheet } from '../editor/ShareDialog';
import { SubjectMark } from '../editor/HomeButton';

import { SHELF_AREAS, STAGES, areaOf, subjectsOf } from '../model/subjects';

/** 書櫃的科目分區（清單在 model/subjects）。 */
export const SUBJECTS = SHELF_AREAS;

/** 這個學制裡第一個屬於該分區的科目：從書櫃某一區按「建立教材」時先帶入。 */
const pick = (stage: string, area?: string) => subjectsOf(stage).find((s) => areaOf(s) === area) ?? subjectsOf(stage)[0];

/**
 * 系統管理員的「建立教材」：從空白本開始，建的是數位教科書（原本）。
 * 跟老師的「建立自編」不同：沒有章節可選（空白本），要填科目與出版社——
 * 出版社只有原本能填，老師的副本沿用它、不能改（版本管理）。
 */
export function BlankDialog({
  subject: initialSubject,
  onCancel,
  onCreate,
}: {
  /** 從哪一區按的（書櫃分區）：先帶入該區的科目，還是可以改。 */
  subject?: string;
  onCancel: () => void;
  onCreate: (v: { name: string; subject: string; publisher: string; stage: string }) => void;
}) {
  const [name, setName] = useState('');
  // 科目照學制列（2026-11-03 定案的學制科目），回傳的是科目本身（例：理化），書櫃分區由呼叫端換算
  const [subject, setSubject] = useState(() => pick('國小', initialSubject));
  const [publisher, setPublisher] = useState('');
  // 學制：書卡左上要寫「115 南一 國中」，少了它就沒有年段（2026-11-03）
  const [stage, setStage] = useState('國小');
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => ESC(onCancel), [onCancel]);
  useEffect(() => inputRef.current?.focus(), []);

  const ready = name.trim().length > 0 && publisher.trim().length > 0;
  const create = () => ready && onCreate({ name: name.trim(), subject, publisher: publisher.trim(), stage });

  return createPortal(
    <Scrim onClick={onCancel}>
      <Sheet role="dialog" aria-modal="true" aria-label="建立教材" onClick={(e) => e.stopPropagation()}>
        {/* 不放 ×：按「取消」或點框外就能關 */}
        <Title>建立教材</Title>

        <Field>
          <span>出版社</span>
          <Input ref={inputRef} value={publisher} placeholder="請輸入出版社名稱" onChange={(e) => setPublisher(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && create()} />
        </Field>

        <Field>
          <span>教材名稱</span>
          <Input value={name} placeholder="請輸入教材名稱" onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && create()} />
        </Field>

        <Field as="div">
          <span>學制</span>
          <Chips role="radiogroup" aria-label="學制">
            {STAGES.map((s) => (
              <Chip
                key={s}
                type="button"
                role="radio"
                aria-checked={stage === s}
                $on={stage === s}
                // 換學制時科目不在新清單裡（國語 → 國中），換成同一區的科目（國文）
                onClick={() => {
                  setStage(s);
                  if (!subjectsOf(s).includes(subject)) setSubject(pick(s, areaOf(subject)));
                }}
              >
                {s}
              </Chip>
            ))}
          </Chips>
        </Field>

        <Field as="div">
          <span>科目</span>
          <Chips role="radiogroup" aria-label="科目">
            {subjectsOf(stage).map((s) => (
              <Chip key={s} type="button" role="radio" aria-checked={subject === s} $on={subject === s} onClick={() => setSubject(s)}>
                <SubjectMark subject={s} size={16} />
                {s}
              </Chip>
            ))}
          </Chips>
        </Field>

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

const Title = styled.p`
  margin: 0;
  font-size: ${(p) => p.theme.typography.bodyLgSize};
  line-height: ${(p) => p.theme.typography.bodyLgLineHeight};
  font-weight: 600;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.gapSm};
  font-size: ${(p) => p.theme.typography.labelSize};
  color: ${(p) => p.theme.text.secondary};
`;

const Input = styled.input`
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

/**
 * 五顆一樣寬：三欄格線，第一排三顆、第二排兩顆靠左。
 * 不用彈性撐滿——第二排只有兩顆時會被拉成長條（乙練：「不能滿版那麼長」）；也不置中，靠左對齊。
 */
const Chips = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

/** 選中的灰底（跟工具列的開關同一款），不用黃 */
const Chip = styled.button<{ $on: boolean }>`
  justify-content: center;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  block-size: 36px;
  padding: 0 14px 0 10px;
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => (p.$on ? p.theme.border.hover : p.theme.border.subtle)};
  border-radius: 999px;
  background: ${(p) => (p.$on ? p.theme.surface.muted : p.theme.surface.raised)};
  font: inherit;
  font-size: ${(p) => p.theme.typography.bodySmSize};
  font-weight: ${(p) => (p.$on ? 500 : 400)};
  color: ${(p) => p.theme.text.primary};
  cursor: pointer;
`;
