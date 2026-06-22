import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AREAS, DIFFICULTY_LEVELS, AGES } from '../constants/enums'
import { TIME_RANGES, FAMILY_FILTERS, countActiveFilters } from '../utils/tripUtils'
import { Icon } from './Icons'

export function useTripFilters() {
  const [params, setParams] = useSearchParams()

  const filters = {
    q: params.get('q') || '',
    area: params.get('area') || '',
    age: params.get('age') || '',
    difficulty: params.get('difficulty') || '',
    time: params.get('time') || '',
    family: params.get('family') || '',
  }

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next)
  }

  const clearAll = () => setParams({})

  return { filters, setFilter, clearAll, activeCount: countActiveFilters(filters) }
}

export default function TripFilters({ filters, setFilter, clearAll, activeCount, resultCount }) {
  const [open, setOpen] = useState(activeCount > 0)

  return (
    <div className="filters-wrap">
      <div className="filters-toggle-row">
        <button
          type="button"
          className={`btn btn-ghost filters-toggle-btn${open ? ' open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <Icon name="filter" size={16} />
          סינון וחיפוש
          <Icon name={open ? 'chevron-up' : 'chevron-down'} size={14} className="filters-toggle-icon" />
          {activeCount > 0 && <span className="filters-active-badge">{activeCount}</span>}
        </button>
        <span className="filters-result-inline">{resultCount} מסלולים</span>
      </div>

      {open && (
        <div className="filters-panel">
          <div className="filters-search-row">
            <div className="search-box">
              <span className="search-icon"><Icon name="search" size={18} /></span>
              <input
                type="search"
                className="search-input"
                placeholder="חיפוש: מפל, תצפית, ים, גולן..."
                value={filters.q}
                onChange={(e) => setFilter('q', e.target.value)}
              />
            </div>
            {activeCount > 0 && (
              <button type="button" className="btn btn-ghost btn-sm" onClick={clearAll}>
                נקה הכל ({activeCount})
              </button>
            )}
          </div>

          <div className="filters-group">
            <span className="filters-label">אזור</span>
            <div className="filters-bar">
              <button
                type="button"
                className={`filter-pill${!filters.area ? ' active' : ''}`}
                onClick={() => setFilter('area', '')}
              >
                הכל
              </button>
              {AREAS.map((a) => (
                <button
                  key={a}
                  type="button"
                  className={`filter-pill${filters.area === a ? ' active' : ''}`}
                  onClick={() => setFilter('area', filters.area === a ? '' : a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="filters-group">
            <span className="filters-label">רמת קושי</span>
            <div className="filters-bar">
              {DIFFICULTY_LEVELS.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`filter-pill${filters.difficulty === d ? ' active' : ''}`}
                  onClick={() => setFilter('difficulty', filters.difficulty === d ? '' : d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="filters-group">
            <span className="filters-label">גיל מתאים</span>
            <div className="filters-bar">
              {AGES.map((a) => (
                <button
                  key={a}
                  type="button"
                  className={`filter-pill${filters.age === a ? ' active' : ''}`}
                  onClick={() => setFilter('age', filters.age === a ? '' : a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="filters-group">
            <span className="filters-label">זמן משוער</span>
            <div className="filters-bar">
              {TIME_RANGES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`filter-pill filter-pill-icon${filters.time === t.id ? ' active' : ''}`}
                  onClick={() => setFilter('time', filters.time === t.id ? '' : t.id)}
                >
                  <Icon name="clock" size={14} />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filters-group">
            <span className="filters-label">נגישות ומשפחות</span>
            <div className="filters-bar">
              {FAMILY_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`filter-pill filter-pill-icon${filters.family === f.id ? ' active' : ''}`}
                  onClick={() => setFilter('family', filters.family === f.id ? '' : f.id)}
                >
                  <Icon name="users" size={14} />
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <p className="filters-result">{resultCount} מסלולים תואמים</p>
        </div>
      )}
    </div>
  )
}
