function HomeScreen({ selectedSituation, situations, onChooseSituation }) {
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
    </div>
  )
}

export default HomeScreen
