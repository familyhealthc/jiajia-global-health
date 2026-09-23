import { useEffect, useState } from 'react';
import { ArrowDownToLine, ArrowUpRight, CheckCircle2, ClipboardList, LockKeyhole } from 'lucide-react';
import './execution.css';

type Locale = 'zh' | 'en';
type Text = { zh: string; en: string };
type Stage = 0 | 1 | 2 | 3;
type Status = 'todo' | 'doing' | 'blocked' | 'done';
type Task = { id: string; stage: Stage; market: string; title: Text; output: Text; dependency: Text; gate: Text; source?: { label: string; url: string } };
type Entry = { owner: string; due: string; evidence: string; status: Status };

const t = (zh: string, en: string): Text => ({ zh, en });
const tasks: Task[] = [
  { id: 'F-01', stage: 0, market: '内地→HK', title: t('定清香港投资与资金路径', 'Confirm the Hong Kong investment and funding route'), output: t('投资主体、股权链、资金用途、所需备案／核准及银行材料清单', 'Investor, ownership chain, use of funds, filing/approval route and bank checklist'), dependency: t('内地出资主体与拟投资金额', 'Mainland investor and proposed amount'), gate: t('取得适用境外投资手续及银行放行依据后再汇投资款', 'Do not remit investment capital before applicable outbound-investment and bank clearance'), source: { label: 'NDRC', url: 'https://zfxxgk.ndrc.gov.cn/web/iteminfo.jsp?id=18522' } },
  { id: 'F-02', stage: 0, market: 'HK', title: t('完成香港主体与开户材料包', 'Prepare Hong Kong entity and bank-onboarding pack'), output: t('公司文件、实控人材料、业务说明、开户与签字权限表', 'Company documents, beneficial-owner pack, business description and signing matrix'), dependency: t('F-01 的主体与股权链', 'Investor and ownership chain from F-01'), gate: t('公司成立不等于药械经营许可；先划定香港主体做什么', 'Incorporation is not a healthcare-trading licence; define the entity’s activities'), source: { label: 'HK CR', url: 'https://www.cr.gov.hk/en/services/register-company.htm' } },
  { id: 'R-01', stage: 0, market: 'HK / MY / US', title: t('冻结首批 SKU 与经营模式', 'Freeze first-wave SKUs and operating model'), output: t('逐 SKU 列明用途、宣称、制造商、药品／器械／普通商品分类及拟销售国家', 'SKU-by-SKU intended use, claims, manufacturer, product class and destination'), dependency: t('业务负责人给出真实候选商品', 'Business lead provides actual candidate products'), gate: t('未完成分类与销售主体判断，不开发受监管商品结账或上架流程', 'No regulated-product listing or checkout before classification and seller-of-record review'), source: { label: 'FDA', url: 'https://www.fda.gov/industry/importing-fda-regulated-products/importing-medical-devices' } },
  { id: 'P-01', stage: 0, market: 'Global', title: t('确定最小可验证业务闭环', 'Define the smallest testable operating loop'), output: t('一张流程图：内容／询盘→报价→付款→配送→退款；每步指定责任人', 'One flow: content/RFQ → quote → payment → delivery → refund, with an owner per step'), dependency: t('R-01 商品边界；各市场合法销售渠道', 'R-01 product scope and lawful sales channel by market'), gate: t('只测试已经确认可经营的品类；无真实交易前不填 GMV', 'Test only cleared categories; do not report GMV before real transactions') },
  { id: 'G-01', stage: 0, market: 'Global', title: t('建立每周决策与证据归档', 'Set up weekly decisions and evidence register'), output: t('责任人表、风险台账、会议纪要、放行证据的统一编号规则', 'Owner matrix, risk log, decision notes and evidence-ID convention'), dependency: t('管理层明确项目负责人', 'Management names a project sponsor'), gate: t('每个 Gate 必须有可复核文件，不以口头“差不多了”放行', 'Each gate needs reviewable evidence, not verbal sign-off') },
  { id: 'MY-01', stage: 1, market: 'MY', title: t('确认马来西亚首批商品准入', 'Clear first Malaysian products'), output: t('逐 SKU 的 NPRA／MDA 分类结论、注册持有人及进口／经营责任主体', 'SKU-level NPRA/MDA conclusion, registration holder, importer and operator'), dependency: t('R-01 首批 SKU；本地合作主体', 'R-01 SKUs and local partner/entity'), gate: t('适用注册和许可未明确前，不进口或上架受监管商品', 'Do not import or list regulated products before applicable registration and licence are clear'), source: { label: 'NPRA', url: 'https://npra.gov.my/index.php/en/product-registration-process.html' } },
  { id: 'MY-02', stage: 1, market: 'MY', title: t('跑通一笔可合法销售的订单', 'Run one lawful end-to-end order'), output: t('保存下单、支付、发货、签收、客服与退款测试记录', 'Retain order, payment, shipment, delivery, service and refund test records'), dependency: t('MY-01 准入结论；支付与物流合同', 'MY-01 clearance; payment and logistics contracts'), gate: t('缺任一关键环节时，MVP 不标记为“交易跑通”', 'Do not claim an operational MVP while a critical step is missing') },
  { id: 'US-01', stage: 1, market: 'US', title: t('美国内容与商品分线试点', 'Separate US content and product pilots'), output: t('医学审核样稿、免责声明、器械分类与首发州销售路径备忘录', 'Reviewed content, disclaimers, device classification and first-state sales memo'), dependency: t('R-01 商品；专家审核负责人；目标州', 'R-01 SKUs, medical reviewer and target state'), gate: t('FDA 注册不等于器械获准上市；不得把内容试点当作药品交易许可', 'FDA registration is not market clearance; content does not confer pharmacy authority'), source: { label: 'FDA', url: 'https://www.fda.gov/medical-devices/device-registration-and-listing/how-register-and-list' } },
  { id: 'B-01', stage: 1, market: 'B2B', title: t('让供应商询盘真正有人接', 'Make supplier RFQs operational'), output: t('供应商资质表、RFQ 模板、报价责任人和响应记录', 'Supplier credential record, RFQ template, quote owner and response log'), dependency: t('首批供应商同意试运行', 'First suppliers agree to a pilot'), gate: t('没有可追踪的报价和后续动作，不把“供应商入驻”算成商业验证', 'Supplier listings alone are not commercial validation without traceable quotes and follow-up') },
  { id: 'ID-01', stage: 2, market: 'ID', title: t('印尼经营范围与牌照路径先行', 'Map Indonesia business codes and licences first'), output: t('KBLI、OSS 风险级别、本地进口／分销责任人与许可清单', 'KBLI, OSS risk level, local importer/distributor and licence list'), dependency: t('拟进入品类、当地合作模式', 'Chosen products and local partnership model'), gate: t('NIB 不替代行业及产品许可，放行前不进口受监管货品', 'NIB does not replace sector or product permits; no regulated import before clearance'), source: { label: 'OSS', url: 'https://oss.go.id/en' } },
  { id: 'MX-01', stage: 2, market: 'MX', title: t('墨西哥进入决策包', 'Build Mexico entry decision pack'), output: t('西语商品资料、监管路径、卖方主体、税务与末端履约报价', 'Spanish product pack, regulatory path, seller, tax and last-mile quotes'), dependency: t('样板 SKU、当地法律与物流伙伴', 'Pilot SKUs, local legal and logistics partners'), gate: t('不可仅凭翻译好的网站认定可以交易或发货', 'A translated website is not proof of trade or shipping readiness') },
  { id: 'D-01', stage: 2, market: 'Global', title: t('建立真实经营数据口径', 'Define operating metrics from real records'), output: t('询盘、有效报价、订单、退款、复购的定义及数据负责人', 'Definitions and owners for RFQs, valid quotes, orders, refunds and repeat use'), dependency: t('MY-02 交易流程、B-01 询盘流程', 'MY-02 order flow and B-01 RFQ flow'), gate: t('没有原始记录与口径，不展示转化率或增长百分比', 'No conversion or growth rate without source records and definitions') },
  { id: 'AE-01', stage: 3, market: 'AE', title: t('阿联酋复制前先做投资决策', 'Make a UAE go/no-go decision before replication'), output: t('机构需求、许可、合作伙伴、预算、毛利与风险备忘录', 'Institutional demand, licences, partners, budget, margin and risk memo'), dependency: t('MY／US 样板证据与可复用流程', 'Evidence and reusable processes from MY/US pilots'), gate: t('商业闭环或准入证据不足时延后，不按日历强行开站', 'Delay if commercial or regulatory evidence is weak; do not launch by calendar alone') },
  { id: 'T-01', stage: 3, market: 'Global', title: t('沉淀可复用的国家启动包', 'Create the reusable country-launch pack'), output: t('主体／牌照、SKU、翻译、支付、物流、客服、数据的模板与验收记录', 'Templates and acceptance records for entity, permits, SKU, language, payment, logistics, care and data'), dependency: t('至少一个完整闭环及失败复盘', 'At least one complete loop and a failure retrospective'), gate: t('每个新国家仍须当地复核；模板不是跨国通用许可', 'Each country still needs local review; a template is not a transferable licence') },
];

const stages: { id: Stage; label: Text; period: Text; decision: Text }[] = [
  { id: 0, label: t('先排除会卡住的事', 'Remove critical blockers first'), period: t('阶段 0 · 0—2个月', 'Stage 0 · Months 0–2'), decision: t('放行开发：资金、主体、SKU 边界与责任人已明确', 'Build gate: funding, entity, SKU scope and owners are clear') },
  { id: 1, label: t('把样板真的跑通', 'Run the pilots for real'), period: t('阶段 1 · 3—6个月', 'Stage 1 · Months 3–6'), decision: t('放行试运营：合法品类的订单／询盘有完整记录', 'Pilot gate: lawful orders/RFQs have complete records') },
  { id: 2, label: t('用证据决定第二批', 'Use evidence for the second wave'), period: t('阶段 2 · 7—12个月', 'Stage 2 · Months 7–12'), decision: t('放行扩张：许可路径、履约成本与经营数据可核验', 'Expansion gate: licences, fulfilment cost and metrics are verifiable') },
  { id: 3, label: t('复制前先做 Go / No-Go', 'Decide go/no-go before replication'), period: t('阶段 3 · 13—18个月', 'Stage 3 · Months 13–18'), decision: t('放行复制：样板闭环成立，国家模板经本地复核', 'Replication gate: pilot loop works and local template is reviewed') },
];

const emptyEntry = (): Entry => ({ owner: '', due: '', evidence: '', status: 'todo' });
const storageKey = 'jiajia-execution-workbench-v1';
const statusOptions: { value: Status; label: Text }[] = [
  { value: 'todo', label: t('未开始', 'Not started') },
  { value: 'doing', label: t('进行中', 'In progress') },
  { value: 'blocked', label: t('受阻', 'Blocked') },
  { value: 'done', label: t('有证据完成', 'Done with evidence') },
];

const csvValue = (value: string) => `"${(/^[\s]*[=+\-@]/.test(value) ? `'${value}` : value).replace(/"/g, '""')}"`;

export function ExecutionWorkbench({ locale }: { locale: Locale }) {
  const [entries, setEntries] = useState<Record<string, Entry>>({});
  const [errorId, setErrorId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setEntries(JSON.parse(saved) as Record<string, Entry>);
    } catch { /* Private browsing may disable local storage. */ }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(storageKey, JSON.stringify(entries)); } catch { /* Export remains available. */ }
  }, [entries, loaded]);

  const update = (id: string, patch: Partial<Entry>) => {
    const next = { ...(entries[id] ?? emptyEntry()), ...patch };
    if (patch.status === 'done' && !next.evidence.trim()) { setErrorId(id); return; }
    if (next.status === 'done' && !next.evidence.trim()) next.status = 'doing';
    setErrorId(null);
    setEntries((current) => ({ ...current, [id]: next }));
  };

  const exportCsv = () => {
    const headers = locale === 'zh'
      ? ['编号', '阶段', '市场', '执行事项', '交付物', '前置条件', '放行标准', '负责人', '目标日期', '状态', '证据编号或链接']
      : ['ID', 'Stage', 'Market', 'Action', 'Deliverable', 'Dependency', 'Release gate', 'Owner', 'Target date', 'Status', 'Evidence ID or link'];
    const rows = tasks.map((task) => {
      const entry = entries[task.id] ?? emptyEntry();
      return [task.id, stages[task.stage].period[locale], task.market, task.title[locale], task.output[locale], task.dependency[locale], task.gate[locale], entry.owner, entry.due, statusOptions.find((option) => option.value === entry.status)?.label[locale] ?? '', entry.evidence];
    });
    const csv = '\uFEFF' + [headers, ...rows].map((row) => row.map(csvValue).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url; link.download = 'jiajia-execution-checklist.csv'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const completed = tasks.filter((task) => entries[task.id]?.status === 'done' && entries[task.id]?.evidence?.trim()).length;
  const blocked = tasks.filter((task) => entries[task.id]?.status === 'blocked').length;
  const zh = locale === 'zh';
  return <section className="execution-workbench" id="execution" aria-labelledby="execution-title">
    <div className="execution-head">
      <div><span className="execution-eyebrow"><ClipboardList size={16}/>{zh ? '执行工作台 · 可导出清单' : 'EXECUTION WORKBENCH · EXPORTABLE CHECKLIST'}</span><h2 id="execution-title">{zh ? '下一步做什么，谁负责，拿什么放行。' : 'What happens next. Who owns it. What clears the gate.'}</h2><p>{zh ? '把 18 个月路线图拆成可分工的交付物。所有任务初始为“未开始”，不代表真实项目进度。' : 'Turn the 18-month roadmap into assignable deliverables. All tasks start as “Not started”; this is not a report of actual progress.'}</p></div>
      <div className="execution-summary"><div><strong>{completed}<small> / {tasks.length}</small></strong><span>{zh ? '有证据完成' : 'Evidence-backed done'}</span></div><div><strong>{blocked}</strong><span>{zh ? '受阻项' : 'Blocked items'}</span></div><button type="button" onClick={exportCsv}><ArrowDownToLine size={17}/>{zh ? '导出执行清单 CSV' : 'Export checklist CSV'}</button></div>
    </div>
    <div className="execution-warning"><LockKeyhole size={17}/><p>{zh ? '这是静态网站：填写内容仅保存在当前浏览器，不会同步给团队；请导出 CSV 放入公司正式项目系统。只填证据编号或链接，不要在此输入合同、客户或患者敏感信息。' : 'This is a static site. Edits stay in this browser and do not sync with your team. Export the CSV into your company project system. Enter evidence IDs or links only—no confidential contracts, customer or patient data.'}</p></div>
    {stages.map((stage) => {
      const stageTasks = tasks.filter((task) => task.stage === stage.id);
      const stageDone = stageTasks.filter((task) => entries[task.id]?.status === 'done' && entries[task.id]?.evidence?.trim()).length;
      return <div className="execution-stage" key={stage.id}>
        <div className="execution-stage-head"><div><span>{stage.period[locale]}</span><h3>{stage.label[locale]}</h3></div><div className="execution-stage-gate"><CheckCircle2 size={16}/><p>{stage.decision[locale]}</p></div><b>{stageDone}/{stageTasks.length}</b></div>
        <div className="execution-table-head" aria-hidden="true"><span>{zh ? '工作项 / 交付物' : 'ACTION / DELIVERABLE'}</span><span>{zh ? '负责人 / 目标日期' : 'OWNER / TARGET DATE'}</span><span>{zh ? '状态 / 放行证据' : 'STATUS / RELEASE EVIDENCE'}</span></div>
        {stageTasks.map((task) => {
          const entry = entries[task.id] ?? emptyEntry();
          return <div className={`execution-row ${entry.status}`} key={task.id}>
            <div className="execution-task"><div className="execution-task-meta"><span>{task.id}</span><span>{task.market}</span></div><h4>{task.title[locale]}</h4><p><b>{zh ? '交付' : 'Output'}</b>{task.output[locale]}</p><p><b>{zh ? '前置' : 'Depends on'}</b>{task.dependency[locale]}</p><div className="execution-task-gate"><LockKeyhole size={13}/>{task.gate[locale]}{task.source && <a href={task.source.url} target="_blank" rel="noopener noreferrer">{task.source.label}<ArrowUpRight size={12}/></a>}</div></div>
            <div className="execution-assignment"><label>{zh ? '负责人' : 'Owner'}<input type="text" value={entry.owner} onChange={(event) => update(task.id, { owner: event.target.value })} placeholder={zh ? '待指定' : 'Assign owner'} autoComplete="off"/></label><label>{zh ? '目标日期' : 'Target date'}<input type="date" value={entry.due} onChange={(event) => update(task.id, { due: event.target.value })}/></label></div>
            <div className="execution-record"><label>{zh ? '状态' : 'Status'}<select value={entry.status} onChange={(event) => update(task.id, { status: event.target.value as Status })}>{statusOptions.map((option) => <option value={option.value} key={option.value}>{option.label[locale]}</option>)}</select></label><label>{zh ? '证据编号或链接' : 'Evidence ID or link'}<input type="text" value={entry.evidence} onChange={(event) => update(task.id, { evidence: event.target.value })} placeholder={zh ? '完成前必须填写' : 'Required before done'} autoComplete="off"/></label>{errorId === task.id && <small role="alert">{zh ? '请先填写可复核的证据编号或链接。' : 'Add a reviewable evidence ID or link first.'}</small>}</div>
          </div>;
        })}
      </div>;
    })}
  </section>;
}
