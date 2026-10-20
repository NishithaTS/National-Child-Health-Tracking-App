import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { ResponsibleAiInsight } from '../../types';
import {
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Filter,
  FileCheck,
  ChevronRight,
  TrendingDown,
  Syringe,
  Clock,
  Eye,
} from 'lucide-react';

export const ResponsibleAiInsightsPage: React.FC = () => {
  const { aiInsights, reviewAiInsight, dismissAiInsight, navigateTo, setSelectedChildId } = useApp();

  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedInsight, setSelectedInsight] = useState<ResponsibleAiInsight | null>(null);
  const [reviewNoteInput, setReviewNoteInput] = useState('');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const pendingCount = aiInsights.filter((a) => a.status === 'pending-review').length;
  const reviewedCount = aiInsights.filter((a) => a.status === 'reviewed').length;

  const filteredInsights = aiInsights.filter((item) => {
    const matchesCategory = filterCategory === 'ALL' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'ALL' || item.status === filterStatus;
    return matchesCategory && matchesStatus;
  });

  const handleOpenReview = (item: ResponsibleAiInsight) => {
    setSelectedInsight(item);
    setReviewNoteInput(item.reviewNotes || '');
    setReviewModalOpen(true);
  };

  const handleConfirmReview = () => {
    if (!selectedInsight) return;
    reviewAiInsight(selectedInsight.id, reviewNoteInput);
    setReviewModalOpen(false);
  };

  const handleDismiss = (id: string) => {
    dismissAiInsight(id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#159A9C]">
              Safety Surveillance & Quality Control
            </span>
            <Badge variant="teal" size="sm">Rule-Based Clinical Flags</Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-[#172B4D] mt-1 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#159A9C]" />
            <span>Responsible AI Insights & Audit Checks</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Automated verification of missing metrics, transcription inconsistencies, and immunization drop-offs.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Badge variant={pendingCount > 0 ? 'warning' : 'success'} size="md">
            {pendingCount} Pending Clinician Review
          </Badge>
        </div>
      </div>

      {/* Mandatory Clinical Governance Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-950 text-xs font-medium space-y-1">
        <div className="flex items-center gap-2 font-bold text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Demonstration insights only — not for clinical decision-making.</span>
        </div>
        <p className="text-[11px] leading-relaxed text-amber-800 pl-6">
          All insight rules evaluate deterministic parameters (such as elapsed days without recorded measurements, vaccine drop-off triggers, or percentile shifts). These flags do not formulate medical diagnoses or prescribe treatment, and are designed strictly to assist human health workers and clinicians.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <label className="font-bold text-slate-600 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#159A9C]" />
            <span>Filter Category:</span>
          </label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold focus:outline-hidden"
          >
            <option value="ALL">All Rule Categories</option>
            <option value="Vaccine Drop-off">Vaccine Drop-off Alerts</option>
            <option value="Growth Velocity Alert">Growth Velocity Alerts</option>
            <option value="Overdue Follow-up">Overdue Follow-ups</option>
            <option value="Missing Measurements">Missing Measurements</option>
            <option value="Inconsistent Entry">Inconsistent Entries</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold focus:outline-hidden"
          >
            <option value="ALL">All Review Statuses</option>
            <option value="pending-review">Pending Clinician Review ({pendingCount})</option>
            <option value="reviewed">Reviewed & Acknowledged ({reviewedCount})</option>
            <option value="dismissed">Dismissed</option>
          </select>
        </div>

        <span className="text-slate-500 font-medium">
          Showing <strong>{filteredInsights.length}</strong> items
        </span>
      </div>

      {/* Insights Cards List */}
      <div className="space-y-4">
        {filteredInsights.map((insight) => {
          let priorityBadge = 'neutral';
          if (insight.priority === 'high') priorityBadge = 'critical';
          else if (insight.priority === 'medium') priorityBadge = 'warning';
          else priorityBadge = 'teal';

          return (
            <div
              key={insight.id}
              className={`p-6 rounded-3xl border transition-all ${
                insight.status === 'pending-review'
                  ? 'bg-white border-slate-200/90 shadow-xs hover:shadow-md'
                  : 'bg-slate-50/70 border-slate-200 opacity-80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-[#172B4D]">{insight.category}</span>
                    <Badge variant={priorityBadge as any} size="sm">
                      {insight.priority} priority
                    </Badge>
                    <Badge
                      variant={insight.status === 'reviewed' ? 'success' : insight.status === 'dismissed' ? 'neutral' : 'warning'}
                      size="sm"
                    >
                      {insight.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500">
                    Flagged for: <strong className="text-[#172B4D]">{insight.childName}</strong> ({insight.childUhid}) • Detected on {insight.detectedDate}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {insight.status === 'pending-review' && (
                    <>
                      <button
                        onClick={() => handleOpenReview(insight)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#159A9C] text-white hover:bg-[#118183] text-xs font-bold transition shadow-2xs flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Acknowledge & Sign</span>
                      </button>
                      <button
                        onClick={() => handleDismiss(insight.id)}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold transition"
                      >
                        Dismiss
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => {
                      setSelectedChildId(insight.childId);
                      navigateTo(`/child-profiles/${insight.childId}`);
                    }}
                    className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
                    title="Open Record"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Flag Details & Next Steps */}
              <div className="space-y-2 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Flag Reason</span>
                  <p className="text-slate-700 leading-relaxed font-medium">{insight.flagReason}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/60 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#118183] block">Suggested Next Step</span>
                  <p className="text-teal-950 font-medium leading-relaxed">{insight.suggestedNextStep}</p>
                </div>

                {insight.reviewNotes && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px]">
                    <strong>Clinician Review Sign-off:</strong> {insight.reviewNotes}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Review Modal */}
      {selectedInsight && (
        <Modal
          isOpen={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          title="Clinical Review Sign-off"
          subtitle={`Insight #${selectedInsight.id} for ${selectedInsight.childName}`}
          maxWidth="md"
          footer={
            <>
              <button
                type="button"
                onClick={() => setReviewModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReview}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#159A9C] text-white hover:bg-[#118183]"
              >
                Sign & Save Review
              </button>
            </>
          }
        >
          <div className="space-y-3 text-xs">
            <p className="text-slate-600">
              Confirm that you have reviewed the flagged item and documented necessary clinical outreach or corrections.
            </p>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Clinician Review Note
              </label>
              <textarea
                rows={3}
                value={reviewNoteInput}
                onChange={(e) => setReviewNoteInput(e.target.value)}
                placeholder="e.g. Scheduled home outreach visit with ASHA worker for Oct 22"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white resize-none"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
