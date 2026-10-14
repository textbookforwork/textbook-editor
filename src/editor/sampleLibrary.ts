import { addSampleAsset } from './assets';
import { sampleCredit } from './sampleMedia';

/**
 * 開發時預先放進媒體庫的測試素材，每個分頁都有東西可以點、可以插。
 *
 * 圖片用範例教材附的開放授權照片（design/media/，出處見 credits.json，插進畫布會疊出處）；
 * 影片、聲音、PDF 是自己做的（design/media-samples/：星空照做的縮放影片、系統語音念的旁白、
 * 用範例照片排的四頁學習單），沒有授權問題。只在 npm run dev 時載入，正式版不會出現。
 */
const files = import.meta.glob<string>('../../design/media-samples/*', {
  eager: true,
  query: '?url',
  import: 'default',
});
const fileUrl = (name: string) =>
  Object.entries(files).find(([path]) => path.endsWith(`/${name}`))?.[1];

const IMAGES: [string, string][] = [
  ['summer-triangle', '夏季大三角'],
  ['star-chart', '星圖'],
  ['star-trails', '星軌'],
  ['orion-lines', '獵戶座連線'],
  ['U4-L1-alishan', '阿里山'],
  ['U4-L1-train', '火車'],
];

export function seedSampleLibrary() {
  for (const [id, name] of IMAGES) {
    const c = sampleCredit(id);
    addSampleAsset({ assetId: id, kind: 'image', name, ...(c ? { aspectRatio: c.width / c.height } : {}) });
  }
  addSampleAsset(
    { assetId: 'sample-video-star-trails', kind: 'video', source: 'upload', name: '星軌縮時（測試）.mp4' },
    fileUrl('star-trails.mp4')
  );
  addSampleAsset({ assetId: 'sample-audio-narration', kind: 'audio', name: '夏季大三角旁白.mp3' }, fileUrl('narration.mp3'));
  addSampleAsset({ assetId: 'sample-audio-vega', kind: 'audio', name: '三顆主角星.mp3' }, fileUrl('vega.mp3'));
  addSampleAsset({ assetId: 'sample-web-wiki', kind: 'web', name: '維基百科：夏季大三角', url: 'https://zh.wikipedia.org/zh-tw/夏季大三角' });
  addSampleAsset({ assetId: 'sample-web-cwa', kind: 'web', name: '中央氣象署', url: 'https://www.cwa.gov.tw' });
  addSampleAsset(
    { assetId: 'sample-pdf-worksheet', kind: 'pdf', name: '學習單-夏季大三角.pdf' },
    fileUrl('學習單-夏季大三角.pdf')
  );
}
