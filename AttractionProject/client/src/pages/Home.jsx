import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { attractionsApi } from '../api/attractions'
import { commentsApi } from '../api/comments'
import TripCard from '../components/TripCard'
import { Loading } from '../components/States'

const HERO_IMG = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80&auto=format&fit=crop'

export default function Home() {
  const [trips, setTrips] = useState([])
  const [commentCounts, setCommentCounts] = useState({})
  const [totalComments, setTotalComments] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([attractionsApi.getAll(), commentsApi.getAll()])
      .then(([t, comments]) => {
        setTrips(t || [])
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

  const featured = trips.slice(0, 3)

  return (
    <>
      <section className="hero-full" style={{ backgroundImage: `url(${HERO_IMG})` }}>
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
              <TripCard key={t.id} trip={t} commentCount={commentCounts[t.id] || 0} />
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
