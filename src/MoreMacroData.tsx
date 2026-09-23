import { ArrowUpRight } from 'lucide-react';
import { moreMacroMetrics } from './moreMacroMetrics';

type Locale = 'zh' | 'en';
const groups = [
  { id: 'growth', zh: '规模与增长', en: 'Scale & growth' },
  { id: 'prices', zh: '价格与就业', en: 'Prices & labor' },
  { id: 'fiscal', zh: '财政细项', en: 'Fiscal detail' },
  { id: 'external', zh: '对外收支', en: 'External balance' },
];

export function MoreMacroData({ locale, code }: { locale: Locale; code: string }) {
  const en = locale === 'en';
  return <div className="macro-more-data">
    <div className="macro-more-heading"><h3>{en ? 'More comparable figures' : '继续看：更多可比数字'}</h3><p>{en ? 'Thirteen additional indicators · 2025 observation/estimate · IMF April 2026 WEO and Fiscal Monitor' : '另有 13 项指标 · 2025 年观察值／估计值 · IMF 2026 年 4 月《世界经济展望》与《财政监测报告》'}</p></div>
    {groups.map((group) => <div className="macro-more-group" key={group.id}><h4>{group[locale]}</h4><div className="macro-more-list">{moreMacroMetrics.filter((metric) => metric.group === group.id).map((metric) => { const value = metric.values[code]; return <div className="macro-more-row" key={metric.code}><span>{metric[locale]}<small>{metric.unit}</small></span><strong>{value === null ? '—' : value.toLocaleString(en ? 'en-US' : 'zh-CN', { maximumFractionDigits: metric.digits, minimumFractionDigits: metric.digits })}</strong><a href={metric.source} target="_blank" rel="noopener noreferrer" aria-label={`${metric[locale]} ${en ? 'source' : '来源'}`}><ArrowUpRight size={14}/></a></div>; })}</div></div>)}
    <p className="macro-more-note">{en ? 'WEO and Fiscal Monitor may differ slightly in coverage or rounding. Nominal GDP and current account are in U.S. dollars; PPP per-capita GDP is in international dollars. A dash means IMF did not report a comparable value in this series.' : 'WEO 与《财政监测报告》可能因范围或四舍五入略有差异。名义 GDP、经常账户用美元；PPP 人均 GDP 用国际美元。“—”表示 IMF 该序列未报告可比值。'}</p>
  </div>;
}
