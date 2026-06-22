import { useEffect, useState } from 'react'
import { travelersApi } from '../api/travelers'
import { Loading, ErrorState, EmptyState } from '../components/States'
import Modal from '../components/Modal'
import { Input } from '../components/Field'
import { useToast } from '../components/Toast'

const emptyForm = { nameOfTraveler: '', emailOfTraveler: '', ageOfTraveler: '' }

export default function Travelers() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  const load = () => {
    setLoading(true)
    setError(null)
    travelersApi
      .getAll()
      .then((data) => setItems(data || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setOpen(true)
  }

  const openEdit = (item) => {
    setEditing(item)
    setForm({
      nameOfTraveler: item.nameOfTraveler || '',
      emailOfTraveler: item.emailOfTraveler || '',
      ageOfTraveler: item.ageOfTraveler ?? '',
    })
    setOpen(true)
  }

  const change = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { ...form, ageOfTraveler: Number(form.ageOfTraveler) || 0 }
      if (editing) {
        await travelersApi.update({ ...payload, idTraveler: editing.idTraveler })
        toast('המטייל עודכן בהצלחה')
      } else {
        await travelersApi.add(payload)
        toast('המטייל נוסף בהצלחה')
      }
      setOpen(false)
      load()
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  const remove = async (item) => {
    if (!confirm(`למחוק את המטייל "${item.nameOfTraveler || item.idTraveler}"?`)) return
    try {
      await travelersApi.remove(item.idTraveler)
      toast('המטייל נמחק')
      setItems((list) => list.filter((x) => x.idTraveler !== item.idTraveler))
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  return (
    <div className="container page">
      <div className="page-header">
        <div className="page-title">
          <h2>🧑‍🤝‍🧑 מטיילים</h2>
          <p>סך הכל {items.length} מטיילים</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          + מטייל חדש
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : items.length === 0 ? (
        <EmptyState
          icon="🧑‍🤝‍🧑"
          title="אין מטיילים עדיין"
          text="התחל בהוספת מטייל ראשון"
          action={
            <button className="btn btn-primary" onClick={openCreate}>
              + מטייל חדש
            </button>
          }
        />
      ) : (
        <div className="grid">
          {items.map((t) => (
            <div className="card" key={t.idTraveler}>
              <div className="card-head">
                <span className="card-title">{t.nameOfTraveler || 'ללא שם'}</span>
                <span className="card-id">#{t.idTraveler}</span>
              </div>
              <div className="card-rows">
                <div className="card-row">
                  <span className="label">אימייל</span>
                  <span className="value">{t.emailOfTraveler || '—'}</span>
                </div>
                <div className="card-row">
                  <span className="label">גיל</span>
                  <span className="value">{t.ageOfTraveler ?? '—'}</span>
                </div>
              </div>
              <div className="card-foot">
                <button className="btn btn-ghost btn-sm" onClick={() => openEdit(t)}>
                  ✏️ עריכה
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  style={{ marginInlineStart: 8 }}
                  onClick={() => remove(t)}
                >
                  🗑️ מחיקה
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <Modal
          title={editing ? 'עריכת מטייל' : 'מטייל חדש'}
          onClose={() => setOpen(false)}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => setOpen(false)}>
                ביטול
              </button>
              <button className="btn btn-primary" onClick={submit} disabled={saving}>
                {saving ? 'שומר...' : editing ? 'עדכון' : 'הוספה'}
              </button>
            </>
          }
        >
          <form onSubmit={submit} style={{ display: 'contents' }}>
            <Input label="שם המטייל" value={form.nameOfTraveler} onChange={change('nameOfTraveler')} required />
            <Input
              label="אימייל"
              type="email"
              value={form.emailOfTraveler}
              onChange={change('emailOfTraveler')}
            />
            <Input
              label="גיל"
              type="number"
              min="0"
              value={form.ageOfTraveler}
              onChange={change('ageOfTraveler')}
            />
          </form>
        </Modal>
      )}
    </div>
  )
}
