import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  UserCheck,
  Stethoscope,
  ShieldAlert,
  BarChart3,
  Users,
  Settings,
  Wifi,
  WifiOff,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Syringe,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { RoleId } from '../../types';

interface NavbarProps {
  onMobileMenuToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMobileMenuToggle }) => {
  const {
    currentRole,
    setCurrentRole,
    currentUser,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    unreadNotificationsCount,
    isOffline,
    toggleOfflineMode,
    syncQueue,
    syncNow,
    children,
    navigateTo,
    currentRoute,
  } = useApp();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setRoleDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const rolesList: { id: RoleId; label: string; icon: any; desc: string }[] = [
    { id: 'parent', label: 'Parent / Guardian', icon: Users, desc: 'Aarav & Ananya Sharma records' },
    { id: 'health_worker', label: 'Frontline Worker', icon: UserCheck, desc: 'Field registry, offline queue & visits' },
    { id: 'doctor', label: 'Primary Care Doctor', icon: Stethoscope, desc: 'Outpatient clinic & prescriptions' },
    { id: 'specialist', label: 'Pediatric Specialist', icon: Sparkles, desc: 'Consultations, echocardiograms & triage' },
    { id: 'public_health_admin', label: 'Public Health Admin', icon: BarChart3, desc: 'Surveillance & district analytics' },
    { id: 'system_admin', label: 'System Administrator', icon: ShieldAlert, desc: 'Security, audit trails & parameters' },
  ];

  // Search filter
  const filteredChildren = searchQuery.trim()
    ? children.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.uhid.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.guardianName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const getBreadcrumb = () => {
    if (currentRoute === '/' || currentRoute === '') return 'Home';
    if (currentRoute === '/demo-login') return 'Demo Access';
    if (currentRoute === '/dashboard') return 'Dashboard';
    if (currentRoute.startsWith('/child-profiles/')) return 'Child Health Record';
    if (currentRoute === '/child-profiles') return 'Child Directory';
    if (currentRoute === '/vaccinations') return 'Immunization Schedule';
    if (currentRoute === '/growth') return 'Growth & Development';
    if (currentRoute === '/appointments') return 'Appointments';
    if (currentRoute === '/referrals') return 'Referral Pipeline';
    if (currentRoute === '/notifications') return 'Notifications';
    if (currentRoute === '/ai-insights') return 'Responsible AI Insights';
    if (currentRoute === '/reports') return 'Public Health Analytics';
    if (currentRoute === '/system-admin') return 'System Administration';
    if (currentRoute === '/settings') return 'Settings & Preferences';
    return 'Dashboard';
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-2.5 transition-all no-print">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Mobile hamburger & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span
              onClick={() => navigateTo('/dashboard')}
              className="text-slate-500 hover:text-[#17365D] cursor-pointer transition font-medium"
            >
              Portal
            </span>
            <span className="text-slate-300">/</span>
            <span className="font-bold text-[#17365D]">{getBreadcrumb()}</span>
          </div>

          {/* Prototype Mode Pill */}
          <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EAF3FA] border border-[#c5daf0] text-[11px] font-semibold text-[#17365D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#159A9C] animate-pulse" />
            <span>Prototype Demo Data</span>
          </div>
        </div>

        {/* Center: Global Search */}
        <div className="flex-1 max-w-md relative" ref={searchRef}>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search child by name, UHID, or guardian..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:border-[#159A9C] focus:ring-2 focus:ring-[#159A9C]/20 transition"
            />
          </div>

          {/* Search Dropdown */}
          {searchOpen && searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 p-2 max-h-80 overflow-y-auto">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Matching Children ({filteredChildren.length})
              </div>
              {filteredChildren.length > 0 ? (
                filteredChildren.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                      navigateTo(`/child-profiles/${c.id}`);
                    }}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-[#EAF3FA] cursor-pointer transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={c.photoUrl} alt="" className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-bold text-[#172B4D]">{c.name}</p>
                        <p className="text-[10px] text-slate-500">{c.uhid} • Guardian: {c.guardianName}</p>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-600">
                      View Record
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-500">
                  No children found matching "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Actions: Offline Toggle (for HW), Role Switcher, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Offline Toggle for Health Worker or quick simulation */}
          {currentRole === 'health_worker' && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleOfflineMode}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition ${
                  isOffline
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
                title="Toggle simulated offline mode for field testing"
              >
                {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-600" /> : <Wifi className="w-3.5 h-3.5 text-emerald-600" />}
                <span className="hidden sm:inline">{isOffline ? 'Offline Mode' : 'Online'}</span>
              </button>
              {syncQueue.length > 0 && (
                <button
                  onClick={syncNow}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-semibold bg-[#159A9C] text-white hover:bg-[#118183] transition shadow-xs"
                  title="Flush pending offline queue"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="text-[11px]">{syncQueue.length} Queue</span>
                </button>
              )}
            </div>
          )}

          {/* Switch Role Dropdown */}
          <div className="relative" ref={roleRef}>
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-semibold text-[#172B4D] transition"
            >
              <span className="w-2 h-2 rounded-full bg-[#159A9C]" />
              <span className="hidden sm:inline max-w-[130px] truncate">{currentUser.roleTitle.split('(')[0]}</span>
              <span className="sm:hidden font-bold">{currentUser.role.slice(0, 3).toUpperCase()}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 p-2 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-[11px] font-bold uppercase text-slate-400">Switch Demo Role</p>
                  <p className="text-xs text-slate-500">Test different user perspectives with fictional data</p>
                </div>
                <div className="p-1 space-y-1">
                  {rolesList.map((r) => {
                    const IconComponent = r.icon;
                    const isSelected = currentRole === r.id;
                    return (
                      <button
                        key={r.id}
                        onClick={() => {
                          setCurrentRole(r.id);
                          setRoleDropdownOpen(false);
                          navigateTo('/dashboard');
                        }}
                        className={`w-full text-left flex items-start gap-2.5 p-2 rounded-xl text-xs transition ${
                          isSelected
                            ? 'bg-[#EAF3FA] text-[#17365D] font-bold border border-[#c0d6eb]'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? 'bg-[#159A9C] text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold leading-tight">{r.label}</p>
                          <p className="text-[10px] text-slate-500 truncate mt-0.5">{r.desc}</p>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#159A9C] shrink-0 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
              aria-label="Open notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C53D4B] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/70">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-[#172B4D]">Notifications</h4>
                    {unreadNotificationsCount > 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-[#C53D4B]/10 text-[#C53D4B] rounded-full">
                        {unreadNotificationsCount} unread
                      </span>
                    )}
                  </div>
                  {unreadNotificationsCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-[#159A9C] hover:underline font-semibold"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.linkPage) {
                          setNotificationsOpen(false);
                          navigateTo(n.linkPage);
                        }
                      }}
                      className={`p-3 text-xs hover:bg-[#EAF3FA]/50 cursor-pointer transition ${
                        !n.read ? 'bg-sky-50/40 font-medium' : 'text-slate-600'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-bold text-[#172B4D] leading-snug">{n.title}</p>
                        {!n.read && <span className="w-2 h-2 rounded-full bg-[#159A9C] shrink-0 mt-1" />}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">{n.message}</p>
                      <span className="text-[10px] text-slate-400 mt-1.5 block">{n.timestamp}</span>
                    </div>
                  ))}
                </div>

                <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
                  <button
                    onClick={() => {
                      setNotificationsOpen(false);
                      navigateTo('/notifications');
                    }}
                    className="text-xs text-[#159A9C] font-bold hover:underline"
                  >
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 rounded-xl hover:bg-slate-100 transition"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-[#159A9C]/30"
              />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 p-2 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-[#172B4D]">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                  <p className="text-[10px] text-[#159A9C] font-semibold mt-0.5">{currentUser.roleTitle}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigateTo('/settings');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-100 flex items-center gap-2 font-medium"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-500" />
                    <span>Settings & Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigateTo('/demo-login');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-100 flex items-center gap-2 font-medium"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                    <span>Switch Role / Logout</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigateTo('/');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-100 flex items-center gap-2 font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    <span>Return to Public Landing</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
