import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { ToastContainer } from '../common/ToastContainer';
import { useApp } from '../../context/AppContext';
import { WifiOff, AlertTriangle, ShieldCheck } from 'lucide-react';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isOffline, toggleOfflineMode, currentRole } = useApp();

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#172B4D] flex flex-col font-sans">
      {/* Offline banner notification if active */}
      {isOffline && (
        <div className="bg-amber-600 text-white text-xs px-4 py-2 flex items-center justify-between font-medium z-50 sticky top-0 no-print">
          <div className="flex items-center gap-2 max-w-6xl mx-auto w-full">
            <WifiOff className="w-4 h-4 shrink-0 animate-pulse" />
            <span>
              <strong>Simulated Offline Mode Active:</strong> Network transactions are being stored in your local queue. Changes will sync when reconnected.
            </span>
            <button
              onClick={toggleOfflineMode}
              className="ml-auto underline hover:text-amber-100 text-xs shrink-0"
            >
              Resume Online
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar mobileOpen={mobileMenuOpen} onMobileClose={() => setMobileMenuOpen(false)} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 lg:pl-64">
          <Navbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>

          {/* Prototype Footer */}
          <footer className="border-t border-slate-200/80 bg-white/70 py-4 px-6 text-center text-xs text-slate-500 no-print">
            <div className="flex flex-wrap items-center justify-between gap-3 max-w-7xl mx-auto">
              <div className="flex items-center gap-2 text-left">
                <span className="w-2 h-2 rounded-full bg-[#159A9C]" />
                <span className="font-semibold text-[#17365D]">
                  National Child Health Tracking App (Prototype)
                </span>
                <span className="text-slate-400">|</span>
                <span>All records & health data are synthetically generated for demonstration.</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Connected Records. Timely Care. Healthier Futures.
              </div>
            </div>
          </footer>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};
