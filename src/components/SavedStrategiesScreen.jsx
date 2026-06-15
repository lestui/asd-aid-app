function SavedStrategiesScreen({ savedStrategies, onBack, onDelete }) {
  return (
    <div className="decision-panel saved-panel">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <p className="step-count">Saved strategies</p>
      <h2>Strategies saved on this device.</h2>

      {savedStrategies.length === 0 ? (
        <p className="empty-note">No strategies saved yet.</p>
      ) : (
        <div className="saved-list">
          {savedStrategies.map((strategy) => (
            <section className="saved-card" key={strategy.id}>
              <div className="saved-card-header">
                <div>
                  <h3>{strategy.flowTitle}</h3>
                  <p>{new Date(strategy.savedAt).toLocaleString()}</p>
                </div>
                <button
                  className="delete-button"
                  type="button"
                  onClick={() => onDelete(strategy.id)}
                >
                  Delete
                </button>
              </div>

              <div className="answer-summary compact" aria-label="Saved answers">
                {strategy.answers.map((answer) => (
                  <p key={answer.question}>
                    <strong>{answer.question}</strong>
                    <span>{answer.answer}</span>
                  </p>
                ))}
              </div>

              <div className="saved-section-list">
                {strategy.resultSections.map((section) => (
                  <p key={section.title}>{section.title}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <p className="privacy-note">
        Saved profiles and strategies stay on this device only.
      </p>
    </div>
  )
}

export default SavedStrategiesScreen
