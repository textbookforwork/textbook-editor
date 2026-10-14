import { useEffect, useState } from 'react';
import { fieldCss } from '../../editor/SidePanel';
import { primaryButtonCss } from '../buttonStyles';
import styled from 'styled-components';
import { Icon } from '../Icon';
import { pickFile, putFile, urlOf } from '../../editor/assets';
import { usePopupViewer } from '../../viewer/PopupViewer';
import type { BlockPatch } from '../../model/actions';
import type { PdfBlock } from '../../model/types';

type Props = {
  block: PdfBlock;
  /** 框的實際尺寸，跟量測用的是同一個函式算出來的。 */
  boxStyle?: React.CSSProperties;
  /** 唯讀（預覽、檢視台）時不傳。 */
  onPatch?: (patch: BlockPatch) => void;
  onSelect?: () => void;
};

/**
 * PDF。
 *
 * 編輯時不真的載入——理由跟影片一樣：瀏覽器的 PDF 檢視器是非同步排版，
 * 載入中與載入後的尺寸會變，分頁量測會被攪亂；一頁上放三份學習單就是
 * 三個檢視器同時跑，編輯會卡住。所以編輯畫面只畫一個示意框，
 * 讓老師看得到檔名、改得了起始頁。
 *
 * 唯讀時用 iframe 交給瀏覽器內建的檢視器，翻頁、縮放都是它的事，
 * 這裡只負責用 #page= 指到老師要的那一頁。
 */
export function PdfBlockView({ block, boxStyle, onPatch, onSelect }: Props) {
  const [busy, setBusy] = useState(false);
  const url = urlOf(block.assetId);
  const page = block.page ?? 1;
  // 目前看的那一頁。編輯時翻頁也就是設定起始頁；唯讀時只是學生自己翻
  const [cur, setCur] = useState(page);
  const viewer = usePopupViewer();
  useEffect(() => setCur(page), [page]);
  const go = (n: number) => {
    const next = Math.max(1, Math.floor(n) || 1);
    setCur(next);
    if (onPatch && next !== page) onPatch({ page: next });
  };

  const upload = async () => {
    if (!onPatch || busy) return;
    const file = await pickFile('application/pdf');
    if (!file) return;
    setBusy(true);
    try {
      // 標題預設用檔名，老師沒改也看得出來這是哪一份
      onPatch({ assetId: putFile(file), title: block.title || file.name });
    } finally {
      setBusy(false);
    }
  };

  let body: React.ReactNode;
  if (!url) {
    body = (
      <Empty style={boxStyle}>
        {onPatch ? (
          // 只放一顆黑色上傳鈕：格式與大小限制在選檔時才擋，不先寫一堆字
          <Choose type="button" onClick={upload} disabled={busy}>
            {busy ? '讀取中…' : '上傳 PDF'}
            <Icon name={busy ? 'loader' : 'upload'} size={16} />
          </Choose>
        ) : (
          <EmptyHint>還沒上傳 PDF</EmptyHint>
        )}
      </Empty>
    );
  } else {
    body = (
      <Frame style={boxStyle}>
        {/* 關掉瀏覽器檢視器自己的深色工具列與縮圖欄（toolbar=0、navpanes=0），頁寬撐滿（FitH），
            翻頁改用下面自己的膠囊，長相才跟整個編輯器一致。換頁要重新載入，所以用頁碼當 key */}
        <Viewer
          key={cur}
          src={`${url}#page=${cur}&toolbar=0&navpanes=0&view=FitH`}
          title={block.title || 'PDF'}
        />
        {/* 編輯時翻頁與更換在元件上方的浮動工具列；這顆膠囊只給學生翻頁（側欄縮圖上也不放） */}
        {!onPatch && viewer && (
        <PdfOverlay onPointerDown={(e) => e.stopPropagation()}>
          <NavBtn type="button" onClick={() => go(cur - 1)} disabled={cur <= 1} aria-label="上一頁">
            <Icon name="chevron-left" size={16} />
          </NavBtn>
          <PageRow>
            第
            <PageInput
              key={cur}
              type="number"
              min={1}
              defaultValue={cur}
              aria-label={onPatch ? '起始頁' : '頁碼'}
              onBlur={(e) => go(Number(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.currentTarget.blur();
              }}
            />
            頁
          </PageRow>
          <NavBtn type="button" onClick={() => go(cur + 1)} aria-label="下一頁">
            <Icon name="chevron-right" size={16} />
          </NavBtn>
          {onPatch && (
            <>
              <Sep />
              <ChangeBtn type="button" onClick={upload} title="更換 PDF 檔案">
                更換
                <Icon name="upload" size={16} />
              </ChangeBtn>
            </>
          )}
        </PdfOverlay>
        )}
      </Frame>
    );
  }

  return (
    <Figure onPointerDown={onSelect}>
      {body}
      {/* 不在框下顯示檔名：檔名是給老師管理檔案的，不是給學生看的內容 */}
    </Figure>
  );
}

/** 跟圖片同一招：table 排版讓標題跟著框的寬度，外框不會比框大。 */
const Figure = styled.figure`
  margin: 0;
  display: table;
  inline-size: auto;
`;

/** 空的位置：淡灰虛線框，中間一顆黑色「上傳 PDF」 */
const Empty = styled.div`
  background: ${(p) => p.theme.surface.page};
  border: 2px dashed ${(p) => p.theme.border.subtle};
  border-radius: ${(p) => p.theme.radius.field};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.space.gapMd};
  padding: ${(p) => p.theme.space.insetMd};
  text-align: center;
  box-sizing: border-box;
  writing-mode: horizontal-tb;
`;

const EmptyHint = styled.span`
  font-size: var(--ds-typography-body-sm-size);
  color: ${(p) => p.theme.text.secondary};
`;

const Choose = styled.button`
  ${primaryButtonCss}
`

const PageRow = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: var(--ds-typography-body-sm-size);
  color: ${(p) => p.theme.text.secondary};
`

const PageInput = styled.input`
  ${fieldCss}
  inline-size: 44px;
  min-block-size: 30px;
  padding: 0 4px;
  text-align: center;
  font-variant-numeric: tabular-nums;
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
`

const Frame = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.field};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  background: ${(p) => p.theme.surface.media};
  box-sizing: border-box;
`;

/** 翻頁膠囊：跟浮動工具列同一款（白底、只靠陰影、不畫框），貼在框的下緣置中 */
const PdfOverlay = styled.div`
  position: absolute;
  inset-block-end: 12px;
  inset-inline-start: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.surface.raised};
  box-shadow: ${(p) => p.theme.shadow.card};
  z-index: 2;
  white-space: nowrap;
  writing-mode: horizontal-tb;
`

const NavBtn = styled.button`
  display: grid;
  place-items: center;
  inline-size: 30px;
  block-size: 30px;
  padding: 0;
  border: none;
  border-radius: ${(p) => p.theme.radius.control};
  background: transparent;
  color: ${(p) => p.theme.icon.default};
  cursor: pointer;
  &:hover:not(:disabled) { background: ${(p) => p.theme.surface.sunken}; }
  &:disabled { color: ${(p) => p.theme.icon.disabled}; cursor: default; }
`;

const Sep = styled.span`
  inline-size: 1px;
  block-size: 18px;
  margin-inline: 2px;
  background: ${(p) => p.theme.border.subtle};
`;

const ChangeBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-block-size: 30px;
  padding: 0 10px;
  border: none;
  background: transparent;
  color: ${(p) => p.theme.text.secondary};
  border-radius: ${(p) => p.theme.radius.control};
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  cursor: pointer;
  &:hover { background: ${(p) => p.theme.surface.sunken}; color: ${(p) => p.theme.text.primary}; }
`

const Viewer = styled.iframe`
  display: block;
  inline-size: 100%;
  block-size: 100%;
  border: none;
`;

