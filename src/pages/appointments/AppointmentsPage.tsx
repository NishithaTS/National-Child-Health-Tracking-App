import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { BookAppointmentModal } from '../../components/modals/BookAppointmentModal';
import { Appointment, AppointmentStatus } from '../../types';
import {
  CalendarDays,
  PlusCircle,
  Search,
  Filter,
  Clock,
  MapPin,
  Stethoscope,
  CheckCircle2,
  XCircle,
  Calendar,
  AlertCircle,
  CalendarCheck,
} from 'lucide-react';

export const AppointmentsPage: React.FC = () => {
  const { appointments, updateAppointmentStatus, rescheduleAppointment, children, addToast } = useApp();

  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  // Details Modal
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  // Reschedule Modal
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [newDate, setNewDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [newTime, setNewTime] = useState('11:00 AM');

  // Filtered appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const matchesStatus = statusFilter === 'ALL' || apt.status === statusFilter;
      const matchesSearch =
        apt.childName.toLowerCase().includes(search.toLowerCase()) ||
        apt.appointmentType.toLowerCase().includes(search.toLowerCase()) ||
        apt.facility.toLowerCase().includes(search.toLowerCase()) ||
        apt.providerName.toLowerCase().includes(search.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [appointments, statusFilter, search]);

  const upcomingCount = appointments.filter((a) => a.status === 'scheduled').length;
  const completedCount = appointments.filter((a) => a.status === 'completed').length;

  const handleOpenReschedule = (apt: Appointment) => {
    setSelectedAppointment(apt);
    setNewDate(apt.date);
    setNewTime(apt.time);
    setRescheduleModalOpen(true);
  };

  const handleConfirmReschedule = () => {
    if (!selectedAppointment) return;
    rescheduleAppointment(selectedAppointment.id, newDate, newTime);
    setRescheduleModalOpen(false);
  };

  const handleCancel = (apt: Appointment) => {
    updateAppointmentStatus(apt.id, 'cancelled', 'Cancelled by user request in simulation.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#159A9C]">
              Coordinated Care Scheduling
            </span>
            <Badge variant="teal" size="sm">Simulated Bookings</Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-[#172B4D] mt-1">
            Appointments & Outreach Schedule
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage routine checkups, immunization camps, and specialist consultations.
          </p>
        </div>

        <button
          onClick={() => setBookModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#159A9C] text-white hover:bg-[#118183] text-xs font-bold transition shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Book New Appointment</span>
        </button>
      </div>

      {/* Filter and View Mode Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search appointment, child, or clinic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:bg-white focus:outline-hidden"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-hidden"
          >
            <option value="ALL">All Statuses ({appointments.length})</option>
            <option value="scheduled">Upcoming / Scheduled ({upcomingCount})</option>
            <option value="completed">Completed Visits ({completedCount})</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center border border-slate-200 rounded-xl p-0.5 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 rounded-lg transition ${
              viewMode === 'list' ? 'bg-white shadow-2xs text-[#17365D]' : 'text-slate-500'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-1 rounded-lg transition ${
              viewMode === 'calendar' ? 'bg-white shadow-2xs text-[#17365D]' : 'text-slate-500'
            }`}
          >
            Calendar View
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        /* List View */
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#172B4D]">Appointments Directory</h3>
            <span className="text-xs text-slate-400 font-semibold">
              Showing {filteredAppointments.length} appointments
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredAppointments.map((apt) => {
              let statusBadge = 'neutral';
              if (apt.status === 'scheduled') statusBadge = 'teal';
              else if (apt.status === 'completed') statusBadge = 'success';
              else if (apt.status === 'cancelled') statusBadge = 'critical';

              return (
                <div
                  key={apt.id}
                  className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 rounded-2xl px-3 transition"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-[#172B4D]">{apt.childName}</span>
                      <span className="font-mono text-[10px] text-slate-400">({apt.childUhid})</span>
                      <Badge variant={statusBadge as any} size="sm">
                        {apt.status}
                      </Badge>
                      <Badge variant={apt.priority === 'Urgent' ? 'critical' : 'navy'} size="sm">
                        {apt.priority}
                      </Badge>
                    </div>

                    <h4 className="text-sm font-extrabold text-[#172B4D]">{apt.appointmentType}</h4>
                    <p className="text-xs text-slate-600">
                      Reason: {apt.reason}
                    </p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span>{apt.providerName} ({apt.providerRole})</span>
                      <span>•</span>
                      <span>{apt.facility}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right sm:border-r sm:border-slate-100 sm:pr-4">
                      <span className="text-xs font-bold text-[#172B4D] block">{apt.date}</span>
                      <span className="text-[11px] text-[#159A9C] font-semibold">{apt.time}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {apt.status === 'scheduled' && (
                        <>
                          <button
                            onClick={() => handleOpenReschedule(apt)}
                            className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => handleCancel(apt)}
                            className="px-2.5 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => {
                          setSelectedAppointment(apt);
                          setDetailsModalOpen(true);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-[#EAF3FA] hover:bg-[#d8ebfa] text-[#17365D] text-xs font-bold transition"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Calendar Grid View */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-extrabold text-[#172B4D]">October – November 2026 Schedule</h3>
            <span className="text-xs text-slate-500 font-semibold">Simulated calendar slots</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['2026-10-22', '2026-10-24', '2026-10-28', '2026-11-05', '2026-11-14'].map((day) => {
              const dayApts = appointments.filter((a) => a.date === day);
              const dayDate = new Date(day);
              return (
                <div key={day} className="p-4 rounded-2xl bg-[#F7F9FC] border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-extrabold text-xs text-[#17365D]">{day}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">
                      {dayApts.length} Slots Booked
                    </span>
                  </div>

                  {dayApts.length > 0 ? (
                    dayApts.map((apt) => (
                      <div key={apt.id} className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#172B4D]">{apt.time}</span>
                          <Badge variant={apt.priority === 'Urgent' ? 'critical' : 'teal'} size="sm">
                            {apt.priority}
                          </Badge>
                        </div>
                        <p className="font-semibold text-slate-800">{apt.childName}</p>
                        <p className="text-[11px] text-slate-500 truncate">{apt.appointmentType}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-[11px] text-slate-400 py-3 text-center">Open clinic schedule</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <Modal
          isOpen={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          title="Appointment Details (Simulated)"
          subtitle={`Booking Reference: ${selectedAppointment.id}`}
          maxWidth="md"
          footer={
            <button
              onClick={() => setDetailsModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#17365D] text-white"
            >
              Close
            </button>
          }
        >
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <p><strong>Child:</strong> {selectedAppointment.childName} ({selectedAppointment.childUhid})</p>
              <p><strong>Type:</strong> {selectedAppointment.appointmentType}</p>
              <p><strong>Scheduled Slot:</strong> {selectedAppointment.date} at {selectedAppointment.time}</p>
              <p><strong>Clinician:</strong> {selectedAppointment.providerName} ({selectedAppointment.providerRole})</p>
              <p><strong>Facility:</strong> {selectedAppointment.facility}</p>
              <p><strong>Status:</strong> {selectedAppointment.status}</p>
              <p><strong>Clinical Reason:</strong> {selectedAppointment.reason}</p>
              {selectedAppointment.notes && (
                <p><strong>Notes:</strong> {selectedAppointment.notes}</p>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Reschedule Modal */}
      {selectedAppointment && (
        <Modal
          isOpen={rescheduleModalOpen}
          onClose={() => setRescheduleModalOpen(false)}
          title="Reschedule Appointment"
          subtitle={`Updating booking for ${selectedAppointment.childName}`}
          maxWidth="sm"
          footer={
            <>
              <button
                type="button"
                onClick={() => setRescheduleModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReschedule}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#159A9C] text-white hover:bg-[#118183]"
              >
                Confirm Reschedule
              </button>
            </>
          }
        >
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">New Date</label>
              <input
                type="date"
                required
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">New Time Slot</label>
              <select
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              >
                <option value="09:30 AM">09:30 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="11:15 AM">11:15 AM</option>
                <option value="02:30 PM">02:30 PM</option>
                <option value="04:00 PM">04:00 PM</option>
              </select>
            </div>
          </div>
        </Modal>
      )}

      <BookAppointmentModal isOpen={bookModalOpen} onClose={() => setBookModalOpen(false)} />
    </div>
  );
};
