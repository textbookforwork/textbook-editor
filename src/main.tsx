import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import './styles/tokens.css';
import { Root } from './Root';
import { installScrollReveal } from './styles/scrollReveal';

installScrollReveal();

// 媒體庫先放兩課的測試素材，每個分頁都有東西可以試。線上版也載入，乙練要拿來測試（2026-10-22）；
// 正式上線接了真的媒體庫，把這三行拿掉即可
void import('./editor/sampleLibrary').then((m) => m.seedSampleLibrary());

// Agentation：畫面上點元件寫意見，複製成帶位置的文字貼給 Claude 照著改（2026-11-03 乙練要裝）。
// 本機開發一律出現；線上版網址加 ?feedback（例：…/textbook-editor/?feedback#/shelf/textbook）才出現，一般使用者看不到
if (import.meta.env.DEV || new URLSearchParams(location.search).has('feedback')) {
  void import('agentation').then(({ Agentation }) => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    createRoot(host).render(<Agentation />);
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Root />
    </ThemeProvider>
  </StrictMode>
);
