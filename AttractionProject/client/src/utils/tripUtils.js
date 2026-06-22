import { getTripMeta } from '../constants/tripImages'

export const TIME_RANGES = [
  { id: 'short', label: 'עד שעה', max: 60 },
  { id: 'medium', label: '1–3 שעות', min: 61, max: 180 },
  { id: 'long', label: 'מעל 3 שעות', min: 181 },
]

export const FAMILY_FILTERS = [
  { id: 'stroller', label: '🍼 מתאים לעגלות' },
  { id: 'kids', label: '👶 מתאים לילדים' },
  { id: 'family', label: '👨‍👩‍👧 מתאים למשפחות' },
]

export function parseTripMinutes(timeStr) {
  if (!timeStr) return null
  const parts = String(timeStr).split(':').map(Number)
  const [h = 0, m = 0] = parts
  return h * 60 + m
}

export function formatDuration(timeStr) {
  const mins = parseTripMinutes(timeStr)
  if (mins == null) return '—'
  const h = Math.floor(mins / 60)
  const m = mins % 60
  if (h === 0) return `${m} דק׳`
  if (m === 0) return `${h} שע׳`
  return `${h}:${String(m).padStart(2, '0')} שע׳`
}

export function getTimeRangeId(timeStr) {
  const mins = parseTripMinutes(timeStr)
  if (mins == null) return null
  if (mins <= 60) return 'short'
  if (mins <= 180) return 'medium'
  return 'long'
}

export function getAccessibility(trip, meta) {
  const mins = parseTripMinutes(trip?.timeAttraction)
  const easy = trip?.difficultyLevel === 'קל'
  const age = trip?.age || ''

  const strollerFriendly =
    meta?.strollerFriendly ??
    (easy && (age === 'תינוקות' || age === 'ילדים') && mins != null && mins <= 120)

  const kidFriendly =
    meta?.kidFriendly ?? ['תינוקות', 'ילדים', 'נערים'].includes(age)

  const familyFriendly =
    meta?.familyFriendly ??
    (kidFriendly && trip?.difficultyLevel !== 'קשה')

  return { strollerFriendly, kidFriendly, familyFriendly }
}

export function getSearchText(trip, meta) {
  const keywords = (meta?.keywords || []).join(' ')
  return [trip?.nameTraveler, trip?.area, trip?.age, trip?.difficultyLevel, meta?.tagline, keywords]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

export function matchesSearch(trip, query) {
  if (!query?.trim()) return true
  const meta = getTripMeta(trip)
  const haystack = getSearchText(trip, meta)
  return query.trim().toLowerCase().split(/\s+/).every((word) => haystack.includes(word))
}

export function filterTrips(trips, filters) {
  const { q, area, age, difficulty, time, family } = filters

  return (trips || []).filter((trip) => {
    if (area && trip.area !== area) return false
    if (age && trip.age !== age) return false
    if (difficulty && trip.difficultyLevel !== difficulty) return false

    if (time) {
      const rangeId = getTimeRangeId(trip.timeAttraction)
      if (rangeId !== time) return false
    }

    if (family) {
      const acc = getAccessibility(trip, getTripMeta(trip))
      if (family === 'stroller' && !acc.strollerFriendly) return false
      if (family === 'kids' && !acc.kidFriendly) return false
      if (family === 'family' && !acc.familyFriendly) return false
    }

    if (!matchesSearch(trip, q)) return false
    return true
  })
}

export function countActiveFilters(filters) {
  return ['q', 'area', 'age', 'difficulty', 'time', 'family'].filter((k) => filters[k]).length
}
