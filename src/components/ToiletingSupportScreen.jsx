import { useMemo, useState } from 'react'
import { toiletingSupport } from '../data/toiletingSupport.js'

const ageStages = ['All age/stage groups', ...new Set(toiletingSupport.map((item) => item.age_stage))]
const categories = ['All categories', ...new Set(toiletingSupport.map((item) => item.category))]

function ToiletingDetailList({ heading, items }) {
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

function ToiletingSupportScreen({ onBack }) {
  const [activeAgeStage, setActiveAgeStage] = useState('All age/stage groups')
  const [activeCategory, setActiveCategory] = useState('All categories')

  const filteredEntries = useMemo(
    () =>
      toiletingSupport.filter(
        (item) =>
          (activeAgeStage === 'All age/stage groups' ||
            item.age_stage === activeAgeStage) &&
          (activeCategory === 'All categories' ||
            item.category === activeCategory),
      ),
    [activeAgeStage, activeCategory],
  )

  const groupedEntries = useMemo(
    () =>
      ageStages
        .slice(1)
        .map((ageStage) => ({
          ageStage,
          entries: filteredEntries.filter((item) => item.age_stage === ageStage),
        }))
        .filter((group) => group.entries.length > 0),
    [filteredEntries],
  )

  return (
    <div className="decision-panel toileting-panel">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <p className="step-count">Toileting, Hygiene & Body Routines</p>
      <h2>Support toileting with dignity and practical routines.</h2>

      <section className="check-first-panel" aria-labelledby="toileting-check-title">
        <h3 id="toileting-check-title">Check first</h3>
        <p>
          First check pain, blood, constipation, urinary symptoms, sudden
          regression, ongoing accidents, distress, skin irritation,
          safeguarding concerns, or school exclusion before assuming behaviour
          or sensory causes.
        </p>
      </section>

      <p className="education-disclaimer">
        This app provides general educational support information. It is not a
        diagnostic tool and does not replace professional advice.
      </p>

      <div className="filter-panel" aria-label="Filter toileting support entries">
        <label className="filter-field">
          <span>Age/stage</span>
          <select
            value={activeAgeStage}
            onChange={(event) => setActiveAgeStage(event.target.value)}
          >
            {ageStages.map((ageStage) => (
              <option key={ageStage}>{ageStage}</option>
            ))}
          </select>
        </label>
        <label className="filter-field">
          <span>Category</span>
          <select
            value={activeCategory}
            onChange={(event) => setActiveCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="result-count" aria-live="polite">
        Showing {filteredEntries.length} of {toiletingSupport.length}
      </p>

      {groupedEntries.length === 0 ? (
        <p className="empty-note">No toileting entries match those filters.</p>
      ) : (
        groupedEntries.map((group) => (
          <section className="age-stage-section" key={group.ageStage}>
            <h3>{group.ageStage}</h3>
            <div className="support-card-list">
              {group.entries.map((item) => (
                <article className="support-db-card" key={item.id}>
                  <div className="support-card-header">
                    <div>
                      <p className="reading-category">{item.category}</p>
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
                    <strong>Check first:</strong> {item.check_first}
                  </p>

                  <ToiletingDetailList
                    heading="Common reasons"
                    items={item.common_reasons}
                  />
                  <ToiletingDetailList heading="Try first" items={item.try_first} />
                  <ToiletingDetailList
                    heading="Visual supports"
                    items={item.visual_supports}
                  />
                  <ToiletingDetailList
                    heading="Helpful words"
                    items={item.helpful_words}
                  />
                  <ToiletingDetailList heading="Avoid" items={item.avoid} />
                  <ToiletingDetailList
                    heading="School supports"
                    items={item.school_supports}
                  />
                  <ToiletingDetailList
                    heading="Sensory adjustments"
                    items={item.sensory_adjustments}
                  />
                  <ToiletingDetailList
                    heading="Independence steps"
                    items={item.independence_steps}
                  />
                  <ToiletingDetailList
                    heading="When to seek help"
                    items={item.when_to_seek_help}
                  />
                </article>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}

export default ToiletingSupportScreen
