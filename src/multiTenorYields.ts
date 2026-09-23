// Official dated snapshots. Curves use different methods across countries.
export const multiTenorYields = [
  { code: 'US', flag: '🇺🇸', zh: '美国', en: 'United States', date: '2026-09-22', methodZh: '财政部固定期限平价收益率', methodEn: 'Treasury constant-maturity par yields', yields: [4.43, 4.71, 4.83, 4.96, 5.29], source: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202609&type=daily_treasury_yield_curve' },
  { code: 'JP', flag: '🇯🇵', zh: '日本', en: 'Japan', date: '2026-09-17', methodZh: '财务省固定期限国债金利', methodEn: 'MOF constant-maturity yields', yields: [1.58, 1.87, 2.32, 2.99, 4.05], source: 'https://www.mof.go.jp/jgbs/reference/interest_rate/jgbcm.csv' },
  { code: 'CN', flag: '🇨🇳', zh: '中国', en: 'China', date: '2026-09-23', methodZh: '财政部国债收益率曲线', methodEn: 'MOF sovereign yield curve', yields: [1.23, 1.27, 1.41, 1.68, 2.11], source: 'https://yield.chinabond.com.cn/cbweb-czb-web/czb/czbIndexGks' },
  { code: 'SG', flag: '🇸🇬', zh: '新加坡', en: 'Singapore', date: '2026-09-22', methodZh: '金管局基准国库券与债券报价', methodEn: 'MAS benchmark bill and bond quotes', yields: [1.67, 1.87, 2.14, 2.41, 2.44], source: 'https://eservices.mas.gov.sg/Statistics/fdanet/SgsBenchmarkIssuePrices.aspx' },
];
