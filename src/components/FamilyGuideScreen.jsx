import { useRef, useState } from 'react'
import { copyText } from '../utils/copyText.js'

const familyGuideFields = [
  ['childNickname', 'Child nickname', 'input'],
  ['greeting', 'Best way to greet me', 'textarea'],
  ['pleaseDo', 'Please do', 'textarea'],
  ['pleaseDoNot', 'Please do not', 'textarea'],
  ['comfortItems', 'Comfort items', 'textarea'],
  ['safeFoodsReminder', 'Safe foods reminder', 'textarea'],
  ['transitionTips', 'Transition tips', 'textarea'],
  ['overwhelmedSupport', 'What to do if I get overwhelmed', 'textarea'],
  ['eventNote', 'Optional event note', 'textarea'],
]

function addLine(lines, label, value) {
  if (value.trim()) {
    lines.push(`${label}: ${value.trim()}`)
  }
}

function buildFamilyGuideMessage(familyGuide) {
  const childName = familyGuide.childNickname.trim() || 'me'
  const lines = [`How to interact with ${childName}`]

  addLine(lines, 'Best greeting', familyGuide.greeting)
  addLine(lines, 'Please do', familyGuide.pleaseDo)
  addLine(lines, 'Please do not', familyGuide.pleaseDoNot)
  addLine(lines, 'Comfort items', familyGuide.comfortItems)
  addLine(lines, 'Safe foods', familyGuide.safeFoodsReminder)
  addLine(lines, 'Transition tips', familyGuide.transitionTips)
  addLine(lines, 'If I get overwhelmed', familyGuide.overwhelmedSupport)
  addLine(lines, 'Event note', familyGuide.eventNote)

  lines.push('Thank you for helping keep things calm, kind, and predictable.')

  return lines.join('\n')
}

function FamilyGuideScreen({
  familyGuide,
  savedMessage,
  onBack,
  onChange,
  onSave,
}) {
  const [copyMessage, setCopyMessage] = useState('')
  const messageRef = useRef(null)
  const guideMessage = buildFamilyGuideMessage(familyGuide)

  async function copyGuideMessage() {
    const copied = await copyText(guideMessage, messageRef)
    setCopyMessage(
      copied
        ? 'Family guide copied.'
        : 'Copy the family guide manually from the text box.',
    )
  }

  return (
    <div className="decision-panel profile-panel">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <p className="step-count">Family guide</p>
      <div className="screen-intro">
        <h2>Make family visits easier.</h2>
        <p>
          Create a short, warm guide relatives can read before birthdays, family
          visits, holidays, or other shared plans.
        </p>
      </div>

      <p className="privacy-note">
        Saved on this device/browser only. Anyone using the same browser profile
        may be able to see it.
      </p>

      <form className="profile-form" onSubmit={onSave}>
        {familyGuideFields.map(([field, label, inputType]) => (
          <label className="profile-field" key={field}>
            <span>{label}</span>
            {inputType === 'textarea' ? (
              <textarea
                rows="3"
                value={familyGuide[field]}
                onChange={(event) => onChange(field, event.target.value)}
              />
            ) : (
              <input
                type="text"
                value={familyGuide[field]}
                onChange={(event) => onChange(field, event.target.value)}
              />
            )}
          </label>
        ))}

        <button className="primary-action" type="submit">
          Save family guide
        </button>
      </form>

      {savedMessage && (
        <p className="selection-note" aria-live="polite">
          {savedMessage}
        </p>
      )}

      <section className="safe-food-summary" aria-labelledby="family-guide-message-title">
        <h3 id="family-guide-message-title">How to interact with me</h3>
        <label className="profile-field">
          <span>Copyable family guide message</span>
          <textarea readOnly ref={messageRef} rows="10" value={guideMessage} />
        </label>
        <button
          className="secondary-action compact-action"
          type="button"
          onClick={copyGuideMessage}
        >
          Copy family guide
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

export default FamilyGuideScreen
