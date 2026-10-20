import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { AddChildModal } from '../../components/modals/AddChildModal';
import { AddMeasurementModal } from '../../components/modals/AddMeasurementModal';
import { BookAppointmentModal } from '../../components/modals/BookAppointmentModal';
import {
  Users,
  Home,
  Syringe,
  AlertTriangle,
  Wifi,
  WifiOff,
  RefreshCw,
  PlusCircle,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  MapPin,
  Clock,
  Phone,
} from 'lucide-react';

export const HealthWorkerDashboard: React.FC = () => {
  const {
    currentUser,
    children,
    vaccinations,
    appointments,
    isOffline,
    toggleOfflineMode,
    syncQueue,
    syncNow,
    addToSyncQueue,
    updateVaccinationStatus,
    navigateTo,
  } = useApp();

  const [addChildOpen, setAddChildOpen] = useState(false);
  const [addMeasurementOpen, setAddMeasurementOpen] = useState(false);
  const [bookAppointmentOpen, setBookAppointmentOpen] = useState(false);

  // Field stats
  const registeredChildrenCount = children.length;
  const overdueVaccines = vaccinations.filter((v) => v.status === 'overdue');
  const dueSoonVaccines = vaccinations.filter((v) => v.status === 'due');
  const todayVisits = appointments.filter((a) => a.appointmentType.includes('Home Visit') || a.priority === 'Urgent');

  // Quick field record vaccination modal or state
  const handleQuickFieldVaccine = (vacId: string, childName: string) => {
    if (isOffline) {
      addToSyncQueue('Record Vaccine', childName, { vacId, administeredDate: new Date().toISOString().split('T')[0] });
    } else {
      updateVaccinationStatus(vacId, 'completed', {
        administeredDate: new Date().toISOString().split('T')[0],
        facility: currentUser.facility || 'Ward 12 Sub-Centre',
        administeredBy: currentUser.name,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Field Worker Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-teal-50"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172B4D]">{currentUser.name}</h2>
              <Badge variant="teal" size="sm">ASHA Facilitator</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#159A9C]" />
              <span>{currentUser.location} • Sector 4 Primary Health Outreach</span>
            </p>
          </div>
        </div>

        {/* Offline Simulation Control Card */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-[#172B4D] block">
              {isOffline ? 'Offline Simulation Active' : 'Online Registry Connected'}
            </span>
            <span className="text-[11px] text-slate-500">
              {syncQueue.length} pending items in queue
            </span>
          </div>

          <button
            onClick={toggleOfflineMode}
            className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
              isOffline
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-emerald-100 text-emerald-900 border-emerald-300'
            }`}
          >
            {isOffline ? <WifiOff className="w-4 h-4 text-amber-700" /> : <Wifi className="w-4 h-4 text-emerald-700" />}
            <span>{isOffline ? 'Go Online' : 'Simulate Offline'}</span>
          </button>

          {syncQueue.length > 0 && (
            <button
              onClick={syncNow}
              className="px-3 py-2.5 rounded-xl bg-[#159A9C] text-white text-xs font-bold hover:bg-[#118183] flex items-center gap-1.5 shadow-xs transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sync Queue ({syncQueue.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Households"
          value="148"
          subtitle="Ward 12 Sub-locality"
          icon={Home}
          variant="blue"
        />
        <StatCard
          title="Registered Children"
          value={registeredChildrenCount}
          subtitle="Age 0 to 18 Years"
          icon={Users}
          variant="teal"
          onClick={() => navigateTo('/child-profiles')}
        />
        <StatCard
          title="Vaccinations Due"
          value={dueSoonVaccines.length}
          subtitle="This week's outreach"
          icon={Syringe}
          variant="emerald"
          onClick={() => navigateTo('/vaccinations')}
        />
        <StatCard
          title="Missed Follow-ups"
          value={overdueVaccines.length}
          subtitle="Urgent home visit needed"
          icon={AlertTriangle}
          variant="rose"
          onClick={() => navigateTo('/vaccinations')}
        />
      </div>

      {/* Quick Action Bar for Field Work */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Frontline Field Actions
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setAddChildOpen(true)}
            className="p-3 rounded-2xl bg-[#EAF3FA] hover:bg-[#d5e7f7] text-[#17365D] text-xs font-bold flex items-center gap-2.5 transition"
          >
            <PlusCircle className="w-4 h-4 text-[#159A9C]" />
            <span>Register Newborn / Child</span>
          </button>

          <button
            onClick={() => setAddMeasurementOpen(true)}
            className="p-3 rounded-2xl bg-teal-50 hover:bg-teal-100 text-[#118183] text-xs font-bold flex items-center gap-2.5 transition"
          >
            <TrendingUp className="w-4 h-4 text-[#159A9C]" />
            <span>Log Field Measurement</span>
          </button>

          <button
            onClick={() => navigateTo('/vaccinations')}
            className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2.5 transition"
          >
            <Syringe className="w-4 h-4 text-emerald-600" />
            <span>Record Field Vaccine</span>
          </button>

          <button
            onClick={() => setBookAppointmentOpen(true)}
            className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-2.5 transition"
          >
            <CalendarCheck className="w-4 h-4 text-amber-600" />
            <span>Schedule Home Outreach</span>
          </button>
        </div>
      </div>

      {/* Two Column Section: Priority Field Route Checklist & Pending Sync Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Priority Outreach List (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-extrabold text-[#172B4D]">Priority Home Visits & Due Vaccinations</h3>
              <p className="text-xs text-slate-500">Children requiring immediate field verification or missed dose administration</p>
            </div>
            <Badge variant="warning" size="sm">
              {overdueVaccines.length + dueSoonVaccines.length} Priority
            </Badge>
          </div>

          <div className="space-y-3">
            {overdueVaccines.map((v) => {
              const child = children.find((c) => c.id === v.childId);
              return (
                <div
                  key={v.id}
                  className="p-4 rounded-2xl border border-rose-200/80 bg-rose-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#172B4D]">{child?.name}</span>
                      <Badge variant="critical" size="sm">Overdue {v.dueDate}</Badge>
                    </div>
                    <p className="text-xs text-slate-600">
                      <strong>Vaccine:</strong> {v.vaccineName} ({v.recommendedAgeLabel})
                    </p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span>Guardian: {child?.guardianName}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[#159A9C]">
                        <Phone className="w-3 h-3" />
                        {child?.guardianPhone}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleQuickFieldVaccine(v.id, child?.name || 'Child')}
                      className="px-3 py-1.5 rounded-xl bg-[#23865B] text-white text-xs font-bold hover:bg-emerald-700 transition shadow-2xs"
                    >
                      {isOffline ? 'Log Offline' : 'Mark Administered'}
                    </button>
                    <button
                      onClick={() => navigateTo(`/child-profiles/${v.childId}`)}
                      className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
                      title="View Profile"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            {dueSoonVaccines.slice(0, 2).map((v) => {
              const child = children.find((c) => c.id === v.childId);
              return (
                <div
                  key={v.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#172B4D]">{child?.name}</span>
                      <Badge variant="teal" size="sm">Due Soon ({v.dueDate})</Badge>
                    </div>
                    <p className="text-xs text-slate-600">
                      <strong>Vaccine:</strong> {v.vaccineName}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Guardian: {child?.guardianName} • {child?.address}
                    </p>
                  </div>

                  <button
                    onClick={() => handleQuickFieldVaccine(v.id, child?.name || 'Child')}
                    className="px-3 py-1.5 rounded-xl bg-[#159A9C] text-white text-xs font-bold hover:bg-[#118183] transition"
                  >
                    {isOffline ? 'Queue Dose' : 'Administer Dose'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pending Sync Queue & Activity Log (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-[#172B4D] flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#159A9C]" />
                <span>Simulated Offline Sync Queue</span>
              </h4>
              <Badge variant={syncQueue.length > 0 ? 'warning' : 'neutral'} size="sm">
                {syncQueue.length} queued
              </Badge>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Entries recorded in offline mode are safely preserved in browser state.
            </p>

            {syncQueue.length > 0 ? (
              <div className="space-y-2 mb-4">
                {syncQueue.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-amber-950 block">{item.actionType}</span>
                      <span className="text-[11px] text-amber-800">Child: {item.childName}</span>
                    </div>
                    <span className="text-[10px] text-amber-700 font-mono">{item.timestamp}</span>
                  </div>
                ))}
                <button
                  onClick={syncNow}
                  className="w-full py-2.5 rounded-xl bg-[#159A9C] text-white text-xs font-bold hover:bg-[#118183] transition flex items-center justify-center gap-1.5 mt-3"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Push All Queued Records Now</span>
                </button>
              </div>
            ) : (
              <div className="p-6 text-center rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-500">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="font-bold text-slate-700">Offline queue is currently empty</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Turn on "Simulate Offline" above to test local queuing of field visits.
                </p>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 italic">
              Notice: Prototype simulation. Does not transfer data to real government servers.
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddChildModal isOpen={addChildOpen} onClose={() => setAddChildOpen(false)} />
      <AddMeasurementModal isOpen={addMeasurementOpen} onClose={() => setAddMeasurementOpen(false)} />
      <BookAppointmentModal isOpen={bookAppointmentOpen} onClose={() => setBookAppointmentOpen(false)} />
    </div>
  );
};
