/**
 * 網站標題：瀏覽器讀不到別的網站的 HTML，要靠別人去抓。
 *
 * 開發時走 vite.config.ts 的 /api/site-title；線上版放在 GitHub Pages，沒有後端，
 * 改問 Microlink（公開服務，允許從瀏覽器直接呼叫，免費額度每個 IP 每天 50 次，原型夠用）。
 * 正式上線換成自己後端的 /api/site-title。抓不到（逾時、對方擋、超過額度）就回 null，
 * 呼叫端改顯示連結。
 */
export async function fetchSiteTitle(url: string): Promise<string | null> {
  try {
    if (import.meta.env.DEV) {
      const r = await fetch(`/api/site-title?url=${encodeURIComponent(url)}`);
      if (!r.ok) return null;
      const { title } = (await r.json()) as { title: string | null };
      return title?.trim() || null;
    }
    const r = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
    if (!r.ok) return null;
    const j = (await r.json()) as { status?: string; data?: { title?: string | null } };
    return (j.status === 'success' && j.data?.title?.trim()) || null;
  } catch {
    return null;
  }
}

/** 抓不到標題時顯示的連結：去掉 https:// 與結尾的斜線，其餘照原樣 */
export function linkLabel(url: string): string {
  return url.trim().replace(/^https?:\/\//i, '').replace(/\/$/, '');
}
