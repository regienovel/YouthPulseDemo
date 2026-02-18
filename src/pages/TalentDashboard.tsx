import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import {
  Users,
  Star,
  Trophy,
  Target,
  TrendingUp,
  Zap,
  ChevronDown,
  MapPin,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Shield,
} from 'lucide-react';

import {
  OVERVIEW_KPIS,
  ATHLETES,
  TALENT_PIPELINE,
  TALENT_ALERTS,
  SPORT_PARTICIPATION,
  REGIONS,
  AGE_DISTRIBUTION,
} from '../data/mock-data';
import { KPICard, MiniStatCard } from '../components/KPICard';

// ────────────────────────────────────────────────────────────
// Animation helpers
// ────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// ────────────────────────────────────────────────────────────
// Formatting helpers
// ────────────────────────────────────────────────────────────

function formatNumber(value: number): string {
  return value.toLocaleString();
}

// ────────────────────────────────────────────────────────────
// Shared tooltip configuration
// ────────────────────────────────────────────────────────────

const TOOLTIP_STYLE = {
  backgroundColor: '#1E293B',
  borderColor: '#334155',
  borderWidth: 1,
  textStyle: { color: '#E2E8F0', fontSize: 13 },
};

// ────────────────────────────────────────────────────────────
// Tier badge helpers
// ────────────────────────────────────────────────────────────

const TIER_CONFIG = {
  international: {
    label: 'International',
    bg: 'bg-amber-500/15',
    text: 'text-amber-400',
    border: 'border-amber-500/20',
  },
  national: {
    label: 'National',
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-400',
    border: 'border-emerald-500/20',
  },
  regional: {
    label: 'Regional',
    bg: 'bg-blue-500/15',
    text: 'text-blue-400',
    border: 'border-blue-500/20',
  },
  district: {
    label: 'District',
    bg: 'bg-purple-500/15',
    text: 'text-purple-400',
    border: 'border-purple-500/20',
  },
  community: {
    label: 'Community',
    bg: 'bg-slate-500/15',
    text: 'text-slate-400',
    border: 'border-slate-500/20',
  },
};

// ────────────────────────────────────────────────────────────
// Alert level helpers
// ────────────────────────────────────────────────────────────

function getAlertBadgeClass(level: string): string {
  switch (level) {
    case 'elite':
      return 'bg-amber-500/15 text-amber-400 border border-amber-500/30';
    case 'exceptional':
      return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20';
    case 'promising':
      return 'bg-blue-500/15 text-blue-400 border border-blue-500/20';
    default:
      return 'bg-slate-500/15 text-slate-400 border border-slate-500/20';
  }
}

function getAlertIcon(level: string) {
  switch (level) {
    case 'elite':
      return <Star size={14} className="fill-amber-400" />;
    case 'exceptional':
      return <Zap size={14} />;
    case 'promising':
      return <TrendingUp size={14} />;
    default:
      return <Star size={14} />;
  }
}

// ────────────────────────────────────────────────────────────
// Pipeline tier config
// ────────────────────────────────────────────────────────────

const PIPELINE_TIERS = [
  { key: 'community' as const, label: 'Community', color: '#92702A' },
  { key: 'district' as const, label: 'District', color: '#B8860B' },
  { key: 'regional' as const, label: 'Regional', color: '#D4A017' },
  { key: 'national' as const, label: 'National', color: '#F59E0B' },
  { key: 'international' as const, label: 'International', color: '#FCD34D' },
];

// ────────────────────────────────────────────────────────────
// Sport colors
// ────────────────────────────────────────────────────────────

const SPORT_COLORS: Record<string, string> = {
  Football: '#F59E0B',
  Athletics: '#10B981',
  Boxing: '#EF4444',
  Basketball: '#3B82F6',
  Volleyball: '#8B5CF6',
  Handball: '#EC4899',
  'Table Tennis': '#14B8A6',
  Swimming: '#22D3EE',
  Tennis: '#F97316',
  Weightlifting: '#6366F1',
  Hockey: '#84CC16',
  Cycling: '#A855F7',
};

// ============================================================
// TalentDashboard page
// ============================================================

export default function TalentDashboard() {
  // ── Filter state (visual only for demo) ──
  const [selectedSport, setSelectedSport] = useState('All Sports');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedTier, setSelectedTier] = useState('All Tiers');

  const sports = [
    'All Sports',
    'Football',
    'Athletics',
    'Boxing',
    'Basketball',
    'Swimming',
    'Volleyball',
    'Tennis',
    'Weightlifting',
    'Handball',
    'Table Tennis',
    'Hockey',
    'Cycling',
  ];

  const tiers = ['All Tiers', 'Community', 'District', 'Regional', 'National', 'International'];

  // ── Computed data ──
  const nationalPlusCount = TALENT_PIPELINE.national + TALENT_PIPELINE.international;

  const sortedAthletes = useMemo(
    () => [...ATHLETES].sort((a, b) => b.potentialScore - a.potentialScore),
    []
  );

  const dropoutCounts = useMemo(() => {
    const low = ATHLETES.filter((a) => a.dropoutRisk < 0.3).length;
    const medium = ATHLETES.filter((a) => a.dropoutRisk >= 0.3 && a.dropoutRisk <= 0.6).length;
    const high = ATHLETES.filter((a) => a.dropoutRisk > 0.6).length;
    return { low, medium, high };
  }, []);

  // ── Pipeline funnel chart ──
  const funnelChartOption = useMemo(() => {
    const tiers = [
      { name: 'Community', value: TALENT_PIPELINE.community },
      { name: 'District', value: TALENT_PIPELINE.district },
      { name: 'Regional', value: TALENT_PIPELINE.regional },
      { name: 'National', value: TALENT_PIPELINE.national },
      { name: 'International', value: TALENT_PIPELINE.international },
    ];

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          const idx = tiers.findIndex((t) => t.name === params.name);
          let conversionLine = '';
          if (idx < tiers.length - 1) {
            const rate = ((tiers[idx + 1].value / tiers[idx].value) * 100).toFixed(1);
            conversionLine = `<div style="margin-top:4px;font-size:11px;color:#94A3B8">Advancement rate to ${tiers[idx + 1].name}: <b>${rate}%</b></div>`;
          }
          return `<div style="font-weight:600;margin-bottom:4px">${params.name}</div>
            <div>Athletes: <b>${params.value.toLocaleString()}</b></div>
            ${conversionLine}`;
        },
      },
      series: [
        {
          type: 'funnel',
          left: '10%',
          top: 16,
          bottom: 16,
          width: '80%',
          min: 0,
          max: TALENT_PIPELINE.community,
          minSize: '8%',
          maxSize: '100%',
          sort: 'descending',
          gap: 4,
          label: {
            show: true,
            position: 'inside',
            formatter: (params: any) => {
              return `{name|${params.name}}\n{value|${params.value.toLocaleString()}}`;
            },
            rich: {
              name: {
                fontSize: 13,
                fontWeight: 600,
                color: '#F8FAFC',
                lineHeight: 20,
              },
              value: {
                fontSize: 12,
                color: '#CBD5E1',
                lineHeight: 18,
              },
            },
          },
          labelLine: { show: false },
          itemStyle: {
            borderColor: 'rgba(0,0,0,0.2)',
            borderWidth: 1,
          },
          emphasis: {
            label: {
              fontSize: 14,
            },
          },
          data: tiers.map((t, i) => ({
            name: t.name,
            value: t.value,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 0, color: PIPELINE_TIERS[i].color },
                  {
                    offset: 1,
                    color:
                      i < PIPELINE_TIERS.length - 1
                        ? PIPELINE_TIERS[i + 1].color
                        : '#FEF3C7',
                  },
                ],
              },
            },
          })),
        },
      ],
      animationDuration: 1200,
      animationEasing: 'cubicOut',
    };
  }, []);

  // ── Conversion rates between tiers ──
  const conversionRates = useMemo(() => {
    const tiers = [
      { from: 'Community', to: 'District', rate: (TALENT_PIPELINE.district / TALENT_PIPELINE.community * 100).toFixed(1) },
      { from: 'District', to: 'Regional', rate: (TALENT_PIPELINE.regional / TALENT_PIPELINE.district * 100).toFixed(1) },
      { from: 'Regional', to: 'National', rate: (TALENT_PIPELINE.national / TALENT_PIPELINE.regional * 100).toFixed(1) },
      { from: 'National', to: 'International', rate: (TALENT_PIPELINE.international / TALENT_PIPELINE.national * 100).toFixed(1) },
    ];
    return tiers;
  }, []);

  // ── Sport participation horizontal bar chart ──
  const participationChartOption = useMemo(() => {
    const sorted = [...SPORT_PARTICIPATION].sort((a, b) => a.total - b.total);

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          const sport = sorted.find((s) => s.sport === params[0].name);
          if (!sport) return params[0].name;
          return `<div style="font-weight:600;margin-bottom:4px">${sport.sport}</div>
            <div>Total: <b>${sport.total.toLocaleString()}</b></div>
            <div style="color:#60A5FA">Male: <b>${sport.male.toLocaleString()}</b></div>
            <div style="color:#E879F9">Female: <b>${sport.female.toLocaleString()}</b></div>
            <div style="margin-top:4px;color:#10B981">Growth: <b>+${sport.growthPercent}%</b></div>`;
        },
      },
      legend: {
        data: ['Male', 'Female'],
        top: 0,
        right: 0,
        textStyle: { color: '#94A3B8', fontSize: 12 },
        itemWidth: 12,
        itemHeight: 12,
      },
      grid: {
        top: 36,
        left: 8,
        right: 80,
        bottom: 8,
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#1E293B', opacity: 0.6 } },
        axisLabel: {
          color: '#64748B',
          fontSize: 11,
          formatter: (val: number) => {
            if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
            return val.toString();
          },
        },
      },
      yAxis: {
        type: 'category',
        data: sorted.map((s) => s.sport),
        axisLine: { lineStyle: { color: '#1E293B' } },
        axisTick: { show: false },
        axisLabel: { color: '#94A3B8', fontSize: 11 },
      },
      series: [
        {
          name: 'Male',
          type: 'bar',
          stack: 'total',
          data: sorted.map((s) => s.male),
          itemStyle: {
            color: '#3B82F6',
            borderRadius: [0, 0, 0, 0],
          },
          barWidth: 16,
        },
        {
          name: 'Female',
          type: 'bar',
          stack: 'total',
          data: sorted.map((s) => s.female),
          itemStyle: {
            color: '#D946EF',
            borderRadius: [0, 3, 3, 0],
          },
          barWidth: 16,
          label: {
            show: true,
            position: 'right',
            formatter: (params: any) => {
              const sport = sorted[params.dataIndex];
              return `+${sport.growthPercent}%`;
            },
            fontSize: 10,
            fontWeight: 600,
            color: '#10B981',
          },
        },
      ],
      animationDuration: 1200,
      animationEasing: 'cubicOut',
    };
  }, []);

  // ── Age/gender butterfly chart ──
  const ageGenderChartOption = useMemo(() => {
    const ageGroups = AGE_DISTRIBUTION.map((a) => a.ageGroup);
    const totalPop =
      AGE_DISTRIBUTION.reduce((s, a) => s + a.male + a.female, 0);
    const maleData = AGE_DISTRIBUTION.map((a) => -a.male);
    const femaleData = AGE_DISTRIBUTION.map((a) => a.female);
    const maxVal = Math.max(
      ...AGE_DISTRIBUTION.map((a) => Math.max(a.male, a.female))
    );

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          const ageGroup = params[0].name;
          const maleVal = Math.abs(params[0].value);
          const femaleVal = params[1].value;
          const malePct = ((maleVal / totalPop) * 100).toFixed(1);
          const femalePct = ((femaleVal / totalPop) * 100).toFixed(1);
          return `<div style="font-weight:600;margin-bottom:4px">Age ${ageGroup}</div>
            <div style="color:#60A5FA">Male: <b>${maleVal.toLocaleString()}</b> (${malePct}%)</div>
            <div style="color:#E879F9">Female: <b>${femaleVal.toLocaleString()}</b> (${femalePct}%)</div>`;
        },
      },
      legend: {
        data: ['Male', 'Female'],
        top: 0,
        right: 0,
        textStyle: { color: '#94A3B8', fontSize: 12 },
        itemWidth: 12,
        itemHeight: 12,
      },
      grid: {
        top: 36,
        left: 8,
        right: 8,
        bottom: 8,
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        min: -maxVal * 1.15,
        max: maxVal * 1.15,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#1E293B', opacity: 0.6 } },
        axisLabel: {
          color: '#64748B',
          fontSize: 11,
          formatter: (val: number) => {
            const abs = Math.abs(val);
            if (abs >= 1000) return `${(abs / 1000).toFixed(0)}K`;
            return abs.toString();
          },
        },
      },
      yAxis: {
        type: 'category',
        data: ageGroups,
        axisTick: { show: false },
        axisLine: { lineStyle: { color: '#1E293B' } },
        axisLabel: {
          color: '#94A3B8',
          fontSize: 12,
          fontWeight: 600,
        },
      },
      series: [
        {
          name: 'Male',
          type: 'bar',
          data: maleData,
          itemStyle: {
            color: {
              type: 'linear',
              x: 1,
              y: 0,
              x2: 0,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#3B82F6' },
                { offset: 1, color: '#1D4ED8' },
              ],
            },
            borderRadius: [4, 0, 0, 4],
          },
          barWidth: 22,
          label: {
            show: true,
            position: 'left',
            formatter: (params: any) => {
              const pct = ((Math.abs(params.value) / totalPop) * 100).toFixed(1);
              return `${pct}%`;
            },
            fontSize: 10,
            color: '#60A5FA',
          },
        },
        {
          name: 'Female',
          type: 'bar',
          data: femaleData,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#D946EF' },
                { offset: 1, color: '#A21CAF' },
              ],
            },
            borderRadius: [0, 4, 4, 0],
          },
          barWidth: 22,
          label: {
            show: true,
            position: 'right',
            formatter: (params: any) => {
              const pct = ((params.value / totalPop) * 100).toFixed(1);
              return `${pct}%`;
            },
            fontSize: 10,
            color: '#E879F9',
          },
        },
      ],
      animationDuration: 1200,
      animationEasing: 'cubicOut',
    };
  }, []);

  // ── Sport distribution radar chart ──
  const radarChartOption = useMemo(() => {
    const categories = ['Speed', 'Power', 'Endurance', 'Agility', 'Skill', 'Strength'];

    // Sport profiles (normalized 0-100 for display)
    const sportProfiles = [
      {
        name: 'Athletics',
        color: '#10B981',
        values: [95, 80, 85, 70, 50, 60],
      },
      {
        name: 'Football',
        color: '#F59E0B',
        values: [80, 60, 78, 90, 88, 50],
      },
      {
        name: 'Boxing',
        color: '#EF4444',
        values: [75, 90, 82, 78, 72, 85],
      },
      {
        name: 'Swimming',
        color: '#22D3EE',
        values: [70, 65, 92, 60, 75, 70],
      },
    ];

    return {
      backgroundColor: 'transparent',
      tooltip: {
        ...TOOLTIP_STYLE,
      },
      legend: {
        data: sportProfiles.map((s) => s.name),
        bottom: 0,
        left: 'center',
        textStyle: { color: '#94A3B8', fontSize: 11 },
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 16,
      },
      radar: {
        indicator: categories.map((c) => ({ name: c, max: 100 })),
        center: ['50%', '48%'],
        radius: '62%',
        shape: 'polygon',
        splitNumber: 4,
        axisName: {
          color: '#94A3B8',
          fontSize: 11,
          fontWeight: 500,
        },
        splitLine: {
          lineStyle: { color: '#1E293B', width: 1 },
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(30,41,59,0.3)', 'rgba(30,41,59,0.1)'],
          },
        },
        axisLine: {
          lineStyle: { color: '#334155' },
        },
      },
      series: [
        {
          type: 'radar',
          data: sportProfiles.map((sp) => ({
            name: sp.name,
            value: sp.values,
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: { width: 2, color: sp.color },
            itemStyle: { color: sp.color },
            areaStyle: {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  { offset: 0, color: sp.color + '30' },
                  { offset: 1, color: sp.color + '05' },
                ],
              },
            },
          })),
        },
      ],
      animationDuration: 1200,
      animationEasing: 'cubicOut',
    };
  }, []);

  // ── Regional athlete distribution bar chart ──
  const regionalAthleteChartOption = useMemo(() => {
    const sorted = [...REGIONS]
      .sort((a, b) => a.athletesTracked - b.athletesTracked)
      .slice(-10); // top 10

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          const region = sorted.find((r) => r.name === params[0].name);
          if (!region) return params[0].name;
          return `<div style="font-weight:600;margin-bottom:4px">${region.name}</div>
            <div>Athletes Tracked: <b>${region.athletesTracked.toLocaleString()}</b></div>
            <div style="margin-top:2px;color:#94A3B8">Top Sport: <b>${region.topSport}</b></div>
            <div style="color:#94A3B8">Participation Rate: <b>${region.participationRate}%</b></div>`;
        },
      },
      grid: {
        top: 12,
        left: 8,
        right: 16,
        bottom: 8,
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#1E293B', opacity: 0.6 } },
        axisLabel: {
          color: '#64748B',
          fontSize: 11,
          formatter: (val: number) => {
            if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
            return val.toString();
          },
        },
      },
      yAxis: {
        type: 'category',
        data: sorted.map((r) => r.name),
        axisLine: { lineStyle: { color: '#1E293B' } },
        axisTick: { show: false },
        axisLabel: { color: '#94A3B8', fontSize: 11 },
      },
      series: [
        {
          type: 'bar',
          data: sorted.map((r) => ({
            value: r.athletesTracked,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 0, color: r.color + 'CC' },
                  { offset: 1, color: r.color },
                ],
              },
              borderRadius: [0, 4, 4, 0],
            },
          })),
          barWidth: 16,
        },
      ],
      animationDuration: 1200,
      animationEasing: 'cubicOut',
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-primary flex items-center gap-3">
              Grassroots Talent Discovery
              <span className="text-2xl md:text-3xl" role="img" aria-label="Ghana flag">
                {'\u{1F3C6}'}
              </span>
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Tracking {formatNumber(OVERVIEW_KPIS.totalAthletes)} athletes across 21 sports disciplines
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Last updated: 18 Feb 2026, 14:32 GMT
          </div>
        </div>

        {/* ── Filter Row ── */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {/* Sport filter */}
          <div className="relative">
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="appearance-none rounded-xl bg-[#111827]/60 pl-3 pr-9 py-2 text-sm text-text-secondary ring-1 ring-white/[0.06] focus:outline-none focus:ring-amber-500/30 cursor-pointer hover:bg-[#111827]/80 transition-colors"
            >
              {sports.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
          </div>

          {/* Region filter */}
          <div className="relative">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="appearance-none rounded-xl bg-[#111827]/60 pl-3 pr-9 py-2 text-sm text-text-secondary ring-1 ring-white/[0.06] focus:outline-none focus:ring-amber-500/30 cursor-pointer hover:bg-[#111827]/80 transition-colors"
            >
              <option>All Regions</option>
              {REGIONS.map((r) => (
                <option key={r.code} value={r.name}>
                  {r.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
          </div>

          {/* Tier filter */}
          <div className="relative">
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="appearance-none rounded-xl bg-[#111827]/60 pl-3 pr-9 py-2 text-sm text-text-secondary ring-1 ring-white/[0.06] focus:outline-none focus:ring-amber-500/30 cursor-pointer hover:bg-[#111827]/80 transition-colors"
            >
              {tiers.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
          </div>
        </div>
      </motion.div>

      {/* ── KPI Row ── */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <KPICard
          title="Athletes Tracked"
          value={OVERVIEW_KPIS.totalAthletes}
          icon={<Users size={22} />}
          color="gold"
          trend={OVERVIEW_KPIS.athleteGrowth}
          trendLabel="vs last quarter"
          delay={0}
        />
        <KPICard
          title="Talent Alerts This Month"
          value={OVERVIEW_KPIS.talentAlertsThisMonth}
          icon={<Star size={22} />}
          color="red"
          delay={0.1}
        />
        <KPICard
          title="National+ Athletes"
          value={nationalPlusCount}
          icon={<Trophy size={22} />}
          color="green"
          delay={0.2}
        />
        <KPICard
          title="Sport Diversity Index"
          value={0.73}
          icon={<Target size={22} />}
          color="purple"
          suffix="/1.0"
          delay={0.3}
          decimals={2}
        />
      </motion.div>

      {/* ── Section 1: Talent Pipeline Funnel ── */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-heading font-semibold text-text-primary">
            Talent Development Pipeline
          </h3>
          <span className="text-xs text-text-muted">
            Total: {formatNumber(
              TALENT_PIPELINE.community +
              TALENT_PIPELINE.district +
              TALENT_PIPELINE.regional +
              TALENT_PIPELINE.national +
              TALENT_PIPELINE.international
            )} athletes
          </span>
        </div>

        <ReactECharts
          option={funnelChartOption}
          style={{ height: '320px', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />

        {/* Conversion rates */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {conversionRates.map((cr, idx) => (
            <motion.div
              key={cr.from}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + idx * 0.1, duration: 0.4 }}
              className="flex items-center gap-2 text-xs"
            >
              <span className="text-text-muted">{cr.from}</span>
              <span className="text-text-muted">&rarr;</span>
              <span className="text-text-muted">{cr.to}</span>
              <span className="font-semibold text-amber-400">{cr.rate}%</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Section 2: Two-column grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Sport Participation */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.35 }}
          className="glass-card p-6"
        >
          <h3 className="text-base font-heading font-semibold text-text-primary mb-4">
            Sport Participation &mdash; Gender Split
          </h3>
          <ReactECharts
            option={participationChartOption}
            style={{ height: '400px', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </motion.div>

        {/* Right: Gender & Age Demographics */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card p-6"
        >
          <h3 className="text-base font-heading font-semibold text-text-primary mb-4">
            Athlete Age &amp; Gender Distribution
          </h3>
          <ReactECharts
            option={ageGenderChartOption}
            style={{ height: '400px', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </motion.div>
      </div>

      {/* ── Section 3: Talent Alerts Feed ── */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Star size={18} className="text-ghana-gold" />
          <h3 className="text-base font-heading font-semibold text-text-primary">
            Recent Talent Alerts
          </h3>
          <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-amber-500/15 text-amber-400 text-[11px] font-bold border border-amber-500/20">
            {TALENT_ALERTS.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TALENT_ALERTS.map((alert, idx) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.06, duration: 0.45 }}
              className={[
                'glass-card p-5 hover:border-white/10 transition-all duration-300 cursor-pointer group',
                alert.alertLevel === 'elite'
                  ? 'ring-1 ring-amber-500/20 shadow-lg shadow-amber-500/5'
                  : '',
              ].join(' ')}
            >
              {/* Alert level badge */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide ${getAlertBadgeClass(
                    alert.alertLevel
                  )} ${alert.alertLevel === 'elite' ? 'animate-pulse' : ''}`}
                >
                  {getAlertIcon(alert.alertLevel)}
                  {alert.alertLevel}
                </span>
                <span className="text-[11px] text-text-muted">{alert.date}</span>
              </div>

              {/* Athlete name */}
              <p className="text-base font-bold text-text-primary group-hover:text-ghana-gold transition-colors">
                {alert.athleteName}
              </p>

              {/* Sport & Event */}
              <div className="mt-1 flex items-center gap-2 text-xs text-text-secondary">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: SPORT_COLORS[alert.sport] || '#94A3B8' }}
                />
                <span>{alert.sport}</span>
                <span className="text-text-muted">&bull;</span>
                <span>{alert.event}</span>
              </div>

              {/* Performance value */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xl font-bold text-text-primary">
                  {alert.performance}
                </span>
                <div className="flex items-center gap-1">
                  <MapPin size={11} className="text-text-muted" />
                  <span className="text-xs text-text-muted">{alert.region}</span>
                </div>
              </div>

              {/* Percentile bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-text-muted">National Percentile</span>
                  <span className="text-xs font-bold text-amber-400">
                    Top {(100 - alert.percentile).toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-surface-tertiary/60 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${alert.percentile}%` }}
                    transition={{ delay: 0.7 + idx * 0.06, duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background:
                        alert.alertLevel === 'elite'
                          ? 'linear-gradient(90deg, #D97706, #F59E0B, #FCD34D)'
                          : alert.alertLevel === 'exceptional'
                          ? 'linear-gradient(90deg, #059669, #10B981, #34D399)'
                          : 'linear-gradient(90deg, #2563EB, #3B82F6, #60A5FA)',
                    }}
                  />
                </div>
              </div>

              {/* Recommendation */}
              <div className="mt-3 pl-3 border-l-2 border-amber-500/30">
                <p className="text-xs text-text-muted leading-relaxed line-clamp-2 italic">
                  {alert.recommendation}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Section 4: Top Athletes Directory ── */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.5 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-5">
          <Trophy size={18} className="text-ghana-gold" />
          <h3 className="text-base font-heading font-semibold text-text-primary">
            Top Athletes
          </h3>
          <span className="text-xs text-text-muted ml-2">
            Ranked by AI potential score
          </span>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide w-10">
                  #
                </th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide">
                  Name
                </th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide w-12">
                  Age
                </th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide w-16">
                  Gender
                </th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide">
                  Region
                </th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide">
                  Sport
                </th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide w-28">
                  Tier
                </th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide w-36">
                  Potential
                </th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide">
                  Event
                </th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide">
                  PB
                </th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide w-20">
                  Risk
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedAthletes.map((athlete, idx) => {
                const tierCfg =
                  TIER_CONFIG[athlete.tier as keyof typeof TIER_CONFIG] || TIER_CONFIG.community;
                const potentialColor =
                  athlete.potentialScore > 0.8
                    ? '#10B981'
                    : athlete.potentialScore >= 0.6
                    ? '#F59E0B'
                    : '#EF4444';
                const riskColor =
                  athlete.dropoutRisk < 0.3
                    ? '#10B981'
                    : athlete.dropoutRisk <= 0.6
                    ? '#F59E0B'
                    : '#EF4444';
                const riskLabel =
                  athlete.dropoutRisk < 0.3
                    ? 'Low'
                    : athlete.dropoutRisk <= 0.6
                    ? 'Med'
                    : 'High';

                return (
                  <motion.tr
                    key={athlete.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 + idx * 0.03, duration: 0.3 }}
                    className="border-b border-white/[0.03] hover:bg-surface-tertiary/30 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-2 text-text-muted font-medium">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-2 font-semibold text-text-primary group-hover:text-ghana-gold transition-colors">
                      {athlete.name}
                    </td>
                    <td className="py-3 px-2 text-text-secondary">{athlete.age}</td>
                    <td className="py-3 px-2 text-text-secondary">{athlete.gender}</td>
                    <td className="py-3 px-2 text-text-secondary">{athlete.region}</td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center gap-1.5 text-text-secondary">
                        <span
                          className="inline-block w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: SPORT_COLORS[athlete.sport] || '#94A3B8',
                          }}
                        />
                        {athlete.sport}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${tierCfg.bg} ${tierCfg.text} ${tierCfg.border}`}
                      >
                        {tierCfg.label}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-surface-tertiary/60 overflow-hidden max-w-[80px]">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${athlete.potentialScore * 100}%`,
                              backgroundColor: potentialColor,
                            }}
                          />
                        </div>
                        <span
                          className="text-xs font-bold w-8"
                          style={{ color: potentialColor }}
                        >
                          {athlete.potentialScore.toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-text-secondary text-xs">
                      {athlete.event}
                    </td>
                    <td className="py-3 px-2 text-text-secondary text-xs font-medium">
                      {athlete.personalBest}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <div className="flex items-center justify-center gap-1.5" title={`Dropout Risk: ${(athlete.dropoutRisk * 100).toFixed(0)}%`}>
                        <span
                          className="inline-block w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: riskColor }}
                        />
                        <span className="text-[10px] font-medium" style={{ color: riskColor }}>
                          {riskLabel}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {sortedAthletes.map((athlete, idx) => {
            const tierCfg =
              TIER_CONFIG[athlete.tier as keyof typeof TIER_CONFIG] || TIER_CONFIG.community;
            const potentialColor =
              athlete.potentialScore > 0.8
                ? '#10B981'
                : athlete.potentialScore >= 0.6
                ? '#F59E0B'
                : '#EF4444';
            const riskColor =
              athlete.dropoutRisk < 0.3
                ? '#10B981'
                : athlete.dropoutRisk <= 0.6
                ? '#F59E0B'
                : '#EF4444';

            return (
              <motion.div
                key={athlete.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + idx * 0.04, duration: 0.35 }}
                className="p-4 rounded-xl bg-surface-tertiary/30 ring-1 ring-white/[0.04] hover:ring-white/[0.08] transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-text-primary">{athlete.name}</p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {athlete.age}y &bull; {athlete.gender} &bull; {athlete.region}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${tierCfg.bg} ${tierCfg.text} ${tierCfg.border}`}
                  >
                    {tierCfg.label}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-xs text-text-secondary">
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: SPORT_COLORS[athlete.sport] || '#94A3B8',
                    }}
                  />
                  <span>{athlete.sport}</span>
                  <span className="text-text-muted">&bull;</span>
                  <span>{athlete.event}</span>
                </div>

                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-text-muted">PB: {athlete.personalBest}</span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ backgroundColor: riskColor }}
                    />
                    <span style={{ color: riskColor }}>
                      {(athlete.dropoutRisk * 100).toFixed(0)}% risk
                    </span>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-surface-tertiary/60 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${athlete.potentialScore * 100}%`,
                        backgroundColor: potentialColor,
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold" style={{ color: potentialColor }}>
                    {athlete.potentialScore.toFixed(2)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Section 5: Sport-Fit Analysis (two columns) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Radar chart */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.55 }}
          className="glass-card p-6"
        >
          <h3 className="text-base font-heading font-semibold text-text-primary mb-4">
            Sport-Fit Athletic Profiles
          </h3>
          <ReactECharts
            option={radarChartOption}
            style={{ height: '360px', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </motion.div>

        {/* Right: Regional athlete distribution */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card p-6"
        >
          <h3 className="text-base font-heading font-semibold text-text-primary mb-4">
            Athletes by Region (Top 10)
          </h3>
          <ReactECharts
            option={regionalAthleteChartOption}
            style={{ height: '360px', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </motion.div>
      </div>

      {/* ── Bottom: Dropout Risk Summary ── */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.65 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={16} className="text-amber-400" />
          <h3 className="text-base font-heading font-semibold text-text-primary">
            Dropout Risk Summary
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative overflow-hidden rounded-xl bg-[#111827]/60 px-5 py-4 ring-1 ring-white/[0.06] transition-colors duration-200 hover:bg-[#111827]/80">
            <div
              className="absolute inset-y-0 left-0 w-[3px] rounded-full"
              style={{ backgroundColor: '#10B981', opacity: 0.6 }}
            />
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500/10">
                <ShieldCheck size={18} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-text-muted">Low Risk (&lt;30%)</p>
                <p className="text-2xl font-bold text-emerald-400">{dropoutCounts.low}</p>
                <p className="text-[11px] text-text-muted">athletes on track</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-[#111827]/60 px-5 py-4 ring-1 ring-white/[0.06] transition-colors duration-200 hover:bg-[#111827]/80">
            <div
              className="absolute inset-y-0 left-0 w-[3px] rounded-full"
              style={{ backgroundColor: '#F59E0B', opacity: 0.6 }}
            />
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-amber-500/10">
                <Shield size={18} className="text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-text-muted">Medium Risk (30-60%)</p>
                <p className="text-2xl font-bold text-amber-400">{dropoutCounts.medium}</p>
                <p className="text-[11px] text-text-muted">need monitoring</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-[#111827]/60 px-5 py-4 ring-1 ring-white/[0.06] transition-colors duration-200 hover:bg-[#111827]/80">
            <div
              className="absolute inset-y-0 left-0 w-[3px] rounded-full"
              style={{ backgroundColor: '#EF4444', opacity: 0.6 }}
            />
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-500/10">
                <ShieldAlert size={18} className="text-red-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-text-muted">High Risk (&gt;60%)</p>
                <p className="text-2xl font-bold text-red-400">{dropoutCounts.high}</p>
                <p className="text-[11px] text-text-muted">urgent intervention</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-text-muted leading-relaxed max-w-2xl">
          AI-powered dropout prediction helps identify at-risk athletes for early intervention.
          Factors include training frequency, socioeconomic indicators, coach engagement, and
          access to facilities in the athlete's district.
        </p>
      </motion.div>
    </div>
  );
}
