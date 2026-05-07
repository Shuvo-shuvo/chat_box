function Header() {
  return (
    <header style={{
      padding: '0 32px',
      background: 'rgba(10,13,18,0.9)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: 'linear-gradient(135deg, var(--gold), var(--teal))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 800,
            color: '#0a0d12',
            fontFamily: 'var(--font-head)',
          }}>৳</div>
          <div>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 16, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              BDT Robo-Advisor
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', letterSpacing: '0.06em' }}>
              BANGLADESH · 100+ SCHEMES
            </div>
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)' }}>
          AI-POWERED · REAL DATA · 2025
        </div>
      </div>
    </header>
  )
}

export default Header
