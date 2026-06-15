import HelperIllustration from './HelperIllustration.jsx'

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

function HomeScreen({
  selectedSituation,
  situations,
  onChooseSituation,
  onOpenProfile,
  onOpenSavedStrategies,
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
    </div>
  )
}

export default HomeScreen
