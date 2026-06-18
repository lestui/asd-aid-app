import HelperIllustration from './HelperIllustration.jsx'
import { guideAreas } from '../data/guideAreas.js'

const situationHints = {
  'Sensory overload / meltdown': 'Big distress, overwhelm, hard to cope',
  'Communication difficulty': 'Words are hard, not answering, frustrated',
  'School or transition struggle': 'Refusing, clinging, after-school crash',
  'Public / private body behaviour': 'Calm, private, practical body-care support',
}

const quickActionGroups = [
  {
    title: 'Today',
    actions: [
      ['Daily check-in', "Set today's regulation baseline.", 'daily'],
      ['Emergency profile', 'Keep distress support notes ready.', 'emergency'],
      ['Carer handover', 'Generate a short note for today.', 'handover'],
      ['Saved strategies', 'Return to support plans that helped.', 'saved'],
    ],
  },
  {
    title: 'Plans',
    actions: [
      ['Child profile', 'Keep child-specific details handy.', 'profile'],
      ['Sleep support', 'Plan bedtime routines and night waking responses.', 'sleep'],
      ['Safe foods', 'Keep exact food and substitute notes ready.', 'safeFoods'],
      ['Family guide', 'Share warm interaction notes with relatives.', 'familyGuide'],
      ['Support notes', 'Keep useful notes and support close.', 'supportNotes'],
    ],
  },
  {
    title: 'Topics',
    actions: [
      [
        'Toileting, hygiene & body routines',
        'Practical routines across ages and settings.',
        'toileting',
      ],
      ['Body regulation & boundaries', 'Body checks, privacy, and safe scripts.', 'body'],
      ['Browse by topic', 'Open communication, sensory, routine, and calm guides.', 'topics'],
      ['Support database', 'Browse searchable support cards.', 'evidence'],
    ],
  },
  {
    title: 'Admin / Reference',
    actions: [
      ['About this app', 'What this app does, privacy, and safety notes.', 'about'],
      ['Funding tracker', 'Organise your own support records and spending notes.', 'funding'],
      ['Glossary', 'Plain-English meanings for support terms and acronyms.', 'glossary'],
      ['Further reading', 'Optional books, guidelines, and references.', 'reading'],
    ],
  },
]

function HomeScreen({
  selectedSituation,
  situations,
  onChooseSituation,
  onOpenAboutThisApp,
  onOpenBodyRegulation,
  onOpenCarerHandover,
  onOpenDailyCheckIn,
  onOpenEvidenceSupports,
  onOpenEmergencyProfile,
  onOpenFamilyGuide,
  onOpenFurtherReading,
  onOpenFundingTracker,
  onOpenGlossary,
  onOpenGuideArea,
  onOpenProfile,
  onOpenSafeFoods,
  onOpenSavedStrategies,
  onOpenSleepSupport,
  onOpenToiletingSupport,
}) {
  const actionHandlers = {
    profile: onOpenProfile,
    about: onOpenAboutThisApp,
    daily: onOpenDailyCheckIn,
    sleep: onOpenSleepSupport,
    emergency: onOpenEmergencyProfile,
    handover: onOpenCarerHandover,
    safeFoods: onOpenSafeFoods,
    funding: onOpenFundingTracker,
    saved: onOpenSavedStrategies,
    evidence: onOpenEvidenceSupports,
    body: onOpenBodyRegulation,
    familyGuide: onOpenFamilyGuide,
    toileting: onOpenToiletingSupport,
    glossary: onOpenGlossary,
    reading: onOpenFurtherReading,
    supportNotes: () => onOpenGuideArea('caregiver'),
    topics: () =>
      globalThis.document
        ?.getElementById('browse-topic-title')
        ?.scrollIntoView(),
  }

  return (
    <div className="decision-panel">
      <div className="screen-intro">
        <h2>What is happening right now?</h2>
        <p>
          Start with what is happening now, or use the tools below to save plans
          and notes for later.
        </p>
      </div>
      <div className="button-list">
        {situations.map((situation) => (
          <button
            className={
              selectedSituation === situation.label
                ? 'decision-button selected'
                : 'decision-button'
            }
            key={situation.label}
            type="button"
            onClick={() => onChooseSituation(situation)}
          >
            <span className="decision-icon" aria-hidden="true">
              <span />
            </span>
            <span className="decision-copy">
              <span>{situation.label}</span>
              <small>{situationHints[situation.label]}</small>
            </span>
            <span className="decision-arrow" aria-hidden="true">
              →
            </span>
          </button>
        ))}
      </div>

      {selectedSituation && (
        <p className="selection-note" aria-live="polite">
          Selected: {selectedSituation}
        </p>
      )}

      <section className="quick-section" aria-labelledby="quick-section-title">
        <h2 id="quick-section-title">Quick tools</h2>
        {quickActionGroups.map((group) => (
          <section
            className="quick-group"
            key={group.title}
            aria-labelledby={`${group.title.replace(/\W+/g, '-').toLowerCase()}-title`}
          >
            <h3 id={`${group.title.replace(/\W+/g, '-').toLowerCase()}-title`}>
              {group.title}
            </h3>
            <div className="home-actions">
              {group.actions.map(([title, hint, actionKey]) => (
                <button
                  className="secondary-action"
                  key={title}
                  type="button"
                  onClick={actionHandlers[actionKey]}
                >
                  <span className="quick-icon" aria-hidden="true" />
                  <span>
                    <span>{title}</span>
                    <small>{hint}</small>
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </section>

      <p className="privacy-note">
        Anything you save stays on this device/browser only. Anyone using the
        same browser profile may be able to see it.
      </p>

      <section className="helper-card-section" aria-labelledby="browse-topic-title">
        <h2 id="browse-topic-title">Browse by topic</h2>
        <div className="helper-card-grid">
          {guideAreas.map((guideArea) => (
            <button
              aria-label={`Open ${guideArea.title} guide`}
              className="helper-card helper-card-button"
              key={guideArea.id}
              type="button"
              onClick={() => onOpenGuideArea(guideArea.id)}
            >
              <HelperIllustration type={guideArea.id} />
              <span>
                <strong>{guideArea.title}</strong>
                <small>{guideArea.blurb}</small>
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomeScreen
