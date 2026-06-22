import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { commentsApi } from '../api/comments'
import { attractionsApi } from '../api/attractions'
import { travelersApi } from '../api/travelers'
import { Loading, ErrorState, EmptyState } from '../components/States'
import Modal from '../components/Modal'
import { Input, Select } from '../components/Field'
import { StarDisplay, StarInput } from '../components/StarRating'
import { useToast } from '../components/Toast'

const emptyForm = { attractionId: '', travelerId: '', content: '', rating: 5 }

export default function Comments() {
  const [items, setItems] = useState([])
  const [attractions, setAttractions] = useState([])
  const [travelers, setTravelers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  const load = () => {
    setLoading(true)
    setError(null)
    Promise.all([commentsApi.getAll(), attractionsApi.getAll(), travelersApi.getAll()])
      .then(([c, a, t]) => {
        setItems(c || [])
        setAttractions(a || [])
        setTravelers(t || [])
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const change = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        content: form.content,
        rating: Number(form.rating) || 5,
        idAttraction: form.attractionId ? { id: Number(form.attractionId) } : null,
        traveler: form.travelerId ? { idTraveler: Number(form.travelerId) } : null,
      }
      await commentsApi.add(payload)
      toast('התגובה נוספה בהצלחה')
      setOpen(false)
      setForm(emptyForm)
      load()
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  const remove = async (item) => {
    if (!confirm('למחוק את התגובה?')) return
    try {
      await commentsApi.remove(item.idComments)
      toast('התגובה נמחקה')
      setItems((list) => list.filter((x) => x.idComments !== item.idComments))
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  const attractionName = (c) => c.idAttraction?.nameTraveler || (c.idAttraction?.id ? `#${c.idAttraction.id}` : '—')
  const travelerName = (c) => c.traveler?.nameOfTraveler || (c.traveler?.idTraveler ? `#${c.traveler.idTraveler}` : '—')

  return (
    <div className="container page">
      <div className="page-header">
        <div className="page-title">
          <h2>💬 תגובות</h2>
          <p>סך הכל {items.length} תגובות</p>
        </div>
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          + תגובה חדשה
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : items.length === 0 ? (
        <EmptyState
          icon="💬"
          title="אין תגובות עדיין"
          text="התחל בהוספת תגובה ראשונה"
          action={
            <button className="btn btn-primary" onClick={() => setOpen(true)}>
              + תגובה חדשה
            </button>
          }
        />
      ) : (
        <div className="grid">
          {[...items].sort((a, b) => b.idComments - a.idComments).map((c) => (
            <div className="card" key={c.idComments}>
              <div className="card-head">
                <span className="card-title">💬 {travelerName(c)}</span>
                <span className="card-id">#{c.idComments}</span>
              </div>
              {c.rating >= 1 && (
                <div className="comment-card-stars">
                  <StarDisplay value={c.rating} size="sm" />
                  <span>{c.rating}/5</span>
                </div>
              )}
              <p style={{ color: 'var(--text)', fontSize: '0.98rem' }}>{c.content || '—'}</p>
              <div className="card-rows">
                <div className="card-row">
                  <span className="label">מסלול</span>
                  {c.idAttraction?.id ? (
                    <Link to={`/attractions/${c.idAttraction.id}`} className="badge badge-blue">
                      {attractionName(c)} →
                    </Link>
                  ) : (
                    <span className="badge badge-blue">{attractionName(c)}</span>
                  )}
                </div>
                {c.localDate && (
                  <div className="card-row">
                    <span className="label">תאריך</span>
                    <span className="value">{c.localDate}</span>
                  </div>
                )}
              </div>
              <div className="card-foot">
                <button className="btn btn-danger btn-sm" onClick={() => remove(c)}>
                  🗑️ מחיקה
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <Modal
          title="תגובה חדשה"
          onClose={() => setOpen(false)}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => setOpen(false)}>
                ביטול
              </button>
              <button className="btn btn-primary" onClick={submit} disabled={saving}>
                {saving ? 'שומר...' : 'הוספה'}
              </button>
            </>
          }
        >
          <form onSubmit={submit} style={{ display: 'contents' }}>
            <Select
              label="אטרקציה"
              placeholder="בחר אטרקציה"
              options={attractions.map((a) => ({ value: a.id, label: a.nameTraveler || `#${a.id}` }))}
              value={form.attractionId}
              onChange={change('attractionId')}
            />
            <Select
              label="מטייל"
              placeholder="בחר מטייל"
              options={travelers.map((t) => ({ value: t.idTraveler, label: t.nameOfTraveler || `#${t.idTraveler}` }))}
              value={form.travelerId}
              onChange={change('travelerId')}
            />
            <StarInput
              value={form.rating}
              onChange={(n) => setForm((f) => ({ ...f, rating: n }))}
              label="דירוג (כוכבים)"
            />
            <Input label="תוכן התגובה" value={form.content} onChange={change('content')} required />
          </form>
        </Modal>
      )}
    </div>
  )
}
