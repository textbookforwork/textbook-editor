import { addSampleAsset } from './assets';
import { sampleCredit } from './sampleMedia';

/**
 * 預先放進媒體庫的測試素材：自然（夏季大三角）與國文（木蘭詩）兩課各一組，
 * 圖片、影片、聲音、網頁、PDF 每個分頁都有東西可以點、可以插。
 *
 * 圖片用範例教材附的開放授權照片（design/media/，出處見 credits.json，插進畫布會疊出處）；
 * 影片、聲音、PDF 是自己做的（design/media-samples/：星空照做的縮放影片、系統語音念的旁白、
 * 用範例照片排的學習單），沒有授權問題。線上版也載入，讓老師打開就能測試；正式上線接了真的媒體庫再拿掉（見 main.tsx）。
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
  ['mulan-portrait', '木蘭像'],
  ['mulan-silk-painting', '木蘭絹畫'],
  ['mulan-loom', '木織機'],
  ['mulan-weaver', '織布'],
  ['mulan-yellow-river', '黃河'],
  ['mulan-yanshan', '燕山'],
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
  // 國文範例〈木蘭詩〉用的開放授權素材，出處見 design/media-samples/credits.json
  addSampleAsset(
    { assetId: 'sample-video-mulan-wall', kind: 'video', source: 'upload', name: '敦煌的漢代長城.mp4' },
    fileUrl('mulan-great-wall.mp4')
  );
  addSampleAsset(
    { assetId: 'sample-video-mulan-horses', kind: 'video', source: 'upload', name: '草原上的馬群.mp4' },
    fileUrl('mulan-steppe-horses.mp4')
  );
  addSampleAsset({ assetId: 'sample-audio-mulan-loom', kind: 'audio', name: '織布機的聲音.mp3' }, fileUrl('mulan-loom-sound.mp3'));
  addSampleAsset({ assetId: 'sample-audio-mulan-neigh', kind: 'audio', name: '馬的嘶鳴.mp3' }, fileUrl('mulan-horse-neigh.mp3'));
  // 課文朗讀是系統語音（美佳）念的，破音字用同音字餵給它才念得對
  ['一', '二', '三', '四', '五', '六'].forEach((no, i) =>
    addSampleAsset({ assetId: `sample-audio-mulan-recite-${i + 1}`, kind: 'audio', name: `木蘭詩第${no}段朗讀.mp3` }, fileUrl(`mulan-recite-${i + 1}.mp3`))
  );
  addSampleAsset({ assetId: 'sample-audio-vega', kind: 'audio', name: '三顆主角星.mp3' }, fileUrl('vega.mp3'));
  addSampleAsset({ assetId: 'sample-web-wiki', kind: 'web', name: '維基百科：夏季大三角', url: 'https://zh.wikipedia.org/zh-tw/夏季大三角' });
  addSampleAsset({ assetId: 'sample-web-cwa', kind: 'web', name: '中央氣象署', url: 'https://www.cwa.gov.tw' });
  addSampleAsset(
    { assetId: 'sample-pdf-worksheet', kind: 'pdf', name: '學習單-夏季大三角.pdf' },
    fileUrl('學習單-夏季大三角.pdf')
  );
  addSampleAsset({ assetId: 'sample-web-mulan-wiki', kind: 'web', name: '維基百科：木蘭辭', url: 'https://zh.wikipedia.org/zh-tw/木蘭辭' });
  addSampleAsset({ assetId: 'sample-web-mulan-source', kind: 'web', name: '維基文庫：木蘭詩全文', url: 'https://zh.wikisource.org/zh-hant/木蘭詩' });
  // 用木蘭詩的開放授權圖片排的兩頁學習單（出處印在第二頁下方）
  addSampleAsset(
    { assetId: 'sample-pdf-mulan-worksheet', kind: 'pdf', name: '學習單-木蘭詩.pdf' },
    fileUrl('學習單-木蘭詩.pdf')
  );
}
