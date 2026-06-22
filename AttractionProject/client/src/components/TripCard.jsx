import { Link } from 'react-router-dom'
import { getTripMeta } from '../constants/tripImages'
import { DIFFICULTY_BADGE } from '../constants/enums'

export default function TripCard({ trip, commentCount = 0 }) {
  const meta = getTripMeta(trip)
  const price = trip.priceOfAttraction > 0 ? `₪${trip.priceOfAttraction}` : 'חינם'

  return (
    <Link to={`/attractions/${trip.id}`} className="trip-card">
      <div className="trip-card-img-wrap">
        <img src={meta.image} alt={trip.nameTraveler} className="trip-card-img" loading="lazy" />
        <div className="trip-card-overlay">
          <span className={`badge ${DIFFICULTY_BADGE[trip.difficultyLevel] || 'badge-blue'}`}>
            {trip.difficultyLevel}
          </span>
          {trip.area && <span className="badge badge-sand">{trip.area}</span>}
        </div>
      </div>
      <div className="trip-card-body">
        <h3>{trip.nameTraveler}</h3>
        <p className="trip-card-tagline">{meta.tagline}</p>
        <div className="trip-card-meta">
          <span>⏱ {trip.timeAttraction?.slice(0, 5) || '—'}</span>
          <span>👤 {trip.age}</span>
          <span className="trip-price">{price}</span>
        </div>
        {commentCount > 0 && (
          <div className="trip-card-comments">💬 {commentCount} תגובות</div>
        )}
      </div>
    </Link>
  )
}
