import { ArrowUpRight } from 'lucide-react';
import { historicalMetrics } from './historicalMacro';

type Locale = 'zh' | 'en';
const average = (values: (number | null)[]) => { const valid = values.filter((value): value is number => value !== null); return valid.length ? valid.reduce((sum, value) => sum + value, 0) / valid.length : null; };
const display = (value: number | null) => value === null ? '—' : `${value.toFixed(1)}%`;

export function MacroHistory({ locale, code }: { locale: Locale; code: string }) {
  const en = locale === 'en';
  return <div className="macro-history" id="macro-history">
    <div className="macro-more-heading"><h3>{en ? 'Ten years of context' : '再看十年背景'}</h3><p>{en ? 'Six key IMF WEO series · 2016–2025 · previous year, five- and ten-year averages, and the latest percentile' : '六项 IMF WEO 关键序列 · 2016—2025 年 · 同时看前值、5 年均值、10 年均值与最新值所处百分位'}</p></div>
    <div className="macro-history-grid">{historicalMetrics.map((metric) => {
      const values = metric.values[code];
      const current = values[9];
      const valid = values.filter((value): value is number => value !== null);
      const percentile = current === null || !valid.length ? null : Math.round(100 * (valid.filter((value) => value < current).length + valid.filter((value) => value === current).length / 2) / valid.length);
      const min = Math.min(...valid);
      const range = Math.max(...valid) - min || 1;
      const coords = values.map((value, index) => value === null ? null : `${4 + index * 21.3},${46 - (value - min) / range * 40}`).filter(Boolean).join(' ');
      return <article key={metric.code}><div className="macro-history-top"><h4>{metric[locale]}</h4><a href={`https://www.imf.org/external/datamapper/${metric.code}@WEO`} target="_blank" rel="noopener noreferrer" aria-label={`${metric[locale]} ${en ? 'source' : '来源'}`}><ArrowUpRight size={14}/></a></div><strong>{display(current)}</strong><svg viewBox="0 0 200 52" preserveAspectRatio="none" role="img" aria-label={en ? `${metric.en}, 2016 to 2025 trend` : `${metric.zh}，2016 至 2025 年趋势`}><polyline points={coords}/></svg><div className="macro-history-facts"><span><small>2024</small><b>{display(values[8])}</b></span><span><small>{en ? '5Y AVG' : '5 年均值'}</small><b>{display(average(values.slice(5)))}</b></span><span><small>{en ? '10Y AVG' : '10 年均值'}</small><b>{display(average(values))}</b></span><span><small>{en ? '10Y RANK' : '10 年百分位'}</small><b>{percentile === null ? '—' : `${percentile}`}</b></span></div></article>;
    })}</div>
    <p className="macro-more-note">{en ? 'The percentile ranks the 2025 value among available 2016–2025 observations; a higher rank is not automatically better or worse. Averages use available annual observations and include 2025. WEO figures may be revised.' : '百分位表示 2025 年数值在 2016—2025 年可得观测中的位置；高低不直接代表好坏。均值使用可得年度数据，包含 2025 年；WEO 数据可能修订。'}</p>
  </div>;
}
