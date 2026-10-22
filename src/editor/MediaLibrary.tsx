import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { primaryButtonCss } from '../components/buttonStyles';
import styled from 'styled-components';
import { Icon } from '../components/Icon';
import { PanelBody, PanelClose, PanelDrawer, PanelHead, PanelTab, PanelTabs, PanelTitle, useExclusivePanel } from './SidePanel';
import { PdfPagePicker, type ImportedPage } from './PdfPagePicker';
import { pageThumb } from './pdfPages';
import { Glyph } from '../viewer/VideoBody';
import { safeHttpUrl } from '../viewer/safeUrl';
import { toast } from './Toast';
import {
  getAsset,
  kindOfFile,
  listAssets,
  pickFile,
  putFile,
  putImage,
  putLink,
  putYoutube,
  subscribeAssets,
  assetsVersion,
  toggleFavorite,
  removeAsset,
  urlOf,
  youtubeId,
  type Asset,
  type AssetKind,
} from './assets';

/**
 * 媒體庫：上傳過的素材與貼進來的連結，依種類分頁。
 *
 * 它不是一種元件，是挑素材的入口——挑了一張圖就變成圖片元件、挑一支影片
 * 就變成影片元件。老師上傳過的東西留在這裡，要再用不必重傳。
 * （目前只活在這一次的分頁裡，接上後端的素材庫後換掉 assets.ts 就好。）
 *
 * 每個分頁**最上面永遠是新增的方式**（上傳、貼連結、AI 生成），不是只有
 * 清單空的時候才出現——老師的原話：「如果沒東西，可以上傳、貼連結、或生成的
 * 方式要在這裡顯示」。清單有東西時也一樣，第二次上傳不該要先找按鈕在哪。
 *
 * 版面依 Figma「媒體庫_tab整合」：貼在左緣的面板，不蓋遮罩——老師要一邊看
 * 畫布一邊挑，而且聲音可以在面板裡先試聽。
 */

type Tab = 'image' | 'video' | 'audio' | 'web' | 'pdf';

type UploadRule = {
  label: string;
  accept: string;
  /** 顯示給老師看的格式說明。 */
  formats: string;
  limitMb: number;
};

/**
 * 四種上傳的規則。拖檔案到畫布（EditStage）用的是同一份——
 * 兩邊各寫一份，提示文字遲早會不一樣。
 */
export const UPLOAD_RULES: Record<Exclude<AssetKind, 'web' | 'file'>, UploadRule> = {
  image: { label: '圖片', accept: 'image/jpeg,image/png,image/gif', formats: '.jpg .png .gif', limitMb: 10 },
  video: { label: '影片', accept: 'video/mp4,video/webm', formats: '.mp4 .webm', limitMb: 100 },
  audio: { label: '聲音', accept: 'audio/mpeg,audio/wav,audio/x-wav', formats: '.mp3 .wav', limitMb: 20 },
  pdf: { label: 'PDF', accept: 'application/pdf', formats: '.pdf', limitMb: 50 },
};

/** 不支援的檔案要跟老師說支援什麼，不是只說「不支援」。 */
export const SUPPORTED_HINT = `支援 ${UPLOAD_RULES.image.formats} 圖片、${UPLOAD_RULES.video.formats} 影片、${UPLOAD_RULES.audio.formats} 聲音與 PDF`;

/**
 * 收一個檔案進媒體庫：先驗格式與大小，再依種類走 putImage（要量比例）或 putFile。
 * 回傳整筆 Asset，呼叫端拿它建元件；不收就回傳要給老師看的原因。
 */
export async function uploadFile(file: File): Promise<{ asset: Asset } | { error: string }> {
  const kind = kindOfFile(file);
  if (kind === 'file' || kind === 'web') return { error: `不支援這種檔案。${SUPPORTED_HINT}` };
  const rule = UPLOAD_RULES[kind];
  // 格式照提示文字收：說支援 .jpg .png .gif 就只收這三種，不要收了 .svg 再在版面上出事。
  // PDF 例外：有些系統給的 MIME 是空的，kindOf 已經用副檔名認過了
  if (kind !== 'pdf' && !rule.accept.split(',').includes(file.type)) {
    return { error: `不支援這種格式，${rule.label}支援 ${rule.formats}` };
  }
  if (file.size > rule.limitMb * 1024 * 1024) {
    return { error: `${rule.label}請在 ${rule.limitMb}MB 以內` };
  }
  try {
    const assetId = kind === 'image' ? (await putImage(file)).assetId : putFile(file);
    const asset = getAsset(assetId);
    return asset ? { asset } : { error: '讀不到這個檔案' };
  } catch {
    return { error: '讀不到這個檔案' };
  }
}

const TABS: { kind: Tab; label: string }[] = [
  { kind: 'image', label: '圖片' },
  { kind: 'video', label: '影片' },
  { kind: 'audio', label: '聲音' },
  { kind: 'web', label: '網頁' },
  { kind: 'pdf', label: 'PDF' },
];

type Props = {
  onChoose: (asset: Asset) => void;
  /** 「AI 生成」：輸入描述後按下生成。 */
  onGenerate?: (prompt?: string) => void;
  /** PDF 選好頁、畫成圖片之後，交給外層一頁一列插進畫布。 */
  onImportPdf?: (asset: Asset, pages: ImportedPage[]) => void;
  onClose: () => void;
};

/**
 * 從外面指定要打開哪一個分頁（插入面板的「PDF」直接打開 PDF 分頁）。
 * 面板還沒開就在第一次畫的時候讀走；已經開著就當場切過去。
 */
let requestedTab: Tab | null = null;
const tabListeners = new Set<() => void>();
export function openLibraryTab(tab: Tab) {
  requestedTab = tab;
  tabListeners.forEach((fn) => fn());
}

export function MediaLibrary({ onChoose, onGenerate, onImportPdf, onClose }: Props) {
  useExclusivePanel(true, onClose);
  const [tab, setTab] = useState<Tab>(() => {
    const t = requestedTab ?? 'image';
    requestedTab = null;
    return t;
  });
  // 正在選頁的那份 PDF；null 是一般的分頁清單
  const [picking, setPicking] = useState<Asset | null>(null);
  useEffect(() => {
    const fn = () => {
      if (!requestedTab) return;
      setTab(requestedTab);
      setPicking(null);
      requestedTab = null;
    };
    tabListeners.add(fn);
    return () => {
      tabListeners.delete(fn);
    };
  }, []);
  // 訂閱素材庫：這個面板開著時上傳，清單要當場多一筆
  useSyncExternalStore(subscribeAssets, assetsVersion);
  const items = listAssets(tab);
  const preview = useAudioPreview();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // 關面板就停：試聽是為了確認檔案，不該在面板關掉後還在背景響
  const stop = preview.stop;
  useEffect(() => () => stop(), [stop]);

  const choose = (a: Asset) => {
    stop();
    onChoose(a);
  };

  return createPortal(
    /*
     * 這個面板是從 RowView 用 portal 掛到 body 的，React 的事件仍會沿著元件樹
     * 冒泡回 EditStage——在面板空白處點一下會變成「在畫布空白處點」、把檔案拖進
     * 上傳框會同時觸發畫布的拖放而上傳兩次。所以在這一層全部擋下來。
     */
    <Panel
      role="dialog"
      aria-label="媒體庫"
      data-ui
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerMove={(e) => e.stopPropagation()}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {picking ? (
        <PdfPagePicker
          asset={picking}
          onBack={() => setPicking(null)}
          onClose={onClose}
          onImport={(pages) => {
            onImportPdf?.(picking, pages);
            setPicking(null);
          }}
          onEmbed={() => {
            choose(picking);
            setPicking(null);
          }}
        />
      ) : (
      <>
      <Head>
        <Title>媒體庫</Title>
        <Ghost onClick={onClose} aria-label="關閉">
          <Icon name="x" size={24} label="關閉" />
        </Ghost>
      </Head>
      {/* 分頁照 Figma：純文字、選中的是品牌深綠加底線，不畫分隔線 */}
      <Tabs role="tablist" aria-label="素材種類">
        {TABS.map((t) => (
          <TabBtn
            key={t.kind}
            type="button"
            role="tab"
            aria-selected={t.kind === tab}
            $on={t.kind === tab}
            onClick={() => setTab(t.kind)}
          >
            {t.label}
          </TabBtn>
        ))}
      </Tabs>

      <Body>
        {/* 新增的方式永遠在最上面 */}
        {tab === 'web' ? (
          <LinkAdder
            placeholder="貼上網址"
            onAdd={(v) => {
              const safe = safeHttpUrl(v);
              if (!safe) {
                toast('請貼完整的網址，要含 https://');
                return false;
              }
              putLink(safe);
              return true;
            }}
          />
        ) : (
          <UploadBox kind={tab} onUploaded={(a) => a.kind === 'pdf' && setPicking(a)} />
        )}
        {tab === 'video' && (
          <LinkAdder
            placeholder="貼上 YouTube 連結"
            onAdd={(v) => {
              if (!putYoutube(v)) {
                toast('認不出這個 YouTube 網址');
                return false;
              }
              return true;
            }}
          />
        )}
        {tab === 'image' && (
          <ImageGenerator
            onGenerate={(prompt) => {
              stop();
              toast('原型還沒接上生成模型');
              onGenerate?.(prompt);
            }}
          />
        )}

        {/* 空的時候不放說明字：上面的上傳框已經說明要做什麼。
            收藏的排在最上面自成一區；圖片用兩欄縮圖（挑圖靠看），其他一列一張 */}
        {items.length > 0 &&
          (() => {
            const favs = items.filter((a) => a.favorite);
            const rest = items.filter((a) => !a.favorite);
            const layout = tab === 'image' ? 'tile' : 'row';
            const render = (list: Asset[]) => {
              const cards = list.map((a) => (
                <AssetCard
                  key={a.assetId}
                  asset={a}
                  layout={layout}
                  selected={false}
                  onActivate={() => (a.kind === 'pdf' ? setPicking(a) : choose(a))}
                  preview={a.kind === 'audio' ? preview : undefined}
                />
              ));
              return layout === 'tile' ? <Grid>{cards}</Grid> : <List>{cards}</List>;
            };
            const restLabel = tab === 'pdf' ? '已上傳 PDF' : favs.length > 0 ? '全部' : null;
            return (
              <>
                {favs.length > 0 && (
                  <>
                    <ListLabel>收藏</ListLabel>
                    {render(favs)}
                  </>
                )}
                {rest.length > 0 && (
                  <>
                    {restLabel && <ListLabel>{restLabel}</ListLabel>}
                    {render(rest)}
                  </>
                )}
              </>
            );
          })()}
      </Body>
      </>
      )}
    </Panel>,
    document.body
  );
}

/**
 * 縮圖。影片分兩種：YouTube 用它的靜態縮圖加播放鍵遮罩，上傳的用 <video>
 * 的第一幀、不加遮罩——老師一眼就分得出哪支是 YouTube。
 */
function Thumbnail({ asset }: { asset: Asset }) {
  if (asset.kind === 'image') {
    return <Thumb style={{ backgroundImage: `url(${urlOf(asset.assetId)})` }} />;
  }
  if (asset.kind === 'video') {
    if (asset.source === 'youtube') {
      const id = youtubeId(asset.url ?? '');
      return (
        <Thumb style={id ? { backgroundImage: `url(https://i.ytimg.com/vi/${id}/mqdefault.jpg)` } : undefined}>
          <Mask>
            <Glyph name="play" size={16} />
          </Mask>
        </Thumb>
      );
    }
    const url = urlOf(asset.assetId);
    return (
      <Thumb>
        {/* #t=0.1：有些瀏覽器要跳過第 0 幀才畫得出畫面 */}
        {url && <video src={`${url}#t=0.1`} preload="metadata" muted playsInline />}
      </Thumb>
    );
  }
  if (asset.kind === 'pdf') return <PdfCover asset={asset} />;
  return (
    <Thumb $icon>
      <Icon name={asset.kind === 'audio' ? 'music' : asset.kind === 'web' ? 'globe' : 'file-text'} size={24} />
    </Thumb>
  );
}

/** PDF 清單的封面：畫第 1 頁的縮圖 */
function PdfCover({ asset }: { asset: Asset }) {
  const [src, setSrc] = useState<string | null>(null);
  const url = urlOf(asset.assetId);
  useEffect(() => {
    if (!url) return;
    let alive = true;
    pageThumb(url, 1, 160)
      .then((s) => alive && setSrc(s))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [url]);
  return <Thumb $icon>{src ? <img src={src} alt="" /> : <Icon name="file-text" size={24} />}</Thumb>;
}

type Preview = ReturnType<typeof useAudioPreview>;

/**
 * 媒體庫的一筆，照參考的卡片：白卡（圓角 16）、左邊（或上面）大縮圖、檔名與日期、右上「⋮」選單（收藏、刪除）。
 * 點卡片＝插進頁面（PDF 是進選頁畫面）。按下去、或正在選頁的那份，外面畫一圈品牌深綠框。
 * 聲音的縮圖中間是試聽鍵：試聽跟插入是兩件事，要分開點。
 */
function AssetCard({
  asset,
  layout,
  selected,
  onActivate,
  preview,
}: {
  asset: Asset;
  layout: 'row' | 'tile';
  selected: boolean;
  onActivate: () => void;
  preview?: Preview;
}) {
  const [menu, setMenu] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menu) return;
    const onDown = (e: PointerEvent) => {
      if (!shellRef.current?.contains(e.target as Node)) setMenu(false);
    };
    window.addEventListener('pointerdown', onDown, true);
    return () => window.removeEventListener('pointerdown', onDown, true);
  }, [menu]);

  const name = asset.kind === 'pdf' ? asset.name.replace(/\.pdf$/i, '') : asset.name;
  const playing = !!preview && preview.current === asset.assetId && preview.playing;
  const previewing = !!preview && preview.current === asset.assetId;

  return (
    <CardShell ref={shellRef} $layout={layout} $selected={selected}>
      <CardMain type="button" $layout={layout} onClick={onActivate} title={asset.url ?? asset.name}>
        {/* 聲音沒有畫面可看，不放灰色縮圖框，只留位置給試聽鍵 */}
        {asset.kind === 'audio' ? <AudioSlot /> : <Thumbnail asset={asset} />}
        <CardText>
          <CardName $layout={layout}>{name}</CardName>
          {/* 試聽中：檔名下面顯示時間，不另外展開一條進度列 */}
          {previewing && preview && (
            <CardTime>
              {fmt(preview.time)} / {fmt(preview.duration)}
            </CardTime>
          )}
        </CardText>
      </CardMain>

      {preview && (
        <PlayBtn
          type="button"
          $layout={layout}
          $on={playing}
          onClick={() => preview.toggle(asset.assetId, urlOf(asset.assetId))}
          aria-label={playing ? '暫停試聽' : '試聽'}
          title="試聽"
        >
          {/* 試聽進度畫成按鈕外圍的一圈，播放鍵本身就是進度條 */}
          {previewing && (
            <Ring viewBox="0 0 36 36" aria-hidden="true">
              <circle cx="18" cy="18" r="16" pathLength="100" />
              <circle
                cx="18"
                cy="18"
                r="16"
                pathLength="100"
                strokeDasharray={`${preview.duration > 0 ? (preview.time / preview.duration) * 100 : 0} 100`}
              />
            </Ring>
          )}
          <Glyph name={playing ? 'pause' : 'play'} size={16} />
        </PlayBtn>
      )}

      <MoreBtn type="button" $layout={layout} aria-label="更多" aria-expanded={menu} onClick={() => setMenu((v) => !v)}>
        <Icon name="more-vertical" size={16} />
      </MoreBtn>
      {menu && (
        <MoreMenu role="menu" $layout={layout}>
          <MoreItem
            type="button"
            role="menuitem"
            onClick={() => {
              toggleFavorite(asset.assetId);
              setMenu(false);
            }}
          >
            <Icon name="bookmark" size={16} />
            {asset.favorite ? '取消收藏' : '收藏'}
          </MoreItem>
          <MoreItem
            type="button"
            role="menuitem"
            $danger
            onClick={() => {
              if (previewing) preview?.stop();
              removeAsset(asset.assetId);
            }}
          >
            <Icon name="trash" size={16} />
            刪除
          </MoreItem>
        </MoreMenu>
      )}

    </CardShell>
  );
}

/** 上傳框：說支援什麼、多大以內，一顆上傳鈕；也接受把檔案拖進來。 */
/** onUploaded：上傳完的那一筆。PDF 上傳完直接進選頁畫面，少點一次。 */
function UploadBox({ kind, onUploaded }: { kind: Exclude<Tab, 'web'>; onUploaded?: (a: Asset) => void }) {
  const rule = UPLOAD_RULES[kind];
  const [busy, setBusy] = useState(false);
  const [over, setOver] = useState(false);

  const take = async (file: File | null) => {
    if (!file) return;
    setBusy(true);
    try {
      const r = await uploadFile(file);
      if ('error' in r) toast(r.error);
      else onUploaded?.(r.asset);
      if (!('error' in r) && r.asset.kind !== kind) toast(`這是${UPLOAD_RULES[r.asset.kind as keyof typeof UPLOAD_RULES]?.label ?? '別種檔案'}，已放進對應的分頁`);
    } finally {
      setBusy(false);
    }
  };

  const pick = async () => {
    if (!busy) await take(await pickFile(rule.accept));
  };

  // 整塊都是按鈕：點一下開檔案選擇，拖檔案進來也行。上傳中停用，圖示換成轉圈
  return (
    <Drop
      type="button"
      $over={over}
      disabled={busy}
      aria-busy={busy}
      aria-label={`上傳${rule.label}：拖曳或點選檔案`}
      onClick={pick}
      onDragOver={(e) => {
        if (busy || !e.dataTransfer.types.includes('Files')) return;
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        void take(e.dataTransfer.files[0] ?? null);
      }}
    >
      <DropTile $over={over}>{busy ? <Spinner aria-hidden="true" /> : <Icon name="upload" size={20} />}</DropTile>
      <DropTitle>{busy ? '上傳中…' : over ? '放開就上傳' : '拖曳或點選檔案'}</DropTitle>
      <DropHint>{rule.formats}，{rule.limitMb} MB 以內</DropHint>
    </Drop>
  );
}

/** 貼連結的一列：輸入框加「加入」。Enter 也算加入。回傳 true 才清空輸入框。 */
function LinkAdder({
  placeholder,
  onAdd,
}: {
  placeholder: string;
  onAdd: (value: string) => boolean;
}) {
  const [value, setValue] = useState('');
  const add = () => {
    const v = value.trim();
    if (!v) return;
    if (onAdd(v)) setValue('');
  };
  return (
    <LinkBar>
      <LinkInput
        value={value}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') add();
        }}
      />
      <Primary type="button" onClick={add} disabled={!value.trim()}>
        加入
      </Primary>
    </LinkBar>
  );
}

/** 圖片分頁的 AI 生成輸入區塊：灰底圓角框＋多行描述＋右下角「生成」膠囊鈕。 */
function ImageGenerator({ onGenerate }: { onGenerate: (prompt: string) => void }) {
  const [prompt, setPrompt] = useState('');
  const submit = () => {
    const v = prompt.trim();
    if (!v) return;
    onGenerate(v);
    setPrompt('');
  };
  return (
    <GenBox>
      <GenTextarea
        value={prompt}
        placeholder="描述要生成的圖片"
        aria-label="描述要生成的圖片"
        rows={3}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
      />
      <GenFooter>
        <Primary type="button" onClick={submit} disabled={!prompt.trim()}>
          生成
        </Primary>
      </GenFooter>
    </GenBox>
  );
}

/* ── 試聽 ───────────────────────────────────────────────── */

const fmt = (sec: number): string => {
  if (!Number.isFinite(sec) || sec < 0) sec = 0;
  return `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;
};

/**
 * 面板裡的試聽。整個面板只有一個 <audio>：開另一個就自動停上一個，
 * 不會兩個檔同時響；面板關掉時由外層呼叫 stop。
 */
function useAudioPreview() {
  const el = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const ensure = () => {
    if (el.current) return el.current;
    const a = new Audio();
    a.addEventListener('play', () => setPlaying(true));
    a.addEventListener('pause', () => setPlaying(false));
    a.addEventListener('ended', () => setPlaying(false));
    a.addEventListener('timeupdate', () => setTime(a.currentTime));
    a.addEventListener('loadedmetadata', () => setDuration(a.duration));
    a.addEventListener('durationchange', () => setDuration(a.duration));
    el.current = a;
    return a;
  };

  const stopRef = useRef(() => {
    const a = el.current;
    if (!a) return;
    a.pause();
    a.removeAttribute('src');
    a.load();
  });

  return {
    current,
    playing,
    time,
    duration,
    toggle(assetId: string, url: string | undefined) {
      if (!url) return;
      const a = ensure();
      if (current === assetId) {
        if (a.paused) a.play().catch(() => {});
        else a.pause();
        return;
      }
      // 換一個檔：從頭開始，時間與總長先歸零，免得短暫顯示上一個檔的數字
      a.src = url;
      setCurrent(assetId);
      setTime(0);
      setDuration(0);
      a.play().catch(() => {});
    },
    seek(ratio: number) {
      const a = el.current;
      if (!a || !Number.isFinite(a.duration)) return;
      a.currentTime = Math.max(0, Math.min(1, ratio)) * a.duration;
      setTime(a.currentTime);
    },
    stop: stopRef.current,
  };
}

/* ── 樣式 ───────────────────────────────────────────────── */

/** 右側面板，外殼跟設定、補充內容同一套（SidePanel）。 */
const Panel = PanelDrawer;
const Head = PanelHead;
const Title = PanelTitle;
const Ghost = PanelClose;
const Body = PanelBody;

/*
 * 媒體庫的字只用兩種大小：按鈕與分頁 14、其餘（說明、輸入框、檔名、日期）12。
 */
const Tabs = PanelTabs;
const TabBtn = PanelTab;
const ListLabel = styled.span`
  font-size: var(--ds-typography-caption-size);
  font-weight: 500;
  color: ${(p) => p.theme.text.secondary};
`;

/**
 * 上傳框：白色圓角卡片，中間一塊淡灰圓角方塊放上傳圖示，下面一行標題、一行格式。
 * 面板是 #FAFAFA，白卡加一圈淡灰細線才分得出邊；滑過框線深一階；拖檔案進來換成品牌深綠虛線（不鋪底色）。
 */
const Drop = styled.button<{ $over: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  inline-size: 100%;
  /* 跟下面的「描述要生成的圖片」框同高、同圓角，上下兩塊對齊 */
  block-size: 128px;
  padding: ${(p) => p.theme.space.insetMd};
  box-sizing: border-box;
  border: ${(p) => (p.$over ? '1.5px dashed' : `${p.theme.border.widthDefault} solid`)}
    ${(p) => (p.$over ? p.theme.border.accent : p.theme.border.subtle)};
  border-radius: ${(p) => p.theme.radius.card};
  background: ${(p) => p.theme.surface.raised};
  font: inherit;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.15s;

  &:hover:not(:disabled) { border-color: ${(p) => (p.$over ? p.theme.border.accent : p.theme.border.default)}; }
  &:disabled { cursor: progress; }
`;

const DropTile = styled.span<{ $over: boolean }>`
  flex: none;
  display: grid;
  place-items: center;
  inline-size: 40px;
  block-size: 40px;
  padding: 0;
  margin-block-end: 6px;
  border-radius: ${(p) => p.theme.radius.tile};
  background: ${(p) => p.theme.surface.sunken};
  color: ${(p) => (p.$over ? p.theme.text.accent : p.theme.icon.default)};
  transition: background 0.15s, color 0.15s;
  ${Drop}:hover:not(:disabled) & { background: ${(p) => p.theme.surface.muted}; }
`;

/** 上傳中的轉圈：一圈淡灰軌道，上面一段品牌深綠在轉 */
const Spinner = styled.span`
  inline-size: 18px;
  block-size: 18px;
  border-radius: 999px;
  border: 2px solid ${(p) => p.theme.border.subtle};
  border-top-color: ${(p) => p.theme.brand.accentOnLight};
  animation: ds-spin 0.8s linear infinite;
  @keyframes ds-spin { to { transform: rotate(360deg); } }
  @media (prefers-reduced-motion: reduce) { animation-duration: 2s; }
`;

const DropTitle = styled.span`
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 500;
  color: ${(p) => p.theme.text.primary};
`;

const DropHint = styled.span`
  font-size: var(--ds-typography-caption-size);
  color: ${(p) => p.theme.text.tertiary};
`;

/** 面板裡的小號黑色按鈕（上傳、加入、生成）：32 高、一般字重，在 300 寬的面板裡不搶戲 */
const Primary = styled.button`
  ${primaryButtonCss}
  flex: none;
  min-block-size: 32px;
  padding: 0 14px;
  font-weight: 400;
`;

/** 貼連結的一列：灰膠囊裡放輸入框與小號「加入」；點進去打字時整條轉白加細框，輸入框本身不畫焦點框 */
const LinkBar = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 4px 4px 14px;
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.surface.muted};
  box-shadow: inset 0 0 0 1px transparent;
  transition: background 0.12s, box-shadow 0.12s;
  &:focus-within {
    background: ${(p) => p.theme.surface.raised};
    box-shadow: inset 0 0 0 1px ${(p) => p.theme.border.hover};
  }

  ${Primary} { margin: 0; }
`

const LinkInput = styled.input`
  flex: 1;
  min-inline-size: 0;
  font: inherit;
  font-size: var(--ds-typography-caption-size);
  border: none;
  background: transparent;
  color: ${(p) => p.theme.text.primary};
  min-block-size: 32px;
  padding: 0;
  outline: none;
  &:focus-visible { outline: none; }
  &::placeholder { color: ${(p) => p.theme.text.placeholder}; }
`

const GenBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: ${(p) => p.theme.space.insetSm} ${(p) => p.theme.space.insetSm} ${(p) => p.theme.space.insetXs} 14px;
  border-radius: ${(p) => p.theme.radius.card};
  background: ${(p) => p.theme.surface.muted};
  box-shadow: inset 0 0 0 1px transparent;
  transition: background 0.12s, box-shadow 0.12s;
  &:focus-within {
    background: ${(p) => p.theme.surface.raised};
    box-shadow: inset 0 0 0 1px ${(p) => p.theme.border.hover};
  }
  block-size: 128px;
  box-sizing: border-box;
`;

const GenTextarea = styled.textarea`
  flex: 1;
  min-block-size: 0;
  inline-size: 100%;
  resize: none;
  padding: 0;
  font: inherit;
  font-size: var(--ds-typography-caption-size);
  line-height: 1.5;
  border: none;
  background: transparent;
  color: ${(p) => p.theme.text.primary};
  outline: none;
  &:focus-visible { outline: none; }
  &::placeholder { color: ${(p) => p.theme.text.placeholder}; }
`;

const GenFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  ${Primary} { margin: 0; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(p) => p.theme.space.gapSm};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.gapSm};
`;

/** 縮圖：照片、影片第一格、PDF 第一頁；聲音與網頁是淡灰底加圖示 */
const Thumb = styled.div<{ $icon?: boolean }>`
  position: relative;
  aspect-ratio: 16 / 10;
  border-radius: ${(p) => p.theme.radius.tile};
  background: ${(p) => p.theme.surface.media} center / cover no-repeat;
  display: grid;
  place-items: center;
  overflow: hidden;
  color: ${(p) => p.theme.icon.secondary};
  ${(p) => p.$icon && `background: ${p.theme.surface.sunken};`}

  video,
  img {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    object-fit: cover;
    object-position: top;
    pointer-events: none;
  }
`;

/** YouTube 縮圖上的播放鍵遮罩。 */
/**
 * YouTube 縮圖上的播放鍵：照 YouTube 自己的樣子——紅底圓角方塊、白色三角形，
 * 一眼認得是 YouTube。紅色是 YouTube 的品牌色、不是介面色，所以這裡寫字面色值（跟 logo 同理）。
 */
const YOUTUBE_RED = '#FF0033';
const Mask = styled.span`
  display: grid;
  place-items: center;
  inline-size: 28px;
  block-size: 20px;
  border-radius: 6px;
  background: ${YOUTUBE_RED};
  color: #fff;
  svg path, svg polygon { fill: currentColor; }
`

/** 白卡；按下或選定時外面一圈品牌深綠框（outline，不改變大小） */
const CardShell = styled.div<{ $layout: 'row' | 'tile'; $selected: boolean }>`
  position: relative;
  min-inline-size: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: ${(p) => (p.$layout === 'row' ? p.theme.space.insetXs : '6px')};
  border-radius: ${(p) => p.theme.radius.card};
  background: ${(p) => p.theme.surface.raised};
  outline: 2px solid ${(p) => (p.$selected ? p.theme.brand.accentOnLight : 'transparent')};
  transition: background 0.12s, outline-color 0.12s;

  &:hover { background: ${(p) => p.theme.surface.sunken}; }
  &:has(> button:first-child:active) { outline-color: ${(p) => p.theme.brand.accentOnLight}; }
`;

const CardMain = styled.button<{ $layout: 'row' | 'tile' }>`
  display: flex;
  flex-direction: ${(p) => (p.$layout === 'row' ? 'row' : 'column')};
  align-items: ${(p) => (p.$layout === 'row' ? 'center' : 'stretch')};
  gap: ${(p) => (p.$layout === 'row' ? p.theme.space.gapMd : '6px')};
  padding: 0;
  border: none;
  background: transparent;
  font: inherit;
  text-align: start;
  cursor: pointer;
  min-inline-size: 0;
  outline: none;

  /* 一列一張時縮圖固定 64×48，字在右邊 */
  ${(p) => p.$layout === 'row' && `> :first-child { flex: none; inline-size: 64px; aspect-ratio: auto; block-size: 48px; border-radius: 10px; }`}
`;

const CardText = styled.span`
  flex: 1;
  min-inline-size: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-inline-end: 24px;
`;

/** 檔名：一列一張時最多兩行，縮圖格時一行；超過用「…」 */
const CardName = styled.span<{ $layout: 'row' | 'tile' }>`
  font-size: var(--ds-typography-caption-size);
  font-weight: 500;
  line-height: 18px;
  color: ${(p) => p.theme.text.primary};
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(p) => (p.$layout === 'row' ? 2 : 1)};
  word-break: break-all;
`;

/** 右上角的「⋮」：小圓鈕，平常淡、滑過卡片才清楚 */
const MoreBtn = styled.button<{ $layout: 'row' | 'tile' }>`
  position: absolute;
  /* 一列一張時在卡片右側垂直置中；縮圖格時浮在縮圖右上角 */
  inset-block-start: ${(p) => (p.$layout === 'row' ? 'calc(50% - 14px)' : '10px')};
  inset-inline-end: ${(p) => (p.$layout === 'row' ? '6px' : '10px')};
  display: grid;
  place-items: center;
  inline-size: 28px;
  block-size: 28px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${(p) => (p.$layout === 'tile' ? p.theme.surface.raised : 'transparent')};
  color: ${(p) => p.theme.icon.secondary};
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.12s, background 0.12s;

  ${CardShell}:hover &, &[aria-expanded='true'], &:focus-visible { opacity: 1; outline: none; }
  &:hover { background: ${(p) => p.theme.surface.muted}; color: ${(p) => p.theme.icon.default}; }
`;

/** 「⋮」展開的小選單：淡白底、用選單共用的浮層陰影；刪除用紅字 */
const MoreMenu = styled.div<{ $layout: 'row' | 'tile' }>`
  position: absolute;
  z-index: 5;
  inset-block-start: ${(p) => (p.$layout === 'row' ? 'calc(50% + 18px)' : '42px')};
  inset-inline-end: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px;
  border-radius: ${(p) => p.theme.radius.card};
  background: ${(p) => p.theme.surface.page};
  box-shadow: ${(p) => p.theme.shadow.popover};
`;

const MoreItem = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.gapSm};
  min-block-size: 36px;
  padding: 0 14px 0 10px;
  border: none;
  border-radius: ${(p) => p.theme.radius.field};
  background: transparent;
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  white-space: nowrap;
  color: ${(p) => (p.$danger ? p.theme.feedback.errorDefault : p.theme.text.primary)};
  cursor: pointer;
  &:hover { background: ${(p) => p.theme.surface.muted}; }
`;

/** 聲音的試聽鍵：浮在縮圖正中央 */
/** 聲音的試聽鍵：就放在卡片左邊（沒有縮圖框），試聽時外圍一圈是進度 */
const PlayBtn = styled.button<{ $layout: 'row' | 'tile'; $on: boolean }>`
  position: absolute;
  inset-block-start: calc(50% - 18px);
  inset-inline-start: 8px;
  display: grid;
  place-items: center;
  inline-size: 36px;
  block-size: 36px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.sunken};
  color: ${(p) => p.theme.icon.default};
  cursor: pointer;
  outline: none;
  &:hover { background: ${(p) => p.theme.surface.muted}; }
`;

/** 聲音卡片左邊留給試聽鍵的位置（跟按鈕同寬，字才會對齊） */
const AudioSlot = styled.span`
  flex: none;
  inline-size: 36px;
  block-size: 48px;
`

const CardTime = styled.span`
  font-size: var(--ds-typography-caption-size);
  color: ${(p) => p.theme.text.tertiary};
  font-variant-numeric: tabular-nums;
`;

/** 試聽進度的那一圈：淡灰底圈上，走過的部分用品牌深綠 */
const Ring = styled.svg`
  position: absolute;
  inset: -4px;
  inline-size: calc(100% + 8px);
  block-size: calc(100% + 8px);
  transform: rotate(-90deg);
  pointer-events: none;
  circle {
    fill: none;
    stroke-width: 2.5;
    stroke: ${(p) => p.theme.surface.muted};
  }
  circle + circle {
    stroke: ${(p) => p.theme.brand.accentOnLight};
    stroke-linecap: round;
    transition: stroke-dasharray 0.25s linear;
  }
`;

