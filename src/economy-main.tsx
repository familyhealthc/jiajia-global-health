import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import EconomyPage from './EconomyPage';
import './styles.css';
import './economy.css';
import './macro.css';

const locale = new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'zh';
document.documentElement.lang = locale === 'en' ? 'en' : 'zh-CN';
document.title = locale === 'en' ? 'Country Macro Observatory | Jiajia Health' : '国家经济观察｜家家健康';
createRoot(document.getElementById('root')!).render(<StrictMode><EconomyPage locale={locale} /></StrictMode>);
