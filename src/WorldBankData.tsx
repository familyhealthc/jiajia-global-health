import { ArrowUpRight } from 'lucide-react';
import { wdiMetrics } from './worldBankMetrics';

type Locale = 'zh' | 'en';
const groups = [
  { id: 'demand', zh: '需求、储蓄与投资', en: 'Demand, saving & investment' },
  { id: 'structure', zh: '产业结构', en: 'Economic structure' },
  { id: 'labor', zh: '劳动力', en: 'Labor' },
  { id: 'external', zh: '跨境投资', en: 'Cross-border investment' },
  { id: 'finance', zh: '银行与货币', en: 'Banking & money' },
  { id: 'society', zh: '人口、创新与公共服务', en: 'People, innovation & services' },
];

export function WorldBankData({ locale, code }: { locale: Locale; code: string }) {
  const en = locale === 'en';
  return <div className="macro-wdi-data">
    <div className="macro-more-heading"><h3>{en ? 'Twenty more country indicators' : '再看二十项经济与社会指标'}</h3><p>{en ? 'World Bank WDI · latest reported value from 2020–2025 · observation year shown for every value' : '世界银行 WDI · 取 2020—2025 年间最新可得值 · 每个数值单独标明观察年份'}</p></div>
    {groups.map((group) => <div className="macro-more-group" key={group.id}><h4>{group[locale]}</h4><div className="macro-more-list">{wdiMetrics.filter((metric) => metric.group === group.id).map((metric) => { const observation = metric.values[code]; return <div className="macro-more-row" key={metric.code}><span>{metric[locale]}<small>{observation ? observation.year : (en ? 'No recent value' : '近期无值')} · {metric.unit}</small></span><strong>{observation ? observation.value.toLocaleString(en ? 'en-US' : 'zh-CN', { maximumFractionDigits: 1, minimumFractionDigits: 1 }) : '—'}</strong><a href={`https://data.worldbank.org/indicator/${metric.code}`} target="_blank" rel="noopener noreferrer" aria-label={`${metric[locale]} ${en ? 'source' : '来源'}`}><ArrowUpRight size={14}/></a></div>; })}</div></div>)}
    <p className="macro-more-note">{en ? 'This section mixes observation years and some series are several years old. Compare trends only after aligning years and checking each WDI definition. The savings and investment measures are national-account series, not directly interchangeable with the current-account balance.' : '本区各指标年份不一，部分序列已有数年未更新。做趋势或跨国比较前，请先对齐年份并查看 WDI 定义；储蓄与投资指标采用国民账户口径，不能未经核对就与经常账户数值直接相减。'}</p>
  </div>;
}
