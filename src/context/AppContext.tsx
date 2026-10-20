import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  RoleId,
  DemoUser,
  Child,
  VaccinationRecord,
  GrowthMeasurement,
  MilestoneRecord,
  Appointment,
  Referral,
  ClinicalVisit,
  Allergy,
  Medication,
  NotificationItem,
  ResponsibleAiInsight,
  AuditLog,
  Facility,
  SyncQueueItem,
  ReferralStatus,
  VaccineAdminStatus,
  AppointmentStatus,
} from '../types';
import {
  DEMO_USERS,
  FACILITIES,
  INITIAL_CHILDREN,
  INITIAL_VACCINATIONS,
  INITIAL_GROWTH_MEASUREMENTS,
  INITIAL_MILESTONES,
  INITIAL_APPOINTMENTS,
  INITIAL_REFERRALS,
  INITIAL_VISITS,
  INITIAL_ALLERGIES,
  INITIAL_MEDICATIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AI_INSIGHTS,
  INITIAL_AUDIT_LOGS,
} from '../data/mockData';

export interface Toast {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Role & User
  currentRole: RoleId;
  setCurrentRole: (role: RoleId) => void;
  currentUser: DemoUser;

  // Active child context (for parent / doctor view)
  selectedChildId: string;
  setSelectedChildId: (id: string) => void;
  selectedChild: Child | undefined;

  // Data
  children: Child[];
  addChild: (childData: Omit<Child, 'id' | 'registrationDate'>) => Child;
  updateChild: (id: string, updates: Partial<Child>) => void;

  vaccinations: VaccinationRecord[];
  addVaccination: (vac: Omit<VaccinationRecord, 'id'>) => void;
  updateVaccinationStatus: (
    id: string,
    status: VaccineAdminStatus,
    extra?: { administeredDate?: string; batchNumber?: string; facility?: string; notes?: string; administeredBy?: string }
  ) => void;

  growthMeasurements: GrowthMeasurement[];
  addGrowthMeasurement: (measurement: Omit<GrowthMeasurement, 'id' | 'bmi' | 'percentiles'>) => void;

  milestones: MilestoneRecord[];
  updateMilestoneStatus: (id: string, status: any, notes?: string) => void;

  appointments: Appointment[];
  bookAppointment: (apt: Omit<Appointment, 'id' | 'status'>) => void;
  updateAppointmentStatus: (id: string, status: AppointmentStatus, notes?: string) => void;
  rescheduleAppointment: (id: string, newDate: string, newTime: string) => void;

  referrals: Referral[];
  createReferral: (ref: Omit<Referral, 'id' | 'createdDate' | 'timeline' | 'status'>) => void;
  updateReferralStatus: (id: string, status: ReferralStatus, note?: string) => void;

  visits: ClinicalVisit[];
  addVisit: (visit: Omit<ClinicalVisit, 'id'>) => void;

  allergies: Allergy[];
  addAllergy: (allergy: Omit<Allergy, 'id'>) => void;

  medications: Medication[];
  addMedication: (medication: Omit<Medication, 'id'>) => void;

  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationsCount: number;

  aiInsights: ResponsibleAiInsight[];
  reviewAiInsight: (id: string, notes?: string) => void;
  dismissAiInsight: (id: string) => void;

  auditLogs: AuditLog[];
  addAuditLog: (action: string, resource: string, details: string) => void;

  facilities: Facility[];

  // Offline Simulation for Health Worker
  isOffline: boolean;
  toggleOfflineMode: () => void;
  syncQueue: SyncQueueItem[];
  addToSyncQueue: (actionType: SyncQueueItem['actionType'], childName: string, payload: any) => void;
  syncNow: () => void;

  // Toasts
  toasts: Toast[];
  addToast: (title: string, message?: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;

  // Search & Navigation
  globalSearch: string;
  setGlobalSearch: (q: string) => void;
  currentRoute: string;
  navigateTo: (route: string) => void;

  // Settings
  themeMode: 'light' | 'dark';
  setThemeMode: (mode: 'light' | 'dark') => void;
  layoutDensity: 'comfortable' | 'compact';
  setLayoutDensity: (density: 'comfortable' | 'compact') => void;
  preferredLanguage: string;
  setPreferredLanguage: (lang: string) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  resetAllDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error loading ${key} from localStorage`, e);
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children: childComponents }) => {
  // Navigation Route from hash
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const hash = window.location.hash.replace(/^#/, '');
    return hash || '/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      setCurrentRoute(hash || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: string) => {
    window.location.hash = route;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Role & User
  const [currentRole, setRoleState] = useState<RoleId>(() => {
    return loadFromStorage<RoleId>('ncht_role', 'parent');
  });

  const setCurrentRole = (newRole: RoleId) => {
    setRoleState(newRole);
    saveToStorage('ncht_role', newRole);
    addAuditLog(
      'ROLE_SWITCH',
      'Session',
      `Switched active simulation role to ${DEMO_USERS[newRole]?.roleTitle || newRole}`
    );
  };

  const currentUser = DEMO_USERS[currentRole] || DEMO_USERS.parent;

  // Active Child
  const [selectedChildId, setSelectedChildId] = useState<string>(() => {
    return loadFromStorage<string>('ncht_selected_child', 'child-01');
  });

  useEffect(() => {
    saveToStorage('ncht_selected_child', selectedChildId);
  }, [selectedChildId]);

  // Core Data States
  const [children, setChildren] = useState<Child[]>(() =>
    loadFromStorage('ncht_children', INITIAL_CHILDREN)
  );
  useEffect(() => saveToStorage('ncht_children', children), [children]);

  const [vaccinations, setVaccinations] = useState<VaccinationRecord[]>(() =>
    loadFromStorage('ncht_vaccinations', INITIAL_VACCINATIONS)
  );
  useEffect(() => saveToStorage('ncht_vaccinations', vaccinations), [vaccinations]);

  const [growthMeasurements, setGrowthMeasurements] = useState<GrowthMeasurement[]>(() =>
    loadFromStorage('ncht_growth', INITIAL_GROWTH_MEASUREMENTS)
  );
  useEffect(() => saveToStorage('ncht_growth', growthMeasurements), [growthMeasurements]);

  const [milestones, setMilestones] = useState<MilestoneRecord[]>(() =>
    loadFromStorage('ncht_milestones', INITIAL_MILESTONES)
  );
  useEffect(() => saveToStorage('ncht_milestones', milestones), [milestones]);

  const [appointments, setAppointments] = useState<Appointment[]>(() =>
    loadFromStorage('ncht_appointments', INITIAL_APPOINTMENTS)
  );
  useEffect(() => saveToStorage('ncht_appointments', appointments), [appointments]);

  const [referrals, setReferrals] = useState<Referral[]>(() =>
    loadFromStorage('ncht_referrals', INITIAL_REFERRALS)
  );
  useEffect(() => saveToStorage('ncht_referrals', referrals), [referrals]);

  const [visits, setVisits] = useState<ClinicalVisit[]>(() =>
    loadFromStorage('ncht_visits', INITIAL_VISITS)
  );
  useEffect(() => saveToStorage('ncht_visits', visits), [visits]);

  const [allergies, setAllergies] = useState<Allergy[]>(() =>
    loadFromStorage('ncht_allergies', INITIAL_ALLERGIES)
  );
  useEffect(() => saveToStorage('ncht_allergies', allergies), [allergies]);

  const [medications, setMedications] = useState<Medication[]>(() =>
    loadFromStorage('ncht_medications', INITIAL_MEDICATIONS)
  );
  useEffect(() => saveToStorage('ncht_medications', medications), [medications]);

  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    loadFromStorage('ncht_notifications', INITIAL_NOTIFICATIONS)
  );
  useEffect(() => saveToStorage('ncht_notifications', notifications), [notifications]);

  const [aiInsights, setAiInsights] = useState<ResponsibleAiInsight[]>(() =>
    loadFromStorage('ncht_ai_insights', INITIAL_AI_INSIGHTS)
  );
  useEffect(() => saveToStorage('ncht_ai_insights', aiInsights), [aiInsights]);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() =>
    loadFromStorage('ncht_audit_logs', INITIAL_AUDIT_LOGS)
  );
  useEffect(() => saveToStorage('ncht_audit_logs', auditLogs), [auditLogs]);

  const facilities = FACILITIES;

  // Offline Simulation
  const [isOffline, setIsOffline] = useState<boolean>(() =>
    loadFromStorage('ncht_is_offline', false)
  );
  const [syncQueue, setSyncQueue] = useState<SyncQueueItem[]>(() =>
    loadFromStorage('ncht_sync_queue', [
      {
        id: 'sync-01',
        timestamp: '2026-10-20 07:15',
        actionType: 'Record Visit',
        childName: 'Aarav Sharma',
        payload: { summary: 'Routine field weight verification (92.4 cm, 13.8 kg)' },
        status: 'pending',
      },
    ])
  );
  useEffect(() => saveToStorage('ncht_is_offline', isOffline), [isOffline]);
  useEffect(() => saveToStorage('ncht_sync_queue', syncQueue), [syncQueue]);

  const toggleOfflineMode = () => {
    setIsOffline((prev) => {
      const next = !prev;
      addToast(
        next ? 'Offline Simulation Mode Active' : 'Online Mode Restored',
        next
          ? 'Network requests simulated as paused. New field records will queue locally.'
          : 'Reconnected to simulated cloud infrastructure.',
        next ? 'warning' : 'success'
      );
      return next;
    });
  };

  const addToSyncQueue = (
    actionType: SyncQueueItem['actionType'],
    childName: string,
    payload: any
  ) => {
    const newItem: SyncQueueItem = {
      id: `sync-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      actionType,
      childName,
      payload,
      status: 'pending',
    };
    setSyncQueue((prev) => [newItem, ...prev]);
    addToast(
      'Saved to Offline Sync Queue',
      `Simulated ${actionType} recorded locally for ${childName}. Will sync when online.`,
      'info'
    );
  };

  const syncNow = () => {
    if (syncQueue.length === 0) {
      addToast('Sync Queue Empty', 'All records are already up-to-date.', 'info');
      return;
    }
    const count = syncQueue.length;
    setSyncQueue([]);
    addAuditLog(
      'QUEUE_SYNC',
      'Sync Dispatcher',
      `Synchronized ${count} pending offline records from frontline field device.`
    );
    addToast(
      'Synchronization Successful',
      `Transferred ${count} pending field records to simulated central health registry.`,
      'success'
    );
  };

  // Toast System
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (title: string, message?: string, type: Toast['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Audit Log helper
  const addAuditLog = (action: string, resource: string, details: string) => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      userRole: currentUser.roleTitle,
      userName: currentUser.name,
      action,
      resource,
      details,
      ipSimulation: '192.168.1.100 (Simulated Gateway)',
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  // Children Actions
  const addChild = (childData: Omit<Child, 'id' | 'registrationDate'>): Child => {
    const id = `child-${Date.now()}`;
    const newChild: Child = {
      ...childData,
      id,
      registrationDate: new Date().toISOString().split('T')[0],
    };
    setChildren((prev) => [newChild, ...prev]);
    addAuditLog('CHILD_REGISTER', 'Child Directory', `Registered new child ${newChild.name} (UHID: ${newChild.uhid})`);
    addToast('Child Profile Registered', `${newChild.name} successfully added to central directory.`, 'success');
    return newChild;
  };

  const updateChild = (id: string, updates: Partial<Child>) => {
    setChildren((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    addToast('Profile Updated', 'Child health record details saved.', 'info');
  };

  // Vaccination Actions
  const addVaccination = (vac: Omit<VaccinationRecord, 'id'>) => {
    const id = `vac-${Date.now()}`;
    const newVac: VaccinationRecord = { ...vac, id };
    setVaccinations((prev) => [newVac, ...prev]);
    addToast('Vaccination Scheduled', `${vac.vaccineName} scheduled for ${vac.dueDate}`, 'success');
  };

  const updateVaccinationStatus = (
    id: string,
    status: VaccineAdminStatus,
    extra?: { administeredDate?: string; batchNumber?: string; facility?: string; notes?: string; administeredBy?: string }
  ) => {
    setVaccinations((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          const updated: VaccinationRecord = {
            ...v,
            status,
            administeredDate: extra?.administeredDate || (status === 'completed' ? new Date().toISOString().split('T')[0] : v.administeredDate),
            batchNumber: extra?.batchNumber || v.batchNumber || 'BAT-2026-X99',
            administeredBy: extra?.administeredBy || (extra?.administeredDate ? currentUser.name : v.administeredBy || currentUser.name),
            facility: extra?.facility || v.facility || currentUser.facility || 'Primary Health Centre',
            notes: extra?.notes || v.notes,
          };
          return updated;
        }
        return v;
      })
    );
    addAuditLog(
      'VACCINE_RECORD_UPDATE',
      'Immunization Registry',
      `Vaccine record ${id} status updated to ${status}`
    );
    addToast('Vaccination Updated', `Record marked as ${status}.`, 'success');
  };

  // Growth Measurements
  const addGrowthMeasurement = (
    measurement: Omit<GrowthMeasurement, 'id' | 'bmi' | 'percentiles'>
  ) => {
    const heightInM = measurement.heightCm / 100;
    const bmi = parseFloat((measurement.weightKg / (heightInM * heightInM)).toFixed(1));
    const id = `gm-${Date.now()}`;

    // Synthetic illustrative percentiles based on typical healthy curves
    const heightForAge = Math.min(95, Math.max(10, Math.round(50 + (measurement.heightCm - 80) * 0.8)));
    const weightForAge = Math.min(95, Math.max(10, Math.round(50 + (measurement.weightKg - 11) * 2)));
    const bmiForAge = Math.min(95, Math.max(10, Math.round(50 + (bmi - 16) * 5)));

    const newMeasurement: GrowthMeasurement = {
      ...measurement,
      id,
      bmi,
      percentiles: {
        heightForAge,
        weightForAge,
        bmiForAge,
        headCircumferenceForAge: measurement.headCircumferenceCm ? 52 : undefined,
      },
    };

    setGrowthMeasurements((prev) => [...prev, newMeasurement]);
    addAuditLog(
      'GROWTH_RECORD_ADD',
      'Growth & Nutrition',
      `Added measurement: ${measurement.heightCm} cm, ${measurement.weightKg} kg (BMI: ${bmi})`
    );
    addToast('Growth Measurement Saved', `Recorded ${measurement.heightCm} cm and ${measurement.weightKg} kg.`, 'success');
  };

  // Milestones
  const updateMilestoneStatus = (id: string, status: any, notes?: string) => {
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              status,
              achievedDate: status === 'achieved' ? new Date().toISOString().split('T')[0] : m.achievedDate,
              notes: notes || m.notes,
            }
          : m
      )
    );
    addToast('Milestone Updated', `Status marked as ${status}.`, 'info');
  };

  // Appointments
  const bookAppointment = (apt: Omit<Appointment, 'id' | 'status'>) => {
    const id = `apt-${Date.now()}`;
    const newApt: Appointment = {
      ...apt,
      id,
      status: 'scheduled',
    };
    setAppointments((prev) => [newApt, ...prev]);
    addAuditLog(
      'APPOINTMENT_BOOKED',
      'Appointments',
      `Booked ${apt.appointmentType} for ${apt.childName} on ${apt.date} at ${apt.time}`
    );
    addToast(
      'Appointment Booked (Demo)',
      `${apt.appointmentType} scheduled for ${apt.childName} on ${apt.date}.`,
      'success'
    );
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus, notes?: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status, notes: notes || a.notes } : a))
    );
    addToast('Appointment Status Updated', `Appointment is now marked as ${status}.`, 'info');
  };

  const rescheduleAppointment = (id: string, newDate: string, newTime: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, date: newDate, time: newTime, status: 'scheduled' } : a))
    );
    addToast('Appointment Rescheduled', `Updated to ${newDate} at ${newTime}.`, 'info');
  };

  // Referrals
  const createReferral = (ref: Omit<Referral, 'id' | 'createdDate' | 'timeline' | 'status'>) => {
    const id = `ref-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];
    const newRef: Referral = {
      ...ref,
      id,
      createdDate: today,
      status: 'submitted',
      timeline: [
        {
          status: 'draft',
          label: 'Referral Initiated',
          date: today,
          actor: currentUser.name,
        },
        {
          status: 'submitted',
          label: 'Submitted for Specialist Review',
          date: today,
          actor: currentUser.name,
          note: ref.reason,
        },
      ],
    };
    setReferrals((prev) => [newRef, ...prev]);
    addAuditLog('REFERRAL_CREATED', 'Referral Network', `Referral initiated for ${ref.childName} -> ${ref.destinationSpecialist}`);
    addToast('Referral Submitted', `Case forwarded to ${ref.specialistType}.`, 'success');
  };

  const updateReferralStatus = (id: string, status: ReferralStatus, note?: string) => {
    const today = new Date().toISOString().split('T')[0];
    setReferrals((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const newStep = {
            status,
            label: status
              .split('-')
              .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
              .join(' '),
            date: today,
            actor: currentUser.name,
            note,
          };
          return {
            ...r,
            status,
            specialistNotes: note ? `${r.specialistNotes ? r.specialistNotes + '\n' : ''}${note}` : r.specialistNotes,
            timeline: [...r.timeline, newStep],
          };
        }
        return r;
      })
    );
    addAuditLog('REFERRAL_STATUS_CHANGE', 'Referrals', `Referral ${id} moved to status: ${status}`);
    addToast('Referral Pipeline Updated', `Status changed to ${status.replace('-', ' ')}.`, 'success');
  };

  // Clinical Visits
  const addVisit = (visit: Omit<ClinicalVisit, 'id'>) => {
    const id = `vis-${Date.now()}`;
    const newVisit: ClinicalVisit = { ...visit, id };
    setVisits((prev) => [newVisit, ...prev]);
    addAuditLog('VISIT_NOTE_FILED', 'Clinical Encounters', `Visit notes saved for child ${visit.childId} by ${visit.clinicianName}`);
    addToast('Clinical Encounter Logged', 'Visit summary and prescriptions added to timeline.', 'success');
  };

  // Allergies
  const addAllergy = (allergy: Omit<Allergy, 'id'>) => {
    const id = `alg-${Date.now()}`;
    setAllergies((prev) => [...prev, { ...allergy, id }]);
    addToast('Allergy Recorded', `Added ${allergy.allergen} (${allergy.severity}).`, 'warning');
  };

  // Medications
  const addMedication = (med: Omit<Medication, 'id'>) => {
    const id = `med-${Date.now()}`;
    setMedications((prev) => [...prev, { ...med, id }]);
    addToast('Medication Prescribed', `${med.name} added to active therapy list.`, 'success');
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('All Notifications Marked as Read', undefined, 'info');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // AI Insights
  const reviewAiInsight = (id: string, notes?: string) => {
    setAiInsights((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'reviewed',
              reviewNotes: notes || `Reviewed and confirmed by ${currentUser.name}`,
            }
          : item
      )
    );
    addAuditLog('AI_INSIGHT_REVIEWED', 'Responsible AI', `Clinician acknowledged insight ${id}`);
    addToast('Insight Acknowledged', 'Recorded clinical review on this item.', 'success');
  };

  const dismissAiInsight = (id: string) => {
    setAiInsights((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'dismissed' } : item))
    );
    addToast('Insight Dismissed', 'Item cleared from active alerts queue.', 'info');
  };

  // Global Search
  const [globalSearch, setGlobalSearch] = useState('');

  // Settings
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() =>
    loadFromStorage('ncht_theme', 'light')
  );
  useEffect(() => saveToStorage('ncht_theme', themeMode), [themeMode]);

  const [layoutDensity, setLayoutDensity] = useState<'comfortable' | 'compact'>(() =>
    loadFromStorage('ncht_density', 'comfortable')
  );
  useEffect(() => saveToStorage('ncht_density', layoutDensity), [layoutDensity]);

  const [preferredLanguage, setPreferredLanguage] = useState<string>(() =>
    loadFromStorage('ncht_lang', 'English')
  );
  useEffect(() => saveToStorage('ncht_lang', preferredLanguage), [preferredLanguage]);

  const [highContrast, setHighContrast] = useState<boolean>(() =>
    loadFromStorage('ncht_contrast', false)
  );
  useEffect(() => saveToStorage('ncht_contrast', highContrast), [highContrast]);

  const resetAllDemoData = () => {
    localStorage.clear();
    setChildren(INITIAL_CHILDREN);
    setVaccinations(INITIAL_VACCINATIONS);
    setGrowthMeasurements(INITIAL_GROWTH_MEASUREMENTS);
    setMilestones(INITIAL_MILESTONES);
    setAppointments(INITIAL_APPOINTMENTS);
    setReferrals(INITIAL_REFERRALS);
    setVisits(INITIAL_VISITS);
    setAllergies(INITIAL_ALLERGIES);
    setMedications(INITIAL_MEDICATIONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAiInsights(INITIAL_AI_INSIGHTS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setRoleState('parent');
    setSelectedChildId('child-01');
    setIsOffline(false);
    setSyncQueue([]);
    addToast('Demo Data Reset', 'Restored default synthetic dataset.', 'info');
  };

  const selectedChild = children.find((c) => c.id === selectedChildId) || children[0];

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentUser,
        selectedChildId,
        setSelectedChildId,
        selectedChild,
        children,
        addChild,
        updateChild,
        vaccinations,
        addVaccination,
        updateVaccinationStatus,
        growthMeasurements,
        addGrowthMeasurement,
        milestones,
        updateMilestoneStatus,
        appointments,
        bookAppointment,
        updateAppointmentStatus,
        rescheduleAppointment,
        referrals,
        createReferral,
        updateReferralStatus,
        visits,
        addVisit,
        allergies,
        addAllergy,
        medications,
        addMedication,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadNotificationsCount,
        aiInsights,
        reviewAiInsight,
        dismissAiInsight,
        auditLogs,
        addAuditLog,
        facilities,
        isOffline,
        toggleOfflineMode,
        syncQueue,
        addToSyncQueue,
        syncNow,
        toasts,
        addToast,
        removeToast,
        globalSearch,
        setGlobalSearch,
        currentRoute,
        navigateTo,
        themeMode,
        setThemeMode,
        layoutDensity,
        setLayoutDensity,
        preferredLanguage,
        setPreferredLanguage,
        highContrast,
        setHighContrast,
        resetAllDemoData,
      }}
    >
      {childComponents}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
