import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isTripSaved, toggleSavedTrip } from '../utils/favorites'
import { useAuth } from '../context/AuthContext'
import { useToast } from './Toast'
import { Icon } from './Icons'

export default function SaveTripButton({ tripId, className = '' }) {
  const { user } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [saved, setSaved] = useState(() => user && isTripSaved(tripId))

  useEffect(() => {
    setSaved(user && isTripSaved(tripId))
  }, [user, tripId])

  const toggle = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast('יש להתחבר כדי לשמור מסלול', 'error')
      navigate(`/login?return=${encodeURIComponent(location.pathname)}`)
      return
    }

    const result = toggleSavedTrip(tripId)
    if (result.needLogin) return
    setSaved(result.saved)
    toast(result.saved ? 'המסלול נשמר למועדפים שלך' : 'הוסר מהמועדפים')
  }

  return (
    <button
      type="button"
      className={`save-trip-btn${saved ? ' saved' : ''} ${className}`}
      onClick={toggle}
      title={saved ? 'הסר ממועדפים' : user ? 'שמור מסלול' : 'התחבר/י לשמירה'}
    >
      <Icon name={saved ? 'heart' : 'heart-outline'} size={16} />
      {saved ? 'נשמר' : 'שמור מסלול'}
    </button>
  )
}
