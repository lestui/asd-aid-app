const profileFields = [
  {
    key: 'nickname',
    label: 'Child nickname',
    type: 'text',
  },
  {
    key: 'age',
    label: 'Age',
    type: 'text',
  },
  {
    key: 'triggers',
    label: 'Main triggers',
    type: 'textarea',
  },
  {
    key: 'calmingTools',
    label: 'Calming tools',
    type: 'textarea',
  },
  {
    key: 'communicationPreferences',
    label: 'Communication preferences',
    type: 'textarea',
  },
  {
    key: 'schoolNotes',
    label: 'School notes',
    type: 'textarea',
  },
]

function ChildProfileScreen({ profile, savedMessage, onBack, onChange, onSave }) {
  return (
    <div className="decision-panel profile-panel">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <p className="step-count">Child profile</p>
      <h2>Helpful details to remember.</h2>

      <form className="profile-form" onSubmit={onSave}>
        {profileFields.map((field) => (
          <label className="profile-field" key={field.key}>
            <span>{field.label}</span>
            {field.type === 'textarea' ? (
              <textarea
                rows="3"
                value={profile[field.key]}
                onChange={(event) => onChange(field.key, event.target.value)}
              />
            ) : (
              <input
                type={field.type}
                value={profile[field.key]}
                onChange={(event) => onChange(field.key, event.target.value)}
              />
            )}
          </label>
        ))}

        <button className="primary-action" type="submit">
          Save profile
        </button>
      </form>

      {savedMessage && (
        <p className="selection-note" aria-live="polite">
          {savedMessage}
        </p>
      )}

      <p className="privacy-note">
        Saved profiles and strategies stay on this device only.
      </p>
    </div>
  )
}

export default ChildProfileScreen
