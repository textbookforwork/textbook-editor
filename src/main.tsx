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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Root />
    </ThemeProvider>
  </StrictMode>
);
