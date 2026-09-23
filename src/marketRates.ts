export const rateByCode: Record<string, { zh: string; en: string; value: string; date: string; source: string }> = {
  HK: { zh: '金管局基本利率', en: 'HKMA Base Rate', value: '4.25%', date: '2026-09-17', source: 'https://www.info.gov.hk/gia/general/202609/17/P2026091700133p.htm' },
  MY: { zh: '隔夜政策利率 OPR', en: 'Overnight Policy Rate', value: '2.75%', date: '2026-09-03', source: 'https://www.bnm.gov.my/monetary-stability' },
  US: { zh: '联邦基金目标区间', en: 'Fed funds target range', value: '3.75%–4.00%', date: '2026-09-17', source: 'https://www.federalreserve.gov/monetarypolicy/openmarket.htm' },
  ID: { zh: '印尼央行 BI-Rate', en: 'Bank Indonesia BI-Rate', value: '5.75%', date: '2026-08-19', source: 'https://www.bi.go.id/en/statistik/indikator/BI-Rate.aspx' },
  MX: { zh: '隔夜银行间目标利率', en: 'Overnight interbank target', value: '6.50%', date: '2026-09-23', source: 'https://www.banxico.org.mx/tipcamb/llenarTasasInteresAction.do?idioma=en&usarCache=false' },
  AE: { zh: '央行隔夜存款基准利率', en: 'CBUAE overnight deposit base rate', value: '3.90%', date: '2026-09-17', source: 'https://www.wam.ae/en/article/c29xz9m-cbuae-raises-the-base-rate-basis-points' },
  SG: { zh: '无单一政策利率；参考 SORA', en: 'No single policy rate; see SORA', value: '—', date: '2026-09-23', source: 'https://eservices.mas.gov.sg/Statistics/dir/DomesticInterestRates.aspx' },
  TH: { zh: '央行政策利率', en: 'BOT policy rate', value: '1.00%', date: '2026-08-26', source: 'https://www.bot.or.th/en/news-and-media/news/mpc/news-20260826-KsecaE98.html' },
  SA: { zh: '央行回购利率', en: 'SAMA repo rate', value: '4.50%', date: '2026-09-16', source: 'https://www.sama.gov.sa/en-us/MediaCenter/News/Pages/news-1169.aspx' },
  DE: { zh: '欧洲央行存款便利利率', en: 'ECB deposit facility rate', value: '2.50%', date: '2026-09-16', source: 'https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.mp260910~314e508016.en.html' },
};
