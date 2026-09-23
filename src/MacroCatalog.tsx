import { useState } from 'react';
import { fullCatalog } from './fullIndicatorCatalog';

type Locale = 'zh' | 'en';

export function MacroCatalog({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState('');
  const en = locale === 'en';
  const normalized = query.trim().toLocaleLowerCase();
  const groups = fullCatalog.map((group) => ({
    ...group,
    visible: normalized ? group.indicators.filter((item) => `${item} ${group.zh} ${group.en}`.toLocaleLowerCase().includes(normalized)) : group.indicators,
  })).filter((group) => group.visible.length > 0);

  return <section className="macro-catalog" id="indicator-catalog" aria-labelledby="catalog-heading">
    <div className="economy-section-title"><div><span>{en ? 'COUNTRY MACRO / FULL DIRECTORY' : '国家经济 / 完整指标目录'}</span><h2 id="catalog-heading">{en ? 'A comprehensive country checklist' : '三十六类，六百多项经济指标'}</h2></div><p>{en ? 'The full reference directory, with original Chinese indicator names retained. Entries are a research scope, not claims of available live data.' : '按照你提供的完整清单整理；目录用于明确研究范围，不表示每项都有已接入的实时数据。'}</p></div>
    <div className="macro-catalog-toolbar"><label htmlFor="macro-search">{en ? 'Find an indicator' : '查找指标'}</label><input id="macro-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={en ? 'e.g. reserves, debt, inflation' : '例如：外债、通胀、人口'} /><span>{groups.length} {en ? 'themes' : '个主题'} · {groups.reduce((sum, group) => sum + group.visible.length, 0)} {en ? 'indicators' : '项指标'}</span></div>
    <div className="macro-catalog-grid">{groups.map((group) => <details key={group.id} open={Boolean(normalized)}><summary><span>{group.id}</span><strong>{group[locale]}</strong><small>{group.visible.length}</small><b aria-hidden="true">＋</b></summary><ul>{group.visible.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul></details>)}</div>
    {groups.length === 0 && <p className="macro-catalog-empty">{en ? 'No matching indicator in this directory.' : '目录中没有匹配的指标。'}</p>}
    <div className="macro-catalog-schema"><strong>{en ? 'For each future data series' : '未来每条数据至少记录'}</strong><p>{en ? 'Current value · prior value · change · 5-year average · 10-year average · historical percentile · observation date · source · definition · revision status. These fields should be calculated only when a consistent historical series is available.' : '当前值 · 前值 · 变化幅度 · 5 年平均 · 10 年平均 · 历史分位 · 观察日期 · 来源 · 定义 · 修订状态。只有拿到连续且同口径的历史序列后，才计算平均值和分位。'}</p></div>
  </section>;
}
