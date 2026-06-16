import RecommendedSupports from './RecommendedSupports.jsx'

const ageStageOptions = [
  ['', 'Select an age/stage'],
  ['2-4', 'Ages 2-4'],
  ['4-6', 'Ages 4-6'],
  ['6-9', 'Ages 6-9'],
  ['9-13+', 'Ages 9-13+'],
  ['teen', 'Teen'],
  ['not-specified', 'Prefer not to say'],
]

const checkboxGroups = [
  {
    key: 'communicationStyle',
    legend: 'Communication style',
    options: [
      ['spokenWords', 'Spoken words'],
      ['fewNoWords', 'Few or no spoken words'],
      ['gestures', 'Gestures or showing'],
      ['visualCards', 'Visual cards'],
      ['aacDevice', 'AAC or device'],
      ['scriptsEcholalia', 'Scripts or repeated phrases'],
      ['needsProcessingTime', 'Needs processing time'],
    ],
  },
  {
    key: 'sensoryTriggers',
    legend: 'Sensory triggers',
    options: [
      ['noise', 'Noise'],
      ['lights', 'Lights'],
      ['crowds', 'Crowds'],
      ['clothing', 'Clothing'],
      ['smells', 'Smells'],
      ['touch', 'Touch'],
      ['transitions', 'Transitions'],
      ['waiting', 'Waiting'],
      ['schoolFatigue', 'School day fatigue'],
    ],
  },
  {
    key: 'calmingSupports',
    legend: 'Calming supports that help',
    options: [
      ['quietSpace', 'Quiet space'],
      ['deepPressure', 'Deep pressure'],
      ['movement', 'Movement'],
      ['headphones', 'Headphones'],
      ['visualSchedule', 'Visual schedule'],
      ['comfortItem', 'Comfort item'],
      ['lowDemandTime', 'Low-demand time'],
    ],
  },
  {
    key: 'difficultRoutines',
    legend: 'Difficult routines',
    options: [
      ['transitions', 'Transitions'],
      ['schoolDropoff', 'School drop-off'],
      ['bedtime', 'Bedtime'],
      ['meals', 'Meals'],
      ['toileting', 'Toileting'],
      ['publicOutings', 'Public outings'],
      ['waiting', 'Waiting'],
    ],
  },
  {
    key: 'toiletingConcerns',
    legend: 'Toileting concerns',
    options: [
      ['constipation', 'Constipation'],
      ['withholding', 'Withholding'],
      ['accidents', 'Accidents'],
      ['bedwetting', 'Bedwetting'],
      ['schoolToiletAvoidance', 'School toilet avoidance'],
      ['wiping', 'Wiping'],
      ['handwashing', 'Handwashing'],
      ['privacy', 'Privacy'],
    ],
  },
  {
    key: 'schoolChallenges',
    legend: 'School challenges',
    options: [
      ['attendance', 'Attendance'],
      ['transitions', 'Transitions'],
      ['overload', 'Classroom overload'],
      ['peerStress', 'Peer stress'],
      ['afterSchoolCrash', 'After-school crash'],
      ['toiletAccess', 'Toilet access'],
    ],
  },
  {
    key: 'safetyConcerns',
    legend: 'Safety concerns',
    options: [
      ['bolting', 'Bolting or running'],
      ['aggression', 'Aggression'],
      ['selfInjury', 'Self-injury'],
      ['unsafeClimbing', 'Unsafe climbing'],
      ['severeDistress', 'Severe distress'],
      ['safeguardingConcern', 'Safeguarding concern'],
      ['caregiverBurnout', 'Caregiver capacity or burnout'],
    ],
  },
]

function toggleArrayValue(values, optionValue) {
  return values.includes(optionValue)
    ? values.filter((value) => value !== optionValue)
    : [...values, optionValue]
}

function ChildProfileScreen({
  profile,
  savedMessage,
  onBack,
  onBrowseBodyRegulation,
  onBrowseEvidenceSupports,
  onBrowseToileting,
  onChange,
  onOpenGuideArea,
  onSave,
}) {
  return (
    <div className="decision-panel profile-panel">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <p className="step-count">Child profile</p>
      <div className="screen-intro">
        <h2>Helpful details to remember.</h2>
        <p>
          Add only what feels useful. These details help the app suggest more
          relevant guide areas and support ideas.
        </p>
      </div>

      <p className="privacy-note">
        Child profile details are saved only on this device. The app does not
        require a login and does not send this information to a server. Avoid
        entering anything you would not want stored in this browser.
      </p>

      <form className="profile-form" onSubmit={onSave}>
        <label className="profile-field">
          <span>Child nickname</span>
          <input
            type="text"
            value={profile.nickname}
            onChange={(event) => onChange('nickname', event.target.value)}
          />
        </label>

        <label className="profile-field">
          <span>Age/stage</span>
          <select
            value={profile.ageStage}
            onChange={(event) => onChange('ageStage', event.target.value)}
          >
            {ageStageOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        {checkboxGroups.map((group) => (
          <fieldset className="profile-checkbox-group" key={group.key}>
            <legend>{group.legend}</legend>
            <div className="checkbox-grid">
              {group.options.map(([value, label]) => (
                <label className="checkbox-option" key={value}>
                  <input
                    checked={profile[group.key].includes(value)}
                    type="checkbox"
                    onChange={() =>
                      onChange(group.key, toggleArrayValue(profile[group.key], value))
                    }
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        <label className="profile-field">
          <span>Caregiver notes</span>
          <textarea
            rows="4"
            value={profile.caregiverNotes}
            onChange={(event) => onChange('caregiverNotes', event.target.value)}
          />
        </label>

        <button className="primary-action" type="submit">
          Save profile
        </button>
      </form>

      {savedMessage && (
        <p className="selection-note" aria-live="polite">
          {savedMessage}
        </p>
      )}

      <RecommendedSupports
        profile={profile}
        onBrowseBodyRegulation={onBrowseBodyRegulation}
        onBrowseEvidenceSupports={onBrowseEvidenceSupports}
        onBrowseToileting={onBrowseToileting}
        onOpenGuideArea={onOpenGuideArea}
      />
    </div>
  )
}

export default ChildProfileScreen
