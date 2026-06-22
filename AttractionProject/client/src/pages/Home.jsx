import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { attractionsApi } from '../api/attractions'
import { commentsApi } from '../api/comments'
import TripCard from '../components/TripCard'
import { Loading } from '../components/States'
import { HERO_SLIDES } from '../constants/tripImages'
import { getTripRatingStats } from '../utils/ratings'

const HERO_INTERVAL_MS = 5000

export default function Home() {
  const [trips, setTrips] = useState([])
  const [commentCounts, setCommentCounts] = useState({})
  const [allComments, setAllComments] = useState([])
  const [totalComments, setTotalComments] = useState(0)
  const [loading, setLoading] = useState(true)
  const [heroIndex, setHeroIndex] = useState(0)

  useEffect(() => {
    Promise.all([attractionsApi.getAll(), commentsApi.getAll()])
      .then(([t, comments]) => {
        setTrips(t || [])
        setAllComments(comments || [])
        const counts = {}
        ;(comments || []).forEach((c) => {
          const aid = c.idAttraction?.id
          if (aid) counts[aid] = (counts[aid] || 0) + 1
        })
        setCommentCounts(counts)
        setTotalComments((comments || []).length)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (HERO_SLIDES.length <= 1) return undefined
    const timer = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_SLIDES.length)
    }, HERO_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  const featured = useMemo(() => {
    return [...trips]
      .map((trip) => ({
        trip,
        stats: getTripRatingStats(trip.id, trip, allComments),
      }))
      .sort((a, b) => {
        if (b.stats.average !== a.stats.average) return b.stats.average - a.stats.average
        return b.stats.count - a.stats.count
      })
      .slice(0, 3)
      .map(({ trip }) => trip)
  }, [trips, allComments])

  return (
    <>
      <section className="hero-full">
        <div className="hero-full-slides" aria-hidden="true">
          {HERO_SLIDES.map((src, i) => (
            <div
              key={src}
              className={`hero-full-slide${i === heroIndex ? ' active' : ''}`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>
        <div className="hero-full-inner container">
          <span className="hero-eyebrow">🌿 גלו את ישראל</span>
          <h1>מסלולי טיול, אטרקציות וחוויות בטבע</h1>
          <p>
            מפלים בגליל, מדבר יהודה, מכתש רמון, חופים ועוד — בחר/י מסלול, קרא/י חוויות והוסף/י את שלך.
          </p>
          <div className="hero-actions">
            <Link to="/attractions" className="btn btn-primary btn-lg">
              גלה מסלולים ←
            </Link>
            <Link to="/attractions?q=מפל" className="btn btn-ghost btn-lg hero-btn-light">
              🔍 חיפוש מפלים
            </Link>
          </div>
          <div className="hero-stats">
            <div><strong>{trips.length}</strong><span>מסלולים</span></div>
            <div><strong>{totalComments}</strong><span>תגובות</span></div>
            <div><strong>4</strong><span>אזורים</span></div>
          </div>
        </div>
      </section>

      <div className="container page">
        <section className="section-head">
          <h2>⭐ מסלולים מומלצים</h2>
          <Link to="/attractions" className="link-more">כל המסלולים →</Link>
        </section>

        {loading ? (
          <Loading text="טוען מסלולים..." />
        ) : (
          <div className="grid-trips">
            {featured.map((t) => (
              <TripCard key={t.id} trip={t} commentCount={commentCounts[t.id] || 0} allComments={allComments} />
            ))}
          </div>
        )}

        <section className="areas-banner">
          <h3>טיולים לפי אזור</h3>
          <div className="areas-row">
            {['צפון', 'דרום', 'מרכז', 'נגב'].map((area) => (
              <Link key={area} to={`/attractions?area=${area}`} className="area-pill">
                {area}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
