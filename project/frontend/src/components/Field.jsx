function Field({ label, unit, error, hint, children }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <label style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--text3)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          {label} {unit && <span style={{ color: 'var(--text3)', opacity: 0.6 }}>({unit})</span>}
        </label>
        {hint && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--teal)' }}>{hint}</span>}
      </div>
      {children}
      {error && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--red)', marginTop: 4 }}>
          {error}
        </p>
      )}
    </div>
  )
}

export default Field
