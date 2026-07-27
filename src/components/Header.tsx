import React, { useState } from 'react';
import { 
  Smile, 
  Calendar, 
  UserCheck, 
  Bell, 
  PhoneCall, 
  RotateCcw, 
  Sparkles,
  ShieldAlert,
  Clock,
  CheckCircle2,
  X
} from 'lucide-react';
import { CLINIC_INFO } from '../data/initialData';
import { NotificationItem } from '../types';

interface HeaderProps {
  activeMode: 'patient' | 'staff';
  onModeChange: (mode: 'patient' | 'staff') => void;
  onResetData: () => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeMode,
  onModeChange,
  onResetData,
  onOpenBooking
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'Appointment Reminder',
      message: 'Eleanor Vance checked in for 09:00 AM Routine Cleaning with Dr. Lin.',
      timestamp: '10 mins ago',
      type: 'info',
      read: false
    },
    {
      id: 'n2',
      title: 'New Patient Booking',
      message: 'Hannah Abbott booked an Ortho Consultation for tomorrow at 11:00 AM.',
      timestamp: '35 mins ago',
      type: 'success',
      read: false
    },
    {
      id: 'n3',
      title: 'Emergency Care Request',
      message: 'David Miller requested urgent tooth relief slot for Friday.',
      timestamp: '1 hour ago',
      type: 'urgent',
      read: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Clinic Name */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <span className="font-bold text-xl tracking-tighter flex items-center">
                <Smile className="w-6 h-6 stroke-[2.2]" />
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 text-lg tracking-tight">
                  {CLINIC_INFO.name}
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200">
                  Patient & Staff Portal
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                {CLINIC_INFO.tagline}
              </p>
            </div>
          </div>

          {/* Center Mode Switcher */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
            <button
              id="header-btn-patient-mode"
              onClick={() => onModeChange('patient')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeMode === 'patient'
                  ? 'bg-white text-teal-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Patient Portal</span>
            </button>
            <button
              id="header-btn-staff-mode"
              onClick={() => onModeChange('staff')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeMode === 'staff'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-4 h-4 text-cyan-600" />
              <span>Clinic Staff</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Book Button for Patients */}
            {activeMode === 'patient' && (
              <button
                id="header-btn-quick-book"
                onClick={onOpenBooking}
                className="hidden sm:inline-flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-3.5 py-2 rounded-lg text-sm font-medium transition shadow-xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            )}

            {/* Emergency Hotline Button */}
            <a
              href={`tel:${CLINIC_INFO.emergencyPhone}`}
              className="hidden lg:flex items-center space-x-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1.5 rounded-lg border border-rose-200 transition"
              title="24/7 Dental Emergency Hotline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Emergency</span>
            </a>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                id="header-btn-notifications"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {/* Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-slate-900 text-sm">Notifications</h4>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-teal-100 text-teal-800 font-medium">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto my-2">
                    {notifications.map((n) => (
                      <div key={n.id} className="py-2.5 px-1 hover:bg-slate-50 transition rounded-lg">
                        <div className="flex items-start space-x-2.5">
                          {n.type === 'urgent' ? (
                            <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          ) : n.type === 'success' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <Clock className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 text-xs">
                            <p className="font-semibold text-slate-800">{n.title}</p>
                            <p className="text-slate-600 mt-0.5">{n.message}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-teal-600 font-medium hover:underline"
                    >
                      Mark all read
                    </button>
                    <span className="text-[11px] text-slate-400">Live Sync Enabled</span>
                  </div>
                </div>
              )}
            </div>

            {/* Demo Data Reset */}
            <button
              id="header-btn-reset-demo"
              onClick={onResetData}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              title="Reset Demo Data to Initial State"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
