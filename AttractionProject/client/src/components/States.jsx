export function Loading({ text = 'טוען נתונים...' }) {
  return (
    <div className="state">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state">
      <div className="state-icon">⚠️</div>
      <h3>אופס, משהו השתבש</h3>
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-ghost" style={{ marginTop: 16 }} onClick={onRetry}>
          נסה שוב
        </button>
      )}
    </div>
  )
}

export function EmptyState({ icon = '📭', title = 'אין נתונים עדיין', text, action }) {
  return (
    <div className="state">
      <div className="state-icon">{icon}</div>
      <h3>{title}</h3>
      {text && <p>{text}</p>}
      {action && <div style={{ marginTop: 16 }}>{action}</div>}
    </div>
  )
}
