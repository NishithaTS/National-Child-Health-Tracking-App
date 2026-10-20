# National Child Health Tracking App (NCHT)
> **Connected Records. Timely Care. Healthier Futures.**

A proposed digital healthcare platform designed to track children's health from birth to 18 years. Built as a high-fidelity frontend prototype using React, TypeScript, Vite, Tailwind CSS, Recharts, and Lucide React.

---

## 🌟 Vision & Key Objectives

In many public healthcare environments, child medical histories are recorded on paper cards prone to wear, damage, or loss. The **National Child Health Tracking App** proposal connects parents, frontline health workers (ASHA/ANM), primary care clinicians, pediatric specialists, and public health administrators in one unified digital ecosystem.

### Core Architecture Pillars:
1. **Longitudinal Record (Birth to 18 Years):** Unique Health IDs (UHID) following the child across all care tiers.
2. **Immunization Intelligence:** Automated national schedule tracking, batch ledgering, and drop-off detection.
3. **Growth & Developmental Monitoring:** Height, weight, BMI, and head circumference curves mapped with WHO percentiles.
4. **Coordinated Multi-Role Care:** Role-tailored dashboards for 6 healthcare personas.
5. **Frontline Offline Simulation:** Mobile field queue for community workers with one-tap batch synchronization.
6. **Closed-Loop Referral Pipeline:** 7-stage tele-triage connecting primary clinics to pediatric cardiology, neurology, and developmental specialists.
7. **Responsible AI & Safety Auditing:** Rule-based surveillance for missing measurements, dose gaps, and transcription discrepancies with human-in-the-loop review.

---

## 🎭 6 Interactive Demonstration Roles

The prototype provides instant role switching directly from the demo login screen or the persistent top navigation:

| Role | Persona | Key Capabilities |
|---|---|---|
| **Parent / Guardian** | Priya Sharma | Child selector (Aarav, Ananya, Vihaan), vaccine countdowns, growth preview, clinic booking |
| **Frontline Health Worker** | Sunita Devi (ASHA) | Field route checklist, simulated offline mode, pending sync queue, one-tap dose logging |
| **Primary Care Doctor** | Dr. Rajesh Kulkarni | Outpatient consultations, clinical encounter notes, medication manager, referral creation |
| **Pediatric Specialist** | Dr. Maya Venkatesh | Urgency triage (routine, urgent, high-priority), echocardiogram reviews, treatment dispatch |
| **Public Health Administrator** | Dr. Anand Murthy | Aggregated surveillance KPIs, regional filters, immunization coverage charts, CSV export, print reports |
| **System Administrator** | Vikramaditya Sen | User and role governance, simulated audit trail stream, prototype configuration, data reset |

---

## 📊 Coherent Synthetic Dataset

- **20+ Fictional Children:** Comprehensive records with Indian names (e.g., *Aarav Sharma*, *Diya Patel*, *Rohan Kulkarni*, *Arjun Reddy*) across Bengaluru, Mysuru, Hyderabad, and Pune.
- **National Immunization Ledger:** Birth doses (BCG, OPV-0, HepB-0), Pentavalent series, Rotavirus, Measles-Rubella, and DPT/Typhoid boosters.
- **Developmental Milestones:** Gross motor, fine motor, communication, cognitive, and social-emotional milestones.
- **Persistent State:** All actions (adding measurements, completing vaccines, booking appointments, filing visit notes) update shared state and are persisted in `localStorage`.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Type check / lint
npm run lint
```

---

## 🔒 Privacy & Prototype Notice

*This application is an educational and innovation proposal prototype. All patient records, Unique Health IDs (UHID), and clinical logs are entirely synthetic demonstration data. No real personal healthcare information is collected or transmitted.*
