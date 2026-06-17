function FlowScreen({ currentStep, flow, step, onBack, onChooseAnswer }) {
  return (
    <div className="decision-panel flow-panel">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <p className="step-count">
        Step {currentStep + 1} of {flow.steps.length}
      </p>
      <h2>{step.question}</h2>
      <div className="button-list">
        {step.options.map((option) => (
          <button
            className="decision-button"
            key={option}
            type="button"
            onClick={() => onChooseAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FlowScreen
