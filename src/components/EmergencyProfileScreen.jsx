const emergencyFields = [
  ['topTriggers', 'Top triggers', 3],
  ['earlyWarningSigns', 'Early warning signs', 3],
  ['whatHelps', 'What helps', 4],
  ['whatMakesWorse', 'What makes things worse', 4],
  ['communicationStyle', 'Communication style', 3],
  ['sensoryTools', 'Sensory tools', 3],
  ['safePlace', 'Safe place', 3],
  ['emergencyContacts', 'Emergency contacts', 3],
]

function EmergencyProfileScreen({
  emergencyProfile,
  savedMessage,
  onBack,
  onChange,
  onSave,
}) {
  return (
    <div className="decision-panel profile-panel">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <p className="step-count">Emergency profile</p>
      <div className="screen-intro">
        <h2>Clear support notes for distress.</h2>
        <p>
          Keep practical information ready for carers, teachers, relatives, or
          emergency helpers during shutdown, meltdown, or high distress.
        </p>
      </div>

      <p className="urgent-note">
        This is not a medical record or emergency service. If anyone is in
        immediate danger, seek urgent local help.
      </p>

      <p className="privacy-note">
        Emergency profile details are saved only on this device. The app does
        not require a login and does not send this information to a server.
      </p>

      <form className="profile-form" onSubmit={onSave}>
        {emergencyFields.map(([field, label, rows]) => (
          <label className="profile-field" key={field}>
            <span>{label}</span>
            <textarea
              rows={rows}
              value={emergencyProfile[field]}
              onChange={(event) => onChange(field, event.target.value)}
            />
          </label>
        ))}

        <button className="primary-action" type="submit">
          Save emergency profile
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

export default EmergencyProfileScreen
