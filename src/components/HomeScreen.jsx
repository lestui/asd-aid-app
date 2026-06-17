import HelperIllustration from './HelperIllustration.jsx'
import { furtherReading } from '../data/furtherReading.js'
import { guideAreas } from '../data/guideAreas.js'

const situationHints = {
  'Sensory overload / meltdown': 'Big distress, overwhelm, hard to cope',
  'Communication difficulty': 'Words are hard, not answering, frustrated',
  'School or transition struggle': 'Refusing, clinging, after-school crash',
  'Public / private body behaviour': 'Calm, private, practical body-care support',
}

const quickActions = [
  ['Child profile', 'Keep child-specific details handy.', 'profile'],
  ['Daily check-in', "Set today's regulation baseline.", 'daily'],
  ['Emergency profile', 'Keep distress support notes ready.', 'emergency'],
  ['Carer handover', 'Generate a short note for today.', 'handover'],
  ['Safe foods', 'Keep exact food and substitute notes ready.', 'safeFoods'],
  ['Saved strategies', 'Return to support plans that helped.', 'saved'],
  ['Evidence-informed supports', 'Browse searchable support cards.', 'evidence'],
  ['Body regulation & boundaries', 'Body checks, privacy, and safe scripts.', 'body'],
  ['Toileting, hygiene & body routines', 'Practical routines across ages and settings.', 'toileting'],
  ['Further reading', 'Optional books, guidelines, and references.', 'reading'],
]

const featuredReading = furtherReading.slice(0, 4)

function HomeScreen({
  selectedSituation,
  situations,
  onChooseSituation,
  onOpenBodyRegulation,
  onOpenCarerHandover,
  onOpenDailyCheckIn,
  onOpenEvidenceSupports,
  onOpenEmergencyProfile,
  onOpenFurtherReading,
  onOpenGuideArea,
  onOpenProfile,
  onOpenSafeFoods,
  onOpenSavedStrategies,
  onOpenToiletingSupport,
}) {
  const actionHandlers = {
    profile: onOpenProfile,
    daily: onOpenDailyCheckIn,
    emergency: onOpenEmergencyProfile,
    handover: onOpenCarerHandover,
    safeFoods: onOpenSafeFoods,
    saved: onOpenSavedStrategies,
    evidence: onOpenEvidenceSupports,
    body: onOpenBodyRegulation,
    toileting: onOpenToiletingSupport,
    reading: onOpenFurtherReading,
  }

  return (
    <div className="decision-panel">
      <div className="screen-intro">
        <h2>What is happening right now?</h2>
        <p>
          Pick what fits this moment. The guide will walk through calm questions
          and practical next steps.
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
        <h2 id="quick-section-title">Keep close</h2>
        <div className="home-actions">
          {quickActions.map(([title, hint, actionKey]) => (
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

      <p className="privacy-note">
        Child profile, saved strategies, daily check-ins, emergency profile,
        handover notes, and safe foods stay on this device only. Anyone using
        the same browser or device profile may be able to see saved data.
      </p>

      <section className="helper-card-section" aria-labelledby="helper-card-title">
        <h2 id="helper-card-title">Guide areas</h2>
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

      <section
        className="further-reading-section"
        aria-labelledby="further-reading-title"
      >
        <h2 id="further-reading-title">Further reading</h2>
        <div className="reading-list">
          {featuredReading.map((item) => (
            <article className="reading-card" key={item.id}>
              <p className="reading-category">{item.category}</p>
              <h3>{item.title}</h3>
              <p className="reading-author">{item.author}</p>
              <p>{item.short_original_summary}</p>
            </article>
          ))}
        </div>
        <button
          className="primary-action"
          type="button"
          onClick={onOpenFurtherReading}
        >
          View all further reading
        </button>
        <p className="privacy-note">
          Reading suggestions are optional background resources and should be
          reviewed periodically.
        </p>
      </section>
    </div>
  )
}

export default HomeScreen
