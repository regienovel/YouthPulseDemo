import { useMemo } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import {
  Users,
  UserX,
  HeartHandshake,
  Plane,
  MapPin,
  Vote,
  TrendingDown,
  BarChart3,
  AlertTriangle,
  Target,
  ShieldCheck,
  Brain,
  Lightbulb,
  Award,
} from 'lucide-react';

import { KPICard } from '../components/KPICard';

// ────────────────────────────────────────────────────────────
// Mock data — all defined inline
// ────────────────────────────────────────────────────────────

const NEET_KPIS = {
  totalNEET: 1340000,
  neetRate: 25.8,
  neetReduction: -2.3,
  youthReached: 312400,
  reachedGrowth: 24.7,
  migrationRiskYouth: 478000,
  migrationRiskPercent: 72,
  civicParticipation: 23.4,
  civicGrowth: 4.1,
  mentalHealthScreened: 28400,
  mentorshipActive: 4280,
  districtsCovered: 198,
  totalDistricts: 261,
};

const NEET_BY_REGION = [
  { region: 'Greater Accra', neetCount: 245000, neetRate: 28.1, trend: -1.8, population: 872000, color: '#F59E0B' },
  { region: 'Ashanti', neetCount: 198000, neetRate: 24.2, trend: -2.1, population: 818000, color: '#10B981' },
  { region: 'Northern', neetCount: 142000, neetRate: 31.5, trend: -0.8, population: 451000, color: '#3B82F6' },
  { region: 'Western', neetCount: 98000, neetRate: 23.8, trend: -2.5, population: 412000, color: '#EC4899' },
  { region: 'Eastern', neetCount: 95000, neetRate: 24.9, trend: -1.9, population: 381000, color: '#F97316' },
  { region: 'Central', neetCount: 88000, neetRate: 26.3, trend: -1.2, population: 335000, color: '#14B8A6' },
  { region: 'Volta', neetCount: 78000, neetRate: 27.1, trend: -1.5, population: 288000, color: '#8B5CF6' },
  { region: 'Upper East', neetCount: 62000, neetRate: 33.2, trend: -0.5, population: 187000, color: '#EF4444' },
  { region: 'Bono', neetCount: 54000, neetRate: 22.4, trend: -2.8, population: 241000, color: '#84CC16' },
  { region: 'Savannah', neetCount: 48000, neetRate: 34.1, trend: -0.3, population: 141000, color: '#A855F7' },
  { region: 'Upper West', neetCount: 45000, neetRate: 32.8, trend: -0.6, population: 137000, color: '#6366F1' },
  { region: 'Bono East', neetCount: 42000, neetRate: 23.1, trend: -2.4, population: 182000, color: '#F59E0B' },
  { region: 'Oti', neetCount: 38000, neetRate: 29.4, trend: -0.9, population: 129000, color: '#2DD4BF' },
  { region: 'North East', neetCount: 35000, neetRate: 35.2, trend: -0.2, population: 99000, color: '#FB923C' },
  { region: 'Ahafo', neetCount: 32000, neetRate: 24.5, trend: -2.0, population: 131000, color: '#22D3EE' },
  { region: 'Western North', neetCount: 40000, neetRate: 26.8, trend: -1.4, population: 149000, color: '#E879F9' },
];

const NEET_MONTHLY_TREND = [
  { month: "Mar '25", neetRate: 28.1, reached: 18200 },
  { month: "Apr '25", neetRate: 27.8, reached: 21400 },
  { month: "May '25", neetRate: 27.5, reached: 23800 },
  { month: "Jun '25", neetRate: 27.2, reached: 25100 },
  { month: "Jul '25", neetRate: 27.0, reached: 24600 },
  { month: "Aug '25", neetRate: 26.7, reached: 26900 },
  { month: "Sep '25", neetRate: 26.4, reached: 28200 },
  { month: "Oct '25", neetRate: 26.2, reached: 27800 },
  { month: "Nov '25", neetRate: 26.0, reached: 29100 },
  { month: "Dec '25", neetRate: 25.9, reached: 22400 },
  { month: "Jan '26", neetRate: 25.8, reached: 31200 },
  { month: "Feb '26", neetRate: 25.8, reached: 33600 },
];

const MIGRATION_RISK = [
  { reason: 'Unemployment', percent: 38, count: 181640 },
  { reason: 'Low Income', percent: 24, count: 114720 },
  { reason: 'Lack of Opportunities', percent: 18, count: 86040 },
  { reason: 'Education Access', percent: 11, count: 52580 },
  { reason: 'Family Pressure', percent: 9, count: 43020 },
];

const CIVIC_PARTICIPATION = [
  { activity: 'Voted in Last Election', percent: 42.1, youth: 356000 },
  { activity: 'Community Volunteer', percent: 18.7, youth: 158200 },
  { activity: 'Youth Council Member', percent: 5.2, youth: 44000 },
  { activity: 'Attended Town Hall', percent: 12.8, youth: 108300 },
  { activity: 'Online Civic Engagement', percent: 31.4, youth: 265700 },
  { activity: 'Political Party Member', percent: 8.9, youth: 75300 },
];

const INTERVENTION_OUTCOMES = [
  { intervention: 'Skills Training Placement', reached: 48750, transitioned: 22400, rate: 45.9, cost: 1200 },
  { intervention: 'Entrepreneurship Grant', reached: 8420, transitioned: 5200, rate: 61.7, cost: 3500 },
  { intervention: 'Digital Literacy', reached: 124500, transitioned: 31200, rate: 25.1, cost: 450 },
  { intervention: 'Apprenticeship Matching', reached: 18600, transitioned: 12400, rate: 66.7, cost: 800 },
  { intervention: 'Career Counselling', reached: 45200, transitioned: 11300, rate: 25.0, cost: 150 },
  { intervention: 'Mentorship Programme', reached: 4280, transitioned: 2570, rate: 60.0, cost: 600 },
  { intervention: 'Agriculture Support', reached: 12800, transitioned: 7700, rate: 60.2, cost: 1800 },
];

const DISTRICT_COVERAGE = {
  covered: 198,
  total: 261,
  highReach: 67,
  mediumReach: 82,
  lowReach: 49,
  noCoverage: 63,
};

const MENTAL_HEALTH_DATA = [
  { category: 'Anxiety / Stress', count: 12400, percent: 43.7 },
  { category: 'Depression Indicators', count: 6200, percent: 21.8 },
  { category: 'Substance Use Risk', count: 4800, percent: 16.9 },
  { category: 'Social Isolation', count: 3200, percent: 11.3 },
  { category: 'Other Concerns', count: 1800, percent: 6.3 },
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
// Migration donut colors (warm/crisis palette)
// ────────────────────────────────────────────────────────────

const MIGRATION_COLORS = ['#EF4444', '#F97316', '#F59E0B', '#FB923C', '#FBBF24'];

// ────────────────────────────────────────────────────────────
// Mental health colors (respectful blues/purples/teals)
// ────────────────────────────────────────────────────────────

const MENTAL_HEALTH_COLORS = ['#6366F1', '#8B5CF6', '#14B8A6', '#3B82F6', '#A78BFA'];

// ============================================================
// NEETDashboard page
// ============================================================

export default function NEETDashboard() {
  // Sort interventions by transition rate descending
  const sortedInterventions = useMemo(
    () => [...INTERVENTION_OUTCOMES].sort((a, b) => b.rate - a.rate),
    []
  );

  // Best performer (top rate)
  const bestIntervention = sortedInterventions[0]?.intervention;

  // Sort regions by neetRate descending (worst first)
  const regionsByRate = useMemo(
    () => [...NEET_BY_REGION].sort((a, b) => b.neetRate - a.neetRate),
    []
  );

  // ────────────────────────────────────────────────────────
  // Chart 1: NEET Trend & Youth Outreach (combined line + bar)
  // ────────────────────────────────────────────────────────

  const neetTrendChartOption = useMemo(() => {
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis' as const,
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          let result = `<div style="font-weight:600;margin-bottom:6px">${params[0].axisValue}</div>`;
          params.forEach((p: any) => {
            const suffix = p.seriesName === 'NEET Rate' ? '%' : '';
            result += `<div style="display:flex;align-items:center;gap:6px;margin:3px 0">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color}"></span>
              <span style="flex:1">${p.seriesName}</span>
              <span style="font-weight:600">${typeof p.value === 'number' ? p.value.toLocaleString() : p.value}${suffix}</span>
            </div>`;
          });
          return result;
        },
      },
      legend: {
        data: ['NEET Rate', 'Youth Reached', 'Target: 20%'],
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
        data: NEET_MONTHLY_TREND.map((t) => t.month),
        axisLine: { lineStyle: { color: '#1E293B' } },
        axisTick: { show: false },
        axisLabel: { color: '#64748B', fontSize: 11 },
      },
      yAxis: [
        {
          type: 'value' as const,
          name: 'NEET Rate %',
          nameTextStyle: { color: '#64748B', fontSize: 10 },
          min: 18,
          max: 30,
          splitLine: { lineStyle: { color: '#1E293B', opacity: 0.6 } },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            color: '#64748B',
            fontSize: 11,
            formatter: (val: number) => `${val}%`,
          },
        },
        {
          type: 'value' as const,
          name: 'Youth Reached',
          nameTextStyle: { color: '#64748B', fontSize: 10 },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: {
            color: '#64748B',
            fontSize: 11,
            formatter: (val: number) => {
              if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
              return val.toString();
            },
          },
        },
      ],
      series: [
        {
          name: 'Youth Reached',
          type: 'bar',
          yAxisIndex: 1,
          data: NEET_MONTHLY_TREND.map((t) => t.reached),
          barWidth: '40%',
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
          name: 'NEET Rate',
          type: 'line',
          yAxisIndex: 0,
          data: NEET_MONTHLY_TREND.map((t) => t.neetRate),
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          showSymbol: true,
          lineStyle: { width: 3, color: '#EF4444' },
          itemStyle: { color: '#EF4444' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(239,68,68,0.15)' },
                { offset: 1, color: 'rgba(239,68,68,0.02)' },
              ],
            },
          },
        },
        {
          name: 'Target: 20%',
          type: 'line',
          yAxisIndex: 0,
          data: NEET_MONTHLY_TREND.map(() => 20),
          symbol: 'none',
          lineStyle: {
            width: 2,
            color: '#10B981',
            type: 'dashed' as const,
          },
          itemStyle: { color: '#10B981' },
        },
      ],
      animationDuration: 1200,
      animationEasing: 'cubicOut',
    };
  }, []);

  // ────────────────────────────────────────────────────────
  // Chart 2: NEET Rate by Region (horizontal bar)
  // ────────────────────────────────────────────────────────

  const neetRegionalChartOption = useMemo(() => {
    const reversed = [...regionsByRate].reverse();
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis' as const,
        axisPointer: { type: 'shadow' as const },
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          const p = params[0];
          const region = reversed[p.dataIndex];
          return `<div style="font-weight:600;margin-bottom:4px">${region.region}</div>
            <div style="margin:2px 0">NEET Rate: <b>${region.neetRate}%</b></div>
            <div style="margin:2px 0">NEET Count: <b>${region.neetCount.toLocaleString()}</b></div>
            <div style="margin:2px 0">Youth Population: <b>${region.population.toLocaleString()}</b></div>
            <div style="margin:2px 0;color:#10B981">Trend: <b>${region.trend}%</b> (improving)</div>`;
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
        max: 40,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#1E293B', opacity: 0.6 } },
        axisLabel: {
          color: '#64748B',
          fontSize: 11,
          formatter: (val: number) => `${val}%`,
        },
      },
      yAxis: {
        type: 'category' as const,
        data: reversed.map((r) => r.region),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: '#94A3B8',
          fontSize: 11,
          width: 100,
          overflow: 'truncate' as const,
        },
      },
      series: [
        {
          type: 'bar',
          data: reversed.map((r) => ({
            value: r.neetRate,
            itemStyle: {
              color: r.neetRate >= 32
                ? '#EF4444'
                : r.neetRate >= 28
                  ? '#F97316'
                  : r.neetRate >= 25
                    ? '#F59E0B'
                    : '#10B981',
              borderRadius: [0, 4, 4, 0],
            },
          })),
          barWidth: '60%',
          label: {
            show: true,
            position: 'right' as const,
            formatter: (params: any) => {
              const region = reversed[params.dataIndex];
              return `${region.neetRate}% (${region.trend}%)`;
            },
            color: '#94A3B8',
            fontSize: 10,
          },
        },
      ],
      animationDuration: 1200,
      animationEasing: 'cubicOut',
    };
  }, [regionsByRate]);

  // ────────────────────────────────────────────────────────
  // Chart 3: Migration Risk Factors (donut)
  // ────────────────────────────────────────────────────────

  const migrationDonutOption = useMemo(() => {
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item' as const,
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          const item = MIGRATION_RISK[params.dataIndex];
          return `<div style="font-weight:600;margin-bottom:4px">${params.name}</div>
            <div>Share: <b>${item.percent}%</b></div>
            <div>Youth affected: <b>${item.count.toLocaleString()}</b></div>`;
        },
      },
      legend: {
        orient: 'vertical' as const,
        right: 0,
        top: 'middle' as const,
        textStyle: { color: '#94A3B8', fontSize: 11 },
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 12,
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
          data: MIGRATION_RISK.map((m, i) => ({
            name: m.reason,
            value: m.percent,
            itemStyle: {
              color: MIGRATION_COLORS[i],
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
              '{total|72%}',
              '{sub|considering}',
              '{sub|emigration}',
            ].join('\n'),
            rich: {
              total: {
                fontSize: 24,
                fontWeight: 700,
                color: '#EF4444',
                lineHeight: 30,
              },
              sub: {
                fontSize: 11,
                color: '#64748B',
                lineHeight: 16,
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
  // Chart 4: District Coverage (donut)
  // ────────────────────────────────────────────────────────

  const districtDonutOption = useMemo(() => {
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item' as const,
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          return `<div style="font-weight:600;margin-bottom:4px">${params.name}</div>
            <div>Districts: <b>${params.value}</b></div>
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
        itemGap: 12,
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
          data: [
            { name: 'High Reach', value: DISTRICT_COVERAGE.highReach, itemStyle: { color: '#10B981' } },
            { name: 'Medium Reach', value: DISTRICT_COVERAGE.mediumReach, itemStyle: { color: '#F59E0B' } },
            { name: 'Low Reach', value: DISTRICT_COVERAGE.lowReach, itemStyle: { color: '#F97316' } },
            { name: 'No Coverage', value: DISTRICT_COVERAGE.noCoverage, itemStyle: { color: '#EF4444' } },
          ],
        },
        {
          type: 'pie',
          radius: ['0%', '0%'],
          center: ['35%', '50%'],
          label: {
            show: true,
            position: 'center' as const,
            formatter: [
              `{total|${DISTRICT_COVERAGE.covered}}`,
              `{sub|/ ${DISTRICT_COVERAGE.total} districts}`,
            ].join('\n'),
            rich: {
              total: {
                fontSize: 24,
                fontWeight: 700,
                color: '#10B981',
                lineHeight: 30,
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
  // Chart 5: Civic Participation (horizontal bar)
  // ────────────────────────────────────────────────────────

  const civicChartOption = useMemo(() => {
    const sorted = [...CIVIC_PARTICIPATION].sort((a, b) => a.percent - b.percent);
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis' as const,
        axisPointer: { type: 'shadow' as const },
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          const p = params[0];
          const item = sorted[p.dataIndex];
          return `<div style="font-weight:600;margin-bottom:4px">${item.activity}</div>
            <div>Participation: <b>${item.percent}%</b></div>
            <div>Youth: <b>${item.youth.toLocaleString()}</b></div>`;
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
        max: 50,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#1E293B', opacity: 0.6 } },
        axisLabel: {
          color: '#64748B',
          fontSize: 11,
          formatter: (val: number) => `${val}%`,
        },
      },
      yAxis: {
        type: 'category' as const,
        data: sorted.map((c) => c.activity),
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
          data: sorted.map((c, i) => ({
            value: c.percent,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 0, color: 'rgba(59,130,246,0.4)' },
                  { offset: 1, color: `rgba(99,102,241,${0.5 + i * 0.08})` },
                ],
              },
              borderRadius: [0, 4, 4, 0],
            },
          })),
          barWidth: '55%',
          label: {
            show: true,
            position: 'right' as const,
            formatter: (params: any) => `${params.value}%`,
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
  // Chart 6: Mental Health Screening (horizontal bar)
  // ────────────────────────────────────────────────────────

  const mentalHealthChartOption = useMemo(() => {
    const reversed = [...MENTAL_HEALTH_DATA].reverse();
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis' as const,
        axisPointer: { type: 'shadow' as const },
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          const p = params[0];
          const item = reversed[p.dataIndex];
          return `<div style="font-weight:600;margin-bottom:4px">${item.category}</div>
            <div>Screened: <b>${item.count.toLocaleString()}</b></div>
            <div>Proportion: <b>${item.percent}%</b></div>`;
        },
      },
      grid: {
        top: 12,
        left: 12,
        right: 60,
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
          formatter: (val: number) => val.toLocaleString(),
        },
      },
      yAxis: {
        type: 'category' as const,
        data: reversed.map((m) => m.category),
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
          data: reversed.map((m, i) => ({
            value: m.count,
            itemStyle: {
              color: MENTAL_HEALTH_COLORS[MENTAL_HEALTH_DATA.length - 1 - i],
              borderRadius: [0, 4, 4, 0],
            },
          })),
          barWidth: '55%',
          label: {
            show: true,
            position: 'right' as const,
            formatter: (params: any) => {
              const item = reversed[params.dataIndex];
              return `${item.percent}%`;
            },
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
              NEET Reduction & Community Impact
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Tracking 1.34M NEET youth &bull; Reaching 312,400 through interventions &bull; 198/261 districts covered
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
        {/* NEET Youth — special: negative trend should show GREEN */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.025 }}
          className="relative overflow-hidden rounded-2xl bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] hover:border-red-500/40 shadow-lg shadow-red-500/10 transition-all duration-300 group"
        >
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-red-500 via-red-400 to-red-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
          <div
            className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-[0.07] blur-2xl transition-opacity duration-500 group-hover:opacity-[0.13]"
            style={{ backgroundColor: '#EF4444' }}
          />
          <div className="relative z-10 flex items-start gap-4 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 ring-1 ring-white/[0.06]">
              <span className="text-red-400"><UserX size={22} /></span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-400">NEET Youth</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-slate-100">
                1,340,000
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold text-emerald-400 bg-white/[0.04]">
                  <TrendingDown className="h-3 w-3" />
                  -2.3%
                </span>
                <span className="text-xs text-slate-500">declining (good)</span>
              </div>
            </div>
          </div>
        </motion.div>

        <KPICard
          title="Youth Reached"
          value={NEET_KPIS.youthReached}
          icon={<HeartHandshake size={22} />}
          color="gold"
          trend={NEET_KPIS.reachedGrowth}
          trendLabel="vs last quarter"
          delay={0.08}
        />
        <KPICard
          title="Migration Risk"
          value={NEET_KPIS.migrationRiskPercent}
          suffix="%"
          icon={<Plane size={22} />}
          color="red"
          delay={0.16}
        />
        <KPICard
          title="Districts Covered"
          value={NEET_KPIS.districtsCovered}
          suffix="/261"
          icon={<MapPin size={22} />}
          color="green"
          delay={0.24}
        />
        <KPICard
          title="Civic Participation"
          value={NEET_KPIS.civicParticipation}
          suffix="%"
          icon={<Vote size={22} />}
          color="blue"
          trend={NEET_KPIS.civicGrowth}
          trendLabel="vs last quarter"
          delay={0.32}
          decimals={1}
        />
      </div>

      {/* ── Section 1: NEET Trend & Outreach (full width) ── */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown size={18} className="text-ghana-gold" />
          <h3 className="text-base font-heading font-semibold text-text-primary">
            NEET Rate Trend & Youth Outreach
          </h3>
        </div>
        <p className="text-xs text-text-muted mb-4">
          NEET rate declining from 28.1% to 25.8% over 12 months. Gold bars show monthly youth reached through interventions. Dashed green line marks the 2028 target of 20%.
        </p>
        <ReactECharts
          option={neetTrendChartOption}
          style={{ height: '380px', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </motion.div>

      {/* ── Section 2: Two columns (Regional + Migration) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: NEET Rate by Region */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.35 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={18} className="text-ghana-gold" />
            <h3 className="text-base font-heading font-semibold text-text-primary">
              NEET Rate by Region
            </h3>
          </div>
          <p className="text-xs text-text-muted mb-3">
            Sorted by NEET rate (highest first). All regions showing improvement. Bar color: red = critical, orange = high, gold = moderate, green = improving.
          </p>
          <div className="flex items-center gap-4 mb-4 text-[11px] text-text-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              &gt;32%
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              28-32%
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              25-28%
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              &lt;25%
            </span>
          </div>
          <ReactECharts
            option={neetRegionalChartOption}
            style={{ height: '520px', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </motion.div>

        {/* Right: Migration Risk Factors */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={18} className="text-red-400" />
            <h3 className="text-base font-heading font-semibold text-text-primary">
              Why Youth Want to Emigrate
            </h3>
          </div>
          <p className="text-xs text-text-muted mb-4">
            Based on survey of 478,000 youth aged 18-35 identified as migration-risk. Unemployment remains the dominant push factor.
          </p>
          <ReactECharts
            option={migrationDonutOption}
            style={{ height: '340px', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />

          {/* Migration risk summary cards */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {MIGRATION_RISK.slice(0, 4).map((m, idx) => (
              <div
                key={m.reason}
                className="relative overflow-hidden rounded-xl bg-[#111827]/60 px-4 py-3 ring-1 ring-white/[0.06] transition-colors duration-200 hover:bg-[#111827]/80"
              >
                <div
                  className="absolute inset-y-0 left-0 w-[3px] rounded-full"
                  style={{ backgroundColor: MIGRATION_COLORS[idx], opacity: 0.6 }}
                />
                <p className="text-xs font-medium text-slate-500">{m.reason}</p>
                <p className="mt-0.5 text-lg font-bold text-slate-200">
                  {m.count.toLocaleString()}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500">{m.percent}% of at-risk youth</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Section 3: Intervention Effectiveness (full width) ── */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        <div className="flex items-center gap-2 mb-5">
          <Target size={18} className="text-ghana-gold" />
          <h3 className="text-base font-heading font-semibold text-text-primary">
            Intervention Outcomes &mdash; What's Working?
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {sortedInterventions.map((item, idx) => {
            const rateColor =
              item.rate >= 60
                ? 'text-emerald-400'
                : item.rate >= 40
                  ? 'text-amber-400'
                  : 'text-red-400';
            const rateBarColor =
              item.rate >= 60
                ? 'bg-emerald-500'
                : item.rate >= 40
                  ? 'bg-amber-500'
                  : 'bg-red-500';
            const isBest = item.intervention === bestIntervention;

            return (
              <motion.div
                key={item.intervention}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.5 + idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`glass-card p-5 transition-all duration-300 ${
                  isBest
                    ? 'border-ghana-gold/50 shadow-lg shadow-ghana-gold/10'
                    : 'hover:border-ghana-gold/30'
                }`}
              >
                {/* Best performer badge */}
                {isBest && (
                  <div className="flex items-center gap-1.5 mb-3">
                    <Award size={14} className="text-ghana-gold" />
                    <span className="text-[10px] font-semibold text-ghana-gold uppercase tracking-wider">
                      Top Performer
                    </span>
                  </div>
                )}

                <h4 className="text-sm font-semibold text-text-primary leading-tight mb-3">
                  {item.intervention}
                </h4>

                {/* Key metrics */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div>
                    <p className="text-[10px] text-text-muted uppercase tracking-wide">
                      Reached
                    </p>
                    <p className="text-sm font-bold text-text-primary">
                      {item.reached.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted uppercase tracking-wide">
                      Transitioned
                    </p>
                    <p className="text-sm font-bold text-text-primary">
                      {item.transitioned.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted uppercase tracking-wide">
                      Cost / Exit
                    </p>
                    <p className="text-sm font-bold text-text-secondary">
                      {formatCurrency(item.cost)}
                    </p>
                  </div>
                </div>

                {/* Transition Rate bar */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-text-muted">
                      Transition Rate
                    </span>
                    <span className={`text-[11px] font-semibold ${rateColor}`}>
                      {item.rate}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-surface-tertiary/60 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${rateBarColor} stat-bar-fill`}
                      style={{ width: `${item.rate}%` }}
                    />
                  </div>
                </div>

                {/* Cost efficiency indicator */}
                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-text-muted">Cost Efficiency</span>
                    <span className={`text-[11px] font-semibold ${
                      item.cost <= 600
                        ? 'text-emerald-400'
                        : item.cost <= 1500
                          ? 'text-amber-400'
                          : 'text-red-400'
                    }`}>
                      {item.cost <= 600 ? 'High' : item.cost <= 1500 ? 'Medium' : 'Low'}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Section 4: Two columns (District Coverage + Civic Participation) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: District Coverage */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={18} className="text-ghana-gold" />
            <h3 className="text-base font-heading font-semibold text-text-primary">
              District Coverage Map
            </h3>
          </div>
          <p className="text-xs text-text-muted mb-4">
            Coverage of YouthPulse interventions across Ghana's 261 MMDAs.
          </p>

          <ReactECharts
            option={districtDonutOption}
            style={{ height: '280px', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />

          {/* Mini stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="relative overflow-hidden rounded-xl bg-[#111827]/60 px-4 py-3 ring-1 ring-white/[0.06]">
              <div className="absolute inset-y-0 left-0 w-[3px] rounded-full bg-emerald-500 opacity-60" />
              <p className="text-xs font-medium text-slate-500">High Reach</p>
              <p className="mt-0.5 text-lg font-bold text-slate-200">{DISTRICT_COVERAGE.highReach}</p>
            </div>
            <div className="relative overflow-hidden rounded-xl bg-[#111827]/60 px-4 py-3 ring-1 ring-white/[0.06]">
              <div className="absolute inset-y-0 left-0 w-[3px] rounded-full bg-amber-500 opacity-60" />
              <p className="text-xs font-medium text-slate-500">Medium Reach</p>
              <p className="mt-0.5 text-lg font-bold text-slate-200">{DISTRICT_COVERAGE.mediumReach}</p>
            </div>
            <div className="relative overflow-hidden rounded-xl bg-[#111827]/60 px-4 py-3 ring-1 ring-white/[0.06]">
              <div className="absolute inset-y-0 left-0 w-[3px] rounded-full bg-orange-500 opacity-60" />
              <p className="text-xs font-medium text-slate-500">Low Reach</p>
              <p className="mt-0.5 text-lg font-bold text-slate-200">{DISTRICT_COVERAGE.lowReach}</p>
            </div>
            <div className="relative overflow-hidden rounded-xl bg-[#111827]/60 px-4 py-3 ring-1 ring-white/[0.06]">
              <div className="absolute inset-y-0 left-0 w-[3px] rounded-full bg-red-500 opacity-60" />
              <p className="text-xs font-medium text-slate-500">No Coverage</p>
              <p className="mt-0.5 text-lg font-bold text-slate-200">{DISTRICT_COVERAGE.noCoverage}</p>
            </div>
          </div>

          {/* Progress statement */}
          <div className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <ShieldCheck size={16} className="text-emerald-400 flex-shrink-0" />
            <p className="text-xs text-emerald-400">
              <span className="font-semibold">75.9% of districts reached</span> — target: 100% by 2027
            </p>
          </div>
        </motion.div>

        {/* Right: Civic Participation */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.55 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <Vote size={18} className="text-ghana-gold" />
            <h3 className="text-base font-heading font-semibold text-text-primary">
              Youth Civic Engagement
            </h3>
          </div>
          <p className="text-xs text-text-muted mb-4">
            Participation rates among registered youth aged 18-35. Online engagement growing fastest.
          </p>
          <ReactECharts
            option={civicChartOption}
            style={{ height: '320px', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />

          {/* Highlight stats */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="relative overflow-hidden rounded-xl bg-[#111827]/60 px-4 py-3 ring-1 ring-white/[0.06]">
              <div className="absolute inset-y-0 left-0 w-[3px] rounded-full bg-blue-500 opacity-60" />
              <p className="text-xs font-medium text-slate-500">Active Mentorship Pairs</p>
              <p className="mt-0.5 text-lg font-bold text-slate-200">{NEET_KPIS.mentorshipActive.toLocaleString()}</p>
              <p className="mt-0.5 text-[11px] text-slate-500">Community leaders + youth</p>
            </div>
            <div className="relative overflow-hidden rounded-xl bg-[#111827]/60 px-4 py-3 ring-1 ring-white/[0.06]">
              <div className="absolute inset-y-0 left-0 w-[3px] rounded-full bg-purple-500 opacity-60" />
              <p className="text-xs font-medium text-slate-500">Mental Health Screenings</p>
              <p className="mt-0.5 text-lg font-bold text-slate-200">{NEET_KPIS.mentalHealthScreened.toLocaleString()}</p>
              <p className="mt-0.5 text-[11px] text-slate-500">Voluntary at Youth Centres</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Section 5: Mental Health & Wellbeing (full width) ── */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.6 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-2">
          <Brain size={18} className="text-purple-400" />
          <h3 className="text-base font-heading font-semibold text-text-primary">
            Youth Mental Health Screening Results
          </h3>
        </div>
        <p className="text-xs text-text-muted mb-4">
          Based on {NEET_KPIS.mentalHealthScreened.toLocaleString()} voluntary screenings at Youth Resource Centres across {NEET_KPIS.districtsCovered} districts.
        </p>

        <ReactECharts
          option={mentalHealthChartOption}
          style={{ height: '300px', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />

        {/* AI early intervention tip */}
        <div className="mt-6 flex items-start gap-3 px-5 py-4 rounded-xl bg-purple-500/8 border border-purple-500/20">
          <Lightbulb size={18} className="text-purple-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-purple-300 mb-1">
              AI-Powered Early Intervention
            </p>
            <p className="text-xs text-text-secondary leading-relaxed">
              Youth flagged with high-risk indicators are automatically connected to counselling services within 48 hours. The system matches individuals with the nearest available counsellor based on region, language preference, and specific concern category. In Q4 2025, 94% of flagged youth received first contact within the target window.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
