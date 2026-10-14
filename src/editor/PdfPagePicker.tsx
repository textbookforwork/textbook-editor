import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../components/Icon';
import { primaryButtonCss } from '../components/buttonStyles';
import { formatRange, parseRange } from '../model/pageRange';
import { putHiddenImage, urlOf, type Asset } from './assets';
import { openPdf, pageThumb, renderPage } from './pdfPages';
import { PanelBody, PanelClose, PanelHead, PanelTitle } from './SidePanel';
import { toast } from './Toast';

export type ImportedPage = { assetId: string; aspectRatio: number; page: number };

type Props = {
  asset: Asset;
  onBack: () => void;
  onClose: () => void;
  /** 選好的頁面已經畫成圖片，交給外層插進畫布。 */
  onImport: (pages: ImportedPage[]) => void;
  /** 不拆頁，整份嵌進頁面（瀏覽器的 PDF 檢視器加我們的翻頁膠囊）。 */
  onEmbed: () => void;
};

/** 匯入的頁面畫多寬：比頁面內容寬（896）大一倍，放大看字也清楚。 */
const IMPORT_WIDTH = 1800;

/**
 * 媒體庫裡的選頁畫面，照 Figma「pdf選取」：
 * 上方返回鍵加檔名；「選取範圍」可以打 1, 3, 5-7，旁邊是總頁數；全選；兩欄頁面縮圖，點一下選或取消；
 * 底部「嵌入整份」（次要）與「匯入 N 頁」（主要）。範圍輸入框和縮圖的勾選是同一份狀態，改哪邊另一邊跟著變。
 */
export function PdfPagePicker({ asset, onBack, onClose, onImport, onEmbed }: Props) {
  const url = urlOf(asset.assetId);
  const [total, setTotal] = useState(0);
  const [picked, setPicked] = useState<number[]>([]);
  const [rangeText, setRangeText] = useState('');
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;
    let alive = true;
    openPdf(url)
      .then((doc) => alive && setTotal(doc.numPages))
      .catch(() => alive && toast('讀不出這份 PDF'));
    return () => {
      alive = false;
    };
  }, [url]);

  const pages = useMemo(() => Array.from({ length: total }, (_, i) => i + 1), [total]);
  const all = total > 0 && picked.length === total;

  const setPages = (next: number[]) => {
    setPicked(next);
    setRangeText(formatRange(next));
  };
  const toggle = (n: number) =>
    setPages(picked.includes(n) ? picked.filter((x) => x !== n) : [...picked, n].sort((a, b) => a - b));

  const doImport = async () => {
    if (!url || picked.length === 0 || busy) return;
    try {
      const doc = await openPdf(url);
      const out: ImportedPage[] = [];
      for (const [i, n] of picked.entries()) {
        setBusy(`匯入中 ${i + 1} / ${picked.length}`);
        const { blob, aspectRatio } = await renderPage(doc, n, IMPORT_WIDTH);
        out.push({ assetId: putHiddenImage(blob), aspectRatio, page: n });
      }
      onImport(out);
    } catch {
      toast('有一頁畫不出來，請再試一次');
    } finally {
      setBusy(null);
    }
  };

  return (
    <>
      <Head>
        <Ghost onClick={onBack} aria-label="回到 PDF 清單">
          <Icon name="chevron-left" size={24} label="返回" />
        </Ghost>
        <Title title={asset.name}>{asset.name.replace(/\.pdf$/i, '')}</Title>
        <Ghost onClick={onClose} aria-label="關閉">
          <Icon name="x" size={24} label="關閉" />
        </Ghost>
      </Head>

      <Body>
        <Row>
          <Label>選取範圍</Label>
          <Count>{total > 0 ? `共 ${total} 頁` : '讀取中…'}</Count>
        </Row>
        {/* 照 Figma「pdf選取」：範圍、全選、頁面縮圖收在同一塊淡灰底卡裡 */}
        <Box>
          <RangeRow>
            <RangeInput
              value={rangeText}
              placeholder="1, 3, 5-7"
              aria-label="要匯入的頁碼"
              onChange={(e) => {
                setRangeText(e.target.value);
                setPicked(parseRange(e.target.value, total));
              }}
              onBlur={() => setRangeText(formatRange(picked))}
            />
            <Unit>頁</Unit>
          </RangeRow>
          <CheckAll>
            <input
              type="checkbox"
              checked={all}
              disabled={total === 0}
              onChange={() => setPages(all ? [] : pages)}
            />
            全選
          </CheckAll>
          <Grid>
            {pages.map((n) => (
              <PageCard
                key={n}
                type="button"
                $on={picked.includes(n)}
                aria-pressed={picked.includes(n)}
                aria-label={`第 ${n} 頁`}
                onClick={() => toggle(n)}
              >
                <Thumb url={url!} page={n} />
                <PageNo>{n}</PageNo>
              </PageCard>
            ))}
          </Grid>
        </Box>
      </Body>

      <Foot>
        <Secondary type="button" onClick={onEmbed} disabled={!!busy} title="不拆頁，整份放進頁面，用翻頁膠囊翻">
          嵌入整份
        </Secondary>
        <Primary type="button" onClick={doImport} disabled={picked.length === 0 || !!busy}>
          {busy ?? '匯入圖片'}
        </Primary>
      </Foot>
    </>
  );
}

/** 一頁的縮圖：畫好之前先放淡灰底，畫好再換上。 */
function Thumb({ url, page }: { url: string; page: number }) {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    pageThumb(url, page)
      .then((s) => alive && setSrc(s))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [url, page]);
  return <ThumbBox>{src && <img src={src} alt="" />}</ThumbBox>;
}

// ── 樣式：尺寸比照其他右側面板（標題 16、欄位名 12、輸入框與按鈕 36 高）──

const Head = styled(PanelHead)`
  padding-inline-start: ${(p) => p.theme.space.insetXs};
`;

const Title = styled(PanelTitle)`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Ghost = PanelClose;

const Body = styled(PanelBody)`
  gap: ${(p) => p.theme.space.gapSm};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Label = styled.span`
  font-size: var(--ds-typography-caption-size);
  font-weight: 500;
  color: ${(p) => p.theme.text.secondary};
`;

const Count = styled.span`
  font-size: var(--ds-typography-caption-size);
  color: ${(p) => p.theme.text.tertiary};
  font-variant-numeric: tabular-nums;
`;

/** 淡灰底卡：範圍、全選、縮圖都在裡面 */
const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.gapSm};
  padding: ${(p) => p.theme.space.insetXs};
  border-radius: ${(p) => p.theme.radius.card};
  background: ${(p) => p.theme.surface.sunken};
`;

const RangeRow = styled.label`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.gapSm};
`;

const RangeInput = styled.input`
  flex: 1;
  min-inline-size: 0;
  block-size: ${(p) => p.theme.control.heightSm};
  box-sizing: border-box;
  padding: 0 ${(p) => p.theme.space.insetSm};
  border: none;
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.surface.raised};
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  color: ${(p) => p.theme.text.primary};
  outline: none;
  &::placeholder { color: ${(p) => p.theme.text.placeholder}; }
  &:focus { box-shadow: inset 0 0 0 1px ${(p) => p.theme.border.hover}; }
`;

const Unit = styled.span`
  font-size: var(--ds-typography-caption-size);
  color: ${(p) => p.theme.text.secondary};
`;

const CheckAll = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding-inline-start: 4px;
  font-size: var(--ds-typography-caption-size);
  color: ${(p) => p.theme.text.primary};
  cursor: pointer;
  input {
    inline-size: 16px;
    block-size: 16px;
    margin: 0;
    accent-color: ${(p) => p.theme.brand.accentOnLight};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(p) => p.theme.space.gapSm};
`;

/** 白底小卡；選中的是品牌深綠 2px 框（outline，卡片不變大） */
/** 白底小卡；選中的是品牌深綠 2px 框（outline，卡片不變大、不重新排版，點起來不會頓） */
const PageCard = styled.button<{ $on: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2px;
  padding: 4px 4px 2px;
  border: none;
  border-radius: ${(p) => p.theme.radius.tile};
  background: ${(p) => p.theme.surface.raised};
  outline: 2px solid ${(p) => (p.$on ? p.theme.brand.accentOnLight : 'transparent')};
  outline-offset: 0;
  cursor: pointer;
  transition: outline-color 0.1s;
  -webkit-tap-highlight-color: transparent;
  &:hover { outline-color: ${(p) => (p.$on ? p.theme.brand.accentOnLight : p.theme.border.default)}; }
  &:focus-visible { outline-color: ${(p) => p.theme.brand.accentOnLight}; }
`

/**
 * 縮圖一律橫式 16:10、圓角 12，照參考圖：每張卡一樣高，排起來整齊。
 * 直式講義只露出上半部（標題那一段，認得出是哪一頁就夠）。
 */
const ThumbBox = styled.span`
  display: block;
  aspect-ratio: 2 / 1;
  border-radius: ${(p) => p.theme.radius.field};
  overflow: hidden;
  background: ${(p) => p.theme.surface.muted};
  img {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    object-fit: cover;
    object-position: top;
  }
`

const PageNo = styled.span`
  font-size: var(--ds-typography-caption-size);
  line-height: 16px;
  color: ${(p) => p.theme.text.secondary};
  font-variant-numeric: tabular-nums;
  text-align: center;
`;

/** 成對按鈕：次要在左、主要在右，都是 36 高 */
const Foot = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(p) => p.theme.space.gapSm};
  padding: ${(p) => p.theme.space.gapMd} 20px 20px;
  flex-shrink: 0;
`;

const Primary = styled.button`
  ${primaryButtonCss}
  flex: 1 1 0;
  min-inline-size: 0;
  box-sizing: border-box;
`;

/* 兩顆各佔一半 */
const Secondary = styled.button`
  flex: 1 1 0;
  min-inline-size: 0;
  box-sizing: border-box;
  min-block-size: ${(p) => p.theme.control.heightSm};
  padding: 0 16px;
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  border-radius: ${(p) => p.theme.radius.control};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.text.secondary};
  cursor: pointer;
  white-space: nowrap;
  &:hover:not(:disabled) { border-color: ${(p) => p.theme.border.accent}; color: ${(p) => p.theme.text.accent}; }
  &:disabled { color: ${(p) => p.theme.text.disabled}; cursor: default; }
`;
