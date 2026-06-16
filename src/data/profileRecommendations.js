import { bodyRegulationBoundaries } from './bodyRegulationBoundaries.js'
import { evidenceBasedSupport } from './evidenceBasedSupport.js'
import { furtherReading } from './furtherReading.js'
import { guideAreas } from './guideAreas.js'
import { profileRecommendationRules } from './profileRecommendationRules.js'
import { toiletingSupport } from './toiletingSupport.js'

const dataSets = {
  guideAreaIds: guideAreas,
  evidenceIds: evidenceBasedSupport,
  bodyRegulationIds: bodyRegulationBoundaries,
  toiletingIds: toiletingSupport,
}

const idFields = {
  guideAreaIds: 'guideAreas',
  evidenceIds: 'evidenceSupports',
  bodyRegulationIds: 'bodyRegulation',
  toiletingIds: 'toileting',
}

function fieldMatches(value, matches) {
  if (!matches?.length) {
    return false
  }

  if (Array.isArray(value)) {
    return value.some((item) => matches.includes(item))
  }

  return matches.includes(value)
}

function addRecommendation(bucket, item, reason) {
  if (!item) {
    return
  }

  const existing = bucket.get(item.id)
  if (existing) {
    existing.score += 1
    existing.reasons = [...new Set([...existing.reasons, reason])]
    return
  }

  bucket.set(item.id, {
    item,
    score: 1,
    reasons: [`Suggested because ${reason}.`],
  })
}

function sortRecommendations(bucket, limit) {
  return [...bucket.values()]
    .sort((first, second) => second.score - first.score)
    .slice(0, limit)
}

export function getProfileRecommendations(profile) {
  const buckets = {
    guideAreas: new Map(),
    evidenceSupports: new Map(),
    bodyRegulation: new Map(),
    toileting: new Map(),
    furtherReading: new Map(),
  }

  profileRecommendationRules.forEach((rule) => {
    if (!fieldMatches(profile[rule.field], rule.matches)) {
      return
    }

    Object.entries(idFields).forEach(([ruleKey, bucketKey]) => {
      const dataSet = dataSets[ruleKey]
      rule[ruleKey]?.forEach((id) => {
        addRecommendation(
          buckets[bucketKey],
          dataSet.find((item) => item.id === id),
          rule.reason,
        )
      })
    })

    rule.furtherReadingCategories?.forEach((category) => {
      furtherReading
        .filter((item) => item.category === category)
        .forEach((item) => addRecommendation(buckets.furtherReading, item, rule.reason))
    })

    rule.furtherReadingTags?.forEach((tag) => {
      furtherReading
        .filter((item) => item.tags?.includes(tag))
        .forEach((item) => addRecommendation(buckets.furtherReading, item, rule.reason))
    })
  })

  return {
    guideAreas: sortRecommendations(buckets.guideAreas, 3),
    evidenceSupports: sortRecommendations(buckets.evidenceSupports, 4),
    bodyRegulation: sortRecommendations(buckets.bodyRegulation, 3),
    toileting: sortRecommendations(buckets.toileting, 3),
    furtherReading: sortRecommendations(buckets.furtherReading, 3),
  }
}
