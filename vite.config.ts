import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * 開發用的「抓網站標題」端點：GET /api/site-title?url=…  →  { title: string | null }
 *
 * 瀏覽器不能直接讀別的網站的 HTML（跨網域），一定要由伺服器去抓。正式上線時由後端提供
 * 同一個端點（連同「能不能嵌入」的檢查）；這裡用開發伺服器代替，前端程式不必改。
 */
function siteTitle(): Plugin {
  const decode = (s: string) =>
    s
      .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
      .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
      .replace(/&quot;/g, '"')
      .replace(/&#39;|&apos;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim()
  const pick = (html: string) => {
    const og =
      html.match(/<meta[^>]+property=["']og:title["'][^>]*content=["']([^"']+)["']/i) ??
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:title["']/i)
    const t = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
    const raw = og?.[1] ?? t?.[1]
    return raw ? decode(raw).slice(0, 200) || null : null
  }
  return {
    name: 'site-title',
    configureServer(server) {
      server.middlewares.use('/api/site-title', async (req, res) => {
        const send = (title: string | null) => {
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({ title }))
        }
        try {
          const target = new URL(req.url ?? '', 'http://localhost').searchParams.get('url') ?? ''
          const u = new URL(target)
          if (u.protocol !== 'http:' && u.protocol !== 'https:') return send(null)
          const r = await fetch(u, {
            redirect: 'follow',
            signal: AbortSignal.timeout(6000),
            headers: { 'User-Agent': 'Mozilla/5.0 (textbook-editor site-title)', 'Accept-Language': 'zh-TW,zh;q=0.9' },
          })
          if (!r.ok || !(r.headers.get('content-type') ?? '').includes('html')) return send(null)
          // 標題都在檔頭，讀前 256KB 就夠
          const html = (await r.text()).slice(0, 256 * 1024)
          send(pick(html))
        } catch (e) {
          // 連不上（逾時、查不到網址、對方擋）都當作抓不到
          server.config.logger.warn(`[site-title] ${(e as Error).message}`)
          send(null)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // 架在子路徑時（例如 GitHub Pages 的 /textbook-editor/）由 BASE 指定；本機開發一律是根目錄
  base: process.env.BASE ?? '/',
  plugins: [react(), siteTitle()],
})
