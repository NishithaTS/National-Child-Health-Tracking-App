export type RoleId =
  | 'parent'
  | 'health_worker'
  | 'doctor'
  | 'specialist'
  | 'public_health_admin'
  | 'system_admin';

export interface DemoUser {
  id: string;
  name: string;
  role: RoleId;
  roleTitle: string;
  email: string;
  avatar: string;
  facility?: string;
  phone?: string;
  location?: string;
  assignedChildIds?: string[]; // For parent role
}

export type VaccinationStatus = 'up-to-date' | 'due-soon' | 'overdue';
export type FollowUpStatus = 'normal' | 'follow-up-due' | 'critical-attention';

export interface Child {
  id: string;
  uhid: string; // Unique Health ID (fictional format: NCHT-XXXX-XXXX)
  name: string;
  dateOfBirth: string; // YYYY-MM-DD
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  guardianName: string;
  guardianRelation: 'Mother' | 'Father' | 'Grandparent' | 'Guardian';
  guardianPhone: string;
  guardianEmail: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  photoUrl: string;
  birthWeightKg: number;
  birthLengthCm: number;
  deliveryType: 'Normal Vaginal' | 'Cesarean (C-Section)' | 'Assisted';
  gestationalAgeWeeks: number;
  apgarScore?: string;
  birthFacility: string;
  primaryDoctorId: string;
  assignedWorkerId: string;
  vaccinationStatus: VaccinationStatus;
  followUpStatus: FollowUpStatus;
  registrationDate: string;
  allergiesSummary?: string[];
  chronicConditions?: string[];
  notes?: string;
}

export type VaccineAdminStatus = 'completed' | 'due' | 'upcoming' | 'overdue' | 'deferred';

export interface VaccinationRecord {
  id: string;
  childId: string;
  vaccineCode: string;
  vaccineName: string;
  diseaseTarget: string;
  doseNumber: number;
  totalDoses: number;
  recommendedAgeWeeks: number;
  recommendedAgeLabel: string;
  dueDate: string;
  administeredDate?: string;
  status: VaccineAdminStatus;
  facility?: string;
  batchNumber?: string;
  administeredBy?: string;
  deferredReason?: string;
  notes?: string;
}

export interface GrowthMeasurement {
  id: string;
  childId: string;
  recordedDate: string;
  ageMonths: number;
  heightCm: number;
  weightKg: number;
  headCircumferenceCm?: number;
  bmi: number;
  recordedBy: string;
  facility: string;
  percentiles: {
    heightForAge: number;
    weightForAge: number;
    bmiForAge: number;
    headCircumferenceForAge?: number;
  };
  clinicalNote?: string;
  flagReview?: boolean;
}

export type MilestoneCategory =
  | 'gross-motor'
  | 'fine-motor'
  | 'communication'
  | 'cognitive'
  | 'social-emotional';

export type MilestoneStatus = 'achieved' | 'in-progress' | 'delayed' | 'not-assessed';

export interface MilestoneRecord {
  id: string;
  childId: string;
  targetAgeMonths: number;
  targetAgeLabel: string;
  category: MilestoneCategory;
  title: string;
  description: string;
  status: MilestoneStatus;
  achievedDate?: string;
  notes?: string;
}

export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
export type AppointmentType =
  | 'Routine Child Health Checkup'
  | 'Vaccination Dose'
  | 'Growth & Nutrition Evaluation'
  | 'Pediatric Specialist Consultation'
  | 'Post-Hospital Follow-up'
  | 'Field Worker Home Visit';

export interface Appointment {
  id: string;
  childId: string;
  childName: string;
  childUhid: string;
  providerId: string;
  providerName: string;
  providerRole: string;
  facility: string;
  appointmentType: AppointmentType;
  date: string;
  time: string;
  status: AppointmentStatus;
  reason: string;
  notes?: string;
  priority: 'Routine' | 'Urgent';
}

export type ReferralStatus =
  | 'draft'
  | 'submitted'
  | 'accepted'
  | 'appointment-scheduled'
  | 'in-review'
  | 'recommendations-returned'
  | 'closed';

export interface ReferralTimelineStep {
  status: ReferralStatus;
  label: string;
  date: string;
  actor: string;
  note?: string;
}

export interface Referral {
  id: string;
  childId: string;
  childName: string;
  childUhid: string;
  childAge: string;
  referringDoctor: string;
  referringFacility: string;
  destinationSpecialist: string;
  specialistType: 'Pediatric Cardiology' | 'Pediatric Neurology' | 'Pediatric Endocrinology' | 'Clinical Nutrition' | 'Developmental Pediatrics' | 'Pediatric Pulmonology';
  reason: string;
  urgency: 'routine' | 'urgent' | 'high-priority';
  createdDate: string;
  status: ReferralStatus;
  clinicalSummary: string;
  timeline: ReferralTimelineStep[];
  specialistNotes?: string;
  recommendations?: string;
  closedDate?: string;
}

export interface ClinicalVisit {
  id: string;
  childId: string;
  visitDate: string;
  facility: string;
  clinicianName: string;
  clinicianRole: string;
  visitType: string;
  chiefComplaints: string;
  temperatureC: number;
  heartRateBpm: number;
  respiratoryRate: number;
  spO2?: number;
  diagnosis: string;
  prescriptions: { medicine: string; dosage: string; frequency: string; days: number }[];
  advice: string;
  followUpDays?: number;
}

export interface Allergy {
  id: string;
  childId: string;
  allergen: string;
  reaction: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  diagnosedDate: string;
}

export interface Medication {
  id: string;
  childId: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  status: 'active' | 'completed' | 'discontinued';
}

export type NotificationCategory =
  | 'vaccinations'
  | 'appointments'
  | 'referrals'
  | 'follow-ups'
  | 'system';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  timestamp: string;
  read: boolean;
  childId?: string;
  childName?: string;
  linkPage?: string;
  severity: 'info' | 'warning' | 'critical' | 'success';
}

export interface ResponsibleAiInsight {
  id: string;
  childId: string;
  childName: string;
  childUhid: string;
  category:
    | 'Missing Measurements'
    | 'Overdue Follow-up'
    | 'Inconsistent Entry'
    | 'Growth Velocity Alert'
    | 'Vaccine Drop-off';
  flagReason: string;
  suggestedNextStep: string;
  detectedDate: string;
  status: 'pending-review' | 'reviewed' | 'dismissed';
  priority: 'low' | 'medium' | 'high';
  reviewNotes?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userRole: string;
  userName: string;
  action: string;
  resource: string;
  details: string;
  ipSimulation: string;
}

export interface Facility {
  id: string;
  name: string;
  type: 'Community Health Centre (CHC)' | 'Primary Health Centre (PHC)' | 'District Hospital' | 'Pediatric Tertiary Centre' | 'Sub-Centre';
  city: string;
  state: string;
  activeWorkers: number;
  registeredChildren: number;
}

export interface SyncQueueItem {
  id: string;
  timestamp: string;
  actionType: 'Record Visit' | 'Register Child' | 'Add Measurement' | 'Record Vaccine';
  childName: string;
  payload: any;
  status: 'pending' | 'synced';
}
