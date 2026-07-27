🦷 Apex Dental Studio — Dental Care & Appointment Management Platform
Live Deployment:
https://dentalcare-appointment-clinic-manag.vercel.app/

📌 1. Executive Summary & Problem Solved
🎯 What Apex Dental Studio Does
Apex Dental Studio is a full-stack, modern dental clinic management and patient engagement platform. It seamlessly connects patients with dental care providers by bridging online appointment scheduling, pre-visit medical intake, interactive clinical tooth charting, real-time reception queue management, and AI-powered symptom triage.
💡 The Real Problem Solved
Traditional dental practices face recurring operational bottlenecks that frustrate both patients and clinical teams:
Phone-Tag & High No-Show Rates: Patients experience long hold times to book or reschedule appointments, leading to missed care or sudden cancellations.
Lack of Pre-Visit Preparation: Patients often arrive for procedures (such as root canals or sedation whitening) without adhering to necessary pre-medication or fasting instructions, resulting in costly appointment deferrals.
Disorganized Clinical Intake: Dentists waste valuable chair time gathering basic symptom histories that could have been logged before the patient walked through the clinic doors.
Complex Reception Workflows: Receptionists struggle with paper schedules or rigid legacy software to manage multi-doctor chair utilization, walk-in inquiries, and live patient check-in statuses.
👥 Who It Is For
For Patients: Provides a stress-free 24/7 self-service portal to book procedures, review pre-visit preparation checklists, export visits directly to Apple/Google/Outlook calendars (.ics), pinpoint specific tooth sensitivity using a 32-tooth chart, and receive instant AI pre-check advice.
For Clinic Staff & Dentists: Equips receptionists with a live multi-chair schedule matrix and check-in queue, while offering dentists a fast clinical charting interface to log local anesthetic dosages, composite materials, and medical allergy flags.
🔗 2. Live Deployed URL
Clickable Live Link: https://dentalcare-appointment-clinic-manag.vercel.app/
🌟 3. Comprehensive Features List
👤 Patient Portal
4-Step Booking Wizard:
Step 1: Select procedure (Cleanings, Laser Whitening, Cavity Fillings, Root Canals, Invisalign, Emergency Care) with live price & duration estimates.
Step 2: Choose attending doctor (Dr. Sarah Lin, Dr. Marcus Vance, Dr. Elena Rostova).
Step 3: Pick available date and time slot with real-time conflict prevention.
Step 4: Instant confirmation with pre-visit clinical preparation steps.
Interactive 32-Tooth Dental Chart:
Full universal numbering system (Upper Arch #1–16, Lower Arch #17–32).
Click any tooth to highlight and log specific symptoms (e.g., cold sensitivity, throbbing pain, chipped enamel).
Pre-Visit Clinical Instruction Checklists:
Displays procedure-specific prep guidelines (e.g., taking pre-medication 1 hour prior, avoiding coffee/tea, fasting for IV sedation).
iCal & Outlook Calendar Export:
1-click download of .ics calendar event files adhering to RFC-5545 standards.
Appointment Management:
Reschedule visit date/time or cancel upcoming appointments with instant calendar updates.
Review historical visit notes and past medical receipts.
🩺 Clinic Staff & Receptionist Portal
Doctor Chair Schedule Matrix:
Side-by-side view of daily appointments organized by attending dentist and assigned treatment room.
Live Reception Check-In Queue:
Real-time status tracking (Scheduled → Checked In → In Chair → Completed).
One-click check-in button to notify doctors when a patient enters the waiting room.
Phone & Walk-In Quick Scheduler:
Modal interface for receptionists to quickly add phone inquiries or walk-in emergency patients into the master schedule.
Doctor Clinical Charting Modal:
Specialized charting tool for dentists to record clinical diagnosis notes, local anesthetic dosages (e.g. Lidocaine 2% w/ Epinephrine), composite/crown materials used, and tooth status updates.
Patient Medical Directory:
Instant search and view of patient records, drug allergies (e.g., Penicillin, Latex), insurance policy numbers, and flagged tooth histories.
CSV Reporting Export:
1-click export of daily clinic schedules and estimated revenues for practice management reports.
🤖 4. The AI Feature: Apex AI Dental Pre-Visit Triage
🛠️ What the AI Feature Does
The Apex AI Dental Pre-Visit Triage acts as an intelligent, empathetic digital assistant embedded inside the Patient Portal. When a patient selects a tooth on the 32-Tooth Chart and describes their discomfort, the AI assistant sends the structured data to a server-side endpoint (/api/ai-triage).
The AI analyzes the inputs and returns:
Clinical Severity Level: Categorizes pain as Low, Moderate, Urgent, or Emergency.
Likely Dental Considerations: Identifies potential underlying conditions (e.g., Dentin Hypersensitivity, Irreversible Pulpitis, Enamel Fracture, Localized Gingivitis).
Pre-Appointment Comfort Guidelines: Provides safe home-comfort tips prior to the visit (e.g., warm saltwater rinses, avoiding hot/cold triggers, sleeping elevated).
Recommended Clinic Procedure: Suggests appropriate treatment routes for the clinic staff to prepare for.
📜 System Prompt & Instructions
Below is the exact system prompt configured on the server-side proxy route (/api/ai-triage) using the @google/genai TypeScript SDK:
code
TypeScript
const DENTAL_TRIAGE_SYSTEM_PROMPT = `You are Apex Dental AI, an empathetic, clinical pre-visit triage assistant for Apex Dental Studio.
Your task is to analyze patient tooth symptoms, tooth numbers (using universal 1-32 numbering), and duration of pain.

Provide a structured, helpful assessment with:
1. Severity Assessment: Low / Moderate / Urgent / Emergency
2. Likely Dental Considerations: (e.g. Dentin hypersensitivity, Pulpitis, Fracture, Gingival inflammation)
3. Pre-Appointment Comfort Tips: (e.g. Saltwater rinse, OTC pain relief caution, avoiding hot/cold foods)
4. Recommended Clinic Service: (e.g. Comprehensive Cleaning, Root Canal Evaluation, Emergency Care)

Disclaimer: Always end with a clear statement that this is an AI pre-check and does not replace a physical examination by Dr. Sarah Lin, Dr. Marcus Vance, or Dr. Elena Rostova at Apex Dental Studio.`;
🛠️ 5. Tools, Services, and AI Models Used
Category	Technology / Service	Description
Frontend Framework	React 19 + TypeScript	High-performance, type-safe UI architecture
Styling	Tailwind CSS v4	Modern utility-first styling with custom glassmorphism and dental color themes
Icons & Motion	Lucide React + Motion	Responsive icons and smooth layout transitions
Backend & API	Node.js + Express	Full-stack server proxy handling API routes and static asset serving
Dev & Bundling	Vite + tsx + esbuild	Lightning-fast development server and CommonJS production bundling (dist/server.cjs)
AI SDK & Model	@google/genai (Gemini 2.5 Flash)	Google's gemini-2.5-flash model powering server-side AI dental triage
Calendar & Export	Custom iCal (.ics) & CSV Exporter	RFC-5545 compliant .ics generator and CSV data reporting
Persistence	LocalStorage Synchronization Engine	Durable client-side state engine with instant demo data reset capability
Hosting Platform	Vercel / Cloud Run Container	Cloud deployment with HTTPS routing and reverse proxy setup
📸 6. Screenshots of the App in Action
1️⃣ Patient Booking Wizard & Interactive 32-Tooth Chart
![alt text](https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80)

Interactive 32-Tooth Chart allowing patients to pinpoint teeth #1–32 and schedule 4-step appointments with pre-visit prep checklists.
2️⃣ Apex AI Dental Pre-Visit Triage (Gemini 2.5 Flash)
![alt text](https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80)

AI Triage Widget evaluating patient-reported tooth discomfort and outputting severity assessments and pre-visit comfort tips.
3️⃣ Clinic Staff Reception Matrix & Doctor Clinical Charting
![alt text](https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80)

Multi-chair doctor schedule grid, live waiting room queue, walk-in modal, and doctor clinical charting with drug allergy alerts.
🚀 7. How to Run the Project Locally
Prerequisites
Node.js: v18.0.0 or higher
npm: v9.0.0 or higher
Gemini API Key: Get a free key from Google AI Studio
Step 1: Clone the Repository
code
Bash
git clone https://github.com/your-username/dentalcare-appointment-clinic-manager.git
cd dentalcare-appointment-clinic-manager
Step 2: Configure Environment Variables
Create a .env file in the project root directory:
code
Bash
cp .env.example .env
Add your Gemini API Key in .env:
code
Env
GEMINI_API_KEY=your_gemini_api_key_here
Step 3: Install Dependencies
code
Bash
npm install
Step 4: Run Development Server
Start the full-stack Express server with Vite middleware:
code
Bash
npm run dev
Open your browser and navigate to http://localhost:3000.
Step 5: Build & Run Production Bundle
code
Bash
npm run build
npm run start
lightbulb_tips



SCREENSHOTS OF WORK:
https://github.com/sfarwahassan12-ai/dentalcare---appointment---clinic-manager-1-/blob/main/main%20screen.png?raw=true

https://github.com/sfarwahassan12-ai/dentalcare---appointment---clinic-manager-1-/blob/main/main%20screen%202.png?raw=true

https://github.com/sfarwahassan12-ai/dentalcare---appointment---clinic-manager-1-/blob/main/main%20screen%203.png?raw=true

https://github.com/sfarwahassan12-ai/dentalcare---appointment---clinic-manager-1-/blob/main/main%20screen%205.png?raw=true

https://github.com/sfarwahassan12-ai/dentalcare---appointment---clinic-manager-1-/blob/main/main%20screen%206.png?raw=true
