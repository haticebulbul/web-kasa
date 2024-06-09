import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ViewProvider } from './context/View';
import { I18nextProvider } from 'react-i18next';
import i18next from './i18next';
import { LanguageProvider } from './context/LanguageContext';
import { TemaProvider, lightTheme, darkTheme } from './context/Tema'; 
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'; 

async function initializeApp() {
  // 1. Sahte Ortamı Başlat 
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser');
    await worker.start(); // Sahte ortamın hazır olmasını bekleyin
  }

  // 2. i18next'i Başlatın
  await i18next.init(); // Çevirilerin yüklendiğinden emin olun

  // 3. Uygulamayı Oluşturun
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <BrowserRouter>
      <ViewProvider>
        <TemaProvider>
          <MuiThemeProvider theme={lightTheme}> 
            <App />
          </MuiThemeProvider>
        </TemaProvider>
      </ViewProvider>
    </BrowserRouter>
  );

  // 4. Web Vitals Raporla 
  reportWebVitals();
}

initializeApp(); 