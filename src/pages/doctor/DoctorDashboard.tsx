import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { AddVisitNoteModal } from '../../components/modals/AddVisitNoteModal';
import { CreateReferralModal } from '../../components/modals/CreateReferralModal';
import { BookAppointmentModal } from '../../components/modals/BookAppointmentModal';
import {
  Users,
  CalendarDays,
  GitBranch,
  AlertCircle,
  FilePlus,
  ArrowUpRight,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Stethoscope,
  HeartPulse,
} from 'lucide-react';

export const DoctorDashboard: React.FC = () => {
  const {
    currentUser,
    children,
    appointments,
    referrals,
    aiInsights,
    visits,
    setSelectedChildId,
    updateAppointmentStatus,
    navigateTo,
  } = useApp();

  const [visitNoteOpen, setVisitNoteOpen] = useState(false);
  const [referralOpen, setReferralOpen] = useState(false);
  const [followUpOpen, setFollowUpOpen] = useState(false);
  const [selectedChildForAction, setSelectedChildForAction] = useState<string>('child-01');
  const [patientSearch, setPatientSearch] = useState('');

  // Stats
  const assignedChildrenCount = children.length;
  const todayAppointments = appointments.filter((a) => a.status === 'scheduled');
  const pendingReferrals = referrals.filter((r) => r.status !== 'closed' && r.status !== 'recommendations-returned');
  const highPriorityAlerts = aiInsights.filter((a) => a.priority === 'high' && a.status === 'pending-review');

  // Filtered patients for quick search
  const filteredPatients = patientSearch.trim()
    ? children.filter(
        (c) =>
          c.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
          c.uhid.toLowerCase().includes(patientSearch.toLowerCase())
      )
    : children.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Doctor Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-emerald-50"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172B4D]">{currentUser.name}</h2>
              <Badge variant="success" size="sm">Senior Pediatrician</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {currentUser.facility} • Outpatient Clinic Ward 3
            </p>
          </div>
        </div>

        {/* Quick Action buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setSelectedChildForAction('child-01');
              setVisitNoteOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-[#159A9C] text-white text-xs font-bold hover:bg-[#118183] transition shadow-xs flex items-center gap-1.5"
          >
            <FilePlus className="w-3.5 h-3.5" />
            <span>Add Clinical Visit Note</span>
          </button>
          <button
            onClick={() => {
              setSelectedChildForAction('child-01');
              setReferralOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-[#17365D] text-white text-xs font-bold hover:bg-[#1d4373] transition shadow-xs flex items-center gap-1.5"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Create Specialist Referral</span>
          </button>
          <button
            onClick={() => setFollowUpOpen(true)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold transition flex items-center gap-1.5"
          >
            <CalendarDays className="w-3.5 h-3.5 text-slate-500" />
            <span>Schedule Follow-up</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Children"
          value={assignedChildrenCount}
          subtitle="In primary care catchment"
          icon={Users}
          variant="blue"
          onClick={() => navigateTo('/child-profiles')}
        />
        <StatCard
          title="Today's Appointments"
          value={todayAppointments.length}
          subtitle="Outpatient consultations"
          icon={CalendarDays}
          variant="teal"
          onClick={() => navigateTo('/appointments')}
        />
        <StatCard
          title="Active Referrals"
          value={pendingReferrals.length}
          subtitle="Specialist tele-triage"
          icon={GitBranch}
          variant="emerald"
          onClick={() => navigateTo('/referrals')}
        />
        <StatCard
          title="Critical Alerts"
          value={highPriorityAlerts.length}
          subtitle="Requires clinical review"
          icon={AlertCircle}
          variant="rose"
          onClick={() => navigateTo('/ai-insights')}
        />
      </div>

      {/* Main Grid: Scheduled Consultations & Patient Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scheduled Consultations (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-extrabold text-[#172B4D]">Today's Scheduled Consultations</h3>
              <p className="text-xs text-slate-500">Queue of routine checkups and follow-up visits</p>
            </div>
            <Badge variant="teal" size="sm">
              {todayAppointments.length} Scheduled
            </Badge>
          </div>

          <div className="space-y-3">
            {todayAppointments.map((apt) => (
              <div
                key={apt.id}
                className="p-4 rounded-2xl border border-slate-200 bg-[#F7F9FC] hover:bg-white hover:border-[#159A9C]/40 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#172B4D]">{apt.childName}</span>
                    <Badge variant={apt.priority === 'Urgent' ? 'critical' : 'navy'} size="sm">
                      {apt.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    {apt.appointmentType} • {apt.time}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Reason: {apt.reason}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setSelectedChildId(apt.childId);
                      setSelectedChildForAction(apt.childId);
                      setVisitNoteOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#159A9C] text-white text-xs font-bold hover:bg-[#118183] transition shadow-2xs"
                  >
                    Start Visit Note
                  </button>
                  <button
                    onClick={() => {
                      setSelectedChildId(apt.childId);
                      navigateTo(`/child-profiles/${apt.childId}`);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Review Record
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Searchable Quick Patient Directory (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#172B4D]">Patient Record Lookup</h3>
            <button
              onClick={() => navigateTo('/child-profiles')}
              className="text-xs font-bold text-[#159A9C] hover:underline"
            >
              Full Directory →
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by child name or UHID..."
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:border-[#159A9C]"
            />
          </div>

          <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
            {filteredPatients.map((child) => (
              <div
                key={child.id}
                onClick={() => {
                  setSelectedChildId(child.id);
                  navigateTo(`/child-profiles/${child.id}`);
                }}
                className="py-3 px-2 flex items-center justify-between hover:bg-[#EAF3FA]/50 rounded-xl cursor-pointer transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={child.photoUrl}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#172B4D]">{child.name}</p>
                    <p className="text-[10px] text-slate-500">{child.uhid} • Blood: {child.bloodGroup}</p>
                  </div>
                </div>

                <div className="text-right">
                  <Badge
                    variant={child.vaccinationStatus === 'up-to-date' ? 'success' : 'warning'}
                    size="sm"
                  >
                    {child.vaccinationStatus}
                  </Badge>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {child.gender}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddVisitNoteModal
        isOpen={visitNoteOpen}
        onClose={() => setVisitNoteOpen(false)}
        defaultChildId={selectedChildForAction}
      />
      <CreateReferralModal
        isOpen={referralOpen}
        onClose={() => setReferralOpen(false)}
        defaultChildId={selectedChildForAction}
      />
      <BookAppointmentModal
        isOpen={followUpOpen}
        onClose={() => setFollowUpOpen(false)}
        defaultChildId={selectedChildForAction}
      />
    </div>
  );
};
