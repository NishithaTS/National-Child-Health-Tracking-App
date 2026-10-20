import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Referral, ReferralStatus } from '../../types';
import {
  Sparkles,
  GitBranch,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  UserCheck,
  Send,
  CalendarCheck,
  ChevronRight,
  Stethoscope,
  Heart,
} from 'lucide-react';

export const SpecialistDashboard: React.FC = () => {
  const { currentUser, referrals, updateReferralStatus, navigateTo, setSelectedChildId } = useApp();

  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [specialistNoteInput, setSpecialistNoteInput] = useState('');
  const [targetStatus, setTargetStatus] = useState<ReferralStatus>('in-review');

  // Categorized referrals
  const activeReferrals = referrals.filter((r) => r.status !== 'closed');
  const highPriorityCases = referrals.filter((r) => r.urgency === 'high-priority');
  const inReviewCases = referrals.filter((r) => r.status === 'in-review');
  const returnedCases = referrals.filter((r) => r.status === 'recommendations-returned' || r.status === 'closed');

  const handleOpenReferral = (ref: Referral) => {
    setSelectedReferral(ref);
    setSpecialistNoteInput(ref.specialistNotes || '');
    setTargetStatus(ref.status);
    setDetailModalOpen(true);
  };

  const handleSaveReferralUpdate = () => {
    if (!selectedReferral) return;
    updateReferralStatus(selectedReferral.id, targetStatus, specialistNoteInput);
    setDetailModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Specialist Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-purple-50"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172B4D]">{currentUser.name}</h2>
              <Badge variant="navy" size="sm">Tertiary Specialist</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {currentUser.roleTitle} • {currentUser.facility}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('/referrals')}
          className="px-4 py-2.5 rounded-xl bg-[#17365D] text-white text-xs font-bold hover:bg-[#1d4373] transition shadow-xs flex items-center gap-1.5 self-start md:self-auto"
        >
          <GitBranch className="w-3.5 h-3.5" />
          <span>View Master Referral Pipeline</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Incoming Referrals"
          value={activeReferrals.length}
          subtitle="Triage & evaluation queue"
          icon={GitBranch}
          variant="purple"
        />
        <StatCard
          title="High Priority"
          value={highPriorityCases.length}
          subtitle="Triage & review within 48h"
          icon={AlertTriangle}
          variant="rose"
        />
        <StatCard
          title="Cases In Review"
          value={inReviewCases.length}
          subtitle="Diagnostic workups"
          icon={Clock}
          variant="amber"
        />
        <StatCard
          title="Recommendations Dispatched"
          value={returnedCases.length}
          subtitle="Returned to primary care"
          icon={CheckCircle2}
          variant="emerald"
        />
      </div>

      {/* Main Section: Referral Queue with interactive review */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#172B4D]">Specialist Referral Triage Queue</h3>
            <p className="text-xs text-slate-500">
              Select any case below to examine patient records, evaluate echocardiogram/screening findings, and return treatment advice.
            </p>
          </div>
          <Badge variant="teal" size="sm">
            {activeReferrals.length} Active Cases
          </Badge>
        </div>

        <div className="divide-y divide-slate-100">
          {referrals.map((ref) => {
            let urgencyBadge = 'neutral';
            if (ref.urgency === 'high-priority') urgencyBadge = 'critical';
            else if (ref.urgency === 'urgent') urgencyBadge = 'warning';

            return (
              <div
                key={ref.id}
                className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 rounded-2xl px-3 transition"
              >
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-[#172B4D]">{ref.childName}</span>
                    <span className="text-xs text-slate-500">({ref.childAge})</span>
                    <Badge variant={urgencyBadge as any} size="sm">
                      {ref.urgency.replace('-', ' ')}
                    </Badge>
                    <span className="text-[11px] font-semibold text-[#159A9C]">
                      {ref.specialistType}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium">
                    <strong>Reason:</strong> {ref.reason}
                  </p>

                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    Referring: {ref.referringDoctor} ({ref.referringFacility}) • Created {ref.createdDate}
                  </p>

                  {/* Status indicator */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-600">
                    <span className="font-semibold text-slate-400">Status:</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#EAF3FA] text-[#17365D] font-bold">
                      {ref.status.replace('-', ' ')}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span>{ref.timeline.length} pipeline updates</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenReferral(ref)}
                    className="px-4 py-2 rounded-xl bg-[#159A9C] text-white text-xs font-bold hover:bg-[#118183] transition shadow-xs flex items-center gap-1.5"
                  >
                    <span>Review Case & Advise</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedChildId(ref.childId);
                      navigateTo(`/child-profiles/${ref.childId}`);
                    }}
                    className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Full Record
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Referral Review Modal */}
      {selectedReferral && (
        <Modal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          title={`Clinical Specialist Review: ${selectedReferral.childName}`}
          subtitle={`Referral ID: ${selectedReferral.id} • ${selectedReferral.specialistType}`}
          maxWidth="2xl"
          footer={
            <>
              <button
                type="button"
                onClick={() => setDetailModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSaveReferralUpdate}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#159A9C] text-white hover:bg-[#118183] flex items-center gap-1.5 transition shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Specialist Recommendation & Update Pipeline</span>
              </button>
            </>
          }
        >
          <div className="space-y-4">
            {/* Case Background Card */}
            <div className="p-4 rounded-2xl bg-[#F7F9FC] border border-slate-200 space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Child Details</span>
                  <strong className="text-[#172B4D]">{selectedReferral.childName} ({selectedReferral.childAge})</strong>
                  <p className="text-slate-500 text-[11px]">{selectedReferral.childUhid}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Referring Provider</span>
                  <strong className="text-[#172B4D]">{selectedReferral.referringDoctor}</strong>
                  <p className="text-slate-500 text-[11px]">{selectedReferral.referringFacility}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Primary Reason for Specialist Triage</span>
                <p className="text-[#172B4D] font-medium mt-0.5">{selectedReferral.reason}</p>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Clinical Summary</span>
                <p className="text-slate-600 leading-relaxed mt-0.5">{selectedReferral.clinicalSummary}</p>
              </div>
            </div>

            {/* Pipeline Stage Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Update Referral Stage
              </label>
              <select
                value={targetStatus}
                onChange={(e) => setTargetStatus(e.target.value as ReferralStatus)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
              >
                <option value="accepted">Accepted (Triage approved)</option>
                <option value="appointment-scheduled">Appointment Scheduled</option>
                <option value="in-review">In Review (Evaluating diagnostics / echocardiogram)</option>
                <option value="recommendations-returned">Recommendations Returned (Dispatch care plan to primary care)</option>
                <option value="closed">Closed (Case completed)</option>
              </select>
            </div>

            {/* Specialist Notes / Recommendations */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Specialist Clinical Findings & Recommendations
              </label>
              <textarea
                rows={4}
                value={specialistNoteInput}
                onChange={(e) => setSpecialistNoteInput(e.target.value)}
                placeholder="Detail echocardiogram interpretation, developmental therapy goals, medication adjustments, or next review timeframe..."
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden resize-none leading-relaxed"
              />
            </div>

            {/* Prior Timeline Steps */}
            <div>
              <span className="block text-xs font-bold text-slate-700 mb-2">Referral Audit Trail</span>
              <div className="space-y-1.5 border-l-2 border-[#159A9C]/40 ml-2 pl-3">
                {selectedReferral.timeline.map((step, idx) => (
                  <div key={idx} className="text-xs">
                    <span className="font-bold text-[#172B4D]">{step.label}</span>
                    <span className="text-slate-400 text-[10px] ml-2">
                      {step.date} by {step.actor}
                    </span>
                    {step.note && <p className="text-slate-600 text-[11px] mt-0.5">{step.note}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
