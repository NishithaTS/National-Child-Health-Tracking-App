import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { AddMeasurementModal } from '../../components/modals/AddMeasurementModal';
import {
  TrendingUp,
  PlusCircle,
  Baby,
  Calendar,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Info,
  Scale,
  Ruler,
  Brain,
  Activity,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

export const GrowthDevelopmentPage: React.FC = () => {
  const {
    children,
    selectedChildId,
    setSelectedChildId,
    selectedChild,
    growthMeasurements,
    milestones,
    updateMilestoneStatus,
  } = useApp();

  const [activeChildId, setActiveChildId] = useState(selectedChildId || children[0]?.id || '');
  const [activeChartTab, setActiveChartTab] = useState<'height' | 'weight' | 'bmi' | 'head'>('height');
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [measureModalOpen, setMeasureModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'charts' | 'table'>('charts');

  const child = children.find((c) => c.id === activeChildId) || children[0];

  // Child measurements sorted
  const rawMeasurements = useMemo(() => {
    return growthMeasurements
      .filter((g) => g.childId === child.id)
      .sort((a, b) => a.ageMonths - b.ageMonths);
  }, [growthMeasurements, child.id]);

  // Transform data for unit toggle
  const chartData = useMemo(() => {
    return rawMeasurements.map((m) => {
      const height = units === 'metric' ? m.heightCm : parseFloat((m.heightCm * 0.393701).toFixed(1));
      const weight = units === 'metric' ? m.weightKg : parseFloat((m.weightKg * 2.20462).toFixed(1));
      const head = m.headCircumferenceCm
        ? units === 'metric'
          ? m.headCircumferenceCm
          : parseFloat((m.headCircumferenceCm * 0.393701).toFixed(1))
        : undefined;

      // Illustrative WHO reference percentiles (50th, 85th, 15th)
      const baseHeight50 = units === 'metric' ? 50 + m.ageMonths * 1.3 : 19.6 + m.ageMonths * 0.51;
      const baseWeight50 = units === 'metric' ? 3.3 + m.ageMonths * 0.38 : 7.2 + m.ageMonths * 0.83;

      return {
        ageMonths: m.ageMonths,
        recordedDate: m.recordedDate,
        height,
        weight,
        bmi: m.bmi,
        headCircumference: head,
        height50th: parseFloat(baseHeight50.toFixed(1)),
        weight50th: parseFloat(baseWeight50.toFixed(1)),
        note: m.clinicalNote,
      };
    });
  }, [rawMeasurements, units]);

  // Child milestones
  const childMilestones = milestones.filter((m) => m.childId === child.id);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#159A9C]">
              Physical Anthropometry & Development
            </span>
            <Badge variant="teal" size="sm">WHO Standard Comparison</Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-[#172B4D] mt-1">
            Growth Curves & Milestone Screening
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tracking longitudinal height, weight, BMI velocity, and developmental milestones.
          </p>
        </div>

        <button
          onClick={() => setMeasureModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#159A9C] text-white hover:bg-[#118183] text-xs font-bold transition shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Measurement</span>
        </button>
      </div>

      {/* Control Bar: Child selector, unit toggle, chart tab, and view mode */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <Baby className="w-4 h-4 text-[#159A9C]" />
            <span>Child:</span>
          </label>
          <select
            value={activeChildId}
            onChange={(e) => {
              setActiveChildId(e.target.value);
              setSelectedChildId(e.target.value);
            }}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-hidden"
          >
            {children.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.uhid})
              </option>
            ))}
          </select>

          {/* Unit Toggle */}
          <div className="flex items-center border border-slate-200 rounded-xl p-0.5 bg-slate-50 text-xs font-semibold">
            <button
              onClick={() => setUnits('metric')}
              className={`px-2.5 py-1 rounded-lg transition ${
                units === 'metric' ? 'bg-white shadow-2xs text-[#17365D]' : 'text-slate-500'
              }`}
            >
              Metric (cm, kg)
            </button>
            <button
              onClick={() => setUnits('imperial')}
              className={`px-2.5 py-1 rounded-lg transition ${
                units === 'imperial' ? 'bg-white shadow-2xs text-[#17365D]' : 'text-slate-500'
              }`}
            >
              Imperial (in, lb)
            </button>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-slate-200 rounded-xl p-0.5 bg-slate-50 text-xs font-semibold">
            <button
              onClick={() => setViewMode('charts')}
              className={`px-3 py-1 rounded-lg transition ${
                viewMode === 'charts' ? 'bg-white shadow-2xs text-[#17365D]' : 'text-slate-500'
              }`}
            >
              Interactive Charts
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-lg transition ${
                viewMode === 'table' ? 'bg-white shadow-2xs text-[#17365D]' : 'text-slate-500'
              }`}
            >
              Table View
            </button>
          </div>
        </div>
      </div>

      {/* Illustrative Notice */}
      <div className="p-3 rounded-2xl bg-[#EAF3FA] border border-[#c4dbf0] text-xs text-[#17365D] flex items-center gap-2">
        <Info className="w-4 h-4 text-[#159A9C] shrink-0" />
        <span>
          Illustrative growth percentiles: Plotted values reflect fictional baseline measurements for prototype testing. In production, clinical curves are standardized against validated WHO and Indian Academy of Pediatrics (IAP) charts.
        </span>
      </div>

      {viewMode === 'charts' ? (
        <div className="space-y-6">
          {/* Chart Metric Selector Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'height', label: 'Height / Length-for-Age', icon: Ruler },
              { id: 'weight', label: 'Weight-for-Age', icon: Scale },
              { id: 'bmi', label: 'Body Mass Index (BMI)', icon: Activity },
              { id: 'head', label: 'Head Circumference', icon: Brain },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeChartTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveChartTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition shadow-xs ${
                    isSelected
                      ? 'bg-[#17365D] text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#159A9C]" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Chart Canvas */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-extrabold text-[#172B4D]">
                  {child.name}'s Growth Trajectory: {activeChartTab.toUpperCase()}
                </h3>
                <p className="text-xs text-slate-500">
                  Solid line denotes actual child measurements; dashed line represents WHO 50th percentile reference.
                </p>
              </div>
              <Badge variant="teal" size="sm">
                {chartData.length} Data Points
              </Badge>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis
                    dataKey="ageMonths"
                    tick={{ fontSize: 11 }}
                    label={{ value: 'Age in Months', position: 'insideBottom', offset: -10, fontSize: 11 }}
                  />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 14, fontSize: 12, border: '1px solid #CBD5E1', padding: '10px 14px' }}
                  />
                  <Legend verticalAlign="top" height={36} />

                  {activeChartTab === 'height' && (
                    <>
                      <Line
                        type="monotone"
                        dataKey="height"
                        stroke="#159A9C"
                        strokeWidth={3}
                        name={`Child Height (${units === 'metric' ? 'cm' : 'in'})`}
                        dot={{ r: 5, fill: '#159A9C' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="height50th"
                        stroke="#94A3B8"
                        strokeDasharray="4 4"
                        strokeWidth={2}
                        name="WHO 50th Percentile"
                        dot={false}
                      />
                    </>
                  )}

                  {activeChartTab === 'weight' && (
                    <>
                      <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="#17365D"
                        strokeWidth={3}
                        name={`Child Weight (${units === 'metric' ? 'kg' : 'lb'})`}
                        dot={{ r: 5, fill: '#17365D' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="weight50th"
                        stroke="#94A3B8"
                        strokeDasharray="4 4"
                        strokeWidth={2}
                        name="WHO 50th Percentile"
                        dot={false}
                      />
                    </>
                  )}

                  {activeChartTab === 'bmi' && (
                    <Line
                      type="monotone"
                      dataKey="bmi"
                      stroke="#23865B"
                      strokeWidth={3}
                      name="Calculated BMI"
                      dot={{ r: 5, fill: '#23865B' }}
                    />
                  )}

                  {activeChartTab === 'head' && (
                    <Line
                      type="monotone"
                      dataKey="headCircumference"
                      stroke="#8B5CF6"
                      strokeWidth={3}
                      name={`Head Circumference (${units === 'metric' ? 'cm' : 'in'})`}
                      dot={{ r: 5, fill: '#8B5CF6' }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Age (Months)</th>
                <th className="py-3 px-3">Height ({units === 'metric' ? 'cm' : 'in'})</th>
                <th className="py-3 px-3">Weight ({units === 'metric' ? 'kg' : 'lb'})</th>
                <th className="py-3 px-3">BMI</th>
                <th className="py-3 px-3">Head Circ.</th>
                <th className="py-3 px-3">Recorded By & Location</th>
                <th className="py-3 px-3">Clinical Evaluation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {chartData.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-mono font-medium">{item.recordedDate}</td>
                  <td className="py-3 px-3">{item.ageMonths} mos</td>
                  <td className="py-3 px-3 font-bold text-[#172B4D]">{item.height}</td>
                  <td className="py-3 px-3 font-bold text-[#172B4D]">{item.weight}</td>
                  <td className="py-3 px-3 font-mono">{item.bmi}</td>
                  <td className="py-3 px-3">{item.headCircumference || '—'}</td>
                  <td className="py-3 px-3 text-slate-500">PHC Staff Nurse</td>
                  <td className="py-3 px-3 text-slate-600">{item.note || 'Normal progression'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Developmental Milestones Interactive Checklist */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#172B4D]">Developmental Screening Timeline</h3>
            <p className="text-xs text-slate-500">Gross motor, fine motor, communication, cognitive, and social milestones</p>
          </div>
          <Badge variant="teal" size="sm">
            {childMilestones.filter((m) => m.status === 'achieved').length} Achieved
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {childMilestones.map((milestone) => (
            <div
              key={milestone.id}
              className="p-4 rounded-2xl bg-[#F7F9FC] border border-slate-200/90 hover:border-[#159A9C]/40 transition space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#159A9C] uppercase">
                  {milestone.category} • {milestone.targetAgeLabel}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateMilestoneStatus(milestone.id, 'achieved')}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition ${
                      milestone.status === 'achieved'
                        ? 'bg-[#23865B] text-white'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    Achieved
                  </button>
                  <button
                    onClick={() => updateMilestoneStatus(milestone.id, 'in-progress')}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition ${
                      milestone.status === 'in-progress'
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    In Progress
                  </button>
                </div>
              </div>

              <h4 className="text-sm font-bold text-[#172B4D]">{milestone.title}</h4>
              <p className="text-slate-600 text-xs leading-relaxed">{milestone.description}</p>

              {milestone.achievedDate && (
                <p className="text-[10px] text-emerald-700 font-medium">
                  Verified achieved on {milestone.achievedDate}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <AddMeasurementModal
        isOpen={measureModalOpen}
        onClose={() => setMeasureModalOpen(false)}
        defaultChildId={child.id}
      />
    </div>
  );
};
