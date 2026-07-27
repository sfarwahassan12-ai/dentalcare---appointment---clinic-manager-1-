# 🦷 Apex Dental Studio — Dental Care & Appointment Management Platform

> **Live Deployment:** [https://dentalcare-appointment-clinic-manag.vercel.app/](https://dentalcare-appointment-clinic-manag.vercel.app/)

Apex Dental Studio is a full-featured, modern web application designed to streamline dental appointment scheduling, pre-visit intake, clinical charting, and reception queue management for patients and clinic staff alike.

---

## 🌟 Key Features

### 👤 Patient Portal
* **4-Step Booking Wizard**: Fast, intuitive scheduling for routine cleanings, laser whitening, cavity fillings, root canals, Invisalign consultations, and emergency pain relief.
* **Interactive Dental Tooth Chart**: Universal 32-tooth numbering system (Upper Arch #1–16, Lower Arch #17–32) allowing patients to pinpoint specific teeth for treatment or log sensitivity prior to arrival.
* **Pre-Visit Instruction Checklists**: Instant display of clinical preparation steps (e.g. pre-medication rules, anti-sensitivity steps, fasting guidelines).
* **iCal & Outlook Calendar Export**: 1-click download of `.ics` calendar event files for appointment reminders.
* **Visit Management**: Easily view, reschedule, or cancel upcoming visits, as well as review historical clinical visit notes.

### 🩺 Clinic Staff & Receptionist Portal
* **Doctor Chair Schedule Matrix**: View side-by-side chair schedules organized by attending doctors (Dr. Sarah Lin, Dr. Marcus Vance, Dr. Elena Rostova) and assigned treatment rooms.
* **Reception Check-In Queue**: Manage live patient check-ins, move patients from the waiting room to the dental chair, and track visit status in real-time.
* **Phone & Walk-In Scheduler**: Quick modal for staff to book walk-ins or phone inquiries directly into the schedule.
* **Doctor Clinical Charting**: Fast modal for dentists to record clinical findings, local anesthetic dosages, composite/crown details, and updated treatment statuses.
* **Patient Medical Records Directory**: Access medical alerts, drug allergies (e.g. Penicillin, Latex), insurance provider policy numbers, and flagged tooth histories.
* **CSV Schedule Export**: Download day-to-day schedule logs and revenue estimations for administrative reporting.

---

## 🛠️ Tech Stack

* **Frontend Framework**: React 19 + TypeScript
* **Styling**: Tailwind CSS v4
* **Icons**: Lucide React
* **Build Tool**: Vite
* **Persistence**: Local Storage Engine with instant Demo Data Reset capability

---

## 📁 Project Structure

```
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── ToothChart.tsx           # Universal 32-Tooth Chart component
│   │   ├── patient/
│   │   │   ├── BookingWizard.tsx        # 4-Step patient scheduling flow & iCal export
│   │   │   └── PatientDashboard.tsx     # Patient home, upcoming visits & symptom logger
│   │   ├── staff/
│   │   │   ├── ClinicalNotesModal.tsx   # Doctor visit charting modal
│   │   │   ├── NewAppointmentModal.tsx  # Walk-in & phone booking modal
│   │   │   └── StaffDashboard.tsx       # Clinic schedule matrix, queue & patient records
│   │   └── Header.tsx                   # Top navigation & mode switcher
│   ├── data/
│   │   └── initialData.ts               # Sample clinic, service, dentist & patient datasets
│   ├── utils/
│   │   └── storage.ts                   # Local storage state synchronization & reset logic
│   ├── types.ts                         # Global TypeScript interfaces & types
│   ├── App.tsx                          # Root application component
│   ├── index.css                        # Tailwind CSS imports
│   └── main.tsx                         # Entry point
├── index.html
├── metadata.json
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started Locally

### Prerequisites
* Node.js (v18 or higher)
* npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd dentalcare-appointment-clinic-manager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:3000` to interact with the application.

---

## 📝 Available Scripts

* `npm run dev`: Starts the local development server using `tsx`.
* `npm run build`: Bundles the application for production using `vite build` and `esbuild`.
* `npm run start`: Runs the built production server.
* `npm run lint`: Runs TypeScript type checking (`tsc --noEmit`).
* 

---

## 📄 License

This project is open-source and licensed under the [Apache-2.0 License](LICENSE).


screenshots for my app:
* https://github.com/sfarwahassan12-ai/dentalcare---appointment---clinic-manager-1-/blob/main/Untitled.png?raw=true
* https://github.com/sfarwahassan12-ai/dentalcare---appointment---clinic-manager-1-/blob/main/screen.png?raw=true
https://github.com/sfarwahassan12-ai/dentalcare---appointment---clinic-manager-1-/blob/main/image.png?raw=true
