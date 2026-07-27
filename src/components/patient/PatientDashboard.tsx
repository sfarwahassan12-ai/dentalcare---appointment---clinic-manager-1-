import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Sparkles, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Phone, 
  MapPin, 
  HelpCircle,
  X,
  Send,
  PlusCircle,
  Activity,
  Smile
} from 'lucide-react';
import { Appointment, DentalService, Dentist } from '../../types';
import { ToothChart } from '../common/ToothChart';

interface PatientDashboardProps {
  appointments: Appointment[];
  services: DentalService[];
  dentists: Dentist[];
  onOpenBooking: () => void;
  onCancelAppointment: (id: string) => void;
  onRescheduleAppointment: (id: string, newDate: string, newSlot: string) => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({
  appointments,
  services,
  dentists,
  onOpenBooking,
  onCancelAppointment,
  onRescheduleAppointment
}) => {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [symptomText, setSymptomText] = useState('');
  const [symptomLogged, setSymptomLogged] = useState(false);

  // Reschedule modal state
  const [rescheduleApt, setRescheduleApt] = useState<Appointment | null>(null);
  const [newRescheduleDate, setNewRescheduleDate] = useState('');
  const [newRescheduleSlot, setNewRescheduleSlot] = useState('10:00 AM');

  // Filter patient's appointments (exclude cancelled unless viewed in history)
  const upcomingAppointments = appointments
    .filter((a) => a.status !== 'cancelled' && a.status !== 'completed')
    .sort((a, b) => a.date.localeCompare(b.date));

  const pastAppointments = appointments
    .filter((a) => a.status === 'completed' || a.status === 'cancelled');

  const getService = (id: string) => services.find((s) => s.id === id);
  const getDentist = (id: string) => dentists.find((d) => d.id === id);

  const handleLogSymptom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTooth) return;
    setSymptomLogged(true);
    setTimeout(() => {
      setSymptomLogged(false);
      setSymptomText('');
      setSelectedTooth(null);
    }, 3000);
  };

  const handleConfirmReschedule = () => {
    if (!rescheduleApt || !newRescheduleDate) return;
    onRescheduleAppointment(rescheduleApt.id, newRescheduleDate, newRescheduleSlot);
    setRescheduleApt(null);
  };

  return (
    <div className="space-y-8">
      
      {/* Welcome & Quick Action Hero */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-cyan-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="px-3 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full text-xs font-semibold tracking-wider uppercase inline-block mb-3">
            Patient Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome to Apex Dental Studio
          </h1>
          <p className="text-sm text-teal-100/90 mt-2 leading-relaxed">
            Manage your appointments, review pre-visit instructions, track dental history, or log tooth sensitivity before your next visit.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={onOpenBooking}
              className="flex items-center space-x-2 bg-white text-teal-900 hover:bg-teal-50 px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition"
            >
              <PlusCircle className="w-4 h-4 text-teal-600" />
              <span>Book New Appointment</span>
            </button>

            <a
              href="#symptom-checker"
              className="flex items-center space-x-2 bg-teal-800/80 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl font-medium text-xs border border-teal-600/50 transition"
            >
              <Smile className="w-4 h-4 text-cyan-300" />
              <span>Interactive Tooth Log</span>
            </a>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-teal-600" />
            <span>Upcoming Visits ({upcomingAppointments.length})</span>
          </h2>
          <button
            onClick={onOpenBooking}
            className="text-xs text-teal-700 font-semibold hover:underline"
          >
            + Schedule another
          </button>
        </div>

        {upcomingAppointments.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
            <p className="text-sm font-semibold text-slate-700">No upcoming appointments scheduled.</p>
            <p className="text-xs text-slate-500 mt-1">Book a 6-month cleaning or cosmetic checkup anytime.</p>
            <button
              onClick={onOpenBooking}
              className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-teal-700 transition"
            >
              Book Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingAppointments.map((apt) => {
              const service = getService(apt.serviceId);
              const dentist = getDentist(apt.dentistId);

              return (
                <div
                  key={apt.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        apt.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : apt.status === 'checked_in'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {apt.status.replace('_', ' ')}
                      </span>

                      <span className="text-xs font-mono text-slate-400">#{apt.id}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base">{service?.name || apt.reason}</h3>
                    
                    <div className="mt-3 space-y-2 text-xs text-slate-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                        <span className="font-semibold text-slate-800">
                          {apt.date} at {apt.timeSlot} ({apt.durationMinutes} mins)
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>{dentist?.name} — {dentist?.roomNumber}</span>
                      </div>
                    </div>

                    {/* Pre Visit Instructions Box */}
                    {service?.prepInstructions && service.prepInstructions.length > 0 && (
                      <div className="mt-4 p-3 bg-teal-50/60 rounded-xl border border-teal-100 text-xs">
                        <span className="font-bold text-teal-900 block mb-1 flex items-center">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-teal-600" />
                          Pre-Visit Prep Checklist:
                        </span>
                        <ul className="list-disc list-inside text-slate-700 space-y-0.5 text-[11px]">
                          {service.prepInstructions.map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setRescheduleApt(apt)}
                      className="text-xs font-medium text-teal-700 hover:text-teal-900 hover:underline"
                    >
                      Reschedule Date
                    </button>

                    <button
                      onClick={() => onCancelAppointment(apt.id)}
                      className="text-xs font-medium text-rose-600 hover:text-rose-800 hover:underline"
                    >
                      Cancel Visit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Tooth Symptom & Focus Tooth Checker */}
      <section id="symptom-checker" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Smile className="w-5 h-5 text-teal-600" />
            <span>Interactive Tooth Symptom Logger</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tap a specific tooth below to flag sensitivity, pain, or chipped enamel before arriving for your treatment.
          </p>
        </div>

        <ToothChart
          selectedTooth={selectedTooth}
          onSelectTooth={(num) => setSelectedTooth(num)}
        />

        {selectedTooth && (
          <form onSubmit={handleLogSymptom} className="mt-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Describe sensitivity or issue on Tooth #{selectedTooth}:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={symptomText}
                onChange={(e) => setSymptomText(e.target.value)}
                placeholder="e.g. Sharp pain when drinking cold liquids..."
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Save to Chart</span>
              </button>
            </div>

            {symptomLogged && (
              <p className="text-xs text-emerald-700 font-semibold mt-2 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                Logged for Tooth #{selectedTooth}! Your attending dentist will review this prior to your visit.
              </p>
            )}
          </form>
        )}
      </section>

      {/* Past Visits & Medical Receipts */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
          <FileText className="w-5 h-5 text-slate-600" />
          <span>Past Visits & Care History</span>
        </h2>

        {pastAppointments.length === 0 ? (
          <p className="text-xs text-slate-500 italic bg-white p-4 rounded-xl border border-slate-200">
            No past appointment logs found.
          </p>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden">
            {pastAppointments.map((apt) => {
              const service = getService(apt.serviceId);
              const dentist = getDentist(apt.dentistId);

              return (
                <div key={apt.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 text-sm">{service?.name || apt.reason}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                        {apt.status}
                      </span>
                    </div>
                    <p className="text-slate-500 mt-1">
                      {apt.date} • Attending: {dentist?.name}
                    </p>
                    {apt.clinicalNotes && (
                      <p className="text-teal-800 font-medium bg-teal-50 p-2 rounded-lg mt-2 border border-teal-100">
                        Doctor's Note: {apt.clinicalNotes}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-slate-900 text-sm">${apt.costEstimate}</span>
                    <span className="block text-[10px] text-slate-400">Insurance Claim Processed</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Reschedule Modal */}
      {rescheduleApt && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Reschedule Visit</h3>
              <button onClick={() => setRescheduleApt(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">New Date</label>
                <input
                  type="date"
                  value={newRescheduleDate}
                  onChange={(e) => setNewRescheduleDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">New Time Slot</label>
                <select
                  value={newRescheduleSlot}
                  onChange={(e) => setNewRescheduleSlot(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="01:30 PM">01:30 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
              <button
                onClick={() => setRescheduleApt(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReschedule}
                className="px-4 py-2 text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-xs"
              >
                Save Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
