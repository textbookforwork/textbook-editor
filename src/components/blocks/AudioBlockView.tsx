import { primaryButtonCss } from '../buttonStyles';
import styled from 'styled-components';
import { Icon } from '../Icon';
import { pickFile, putFile, urlOf } from '../../editor/assets';
import type { BlockPatch } from '../../model/actions';
import type { AudioBlock } from '../../model/types';

type Props = {
  block: AudioBlock;
  boxStyle?: React.CSSProperties;
  onPatch?: (patch: BlockPatch) => void;
  onSelect?: () => void;
};

/**
 * 聲音。課文朗讀、國文的範讀都走這裡。
 *
 * 編輯畫面上不掛播放器，跟影片同一個理由：一頁多個播放器會拖慢編輯，
 * 而且它們的非同步版面會攪亂分頁量測。真的播放在補充的檢視器裡。
 */
export function AudioBlockView({ block, boxStyle, onPatch, onSelect }: Props) {
  const ready = !!urlOf(block.assetId);

  return (
    <Bar style={boxStyle} onPointerDown={onSelect}>
      <Play $ready={ready}>
        <Icon name="play" size={16} />
      </Play>
      <Body>
        {/* 還沒上傳時不放「未命名」「尚未上傳」這類占位字：上傳鈕本身就說明了狀態 */}
        {block.title && <Title>{block.title}</Title>}
      </Body>
      {/* 已經有檔案就不放「更換」：換檔在元件上方的浮動工具列（跟 PDF 一樣）。
          看的是 assetId 不是網址：md 匯入的音檔有路徑但還沒有實際檔案，也算已指定 */}
      {onPatch && !block.assetId && (
        <Pick
          onClick={async (e) => {
            e.stopPropagation();
            const file = await pickFile('audio/*');
            if (!file) return;
            onPatch({ assetId: putFile(file), title: block.title || file.name });
          }}
        >
          上傳音檔
          <Icon name="upload" size={16} />
        </Pick>
      )}
    </Bar>
  );
}

const Bar = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  border-radius: 999px;
  background: ${(p) => p.theme.surface.sunken};
  writing-mode: horizontal-tb;
`;

/** 播放鍵：跟影片框中間的播放鍵、媒體庫的試聽鍵同一款——白色圓鈕、淡陰影、深色三角形 */
const Play = styled.span<{ $ready: boolean }>`
  display: grid;
  place-items: center;
  inline-size: 36px;
  block-size: 36px;
  flex: none;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.raised};
  box-shadow: ${(p) => (p.$ready ? p.theme.shadow.card : 'none')};
  color: ${(p) => (p.$ready ? p.theme.icon.default : p.theme.icon.disabled)};
`;

const Body = styled.div`
  flex: 1;
  min-inline-size: 0;
`;

const Title = styled.div`
  font-size: var(--ds-typography-body-sm-size);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Pick = styled.button`
  ${primaryButtonCss}
  flex: none;
`;
