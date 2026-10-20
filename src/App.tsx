import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingPage } from './pages/LandingPage';
import { RoleSelectionPage } from './pages/RoleSelectionPage';
import { DashboardLayout } from './components/layout/DashboardLayout';

import { ParentDashboard } from './pages/parent/ParentDashboard';
import { HealthWorkerDashboard } from './pages/health-worker/HealthWorkerDashboard';
import { DoctorDashboard } from './pages/doctor/DoctorDashboard';
import { SpecialistDashboard } from './pages/specialist/SpecialistDashboard';
import { PublicHealthDashboard } from './pages/admin/PublicHealthDashboard';
import { SystemAdminDashboard } from './pages/admin/SystemAdminDashboard';

import { ChildProfilesPage } from './pages/child-profiles/ChildProfilesPage';
import { ChildHealthRecordPage } from './pages/child-profiles/ChildHealthRecordPage';
import { VaccinationsPage } from './pages/vaccinations/VaccinationsPage';
import { GrowthDevelopmentPage } from './pages/growth/GrowthDevelopmentPage';
import { AppointmentsPage } from './pages/appointments/AppointmentsPage';
import { ReferralsPage } from './pages/referrals/ReferralsPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { ResponsibleAiInsightsPage } from './pages/ai-insights/ResponsibleAiInsightsPage';
import { SettingsPage } from './pages/settings/SettingsPage';

const AppContent: React.FC = () => {
  const { currentRoute, currentRole } = useApp();

  // Public Landing Page
  if (currentRoute === '/' || currentRoute === '') {
    return <LandingPage />;
  }

  // Demo Login / Role Selection Screen
  if (currentRoute === '/demo-login') {
    return <RoleSelectionPage />;
  }

  // Helper to render role-specific dashboard for /dashboard
  const renderRoleDashboard = () => {
    switch (currentRole) {
      case 'parent':
        return <ParentDashboard />;
      case 'health_worker':
        return <HealthWorkerDashboard />;
      case 'doctor':
        return <DoctorDashboard />;
      case 'specialist':
        return <SpecialistDashboard />;
      case 'public_health_admin':
        return <PublicHealthDashboard />;
      case 'system_admin':
        return <SystemAdminDashboard />;
      default:
        return <ParentDashboard />;
    }
  };

  // Internal Portal Routes (wrapped inside DashboardLayout)
  const renderCurrentView = () => {
    if (currentRoute === '/dashboard') {
      return renderRoleDashboard();
    }
    if (currentRoute.startsWith('/child-profiles/')) {
      return <ChildHealthRecordPage />;
    }
    if (currentRoute === '/child-profiles') {
      return <ChildProfilesPage />;
    }
    if (currentRoute === '/vaccinations') {
      return <VaccinationsPage />;
    }
    if (currentRoute === '/growth') {
      return <GrowthDevelopmentPage />;
    }
    if (currentRoute === '/appointments') {
      return <AppointmentsPage />;
    }
    if (currentRoute === '/referrals') {
      return <ReferralsPage />;
    }
    if (currentRoute === '/notifications') {
      return <NotificationsPage />;
    }
    if (currentRoute === '/ai-insights') {
      return <ResponsibleAiInsightsPage />;
    }
    if (currentRoute === '/reports') {
      return <PublicHealthDashboard />;
    }
    if (currentRoute === '/system-admin') {
      return <SystemAdminDashboard />;
    }
    if (currentRoute === '/settings') {
      return <SettingsPage />;
    }

    // Default fallback
    return renderRoleDashboard();
  };

  return <DashboardLayout>{renderCurrentView()}</DashboardLayout>;
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
