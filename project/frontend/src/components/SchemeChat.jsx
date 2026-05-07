import { useEffect, useRef, useState } from 'react'

function MessageBubble({ role, content }) {
  const isUser = role === 'user'
  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: 10,
    }}>
      <div style={{
        maxWidth: '85%',
        background: isUser ? 'rgba(232,184,75,0.14)' : 'var(--surface2)',
        color: 'var(--text)',
        border: isUser ? '1px solid rgba(232,184,75,0.32)' : '1px solid var(--border)',
        borderRadius: 12,
        padding: '12px 14px',
        whiteSpace: 'pre-wrap',
        lineHeight: 1.55,
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
      }}>
        <div style={{ marginBottom: isUser ? 0 : 4, opacity: 0.7, fontSize: 10 }}>
          {isUser ? 'You' : 'Advisor'}
        </div>
        <div>{content}</div>
      </div>
    </div>
  )
}

function SchemeChat({ scheme, profile, messages, onSend, onBack, loading, error }) {
  const inputRef = useRef(null)
  const endRef = useRef(null)
  const [draft, setDraft] = useState('')
  const [search, setSearch] = useState('')

  const filteredMessages = search
    ? messages.filter((msg) => msg.content.toLowerCase().includes(search.toLowerCase()))
    : messages

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [filteredMessages, loading])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const quickQuestions = [
    'What is the expected return?',
    'What are the risks?',
    'Is there a lock-in period?',
    'How liquid is this?',
    'Tax implications?',
    'Minimum investment?',
    'Is this better than FDR?',
    'How does it compare to my goal?',
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (loading) return
    const message = draft.trim()
    if (!message) return
    onSend(message)
    setDraft('')
    if (inputRef.current) inputRef.current.focus()
  }

  const canSend = Boolean(draft.trim()) && !loading

  return (
    <div style={{ marginTop: 28, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            marginBottom: 12,
            background: 'none',
            border: 'none',
            color: 'var(--text3)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text3)')}
        >
          ← Back to recommendations
        </button>

        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 20, color: 'var(--text)', marginBottom: 6 }}>
          Chat About: {scheme.scheme_name}
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)' }}>
          {scheme.provider} · {scheme.scheme_type} · {scheme.interest_rate_typical?.toFixed ? `${Number(scheme.interest_rate_typical).toFixed(2)}%` : 'N/A'}
        </p>
        {profile && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)', marginTop: 6 }}>
            Context: ৳{profile.monthly_investment.toLocaleString()} monthly for {profile.time_range_years} years
            {' '}({profile.risk_level} risk)
          </p>
        )}
      </div>

      <div style={{ padding: '16px 24px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search chat history..."
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: 10,
            border: '1px solid var(--border2)',
            background: 'var(--surface)',
            color: 'var(--text)',
            fontFamily: 'var(--font-mono)',
            marginBottom: 14,
          }}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
          {quickQuestions.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => onSend(question)}
              disabled={loading}
              style={{
                padding: '10px 14px',
                borderRadius: 999,
                border: '1px solid rgba(66, 197, 167, 0.35)',
                background: 'rgba(66, 197, 167, 0.05)',
                color: 'var(--teal)',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {question}
            </button>
          ))}
        </div>
        <div style={{ minHeight: 200, maxHeight: 300, overflowY: 'auto' }}>
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg, index) => (
              <MessageBubble key={`${msg.role}-${index}`} role={msg.role} content={msg.content} />
            ))
          ) : (
            <div style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: 12, padding: '12px 0' }}>
              No chat results found. Clear the search to show the full conversation.
            </div>
          )}
          {loading && <MessageBubble role="assistant" content="Thinking..." />}
          <div ref={endRef} />
        </div>
      </div>

      {error && (
        <div style={{
          padding: '0 24px 12px',
          color: 'var(--red)',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
        }}>
          ✕ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, padding: 16, background: 'var(--surface)' }}>
        <input
          ref={inputRef}
          type="text"
          name="message"
          disabled={loading}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask about returns, risks, lock-in period, liquidity, tax impact..."
          style={{
            flex: 1,
            border: '1px solid var(--border)',
            background: 'var(--bg2)',
            color: 'var(--text)',
            borderRadius: 10,
            padding: '12px 14px',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={!canSend}
          style={{
            border: 'none',
            borderRadius: 10,
            padding: '12px 16px',
            background: canSend ? 'linear-gradient(135deg, var(--gold) 0%, #d4952a 100%)' : 'var(--surface2)',
            color: canSend ? '#0a0d12' : 'var(--text3)',
            fontFamily: 'var(--font-head)',
            fontWeight: 700,
            fontSize: 12,
            cursor: canSend ? 'pointer' : 'not-allowed',
          }}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  )
}

export default SchemeChat
