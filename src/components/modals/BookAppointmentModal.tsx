import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { AppointmentType } from '../../types';

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultChildId?: string;
}

export const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  isOpen,
  onClose,
  defaultChildId,
}) => {
  const { children, facilities, bookAppointment, currentUser } = useApp();

  const [childId, setChildId] = useState(defaultChildId || children[0]?.id || '');
  const [facility, setFacility] = useState(facilities[0]?.name || '');
  const [appointmentType, setAppointmentType] = useState<AppointmentType>('Routine Child Health Checkup');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('10:00 AM');
  const [priority, setPriority] = useState<'Routine' | 'Urgent'>('Routine');
  const [reason, setReason] = useState('Routine well-child milestone checkup and growth review.');
  const [notes, setNotes] = useState('');

  const selectedChild = children.find((c) => c.id === childId) || children[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChild) return;

    bookAppointment({
      childId: selectedChild.id,
      childName: selectedChild.name,
      childUhid: selectedChild.uhid,
      providerId: 'usr-doc-01',
      providerName: 'Dr. Rajesh Kulkarni',
      providerRole: 'Pediatric Care Team',
      facility,
      appointmentType,
      date,
      time,
      priority,
      reason,
      notes,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Book Health Appointment (Simulated)"
      subtitle="Schedule a consultation, immunization, or routine growth evaluation"
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
            form="book-appointment-form"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#159A9C] text-white hover:bg-[#118183] transition shadow-xs"
          >
            Confirm Simulated Booking
          </button>
        </>
      }
    >
      <form id="book-appointment-form" onSubmit={handleSubmit} className="space-y-4">
        {/* Child Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Select Child</label>
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

        {/* Appointment Type */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Appointment Type</label>
          <select
            value={appointmentType}
            onChange={(e) => setAppointmentType(e.target.value as AppointmentType)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
          >
            <option value="Routine Child Health Checkup">Routine Child Health Checkup</option>
            <option value="Vaccination Dose">Vaccination Dose Administration</option>
            <option value="Growth & Nutrition Evaluation">Growth & Nutrition Evaluation</option>
            <option value="Pediatric Specialist Consultation">Pediatric Specialist Consultation</option>
            <option value="Post-Hospital Follow-up">Post-Hospital Follow-up</option>
            <option value="Field Worker Home Visit">Field Worker Home Visit</option>
          </select>
        </div>

        {/* Facility Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Healthcare Facility</label>
          <select
            value={facility}
            onChange={(e) => setFacility(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
          >
            {facilities.map((f) => (
              <option key={f.id} value={f.name}>
                {f.name} ({f.city})
              </option>
            ))}
          </select>
        </div>

        {/* Date and Time Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time Slot</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
            >
              <option value="09:00 AM">09:00 AM – 09:30 AM</option>
              <option value="09:45 AM">09:45 AM – 10:15 AM</option>
              <option value="10:30 AM">10:30 AM – 11:00 AM</option>
              <option value="11:15 AM">11:15 AM – 11:45 AM</option>
              <option value="02:00 PM">02:00 PM – 02:30 PM</option>
              <option value="03:00 PM">03:00 PM – 03:30 PM</option>
              <option value="04:00 PM">04:00 PM – 04:30 PM</option>
            </select>
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Priority</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="radio"
                name="priority"
                checked={priority === 'Routine'}
                onChange={() => setPriority('Routine')}
                className="text-[#159A9C] focus:ring-[#159A9C]"
              />
              Routine
            </label>
            <label className="flex items-center gap-2 text-xs font-medium text-rose-700 cursor-pointer">
              <input
                type="radio"
                name="priority"
                checked={priority === 'Urgent'}
                onChange={() => setPriority('Urgent')}
                className="text-rose-600 focus:ring-rose-500"
              />
              Urgent / Follow-up Attention Needed
            </label>
          </div>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Reason for Visit</label>
          <input
            type="text"
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
            placeholder="e.g. 24-month booster dose, fever evaluation"
          />
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Clinical / Family Notes (Optional)</label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden resize-none"
            placeholder="Any special instructions or prior symptoms"
          />
        </div>
      </form>
    </Modal>
  );
};
