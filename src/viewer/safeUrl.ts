/**
 * 只接受 http / https。老師貼進來的字串什麼都有可能（javascript:、data:、
 * 漏打協定的「www.…」），放進 iframe 或 window.open 之前先過一遍，
 * 不是的就當成沒有網址，按鈕停用、提示老師補。
 */
export function safeHttpUrl(url: string): string | null {
  try {
    const u = new URL(url.trim());
    return u.protocol === 'http:' || u.protocol === 'https:' ? u.href : null;
  } catch {
    return null;
  }
}
