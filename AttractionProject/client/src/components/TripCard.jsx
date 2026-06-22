import { Link } from 'react-router-dom'
import { getTripMeta } from '../constants/tripImages'
import { DIFFICULTY_BADGE } from '../constants/enums'
import { getAccessibility, formatDuration } from '../utils/tripUtils'
import { getTripRatingStats } from '../utils/ratings'
import { StarDisplay } from './StarRating'
import { Icon } from './Icons'
import SaveTripButton from './SaveTripButton'

export default function TripCard({ trip, commentCount = 0, allComments = [] }) {
  const meta = getTripMeta(trip)
  const price = trip.priceOfAttraction > 0 ? `₪${trip.priceOfAttraction}` : 'חינם'
  const acc = getAccessibility(trip, meta)
  const rating = getTripRatingStats(trip.id, trip, allComments)

  return (
    <article className="trip-card-wrap">
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
          <div className="trip-card-head-row">
            <h3>{trip.nameTraveler}</h3>
            <div className="trip-rating-inline">
              <StarDisplay value={rating.average} size="sm" />
              <span>{rating.average} ({rating.count})</span>
            </div>
          </div>
          <p className="trip-card-tagline">{meta.tagline}</p>
          <div className="access-badges">
            {acc.strollerFriendly && <span className="badge badge-green">עגלות</span>}
            {acc.kidFriendly && <span className="badge badge-blue">ילדים</span>}
            {acc.familyFriendly && <span className="badge badge-sand">משפחות</span>}
          </div>
          <div className="trip-card-meta">
            <span><Icon name="clock" size={14} /> {formatDuration(trip.timeAttraction)}</span>
            <span>{trip.age}</span>
            <span className="trip-price">{price}</span>
          </div>
          <div className="trip-card-comments">
            <Icon name="message" size={14} /> {commentCount} {commentCount === 1 ? 'תגובה' : 'תגובות'}
          </div>
        </div>
      </Link>
      <SaveTripButton tripId={trip.id} className="trip-card-save" />
    </article>
  )
}
