'use client';

import { useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  Check,
  CircleDot,
  Database,
  Globe2,
  Languages,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { StrategyGlobe } from './StrategyGlobe';
import { rateByCode } from './marketRates';
import { PharmacyLaunchGuide } from './PharmacyLaunchGuide';

const markets = [
  {
    name: '中国香港', phase: '全球枢纽 · 持续建设', code: 'HK',
    model: 'S2B2C 全球运营 + 产业投资 + 国际合作',
    role: '第一海外分公司 · 全球辐射起点',
    detail: '以香港作为家家健康走向全球的首个海外公司和投资平台，连接国际资本、品牌、专家、机构与供应链，再向东南亚、北美、拉美和中东持续辐射。',
    proof: ['海外公司与治理中枢', '全球投资与合作接口', '跨市场资源调度'],
    facts: { tax: '利得税：首 200 万港元利润 8.25%，以上 16.5%；无 VAT / GST；网店同按利润来源征税', population: '752 万', gdp: '4,084 亿美元', fx: '1 USD ≈ 7.84 HKD', language: '粤语 · 普通话 · 英语', logistics: '国际空运与海运转口；自由港，末端履约半径短' },
  },
  {
    name: '马来西亚', phase: '首发样板 · 0—6个月', code: 'MY',
    model: 'E2C + 精选 B2C + 基础 B2B',
    role: '低成本端到端样板',
    detail: '用可控市场体量验证平台、支付、物流、内容与商家协同的完整链路。',
    proof: ['基础交易闭环', '本地语言工作流', '首批供应商与专家'],
    facts: { tax: '企业所得税通常 24%；跨境网购低价商品（≤ RM500）销售税 10%，年销售额超 RM500,000 须注册；本地 SST 按品类', population: '3,556 万', gdp: '4,222 亿美元', fx: '1 USD ≈ 4.07 MYR', language: '马来语 · 英语 · 中文 · 泰米尔语', logistics: '巴生港 / 丹戎帕拉帕斯港 + 吉隆坡空运；东马需独立履约' },
  },
  {
    name: '美国', phase: '首发样板 · 0—6个月', code: 'US',
    model: 'E2C + 精选 B2C',
    role: '高价值品牌与内容样板',
    detail: '面向成熟消费市场验证专业内容、专家资源与高价值用户的信任转化。',
    proof: ['英文知识母版', '国际专家网络', '高价值用户信任'],
    facts: { tax: '联邦公司所得税 21%；销售税按州及收货地址；平台代征和经济关联门槛按州判断', population: '3.40 亿', gdp: '29.30 万亿美元', fx: '本币 USD · 基准 1.00', language: '英语为主 · 西班牙语广泛使用', logistics: '快递与 3PL 网络成熟；跨州距离、税率及仓配节点需联动规划' },
  },
  {
    name: '印度尼西亚', phase: '第二批 · 7—12个月', code: 'ID',
    model: 'S2B2C + B2C + E2C',
    role: '区域渠道模式样板',
    detail: '重点验证本地经销商、零售终端与中国供应链之间的协同效率。',
    proof: ['经销商机制', '零售终端触达', '供应链响应速度'],
    facts: { tax: '企业所得税 22%；一般 VAT 有效税率 11%；指定电商平台代扣境内商户成交额 0.5% 所得税', population: '2.83 亿', gdp: '1.40 万亿美元', fx: '1 USD ≈ 17,562 IDR', language: '印度尼西亚语 · 多种地方语言', logistics: '群岛型网络；雅加达 / 泗水为主要入口，跨岛末端成本较高' },
  },
  {
    name: '墨西哥', phase: '第二批 · 7—12个月', code: 'MX',
    model: 'B2B + B2C + E2C',
    role: '拉美复制样板',
    detail: '建立区域进入模板，为后续巴西及其他拉美市场的复制做准备。',
    proof: ['西语内容体系', '区域履约模板', 'B2B 询盘转化'],
    facts: { tax: '公司所得税（ISR）30%；VAT 16%；平台销售商品或服务时，对个人卖家收入代扣 ISR 1%，另有 VAT 代扣规则', population: '1.31 亿', gdp: '1.83 万亿美元', fx: '1 USD ≈ 16.97 MXN', language: '西班牙语 · 多种原住民语言', logistics: '美墨公路口岸 + 太平洋港口；需按州评估安全与末端时效' },
  },
  {
    name: '阿联酋', phase: '复制期 · 13—18个月', code: 'AE',
    model: 'B2B / E2C 优先，逐步 B2C',
    role: '中东资源与业务节点',
    detail: '以区域资源连接为先，再评估沙特、德国、日本等后续机会。',
    proof: ['机构合作', '区域品牌节点', '国家模板复用'],
    facts: { tax: '公司税：应税利润 ≤ AED 375,000 为 0%，以上 9%；VAT 5%，本地企业强制注册门槛 AED 375,000', population: '1,099 万', gdp: '5,523 亿美元', fx: '1 USD = 3.6725 AED', language: '阿拉伯语 · 英语广泛使用', logistics: '杰贝阿里港 + 迪拜 / 阿布扎比空运；适合作为海湾转口枢纽' },
  },
  {
    name: '新加坡', phase: '区域资源节点 · 后续评估', code: 'SG',
    model: 'E2C + B2B 合作', role: '东南亚资源连接点',
    detail: '连接区域专家、医药品牌、机构和资本；开店或卖药仍需按新加坡药品分类、牌照和线上药房要求逐项核查。',
    proof: ['区域合作', '持牌伙伴', '品类准入评估'],
    facts: { tax: '企业所得税 17%；GST 标准税率 9%，注册、跨境和豁免规则依交易判断', population: '611 万', gdp: '6,039 亿美元', fx: '1 USD ≈ 1.27 SGD', language: '英语 · 中文 · 马来语 · 泰米尔语', logistics: '樟宜空港与港口枢纽；适合区域转运，药品另核温控与进口资格' },
  },
  {
    name: '泰国', phase: '后续机会 · 待评估', code: 'TH',
    model: 'B2B 合作 + 本地化 E2C', role: '东南亚本地渠道观察市场',
    detail: '先研究药店牌照、产品注册和泰语内容规则，再判断是否建立本地合作与履约网络。',
    proof: ['本地持牌伙伴', '泰语内容', '分销可行性'],
    facts: { tax: '企业所得税标准税率 20%；VAT 当前 7%，适用范围与注册门槛须按交易核查', population: '7,162 万', gdp: '5,770 亿美元', fx: '1 USD ≈ 33.27 THB', language: '泰语 · 英语用于商务', logistics: '曼谷航空与港口集散；跨省配送及温控成本需单独测算' },
  },
  {
    name: '沙特阿拉伯', phase: '后续机会 · 待评估', code: 'SA',
    model: 'B2B 机构合作优先', role: '海湾地区延伸市场',
    detail: '以阿联酋节点为基础研究机构需求、药品准入与本地配送，再决定是否建设本地零售能力。',
    proof: ['机构需求', '产品注册', '本地履约'],
    facts: { tax: 'VAT 标准税率 15%；公司税与天课取决于投资者结构和应税活动', population: '3,697 万', gdp: '1.28 万亿美元', fx: '1 USD = 3.75 SAR（官方汇率）', language: '阿拉伯语 · 英语用于商务', logistics: '利雅得、吉达、达曼分区布局；跨区域配送与进口清关需评估' },
  },
  {
    name: '德国', phase: '后续机会 · 待评估', code: 'DE',
    model: 'E2C 内容 + 合规供应合作', role: '欧洲市场准入观察点',
    detail: '先研究欧盟与德国药品线上销售、药房登记、数据保护和德语内容要求，再评估欧洲布局。',
    proof: ['欧盟合规', '德语内容', '持牌药房伙伴'],
    facts: { tax: 'VAT 标准税率 19%；部分商品适用 7%；公司所得税及地方营业税另计', population: '8,349 万', gdp: '5.05 万亿美元', fx: '1 USD ≈ 0.87 EUR', language: '德语 · 英语用于商务', logistics: '欧洲陆运与包裹网络成熟；跨境药品配送受目的地法规约束' },
  },
];

const roadmap = [
  { stage: '阶段 0', time: '0—2个月', title: '定方向，搭底座', gate: 'Gate 0', result: '范围清楚，可进入开发', tasks: ['香港海外公司与全球投资中枢', '国家 × 品类合规矩阵 V1', '专家认证与审核标准', '核心产品原型'] },
  { stage: '阶段 1', time: '3—6个月', title: 'MVP 上线', gate: 'Gate 1', result: '证明平台能跑通', tasks: ['马来西亚基础交易', '美国 E2C 内容上线', '供应商展示与询盘', 'AI 多语言工作流'] },
  { stage: '阶段 2', time: '7—12个月', title: '验证商业闭环', gate: 'Gate 2', result: '证明模式形成闭环', tasks: ['进入印尼与墨西哥', '专家主页与问答', 'AI 知识及选购助手', '履约与伙伴模板'] },
  { stage: '阶段 3', time: '13—18个月', title: '复制与平台化', gate: 'Gate 3', result: '证明模式可以复制', tasks: ['复制至阿联酋', '国家配置模板', '商家自助入驻', 'AI 合规与采购能力'] },
];

const aiFlow = [
  { icon: Search, title: '研究与合规', text: '国家政策、准入资料与法规变化监控，专业人员最终确认。' },
  { icon: Languages, title: '内容与本地化', text: '把专家原始内容拆分为文章、FAQ、脚本、字幕与多语言版本。' },
  { icon: Database, title: '商品与供给', text: '读取说明书、检测报告和认证，生成结构化全球上架资料。' },
  { icon: Bot, title: '用户与采购助手', text: '基于自有专家知识和商品数据回答、选购、匹配并生成 RFQ。' },
];

const kpis = [
  ['信任资产', '认证专家数 · 审核覆盖率 · 自然流量占比'],
  ['需求质量', '内容到浏览 · 询盘 · 交易的可追踪贡献'],
  ['供给效率', '合规上架周期 · RFQ 响应率 · 履约稳定性'],
  ['复制能力', '新市场上线周期 · 模板复用率 · 本地化成本'],
];

export default function Home() {
  const [activeMarket, setActiveMarket] = useState(0);
  const market = markets[activeMarket];

  return (
    <main>
      <section className="hero" id="top">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />
        <nav className="nav-shell" aria-label="主导航">
          <a className="brand" href="#top" aria-label="家家健康首页">
            <span className="brand-mark"><Network size={17} /></span><span>家家健康</span>
          </a>
          <div className="nav-links">
            <a href="#top">S2B2C</a><a href="#globe">全球地球</a><a href="#foundation">产品底座</a><a href="#markets">市场进入</a><a href="#pharmacy-guide">开店指南</a>
          </div>
          <a className="nav-action" href="?lang=en">EN <ArrowUpRight size={15} /></a>
        </nav>

        <div className="hero-content">
          <div className="eyebrow"><Globe2 size={15} /> Global Health Platform</div>
          <h1 className="hero-system-title"><strong className="hero-s2b2c">S2B2C</strong><span>全球大健康国际平台</span></h1>
          <div className="hero-business-tree" aria-label="S2B2C平台由B2B、B2C和E2C组成">
            <article><strong>B2B</strong><span>供应链与渠道</span></article>
            <article><strong>B2C</strong><span>消费交易</span></article>
            <article><strong>E2C</strong><span>专家与信任</span></article>
          </div>
          <p>以中国香港首个海外分公司为全球起点，连接资本、品牌、专家与供应链，再把 S2B2C 模式向重点市场复制。</p>
          <div className="hero-actions">
            <a className="primary-action" href="#globe">查看全球布局 <ArrowDown size={16} /></a>
            <span className="hero-note">中国香港起航<br />投资并辐射全球</span>
          </div>
        </div>
        <div className="hero-index" aria-hidden="true"><span>01</span><i /><span>08</span></div>
      </section>

      <StrategyGlobe locale="zh" />

      <section className="foundation-section" id="foundation">
        <div className="foundation-copy">
          <div className="section-kicker">已有产品底座</div>
          <h2>不是从零开始，<br />而是把国内能力全球化。</h2>
          <p>现有测试资料已经覆盖 B2B 药品商城、B2C 小程序与 App、E2C 研修院三条产品线。国际平台要做的，是把这些能力沉淀为全球底座，再按国家配置语言、支付、物流与合规。</p>
          <div className="foundation-status"><span>当前状态</span><strong>测试原型 · 待正式上线</strong></div>
          <div className="foundation-path">
            <article><span>01</span><div><h3>B2B 药交网</h3><p>供应商资质、商品检索、起订量与阶梯价、采购下单、订单履约、财务结算及角色权限。</p></div></article>
            <article><span>02</span><div><h3>B2C 消费端</h3><p>小程序与 App 双端承接课程、图书、会员、订单与支付，形成从内容发现到消费的完整路径。</p></div></article>
            <article><span>03</span><div><h3>E2C 研修院</h3><p>专家讲师、机构与药企入驻，合规培训、公开课、专业内容及人工审核，共同构建可信入口。</p></div></article>
          </div>
          <a className="foundation-link" href="#markets">查看全球市场进入顺序 <ArrowUpRight size={16} /></a>
        </div>
        <div className="foundation-visual">
          <div className="prototype-frame"><iframe src={`${import.meta.env.BASE_URL}app-front.html`} title="家家健康研修院完整交互原型" loading="lazy" sandbox="allow-scripts allow-forms allow-same-origin" /></div>
        </div>
      </section>

      <section className="trust-section">
        <div className="trust-copy">
          <div className="section-kicker light">第一增长引擎</div>
          <h2>E2C 不是内容频道，<br />而是信任基础设施。</h2>
          <p>用户先在这里解决“我该相信什么”，再进入“我该买什么”。专业信用优先于短期 GMV，AI 辅助效率但不替代专业判断。</p>
          <ul className="principles">
            <li><ShieldCheck />实名资质与内容审核可追溯</li>
            <li><Languages />全球内容母版，本地合规适配</li>
            <li><Sparkles />一次生产，多语种、多形态分发</li>
          </ul>
        </div>
        <div className="trust-ladder">
          {[
            ['01', '可信内容库', '文章、视频、FAQ 与健康主题知识页'],
            ['02', '专家网络', '认证主页、问答、访谈与专业标签'],
            ['03', '知识到交易', '内容关联商品、AI 助手与采购内容'],
          ].map(([n, title, text]) => (
            <div className="ladder-step" key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight /></div>
          ))}
        </div>
      </section>

      <section className="markets-section" id="markets">
        <div className="section-topline"><div><div className="section-kicker">市场进入顺序</div><h2>香港起航，双样板验证，<br />沿区域节点复制。</h2></div><p>先在香港建立海外公司、投资与全球协同中枢，再用马来西亚和美国验证两类样板，逐步向东南亚、拉美和中东扩展。</p></div>
        <div className="market-workspace">
          <div className="market-list" role="tablist" aria-label="目标市场">
            {markets.map((item, index) => (
              <button key={item.code} role="tab" aria-selected={activeMarket === index} className={activeMarket === index ? 'active' : ''} onClick={() => setActiveMarket(index)}>
                <b>{item.name}</b><small>{item.code}</small>
              </button>
            ))}
          </div>
          <div className="market-detail" role="tabpanel" aria-live="polite">
            <div className="market-mapmark"><Globe2 /><span>{market.code}</span></div>
            <div className="market-phase">{market.phase}</div>
            <h3>{market.role}</h3><div className="market-model">{market.model}</div><p>{market.detail}</p>
            <div className="proof-list">{market.proof.map((item) => <span key={item}><Check size={14} />{item}</span>)}</div>
            <div className="market-facts" aria-label={`${market.name}市场数据`}>
              {[['电商经营税', market.facts.tax], ['人口', market.facts.population], ['名义 GDP', market.facts.gdp], ['美元汇率', market.facts.fx], ['主要语言', market.facts.language], ['物流', market.facts.logistics]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
              <div className="rate-fact"><span>基准利率 · 截至 {rateByCode[market.code].date}</span><strong>{rateByCode[market.code].value}</strong><small>{rateByCode[market.code].zh}</small><a href={rateByCode[market.code].source} target="_blank" rel="noopener noreferrer">央行／官方来源 ↗</a></div>
            </div>
            <p className="market-source">人口与 GDP：<a href="https://data.worldbank.org/" target="_blank" rel="noopener noreferrer">世界银行最新可得口径</a>｜汇率：参考值，交易前重查｜利率：央行政策／基准口径，不等于企业贷款报价；新加坡以汇率为主要政策工具｜税负取决于主体、商品、渠道与收货地</p>
          </div>
        </div>
        <p className="node-note"><CircleDot size={15} /> 中国香港是家家健康第一个海外分公司和全球投资辐射起点；新加坡继续作为东南亚区域资源节点。</p>
      </section>

      <PharmacyLaunchGuide locale="zh" />

      <section className="roadmap-section" id="roadmap">
        <div className="section-topline dark"><div><div className="section-kicker light">18 个月路线图</div><h2>每一阶段，<br />都有一个清晰决策门。</h2></div><p>阶段验收不是按“做了多少功能”，而是按平台能否跑通、闭环并复制来判断。</p></div>
        <div className="roadmap-grid">
          {roadmap.map((item, index) => <article key={item.stage}>
            <div className="roadmap-head"><span>{item.stage}</span><b>{item.time}</b></div>
            <h3>{item.title}</h3>
            <ol>{item.tasks.map((task, i) => <li key={task}><span>{String(i + 1).padStart(2, '0')}</span>{task}</li>)}</ol>
            <div className="roadmap-gate"><small>{item.gate}</small><strong>{item.result}</strong><span className="roadmap-number">0{index + 1}</span></div>
          </article>)}
        </div>
      </section>

      <section className="ai-section" id="ai">
        <div className="ai-title"><div className="section-kicker">AI 落地路径</div><h2>从工具提效，<br />走向平台能力。</h2><p>先买工具提效，再把高频流程 Agent 化，最终沉淀为可复用的平台产品与自有数据资产。</p></div>
        <div className="ai-flow">
          {aiFlow.map(({ icon: Icon, title, text }, index) => <article key={title}><span className="ai-index">0{index + 1}</span><Icon /><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="operating-section" id="blueprint">
        <div className="section-topline"><div><div className="section-kicker">扩展版 · 经营仪表盘</div><h2>用四类指标，<br />管理平台飞轮。</h2></div><p>把战略结论转成可持续更新的经营口径，让每次市场扩张都有前置条件、过程信号与复盘依据。</p></div>
        <div className="kpi-grid">
          {kpis.map(([title, detail], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{detail}</p><div className="kpi-bar"><i style={{ width: `${46 + index * 12}%` }} /></div></article>)}
        </div>
        <div className="governance-line"><b>统一治理底线</b><span>医学审核</span><span>商业披露</span><span>本地合规</span><span>数据可追溯</span><span>AI 人工复核</span></div>
      </section>

      <footer className="final-section">
        <div className="section-kicker light">目标状态 · 18 个月</div>
        <h2>从中国香港出发，<br />建设一张可信的全球健康网络。</h2>
        <p>香港连接投资与全球资源，专家和内容建立信任，商品与渠道承接需求，AI 与数据驱动持续复制。</p>
        <a className="primary-action" href="#markets">查看市场进入策略 <ArrowUpRight size={16} /></a>
        <div className="footer-meta"><span>家家健康</span><span>GLOBAL HEALTH S2B2C</span><span>2026—2027</span></div>
      </footer>
    </main>
  );
}
