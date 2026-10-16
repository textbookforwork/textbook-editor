import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Icon } from '../components/Icon';
import { POPUP_KIND, missingOf, titleOf } from '../model/popups';
import { urlOf } from '../editor/assets';
import { Bubble, isVertical, type Anchor } from './Bubble';
import { Missing, VideoBody } from './VideoBody';
import { safeHttpUrl } from './safeUrl';
import { RichPopupView, type RichItem } from './RichPopupView';
import type { Block, PopupItem } from '../model/types';
import { SCRIM } from '../styles/scrim';

export type { Anchor };

type Ctx = {
  /**
   * 打開某個元件的補充。點角標就是呼叫這個。
   *
   * 只掛一項而且知道角標在哪（有傳 anchor）→ 在角標旁直接彈泡泡；
   * 多項、或沒有角標可對（例如從設定面板按「預覽」）→ 開中央的檢視視窗。
   */
  open: (block: Block, anchor?: Anchor, lead?: Lead) => void;
  /**
   * 掛上「從檢視器直接去編輯」的入口。
   *
   * 由編輯器自己註冊，因為只有它知道怎麼開設定面板；
   * 預覽與學生端沒有人註冊，那顆按鈕就不會出現。
   */
  registerEdit: (fn: ((blockId: string) => void) | null) => void;
};

const ViewerCtx = createContext<Ctx | null>(null);

export const usePopupViewer = () => useContext(ViewerCtx);

/** 縮圖用：裡面的頁面不開檢視器，角標只是記號。 */
export function WithoutPopupViewer({ children }: { children: ReactNode }) {
  return <ViewerCtx.Provider value={null}>{children}</ViewerCtx.Provider>;
}

/**
 * 生字詞的註釋：泡泡最上面先攤開這一則，底下才是掛在同幾個字上的補充。
 * 註釋是讀這幾個字一定要看的，不該跟補充一樣收成一張卡。
 */
export type Lead = { title: string; body: string };

type Opened = { block: Block; anchor: Anchor | null; lead: Lead | null };

/**
 * 補充內容的檢視器。老師編的時候與學生上課看到的是同一個元件——
 * 兩邊各做一份，遲早會不一樣，而不一樣的那天是在課堂上。
 *
 * 一項直接彈泡泡、多項開中央視窗。角標上的數字已經先告訴學生會發生哪一種，
 * 所以老師不必每一課都自己先點過一遍。
 */
export function PopupViewerProvider({
  children,
  onJump,
}: {
  children: ReactNode;
  /** 「跳到某一段」要由外層決定怎麼跳：預覽是換頁，編輯是捲動。 */
  onJump?: (rowId: string) => void;
}) {
  const [opened, setOpened] = useState<Opened | null>(null);
  const [onEdit, setOnEdit] = useState<((blockId: string) => void) | null>(null);
  /** 「看大圖」：整個彈窗換成那一張圖，不在清單裡展開——清單裡塞一張大圖會把其他項擠出畫面。 */
  const [zoom, setZoom] = useState<Extract<PopupItem, { kind: 'image' }> | null>(null);
  /** 「開啟」大彈窗：從清單進來的，視窗換成大的；Esc 或返回鈕回到清單。 */
  const [rich, setRich] = useState<RichItem | null>(null);
  /** 從清單點文字、影片、聲音、網頁：整個視窗換成那一項（跟看大圖同一種做法），左上角可以返回清單 */
  const [detail, setDetail] = useState<PopupItem | null>(null);
  /** 從多項泡泡點一則文字：原地換成單則文字的泡泡，跟只掛一則時長得一樣，不開中央視窗 */
  const [picked, setPicked] = useState<PopupItem | null>(null);
  const open = useCallback((b: Block, anchor?: Anchor, lead?: Lead) => {
    // 只掛一張圖、一個網頁或一支影片：直接開大視窗，跟從多項裡點開的是同一個畫面，不另外彈小泡泡
    // 帶著註釋的不直接開：註釋要先看得到
    const solo = b.popups.length === 1 && !lead ? b.popups[0] : null;
    setZoom(solo?.kind === 'image' ? solo : null);
    setRich(null);
    setPicked(null);
    setDetail(solo?.kind === 'web' || solo?.kind === 'video' ? solo : null);
    setOpened({ block: b, anchor: anchor ?? null, lead: lead ?? null });
  }, []);
  const close = useCallback(() => {
    setZoom(null);
    setRich(null);
    setDetail(null);
    setPicked(null);
    setOpened(null);
  }, []);
  // 包一層函式，否則 setState 會把傳進來的函式當成 updater 執行掉
  const registerEdit = useCallback(
    (fn: ((blockId: string) => void) | null) => setOnEdit(() => fn),
    []
  );
  const ctx = useMemo(() => ({ open, registerEdit }), [open, registerEdit]);

  const block = opened?.block ?? null;
  const single =
    opened && opened.anchor && !opened.lead && opened.block.popups.length === 1 ? opened.block.popups[0] : picked;
  /**
   * 只掛一項而且是大彈窗：不彈泡泡，直接開大視窗。
   * 大彈窗的內容是整段課文加圖，泡泡 360px 裝不下；角標上沒有數字、
   * 學生點下去開的是大視窗，這件事老師在設定面板選「大彈窗」時就知道。
   * 不看有沒有 anchor：從設定面板按「預覽」也要直接看到大視窗，
   * 老師預覽到的才是學生點角標看到的那一個。
   */
  /** 掛好幾項而且知道是從哪個元件點的：泡泡裡一排縮圖卡，不開中央清單 */
  /** 註釋加上補充（哪怕只有一項）也走這一種：註釋在上、卡片在下 */
  const multi = !picked && !!(opened && opened.anchor && (opened.block.popups.length > 1 || (opened.lead && opened.block.popups.length > 0)));
  const only = opened && !opened.lead && opened.block.popups.length === 1 ? opened.block.popups[0] : null;
  const soloRich = only?.kind === 'rich' ? only : null;
  const richOpen = rich ?? soloRich;
  /** 直排書裡點開的一則文字，視窗也直排（跟泡泡同一個判斷：看被點的元件實際的方向）。 */
  const verticalText = !!(
    opened?.anchor && isVertical(opened.anchor) && detail?.kind === 'text' && !zoom && !richOpen
  );

  // Esc 關閉。上課中老師常常一手拿平板，鍵盤與觸控都要能收起來
  useEffect(() => {
    if (!block) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        // 看大圖、或從清單開的大彈窗，Esc 先回到清單（或泡泡），再按一次才關閉
        // 從泡泡點進來的單項畫面沒有返回：Esc 跟 × 一樣直接關掉
        close();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [block, zoom, rich, detail, picked, close]);

  return (
    <ViewerCtx.Provider value={ctx}>
      {children}

      {/* 掛好幾項：在元件旁邊彈一排縮圖卡；點一張換成那一項的畫面，返回回到這裡 */}
      {opened && multi && opened.anchor && !zoom && !rich && !detail && (
        <Bubble
          block={opened.block}
          item={opened.block.popups[0]}
          items={opened.block.popups}
          lead={opened.lead ?? undefined}
          anchor={opened.anchor}
          onClose={close}
          onPick={(it) => {
            if (it.kind === 'jump') {
              close();
              if (it.targetRowId) onJump?.(it.targetRowId);
            } else if (it.kind === 'text') setPicked(it);
            else if (it.kind === 'image') setZoom(it);
            else if (it.kind === 'rich') setRich(it);
            else setDetail(it);
          }}
        />
      )}

      {/* 看大圖時泡泡先收起來，回來再重新定位 */}
      {opened && single && !soloRich && opened.anchor && !zoom && !detail && (
        <Bubble
          block={opened.block}
          item={single}
          anchor={opened.anchor}
          onClose={close}
          onJump={onJump}
          onEdit={onEdit ?? undefined}
        />
      )}

      {block &&
        (zoom || richOpen || detail || (!single && !multi)) &&
        createPortal(
          <Scrim onClick={close}>
            <Sheet
              role="dialog"
              aria-modal="true"
              aria-label={richOpen ? `補充內容：${titleOf(richOpen)}` : '補充內容'}
              $zoom={false}
              $vertical={verticalText}
              $rich={(!!richOpen && !zoom) || !!zoom || (!!detail && (detail.kind === 'web' || detail.kind === 'video'))}
              onClick={(e) => e.stopPropagation()}
            >
              {richOpen && !zoom ? (
                <>
                  <Head>
                    {/* 從清單進來的才有返回；只掛這一項的直接就是大視窗，沒有清單可回 */}
                    {richOpen.title.trim() && <strong>{richOpen.title}</strong>}
                    <Spacer />
                    {onEdit && (
                      <Ghost onClick={() => { close(); onEdit(block.id); }}>
                        編輯
                        <Icon name="pencil" size={16} />
                      </Ghost>
                    )}
                    <Ghost onClick={close} aria-label="關閉">
                      <Icon name="x" size={20} label="關閉" />
                    </Ghost>
                  </Head>
                  <RichPopupView item={richOpen} />
                </>
              ) : zoom ? (
                <>
                  {/* 沒寫標題：不留標題列，關閉鈕浮在右上角，圖從頂端就開始用 */}
                  <Head $float={!zoom.title.trim()}>
                    {zoom.title.trim() && <strong>{zoom.title}</strong>}
                    <Spacer />
                    <Ghost onClick={close} aria-label="關閉">
                      <Icon name="x" size={20} label="關閉" />
                    </Ghost>
                  </Head>
                  <Zoom $full={!zoom.title.trim()}>
                    <ZoomImage src={urlOf(zoom.assetId)} alt={zoom.title} />
                  </Zoom>
                </>
              ) : detail ? (
                <>
                  <Head>
                    {detail.title.trim() && <strong>{detail.title}</strong>}
                    <Spacer />
                    {detail.kind === 'web' && safeHttpUrl(detail.url) && (
                      <OpenWin
                        $primary={!detail.embeddable}
                        onClick={() => window.open(safeHttpUrl(detail.url)!, '_blank', 'noopener,noreferrer')}
                      >
                        以新視窗開啟
                        <Icon name="external-link" size={16} />
                      </OpenWin>
                    )}
                    <Ghost onClick={close} aria-label="關閉">
                      <Icon name="x" size={20} label="關閉" />
                    </Ghost>
                  </Head>
                  <Detail $big={detail.kind !== 'text'}>
                    {detail.kind === 'text' && <Text>{detail.body}</Text>}
                    {detail.kind === 'video' && <VideoBody item={detail} />}
                    {detail.kind === 'audio' && <audio controls autoPlay src={urlOf(detail.assetId)} style={{ width: '100%' }} />}
                    {detail.kind === 'web' &&
                      (detail.embeddable && safeHttpUrl(detail.url) ? (
                        <WebFrame src={safeHttpUrl(detail.url)!} title={detail.title || detail.url} referrerPolicy="no-referrer" />
                      ) : (
                        <NoPreview>
                          <NoIcon>
                            <Icon name="eye-off" size={24} />
                          </NoIcon>
                          <strong>{safeHttpUrl(detail.url) ? '此網頁不支援預覽' : '網址不完整'}</strong>
                          <span>{safeHttpUrl(detail.url) ? '以新視窗開啟網頁吧！' : '要以 http:// 或 https:// 開頭才能開啟'}</span>
                        </NoPreview>
                      ))}
                  </Detail>
                </>
              ) : (
                <>
                  <Head>
                    <strong>補充內容</strong>
                    <Count>{block.popups.length} 項</Count>
                    <Spacer />
                    {onEdit && (
                      <Ghost onClick={() => { close(); onEdit(block.id); }}>
                        編輯
                        <Icon name="pencil" size={16} />
                      </Ghost>
                    )}
                    <Ghost onClick={close} aria-label="關閉">
                      <Icon name="x" size={20} label="關閉" />
                    </Ghost>
                  </Head>

                  <List>
                    {block.popups.map((item) => (
                      <Item
                        key={item.id}
                        item={item}
                        onJump={onJump}
                        onClose={close}
                        onZoom={setZoom}
                        onRich={setRich}
                        onDetail={setDetail}
                      />
                    ))}
                  </List>
                </>
              )}
            </Sheet>
          </Scrim>,
          document.body
        )}
    </ViewerCtx.Provider>
  );
}

/** 每一項的行動鈕依它自己的 kind 決定，不看它旁邊有幾項。按下去都是換到那一項的畫面，不在清單裡展開 */
function Item({
  item,
  onJump,
  onClose,
  onZoom,
  onRich,
  onDetail,
}: {
  item: PopupItem;
  onJump?: (rowId: string) => void;
  onClose: () => void;
  onZoom: (item: Extract<PopupItem, { kind: 'image' }>) => void;
  /** 「開啟」大彈窗：整個視窗換成大的，跟看大圖同一種做法。 */
  onRich: (item: RichItem) => void;
  onDetail: (item: PopupItem) => void;
}) {
  const meta = POPUP_KIND[item.kind];
  const missing = missingOf(item);

  return (
    <Row>
      <Kind>
        <Icon name={meta.icon} size={20} />
      </Kind>
      <Body>
        {/* 種類不再另寫一行字：左邊的圖示已經說了 */}
        <Title>{titleOf(item)}</Title>
        {missing && <Missing>{missing}</Missing>}
      </Body>

      {!missing && (
        <Action
          onClick={() => {
            if (item.kind === 'jump') {
              onClose();
              if (item.targetRowId) onJump?.(item.targetRowId);
              return;
            }
            if (item.kind === 'image') return onZoom(item);
            if (item.kind === 'rich') return onRich(item);
            onDetail(item);
          }}
        >
          {meta.action}
        </Action>
      )}
    </Row>
  );
}

/* 遮罩需要半透明，但設計系統目前沒有 scrim token——
   Figma 那一包補上之後改成 token（見 HANDOVER 的待補清單）。 */
const Scrim = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: ${SCRIM};
  display: grid;
  place-items: center;
  padding: ${(p) => p.theme.space.insetLg};
`;

/*
 * 看大圖時視窗跟著圖的尺寸走，不固定寬度——小圖不該開一個空蕩蕩的大框。
 * 大彈窗是中央大視窗：寬 min(960px, 90vw)，高度讓內容決定、最多到接近整個畫面。
 */
const Sheet = styled.div<{ $zoom: boolean; $rich?: boolean; $vertical?: boolean }>`
  position: relative;
  inline-size: ${(p) => (p.$zoom ? 'fit-content' : p.$rich ? 'min(1248px, 92vw)' : 'min(560px, 100%)')};
  max-inline-size: 100%;
  max-block-size: ${(p) => (p.$zoom || p.$rich ? 'calc(100vh - 48px)' : 'min(72vh, 640px)')};
  display: flex;
  flex-direction: column;
  background: ${(p) => p.theme.surface.raised};
  border-radius: ${(p) => p.theme.radius.panel};
  box-shadow: ${(p) => p.theme.shadow.float};
  overflow: hidden;
  /*
   * 直排：標題一欄在最右、內文由右往左。高度固定、寬度跟著字數長，太長就左右捲。
   * 用實體的 width / height 定框，邏輯尺寸在直排時會轉向。
   */
  ${(p) =>
    p.$vertical &&
    `writing-mode: vertical-rl;
     inline-size: auto;
     max-inline-size: none;
     max-block-size: none;
     /* 高度跟著字數：字少就短，最高 520，超過才換到下一欄 */
     height: max-content;
     max-height: min(520px, calc(100vh - 48px));
     width: max-content;
     max-width: min(720px, calc(100vw - 48px));
     /*
      * 關閉鈕在右上角自成一列（跟橫排的視窗同一個位置）；標題一欄從它正下方開始，
      * 右緣跟關閉鈕的右緣切齊，內文各欄跟標題同一條上緣。不再讓標題欄跟關閉鈕並排，空出一條奇怪的直縫
      */
     > header button[aria-label='關閉'] { position: absolute; top: 16px; right: 16px; }
     > header { padding: 72px 0 24px 0; margin-right: 24px; }
     > div { flex: none; padding: 72px 8px 24px 24px; overflow: auto; }`}
`;

const Head = styled.header<{ $float?: boolean }>`
  ${(p) =>
    p.$float &&
    `position: absolute; top: 0; right: 0; z-index: 1;
     button { background: ${p.theme.surface.raised}; border-radius: 999px; }`}
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.gapSm};
  padding: ${(p) => p.theme.space.insetMd} ${(p) => p.theme.space.insetLg};
`;

const Spacer = styled.span`
  flex: 1;
`;

const Count = styled.span`
  color: ${(p) => p.theme.text.tertiary};
  font-size: var(--ds-typography-label-size);
`;

const Ghost = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: transparent;
  color: ${(p) => p.theme.action.ghostText};
  font: inherit;
  font-size: var(--ds-typography-label-size);
  cursor: pointer;
  border-radius: ${(p) => p.theme.radius.control};
  padding: 8px 10px;
  min-block-size: 40px;

  &:hover { background: ${(p) => p.theme.action.ghostBgHover}; }
`;

const List = styled.ul`
  margin: 0;
  padding: ${(p) => p.theme.space.insetSm} 0;
  list-style: none;
  overflow-y: auto;
`;

const Row = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${(p) => p.theme.space.gapMd};
  padding: ${(p) => p.theme.space.insetSm} ${(p) => p.theme.space.insetLg};
`;

const Kind = styled.span`
  display: grid;
  place-items: center;
  inline-size: 44px;
  block-size: 44px;
  flex: none;
  border-radius: ${(p) => p.theme.radius.field};
  background: ${(p) => p.theme.surface.sunken};
  color: ${(p) => p.theme.text.secondary};
`;

const Body = styled.div`
  flex: 1;
  min-inline-size: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-block-start: 2px;
`;

/* 跟左邊的圖示、右邊的按鈕同高，單行標題才會垂直置中 */
const Title = styled.div`
  min-block-size: 44px;
  display: flex;
  align-items: center;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 600;
`;

/**
 * 大圖：最大 720×1080、維持比例、不超出瀏覽器畫面；比上限小的圖不放大。
 * 扣掉的數字是遮罩內距（48）、標題列（約 73）與這一區自己的內距（48）。
 */
/* 圖盡可能大：視窗多大就撐多大，只留邊距 */
/**
 * 放大的圖。圖檔讀不到時（原型的上傳只活在這次開啟，重新整理就沒了）不留一條空白長條，
 * 改說清楚發生什麼事。
 */
function ZoomImage({ src, alt }: { src: string | undefined; alt: string }) {
  const [broken, setBroken] = useState(false);
  if (!src || broken) return <ZoomMissing>這張圖片讀不到了，請回編輯模式重新上傳</ZoomMissing>;
  return <img src={src} alt={alt} onError={() => setBroken(true)} />;
}

const ZoomMissing = styled.p`
  margin: 0;
  padding: 48px 24px;
  font-size: var(--ds-typography-body-sm-size);
  color: ${(p) => p.theme.text.secondary};
`;

const Zoom = styled.div<{ $full?: boolean }>`
  flex: 1;
  min-block-size: 0;
  display: grid;
  place-items: center;
  padding: ${(p) => (p.$full ? p.theme.space.insetLg : 0)} ${(p) => p.theme.space.insetLg} ${(p) => p.theme.space.insetLg};

  img {
    display: block;
    max-inline-size: 100%;
    max-block-size: ${(p) => (p.$full ? 'calc(100vh - 48px - 48px)' : 'calc(100vh - 48px - 72px - 24px)')};
    object-fit: contain;
    border-radius: ${(p) => p.theme.radius.field};
  }
`;

/** 單一項的畫面：文字、影片、聲音、網頁 */
const Detail = styled.div<{ $big?: boolean }>`
  padding: 0 ${(p) => p.theme.space.insetLg} ${(p) => p.theme.space.insetLg};
  overflow-y: auto;
  ${(p) => p.$big && 'flex: 1; min-block-size: 0; display: flex; flex-direction: column;'}
`;

const WebFrame = styled.iframe`
  inline-size: 100%;
  block-size: calc(100vh - 48px - 72px - 24px);
  border: none;
  border-radius: ${(p) => p.theme.radius.field};
  background: ${(p) => p.theme.surface.raised};
`;

/** 網頁不能嵌入：大大的一塊說清楚，按右上角開新視窗 */
const NoPreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.space.gapSm};
  /* 跟能預覽時的網頁框一樣高：視窗多高就用多高 */
  block-size: calc(100vh - 48px - 72px - 24px);
  border-radius: ${(p) => p.theme.radius.field};
  background: ${(p) => p.theme.surface.sunken};
  color: ${(p) => p.theme.text.secondary};
  strong { font-size: var(--ds-typography-body-size); font-weight: 500; margin-block-start: 8px; }
  span { font-size: var(--ds-typography-body-sm-size); color: ${(p) => p.theme.text.tertiary}; }
`;

const NoIcon = styled.span`
  display: grid;
  place-items: center;
  inline-size: 80px;
  block-size: 80px;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.muted};
  color: ${(p) => p.theme.icon.secondary};
`;

/** 以新視窗開啟：不能預覽時是這一頁唯一要按的，用黑色；能預覽時是次要，用外框 */
const OpenWin = styled.button<{ $primary: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-block-size: 36px;
  padding: 0 14px;
  border-radius: 999px;
  font: inherit;
  font-size: var(--ds-typography-label-size);
  cursor: pointer;
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => (p.$primary ? 'transparent' : p.theme.action.secondaryBorder)};
  background: ${(p) => (p.$primary ? p.theme.action.primaryBg : p.theme.action.secondaryBg)};
  color: ${(p) => (p.$primary ? p.theme.action.primaryText : p.theme.action.secondaryText)};
  &:hover { background: ${(p) => (p.$primary ? p.theme.action.primaryBgHover : p.theme.action.secondaryBgHover)}; }
`;

const Text = styled.p`
  margin: 0;
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
  color: ${(p) => p.theme.text.secondary};
  white-space: pre-wrap;
`;

const Action = styled.button`
  flex: none;
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.action.secondaryBorder};
  background: ${(p) => p.theme.action.secondaryBg};
  color: ${(p) => p.theme.action.secondaryText};
  font: inherit;
  font-size: var(--ds-typography-label-size);
  border-radius: ${(p) => p.theme.radius.control};
  /* 上課用平板點的，觸控目標不能小於 44 */
  min-block-size: 44px;
  padding: 0 16px;
  cursor: pointer;

  &:hover { background: ${(p) => p.theme.action.secondaryBgHover}; }
`;
