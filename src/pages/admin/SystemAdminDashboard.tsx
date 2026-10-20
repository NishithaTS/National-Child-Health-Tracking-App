import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { DEMO_USERS } from '../../data/mockData';
import { RoleId } from '../../types';
import {
  ShieldCheck,
  Users,
  Building2,
  Server,
  Activity,
  UserPlus,
  RefreshCw,
  Search,
  CheckCircle2,
  Lock,
  Sliders,
  AlertTriangle,
} from 'lucide-react';

export const SystemAdminDashboard: React.FC = () => {
  const { auditLogs, facilities, resetAllDemoData, addToast, addAuditLog } = useApp();

  const [auditSearch, setAuditSearch] = useState('');
  const [selectedAuditAction, setSelectedAuditAction] = useState('ALL');
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  // Demo user management state
  const [userList, setUserList] = useState(Object.values(DEMO_USERS));
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<RoleId>('doctor');
  const [newUserTitle, setNewUserTitle] = useState('Pediatric Resident');

  // Filtered audit logs
  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.details.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.userName.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.action.toLowerCase().includes(auditSearch.toLowerCase());
    const matchesAction = selectedAuditAction === 'ALL' || log.action === selectedAuditAction;
    return matchesSearch && matchesAction;
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const newUser = {
      id: `usr-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      roleTitle: newUserTitle,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      facility: 'District Hospital',
    };

    setUserList((prev) => [...prev, newUser]);
    addAuditLog('USER_CREATED', 'User Administration', `Provisioned demo user ${newUserName} as ${newUserTitle}`);
    addToast('Demo User Added', `User ${newUserName} added to simulation table.`, 'success');
    setAddUserModalOpen(false);
    setNewUserName('');
    setNewUserEmail('');
  };

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#159A9C]">
              Infrastructure & Security Controls
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
              Simulation Console
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#172B4D] mt-1">
            System Administration & Audit Controls
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Simulated audit trail logs • Role access governance • Synthetic dataset management
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setAddUserModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#159A9C] text-white hover:bg-[#118183] text-xs font-bold transition shadow-xs flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Demo Account</span>
          </button>
          <button
            onClick={() => setResetConfirmOpen(true)}
            className="px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold transition flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-rose-600" />
            <span>Reset Demo State</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Demo Accounts"
          value={userList.length}
          subtitle="6 Role Personas Active"
          icon={Users}
          variant="blue"
        />
        <StatCard
          title="Registered Facilities"
          value={facilities.length}
          subtitle="Across 3 States"
          icon={Building2}
          variant="teal"
        />
        <StatCard
          title="Simulated Audit Events"
          value={auditLogs.length}
          subtitle="Recent logged transactions"
          icon={ShieldCheck}
          variant="emerald"
        />
        <StatCard
          title="System Health"
          value="99.98%"
          subtitle="Simulated Node Uptime"
          icon={Activity}
          variant="slate"
        />
      </div>

      {/* Demo User Management Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#172B4D]">Demo User Roles & Account Controls</h3>
            <p className="text-xs text-slate-500">Configure simulated user personas and permissions</p>
          </div>
          <Badge variant="teal" size="sm">{userList.length} Active Accounts</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-3">Persona Name</th>
                <th className="py-3 px-3">Role Tier</th>
                <th className="py-3 px-3">Assigned Facility</th>
                <th className="py-3 px-3">Contact Email</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {userList.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-bold text-[#172B4D] flex items-center gap-2.5">
                    <img src={user.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                    <span>{user.name}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-[#159A9C]">{user.roleTitle}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-600">{user.facility || 'Statewide Surveillance'}</td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-500">{user.email}</td>
                  <td className="py-3 px-3">
                    <Badge variant="success" size="sm">Active</Badge>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => addToast('Simulated Permission Update', `Permissions verified for ${user.name}`, 'info')}
                      className="text-xs font-semibold text-[#159A9C] hover:underline"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulated Audit Trail Viewer */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold text-[#172B4D]">Simulated Audit Log Stream</h3>
            <p className="text-xs text-slate-500">Every record access, vaccination update, and clinical entry is captured</p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedAuditAction}
              onChange={(e) => setSelectedAuditAction(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-hidden"
            >
              <option value="ALL">All Actions</option>
              <option value="RECORD_ACCESS">Record Access</option>
              <option value="GROWTH_ENTRY">Growth Entry</option>
              <option value="VACCINE_RECORD_UPDATE">Vaccine Update</option>
              <option value="REFERRAL_UPDATE">Referral Change</option>
              <option value="ROLE_SWITCH">Role Switch</option>
            </select>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter logs..."
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
          {filteredLogs.map((log) => (
            <div key={log.id} className="py-3 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-[#17365D] bg-[#EAF3FA] px-2 py-0.5 rounded-md">
                    {log.action}
                  </span>
                  <span className="font-semibold text-slate-800">{log.userName}</span>
                  <span className="text-slate-400">({log.userRole})</span>
                </div>
                <p className="text-slate-600 leading-snug">{log.details}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] text-slate-400 font-mono block">{log.timestamp}</span>
                <span className="text-[10px] text-slate-400 font-mono block">{log.ipSimulation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add User Modal */}
      <Modal
        isOpen={addUserModalOpen}
        onClose={() => setAddUserModalOpen(false)}
        title="Add Demo User Persona"
        subtitle="Create an authorized simulation user account"
        maxWidth="md"
        footer={
          <>
            <button
              type="button"
              onClick={() => setAddUserModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="add-user-form"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#159A9C] text-white hover:bg-[#118183] transition shadow-xs"
            >
              Add User
            </button>
          </>
        }
      >
        <form id="add-user-form" onSubmit={handleAddUser} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">User Full Name</label>
            <input
              type="text"
              required
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="e.g. Dr. Harish Sharma"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              placeholder="e.g. harish@health.gov.in"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Role Type</label>
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value as RoleId)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              >
                <option value="parent">Parent</option>
                <option value="health_worker">Health Worker</option>
                <option value="doctor">Doctor</option>
                <option value="specialist">Specialist</option>
                <option value="public_health_admin">Public Health Admin</option>
                <option value="system_admin">System Admin</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Display Role Title</label>
              <input
                type="text"
                value={newUserTitle}
                onChange={(e) => setNewUserTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={resetConfirmOpen}
        onClose={() => setResetConfirmOpen(false)}
        title="Reset Demo State to Default"
        subtitle="Restore baseline synthetic records"
        maxWidth="sm"
        footer={
          <>
            <button
              onClick={() => setResetConfirmOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                resetAllDemoData();
                setResetConfirmOpen(false);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition"
            >
              Reset Everything
            </button>
          </>
        }
      >
        <p className="text-xs text-slate-600 leading-relaxed">
          This will clear all localStorage modifications and restore the pristine initial 25 children, appointments, vaccinations, and audit records.
        </p>
      </Modal>
    </div>
  );
};
