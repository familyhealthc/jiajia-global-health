import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Network } from 'lucide-react';
import { rateByCode } from './marketRates';
import { sovereignYields } from './sovereignYields';
import { MacroRisk } from './MacroRisk';
import { DataQuality } from './DataQuality';
import { multiTenorYields } from './multiTenorYields';
import { MacroCatalog } from './MacroCatalog';

type Locale = 'zh' | 'en';
const source = 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202609&type=daily_treasury_yield_curve';
const points = [
  { year: 1, value: 4.43 }, { year: 2, value: 4.71 }, { year: 3, value: 4.81 },
  { year: 5, value: 4.83 }, { year: 7, value: 4.89 }, { year: 10, value: 4.96 },
  { year: 20, value: 5.33 }, { year: 30, value: 5.29 },
];
const markets = [
  { code: 'HK', zh: '中国香港', en: 'Hong Kong', bondZh: '外汇基金票据与债券', bondEn: 'Exchange Fund Bills & Notes', url: 'https://apidocs.hkma.gov.hk/documentation/market-data-and-statistics/monthly-statistical-bulletin/efbn/efbn-yield-daily/' },
  { code: 'MY', zh: '马来西亚', en: 'Malaysia', bondZh: 'MGS 基准收益率', bondEn: 'MGS benchmark yields', url: 'https://financialmarkets.bnm.gov.my/benchmark-yields?form=MG0AV3' },
  { code: 'SG', zh: '新加坡', en: 'Singapore', bondZh: '国债基准发行价格', bondEn: 'SGS benchmark issue prices', url: 'https://eservices.mas.gov.sg/Statistics/fdanet/SgsBenchmarkIssuePrices.aspx' },
  { code: 'DE', zh: '德国', en: 'Germany', bondZh: '联邦债每日收益率', bondEn: 'Daily federal bond yields', url: 'https://www.bundesbank.de/en/statistics/money-and-capital-markets/interest-rates-and-yields/daily-yields-of-current-federal-securities-772220' },
  { code: 'JP', zh: '日本', en: 'Japan', bondZh: '国债拍卖结果', bondEn: 'JGB auction results', url: 'https://www.mof.go.jp/english/policy/jgbs/auction/past_auction_results/index.html' },
  { code: 'GB', zh: '英国', en: 'United Kingdom', bondZh: '国债收益率曲线', bondEn: 'Gilt yield curves', url: 'https://www.bankofengland.co.uk/statistics/yield-curves' },
];

export default function EconomyPage({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState(10);
  const en = locale === 'en';
  const active = points.find((point) => point.year === selected)!;
  const base = import.meta.env.BASE_URL;
  const values = points.map((point) => point.value);
  const min = Math.floor(Math.min(...values) * 10) / 10 - .1;
  const max = Math.ceil(Math.max(...values) * 10) / 10 + .1;
  const coordinates = points.map((point, index) => `${58 + index * 108},${238 - ((point.value - min) / (max - min)) * 172}`).join(' ');

  return <main className="economy-page" lang={en ? 'en' : 'zh-CN'}>
    <header className="economy-nav">
      <a className="economy-brand" href={`${base}${en ? '?lang=en' : ''}`}><span className="brand-mark"><Network size={17}/></span><span>{en ? 'JIAJIA HEALTH' : '家家健康'}</span></a>
      <div className="economy-nav-right"><a href={`${base}${en ? '?lang=en#markets' : '#markets'}`}><ArrowLeft size={16}/>{en ? 'Market strategy' : '全球市场'}</a><a href={en ? '?lang=zh' : '?lang=en'}>{en ? '中文' : 'EN'}</a></div>
    </header>

    <section className="economy-comparison" aria-labelledby="comparison-heading">
      <div className="economy-section-title"><div><span>{en ? 'JIAJIA HEALTH / ECONOMIC OBSERVATORY' : '家家健康 / 经济与利率观察'}</span><h1 id="comparison-heading">{en ? 'Sovereign yields by country' : '各国国债收益率对比'}</h1></div><p>{en ? 'One-year and ten-year sovereign yields · annual % · official dated snapshots' : '1 年期与 10 年期国债 · 年化收益率 % · 官方日期快照'}</p></div>
      <div className="economy-comparison-scroll"><table className="economy-comparison-table"><thead><tr><th scope="col">{en ? 'Country' : '国家'}</th><th scope="col">{en ? '1-year sovereign' : '1 年期国债'}</th><th scope="col">{en ? '10-year sovereign' : '10 年期国债'}</th></tr></thead><tbody>{sovereignYields.map((item) => <tr key={item.code}><th scope="row"><span className="economy-flag" aria-hidden="true">{item.flag}</span><span className="economy-country-name">{item[locale]}<small>{item.date}</small></span></th><td>{item.oneYear === undefined ? <span className="economy-pending">{en ? 'To verify' : '待核对'}</span> : `${item.oneYear.toFixed(2)}%`}</td><td>{item.tenYear.toFixed(2)}%</td></tr>)}</tbody></table></div>
      <div className="economy-comparison-meta"><p>{en ? 'One-year and ten-year measures are not standardised across countries. Germany combines a bill auction with a market bond yield; the Swiss one-year figure is held until an official matching source is confirmed.' : '各国期限与计算方法不完全一致。德国 1 年端为国库券拍卖、10 年端为债券市场收益率；瑞士 1 年端在找到同口径官方数据前暂不填数。'}</p><a href="#economy-sources">{en ? 'See dates and sources' : '查看逐国口径与来源'} <ArrowUpRight size={15}/></a></div>
    </section>

    <section className="economy-many-tenors" aria-labelledby="tenors-heading"><div className="economy-section-title"><div><span>{en ? 'MORE MATURITIES' : '更多国债期限'}</span><h2 id="tenors-heading">{en ? 'A broader view of the yield curve' : '从短端到长端，看完整一点'}</h2></div><p>{en ? 'Official snapshots where five maturities can be verified together · annual %' : '同一官方来源可核实五个期限的市场快照 · 年化 %'}</p></div><div className="economy-many-scroll"><table><thead><tr><th scope="col">{en ? 'Country' : '国家'}</th>{[1,2,5,10,30].map((year) => <th scope="col" key={year}>{year}{en ? 'Y' : ' 年'}</th>)}</tr></thead><tbody>{multiTenorYields.map((item) => <tr key={item.code}><th scope="row">{item.flag} {item[locale]}<small>{item.date}</small></th>{item.yields.map((value, index) => <td key={index}>{value.toFixed(2)}%</td>)}</tr>)}</tbody></table></div><div className="economy-many-notes">{multiTenorYields.map((item) => <a key={item.code} href={item.source} target="_blank" rel="noopener noreferrer">{item.flag} {item[en ? 'methodEn' : 'methodZh']} <ArrowUpRight size={13}/></a>)}</div><p className="economy-method">{en ? 'Dates and methods vary by market. Singapore combines a 1-year bill quote with benchmark bond quotes; these levels are not directly comparable to a single-method par or spot curve.' : '各国日期与算法不同。新加坡 1 年端是国库券报价，其他期限为基准债报价；不能把它与单一方法的平价或即期曲线直接排名。'}</p></section>

    <MacroRisk locale={locale} />
    <DataQuality locale={locale} />
    <MacroCatalog locale={locale} />

    <section className="economy-spreads" aria-labelledby="spread-heading"><div className="economy-section-title"><div><span>{en ? 'TERM SPREAD' : '期限利差'}</span><h2 id="spread-heading">{en ? 'How far apart are the two ends?' : '10 年减 1 年，差多少？'}</h2></div><p>{en ? 'The spread describes the slope within one market on one observation date. It is not an investment return.' : '利差反映同一市场、同一观察日的曲线斜率，不等于投资回报。'}</p></div><div className="economy-spread-list">{sovereignYields.filter((item) => item.comparable && item.oneYear !== undefined).map((item) => <div key={item.code}><span>{item.flag} {item[locale]} <small>{item.date}</small></span><strong>+{Math.round((item.tenYear - item.oneYear!) * 100)} <small>bp</small></strong></div>)}</div><p className="economy-method">{en ? '1 bp = 0.01 percentage point. These within-market differences use the same source and date for each row; country-to-country ranking still needs method and currency context.' : '1 个基点（bp）= 0.01 个百分点。此处每个市场的两端来自同一天、同一来源；跨国排名仍需考虑口径和币种。'}</p></section>

    <section className="economy-workspace" aria-labelledby="yield-heading">
      <div className="economy-section-title"><div><span>{en ? 'UNITED STATES / NOMINAL' : '美国 / 名义收益率'}</span><h2 id="yield-heading">{en ? 'Treasury yield curve' : '美国国债期限曲线'}</h2></div><p>{en ? 'Daily Treasury par yield curve · September 22, 2026 · % per annum' : '美国财政部每日平价收益率曲线 · 2026 年 9 月 22 日 · 年化 %'}</p></div>
      <div className="economy-chart-layout">
        <div className="economy-chart" role="img" aria-label={en ? 'US Treasury yields from 1 to 30 years, September 22 2026' : '2026年9月22日美国1至30年期国债收益率曲线'}>
          <div className="economy-axis-labels"><span>{max.toFixed(1)}%</span><span>{((max + min) / 2).toFixed(1)}%</span><span>{min.toFixed(1)}%</span></div>
          <svg viewBox="0 0 890 270" preserveAspectRatio="none" aria-hidden="true"><line x1="58" y1="66" x2="814" y2="66"/><line x1="58" y1="152" x2="814" y2="152"/><line x1="58" y1="238" x2="814" y2="238"/><polyline points={coordinates}/>{points.map((point, index) => <circle key={point.year} cx={58 + index * 108} cy={238 - ((point.value - min) / (max - min)) * 172} r={selected === point.year ? 7 : 4}/>)}</svg>
          <div className="economy-tenors">{points.map((point) => <button key={point.year} type="button" aria-pressed={selected === point.year} className={selected === point.year ? 'selected' : ''} onClick={() => setSelected(point.year)}>{point.year}{en ? 'Y' : '年'}</button>)}</div>
        </div>
        <aside className="economy-readout" aria-live="polite"><span>{selected}{en ? '-YEAR TREASURY' : ' 年期美国国债'}</span><strong>{active.value.toFixed(2)}<small>%</small></strong><p>{en ? 'Par yield · Sep 22, 2026' : '平价收益率 · 2026-09-22'}</p><a href={source} target="_blank" rel="noopener noreferrer">{en ? 'View Treasury source' : '查看美国财政部原始表格'} <ArrowUpRight size={15}/></a></aside>
      </div>
      <div className="economy-tenor-table" role="table" aria-label={en ? 'Treasury yield values' : '国债收益率明细'}>{points.map((point) => <div role="row" key={point.year}><span role="cell">{point.year}{en ? ' year' : ' 年期'}</span><strong role="cell">{point.value.toFixed(2)}%</strong></div>)}</div>
      <p className="economy-method">{en ? 'These are constant-maturity par yields estimated from market quotations, rather than the coupon or return of a specific bond. The 1-year point and 10-year point share the same date and methodology.' : '这里展示的是美国财政部根据市场报价估算的固定期限平价收益率，并非某只国债的票息或持有收益。1 年期和 10 年期采用同一天、同一口径的数据。'}</p>
    </section>

    <section className="economy-explain"><div className="economy-section-title"><div><span>{en ? 'HOW TO READ THE NUMBERS' : '读数方法'}</span><h2>{en ? 'Three rates, three questions.' : '三种利率，回答三个问题。'}</h2></div></div><div className="economy-explain-grid"><article><span>01 / POLICY</span><h3>{en ? 'Policy rate' : '政策利率'}</h3><p>{en ? 'A central-bank policy setting. It influences funding conditions but is not the rate offered to a business.' : '央行设定的货币政策工具，影响资金环境，但不是企业可直接拿到的贷款报价。'}</p></article><article><span>02 / SOVEREIGN</span><h3>{en ? 'Sovereign yield' : '国债收益率'}</h3><p>{en ? 'A market or model yield at a stated maturity. Compare the same currency, date, tenor and calculation method.' : '某一期限国债的市场或模型收益率。比较时要对齐币种、日期、期限和计算口径。'}</p></article><article><span>03 / BORROWING</span><h3>{en ? 'Business borrowing cost' : '企业融资成本'}</h3><p>{en ? 'Actual quotes also reflect credit spread, collateral, fees and any FX hedge. Ask local lenders for terms.' : '实际融资还要加上信用利差、担保、手续费和汇率对冲成本，需要向当地银行询价。'}</p></article></div></section>

    <section className="economy-markets"><div className="economy-section-title"><div><span>{en ? 'OFFICIAL LOOKUP' : '官方数据入口'}</span><h2>{en ? 'Other markets to watch' : '观察其他市场'}</h2></div><p>{en ? 'Different markets publish different instruments. Open the source and verify the date and tenor before comparing.' : '不同市场发布的债券品种和期限并不完全相同。横向比较前，请核对原始数据的日期与口径。'}</p></div><div className="economy-market-list">{markets.map((market) => <div className="economy-market-row" key={market.code}><span>{market.code}</span><strong>{market[locale]}</strong><div><b>{rateByCode[market.code].value === '—' ? (en ? 'Exchange-rate framework' : '汇率政策框架') : rateByCode[market.code].value}</b><small>{rateByCode[market.code][locale]} · {rateByCode[market.code].date}</small></div><a href={market.url} target="_blank" rel="noopener noreferrer">{market[en ? 'bondEn' : 'bondZh']} <ArrowUpRight size={15}/></a></div>)}</div><p className="economy-markets-note">{en ? 'Policy figures above are dated snapshots, not live quotes. The link at right opens the official sovereign-security data; its rate may be from a different date.' : '上方政策利率为带日期的静态快照，并非实时值。右侧链接通往官方国债数据，日期可能不同；请勿直接相减作为利差。'}</p></section>
    <section className="economy-sources" id="economy-sources"><div className="economy-section-title"><div><span>{en ? 'SOURCE NOTES' : '数据口径'}</span><h2>{en ? 'Check the original figures' : '查看原始数据与日期'}</h2></div></div><div className="economy-source-list">{sovereignYields.map((item) => <div key={item.code}><span>{item.flag} {item[locale]} <small>{item.date}</small></span><p>{item[en ? 'detailEn' : 'detailZh']}</p><div className="economy-source-links"><a href={item.source} target="_blank" rel="noopener noreferrer">{item.secondSource ? (en ? '1Y source' : '1 年来源') : (en ? 'Official source' : '官方来源')} <ArrowUpRight size={14}/></a>{item.secondSource && <a href={item.secondSource} target="_blank" rel="noopener noreferrer">{en ? '10Y source' : '10 年来源'} <ArrowUpRight size={14}/></a>}</div></div>)}</div><p className="economy-method">{en ? 'Snapshots are for research and may be revised by the publisher. A sovereign yield is not an executable quote, deposit rate or business borrowing rate.' : '这些数值仅用于研究，发布机构可能修订。国债收益率不是可执行交易报价、存款利率或企业借款利率。'}</p></section>
    <footer className="economy-footer"><span>JIAJIA HEALTH / ECONOMIC OBSERVATORY</span><a href={`${base}${en ? '?lang=en' : ''}`}>{en ? 'Back to global strategy' : '返回全球战略主页'} <ArrowUpRight size={16}/></a></footer>
  </main>;
}
