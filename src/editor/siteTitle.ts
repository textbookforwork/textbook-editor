/**
 * 網站標題：由伺服器去抓（瀏覽器讀不到別的網站的 HTML）。端點見 vite.config.ts 的 siteTitle，
 * 正式上線由後端提供同一個 /api/site-title。抓不到（逾時、對方擋、不是網頁）就回 null，
 * 呼叫端改顯示連結。
 */
export async function fetchSiteTitle(url: string): Promise<string | null> {
  try {
    const r = await fetch(`/api/site-title?url=${encodeURIComponent(url)}`);
    if (!r.ok) return null;
    const { title } = (await r.json()) as { title: string | null };
    return title?.trim() || null;
  } catch {
    return null;
  }
}

/** 抓不到標題時顯示的連結：去掉 https:// 與結尾的斜線，其餘照原樣 */
export function linkLabel(url: string): string {
  return url.trim().replace(/^https?:\/\//i, '').replace(/\/$/, '');
}
