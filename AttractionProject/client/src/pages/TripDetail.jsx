import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { attractionsApi } from '../api/attractions'
import { commentsApi } from '../api/comments'
import { travelersApi } from '../api/travelers'
import { getTripMeta } from '../constants/tripImages'
import { DIFFICULTY_BADGE } from '../constants/enums'
import { getAccessibility, formatDuration } from '../utils/tripUtils'
import { getTripRatingStats } from '../utils/ratings'
import { useAuth } from '../context/AuthContext'
import { Loading, ErrorState } from '../components/States'
import { Input } from '../components/Field'
import { StarDisplay, StarInput } from '../components/StarRating'
import SaveTripButton from '../components/SaveTripButton'
import { Icon } from '../components/Icons'
import { useToast } from '../components/Toast'

function commentAuthorName(comment) {
  return comment?.traveler?.nameOfTraveler?.trim() || null
}

export default function TripDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const toast = useToast()
  const [trip, setTrip] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [stars, setStars] = useState(5)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user?.name) setName(user.name)
  }, [user])

  const load = () => {
    setLoading(true)
    setError(null)
    Promise.all([attractionsApi.getById(id), commentsApi.getByAttraction(id)])
      .then(([t, tripComments]) => {
        setTrip(t)
        setComments(tripComments || [])
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(load, [id])

  const ratingStats = trip ? getTripRatingStats(id, trip, comments) : { average: 0, count: 0 }

  const submitComment = async (e) => {
    e.preventDefault()
    const authorName = user?.name || name.trim()
    if (!authorName || !content.trim() || !stars) {
      toast('יש למלא שם ותגובה', 'error')
      return
    }
    setSaving(true)
    try {
      const traveler = await travelersApi.add({
        nameOfTraveler: authorName,
        emailOfTraveler: user?.email || '',
        ageOfTraveler: 0,
      })
      const newComment = await commentsApi.add({
        idAttraction: { id: Number(id) },
        traveler: { idTraveler: traveler.idTraveler },
        content: content.trim(),
        rating: stars,
      })
      const withName = {
        ...newComment,
        traveler: {
          ...newComment.traveler,
          nameOfTraveler: authorName,
          emailOfTraveler: user?.email || '',
        },
      }
      setComments((prev) => [withName, ...prev])
      if (!user) setName('')
      setContent('')
      toast('התגובה והדירוג נוספו בהצלחה!')
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loading text="טוען את המסלול..." />
  if (error) return <ErrorState message={error} onRetry={load} />
  if (!trip) return <ErrorState message="המסלול לא נמצא" />

  const meta = getTripMeta(trip)
  const price = trip.priceOfAttraction > 0 ? `₪${trip.priceOfAttraction}` : 'חינם'
  const acc = getAccessibility(trip, meta)

  return (
    <div className="trip-detail">
      <div className="trip-detail-hero" style={{ backgroundImage: `url(${meta.image})` }}>
        <div className="trip-detail-hero-inner container">
          <Link to="/attractions" className="back-link">← חזרה למסלולים</Link>
          <div className="trip-hero-actions">
            <SaveTripButton tripId={trip.id} />
          </div>
          <h1>{trip.nameTraveler}</h1>
          <p>{meta.tagline}</p>
          <div className="trip-rating-block">
            <StarDisplay value={ratingStats.average} size="lg" />
            <span className="trip-rating-text">
              {ratingStats.average} · {ratingStats.count} דירוגים · {comments.length} תגובות
            </span>
          </div>
          <div className="trip-detail-chips">
            <span className={`badge ${DIFFICULTY_BADGE[trip.difficultyLevel] || 'badge-blue'}`}>
              {trip.difficultyLevel}
            </span>
            <span className="badge badge-sand">{trip.area}</span>
            <span className="badge badge-blue">{trip.age}</span>
            <span className="badge badge-blue">{formatDuration(trip.timeAttraction)}</span>
            <span className="badge badge-green">{price}</span>
            {acc.strollerFriendly && <span className="badge badge-green">מתאים לעגלות</span>}
            {acc.kidFriendly && <span className="badge badge-blue">מתאים לילדים</span>}
            {acc.familyFriendly && <span className="badge badge-sand">מתאים למשפחות</span>}
          </div>
        </div>
      </div>

      <div className="container trip-detail-content">
        <section className="trip-about">
          <h2>מידע על המסלול</h2>
          <p>{meta.tagline}</p>
          {meta.keywords?.length > 0 && (
            <div className="keyword-tags">
              {meta.keywords.map((k) => (
                <Link key={k} to={`/attractions?q=${encodeURIComponent(k)}`} className="keyword-tag">
                  #{k}
                </Link>
              ))}
            </div>
          )}
          <div className="trip-about-grid">
            <div><span>אזור</span><strong>{trip.area}</strong></div>
            <div><span>רמת קושי</span><strong>{trip.difficultyLevel}</strong></div>
            <div><span>גיל מתאים</span><strong>{trip.age}</strong></div>
            <div><span>משך משוער</span><strong>{formatDuration(trip.timeAttraction)}</strong></div>
            <div><span>מחיר</span><strong>{price}</strong></div>
            <div><span>דירוג קהילה</span><strong>{ratingStats.average} / 5</strong></div>
          </div>
        </section>

        <section className="comments-section">
          <div className="comments-header">
            <h2><Icon name="message" size={22} /> תגובות על המסלול</h2>
            <span className="comments-count">{comments.length} תגובות</span>
          </div>

          <form className="comment-form" onSubmit={submitComment}>
            {user ? (
              <p className="comment-as-user">
                <Icon name="user" size={16} />
                מפרסם/ת בתור <strong>{user.name}</strong>
              </p>
            ) : (
              <Input
                label="השם שלך"
                placeholder="איך קוראים לך?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <StarInput value={stars} onChange={setStars} label="הדירוג שלך (כוכבים)" />
            <div className="field">
              <label>התגובה שלך</label>
              <textarea
                className="comment-textarea"
                placeholder="ספר/י על החוויה שלך במסלול..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'שולח...' : 'פרסם תגובה ודירוג'}
            </button>
          </form>

          <div className="comments-list">
            {comments.length === 0 ? (
              <p className="comments-empty">עדיין אין תגובות — תהיה/י הראשון/ה!</p>
            ) : (
              comments.map((c) => {
                const author = commentAuthorName(c) || 'אנונימי/ת'
                return (
                  <article className="comment-item" key={c.idComments}>
                    <div className="comment-avatar">{author.charAt(0)}</div>
                    <div className="comment-body">
                      <div className="comment-top">
                        <div className="comment-top-main">
                          <strong>{author}</strong>
                          {c.rating >= 1 && <StarDisplay value={c.rating} size="sm" />}
                        </div>
                        {c.localDate && <span className="comment-date">{c.localDate}</span>}
                      </div>
                      <p>{c.content}</p>
                    </div>
                  </article>
                )
              })
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
