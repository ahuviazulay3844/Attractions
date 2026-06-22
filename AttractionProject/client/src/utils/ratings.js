import { getTripMeta } from '../constants/tripImages'

const KEY = 'trip-ratings'

function loadAll() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveAll(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function addTripRating(tripId, rating) {
  const id = String(tripId)
  const all = loadAll()
  const list = all[id] || []
  list.push({ rating: Number(rating), at: Date.now() })
  all[id] = list
  saveAll(all)
}

export function getTripRatingStats(tripId, trip) {
  const meta = getTripMeta(trip)
  const userRatings = loadAll()[String(tripId)] || []
  const userSum = userRatings.reduce((s, r) => s + r.rating, 0)
  const userCount = userRatings.length

  const baseRating = meta.baseRating ?? 4.2
  const baseCount = meta.baseReviews ?? 8

  const totalCount = baseCount + userCount
  const average =
    totalCount === 0
      ? 0
      : (baseRating * baseCount + userSum) / totalCount

  return {
    average: Math.round(average * 10) / 10,
    count: totalCount,
    userCount,
  }
}

export function formatStars(average) {
  const full = Math.floor(average)
  const half = average - full >= 0.5
  return { full, half, empty: 5 - full - (half ? 1 : 0) }
}
