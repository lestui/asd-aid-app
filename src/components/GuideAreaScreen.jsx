import { evidenceBasedSupport } from '../data/evidenceBasedSupport.js'
import { guideAreas } from '../data/guideAreas.js'

const evidenceById = new Map(
  evidenceBasedSupport.map((support) => [support.id, support]),
)

function mergeUniqueLists(items, field) {
  return [
    ...new Set(
      items.flatMap((item) => (Array.isArray(item[field]) ? item[field] : [])),
    ),
  ]
}

function SupportList({ heading, items }) {
  if (items.length === 0) {
    return null
  }

  return (
    <section className="support-detail">
      <h4>{heading}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

function GuideAreaScreen({ guideAreaId, onBack }) {
  const guideArea = guideAreas.find((area) => area.id === guideAreaId)

  if (!guideArea) {
    return (
      <div className="decision-panel">
        <button className="back-button" type="button" onClick={onBack}>
          Back
        </button>
        <h2>Guide area not found.</h2>
      </div>
    )
  }

  const relatedSupports = guideArea.evidenceIds
    .map((id) => evidenceById.get(id))
    .filter(Boolean)
  const tryFirst = mergeUniqueLists(relatedSupports, 'try_first')
  const helpfulWords = mergeUniqueLists(relatedSupports, 'helpful_words')
  const avoid = mergeUniqueLists(relatedSupports, 'avoid')
  const whenToSeekHelp = mergeUniqueLists(relatedSupports, 'when_to_seek_help')
  const evidenceLevels = [
    ...new Set(relatedSupports.map((support) => support.evidence_level)),
  ]
  const evidenceSources = [
    ...new Set(relatedSupports.flatMap((support) => support.evidence_sources)),
  ]

  return (
    <div className="decision-panel guide-area-panel">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <p className="step-count">Guide area</p>
      <div className="screen-intro">
        <h2>{guideArea.title}</h2>
        <p>{guideArea.intro}</p>
      </div>

      <div className="guide-summary-card">
        <p>{guideArea.blurb}</p>
      </div>

      <SupportList heading="Try first" items={tryFirst} />
      <SupportList heading="Helpful words" items={helpfulWords} />
      <SupportList heading="Avoid" items={avoid} />
      <SupportList heading="When to seek help" items={whenToSeekHelp} />

      <section className="support-db-card">
        <div className="support-card-header">
          <div>
            <p className="reading-category">Evidence notes</p>
            <h3>Related support entries</h3>
          </div>
          <span className="evidence-pill">
            {evidenceLevels.join(' + ')}
          </span>
        </div>

        <div className="saved-section-list">
          {relatedSupports.map((support) => (
            <p key={support.id}>{support.title}</p>
          ))}
        </div>

        <div className="support-detail">
          <h4>Sources noted in related entries</h4>
          <ul>
            {evidenceSources.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default GuideAreaScreen
