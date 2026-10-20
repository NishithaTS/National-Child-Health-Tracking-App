import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ChevronRight, ChevronLeft, User, Shield, Stethoscope } from 'lucide-react';

interface AddChildModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddChildModal: React.FC<AddChildModalProps> = ({ isOpen, onClose }) => {
  const { addChild, facilities } = useApp();
  const [step, setStep] = useState(1);

  // Form State
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(() => new Date().toISOString().split('T')[0]);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [bloodGroup, setBloodGroup] = useState<'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'>('B+');

  const [guardianName, setGuardianName] = useState('');
  const [guardianRelation, setGuardianRelation] = useState<'Mother' | 'Father' | 'Grandparent' | 'Guardian'>('Mother');
  const [guardianPhone, setGuardianPhone] = useState('+91 ');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('560038');

  const [birthWeightKg, setBirthWeightKg] = useState(3.2);
  const [birthLengthCm, setBirthLengthCm] = useState(50.0);
  const [deliveryType, setDeliveryType] = useState<'Normal Vaginal' | 'Cesarean (C-Section)' | 'Assisted'>('Normal Vaginal');
  const [gestationalAgeWeeks, setGestationalAgeWeeks] = useState(39);
  const [birthFacility, setBirthFacility] = useState(facilities[0]?.name || 'Urban Primary Health Centre');
  const [allergies, setAllergies] = useState('None Known');
  const [notes, setNotes] = useState('Registered during routine health check.');

  const [errorMsg, setErrorMsg] = useState('');

  const validateStep = (currentStep: number) => {
    setErrorMsg('');
    if (currentStep === 1) {
      if (!name.trim()) {
        setErrorMsg("Please enter child's full legal or family name.");
        return false;
      }
      if (!dateOfBirth) {
        setErrorMsg('Please select a valid date of birth.');
        return false;
      }
    }
    if (currentStep === 2) {
      if (!guardianName.trim()) {
        setErrorMsg("Please enter primary guardian's name.");
        return false;
      }
      if (!guardianPhone.trim() || guardianPhone.length < 8) {
        setErrorMsg('Please enter a contact mobile number for immunization alerts.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(4, prev + 1));
    }
  };

  const handleBack = () => {
    setErrorMsg('');
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleFinalSubmit = () => {
    // Generate synthetic UHID: NCHT-XX-YEAR-RANDOM
    const stateCode = state === 'Karnataka' ? 'KA' : state === 'Maharashtra' ? 'MH' : 'TS';
    const birthYear = dateOfBirth.split('-')[0] || '2026';
    const randomFour = Math.floor(1000 + Math.random() * 9000);
    const uhid = `NCHT-${stateCode}-${birthYear}-${randomFour}`;

    // Synthetic Avatar based on gender
    const photoUrl =
      gender === 'Female'
        ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
        : 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=300&q=80';

    addChild({
      uhid,
      name,
      dateOfBirth,
      gender,
      bloodGroup,
      guardianName,
      guardianRelation,
      guardianPhone,
      guardianEmail: guardianEmail || `${guardianName.toLowerCase().replace(/\s+/g, '.')}@example.in`,
      address,
      city,
      state,
      pincode,
      photoUrl,
      birthWeightKg: Number(birthWeightKg),
      birthLengthCm: Number(birthLengthCm),
      deliveryType,
      gestationalAgeWeeks: Number(gestationalAgeWeeks),
      apgarScore: '9/10 at 5 mins',
      birthFacility,
      primaryDoctorId: 'usr-doc-01',
      assignedWorkerId: 'usr-hw-01',
      vaccinationStatus: 'due-soon',
      followUpStatus: 'normal',
      allergiesSummary: [allergies],
      chronicConditions: [],
      notes,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Register Child Health Profile"
      subtitle={`Multi-Step Digital Enrollment • Step ${step} of 4`}
      maxWidth="xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5 transition"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#159A9C] text-white hover:bg-[#118183] flex items-center gap-1.5 transition shadow-xs"
              >
                <span>Continue</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#23865B] text-white hover:bg-emerald-700 flex items-center gap-1.5 transition shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Review & Save Child Profile</span>
              </button>
            )}
          </div>
        </div>
      }
    >
      {/* Progress tracker */}
      <div className="mb-6 flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-10" />
        {['Basic Details', 'Guardian', 'Health Info', 'Confirmation'].map((label, idx) => {
          const stepNum = idx + 1;
          const isDone = step > stepNum;
          const isCurrent = step === stepNum;
          return (
            <div key={idx} className="flex flex-col items-center gap-1 bg-white px-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                  isDone
                    ? 'bg-[#23865B] text-white'
                    : isCurrent
                    ? 'bg-[#159A9C] text-white ring-4 ring-teal-100'
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}
              >
                {stepNum}
              </div>
              <span className="text-[10px] font-semibold text-slate-600 hidden sm:block">{label}</span>
            </div>
          );
        })}
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
          {errorMsg}
        </div>
      )}

      {/* STEP 1: Basic Details */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Child's Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Advika Kulkarni"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth *</label>
              <input
                type="date"
                required
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Gender *</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Blood Group</label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden bg-white"
            >
              <option value="A+">A Positive (A+)</option>
              <option value="A-">A Negative (A-)</option>
              <option value="B+">B Positive (B+)</option>
              <option value="B-">B Negative (B-)</option>
              <option value="AB+">AB Positive (AB+)</option>
              <option value="AB-">AB Negative (AB-)</option>
              <option value="O+">O Positive (O+)</option>
              <option value="O-">O Negative (O-)</option>
            </select>
          </div>
        </div>
      )}

      {/* STEP 2: Guardian Details */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Guardian Name *</label>
              <input
                type="text"
                required
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                placeholder="e.g. Radhika Kulkarni"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Relationship *</label>
              <select
                value={guardianRelation}
                onChange={(e) => setGuardianRelation(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden bg-white"
              >
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Grandparent">Grandparent</option>
                <option value="Guardian">Legal Guardian</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone (Alerts) *</label>
              <input
                type="tel"
                required
                value={guardianPhone}
                onChange={(e) => setGuardianPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Guardian Email (Optional)</label>
              <input
                type="email"
                value={guardianEmail}
                onChange={(e) => setGuardianEmail(e.target.value)}
                placeholder="e.g. radhika@example.in"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Residential Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House/Street, Ward, Locality"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">PIN Code</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Health Info */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Birth Weight (kg)</label>
              <input
                type="number"
                step="0.05"
                min="1.0"
                max="6.0"
                value={birthWeightKg}
                onChange={(e) => setBirthWeightKg(parseFloat(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Birth Length (cm)</label>
              <input
                type="number"
                step="0.5"
                min="35"
                max="60"
                value={birthLengthCm}
                onChange={(e) => setBirthLengthCm(parseFloat(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Type</label>
              <select
                value={deliveryType}
                onChange={(e) => setDeliveryType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden bg-white"
              >
                <option value="Normal Vaginal">Normal Vaginal</option>
                <option value="Cesarean (C-Section)">Cesarean (C-Section)</option>
                <option value="Assisted">Assisted Delivery</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Gestational Age (Weeks)</label>
              <input
                type="number"
                min="28"
                max="43"
                value={gestationalAgeWeeks}
                onChange={(e) => setGestationalAgeWeeks(parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Birth Facility</label>
            <select
              value={birthFacility}
              onChange={(e) => setBirthFacility(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden bg-white"
            >
              {facilities.map((f) => (
                <option key={f.id} value={f.name}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Allergies or Medical Alerts</label>
            <input
              type="text"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#159A9C]/20 focus:border-[#159A9C] outline-hidden"
              placeholder="e.g. None known or Penicillin allergy"
            />
          </div>
        </div>
      )}

      {/* STEP 4: Confirmation & Summary */}
      {step === 4 && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/80 space-y-2">
            <h4 className="text-xs font-bold text-[#118183] uppercase tracking-wide">
              Profile Summary Verification
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-500 block">Child's Name:</span>
                <strong className="text-[#172B4D]">{name}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Date of Birth:</span>
                <strong className="text-[#172B4D]">{dateOfBirth}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Gender & Blood Group:</span>
                <strong className="text-[#172B4D]">{gender} • {bloodGroup}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Birth Weight & Length:</span>
                <strong className="text-[#172B4D]">{birthWeightKg} kg • {birthLengthCm} cm</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Guardian:</span>
                <strong className="text-[#172B4D]">{guardianName} ({guardianRelation})</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Mobile Phone:</span>
                <strong className="text-[#172B4D]">{guardianPhone}</strong>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block">Facility & Region:</span>
                <strong className="text-[#172B4D]">{birthFacility} ({city}, {state})</strong>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px] leading-relaxed">
            By saving, a fictional synthetic Unique Health ID (UHID) will be assigned. Initial baseline vaccination schedules and developmental trackers will be initialized in local prototype storage.
          </div>
        </div>
      )}
    </Modal>
  );
};
