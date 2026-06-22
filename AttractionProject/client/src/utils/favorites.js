const KEY = 'saved-trips'

export function getSavedTripIds() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function isTripSaved(tripId) {
  return getSavedTripIds().includes(Number(tripId))
}

export function toggleSavedTrip(tripId) {
  const id = Number(tripId)
  const ids = getSavedTripIds()
  const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
  localStorage.setItem(KEY, JSON.stringify(next))
  window.dispatchEvent(new Event('favorites-changed'))
  return next.includes(id)
}

export function removeSavedTrip(tripId) {
  const id = Number(tripId)
  const next = getSavedTripIds().filter((x) => x !== id)
  localStorage.setItem(KEY, JSON.stringify(next))
}
