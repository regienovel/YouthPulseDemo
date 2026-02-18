import { useState, useEffect, useCallback } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  Building2,
  Star,
  MessageSquare,
  Bell,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  ChevronDown,
  Shield,
} from 'lucide-react';
import { REGIONS } from '../data/mock-data';

// ────────────────────────────────────────────────────────────
// Navigation configuration
// ────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'OVERVIEW',
    items: [
      {
        label: 'National Overview',
        path: '/',
        icon: <LayoutDashboard size={20} />,
      },
    ],
  },
  {
    title: 'MODULES',
    items: [
      {
        label: 'Employment Intelligence',
        path: '/employment',
        icon: <Briefcase size={20} />,
      },
      {
        label: 'Sports Infrastructure',
        path: '/infrastructure',
        icon: <Building2 size={20} />,
      },
      {
        label: 'Talent Discovery',
        path: '/talent',
        icon: <Star size={20} />,
      },
    ],
  },
  {
    title: 'AI & ANALYTICS',
    items: [
      {
        label: 'Ask AI',
        path: '/ask-ai',
        icon: <MessageSquare size={20} />,
      },
    ],
  },
];

// ────────────────────────────────────────────────────────────
// Route-to-title mapping
// ────────────────────────────────────────────────────────────

const ROUTE_TITLES: Record<string, string> = {
  '/': 'National Overview',
  '/employment': 'Employment Intelligence',
  '/infrastructure': 'Sports Infrastructure',
  '/talent': 'Talent Discovery',
  '/ask-ai': 'Ask AI',
};

function getPageTitle(pathname: string): string {
  return ROUTE_TITLES[pathname] || 'YouthPulse Ghana';
}

// ────────────────────────────────────────────────────────────
// Sidebar component
// ────────────────────────────────────────────────────────────

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onNavClick?: () => void;
}

function Sidebar({ collapsed, onToggleCollapse, onNavClick }: SidebarProps) {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full relative">
      {/* Gold gradient right-edge line */}
      <div
        className="absolute top-0 right-0 w-[1px] h-full pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(245,158,11,0.3) 20%, rgba(245,158,11,0.15) 80%, transparent 100%)',
        }}
      />

      {/* Header */}
      <div className={`flex items-center gap-3 px-5 py-6 border-b border-border ${collapsed ? 'justify-center px-3' : ''}`}>
        <span className="text-2xl flex-shrink-0" role="img" aria-label="Ghana flag">
          {'\u{1F1EC}\u{1F1ED}'}
        </span>
        {!collapsed && (
          <div className="min-w-0">
            <h1 className="text-lg font-heading font-bold text-text-primary leading-tight truncate">
              YouthPulse
            </h1>
            <p className="text-xs text-text-muted leading-tight truncate">
              Ghana Intelligence
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-semibold tracking-[0.15em] uppercase text-text-muted">
                {section.title}
              </p>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onNavClick}
                      title={collapsed ? item.label : undefined}
                      className={`
                        group relative flex items-center gap-3 rounded-xl
                        transition-all duration-200 ease-out
                        ${collapsed ? 'justify-center px-3 py-3' : 'px-3 py-2.5'}
                        ${
                          isActive
                            ? 'bg-ghana-gold/10 text-ghana-gold'
                            : 'text-text-secondary hover:text-text-primary hover:bg-surface-tertiary/60'
                        }
                      `}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-ghana-gold"
                          transition={{
                            type: 'spring',
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}

                      <span
                        className={`flex-shrink-0 transition-colors duration-200 ${
                          isActive
                            ? 'text-ghana-gold'
                            : 'text-text-muted group-hover:text-text-primary'
                        }`}
                      >
                        {item.icon}
                      </span>
                      {!collapsed && (
                        <span className="text-sm font-medium truncate">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-border p-3 space-y-3">
        {/* Powered by badge */}
        {!collapsed && (
          <div className="px-3 py-3 rounded-xl bg-surface-tertiary/40">
            <div className="flex items-center gap-2 mb-1">
              <Shield size={14} className="text-ghana-gold flex-shrink-0" />
              <span className="text-[11px] font-medium text-text-secondary">
                Powered by Open Source AI
              </span>
            </div>
            <p className="text-[10px] text-text-muted pl-[22px]">
              AGPL-3.0 Licensed
            </p>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center py-2" title="Powered by Open Source AI — AGPL-3.0 Licensed">
            <Shield size={16} className="text-ghana-gold" />
          </div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="
            w-full flex items-center justify-center gap-2 py-2 rounded-lg
            text-text-muted hover:text-text-primary hover:bg-surface-tertiary/60
            transition-all duration-200
          "
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && (
            <span className="text-xs font-medium">Collapse</span>
          )}
        </button>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// TopBar component
// ────────────────────────────────────────────────────────────

interface TopBarProps {
  onMenuClick: () => void;
  pageTitle: string;
}

function TopBar({ onMenuClick, pageTitle }: TopBarProps) {
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('All Regions');

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!regionDropdownOpen) return;
    const handleClick = () => setRegionDropdownOpen(false);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [regionDropdownOpen]);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 md:px-6 h-16 bg-surface-primary/80 backdrop-blur-xl border-b border-border">
      {/* Left side */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-tertiary transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <h2 className="text-lg font-heading font-semibold text-text-primary truncate">
          {pageTitle}
        </h2>

        {/* Live Demo badge */}
        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-medium text-emerald-400">
            Live Demo
          </span>
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Region filter */}
        <div className="relative hidden lg:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setRegionDropdownOpen((prev) => !prev);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-tertiary/60 border border-border hover:border-border-light transition-colors text-sm"
          >
            <MapPin size={14} className="text-ghana-gold flex-shrink-0" />
            <span className="text-text-secondary max-w-[140px] truncate">
              {selectedRegion}
            </span>
            <ChevronDown
              size={14}
              className={`text-text-muted transition-transform duration-200 ${
                regionDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {regionDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-1 w-56 max-h-80 overflow-y-auto rounded-xl bg-surface-secondary border border-border shadow-xl shadow-black/30 z-50"
              >
                <div className="p-1">
                  <button
                    onClick={() => {
                      setSelectedRegion('All Regions');
                      setRegionDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedRegion === 'All Regions'
                        ? 'bg-ghana-gold/10 text-ghana-gold'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-tertiary/60'
                    }`}
                  >
                    All Regions
                  </button>
                  {REGIONS.map((region) => (
                    <button
                      key={region.code}
                      onClick={() => {
                        setSelectedRegion(region.name);
                        setRegionDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedRegion === region.name
                          ? 'bg-ghana-gold/10 text-ghana-gold'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-tertiary/60'
                      }`}
                    >
                      {region.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Time period */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-tertiary/60 border border-border text-sm">
          <Calendar size={14} className="text-ghana-gold flex-shrink-0" />
          <span className="text-text-secondary">Feb 2026</span>
        </div>

        {/* Notification bell */}
        <button
          className="relative flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-tertiary transition-colors"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-ghana-red text-[10px] font-bold text-white">
            12
          </span>
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2 pl-2 md:pl-3 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ghana-gold to-ghana-gold-dark flex items-center justify-center text-xs font-bold text-surface-primary">
            MY
          </div>
          <span className="hidden md:block text-sm font-medium text-text-secondary">
            MoYS
          </span>
        </div>
      </div>
    </header>
  );
}

// ────────────────────────────────────────────────────────────
// Mobile sidebar overlay
// ────────────────────────────────────────────────────────────

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          {/* Sidebar panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-[280px] bg-surface-primary md:hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-tertiary transition-colors z-10"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>

            <Sidebar
              collapsed={false}
              onToggleCollapse={() => {}}
              onNavClick={onClose}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ────────────────────────────────────────────────────────────
// Main Layout component
// ────────────────────────────────────────────────────────────

export default function Layout() {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pageTitle = getPageTitle(location.pathname);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleCollapse = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  const openMobileMenu = useCallback(() => {
    setMobileMenuOpen(true);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-surface-primary">
      {/* Desktop sidebar */}
      <aside
        className={`
          hidden md:flex flex-col flex-shrink-0 bg-surface-primary border-r border-border
          transition-[width] duration-300 ease-in-out overflow-hidden
          ${sidebarCollapsed ? 'w-[72px]' : 'w-[280px]'}
        `}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleCollapse}
        />
      </aside>

      {/* Mobile sidebar overlay */}
      <MobileSidebar isOpen={mobileMenuOpen} onClose={closeMobileMenu} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onMenuClick={openMobileMenu} pageTitle={pageTitle} />

        <main className="flex-1 overflow-y-auto bg-grid">
          <div className="p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
