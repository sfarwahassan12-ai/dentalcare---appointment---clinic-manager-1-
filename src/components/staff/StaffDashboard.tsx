import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Search, 
  Filter, 
  FileSpreadsheet, 
  UserCheck, 
  ShieldAlert, 
  TrendingUp, 
  DollarSign, 
  Edit3, 
  MessageSquare, 
  Send, 
  Check, 
  Trash2,
  Stethoscope,
  ChevronRight,
  Smile
} from 'lucide-react';
import { Appointment, DentalService, Dentist, PatientRecord } from '../../types';
import { getRelativeDateString } from '../../data/initialData';
import { NewAppointmentModal } from './NewAppointmentModal';
import { ClinicalNotesModal } from './ClinicalNotesModal';

interface StaffDashboardProps {
  appointments: Appointment[];
  patients: PatientRecord[];
  services: DentalService[];
  dentists: Dentist[];
  onUpdateStatus: (aptId: string, status: Appointment['status']) => void;
  onSaveClinicalNotes: (aptId: string, notes: string, status: Appointment['status']) => void;
  onAddAppointment: (newApt: Appointment) => void;
  onDeleteAppointment: (aptId: string) => void;
}

export const StaffDashboard: React.FC<StaffDashboardProps> = ({
  appointments,
  patients,
  services,
  dentists,
  onUpdateStatus,
  onSaveClinicalNotes,
  onAddAppointment,
  onDeleteAppointment
}) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'queue' | 'patients' | 'services'>('schedule');
  const [selectedDate, setSelectedDate] = useState<string>(getRelativeDateString(0));
  const [selectedDentistFilter, setSelectedDentistFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showNewAptModal, setShowNewAptModal] = useState(false);
  const [activeClinicalNotesApt, setActiveClinicalNotesApt] = useState<Appointment | null>(null);

  // SMS Notification Toast Simulation
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter((apt) => {
    const matchesDate = apt.date === selectedDate;
    const matchesDentist = selectedDentistFilter === 'all' || apt.dentistId === selectedDentistFilter;
    const matchesStatus = selectedStatusFilter === 'all' || apt.status === selectedStatusFilter;
    const matchesSearch = 
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.patientPhone.includes(searchQuery) ||
      apt.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDate && matchesDentist && matchesStatus && matchesSearch;
  });

  // Calculate Metrics
  const todayAppointments = appointments.filter((a) => a.date === selectedDate);
  const checkedInCount = todayAppointments.filter((a) => a.status === 'checked_in' || a.status === 'in_progress').length;
  const completedCount = todayAppointments.filter((a) => a.status === 'completed').length;
  const totalRevenueEst = todayAppointments.reduce((sum, a) => sum + (a.status !== 'cancelled' ? a.costEstimate : 0), 0);

  const getService = (id: string) => services.find((s) => s.id === id);
  const getDentist = (id: string) => dentists.find((d) => d.id === id);

  // Export schedule to CSV
  const exportCsv = () => {
    const headers = 'ID,Patient Name,Phone,Date,Time,Service,Dentist,Status,Cost\n';
    const rows = filteredAppointments.map(a => 
      `"${a.id}","${a.patientName}","${a.patientPhone}","${a.date}","${a.timeSlot}","${getService(a.serviceId)?.name || ''}","${getDentist(a.dentistId)?.name || ''}","${a.status}",${a.costEstimate}`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `dental_schedule_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Schedule exported to CSV successfully!');
  };

  return (
    <div className="space-y-6">
      
      {/* Toast banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-2 text-xs font-semibold animate-fade-in border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner / Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Today's Total Visits</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{todayAppointments.length}</h3>
            <p className="text-[11px] text-teal-700 font-medium mt-1">{completedCount} completed today</p>
          </div>
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Checked-In Queue</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{checkedInCount}</h3>
            <p className="text-[11px] text-amber-600 font-medium mt-1">Waiting in reception / chair</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Est. Daily Billing</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">${totalRevenueEst}</h3>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">Insurance & copays</p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-5 rounded-2xl text-white shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Quick Operations</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>
          <button
            onClick={() => setShowNewAptModal(true)}
            className="mt-3 w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Phone / Walk-In</span>
          </button>
        </div>
      </div>

      {/* Staff Tab Switcher & Action Row */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Navigation Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-2 ${
              activeTab === 'schedule' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Chair Schedule</span>
          </button>

          <button
            onClick={() => setActiveTab('queue')}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-2 ${
              activeTab === 'queue' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Patient Queue</span>
          </button>

          <button
            onClick={() => setActiveTab('patients')}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-2 ${
              activeTab === 'patients' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Patient Records ({patients.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-2 ${
              activeTab === 'services' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>Services & Fees</span>
          </button>
        </div>

        {/* Date Filter & CSV Export */}
        <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 border border-slate-300 rounded-xl text-xs font-medium bg-slate-50 focus:outline-none"
          />

          <button
            onClick={exportCsv}
            className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 flex items-center space-x-1.5"
            title="Export to CSV"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">CSV Export</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Chair Schedule / Time Matrix */}
      {activeTab === 'schedule' && (
        <div className="space-y-4">
          
          {/* Filters Bar */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-3 text-xs">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search patient name, phone, or appointment #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 bg-white focus:outline-none"
              />
            </div>

            {/* Dentist Filter */}
            <select
              value={selectedDentistFilter}
              onChange={(e) => setSelectedDentistFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-medium"
            >
              <option value="all">All Doctors</option>
              {dentists.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="checked_in">Checked In</option>
              <option value="in_progress">In Chair</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Schedule Grid by Dentist Rooms */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {dentists
              .filter((d) => selectedDentistFilter === 'all' || d.id === selectedDentistFilter)
              .map((dentist) => {
                const docAppointments = filteredAppointments.filter((a) => a.dentistId === dentist.id);

                return (
                  <div key={dentist.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                    
                    {/* Room Header */}
                    <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={dentist.avatar}
                          alt={dentist.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-400"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-white">{dentist.name}</h4>
                          <span className="text-[10px] text-teal-300 block">{dentist.roomNumber} • {dentist.specialization}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                        {docAppointments.length} Visits
                      </span>
                    </div>

                    {/* Room Appointments List */}
                    <div className="p-4 divide-y divide-slate-100 min-h-[300px]">
                      {docAppointments.length === 0 ? (
                        <div className="text-center py-12 text-slate-400 text-xs italic">
                          No visits scheduled for {dentist.name} on this date.
                        </div>
                      ) : (
                        docAppointments.map((apt) => {
                          const service = getService(apt.serviceId);

                          return (
                            <div key={apt.id} className="py-3 hover:bg-slate-50 transition rounded-xl p-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <span className="font-bold text-slate-900 text-sm block">
                                    {apt.patientName}
                                  </span>
                                  <span className="text-xs text-teal-700 font-semibold block mt-0.5">
                                    {service?.name || apt.reason}
                                  </span>
                                  <span className="text-[11px] text-slate-500 flex items-center mt-1">
                                    <Clock className="w-3 h-3 mr-1 text-slate-400" />
                                    {apt.timeSlot} ({apt.durationMinutes} mins)
                                  </span>
                                </div>

                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  apt.status === 'completed'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : apt.status === 'checked_in' || apt.status === 'in_progress'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {apt.status.replace('_', ' ')}
                                </span>
                              </div>

                              {apt.medicalNotes && (
                                <p className="text-[11px] text-rose-800 bg-rose-50 p-1.5 rounded-lg mt-2 border border-rose-100 font-medium">
                                  Alert: {apt.medicalNotes}
                                </p>
                              )}

                              {/* Staff Quick Action Bar */}
                              <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                                <div className="flex items-center space-x-1">
                                  {apt.status === 'scheduled' || apt.status === 'confirmed' ? (
                                    <button
                                      onClick={() => {
                                        onUpdateStatus(apt.id, 'checked_in');
                                        triggerToast(`Marked ${apt.patientName} as Checked In.`);
                                      }}
                                      className="bg-teal-50 text-teal-700 hover:bg-teal-100 px-2.5 py-1 rounded-lg font-semibold text-[11px]"
                                    >
                                      Check In Patient
                                    </button>
                                  ) : apt.status === 'checked_in' ? (
                                    <button
                                      onClick={() => {
                                        onUpdateStatus(apt.id, 'in_progress');
                                        triggerToast(`Moved ${apt.patientName} to Dental Chair.`);
                                      }}
                                      className="bg-blue-600 text-white hover:bg-blue-700 px-2.5 py-1 rounded-lg font-semibold text-[11px]"
                                    >
                                      Seat in Chair
                                    </button>
                                  ) : null}

                                  <button
                                    onClick={() => setActiveClinicalNotesApt(apt)}
                                    className="text-slate-600 hover:text-slate-900 px-2 py-1 rounded-lg font-medium text-[11px] hover:bg-slate-100 flex items-center space-x-1"
                                  >
                                    <Edit3 className="w-3 h-3" />
                                    <span>Chart Notes</span>
                                  </button>
                                </div>

                                <button
                                  onClick={() => triggerToast(`SMS reminder re-sent to ${apt.patientPhone}`)}
                                  className="text-slate-400 hover:text-teal-600 p-1"
                                  title="Send SMS Reminder"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* TAB 2: Patient Waiting Room Queue */}
      {activeTab === 'queue' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Reception & Active Queue ({selectedDate})</h3>
              <p className="text-xs text-slate-500">Live tracking for front-desk check-ins and chair assignments.</p>
            </div>
            <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-bold">
              {todayAppointments.filter(a => a.status === 'checked_in').length} In Waiting Room
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-semibold">Patient Name</th>
                  <th className="py-3 px-4 font-semibold">Time Slot</th>
                  <th className="py-3 px-4 font-semibold">Treatment</th>
                  <th className="py-3 px-4 font-semibold">Assigned Doctor</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {todayAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400 italic">
                      No appointments scheduled for today.
                    </td>
                  </tr>
                ) : (
                  todayAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 block">{apt.patientName}</span>
                        <span className="text-[10px] text-slate-500">{apt.patientPhone}</span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-700">{apt.timeSlot}</td>
                      <td className="py-3 px-4 font-medium text-slate-800">{getService(apt.serviceId)?.name}</td>
                      <td className="py-3 px-4 text-slate-600">{getDentist(apt.dentistId)?.name}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          apt.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : apt.status === 'checked_in'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {apt.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => setActiveClinicalNotesApt(apt)}
                          className="bg-slate-900 text-white hover:bg-slate-800 px-3 py-1 rounded-lg font-semibold text-[11px]"
                        >
                          Update Status / Chart
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Patient Records Directory */}
      {activeTab === 'patients' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Patient Medical Records Directory</h3>
              <p className="text-xs text-slate-500">View allergies, insurance policies, and flagged tooth histories.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patients.map((pt) => (
              <div key={pt.id} className="border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{pt.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{pt.phone} • {pt.email}</p>
                  </div>
                  <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">{pt.id}</span>
                </div>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl">
                    <span className="text-slate-500">Insurance:</span>
                    <span className="font-bold text-slate-800">{pt.insuranceProvider} ({pt.insurancePolicyNumber})</span>
                  </div>

                  {pt.allergies.length > 0 && (
                    <div className="p-2 bg-rose-50 rounded-xl text-rose-800 font-semibold border border-rose-100 flex items-center space-x-1">
                      <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                      <span>Allergies: {pt.allergies.join(', ')}</span>
                    </div>
                  )}

                  {pt.flaggedTeeth && pt.flaggedTeeth.length > 0 && (
                    <div className="p-2 bg-amber-50 rounded-xl text-amber-900 font-medium border border-amber-200">
                      <span className="font-bold block mb-0.5">Flagged Tooth History:</span>
                      {pt.flaggedTeeth.map((ft, i) => (
                        <span key={i} className="block text-[11px]">
                          Tooth #{ft.toothNumber}: {ft.condition}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Services & Fee Schedule */}
      {activeTab === 'services' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="mb-4">
            <h3 className="font-bold text-slate-900 text-base">Clinic Service Catalog & Fee Schedule</h3>
            <p className="text-xs text-slate-500">Standard durations and price estimates configured for Apex Dental.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((svc) => (
              <div key={svc.id} className="p-4 rounded-2xl border border-slate-200 hover:border-teal-400 transition">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 text-sm">{svc.name}</span>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">${svc.price}</span>
                </div>
                <p className="text-xs text-slate-500">{svc.description}</p>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Duration: {svc.durationMinutes} min</span>
                  <span className="capitalize">{svc.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      {showNewAptModal && (
        <NewAppointmentModal
          services={services}
          dentists={dentists}
          onAddAppointment={onAddAppointment}
          onClose={() => setShowNewAptModal(false)}
        />
      )}

      {activeClinicalNotesApt && (
        <ClinicalNotesModal
          appointment={activeClinicalNotesApt}
          onSaveNotes={onSaveClinicalNotes}
          onClose={() => setActiveClinicalNotesApt(null)}
        />
      )}

    </div>
  );
};
