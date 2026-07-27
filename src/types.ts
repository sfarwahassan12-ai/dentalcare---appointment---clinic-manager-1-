export type AppointmentStatus = 
  | 'scheduled'
  | 'confirmed'
  | 'checked_in'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show';

export type ServiceCategory = 'preventative' | 'cosmetic' | 'restorative' | 'orthodontics' | 'emergency';

export interface DentalService {
  id: string;
  name: string;
  category: ServiceCategory;
  durationMinutes: number;
  price: number;
  description: string;
  iconName: string;
  prepInstructions?: string[];
}

export interface Dentist {
  id: string;
  name: string;
  title: string;
  specialization: string;
  avatar: string;
  roomNumber: string;
  workingDays: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
  workingHours: { start: string; end: string };
  rating: number;
  reviewsCount: number;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "09:00 AM"
  durationMinutes: number;
  serviceId: string;
  dentistId: string;
  status: AppointmentStatus;
  medicalNotes?: string;
  clinicalNotes?: string;
  preVisitInstructions?: string[];
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  reason?: string;
  createdAt: string;
  costEstimate: number;
  reminderSent?: boolean;
}

export interface PatientRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  allergies: string[];
  medicalAlerts: string[];
  insuranceProvider: string;
  insurancePolicyNumber: string;
  emergencyContact: { name: string; phone: string; relation: string };
  flaggedTeeth?: { toothNumber: number; condition: string; notes?: string }[];
  lastVisitDate?: string;
  nextAppointmentDate?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'reminder' | 'urgent' | 'success';
  read: boolean;
}

export interface ClinicInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  emergencyPhone: string;
}
