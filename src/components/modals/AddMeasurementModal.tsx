import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';

interface AddMeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultChildId?: string;
}

export const AddMeasurementModal: React.FC<AddMeasurementModalProps> = ({
  isOpen,
  onClose,
  defaultChildId,
}) => {
  const { children, addGrowthMeasurement, currentUser } = useApp();

  const [childId, setChildId] = useState(defaultChildId || children[0]?.id || '');
  const [recordedDate, setRecordedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [heightCm, setHeightCm] = useState(90.5);
  const [weightKg, setWeightKg] = useState(13.2);
  const [headCircumferenceCm, setHeadCircumferenceCm] = useState(48.5);
  const [facility, setFacility] = useState(currentUser.facility || 'Primary Health Centre');
  const [clinicalNote, setClinicalNote] = useState('Routine checkup measurement.');

  const selectedChild = children.find((c) => c.id === childId) || children[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChild) return;

    // Calculate approximate age in months from DOB and recordedDate
    const birthDate = new Date(selectedChild.dateOfBirth);
    const measureDate = new Date(recordedDate);
    const ageMonths = Math.max(
      0,
      Math.round((measureDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.4375))
    );

    addGrowthMeasurement({
      childId: selectedChild.id,
      recordedDate,
      ageMonths,
      heightCm: Number(heightCm),
      weightKg: Number(weightKg),
      headCircumferenceCm: headCircumferenceCm ? Number(headCircumferenceCm) : undefined,
      recordedBy: currentUser.name,
      facility,
      clinicalNote,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Growth Measurement"
      subtitle="Log physical measurements to update height, weight, and BMI percentiles"
      maxWidth="md"
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
            form="add-measurement-form"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#159A9C] text-white hover:bg-[#118183] transition shadow-xs"
          >
            Save Measurement
          </button>
        </>
      }
    >
      <form id="add-measurement-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Select Child</label>
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
          <label className="block text-xs font-bold text-slate-700 mb-1">Date of Measurement</label>
          <input
            type="date"
            required
            value={recordedDate}
            onChange={(e) => setRecordedDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Height / Length (cm) *</label>
            <input
              type="number"
              step="0.1"
              required
              min="30"
              max="200"
              value={heightCm}
              onChange={(e) => setHeightCm(parseFloat(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Weight (kg) *</label>
            <input
              type="number"
              step="0.05"
              required
              min="1.0"
              max="100"
              value={weightKg}
              onChange={(e) => setWeightKg(parseFloat(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Head Circumference (cm) - Optional for infants/toddlers
          </label>
          <input
            type="number"
            step="0.1"
            min="25"
            max="65"
            value={headCircumferenceCm}
            onChange={(e) => setHeadCircumferenceCm(parseFloat(e.target.value))}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Facility / Location</label>
          <input
            type="text"
            value={facility}
            onChange={(e) => setFacility(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Clinical / Nutritional Note</label>
          <textarea
            rows={2}
            value={clinicalNote}
            onChange={(e) => setClinicalNote(e.target.value)}
            placeholder="e.g. Normal appetite, dietary diversity recommended"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden resize-none"
          />
        </div>
      </form>
    </Modal>
  );
};
