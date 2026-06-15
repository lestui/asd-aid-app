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
    </div>
  )
}

export default HomeScreen
