import './listed-peers.css';

type Bi = { zh: string; en: string };
type Peer = {
  name: string;
  market: string;
  ticker: string;
  category: Bi;
  lesson: Bi;
  source: string;
};

const b = (zh: string, en: string): Bi => ({ zh, en });

// One listed operating reference per market. These are business-model research
// starting points, not claims of direct competition or investability.
const peers: Record<string, Peer> = {
  HK: { name: '京东健康 JD Health', market: 'HKEX', ticker: '6618', category: b('医药电商 / 平台', 'Digital pharmacy / platform'), lesson: b('研究平台流量、在线问诊与药品履约怎样衔接；核对处方药边界和持牌主体。', 'Study traffic, telehealth and pharmacy fulfilment together; check prescription and licensing boundaries.'), source: 'https://ir.jdhealth.com/en/ir_ann.php' },
  MY: { name: 'Duopharma Biotech', market: 'Bursa Malaysia', ticker: '7148', category: b('药品制造 / 供应', 'Pharma manufacturing / supply'), lesson: b('研究本地制造、清真认证和医院采购渠道；不是电商平台的直接对标。', 'Study local production, halal certification and hospital procurement; not a direct e-commerce peer.'), source: 'https://www.duopharmabiotech.com/investor-relations/' },
  US: { name: 'CVS Health', market: 'NYSE', ticker: 'CVS', category: b('连锁药房 / 医疗服务', 'Pharmacy retail / care'), lesson: b('研究门店、药事服务、保险和数字入口的联动；州级许可不能复制。', 'Study the link between stores, pharmacy services, insurance and digital access; state licences do not transfer.'), source: 'https://investors.cvshealth.com/overview/' },
  ID: { name: 'Kalbe Farma', market: 'IDX', ticker: 'KLBF', category: b('药品 / 分销', 'Pharma / distribution'), lesson: b('研究群岛市场的本地产品、分销网络和终端覆盖。', 'Study local products, distribution and last-mile reach across an archipelago.'), source: 'https://kalbe-id.listedcompany.com/' },
  MX: { name: 'Genomma Lab', market: 'BMV', ticker: 'LAB B', category: b('消费健康 / OTC', 'Consumer health / OTC'), lesson: b('研究非处方品牌、药房渠道与西语消费者营销。', 'Study OTC brands, pharmacy channels and Spanish-language consumer marketing.'), source: 'https://inversionistas.genommalab.com/en/investors/' },
  AE: { name: 'PureHealth', market: 'ADX', ticker: 'PUREHEALTH', category: b('医疗服务 / 集团', 'Care delivery / group'), lesson: b('研究医院、诊断、保险等业务的协同，以及不同酋长国的运营许可。', 'Study care, diagnostics and insurance integration alongside emirate-level operating permits.'), source: 'https://purehealth.ae/investor-relations/' },
  SG: { name: 'Raffles Medical Group', market: 'SGX', ticker: 'BSL', category: b('诊所 / 医院 / 区域服务', 'Clinics / hospitals / regional care'), lesson: b('研究诊所转诊、跨境患者服务和区域化管理。', 'Study clinic referrals, cross-border patient services and regional management.'), source: 'https://www.rafflesmedicalgroup.com.sg/investor-relations/' },
  TH: { name: 'Bangkok Dusit Medical Services', market: 'SET', ticker: 'BDMS', category: b('医院网络', 'Hospital network'), lesson: b('研究医院网络、医生资源和国际患者服务。', 'Study hospital networks, clinical talent and international-patient services.'), source: 'https://investor.bdms.co.th/en/' },
  SA: { name: 'Dr Sulaiman Al-Habib Medical Services', market: 'Tadawul', ticker: '4013', category: b('医院 / 医疗服务', 'Hospitals / care delivery'), lesson: b('研究医疗设施扩张、医护团队和支付方合作的节奏。', 'Study the sequencing of facility expansion, clinical teams and payer partnerships.'), source: 'https://hmg.com/ir/en/Pages/DisclosuresNews.aspx' },
  DE: { name: 'Redcare Pharmacy', market: 'Frankfurt', ticker: 'RDC', category: b('线上药房', 'Online pharmacy'), lesson: b('研究处方与非处方品类、药房履约及跨国网站合规；公司注册地在荷兰。', 'Study Rx / OTC mix, pharmacy fulfilment and cross-border site compliance; the company is incorporated in the Netherlands.'), source: 'https://ir.redcare-pharmacy.com/en/share-data' },
  FR: { name: 'Ramsay Santé', market: 'Euronext Paris', ticker: 'GDS', category: b('医院 / 门诊服务', 'Hospitals / outpatient care'), lesson: b('研究地区医疗设施配置、转诊和公私支付体系。', 'Study regional facilities, referrals and public-private reimbursement.'), source: 'https://www.ramsaysante.eu/finance-and-investors' },
  IT: { name: 'Recordati', market: 'Borsa Italiana', ticker: 'REC', category: b('药品 / 品牌组合', 'Pharma / portfolio'), lesson: b('研究本地产品组合与跨国药品商业化；不是药房零售对标。', 'Study local portfolios and international product commercialisation; not a pharmacy retailer.'), source: 'https://recordati.com/investors-presentations-and-reports/' },
  ES: { name: 'Grifols', market: 'BME', ticker: 'GRF', category: b('生物医药 / 供应链', 'Biopharma / supply chain'), lesson: b('研究受监管医药产品的制造与国际供应链；非电商模式。', 'Study regulated-product manufacturing and international supply chains; not an e-commerce model.'), source: 'https://www.grifols.com/en/investors' },
  NL: { name: 'Philips', market: 'Euronext Amsterdam', ticker: 'PHIA', category: b('医疗器械 / 数字健康', 'Medtech / digital health'), lesson: b('研究器械、医院客户与数字化服务的组合；区别于药品经营。', 'Study devices, hospital customers and digital services; distinct from medicine commerce.'), source: 'https://www.philips.com/a-w/about/investor-relations/stock' },
  CH: { name: 'Galenica', market: 'SIX', ticker: 'GALE', category: b('药房 / 医药批发', 'Pharmacies / wholesale'), lesson: b('研究药房网络、医药批发和社区健康服务的协同。', 'Study how pharmacy networks, wholesale and community care work together.'), source: 'https://www.galenica.com/en/investoren/' },
  PL: { name: 'NEUCA', market: 'Warsaw Stock Exchange', ticker: 'NEU', category: b('医药分销 / 药房服务', 'Pharma distribution / pharmacy services'), lesson: b('研究独立药房服务、B2B 分销及诊所延伸。', 'Study independent-pharmacy services, B2B distribution and clinic adjacencies.'), source: 'https://inwestor.neuca.pl/' },
  IE: { name: 'Uniphar', market: 'Euronext Growth Dublin / AIM', ticker: 'UPR', category: b('医药供应 / 商业服务', 'Pharma supply / commercial services'), lesson: b('研究药企服务、分销和国际商业化如何分层。', 'Study the layers between manufacturer services, distribution and international commercialisation.'), source: 'https://www.uniphar.ie/static/investors/results-centre/2025-results/' },
  SE: { name: 'Apotea', market: 'Nasdaq Stockholm', ticker: 'APOTEA', category: b('线上药房', 'Online pharmacy'), lesson: b('研究瑞典线上药房的用户体验、品类结构和配送效率。', 'Study Swedish e-pharmacy experience, assortment and fulfilment efficiency.'), source: 'https://ir.apotea.se/aktien' },
  JP: { name: 'MatsukiyoCocokara', market: 'Tokyo Stock Exchange', ticker: '3088', category: b('药妆 / 连锁零售', 'Drugstores / chain retail'), lesson: b('研究会员、门店密度与健康消费品组合。', 'Study loyalty, store density and consumer-health assortment.'), source: 'https://www.matsukiyococokara.com/en/ir/' },
  KR: { name: 'Samsung Biologics', market: 'KRX', ticker: '207940', category: b('生物药生产 / 供应', 'Biologics manufacturing / supply'), lesson: b('研究高标准制造和国际质量体系；不是药房或平台的直接对标。', 'Study high-standard manufacturing and global quality systems; not a direct pharmacy or platform peer.'), source: 'https://samsungbiologics.com/ir/overview' },
  PH: { name: 'Medilines Distributors', market: 'PSE', ticker: 'MEDIC', category: b('医疗设备分销', 'Medical-device distribution'), lesson: b('研究器械供应、医院采购和售后服务；先核 FDA 经营许可。', 'Study device sourcing, hospital procurement and after-sales service; check FDA operating licences.'), source: 'https://www.medilines.com.ph/company-disclosure/annual-reports' },
  AU: { name: 'Sigma Healthcare', market: 'ASX', ticker: 'SIG', category: b('药房网络 / 医药批发', 'Pharmacy network / wholesale'), lesson: b('研究药房加盟、批发配送与消费者入口的结合；注意合并后的业务口径。', 'Study pharmacy franchises, wholesale distribution and consumer access; note the post-merger reporting scope.'), source: 'https://investorcentre.sigmahealthcare.com.au/asx-announcements' },
  RU: { name: 'MD Medical Group', market: 'Moscow Exchange', ticker: 'MDMG', category: b('医院 / 门诊网络', 'Hospital / outpatient network'), lesson: b('仅用于研究医疗机构扩张；制裁、结算与物流可行性必须先由专业方核查。', 'Use only to study care-network expansion; specialists must first clear sanctions, settlement and logistics feasibility.'), source: 'https://www.moex.com/en/stocks/mdmg' },
  CA: { name: 'WELL Health Technologies', market: 'TSX', ticker: 'WELL', category: b('数字健康 / 诊所', 'Digital health / clinics'), lesson: b('研究诊所网络、电子病历和虚拟医疗的连接。', 'Study the connection between clinics, electronic records and virtual care.'), source: 'https://investors.well.company/' },
  GB: { name: 'Haleon', market: 'LSE', ticker: 'HLN', category: b('消费健康 / OTC', 'Consumer health / OTC'), lesson: b('研究自我保健品牌、药房渠道与消费者教育；非诊所或平台对标。', 'Study self-care brands, pharmacy distribution and consumer education; not a clinic or platform peer.'), source: 'https://www.haleon.com/investors/annual-report-2025' },
  BR: { name: 'RD Saúde', market: 'B3', ticker: 'RADL3', category: b('连锁药房 / 全渠道', 'Pharmacy chain / omnichannel'), lesson: b('研究门店覆盖、线上订单履约及药房会员服务。', 'Study store coverage, online-order fulfilment and pharmacy loyalty.'), source: 'https://ri.rdsaude.com.br/' },
};

export function ListedPeers({ code, locale }: { code: string; locale: 'zh' | 'en' }) {
  const peer = peers[code];
  if (!peer) return null;
  const isZh = locale === 'zh';
  return <section className="listed-peers" aria-label={isZh ? '上市公司对标' : 'Listed-company benchmarks'}>
    <div className="listed-peers-heading">
      <div><span className="listed-peers-kicker">{isZh ? '公开市场样本' : 'PUBLIC-MARKET REFERENCE'}</span><h3>{isZh ? '上市公司对标' : 'Listed-company benchmark'}</h3></div>
      <p>{isZh ? '看经营方法，不看股价。' : 'Compare operating models, not stock prices.'}</p>
    </div>
    <div className="listed-peers-row">
      <div className="listed-peers-identity"><strong>{peer.name}</strong><span>{peer.market} · {peer.ticker}</span></div>
      <div className="listed-peers-analysis"><span>{peer.category[locale]}</span><p>{peer.lesson[locale]}</p></div>
      <a href={peer.source} target="_blank" rel="noopener noreferrer">{isZh ? '官方资料 ↗' : 'Official source ↗'}</a>
    </div>
    <p className="listed-peers-note">{isZh ? '选取的是业务环节参照，不一定是当地直接竞争对手；上市地也不代表全部经营地区。牌照、合规和商业模式须单独核查。本页不是投资建议；上市状态与业务范围以官方最新披露为准。' : 'A business-model reference, not necessarily a direct local competitor. Listing venue does not define all operating markets. Verify licences, regulation and business model separately. Not investment advice; confirm current status with official disclosures.'}</p>
  </section>;
}
