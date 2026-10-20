import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { VaccinationRecord, VaccineAdminStatus } from '../../types';
import {
  Syringe,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  Filter,
  Search,
  Building2,
  FileCheck,
  ShieldAlert,
  Info,
} from 'lucide-react';

export const VaccinationsPage: React.FC = () => {
  const { vaccinations, updateVaccinationStatus, children, currentUser, addToast } = useApp();

  const [selectedChildFilter, setSelectedChildFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedVaccine, setSelectedVaccine] = useState<VaccinationRecord | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [markCompleteModalOpen, setMarkCompleteModalOpen] = useState(false);

  // Complete Form State
  const [adminDate, setAdminDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [batchNo, setBatchNo] = useState('BAT-2026-X882');
  const [adminFacility, setAdminFacility] = useState(currentUser.facility || 'Indiranagar Urban Health Centre');
  const [adminNotes, setAdminNotes] = useState('Administered intramuscularly. Cold chain verified.');

  // Filtered vaccines
  const filteredVaccines = useMemo(() => {
    return vaccinations.filter((v) => {
      const child = children.find((c) => c.id === v.childId);
      const matchesChild = selectedChildFilter === 'ALL' || v.childId === selectedChildFilter;
      const matchesStatus = statusFilter === 'ALL' || v.status === statusFilter;
      const matchesSearch =
        v.vaccineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.diseaseTarget.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (child && child.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesChild && matchesStatus && matchesSearch;
    });
  }, [vaccinations, selectedChildFilter, statusFilter, searchQuery, children]);

  // Overall completion metrics
  const completedCount = vaccinations.filter((v) => v.status === 'completed').length;
  const overdueCount = vaccinations.filter((v) => v.status === 'overdue').length;
  const dueCount = vaccinations.filter((v) => v.status === 'due' || v.status === 'upcoming').length;
  const completionPercentage = Math.round((completedCount / (vaccinations.length || 1)) * 100);

  const handleOpenMarkComplete = (vac: VaccinationRecord) => {
    setSelectedVaccine(vac);
    setMarkCompleteModalOpen(true);
  };

  const handleConfirmCompletion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVaccine) return;

    updateVaccinationStatus(selectedVaccine.id, 'completed', {
      administeredDate: adminDate,
      batchNumber: batchNo,
      facility: adminFacility,
      notes: adminNotes,
    });

    setMarkCompleteModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#159A9C]">
              National Immunization Program
            </span>
            <Badge variant="teal" size="sm">Illustrative Schedule</Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-[#172B4D] mt-1">
            Vaccination Tracking & Cold Chain Ledger
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tracking doses from birth (BCG, OPV-0) through adolescence boosters.
          </p>
        </div>

        {/* Progress Pill Card */}
        <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200/80 min-w-[220px]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-[#118183]">Registry Up-to-Date</span>
            <span className="font-extrabold text-[#118183]">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-teal-200/60 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-[#159A9C] h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <span className="text-[10px] text-teal-800 font-medium block mt-1">
            {completedCount} completed • {overdueCount} overdue • {dueCount} upcoming
          </span>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-medium flex items-center gap-2.5">
        <Info className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Illustrative Vaccination Schedule:</strong> This schedule is presented for prototype demonstration. In future production deployment, all vaccine codes, dose timings, and contraindications will be configured by qualified healthcare authorities.
        </span>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search vaccine or child..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:bg-white focus:outline-hidden"
            />
          </div>

          <select
            value={selectedChildFilter}
            onChange={(e) => setSelectedChildFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-hidden"
          >
            <option value="ALL">All Enrolled Children</option>
            {children.slice(0, 10).map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.uhid})
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-hidden"
          >
            <option value="ALL">All Vaccine Statuses</option>
            <option value="completed">Completed Doses</option>
            <option value="due">Due Soon</option>
            <option value="upcoming">Upcoming</option>
            <option value="overdue">Overdue Items</option>
          </select>
        </div>

        <span className="text-xs font-semibold text-slate-500">
          Showing <strong className="text-[#172B4D]">{filteredVaccines.length}</strong> records
        </span>
      </div>

      {/* Vaccination Records Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
              <th className="py-3 px-3">Vaccine Name</th>
              <th className="py-3 px-3">Child Name & UHID</th>
              <th className="py-3 px-3">Target Disease</th>
              <th className="py-3 px-3">Dose / Age Stage</th>
              <th className="py-3 px-3">Scheduled Due Date</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredVaccines.map((v) => {
              const child = children.find((c) => c.id === v.childId);
              let statusBadge = 'neutral';
              if (v.status === 'completed') statusBadge = 'success';
              else if (v.status === 'overdue') statusBadge = 'critical';
              else if (v.status === 'due') statusBadge = 'warning';
              else if (v.status === 'upcoming') statusBadge = 'teal';

              return (
                <tr key={v.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-bold text-[#172B4D]">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-[#EAF3FA] text-[#159A9C]">
                        <Syringe className="w-3.5 h-3.5" />
                      </div>
                      <span>{v.vaccineName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <strong className="text-[#172B4D] block">{child?.name || 'Child'}</strong>
                    <span className="text-[10px] text-slate-400 font-mono">{child?.uhid}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-600">{v.diseaseTarget}</td>
                  <td className="py-3 px-3 font-medium">
                    Dose {v.doseNumber} of {v.totalDoses} ({v.recommendedAgeLabel})
                  </td>
                  <td className="py-3 px-3 font-mono font-semibold">{v.dueDate}</td>
                  <td className="py-3 px-3">
                    <Badge variant={statusBadge as any} size="sm">
                      {v.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-right space-x-2">
                    {v.status !== 'completed' && (
                      <button
                        onClick={() => handleOpenMarkComplete(v)}
                        className="px-2.5 py-1 rounded-lg bg-[#23865B] hover:bg-emerald-700 text-white font-bold text-[11px] transition shadow-2xs"
                      >
                        Mark Complete
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedVaccine(v);
                        setDetailsModalOpen(true);
                      }}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-[11px] transition"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Vaccine Details Modal */}
      {selectedVaccine && (
        <Modal
          isOpen={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          title={`Vaccine Details: ${selectedVaccine.vaccineName}`}
          subtitle={`National Code: ${selectedVaccine.vaccineCode} • Target: ${selectedVaccine.diseaseTarget}`}
          maxWidth="md"
          footer={
            <button
              onClick={() => setDetailsModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-900"
            >
              Close
            </button>
          }
        >
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Dose Information</span>
              <p><strong>Dose Sequence:</strong> Dose {selectedVaccine.doseNumber} of {selectedVaccine.totalDoses}</p>
              <p><strong>Recommended Age:</strong> {selectedVaccine.recommendedAgeLabel}</p>
              <p><strong>Scheduled Due Date:</strong> {selectedVaccine.dueDate}</p>
              <p><strong>Status:</strong> {selectedVaccine.status}</p>
            </div>

            {selectedVaccine.administeredDate && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5 text-emerald-950">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block">Administration Record</span>
                <p><strong>Administered Date:</strong> {selectedVaccine.administeredDate}</p>
                <p><strong>Administered By:</strong> {selectedVaccine.administeredBy || 'Authorized Clinician'}</p>
                <p><strong>Facility:</strong> {selectedVaccine.facility || 'Community Health Centre'}</p>
                <p><strong>Batch / Lot Number:</strong> {selectedVaccine.batchNumber || 'BAT-2026-X99'}</p>
              </div>
            )}

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600">
              <strong>Clinical Guidance:</strong> Inspect vial monitor prior to injection. Keep child under 30-minute post-immunization observation for anaphylaxis surveillance.
            </div>
          </div>
        </Modal>
      )}

      {/* Mark Complete Modal */}
      {selectedVaccine && (
        <Modal
          isOpen={markCompleteModalOpen}
          onClose={() => setMarkCompleteModalOpen(false)}
          title="Mark Vaccination as Administered"
          subtitle={`Record completion for ${selectedVaccine.vaccineName}`}
          maxWidth="md"
          footer={
            <>
              <button
                type="button"
                onClick={() => setMarkCompleteModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="mark-complete-form"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#23865B] text-white hover:bg-emerald-700 transition shadow-xs"
              >
                Confirm Dose Administered
              </button>
            </>
          }
        >
          <form id="mark-complete-form" onSubmit={handleConfirmCompletion} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Date of Administration</label>
              <input
                type="date"
                required
                value={adminDate}
                onChange={(e) => setAdminDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Vaccine Batch / Lot Number</label>
              <input
                type="text"
                required
                value={batchNo}
                onChange={(e) => setBatchNo(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Administration Facility</label>
              <input
                type="text"
                required
                value={adminFacility}
                onChange={(e) => setAdminFacility(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Observation & Cold Chain Notes</label>
              <input
                type="text"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
