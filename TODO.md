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
