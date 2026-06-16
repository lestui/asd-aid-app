import { getProfileRecommendations } from '../data/profileRecommendations.js'

function hasProfileDetails(profile) {
  return Object.values(profile).some((value) =>
    Array.isArray(value) ? value.length > 0 : Boolean(value),
  )
}

function RecommendationCard({ recommendation, actionLabel, onAction }) {
  const { item, reasons } = recommendation

  return (
    <article className="recommendation-card">
      <div>
        {item.category && <p className="reading-category">{item.category}</p>}
        <h3>{item.title}</h3>
      </div>
      {'blurb' in item && <p>{item.blurb}</p>}
      {'situation' in item && <p>{item.situation}</p>}
      {'short_original_summary' in item && <p>{item.short_original_summary}</p>}
      <ul className="reason-list">
        {reasons.map((reason) => (
          <li key={reason}>{reason}</li>
        ))}
      </ul>
      {onAction && (
        <button className="secondary-action compact-action" type="button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </article>
  )
}

function RecommendationSection({ title, recommendations, actionFor }) {
  if (recommendations.length === 0) {
    return null
  }

  return (
    <section className="recommendation-section">
      <h3>{title}</h3>
      <div className="recommendation-list">
        {recommendations.map((recommendation) => (
          <RecommendationCard
            actionLabel={actionFor?.(recommendation).label}
            key={recommendation.item.id}
            onAction={actionFor?.(recommendation).onAction}
            recommendation={recommendation}
          />
        ))}
      </div>
    </section>
  )
}

function RecommendedSupports({
  profile,
  onBrowseBodyRegulation,
  onBrowseEvidenceSupports,
  onBrowseToileting,
  onOpenGuideArea,
}) {
  if (!hasProfileDetails(profile)) {
    return (
      <section className="recommendations-panel">
        <h2>Recommended supports</h2>
        <p className="empty-note">
          Add a few profile details and save them to see suggested guide areas
          and support ideas here.
        </p>
      </section>
    )
  }

  const recommendations = getProfileRecommendations(profile)
  const hasRecommendations = Object.values(recommendations).some(
    (items) => items.length > 0,
  )

  return (
    <section className="recommendations-panel">
      <h2>Recommended supports</h2>
      <p className="education-disclaimer">
        These suggestions are general educational support ideas based on the
        profile details saved on this device. They are not a diagnosis,
        treatment plan, or medical advice. Seek professional or urgent help if
        there is pain, injury, sudden change, severe distress, self-injury,
        unsafe behaviour, or safeguarding concern.
      </p>

      {!hasRecommendations && (
        <p className="empty-note">
          No specific suggestions yet. Add more profile details to make the
          recommendations more useful.
        </p>
      )}

      <RecommendationSection
        actionFor={(recommendation) => ({
          label: `Open ${recommendation.item.title}`,
          onAction: () => onOpenGuideArea(recommendation.item.id),
        })}
        recommendations={recommendations.guideAreas}
        title="Guide areas"
      />
      <RecommendationSection
        recommendations={recommendations.evidenceSupports}
        title="Support strategies"
      />
      <RecommendationSection
        actionFor={() => ({
          label: 'Browse body regulation supports',
          onAction: onBrowseBodyRegulation,
        })}
        recommendations={recommendations.bodyRegulation}
        title="Body regulation and boundaries"
      />
      <RecommendationSection
        actionFor={() => ({
          label: 'Browse toileting supports',
          onAction: onBrowseToileting,
        })}
        recommendations={recommendations.toileting}
        title="Toileting and hygiene"
      />
      <RecommendationSection
        recommendations={recommendations.furtherReading}
        title="Further reading"
      />

      <div className="recommendation-actions">
        <button className="secondary-action compact-action" type="button" onClick={onBrowseEvidenceSupports}>
          Browse all evidence supports
        </button>
        <button className="secondary-action compact-action" type="button" onClick={onBrowseToileting}>
          Browse toileting supports
        </button>
        <button className="secondary-action compact-action" type="button" onClick={onBrowseBodyRegulation}>
          Browse body regulation supports
        </button>
      </div>
    </section>
  )
}

export default RecommendedSupports
