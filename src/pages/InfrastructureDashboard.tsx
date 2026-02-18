import { useMemo } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import {
  Building2,
  AlertTriangle,
  Wallet,
  TrendingUp,
  Check,
  X,
  CreditCard,
  Landmark,
  Phone,
  CircleDollarSign,
  PieChart,
  BarChart3,
} from 'lucide-react';

import {
  OVERVIEW_KPIS,
  FACILITIES,
  FUND_ALLOCATIONS,
  FUND_BY_REGION,
  ATHLETE_PAYMENTS,
} from '../data/mock-data';
import { KPICard, MiniStatCard } from '../components/KPICard';

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
// Status helpers
// ────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  good: {
    label: 'Good',
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-400',
    border: 'border-emerald-500/20',
    barColor: 'bg-emerald-500',
    leftBorder: 'border-l-emerald-500',
    hex: '#10B981',
    sortOrder: 3,
  },
  fair: {
    label: 'Fair',
    bg: 'bg-amber-500/15',
    text: 'text-amber-400',
    border: 'border-amber-500/20',
    barColor: 'bg-amber-500',
    leftBorder: 'border-l-amber-500',
    hex: '#F59E0B',
    sortOrder: 2,
  },
  needs_repair: {
    label: 'Needs Repair',
    bg: 'bg-orange-500/15',
    text: 'text-orange-400',
    border: 'border-orange-500/20',
    barColor: 'bg-orange-500',
    leftBorder: 'border-l-orange-500',
    hex: '#F97316',
    sortOrder: 1,
  },
  critical: {
    label: 'Critical',
    bg: 'bg-red-500/15',
    text: 'text-red-400',
    border: 'border-red-500/20',
    barColor: 'bg-red-500',
    leftBorder: 'border-l-red-500',
    hex: '#EF4444',
    sortOrder: 0,
  },
} as const;

type FacilityStatus = keyof typeof STATUS_CONFIG;

const PAYMENT_STATUS_CONFIG = {
  paid: {
    label: 'Paid',
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-400',
    border: 'border-emerald-500/20',
  },
  processing: {
    label: 'Processing',
    bg: 'bg-blue-500/15',
    text: 'text-blue-400',
    border: 'border-blue-500/20',
  },
  pending: {
    label: 'Pending',
    bg: 'bg-amber-500/15',
    text: 'text-amber-400',
    border: 'border-amber-500/20',
  },
  approved: {
    label: 'Approved',
    bg: 'bg-purple-500/15',
    text: 'text-purple-400',
    border: 'border-purple-500/20',
  },
} as const;

type PaymentStatus = keyof typeof PAYMENT_STATUS_CONFIG;

function getPaymentMethodIcon(method: string) {
  if (method.includes('MTN')) return { icon: Phone, color: 'text-yellow-400' };
  if (method.includes('Vodafone')) return { icon: Phone, color: 'text-red-400' };
  if (method.includes('AirtelTigo')) return { icon: Phone, color: 'text-blue-400' };
  return { icon: Landmark, color: 'text-slate-400' };
}

// ============================================================
// InfrastructureDashboard page
// ============================================================

export default function InfrastructureDashboard() {
  // ── Sorted facilities (critical first) ──
  const sortedFacilities = useMemo(
    () =>
      [...FACILITIES].sort(
        (a, b) =>
          STATUS_CONFIG[a.status as FacilityStatus].sortOrder -
          STATUS_CONFIG[b.status as FacilityStatus].sortOrder
      ),
    []
  );

  // ── Facility status counts ──
  const statusCounts = useMemo(() => {
    const counts = { good: 0, fair: 0, needs_repair: 0, critical: 0 };
    FACILITIES.forEach((f) => {
      counts[f.status as FacilityStatus]++;
    });
    return counts;
  }, []);

  // ── Facility health by region ──
  const facilityHealthByRegion = useMemo(() => {
    const regionMap = new Map<string, { scores: number[]; region: string }>();
    FACILITIES.forEach((f) => {
      if (!regionMap.has(f.region)) {
        regionMap.set(f.region, { scores: [], region: f.region });
      }
      regionMap.get(f.region)!.scores.push(f.overallScore);
    });

    const entries = Array.from(regionMap.values()).map((entry) => ({
      region: entry.region,
      avgScore:
        entry.scores.reduce((sum, s) => sum + s, 0) / entry.scores.length,
    }));

    return entries.sort((a, b) => a.avgScore - b.avgScore);
  }, []);

  // ── Payment summaries ──
  const paymentSummary = useMemo(() => {
    const pendingApproved = ATHLETE_PAYMENTS.filter(
      (p) => p.status === 'pending' || p.status === 'approved'
    );
    const processing = ATHLETE_PAYMENTS.filter(
      (p) => p.status === 'processing'
    );
    const paid = ATHLETE_PAYMENTS.filter((p) => p.status === 'paid');

    return {
      pendingCount: pendingApproved.length,
      processingSum: processing.reduce((sum, p) => sum + p.amountGHS, 0),
      paidSum: paid.reduce((sum, p) => sum + p.amountGHS, 0),
    };
  }, []);

  // ── Fund summary ──
  const fundRemaining =
    FUND_ALLOCATIONS.totalBudgetGHS - FUND_ALLOCATIONS.disbursedGHS;
  const fundUtilization =
    (FUND_ALLOCATIONS.disbursedGHS / FUND_ALLOCATIONS.totalBudgetGHS) * 100;

  // ────────────────────────────────────────────────────────
  // Chart 1: Facility Status Donut
  // ────────────────────────────────────────────────────────

  const facilityDonutOption = useMemo(() => {
    const totalFacilities = FACILITIES.length;
    const data = [
      { name: 'Good', value: statusCounts.good, color: '#10B981' },
      { name: 'Fair', value: statusCounts.fair, color: '#F59E0B' },
      { name: 'Needs Repair', value: statusCounts.needs_repair, color: '#F97316' },
      { name: 'Critical', value: statusCounts.critical, color: '#EF4444' },
    ];

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item' as const,
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          return `<div style="font-weight:600;margin-bottom:4px">${params.name}</div>
            <div>Count: <b>${params.value}</b></div>
            <div>Share: <b>${params.percent.toFixed(1)}%</b></div>`;
        },
      },
      legend: {
        orient: 'vertical' as const,
        right: 16,
        top: 'middle' as const,
        textStyle: { color: '#94A3B8', fontSize: 12 },
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 14,
        formatter: (name: string) => {
          const entry = data.find((d) => d.name === name);
          return entry ? `${name}  (${entry.value})` : name;
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '76%'],
          center: ['35%', '50%'],
          avoidLabelOverlap: true,
          label: { show: false },
          emphasis: {
            label: { show: false },
            scaleSize: 6,
          },
          labelLine: { show: false },
          data: data.map((d) => ({
            name: d.name,
            value: d.value,
            itemStyle: { color: d.color },
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
              `{total|${totalFacilities}}`,
              '{sub|Facilities}',
            ].join('\n'),
            rich: {
              total: {
                fontSize: 28,
                fontWeight: 700,
                color: '#E2E8F0',
                lineHeight: 34,
              },
              sub: {
                fontSize: 12,
                color: '#64748B',
                lineHeight: 20,
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
  }, [statusCounts]);

  // ────────────────────────────────────────────────────────
  // Chart 2: Facility Health by Region (horizontal bar)
  // ────────────────────────────────────────────────────────

  const facilityHealthBarOption = useMemo(() => {
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis' as const,
        axisPointer: { type: 'shadow' as const },
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          const p = params[0];
          const score = (p.value * 100).toFixed(0);
          return `<div style="font-weight:600;margin-bottom:4px">${p.name}</div>
            <div>Health Score: <b>${score}%</b></div>`;
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
        min: 0,
        max: 1,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#1E293B', opacity: 0.6 } },
        axisLabel: {
          color: '#64748B',
          fontSize: 11,
          formatter: (val: number) => `${(val * 100).toFixed(0)}%`,
        },
      },
      yAxis: {
        type: 'category' as const,
        data: facilityHealthByRegion.map((r) => r.region),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: '#94A3B8',
          fontSize: 11,
          width: 120,
          overflow: 'truncate' as const,
        },
      },
      series: [
        {
          type: 'bar',
          data: facilityHealthByRegion.map((r) => ({
            value: r.avgScore,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color:
                      r.avgScore < 0.35
                        ? '#EF4444'
                        : r.avgScore < 0.5
                          ? '#F97316'
                          : r.avgScore < 0.65
                            ? '#F59E0B'
                            : '#10B981',
                  },
                  {
                    offset: 1,
                    color:
                      r.avgScore < 0.35
                        ? '#F87171'
                        : r.avgScore < 0.5
                          ? '#FB923C'
                          : r.avgScore < 0.65
                            ? '#FCD34D'
                            : '#34D399',
                  },
                ],
              },
              borderRadius: [0, 4, 4, 0],
            },
          })),
          barWidth: '55%',
          label: {
            show: true,
            position: 'right' as const,
            formatter: (params: any) => `${(params.value * 100).toFixed(0)}%`,
            color: '#94A3B8',
            fontSize: 11,
            fontWeight: 600,
          },
        },
      ],
      animationDuration: 1200,
      animationEasing: 'cubicOut',
    };
  }, [facilityHealthByRegion]);

  // ────────────────────────────────────────────────────────
  // Chart 3: Fund Allocation Pie
  // ────────────────────────────────────────────────────────

  const fundAllocationPieOption = useMemo(() => {
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item' as const,
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          const alloc = FUND_ALLOCATIONS.allocations.find(
            (a) => a.category === params.name
          );
          if (!alloc) return params.name;
          return `<div style="font-weight:600;margin-bottom:4px">${params.name}</div>
            <div>Allocated: <b>${formatCurrency(alloc.amountGHS)}</b></div>
            <div>Disbursed: <b>${formatCurrency(alloc.disbursedGHS)}</b></div>
            <div>Share: <b>${params.percent.toFixed(1)}%</b></div>`;
        },
      },
      legend: {
        orient: 'horizontal' as const,
        bottom: 0,
        left: 'center' as const,
        textStyle: { color: '#94A3B8', fontSize: 11 },
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 12,
        formatter: (name: string) => {
          if (name.length > 22) return name.slice(0, 22) + '...';
          return name;
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['44%', '72%'],
          center: ['50%', '42%'],
          avoidLabelOverlap: true,
          label: { show: false },
          emphasis: {
            label: { show: false },
            scaleSize: 6,
          },
          labelLine: { show: false },
          data: FUND_ALLOCATIONS.allocations.map((a) => ({
            name: a.category,
            value: a.amountGHS,
            itemStyle: { color: a.color },
          })),
        },
      ],
      animationDuration: 1200,
      animationEasing: 'cubicOut',
    };
  }, []);

  // ────────────────────────────────────────────────────────
  // Chart 4: Regional Fund Utilization (grouped bar + line)
  // ────────────────────────────────────────────────────────

  const regionalFundOption = useMemo(() => {
    const sorted = [...FUND_BY_REGION].sort(
      (a, b) => a.utilizationRate - b.utilizationRate
    );

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis' as const,
        axisPointer: { type: 'shadow' as const },
        ...TOOLTIP_STYLE,
        formatter: (params: any) => {
          let result = `<div style="font-weight:600;margin-bottom:6px">${params[0].axisValue}</div>`;
          params.forEach((p: any) => {
            const value =
              p.seriesName === 'Utilization Rate'
                ? `${p.value.toFixed(1)}%`
                : formatCurrency(p.value);
            result += `<div style="display:flex;align-items:center;gap:6px;margin:3px 0">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color}"></span>
              <span style="flex:1">${p.seriesName}</span>
              <span style="font-weight:600">${value}</span>
            </div>`;
          });
          return result;
        },
      },
      legend: {
        data: ['Allocated', 'Disbursed', 'Utilization Rate'],
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
        right: 40,
        bottom: 8,
        containLabel: true,
      },
      xAxis: {
        type: 'category' as const,
        data: sorted.map((r) => r.region),
        axisLine: { lineStyle: { color: '#1E293B' } },
        axisTick: { show: false },
        axisLabel: {
          color: '#64748B',
          fontSize: 10,
          rotate: 40,
          interval: 0,
        },
      },
      yAxis: [
        {
          type: 'value' as const,
          name: 'Amount (GHS)',
          nameTextStyle: { color: '#64748B', fontSize: 10 },
          splitLine: { lineStyle: { color: '#1E293B', opacity: 0.6 } },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            color: '#64748B',
            fontSize: 11,
            formatter: (val: number) => {
              if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(0)}M`;
              if (val >= 1_000) return `${(val / 1_000).toFixed(0)}K`;
              return val.toString();
            },
          },
        },
        {
          type: 'value' as const,
          name: 'Utilization %',
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
          name: 'Allocated',
          type: 'bar',
          data: sorted.map((r) => r.allocated),
          barWidth: '28%',
          barGap: '10%',
          itemStyle: {
            color: 'rgba(245,158,11,0.25)',
            borderColor: '#F59E0B',
            borderWidth: 1.5,
            borderRadius: [4, 4, 0, 0],
          },
        },
        {
          name: 'Disbursed',
          type: 'bar',
          data: sorted.map((r) => r.disbursed),
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
                { offset: 1, color: 'rgba(16,185,129,0.2)' },
              ],
            },
            borderRadius: [4, 4, 0, 0],
          },
        },
        {
          name: 'Utilization Rate',
          type: 'line',
          yAxisIndex: 1,
          data: sorted.map((r) => r.utilizationRate),
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          showSymbol: true,
          lineStyle: { width: 2.5, color: '#8B5CF6' },
          itemStyle: { color: '#8B5CF6' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(139,92,246,0.15)' },
                { offset: 1, color: 'rgba(139,92,246,0.02)' },
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
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-primary">
          Sports Infrastructure & Funding
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Monitoring 342 facilities &bull; Managing GH&#8373;200M Sports Fund
        </p>
      </motion.div>

      {/* ── KPI Cards Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Facilities Monitored"
          value={OVERVIEW_KPIS.totalFacilities}
          icon={<Building2 size={22} />}
          color="blue"
          delay={0}
        />
        <KPICard
          title="Critical Condition"
          value={OVERVIEW_KPIS.facilitiesCritical}
          icon={<AlertTriangle size={22} />}
          color="red"
          trend={-3}
          trendLabel="fewer than last quarter"
          delay={0.08}
        />
        <KPICard
          title="Sports Fund Budget"
          value={200}
          prefix="GH&#8373;"
          suffix="M"
          icon={<Wallet size={22} />}
          color="gold"
          delay={0.16}
        />
        <KPICard
          title="Fund Utilization"
          value={OVERVIEW_KPIS.sportsFundUtilization}
          suffix="%"
          icon={<TrendingUp size={22} />}
          color="green"
          delay={0.24}
          decimals={1}
        />
      </div>

      {/* ── Section 1: Facility Status Overview ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Facility Status Donut */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <PieChart size={18} className="text-ghana-gold" />
            <h3 className="text-base font-heading font-semibold text-text-primary">
              Facility Status Summary
            </h3>
          </div>
          <ReactECharts
            option={facilityDonutOption}
            style={{ height: '340px', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </motion.div>

        {/* Right: Facility Health by Region */}
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
              Facility Health by Region
            </h3>
          </div>
          <p className="text-xs text-text-muted mb-3">
            Average condition score per region. Sorted worst-first.
          </p>
          <ReactECharts
            option={facilityHealthBarOption}
            style={{ height: '310px', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </motion.div>
      </div>

      {/* ── Section 2: Facility Condition Tracker ── */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-5">
          <Building2 size={18} className="text-ghana-gold" />
          <h3 className="text-base font-heading font-semibold text-text-primary">
            Facility Condition Tracker
          </h3>
          <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-blue-500/15 text-blue-400 text-[11px] font-bold border border-blue-500/20">
            {FACILITIES.length}
          </span>
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Facility
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Region
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Condition
                  </th>
                  <th className="text-right px-4 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Capacity
                  </th>
                  <th className="text-center px-4 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Year
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Sports
                  </th>
                  <th className="text-center px-4 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Lights
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Last Inspection
                  </th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Repair Cost
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sortedFacilities.map((facility, idx) => {
                  const statusConf =
                    STATUS_CONFIG[facility.status as FacilityStatus];
                  const conditionPercent = Math.round(
                    facility.overallScore * 100
                  );

                  return (
                    <motion.tr
                      key={facility.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.45 + idx * 0.03,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="hover:bg-surface-tertiary/40 transition-colors duration-150 group"
                    >
                      <td className="px-5 py-3.5">
                        <span className="font-semibold text-text-primary group-hover:text-ghana-gold transition-colors">
                          {facility.name}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-surface-tertiary/80 text-text-muted border border-border">
                          {facility.type}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div>
                          <span className="text-text-secondary text-sm">
                            {facility.region}
                          </span>
                          <p className="text-[11px] text-text-muted">
                            {facility.district}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${statusConf.bg} ${statusConf.text} border ${statusConf.border} ${facility.status === 'critical' ? 'animate-pulse' : ''}`}
                        >
                          {statusConf.label}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2 min-w-[120px]">
                          <div className="flex-1 h-2 rounded-full bg-surface-tertiary/60 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${statusConf.barColor} stat-bar-fill`}
                              style={{
                                width: `${conditionPercent}%`,
                              }}
                            />
                          </div>
                          <span
                            className={`text-xs font-semibold ${statusConf.text} w-8 text-right`}
                          >
                            {conditionPercent}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-right text-text-secondary">
                        {formatNumber(facility.capacity)}
                      </td>
                      <td className="px-4 py-3.5 text-center text-text-muted">
                        {facility.yearBuilt}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {facility.sports.map((sport) => (
                            <span
                              key={sport}
                              className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-surface-tertiary/60 text-text-muted"
                            >
                              {sport}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        {facility.hasFloodlights ? (
                          <Check
                            size={16}
                            className="inline-block text-emerald-400"
                          />
                        ) : (
                          <X
                            size={16}
                            className="inline-block text-slate-600"
                          />
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-text-muted text-sm">
                        {facility.lastInspection}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {facility.status !== 'good' ? (
                          <span className="text-sm font-semibold text-red-400">
                            {formatCurrency(facility.estimatedRepairCostGHS)}
                          </span>
                        ) : (
                          <span className="text-sm text-text-muted">--</span>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sortedFacilities.map((facility, idx) => {
            const statusConf =
              STATUS_CONFIG[facility.status as FacilityStatus];
            const conditionPercent = Math.round(facility.overallScore * 100);

            return (
              <motion.div
                key={facility.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.45 + idx * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`glass-card p-4 border-l-[3px] ${statusConf.leftBorder}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-semibold text-text-primary leading-tight">
                    {facility.name}
                  </h4>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0 ${statusConf.bg} ${statusConf.text} border ${statusConf.border} ${facility.status === 'critical' ? 'animate-pulse' : ''}`}
                  >
                    {statusConf.label}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-surface-tertiary/80 text-text-muted border border-border">
                    {facility.type}
                  </span>
                  <span className="text-xs text-text-muted">
                    {facility.region}
                  </span>
                </div>

                {/* Condition bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-text-muted">
                      Condition Score
                    </span>
                    <span
                      className={`text-[11px] font-semibold ${statusConf.text}`}
                    >
                      {conditionPercent}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-surface-tertiary/60 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${statusConf.barColor} stat-bar-fill`}
                      style={{ width: `${conditionPercent}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs mb-3">
                  <div>
                    <span className="text-text-muted">Capacity:</span>{' '}
                    <span className="text-text-secondary font-medium">
                      {formatNumber(facility.capacity)}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-muted">Year Built:</span>{' '}
                    <span className="text-text-secondary font-medium">
                      {facility.yearBuilt}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-muted">Floodlights:</span>{' '}
                    {facility.hasFloodlights ? (
                      <span className="text-emerald-400 font-medium">Yes</span>
                    ) : (
                      <span className="text-slate-500 font-medium">No</span>
                    )}
                  </div>
                  <div>
                    <span className="text-text-muted">Inspected:</span>{' '}
                    <span className="text-text-secondary font-medium">
                      {facility.lastInspection}
                    </span>
                  </div>
                </div>

                {/* Sports supported */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {facility.sports.map((sport) => (
                    <span
                      key={sport}
                      className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-surface-tertiary/60 text-text-muted"
                    >
                      {sport}
                    </span>
                  ))}
                </div>

                {facility.status !== 'good' && (
                  <div className="pt-2 border-t border-border">
                    <span className="text-[11px] text-text-muted">
                      Est. Repair Cost:{' '}
                    </span>
                    <span className="text-sm font-semibold text-red-400">
                      {formatCurrency(facility.estimatedRepairCostGHS)}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Section 3: Ghana Sports Fund ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Fund Allocation Pie Chart */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <PieChart size={18} className="text-ghana-gold" />
            <h3 className="text-base font-heading font-semibold text-text-primary">
              Fund Allocation Breakdown
            </h3>
          </div>
          <ReactECharts
            option={fundAllocationPieOption}
            style={{ height: '380px', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </motion.div>

        {/* Right: Fund Statistics */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.55 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <CircleDollarSign size={18} className="text-ghana-gold" />
            <h3 className="text-base font-heading font-semibold text-text-primary">
              Sports Fund Statistics
            </h3>
          </div>

          {/* Top-level fund cards */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <MiniStatCard
              label="Total Budget"
              value={formatCurrency(FUND_ALLOCATIONS.totalBudgetGHS)}
              color="#F59E0B"
            />
            <MiniStatCard
              label="Disbursed"
              value={formatCurrency(FUND_ALLOCATIONS.disbursedGHS)}
              color="#10B981"
            />
            <MiniStatCard
              label="Remaining"
              value={formatCurrency(fundRemaining)}
              color="#3B82F6"
            />
          </div>

          {/* Utilization progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-text-secondary">
                Overall Utilization
              </span>
              <span className="text-sm font-bold text-emerald-400">
                {fundUtilization.toFixed(1)}%
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-surface-tertiary/60 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 stat-bar-fill"
                style={{ width: `${fundUtilization}%` }}
              />
            </div>
          </div>

          {/* Category breakdown cards */}
          <div className="space-y-3">
            {FUND_ALLOCATIONS.allocations.map((alloc, idx) => {
              const utilRate =
                (alloc.disbursedGHS / alloc.amountGHS) * 100;
              return (
                <motion.div
                  key={alloc.category}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.6 + idx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative overflow-hidden rounded-xl bg-surface-tertiary/40 px-4 py-3 ring-1 ring-white/[0.06] hover:bg-surface-tertiary/60 transition-colors duration-200"
                >
                  {/* Left accent */}
                  <div
                    className="absolute inset-y-0 left-0 w-[3px] rounded-full"
                    style={{
                      backgroundColor: alloc.color,
                      opacity: 0.7,
                    }}
                  />

                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-text-secondary truncate pr-2">
                      {alloc.category}
                    </span>
                    <span className="text-[11px] font-semibold text-text-muted flex-shrink-0">
                      {alloc.percentOfTotal}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-text-muted">
                      Allocated:{' '}
                      <span className="font-semibold text-text-secondary">
                        {formatCurrency(alloc.amountGHS)}
                      </span>
                    </span>
                    <span className="text-xs text-text-muted">
                      Disbursed:{' '}
                      <span className="font-semibold text-emerald-400">
                        {formatCurrency(alloc.disbursedGHS)}
                      </span>
                    </span>
                  </div>

                  <div className="h-1.5 w-full rounded-full bg-surface-tertiary/60 overflow-hidden">
                    <div
                      className="h-full rounded-full stat-bar-fill"
                      style={{
                        width: `${utilRate}%`,
                        backgroundColor: alloc.color,
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ── Section 4: Regional Fund Utilization ── */}
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
            Regional Fund Utilization
          </h3>
        </div>
        <p className="text-xs text-text-muted mb-3">
          Allocated vs disbursed amounts by region with utilization rate
          overlay. Sorted by utilization rate.
        </p>
        <ReactECharts
          option={regionalFundOption}
          style={{ height: '400px', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </motion.div>

      {/* ── Section 5: Athlete Payment Tracker ── */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.65 }}
      >
        <div className="flex items-center gap-2 mb-5">
          <CreditCard size={18} className="text-ghana-gold" />
          <h3 className="text-base font-heading font-semibold text-text-primary">
            Athlete Payment Tracker
          </h3>
        </div>

        {/* Payment summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <MiniStatCard
              label="Pending / Approved"
              value={`${paymentSummary.pendingCount} payments`}
              sublabel="Awaiting processing"
              color="#F59E0B"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.75 }}
          >
            <MiniStatCard
              label="Currently Processing"
              value={formatCurrency(paymentSummary.processingSum)}
              sublabel="In transit"
              color="#3B82F6"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <MiniStatCard
              label="Disbursed This Month"
              value={formatCurrency(paymentSummary.paidSum)}
              sublabel="Successfully paid"
              color="#10B981"
            />
          </motion.div>
        </div>

        {/* Desktop payment table */}
        <div className="hidden md:block glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Athlete
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Payment Type
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Competition
                  </th>
                  <th className="text-right px-4 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-center px-4 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Method
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ATHLETE_PAYMENTS.map((payment, idx) => {
                  const statusConf =
                    PAYMENT_STATUS_CONFIG[
                      payment.status as PaymentStatus
                    ];
                  const methodInfo = getPaymentMethodIcon(
                    payment.paymentMethod
                  );
                  const MethodIcon = methodInfo.icon;

                  return (
                    <motion.tr
                      key={payment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.75 + idx * 0.03,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="hover:bg-surface-tertiary/40 transition-colors duration-150"
                    >
                      <td className="px-5 py-3.5 font-medium text-text-primary">
                        {payment.athleteName}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-surface-tertiary/80 text-text-secondary border border-border">
                          {payment.type}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-text-secondary text-sm max-w-[220px] truncate">
                        {payment.competitionName}
                      </td>
                      <td className="px-4 py-3.5 text-right font-semibold text-text-primary">
                        GH&#8373;{formatNumber(payment.amountGHS)}
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${statusConf.bg} ${statusConf.text} border ${statusConf.border}`}
                        >
                          {statusConf.label}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <MethodIcon
                            size={14}
                            className={methodInfo.color}
                          />
                          <span className="text-xs text-text-muted">
                            {payment.paymentMethod}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-text-muted text-sm">
                        {payment.date}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile payment cards */}
        <div className="md:hidden grid grid-cols-1 gap-3">
          {ATHLETE_PAYMENTS.map((payment, idx) => {
            const statusConf =
              PAYMENT_STATUS_CONFIG[payment.status as PaymentStatus];
            const methodInfo = getPaymentMethodIcon(payment.paymentMethod);
            const MethodIcon = methodInfo.icon;

            return (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 0.75 + idx * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass-card p-4"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="text-sm font-semibold text-text-primary">
                      {payment.athleteName}
                    </h4>
                    <p className="text-xs text-text-muted mt-0.5">
                      {payment.type}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0 ${statusConf.bg} ${statusConf.text} border ${statusConf.border}`}
                  >
                    {statusConf.label}
                  </span>
                </div>

                <p className="text-xs text-text-muted mb-3 truncate">
                  {payment.competitionName}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-text-primary">
                    GH&#8373;{formatNumber(payment.amountGHS)}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <div className="flex items-center gap-1">
                      <MethodIcon size={12} className={methodInfo.color} />
                      <span>{payment.paymentMethod}</span>
                    </div>
                    <span>&bull;</span>
                    <span>{payment.date}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
