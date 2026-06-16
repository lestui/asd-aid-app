import HelperIllustration from './HelperIllustration.jsx'
import { furtherReading } from '../data/furtherReading.js'

const helperCards = [
  ['communication', 'Communication Support'],
  ['sensory', 'Sensory Overload'],
  ['calm', 'Calm Strategy'],
  ['routine', 'Routine Change'],
  ['meltdown', 'Meltdown Support'],
  ['shutdown', 'Shutdown Support'],
  ['help', 'Asking for Help'],
  ['caregiver', 'Caregiver Support'],
]

const featuredReading = furtherReading.slice(0, 4)

function HomeScreen({
  selectedSituation,
  situations,
  onChooseSituation,
  onOpenBodyRegulation,
  onOpenEvidenceSupports,
  onOpenFurtherReading,
  onOpenProfile,
  onOpenSavedStrategies,
  onOpenToiletingSupport,
}) {
  return (
    <div className="decision-panel">
      <h2>What is happening right now?</h2>
      <div className="button-list" role="list">
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
            {situation.label}
          </button>
        ))}
      </div>

      {selectedSituation && (
        <p className="selection-note" aria-live="polite">
          Selected: {selectedSituation}
        </p>
      )}

      <div className="home-actions">
        <button className="secondary-action" type="button" onClick={onOpenProfile}>
          Child profile
        </button>
        <button
          className="secondary-action"
          type="button"
          onClick={onOpenSavedStrategies}
        >
          Saved strategies
        </button>
        <button
          className="secondary-action"
          type="button"
          onClick={onOpenEvidenceSupports}
        >
          Evidence-informed supports
        </button>
        <button
          className="secondary-action"
          type="button"
          onClick={onOpenBodyRegulation}
        >
          Body regulation & boundaries
        </button>
        <button
          className="secondary-action"
          type="button"
          onClick={onOpenToiletingSupport}
        >
          Toileting, hygiene & body routines
        </button>
        <button
          className="secondary-action"
          type="button"
          onClick={onOpenFurtherReading}
        >
          Further reading
        </button>
      </div>

      <p className="privacy-note">
        Saved profiles and strategies stay on this device only.
      </p>

      <section className="helper-card-section" aria-labelledby="helper-card-title">
        <h2 id="helper-card-title">Guide areas</h2>
        <div className="helper-card-grid">
          {helperCards.map(([type, title]) => (
            <article className="helper-card" key={type}>
              <HelperIllustration type={type} />
              <h3>{title}</h3>
            </article>
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
