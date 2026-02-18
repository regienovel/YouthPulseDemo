import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import {
  Users,
  Briefcase,
  Target,
  Clock,
  GraduationCap,
  TrendingUp,
  BarChart3,
  ChevronDown,
  Award,
} from 'lucide-react';

import {
  OVERVIEW_KPIS,
  MONTHLY_TRENDS,
  SKILLS_DEMAND,
  PROGRAMMES,
  EMPLOYMENT_BY_SECTOR,
  REGIONS,
  AGE_DISTRIBUTION,
} from '../data/mock-data';
import { KPICard } from '../components/KPICard';

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
// Sector colors for donut chart
// ────────────────────────────────────────────────────────────

const SECTOR_COLORS = [
  '#10B981', // Agriculture
  '#3B82F6', // Construction
  '#8B5CF6', // ICT
  '#F97316', // Hospitality
  '#EF4444', // Automotive
  '#EC4899', // Beauty
  '#14B8A6', // Health
  '#F59E0B', // Energy
  '#6366F1', // Creative Arts
  '#84CC16', // Mining
];

// ────────────────────────────────────────────────────────────
// Shared tooltip configuration
// ────────────────────────────────────────────────────────────

const TOOLTIP_STYLE = {
  backgroundColor: '#1E293B',
  borderColor: '#334155',
  borderWidth: 1,
  textStyle: { color: '#E2E8F0', fontSize: 13 },
};

// ============================================================
// EmploymentDashboard page
// ============================================================

export default function EmploymentDashboard() {
  // ── Filter state (visual only for demo) ──
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [selectedPeriod, setSelectedPeriod] = useState('Last 12 Months');

  const sectors = [
    'All Sectors',
    'Agriculture',
    'Construction',
    'ICT',
    'Automotive',
    'Hospitality',
    'Health',
    'Beauty',
    'Energy',
    'Creative Arts',
    'Mining',
  ];

  const periods = [
    'Last 12 Months',
    'Last 6 Months',
    'Last 3 Months',
    'This Month',
  ];

  // ── Skills demand sorted by gapRatio (descending) ──
  const sortedSkills = useMemo(
    () => [...SKILLS_DEMAND].sort((a, b) => b.gapRatio - a.gapRatio),
    []
  );
  const top10Skills = sortedSkills.slice(0, 10);

  // ── Programmes sorted by employment rate (descending) ──
  const sortedProgrammes = useMemo(
    () => [...PROGRAMMES].sort((a, b) => b.employmentRate - a.employmentRate),
    []
  );

  // ── Regions sorted by youthRegistered (descending), top 10 ──
  const top10Regions = useMemo(
    () =>
      [...REGIONS]
        .sort((a, b) => b.youthRegistered - a.youthRegistered)
        .slice(0, 10),
    []
  );

  // ────────────────────────────────────────────────────────
  // Chart 1: Registration & Employment Trends
  // ────────────────────────────────────────────────────────

  const trendsChartOption = useMemo(() => {
    const months = MONTHLY_TRENDS.map((t) => t.month);
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
        data: ['Registrations', 'Jobs Matched', 'Placements'],
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
        data: months,
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
          name: 'Registrations',
          type: 'bar',
          data: MONTHLY_TRENDS.map((t) => t.registrations),
          barWidth: '35%',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(245,158,11,0.6)' },
                { offset: 1, color: 'rgba(245,158,11,0.15)' },
              ],
            },
            borderRadius: [4, 4, 0, 0],
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
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(16,185,129,0.18)' },
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
          lineStyle: { width: 3, color: '#3B82F6', type: 'dashed' as const },
          itemStyle: { color: '#3B82F6' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(59,130,246,0.12)' },
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

  // ────────────────────────────────────────────────────────
  // Chart 2: Top Skills in Demand (horizontal bar)
  // ────────────────────────────────────────────────────────

  const skillsDemandChartOption = useMemo(() => {
    const reversed = [...top10Skills].reverse();
    const trendColorMap: Record<string, string> = {
      rising: '#10B981',
      stable: '#F59E0B',
      declining: '#EF4444',
    };

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis' as const,
        axisPointer: { type: 'shadow' as const },
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          const p = params[0];
          const skill = reversed[p.dataIndex];
          return `<div style="font-weight:600;margin-bottom:4px">${skill.name}</div>
            <div style="margin:2px 0">Sector: <b>${skill.sector}</b></div>
            <div style="margin:2px 0">Demand: <b>${skill.demandCount.toLocaleString()}</b></div>
            <div style="margin:2px 0">Supply: <b>${skill.supplyCount.toLocaleString()}</b></div>
            <div style="margin:2px 0">Gap Ratio: <b>${skill.gapRatio.toFixed(2)}x</b></div>
            <div style="margin:2px 0">Avg Salary: <b>GH\u20B5${skill.avgSalaryGHS.toLocaleString()}/mo</b></div>
            <div style="margin:2px 0">Trend: <b style="color:${trendColorMap[skill.trend]}">${skill.trend.charAt(0).toUpperCase() + skill.trend.slice(1)}</b></div>`;
        },
      },
      grid: {
        top: 12,
        left: 12,
        right: 80,
        bottom: 8,
        containLabel: true,
      },
      xAxis: {
        type: 'value' as const,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#1E293B', opacity: 0.6 } },
        axisLabel: {
          color: '#64748B',
          fontSize: 11,
          formatter: (val: number) => `${val.toFixed(1)}x`,
        },
      },
      yAxis: {
        type: 'category' as const,
        data: reversed.map((s) => s.name),
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
          data: reversed.map((s) => ({
            value: s.gapRatio,
            itemStyle: {
              color: trendColorMap[s.trend],
              borderRadius: [0, 4, 4, 0],
            },
          })),
          barWidth: '60%',
          label: {
            show: true,
            position: 'right' as const,
            formatter: (params: any) => {
              const skill = reversed[params.dataIndex];
              return `GH\u20B5${skill.avgSalaryGHS.toLocaleString()}`;
            },
            color: '#64748B',
            fontSize: 10,
          },
        },
      ],
      animationDuration: 1200,
      animationEasing: 'cubicOut',
    };
  }, [top10Skills]);

  // ────────────────────────────────────────────────────────
  // Chart 3: Employment by Sector (donut)
  // ────────────────────────────────────────────────────────

  const sectorDonutOption = useMemo(() => {
    const totalJobs = EMPLOYMENT_BY_SECTOR.reduce(
      (sum, s) => sum + s.jobCount,
      0
    );
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item' as const,
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          return `<div style="font-weight:600;margin-bottom:4px">${params.name}</div>
            <div>Jobs: <b>${params.value.toLocaleString()}</b></div>
            <div>Share: <b>${params.percent.toFixed(1)}%</b></div>`;
        },
      },
      legend: {
        orient: 'vertical' as const,
        right: 0,
        top: 'middle' as const,
        textStyle: { color: '#94A3B8', fontSize: 11 },
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 10,
        formatter: (name: string) => {
          if (name.length > 18) return name.slice(0, 18) + '...';
          return name;
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['46%', '72%'],
          center: ['35%', '50%'],
          avoidLabelOverlap: true,
          label: { show: false },
          emphasis: {
            label: { show: false },
            scaleSize: 6,
          },
          labelLine: { show: false },
          data: EMPLOYMENT_BY_SECTOR.map((s, i) => ({
            name: s.sector,
            value: s.jobCount,
            itemStyle: {
              color: SECTOR_COLORS[i % SECTOR_COLORS.length],
            },
          })),
        },
        {
          type: 'pie',
          radius: ['0%', '0%'],
          center: ['35%', '50%'],
          label: {
            show: true,
            position: 'center' as const,
            formatter: [
              `{total|${totalJobs.toLocaleString()}}`,
              '{sub|Total Jobs}',
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

  // ────────────────────────────────────────────────────────
  // Chart 4: Skills Supply vs Demand Gap
  // ────────────────────────────────────────────────────────

  const skillsGapChartOption = useMemo(() => {
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis' as const,
        axisPointer: { type: 'shadow' as const },
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          const supply = params[0];
          const demand = params[1];
          const gap = demand.value - supply.value;
          return `<div style="font-weight:600;margin-bottom:4px">${supply.axisValue}</div>
            <div style="display:flex;align-items:center;gap:6px;margin:3px 0">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${supply.color}"></span>
              <span style="flex:1">Supply</span>
              <span style="font-weight:600">${supply.value.toLocaleString()}</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px;margin:3px 0">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${demand.color}"></span>
              <span style="flex:1">Demand</span>
              <span style="font-weight:600">${demand.value.toLocaleString()}</span>
            </div>
            <div style="margin-top:6px;padding-top:6px;border-top:1px solid #334155;color:${gap > 0 ? '#EF4444' : '#10B981'};font-weight:600">
              Gap: ${gap > 0 ? '+' : ''}${gap.toLocaleString()}
            </div>`;
        },
      },
      legend: {
        data: ['Supply', 'Demand'],
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
        data: top10Skills.map((s) => s.name),
        axisLine: { lineStyle: { color: '#1E293B' } },
        axisTick: { show: false },
        axisLabel: {
          color: '#64748B',
          fontSize: 10,
          rotate: 35,
          interval: 0,
        },
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
            if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
            return val.toString();
          },
        },
      },
      series: [
        {
          name: 'Supply',
          type: 'bar',
          data: top10Skills.map((s) => s.supplyCount),
          barWidth: '30%',
          barGap: '20%',
          itemStyle: {
            color: '#3B82F6',
            borderRadius: [4, 4, 0, 0],
          },
        },
        {
          name: 'Demand',
          type: 'bar',
          data: top10Skills.map((s) => s.demandCount),
          barWidth: '30%',
          itemStyle: {
            color: '#F97316',
            borderRadius: [4, 4, 0, 0],
          },
        },
      ],
      animationDuration: 1200,
      animationEasing: 'cubicOut',
    };
  }, [top10Skills]);

  // ────────────────────────────────────────────────────────
  // Chart 5: Age Distribution (stacked horizontal bar)
  // ────────────────────────────────────────────────────────

  const ageDistributionOption = useMemo(() => {
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis' as const,
        axisPointer: { type: 'shadow' as const },
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          const male = params[0];
          const female = params[1];
          const total = male.value + female.value;
          return `<div style="font-weight:600;margin-bottom:4px">Age ${male.axisValue}</div>
            <div style="display:flex;align-items:center;gap:6px;margin:3px 0">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${male.color}"></span>
              <span style="flex:1">Male</span>
              <span style="font-weight:600">${male.value.toLocaleString()}</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px;margin:3px 0">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${female.color}"></span>
              <span style="flex:1">Female</span>
              <span style="font-weight:600">${female.value.toLocaleString()}</span>
            </div>
            <div style="margin-top:6px;padding-top:6px;border-top:1px solid #334155;font-weight:600;color:#E2E8F0">
              Total: ${total.toLocaleString()}
            </div>`;
        },
      },
      legend: {
        data: ['Male', 'Female'],
        top: 0,
        right: 0,
        textStyle: { color: '#94A3B8', fontSize: 12 },
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 20,
      },
      grid: {
        top: 40,
        left: 12,
        right: 16,
        bottom: 8,
        containLabel: true,
      },
      xAxis: {
        type: 'value' as const,
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
        data: AGE_DISTRIBUTION.map((a) => a.ageGroup),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: '#94A3B8', fontSize: 12 },
      },
      series: [
        {
          name: 'Male',
          type: 'bar',
          stack: 'total',
          data: AGE_DISTRIBUTION.map((a) => a.male),
          barWidth: '50%',
          itemStyle: {
            color: '#3B82F6',
            borderRadius: [0, 0, 0, 0],
          },
        },
        {
          name: 'Female',
          type: 'bar',
          stack: 'total',
          data: AGE_DISTRIBUTION.map((a) => a.female),
          barWidth: '50%',
          itemStyle: {
            color: '#A855F7',
            borderRadius: [0, 4, 4, 0],
          },
        },
      ],
      animationDuration: 1200,
      animationEasing: 'cubicOut',
    };
  }, []);

  // ────────────────────────────────────────────────────────
  // Chart 6: Regional Registration (horizontal bar)
  // ────────────────────────────────────────────────────────

  const regionalBarOption = useMemo(() => {
    const reversed = [...top10Regions].reverse();
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis' as const,
        axisPointer: { type: 'shadow' as const },
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          const p = params[0];
          return `<div style="font-weight:600;margin-bottom:4px">${p.name}</div>
            <div>Youth Registered: <b>${p.value.toLocaleString()}</b></div>`;
        },
      },
      grid: {
        top: 12,
        left: 12,
        right: 32,
        bottom: 8,
        containLabel: true,
      },
      xAxis: {
        type: 'value' as const,
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
        data: reversed.map((r) => r.name),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: '#94A3B8', fontSize: 11 },
      },
      series: [
        {
          type: 'bar',
          data: reversed.map((r) => ({
            value: r.youthRegistered,
            itemStyle: {
              color: r.color,
              borderRadius: [0, 4, 4, 0],
            },
          })),
          barWidth: '55%',
          label: {
            show: true,
            position: 'right' as const,
            formatter: (params: any) =>
              `${(params.value / 1000).toFixed(1)}K`,
            color: '#94A3B8',
            fontSize: 10,
          },
        },
      ],
      animationDuration: 1200,
      animationEasing: 'cubicOut',
    };
  }, [top10Regions]);

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
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-primary flex items-center gap-3">
              Youth Employment & Skills Intelligence
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Tracking 847,293 registered youth across 16 regions
            </p>
          </div>

          {/* Filter row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Region dropdown */}
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="appearance-none bg-surface-tertiary/60 border border-border text-text-secondary text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-ghana-gold/50 transition-colors cursor-pointer"
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
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
              />
            </div>

            {/* Sector dropdown */}
            <div className="relative">
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="appearance-none bg-surface-tertiary/60 border border-border text-text-secondary text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-ghana-gold/50 transition-colors cursor-pointer"
              >
                {sectors.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
              />
            </div>

            {/* Time period dropdown */}
            <div className="relative">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="appearance-none bg-surface-tertiary/60 border border-border text-text-secondary text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-ghana-gold/50 transition-colors cursor-pointer"
              >
                {periods.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── KPI Cards Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
          delay={0.08}
        />
        <KPICard
          title="Match Success Rate"
          value={OVERVIEW_KPIS.matchSuccessRate}
          suffix="%"
          icon={<Target size={22} />}
          color="blue"
          delay={0.16}
          decimals={1}
        />
        <KPICard
          title="Avg. Time to Employment"
          value={OVERVIEW_KPIS.avgTimeToEmploymentDays}
          suffix=" days"
          icon={<Clock size={22} />}
          color="purple"
          delay={0.24}
        />
        <KPICard
          title="Active Training"
          value={OVERVIEW_KPIS.activeTrainingEnrollments}
          icon={<GraduationCap size={22} />}
          color="green"
          trend={15.3}
          trendLabel="vs last quarter"
          delay={0.32}
        />
      </div>

      {/* ── Section 1: Registration & Employment Trends ── */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={18} className="text-ghana-gold" />
          <h3 className="text-base font-heading font-semibold text-text-primary">
            Registration & Employment Trends
          </h3>
        </div>
        <ReactECharts
          option={trendsChartOption}
          style={{ height: '380px', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </motion.div>

      {/* ── Section 2: Two-column grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Top Skills in Demand */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.35 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={18} className="text-ghana-gold" />
            <h3 className="text-base font-heading font-semibold text-text-primary">
              Top Skills in Demand
            </h3>
          </div>
          <p className="text-xs text-text-muted mb-3">
            Sorted by gap ratio (demand / supply). Bar color indicates trend
            direction.
          </p>
          <div className="flex items-center gap-4 mb-4 text-[11px] text-text-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Rising
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              Stable
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              Declining
            </span>
          </div>
          <ReactECharts
            option={skillsDemandChartOption}
            style={{ height: '380px', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </motion.div>

        {/* Right: Employment by Sector */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Briefcase size={18} className="text-ghana-gold" />
            <h3 className="text-base font-heading font-semibold text-text-primary">
              Employment by Sector
            </h3>
          </div>
          <ReactECharts
            option={sectorDonutOption}
            style={{ height: '400px', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </motion.div>
      </div>

      {/* ── Section 3: Skills Gap Analysis ── */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.45 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Target size={18} className="text-ghana-gold" />
          <h3 className="text-base font-heading font-semibold text-text-primary">
            Skills Supply vs Demand Gap Analysis
          </h3>
        </div>
        <p className="text-xs text-text-muted mb-3">
          Comparing available skilled youth (supply) against market requirements
          (demand) for the top 10 in-demand skills.
        </p>
        <ReactECharts
          option={skillsGapChartOption}
          style={{ height: '380px', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </motion.div>

      {/* ── Section 4: Programme Effectiveness ── */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-5">
          <Award size={18} className="text-ghana-gold" />
          <h3 className="text-base font-heading font-semibold text-text-primary">
            Government Programme Effectiveness Tracker
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {sortedProgrammes.map((prog, idx) => {
            const empRateColor =
              prog.employmentRate >= 70
                ? 'text-emerald-400'
                : prog.employmentRate >= 50
                  ? 'text-amber-400'
                  : 'text-red-400';
            const empBarColor =
              prog.employmentRate >= 70
                ? 'bg-emerald-500'
                : prog.employmentRate >= 50
                  ? 'bg-amber-500'
                  : 'bg-red-500';
            const compBarColor = 'bg-blue-500';

            return (
              <motion.div
                key={prog.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.55 + idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass-card p-5 hover:border-ghana-gold/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h4 className="text-sm font-semibold text-text-primary leading-tight">
                    {prog.name}
                  </h4>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-surface-tertiary/80 text-text-muted border border-border whitespace-nowrap flex-shrink-0">
                    {prog.sector}
                  </span>
                </div>

                {/* Key metrics */}
                <div className="grid grid-cols-3 gap-3 mb-4">
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

                {/* Completion Rate bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-text-muted">
                      Completion Rate
                    </span>
                    <span className="text-[11px] font-semibold text-blue-400">
                      {prog.completionRate}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-surface-tertiary/60 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${compBarColor} stat-bar-fill`}
                      style={{ width: `${prog.completionRate}%` }}
                    />
                  </div>
                </div>

                {/* Employment Rate bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-text-muted">
                      Employment Rate
                    </span>
                    <span
                      className={`text-[11px] font-semibold ${empRateColor}`}
                    >
                      {prog.employmentRate}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-surface-tertiary/60 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${empBarColor} stat-bar-fill`}
                      style={{ width: `${prog.employmentRate}%` }}
                    />
                  </div>
                </div>

                {/* Bottom row: income + cost */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div>
                    <p className="text-[10px] text-text-muted">
                      Avg Income After
                    </p>
                    <p className="text-sm font-bold text-emerald-400">
                      {formatCurrency(prog.avgIncomeAfterGHS)}
                      <span className="text-[10px] text-text-muted font-normal">
                        /mo
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-text-muted">
                      Cost / Outcome
                    </p>
                    <p className="text-sm font-bold text-text-secondary">
                      {formatCurrency(prog.costPerOutcomeGHS)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Section 5: Demographics (two-column) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Age Distribution */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.55 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Users size={18} className="text-ghana-gold" />
            <h3 className="text-base font-heading font-semibold text-text-primary">
              Age Distribution by Gender
            </h3>
          </div>
          <ReactECharts
            option={ageDistributionOption}
            style={{ height: '300px', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </motion.div>

        {/* Right: Regional Registration */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={18} className="text-ghana-gold" />
            <h3 className="text-base font-heading font-semibold text-text-primary">
              Youth Registration by Region (Top 10)
            </h3>
          </div>
          <ReactECharts
            option={regionalBarOption}
            style={{ height: '300px', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </motion.div>
      </div>
    </div>
  );
}
