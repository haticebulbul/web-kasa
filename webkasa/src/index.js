import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ViewProvider } from './context/View';
import { TemaProvider, lightTheme } from './context/Tema'; 
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'; 
import { ProductProvider } from './context/Products';

async function initializeApp() {

  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser');
    await worker.start(); 
  }

 
 
  const rootElement = document.getElementById('root');
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <ViewProvider>
        <TemaProvider>
          <ProductProvider>
          <MuiThemeProvider theme={lightTheme}> 
            <App />
          </MuiThemeProvider>
          </ProductProvider>
        </TemaProvider>
      </ViewProvider>
    </BrowserRouter>
  );

  
  reportWebVitals();
}

initializeApp(); 