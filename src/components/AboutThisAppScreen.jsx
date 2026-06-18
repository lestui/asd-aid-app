function AboutThisAppScreen({ onBack }) {
  return (
    <div className="decision-panel">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>

      <div className="screen-intro">
        <p className="step-count">About this app</p>
        <h2>A calm place to keep support plans.</h2>
        <p>
          ASD Helper Guide helps caregivers think through everyday support
          moments and keep useful notes close.
        </p>
      </div>

      <section className="guide-summary-card" aria-label="What this app does">
        <p>
          You can record plans, daily notes, safe foods, handovers, support
          notes, and funding records for your own use.
        </p>
      </section>

      <p className="education-disclaimer">
        This app does not diagnose autism, replace professional advice, or
        replace emergency services.
      </p>

      <p className="privacy-note">
        Saved data stays on this device/browser only. Anyone using the same
        browser profile may be able to see saved data.
      </p>

      <p className="urgent-note">
        If anyone is in immediate danger, call local emergency services.
      </p>
    </div>
  )
}

export default AboutThisAppScreen
