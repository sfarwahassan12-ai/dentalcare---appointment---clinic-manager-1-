import React, { useState } from 'react';
import { 
  Sparkles, 
  User, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  AlertCircle,
  ShieldCheck,
  FileText,
  DollarSign,
  Download,
  X,
  Smile,
  Building
} from 'lucide-react';
import { DentalService, Dentist, Appointment, ServiceCategory } from '../../types';
import { getRelativeDateString } from '../../data/initialData';
import { ToothChart } from '../common/ToothChart';

interface BookingWizardProps {
  services: DentalService[];
  dentists: Dentist[];
  existingAppointments: Appointment[];
  onCompleteBooking: (newAppointment: Appointment) => void;
  onClose?: () => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  services,
  dentists,
  existingAppointments,
  onCompleteBooking,
  onClose
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [selectedService, setSelectedService] = useState<DentalService | null>(services[0]);
  const [selectedDentist, setSelectedDentist] = useState<Dentist | null>(dentists[0]);
  
  // Date selection default to today or tomorrow
  const [selectedDate, setSelectedDate] = useState<string>(getRelativeDateString(0));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('09:00 AM');
  
  // Interactive Tooth Selection
  const [selectedToothNum, setSelectedToothNum] = useState<number | null>(null);

  // Patient Info Form
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [medicalNotes, setMedicalNotes] = useState('');
  const [insuranceProvider, setInsuranceProvider] = useState('Delta Dental');
  const [insurancePolicyNumber, setInsurancePolicyNumber] = useState('');
  const [smsReminder, setSmsReminder] = useState(true);

  // Confirmation state
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  const availableTimeSlots = [
    '08:30 AM', '09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM',
    '01:00 PM', '01:45 PM', '02:30 PM', '03:15 PM', '04:00 PM', '05:00 PM'
  ];

  // Check if slot is taken for selected dentist and date
  const isSlotBooked = (slot: string) => {
    return existingAppointments.some(
      (a) =>
        a.date === selectedDate &&
        a.timeSlot === slot &&
        (selectedDentist ? a.dentistId === selectedDentist.id : true) &&
        a.status !== 'cancelled'
    );
  };

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter((s) => s.category === selectedCategory);

  const handleNextStep = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2 && !selectedDentist) return;
    if (step === 3 && (!selectedDate || !selectedTimeSlot)) return;
    setStep(step + 1);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) return;

    const newApt: Appointment = {
      id: `apt-${Date.now().toString().slice(-6)}`,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientEmail: patientEmail.trim() || 'patient@example.com',
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      durationMinutes: selectedService?.durationMinutes || 45,
      serviceId: selectedService?.id || services[0].id,
      dentistId: selectedDentist?.id || dentists[0].id,
      status: 'scheduled',
      medicalNotes: medicalNotes + (selectedToothNum ? ` [Focus Tooth #${selectedToothNum}]` : ''),
      preVisitInstructions: selectedService?.prepInstructions || [],
      insuranceProvider: insuranceProvider || 'Self-Pay',
      insurancePolicyNumber: insurancePolicyNumber || 'N/A',
      reason: selectedService?.name,
      createdAt: new Date().toISOString(),
      costEstimate: selectedService?.price || 150,
      reminderSent: smsReminder
    };

    setConfirmedAppointment(newApt);
    onCompleteBooking(newApt);
    setStep(5); // Confirmation Screen
  };

  // Calendar .ics download generator simulation
  const downloadIcs = () => {
    if (!confirmedAppointment) return;
    const content = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Apex Dental Studio//NONSGML v1.0//EN
BEGIN:VEVENT
SUMMARY:Dental Appointment - ${selectedService?.name}
DESCRIPTION:${selectedService?.description} with ${selectedDentist?.name}
LOCATION:Apex Dental Studio, Suite 300
DTSTART:${confirmedAppointment.date.replace(/-/g, '')}T090000
DTEND:${confirmedAppointment.date.replace(/-/g, '')}T100000
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'dental_appointment.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-4xl mx-auto my-6">
      
      {/* Header bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 p-6 text-white flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 bg-teal-500/20 text-teal-300 rounded-lg border border-teal-500/30">
              <Smile className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold tracking-tight">Easy Dental Booking</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Book your appointment in less than 2 minutes. Transparent pricing & instant confirmation.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Progress Steps Indicator */}
      {step < 5 && (
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 max-w-2xl mx-auto">
            <div className={`flex items-center space-x-1.5 ${step >= 1 ? 'text-teal-700 font-bold' : ''}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-teal-600 text-white' : 'bg-slate-200'}`}>1</span>
              <span className="hidden sm:inline">Service</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />

            <div className={`flex items-center space-x-1.5 ${step >= 2 ? 'text-teal-700 font-bold' : ''}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-teal-600 text-white' : 'bg-slate-200'}`}>2</span>
              <span className="hidden sm:inline">Dentist</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />

            <div className={`flex items-center space-x-1.5 ${step >= 3 ? 'text-teal-700 font-bold' : ''}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-teal-600 text-white' : 'bg-slate-200'}`}>3</span>
              <span className="hidden sm:inline">Date & Time</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />

            <div className={`flex items-center space-x-1.5 ${step >= 4 ? 'text-teal-700 font-bold' : ''}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 4 ? 'bg-teal-600 text-white' : 'bg-slate-200'}`}>4</span>
              <span className="hidden sm:inline">Details</span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 1: Select Dental Service */}
      {step === 1 && (
        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">Step 1: Select Dental Service</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose the care you need today. All treatments include digital prep guidance.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                { id: 'all', label: 'All Services' },
                { id: 'preventative', label: 'Preventative' },
                { id: 'cosmetic', label: 'Cosmetic' },
                { id: 'restorative', label: 'Restorative' },
                { id: 'orthodontics', label: 'Orthodontics' },
                { id: 'emergency', label: 'Emergency Pain' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id as ServiceCategory | 'all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                    selectedCategory === cat.id
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredServices.map((svc) => {
              const isSelected = selectedService?.id === svc.id;
              return (
                <div
                  key={svc.id}
                  onClick={() => setSelectedService(svc)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50/40 ring-2 ring-teal-500/20 shadow-md'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{svc.name}</h4>
                        <div className="flex items-center space-x-2 text-xs text-slate-500 mt-0.5">
                          <span className="flex items-center">
                            <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                            {svc.durationMinutes} mins
                          </span>
                          <span>•</span>
                          <span className="font-semibold text-slate-700">${svc.price} est.</span>
                        </div>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2">
                    {svc.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNextStep}
              disabled={!selectedService}
              className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition shadow-md disabled:opacity-50"
            >
              <span>Continue to Select Dentist</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Choose Dentist */}
      {step === 2 && (
        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">Step 2: Choose Your Dentist</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select a specialized doctor or choose any available dentist for the earliest slot.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dentists.map((doc) => {
              const isSelected = selectedDentist?.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDentist(doc)}
                  className={`cursor-pointer p-5 rounded-2xl border text-center transition-all ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50/40 ring-2 ring-teal-500/20 shadow-md'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-white shadow-sm"
                  />
                  <h4 className="font-bold text-slate-900 text-sm mt-3">{doc.name}</h4>
                  <p className="text-xs font-medium text-teal-700 mt-0.5">{doc.title}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{doc.specialization}</p>

                  <div className="flex items-center justify-center space-x-1 text-xs font-semibold text-slate-700 mt-3 pt-3 border-t border-slate-100">
                    <span className="text-amber-500">★</span>
                    <span>{doc.rating}</span>
                    <span className="text-slate-400 font-normal">({doc.reviewsCount} reviews)</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="flex items-center space-x-1.5 text-slate-600 hover:text-slate-900 text-sm font-medium px-4 py-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNextStep}
              disabled={!selectedDentist}
              className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition shadow-md disabled:opacity-50"
            >
              <span>Select Date & Time</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Date & Time Slot Selector */}
      {step === 3 && (
        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">Step 3: Select Date & Available Time Slot</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Available hours for {selectedDentist?.name} ({selectedDentist?.roomNumber}).
            </p>
          </div>

          {/* Date Picker Row */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Appointment Date
            </label>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {[0, 1, 2, 3, 4, 5, 6].map((offset) => {
                const dateStr = getRelativeDateString(offset);
                const dateObj = new Date(dateStr + 'T00:00:00');
                const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                const monthDay = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                const isSelected = selectedDate === dateStr;

                return (
                  <button
                    key={dateStr}
                    type="button"
                    onClick={() => setSelectedDate(dateStr)}
                    className={`flex-1 min-w-[90px] p-3 rounded-2xl border text-center transition ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-102'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block text-[11px] font-medium opacity-80 uppercase">{dayName}</span>
                    <span className="block text-sm font-bold mt-0.5">{monthDay}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots Grid */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Select Time Slot
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
              {availableTimeSlots.map((slot) => {
                const booked = isSlotBooked(slot);
                const isSelected = selectedTimeSlot === slot;

                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={booked}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition ${
                      booked
                        ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                        : isSelected
                        ? 'bg-teal-600 text-white border-teal-700 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-teal-500 hover:bg-teal-50/50'
                    }`}
                  >
                    {slot}
                    {booked && <span className="block text-[9px] text-slate-400 font-normal">Booked</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Tooth Selector */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Focus Tooth Selection (Optional)</h4>
                <p className="text-xs text-slate-500">Is there a specific tooth causing discomfort?</p>
              </div>
              {selectedToothNum && (
                <button
                  type="button"
                  onClick={() => setSelectedToothNum(null)}
                  className="text-xs text-rose-600 font-medium hover:underline"
                >
                  Clear Selection (# Tooth {selectedToothNum})
                </button>
              )}
            </div>

            <ToothChart
              selectedTooth={selectedToothNum}
              onSelectTooth={(num) => setSelectedToothNum(num)}
            />
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="flex items-center space-x-1.5 text-slate-600 hover:text-slate-900 text-sm font-medium px-4 py-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNextStep}
              className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition shadow-md"
            >
              <span>Patient Details</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Patient Details & Medical Notes */}
      {step === 4 && (
        <form onSubmit={handleFinalSubmit} className="p-6 sm:p-8">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">Step 4: Patient Information & Pre-Visit Details</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter contact info for appointment updates and digital intake.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Eleanor Vance"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number (SMS Reminders) *
              </label>
              <input
                type="tel"
                required
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="(555) 000-0000"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                placeholder="eleanor@example.com"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Dental Insurance Provider
              </label>
              <select
                value={insuranceProvider}
                onChange={(e) => setInsuranceProvider(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
              >
                <option value="Delta Dental">Delta Dental</option>
                <option value="MetLife Dental">MetLife Dental</option>
                <option value="Cigna Dental">Cigna Dental</option>
                <option value="Aetna Dental">Aetna Dental</option>
                <option value="Guardian">Guardian</option>
                <option value="Self-Pay">Self-Pay / No Insurance</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Medical Alerts, Allergies, or Specific Pain Notes
            </label>
            <textarea
              rows={3}
              value={medicalNotes}
              onChange={(e) => setMedicalNotes(e.target.value)}
              placeholder="e.g. Latex allergy, sensitivity to cold water, high blood pressure, extreme anxiety..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-2 bg-teal-50 p-3 rounded-xl border border-teal-200 mb-6 text-xs text-teal-800">
            <input
              type="checkbox"
              id="smsToggle"
              checked={smsReminder}
              onChange={(e) => setSmsReminder(e.target.checked)}
              className="w-4 h-4 text-teal-600 rounded border-teal-300 focus:ring-teal-500"
            />
            <label htmlFor="smsToggle" className="font-medium cursor-pointer">
              Send me automated SMS & email appointment confirmations and pre-visit prep instructions.
            </label>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex items-center space-x-1.5 text-slate-600 hover:text-slate-900 text-sm font-medium px-4 py-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="submit"
              className="flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg transition"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Confirm & Book Appointment</span>
            </button>
          </div>
        </form>
      )}

      {/* STEP 5: Instant Confirmation Screen */}
      {step === 5 && confirmedAppointment && (
        <div className="p-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h3 className="text-2xl font-extrabold text-slate-900">Appointment Confirmed!</h3>
          <p className="text-xs text-slate-500 mt-1">
            Reference Code: <span className="font-mono font-bold text-slate-800">{confirmedAppointment.id}</span>
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left my-6 space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <span className="text-slate-500">Service:</span>
              <span className="font-bold text-slate-900 text-sm">{selectedService?.name}</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <span className="text-slate-500">Attending Doctor:</span>
              <span className="font-semibold text-slate-800">{selectedDentist?.name} ({selectedDentist?.roomNumber})</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <span className="text-slate-500">Date & Time:</span>
              <span className="font-bold text-teal-700 text-sm">
                {confirmedAppointment.date} at {confirmedAppointment.timeSlot}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Estimated Cost:</span>
              <span className="font-bold text-slate-900">${confirmedAppointment.costEstimate}</span>
            </div>
          </div>

          {/* Pre-visit instructions box */}
          {selectedService?.prepInstructions && selectedService.prepInstructions.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left mb-6">
              <h4 className="font-bold text-amber-900 text-xs flex items-center space-x-1.5 mb-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Pre-Visit Instructions</span>
              </h4>
              <ul className="list-disc list-inside text-xs text-amber-800 space-y-1">
                {selectedService.prepInstructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={downloadIcs}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition"
            >
              <Download className="w-4 h-4" />
              <span>Add to iCal / Outlook</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-xs font-semibold transition"
              >
                Go to Patient Dashboard
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
