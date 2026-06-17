const statusLabels = {
  green: 'Green day',
  yellow: 'Yellow day',
  red: 'Red day',
}

const statusGuidance = {
  green: 'Usual supports should be enough today.',
  yellow: 'Please reduce demands, use calm transitions, and allow extra processing time.',
  red: 'Please keep demands low, reduce sensory load, and prioritise safety and calm.',
}

function buildHandoverMessage({
  dailyCheckIn,
  emergencyProfile,
  handoverNote,
  profile,
}) {
  const lines = []
  const childName = profile.nickname ? `${profile.nickname}: ` : ''

  if (dailyCheckIn.status) {
    lines.push(`${childName}Today is a ${statusLabels[dailyCheckIn.status]}.`)
    lines.push(statusGuidance[dailyCheckIn.status])
  } else {
    lines.push(`${childName}No daily baseline has been saved for today yet.`)
  }

  if (dailyCheckIn.note) {
    lines.push(`Today's note: ${dailyCheckIn.note}`)
  }

  if (
    dailyCheckIn.sleepQuality ||
    dailyCheckIn.nightWaking ||
    dailyCheckIn.wakeMood
  ) {
    lines.push(
      `Sleep: ${dailyCheckIn.sleepQuality || 'Not set'}, night waking: ${
        dailyCheckIn.nightWaking || 'Not set'
      }, wake-up mood: ${dailyCheckIn.wakeMood || 'Not set'}.`,
    )
  }

  if (dailyCheckIn.sleepNote) {
    lines.push(`Sleep/regulation note: ${dailyCheckIn.sleepNote}`)
  }

  if (handoverNote) {
    lines.push(`Handover note: ${handoverNote}`)
  }

  if (emergencyProfile.communicationStyle) {
    lines.push(`Communication: ${emergencyProfile.communicationStyle}`)
  }

  if (emergencyProfile.topTriggers) {
    lines.push(`Top triggers: ${emergencyProfile.topTriggers}`)
  } else if (profile.topTriggers) {
    lines.push(`Top triggers: ${profile.topTriggers}`)
  }

  if (emergencyProfile.earlyWarningSigns) {
    lines.push(`Early warning signs: ${emergencyProfile.earlyWarningSigns}`)
  }

  if (emergencyProfile.whatHelps) {
    lines.push(`What helps: ${emergencyProfile.whatHelps}`)
  } else if (profile.soothingTools) {
    lines.push(`Soothing tools: ${profile.soothingTools}`)
  }

  if (emergencyProfile.whatMakesWorse) {
    lines.push(`Avoid: ${emergencyProfile.whatMakesWorse}`)
  }

  if (emergencyProfile.sensoryTools) {
    lines.push(`Sensory tools: ${emergencyProfile.sensoryTools}`)
  }

  if (emergencyProfile.safePlace) {
    lines.push(`Safe place: ${emergencyProfile.safePlace}`)
  }

  if (emergencyProfile.emergencyContacts) {
    lines.push(`Emergency contacts: ${emergencyProfile.emergencyContacts}`)
  } else if (profile.emergencyContacts) {
    lines.push(`Emergency contacts: ${profile.emergencyContacts}`)
  }

  return lines.join('\n\n')
}

function CarerHandoverScreen({
  dailyCheckIn,
  emergencyProfile,
  handoverNote,
  profile,
  savedMessage,
  onBack,
  onChangeNote,
  onSaveNote,
}) {
  const handoverMessage = buildHandoverMessage({
    dailyCheckIn,
    emergencyProfile,
    handoverNote,
    profile,
  })

  return (
    <div className="decision-panel profile-panel">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <p className="step-count">Carer handover</p>
      <div className="screen-intro">
        <h2>Generate a short handover.</h2>
        <p>
          Combine today&apos;s check-in with key support details for relatives,
          babysitters, teachers, support workers, or transport situations.
        </p>
      </div>

      <p className="privacy-note">
        Handover information is generated in this browser from details saved on
        this device. Anyone using the same browser or device profile may be able
        to see saved data. Check the message before copying it to anyone else.
      </p>

      <label className="profile-field">
        <span>Short handover note</span>
        <textarea
          rows="4"
          value={handoverNote}
          onChange={(event) => onChangeNote(event.target.value)}
        />
      </label>

      <button
        className="secondary-action compact-action"
        type="button"
        onClick={onSaveNote}
      >
        Save handover note
      </button>

      {savedMessage && (
        <p className="selection-note" aria-live="polite">
          {savedMessage}
        </p>
      )}

      <label className="profile-field">
        <span>Copyable handover message</span>
        <textarea readOnly rows="14" value={handoverMessage} />
      </label>
    </div>
  )
}

export default CarerHandoverScreen
