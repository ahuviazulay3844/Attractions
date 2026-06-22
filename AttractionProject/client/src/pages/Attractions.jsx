import { useEffect, useState } from 'react'
import { attractionsApi } from '../api/attractions'
import { commentsApi } from '../api/comments'
import TripCard from '../components/TripCard'
import TripFilters, { useTripFilters } from '../components/TripFilters'
import { Loading, ErrorState, EmptyState } from '../components/States'
import Modal from '../components/Modal'
import { Input, Select } from '../components/Field'
import { useToast } from '../components/Toast'
import { DIFFICULTY_LEVELS, AGES, AREAS } from '../constants/enums'
import { filterTrips } from '../utils/tripUtils'

const emptyForm = {
  nameTraveler: '',
  timeAttraction: '',
  difficultyLevel: '',
  age: '',
  area: '',
  priceOfAttraction: '',
}

export default function Attractions() {
  const { filters, setFilter, clearAll, activeCount } = useTripFilters()
  const [items, setItems] = useState([])
  const [commentCounts, setCommentCounts] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  const load = () => {
    setLoading(true)
    setError(null)
    Promise.all([attractionsApi.getAll(), commentsApi.getAll()])
      .then(([data, comments]) => {
        setItems(data || [])
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

  useEffect(load, [])

  const filtered = filterTrips(items, filters)

  const change = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        priceOfAttraction: Number(form.priceOfAttraction) || 0,
        timeAttraction: form.timeAttraction || null,
        difficultyLevel: form.difficultyLevel || null,
        age: form.age || null,
        area: form.area || null,
      }
      await attractionsApi.add(payload)
      toast('המסלול נוסף בהצלחה')
      setOpen(false)
      setForm(emptyForm)
      load()
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container page">
      <div className="page-header">
        <div className="page-title">
          <h2>🗺️ כל המסלולים</h2>
          <p>סנן/י לפי אזור, גיל, קושי, זמן, נגישות — או חפש/י מילת מפתח</p>
        </div>
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          + מסלול חדש
        </button>
      </div>

      <TripFilters
        filters={filters}
        setFilter={setFilter}
        clearAll={clearAll}
        activeCount={activeCount}
        resultCount={filtered.length}
      />

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="לא נמצאו מסלולים"
          text="נסה/י לשנות את הפילטרים או את החיפוש"
          action={
            activeCount > 0 ? (
              <button className="btn btn-primary" onClick={clearAll}>נקה פילטרים</button>
            ) : null
          }
        />
      ) : (
        <div className="grid-trips">
          {filtered.map((t) => (
            <TripCard key={t.id} trip={t} commentCount={commentCounts[t.id] || 0} />
          ))}
        </div>
      )}

      {open && (
        <Modal
          title="מסלול חדש"
          onClose={() => setOpen(false)}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => setOpen(false)}>ביטול</button>
              <button className="btn btn-primary" onClick={submit} disabled={saving}>
                {saving ? 'שומר...' : 'הוספה'}
              </button>
            </>
          }
        >
          <form onSubmit={submit} style={{ display: 'contents' }}>
            <Input label="שם המסלול" value={form.nameTraveler} onChange={change('nameTraveler')} required />
            <Input label="זמן (HH:MM)" type="time" value={form.timeAttraction} onChange={change('timeAttraction')} />
            <Select label="רמת קושי" placeholder="בחר" options={DIFFICULTY_LEVELS} value={form.difficultyLevel} onChange={change('difficultyLevel')} />
            <Select label="גיל מתאים" placeholder="בחר" options={AGES} value={form.age} onChange={change('age')} />
            <Select label="אזור" placeholder="בחר" options={AREAS} value={form.area} onChange={change('area')} />
            <Input label="מחיר (₪)" type="number" min="0" value={form.priceOfAttraction} onChange={change('priceOfAttraction')} />
          </form>
        </Modal>
      )}
    </div>
  )
}
