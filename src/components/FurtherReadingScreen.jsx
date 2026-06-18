import { furtherReading } from '../data/furtherReading.js'
import { podcastTopPicks } from '../data/podcastTopPicks.js'

const podcastGroups = [
  'NZ / Aotearoa and close-context picks',
  'International picks',
  'Autistic voices',
]

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

      <section
        className="podcast-section"
        aria-labelledby="podcast-top-picks-title"
      >
        <div className="screen-intro">
          <h2 id="podcast-top-picks-title">Podcast top picks</h2>
          <p>
            We include podcasts that are practical, respectful, and parent-safe.
            Be careful with content that promises cures, detoxes, miracle
            treatments, or guaranteed results.
          </p>
        </div>

        <p className="education-disclaimer">
          Podcasts can be useful for ideas and reassurance, but they do not
          replace advice from your GP, therapist, school, NASC, Whaikaha, or
          other support professionals.
        </p>

        {podcastGroups.map((group) => (
          <section
            className="podcast-group"
            key={group}
            aria-labelledby={`${group.replace(/\W+/g, '-').toLowerCase()}-podcasts`}
          >
            <h3 id={`${group.replace(/\W+/g, '-').toLowerCase()}-podcasts`}>
              {group}
            </h3>
            <div className="reading-list">
              {podcastTopPicks
                .filter((item) => item.group === group)
                .sort(
                  (firstItem, secondItem) =>
                    firstItem.priority - secondItem.priority,
                )
                .map((item) => (
                  <article className="reading-card" key={item.id}>
                    <p className="reading-category">{item.region_context}</p>
                    <h3>{item.title}</h3>
                    <p>
                      <strong>Best for:</strong> {item.best_for}
                    </p>
                    <p>{item.short_parent_friendly_description}</p>
                    {item.links?.length > 0 && (
                      <div className="podcast-links" aria-label={`${item.title} links`}>
                        {item.links.map((link) => (
                          <a
                            href={link.url}
                            key={link.url}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                    <p className="review-note">{item.platform_note}</p>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </section>

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
