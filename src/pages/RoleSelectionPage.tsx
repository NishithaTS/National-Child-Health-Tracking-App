import React from 'react';
import { useApp } from '../context/AppContext';
import { RoleId } from '../types';
import {
  Users,
  UserCheck,
  Stethoscope,
  Sparkles,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  HeartHandshake,
  Info,
  ExternalLink,
} from 'lucide-react';

export const RoleSelectionPage: React.FC = () => {
  const { setCurrentRole, navigateTo } = useApp();

  const roles: {
    id: RoleId;
    title: string;
    persona: string;
    badge: string;
    icon: any;
    desc: string;
    features: string[];
    accent: string;
    btnClass: string;
  }[] = [
    {
      id: 'parent',
      title: 'Parent / Guardian',
      persona: 'Priya Sharma (Mother of Aarav, 2 yrs & Ananya, 5 yrs)',
      badge: 'Family Care',
      icon: Users,
      desc: 'Access your child’s health cards, upcoming immunization schedules, digital growth charts, and clinic appointments.',
      features: ['Child profile selector', 'Next vaccination countdown', 'Growth chart preview', 'Direct appointment booking'],
      accent: 'border-blue-200 bg-white hover:border-[#17365D]',
      btnClass: 'bg-[#17365D] hover:bg-[#1d4373]',
    },
    {
      id: 'health_worker',
      title: 'Frontline Health Worker',
      persona: 'Sunita Devi (ASHA Facilitator, Ward 12)',
      badge: 'Field Outreach',
      icon: UserCheck,
      desc: 'Conduct community visits, register newborns, record vaccinations offline, and track children with missed follow-ups.',
      features: ['Offline simulation & sync queue', 'Household registry', 'One-tap field vaccination', 'Due list for outreach'],
      accent: 'border-teal-200 bg-white hover:border-[#159A9C]',
      btnClass: 'bg-[#159A9C] hover:bg-[#118183]',
    },
    {
      id: 'doctor',
      title: 'Primary Care Doctor',
      persona: 'Dr. Rajesh Kulkarni (Senior Consultant Pediatrician)',
      badge: 'Clinical Outpatient',
      icon: Stethoscope,
      desc: 'Review outpatient appointments, record diagnostic encounter notes, manage medications, and initiate specialist referrals.',
      features: ['Longitudinal patient records', 'Add clinical visit notes', 'Medication manager', 'Referral creation'],
      accent: 'border-emerald-200 bg-white hover:border-emerald-600',
      btnClass: 'bg-emerald-700 hover:bg-emerald-800',
    },
    {
      id: 'specialist',
      title: 'Pediatric Specialist',
      persona: 'Dr. Maya Venkatesh (Pediatric Cardiologist & Developmental Spec.)',
      badge: 'Tertiary Triage',
      icon: Sparkles,
      desc: 'Triage secondary referrals, review diagnostic findings, attach specialist recommendations, and guide complex treatment plans.',
      features: ['Urgency-based intake queue', 'Case summary & notes', 'Return recommendations', 'Update referral pipeline'],
      accent: 'border-purple-200 bg-white hover:border-purple-600',
      btnClass: 'bg-purple-700 hover:bg-purple-800',
    },
    {
      id: 'public_health_admin',
      title: 'Public Health Administrator',
      persona: 'Dr. Anand Murthy (State Director of Child Health Surveillance)',
      badge: 'Population Health',
      icon: BarChart3,
      desc: 'Monitor district vaccination coverage, follow-up adherence, referral bottlenecks, and export anonymized CSV data.',
      features: ['Aggregated KPI scorecards', 'Immunization distribution charts', 'Regional filters', 'Export CSV & Print reports'],
      accent: 'border-amber-200 bg-white hover:border-amber-600',
      btnClass: 'bg-amber-700 hover:bg-amber-800',
    },
    {
      id: 'system_admin',
      title: 'System Administrator',
      persona: 'Vikramaditya Sen (Lead Digital Health Infrastructure)',
      badge: 'Governance & Security',
      icon: ShieldCheck,
      desc: 'Oversee simulated platform audit trails, manage demo user accounts, monitor system health, and test privacy safeguards.',
      features: ['Simulated audit trail inspector', 'User & role assignments', 'Facility directory', 'Data reset tools'],
      accent: 'border-slate-300 bg-white hover:border-slate-600',
      btnClass: 'bg-slate-800 hover:bg-slate-900',
    },
  ];

  const handleSelectRole = (roleId: RoleId) => {
    setCurrentRole(roleId);
    navigateTo('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#172B4D] flex flex-col font-sans">
      {/* Header bar */}
      <div className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div
            onClick={() => navigateTo('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#17365D] to-[#159A9C] flex items-center justify-center text-white shadow-sm">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-[#17365D] tracking-tight">
                National Child Health Tracking
              </h1>
              <p className="text-[10px] text-[#159A9C] font-semibold">Interactive Prototype Portal</p>
            </div>
          </div>

          <button
            onClick={() => navigateTo('/')}
            className="text-xs font-semibold text-slate-500 hover:text-[#17365D] flex items-center gap-1 transition"
          >
            <span>Back to Public Overview</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-8 py-10 w-full">
        {/* Title & Disclaimer Banner */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#159A9C] block mb-1">
            Simulated Demonstration Access
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17365D] tracking-tight">
            Choose a Demo Role to Enter
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Select any perspective below to explore role-specific tools, automated records, and simulated clinical workflows.
          </p>

          {/* Visible prototype mode callout */}
          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-medium flex items-center justify-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Prototype mode:</strong> All records, children, and accounts are completely fictional demonstration data. No real patient data is used.
            </span>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((r) => {
            const IconComponent = r.icon;
            return (
              <div
                key={r.id}
                className={`rounded-2xl border-2 p-6 transition-all duration-200 shadow-xs hover:shadow-lg flex flex-col justify-between ${r.accent}`}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F0F5FA] text-[#17365D] flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-[#17365D]" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {r.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#172B4D]">{r.title}</h3>
                  <p className="text-xs text-[#159A9C] font-semibold mt-0.5">{r.persona}</p>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{r.desc}</p>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Included Capabilities:
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {r.features.map((feat, fi) => (
                        <li key={fi} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#159A9C] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4">
                  <button
                    onClick={() => handleSelectRole(r.id)}
                    className={`w-full py-2.5 px-4 rounded-xl text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs ${r.btnClass}`}
                  >
                    <span>Continue as Demo User</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick hint */}
        <div className="mt-10 text-center text-xs text-slate-500">
          Tip: You can switch roles at any time using the quick selector in the top navigation bar.
        </div>
      </main>
    </div>
  );
};
