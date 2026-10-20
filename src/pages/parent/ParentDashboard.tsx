import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { BookAppointmentModal } from '../../components/modals/BookAppointmentModal';
import {
  Calendar,
  Syringe,
  TrendingUp,
  Clock,
  HeartPulse,
  Baby,
  ChevronRight,
  PlusCircle,
  FileText,
  AlertCircle,
  CheckCircle2,
  CalendarDays,
  Sparkles,
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export const ParentDashboard: React.FC = () => {
  const {
    currentUser,
    children,
    selectedChildId,
    setSelectedChildId,
    selectedChild,
    vaccinations,
    appointments,
    growthMeasurements,
    notifications,
    visits,
    navigateTo,
  } = useApp();

  const [bookModalOpen, setBookModalOpen] = useState(false);

  // Filter children belonging to Priya Sharma or assigned to parent
  const parentChildren = children.filter((c) =>
    currentUser.assignedChildIds?.includes(c.id) || c.guardianName.includes('Sharma')
  );

  const activeChild = selectedChild || parentChildren[0] || children[0];

  // Next vaccination for active child
  const childVaccines = vaccinations.filter((v) => v.childId === activeChild.id);
  const nextVaccine =
    childVaccines.find((v) => v.status === 'due') ||
    childVaccines.find((v) => v.status === 'upcoming');

  // Next appointment for active child
  const childAppointments = appointments.filter(
    (a) => a.childId === activeChild.id && a.status === 'scheduled'
  );
  const nextAppointment = childAppointments[0];

  // Growth measurements for chart preview
  const childGrowth = growthMeasurements
    .filter((g) => g.childId === activeChild.id)
    .sort((a, b) => a.ageMonths - b.ageMonths);

  // Recent visit
  const childVisits = visits.filter((v) => v.childId === activeChild.id);
  const recentVisit = childVisits[0];

  // Calculate age string
  const calculateAge = (dobString: string) => {
    const dob = new Date(dobString);
    const now = new Date();
    const months = Math.max(
      0,
      Math.floor((now.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24 * 30.4375))
    );
    if (months < 12) return `${months} Months`;
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    return remMonths > 0 ? `${years} Years ${remMonths} Mos` : `${years} Years`;
  };

  const currentDateFormatted = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#17365D] via-[#1d4373] to-[#159A9C] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold text-teal-200 mb-3 border border-white/10">
            <Baby className="w-3.5 h-3.5" />
            <span>Parent & Guardian Health Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Namaste, {currentUser.name}!
          </h2>
          <p className="text-xs sm:text-sm text-teal-100/90 mt-1.5">
            {currentDateFormatted} • All records synced with your local PHC.
          </p>
        </div>

        {/* Child Selector Pills */}
        <div className="mt-6 pt-5 border-t border-white/15 relative z-10 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-teal-200 mr-2">Viewing Records for:</span>
          {parentChildren.map((c) => {
            const isSelected = c.id === activeChild.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedChildId(c.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition ${
                  isSelected
                    ? 'bg-white text-[#17365D] shadow-md ring-2 ring-white/50'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <img src={c.photoUrl} alt="" className="w-5 h-5 rounded-full object-cover" />
                <span>{c.name}</span>
                <span className="text-[10px] opacity-75 font-normal">({calculateAge(c.dateOfBirth)})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => navigateTo(`/child-profiles/${activeChild.id}`)}
          className="p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#159A9C] hover:shadow-md transition text-left flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#EAF3FA] text-[#17365D] group-hover:bg-[#159A9C] group-hover:text-white transition">
              <Baby className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#172B4D]">Full Profile</p>
              <p className="text-[10px] text-slate-500">View Child Record</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
        </button>

        <button
          onClick={() => navigateTo('/vaccinations')}
          className="p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#159A9C] hover:shadow-md transition text-left flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-50 text-[#159A9C] group-hover:bg-[#159A9C] group-hover:text-white transition">
              <Syringe className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#172B4D]">Vaccine Schedule</p>
              <p className="text-[10px] text-slate-500">Track Doses</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
        </button>

        <button
          onClick={() => navigateTo('/growth')}
          className="p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#159A9C] hover:shadow-md transition text-left flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#172B4D]">Growth Curves</p>
              <p className="text-[10px] text-slate-500">WHO Percentiles</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
        </button>

        <button
          onClick={() => setBookModalOpen(true)}
          className="p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#159A9C] hover:shadow-md transition text-left flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#172B4D]">Book Appointment</p>
              <p className="text-[10px] text-slate-500">Routine Checkup</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
        </button>
      </div>

      {/* Main Grid: Active Child Card, Next Vaccine, Upcoming Appointment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Child Summary Card (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4">
              <img
                src={activeChild.photoUrl}
                alt={activeChild.name}
                className="w-16 h-16 rounded-2xl object-cover ring-4 ring-[#EAF3FA]"
              />
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {activeChild.uhid}
                </span>
                <h3 className="text-xl font-extrabold text-[#172B4D] truncate">{activeChild.name}</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Born {activeChild.dateOfBirth} ({calculateAge(activeChild.dateOfBirth)})
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">Blood Group</span>
                <span className="font-extrabold text-[#172B4D]">{activeChild.bloodGroup}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">Birth Weight</span>
                <span className="font-extrabold text-[#172B4D]">{activeChild.birthWeightKg} kg</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">Vaccine Status</span>
                <Badge
                  variant={activeChild.vaccinationStatus === 'up-to-date' ? 'success' : 'warning'}
                  size="sm"
                >
                  {activeChild.vaccinationStatus.replace('-', ' ')}
                </Badge>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">Facility</span>
                <span className="font-bold text-[#172B4D] truncate block">Indiranagar PHC</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-teal-50/70 border border-teal-200/60 text-xs text-teal-900 leading-relaxed">
              <strong>Pediatrician Note:</strong> {activeChild.notes || 'Healthy child following routine checks.'}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={() => navigateTo(`/child-profiles/${activeChild.id}`)}
              className="w-full py-2.5 rounded-xl bg-[#EAF3FA] hover:bg-[#d8eaf7] text-[#17365D] text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <span>Open Detailed Digital Health Card</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Middle: Reminders & Appointments (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Next Vaccination Reminder */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-teal-50 text-[#159A9C]">
                  <Syringe className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#172B4D]">Next Immunization</h4>
              </div>
              <Badge variant="teal" size="sm">
                Target Schedule
              </Badge>
            </div>

            {nextVaccine ? (
              <div className="space-y-3">
                <div>
                  <h5 className="text-base font-extrabold text-[#172B4D]">{nextVaccine.vaccineName}</h5>
                  <p className="text-xs text-slate-500 mt-0.5">Protects against: {nextVaccine.diseaseTarget}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#F7F9FC] border border-slate-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase">Scheduled Due Date</span>
                    <span className="font-bold text-[#172B4D]">{nextVaccine.dueDate}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-teal-100 text-[#118183] text-[11px] font-bold">
                    {nextVaccine.recommendedAgeLabel}
                  </span>
                </div>
                <button
                  onClick={() => navigateTo('/vaccinations')}
                  className="w-full py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#159A9C] hover:bg-teal-50 transition"
                >
                  View Full Immunization Chart
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-500">All scheduled doses for this age are currently up to date.</p>
            )}
          </div>

          {/* Upcoming Appointment */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#EAF3FA] text-[#17365D]">
                  <CalendarDays className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#172B4D]">Upcoming Clinic Visit</h4>
              </div>
              <Badge variant="navy" size="sm">
                Confirmed
              </Badge>
            </div>

            {nextAppointment ? (
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-bold text-[#172B4D]">{nextAppointment.appointmentType}</h5>
                  <p className="text-xs text-slate-500">{nextAppointment.providerName} • {nextAppointment.facility}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#F7F9FC] border border-slate-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase">Date & Time</span>
                    <span className="font-bold text-[#172B4D]">
                      {nextAppointment.date} at {nextAppointment.time}
                    </span>
                  </div>
                  <button
                    onClick={() => navigateTo('/appointments')}
                    className="text-[11px] font-bold text-[#159A9C] hover:underline"
                  >
                    Reschedule
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-xs text-slate-500 mb-3">No upcoming appointments scheduled.</p>
                <button
                  onClick={() => setBookModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#159A9C] text-white text-xs font-bold hover:bg-[#118183] transition"
                >
                  Book Routine Checkup
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Growth Chart Sparkline & Recent Activity (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Mini Growth Preview */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#172B4D]">Growth Trajectory</h4>
              </div>
              <button
                onClick={() => navigateTo('/growth')}
                className="text-xs font-bold text-[#159A9C] hover:underline"
              >
                Full Analytics →
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              Height & Weight progress over age in months (Illustrative curve)
            </p>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={childGrowth}>
                  <XAxis dataKey="ageMonths" tick={{ fontSize: 10 }} label={{ value: 'Age (mo)', position: 'insideBottom', offset: -5, fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, fontSize: 11, border: '1px solid #CBD5E1' }}
                    formatter={(val: any, name: any) => [`${val} ${name === 'heightCm' ? 'cm' : 'kg'}`, name === 'heightCm' ? 'Height' : 'Weight']}
                  />
                  <Line type="monotone" dataKey="heightCm" stroke="#159A9C" strokeWidth={2.5} dot={{ r: 3 }} name="heightCm" />
                  <Line type="monotone" dataKey="weightKg" stroke="#17365D" strokeWidth={2} dot={{ r: 3 }} name="weightKg" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 flex items-center justify-center gap-4 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#159A9C]" />
                <span>Height (cm)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#17365D]" />
                <span>Weight (kg)</span>
              </span>
            </div>
          </div>

          {/* Recent Clinical Visit Summary */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <h4 className="text-sm font-bold text-[#172B4D] mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#159A9C]" />
              <span>Latest Medical Visit Note</span>
            </h4>

            {recentVisit ? (
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400 text-[10px]">
                  <span>{recentVisit.visitDate}</span>
                  <span>{recentVisit.facility}</span>
                </div>
                <h5 className="font-bold text-[#172B4D]">{recentVisit.visitType}</h5>
                <p className="text-slate-600 line-clamp-2 leading-relaxed">{recentVisit.diagnosis}</p>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-600">
                  <span className="font-semibold text-[#17365D]">Advice: </span>
                  {recentVisit.advice}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500">No recent clinical visits recorded.</p>
            )}
          </div>
        </div>
      </div>

      <BookAppointmentModal
        isOpen={bookModalOpen}
        onClose={() => setBookModalOpen(false)}
        defaultChildId={activeChild.id}
      />
    </div>
  );
};
