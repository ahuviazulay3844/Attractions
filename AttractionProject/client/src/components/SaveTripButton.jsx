import { useState } from 'react'
import { isTripSaved, toggleSavedTrip } from '../utils/favorites'
import { useToast } from './Toast'

export default function SaveTripButton({ tripId, className = '' }) {
  const toast = useToast()
  const [saved, setSaved] = useState(() => isTripSaved(tripId))

  const toggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const next = toggleSavedTrip(tripId)
    setSaved(next)
    toast(next ? 'המסלול נשמר למועדפים ❤️' : 'הוסר מהמועדפים')
  }

  return (
    <button
      type="button"
      className={`save-trip-btn${saved ? ' saved' : ''} ${className}`}
      onClick={toggle}
      title={saved ? 'הסר ממועדפים' : 'שמור מסלול'}
    >
      {saved ? '❤️ נשמר' : '🤍 שמור מסלול'}
    </button>
  )
}
