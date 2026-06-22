export function StarDisplay({ value = 0, size = 'md' }) {
  const avg = Number(value) || 0
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (avg >= i) stars.push('full')
    else if (avg >= i - 0.5) stars.push('half')
    else stars.push('empty')
  }
  return (
    <span className={`star-display star-${size}`} aria-label={`דירוג ${avg} מתוך 5`}>
      {stars.map((type, i) => (
        <span key={i} className={`star star-${type}`}>★</span>
      ))}
    </span>
  )
}

export function StarInput({ value, onChange, label = 'דירוג' }) {
  return (
    <div className="field star-input-wrap">
      <label>{label}</label>
      <div className="star-input">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className={`star-btn${value >= n ? ' active' : ''}`}
            onClick={() => onChange(n)}
            aria-label={`${n} כוכבים`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  )
}
