import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PatientDashboard } from './components/patient/PatientDashboard';
import { BookingWizard } from './components/patient/BookingWizard';
import { StaffDashboard } from './components/staff/StaffDashboard';
import { Appointment, PatientRecord, DentalService, Dentist } from './types';
import { 
  getStoredAppointments, 
  saveAppointments, 
  getStoredPatients, 
  savePatients, 
  getStoredServices, 
  getStoredDentists, 
  resetDemoData 
} from './utils/storage';

export default function App() {
  const [activeMode, setActiveMode] = useState<'patient' | 'staff'>('patient');
  const [showBookingModal, setShowBookingModal] = useState(false);

  // State
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [services, setServices] = useState<DentalService[]>([]);
  const [dentists, setDentists] = useState<Dentist[]>([]);

  // Load from local storage on initial mount
  useEffect(() => {
    setAppointments(getStoredAppointments());
    setPatients(getStoredPatients());
    setServices(getStoredServices());
    setDentists(getStoredDentists());
  }, []);

  // Save changes to storage
  const handleAppointmentsChange = (updated: Appointment[]) => {
    setAppointments(updated);
    saveAppointments(updated);
  };

  const handlePatientsChange = (updated: PatientRecord[]) => {
    setPatients(updated);
    savePatients(updated);
  };

  const handleResetData = () => {
    resetDemoData();
    setAppointments(getStoredAppointments());
    setPatients(getStoredPatients());
    setServices(getStoredServices());
    setDentists(getStoredDentists());
  };

  // Handlers
  const handleCompleteBooking = (newApt: Appointment) => {
    const updated = [newApt, ...appointments];
    handleAppointmentsChange(updated);
  };

  const handleCancelAppointment = (id: string) => {
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status: 'cancelled' as const } : a
    );
    handleAppointmentsChange(updated);
  };

  const handleRescheduleAppointment = (id: string, newDate: string, newSlot: string) => {
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, date: newDate, timeSlot: newSlot, status: 'scheduled' as const } : a
    );
    handleAppointmentsChange(updated);
  };

  const handleUpdateStatus = (aptId: string, status: Appointment['status']) => {
    const updated = appointments.map((a) =>
      a.id === aptId ? { ...a, status } : a
    );
    handleAppointmentsChange(updated);
  };

  const handleSaveClinicalNotes = (aptId: string, notes: string, status: Appointment['status']) => {
    const updated = appointments.map((a) =>
      a.id === aptId ? { ...a, clinicalNotes: notes, status } : a
    );
    handleAppointmentsChange(updated);
  };

  const handleDeleteAppointment = (aptId: string) => {
    const updated = appointments.filter((a) => a.id !== aptId);
    handleAppointmentsChange(updated);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 font-sans antialiased flex flex-col">
      {/* Top Header Navigation */}
      <Header
        activeMode={activeMode}
        onModeChange={(mode) => setActiveMode(mode)}
        onResetData={handleResetData}
        onOpenBooking={() => setShowBookingModal(true)}
      />

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Booking Wizard View / Modal */}
        {showBookingModal ? (
          <BookingWizard
            services={services}
            dentists={dentists}
            existingAppointments={appointments}
            onCompleteBooking={handleCompleteBooking}
            onClose={() => setShowBookingModal(false)}
          />
        ) : activeMode === 'patient' ? (
          <PatientDashboard
            appointments={appointments}
            services={services}
            dentists={dentists}
            onOpenBooking={() => setShowBookingModal(true)}
            onCancelAppointment={handleCancelAppointment}
            onRescheduleAppointment={handleRescheduleAppointment}
          />
        ) : (
          <StaffDashboard
            appointments={appointments}
            patients={patients}
            services={services}
            dentists={dentists}
            onUpdateStatus={handleUpdateStatus}
            onSaveClinicalNotes={handleSaveClinicalNotes}
            onAddAppointment={handleCompleteBooking}
            onDeleteAppointment={handleDeleteAppointment}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">Apex Dental Studio</span>
            <span>•</span>
            <span>Smart Care & Appointment Platform</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveMode(activeMode === 'patient' ? 'staff' : 'patient')}
              className="text-teal-700 font-semibold hover:underline"
            >
              Switch to {activeMode === 'patient' ? 'Clinic Staff View' : 'Patient View'}
            </button>
            <span>•</span>
            <button onClick={handleResetData} className="hover:text-slate-700">
              Reset Demo Data
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
