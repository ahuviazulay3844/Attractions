import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { attractionsApi } from '../api/attractions'
import { commentsApi } from '../api/comments'
import { travelersApi } from '../api/travelers'
import { getTripMeta } from '../constants/tripImages'
import { DIFFICULTY_BADGE } from '../constants/enums'
import { Loading, ErrorState } from '../components/States'
import { Input } from '../components/Field'
import { useToast } from '../components/Toast'

export default function TripDetail() {
  const { id } = useParams()
  const toast = useToast()
  const [trip, setTrip] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    setError(null)
    Promise.all([attractionsApi.getById(id), commentsApi.getAll()])
      .then(([t, allComments]) => {
        setTrip(t)
        const filtered = (allComments || []).filter((c) => c.idAttraction?.id === Number(id))
        setComments(filtered)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(load, [id])

  const submitComment = async (e) => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return
    setSaving(true)
    try {
      const traveler = await travelersApi.add({
        nameOfTraveler: name.trim(),
        emailOfTraveler: '',
        ageOfTraveler: 0,
      })
      const newComment = await commentsApi.add({
        idAttraction: { id: Number(id) },
        traveler: { idTraveler: traveler.idTraveler },
        content: content.trim(),
      })
      setComments((prev) => [...prev, newComment])
      setContent('')
      toast('התגובה נוספה בהצלחה!')
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

  return (
    <div className="trip-detail">
      <div className="trip-detail-hero" style={{ backgroundImage: `url(${meta.image})` }}>
        <div className="trip-detail-hero-inner container">
          <Link to="/attractions" className="back-link">← חזרה למסלולים</Link>
          <h1>{trip.nameTraveler}</h1>
          <p>{meta.tagline}</p>
          <div className="trip-detail-chips">
            <span className={`badge ${DIFFICULTY_BADGE[trip.difficultyLevel] || 'badge-blue'}`}>
              {trip.difficultyLevel}
            </span>
            <span className="badge badge-sand">{trip.area}</span>
            <span className="badge badge-blue">👤 {trip.age}</span>
            <span className="badge badge-blue">⏱ {trip.timeAttraction?.slice(0, 5)}</span>
            <span className="badge badge-green">{price}</span>
          </div>
        </div>
      </div>

      <div className="container trip-detail-content">
        <section className="trip-about">
          <h2>על המסלול</h2>
          <p>{meta.tagline}</p>
          <div className="trip-about-grid">
            <div><span>אזור</span><strong>{trip.area}</strong></div>
            <div><span>רמת קושי</span><strong>{trip.difficultyLevel}</strong></div>
            <div><span>גיל מתאים</span><strong>{trip.age}</strong></div>
            <div><span>משך משוער</span><strong>{trip.timeAttraction?.slice(0, 5)}</strong></div>
            <div><span>מחיר</span><strong>{price}</strong></div>
          </div>
        </section>

        <section className="comments-section">
          <div className="comments-header">
            <h2>💬 תגובות על המסלול</h2>
            <span className="comments-count">{comments.length} תגובות</span>
          </div>

          <form className="comment-form" onSubmit={submitComment}>
            <Input
              label="השם שלך"
              placeholder="איך קוראים לך?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
              {saving ? 'שולח...' : 'פרסם תגובה'}
            </button>
          </form>

          <div className="comments-list">
            {comments.length === 0 ? (
              <p className="comments-empty">עדיין אין תגובות — תהיה/י הראשון/ה!</p>
            ) : (
              comments.map((c) => (
                <article className="comment-item" key={c.idComments}>
                  <div className="comment-avatar">
                    {(c.traveler?.nameOfTraveler || '?').charAt(0)}
                  </div>
                  <div className="comment-body">
                    <div className="comment-top">
                      <strong>{c.traveler?.nameOfTraveler || 'מטייל/ת'}</strong>
                      {c.localDate && <span className="comment-date">{c.localDate}</span>}
                    </div>
                    <p>{c.content}</p>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
