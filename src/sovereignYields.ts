export const summaryTenors = ['1Y', '2Y', '5Y', '10Y', '30Y'] as const;
export const allTenors = ['3M', '6M', '1Y', '2Y', '3Y', '5Y', '7Y', '10Y', '15Y', '20Y', '30Y', '40Y', '50Y'] as const;
export type Tenor = typeof allTenors[number];
export type SovereignYield = {
  code: string;
  flag: string;
  zh: string;
  en: string;
  date: string;
  values: Partial<Record<Tenor, number>>;
  source: string;
  secondSource?: string;
  detailZh: string;
  detailEn: string;
  spreads: boolean;
};

// Official, dated snapshots. Rates, dates and curve construction are not harmonised across markets.
export const sovereignYields: SovereignYield[] = [
  { code: 'GB', flag: '🇬🇧', zh: '英国', en: 'United Kingdom', date: '2026-09-22', values: { '6M': 4.16, '1Y': 4.38, '2Y': 4.57, '3Y': 4.66, '5Y': 4.79, '7Y': 4.95, '10Y': 5.21, '15Y': 5.58, '20Y': 5.77, '30Y': 5.77, '40Y': 5.39 }, source: 'https://www.bankofengland.co.uk/statistics/yield-curves', detailZh: '英格兰银行名义即期零息曲线，连续复利；下载当月数据，取 9 月 22 日。', detailEn: 'Bank of England nominal zero-coupon spot curve, continuously compounded; September 22 observation in the monthly download.', spreads: true },
  { code: 'US', flag: '🇺🇸', zh: '美国', en: 'United States', date: '2026-09-23', values: { '3M': 4.19, '6M': 4.31, '1Y': 4.49, '2Y': 4.85, '3Y': 4.97, '5Y': 4.99, '7Y': 5.05, '10Y': 5.11, '20Y': 5.45, '30Y': 5.40 }, source: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202609&type=daily_treasury_yield_curve', detailZh: '美国财政部每日固定期限平价收益率曲线。', detailEn: 'U.S. Treasury daily constant-maturity par yield curve.', spreads: true },
  { code: 'CA', flag: '🇨🇦', zh: '加拿大', en: 'Canada', date: '2026-09-22', values: { '1Y': 2.97, '2Y': 3.25, '3Y': 3.34, '5Y': 3.54, '7Y': 3.62, '10Y': 3.83 }, source: 'https://www.bankofcanada.ca/rates/interest-rates/canadian-bonds/', secondSource: 'https://www.bankofcanada.ca/rates/interest-rates/t-bill-yields/', detailZh: '2–10 年为加拿大央行基准债收益率；1 年为同日国库券收益率。官方另列「长期债」4.15%，但不是精确的 30 年点。', detailEn: '2–10Y are Bank of Canada benchmark bonds; 1Y is a same-date treasury bill. The separate long-term bond quote of 4.15% is not an exact 30Y point.', spreads: false },
  { code: 'DE', flag: '🇩🇪', zh: '德国', en: 'Germany', date: '2026-09-21 / 22', values: { '1Y': 2.98, '10Y': 3.45 }, source: 'https://www.deutsche-finanzagentur.de/bundeswertpapiere/factsheet/isin/DE000BU0E444', secondSource: 'https://www.deutsche-finanzagentur.de/bundeswertpapiere/factsheet/isin/DE000BU2Z072', detailZh: '1 年为 9 月 21 日 Bubill 拍卖收益率；10 年为 9 月 22 日基准联邦债市场收益率，日期与品种不同。', detailEn: '1Y is the September 21 Bubill auction yield; 10Y is the September 22 benchmark Bund market yield. Dates and instruments differ.', spreads: false },
  { code: 'EA', flag: '🇪🇺', zh: '欧元区 AAA', en: 'Euro area AAA', date: '2026-09-22', values: { '1Y': 2.97, '2Y': 3.14, '3Y': 3.17, '5Y': 3.22, '7Y': 3.30, '10Y': 3.45, '15Y': 3.65, '20Y': 3.74, '30Y': 3.72 }, source: 'https://www.ecb.europa.eu/stats/financial_markets_and_interest_rates/euro_area_yield_curves/html/index.en.html', detailZh: '欧洲央行欧元区 AAA 评级政府债名义即期零息曲线，连续复利；这是区域参考值，并非德国国债。', detailEn: 'ECB euro area AAA-rated government nominal zero-coupon spot curve, continuously compounded. A regional reference, not German bonds.', spreads: true },
  { code: 'SG', flag: '🇸🇬', zh: '新加坡', en: 'Singapore', date: '2026-09-23', values: { '6M': 1.68, '1Y': 1.67, '2Y': 1.87, '5Y': 2.13, '10Y': 2.40, '15Y': 2.42, '20Y': 2.38, '30Y': 2.44, '50Y': 2.64 }, source: 'https://eservices.mas.gov.sg/Statistics/fdanet/SgsBenchmarkIssuePrices.aspx', detailZh: '新加坡金管局基准发行价格表；短端为国库券，长端为政府债，均为一级交易商买入报价。', detailEn: 'MAS benchmark issue prices: bills at the short end and government bonds at the long end, using primary-dealer bid quotes.', spreads: false },
  { code: 'JP', flag: '🇯🇵', zh: '日本', en: 'Japan', date: '2026-09-18', values: { '1Y': 1.58, '2Y': 1.85, '3Y': 1.98, '5Y': 2.31, '7Y': 2.54, '10Y': 2.98, '15Y': 3.52, '20Y': 3.81, '30Y': 4.04, '40Y': 4.03 }, source: 'https://www.mof.go.jp/jgbs/reference/interest_rate/jgbcm.csv', detailZh: '日本财务省固定期限国债收益率；9 月 18 日为查阅时官方 CSV 最近数据。', detailEn: 'Japan MOF constant-maturity JGB yields; September 18 was the latest observation in the official CSV at review.', spreads: true },
  { code: 'CN', flag: '🇨🇳', zh: '中国', en: 'China', date: '2026-09-23', values: { '3M': 1.19, '6M': 1.20, '1Y': 1.23, '2Y': 1.27, '3Y': 1.29, '5Y': 1.41, '7Y': 1.50, '10Y': 1.68, '30Y': 2.11 }, source: 'https://yield.chinabond.com.cn/cbweb-czb-web/czb/czbIndexGks', detailZh: '中国财政部国债收益率曲线，由中债估值展示。', detailEn: 'China Ministry of Finance sovereign yield curve displayed by ChinaBond.', spreads: true },
  { code: 'CH', flag: '🇨🇭', zh: '瑞士', en: 'Switzerland', date: '2026-09-22', values: { '10Y': 0.56 }, source: 'https://www.snb.ch/en/the-snb/mandates-goals/statistics/statistics-pub/current_interest_exchange_rates', detailZh: '瑞士央行 10 年期联邦债即期利率；其他期限在核实同日期官方数据前留空。', detailEn: 'SNB 10-year Confederation spot rate; other maturities remain blank pending matching official observations.', spreads: false },
];
