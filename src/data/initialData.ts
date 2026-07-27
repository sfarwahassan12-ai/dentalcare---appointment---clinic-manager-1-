import { DentalService, Dentist, Appointment, PatientRecord, ClinicInfo } from '../types';

export const CLINIC_INFO: ClinicInfo = {
  name: 'Apex Dental Studio',
  tagline: 'Modern, Gentle & Comprehensive Oral Care',
  address: '452 Healthcare Blvd, Suite 300, Medical District',
  phone: '(555) 234-8900',
  email: 'care@apexdentalstudio.com',
  hours: 'Mon - Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 2:00 PM',
  emergencyPhone: '(555) 911-DENT'
};

export const SERVICES: DentalService[] = [
  {
    id: 's-clean',
    name: 'Routine Cleaning & Exam',
    category: 'preventative',
    durationMinutes: 45,
    price: 150,
    description: 'Comprehensive dental examination, digital X-rays if needed, plaque removal, and professional polishing.',
    iconName: 'Sparkles',
    prepInstructions: [
      'Brush and floss before arriving.',
      'Bring a list of current medications.',
      'Arrive 10 minutes prior for check-in.'
    ]
  },
  {
    id: 's-white',
    name: 'Laser Teeth Whitening',
    category: 'cosmetic',
    durationMinutes: 60,
    price: 350,
    description: 'In-office clinical gel application with LED light acceleration to brighten teeth up to 8 shades.',
    iconName: 'Smile',
    prepInstructions: [
      'Avoid dark beverages (coffee, red wine) 24 hours prior.',
      'Take mild anti-sensitivity toothpaste 3 days in advance if prone to sensitivity.'
    ]
  },
  {
    id: 's-fill',
    name: 'Composite Cavity Filling',
    category: 'restorative',
    durationMinutes: 45,
    price: 220,
    description: 'Tooth-colored resin restoration for decayed or chipped teeth using localized numb gel.',
    iconName: 'ShieldCheck',
    prepInstructions: [
      'Eat a light meal prior if receiving local anesthetic.',
      'Inform staff if you have latex or local anesthetic allergies.'
    ]
  },
  {
    id: 's-canal',
    name: 'Root Canal Therapy',
    category: 'restorative',
    durationMinutes: 90,
    price: 850,
    description: 'Painless removal of infected pulp to save natural teeth with precise rotary endodontics.',
    iconName: 'Activity',
    prepInstructions: [
      'Take prescribed pre-medications as advised by doctor.',
      'Arrange transportation if opting for mild sedation.'
    ]
  },
  {
    id: 's-ortho',
    name: 'Invisalign & Ortho Consultation',
    category: 'orthodontics',
    durationMinutes: 30,
    price: 90,
    description: '3D intraoral scanning, bite evaluation, and customized clear aligner treatment planning.',
    iconName: 'Scan',
    prepInstructions: [
      'No special prep required.',
      'Bring photos of previous orthodontic records if available.'
    ]
  },
  {
    id: 's-emerg',
    name: 'Emergency Pain & Tooth Relief',
    category: 'emergency',
    durationMinutes: 30,
    price: 180,
    description: 'Same-day urgent assessment for severe toothache, broken crowns, swelling, or facial trauma.',
    iconName: 'Zap',
    prepInstructions: [
      'Rinse mouth gently with warm salt water if bleeding or sore.',
      'Keep broken tooth fragments in milk or saline solution.'
    ]
  },
  {
    id: 's-crown',
    name: 'Same-Day Porcelain Crown',
    category: 'restorative',
    durationMinutes: 90,
    price: 950,
    description: 'Precision digital CAD/CAM milled ceramic crown to restore heavily damaged teeth in a single visit.',
    iconName: 'Crown',
    prepInstructions: [
      'Eat well before treatment.',
      'Expect total visit time around 90 minutes.'
    ]
  }
];

export const DENTISTS: Dentist[] = [
  {
    id: 'd-lin',
    name: 'Dr. Sarah Lin, DDS',
    title: 'Lead Cosmetic & Restorative Dentist',
    specialization: 'Cosmetic Dentistry, Veneers & Cleanings',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    roomNumber: 'Suite A1',
    workingDays: [1, 2, 3, 4, 5],
    workingHours: { start: '08:00', end: '16:00' },
    rating: 4.9,
    reviewsCount: 342
  },
  {
    id: 'd-vance',
    name: 'Dr. Marcus Vance, DMD',
    title: 'Endodontist & Oral Specialist',
    specialization: 'Root Canals, Extractions & Emergency Care',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    roomNumber: 'Suite B2',
    workingDays: [1, 2, 4, 5, 6],
    workingHours: { start: '09:00', end: '17:00' },
    rating: 4.8,
    reviewsCount: 215
  },
  {
    id: 'd-rostova',
    name: 'Dr. Elena Rostova, DDS',
    title: 'Orthodontic & Aligners Specialist',
    specialization: 'Invisalign, Braces & Pediatric Dentistry',
    avatar: 'https://images.unsplash.com/photo-1594824813566-78a9327d620f?auto=format&fit=crop&q=80&w=300',
    roomNumber: 'Suite C1',
    workingDays: [1, 3, 5, 6],
    workingHours: { start: '08:30', end: '16:30' },
    rating: 5.0,
    reviewsCount: 410
  }
];

// Helper to get formatted YYYY-MM-DD
export function getRelativeDateString(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

export const INITIAL_PATIENTS: PatientRecord[] = [
  {
    id: 'p-101',
    name: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    phone: '(555) 839-2011',
    dob: '1992-04-14',
    gender: 'Female',
    address: '124 Maple Street, Apt 4B',
    allergies: ['Penicillin', 'Latex'],
    medicalAlerts: ['High Blood Pressure'],
    insuranceProvider: 'Delta Dental Premier',
    insurancePolicyNumber: 'DEL-9023811',
    emergencyContact: { name: 'Thomas Vance', phone: '(555) 839-2012', relation: 'Spouse' },
    flaggedTeeth: [
      { toothNumber: 14, condition: 'Mild decay detected', notes: 'Scheduled for filling' },
      { toothNumber: 19, condition: 'Previous Crown (2024)' }
    ],
    lastVisitDate: getRelativeDateString(-90),
    nextAppointmentDate: getRelativeDateString(0)
  },
  {
    id: 'p-102',
    name: 'Marcus Brody',
    email: 'mbrody@example.com',
    phone: '(555) 482-9901',
    dob: '1985-09-22',
    gender: 'Male',
    address: '89 Willow Drive',
    allergies: [],
    medicalAlerts: ['Asthma'],
    insuranceProvider: 'MetLife Dental',
    insurancePolicyNumber: 'MET-5541902',
    emergencyContact: { name: 'Sarah Brody', phone: '(555) 482-9900', relation: 'Sister' },
    flaggedTeeth: [
      { toothNumber: 30, condition: 'Sensitivity to cold', notes: 'Evaluate for root canal' }
    ],
    lastVisitDate: getRelativeDateString(-180),
    nextAppointmentDate: getRelativeDateString(0)
  },
  {
    id: 'p-103',
    name: 'Sophia Chen',
    email: 'sophia.c@example.com',
    phone: '(555) 219-0034',
    dob: '1998-11-03',
    gender: 'Female',
    address: '742 Evergreen Terrace',
    allergies: ['Aspirin'],
    medicalAlerts: [],
    insuranceProvider: 'Cigna Dental Health',
    insurancePolicyNumber: 'CG-8820194',
    emergencyContact: { name: 'David Chen', phone: '(555) 219-0030', relation: 'Father' },
    flaggedTeeth: [],
    lastVisitDate: getRelativeDateString(-30),
    nextAppointmentDate: getRelativeDateString(1)
  },
  {
    id: 'p-104',
    name: 'James O\'Connor',
    email: 'j.oconnor@example.com',
    phone: '(555) 774-3321',
    dob: '1976-02-18',
    gender: 'Male',
    address: '533 Oak Ridge Lane',
    allergies: [],
    medicalAlerts: ['Type 2 Diabetes'],
    insuranceProvider: 'Aetna Dental',
    insurancePolicyNumber: 'AET-1092834',
    emergencyContact: { name: 'Mary O\'Connor', phone: '(555) 774-3322', relation: 'Wife' },
    flaggedTeeth: [
      { toothNumber: 3, condition: 'Deep cavity', notes: 'Needs composite restoration' }
    ],
    lastVisitDate: getRelativeDateString(-120),
    nextAppointmentDate: getRelativeDateString(2)
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-001',
    patientName: 'Eleanor Vance',
    patientPhone: '(555) 839-2011',
    patientEmail: 'eleanor.vance@example.com',
    date: getRelativeDateString(0),
    timeSlot: '09:00 AM',
    durationMinutes: 45,
    serviceId: 's-clean',
    dentistId: 'd-lin',
    status: 'checked_in',
    medicalNotes: 'Patient has penicillin allergy. Prefers non-mint polishing paste.',
    clinicalNotes: 'Gums look healthy, mild tartar on lower anterior teeth.',
    preVisitInstructions: SERVICES[0].prepInstructions,
    insuranceProvider: 'Delta Dental Premier',
    insurancePolicyNumber: 'DEL-9023811',
    reason: '6-month routine checkup',
    createdAt: new Date().toISOString(),
    costEstimate: 150,
    reminderSent: true
  },
  {
    id: 'apt-002',
    patientName: 'Marcus Brody',
    patientPhone: '(555) 482-9901',
    patientEmail: 'mbrody@example.com',
    date: getRelativeDateString(0),
    timeSlot: '10:30 AM',
    durationMinutes: 90,
    serviceId: 's-canal',
    dentistId: 'd-vance',
    status: 'confirmed',
    medicalNotes: 'Asthmatic - inhaler in pocket.',
    clinicalNotes: '',
    preVisitInstructions: SERVICES[3].prepInstructions,
    insuranceProvider: 'MetLife Dental',
    insurancePolicyNumber: 'MET-5541902',
    reason: 'Pulpitis on lower molar #30',
    createdAt: new Date().toISOString(),
    costEstimate: 850,
    reminderSent: true
  },
  {
    id: 'apt-003',
    patientName: 'Sophia Chen',
    patientPhone: '(555) 219-0034',
    patientEmail: 'sophia.c@example.com',
    date: getRelativeDateString(0),
    timeSlot: '01:30 PM',
    durationMinutes: 60,
    serviceId: 's-white',
    dentistId: 'd-lin',
    status: 'scheduled',
    medicalNotes: 'Sensitive lower incisors.',
    preVisitInstructions: SERVICES[1].prepInstructions,
    insuranceProvider: 'Cigna Dental Health',
    insurancePolicyNumber: 'CG-8820194',
    reason: 'Brighten smile for upcoming event',
    createdAt: new Date().toISOString(),
    costEstimate: 350,
    reminderSent: false
  },
  {
    id: 'apt-004',
    patientName: 'James O\'Connor',
    patientPhone: '(555) 774-3321',
    patientEmail: 'j.oconnor@example.com',
    date: getRelativeDateString(1),
    timeSlot: '09:30 AM',
    durationMinutes: 45,
    serviceId: 's-fill',
    dentistId: 'd-lin',
    status: 'confirmed',
    medicalNotes: 'Diabetic - monitors blood sugar.',
    preVisitInstructions: SERVICES[2].prepInstructions,
    insuranceProvider: 'Aetna Dental',
    insurancePolicyNumber: 'AET-1092834',
    reason: 'Composite restoration tooth #3',
    createdAt: new Date().toISOString(),
    costEstimate: 220,
    reminderSent: true
  },
  {
    id: 'apt-005',
    patientName: 'Hannah Abbott',
    patientPhone: '(555) 991-2300',
    patientEmail: 'hannah.a@example.com',
    date: getRelativeDateString(1),
    timeSlot: '11:00 AM',
    durationMinutes: 30,
    serviceId: 's-ortho',
    dentistId: 'd-rostova',
    status: 'scheduled',
    medicalNotes: 'Interested in clear aligners.',
    preVisitInstructions: SERVICES[4].prepInstructions,
    insuranceProvider: 'Self-Pay',
    reason: 'Bite alignment check',
    createdAt: new Date().toISOString(),
    costEstimate: 90,
    reminderSent: false
  },
  {
    id: 'apt-006',
    patientName: 'David Miller',
    patientPhone: '(555) 301-4455',
    patientEmail: 'dmiller@example.com',
    date: getRelativeDateString(2),
    timeSlot: '02:00 PM',
    durationMinutes: 30,
    serviceId: 's-emerg',
    dentistId: 'd-vance',
    status: 'scheduled',
    reason: 'Chipped front tooth while playing sports',
    createdAt: new Date().toISOString(),
    costEstimate: 180,
    reminderSent: false
  }
];
