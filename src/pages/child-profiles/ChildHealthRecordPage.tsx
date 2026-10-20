import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { BookAppointmentModal } from '../../components/modals/BookAppointmentModal';
import { AddMeasurementModal } from '../../components/modals/AddMeasurementModal';
import { AddVisitNoteModal } from '../../components/modals/AddVisitNoteModal';
import { CreateReferralModal } from '../../components/modals/CreateReferralModal';
import {
  FileHeart,
  Baby,
  Calendar,
  Syringe,
  TrendingUp,
  HeartPulse,
  Printer,
  ChevronLeft,
  AlertTriangle,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Shield,
  FileText,
  Activity,
  PlusCircle,
  Pill,
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export const ChildHealthRecordPage: React.FC = () => {
  const {
    currentRoute,
    children,
    selectedChildId,
    vaccinations,
    growthMeasurements,
    milestones,
    appointments,
    referrals,
    visits,
    allergies,
    medications,
    navigateTo,
    currentUser,
  } = useApp();

  // Extract ID from route if /child-profiles/:id
  const routeChildId = currentRoute.startsWith('/child-profiles/')
    ? currentRoute.replace('/child-profiles/', '')
    : selectedChildId;

  const child = children.find((c) => c.id === routeChildId) || children[0];

  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'medical'
    | 'birth'
    | 'vaccines'
    | 'growth'
    | 'development'
    | 'visits'
    | 'allergies'
    | 'medications'
    | 'referrals'
  >('overview');

  // Modals
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [measureModalOpen, setMeasureModalOpen] = useState(false);
  const [visitNoteModalOpen, setVisitNoteModalOpen] = useState(false);
  const [referralModalOpen, setReferralModalOpen] = useState(false);

  // Child specific data
  const childVaccines = vaccinations.filter((v) => v.childId === child.id);
  const childGrowth = growthMeasurements
    .filter((g) => g.childId === child.id)
    .sort((a, b) => a.ageMonths - b.ageMonths);
  const childMilestones = milestones.filter((m) => m.childId === child.id);
  const childVisits = visits.filter((v) => v.childId === child.id);
  const childAllergies = allergies.filter((a) => a.childId === child.id);
  const childMeds = medications.filter((m) => m.childId === child.id);
  const childReferrals = referrals.filter((r) => r.childId === child.id);

  // Age calculation
  const getAgeString = (dobString: string) => {
    const dob = new Date(dobString);
    const now = new Date();
    const months = Math.max(0, Math.floor((now.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24 * 30.4375)));
    if (months < 12) return `${months} Months`;
    const yrs = Math.floor(months / 12);
    const rem = months % 12;
    return rem > 0 ? `${yrs} Years ${rem} Months` : `${yrs} Years`;
  };

  const handlePrintSummary = () => {
    window.print();
  };

  const tabs: { id: typeof activeTab; label: string; count?: number }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'medical', label: 'Medical History' },
    { id: 'birth', label: 'Birth History' },
    { id: 'vaccines', label: 'Vaccinations', count: childVaccines.length },
    { id: 'growth', label: 'Growth Curves', count: childGrowth.length },
    { id: 'development', label: 'Development', count: childMilestones.length },
    { id: 'visits', label: 'Clinical Visits', count: childVisits.length },
    { id: 'allergies', label: 'Allergies', count: childAllergies.length },
    { id: 'medications', label: 'Medications', count: childMeds.length },
    { id: 'referrals', label: 'Referrals', count: childReferrals.length },
  ];

  return (
    <div className="space-y-6">
      {/* Back button and quick actions */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={() => navigateTo('/child-profiles')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#17365D] transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Child Profiles Directory</span>
        </button>

        <div className="flex items-center gap-2">
          {currentUser.role === 'doctor' && (
            <button
              onClick={() => setVisitNoteModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#159A9C] text-white hover:bg-[#118183] text-xs font-bold transition shadow-xs flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Add Visit Note</span>
            </button>
          )}

          <button
            onClick={() => setMeasureModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-[#17365D] hover:bg-slate-50 text-xs font-bold transition shadow-2xs flex items-center gap-1.5"
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#159A9C]" />
            <span>Add Measurement</span>
          </button>

          <button
            onClick={handlePrintSummary}
            className="px-3.5 py-1.5 rounded-xl bg-[#17365D] text-white hover:bg-[#1d4373] text-xs font-bold transition shadow-xs flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Medical Summary</span>
          </button>
        </div>
      </div>

      {/* Profile Header Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            <img
              src={child.photoUrl}
              alt={child.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-[#EAF3FA] shrink-0"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#159A9C] bg-[#EAF3FA] px-2.5 py-0.5 rounded-md">
                  {child.uhid}
                </span>
                <Badge
                  variant={child.vaccinationStatus === 'up-to-date' ? 'success' : 'warning'}
                  size="sm"
                >
                  {child.vaccinationStatus.replace('-', ' ')}
                </Badge>
                {child.followUpStatus === 'critical-attention' && (
                  <Badge variant="critical" size="sm">Specialist Attention</Badge>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B4D] tracking-tight">
                {child.name}
              </h2>

              <p className="text-xs text-slate-500 font-medium">
                Born {child.dateOfBirth} ({getAgeString(child.dateOfBirth)}) • {child.gender} • Blood Group: <strong className="text-slate-800">{child.bloodGroup}</strong>
              </p>

              <p className="text-xs text-slate-500 flex items-center gap-2 pt-1">
                <span>Guardian: <strong className="text-slate-700">{child.guardianName}</strong> ({child.guardianRelation})</span>
                <span>•</span>
                <span className="text-[#159A9C] font-semibold">{child.guardianPhone}</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 shrink-0 text-xs">
            <div className="p-3 rounded-2xl bg-[#F7F9FC] border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Birth Weight</span>
              <span className="text-base font-extrabold text-[#172B4D]">{child.birthWeightKg} kg</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#F7F9FC] border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Birth Length</span>
              <span className="text-base font-extrabold text-[#172B4D]">{child.birthLengthCm} cm</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#F7F9FC] border border-slate-100 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Delivery Type</span>
              <span className="font-bold text-[#172B4D] truncate block">{child.deliveryType}</span>
            </div>
          </div>
        </div>

        {/* Clinical alerts banner if any */}
        {child.allergiesSummary && child.allergiesSummary.length > 0 && child.allergiesSummary[0] !== 'None Known' && (
          <div className="mt-4 p-3 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Active Allergies / Warnings: {child.allergiesSummary.join(', ')}</span>
          </div>
        )}
      </div>

      {/* Tabs Navigation (10 functional tabs) */}
      <div className="bg-white rounded-2xl p-1.5 border border-slate-200/80 shadow-xs flex overflow-x-auto gap-1 no-print">
        {tabs.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#159A9C] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{t.label}</span>
              {t.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            {/* Recent Vitals & Physical Status */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <h3 className="text-base font-extrabold text-[#172B4D] mb-4 flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-[#159A9C]" />
                <span>Physical Growth & Vitals Summary</span>
              </h3>

              {childGrowth.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Height</span>
                      <strong className="text-lg font-extrabold text-[#172B4D]">
                        {childGrowth[childGrowth.length - 1].heightCm} cm
                      </strong>
                      <span className="text-[10px] text-[#159A9C] font-semibold block mt-0.5">
                        {childGrowth[childGrowth.length - 1].percentiles.heightForAge}th percentile
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Weight</span>
                      <strong className="text-lg font-extrabold text-[#172B4D]">
                        {childGrowth[childGrowth.length - 1].weightKg} kg
                      </strong>
                      <span className="text-[10px] text-[#159A9C] font-semibold block mt-0.5">
                        {childGrowth[childGrowth.length - 1].percentiles.weightForAge}th percentile
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Calculated BMI</span>
                      <strong className="text-lg font-extrabold text-[#172B4D]">
                        {childGrowth[childGrowth.length - 1].bmi}
                      </strong>
                      <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
                        Healthy Range
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Head Circumf.</span>
                      <strong className="text-lg font-extrabold text-[#172B4D]">
                        {childGrowth[childGrowth.length - 1].headCircumferenceCm || '49.5'} cm
                      </strong>
                      <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">Normal</span>
                    </div>
                  </div>

                  <div className="h-48 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={childGrowth}>
                        <XAxis dataKey="ageMonths" tick={{ fontSize: 10 }} label={{ value: 'Age in Months', position: 'insideBottom', offset: -5, fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip contentStyle={{ borderRadius: 12, fontSize: 11 }} />
                        <Line type="monotone" dataKey="heightCm" stroke="#159A9C" strokeWidth={2.5} dot={{ r: 3 }} name="Height (cm)" />
                        <Line type="monotone" dataKey="weightKg" stroke="#17365D" strokeWidth={2} dot={{ r: 3 }} name="Weight (kg)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500">No growth measurements logged yet.</p>
              )}
            </div>

            {/* Recent Developmental Milestones Preview */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-extrabold text-[#172B4D] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#159A9C]" />
                  <span>Developmental Milestones Progress</span>
                </h3>
                <button
                  onClick={() => setActiveTab('development')}
                  className="text-xs font-bold text-[#159A9C] hover:underline"
                >
                  View All Milestones →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {childMilestones.slice(0, 4).map((m) => (
                  <div key={m.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-slate-400">{m.targetAgeLabel}</span>
                      <Badge variant={m.status === 'achieved' ? 'success' : 'neutral'} size="sm">
                        {m.status}
                      </Badge>
                    </div>
                    <h5 className="font-bold text-[#172B4D]">{m.title}</h5>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{m.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Key Contacts, Upcoming Vaccines, Active Meds */}
          <div className="lg:col-span-4 space-y-6">
            {/* Guardian & Care Team Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-[#172B4D] flex items-center gap-2">
                <Baby className="w-4 h-4 text-[#159A9C]" />
                <span>Family & Care Team</span>
              </h4>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Primary Care Doctor</span>
                  <strong className="text-[#172B4D]">Dr. Rajesh Kulkarni, MD</strong>
                  <p className="text-[11px] text-slate-500">Senior Consultant Pediatrician</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Assigned Frontline Worker</span>
                  <strong className="text-[#172B4D]">Sunita Devi (ASHA)</strong>
                  <p className="text-[11px] text-slate-500">+91 94480 87654</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Registered Facility</span>
                  <strong className="text-[#172B4D]">{child.birthFacility}</strong>
                  <p className="text-[11px] text-slate-500">{child.city}, {child.state}</p>
                </div>
              </div>
            </div>

            {/* Upcoming Vaccine Reminder */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-[#172B4D] flex items-center gap-2">
                <Syringe className="w-4 h-4 text-[#159A9C]" />
                <span>Immunization Status</span>
              </h4>
              <p className="text-xs text-slate-600">
                {childVaccines.filter((v) => v.status === 'completed').length} of {childVaccines.length} scheduled doses completed.
              </p>
              <button
                onClick={() => setActiveTab('vaccines')}
                className="w-full py-2 rounded-xl bg-[#EAF3FA] text-[#17365D] hover:bg-[#d8ebfa] text-xs font-bold transition"
              >
                Inspect Vaccine Timeline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Medical History */}
      {activeTab === 'medical' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <h3 className="text-base font-extrabold text-[#172B4D]">Medical Background & Chronic History</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Chronic Illnesses / Conditions</span>
              {child.chronicConditions && child.chronicConditions.length > 0 ? (
                <ul className="list-disc pl-4 space-y-1 text-slate-700">
                  {child.chronicConditions.map((c, i) => (
                    <li key={i} className="font-semibold">{c}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-600">No chronic medical conditions documented.</p>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Hospital Admissions / Surgeries</span>
              <p className="text-slate-600">
                Nil hospitalizations. Term delivery with uneventful nursery observation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Family Medical History</span>
              <p className="text-slate-600">
                Maternal history of seasonal allergic rhinitis. No reported congenital cardiovascular anomalies or juvenile diabetes.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Dietary & Feeding History</span>
              <p className="text-slate-600">
                Exclusive breastfeeding for first 6 months. Age-appropriate complementary feeding with family meals, pulses, and milk.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Birth History */}
      {activeTab === 'birth' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <h3 className="text-base font-extrabold text-[#172B4D]">Neonatal & Perinatal Record</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Gestational Age</span>
              <strong className="text-base font-extrabold text-[#172B4D]">{child.gestationalAgeWeeks} Weeks (Term)</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Birth Weight</span>
              <strong className="text-base font-extrabold text-[#172B4D]">{child.birthWeightKg} kg</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Birth Length</span>
              <strong className="text-base font-extrabold text-[#172B4D]">{child.birthLengthCm} cm</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Delivery Mode</span>
              <strong className="text-[#172B4D]">{child.deliveryType}</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">APGAR Score</span>
              <strong className="text-[#172B4D]">{child.apgarScore || '9/10 at 5 mins'}</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Birth Facility</span>
              <strong className="text-[#172B4D]">{child.birthFacility}</strong>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Vaccinations */}
      {activeTab === 'vaccines' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#172B4D]">Immunization Ledger</h3>
            <button
              onClick={() => navigateTo('/vaccinations')}
              className="text-xs font-bold text-[#159A9C] hover:underline"
            >
              Open Interactive Vaccine Dashboard →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Vaccine Name</th>
                  <th className="py-2.5 px-3">Dose & Target</th>
                  <th className="py-2.5 px-3">Due Date</th>
                  <th className="py-2.5 px-3">Administered</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Batch & Facility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {childVaccines.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-[#172B4D]">{v.vaccineName}</td>
                    <td className="py-2.5 px-3">
                      Dose {v.doseNumber} ({v.recommendedAgeLabel})
                    </td>
                    <td className="py-2.5 px-3 font-mono">{v.dueDate}</td>
                    <td className="py-2.5 px-3 font-mono">{v.administeredDate || '—'}</td>
                    <td className="py-2.5 px-3">
                      <Badge
                        variant={v.status === 'completed' ? 'success' : v.status === 'overdue' ? 'critical' : 'teal'}
                        size="sm"
                      >
                        {v.status}
                      </Badge>
                    </td>
                    <td className="py-2.5 px-3 text-slate-500">
                      {v.batchNumber ? `${v.batchNumber} • ${v.facility}` : 'Pending administration'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Growth */}
      {activeTab === 'growth' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-[#172B4D]">Longitudinal Growth Measurements</h3>
              <p className="text-xs text-slate-500">Chronological history with WHO percentile bands</p>
            </div>
            <button
              onClick={() => setMeasureModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-[#159A9C] text-white text-xs font-bold hover:bg-[#118183] transition"
            >
              Add New Measurement
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Age</th>
                  <th className="py-2.5 px-3">Height (cm)</th>
                  <th className="py-2.5 px-3">Weight (kg)</th>
                  <th className="py-2.5 px-3">BMI</th>
                  <th className="py-2.5 px-3">Recorded By</th>
                  <th className="py-2.5 px-3">Clinical Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {childGrowth.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono font-medium">{g.recordedDate}</td>
                    <td className="py-2.5 px-3">{g.ageMonths} mos</td>
                    <td className="py-2.5 px-3 font-bold text-[#172B4D]">{g.heightCm}</td>
                    <td className="py-2.5 px-3 font-bold text-[#172B4D]">{g.weightKg}</td>
                    <td className="py-2.5 px-3 font-mono">{g.bmi}</td>
                    <td className="py-2.5 px-3 text-slate-500">{g.recordedBy}</td>
                    <td className="py-2.5 px-3 text-slate-600">{g.clinicalNote || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 6: Development */}
      {activeTab === 'development' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-[#172B4D]">Developmental Milestones Checklist</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {childMilestones.map((m) => (
              <div key={m.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#159A9C] uppercase">{m.category} • {m.targetAgeLabel}</span>
                  <Badge variant={m.status === 'achieved' ? 'success' : 'neutral'} size="sm">{m.status}</Badge>
                </div>
                <h5 className="font-bold text-[#172B4D] text-sm">{m.title}</h5>
                <p className="text-slate-600 text-xs leading-relaxed">{m.description}</p>
                {m.achievedDate && (
                  <span className="text-[10px] text-slate-400 block pt-1">Achieved: {m.achievedDate}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 7: Visits */}
      {activeTab === 'visits' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#172B4D]">Clinical Encounter History</h3>
            <button
              onClick={() => setVisitNoteModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#159A9C] text-white text-xs font-bold hover:bg-[#118183] transition"
            >
              Add New Visit Note
            </button>
          </div>

          <div className="space-y-4">
            {childVisits.map((vis) => (
              <div key={vis.id} className="p-4 rounded-2xl border border-slate-200 bg-[#F7F9FC] space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Date: <strong className="text-slate-800">{vis.visitDate}</strong></span>
                  <span>Clinician: <strong className="text-slate-800">{vis.clinicianName}</strong> ({vis.facility})</span>
                </div>
                <h4 className="font-bold text-sm text-[#172B4D]">{vis.visitType}</h4>
                <p className="text-slate-700"><strong>Chief Complaints:</strong> {vis.chiefComplaints}</p>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <span className="font-bold text-[#159A9C]">Diagnosis: </span>
                  <span className="font-semibold text-[#172B4D]">{vis.diagnosis}</span>
                </div>
                <p className="text-slate-600"><strong>Prescribed:</strong> {vis.prescriptions.map((p) => `${p.medicine} (${p.dosage}, ${p.frequency})`).join('; ')}</p>
                <p className="text-slate-500 italic">Advice: {vis.advice}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 8: Allergies */}
      {activeTab === 'allergies' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-[#172B4D]">Allergies & Hypersensitivities</h3>
          <div className="space-y-3">
            {childAllergies.map((alg) => (
              <div key={alg.id} className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-amber-950 text-sm">{alg.allergen}</h4>
                  <p className="text-amber-800 mt-0.5">Reaction: {alg.reaction}</p>
                  <span className="text-[10px] text-amber-700 font-mono">Diagnosed: {alg.diagnosedDate}</span>
                </div>
                <Badge variant={alg.severity === 'Severe' ? 'critical' : 'warning'} size="sm">
                  {alg.severity} Severity
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 9: Medications */}
      {activeTab === 'medications' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-[#172B4D]">Active & Prior Pharmacotherapy</h3>
          <div className="space-y-3">
            {childMeds.map((med) => (
              <div key={med.id} className="p-4 rounded-2xl border border-slate-200 bg-[#F7F9FC] flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-[#172B4D] text-sm">{med.name}</h4>
                  <p className="text-slate-600 mt-0.5">Dosage: {med.dosage} • Frequency: {med.frequency}</p>
                  <span className="text-[10px] text-slate-400">Prescribed by {med.prescribedBy} on {med.startDate}</span>
                </div>
                <Badge variant={med.status === 'active' ? 'teal' : 'neutral'} size="sm">
                  {med.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 10: Referrals */}
      {activeTab === 'referrals' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#172B4D]">Specialist Referrals</h3>
            <button
              onClick={() => setReferralModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#159A9C] text-white text-xs font-bold hover:bg-[#118183] transition"
            >
              Initiate Referral
            </button>
          </div>

          <div className="space-y-4">
            {childReferrals.map((ref) => (
              <div key={ref.id} className="p-4 rounded-2xl border border-slate-200 bg-[#F7F9FC] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#172B4D] text-sm">{ref.specialistType}</span>
                  <Badge variant="teal" size="sm">{ref.status.replace('-', ' ')}</Badge>
                </div>
                <p className="text-slate-700"><strong>Specialist:</strong> {ref.destinationSpecialist}</p>
                <p className="text-slate-600"><strong>Reason:</strong> {ref.reason}</p>
                {ref.recommendations && (
                  <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-950">
                    <strong>Recommendations:</strong> {ref.recommendations}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <BookAppointmentModal
        isOpen={bookModalOpen}
        onClose={() => setBookModalOpen(false)}
        defaultChildId={child.id}
      />
      <AddMeasurementModal
        isOpen={measureModalOpen}
        onClose={() => setMeasureModalOpen(false)}
        defaultChildId={child.id}
      />
      <AddVisitNoteModal
        isOpen={visitNoteModalOpen}
        onClose={() => setVisitNoteModalOpen(false)}
        defaultChildId={child.id}
      />
      <CreateReferralModal
        isOpen={referralModalOpen}
        onClose={() => setReferralModalOpen(false)}
        defaultChildId={child.id}
      />
    </div>
  );
};
