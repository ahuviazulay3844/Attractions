export function StarDisplay({ value = 0, size = 'md' }) {
  const avg = Math.max(0, Math.min(5, Number(value) || 0))

  return (
    <span className={`star-display star-${size}`} aria-label={`דירוג ${avg} מתוך 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        let type = 'empty'
        if (avg >= i) type = 'full'
        else if (avg >= i - 0.5) type = 'half'
        return (
          <span key={i} className={`star star-${type}`} aria-hidden="true">
            ★
          </span>
        )
      })}
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
        <span className="star-input-value">{value}/5</span>
      </div>
    </div>
  )
}
