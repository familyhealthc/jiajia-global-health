import { europeanIntelligence } from './europeMarkets';

type Bi = { zh: string; en: string };
type Intelligence = {
  community?: { value: Bi; basis: Bi; source: string };
  trade: Bi;
  tradeSource: string;
  device: Bi;
  pharmacy: Bi;
  clinic: Bi;
  hospital: Bi;
  regulator: string;
  regulatorName: string;
  assessment: Bi;
  business: Bi;
};

const b = (zh: string, en: string): Bi => ({ zh, en });
const rcep = 'https://www.mti.gov.sg/trade-international-economic-relations/agreements/free-trade-agreements-fta/rcep/';
const rcepTrade = b('与中国同为 RCEP 成员；关税便利不替代药械准入。', 'RCEP membership with China supports trade, but does not replace health-product approval.');

const data: Record<string, Intelligence> = {
  HK: {
    community: { value: b('91.6%', '91.6%'), basis: b('2021 人口普查：华裔人口占比', '2021 Census: ethnic Chinese share'), source: 'https://www.censtatd.gov.hk/en/data/stat_report/product/B1120109/att/B11201092021XXXXB0100.pdf' },
    trade: b('中国特别行政区；以香港公司作为国际投资与合作中枢，内地往来可核 CEPA 规则。', 'China SAR; use the Hong Kong company as the international hub and assess CEPA for mainland trade.'), tradeSource: 'https://www.tid.gov.hk/en/our_work/cepa/overview.html',
    device: b('先核医疗器械行政管理制度及具体产品分类。', 'Check the medical-device administrative system and product class.'), pharmacy: b('药店须按药商牌照经营；网上售药不可套用普通网店规则。', 'Drug traders need licences; online medicine supply is not ordinary e-commerce.'), clinic: b('私营诊所按设施类别及专业人员资格核验。', 'Check private-clinic facility category and practitioner registration.'), hospital: b('私家医院按《私营医疗机构条例》独立审批。', 'Private hospitals require separate approval under the Private Healthcare Facilities Ordinance.'), regulator: 'https://www.orphf.gov.hk/', regulatorName: '香港卫生署 / ORPHF',
    assessment: b('多条许可线，但总部与国际合作路径清晰。', 'Several licence tracks; headquarters and international partnership path is clear.'), business: b('优势是国际金融、普通法及港口体系；经营实体、医药牌照和跨境数据仍需分开设计。', 'Finance, common law and port access help; entity, healthcare licences and cross-border data remain separate workstreams.'),
  },
  MY: {
    community: { value: b('22.1%', '22.1%'), basis: b('2026 年第一季度统计局族裔结构口径；非跨国统一口径', 'Q1 2026 official ethnic composition; not a harmonised cross-country measure'), source: 'https://www.dosm.gov.my/portal-main/release-content/demographic-statistic-malaysia-q12026' },
    trade: rcepTrade, tradeSource: rcep,
    device: b('医疗器械按 MDA 分类、注册与经营许可核查。', 'Check MDA device classification, registration and establishment licensing.'), pharmacy: b('药品线上销售限制较严；先找持牌药房核对可售品类。', 'Online medicine sales are restricted; verify permitted categories with a licensed pharmacy.'), clinic: b('私营诊所另按卫生部设施许可核查。', 'Private clinics need a separate Ministry of Health facility review.'), hospital: b('私立医院另按设施、人员和服务范围申请。', 'Private hospitals need separate facility, staffing and service-scope review.'), regulator: 'https://pharmacy.moh.gov.my/en/content/tips-how-buy-medicines-online.html', regulatorName: '马来西亚卫生部',
    assessment: b('中高：药品渠道与医疗设施需本地持牌安排。', 'Medium–high: medicine channels and care facilities need licensed local arrangements.'), business: b('多语言与区域供应链有利；主体准入、清真要求和东马履约需按品类核实。', 'Multilingual demand and regional supply help; check entity rules, halal requirements and East Malaysia fulfilment by category.'),
  },
  US: {
    trade: b('中美贸易规模大，但关税、出口管制及州法须逐品类核查。', 'Large bilateral trade, but tariffs, export controls and state laws require product-by-product review.'), tradeSource: 'https://www.trade.gov/china-market-overview',
    device: b('FDA 分类、上市路径及进口责任独立核查。', 'FDA classification, marketing pathway and import duties require separate review.'), pharmacy: b('网上药房须符合州许可、处方及药师要求。', 'Online pharmacies need state licences, valid prescriptions and pharmacist access.'), clinic: b('诊所设立与医师执业按州审批。', 'Clinic premises and professional practice are state-regulated.'), hospital: b('医院另涉州许可、认证及支付方准入。', 'Hospitals need separate state licensing, accreditation and payer review.'), regulator: 'https://www.fda.gov/consumers/consumer-updates/how-buy-medicines-safely-online-pharmacy', regulatorName: '美国 FDA',
    assessment: b('高：联邦产品监管与各州营业许可并行。', 'High: federal product rules and state operating licences run in parallel.'), business: b('市场与融资深度高，但州际税务、诉讼、保险和数据隐私成本需预留。', 'Deep market and capital pool; budget for state taxes, liability, insurance and privacy.'),
  },
  ID: {
    trade: rcepTrade, tradeSource: rcep,
    device: b('按卫生部器械注册与本地分销许可核查。', 'Check Ministry of Health device registration and local distribution licensing.'), pharmacy: b('药店及线上药品销售需本地许可和平台规则。', 'Pharmacy and online medicine supply require local permits and platform rules.'), clinic: b('诊所需当地医疗设施与专业人员审批。', 'Clinics need local facility and professional approvals.'), hospital: b('医院设立与外资条件需单独尽调。', 'Hospital establishment and foreign-investment conditions need separate due diligence.'), regulator: 'https://regalkes.kemkes.go.id/', regulatorName: '印尼卫生部',
    assessment: b('高：本地化、产品注册和群岛履约叠加。', 'High: localisation, product registration and archipelago delivery compound.'), business: b('人口规模大；外资主体、印尼语标签和跨岛物流是执行重点。', 'Large population; foreign entity rules, Indonesian labelling and inter-island logistics are key.'),
  },
  MX: {
    trade: b('中国供应链与墨西哥制造市场可对接；关税、原产地和卫生许可不能沿用美国规则。', 'China supply links are relevant; tariffs, origin and health permits cannot be copied from US rules.'), tradeSource: 'https://www.gob.mx/cofepris',
    device: b('按 COFEPRIS 器械分类与注册路径核查。', 'Check COFEPRIS device classification and registration.'), pharmacy: b('药房与线上售药须核卫生许可及药品类别。', 'Check health permits and medicine category for pharmacies and online supply.'), clinic: b('诊所按当地卫生及人员要求核查。', 'Check local health and professional rules for clinics.'), hospital: b('医院建设与运营另需设施审批。', 'Hospitals require a separate facility authorisation path.'), regulator: 'https://www.gob.mx/cofepris', regulatorName: '墨西哥 COFEPRIS',
    assessment: b('中高：西语资料、注册与州际执行需要本地团队。', 'Medium–high: Spanish dossiers, approvals and state execution need local capacity.'), business: b('可借近岸市场需求，但安全、税务及州际履约差异必须建模。', 'Nearshoring demand helps; model security, tax and state-to-state fulfilment.'),
  },
  AE: {
    trade: b('可作为中东—中国供应链合作节点；具体贸易待遇与药械许可逐项核查。', 'A potential China–Middle East supply node; verify trade terms and health-product permits separately.'), tradeSource: 'https://www.moet.gov.ae/',
    device: b('按联邦及具体酋长国的注册和进口要求核查。', 'Check federal and emirate-level registration and import rules.'), pharmacy: b('药店及电商药品销售需要专业与场所许可。', 'Pharmacies and online medicine sales require professional and premises approval.'), clinic: b('诊所另核所在地卫生主管部门许可。', 'Check the local health authority for clinic licensing.'), hospital: b('医院另核设施、人员和服务项目审批。', 'Hospitals need separate premises, staff and service approvals.'), regulator: 'https://mohap.gov.ae/', regulatorName: '阿联酋 MOHAP',
    assessment: b('中高：联邦与酋长国规则并行。', 'Medium–high: federal and emirate-level rules overlap.'), business: b('国际资本与物流连接便利；需区分自由区、境内经营和医疗监管辖区。', 'Capital and logistics links are strong; distinguish free zones, mainland activity and health-regulator jurisdiction.'),
  },
  SG: {
    community: { value: b('73.9%', '73.9%'), basis: b('2025：常住居民中的华裔占比', '2025: ethnic Chinese share of residents'), source: 'https://www.singstat.gov.sg/-/media/files/publications/population/population2025.ashx' },
    trade: rcepTrade, tradeSource: rcep,
    device: b('医疗器械按 HSA 风险等级注册或豁免核查。', 'Check HSA risk-based device registration or exemption.'), pharmacy: b('电子药房需要 HSA 规定的持牌药房及线上供应安排。', 'E-pharmacy requires an HSA-compliant licensed pharmacy and online supply arrangement.'), clinic: b('诊所按医疗服务许可与人员注册核查。', 'Clinics need healthcare-service licensing and registered professionals.'), hospital: b('医院服务范围及设施另行许可。', 'Hospitals require separate service-scope and premises licensing.'), regulator: 'https://www.hsa.gov.sg/other-regulations/retail-pharmacy-licence/supply-of-registered-therapeutic-products-through-e-pharmacy/', regulatorName: '新加坡 HSA',
    assessment: b('高标准但规则清晰；适合先做区域合作。', 'Demanding but clear rules; regional partnerships can come first.'), business: b('国际营商与语言环境便利；成本高，药品线上供应不可按一般零售处理。', 'International business and language access are strong; costs are high and online medicine supply is specialised.'),
  },
  TH: {
    trade: rcepTrade, tradeSource: rcep,
    device: b('向泰国 FDA 核查器械分级、进口及注册。', 'Check Thai FDA device class, import and registration.'), pharmacy: b('药店许可、药师及线上销售边界需先明确。', 'Clarify pharmacy permit, pharmacist and online-sales limits.'), clinic: b('诊所另需卫生设施许可。', 'Clinics need a separate health-facility licence.'), hospital: b('医院另需设施与专业人员审批。', 'Hospitals need separate premises and professional approvals.'), regulator: 'https://www.fda.moph.go.th/', regulatorName: '泰国 FDA',
    assessment: b('中高：泰语合规资料与本地持牌伙伴关键。', 'Medium–high: Thai-language filings and licensed partners matter.'), business: b('旅游医疗与区域分销可研究；外资、泰语标签及地方运营需逐项核实。', 'Medical tourism and regional distribution are worth studying; verify foreign ownership, Thai labelling and local operations.'),
  },
  SA: {
    trade: b('可研究中国—海湾产业合作；卫生产品准入由沙特独立审批。', 'China–Gulf industry ties may be relevant; Saudi health-product approval is independent.'), tradeSource: 'https://www.sfda.gov.sa/en',
    device: b('SFDA 器械上市许可及当地授权代表需核查。', 'Check SFDA device authorisation and local representative requirements.'), pharmacy: b('药房与远程药品销售按 SFDA 和卫生部门规则核查。', 'Review SFDA and health-ministry rules for pharmacies and remote supply.'), clinic: b('诊所设施和执业人员另行许可。', 'Clinics need separate facility and professional licences.'), hospital: b('医院建设、运营和医护人员准入独立审批。', 'Hospital build-out, operation and staffing need separate approvals.'), regulator: 'https://www.sfda.gov.sa/en', regulatorName: '沙特 SFDA',
    assessment: b('高：产品注册、本地代表与机构许可需并行。', 'High: product, local-representative and facility approvals run in parallel.'), business: b('机构采购规模可观；阿拉伯语、当地合作、投资规定与区域配送要先验证。', 'Institutional procurement is sizable; validate Arabic operations, local partners, investment rules and regional delivery.'),
  },
  DE: {
    trade: b('中国与欧盟贸易联系广；欧盟药械规则、数据保护和贸易措施独立适用。', 'China–EU trade is extensive; EU health-product, privacy and trade rules apply independently.'), tradeSource: 'https://policy.trade.ec.europa.eu/eu-trade-relationships-country-and-region/countries-and-regions/china_en',
    device: b('欧盟 MDR / IVDR 合规及德国经营主体要求。', 'EU MDR / IVDR compliance plus German operator requirements.'), pharmacy: b('网上药房需国家登记与欧盟共同标识。', 'Online pharmacies need national registration and the EU common logo.'), clinic: b('诊所及医师执业由德国地方主管机构监管。', 'Clinics and physician practice are overseen by German local authorities.'), hospital: b('医院设立、规划及保险支付准入另行核查。', 'Hospitals require separate establishment, planning and reimbursement review.'), regulator: 'https://www.ema.europa.eu/en/human-regulatory-overview/public-health-threats/falsified-medicines-overview/buying-medicines-online', regulatorName: '欧盟 EMA / 德国主管部门',
    assessment: b('高：欧盟统一规则叠加德国本地许可。', 'High: EU rules combine with German operating approvals.'), business: b('基础设施和支付体系成熟；德语文件、数据保护与劳动成本需纳入预算。', 'Strong infrastructure and payments; budget for German documentation, privacy and labour.'),
  },
  JP: {
    trade: rcepTrade, tradeSource: rcep,
    device: b('PMDA 按器械风险分级；境外制造商与日本持证主体路径需确认。', 'PMDA risk classes apply; foreign-manufacturer and Japanese marketing-holder paths need review.'), pharmacy: b('药店与药剂师许可由所在地主管机构核查。', 'Check local authority pharmacy and pharmacist licensing.'), clinic: b('诊所开设及医师资格另行申报。', 'Clinics and physicians require separate notifications and credentials.'), hospital: b('医院病床、设施和医护配置审批更复杂。', 'Hospital beds, facilities and clinical staffing add further approvals.'), regulator: 'https://www.pmda.go.jp/english/review-services/reviews/0004.html', regulatorName: '日本 PMDA',
    assessment: b('高：产品分类与日本持证主体是前置门槛。', 'High: product class and Japanese authorisation holder are early gates.'), business: b('市场支付能力强、质量预期高；日语服务和长期本地合作不可省。', 'High spending power and quality expectations; Japanese service and durable local partnership matter.'),
  },
  KR: {
    trade: rcepTrade, tradeSource: rcep,
    device: b('MFDS 器械分类、认证 / 许可和进口主体需核查。', 'Check MFDS device class, certification / approval and importer.'), pharmacy: b('药品网上售卖限制严格；先核线下药店与持牌渠道。', 'Online medicine sales are tightly restricted; start with licensed pharmacy channels.'), clinic: b('诊所设立与医师执业另受医疗法规范。', 'Clinics and physician practice are separately governed by medical law.'), hospital: b('医院需额外设施、床位及人员条件。', 'Hospitals add facilities, beds and staffing requirements.'), regulator: 'https://www.mfds.go.kr/eng/', regulatorName: '韩国 MFDS',
    assessment: b('高：本地许可与线上药品限制显著。', 'High: local licensing and online-medicine restrictions are material.'), business: b('数字用户成熟；韩语内容、竞争强度和渠道关系是主要成本。', 'Digitally mature users; Korean content, competition and channel relationships are major costs.'),
  },
  PH: {
    trade: rcepTrade, tradeSource: rcep,
    device: b('器械零售商可涉及 FDA License to Operate。', 'Medical-device retailers may need an FDA License to Operate.'), pharmacy: b('药店须申请 FDA LTO；线上模式另核适用规则。', 'Drugstores need an FDA LTO; check online-specific rules separately.'), clinic: b('诊所类型不同，DOH 许可范围须逐类确认。', 'DOH requirements differ by clinic category.'), hospital: b('医院需 DOH 设施执照及服务范围审批。', 'Hospitals need DOH facility and service-scope approval.'), regulator: 'https://www.fda.gov.ph/fda-circular-no-2022-007-guidelines-on-the-use-of-the-food-and-drug-administratione-services-portal-system-for-license-to-operate-lto-application-of-retailers-of-medical-devices/', regulatorName: '菲律宾 FDA / DOH',
    assessment: b('中高：FDA 与 DOH 两套审批，加上跨岛履约。', 'Medium–high: FDA and DOH approvals plus inter-island delivery.'), business: b('英语商务沟通方便；群岛运输、电力与温控成本会改变单位经济性。', 'English helps commerce; inter-island shipping, power and cold-chain costs affect unit economics.'),
  },
  AU: {
    community: { value: b('5.5%', '5.5%'), basis: b('2021 人口普查：申报华裔祖籍，可多选', '2021 Census: Chinese ancestry; multiple responses allowed'), source: 'https://www.abs.gov.au/statistics/people/people-and-communities/cultural-diversity-census/2021' },
    trade: rcepTrade, tradeSource: rcep,
    device: b('通常需要澳洲本地 sponsor 及 ARTG 登记。', 'Devices generally need an Australian sponsor and ARTG inclusion.'), pharmacy: b('药店所有权、场所和药剂师要求按州 / 领地核查。', 'Check state / territory pharmacy ownership, premises and pharmacist rules.'), clinic: b('诊所服务和医护人员注册按州 / 领地核查。', 'Check state / territory clinic services and practitioner registration.'), hospital: b('私立医院另按州 / 领地取得设施许可。', 'Private hospitals need separate state / territory facility approval.'), regulator: 'https://www.tga.gov.au/products/medical-devices/application-and-market-authorisation/supply-medical-device/medical-device-inclusion-process', regulatorName: '澳大利亚 TGA',
    assessment: b('高：联邦产品注册与州级设施规则叠加。', 'High: federal product authorisation and state facility rules combine.'), business: b('规则透明、购买力强；人工、地理距离和本地 sponsor 成本较高。', 'Transparent rules and strong spending power; labour, distance and local-sponsor costs are high.'),
  },
  RU: {
    trade: b('可讨论贸易需求，但必须先做制裁、银行、保险和承运方筛查；不能用“友好度”替代合规。', 'Trade demand may exist, but sanctions, banks, insurers and carriers must be screened first.'), tradeSource: 'https://ofac.treasury.gov/sanctions-programs-and-country-information/russia-related-sanctions',
    device: b('医疗器械注册与进口路径按监管机构核查。', 'Check medical-device registration and import pathways.'), pharmacy: b('药店与远程药品销售许可独立核查。', 'Pharmacy and remote medicine-sales permissions need separate review.'), clinic: b('诊所需医疗活动许可。', 'Clinics require healthcare-activity licensing.'), hospital: b('医院设施与医疗活动许可另行核查。', 'Hospitals need separate facility and healthcare-activity approval.'), regulator: 'https://roszdravnadzor.gov.ru/drugs/distancetrade/nonprescription', regulatorName: '俄罗斯 Roszdravnadzor',
    assessment: b('极高：准入之外还有制裁、结算与物流门槛。', 'Very high: sanctions, settlement and logistics compound market authorisation.'), business: b('仅在法律、银行、物流均可行时评估交易；不得以人口或 GDP 推导可进入性。', 'Assess commerce only after legal, banking and shipping feasibility; population and GDP do not imply access.'),
  },
  CA: {
    community: { value: b('4.7%', '4.7%'), basis: b('2021 人口普查：自报华人群体占总人口', '2021 Census: self-reported Chinese population'), source: 'https://www150.statcan.gc.ca/n1/daily-quotidien/260213/dq260213a-eng.htm' },
    trade: b('中加存在贸易往来；需按商品核查进口、贸易措施和省级市场规则。', 'Canada–China trade exists; check import, trade remedies and provincial rules by product.'), tradeSource: 'https://www.international.gc.ca/country-pays/china-chine/relations.aspx?lang=eng',
    device: b('Health Canada 器械分类、注册与进口主体要求。', 'Health Canada device classes, licensing and importer rules apply.'), pharmacy: b('网上药房主要由省 / 地区许可与执业监管。', 'Online pharmacy practice is principally provincial / territorial.'), clinic: b('诊所及执业人员须按省 / 地区核验。', 'Check clinic and practitioner rules by province / territory.'), hospital: b('医院设立与运营按省 / 地区制度。', 'Hospitals are established and operated under provincial / territorial systems.'), regulator: 'https://www.canada.ca/en/health-canada/services/buying-drugs-over-internet.html', regulatorName: '加拿大 Health Canada',
    assessment: b('高：联邦产品许可与省级服务牌照分层。', 'High: federal product authorisation and provincial care licences are layered.'), business: b('华人社群与双语市场可服务；各省税务、隐私、保险和法语要求需单独核算。', 'Chinese communities and bilingual demand matter; province taxes, privacy, insurance and French rules vary.'),
  },
  GB: {
    trade: b('中英贸易持续；需按产品与供应链核查关税、制裁和医疗监管。', 'UK–China trade continues; check tariffs, sanctions and health regulation by product.'), tradeSource: 'https://www.gov.uk/government/publications/prime-minister-visit-to-china-trade-and-investment-factsheet/prime-minister-visit-to-china-trade-and-investment-factsheet',
    device: b('医疗器械按 MHRA 注册与英国适用规则核查。', 'Check MHRA registration and the applicable UK device regime.'), pharmacy: b('药房需 GPhC 等主管机构登记；线上售药另有标准。', 'Pharmacies need regulator registration; online medicine supply has additional standards.'), clinic: b('英格兰诊所医疗服务可涉及 CQC 登记；其他地区另核。', 'English clinics may need CQC registration; other nations differ.'), hospital: b('私立医院需医疗服务监管机构许可。', 'Private hospitals need healthcare-service regulator approval.'), regulator: 'https://www.gov.uk/guidance/regulating-medical-devices-in-the-uk', regulatorName: '英国 MHRA / GPhC / CQC',
    assessment: b('高：产品、药房、医疗服务由不同机构监管。', 'High: products, pharmacies and clinical services have distinct regulators.'), business: b('英文内容可复用；药品线上展示、隐私、专业责任与英国内不同辖区规则需核查。', 'English content is reusable; online medicine display, privacy, liability and devolved rules need review.'),
  },
  BR: {
    trade: b('中国为重要贸易伙伴；医药准入、葡语标签和税务仍按巴西规则。', 'China is a major trade partner; Brazilian health approvals, Portuguese labels and taxes still govern.'), tradeSource: 'https://www.gov.br/mdic/pt-br/assuntos/comercio-exterior/estatisticas',
    device: b('ANVISA 器械风险分类、注册及本地责任主体。', 'ANVISA device risk classification, registration and local responsible entity.'), pharmacy: b('药店需 ANVISA 经营授权及地方卫生许可。', 'Pharmacies need ANVISA operating authorisation and local sanitary permits.'), clinic: b('诊所设施和专业人员另按地方卫生要求。', 'Clinics need separate local health and professional compliance.'), hospital: b('医院设施与专业责任需另行许可。', 'Hospitals need separate facility and clinical-responsibility approvals.'), regulator: 'https://www.gov.br/pt-br/servicos/solicitar-autorizacao-de-funcionamento-afe-farmacias', regulatorName: '巴西 ANVISA',
    assessment: b('高：产品、药店、地方设施许可和税务并行。', 'High: product, pharmacy, local facility and tax tracks run in parallel.'), business: b('市场大但税制处于过渡期；葡语、州际物流及付款周期要先建模。', 'Large market but changing taxes; model Portuguese operations, inter-state logistics and payment cycles.'),
  },
};

export function MarketIntelligence({ code, locale }: { code: string; locale: 'zh' | 'en' }) {
  const item = data[code] ?? europeanIntelligence[code];
  if (!item) return null;
  const isZh = locale === 'zh';
  const community = item.community;
  return <section className="market-intelligence" aria-label={isZh ? '市场进入研判' : 'Market-entry assessment'}>
    <div className="market-intelligence-head"><span>{isZh ? '市场进入研判' : 'MARKET-ENTRY ASSESSMENT'}</span><p>{isZh ? '以下是决策线索，不是法务意见或国家“友好度”排名。' : 'Decision signals, not legal advice or a country friendliness ranking.'}</p></div>
    <div className="intelligence-rows">
      <div className="intelligence-row"><h4>{isZh ? '华人社群' : 'Chinese community'}</h4><div><strong>{community ? community.value[locale] : (isZh ? '暂无可比官方占比' : 'No comparable official share verified')}</strong><p>{community ? community.basis[locale] : (isZh ? '不以中国籍人口或中国出生人口冒充“华人占比”。' : 'Chinese nationality or China-born share is not treated as ethnic Chinese share.')}</p>{community && <a href={community.source} target="_blank" rel="noopener noreferrer">{isZh ? '统计来源 ↗' : 'Census source ↗'}</a>}</div></div>
      <div className="intelligence-row"><h4>{isZh ? '对华经贸协作' : 'China trade context'}</h4><div><p>{item.trade[locale]}</p><a href={item.tradeSource} target="_blank" rel="noopener noreferrer">{isZh ? '经贸依据 ↗' : 'Trade reference ↗'}</a></div></div>
      <div className="intelligence-row"><h4>{isZh ? '医药医疗准入' : 'Healthcare market access'}</h4><div><strong>{item.assessment[locale]}</strong><dl><div><dt>{isZh ? '医疗器械' : 'Medical devices'}</dt><dd>{item.device[locale]}</dd></div><div><dt>{isZh ? '药店 / 线上售药' : 'Pharmacy / online'}</dt><dd>{item.pharmacy[locale]}</dd></div><div><dt>{isZh ? '诊所' : 'Clinics'}</dt><dd>{item.clinic[locale]}</dd></div><div><dt>{isZh ? '医院' : 'Hospitals'}</dt><dd>{item.hospital[locale]}</dd></div></dl><a href={item.regulator} target="_blank" rel="noopener noreferrer">{item.regulatorName} ↗</a></div></div>
      <div className="intelligence-row"><h4>{isZh ? '营商落地条件' : 'Doing-business conditions'}</h4><div><p>{item.business[locale]}</p></div></div>
    </div>
    <p className="intelligence-caveat">{isZh ? '统计口径各异，不宜横向相加或直接排名；“准入复杂度”是本页初步研究判断，实际审批取决于产品风险等级、经营主体、设施位置、服务范围和执业人员，投资前须由当地专业顾问复核。' : 'Census definitions differ and cannot be ranked directly. Access complexity is our preliminary assessment; actual approvals depend on device risk, entity, premises, services and professionals. Obtain local legal and regulatory review before investment.'}</p>
  </section>;
}
