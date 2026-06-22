import { getCurrentUser } from './auth'

function favoritesKey() {
  const user = getCurrentUser()
  return user ? `saved-trips-${user.id}` : null
}

function loadIds(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function getSavedTripIds() {
  const key = favoritesKey()
  if (!key) return []
  return loadIds(key)
}

export function isTripSaved(tripId) {
  return getSavedTripIds().includes(Number(tripId))
}

export function toggleSavedTrip(tripId) {
  const key = favoritesKey()
  if (!key) return { saved: false, needLogin: true }

  const id = Number(tripId)
  const ids = loadIds(key)
  const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
  localStorage.setItem(key, JSON.stringify(next))
  window.dispatchEvent(new Event('favorites-changed'))
  return { saved: next.includes(id), needLogin: false }
}

export function removeSavedTrip(tripId) {
  const key = favoritesKey()
  if (!key) return
  const id = Number(tripId)
  const next = loadIds(key).filter((x) => x !== id)
  localStorage.setItem(key, JSON.stringify(next))
  window.dispatchEvent(new Event('favorites-changed'))
}
