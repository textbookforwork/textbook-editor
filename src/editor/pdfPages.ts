/**
 * 讀 PDF、把頁面畫成圖片。用 pdf.js（Mozilla），只在真的要讀 PDF 時才載入，
 * 平常開編輯器不必多下載這一包。
 *
 * PDF 匯入的做法是「每一頁變成一張圖片」，不是嵌瀏覽器的 PDF 檢視器：
 * 各家瀏覽器的檢視器長得不一樣、iPad 常常不理指定頁數，變成圖片後所有裝置看到的都一樣，
 * 而且就是一般的圖片元件，可以調大小、掛補充、排進分頁。
 */
import type { PDFDocumentProxy } from 'pdfjs-dist';

let lib: Promise<typeof import('pdfjs-dist')> | null = null;

function load() {
  if (!lib) {
    lib = Promise.all([import('pdfjs-dist'), import('pdfjs-dist/build/pdf.worker.min.mjs?url')]).then(
      ([pdfjs, worker]) => {
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
        return pdfjs;
      }
    );
  }
  return lib;
}

const docs = new Map<string, Promise<PDFDocumentProxy>>();

/** 打開一份 PDF（同一個網址只讀一次）。 */
export function openPdf(url: string): Promise<PDFDocumentProxy> {
  let d = docs.get(url);
  if (!d) {
    d = load().then((pdfjs) => pdfjs.getDocument(url).promise);
    docs.set(url, d);
  }
  return d;
}

/** 把第 n 頁畫成指定寬度的圖片。回傳 Blob 與長寬比。 */
export async function renderPage(
  doc: PDFDocumentProxy,
  n: number,
  width: number,
  type: 'image/png' | 'image/jpeg' = 'image/png'
): Promise<{ blob: Blob; aspectRatio: number }> {
  const page = await doc.getPage(n);
  const base = page.getViewport({ scale: 1 });
  const viewport = page.getViewport({ scale: width / base.width });
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(viewport.width);
  canvas.height = Math.round(viewport.height);
  const ctx = canvas.getContext('2d')!;
  // PDF 沒畫底色的地方是透明的，先鋪白，不然圖片放在有底色的頁面上會透出來
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, viewport }).promise;
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('畫不出這一頁'))), type, 0.9)
  );
  return { blob, aspectRatio: base.width / base.height };
}

const thumbs = new Map<string, Promise<string>>();
// 縮圖一次只畫一張、畫完讓出一幀：一份幾十頁的 PDF 同時畫會把畫面卡住（點選頁面時會頓）
let queue: Promise<unknown> = Promise.resolve();
const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

/** 縮圖（給選頁畫面與已上傳清單用），畫過的留著不重畫。 */
export function pageThumb(url: string, n: number, width = 200): Promise<string> {
  const key = `${url}#${n}@${width}`;
  let t = thumbs.get(key);
  if (!t) {
    const job = queue.then(async () => {
      const doc = await openPdf(url);
      const { blob } = await renderPage(doc, n, width, 'image/jpeg');
      await nextFrame();
      return URL.createObjectURL(blob);
    });
    queue = job.catch(() => {});
    t = job;
    thumbs.set(key, t);
  }
  return t;
}
