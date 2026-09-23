export type MacroCountry = {
  code: string;
  flag: string;
  zh: string;
  en: string;
  fiscalBalance: number;
  grossDebt: number;
  currentAccount: number;
  interestRevenue?: { value: number; year: number };
  reservesShortDebt?: { value: number; year: number };
};

// IMF DataMapper, World Economic Outlook (April 2026), 2025 observation/estimate.
// Fiscal balance = GGXCNL_NGDP; gross debt = GGXWDG_NGDP;
// current account = BCA_NGDPD. All are percentages of GDP.
// Interest/revenue: World Bank WDI GC.XPN.INTP.RV.ZS, latest useful observation.
// China's reserve coverage: 100 / WDI DT.DOD.DSTC.IR.ZS (2024). WDI reserves include gold;
// short-term external debt is based on original maturity, so this is not a residual-maturity liquidity measure.
export const macroCountries: MacroCountry[] = [
  { code: 'GB', flag: '🇬🇧', zh: '英国', en: 'United Kingdom', fiscalBalance: -5.4, grossDebt: 102.3, currentAccount: -3.1, interestRevenue: { value: 8.3, year: 2024 } },
  { code: 'US', flag: '🇺🇸', zh: '美国', en: 'United States', fiscalBalance: -6.8, grossDebt: 123.9, currentAccount: -3.6, interestRevenue: { value: 20.3, year: 2024 } },
  { code: 'DE', flag: '🇩🇪', zh: '德国', en: 'Germany', fiscalBalance: -2.7, grossDebt: 62.9, currentAccount: 4.4, interestRevenue: { value: 2.5, year: 2024 } },
  { code: 'SG', flag: '🇸🇬', zh: '新加坡', en: 'Singapore', fiscalBalance: 4.2, grossDebt: 171.3, currentAccount: 16.7, interestRevenue: { value: 0.5, year: 2024 } },
  { code: 'JP', flag: '🇯🇵', zh: '日本', en: 'Japan', fiscalBalance: -1.1, grossDebt: 206.5, currentAccount: 4.8 },
  { code: 'CN', flag: '🇨🇳', zh: '中国', en: 'China', fiscalBalance: -7.9, grossDebt: 99.2, currentAccount: 3.7, reservesShortDebt: { value: 2.65, year: 2024 } },
  { code: 'CH', flag: '🇨🇭', zh: '瑞士', en: 'Switzerland', fiscalBalance: 0.5, grossDebt: 39.4, currentAccount: 7.1, interestRevenue: { value: 0.9, year: 2024 } },
];

export const macroSources = {
  fiscal: 'https://www.imf.org/external/datamapper/GGXCNL_NGDP@WEO',
  debt: 'https://www.imf.org/external/datamapper/GGXWDG_NGDP@WEO',
  current: 'https://www.imf.org/external/datamapper/BCA_NGDPD@WEO',
  interest: 'https://data.worldbank.org/indicator/GC.XPN.INTP.RV.ZS',
  reserves: 'https://data.worldbank.org/indicator/DT.DOD.DSTC.IR.ZS',
  currency: 'https://dsbb.imf.org/sdds-plus/EXT-specification',
};
