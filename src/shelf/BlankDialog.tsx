import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { ESC, Pair, Scrim, Secondary, Sheet } from '../editor/ShareDialog';
import { SubjectMark } from '../editor/HomeButton';

/** 書櫃的科目分區，也是書櫃上由上到下的順序（乙練定的：國語文、社會、英語、自然科學、數學）。 */
export const SUBJECTS = ['國語文', '社會', '英語', '自然科學', '數學'];

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
  /** 從哪一區按的：科目先帶入，還是可以改。 */
  subject?: string;
  onCancel: () => void;
  onCreate: (v: { name: string; subject: string; publisher: string }) => void;
}) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState(initialSubject && SUBJECTS.includes(initialSubject) ? initialSubject : SUBJECTS[0]);
  const [publisher, setPublisher] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => ESC(onCancel), [onCancel]);
  useEffect(() => inputRef.current?.focus(), []);

  const ready = name.trim().length > 0 && publisher.trim().length > 0;
  const create = () => ready && onCreate({ name: name.trim(), subject, publisher: publisher.trim() });

  return createPortal(
    <Scrim onClick={onCancel}>
      <Sheet role="dialog" aria-modal="true" aria-label="建立教材" onClick={(e) => e.stopPropagation()}>
        {/* 不放 ×：按「取消」或點框外就能關 */}
        <Title>建立教材</Title>

        <Field>
          <span>教材名稱</span>
          <Input ref={inputRef} value={name} placeholder="請輸入教材名稱" onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && create()} />
        </Field>

        <Field as="div">
          <span>科目</span>
          <Chips role="radiogroup" aria-label="科目">
            {SUBJECTS.map((s) => (
              <Chip key={s} type="button" role="radio" aria-checked={subject === s} $on={subject === s} onClick={() => setSubject(s)}>
                <SubjectMark subject={s} size={16} />
                {s}
              </Chip>
            ))}
          </Chips>
        </Field>

        <Field>
          <span>出版社</span>
          <Input value={publisher} placeholder="請輸入出版社名稱" onChange={(e) => setPublisher(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && create()} />
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

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

/** 選中的灰底（跟工具列的開關同一款），不用黃 */
const Chip = styled.button<{ $on: boolean }>`
  /* 每一排平均撐滿整排（3＋2 時兩排都左右貼齊），內容置中 */
  flex: 1 1 auto;
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
