import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

// ---------------------------------------------------------------------------
// Color system -- maps the `color` prop to Tailwind classes and raw hex values
// ---------------------------------------------------------------------------

const COLOR_MAP = {
  gold: {
    hex: "#F59E0B",
    hexLight: "#FCD34D",
    hexDark: "#D97706",
    iconBg: "from-amber-500/20 to-amber-600/10",
    iconText: "text-amber-400",
    glowRing: "shadow-amber-500/10",
    stripe: "from-amber-500 via-amber-400 to-amber-600",
    trendPositive: "text-emerald-400",
    trendNegative: "text-red-400",
    borderHover: "hover:border-amber-500/40",
  },
  green: {
    hex: "#10B981",
    hexLight: "#34D399",
    hexDark: "#059669",
    iconBg: "from-emerald-500/20 to-emerald-600/10",
    iconText: "text-emerald-400",
    glowRing: "shadow-emerald-500/10",
    stripe: "from-emerald-500 via-emerald-400 to-emerald-600",
    trendPositive: "text-emerald-400",
    trendNegative: "text-red-400",
    borderHover: "hover:border-emerald-500/40",
  },
  red: {
    hex: "#EF4444",
    hexLight: "#F87171",
    hexDark: "#DC2626",
    iconBg: "from-red-500/20 to-red-600/10",
    iconText: "text-red-400",
    glowRing: "shadow-red-500/10",
    stripe: "from-red-500 via-red-400 to-red-600",
    trendPositive: "text-emerald-400",
    trendNegative: "text-red-400",
    borderHover: "hover:border-red-500/40",
  },
  blue: {
    hex: "#3B82F6",
    hexLight: "#60A5FA",
    hexDark: "#2563EB",
    iconBg: "from-blue-500/20 to-blue-600/10",
    iconText: "text-blue-400",
    glowRing: "shadow-blue-500/10",
    stripe: "from-blue-500 via-blue-400 to-blue-600",
    trendPositive: "text-emerald-400",
    trendNegative: "text-red-400",
    borderHover: "hover:border-blue-500/40",
  },
  purple: {
    hex: "#8B5CF6",
    hexLight: "#A78BFA",
    hexDark: "#7C3AED",
    iconBg: "from-purple-500/20 to-purple-600/10",
    iconText: "text-purple-400",
    glowRing: "shadow-purple-500/10",
    stripe: "from-purple-500 via-purple-400 to-purple-600",
    trendPositive: "text-emerald-400",
    trendNegative: "text-red-400",
    borderHover: "hover:border-purple-500/40",
  },
} as const;

type ColorKey = keyof typeof COLOR_MAP;

// ---------------------------------------------------------------------------
// useAnimatedNumber -- counts from 0 to `target` with easeOutExpo easing
// ---------------------------------------------------------------------------

function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function formatNumber(value: number, decimals: number): string {
  const fixed = value.toFixed(decimals);
  const [intPart, decPart] = fixed.split(".");
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimals > 0 ? `${withCommas}.${decPart}` : withCommas;
}

export function useAnimatedNumber(
  target: number,
  duration: number = 1500,
  decimals: number = 0
): string {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const animate = useCallback(
    (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const value = easedProgress * target;

      setCurrent(value);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCurrent(target);
      }
    },
    [target, duration]
  );

  useEffect(() => {
    startTimeRef.current = null;
    setCurrent(0);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate]);

  return formatNumber(current, decimals);
}

// ---------------------------------------------------------------------------
// KPICard
// ---------------------------------------------------------------------------

interface KPICardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend?: number;
  trendLabel?: string;
  icon: React.ReactNode;
  color: ColorKey;
  delay?: number;
  decimals?: number;
}

export function KPICard({
  title,
  value,
  prefix = "",
  suffix = "",
  trend,
  trendLabel,
  icon,
  color,
  delay = 0,
  decimals = 0,
}: KPICardProps) {
  const palette = COLOR_MAP[color];
  const animatedValue = useAnimatedNumber(value, 1500, decimals);

  const isTrendPositive = trend !== undefined && trend >= 0;
  const trendColor = isTrendPositive
    ? palette.trendPositive
    : palette.trendNegative;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.025 }}
      className={[
        "relative overflow-hidden rounded-2xl",
        "bg-[#111827]/80 backdrop-blur-xl",
        "border border-white/[0.06]",
        palette.borderHover,
        "shadow-lg",
        palette.glowRing,
        "transition-all duration-300",
        "group",
      ].join(" ")}
    >
      {/* Gradient stripe at top */}
      <div
        className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${palette.stripe} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Subtle glow blob behind the icon */}
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-[0.07] blur-2xl transition-opacity duration-500 group-hover:opacity-[0.13]"
        style={{ backgroundColor: palette.hex }}
      />

      <div className="relative z-10 flex items-start gap-4 p-5">
        {/* Icon container */}
        <div
          className={[
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
            `bg-gradient-to-br ${palette.iconBg}`,
            "ring-1 ring-white/[0.06]",
          ].join(" ")}
        >
          <span className={palette.iconText}>{icon}</span>
        </div>

        {/* Text content */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-400">
            {title}
          </p>

          <p className="mt-1 text-3xl font-bold tracking-tight text-slate-100">
            {prefix}
            {animatedValue}
            {suffix && (
              <span className="ml-0.5 text-lg font-semibold text-slate-400">
                {suffix}
              </span>
            )}
          </p>

          {/* Trend indicator */}
          {trend !== undefined && (
            <div className="mt-2 flex items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${trendColor} bg-white/[0.04]`}
              >
                {isTrendPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {isTrendPositive ? "+" : ""}
                {trend.toFixed(1)}%
              </span>

              {trendLabel && (
                <span className="text-xs text-slate-500">{trendLabel}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// MiniStatCard -- compact variant for secondary metrics
// ---------------------------------------------------------------------------

interface MiniStatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  color?: string;
}

export function MiniStatCard({
  label,
  value,
  sublabel,
  color = "#94A3B8",
}: MiniStatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-[#111827]/60 px-4 py-3 ring-1 ring-white/[0.06] transition-colors duration-200 hover:bg-[#111827]/80">
      {/* Left accent bar */}
      <div
        className="absolute inset-y-0 left-0 w-[3px] rounded-full"
        style={{ backgroundColor: color, opacity: 0.6 }}
      />

      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-0.5 text-lg font-bold text-slate-200">
        {typeof value === "number" ? formatNumber(value, 0) : value}
      </p>
      {sublabel && (
        <p className="mt-0.5 text-[11px] text-slate-500">{sublabel}</p>
      )}
    </div>
  );
}
