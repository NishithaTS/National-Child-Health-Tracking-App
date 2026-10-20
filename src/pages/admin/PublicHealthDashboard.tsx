import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import {
  BarChart3,
  Download,
  Printer,
  Filter,
  Users,
  Syringe,
  CheckCircle2,
  GitBranch,
  Building2,
  Calendar,
  MapPin,
  TrendingUp,
  FileSpreadsheet,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

export const PublicHealthDashboard: React.FC = () => {
  const { children, vaccinations, referrals, facilities, addToast } = useApp();

  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedFacility, setSelectedFacility] = useState('All Facilities');
  const [dateRange, setDateRange] = useState('Last 12 Months');

  // Filtered children count based on region selection
  const filteredChildren = useMemo(() => {
    return children.filter((c) => {
      if (selectedRegion === 'All Regions') return true;
      if (selectedRegion === 'Bengaluru Urban' && c.city === 'Bengaluru') return true;
      if (selectedRegion === 'Mysuru' && c.city === 'Mysuru') return true;
      if (selectedRegion === 'Hyderabad' && c.city === 'Hyderabad') return true;
      if (selectedRegion === 'Pune' && c.city === 'Pune') return true;
      return true;
    });
  }, [children, selectedRegion]);

  const totalRegistered = filteredChildren.length;
  const upToDateCount = filteredChildren.filter((c) => c.vaccinationStatus === 'up-to-date').length;
  const coveragePercent = totalRegistered > 0 ? Math.round((upToDateCount / totalRegistered) * 100) : 88;
  const normalFollowUpCount = filteredChildren.filter((c) => c.followUpStatus === 'normal').length;
  const followUpPercent = totalRegistered > 0 ? Math.round((normalFollowUpCount / totalRegistered) * 100) : 92;

  // Chart 1: Monthly registration trend (Synthesized coherent aggregated time series)
  const monthlyRegistrationTrend = [
    { month: 'Nov 2025', count: 18, cumulative: 340 },
    { month: 'Dec 2025', count: 24, cumulative: 364 },
    { month: 'Jan 2026', count: 32, cumulative: 396 },
    { month: 'Feb 2026', count: 28, cumulative: 424 },
    { month: 'Mar 2026', count: 36, cumulative: 460 },
    { month: 'Apr 2026', count: 42, cumulative: 502 },
    { month: 'May 2026', count: 38, cumulative: 540 },
    { month: 'Jun 2026', count: 45, cumulative: 585 },
    { month: 'Jul 2026', count: 40, cumulative: 625 },
    { month: 'Aug 2026', count: 48, cumulative: 673 },
    { month: 'Sep 2026', count: 52, cumulative: 725 },
    { month: 'Oct 2026', count: 35, cumulative: 760 },
  ];

  // Chart 2: Vaccination status distribution
  const vaccineStatusData = [
    { name: 'Up to Date', value: upToDateCount || 16, color: '#23865B' },
    { name: 'Due Soon (Next 30d)', value: filteredChildren.filter((c) => c.vaccinationStatus === 'due-soon').length || 6, color: '#159A9C' },
    { name: 'Overdue Doses', value: filteredChildren.filter((c) => c.vaccinationStatus === 'overdue').length || 3, color: '#C53D4B' },
  ];

  // Chart 3: Age group breakdown
  const ageGroupData = [
    { group: '0-1 Yr (Infants)', count: 6, male: 4, female: 2 },
    { group: '1-3 Yrs (Toddlers)', count: 9, male: 5, female: 4 },
    { group: '4-6 Yrs (Pre-school)', count: 5, male: 3, female: 2 },
    { group: '7-12 Yrs (School)', count: 3, male: 2, female: 1 },
    { group: '13-18 Yrs (Adolescents)', count: 2, male: 1, female: 1 },
  ];

  // Chart 4: District coverage breakdown
  const regionalMetrics = [
    { region: 'Bengaluru Urban', registered: 485, coverage: 91, followUpRate: 94 },
    { region: 'Bengaluru Rural', registered: 260, coverage: 86, followUpRate: 89 },
    { region: 'Mysuru District', registered: 390, coverage: 89, followUpRate: 91 },
    { region: 'Hyderabad Urban', registered: 410, coverage: 88, followUpRate: 90 },
    { region: 'Pune West', registered: 330, coverage: 93, followUpRate: 95 },
  ];

  // Referral breakdown
  const referralBreakdown = [
    { status: 'Submitted', count: 4 },
    { status: 'In Review', count: 6 },
    { status: 'Scheduled', count: 8 },
    { status: 'Returned', count: 12 },
    { status: 'Closed', count: 22 },
  ];

  // Export CSV Handler
  const handleExportCSV = () => {
    const headers = ['Region', 'Registered_Children', 'Immunization_Coverage_Percent', 'Follow_Up_Rate_Percent', 'Status'];
    const rows = regionalMetrics.map((r) => [
      r.region,
      r.registered,
      `${r.coverage}%`,
      `${r.followUpRate}%`,
      r.coverage >= 90 ? 'Optimal' : 'Needs Focus',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NCHT_Regional_Health_Surveillance_${selectedRegion.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('CSV Report Exported', 'Anonymized surveillance metrics downloaded.', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#159A9C]">
              Surveillance & Population Health
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
              Aggregated Metrics
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#172B4D] mt-1">
            Statewide Child Health Surveillance
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Illustrative demo data • Zero identifiable individual records exposed.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-[#17365D] hover:bg-slate-50 text-xs font-bold transition shadow-2xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#159A9C]" />
            <span>Export Aggregated CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-[#17365D] text-white hover:bg-[#1d4373] text-xs font-bold transition shadow-xs flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Surveillance Report</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <Filter className="w-4 h-4 text-[#159A9C]" />
            <span>Surveillance Filters:</span>
          </div>

          {/* Region selector */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-[#172B4D] focus:outline-hidden focus:border-[#159A9C]"
          >
            <option value="All Regions">All Regions (Statewide Aggregate)</option>
            <option value="Bengaluru Urban">Bengaluru Urban</option>
            <option value="Bengaluru Rural">Bengaluru Rural</option>
            <option value="Mysuru">Mysuru District</option>
            <option value="Hyderabad">Hyderabad Metropolitan</option>
            <option value="Pune">Pune District</option>
          </select>

          {/* Facility filter */}
          <select
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-[#172B4D] focus:outline-hidden focus:border-[#159A9C]"
          >
            <option value="All Facilities">All Tier Facilities (PHCs, CHCs, DHs)</option>
            {facilities.map((f) => (
              <option key={f.id} value={f.name}>
                {f.name}
              </option>
            ))}
          </select>

          {/* Date range filter */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-[#172B4D] focus:outline-hidden focus:border-[#159A9C]"
          >
            <option value="Last 12 Months">Last 12 Months (Cohort 2025-26)</option>
            <option value="Current Quarter">Current Quarter (Q3 2026)</option>
            <option value="Year-to-Date">Year-to-Date (Jan-Oct 2026)</option>
          </select>
        </div>

        <div className="text-[11px] font-semibold text-slate-500">
          Showing data for <span className="text-[#172B4D] font-bold">{selectedRegion}</span>
        </div>
      </div>

      {/* Summary Scorecard Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Registered Children"
          value={totalRegistered * 42}
          subtitle={`Across ${selectedRegion}`}
          icon={Users}
          variant="blue"
          trend={{ value: '+8.4%', isPositive: true }}
        />
        <StatCard
          title="Vaccination Coverage"
          value={`${coveragePercent}%`}
          subtitle="Target threshold: 90%"
          icon={Syringe}
          variant="teal"
          trend={{ value: '+2.1%', isPositive: true }}
        />
        <StatCard
          title="Follow-up Rate"
          value={`${followUpPercent}%`}
          subtitle="Timely field checkups"
          icon={CheckCircle2}
          variant="emerald"
          trend={{ value: '+1.5%', isPositive: true }}
        />
        <StatCard
          title="Pending Referrals"
          value={referrals.length * 3}
          subtitle="Specialist tele-triage"
          icon={GitBranch}
          variant="amber"
        />
        <StatCard
          title="Data Completeness"
          value="96.2%"
          subtitle="Zero critical gaps"
          icon={ShieldCheck}
          variant="slate"
        />
      </div>

      {/* Row 1 Charts: Registration Trend & Vaccination Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Registration Trend (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-extrabold text-[#172B4D]">Monthly Child Registration Trend</h3>
              <p className="text-xs text-slate-500">Newborn and infant enrollments across facilities</p>
            </div>
            <span className="text-xs font-bold text-[#159A9C]">2025 – 2026</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRegistrationTrend}>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, fontSize: 11, border: '1px solid #CBD5E1' }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#159A9C"
                  strokeWidth={3}
                  name="Monthly Enrollments"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#172B4D]">Vaccination Status Breakdown</h3>
            <p className="text-xs text-slate-500">Proportion of children on target schedule</p>

            <div className="h-52 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vaccineStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {vaccineStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-around text-xs">
            {vaccineStatusData.map((item, idx) => (
              <div key={idx} className="text-center">
                <span
                  className="w-3 h-3 rounded-full inline-block mb-1"
                  style={{ backgroundColor: item.color }}
                />
                <p className="font-bold text-[#172B4D]">{item.value}</p>
                <p className="text-[10px] text-slate-500">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 Charts: Follow-up Completion by Region & Age Group Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Regional Follow-up Rate Bar Chart (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-extrabold text-[#172B4D]">Immunization Coverage by District</h3>
              <p className="text-xs text-slate-500">Benchmark against 90% national target</p>
            </div>
            <Badge variant="teal" size="sm">District Scorecard</Badge>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalMetrics}>
                <XAxis dataKey="region" tick={{ fontSize: 10 }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 11 }} />
                <Bar dataKey="coverage" fill="#159A9C" radius={[6, 6, 0, 0]} name="Coverage %" />
                <Bar dataKey="followUpRate" fill="#17365D" radius={[6, 6, 0, 0]} name="Follow-up Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Age Group Distribution (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-extrabold text-[#172B4D]">Cohort Age Distribution</h3>
              <p className="text-xs text-slate-500">Registered population across developmental cohorts</p>
            </div>
            <Badge variant="navy" size="sm">Lifespan Segments</Badge>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageGroupData}>
                <XAxis dataKey="group" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 11 }} />
                <Bar dataKey="male" stackId="a" fill="#17365D" radius={[0, 0, 0, 0]} name="Male" />
                <Bar dataKey="female" stackId="a" fill="#159A9C" radius={[6, 6, 0, 0]} name="Female" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Regional Health Equity Summary Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#172B4D]">District Key Performance Indicators</h3>
            <p className="text-xs text-slate-500">Aggregated surveillance metrics for health resource distribution</p>
          </div>
          <button
            onClick={handleExportCSV}
            className="text-xs font-bold text-[#159A9C] hover:underline flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Table CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-3">District / Region</th>
                <th className="py-3 px-3">Registered Children</th>
                <th className="py-3 px-3">Coverage Rate</th>
                <th className="py-3 px-3">Follow-up Adherence</th>
                <th className="py-3 px-3">Active CHCs/PHCs</th>
                <th className="py-3 px-3">Equity Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {regionalMetrics.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-bold text-[#172B4D]">{r.region}</td>
                  <td className="py-3 px-3 font-mono">{r.registered}</td>
                  <td className="py-3 px-3 font-semibold text-emerald-700">{r.coverage}%</td>
                  <td className="py-3 px-3 font-semibold text-[#159A9C]">{r.followUpRate}%</td>
                  <td className="py-3 px-3">14 Active Centres</td>
                  <td className="py-3 px-3">
                    <Badge variant={r.coverage >= 90 ? 'success' : 'warning'} size="sm">
                      {r.coverage >= 90 ? 'Optimal' : 'Outreach Priority'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#159A9C] shrink-0" />
          <span>
            <strong>Privacy Guardrail:</strong> In compliance with national public health privacy standards, no child names or health records are visible in this surveillance tier.
          </span>
        </div>
      </div>
    </div>
  );
};
