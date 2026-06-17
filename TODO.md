# ASD Helper Guide TODO Roadmap

## Current Completed Features

- Sunflower accessibility theme applied across the app.
- Local-only child profile with checkbox groups, age/stage, caregiver notes, and privacy notice.
- Rule-based personalised recommendations from profile details.
- Clickable Guide Area cards with detail screens.
- Evidence-Informed Supports screen with search and category filtering.
- Further Reading data and screen.
- Body Regulation & Boundaries support area.
- Toileting, Hygiene & Body Routines support area.
- Saved strategies stored locally on the device.
- No login, server sync, or remote profile storage.

## Phase 1: QA and Safety Polish

- Test all navigation paths on mobile and desktop.
- Verify keyboard navigation and visible focus states.
- Check empty, partial, and full child profile states.
- Review all safety/escalation wording for clarity.
- Add a “Clear profile” action with confirmation.
- Confirm recommendations never imply diagnosis, treatment, or certainty.
- Check localStorage error handling for private/incognito browser modes.

Suggested commit messages:

- `QA navigation and accessibility states`
- `Polish safety wording across support screens`
- `Add clear profile action`

## Phase 2: Child Profile Improvements

- Add optional profile summary card on Home.
- Let caregivers edit recommendation-relevant fields without scrolling through the full form.
- Add clearer “why this is suggested” grouping.
- Add profile last-updated timestamp.
- Consider export/print profile summary without sending data anywhere.

Suggested commit messages:

- `Improve child profile summary`
- `Refine profile recommendation reasons`
- `Add profile last updated metadata`

## Phase 3: Support Plan Builder

- Let caregivers select support cards and build a simple plan.
- Include sections: situation, triggers, try first, helpful words, avoid, escalation.
- Allow saving support plans locally.
- Add print-friendly view.
- Keep plans editable and plain-language.

Suggested commit messages:

- `Add local support plan builder`
- `Save support plans locally`
- `Add printable support plan view`

## Phase 4: Global Search and Filtering

- Add one search entry point across guide areas, evidence supports, body regulation, toileting, and further reading.
- Support filters by category, age/stage, evidence level, and topic.
- Keep search local-only in the browser.
- Add empty states and accessible result counts.

Suggested commit messages:

- `Add global support search`
- `Add topic filters across support data`
- `Improve search empty states`

## Phase 5: School Support Tools

- Add school support plan templates.
- Add meeting notes/checklist tool.
- Add “message to school” draft helpers using original app wording only.
- Include toileting access, sensory breaks, transitions, communication supports, and after-school recovery.
- Avoid legal advice claims.

Suggested commit messages:

- `Add school support plan templates`
- `Add school meeting checklist`
- `Add school communication draft helpers`

## Phase 6: Visual Support Card Tools

- Add simple printable visual cards for help, break, toilet, pain, quiet space, first/then, wait, finished, and private place.
- Let caregivers choose a small set and print.
- Keep visuals plain, respectful, and age-flexible.
- Avoid childish styling for older children.

Suggested commit messages:

- `Add printable visual support cards`
- `Add visual card selection tool`
- `Polish visual card accessibility`

## Phase 7: Content Expansion

- Add more evidence-informed entries for sleep, eating, school refusal, anxiety, transitions, siblings, caregiver wellbeing, and community outings.
- Add more age/stage-specific toileting and hygiene supports.
- Expand Further Reading with periodic review dates.
- Keep all content original and concise enough for app cards.

Suggested commit messages:

- `Expand evidence support content`
- `Add age staged toileting supports`
- `Update further reading recommendations`

## Phase 8: Evidence and Review Layer

- Add source metadata fields where useful: source name, type, review date, and reviewer notes.
- Add an internal review checklist for new content.
- Add “last reviewed” display for content collections where appropriate.
- Consider lightweight content validation tests for required fields.
- Keep evidence notes clear without copying guideline text.

Suggested commit messages:

- `Add evidence metadata fields`
- `Add content review checklist`
- `Add support data validation`

## Local-Only Data Notes

- Child profile, saved strategies, and future support plans should remain local-only unless the product direction explicitly changes.
- Do not require login for core support features.
- Do not send child profile details, notes, or saved plans to a server.
- Avoid collecting full legal names, school names, addresses, diagnosis documents, or detailed incident reports.
- Include clear local-storage privacy notes near any sensitive input.

## Safety and Claims Notes

- The app must not claim to diagnose autism, ADHD, anxiety, sensory processing differences, toileting conditions, or medical concerns.
- The app must not claim to treat, cure, or replace professional support.
- Escalation guidance should stay visible for pain, injury, sudden change, severe distress, self-injury, unsafe behaviour, safeguarding concerns, toileting pain, blood, constipation, urinary symptoms, and school exclusion.
- Use “general educational support information” consistently.

## Neuro-Affirming Content Notes

- Do not frame the child as naughty, lazy, manipulative, deliberately inappropriate, or broken.
- Use behaviour-as-communication and needs-first wording.
- Avoid cure language and “fix the child” framing.
- Avoid puzzle-piece language or imagery.
- Keep adult actions practical: reduce demands, check body needs, offer communication supports, protect safety, respect privacy, and repair without shame.
- Keep wording suitable for parents, teachers, carers, aides, and support workers.

---

## High-Utility Parent & NZ Whānau Support Features

### Product Direction

The app should combine universal autism caregiver tools with NZ-specific whānau support workflows. The goal is to help parents communicate needs clearly, reduce repeated explanations, track daily regulation capacity, and organise support information across home, school, carers, and services.

---

## Phase 1: MVP Features

### 1. Child Profile

**Goal:** Create one central profile that powers the rest of the app.

**Fields:**
- Child name
- Age
- Communication style
- Sensory needs
- Top triggers
- Soothing tools
- Safe foods
- Emergency contacts
- School/kindy notes
- Carer notes

---

### 2. Daily Baseline Tracker

**Goal:** Let parents quickly record and share their child’s current daily capacity.

**Status Options:**
- Green Day: regulated / normal capacity
- Yellow Day: reduced capacity / needs extra support
- Red Day: low capacity / reduce demands and sensory load

**MVP Features:**
- 3-button daily status selector
- Optional notes
- Save daily history locally
- Share today’s status by text/email

**Example Output:**

Today is a Yellow Day. Please reduce demands, use calm transitions, and avoid loud environments where possible.

---

### 3. One-Touch De-escalation Profile

**Goal:** Give carers, teachers, relatives, or emergency helpers clear guidance during distress, shutdown, or meltdown situations.

**Fields:**
- Top triggers
- Early warning signs
- What helps
- What makes things worse
- Communication style
- Sensory tools
- Safe place
- Emergency contacts

**MVP Features:**
- Editable profile
- Share button
- Screenshot/print-friendly card

---

### 4. Carer Handover Dashboard

**Goal:** Generate a short mobile-friendly handover for relatives, babysitters, support workers, teachers, or SESTA-style transport situations.

**MVP Features:**
- Pull today’s Daily Baseline status
- Pull key de-escalation notes
- Allow parent to add a short handover note
- Generate a simple shareable message

**Example Output:**

Today is a Yellow Day.

Please use calm, short instructions.
Avoid sudden transitions.
If he becomes anxious, give him his soft plush blanket and reduce talking.
Do not force eye contact.
Allow 10 seconds processing time before repeating instructions.

---

### 5. Safe Food & Ingredient Log

**Goal:** Help parents manage food selectivity and avoid accidental unsafe substitutions.

**Fields:**
- Food name
- Brand
- Product photo
- Packaging photo
- Store
- Accepted preparation method
- Safe substitutes
- Unsafe substitutes
- Texture/smell/temperature/shape notes

**MVP Features:**
- Manual safe food entries
- Add product photos
- Add substitute notes
- Share safe food list

**Later Features:**
- Barcode scanner
- Ingredient change notes
- Store-specific grocery list
- Emergency safe food mode

---

### 6. Micro-Handout Guide for Relatives

**Goal:** Reduce the emotional load of repeatedly explaining autism basics to extended family and visitors.

**MVP Features:**
- Editable "How to Interact with Me" template
- Copy/share button
- Save versions for different situations

**Template Sections:**
- Please do
- Please do not
- Helpful reminders
- Safe foods
- Transition tips
- Comfort items

---

### 7. Support Notes / Communication Log

**Goal:** Keep school, therapy, MoE, Autism NZ course, GP, and home observations in one place.

**Fields:**
- Date
- Person/service
- Note type:
  - School
  - OT
  - SLT
  - MoE
  - Autism NZ
  - GP
  - Home observation
  - Other
- What was discussed
- Strategy being tried
- What school/carers should know
- Follow-up required

**MVP Features:**
- Add support note
- Filter by type
- Export/share selected notes
- Keep a simple timeline

**Later Features:**
- External party login
- Shared strategy board
- Permissions by role
- Attach documents/reports

---

## Phase 2: NZ-Specific Support Tools

### 8. Funding & Support Tracker

**Goal:** Help NZ whānau organise Carer Support, Individualised Funding, support hours, receipts, and reimbursement status.

**Important Positioning:**

This should be an organisation tool, not an official claims or entitlement calculator.

**Fields:**
- Funding type:
  - Carer Support
  - Individualised Funding
  - Other
- Allocation amount/days/hours
- Used amount/days/hours
- Remaining amount/days/hours
- Receipt photo
- Claim note
- Reimbursement status:
  - Not claimed
  - Submitted
  - Paid
  - Rejected / needs follow-up

**In-App Disclaimer:**

This tracker helps you organise your support records. It does not replace advice from Whaikaha, your NASC, funding host, school, or support coordinator.

**Later Features:**
- Funding host templates
- Claim packet export
- Receipt folder
- Reminder dates
- CSV/PDF export

---

## Suggested Build Priority

1. Child Profile
2. Daily Baseline Tracker
3. One-Touch De-escalation Profile
4. Carer Handover Dashboard
5. Safe Food Log
6. Micro-Handout Guide
7. Support Notes / Communication Log
8. Funding & Support Tracker

---

## Suggested App Screen Names

Use parent-friendly names in the app:

- Daily Check-In
- Emergency Profile
- Carer Handover
- Safe Foods
- Family Guide
- Support Notes
- Funding Tracker

Avoid making the main app buttons sound like government portals:

- Whaikaha Claims
- NASC Ledger
- MoE Specialist Portal
- SESTA Dashboard
