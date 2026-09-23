import { ArrowUpRight } from 'lucide-react';

type Locale = 'zh' | 'en';

const checks = [
  { n: '01', zh: '定义', en: 'Definition', zhText: '“政府债务”是中央政府、一般政府，还是整个公共部门？', enText: 'Does government debt cover central government, general government or the public sector?' },
  { n: '02', zh: '覆盖', en: 'Coverage', zhText: '地方平台、国企、担保和银行救助责任是否在边界内？', enText: 'Are local vehicles, state firms, guarantees and bank rescues inside the boundary?' },
  { n: '03', zh: '方法', en: 'Method', zhText: '按现金制还是权责发生制？是直接记录、抽样，还是模型估计？', enText: 'Cash or accrual? Direct record, survey or model estimate?' },
  { n: '04', zh: '修订', en: 'Revision', zhText: '初值、修订值和基准调整是否清楚标记？', enText: 'Are first releases, revisions and benchmark changes marked?' },
  { n: '05', zh: '交叉验证', en: 'Cross-check', zhText: '税收、贸易、就业与资产负债表等独立序列是否相互支持？', enText: 'Do independent tax, trade, employment and balance-sheet series support the picture?' },
];

export function DataQuality({ locale }: { locale: Locale }) {
  const en = locale === 'en';
  return <section className="macro-quality" id="data-quality" aria-labelledby="quality-heading">
    <div className="economy-section-title"><div><span>{en ? 'READ THE DATA' : '如何判断数字'}</span><h2 id="quality-heading">{en ? 'A number needs its footnotes' : '数字之外，还要看数据说明'}</h2></div><p>{en ? 'Official statistics are documented estimates or records. Their definitions and revisions determine what they can tell us.' : '官方数据可能是账本记录，也可能是统计估计。它能说明什么，取决于定义、覆盖范围和修订方式。'}</p></div>
    <div className="macro-quality-types"><div><span>{en ? 'DIRECT RECORD' : '直接记录'}</span><strong>{en ? 'Rates · issuance' : '政策利率 · 国债发行'}</strong><p>{en ? 'Usually observable directly; still check the instrument and boundary.' : '通常可以直接观察，仍须核对工具与统计边界。'}</p></div><div><span>{en ? 'ACCOUNTING RECORD' : '账本记录'}</span><strong>{en ? 'Reserves · formal debt' : '外汇储备 · 正式债务'}</strong><p>{en ? 'The headline can be correct while usable liquidity or contingent debt differs.' : '总额可能准确，可动用资金与或有负债仍需另查。'}</p></div><div><span>{en ? 'STATISTICAL ESTIMATE' : '统计估计'}</span><strong>{en ? 'GDP · CPI · current account' : 'GDP · CPI · 经常账户'}</strong><p>{en ? 'Surveys and models are revised as better information arrives.' : '使用调查和模型，取得更多信息后可能修订。'}</p></div></div>
    <div className="macro-quality-checks"><h3>{en ? 'Five questions for every comparison' : '跨国比较前，问五个问题'}</h3><ol>{checks.map((item) => <li key={item.n}><span>{item.n}</span><strong>{item[locale]}</strong><p>{en ? item.enText : item.zhText}</p></li>)}</ol></div>
    <p className="macro-quality-footer">{en ? 'The six-number panel above includes source links, definitions, observation years, frequency and coverage notes. A missing or methodologically incompatible value stays blank. Revisions and source methodology should be checked at the publisher before any decision.' : '上方六项指标附有来源、定义、观察年份、频率和口径说明；缺失或不够可比的数值留空。做决策前，应回到发布机构查看修订历史与完整方法。'} <a href="https://unstats.un.org/fpos/" target="_blank" rel="noopener noreferrer">UN Statistics <ArrowUpRight size={14}/></a> <a href="https://dsbb.imf.org/sdds/statistical-methodology" target="_blank" rel="noopener noreferrer">IMF SDDS <ArrowUpRight size={14}/></a></p>
  </section>;
}
