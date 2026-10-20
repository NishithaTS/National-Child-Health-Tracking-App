import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HeroIllustration } from '../components/common/HeroIllustration';
import {
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  Syringe,
  TrendingUp,
  FileHeart,
  CalendarCheck2,
  GitBranch,
  Sparkles,
  Users,
  CheckCircle2,
  Lock,
  Clock,
  Building2,
  ChevronDown,
  Stethoscope,
  BarChart3,
  Layers,
  Baby,
  Smile,
  GraduationCap,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const timelineStages = [
    {
      stage: 'Birth & Neonatal',
      age: '0 – 28 Days',
      icon: Baby,
      desc: 'Birth registration, newborn screening, BCG, OPV-0, Hepatitis B birth dose, and birth weight monitoring.',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      stage: 'Infancy',
      age: '1 – 12 Months',
      icon: HeartHandshake,
      desc: 'Pentavalent series, Rotavirus, MR-1, monthly growth curves, head circumference, and motor milestone capture.',
      color: 'bg-teal-50 text-teal-700 border-teal-200',
    },
    {
      stage: 'Toddlerhood',
      age: '1 – 3 Years',
      icon: Smile,
      desc: 'DPT boosters, Typhoid conjugate, language development, dietary evaluation, and early sensory screening.',
      color: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      stage: 'Early Childhood',
      age: '4 – 6 Years',
      icon: Users,
      desc: 'Pre-school health audits, vision and hearing acuity, dental checks, and booster vaccination coverage.',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      stage: 'Middle Childhood',
      age: '7 – 12 Years',
      icon: GraduationCap,
      desc: 'School health integration, physical posture, nutritional status, and chronic allergy management.',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      stage: 'Adolescence',
      age: '13 – 18 Years',
      icon: Sparkles,
      desc: 'Td/HPV vaccination, pubertal development tracking, psychological wellbeing, and transition to adult care.',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
  ];

  const features = [
    {
      icon: FileHeart,
      title: 'Unified Health Records',
      desc: 'A permanent digital health summary with synthetic Unique Health IDs (UHID), connecting birth records, hospital encounters, and vitals without paper loss.',
    },
    {
      icon: Syringe,
      title: 'Immunization Intelligence',
      desc: 'Automated schedules based on recommended timelines with batch tracking, due-date reminders, and missed-dose follow-up queues.',
    },
    {
      icon: TrendingUp,
      title: 'Interactive Growth Curves',
      desc: 'Real-time percentile mapping for height, weight, BMI, and head circumference with instant visualization of healthy trajectories.',
    },
    {
      icon: CalendarCheck2,
      title: 'Integrated Appointments',
      desc: 'Seamless scheduling between community health centres, sub-centres, and frontline worker home visits.',
    },
    {
      icon: GitBranch,
      title: '7-Stage Referral Pipeline',
      desc: 'Transparent tele-triage connecting primary doctors to pediatric cardiology, neurology, and developmental specialists.',
    },
    {
      icon: Sparkles,
      title: 'Responsible AI Surveillance',
      desc: 'Deterministic rules flagging overdue immunizations, inconsistent data entries, and growth drop-offs for clinician review.',
    },
  ];

  const faqs = [
    {
      q: 'What is the purpose of the National Child Health Tracking App proposal?',
      a: 'It is a conceptual digital health platform designed to demonstrate how coordinated care, shared records, and timely interventions can eliminate immunization drop-offs and ensure every child receives continuous care from birth to age 18.',
    },
    {
      q: 'Does this platform use real patient records or government databases?',
      a: 'No. This application is an interactive frontend demonstration prototype. All child profiles, health records, clinical notes, and statistics are fictional and generated purely for demonstration purposes.',
    },
    {
      q: 'How does the app support frontline health workers (ASHA/ANM)?',
      a: 'The system includes an offline-first simulated workflow with a pending sync queue, household route checklists, and one-tap field entry for home visits and mobile immunization drives.',
    },
    {
      q: 'How does the platform ensure data privacy and responsible AI?',
      a: 'The architecture enforces strict role-based data partitioning, masking personal identifiers in public health analytics. AI insights are deterministic assistive flags that always require clinician sign-off.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#172B4D] flex flex-col font-sans">
      {/* Top Banner Notice */}
      <div className="bg-[#17365D] text-white px-4 py-2 text-xs text-center border-b border-[#244b7a] font-medium flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#159A9C] animate-pulse" />
        <span>Healthcare Digital Innovation Proposal • Fully Interactive Prototype Simulation</span>
        <button
          onClick={() => navigateTo('/demo-login')}
          className="ml-3 underline text-teal-300 hover:text-white font-semibold cursor-pointer"
        >
          Launch Demo →
        </button>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#17365D] to-[#159A9C] flex items-center justify-center text-white shadow-md">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-[#17365D] tracking-tight leading-tight">
                National Child Health Tracking
              </h1>
              <p className="text-[11px] text-[#159A9C] font-semibold tracking-wide">
                Connected Records. Timely Care. Healthier Futures.
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#timeline" className="hover:text-[#159A9C] transition">Life Stages</a>
            <a href="#features" className="hover:text-[#159A9C] transition">Features</a>
            <a href="#how-it-works" className="hover:text-[#159A9C] transition">How It Works</a>
            <a href="#roles" className="hover:text-[#159A9C] transition">Care Roles</a>
            <a href="#roadmap" className="hover:text-[#159A9C] transition">Roadmap</a>
            <a href="#faq" className="hover:text-[#159A9C] transition">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('/demo-login')}
              className="px-4 py-2 rounded-xl bg-[#17365D] text-white hover:bg-[#1d4373] text-xs font-bold transition shadow-sm hover:shadow flex items-center gap-2"
            >
              <span>Explore Interactive Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-8 overflow-hidden bg-gradient-to-b from-[#EAF3FA]/60 via-[#F7F9FC] to-[#F7F9FC]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#159A9C]/30 text-xs font-bold text-[#159A9C] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Digital Healthcare Innovation Proposal</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#17365D] tracking-tight leading-[1.12]">
              Every Child Deserves a Healthier Future
            </h1>

            <p className="text-lg sm:text-xl text-[#6B7A90] font-normal leading-relaxed max-w-2xl">
              A proposed digital platform for coordinated child healthcare, from birth to age 18.
              Bridging families, community health workers, primary clinics, and pediatric specialists through one continuous record.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo('/demo-login')}
                className="px-6 py-3.5 rounded-xl bg-[#159A9C] text-white hover:bg-[#118183] text-sm font-bold shadow-lg shadow-teal-700/20 transition flex items-center gap-2.5 transform hover:-translate-y-0.5"
              >
                <span>Explore Interactive Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#features"
                className="px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-[#17365D] hover:bg-slate-50 text-sm font-bold shadow-2xs transition"
              >
                Discover the Features
              </a>
            </div>

            {/* Quick Proof Metrics */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-xl">
              <div>
                <span className="text-2xl font-extrabold text-[#17365D]">Birth – 18</span>
                <p className="text-xs text-slate-500 font-medium">Continuous Lifespan</p>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-[#159A9C]">6 Roles</span>
                <p className="text-xs text-slate-500 font-medium">Collaborative Team</p>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-[#23865B]">Zero Data Loss</span>
                <p className="text-xs text-slate-500 font-medium">Interoperable Records</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroIllustration className="w-full max-w-md lg:max-w-none" />
          </div>
        </div>
      </section>

      {/* Visual Timeline: Birth to Adolescence */}
      <section id="timeline" className="py-16 px-4 sm:px-8 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#159A9C]">
              Continuous Lifespan Architecture
            </span>
            <h2 className="text-3xl font-extrabold text-[#17365D] tracking-tight mt-2">
              From First Breath to Adulthood
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              One connected longitudinal record safeguards children through every physical and developmental milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timelineStages.map((t, idx) => {
              const Icon = t.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-6 bg-[#F7F9FC] border border-slate-200/90 hover:border-[#159A9C]/40 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${t.color}`}>
                      Stage {idx + 1}
                    </span>
                    <span className="text-xs font-extrabold text-slate-400">{t.age}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs group-hover:scale-105 transition">
                      <Icon className="w-5 h-5 text-[#159A9C]" />
                    </div>
                    <h3 className="text-base font-bold text-[#172B4D]">{t.stage}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{t.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section id="features" className="py-20 px-4 sm:px-8 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#159A9C]">
              Built for Real-World Care Delivery
            </span>
            <h2 className="text-3xl font-extrabold text-[#17365D] tracking-tight mt-2">
              Comprehensive Child Health Features
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Replacing fragmented paper immunization cards and lost records with an integrated, intelligent healthcare suite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#EAF3FA] text-[#17365D] flex items-center justify-center mb-4 group-hover:bg-[#159A9C] group-hover:text-white transition">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#172B4D] mb-2">{f.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-4 sm:px-8 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#159A9C]">
              Streamlined Operational Flow
            </span>
            <h2 className="text-3xl font-extrabold text-[#17365D] tracking-tight mt-2">
              How the National Child Health Network Operates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#F7F9FC] border border-slate-200 relative">
              <span className="w-8 h-8 rounded-full bg-[#17365D] text-white flex items-center justify-center font-bold text-xs mb-3">
                1
              </span>
              <h4 className="text-sm font-bold text-[#172B4D]">Birth Registration</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Hospital creates synthetic UHID at birth with initial vitals, birth weight, and birth vaccine administration.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7F9FC] border border-slate-200 relative">
              <span className="w-8 h-8 rounded-full bg-[#159A9C] text-white flex items-center justify-center font-bold text-xs mb-3">
                2
              </span>
              <h4 className="text-sm font-bold text-[#172B4D]">Frontline Field Outreach</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                ASHA workers conduct scheduled home visits, track growth, log vaccinations offline, and sync to central registry.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7F9FC] border border-slate-200 relative">
              <span className="w-8 h-8 rounded-full bg-[#23865B] text-white flex items-center justify-center font-bold text-xs mb-3">
                3
              </span>
              <h4 className="text-sm font-bold text-[#172B4D]">Clinical Encounters</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Primary pediatricians view complete longitudinal history, prescribe treatment, and initiate specialist tele-triage.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7F9FC] border border-slate-200 relative">
              <span className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs mb-3">
                4
              </span>
              <h4 className="text-sm font-bold text-[#172B4D]">Public Health Surveillance</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Health administrators analyze anonymized district coverage to direct vaccine stock and eliminate care disparities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Based Access Overview */}
      <section id="roles" className="py-20 px-4 sm:px-8 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#159A9C]">
              Tailored User Experiences
            </span>
            <h2 className="text-3xl font-extrabold text-[#17365D] tracking-tight mt-2">
              Six Purpose-Built Demo Dashboards
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Switch seamlessly between role perspectives in the interactive prototype.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EAF3FA] text-[#17365D]">
                  Role 1
                </span>
                <h3 className="text-base font-bold text-[#172B4D] mt-3">Parent / Guardian</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Friendly interface with child cards, upcoming vaccine countdowns, growth charts, appointment booking, and records download.
                </p>
              </div>
              <button
                onClick={() => {
                  navigateTo('/demo-login');
                }}
                className="mt-4 text-xs font-bold text-[#159A9C] hover:underline text-left flex items-center gap-1"
              >
                Launch Parent View →
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700">
                  Role 2
                </span>
                <h3 className="text-base font-bold text-[#172B4D] mt-3">Frontline Health Worker</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Mobile-optimized field console with household queues, offline simulation mode, vaccination logging, and visit reminders.
                </p>
              </div>
              <button
                onClick={() => {
                  navigateTo('/demo-login');
                }}
                className="mt-4 text-xs font-bold text-[#159A9C] hover:underline text-left flex items-center gap-1"
              >
                Launch Field Worker View →
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                  Role 3
                </span>
                <h3 className="text-base font-bold text-[#172B4D] mt-3">Doctor / Clinician</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Fast outpatient clinic view with patient search, clinical visit notes, prescription management, and specialist referrals.
                </p>
              </div>
              <button
                onClick={() => {
                  navigateTo('/demo-login');
                }}
                className="mt-4 text-xs font-bold text-[#159A9C] hover:underline text-left flex items-center gap-1"
              >
                Launch Doctor View →
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700">
                  Role 4
                </span>
                <h3 className="text-base font-bold text-[#172B4D] mt-3">Pediatric Specialist</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Sub-specialty consultation queue (Cardiology, Neurology) to triage cases, review echocardiograms, and dispatch care recommendations.
                </p>
              </div>
              <button
                onClick={() => {
                  navigateTo('/demo-login');
                }}
                className="mt-4 text-xs font-bold text-[#159A9C] hover:underline text-left flex items-center gap-1"
              >
                Launch Specialist View →
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                  Role 5
                </span>
                <h3 className="text-base font-bold text-[#172B4D] mt-3">Public Health Admin</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  District-level surveillance dashboards, vaccination coverage charts, follow-up rates, and exportable aggregated CSV reports.
                </p>
              </div>
              <button
                onClick={() => {
                  navigateTo('/demo-login');
                }}
                className="mt-4 text-xs font-bold text-[#159A9C] hover:underline text-left flex items-center gap-1"
              >
                Launch Public Health View →
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                  Role 6
                </span>
                <h3 className="text-base font-bold text-[#172B4D] mt-3">System Administrator</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Role assignments, simulated audit trails, security configurations, facility management, and synthetic data reset tools.
                </p>
              </div>
              <button
                onClick={() => {
                  navigateTo('/demo-login');
                }}
                className="mt-4 text-xs font-bold text-[#159A9C] hover:underline text-left flex items-center gap-1"
              >
                Launch Admin View →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Responsible AI Section */}
      <section className="py-16 px-4 sm:px-8 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 mb-4">
                <ShieldCheck className="w-4 h-4" />
                <span>Ethical & Clinical Governance</span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#17365D] tracking-tight">
                Privacy-First Design & Responsible Assistive AI
              </h2>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                National child health systems demand the highest standard of data guardianship. Our proposed design implements strict principle-based guardrails:
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#EAF3FA] text-[#17365D] shrink-0 mt-0.5">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#172B4D]">Zero Identifiable Exposure in Public Analytics</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Administrator metrics are strictly aggregated at the district or facility tier. Child names and personal identifiers never leak into surveillance views.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-teal-50 text-[#159A9C] shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#172B4D]">Deterministic Safety Checks, Not Black-Box Diagnoses</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Our assistive AI checks flag missing measurements, vaccination drop-offs, and transcription discrepancies. All suggestions require qualified clinician verification.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-700 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#172B4D]">Complete Simulated Audit Logs</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Every record access, modification, and referral step generates an immutable audit record for accountability.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F7F9FC] p-6 sm:p-8 rounded-3xl border border-slate-200">
              <h3 className="text-sm font-bold text-[#172B4D] mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#159A9C]" />
                <span>Sample Assistive Alert from Prototype</span>
              </h3>
              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                    High Priority Alert
                  </span>
                  <span className="text-[11px] text-slate-400">Rule: Vaccine Drop-off Check</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#172B4D]">Immunization Delay Flagged</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Child (UHID NCHT-KA-2023-5592) completed Pentavalent-3 on schedule but DPT Booster 1 is overdue by &gt;25 days.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 text-xs text-slate-600 border border-slate-100">
                  <strong>Recommended Next Step:</strong> Assign ASHA home outreach to counsel guardian and schedule immunization camp.
                </div>
                <div className="text-[10px] text-slate-400 italic">
                  * Prototype notification: Requires qualified human medical officer validation.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proposed Implementation Roadmap */}
      <section id="roadmap" className="py-20 px-4 sm:px-8 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#159A9C]">
              Strategic Blueprint
            </span>
            <h2 className="text-3xl font-extrabold text-[#17365D] tracking-tight mt-2">
              Phased Implementation Roadmap
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              A pragmatic pathway to national adoption across primary, secondary, and tertiary health tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-[#159A9C] block mb-1">Phase 1 (Months 1–6)</span>
              <h3 className="text-base font-bold text-[#172B4D] mb-2">District Sandbox Pilot</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pilot deployment across 4 urban & rural health districts (Bengaluru Urban, Mysuru, Hyderabad, Pune) testing ASHA mobile offline workflows.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-[#159A9C] block mb-1">Phase 2 (Months 7–12)</span>
              <h3 className="text-base font-bold text-[#172B4D] mb-2">Statewide Integration</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expansion across all Primary and Community Health Centres with automated SMS reminders in regional languages.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-[#159A9C] block mb-1">Phase 3 (Year 2)</span>
              <h3 className="text-base font-bold text-[#172B4D] mb-2">National Exchange</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Interoperability with public health registries, private pediatric hospitals, and school health checkup databases.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-[#159A9C] block mb-1">Phase 4 (Year 3+)</span>
              <h3 className="text-base font-bold text-[#172B4D] mb-2">Predictive Equity</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cohort health intelligence to identify regional stunting patterns, seasonal respiratory spikes, and nutrition gaps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-8 bg-white border-y border-slate-200/80">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#159A9C]">
              Questions & Answers
            </span>
            <h2 className="text-3xl font-extrabold text-[#17365D] tracking-tight mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 overflow-hidden bg-[#F7F9FC]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-[#172B4D] hover:bg-slate-100/60 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      openFaq === idx ? 'rotate-180 text-[#159A9C]' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 px-4 sm:px-8 bg-[#17365D] text-white text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Ready to Explore the Platform Prototype?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Test the live interactive simulation right now. Jump straight into parent records, frontline outreach, doctor clinics, specialist consults, or surveillance analytics.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('/demo-login')}
              className="px-8 py-3.5 rounded-xl bg-[#159A9C] text-white hover:bg-[#118183] text-sm font-bold shadow-lg transition inline-flex items-center gap-2"
            >
              <span>Launch Demo Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f233d] text-slate-400 py-12 px-4 sm:px-8 text-xs border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <HeartHandshake className="w-5 h-5 text-[#159A9C]" />
              <span>National Child Health Tracking App</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A proposed digital health innovation concept. Dedicated to ensuring coordinated records, timely immunizations, and thriving developmental health for every child from birth to age 18.
            </p>
            <div className="text-[11px] text-teal-400 font-medium">
              Prototype Mode • Built with React, TypeScript & Tailwind CSS
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Prototype Portals
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateTo('/demo-login')} className="hover:text-white transition">
                  Parent / Guardian Portal
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/demo-login')} className="hover:text-white transition">
                  Frontline Worker Console
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/demo-login')} className="hover:text-white transition">
                  Pediatrician Clinic View
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/demo-login')} className="hover:text-white transition">
                  Public Health Surveillance
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Disclaimer
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-400">
              This application is an educational and innovation proposal prototype. No actual government endorsement or real personal medical data is implied. All records are fictional.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>© 2026 National Child Health Tracking Initiative Proposal.</div>
          <div className="flex gap-4">
            <span>Synthetic Demo Data</span>
            <span>•</span>
            <span>Zero PII Collected</span>
            <span>•</span>
            <span>Client-Side Architecture</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
