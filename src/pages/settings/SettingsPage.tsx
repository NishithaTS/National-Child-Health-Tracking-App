import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import {
  Settings,
  User,
  Sliders,
  Languages,
  Bell,
  Eye,
  ShieldCheck,
  Info,
  CheckCircle2,
  RefreshCw,
  Sun,
  Moon,
  Volume2,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const {
    currentUser,
    currentRole,
    themeMode,
    setThemeMode,
    layoutDensity,
    setLayoutDensity,
    preferredLanguage,
    setPreferredLanguage,
    highContrast,
    setHighContrast,
    resetAllDemoData,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'profile' | 'preferences' | 'language' | 'notifications' | 'accessibility' | 'privacy' | 'about'
  >('profile');

  // Form states
  const [profileName, setProfileName] = useState(currentUser.name);
  const [profilePhone, setProfilePhone] = useState(currentUser.phone || '+91 98450 12345');
  const [profileEmail, setProfileEmail] = useState(currentUser.email);

  // Notification toggles
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [reminderDays, setReminderDays] = useState('7');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Profile Information Saved', 'Local preferences updated successfully.', 'success');
  };

  const languagesList = [
    { code: 'en', name: 'English', native: 'English', available: true },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', available: false },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', available: false },
    { code: 'mr', name: 'Marathi', native: 'मराठी', available: false },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', available: false },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்', available: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#159A9C]">
            Application Governance
          </span>
          <Badge variant="teal" size="sm">System Settings</Badge>
        </div>
        <h2 className="text-2xl font-extrabold text-[#172B4D] mt-1">
          Settings & Local Configuration
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Customize display preferences, notification channels, accessibility toggles, and privacy parameters.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl p-1.5 border border-slate-200/80 shadow-xs flex overflow-x-auto gap-1">
        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'preferences', label: 'Preferences', icon: Sliders },
          { id: 'language', label: 'Language', icon: Languages },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'accessibility', label: 'Accessibility', icon: Eye },
          { id: 'privacy', label: 'Privacy & Data', icon: ShieldCheck },
          { id: 'about', label: 'About App', icon: Info },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? 'bg-[#17365D] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 max-w-2xl">
          <h3 className="text-base font-extrabold text-[#172B4D]">Demo User Profile</h3>
          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <img
                src={currentUser.avatar}
                alt=""
                className="w-16 h-16 rounded-full object-cover ring-2 ring-[#159A9C]"
              />
              <div>
                <p className="font-bold text-[#172B4D] text-sm">{currentUser.name}</p>
                <p className="text-slate-500">{currentUser.roleTitle}</p>
                <Badge variant="teal" size="sm" className="mt-1">
                  Active Simulation Role
                </Badge>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Display Name</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={profilePhone}
                onChange={(e) => setProfilePhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#159A9C] text-white font-bold hover:bg-[#118183] transition"
            >
              Save Profile Changes
            </button>
          </form>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 max-w-2xl text-xs">
          <h3 className="text-base font-extrabold text-[#172B4D]">Display & Layout Preferences</h3>

          <div className="space-y-4">
            <div>
              <label className="block font-bold text-slate-700 mb-2">Theme Mode</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setThemeMode('light');
                    addToast('Theme Preference Saved', 'Light theme selected', 'info');
                  }}
                  className={`p-3 rounded-2xl border flex items-center gap-3 transition ${
                    themeMode === 'light'
                      ? 'border-[#159A9C] bg-teal-50/50 text-[#172B4D] font-bold'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  <Sun className="w-5 h-5 text-amber-500" />
                  <span>Clinical Light (Recommended)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setThemeMode('dark');
                    addToast('Theme Preference Saved', 'Dark theme preference recorded', 'info');
                  }}
                  className={`p-3 rounded-2xl border flex items-center gap-3 transition ${
                    themeMode === 'dark'
                      ? 'border-[#159A9C] bg-teal-50/50 text-[#172B4D] font-bold'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  <Moon className="w-5 h-5 text-slate-700" />
                  <span>Night Shift Dark</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-2">Interface Density</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setLayoutDensity('comfortable');
                    addToast('Density Updated', 'Comfortable layout enabled', 'info');
                  }}
                  className={`p-3 rounded-2xl border transition ${
                    layoutDensity === 'comfortable'
                      ? 'border-[#159A9C] bg-teal-50/50 text-[#172B4D] font-bold'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  Comfortable Spacing
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLayoutDensity('compact');
                    addToast('Density Updated', 'Compact clinical table density enabled', 'info');
                  }}
                  className={`p-3 rounded-2xl border transition ${
                    layoutDensity === 'compact'
                      ? 'border-[#159A9C] bg-teal-50/50 text-[#172B4D] font-bold'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  Compact Clinical Density
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Language Tab */}
      {activeTab === 'language' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 max-w-2xl text-xs">
          <div>
            <h3 className="text-base font-extrabold text-[#172B4D]">Language & Regional Localization</h3>
            <p className="text-slate-500 mt-0.5">
              English is currently fully implemented. Regional languages are mapped for future phased localization.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {languagesList.map((lang) => {
              const isSelected = preferredLanguage === lang.name;
              return (
                <div
                  key={lang.code}
                  onClick={() => {
                    if (lang.available) {
                      setPreferredLanguage(lang.name);
                      addToast('Language Updated', `Active language set to ${lang.name}`, 'success');
                    } else {
                      addToast('Language Planned in Phase 2', `${lang.name} localization roadmap planned for statewide rollout`, 'info');
                    }
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                    isSelected
                      ? 'border-[#159A9C] bg-[#EAF3FA] text-[#17365D] font-bold'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <span className="font-bold text-sm block">{lang.name}</span>
                    <span className="text-slate-500 text-xs">{lang.native}</span>
                  </div>
                  {lang.available ? (
                    <Badge variant="teal" size="sm">Active</Badge>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-semibold">Planned Rollout</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 max-w-2xl text-xs">
          <h3 className="text-base font-extrabold text-[#172B4D]">Notification Channels & Lead Times</h3>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <strong className="text-slate-800 block">SMS Text Alerts for Immunizations</strong>
                <span className="text-slate-500 text-[11px]">Send reminder SMS to primary guardian 7 days before due doses</span>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 text-[#159A9C] rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <strong className="text-slate-800 block">Push Notifications</strong>
                <span className="text-slate-500 text-[11px]">Browser alerts for appointment schedule confirmations</span>
              </div>
              <input
                type="checkbox"
                checked={pushAlerts}
                onChange={(e) => setPushAlerts(e.target.checked)}
                className="w-4 h-4 text-[#159A9C] rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <strong className="text-slate-800 block">Email Monthly Digest</strong>
                <span className="text-slate-500 text-[11px]">Monthly growth curve and developmental progress summary</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-[#159A9C] rounded"
              />
            </label>
          </div>
        </div>
      )}

      {/* Accessibility Tab */}
      {activeTab === 'accessibility' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 max-w-2xl text-xs">
          <h3 className="text-base font-extrabold text-[#172B4D]">Accessibility & Visual Aids</h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <strong className="text-slate-800 block">High Contrast Mode</strong>
                <span className="text-slate-500 text-[11px]">Enhanced contrast borders and typography for readability</span>
              </div>
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => {
                  setHighContrast(e.target.checked);
                  addToast('Accessibility Updated', `High contrast ${e.target.checked ? 'enabled' : 'disabled'}`, 'info');
                }}
                className="w-4 h-4 text-[#159A9C] rounded"
              />
            </label>
          </div>
        </div>
      )}

      {/* Privacy Tab */}
      {activeTab === 'privacy' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4 max-w-2xl text-xs">
          <h3 className="text-base font-extrabold text-[#172B4D]">Data Privacy & Synthetic Records Guarantee</h3>
          <p className="text-slate-600 leading-relaxed">
            This prototype operates strictly in local frontend state. No private or real health data is collected or sent to external servers. All personal identifiers (names, UHIDs, addresses) are synthetic fictional demonstration data.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-800 block">Prototype Data Management</span>
            <p className="text-slate-500 text-[11px]">
              You can wipe local cache and restore the default dataset at any time.
            </p>
            <button
              onClick={resetAllDemoData}
              className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 font-bold transition flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset All Demo Data in Storage</span>
            </button>
          </div>
        </div>
      )}

      {/* About Tab */}
      {activeTab === 'about' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4 max-w-2xl text-xs">
          <h3 className="text-base font-extrabold text-[#172B4D]">About National Child Health Tracking App</h3>
          <p className="text-slate-600 leading-relaxed">
            <strong>Tagline:</strong> Connected Records. Timely Care. Healthier Futures.
          </p>
          <p className="text-slate-600 leading-relaxed">
            A proposed digital healthcare platform designed to track children's health from birth to 18 years. Built as an interactive frontend prototype demonstrating coordinated multi-role care delivery across parents, frontline health workers, primary pediatricians, specialists, and public health administrators.
          </p>
          <div className="p-3.5 rounded-2xl bg-[#EAF3FA] border border-[#c4dbf0] text-slate-700">
            <strong>Version:</strong> 2.4.0-prototype • React 19, TypeScript, Tailwind CSS, Recharts, Lucide Icons.
          </div>
        </div>
      )}
    </div>
  );
};
