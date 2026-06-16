import { useMemo, useState } from 'react'
import { evidenceBasedSupport } from '../data/evidenceBasedSupport.js'

const categories = ['All categories', ...new Set(evidenceBasedSupport.map((item) => item.category))]

function itemMatchesSearch(item, searchTerm) {
  const normalizedSearch = searchTerm.trim().toLowerCase()

  if (!normalizedSearch) {
    return true
  }

  return [
    item.title,
    item.category,
    item.situation,
    item.caregiver_goal,
    item.evidence_level,
    ...item.try_first,
    ...item.avoid,
    ...item.when_to_seek_help,
  ]
    .join(' ')
    .toLowerCase()
    .includes(normalizedSearch)
}

function DetailList({ heading, items }) {
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

function EvidenceSupportScreen({ onBack }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All categories')

  const filteredSupports = useMemo(
    () =>
      evidenceBasedSupport.filter(
        (item) =>
          (activeCategory === 'All categories' ||
            item.category === activeCategory) &&
          itemMatchesSearch(item, searchTerm),
      ),
    [activeCategory, searchTerm],
  )

  return (
    <div className="decision-panel evidence-panel">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <p className="step-count">Evidence-informed supports</p>
      <h2>Browse support ideas for common situations.</h2>

      <p className="education-disclaimer">
        This app provides general educational support information. It is not a
        diagnostic tool and does not replace professional advice.
      </p>

      <div className="filter-panel" aria-label="Filter support entries">
        <label className="filter-field">
          <span>Search</span>
          <input
            type="search"
            value={searchTerm}
            placeholder="Try sensory, school, sleep..."
            onChange={(event) => setSearchTerm(event.target.value)}
          />
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
        Showing {filteredSupports.length} of {evidenceBasedSupport.length}
      </p>

      {filteredSupports.length === 0 ? (
        <p className="empty-note">
          No support entries match those filters. Try a different search term or
          category.
        </p>
      ) : (
        <div className="support-card-list">
          {filteredSupports.map((item) => (
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

              <DetailList heading="Try first" items={item.try_first} />
              <DetailList heading="Avoid" items={item.avoid} />
              <DetailList
                heading="When to seek help"
                items={item.when_to_seek_help}
              />
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default EvidenceSupportScreen
