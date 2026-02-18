import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import {
  Users,
  Briefcase,
  Building2,
  Trophy,
  AlertTriangle,
  Star,
  ArrowRight,
  MessageSquare,
  MapPin,
} from 'lucide-react';

import {
  OVERVIEW_KPIS,
  MONTHLY_TRENDS,
  REGIONS,
  REGIONAL_MAP_DATA,
  FACILITIES,
  TALENT_ALERTS,
  SPORT_PARTICIPATION,
  SKILLS_DEMAND,
  TALENT_PIPELINE,
} from '../data/mock-data';
import { KPICard } from '../components/KPICard';

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
// Status badge helpers
// ────────────────────────────────────────────────────────────

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'critical':
      return 'bg-red-500/15 text-red-400 border border-red-500/20';
    case 'needs_repair':
      return 'bg-amber-500/15 text-amber-400 border border-amber-500/20';
    case 'fair':
      return 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20';
    case 'good':
      return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20';
    default:
      return 'bg-slate-500/15 text-slate-400 border border-slate-500/20';
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'critical':
      return 'Critical';
    case 'needs_repair':
      return 'Needs Repair';
    case 'fair':
      return 'Fair';
    case 'good':
      return 'Good';
    default:
      return status;
  }
}

function getAlertBadgeClass(level: string): string {
  switch (level) {
    case 'elite':
      return 'bg-amber-500/15 text-amber-400 border border-amber-500/20';
    case 'exceptional':
      return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20';
    case 'promising':
      return 'bg-blue-500/15 text-blue-400 border border-blue-500/20';
    default:
      return 'bg-slate-500/15 text-slate-400 border border-slate-500/20';
  }
}

function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `GH\u20B5${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `GH\u20B5${(value / 1_000).toFixed(0)}K`;
  }
  return `GH\u20B5${value.toLocaleString()}`;
}

function formatNumber(value: number): string {
  return value.toLocaleString();
}

// ────────────────────────────────────────────────────────────
// Sport participation color palette
// ────────────────────────────────────────────────────────────

const SPORT_COLORS = [
  '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6',
  '#EC4899', '#F97316', '#14B8A6', '#EF4444',
  '#6366F1', '#84CC16', '#22D3EE', '#A855F7',
];

// ────────────────────────────────────────────────────────────
// Pipeline tier config
// ────────────────────────────────────────────────────────────

const PIPELINE_TIERS = [
  { key: 'community' as const, label: 'Community', color: '#334155' },
  { key: 'district' as const, label: 'District', color: '#475569' },
  { key: 'regional' as const, label: 'Regional', color: '#D97706' },
  { key: 'national' as const, label: 'National', color: '#F59E0B' },
  { key: 'international' as const, label: 'International', color: '#FCD34D' },
];

// ============================================================
// NationalOverview page
// ============================================================

export default function NationalOverview() {
  const navigate = useNavigate();

  // ── Facility alerts: filter critical + needs_repair ──
  const facilityAlerts = useMemo(() => {
    return FACILITIES
      .filter((f) => f.status === 'critical' || f.status === 'needs_repair')
      .sort((a, b) => {
        const order = { critical: 0, needs_repair: 1, fair: 2, good: 3 };
        return order[a.status] - order[b.status];
      })
      .slice(0, 6);
  }, []);

  const criticalCount = FACILITIES.filter(
    (f) => f.status === 'critical' || f.status === 'needs_repair'
  ).length;

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
          return `<div style="font-weight:600;margin-bottom:4px">${d.name}</div>
            <div>Youth Registered: <b>${d.value.toLocaleString()}</b></div>
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
          data: REGIONAL_MAP_DATA.map((r) => ({
            value: [r.x, r.y],
            code: r.code,
            name: r.name,
            ...r,
            symbolSize: Math.max(22, (r.value / maxVal) * 60),
          })),
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

  // ── Sport participation donut chart ──
  const sportDonutOption = useMemo(() => {
    const top8 = SPORT_PARTICIPATION.slice(0, 8);
    const totalParticipants = top8.reduce((sum, s) => sum + s.total, 0);

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: '#1E293B',
        borderColor: '#334155',
        borderWidth: 1,
        textStyle: { color: '#E2E8F0', fontSize: 13 },
        formatter: (params: any) => {
          const sport = top8.find((s) => s.sport === params.name);
          if (!sport) return params.name;
          return `<div style="font-weight:600;margin-bottom:4px">${sport.sport}</div>
            <div>Total: <b>${sport.total.toLocaleString()}</b></div>
            <div>Male: ${sport.male.toLocaleString()} | Female: ${sport.female.toLocaleString()}</div>
            <div>Growth: <b>+${sport.growthPercent}%</b></div>`;
        },
      },
      legend: {
        orient: 'horizontal',
        bottom: 0,
        left: 'center',
        textStyle: { color: '#94A3B8', fontSize: 11 },
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 12,
      },
      series: [
        {
          type: 'pie',
          radius: ['48%', '72%'],
          center: ['50%', '42%'],
          avoidLabelOverlap: true,
          label: { show: false },
          emphasis: {
            label: { show: false },
            scaleSize: 6,
          },
          labelLine: { show: false },
          data: top8.map((s, i) => ({
            name: s.sport,
            value: s.total,
            itemStyle: { color: SPORT_COLORS[i % SPORT_COLORS.length] },
          })),
        },
        {
          type: 'pie',
          radius: ['0%', '0%'],
          center: ['50%', '42%'],
          label: {
            show: true,
            position: 'center',
            formatter: [
              `{total|${(totalParticipants / 1000).toFixed(0)}K}`,
              '{sub|participants}',
            ].join('\n'),
            rich: {
              total: {
                fontSize: 22,
                fontWeight: 700,
                color: '#E2E8F0',
                lineHeight: 28,
              },
              sub: {
                fontSize: 11,
                color: '#64748B',
                lineHeight: 18,
              },
            },
          },
          data: [{ value: 0, name: '' }],
          silent: true,
        },
      ],
      animationDuration: 1200,
      animationEasing: 'cubicOut',
    };
  }, []);

  // ── Pipeline max for bar widths ──
  const pipelineMax = TALENT_PIPELINE.community;

  // ── Talent alerts limited to 6 ──
  const displayedAlerts = TALENT_ALERTS.slice(0, 6);

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
          title="Facilities Monitored"
          value={OVERVIEW_KPIS.totalFacilities}
          icon={<Building2 size={22} />}
          color="blue"
          delay={0.2}
        />
        <KPICard
          title="Athletes Tracked"
          value={OVERVIEW_KPIS.totalAthletes}
          icon={<Trophy size={22} />}
          color="purple"
          trend={OVERVIEW_KPIS.athleteGrowth}
          trendLabel="vs last quarter"
          delay={0.3}
        />
      </motion.div>

      {/* ── Critical facilities sub-text under KPI row ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="-mt-4 pl-1"
      >
        <span className="inline-flex items-center gap-1.5 text-xs text-red-400">
          <AlertTriangle size={13} />
          {OVERVIEW_KPIS.facilitiesCritical} critical facilities require urgent attention
        </span>
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
          {/* Facility Condition Alerts */}
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
                  Facility Condition Alerts
                </h3>
                <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-red-500/15 text-red-400 text-[11px] font-bold border border-red-500/20">
                  {criticalCount}
                </span>
              </div>
            </div>

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {facilityAlerts.map((facility) => (
                <div
                  key={facility.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-surface-tertiary/40 hover:bg-surface-tertiary/60 transition-colors duration-200 cursor-pointer group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate group-hover:text-ghana-gold transition-colors">
                      {facility.name}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {facility.region} &bull; {facility.district}
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      Est. repair: {formatCurrency(facility.estimatedRepairCostGHS)}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap ${getStatusBadgeClass(
                      facility.status
                    )}`}
                  >
                    {getStatusLabel(facility.status)}
                  </span>
                </div>
              ))}
            </div>

            <button className="mt-4 flex items-center gap-1.5 text-xs font-medium text-ghana-gold hover:text-ghana-gold-light transition-colors">
              View all facilities
              <ArrowRight size={14} />
            </button>
          </motion.div>

          {/* Talent Development Pipeline */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card p-6"
          >
            <h3 className="text-base font-heading font-semibold text-text-primary mb-5">
              Talent Development Pipeline
            </h3>

            <div className="space-y-3">
              {PIPELINE_TIERS.map((tier, idx) => {
                const count = TALENT_PIPELINE[tier.key];
                const widthPercent = (count / pipelineMax) * 100;

                return (
                  <motion.div
                    key={tier.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.08, duration: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-text-secondary">
                        {tier.label}
                      </span>
                      <span className="text-xs font-bold text-text-primary">
                        {formatNumber(count)}
                      </span>
                    </div>
                    <div className="h-6 w-full rounded-lg bg-surface-tertiary/60 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${widthPercent}%` }}
                        transition={{ delay: 0.7 + idx * 0.08, duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-lg"
                        style={{ backgroundColor: tier.color }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs text-text-muted">
              <Trophy size={12} className="text-ghana-gold" />
              Total pipeline: {formatNumber(
                TALENT_PIPELINE.community +
                TALENT_PIPELINE.district +
                TALENT_PIPELINE.regional +
                TALENT_PIPELINE.national +
                TALENT_PIPELINE.international
              )} athletes
            </div>
          </motion.div>

          {/* Sport Participation Donut */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.45 }}
            className="glass-card p-6"
          >
            <h3 className="text-base font-heading font-semibold text-text-primary mb-2">
              Sport Participation by Discipline
            </h3>
            <ReactECharts
              option={sportDonutOption}
              style={{ height: '320px', width: '100%' }}
              opts={{ renderer: 'canvas' }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Recent Talent Alerts Feed (full width) ── */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Star size={18} className="text-ghana-gold" />
          <h3 className="text-base font-heading font-semibold text-text-primary">
            Latest Talent Alerts
          </h3>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-3 -mx-2 px-2 scrollbar-thin">
          {displayedAlerts.map((alert, idx) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + idx * 0.08, duration: 0.45 }}
              className="flex-shrink-0 w-[300px] glass-card p-5 hover:border-ghana-gold/30 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide ${getAlertBadgeClass(
                    alert.alertLevel
                  )} ${alert.alertLevel === 'elite' ? 'animate-pulse-slow' : ''}`}
                >
                  {alert.alertLevel}
                </span>
                <span className="text-[11px] text-text-muted">{alert.date}</span>
              </div>

              <p className="text-sm font-semibold text-text-primary group-hover:text-ghana-gold transition-colors">
                {alert.athleteName}
              </p>

              <div className="mt-1.5 flex items-center gap-2 text-xs text-text-secondary">
                <span>{alert.sport}</span>
                <span className="text-text-muted">&bull;</span>
                <span>{alert.event}</span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-text-primary">
                  {alert.performance}
                </span>
                <span className="text-xs font-semibold text-ghana-gold">
                  Top {(100 - alert.percentile).toFixed(1)}%
                </span>
              </div>

              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-text-muted">
                <MapPin size={11} />
                {alert.region}
              </div>

              <p className="mt-3 text-xs text-text-muted leading-relaxed line-clamp-2">
                {alert.recommendation}
              </p>
            </motion.div>
          ))}
        </div>
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
            Ask me anything about Ghana's youth &amp; sports data...
          </span>
          <ArrowRight size={18} className="text-text-muted group-hover:text-ghana-gold transition-colors" />
        </button>
      </motion.div>
    </div>
  );
}
