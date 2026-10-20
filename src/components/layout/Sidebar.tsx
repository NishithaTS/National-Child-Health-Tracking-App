import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  FileHeart,
  Syringe,
  TrendingUp,
  CalendarDays,
  GitBranch,
  Bell,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  ExternalLink,
  X,
  Lock,
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onMobileClose }) => {
  const {
    currentRoute,
    navigateTo,
    currentRole,
    currentUser,
    unreadNotificationsCount,
    aiInsights,
    selectedChildId,
  } = useApp();

  const [collapsed, setCollapsed] = useState(false);

  // Active unread alerts for AI insights
  const pendingAiCount = aiInsights.filter((a) => a.status === 'pending-review').length;

  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      path: '/dashboard',
      icon: LayoutDashboard,
      roles: ['parent', 'health_worker', 'doctor', 'specialist', 'public_health_admin', 'system_admin'],
    },
    {
      id: 'children',
      label: 'Child Profiles',
      path: '/child-profiles',
      icon: Users,
      roles: ['health_worker', 'doctor', 'specialist', 'public_health_admin', 'system_admin'],
    },
    {
      id: 'health-record',
      label: currentRole === 'parent' ? "Child's Health Record" : 'Clinical Records',
      path: `/child-profiles/${selectedChildId || 'child-01'}`,
      icon: FileHeart,
      roles: ['parent', 'health_worker', 'doctor', 'specialist'],
    },
    {
      id: 'vaccinations',
      label: 'Vaccinations',
      path: '/vaccinations',
      icon: Syringe,
      roles: ['parent', 'health_worker', 'doctor', 'specialist', 'public_health_admin'],
    },
    {
      id: 'growth',
      label: 'Growth & Development',
      path: '/growth',
      icon: TrendingUp,
      roles: ['parent', 'health_worker', 'doctor', 'specialist', 'public_health_admin'],
    },
    {
      id: 'appointments',
      label: 'Appointments',
      path: '/appointments',
      icon: CalendarDays,
      roles: ['parent', 'health_worker', 'doctor', 'specialist', 'system_admin'],
    },
    {
      id: 'referrals',
      label: 'Referrals',
      path: '/referrals',
      icon: GitBranch,
      roles: ['doctor', 'specialist', 'health_worker', 'public_health_admin'],
    },
    {
      id: 'ai-insights',
      label: 'Responsible AI Insights',
      path: '/ai-insights',
      icon: Sparkles,
      badge: pendingAiCount > 0 ? pendingAiCount : undefined,
      badgeColor: 'bg-amber-500 text-white',
      roles: ['doctor', 'specialist', 'health_worker', 'public_health_admin', 'system_admin'],
    },
    {
      id: 'reports',
      label: 'Public Health Analytics',
      path: '/reports',
      icon: BarChart3,
      roles: ['public_health_admin', 'system_admin', 'doctor'],
    },
    {
      id: 'system-admin',
      label: 'System Governance',
      path: '/system-admin',
      icon: ShieldCheck,
      roles: ['system_admin'],
    },
    {
      id: 'notifications',
      label: 'Notifications',
      path: '/notifications',
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined,
      badgeColor: 'bg-[#C53D4B] text-white',
      roles: ['parent', 'health_worker', 'doctor', 'specialist', 'public_health_admin', 'system_admin'],
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/settings',
      icon: Settings,
      roles: ['parent', 'health_worker', 'doctor', 'specialist', 'public_health_admin', 'system_admin'],
    },
  ];

  // Filter items visible to current role
  const visibleItems = navItems.filter((item) => item.roles.includes(currentRole));

  const isItemActive = (path: string) => {
    if (path === '/dashboard' && (currentRoute === '/dashboard' || currentRoute === '')) return true;
    if (path.startsWith('/child-profiles/') && currentRoute.startsWith('/child-profiles/')) return true;
    if (path === '/child-profiles' && currentRoute === '/child-profiles') return true;
    return currentRoute === path;
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-[#17365D] text-white transition-all duration-300 ease-in-out no-print ${
          collapsed ? 'w-20' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} shadow-2xl lg:shadow-none`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 h-16">
          <div
            onClick={() => {
              navigateTo('/dashboard');
              onMobileClose();
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#159A9C] to-[#20b2b5] flex items-center justify-center text-white shadow-md shadow-teal-900/30 shrink-0 group-hover:scale-105 transition">
              <HeartHandshake className="w-5 h-5" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <span className="font-extrabold text-sm tracking-tight leading-tight block text-white">
                  NCHT Platform
                </span>
                <span className="text-[10px] text-teal-300 font-medium block truncate tracking-wide">
                  Child Health Registry
                </span>
              </div>
            )}
          </div>

          {/* Close for mobile, collapse toggle for desktop */}
          <button
            onClick={onMobileClose}
            className="lg:hidden p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Current Role Banner */}
        {!collapsed && (
          <div className="mx-3 my-2.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 block">
                Active Perspective
              </span>
              <span className="text-xs font-semibold text-white truncate block">
                {currentUser.roleTitle.split('(')[0]}
              </span>
            </div>
            <button
              onClick={() => {
                navigateTo('/demo-login');
                onMobileClose();
              }}
              className="text-[10px] px-2 py-1 rounded-md bg-[#159A9C] text-white hover:bg-[#118183] transition font-bold"
              title="Change user role"
            >
              Switch
            </button>
          </div>
        )}

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.path);

            return (
              <button
                key={item.id}
                onClick={() => {
                  navigateTo(item.path);
                  onMobileClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group relative ${
                  active
                    ? 'bg-[#159A9C] text-white shadow-md shadow-teal-900/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition ${
                    active ? 'text-white' : 'text-slate-400 group-hover:text-white'
                  }`}
                />
                {!collapsed && <span className="flex-1 text-left truncate">{item.label}</span>}

                {/* Badge if exists */}
                {item.badge !== undefined && (
                  <span
                    className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      item.badgeColor || 'bg-slate-700 text-white'
                    } ${collapsed ? 'absolute top-1 right-1' : ''}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info: Public landing link & Prototype tag */}
        <div className="p-3 border-t border-white/10 space-y-2">
          {!collapsed ? (
            <>
              <button
                onClick={() => {
                  navigateTo('/');
                  onMobileClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium transition"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-teal-300" />
                  <span>Public Landing Page</span>
                </span>
                <span className="text-[10px] text-slate-400">Exit</span>
              </button>
              <div className="px-2 py-1 text-[10px] text-slate-400 leading-tight text-center">
                Proposed Healthcare Innovation
                <span className="block text-teal-300/80 font-mono mt-0.5">Prototype v2.4</span>
              </div>
            </>
          ) : (
            <button
              onClick={() => {
                navigateTo('/');
                onMobileClose();
              }}
              className="w-full flex items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/10 text-teal-300"
              title="Return to Landing Page"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
