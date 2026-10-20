import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { CreateReferralModal } from '../../components/modals/CreateReferralModal';
import { Referral, ReferralStatus } from '../../types';
import {
  GitBranch,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Send,
  CalendarCheck,
  Search,
  Filter,
  ChevronRight,
  FileText,
  UserCheck,
} from 'lucide-react';

export const ReferralsPage: React.FC = () => {
  const { referrals, updateReferralStatus } = useApp();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [newStatus, setNewStatus] = useState<ReferralStatus>('in-review');
  const [statusNote, setStatusNote] = useState('');

  const pipelineStages: { id: ReferralStatus; label: string }[] = [
    { id: 'draft', label: 'Draft' },
    { id: 'submitted', label: 'Submitted' },
    { id: 'accepted', label: 'Accepted' },
    { id: 'appointment-scheduled', label: 'Appt Scheduled' },
    { id: 'in-review', label: 'In Review' },
    { id: 'recommendations-returned', label: 'Recs Returned' },
    { id: 'closed', label: 'Closed' },
  ];

  const totalReferrals = referrals.length;
  const pendingReferrals = referrals.filter((r) => r.status === 'submitted' || r.status === 'accepted').length;
  const inReviewReferrals = referrals.filter((r) => r.status === 'in-review' || r.status === 'appointment-scheduled').length;
  const completedReferrals = referrals.filter((r) => r.status === 'recommendations-returned' || r.status === 'closed').length;

  const filteredReferrals = referrals.filter((r) => {
    if (statusFilter === 'ALL') return true;
    return r.status === statusFilter;
  });

  const handleOpenDetails = (r: Referral) => {
    setSelectedReferral(r);
    setNewStatus(r.status);
    setStatusNote('');
    setDetailsModalOpen(true);
  };

  const handleAdvanceStatus = () => {
    if (!selectedReferral) return;
    updateReferralStatus(selectedReferral.id, newStatus, statusNote);
    setDetailsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#159A9C]">
              Pediatric Tele-Triage & Specialist Network
            </span>
            <Badge variant="teal" size="sm">7-Stage Closed-Loop Pipeline</Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-[#172B4D] mt-1">
            Referral Tracking & Care Coordination
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Connecting primary clinics to tertiary cardiology, neurology, and developmental pediatrics.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#159A9C] text-white hover:bg-[#118183] text-xs font-bold transition shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Referral</span>
        </button>
      </div>

      {/* Visual Pipeline Progression Ribbon */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Standardized Care Coordination Pipeline
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {pipelineStages.map((stage, idx) => (
            <div
              key={stage.id}
              className="p-3 rounded-2xl bg-[#F7F9FC] border border-slate-200 text-center relative"
            >
              <span className="w-5 h-5 rounded-full bg-[#17365D] text-white text-[10px] font-bold inline-flex items-center justify-center mb-1.5">
                {idx + 1}
              </span>
              <p className="text-xs font-bold text-[#172B4D]">{stage.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Referrals"
          value={totalReferrals}
          subtitle="All active & historical"
          icon={GitBranch}
          variant="blue"
        />
        <StatCard
          title="Pending Triage"
          value={pendingReferrals}
          subtitle="Awaiting specialist review"
          icon={Clock}
          variant="amber"
        />
        <StatCard
          title="In Review & Scheduled"
          value={inReviewReferrals}
          subtitle="Diagnostic workups in progress"
          icon={CalendarCheck}
          variant="teal"
        />
        <StatCard
          title="Completed / Closed"
          value={completedReferrals}
          subtitle="Recommendations dispatched"
          icon={CheckCircle2}
          variant="emerald"
        />
      </div>

      {/* Filter and Referral Cards */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-[#172B4D]">Active Referral Caseload</h3>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-hidden"
          >
            <option value="ALL">All Pipeline Stages</option>
            {pipelineStages.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {filteredReferrals.map((ref) => (
            <div
              key={ref.id}
              className="p-5 rounded-2xl border border-slate-200 bg-[#F7F9FC] hover:bg-white hover:border-[#159A9C]/40 transition space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#159A9C] bg-[#EAF3FA] px-2 py-0.5 rounded-md">
                    {ref.id.toUpperCase()}
                  </span>
                  <span className="text-sm font-extrabold text-[#172B4D]">{ref.childName}</span>
                  <span className="text-xs text-slate-500 font-medium">({ref.childAge})</span>
                  <Badge
                    variant={ref.urgency === 'high-priority' ? 'critical' : ref.urgency === 'urgent' ? 'warning' : 'navy'}
                    size="sm"
                  >
                    {ref.urgency}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#EAF3FA] text-[#17365D] font-bold text-xs capitalize">
                    {ref.status.replace('-', ' ')}
                  </span>
                  <button
                    onClick={() => handleOpenDetails(ref)}
                    className="px-3 py-1.5 rounded-xl bg-[#159A9C] text-white text-xs font-bold hover:bg-[#118183] transition shadow-xs flex items-center gap-1"
                  >
                    <span>Inspect Pipeline</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600">
                <p>
                  <strong>Referring Provider:</strong> {ref.referringDoctor} ({ref.referringFacility})
                </p>
                <p>
                  <strong>Destination Specialist:</strong> {ref.destinationSpecialist} ({ref.specialistType})
                </p>
                <p className="md:col-span-2">
                  <strong>Reason:</strong> {ref.reason}
                </p>
              </div>

              {/* Progress Mini Step Tracker */}
              <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-400">Timeline Trail:</span>
                {ref.timeline.map((step, idx) => (
                  <span key={idx} className="flex items-center gap-1">
                    <span className="font-bold text-slate-700">{step.label}</span>
                    {idx < ref.timeline.length - 1 && <span className="text-slate-300">→</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details & Status Transition Modal */}
      {selectedReferral && (
        <Modal
          isOpen={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          title={`Referral Pipeline: ${selectedReferral.childName}`}
          subtitle={`Case: ${selectedReferral.id} • ${selectedReferral.specialistType}`}
          maxWidth="lg"
          footer={
            <>
              <button
                type="button"
                onClick={() => setDetailsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleAdvanceStatus}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#159A9C] text-white hover:bg-[#118183]"
              >
                Apply Stage Transition
              </button>
            </>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <p><strong>Clinical Reason:</strong> {selectedReferral.reason}</p>
              <p><strong>Clinical Summary:</strong> {selectedReferral.clinicalSummary}</p>
              {selectedReferral.specialistNotes && (
                <div className="p-2.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-950 font-medium">
                  <strong>Specialist Notes:</strong> {selectedReferral.specialistNotes}
                </div>
              )}
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Advance / Update Pipeline Stage
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as ReferralStatus)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold"
              >
                {pipelineStages.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Clinical Audit Step Note
              </label>
              <input
                type="text"
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="e.g. Echocardiogram completed, normal chamber dimensions confirmed"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div>
              <span className="block font-bold text-slate-700 mb-2">Step History</span>
              <div className="space-y-1.5 pl-3 border-l-2 border-[#159A9C]">
                {selectedReferral.timeline.map((step, i) => (
                  <div key={i}>
                    <span className="font-bold text-[#172B4D]">{step.label}</span>
                    <span className="text-[10px] text-slate-400 ml-2">{step.date} by {step.actor}</span>
                    {step.note && <p className="text-slate-600 text-[11px]">{step.note}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      <CreateReferralModal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} />
    </div>
  );
};
