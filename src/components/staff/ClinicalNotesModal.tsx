import React, { useState } from 'react';
import { X, FileText, CheckCircle2, Shield } from 'lucide-react';
import { Appointment } from '../../types';

interface ClinicalNotesModalProps {
  appointment: Appointment;
  onSaveNotes: (aptId: string, clinicalNotes: string, newStatus: Appointment['status']) => void;
  onClose: () => void;
}

export const ClinicalNotesModal: React.FC<ClinicalNotesModalProps> = ({
  appointment,
  onSaveNotes,
  onClose
}) => {
  const [notes, setNotes] = useState(appointment.clinicalNotes || '');
  const [status, setStatus] = useState<Appointment['status']>(appointment.status === 'in_progress' ? 'completed' : appointment.status);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveNotes(appointment.id, notes.trim(), status);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Doctor & Clinical Visit Log</h3>
            <p className="text-xs text-slate-500">
              Patient: <span className="font-semibold text-slate-800">{appointment.patientName}</span> (#{appointment.id})
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Appointment Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Appointment['status'])}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-medium"
            >
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="checked_in">Checked In (In Waiting Room)</option>
              <option value="in_progress">In Progress (In Dental Chair)</option>
              <option value="completed">Completed (Visit Done)</option>
              <option value="no_show">No-Show</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Clinical Findings, Anesthetic & Treatment Performed
            </label>
            <textarea
              rows={4}
              required
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Administered 1 carpule Lidocaine 2% w/Epi. Isolated tooth #14, removed decayed dentin, placed shade A2 composite restoration, polished bite. Patient tolerated well."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-600">
            <span className="font-bold text-slate-800 block mb-0.5">Insurance & Billing Note:</span>
            <span>Est. Visit Total: ${appointment.costEstimate} ({appointment.insuranceProvider})</span>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xs"
            >
              Save Clinical Charting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
