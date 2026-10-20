import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { AddChildModal } from '../../components/modals/AddChildModal';
import {
  Users,
  Search,
  Filter,
  PlusCircle,
  LayoutGrid,
  List,
  ChevronRight,
  Phone,
  Baby,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock,
} from 'lucide-react';

export const ChildProfilesPage: React.FC = () => {
  const { children, setSelectedChildId, navigateTo } = useApp();

  const [search, setSearch] = useState('');
  const [ageFilter, setAgeFilter] = useState('ALL');
  const [vaccineFilter, setVaccineFilter] = useState('ALL');
  const [followUpFilter, setFollowUpFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [addChildOpen, setAddChildOpen] = useState(false);

  // Calculate age helper
  const getAgeInMonths = (dobStr: string) => {
    const dob = new Date(dobStr);
    const now = new Date();
    return Math.max(0, Math.floor((now.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24 * 30.4375)));
  };

  const getAgeLabel = (dobStr: string) => {
    const months = getAgeInMonths(dobStr);
    if (months < 12) return `${months} Months`;
    const yrs = Math.floor(months / 12);
    const rem = months % 12;
    return rem > 0 ? `${yrs} Yrs ${rem} Mo` : `${yrs} Years`;
  };

  // Filter children
  const filteredChildren = useMemo(() => {
    return children.filter((child) => {
      // Search
      const matchesSearch =
        child.name.toLowerCase().includes(search.toLowerCase()) ||
        child.uhid.toLowerCase().includes(search.toLowerCase()) ||
        child.guardianName.toLowerCase().includes(search.toLowerCase()) ||
        child.city.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      // Age group
      const months = getAgeInMonths(child.dateOfBirth);
      if (ageFilter === 'INFANT' && months > 12) return false;
      if (ageFilter === 'TODDLER' && (months <= 12 || months > 36)) return false;
      if (ageFilter === 'PRE_SCHOOL' && (months <= 36 || months > 72)) return false;
      if (ageFilter === 'SCHOOL' && (months <= 72 || months > 144)) return false;
      if (ageFilter === 'ADOLESCENT' && months <= 144) return false;

      // Vaccine
      if (vaccineFilter !== 'ALL' && child.vaccinationStatus !== vaccineFilter) return false;

      // Follow-up
      if (followUpFilter !== 'ALL' && child.followUpStatus !== followUpFilter) return false;

      return true;
    });
  }, [children, search, ageFilter, vaccineFilter, followUpFilter]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#159A9C]">
              Longitudinal Registry
            </span>
            <Badge variant="teal" size="sm">
              {children.length} Registered Children
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-[#172B4D] mt-1">
            Child Profiles Directory
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Search, filter, and inspect comprehensive longitudinal health records from birth to 18 years.
          </p>
        </div>

        <button
          onClick={() => setAddChildOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#159A9C] text-white hover:bg-[#118183] text-xs font-bold transition shadow-xs flex items-center gap-2 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Child</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by child name, UHID, or guardian..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#159A9C]"
            />
          </div>

          {/* View toggle (Grid vs Table) */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-xs text-slate-400 hidden sm:inline">View:</span>
            <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'grid' ? 'bg-white shadow-2xs text-[#17365D]' : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Card Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'table' ? 'bg-white shadow-2xs text-[#17365D]' : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <Filter className="w-3.5 h-3.5 text-[#159A9C]" />
            <span>Filters:</span>
          </div>

          <select
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">All Age Groups</option>
            <option value="INFANT">0 – 1 Year (Infants)</option>
            <option value="TODDLER">1 – 3 Years (Toddlers)</option>
            <option value="PRE_SCHOOL">4 – 6 Years (Pre-school)</option>
            <option value="SCHOOL">7 – 12 Years (School-Age)</option>
            <option value="ADOLESCENT">13 – 18 Years (Adolescents)</option>
          </select>

          <select
            value={vaccineFilter}
            onChange={(e) => setVaccineFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">All Vaccine Statuses</option>
            <option value="up-to-date">Up to Date</option>
            <option value="due-soon">Due Soon (Next 30 Days)</option>
            <option value="overdue">Overdue</option>
          </select>

          <select
            value={followUpFilter}
            onChange={(e) => setFollowUpFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">All Follow-up Statuses</option>
            <option value="normal">Routine / Normal</option>
            <option value="follow-up-due">Follow-up Due</option>
            <option value="critical-attention">Specialist Attention Needed</option>
          </select>

          {(search || ageFilter !== 'ALL' || vaccineFilter !== 'ALL' || followUpFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearch('');
                setAgeFilter('ALL');
                setVaccineFilter('ALL');
                setFollowUpFilter('ALL');
              }}
              className="text-xs font-semibold text-[#159A9C] hover:underline ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChildren.map((child) => (
            <div
              key={child.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#159A9C]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={child.photoUrl}
                      alt={child.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:scale-105 transition"
                    />
                    <div>
                      <h3 className="text-sm font-extrabold text-[#172B4D] group-hover:text-[#159A9C] transition">
                        {child.name}
                      </h3>
                      <p className="text-[10px] font-mono font-semibold text-slate-400">
                        {child.uhid}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={child.vaccinationStatus === 'up-to-date' ? 'success' : child.vaccinationStatus === 'due-soon' ? 'teal' : 'critical'}
                    size="sm"
                  >
                    {child.vaccinationStatus.replace('-', ' ')}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="p-2 rounded-xl bg-slate-50">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Age & Gender</span>
                    <span className="font-bold text-[#172B4D]">
                      {getAgeLabel(child.dateOfBirth)} • {child.gender}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Blood Group</span>
                    <span className="font-bold text-[#172B4D]">{child.bloodGroup}</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-600">
                  <p className="truncate">
                    <strong>Guardian:</strong> {child.guardianName} ({child.guardianRelation})
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {child.city}, {child.state}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">
                  Registered: {child.registrationDate}
                </span>
                <button
                  onClick={() => {
                    setSelectedChildId(child.id);
                    navigateTo(`/child-profiles/${child.id}`);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#EAF3FA] hover:bg-[#159A9C] text-[#17365D] hover:text-white text-xs font-bold transition flex items-center gap-1"
                >
                  <span>View Record</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-3">Child & UHID</th>
                <th className="py-3 px-3">Age & Gender</th>
                <th className="py-3 px-3">Blood Group</th>
                <th className="py-3 px-3">Guardian Details</th>
                <th className="py-3 px-3">Vaccine Status</th>
                <th className="py-3 px-3">Follow-up</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredChildren.map((child) => (
                <tr key={child.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <img src={child.photoUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <strong className="text-[#172B4D] block">{child.name}</strong>
                        <span className="font-mono text-[10px] text-slate-400">{child.uhid}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-medium">
                    {getAgeLabel(child.dateOfBirth)} • {child.gender}
                  </td>
                  <td className="py-3 px-3 font-bold text-[#172B4D]">{child.bloodGroup}</td>
                  <td className="py-3 px-3">
                    <span className="block font-medium">{child.guardianName}</span>
                    <span className="text-[10px] text-slate-400">{child.guardianPhone}</span>
                  </td>
                  <td className="py-3 px-3">
                    <Badge
                      variant={child.vaccinationStatus === 'up-to-date' ? 'success' : child.vaccinationStatus === 'due-soon' ? 'teal' : 'critical'}
                      size="sm"
                    >
                      {child.vaccinationStatus}
                    </Badge>
                  </td>
                  <td className="py-3 px-3">
                    <Badge
                      variant={child.followUpStatus === 'normal' ? 'neutral' : 'warning'}
                      size="sm"
                    >
                      {child.followUpStatus}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => {
                        setSelectedChildId(child.id);
                        navigateTo(`/child-profiles/${child.id}`);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#EAF3FA] hover:bg-[#159A9C] text-[#17365D] hover:text-white text-xs font-bold transition inline-flex items-center gap-1"
                    >
                      <span>Profile</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Child Multi-Step Modal */}
      <AddChildModal isOpen={addChildOpen} onClose={() => setAddChildOpen(false)} />
    </div>
  );
};
