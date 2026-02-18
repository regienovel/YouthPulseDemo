import { useMemo } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import {
  Users,
  Rocket,
  Monitor,
  GraduationCap,
  Building,
  Award,
  TrendingUp,
  Briefcase,
  BarChart3,
  Zap,
  MapPin,
  CheckCircle2,
  HardHat,
  Clock,
} from 'lucide-react';

import { KPICard } from '../components/KPICard';

// ────────────────────────────────────────────────────────────
// Mock data — all defined inline
// ────────────────────────────────────────────────────────────

const EMPOWERMENT_KPIS = {
  totalProgrammes: 12,
  activeEnrollments: 48750,
  enrollmentGrowth: 18.3,
  entrepreneursSupported: 8420,
  businessesFunded: 3215,
  fundingDisbursedGHS: 45600000,
  digitalSkillsTrained: 124500,
  digitalTarget: 500000,
  tvetEnrolled: 31200,
  tvetCompletionRate: 68.4,
  youthCentresOperational: 87,
  youthCentresTarget: 150,
  mentoringPairs: 4280,
};

const PROGRAMMES_DATA = [
  { name: 'Youth Employment Agency (YEA)', enrolled: 14200, active: 11800, completed: 9400, employedAfter: 5640, budget: 12500000, disbursed: 9800000, sector: 'Multi-sector', status: 'active' },
  { name: 'NEIP Entrepreneurship', enrolled: 8420, active: 6500, completed: 4200, employedAfter: 3570, budget: 8000000, disbursed: 5200000, sector: 'Entrepreneurship', status: 'active' },
  { name: 'Adwumawura Project', enrolled: 6800, active: 5400, completed: 3900, employedAfter: 3120, budget: 6500000, disbursed: 4800000, sector: 'Trades & Skills', status: 'active' },
  { name: '1 Million Coders', enrolled: 4500, active: 3800, completed: 2100, employedAfter: 1680, budget: 4200000, disbursed: 2800000, sector: 'Digital/ICT', status: 'active' },
  { name: 'National Apprenticeship', enrolled: 5200, active: 4100, completed: 3600, employedAfter: 2520, budget: 3800000, disbursed: 3200000, sector: 'Trades', status: 'active' },
  { name: 'Youth in Agriculture', enrolled: 3800, active: 2900, completed: 2400, employedAfter: 1920, budget: 3500000, disbursed: 2600000, sector: 'Agriculture', status: 'active' },
  { name: 'Solar Technicians Training', enrolled: 1200, active: 980, completed: 850, employedAfter: 740, budget: 1800000, disbursed: 1400000, sector: 'Renewable Energy', status: 'active' },
  { name: 'Hospitality & Tourism Skills', enrolled: 2100, active: 1600, completed: 1300, employedAfter: 780, budget: 2200000, disbursed: 1500000, sector: 'Hospitality', status: 'active' },
];

const FUNDING_PIPELINE = [
  { stage: 'Applications Received', count: 12400, color: '#F59E0B' },
  { stage: 'Shortlisted', count: 6800, color: '#FCD34D' },
  { stage: 'Approved', count: 3215, color: '#10B981' },
  { stage: 'Funds Disbursed', count: 2680, color: '#059669' },
  { stage: 'Business Operating (6mo+)', count: 1890, color: '#047857' },
];

const DIGITAL_SKILLS_MONTHLY = [
  { month: "Mar '25", trained: 6200, target: 8000 },
  { month: "Apr '25", trained: 7800, target: 8500 },
  { month: "May '25", trained: 9100, target: 9000 },
  { month: "Jun '25", trained: 10400, target: 9500 },
  { month: "Jul '25", trained: 8900, target: 10000 },
  { month: "Aug '25", trained: 11200, target: 10500 },
  { month: "Sep '25", trained: 12800, target: 11000 },
  { month: "Oct '25", trained: 13500, target: 11500 },
  { month: "Nov '25", trained: 14200, target: 12000 },
  { month: "Dec '25", trained: 10800, target: 12500 },
  { month: "Jan '26", trained: 15100, target: 13000 },
  { month: "Feb '26", trained: 14500, target: 13500 },
];

const ENTREPRENEUR_SECTORS = [
  { sector: 'Agribusiness', count: 890, revenue: 2400000 },
  { sector: 'Fashion & Textiles', count: 720, revenue: 1800000 },
  { sector: 'Digital Services', count: 580, revenue: 3200000 },
  { sector: 'Food Processing', count: 460, revenue: 1500000 },
  { sector: 'Beauty & Cosmetics', count: 380, revenue: 980000 },
  { sector: 'Construction Services', count: 310, revenue: 2100000 },
  { sector: 'Renewable Energy', count: 180, revenue: 1200000 },
  { sector: 'Creative Arts', count: 150, revenue: 620000 },
];

const TVET_BY_REGION = [
  { region: 'Greater Accra', enrolled: 6800, completed: 4700, employmentRate: 72 },
  { region: 'Ashanti', enrolled: 5400, completed: 3600, employmentRate: 68 },
  { region: 'Northern', enrolled: 3200, completed: 1900, employmentRate: 58 },
  { region: 'Western', enrolled: 2800, completed: 1850, employmentRate: 65 },
  { region: 'Eastern', enrolled: 2600, completed: 1700, employmentRate: 63 },
  { region: 'Central', enrolled: 2400, completed: 1500, employmentRate: 61 },
  { region: 'Volta', enrolled: 2100, completed: 1300, employmentRate: 59 },
  { region: 'Bono', enrolled: 1800, completed: 1100, employmentRate: 64 },
  { region: 'Upper East', enrolled: 1500, completed: 850, employmentRate: 55 },
  { region: 'Upper West', enrolled: 1200, completed: 680, employmentRate: 52 },
];

const YOUTH_CENTRES = [
  { name: 'Accra Youth Resource Centre', region: 'Greater Accra', status: 'operational', capacity: 500, utilization: 87 },
  { name: 'Kumasi Youth Hub', region: 'Ashanti', status: 'operational', capacity: 400, utilization: 92 },
  { name: 'Tamale Youth Centre', region: 'Northern', status: 'operational', capacity: 300, utilization: 78 },
  { name: 'Takoradi Youth Innovation Lab', region: 'Western', status: 'operational', capacity: 250, utilization: 85 },
  { name: 'Cape Coast Digital Centre', region: 'Central', status: 'under_construction', capacity: 350, utilization: 0 },
  { name: 'Ho Youth Empowerment Hub', region: 'Volta', status: 'operational', capacity: 200, utilization: 71 },
  { name: 'Sunyani Skills Centre', region: 'Bono', status: 'operational', capacity: 180, utilization: 68 },
  { name: 'Bolgatanga Youth Centre', region: 'Upper East', status: 'planned', capacity: 200, utilization: 0 },
];

// ────────────────────────────────────────────────────────────
// Animation helpers
// ────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

// ────────────────────────────────────────────────────────────
// Formatting helpers
// ────────────────────────────────────────────────────────────

function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `GH\u20B5${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `GH\u20B5${(value / 1_000).toFixed(0)}K`;
  }
  return `GH\u20B5${value.toLocaleString()}`;
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
// Status badge helpers
// ────────────────────────────────────────────────────────────

function getCentreStatusBadge(status: string) {
  switch (status) {
    case 'operational':
      return { label: 'Operational', classes: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' };
    case 'under_construction':
      return { label: 'Under Construction', classes: 'bg-amber-500/15 text-amber-400 border border-amber-500/20' };
    case 'planned':
      return { label: 'Planned', classes: 'bg-blue-500/15 text-blue-400 border border-blue-500/20' };
    default:
      return { label: status, classes: 'bg-slate-500/15 text-slate-400 border border-slate-500/20' };
  }
}

// ────────────────────────────────────────────────────────────
// Sector colors
// ────────────────────────────────────────────────────────────

const SECTOR_COLORS = [
  '#10B981', '#F59E0B', '#3B82F6', '#8B5CF6',
  '#EC4899', '#F97316', '#14B8A6', '#6366F1',
];

// ============================================================
// EmpowermentDashboard page
// ============================================================

export default function EmpowermentDashboard() {
  // Sort programmes by enrolled descending
  const sortedProgrammes = useMemo(
    () => [...PROGRAMMES_DATA].sort((a, b) => b.enrolled - a.enrolled),
    []
  );

  // Youth centres summary
  const centresSummary = useMemo(() => {
    const operational = YOUTH_CENTRES.filter((c) => c.status === 'operational').length;
    const underConstruction = YOUTH_CENTRES.filter((c) => c.status === 'under_construction').length;
    const planned = YOUTH_CENTRES.filter((c) => c.status === 'planned').length;
    return { operational, underConstruction, planned };
  }, []);

  // Digital skills cumulative progress
  const digitalProgress = (EMPOWERMENT_KPIS.digitalSkillsTrained / EMPOWERMENT_KPIS.digitalTarget) * 100;

  // ────────────────────────────────────────────────────────
  // Chart: NEIP Funding Pipeline (horizontal bar)
  // ────────────────────────────────────────────────────────

  const fundingPipelineOption = useMemo(() => {
    const reversed = [...FUNDING_PIPELINE].reverse();
    const maxCount = FUNDING_PIPELINE[0].count;
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis' as const,
        axisPointer: { type: 'shadow' as const },
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          const p = params[0];
          const idx = reversed.length - 1 - p.dataIndex;
          const conversionRate = idx > 0
            ? ((FUNDING_PIPELINE[idx].count / FUNDING_PIPELINE[idx - 1].count) * 100).toFixed(1)
            : '100.0';
          return `<div style="font-weight:600;margin-bottom:4px">${p.name}</div>
            <div>Count: <b>${p.value.toLocaleString()}</b></div>
            <div>Conversion: <b>${conversionRate}%</b></div>`;
        },
      },
      grid: {
        top: 12,
        left: 12,
        right: 48,
        bottom: 8,
        containLabel: true,
      },
      xAxis: {
        type: 'value' as const,
        max: maxCount,
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
        type: 'category' as const,
        data: reversed.map((d) => d.stage),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: '#94A3B8',
          fontSize: 11,
          width: 160,
          overflow: 'truncate' as const,
        },
      },
      series: [
        {
          type: 'bar',
          data: reversed.map((d) => ({
            value: d.count,
            itemStyle: {
              color: d.color,
              borderRadius: [0, 4, 4, 0],
            },
          })),
          barWidth: '55%',
          label: {
            show: true,
            position: 'right' as const,
            formatter: (params: any) => params.value.toLocaleString(),
            color: '#94A3B8',
            fontSize: 11,
          },
        },
      ],
      animationDuration: 1200,
      animationEasing: 'cubicOut',
    };
  }, []);

  // ────────────────────────────────────────────────────────
  // Chart: Entrepreneur Sectors (horizontal bar)
  // ────────────────────────────────────────────────────────

  const entrepreneurSectorsOption = useMemo(() => {
    const sorted = [...ENTREPRENEUR_SECTORS].sort((a, b) => a.count - b.count);
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis' as const,
        axisPointer: { type: 'shadow' as const },
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          const p = params[0];
          const sector = sorted[p.dataIndex];
          return `<div style="font-weight:600;margin-bottom:4px">${sector.sector}</div>
            <div>Businesses: <b>${sector.count.toLocaleString()}</b></div>
            <div>Revenue: <b>GH\u20B5${(sector.revenue / 1_000_000).toFixed(1)}M</b></div>`;
        },
      },
      grid: {
        top: 12,
        left: 12,
        right: 48,
        bottom: 8,
        containLabel: true,
      },
      xAxis: {
        type: 'value' as const,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#1E293B', opacity: 0.6 } },
        axisLabel: { color: '#64748B', fontSize: 11 },
      },
      yAxis: {
        type: 'category' as const,
        data: sorted.map((d) => d.sector),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: '#94A3B8',
          fontSize: 11,
          width: 140,
          overflow: 'truncate' as const,
        },
      },
      series: [
        {
          type: 'bar',
          data: sorted.map((d, i) => ({
            value: d.count,
            itemStyle: {
              color: SECTOR_COLORS[i % SECTOR_COLORS.length],
              borderRadius: [0, 4, 4, 0],
            },
          })),
          barWidth: '55%',
          label: {
            show: true,
            position: 'right' as const,
            formatter: (params: any) => params.value.toLocaleString(),
            color: '#94A3B8',
            fontSize: 10,
          },
        },
      ],
      animationDuration: 1200,
      animationEasing: 'cubicOut',
    };
  }, []);

  // ────────────────────────────────────────────────────────
  // Chart: Digital Skills Progress (bar + line)
  // ────────────────────────────────────────────────────────

  const digitalSkillsChartOption = useMemo(() => {
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis' as const,
        ...TOOLTIP_STYLE,
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
        data: ['Trained', 'Monthly Target'],
        top: 0,
        right: 0,
        textStyle: { color: '#94A3B8', fontSize: 12 },
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 20,
      },
      grid: {
        top: 48,
        left: 16,
        right: 16,
        bottom: 8,
        containLabel: true,
      },
      xAxis: {
        type: 'category' as const,
        data: DIGITAL_SKILLS_MONTHLY.map((d) => d.month),
        axisLine: { lineStyle: { color: '#1E293B' } },
        axisTick: { show: false },
        axisLabel: { color: '#64748B', fontSize: 11 },
      },
      yAxis: {
        type: 'value' as const,
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
          name: 'Trained',
          type: 'bar',
          data: DIGITAL_SKILLS_MONTHLY.map((d) => d.trained),
          barWidth: '45%',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(245,158,11,0.7)' },
                { offset: 1, color: 'rgba(245,158,11,0.15)' },
              ],
            },
            borderRadius: [4, 4, 0, 0],
          },
        },
        {
          name: 'Monthly Target',
          type: 'line',
          data: DIGITAL_SKILLS_MONTHLY.map((d) => d.target),
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          showSymbol: false,
          lineStyle: { width: 3, color: '#10B981', type: 'dashed' as const },
          itemStyle: { color: '#10B981' },
        },
      ],
      animationDuration: 1200,
      animationEasing: 'cubicOut',
    };
  }, []);

  // ────────────────────────────────────────────────────────
  // Chart: TVET Regional Performance (grouped bar + line)
  // ────────────────────────────────────────────────────────

  const tvetRegionalOption = useMemo(() => {
    const sorted = [...TVET_BY_REGION].sort((a, b) => b.enrolled - a.enrolled);
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis' as const,
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          let result = `<div style="font-weight:600;margin-bottom:6px">${params[0].axisValue}</div>`;
          params.forEach((p: any) => {
            const suffix = p.seriesName === 'Employment Rate' ? '%' : '';
            result += `<div style="display:flex;align-items:center;gap:6px;margin:3px 0">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color}"></span>
              <span style="flex:1">${p.seriesName}</span>
              <span style="font-weight:600">${p.value.toLocaleString()}${suffix}</span>
            </div>`;
          });
          return result;
        },
      },
      legend: {
        data: ['Enrolled', 'Completed', 'Employment Rate'],
        top: 0,
        right: 0,
        textStyle: { color: '#94A3B8', fontSize: 12 },
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 20,
      },
      grid: {
        top: 48,
        left: 16,
        right: 16,
        bottom: 8,
        containLabel: true,
      },
      xAxis: {
        type: 'category' as const,
        data: sorted.map((d) => d.region),
        axisLine: { lineStyle: { color: '#1E293B' } },
        axisTick: { show: false },
        axisLabel: {
          color: '#64748B',
          fontSize: 10,
          rotate: 25,
          interval: 0,
        },
      },
      yAxis: [
        {
          type: 'value' as const,
          name: 'Participants',
          nameTextStyle: { color: '#64748B', fontSize: 10 },
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
        {
          type: 'value' as const,
          name: 'Emp. Rate %',
          nameTextStyle: { color: '#64748B', fontSize: 10 },
          min: 0,
          max: 100,
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: {
            color: '#64748B',
            fontSize: 11,
            formatter: (val: number) => `${val}%`,
          },
        },
      ],
      series: [
        {
          name: 'Enrolled',
          type: 'bar',
          data: sorted.map((d) => d.enrolled),
          barWidth: '28%',
          barGap: '15%',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(245,158,11,0.7)' },
                { offset: 1, color: 'rgba(245,158,11,0.15)' },
              ],
            },
            borderRadius: [4, 4, 0, 0],
          },
        },
        {
          name: 'Completed',
          type: 'bar',
          data: sorted.map((d) => d.completed),
          barWidth: '28%',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(16,185,129,0.7)' },
                { offset: 1, color: 'rgba(16,185,129,0.15)' },
              ],
            },
            borderRadius: [4, 4, 0, 0],
          },
        },
        {
          name: 'Employment Rate',
          type: 'line',
          yAxisIndex: 1,
          data: sorted.map((d) => d.employmentRate),
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          showSymbol: true,
          lineStyle: { width: 3, color: '#3B82F6' },
          itemStyle: { color: '#3B82F6' },
        },
      ],
      animationDuration: 1200,
      animationEasing: 'cubicOut',
    };
  }, []);

  // ────────────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────────────

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
              Youth Empowerment Programmes
              <span className="text-2xl md:text-3xl" role="img" aria-label="Ghana flag">
                {'\u{1F1EC}\u{1F1ED}'}
              </span>
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Tracking {EMPOWERMENT_KPIS.totalProgrammes} active programmes &bull; {EMPOWERMENT_KPIS.activeEnrollments.toLocaleString()} youth enrolled &bull; {formatCurrency(EMPOWERMENT_KPIS.fundingDisbursedGHS)} disbursed
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Active Enrollments"
          value={EMPOWERMENT_KPIS.activeEnrollments}
          icon={<Users size={22} />}
          color="gold"
          trend={EMPOWERMENT_KPIS.enrollmentGrowth}
          trendLabel="vs last quarter"
          delay={0}
        />
        <KPICard
          title="Entrepreneurs Funded"
          value={EMPOWERMENT_KPIS.businessesFunded}
          icon={<Rocket size={22} />}
          color="green"
          delay={0.08}
        />
        <KPICard
          title="Digital Skills Trained"
          value={EMPOWERMENT_KPIS.digitalSkillsTrained}
          suffix="/500K"
          icon={<Monitor size={22} />}
          color="blue"
          delay={0.16}
        />
        <KPICard
          title="TVET Completion Rate"
          value={EMPOWERMENT_KPIS.tvetCompletionRate}
          suffix="%"
          icon={<GraduationCap size={22} />}
          color="purple"
          delay={0.24}
          decimals={1}
        />
        <KPICard
          title="Youth Centres"
          value={EMPOWERMENT_KPIS.youthCentresOperational}
          suffix="/150"
          icon={<Building size={22} />}
          color="green"
          delay={0.32}
        />
      </div>

      {/* ── Section 1: Programme Performance Overview (full width) ── */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-5">
          <Award size={18} className="text-ghana-gold" />
          <h3 className="text-base font-heading font-semibold text-text-primary">
            Government Programme Tracker
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedProgrammes.map((prog, idx) => {
            const employmentRate = prog.completed > 0
              ? ((prog.employedAfter / prog.completed) * 100)
              : 0;
            const empRateColor =
              employmentRate >= 70
                ? 'text-emerald-400'
                : employmentRate >= 50
                  ? 'text-amber-400'
                  : 'text-red-400';
            const empBarColor =
              employmentRate >= 70
                ? 'bg-emerald-500'
                : employmentRate >= 50
                  ? 'bg-amber-500'
                  : 'bg-red-500';
            const budgetUtil = prog.budget > 0
              ? ((prog.disbursed / prog.budget) * 100)
              : 0;

            return (
              <motion.div
                key={prog.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.35 + idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass-card p-5 hover:border-ghana-gold/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h4 className="text-sm font-semibold text-text-primary leading-tight">
                    {prog.name}
                  </h4>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-surface-tertiary/80 text-text-muted border border-border whitespace-nowrap">
                      {prog.sector}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                      Active
                    </span>
                  </div>
                </div>

                {/* Key metrics */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <div>
                    <p className="text-[10px] text-text-muted uppercase tracking-wide">
                      Enrolled
                    </p>
                    <p className="text-sm font-bold text-text-primary">
                      {prog.enrolled.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted uppercase tracking-wide">
                      Active
                    </p>
                    <p className="text-sm font-bold text-text-primary">
                      {prog.active.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted uppercase tracking-wide">
                      Completed
                    </p>
                    <p className="text-sm font-bold text-text-primary">
                      {prog.completed.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted uppercase tracking-wide">
                      Employed
                    </p>
                    <p className="text-sm font-bold text-text-primary">
                      {prog.employedAfter.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Employment Rate bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-text-muted">
                      Employment Rate
                    </span>
                    <span
                      className={`text-[11px] font-semibold ${empRateColor}`}
                    >
                      {employmentRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-surface-tertiary/60 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${empBarColor} stat-bar-fill`}
                      style={{ width: `${employmentRate}%` }}
                    />
                  </div>
                </div>

                {/* Budget Utilization bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-text-muted">
                      Budget Utilization
                    </span>
                    <span className="text-[11px] font-semibold text-blue-400">
                      {budgetUtil.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-surface-tertiary/60 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-500 stat-bar-fill"
                      style={{ width: `${budgetUtil}%` }}
                    />
                  </div>
                </div>

                {/* Bottom row: budget figures */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div>
                    <p className="text-[10px] text-text-muted">Total Budget</p>
                    <p className="text-sm font-bold text-text-secondary">
                      {formatCurrency(prog.budget)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-text-muted">Disbursed</p>
                    <p className="text-sm font-bold text-emerald-400">
                      {formatCurrency(prog.disbursed)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Section 2: Two-column (Funding Pipeline + Entrepreneur Sectors) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: NEIP Funding Pipeline */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.35 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-ghana-gold" />
            <h3 className="text-base font-heading font-semibold text-text-primary">
              NEIP Funding Pipeline
            </h3>
          </div>
          <p className="text-xs text-text-muted mb-4">
            Entrepreneurship applications to active businesses. Conversion rates between stages shown on hover.
          </p>

          {/* Conversion metrics */}
          <div className="flex flex-wrap gap-3 mb-4">
            {FUNDING_PIPELINE.slice(1).map((stage, i) => {
              const prevCount = FUNDING_PIPELINE[i].count;
              const convRate = ((stage.count / prevCount) * 100).toFixed(1);
              return (
                <div
                  key={stage.stage}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-tertiary/40 text-[11px]"
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }} />
                  <span className="text-text-muted">{convRate}%</span>
                </div>
              );
            })}
          </div>

          <ReactECharts
            option={fundingPipelineOption}
            style={{ height: '320px', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </motion.div>

        {/* Right: Entrepreneur Sectors */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={18} className="text-ghana-gold" />
            <h3 className="text-base font-heading font-semibold text-text-primary">
              Youth Businesses by Sector
            </h3>
          </div>
          <p className="text-xs text-text-muted mb-4">
            Distribution of funded youth enterprises across economic sectors. Hover for revenue data.
          </p>
          <ReactECharts
            option={entrepreneurSectorsOption}
            style={{ height: '360px', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </motion.div>
      </div>

      {/* ── Section 3: Digital Skills Progress (full width) ── */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.45 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-2">
          <Monitor size={18} className="text-ghana-gold" />
          <h3 className="text-base font-heading font-semibold text-text-primary">
            Digital Skills Training &mdash; Road to 500,000
          </h3>
        </div>

        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">
              Cumulative Progress
            </span>
            <span className="text-sm font-bold text-text-primary">
              {EMPOWERMENT_KPIS.digitalSkillsTrained.toLocaleString()}{' '}
              <span className="text-text-muted font-normal">/ {EMPOWERMENT_KPIS.digitalTarget.toLocaleString()}</span>
              <span className="ml-2 text-ghana-gold font-semibold">
                ({digitalProgress.toFixed(1)}%)
              </span>
            </span>
          </div>
          <div className="h-4 w-full rounded-full bg-surface-tertiary/60 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${digitalProgress}%` }}
              transition={{ delay: 0.6, duration: 1.5, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600"
            />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[11px] text-text-muted">0</span>
            <div className="flex items-center gap-4 text-[11px] text-text-muted">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/70" /> Trained
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-0.5 bg-emerald-500 rounded" style={{ borderStyle: 'dashed' }} /> Target
              </span>
            </div>
            <span className="text-[11px] text-text-muted">500K</span>
          </div>
        </div>

        <ReactECharts
          option={digitalSkillsChartOption}
          style={{ height: '340px', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </motion.div>

      {/* ── Section 4: TVET Regional Performance (full width) ── */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.5 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap size={18} className="text-ghana-gold" />
          <h3 className="text-base font-heading font-semibold text-text-primary">
            TVET Performance by Region
          </h3>
        </div>
        <p className="text-xs text-text-muted mb-4">
          Enrolled vs completed participants with post-training employment rate overlay. Sorted by total enrolled.
        </p>
        <ReactECharts
          option={tvetRegionalOption}
          style={{ height: '400px', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </motion.div>

      {/* ── Section 5: Youth Resource Centres Network (full width) ── */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Building size={18} className="text-ghana-gold" />
          <h3 className="text-base font-heading font-semibold text-text-primary">
            Youth Resource Centres Network
          </h3>
        </div>

        {/* Summary stats */}
        <div className="flex flex-wrap gap-4 mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle2 size={14} className="text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-400">{centresSummary.operational}</span>
            <span className="text-xs text-emerald-400/70">Operational</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <HardHat size={14} className="text-amber-400" />
            <span className="text-sm font-semibold text-amber-400">{centresSummary.underConstruction}</span>
            <span className="text-xs text-amber-400/70">Under Construction</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <Clock size={14} className="text-blue-400" />
            <span className="text-sm font-semibold text-blue-400">{centresSummary.planned}</span>
            <span className="text-xs text-blue-400/70">Planned</span>
          </div>
        </div>

        {/* Centre cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {YOUTH_CENTRES.map((centre, idx) => {
            const statusBadge = getCentreStatusBadge(centre.status);
            const isOperational = centre.status === 'operational';
            const utilizationColor =
              centre.utilization >= 85
                ? 'bg-emerald-500'
                : centre.utilization >= 65
                  ? 'bg-amber-500'
                  : 'bg-blue-500';
            const utilizationTextColor =
              centre.utilization >= 85
                ? 'text-emerald-400'
                : centre.utilization >= 65
                  ? 'text-amber-400'
                  : 'text-blue-400';

            return (
              <motion.div
                key={centre.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.6 + idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass-card p-4 hover:border-ghana-gold/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h4 className="text-sm font-semibold text-text-primary leading-tight">
                    {centre.name}
                  </h4>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-text-muted mb-3">
                  <MapPin size={12} />
                  {centre.region}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${statusBadge.classes} whitespace-nowrap`}
                  >
                    {statusBadge.label}
                  </span>
                  <span className="text-xs text-text-muted">
                    Cap: {centre.capacity}
                  </span>
                </div>

                {/* Utilization bar — only for operational centres */}
                {isOperational ? (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-text-muted">Utilization</span>
                      <span className={`text-[11px] font-semibold ${utilizationTextColor}`}>
                        {centre.utilization}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-surface-tertiary/60 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${utilizationColor} stat-bar-fill`}
                        style={{ width: `${centre.utilization}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-[28px] flex items-center">
                    <span className="text-[11px] text-text-muted italic">
                      {centre.status === 'under_construction'
                        ? 'Construction in progress'
                        : 'Awaiting approval'}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
