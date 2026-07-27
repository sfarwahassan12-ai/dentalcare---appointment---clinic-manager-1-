import { Appointment, PatientRecord, DentalService, Dentist } from '../types';
import { INITIAL_APPOINTMENTS, INITIAL_PATIENTS, SERVICES, DENTISTS } from '../data/initialData';

const APPOINTMENTS_KEY = 'apexdental_appointments';
const PATIENTS_KEY = 'apexdental_patients';
const SERVICES_KEY = 'apexdental_services';
const DENTISTS_KEY = 'apexdental_dentists';

export function getStoredAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(APPOINTMENTS_KEY);
    if (!raw) {
      localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(INITIAL_APPOINTMENTS));
      return INITIAL_APPOINTMENTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_APPOINTMENTS;
  }
}

export function saveAppointments(appointments: Appointment[]): void {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
}

export function getStoredPatients(): PatientRecord[] {
  try {
    const raw = localStorage.getItem(PATIENTS_KEY);
    if (!raw) {
      localStorage.setItem(PATIENTS_KEY, JSON.stringify(INITIAL_PATIENTS));
      return INITIAL_PATIENTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PATIENTS;
  }
}

export function savePatients(patients: PatientRecord[]): void {
  localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients));
}

export function getStoredServices(): DentalService[] {
  try {
    const raw = localStorage.getItem(SERVICES_KEY);
    if (!raw) {
      localStorage.setItem(SERVICES_KEY, JSON.stringify(SERVICES));
      return SERVICES;
    }
    return JSON.parse(raw);
  } catch {
    return SERVICES;
  }
}

export function getStoredDentists(): Dentist[] {
  try {
    const raw = localStorage.getItem(DENTISTS_KEY);
    if (!raw) {
      localStorage.setItem(DENTISTS_KEY, JSON.stringify(DENTISTS));
      return DENTISTS;
    }
    return JSON.parse(raw);
  } catch {
    return DENTISTS;
  }
}

export function resetDemoData(): void {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(INITIAL_APPOINTMENTS));
  localStorage.setItem(PATIENTS_KEY, JSON.stringify(INITIAL_PATIENTS));
  localStorage.setItem(SERVICES_KEY, JSON.stringify(SERVICES));
  localStorage.setItem(DENTISTS_KEY, JSON.stringify(DENTISTS));
}
