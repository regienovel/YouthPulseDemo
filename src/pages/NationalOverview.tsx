import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import {
  Users,
  Briefcase,
  Rocket,
  TrendingDown,
  AlertTriangle,
  ArrowRight,
  MessageSquare,
  MapPin,
  Plane,
  Zap,
  GraduationCap,
  Target,
  Building,
  Globe,
} from 'lucide-react';

import {
  OVERVIEW_KPIS,
  MONTHLY_TRENDS,
  REGIONS,
  REGIONAL_MAP_DATA,
  SKILLS_DEMAND,
} from '../data/mock-data';
import { KPICard } from '../components/KPICard';

// ────────────────────────────────────────────────────────────
// Inline data for the new module highlights
// ────────────────────────────────────────────────────────────

const EMPOWERMENT_HIGHLIGHTS = {
  activeProgrammes: 12,
  activeEnrollments: 48750,
  entrepreneursFunded: 3215,
  digitalSkillsTrained: 124500,
  digitalTarget: 500000,
  tvetCompletionRate: 68.4,
};

const NEET_HIGHLIGHTS = {
  totalNEET: 1340000,
  neetRate: 25.8,
  neetReduction: -2.3,
  youthReached: 312400,
  migrationRisk: 72,
  districtsCovered: 198,
  totalDistricts: 261,
};

const PROGRAMME_STATUS = [
  { name: 'YEA', enrolled: 14200, status: 'active', sector: 'Multi-sector' },
  { name: 'NEIP', enrolled: 8420, status: 'active', sector: 'Entrepreneurship' },
  { name: 'Adwumawura', enrolled: 6800, status: 'active', sector: 'Trades' },
  { name: '1M Coders', enrolled: 4500, status: 'active', sector: 'Digital' },
  { name: 'Nat. Apprenticeship', enrolled: 5200, status: 'active', sector: 'Trades' },
  { name: 'Youth in Agric', enrolled: 3800, status: 'active', sector: 'Agriculture' },
];

const NEET_BY_REGION_SUMMARY = [
  { region: 'North East', rate: 35.2 },
  { region: 'Savannah', rate: 34.1 },
  { region: 'Upper East', rate: 33.2 },
  { region: 'Upper West', rate: 32.8 },
  { region: 'Northern', rate: 31.5 },
  { region: 'Oti', rate: 29.4 },
];

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
      staggerChildren: 0.1,
    },
  },
};

// ────────────────────────────────────────────────────────────
// Region color map for charts
// ────────────────────────────────────────────────────────────

const REGION_COLORS: Record<string, string> = {};
REGIONS.forEach((r) => {
  REGION_COLORS[r.code] = r.color;
});

// ────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────

function formatNumber(value: number): string {
  return value.toLocaleString();
}

function getSectorBadgeClass(sector: string): string {
  switch (sector) {
    case 'Multi-sector':
      return 'bg-amber-500/15 text-amber-400 border border-amber-500/20';
    case 'Entrepreneurship':
      return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20';
    case 'Trades':
      return 'bg-blue-500/15 text-blue-400 border border-blue-500/20';
    case 'Digital':
      return 'bg-purple-500/15 text-purple-400 border border-purple-500/20';
    case 'Agriculture':
      return 'bg-lime-500/15 text-lime-400 border border-lime-500/20';
    default:
      return 'bg-slate-500/15 text-slate-400 border border-slate-500/20';
  }
}

function getNEETSeverityColor(rate: number): string {
  if (rate > 33) return '#EF4444';
  if (rate >= 30) return '#F97316';
  return '#F59E0B';
}

function getNEETSeverityClass(rate: number): string {
  if (rate > 33) return 'text-red-400';
  if (rate >= 30) return 'text-orange-400';
  return 'text-amber-400';
}

// ============================================================
// NationalOverview page
// ============================================================

export default function NationalOverview() {
  const navigate = useNavigate();

  // ── Employment trends chart options ──
  const trendsChartOption = useMemo(() => {
    const months = MONTHLY_TRENDS.map((t) => t.month);
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#1E293B',
        borderColor: '#334155',
        borderWidth: 1,
        textStyle: { color: '#E2E8F0', fontSize: 13 },
        formatter: (params: any) => {
          let result = `<div style="font-weight:600;margin-bottom:6px">${params[0].axisValue}</div>`;
          params.forEach((p: any) => {
            result += `<div style="display:flex;align-items:center;gap:6px;margin:3px 0">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color}"></span>
              <span style="flex:1">${p.seriesName}</span>
              <span style="font-weight:600">${p.value.toLocaleString()}</span>
            </div>`;
          });
          return result;
        },
      },
      legend: {
        data: ['Registrations', 'Jobs Matched', 'Placements'],
        top: 0,
        right: 0,
        textStyle: { color: '#94A3B8', fontSize: 12 },
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 20,
      },
      grid: {
        top: 40,
        left: 16,
        right: 16,
        bottom: 8,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: months,
        axisLine: { lineStyle: { color: '#1E293B' } },
        axisTick: { show: false },
        axisLabel: { color: '#64748B', fontSize: 11 },
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: '#1E293B', opacity: 0.6 } },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: '#64748B',
          fontSize: 11,
          formatter: (val: number) => {
            if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
            return val.toString();
          },
        },
      },
      series: [
        {
          name: 'Registrations',
          type: 'line',
          data: MONTHLY_TRENDS.map((t) => t.registrations),
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          showSymbol: false,
          lineStyle: { width: 3, color: '#F59E0B' },
          itemStyle: { color: '#F59E0B' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(245,158,11,0.25)' },
                { offset: 1, color: 'rgba(245,158,11,0.02)' },
              ],
            },
          },
        },
        {
          name: 'Jobs Matched',
          type: 'line',
          data: MONTHLY_TRENDS.map((t) => t.jobsMatched),
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          showSymbol: false,
          lineStyle: { width: 3, color: '#10B981' },
          itemStyle: { color: '#10B981' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(16,185,129,0.20)' },
                { offset: 1, color: 'rgba(16,185,129,0.02)' },
              ],
            },
          },
        },
        {
          name: 'Placements',
          type: 'line',
          data: MONTHLY_TRENDS.map((t) => t.placements),
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          showSymbol: false,
          lineStyle: { width: 3, color: '#3B82F6' },
          itemStyle: { color: '#3B82F6' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(59,130,246,0.18)' },
                { offset: 1, color: 'rgba(59,130,246,0.02)' },
              ],
            },
          },
        },
      ],
      animationDuration: 1200,
      animationEasing: 'cubicOut',
    };
  }, []);

  // ── Regional intelligence map (scatter chart) ──
  const regionalMapOption = useMemo(() => {
    const maxVal = Math.max(...REGIONAL_MAP_DATA.map((r) => r.value));
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: '#1E293B',
        borderColor: '#334155',
        borderWidth: 1,
        textStyle: { color: '#E2E8F0', fontSize: 13 },
        formatter: (params: any) => {
          const d = params.data;
          const region = REGIONS.find((r) => r.code === d.code);
          const skillGap = region ? (region.skillGapScore * 100).toFixed(0) : 'N/A';
          const youthCount = d.regionValue ? d.regionValue.toLocaleString() : 'N/A';
          return `<div style="font-weight:600;margin-bottom:4px">${d.name}</div>
            <div>Youth Registered: <b>${youthCount}</b></div>
            <div>Skills Gap: <b>${skillGap}%</b></div>`;
        },
      },
      grid: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
      },
      xAxis: {
        type: 'value',
        min: 0,
        max: 100,
        show: false,
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        show: false,
        inverse: true,
      },
      graphic: [
        {
          type: 'polygon',
          shape: {
            points: [
              [145, 25], [175, 15], [215, 20], [235, 35],
              [255, 55], [260, 80], [270, 110], [275, 140],
              [265, 175], [240, 200], [210, 215], [185, 230],
              [160, 240], [135, 245], [110, 235], [95, 220],
              [80, 200], [85, 170], [90, 140], [95, 120],
              [100, 100], [95, 75], [100, 55], [115, 40],
              [130, 30],
            ],
          },
          style: {
            fill: 'transparent',
            stroke: 'rgba(245,158,11,0.12)',
            lineWidth: 2,
          },
          z: 0,
        },
      ],
      series: [
        {
          type: 'scatter',
          data: REGIONAL_MAP_DATA.map((r) => {
            const size = Math.max(22, (r.value / maxVal) * 60);
            return {
              value: [r.x, r.y],
              code: r.code,
              name: r.name,
              regionValue: r.value,
              symbolSize: size,
            };
          }),
          symbolSize: (data: any) => data.symbolSize || 30,
          itemStyle: {
            color: (params: any) => {
              return REGION_COLORS[params.data.code] || '#F59E0B';
            },
            borderColor: 'rgba(255,255,255,0.15)',
            borderWidth: 1,
            shadowBlur: 8,
            shadowColor: 'rgba(0,0,0,0.3)',
          },
          label: {
            show: true,
            formatter: (params: any) => params.data.code,
            fontSize: 9,
            fontWeight: 700,
            color: '#fff',
          },
          emphasis: {
            scale: 1.3,
            itemStyle: {
              borderColor: '#F59E0B',
              borderWidth: 2,
              shadowBlur: 16,
              shadowColor: 'rgba(245,158,11,0.4)',
            },
          },
        },
      ],
      animationDuration: 1000,
      animationEasing: 'cubicOut',
    };
  }, []);

  // ── Skills gap bar chart ──
  const skillsGapChartOption = useMemo(() => {
    const sorted = [...SKILLS_DEMAND]
      .sort((a, b) => b.gapRatio - a.gapRatio)
      .slice(0, 8);

    const trendColorMap: Record<string, string> = {
      rising: '#10B981',
      stable: '#F59E0B',
      declining: '#EF4444',
    };

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: '#1E293B',
        borderColor: '#334155',
        borderWidth: 1,
        textStyle: { color: '#E2E8F0', fontSize: 13 },
        formatter: (params: any) => {
          const d = params[0];
          const skill = sorted.find((s) => s.name === d.name);
          if (!skill) return d.name;
          return `<div style="font-weight:600;margin-bottom:4px">${skill.name}</div>
            <div>Sector: ${skill.sector}</div>
            <div>Demand: <b>${skill.demandCount.toLocaleString()}</b></div>
            <div>Supply: <b>${skill.supplyCount.toLocaleString()}</b></div>
            <div>Gap Ratio: <b>${skill.gapRatio.toFixed(2)}x</b></div>
            <div>Trend: <b style="color:${trendColorMap[skill.trend]}">${skill.trend}</b></div>
            <div>Avg Salary: <b>GH\u20B5${skill.avgSalaryGHS.toLocaleString()}</b></div>`;
        },
      },
      grid: {
        top: 12,
        left: 16,
        right: 60,
        bottom: 8,
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: '#1E293B', opacity: 0.6 } },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: '#64748B',
          fontSize: 11,
          formatter: (val: number) => `${val.toFixed(1)}x`,
        },
      },
      yAxis: {
        type: 'category',
        data: sorted.map((s) => s.name).reverse(),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: '#94A3B8',
          fontSize: 11,
          width: 160,
          overflow: 'truncate',
        },
      },
      series: [
        {
          type: 'bar',
          data: sorted
            .map((s) => ({
              value: s.gapRatio,
              itemStyle: { color: trendColorMap[s.trend] },
            }))
            .reverse(),
          barWidth: 20,
          borderRadius: [0, 6, 6, 0],
          label: {
            show: true,
            position: 'right',
            formatter: (params: any) => `${params.value.toFixed(2)}x`,
            color: '#94A3B8',
            fontSize: 11,
          },
        },
      ],
      animationDuration: 1200,
      animationEasing: 'cubicOut',
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* ── Hero Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-primary flex items-center gap-3">
              National Overview
              <span className="text-2xl md:text-3xl" role="img" aria-label="Ghana flag">
                {'\u{1F1EC}\u{1F1ED}'}
              </span>
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Real-time intelligence across 16 regions &bull; 261 districts
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
      </motion.div>

      {/* ── KPI Cards Row ── */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <KPICard
          title="Youth Registered"
          value={OVERVIEW_KPIS.totalYouthRegistered}
          icon={<Users size={22} />}
          color="gold"
          trend={OVERVIEW_KPIS.registrationGrowth}
          trendLabel="vs last quarter"
          delay={0}
        />
        <KPICard
          title="Jobs Matched"
          value={OVERVIEW_KPIS.totalJobsMatched}
          icon={<Briefcase size={22} />}
          color="green"
          trend={8.2}
          trendLabel="vs last quarter"
          delay={0.1}
        />
        <KPICard
          title="Programmes Active"
          value={EMPOWERMENT_HIGHLIGHTS.activeEnrollments}
          icon={<Rocket size={22} />}
          color="blue"
          delay={0.2}
        />

        {/* Custom NEET Reduction card — declining is positive */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{ scale: 1.025 }}
          className="relative overflow-hidden rounded-2xl bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] hover:border-purple-500/40 shadow-lg shadow-purple-500/10 transition-all duration-300 group"
        >
          {/* Gradient stripe at top */}
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Subtle glow blob */}
          <div
            className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-[0.07] blur-2xl transition-opacity duration-500 group-hover:opacity-[0.13]"
            style={{ backgroundColor: '#8B5CF6' }}
          />

          <div className="relative z-10 flex items-start gap-4 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 ring-1 ring-white/[0.06]">
              <span className="text-purple-400">
                <TrendingDown size={22} />
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-400">
                NEET Rate
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-slate-100">
                {NEET_HIGHLIGHTS.neetRate}
                <span className="ml-0.5 text-lg font-semibold text-slate-400">%</span>
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold text-emerald-400 bg-white/[0.04]">
                  <TrendingDown className="h-3 w-3" />
                  {NEET_HIGHLIGHTS.neetReduction}%
                </span>
                <span className="text-xs text-slate-500">vs last quarter</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Sub-text under KPI row: programme count ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="-mt-4 pl-1"
      >
        <span className="inline-flex items-center gap-1.5 text-xs text-blue-400">
          <Rocket size={13} />
          {EMPOWERMENT_HIGHLIGHTS.activeProgrammes} active programmes across all regions
        </span>
      </motion.div>

      {/* ── Critical Alerts Banner ── */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.35 }}
        className="space-y-3"
      >
        {/* NEET Alert */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/[0.08] border border-red-500/20">
          <AlertTriangle size={18} className="text-red-400 mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-red-300 font-medium">
              {formatNumber(NEET_HIGHLIGHTS.totalNEET)} youth are NEET (Not in Education, Employment, or Training) &mdash; {NEET_HIGHLIGHTS.neetRate}% of 15-24 age group
            </p>
          </div>
        </div>

        {/* Migration Risk Alert */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/[0.08] border border-amber-500/20">
          <Plane size={18} className="text-amber-400 mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-amber-300 font-medium">
              {NEET_HIGHLIGHTS.migrationRisk}% of youth aged 18-35 considering emigration &mdash; intervention critical
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* LEFT COLUMN (3/5 on lg) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Employment Trends Chart */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="text-base font-heading font-semibold text-text-primary mb-4">
              Youth Employment Trends &mdash; 12 Months
            </h3>
            <ReactECharts
              option={trendsChartOption}
              style={{ height: '340px', width: '100%' }}
              opts={{ renderer: 'canvas' }}
            />
          </motion.div>

          {/* Regional Intelligence Map */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-heading font-semibold text-text-primary">
                Regional Intelligence Map
              </h3>
              <span className="text-xs text-text-muted flex items-center gap-1">
                <MapPin size={12} />
                Bubble size = youth registered
              </span>
            </div>
            <ReactECharts
              option={regionalMapOption}
              style={{ height: '360px', width: '100%' }}
              opts={{ renderer: 'canvas' }}
            />
          </motion.div>
        </div>

        {/* RIGHT COLUMN (2/5 on lg) */}
        <div className="lg:col-span-2 space-y-6">
          {/* NEET Crisis Regions */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.35 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-heading font-semibold text-text-primary">
                  Highest NEET Regions
                </h3>
                <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-red-500/15 text-red-400 text-[11px] font-bold border border-red-500/20">
                  {NEET_BY_REGION_SUMMARY.length}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {NEET_BY_REGION_SUMMARY.map((item, idx) => {
                const barWidth = (item.rate / 40) * 100; // 40% as max scale
                const severityColor = getNEETSeverityColor(item.rate);
                const severityTextClass = getNEETSeverityClass(item.rate);

                return (
                  <motion.div
                    key={item.region}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.06, duration: 0.4 }}
                    className="p-3 rounded-xl bg-surface-tertiary/40 hover:bg-surface-tertiary/60 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-text-primary">
                        {item.region}
                      </span>
                      <span className={`text-sm font-bold ${severityTextClass}`}>
                        {item.rate}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-surface-tertiary/80 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(barWidth, 100)}%` }}
                        transition={{ delay: 0.6 + idx * 0.06, duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: severityColor }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button
              onClick={() => navigate('/neet')}
              className="mt-4 flex items-center gap-1.5 text-xs font-medium text-ghana-gold hover:text-ghana-gold-light transition-colors"
            >
              View full analysis
              <ArrowRight size={14} />
            </button>
          </motion.div>

          {/* Youth Programme Tracker */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card p-6"
          >
            <h3 className="text-base font-heading font-semibold text-text-primary mb-4">
              Active Programme Enrollment
            </h3>

            <div className="space-y-2.5">
              {PROGRAMME_STATUS.map((prog, idx) => (
                <motion.div
                  key={prog.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + idx * 0.06, duration: 0.4 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-surface-tertiary/40 hover:bg-surface-tertiary/60 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {prog.name}
                      </p>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium mt-1 ${getSectorBadgeClass(
                          prog.sector
                        )}`}
                      >
                        {prog.sector}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-text-primary whitespace-nowrap ml-3">
                    {formatNumber(prog.enrolled)}
                  </span>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => navigate('/empowerment')}
              className="mt-4 flex items-center gap-1.5 text-xs font-medium text-ghana-gold hover:text-ghana-gold-light transition-colors"
            >
              View all programmes
              <ArrowRight size={14} />
            </button>
          </motion.div>

          {/* Empowerment Highlights Mini Dashboard */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.45 }}
            className="glass-card p-6"
          >
            <h3 className="text-base font-heading font-semibold text-text-primary mb-4">
              Empowerment Highlights
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Entrepreneurs Funded */}
              <div className="relative overflow-hidden rounded-xl bg-[#111827]/60 px-4 py-3 ring-1 ring-white/[0.06] transition-colors duration-200 hover:bg-[#111827]/80">
                <div
                  className="absolute inset-y-0 left-0 w-[3px] rounded-full"
                  style={{ backgroundColor: '#10B981', opacity: 0.6 }}
                />
                <div className="flex items-center gap-1.5 mb-1">
                  <Zap size={12} className="text-emerald-400" />
                  <p className="text-xs font-medium text-slate-500">Entrepreneurs Funded</p>
                </div>
                <p className="text-lg font-bold text-slate-200">
                  {formatNumber(EMPOWERMENT_HIGHLIGHTS.entrepreneursFunded)}
                </p>
              </div>

              {/* Digital Skills */}
              <div className="relative overflow-hidden rounded-xl bg-[#111827]/60 px-4 py-3 ring-1 ring-white/[0.06] transition-colors duration-200 hover:bg-[#111827]/80">
                <div
                  className="absolute inset-y-0 left-0 w-[3px] rounded-full"
                  style={{ backgroundColor: '#8B5CF6', opacity: 0.6 }}
                />
                <div className="flex items-center gap-1.5 mb-1">
                  <Target size={12} className="text-purple-400" />
                  <p className="text-xs font-medium text-slate-500">Digital Skills</p>
                </div>
                <p className="text-lg font-bold text-slate-200">
                  {(EMPOWERMENT_HIGHLIGHTS.digitalSkillsTrained / 1000).toFixed(1)}K
                  <span className="text-xs font-normal text-slate-500 ml-1">
                    / {(EMPOWERMENT_HIGHLIGHTS.digitalTarget / 1000).toFixed(0)}K
                  </span>
                </p>
              </div>

              {/* TVET Completion */}
              <div className="relative overflow-hidden rounded-xl bg-[#111827]/60 px-4 py-3 ring-1 ring-white/[0.06] transition-colors duration-200 hover:bg-[#111827]/80">
                <div
                  className="absolute inset-y-0 left-0 w-[3px] rounded-full"
                  style={{ backgroundColor: '#F59E0B', opacity: 0.6 }}
                />
                <div className="flex items-center gap-1.5 mb-1">
                  <GraduationCap size={12} className="text-amber-400" />
                  <p className="text-xs font-medium text-slate-500">TVET Completion</p>
                </div>
                <p className="text-lg font-bold text-slate-200">
                  {EMPOWERMENT_HIGHLIGHTS.tvetCompletionRate}%
                </p>
              </div>

              {/* Youth Reached */}
              <div className="relative overflow-hidden rounded-xl bg-[#111827]/60 px-4 py-3 ring-1 ring-white/[0.06] transition-colors duration-200 hover:bg-[#111827]/80">
                <div
                  className="absolute inset-y-0 left-0 w-[3px] rounded-full"
                  style={{ backgroundColor: '#3B82F6', opacity: 0.6 }}
                />
                <div className="flex items-center gap-1.5 mb-1">
                  <Users size={12} className="text-blue-400" />
                  <p className="text-xs font-medium text-slate-500">Youth Reached</p>
                </div>
                <p className="text-lg font-bold text-slate-200">
                  {formatNumber(NEET_HIGHLIGHTS.youthReached)}
                </p>
              </div>

              {/* Districts Covered */}
              <div className="relative overflow-hidden rounded-xl bg-[#111827]/60 px-4 py-3 ring-1 ring-white/[0.06] transition-colors duration-200 hover:bg-[#111827]/80">
                <div
                  className="absolute inset-y-0 left-0 w-[3px] rounded-full"
                  style={{ backgroundColor: '#14B8A6', opacity: 0.6 }}
                />
                <div className="flex items-center gap-1.5 mb-1">
                  <Building size={12} className="text-teal-400" />
                  <p className="text-xs font-medium text-slate-500">Districts</p>
                </div>
                <p className="text-lg font-bold text-slate-200">
                  {NEET_HIGHLIGHTS.districtsCovered}
                  <span className="text-xs font-normal text-slate-500 ml-1">
                    / {NEET_HIGHLIGHTS.totalDistricts}
                  </span>
                </p>
              </div>

              {/* Migration Risk */}
              <div className="relative overflow-hidden rounded-xl bg-[#111827]/60 px-4 py-3 ring-1 ring-white/[0.06] transition-colors duration-200 hover:bg-[#111827]/80">
                <div
                  className="absolute inset-y-0 left-0 w-[3px] rounded-full"
                  style={{ backgroundColor: '#EF4444', opacity: 0.6 }}
                />
                <div className="flex items-center gap-1.5 mb-1">
                  <Globe size={12} className="text-red-400" />
                  <p className="text-xs font-medium text-slate-500">Migration Risk</p>
                </div>
                <p className="text-lg font-bold text-slate-200">
                  {NEET_HIGHLIGHTS.migrationRisk}%
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Skills Gap Snapshot (full width) ── */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.5 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-heading font-semibold text-text-primary">
            Top Skills Gaps &mdash; Where Demand Exceeds Supply
          </h3>
          <div className="flex items-center gap-4 text-[11px] text-text-muted">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Rising
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500" />
              Stable
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500" />
              Declining
            </span>
          </div>
        </div>
        <ReactECharts
          option={skillsGapChartOption}
          style={{ height: '360px', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </motion.div>

      {/* ── Ask AI Prompt Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <button
          onClick={() => navigate('/ask-ai')}
          className="w-full glass-card p-4 flex items-center gap-3 hover:border-ghana-gold/30 hover:shadow-lg hover:shadow-ghana-gold/5 transition-all duration-300 cursor-pointer group"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 ring-1 ring-white/[0.06]">
            <MessageSquare size={20} className="text-amber-400" />
          </div>
          <span className="flex-1 text-left text-sm text-text-muted group-hover:text-text-secondary transition-colors">
            Ask me anything about Ghana's youth development data...
          </span>
          <ArrowRight size={18} className="text-text-muted group-hover:text-ghana-gold transition-colors" />
        </button>
      </motion.div>
    </div>
  );
}
