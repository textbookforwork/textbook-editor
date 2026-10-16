import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Icon } from '../components/Icon';
import { primaryButtonCss } from '../components/buttonStyles';
import { parseMarkdown, type ImportResult } from '../model/markdown';
import { SCRIM } from '../styles/scrim';

type Props = {
  /** 內建範例，讓人不必先準備檔案就能看見結果。 */
  samples: Record<string, string>;
  onApply: (result: ImportResult) => void;
  onClose: () => void;
};

/**
 * 匯入 md。長相跟系統其他地方同一套：上傳區照媒體庫的上傳框（虛線框、黑色上傳鈕、格式，可拖檔進來）、
 * 兩個範例照網頁元件的「插入標籤／內嵌網頁」兩顆選項、按鈕照確認對話框（靠右、取消是文字鈕）。
 *
 * 選了檔案或範例之後對話框不長大、也不寫「幾列」這種沒用的話；只有出問題才寫一行紅字：
 * 讀不進來，或有寫錯的行（會安靜地變成內文，上課才發現標題沒生效）。
 */
export function ImportDialog({ samples, onApply, onClose }: Props) {
  const [name, setName] = useState<string | null>(null);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [over, setOver] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const read = (label: string, src: string) => {
    try {
      setResult(parseMarkdown(src, { autoPageBreak: true }));
      setName(label);
      setError(null);
    } catch {
      setError('這個檔案讀不進來，請確認是教材的 md 格式');
      setResult(null);
      setName(null);
    }
  };

  /** 再按一次已選的範例＝取消選取，回到還沒選的狀態 */
  const clear = () => {
    setName(null);
    setResult(null);
    setError(null);
  };

  const take = async (file: File | null | undefined) => {
    if (!file) return;
    read(file.name, await file.text());
  };

  const pick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.md,text/markdown,text/plain';
    input.onchange = () => void take(input.files?.[0]);
    input.click();
  };

  const bad = result?.unrecognized.length ?? 0;
  const problem = error ?? (bad > 0 ? `有 ${bad} 行沒辨識出來，會當成內文` : null);
  const isSample = !!name && name in samples;

  return createPortal(
    <Scrim onClick={onClose}>
      <Sheet role="dialog" aria-modal="true" aria-label="匯入 .md 檔" onClick={(e) => e.stopPropagation()}>
        <Head>
          <span>匯入 .md 檔</span>
          <Close type="button" onClick={onClose} aria-label="關閉" title="關閉">
            <Icon name="x" size={24} label="關閉" />
          </Close>
        </Head>

        <Drop
          $over={over}
          onDragOver={(e) => {
            if (!e.dataTransfer.types.includes('Files')) return;
            e.preventDefault();
            setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setOver(false);
            void take(e.dataTransfer.files[0]);
          }}
        >
          <Upload type="button" onClick={pick}>
            上傳 md 檔
            <Icon name="upload" size={16} />
          </Upload>
          {/* 選了自己的檔案才寫檔名；按鈕已經寫了 md，不再重複格式 */}
          {name && !isSample && <DropHint>{name}</DropHint>}
        </Drop>

        {/* 內建範例：兩顆並排的選項，跟網頁元件的「插入標籤／內嵌網頁」同一款；選中的維持深綠框字，再按一次取消 */}
        <Choices role="group" aria-label="內建範例">
          {Object.keys(samples).map((k) => (
            <Choice key={k} type="button" $on={name === k} aria-pressed={name === k} onClick={() => (name === k ? clear() : read(k, samples[k]))}>
              {k}
            </Choice>
          ))}
        </Choices>

        {problem && <Problem role="alert">{problem}</Problem>}

        {/* 匯入可以用復原退回，不必另外警告 */}
        <Foot>
          <Ghost type="button" onClick={onClose}>
            取消
          </Ghost>
          <Apply type="button" disabled={!result} onClick={() => result && onApply(result)}>
            匯入
          </Apply>
        </Foot>
      </Sheet>
    </Scrim>,
    document.body
  );
}

const Scrim = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: ${SCRIM};
  display: grid;
  place-items: center;
  padding: ${(p) => p.theme.space.insetLg};
`;

/** 跟「課本封面」同一款：淡白底、四周 insetLg、上下 20 的間距，不分標題列與內容區 */
const Sheet = styled.div`
  inline-size: min(480px, 100%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: ${(p) => p.theme.space.insetLg};
  background: ${(p) => p.theme.surface.page};
  border-radius: ${(p) => p.theme.radius.panel};
  box-shadow: ${(p) => p.theme.shadow.float};
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${(p) => p.theme.typography.bodyLgSize};
  line-height: ${(p) => p.theme.typography.bodyLgLineHeight};
`;

const Close = styled.button`
  display: grid;
  place-items: center;
  inline-size: 24px;
  block-size: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: ${(p) => p.theme.icon.default};
  cursor: pointer;
`;

/** 跟媒體庫的上傳框同一款：虛線框、置中一顆黑色上傳鈕、下面一行格式；檔案拖進來時框變深、底變灰 */
const Drop = styled.div<{ $over: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.space.gapSm};
  block-size: 128px;
  padding: ${(p) => p.theme.space.insetMd};
  box-sizing: border-box;
  border: ${(p) => p.theme.border.widthDefault} dashed
    ${(p) => (p.$over ? p.theme.border.hover : p.theme.border.default)};
  border-radius: ${(p) => p.theme.radius.card};
  background: ${(p) => (p.$over ? p.theme.surface.sunken : p.theme.surface.raised)};
  text-align: center;
`;

const Upload = styled.button`
  ${primaryButtonCss}
  flex: none;
`;

const DropHint = styled.span`
  max-inline-size: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-caption-size);
  color: ${(p) => p.theme.text.tertiary};
`;

const Choices = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(p) => p.theme.space.gapSm};
`;

/** 跟網頁元件的「插入標籤／內嵌網頁」同一款：白底灰框，滑過與選中是品牌深綠的框與字 */
const Choice = styled.button<{ $on: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  min-block-size: 40px;
  padding: 0 12px;
  cursor: pointer;
  white-space: nowrap;
  border-radius: ${(p) => p.theme.radius.control};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => (p.$on ? p.theme.border.accent : p.theme.border.subtle)};
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => (p.$on ? p.theme.text.accent : p.theme.text.secondary)};
  transition: border-color 0.12s, color 0.12s;
  &:hover {
    border-color: ${(p) => p.theme.border.accent};
    color: ${(p) => p.theme.text.accent};
  }
  /* 滑鼠點了不畫焦點外框（有些瀏覽器會，跟選取的深綠框疊成兩圈）；鍵盤切過來才畫 */
  &:focus:not(:focus-visible) { outline: none; }
`;

/** 出問題才有的一行紅字 */
const Problem = styled.p`
  margin: -8px 0 0;
  text-align: center;
  font-size: ${(p) => p.theme.typography.labelSize};
  line-height: ${(p) => p.theme.typography.labelLineHeight};
  font-weight: 500;
  color: ${(p) => p.theme.feedback.errorDefault};
`;

/** 跟確認對話框同一款：靠右，取消是文字鈕、主要按鈕在右 */
const Foot = styled.footer`
  display: flex;
  justify-content: flex-end;
  gap: ${(p) => p.theme.space.gapSm};
`;

const Ghost = styled.button`
  border: none;
  background: transparent;
  color: ${(p) => p.theme.action.ghostText};
  font-size: var(--ds-typography-label-size);
  cursor: pointer;
  border-radius: ${(p) => p.theme.radius.control};
  padding: 0 20px;
  min-block-size: ${(p) => p.theme.control.heightMd};
  &:hover { background: ${(p) => p.theme.action.ghostBgHover}; }
`;

/** 匯入是「把東西帶進來」：全站上傳、匯入共用的黑色主要按鈕，高度跟取消一樣 */
const Apply = styled.button`
  ${primaryButtonCss}
  min-block-size: ${(p) => p.theme.control.heightMd};
  font-size: var(--ds-typography-label-size);
`;
