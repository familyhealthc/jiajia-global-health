'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { GeometryCollection, Topology } from 'topojson-specification';
import world from 'world-atlas/countries-110m.json';
import { ArrowUpRight, Hand, MousePointer2, Radio } from 'lucide-react';

type Locale = 'zh' | 'en';

type Market = {
  code: string;
  name: { zh: string; en: string };
  phase: { zh: string; en: string };
  role: { zh: string; en: string };
  model: string;
  coordinates: [number, number];
  status: 'hub' | 'live' | 'next' | 'node';
};

const hongKong: [number, number] = [114.1694, 22.3193];

const markets: Market[] = [
  { code: 'HK', name: { zh: '中国香港', en: 'Hong Kong, China' }, phase: { zh: '全球枢纽 · 持续建设', en: 'Global hub · Continuous build' }, role: { zh: '首个海外分公司 · 全球投资与辐射起点', en: 'First overseas subsidiary · Global investment launch hub' }, model: 'S2B2C HQ + INVESTMENT + PARTNERSHIPS', coordinates: hongKong, status: 'hub' },
  { code: 'MY', name: { zh: '马来西亚', en: 'Malaysia' }, phase: { zh: '首发样板 · 0—6个月', en: 'Launch pilot · Months 0—6' }, role: { zh: '低成本端到端样板', en: 'Low-cost end-to-end pilot' }, model: 'E2C + B2C + B2B', coordinates: [101.6869, 3.139], status: 'live' },
  { code: 'US', name: { zh: '美国', en: 'United States' }, phase: { zh: '首发样板 · 0—6个月', en: 'Launch pilot · Months 0—6' }, role: { zh: '高价值品牌与内容样板', en: 'High-value content & brand pilot' }, model: 'E2C + SELECTED B2C', coordinates: [-98.5795, 39.8283], status: 'live' },
  { code: 'ID', name: { zh: '印度尼西亚', en: 'Indonesia' }, phase: { zh: '第二批 · 7—12个月', en: 'Second wave · Months 7—12' }, role: { zh: '区域渠道模式样板', en: 'Regional channel pilot' }, model: 'S2B2C + B2C + E2C', coordinates: [106.8456, -6.2088], status: 'next' },
  { code: 'MX', name: { zh: '墨西哥', en: 'Mexico' }, phase: { zh: '第二批 · 7—12个月', en: 'Second wave · Months 7—12' }, role: { zh: '拉美复制样板', en: 'Latin America replication pilot' }, model: 'B2B + B2C + E2C', coordinates: [-99.1332, 19.4326], status: 'next' },
  { code: 'AE', name: { zh: '阿联酋', en: 'United Arab Emirates' }, phase: { zh: '复制期 · 13—18个月', en: 'Replication · Months 13—18' }, role: { zh: '中东资源与业务节点', en: 'Middle East business node' }, model: 'B2B / E2C → B2C', coordinates: [54.3773, 24.4539], status: 'next' },
  { code: 'SG', name: { zh: '新加坡', en: 'Singapore' }, phase: { zh: '区域资源节点', en: 'Regional resource node' }, role: { zh: '连接专家、品牌、机构与资本', en: 'Experts, brands, institutions & capital' }, model: 'REGIONAL NETWORK NODE', coordinates: [103.8198, 1.3521], status: 'node' },
];

const labels = {
  zh: {
    kicker: '香港全球出海中枢',
    title: '从中国香港出发，向全球投资与辐射。',
    copy: '中国香港是家家健康第一个海外分公司，也是全球投资、产业合作与市场拓展的起点。由香港连接国际资本、品牌、专家和供应链，再将 S2B2C 模式向重点市场复制。',
    drag: '拖动旋转', click: '点击节点', auto: '自动巡航', phase: '进入阶段', role: '战略角色', model: '业务模型', open: '查看完整市场策略',
  },
  en: {
    kicker: 'HONG KONG GLOBAL LAUNCH HUB',
    title: 'Invest and expand globally from Hong Kong, China.',
    copy: 'Hong Kong is Jiajia Health’s first overseas subsidiary and the starting point for global investment, industry partnerships and market development. It connects international capital, brands, experts and supply chains before the S2B2C model expands into priority markets.',
    drag: 'Drag to rotate', click: 'Select a node', auto: 'Auto orbit', phase: 'ENTRY PHASE', role: 'STRATEGIC ROLE', model: 'BUSINESS MODEL', open: 'View full market strategy',
  },
};

export function StrategyGlobe({ locale = 'zh' }: { locale?: Locale }) {
  const t = labels[locale];
  const [rotation, setRotation] = useState<[number, number]>([-hongKong[0], -hongKong[1]]);
  const [selected, setSelected] = useState('HK');
  const [interacting, setInteracting] = useState(false);
  const drag = useRef<{ x: number; y: number; rotation: [number, number] } | null>(null);
  const lastFrame = useRef<number | null>(null);

  const countries = useMemo(() => {
    const topology = world as unknown as Topology;
    return feature(topology, topology.objects.countries as GeometryCollection);
  }, []);
  const projection = useMemo(() => geoOrthographic().translate([360, 360]).scale(318).clipAngle(90).precision(0.35).rotate(rotation), [rotation]);
  const path = useMemo(() => geoPath(projection), [projection]);
  const active = markets.find((market) => market.code === selected) ?? markets[0];

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || interacting) return;
    let frame = 0;
    const animate = (time: number) => {
      if (lastFrame.current !== null && time - lastFrame.current > 28) {
        const delta = Math.min(time - lastFrame.current, 60);
        setRotation(([longitude, latitude]) => [longitude + delta * 0.0032, latitude]);
        lastFrame.current = time;
      } else if (lastFrame.current === null) lastFrame.current = time;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); lastFrame.current = null; };
  }, [interacting]);

  const pointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY, rotation };
    setInteracting(true);
  };
  const pointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!drag.current) return;
    const nextLongitude = drag.current.rotation[0] + (event.clientX - drag.current.x) * 0.28;
    const nextLatitude = Math.max(-55, Math.min(55, drag.current.rotation[1] - (event.clientY - drag.current.y) * 0.22));
    setRotation([nextLongitude, nextLatitude]);
  };
  const pointerUp = () => { drag.current = null; setInteracting(false); };

  return (
    <section className="globe-section" id="globe">
      <div className="globe-copy">
        <div className="section-kicker light"><Radio size={14} />{t.kicker}</div>
        <h2>{t.title}</h2>
        <p>{t.copy}</p>
        <div className="globe-instructions" aria-label={locale === 'zh' ? '地图操作说明' : 'Map controls'}>
          <span><Hand size={15} />{t.drag}</span><span><MousePointer2 size={15} />{t.click}</span><span><Radio size={15} />{t.auto}</span>
        </div>
        <div className="globe-market-strip">
          {markets.map((market) => (
            <button key={market.code} className={selected === market.code ? 'active' : ''} onClick={() => { setSelected(market.code); setRotation([-market.coordinates[0], -market.coordinates[1]]); }}>
              <span>{market.code}</span>{market.name[locale]}
            </button>
          ))}
        </div>
      </div>

      <div className="globe-stage">
        <div className="globe-halo" aria-hidden="true" />
        <svg className="strategy-globe" viewBox="0 0 720 720" aria-label={locale === 'zh' ? '可旋转全球市场地图' : 'Rotatable global market map'} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
          <defs><radialGradient id="oceanGlow" cx="38%" cy="30%"><stop offset="0" stopColor="#58b8b7"/><stop offset=".72" stopColor="#1b7f88"/><stop offset="1" stopColor="#0d5967"/></radialGradient></defs>
          <circle cx="360" cy="360" r="318" fill="url(#oceanGlow)" stroke="rgba(216,179,106,.48)" strokeWidth="1.2" />
          <path d={path(geoGraticule10()) ?? ''} className="globe-graticule" />
          <path d={path(countries as never) ?? ''} className="globe-land" />
          {markets.filter((market) => market.code !== 'HK').map((market) => (
            <path key={`route-${market.code}`} d={path({ type: 'LineString', coordinates: [hongKong, market.coordinates] } as never) ?? ''} className={`globe-route ${market.status}`} />
          ))}
          {markets.map((market) => {
            const point = projection(market.coordinates);
            const center: [number, number] = [-rotation[0], -rotation[1]];
            const visible = point && geoDistance(market.coordinates, center) < Math.PI / 2;
            if (!point || !visible) return null;
            return <g key={market.code} className={`globe-marker ${market.status} ${selected === market.code ? 'selected' : ''}`} transform={`translate(${point[0]},${point[1]})`} onPointerDown={(event) => { event.stopPropagation(); setSelected(market.code); }} aria-hidden="true">
              <circle className="marker-pulse" r="20" /><circle className="marker-dot" r="6" /><text x="12" y="-11">{market.code}</text>
            </g>;
          })}
        </svg>
        <div className="globe-readout" aria-live="polite">
          <div className="readout-head"><span>{active.code}</span><div><small>{active.phase[locale]}</small><h3>{active.name[locale]}</h3></div></div>
          <dl><div><dt>{t.role}</dt><dd>{active.role[locale]}</dd></div><div><dt>{t.model}</dt><dd>{active.model}</dd></div></dl>
          <a href="#markets">{t.open}<ArrowUpRight size={15}/></a>
        </div>
        <span className="globe-coordinate" aria-hidden="true">{Math.abs(active.coordinates[1]).toFixed(2)}°{active.coordinates[1] >= 0 ? 'N' : 'S'} · {Math.abs(active.coordinates[0]).toFixed(2)}°{active.coordinates[0] >= 0 ? 'E' : 'W'}</span>
      </div>
    </section>
  );
}
