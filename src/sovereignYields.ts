export type SovereignYield = {
  code: string;
  flag: string;
  zh: string;
  en: string;
  oneYear?: number;
  tenYear: number;
  date: string;
  source: string;
  secondSource?: string;
  detailZh: string;
  detailEn: string;
  comparable: boolean;
};

// Dated official snapshots. Instruments and calculation methods differ by market.
export const sovereignYields: SovereignYield[] = [
  { code: 'GB', flag: '🇬🇧', zh: '英国', en: 'United Kingdom', oneYear: 4.37, tenYear: 5.19, date: '2026-09-21', source: 'https://www.bankofengland.co.uk/statistics/yield-curves', detailZh: '英格兰银行名义即期收益率曲线；连续复利', detailEn: 'Bank of England nominal spot curve; continuous compounding', comparable: true },
  { code: 'US', flag: '🇺🇸', zh: '美国', en: 'United States', oneYear: 4.43, tenYear: 4.96, date: '2026-09-22', source: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202609&type=daily_treasury_yield_curve', detailZh: '美国财政部固定期限平价收益率', detailEn: 'U.S. Treasury constant-maturity par yields', comparable: true },
  { code: 'DE', flag: '🇩🇪', zh: '德国', en: 'Germany', oneYear: 2.98, tenYear: 3.45, date: '2026-09-21 / 22', source: 'https://www.deutsche-finanzagentur.de/bundeswertpapiere/factsheet/isin/DE000BU0E444', secondSource: 'https://www.deutsche-finanzagentur.de/bundeswertpapiere/factsheet/isin/DE000BU2Z072', detailZh: '1 年端：9 月 21 日 12 个月 Bubill 拍卖；10 年端：9 月 22 日基准联邦债市场收益率', detailEn: '1Y: Sep 21 twelve-month Bubill auction; 10Y: Sep 22 benchmark Bund market yield', comparable: false },
  { code: 'SG', flag: '🇸🇬', zh: '新加坡', en: 'Singapore', oneYear: 1.67, tenYear: 2.41, date: '2026-09-22', source: 'https://eservices.mas.gov.sg/Statistics/fdanet/SgsBenchmarkIssuePrices.aspx', detailZh: '金管局基准国库券与政府债；一级交易商买入报价', detailEn: 'MAS benchmark bill and bond; primary-dealer bid quotes', comparable: false },
  { code: 'JP', flag: '🇯🇵', zh: '日本', en: 'Japan', oneYear: 1.58, tenYear: 2.99, date: '2026-09-17', source: 'https://www.mof.go.jp/jgbs/reference/interest_rate/index.htm', detailZh: '日本财务省固定期限国债金利；页面当时最新可得日', detailEn: 'Japan MOF constant-maturity yields; latest available date at review', comparable: true },
  { code: 'CN', flag: '🇨🇳', zh: '中国', en: 'China', oneYear: 1.23, tenYear: 1.68, date: '2026-09-23', source: 'https://yield.chinabond.com.cn/cbweb-czb-web/czb/czbIndexGks', detailZh: '中国财政部国债收益率曲线', detailEn: 'China Ministry of Finance sovereign yield curve', comparable: true },
  { code: 'CH', flag: '🇨🇭', zh: '瑞士', en: 'Switzerland', tenYear: 0.56, date: '2026-09-22', source: 'https://www.snb.ch/en/the-snb/mandates-goals/statistics/statistics-pub/current_interest_exchange_rates', detailZh: '瑞士央行 10 年期联邦债即期利率；1 年期官方同口径数值待核对', detailEn: 'SNB 10-year Confederation spot rate; matching 1-year figure pending verification', comparable: false },
];
