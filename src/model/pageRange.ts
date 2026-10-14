/**
 * PDF 選頁的頁碼寫法：「1, 3, 5-7」。
 *
 * 老師習慣的寫法有全形逗號、頓號、全形連字號、波浪號，一律接受；
 * 超出總頁數的、0 以下的、寫錯的片段直接略過，不讓整串失效——打到一半也能即時看到選了哪些頁。
 */
export function parseRange(text: string, total: number): number[] {
  const picked = new Set<number>();
  for (const raw of text.split(/[,，、\s]+/)) {
    const part = raw.trim();
    if (!part) continue;
    const m = part.match(/^(\d+)\s*[-–—~～－]\s*(\d+)$/);
    if (m) {
      let a = Number(m[1]);
      let b = Number(m[2]);
      if (a > b) [a, b] = [b, a];
      for (let n = Math.max(1, a); n <= Math.min(total, b); n++) picked.add(n);
    } else if (/^\d+$/.test(part)) {
      const n = Number(part);
      if (n >= 1 && n <= total) picked.add(n);
    }
  }
  return [...picked].sort((x, y) => x - y);
}

/** 反過來：把選到的頁寫回「1, 3, 5-7」，連續三頁以上才縮成區間。 */
export function formatRange(pages: number[]): string {
  const sorted = [...new Set(pages)].sort((a, b) => a - b);
  const out: string[] = [];
  let i = 0;
  while (i < sorted.length) {
    let j = i;
    while (j + 1 < sorted.length && sorted[j + 1] === sorted[j] + 1) j++;
    if (j - i >= 2) out.push(`${sorted[i]}-${sorted[j]}`);
    else for (let k = i; k <= j; k++) out.push(String(sorted[k]));
    i = j + 1;
  }
  return out.join(', ');
}
