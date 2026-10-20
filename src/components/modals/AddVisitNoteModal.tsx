import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';

interface AddVisitNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultChildId?: string;
}

export const AddVisitNoteModal: React.FC<AddVisitNoteModalProps> = ({
  isOpen,
  onClose,
  defaultChildId,
}) => {
  const { children, addVisit, currentUser } = useApp();

  const [childId, setChildId] = useState(defaultChildId || children[0]?.id || '');
  const [visitDate, setVisitDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [visitType, setVisitType] = useState('Outpatient Health Consultation');
  const [chiefComplaints, setChiefComplaints] = useState('Mild cough and runny nose for 2 days. Feeding normally.');
  const [temperatureC, setTemperatureC] = useState(37.0);
  const [heartRateBpm, setHeartRateBpm] = useState(102);
  const [respiratoryRate, setRespiratoryRate] = useState(24);
  const [diagnosis, setDiagnosis] = useState('Acute viral upper respiratory tract infection (mild)');
  const [advice, setAdvice] = useState('Warm fluids, nasal saline drops before sleep, continue normal feeding.');
  const [followUpDays, setFollowUpDays] = useState(7);
  const [medicine, setMedicine] = useState('Nasal Saline Drops');
  const [dosage, setDosage] = useState('2 drops per nostril');
  const [frequency, setFrequency] = useState('TID before meals');
  const [days, setDays] = useState(5);

  const selectedChild = children.find((c) => c.id === childId) || children[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChild) return;

    addVisit({
      childId: selectedChild.id,
      visitDate,
      facility: currentUser.facility || 'Indiranagar Urban Health Centre',
      clinicianName: currentUser.name,
      clinicianRole: currentUser.roleTitle,
      visitType,
      chiefComplaints,
      temperatureC: Number(temperatureC),
      heartRateBpm: Number(heartRateBpm),
      respiratoryRate: Number(respiratoryRate),
      spO2: 99,
      diagnosis,
      prescriptions: [
        {
          medicine,
          dosage,
          frequency,
          days: Number(days),
        },
      ],
      advice,
      followUpDays: Number(followUpDays),
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Clinical Encounter Note"
      subtitle="Record consultation summary, vitals, diagnosis, and prescription"
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
            form="add-visit-note-form"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#159A9C] text-white hover:bg-[#118183] transition shadow-xs"
          >
            Save Clinical Note
          </button>
        </>
      }
    >
      <form id="add-visit-note-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Patient</label>
            <select
              value={childId}
              onChange={(e) => setChildId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
            >
              {children.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.uhid})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Visit Type</label>
            <input
              type="text"
              value={visitType}
              onChange={(e) => setVisitType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
            />
          </div>
        </div>

        {/* Vitals row */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Vital Signs
          </span>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-medium text-slate-600">Temp (°C)</label>
              <input
                type="number"
                step="0.1"
                value={temperatureC}
                onChange={(e) => setTemperatureC(parseFloat(e.target.value))}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600">Heart Rate (bpm)</label>
              <input
                type="number"
                value={heartRateBpm}
                onChange={(e) => setHeartRateBpm(parseInt(e.target.value))}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600">Resp Rate (/min)</label>
              <input
                type="number"
                value={respiratoryRate}
                onChange={(e) => setRespiratoryRate(parseInt(e.target.value))}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Chief Complaints</label>
          <textarea
            rows={2}
            required
            value={chiefComplaints}
            onChange={(e) => setChiefComplaints(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Clinical Diagnosis</label>
          <input
            type="text"
            required
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
          />
        </div>

        {/* Prescription item */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Medication Prescription
          </span>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-medium text-slate-600">Medicine</label>
              <input
                type="text"
                value={medicine}
                onChange={(e) => setMedicine(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600">Dosage</label>
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-medium text-slate-600">Frequency</label>
              <input
                type="text"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600">Duration (Days)</label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Clinical Advice</label>
          <input
            type="text"
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
          />
        </div>
      </form>
    </Modal>
  );
};
