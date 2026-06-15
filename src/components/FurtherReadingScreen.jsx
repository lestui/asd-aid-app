import { furtherReading } from '../data/furtherReading.js'

function FurtherReadingScreen({ onBack }) {
  return (
    <div className="decision-panel reading-panel">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <p className="step-count">Further reading</p>
      <h2>Optional background resources.</h2>

      <p className="education-disclaimer">
        This app provides general educational support information. It is not a
        diagnostic tool and does not replace professional advice.
      </p>

      <div className="reading-list">
        {furtherReading.map((item) => (
          <article className="reading-card" key={item.id}>
            <p className="reading-category">{item.category}</p>
            <h3>{item.title}</h3>
            <p className="reading-author">{item.author}</p>
            <p>
              <strong>Audience:</strong> {item.audience}
            </p>
            <p>{item.short_original_summary}</p>
            <p className="review-note">Last reviewed: {item.last_reviewed}</p>
          </article>
        ))}
      </div>

      <p className="privacy-note">
        Reading suggestions are optional and should be reviewed periodically.
      </p>
    </div>
  )
}

export default FurtherReadingScreen
