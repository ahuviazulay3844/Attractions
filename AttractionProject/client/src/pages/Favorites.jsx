import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { attractionsApi } from '../api/attractions'
import { commentsApi } from '../api/comments'
import { getSavedTripIds } from '../utils/favorites'
import { useAuth } from '../context/AuthContext'
import TripCard from '../components/TripCard'
import { Loading, ErrorState, EmptyState } from '../components/States'
import { Icon } from '../components/Icons'

export default function Favorites() {
  const { user, isLoggedIn } = useAuth()
  const location = useLocation()
  const [trips, setTrips] = useState([])
  const [commentCounts, setCommentCounts] = useState({})
  const [allComments, setAllComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [savedIds, setSavedIds] = useState([])

  const load = () => {
    if (!isLoggedIn) {
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    const ids = getSavedTripIds()
    setSavedIds(ids)
    Promise.all([attractionsApi.getAll(), commentsApi.getAll()])
      .then(([allTrips, comments]) => {
        const saved = (allTrips || []).filter((t) => ids.includes(t.id))
        setTrips(saved)
        setAllComments(comments || [])
        const counts = {}
        ;(comments || []).forEach((c) => {
          const aid = c.idAttraction?.id
          if (aid) counts[aid] = (counts[aid] || 0) + 1
        })
        setCommentCounts(counts)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(load, [isLoggedIn, user?.id])

  useEffect(() => {
    const refresh = () => load()
    window.addEventListener('favorites-changed', refresh)
    window.addEventListener('auth-changed', refresh)
    return () => {
      window.removeEventListener('favorites-changed', refresh)
      window.removeEventListener('auth-changed', refresh)
    }
  }, [isLoggedIn, user?.id])

  if (!isLoggedIn) {
    return (
      <div className="container page">
        <EmptyState
          icon={<Icon name="heart-outline" size={48} />}
          title="מועדפים — למשתמשים מחוברים"
          text="התחבר/י או הירשם/י כדי לשמור מסלולים אישיים. אפשר גם לגלוש בלי חשבון."
          action={
            <div className="auth-actions-row">
              <Link to={`/login?return=${encodeURIComponent(location.pathname)}`} className="btn btn-primary">
                התחברות
              </Link>
              <Link to={`/register?return=${encodeURIComponent(location.pathname)}`} className="btn btn-ghost">
                הרשמה
              </Link>
            </div>
          }
        />
      </div>
    )
  }

  return (
    <div className="container page">
      <div className="page-header">
        <div className="page-title">
          <h2><Icon name="heart" size={24} /> המסלולים של {user.name}</h2>
          <p>{savedIds.length} מסלולים שמורים לתכנון הטיול הבא</p>
        </div>
        <Link to="/attractions" className="btn btn-ghost">גלה עוד מסלולים</Link>
      </div>

      {loading ? (
        <Loading text="טוען מועדפים..." />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : trips.length === 0 ? (
        <EmptyState
          icon={<Icon name="heart-outline" size={48} />}
          title="עדיין אין מסלולים שמורים"
          text='לחצ/י על "שמור מסלול" בדף מסלול כדי לשמור אותו כאן'
          action={<Link to="/attractions" className="btn btn-primary">לכל המסלולים</Link>}
        />
      ) : (
        <div className="grid-trips">
          {trips.map((t) => (
            <TripCard key={t.id} trip={t} commentCount={commentCounts[t.id] || 0} allComments={allComments} />
          ))}
        </div>
      )}
    </div>
  )
}
