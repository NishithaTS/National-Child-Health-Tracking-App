import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';

interface CreateReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultChildId?: string;
}

export const CreateReferralModal: React.FC<CreateReferralModalProps> = ({
  isOpen,
  onClose,
  defaultChildId,
}) => {
  const { children, createReferral, currentUser } = useApp();

  const [childId, setChildId] = useState(defaultChildId || children[0]?.id || '');
  const [specialistType, setSpecialistType] = useState<any>('Pediatric Cardiology');
  const [destinationSpecialist, setDestinationSpecialist] = useState('Dr. Maya Venkatesh, DNB, FNB');
  const [urgency, setUrgency] = useState<'routine' | 'urgent' | 'high-priority'>('urgent');
  const [reason, setReason] = useState('Persistent heart murmur grade 2/6, require formal echocardiogram');
  const [clinicalSummary, setClinicalSummary] = useState(
    'Child is currently hemodynamically stable. Routine auscultation revealed systolic murmur loudest at left lower sternal border.'
  );

  const selectedChild = children.find((c) => c.id === childId) || children[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChild) return;

    // Calculate approximate age
    const dob = new Date(selectedChild.dateOfBirth);
    const now = new Date();
    const months = Math.round((now.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24 * 30.4375));
    const childAge = `${Math.floor(months / 12)} Years ${months % 12} Months`;

    createReferral({
      childId: selectedChild.id,
      childName: selectedChild.name,
      childUhid: selectedChild.uhid,
      childAge,
      referringDoctor: currentUser.name,
      referringFacility: currentUser.facility || 'Primary Health Centre',
      destinationSpecialist,
      specialistType,
      reason,
      urgency,
      clinicalSummary,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Pediatric Specialist Referral"
      subtitle="Forward case for secondary / tertiary clinical evaluation"
      maxWidth="lg"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="create-referral-form"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#159A9C] text-white hover:bg-[#118183] transition shadow-xs"
          >
            Dispatch Referral
          </button>
        </>
      }
    >
      <form id="create-referral-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Select Patient</label>
          <select
            value={childId}
            onChange={(e) => setChildId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
          >
            {children.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.uhid}) – {c.guardianName}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Specialty Discipline</label>
            <select
              value={specialistType}
              onChange={(e) => {
                setSpecialistType(e.target.value);
                if (e.target.value === 'Pediatric Cardiology') {
                  setDestinationSpecialist('Dr. Maya Venkatesh, DNB, FNB');
                } else if (e.target.value === 'Pediatric Pulmonology') {
                  setDestinationSpecialist('Dr. Preeti Deshmukh, MD');
                } else {
                  setDestinationSpecialist('Regional Child Development Clinic');
                }
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
            >
              <option value="Pediatric Cardiology">Pediatric Cardiology</option>
              <option value="Developmental Pediatrics">Developmental Pediatrics</option>
              <option value="Pediatric Neurology">Pediatric Neurology</option>
              <option value="Pediatric Pulmonology">Pediatric Pulmonology</option>
              <option value="Clinical Nutrition">Clinical Nutrition & Endocrinology</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Destination Specialist</label>
            <input
              type="text"
              value={destinationSpecialist}
              onChange={(e) => setDestinationSpecialist(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Clinical Urgency Tier</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'routine', label: 'Routine (within 30 days)', color: 'text-slate-700' },
              { id: 'urgent', label: 'Urgent (within 7 days)', color: 'text-amber-700' },
              { id: 'high-priority', label: 'High Priority (within 48 hrs)', color: 'text-rose-700' },
            ].map((tier) => (
              <label
                key={tier.id}
                className={`p-2 rounded-xl border text-xs font-semibold cursor-pointer text-center ${
                  urgency === tier.id ? 'border-[#159A9C] bg-[#EAF3FA] text-[#17365D]' : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                <input
                  type="radio"
                  name="urgency"
                  className="sr-only"
                  checked={urgency === tier.id}
                  onChange={() => setUrgency(tier.id as any)}
                />
                <span className={tier.color}>{tier.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Primary Referral Reason</label>
          <input
            type="text"
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Clinical Summary & Prior Findings</label>
          <textarea
            rows={3}
            required
            value={clinicalSummary}
            onChange={(e) => setClinicalSummary(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden resize-none"
          />
        </div>
      </form>
    </Modal>
  );
};
