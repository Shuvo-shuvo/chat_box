import { useEffect, useState } from 'react'
import { RISK_COLORS, RISK_BG } from '../constants/appConstants'
import Field from './Field'
import NumberInput from './NumberInput'

function InputForm({ onSubmit, loading }) {
  const [form, setForm] = useState(() => {
    try {
      const saved = window.localStorage.getItem('roboAdvisorProfile')
      if (saved) {
        return { ...JSON.parse(saved) }
      }
    } catch (error) {
      console.warn('Could not load saved profile', error)
    }
    return {
      monthly_income: '',
      monthly_investment: '',
      time_range_years: '',
      risk_level: 'Low',
      target_goal: '',
    }
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    try {
      window.localStorage.setItem('roboAdvisorProfile', JSON.stringify(form))
    } catch (error) {
      console.warn('Could not save profile', error)
    }
  }, [form])

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const validate = () => {
    const e = {}
    if (!form.monthly_income || Number(form.monthly_income) <= 0) e.monthly_income = 'Required'
    if (!form.monthly_investment || Number(form.monthly_investment) <= 0) e.monthly_investment = 'Required'
    if (!form.time_range_years || Number(form.time_range_years) <= 0) e.time_range_years = 'Required'
    if (
      form.monthly_investment &&
      form.monthly_income &&
      Number(form.monthly_investment) > Number(form.monthly_income)
    ) {
      e.monthly_investment = 'Cannot exceed income'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return

    try {
      window.localStorage.setItem('roboAdvisorProfile', JSON.stringify(form))
    } catch (error) {
      console.warn('Could not save profile on submit', error)
    }

    onSubmit({
      monthly_income: Number(form.monthly_income),
      monthly_investment: Number(form.monthly_investment),
      time_range_years: Number(form.time_range_years),
      risk_level: form.risk_level,
      target_goal: form.target_goal ? Number(form.target_goal) : null,
    })
  }

  const incomePresets = ['30000', '50000', '80000']
  const investmentPresets = ['10000', '5000', '20000']
  const horizonPresets = ['3', '1', '5']
  const goalPresets = ['500000', '1000000', '2000000']

  const savingsRate = form.monthly_income && form.monthly_investment
    ? ((form.monthly_investment / form.monthly_income) * 100).toFixed(1)
    : null

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '36px 40px',
      animation: 'fadeUp 0.5s ease both',
    }}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{
          fontFamily: 'var(--font-head)',
          fontWeight: 700,
          fontSize: 22,
          color: 'var(--text)',
          letterSpacing: '-0.03em',
        }}>
          Your Financial Profile
        </h2>
        <p style={{ color: 'var(--text3)', fontSize: 13, marginTop: 4, fontFamily: 'var(--font-mono)' }}>
          Fill in your details — our AI will analyse 100+ Bangladesh schemes for you
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Field label="Monthly Income" unit="BDT" error={errors.monthly_income} hint={savingsRate ? `Savings rate: ${savingsRate}%` : null}>
          <NumberInput value={form.monthly_income} onChange={(v) => setField('monthly_income', v)} placeholder="e.g. 50000" />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
            {incomePresets.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setField('monthly_income', value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--border2)',
                  background: 'var(--surface2)',
                  color: 'var(--teal)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                {Number(value) >= 100000 ? `${Number(value) / 100000}L` : `${Number(value) / 1000}K`}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Monthly Investment" unit="BDT" error={errors.monthly_investment}>
          <NumberInput value={form.monthly_investment} onChange={(v) => setField('monthly_investment', v)} placeholder="e.g. 10000" />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
            {investmentPresets.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setField('monthly_investment', value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--border2)',
                  background: 'var(--surface2)',
                  color: 'var(--teal)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                {Number(value) >= 100000 ? `${Number(value) / 100000}L` : `${Number(value) / 1000}K`}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Investment Horizon" unit="Years" error={errors.time_range_years}>
          <NumberInput value={form.time_range_years} onChange={(v) => setField('time_range_years', v)} placeholder="e.g. 5" step="0.5" />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
            {horizonPresets.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setField('time_range_years', value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--border2)',
                  background: 'var(--surface2)',
                  color: 'var(--teal)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                {value}y
              </button>
            ))}
          </div>
        </Field>

        <Field label="Target Goal" unit="BDT (optional)">
          <NumberInput value={form.target_goal} onChange={(v) => setField('target_goal', v)} placeholder="e.g. 1000000" />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
            {goalPresets.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setField('target_goal', value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--border2)',
                  background: 'var(--surface2)',
                  color: 'var(--teal)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                {Number(value) >= 10000000
                  ? `${Number(value) / 10000000}Cr`
                  : `${Number(value) / 100000}L`}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <div style={{ marginTop: 24 }}>
        <Field label="Risk Tolerance">
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            {['Low', 'Medium', 'High'].map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setField('risk_level', r)}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: 8,
                  border: form.risk_level === r ? `1.5px solid ${RISK_COLORS[r]}` : '1.5px solid var(--border)',
                  background: form.risk_level === r ? RISK_BG[r] : 'transparent',
                  color: form.risk_level === r ? RISK_COLORS[r] : 'var(--text3)',
                  fontFamily: 'var(--font-head)',
                  fontWeight: 700,
                  fontSize: 13,
                  transition: 'all 0.18s ease',
                }}
              >
                {r === 'Low' ? '🛡️' : r === 'Medium' ? '⚖️' : '🚀'} {r}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: 28,
          width: '100%',
          padding: '15px 0',
          background: loading
            ? 'var(--surface2)'
            : 'linear-gradient(135deg, var(--gold) 0%, #d4952a 100%)',
          border: 'none',
          borderRadius: 10,
          color: loading ? 'var(--text3)' : '#0a0d12',
          fontFamily: 'var(--font-head)',
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: '0.02em',
          transition: 'all 0.2s ease',
          boxShadow: loading ? 'none' : '0 4px 20px rgba(232,184,75,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        {loading ? (
          <>
            <span style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              border: '2px solid var(--text3)',
              borderTopColor: 'transparent',
              animation: 'spin 0.7s linear infinite',
              display: 'inline-block',
            }} />
            Analysing schemes...
          </>
        ) : (
          '✦ Generate My Recommendations'
        )}
      </button>
    </div>
  )
}

export default InputForm
