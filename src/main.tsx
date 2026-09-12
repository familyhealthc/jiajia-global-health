import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ChinesePage from './ChinesePage';
import EnglishPage from './EnglishPage';
import './styles.css';

const language = new URLSearchParams(window.location.search).get('lang');
document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';

createRoot(document.getElementById('root')!).render(
  <StrictMode>{language === 'en' ? <EnglishPage /> : <ChinesePage />}</StrictMode>,
);
