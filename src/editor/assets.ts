/**
 * 媒體暫存區。
 *
 * ⚠️ 只活在這一次的瀏覽器分頁裡：檔案存成 object URL，重新整理就沒了。
 *
 * 這是刻意的。真正的上傳、儲存與 CDN 屬於正式系統的後端，不在這次的範圍。
 * 這一層的價值在於「介面是對的」——元件拿到的是一個 assetId，
 * 換成真的上傳只要改這個檔案裡的 putImage / urlOf，元件一行都不用動。
 */

import { sampleUrl } from './sampleMedia';

const urls = new Map<string, string>();
let seq = 0;

/** web＝貼網址存成的書籤，不是上傳的檔案，但一樣留在媒體庫裡可以再拿出來用。 */
export type AssetKind = 'image' | 'video' | 'audio' | 'pdf' | 'web' | 'file';

/**
 * 媒體庫的一筆：這次分頁裡上傳過的每個檔案，以及貼進來的連結。
 * 媒體庫的意義是「上傳過的東西都在這裡，可以再拿出來用」——
 * 老師不必為了同一張圖上傳第二次。
 */
export type Asset = {
  assetId: string;
  kind: AssetKind;
  name: string;
  addedAt: number;
  /** 圖片才有。上傳時從 naturalWidth / naturalHeight 讀到的。 */
  aspectRatio?: number;
  /**
   * 影片才有。上傳的影片與 YouTube 連結放在同一個清單裡（老師不必記得
   * 影片是哪裡來的），插進畫布時靠這個欄位決定元件的 source。
   */
  source?: 'upload' | 'youtube';
  /** 連結類（web、youtube）才有：貼進來的網址。上傳的檔案用 urlOf() 拿 object URL。 */
  url?: string;
  /** 老師收藏的：排在該分頁最上面的「收藏」區。 */
  favorite?: boolean;
};

const library: Asset[] = [];
const listeners = new Set<() => void>();
let version = 0;
/** 媒體庫有任何變動（新增、刪除、收藏）就加一，畫面靠它知道要重畫。 */
export const assetsVersion = () => version;
function notify() {
  version += 1;
  listeners.forEach((fn) => fn());
}

/** 新上傳的排最前面——剛上傳的那一個一定要一眼找得到。 */
export const listAssets = (kind?: AssetKind): Asset[] =>
  library.filter((a) => !kind || a.kind === kind).slice().reverse();

/** 媒體庫畫面訂閱變動用。 */
export function subscribeAssets(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

const kindOf = (file: File): AssetKind => {
  const t = file.type;
  if (t.startsWith('image/')) return 'image';
  if (t.startsWith('video/')) return 'video';
  if (t.startsWith('audio/')) return 'audio';
  if (t === 'application/pdf' || /\.pdf$/i.test(file.name)) return 'pdf';
  return 'file';
};

/**
 * 原型的上傳是本機檔案、一瞬間就好，看不到載入中；上傳中的樣子（畫布佔位框、媒體庫進度環）至少留這麼久。
 * 正式版接後端、改讀真的上傳進度就拿掉。
 */
export const UPLOAD_MIN_MS = 1200;

/** 這個檔案會進媒體庫的哪一類。拖檔案到畫布時要先知道能不能收。 */
export const kindOfFile = kindOf;

/** 依 id 找回媒體庫的那一筆。上傳完要拿整筆資料（比例、來源）建元件時用。 */
export const getAsset = (assetId: string): Asset | undefined =>
  library.find((a) => a.assetId === assetId);

export type UploadedImage = {
  assetId: string;
  /** 從 naturalWidth / naturalHeight 讀到的真實長寬比。 */
  aspectRatio: number;
};

/** 先找這次上傳的，找不到再看是不是內建範例的圖（見 sampleMedia）。 */
export const urlOf = (assetId: string | null): string | undefined =>
  assetId ? (urls.get(assetId) ?? sampleUrl(assetId)) : undefined;

/** 收下一個檔案，給它一個 id、記進媒體庫。聲音、影片這種不需要量尺寸的走這條。 */
export function putFile(file: File): string {
  const assetId = `asset-${(seq += 1)}`;
  const kind = kindOf(file);
  urls.set(assetId, URL.createObjectURL(file));
  library.push({
    assetId,
    kind,
    name: file.name,
    addedAt: Date.now(),
    // 影片要標明是上傳的：媒體庫把上傳與 YouTube 放同一個清單，靠這個分
    ...(kind === 'video' ? { source: 'upload' as const } : {}),
  });
  notify();
  return assetId;
}

/** 收藏／取消收藏。 */
export function toggleFavorite(assetId: string) {
  const a = library.find((x) => x.assetId === assetId);
  if (!a) return;
  a.favorite = !a.favorite;
  notify();
}

/**
 * 從媒體庫拿掉一筆。只是清單上不再列出——已經放進頁面的元件還在用同一個網址，
 * 所以網址不收回（收回的話頁面上那張圖會破掉）。
 */
export function removeAsset(assetId: string) {
  const i = library.findIndex((x) => x.assetId === assetId);
  if (i < 0) return;
  library.splice(i, 1);
  notify();
}

/**
 * 預先放進媒體庫的測試素材（見 sampleLibrary）。url 不給就走 urlOf 的範例圖查表。
 */
export function addSampleAsset(asset: Omit<Asset, 'addedAt'>, url?: string) {
  if (library.some((a) => a.assetId === asset.assetId)) return;
  if (url) urls.set(asset.assetId, url);
  library.push({ ...asset, addedAt: Date.now() });
  notify();
}

/**
 * PDF 匯入的頁面圖片：只拿一個網址給圖片元件用，不進媒體庫清單——
 * 一份 37 頁的講義匯進來，圖片分頁不該突然多出 37 張。
 */
export function putHiddenImage(blob: Blob): string {
  const assetId = `asset-${(seq += 1)}`;
  urls.set(assetId, URL.createObjectURL(blob));
  return assetId;
}

/**
 * 貼一個網址存成書籤素材。
 *
 * 瀏覽器抓不到別人網站的標題（跨網域），所以沒給標題時顯示網域名——
 * 一張空白卡片老師分不出是哪個網站。接上後端後可以在伺服器端抓標題，
 * 再用 annotate 補回來，介面不必改。
 */
export function putLink(url: string, title?: string): Asset {
  const assetId = `asset-${(seq += 1)}`;
  const asset: Asset = { assetId, kind: 'web', name: title?.trim() || hostOf(url), addedAt: Date.now(), url };
  library.push(asset);
  notify();
  return asset;
}

/**
 * 貼一個 YouTube 網址存進影片清單。
 *
 * 跟上傳的影片放在同一類，插進畫布時變成 source 為 youtube 的影片元件。
 * 網址認不出影片 id 時回傳 null，讓呼叫端提示老師，不要存一筆播不出來的進去。
 */
export function putYoutube(url: string): Asset | null {
  const id = youtubeId(url.trim());
  if (!id) return null;
  const assetId = `asset-${(seq += 1)}`;
  const asset: Asset = {
    assetId,
    kind: 'video',
    source: 'youtube',
    name: `YouTube 影片 ${id}`,
    addedAt: Date.now(),
    url: url.trim(),
  };
  library.push(asset);
  notify();
  return asset;
}

const hostOf = (url: string): string => {
  try {
    return new URL(url).hostname || url;
  } catch {
    return url;
  }
};

function annotate(assetId: string, patch: Partial<Asset>) {
  const a = library.find((x) => x.assetId === assetId);
  if (a) Object.assign(a, patch);
  notify();
}

/**
 * 收下一張圖，回傳 id 與真實比例。
 *
 * 比例一定要在這裡讀：md 匯入只有檔名，讀不到尺寸，分頁只能用估的，
 * 於是版面高度會跟實際差一截。這裡是唯一拿得到真實尺寸的地方。
 */
export function putImage(file: File): Promise<UploadedImage> {
  return new Promise((resolve, reject) => {
    const assetId = putFile(file);
    const url = urls.get(assetId)!;

    const probe = new Image();
    probe.onload = () => {
      const ratio = probe.naturalHeight > 0 ? probe.naturalWidth / probe.naturalHeight : 1.5;
      annotate(assetId, { kind: 'image', aspectRatio: ratio });
      resolve({ assetId, aspectRatio: ratio });
    };
    probe.onerror = () => {
      urls.delete(assetId);
      const i = library.findIndex((a) => a.assetId === assetId);
      if (i >= 0) library.splice(i, 1);
      URL.revokeObjectURL(url);
      reject(new Error('讀不到這張圖'));
    };
    probe.src = url;
  });
}

/** 讓使用者挑一個檔案。取消時回傳 null。 */
export function pickFile(accept: string): Promise<File | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    // 使用者按取消時 change 不會觸發，靠 cancel 事件收尾，
    // 否則這個 Promise 永遠不會結束
    input.oncancel = () => resolve(null);
    input.onchange = () => resolve(input.files?.[0] ?? null);
    input.click();
  });
}

/** YouTube 網址 → 影片 id。認得 watch、youtu.be、embed 三種寫法。 */
export function youtubeId(ref: string): string | null {
  if (/^[\w-]{11}$/.test(ref)) return ref;
  const m = ref.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}
