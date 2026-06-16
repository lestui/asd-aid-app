import { bodyRegulationBoundaries } from '../data/bodyRegulationBoundaries.js'

const pathways = [
  'Sensory & Body Regulation',
  'Privacy, Safety & Social Boundaries',
]

function BodyDetailList({ heading, items }) {
  return (
    <div className="support-detail">
      <h4>{heading}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function BodyRegulationScreen({ onBack }) {
  return (
    <div className="decision-panel body-regulation-panel">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <p className="step-count">Body Regulation & Boundaries</p>
      <h2>Support body needs and respectful boundaries.</h2>

      <section className="check-first-panel" aria-labelledby="check-first-title">
        <h3 id="check-first-title">Check first</h3>
        <p>
          First check for pain, toileting needs, constipation, clothing
          discomfort, skin irritation, injury, anxiety, sudden behaviour
          changes, or safeguarding concerns.
        </p>
      </section>

      <div className="pathway-grid" aria-label="Body regulation pathways">
        {pathways.map((pathway) => (
          <section className="pathway-card" key={pathway}>
            <h3>{pathway}</h3>
            <p>
              {pathway === 'Sensory & Body Regulation'
                ? 'Start with body comfort, overload, fatigue, sensory seeking, and safe regulation options.'
                : 'Teach privacy, body safety, public/private rules, and respectful boundaries with calm visuals and scripts.'}
            </p>
          </section>
        ))}
      </div>

      <div className="script-strip" aria-label="Simple caregiver scripts">
        <p>Private body. Bathroom or bedroom.</p>
        <p>You can ask for pressure.</p>
        <p>Let’s check clothes, toilet, or quiet space.</p>
      </div>

      <div className="support-card-list">
        {bodyRegulationBoundaries.map((item) => (
          <article className="support-db-card" key={item.id}>
            <div className="support-card-header">
              <div>
                <p className="reading-category">{item.pathway}</p>
                <h3>{item.title}</h3>
              </div>
              <span className="evidence-pill">{item.evidence_level}</span>
            </div>

            <p>
              <strong>Situation:</strong> {item.situation}
            </p>
            <p>
              <strong>Caregiver goal:</strong> {item.caregiver_goal}
            </p>
            <p>
              <strong>Normalise:</strong> {item.normalise}
            </p>
            <p>
              <strong>Investigate:</strong> {item.investigate}
            </p>

            <BodyDetailList heading="Try first" items={item.try_first} />
            <BodyDetailList heading="Helpful words" items={item.helpful_words} />
            <BodyDetailList heading="Avoid" items={item.avoid} />
            <BodyDetailList heading="Sensory swaps" items={item.sensory_swaps} />
            <BodyDetailList
              heading="Visual supports"
              items={item.visual_supports}
            />
            <BodyDetailList
              heading="When to seek help"
              items={item.when_to_seek_help}
            />
          </article>
        ))}
      </div>
    </div>
  )
}

export default BodyRegulationScreen
