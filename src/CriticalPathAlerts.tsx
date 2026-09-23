import { ArrowUpRight, CircleAlert, Clock3, LockKeyhole, MoveRight } from 'lucide-react';

type Locale = 'zh' | 'en';
type Localized = { zh: string; en: string };
type Source = { title: string; url: string };
type AlertItem = {
  code: string;
  region: Localized;
  trigger: Localized;
  start: Localized;
  gate: Localized;
  sources: Source[];
};

const alerts: AlertItem[] = [
  {
    code: 'ODI', region: { zh: '内地 → 香港', en: 'Mainland → Hong Kong' },
    trigger: { zh: '投资款 / 增资 / 融资担保', en: 'Investment / capital injection / financing guarantee' },
    start: { zh: '现在确认投资主体、股权链、资金用途与是否属敏感项目；并行预沟通发改、商务备案／核准路径及开户行材料。', en: 'Map the investing entity, ownership chain, use of funds and sensitive-project status now; pre-check NDRC, MOFCOM and bank documentation in parallel.' },
    gate: { zh: '按适用路径完成境外投资手续和外汇登记前，不把投资款或担保当作可执行事项；香港公司注册完成不等于内地资金可汇出。', en: 'Do not treat investment remittance or guarantees as executable until the applicable outbound-investment and FX steps are complete. Hong Kong incorporation alone does not clear mainland funding.' },
    sources: [
      { title: '发改委 / NDRC', url: 'https://zfxxgk.ndrc.gov.cn/web/iteminfo.jsp?id=18522' },
      { title: '商务部 / MOFCOM', url: 'https://tfs.mofcom.gov.cn/swfg/gjjjhz/art/2016/art_38c7eb781b25413f8aad43e55c0640ed.html' },
      { title: '外汇局 / SAFE', url: 'https://www.safe.gov.cn/safe/2024/0412/24230.html' },
    ],
  },
  {
    code: 'HK', region: { zh: '中国香港', en: 'Hong Kong, China' },
    trigger: { zh: '海外中枢 / 药械经营', en: 'Overseas hub / healthcare trade' },
    start: { zh: '公司设立时同步厘清银行开户与实控人资料；按首批商品和业务模式梳理药品注册、批发／零售及诊所或医疗机构许可。', en: 'Prepare beneficial-owner and bank-onboarding documents alongside incorporation; classify the first products and check medicine, wholesale/retail and clinic licences by activity.' },
    gate: { zh: '持有公司注册证并不自动获得药品或医疗服务许可；受管制药物不得按普通网店模式直接上架销售。', en: 'A company registration is not a medicines or care-service licence. Controlled medicines cannot simply be listed in a general online shop.' },
    sources: [
      { title: '公司注册处 / CR', url: 'https://www.cr.gov.hk/en/services/register-company.htm' },
      { title: '药物办公室 / Drug Office', url: 'https://www.drugoffice.gov.hk/eps/do/en/consumer/consumer_safety_advisories/Be_Caution_when_Buying_Medicines_on_Internet.html' },
    ],
  },
  {
    code: 'ID', region: { zh: '印度尼西亚', en: 'Indonesia' },
    trigger: { zh: '本地经营 / 药械准入', en: 'Local operation / product access' },
    start: { zh: '先定具体 KBLI 经营范围、外资主体与持牌伙伴；把首批 SKU 分成药品、医疗器械和普通商品，并确认本地进口／分销责任人。', en: 'Choose the exact KBLI activities, foreign-investment structure and licensed partner; classify launch SKUs and identify the local importer/distributor.' },
    gate: { zh: 'NIB 不能替代全部行业许可；需按风险等级和产品类别取得相应经营及药械上市／流通许可后再进口、上架。', en: 'An NIB does not replace sector licences. Obtain the activity- and product-specific authorisations before importing or listing regulated products.' },
    sources: [
      { title: 'OSS', url: 'https://oss.go.id/en' },
      { title: '卫生部器械系统 / Regalkes', url: 'https://regalkes.kemkes.go.id/' },
    ],
  },
  {
    code: 'MY', region: { zh: '马来西亚', en: 'Malaysia' },
    trigger: { zh: '首发交易样板 / 品类决定网站功能', en: 'Launch pilot / product category drives checkout' },
    start: { zh: '立即锁定首批 SKU 并向 NPRA／MDA 核品类；确定本地注册持有人、器械授权代表、进口商及门店／平台经营主体。', en: 'Freeze launch SKUs and confirm classification with NPRA/MDA; identify the local registration holder, device representative, importer and platform operator.' },
    gate: { zh: '药品注册与器械注册／机构牌照是不同手续；卫生部明确处方药不得经互联网销售，不能先做处方药购物车再等批准。', en: 'Drug registration, device registration and establishment licensing are separate. The health ministry prohibits internet sales of prescription medicines; do not build a prescription-drug checkout on the assumption it can be approved later.' },
    sources: [
      { title: 'NPRA', url: 'https://npra.gov.my/index.php/en/product-registration-process/step-1-pre-submission-of-application-preparation.html' },
      { title: 'MDA', url: 'https://portal.mda.gov.my/index.php/industry/establishment-licence/establishment-license-information' },
      { title: '卫生部 / MOH', url: 'https://pharmacy.moh.gov.my/en/content/tips-how-buy-medicines-online.html' },
    ],
  },
  {
    code: 'SG', region: { zh: '新加坡', en: 'Singapore' },
    trigger: { zh: '区域节点 / 电子药房', en: 'Regional node / e-pharmacy' },
    start: { zh: '先选“资源办公室、进口批发、电子药房、诊所”哪条业务线；尽早锁定持牌本地实体、药师负责人、处方与数据流程。', en: 'Choose whether the project is a regional office, importer/wholesaler, e-pharmacy or clinic; secure the licensed local entity, pharmacist-in-charge and prescription/data workflow early.' },
    gate: { zh: '治疗性产品、器械和医疗服务分别适用 HSA／卫生部要求；电子药房需符合 HSA 条件，不能凭普通电商网站或公司执照开卖。', en: 'Therapeutic products, devices and care services have separate HSA/MOH rules. E-pharmacy must meet HSA conditions; a general commerce site or company licence is insufficient.' },
    sources: [
      { title: 'HSA 电子药房', url: 'https://www.hsa.gov.sg/other-regulations/retail-pharmacy-licence/supply-of-registered-therapeutic-products-through-e-pharmacy/' },
      { title: 'HSA 药品许可', url: 'https://www.hsa.gov.sg/therapeutic-products/manufacturing-import-wholesale/licence-to-manufacturer-import-or-wholesale/overview/' },
    ],
  },
  {
    code: 'US', region: { zh: '美国', en: 'United States' },
    trigger: { zh: '器械进口 / 网上药房按州', en: 'Device import / state-by-state pharmacy' },
    start: { zh: '先选首发州与首批 SKU；逐项判断 FDA 器械分类及上市前路径，落实美国代理人／进口商，并向目标州药房委员会核网上药房要求。', en: 'Select first states and SKUs; determine the FDA device class and premarket pathway, US agent/importer, and destination-state pharmacy-board requirements.' },
    gate: { zh: '“FDA 注册”不等于产品获批或获准上市；药房牌照及处方要求按销售目的州核查，未完成前不发货、不接处方药订单。', en: '“FDA registered” does not mean a device is approved or cleared. Check the destination-state pharmacy licence and prescription rules before shipping devices or accepting prescription-drug orders.' },
    sources: [
      { title: 'FDA 器械', url: 'https://www.fda.gov/industry/importing-fda-regulated-products/importing-medical-devices' },
      { title: 'FDA 注册≠批准', url: 'https://www.fda.gov/medical-devices/consumers-medical-devices/are-there-fda-registered-or-fda-certified-medical-devices-how-do-i-know-what-fda-approved' },
      { title: 'FDA 网上药房', url: 'https://www.fda.gov/consumers/consumer-updates/how-buy-medicines-safely-online-pharmacy' },
    ],
  },
  {
    code: 'EU', region: { zh: '欧盟共同底线', en: 'EU baseline' },
    trigger: { zh: '器械 CE / 线上售药', en: 'Device conformity / online medicines' },
    start: { zh: '先定首入欧盟国家、产品分类与制造商／欧代／进口商责任；并行准备技术文件、合格评定、适用的 EUDAMED 登记与本地药房合作。', en: 'Choose the first EU destination, product class and manufacturer/authorised-representative/importer roles; prepare technical files, conformity assessment, applicable EUDAMED registration and local pharmacy partners in parallel.' },
    gate: { zh: '欧盟共同器械规则不等于全欧统一药房牌照。器械满足适用 MDR／IVDR 要求、药品及网售符合目的国规则后才能投放。', en: 'Shared EU device rules do not create one EU-wide pharmacy licence. Devices must meet applicable MDR/IVDR duties and medicine sales must satisfy destination-country rules before launch.' },
    sources: [
      { title: '欧委会 / 经营主体', url: 'https://health.ec.europa.eu/medical-devices-topics-interest/economic-operators_en' },
      { title: 'EUDAMED', url: 'https://health.ec.europa.eu/medical-devices-eudamed/overview_en' },
      { title: 'EMA 网上售药', url: 'https://www.ema.europa.eu/en/human-regulatory-overview/public-health-threats/falsified-medicines-overview/buying-medicines-online' },
    ],
  },
  {
    code: 'EU+', region: { zh: '德国 / 法国 / 荷兰 / 英国', en: 'Germany / France / Netherlands / UK' },
    trigger: { zh: '欧洲逐国落地；英国单列', en: 'Country-by-country; UK separate' },
    start: { zh: '德国核网上药房登记；法国先找合资格实体药房并核现行事前申报；荷兰核药师及目的地规则；英国另设 MHRA／UK Responsible Person 工作流。', en: 'Check Germany’s mail-order pharmacy register; France’s eligible physical pharmacy and current prior-declaration process; Dutch pharmacist/destination rules; and a separate MHRA/UK Responsible Person track for Great Britain.' },
    gate: { zh: '不要把一个国家的网售资格或欧盟器械手续复制到另一国；英国不是欧盟许可的自动延伸。', en: 'Do not copy one country’s online-medicine authority into another. UK market access is not an automatic extension of EU procedures.' },
    sources: [
      { title: '德国 BfArM', url: 'https://www.bfarm.de/DE/Arzneimittel/Arzneimittelinformationen/Rapid-Alert-System/Arzneimittelfaelschungen/_node.html' },
      { title: '法国药师会', url: 'https://www.ordre.pharmacien.fr/les-communications/focus-sur/les-actualites/vente-en-ligne-de-medicaments-a-usage-humain-demarches-prealables-actualisees-pour-le-pharmacien' },
      { title: '荷兰 IGJ', url: 'https://www.igj.nl/onderwerpen/medicijnen/online-medicijnen/toezicht-op-online-medicijnen' },
      { title: '英国 MHRA', url: 'https://www.gov.uk/guidance/register-medical-devices-to-place-on-the-market' },
    ],
  },
];

const copy = {
  zh: {
    kicker: 'CRITICAL PATH ALERT · 审批前置预警',
    intro: '把跨境打款、产品准入、经营牌照与网站上线分成并行工作流。以下是排期预警，不是“已获批准”的状态提示。',
    steps: ['先定交易与资金路径', '锁定首批国家和 SKU', '并行递交许可与开户材料', '获准后再汇款、进口或交易'],
    start: '现在就启动', gate: '未完成前不要做', evidence: '官方依据',
    foot: '资料核查：2026-09-23。审批是否适用、主管机关、材料和耗时取决于主体、产品、投资结构及目的地；本站不做实时监管更新，也不保证审批周期。建议每条设置内部负责人、预计提交日、材料缺口和放行证据，并由当地律师／持牌顾问复核。',
  },
  en: {
    kicker: 'CRITICAL PATH ALERT · APPROVALS',
    intro: 'Run funding, product access, operating licences and launch readiness in parallel. These are scheduling alerts—not a claim that any approval has been obtained.',
    steps: ['Define funding & transaction routes', 'Freeze first markets and SKUs', 'Submit permits and bank documents in parallel', 'Remit, import or transact only after clearance'],
    start: 'START NOW', gate: 'DO NOT PROCEED BEFORE', evidence: 'Official sources',
    foot: 'Research checked 23 Sep 2026. Applicability, authorities, materials and timing depend on the entity, product, investment structure and destination. This page does not monitor regulatory changes in real time or promise approval times. Assign an owner, target filing date, missing documents and release evidence to each line; obtain local legal/licensing review.',
  },
};

export function CriticalPathAlerts({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return <section className="critical-alerts" id="alerts" aria-labelledby="critical-alerts-title">
    <div className="critical-alerts-head">
      <div><div className="section-kicker"><CircleAlert size={15}/>{t.kicker}</div><h2 id="critical-alerts-title">{locale === 'zh' ? <>别等业务准备好了，<br/>才发现许可还没开始。</> : <>Do not finish the build<br/>before starting the permits.</>}</h2></div>
      <p>{t.intro}</p>
    </div>
    <div className="critical-steps" aria-label={locale === 'zh' ? '前置工作顺序' : 'Critical path sequence'}>{t.steps.map((step, index) => <div key={step}><span>0{index + 1}</span><strong>{step}</strong>{index < t.steps.length - 1 && <MoveRight size={19} aria-hidden="true"/>}</div>)}</div>
    <div className="critical-ledger">
      {alerts.map((item) => <article className="critical-row" key={item.code}>
        <div className="critical-region"><span className="critical-code">{item.code}</span><h3>{item.region[locale]}</h3><small>{item.trigger[locale]}</small></div>
        <div className="critical-action"><span><Clock3 size={15}/>{t.start}</span><p>{item.start[locale]}</p></div>
        <div className="critical-gate"><span><LockKeyhole size={15}/>{t.gate}</span><p>{item.gate[locale]}</p><div className="critical-sources"><b>{t.evidence}</b>{item.sources.map((source) => <a href={source.url} key={source.url} target="_blank" rel="noopener noreferrer">{source.title}<ArrowUpRight size={12}/></a>)}</div></div>
      </article>)}
    </div>
    <p className="critical-footnote"><CircleAlert size={16}/>{t.foot}</p>
  </section>;
}
