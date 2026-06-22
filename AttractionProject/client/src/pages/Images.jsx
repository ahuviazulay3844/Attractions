import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { attractionsApi } from '../api/attractions'
import { getTripMeta } from '../constants/tripImages'
import { Loading, ErrorState } from '../components/States'

export default function Images() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = () => {
    setLoading(true)
    setError(null)
    attractionsApi
      .getAll()
      .then((data) => setTrips(data || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  return (
    <div className="container page">
      <div className="page-header">
        <div className="page-title">
          <h2>📸 גלריית טיולים</h2>
          <p>תמונות תואמות לכל מסלול — לחצ/י לפרטים ותגובות</p>
        </div>
      </div>

      {loading ? (
        <Loading text="טוען תמונות..." />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : (
        <div className="gallery-grid">
          {trips.map((trip) => {
            const meta = getTripMeta(trip)
            return (
              <Link key={trip.id} to={`/attractions/${trip.id}`} className="gallery-item">
                <img src={meta.image} alt={trip.nameTraveler} loading="lazy" />
                <div className="gallery-overlay">
                  <span className="badge badge-sand">{trip.area}</span>
                  <h3>{trip.nameTraveler}</h3>
                  <p>{meta.tagline}</p>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
