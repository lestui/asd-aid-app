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

const sleepQualityOptions = ['Good', 'Okay', 'Poor']
const nightWakingOptions = ['No', 'Yes']
const wakeMoodOptions = ['Calm', 'Tired', 'Wired', 'Upset / dysregulated']

function hasSleepSummary(checkIn) {
  return (
    checkIn.sleepQuality ||
    checkIn.nightWaking ||
    checkIn.wakeMood ||
    checkIn.sleepNote
  )
}

function DailyCheckInScreen({
  checkIn,
  savedMessage,
  onBack,
  onChange,
  onOpenSleepSupport,
  onSave,
}) {
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
        Saved on this device/browser only. Anyone using the same browser profile
        may be able to see it.
      </p>

      <p className="privacy-note">
        Sleep information is for caregiver planning and does not replace medical
        advice.
      </p>

      <button
        className="secondary-action compact-action"
        type="button"
        onClick={onOpenSleepSupport}
      >
        Open sleep support plan
      </button>

      {selectedStatus && (
        <section className="status-summary" aria-label="Today's saved status">
          <strong>Today: {selectedStatus.label}</strong>
          <span>{selectedStatus.description}</span>
        </section>
      )}

      {hasSleepSummary(checkIn) && (
        <section className="status-summary" aria-label="Today's sleep summary">
          <strong>
            Sleep: {checkIn.sleepQuality || 'Not set'}
            {checkIn.nightWaking
              ? `, night waking: ${checkIn.nightWaking}`
              : ''}
            {checkIn.wakeMood ? `, wake-up mood: ${checkIn.wakeMood}` : ''}.
          </strong>
          {checkIn.sleepNote && <span>{checkIn.sleepNote}</span>}
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

        <fieldset className="profile-checkbox-group">
          <legend>Sleep quality</legend>
          <div className="status-grid">
            {sleepQualityOptions.map((option) => (
              <label
                className={
                  checkIn.sleepQuality === option
                    ? 'status-option selected'
                    : 'status-option'
                }
                key={option}
              >
                <input
                  checked={checkIn.sleepQuality === option}
                  name="sleep-quality"
                  type="radio"
                  value={option}
                  onChange={(event) =>
                    onChange('sleepQuality', event.target.value)
                  }
                />
                <span>
                  <strong>{option}</strong>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="profile-checkbox-group">
          <legend>Night waking</legend>
          <div className="status-grid">
            {nightWakingOptions.map((option) => (
              <label
                className={
                  checkIn.nightWaking === option
                    ? 'status-option selected'
                    : 'status-option'
                }
                key={option}
              >
                <input
                  checked={checkIn.nightWaking === option}
                  name="night-waking"
                  type="radio"
                  value={option}
                  onChange={(event) => onChange('nightWaking', event.target.value)}
                />
                <span>
                  <strong>{option}</strong>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="profile-checkbox-group">
          <legend>Wake-up mood</legend>
          <div className="status-grid">
            {wakeMoodOptions.map((option) => (
              <label
                className={
                  checkIn.wakeMood === option
                    ? 'status-option selected'
                    : 'status-option'
                }
                key={option}
              >
                <input
                  checked={checkIn.wakeMood === option}
                  name="wake-mood"
                  type="radio"
                  value={option}
                  onChange={(event) => onChange('wakeMood', event.target.value)}
                />
                <span>
                  <strong>{option}</strong>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="profile-field">
          <span>Sleep note / regulation note</span>
          <textarea
            rows="4"
            value={checkIn.sleepNote}
            onChange={(event) => onChange('sleepNote', event.target.value)}
          />
        </label>

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
