import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import './styles/tokens.css';
import { App } from './App';
import { installScrollReveal } from './styles/scrollReveal';

installScrollReveal();

// 開發時媒體庫先放一組測試素材，每個分頁都有東西可以試（正式版不載入）
if (import.meta.env.DEV) {
  void import('./editor/sampleLibrary').then((m) => m.seedSampleLibrary());
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </StrictMode>
);
