import { ArrowUpRight, Building2, MonitorSmartphone, ShieldCheck } from 'lucide-react';

const sourceLinks = [
  { zh: '香港药物办公室', en: 'Hong Kong Drug Office', url: 'https://www.drugoffice.gov.hk/eps/do/en/consumer/consumer_safety_advisories/Be_Caution_when_Buying_Medicines_on_Internet.html' },
  { zh: '美国 FDA', en: 'US FDA', url: 'https://www.fda.gov/consumers/consumer-updates/how-buy-medicines-safely-online-pharmacy' },
  { zh: '新加坡 HSA', en: 'Singapore HSA', url: 'https://www.hsa.gov.sg/other-regulations/retail-pharmacy-licence/supply-of-registered-therapeutic-products-through-e-pharmacy/' },
  { zh: '马来西亚卫生部', en: 'Malaysia MOH', url: 'https://pharmacy.moh.gov.my/en/content/tips-how-buy-medicines-online.html' },
  { zh: '欧盟药品线上销售', en: 'EU online medicine sales', url: 'https://www.ema.europa.eu/en/human-regulatory-overview/public-health-threats/falsified-medicines-overview/buying-medicines-online' },
];

const copy = {
  zh: {
    kicker: '线下药店 × 线上平台',
    heading: '开店前，先把经营边界画清楚。',
    intro: '药品、保健品、医疗器械与课程的准入规则不同；线下许可也不会自动变成线上售药许可。每进入一个地区，先核对产品分类、经营主体和履约路径。',
    offline: '开线下药店',
    online: '建线上平台网站',
    offlineSteps: [
      ['主体与选址', '明确由谁持牌、谁进货和开票；核查门店用途、选址限制、租约及地方主管机关。'],
      ['牌照与药师', '确认药房／零售药品许可、负责人和执业药师要求；开业前完成现场检查。'],
      ['商品准入', '按处方药、非处方药、保健品和器械分开建档；逐一核对本地注册、进口及标签语言。'],
      ['质量与库存', '建立合法采购、批号与效期追溯、温湿度记录、冷链、退货及召回流程。'],
      ['处方与服务', '明确处方审核、调剂、用药咨询、不良事件上报和患者资料保存责任。'],
      ['经营测算', '把租金、人力、保险、税、库存周转和政策利率纳入测算；实际融资成本向银行询价。'],
    ],
    onlineSteps: [
      ['网站角色', '先区分资讯展示、B2B 询盘、第三方平台和自营售药；不同模式对应不同主体与许可。'],
      ['线上售药许可', '核实当地是否允许该药品类别线上销售，是否要求持牌实体药房、网站登记或官方标识。'],
      ['处方与药师', '若允许销售处方药，建立真实处方验证、药师复核、咨询和留痕；禁止绕过适用的处方要求。'],
      ['商家与商品审核', '验证商家牌照、药品注册号、来源及有效期；上线前审核商品描述和疗效广告。'],
      ['支付与交付', '写明价格、税、配送范围、退货与客服；核查支付机构、跨境进口、包装、冷链和交付签收。'],
      ['隐私与安全', '健康资料按敏感数据管理，设置权限、加密、同意、留存、删除与事件响应机制。'],
    ],
    warningTitle: '四个市场的关键差异',
    warnings: [
      ['中国香港', '官方目前未授权持牌商户在网上零售受管制药物；线下持牌与药品注册要求仍适用。'],
      ['马来西亚', '卫生部提示处方药不得经互联网销售；先核品类，再设计线上交易。'],
      ['美国', '网上药房应核对收货州药房牌照，并要求有效处方和可联系的持牌药师。'],
      ['新加坡／欧盟', '新加坡电子药房需符合 HSA 专项条件；欧盟合法线上药房需可核验的统一标识及国家登记。'],
    ],
    sources: '官方资料',
    caveat: '这是进入市场前的工作清单。具体可售品类、许可、税负和数据要求应以当地主管机关的现行规则及专业审查为准。',
  },
  en: {
    kicker: 'PHYSICAL PHARMACY × DIGITAL PLATFORM',
    heading: 'Define the operating boundary before launch.',
    intro: 'Medicines, supplements, devices and courses follow different rules. A physical pharmacy licence does not automatically permit online medicine sales. Review product classification, legal entity and fulfilment route in each market.',
    offline: 'Open a physical pharmacy',
    online: 'Build an online platform',
    offlineSteps: [
      ['Entity & premises', 'Identify the licence holder, buyer of record and invoice issuer; check premises use, location rules, lease and local authority.'],
      ['Licence & pharmacist', 'Confirm retail pharmacy permits, responsible person and practising pharmacist requirements; complete pre-opening inspections.'],
      ['Product eligibility', 'Separate prescription drugs, OTC products, supplements and devices; check local registration, import rights and labelling.'],
      ['Quality & stock', 'Set up authorised procurement, batch and expiry traceability, temperature controls, cold chain, returns and recalls.'],
      ['Prescriptions & care', 'Assign responsibility for prescription review, dispensing, counselling, adverse-event reports and patient records.'],
      ['Unit economics', 'Model rent, staff, insurance, tax, stock turns and benchmark rates; request actual borrowing quotes from banks.'],
    ],
    onlineSteps: [
      ['Platform role', 'Separate information, B2B inquiries, third-party marketplace and direct medicine retail; each model may need different approvals.'],
      ['Online authority', 'Check which products may be sold online and whether a licensed physical pharmacy, website registration or official logo is required.'],
      ['Prescription & pharmacist', 'Where prescription sales are allowed, verify prescriptions, pharmacist review, counselling and audit trails.'],
      ['Merchant & listing checks', 'Verify seller permits, product registrations, provenance and expiry; review claims and advertisements before listing.'],
      ['Payment & delivery', 'Show prices, tax, delivery scope, returns and support; check payments, imports, packaging, cold chain and handover.'],
      ['Privacy & security', 'Protect health information with access control, encryption, consent, retention, deletion and incident response.'],
    ],
    warningTitle: 'Market-specific checks',
    warnings: [
      ['Hong Kong, China', 'Authorities have not authorised licensees to retail controlled medicines online; premises licensing and product registration still apply.'],
      ['Malaysia', 'The health ministry says prescription medicines must not be sold over the internet; classify products before designing checkout.'],
      ['United States', 'Verify the pharmacy licence in the destination state, valid prescriptions and access to a licensed pharmacist.'],
      ['Singapore / EU', 'Singapore e-pharmacies need HSA approval and safeguards; EU online retailers use a verifiable common logo and national register.'],
    ],
    sources: 'Official guidance',
    caveat: 'A pre-launch worklist. Confirm permitted products, licences, tax and privacy duties against current local rules and qualified professional review.',
  },
};

export function PharmacyLaunchGuide({ locale }: { locale: 'zh' | 'en' }) {
  const t = copy[locale];
  return <section className="pharmacy-guide" id="pharmacy-guide">
    <div className="pharmacy-heading"><div className="section-kicker">{t.kicker}</div><h2>{t.heading}</h2><p>{t.intro}</p></div>
    <div className="pharmacy-tracks">
      <article><div className="pharmacy-track-title"><Building2 size={29}/><h3>{t.offline}</h3><span>01</span></div><ol>{t.offlineSteps.map(([title, detail]) => <li key={title}><b>{title}</b><p>{detail}</p></li>)}</ol></article>
      <article><div className="pharmacy-track-title"><MonitorSmartphone size={29}/><h3>{t.online}</h3><span>02</span></div><ol>{t.onlineSteps.map(([title, detail]) => <li key={title}><b>{title}</b><p>{detail}</p></li>)}</ol></article>
    </div>
    <div className="pharmacy-alert"><div><ShieldCheck size={22}/><h3>{t.warningTitle}</h3></div><div className="pharmacy-alert-grid">{t.warnings.map(([title, detail]) => <p key={title}><b>{title}</b>{detail}</p>)}</div></div>
    <div className="pharmacy-sources"><span>{t.sources}</span>{sourceLinks.map((s) => <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">{s[locale]} <ArrowUpRight size={14}/></a>)}</div>
    <p className="pharmacy-caveat">{t.caveat}</p>
  </section>;
}
