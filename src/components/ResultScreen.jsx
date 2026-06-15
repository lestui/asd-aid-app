function ResultScreen({
  answers,
  flow,
  hasAlert,
  scripts,
  savedMessage,
  onBack,
  onSaveStrategy,
}) {
  return (
    <div className="decision-panel result-panel">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <p className="step-count">{flow.title}</p>
      <h2>{flow.resultHeading}</h2>

      {hasAlert && <p className="urgent-note">{flow.alertText}</p>}

      {scripts.length > 0 && (
        <div className="script-list">
          {scripts.map((script) => (
            <blockquote className="script-card" key={script}>
              {script}
            </blockquote>
          ))}
        </div>
      )}

      <div className="answer-summary" aria-label="Your answers">
        {flow.steps.map((step) => (
          <p key={step.key}>
            <strong>{step.question}</strong>
            <span>{answers[step.key]}</span>
          </p>
        ))}
      </div>

      <div className="result-sections">
        {flow.resultSections.map((section) => (
          <section className="result-section" key={section.title}>
            <h3>{section.title}</h3>
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <button className="primary-action" type="button" onClick={onSaveStrategy}>
        Save this strategy
      </button>

      {savedMessage && (
        <p className="selection-note" aria-live="polite">
          {savedMessage}
        </p>
      )}
    </div>
  )
}

export default ResultScreen
