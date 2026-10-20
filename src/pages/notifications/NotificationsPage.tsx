import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { NotificationCategory, NotificationItem } from '../../types';
import {
  Bell,
  CheckCircle2,
  Filter,
  Syringe,
  CalendarCheck,
  GitBranch,
  AlertTriangle,
  ShieldCheck,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    unreadNotificationsCount,
    navigateTo,
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [selectedNotif, setSelectedNotif] = useState<NotificationItem | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const filteredNotifications = notifications.filter((n) => {
    if (categoryFilter === 'ALL') return true;
    return n.category === categoryFilter;
  });

  const getCategoryIcon = (category: NotificationCategory) => {
    switch (category) {
      case 'vaccinations':
        return <Syringe className="w-4 h-4 text-[#159A9C]" />;
      case 'appointments':
        return <CalendarCheck className="w-4 h-4 text-[#17365D]" />;
      case 'referrals':
        return <GitBranch className="w-4 h-4 text-purple-600" />;
      case 'follow-ups':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-slate-500" />;
    }
  };

  const handleOpenNotif = (n: NotificationItem) => {
    markNotificationRead(n.id);
    setSelectedNotif(n);
    setDetailModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#159A9C]">
              Real-Time Care Alerts
            </span>
            {unreadNotificationsCount > 0 && (
              <Badge variant="critical" size="sm">
                {unreadNotificationsCount} Unread Alerts
              </Badge>
            )}
          </div>
          <h2 className="text-2xl font-extrabold text-[#172B4D] mt-1">
            Notifications & Dispatch Centre
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Immunization due-dates, appointment reminders, referral status transitions, and audit alerts.
          </p>
        </div>

        {unreadNotificationsCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="px-4 py-2.5 rounded-xl bg-[#EAF3FA] hover:bg-[#d8ebfa] text-[#17365D] text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto"
          >
            <CheckCircle2 className="w-4 h-4 text-[#159A9C]" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'ALL', label: 'All Alerts' },
          { id: 'vaccinations', label: 'Vaccinations' },
          { id: 'appointments', label: 'Appointments' },
          { id: 'referrals', label: 'Referrals' },
          { id: 'follow-ups', label: 'Follow-ups' },
          { id: 'system', label: 'System Updates' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
              categoryFilter === cat.id
                ? 'bg-[#17365D] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs divide-y divide-slate-100">
        {filteredNotifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => handleOpenNotif(notif)}
            className={`py-4 px-3 rounded-2xl cursor-pointer transition flex items-start gap-4 ${
              !notif.read ? 'bg-sky-50/50 hover:bg-sky-50' : 'hover:bg-slate-50/80'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs shrink-0 mt-0.5">
              {getCategoryIcon(notif.category)}
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-[#172B4D] truncate">{notif.title}</h4>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] text-slate-400 font-mono">{notif.timestamp}</span>
                  {!notif.read && <span className="w-2 h-2 rounded-full bg-[#159A9C]" />}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                {notif.message}
              </p>

              <div className="flex items-center gap-3 pt-1 text-[11px]">
                <Badge variant="neutral" size="sm" className="capitalize">
                  {notif.category}
                </Badge>
                {notif.childName && (
                  <span className="text-slate-500 font-medium">Child: {notif.childName}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notification Details Modal */}
      {selectedNotif && (
        <Modal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          title={selectedNotif.title}
          subtitle={`Category: ${selectedNotif.category.toUpperCase()} • ${selectedNotif.timestamp}`}
          maxWidth="md"
          footer={
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => setDetailModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              {selectedNotif.linkPage && (
                <button
                  onClick={() => {
                    setDetailModalOpen(false);
                    navigateTo(selectedNotif.linkPage!);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#159A9C] text-white hover:bg-[#118183] flex items-center gap-1.5"
                >
                  <span>Go to Action Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          }
        >
          <div className="space-y-3 text-xs leading-relaxed text-slate-700">
            <p className="text-sm font-medium text-[#172B4D]">{selectedNotif.message}</p>
            {selectedNotif.childName && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>Associated Record:</strong> {selectedNotif.childName}
              </div>
            )}
            <p className="text-[11px] text-slate-400">
              Notification recorded in simulated local push registry.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};
