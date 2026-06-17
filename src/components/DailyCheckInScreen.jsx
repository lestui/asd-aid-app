const statusOptions = [
  {
    value: 'green',
    label: 'Green day',
    description: 'Regulated or usual capacity.',
  },
  {
    value: 'yellow',
    label: 'Yellow day',
    description: 'Reduced capacity; extra support may help.',
  },
  {
    value: 'red',
    label: 'Red day',
    description: 'Low capacity; reduce demands and sensory load.',
  },
]

function DailyCheckInScreen({ checkIn, savedMessage, onBack, onChange, onSave }) {
  const selectedStatus = statusOptions.find(
    (option) => option.value === checkIn.status,
  )

  return (
    <div className="decision-panel profile-panel">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <p className="step-count">Daily check-in</p>
      <div className="screen-intro">
        <h2>Set today&apos;s baseline.</h2>
        <p>
          Record the child&apos;s current capacity so carers can adjust demands,
          transitions, and sensory load.
        </p>
      </div>

      <p className="privacy-note">
        Daily check-ins are saved only on this device. The app does not send
        this information to a server. Avoid entering details you would not want
        stored in this browser.
      </p>

      {selectedStatus && (
        <section className="status-summary" aria-label="Today's saved status">
          <strong>Today: {selectedStatus.label}</strong>
          <span>{selectedStatus.description}</span>
        </section>
      )}

      <form className="profile-form" onSubmit={onSave}>
        <fieldset className="profile-checkbox-group">
          <legend>Today&apos;s baseline</legend>
          <div className="status-grid">
            {statusOptions.map((option) => (
              <label
                className={
                  checkIn.status === option.value
                    ? `status-option ${option.value} selected`
                    : `status-option ${option.value}`
                }
                key={option.value}
              >
                <input
                  checked={checkIn.status === option.value}
                  name="daily-status"
                  type="radio"
                  value={option.value}
                  onChange={(event) => onChange('status', event.target.value)}
                />
                <span>
                  <strong>{option.label}</strong>
                  <small>{option.description}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="profile-field">
          <span>Optional daily note</span>
          <textarea
            rows="4"
            value={checkIn.note}
            onChange={(event) => onChange('note', event.target.value)}
          />
        </label>

        <button className="primary-action" type="submit">
          Save today&apos;s check-in
        </button>
      </form>

      {savedMessage && (
        <p className="selection-note" aria-live="polite">
          {savedMessage}
        </p>
      )}
    </div>
  )
}

export default DailyCheckInScreen
