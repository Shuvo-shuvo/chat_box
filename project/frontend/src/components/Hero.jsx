function Hero() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px 40px', animation: 'fadeUp 0.6s ease both' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--teal)', letterSpacing: '0.14em', marginBottom: 16 }}>
        BANGLADESH INVESTMENT INTELLIGENCE
      </div>
      <h1 style={{
        fontFamily: 'var(--font-head)',
        fontWeight: 800,
        fontSize: 'clamp(36px, 6vw, 60px)',
        color: 'var(--text)',
        letterSpacing: '-0.04em',
        lineHeight: 1.05,
        marginBottom: 16,
      }}>
        Smart Money,<br />
        <span style={{ background: 'linear-gradient(90deg, var(--gold) 0%, var(--teal) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Smarter Returns
        </span>
      </h1>
      <p style={{ color: 'var(--text3)', fontSize: 15, maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
        AI-powered recommendations across 100+ Bangladesh investment schemes. Personalized strategies for DPS, FDR, Government Bonds, and more.
      </p>
    </div>
  )
}

export default Hero
