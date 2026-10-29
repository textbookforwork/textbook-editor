import { useState } from 'react';
import { primaryButtonCss } from '../buttonStyles';
import styled from 'styled-components';
import { Icon } from '../Icon';
import { pickFile, putFile, urlOf } from '../../editor/assets';
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
 * 編輯時檢視器不吃滑鼠：iframe 會把點擊整個接走，老師點 PDF 就選不到元件、叫不出膠囊。
 *
 * 唯讀時用 iframe 交給瀏覽器內建的檢視器，翻頁、縮放都是它的事，
 * 這裡只負責用 #page= 指到起始頁（md 匯入時可指定，預設第 1 頁）。
 */
export function PdfBlockView({ block, boxStyle, onPatch, onSelect }: Props) {
  const [busy, setBusy] = useState(false);
  const url = urlOf(block.assetId);
  const page = block.page ?? 1;

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
            不再疊自己的翻頁膠囊（2026-10-29 乙練：會擋視線），閱讀時在檢視器裡直接捲動翻頁 */}
        <Viewer
          $editing={!!onPatch}
          src={`${url}#page=${page}&toolbar=0&navpanes=0&view=FitH`}
          title={block.title || 'PDF'}
        />
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

const Frame = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.field};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  background: ${(p) => p.theme.surface.media};
  box-sizing: border-box;
`;

const Viewer = styled.iframe<{ $editing: boolean }>`
  display: block;
  pointer-events: ${(p) => (p.$editing ? 'none' : 'auto')};
  inline-size: 100%;
  block-size: 100%;
  border: none;
`;

