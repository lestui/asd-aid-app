import { useRef, useState } from 'react'
import { copyText } from '../utils/copyText.js'

const sleepPlanFields = [
  ['targetBedtime', 'Target bedtime', 'time'],
  ['targetWakeTime', 'Target wake time', 'time'],
  ['routineChecklist', 'Bedtime routine checklist', 'textarea'],
  ['comfortItems', 'Comfort items', 'textarea'],
  ['sleepEnvironmentNotes', 'Sleep environment notes', 'textarea'],
  ['whatHelpsSettle', 'What helps settle', 'textarea'],
  ['whatMakesSleepWorse', 'What makes sleep worse', 'textarea'],
  ['nightWakingResponsePlan', 'Night waking response plan', 'textarea'],
  ['morningImpactNotes', 'Morning impact notes', 'textarea'],
  [
    'questionsForProfessionals',
    'Questions for GP, OT, or paediatrician',
    'textarea',
  ],
]

function addLine(lines, label, value) {
  if (value.trim()) {
    lines.push(`${label}: ${value.trim()}`)
  }
}

function buildSleepPlanSummary(plan) {
  const lines = ['Sleep support / bedtime plan']

  addLine(lines, 'Bedtime target', plan.targetBedtime)
  addLine(lines, 'Wake target', plan.targetWakeTime)
  addLine(lines, 'Routine', plan.routineChecklist)
  addLine(lines, 'Comfort items', plan.comfortItems)
  addLine(lines, 'Sleep environment', plan.sleepEnvironmentNotes)
  addLine(lines, 'What helps settle', plan.whatHelpsSettle)
  addLine(lines, 'What makes sleep worse', plan.whatMakesSleepWorse)
  addLine(lines, 'If they wake overnight', plan.nightWakingResponsePlan)
  addLine(lines, 'Morning impact notes', plan.morningImpactNotes)
  addLine(lines, 'Questions for GP, OT, or paediatrician', plan.questionsForProfessionals)

  if (lines.length === 1) {
    lines.push(
      'Add bedtime targets, routine steps, settling supports, and night waking notes to build a copyable plan.',
    )
  }

  return lines.join('\n')
}

function SleepSupportScreen({ plan, savedMessage, onBack, onChange, onSave }) {
  const [copyMessage, setCopyMessage] = useState('')
  const summaryRef = useRef(null)
  const summaryText = buildSleepPlanSummary(plan)

  async function copySummary() {
    const copied = await copyText(summaryText, summaryRef)
    setCopyMessage(
      copied
        ? 'Sleep plan summary copied.'
        : 'Copy the sleep plan manually from the text box.',
    )
  }

  return (
    <div className="decision-panel profile-panel">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <p className="step-count">Sleep support</p>
      <div className="screen-intro">
        <h2>Build a simple bedtime plan.</h2>
        <p>
          Save the routine, settling supports, night waking plan, and questions
          to raise with health or therapy professionals.
        </p>
      </div>

      <p className="privacy-note">
        Saved on this device/browser only. Anyone using the same browser profile
        may be able to see it.
      </p>
      <p className="education-disclaimer">
        This is a caregiver planning tool only. It does not replace advice from
        your GP, paediatrician, OT, or other health professional.
      </p>
      <p className="urgent-note">
        If your child has breathing pauses, blue lips, seizures, serious injury,
        or you are worried they are in immediate danger, call local emergency
        services now.
      </p>

      <form className="profile-form" onSubmit={onSave}>
        {sleepPlanFields.map(([field, label, inputType]) => (
          <label className="profile-field" key={field}>
            <span>{label}</span>
            {inputType === 'textarea' ? (
              <textarea
                rows={field === 'routineChecklist' ? '5' : '3'}
                value={plan[field]}
                onChange={(event) => onChange(field, event.target.value)}
              />
            ) : (
              <input
                type={inputType}
                value={plan[field]}
                onChange={(event) => onChange(field, event.target.value)}
              />
            )}
          </label>
        ))}

        <button className="primary-action" type="submit">
          Save sleep plan
        </button>
      </form>

      {savedMessage && (
        <p className="selection-note" aria-live="polite">
          {savedMessage}
        </p>
      )}

      <section className="safe-food-summary" aria-labelledby="sleep-summary-title">
        <h3 id="sleep-summary-title">Copyable sleep plan summary</h3>
        <label className="profile-field">
          <span>Summary text</span>
          <textarea readOnly ref={summaryRef} rows="12" value={summaryText} />
        </label>
        <button
          className="secondary-action compact-action"
          type="button"
          onClick={copySummary}
        >
          Copy sleep plan
        </button>
        {copyMessage && (
          <p className="selection-note" aria-live="polite">
            {copyMessage}
          </p>
        )}
      </section>
    </div>
  )
}

export default SleepSupportScreen
