import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import EconomyPage from './EconomyPage';
import './styles.css';
import './economy.css';
import './macro.css';

const locale = new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'zh';
document.documentElement.lang = locale === 'en' ? 'en' : 'zh-CN';
document.title = locale === 'en' ? 'Economy & Rates | Jiajia Health' : '经济与利率观察｜家家健康';
createRoot(document.getElementById('root')!).render(<StrictMode><EconomyPage locale={locale} /></StrictMode>);
