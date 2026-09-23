import { useState } from 'react';
import { macroCatalog } from './indicatorCatalogData';

type Locale = 'zh' | 'en';

export function MacroCatalog({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState('');
  const en = locale === 'en';
  const normalized = query.trim().toLocaleLowerCase();
  const groups = macroCatalog.map((group) => ({
    ...group,
    visible: normalized ? group.indicators.filter(([zh, english]) => `${zh} ${english} ${group.zh} ${group.en}`.toLocaleLowerCase().includes(normalized)) : group.indicators,
  })).filter((group) => group.visible.length > 0);

  return <section className="macro-catalog" id="indicator-catalog" aria-labelledby="catalog-heading">
    <div className="economy-section-title"><div><span>{en ? 'COUNTRY MACRO / INDICATOR MAP' : '国家经济 / 指标地图'}</span><h2 id="catalog-heading">{en ? 'Sixteen lenses on one economy' : '用十六个主题，观察一个经济体'}</h2></div><p>{en ? 'A research checklist for expanding the dashboard. Listed indicators are not all populated with current values.' : '这是后续扩展国家面板的研究目录；列出指标不代表已经接入最新数值。'}</p></div>
    <div className="macro-catalog-toolbar"><label htmlFor="macro-search">{en ? 'Find an indicator' : '查找指标'}</label><input id="macro-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={en ? 'e.g. reserves, debt, inflation' : '例如：外债、通胀、人口'} /><span>{groups.length} {en ? 'themes' : '个主题'} · {groups.reduce((sum, group) => sum + group.visible.length, 0)} {en ? 'indicators' : '项指标'}</span></div>
    <div className="macro-catalog-grid">{groups.map((group, index) => <details key={group.id} open={Boolean(normalized)}><summary><span>{String(index + 1).padStart(2, '0')}</span><strong>{group[locale]}</strong><small>{group.visible.length}</small><b aria-hidden="true">＋</b></summary><ul>{group.visible.map(([zh, english]) => <li key={english}>{en ? english : zh}</li>)}</ul></details>)}</div>
    {groups.length === 0 && <p className="macro-catalog-empty">{en ? 'No matching indicator in this directory.' : '目录中没有匹配的指标。'}</p>}
    <div className="macro-catalog-schema"><strong>{en ? 'For each future data series' : '未来每条数据至少记录'}</strong><p>{en ? 'Current value · prior value · change · 5-year average · 10-year average · historical percentile · observation date · source · definition · revision status. These fields should be calculated only when a consistent historical series is available.' : '当前值 · 前值 · 变化幅度 · 5 年平均 · 10 年平均 · 历史分位 · 观察日期 · 来源 · 定义 · 修订状态。只有拿到连续且同口径的历史序列后，才计算平均值和分位。'}</p></div>
  </section>;
}
