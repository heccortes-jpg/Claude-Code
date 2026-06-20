import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { CATEGORIES } from '../data/categories'
import { EMOTIONS } from '../data/emotions'
import { addExpense, generateId } from '../lib/storage'
import type { CategoryId, EmotionId } from '../types'
import { ChevronLeft, CheckCircle } from 'lucide-react'

type Step = 'amount' | 'category' | 'emotion' | 'details' | 'success'

export function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('amount')
  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState('')
  const [categoryId, setCategoryId] = useState<CategoryId | null>(null)
  const [emotionId, setEmotionId] = useState<EmotionId | null>(null)
  const [isImpulsive, setIsImpulsive] = useState<boolean | null>(null)
  const [trigger, setTrigger] = useState('')
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)

  const handleAmountNext = () => {
    const num = parseInt(amount.replace(/\D/g, ''))
    if (!num || num <= 0) { setAmountError('Ingresa un monto válido'); return }
    if (num > 99999999) { setAmountError('Monto demasiado alto'); return }
    setAmountError('')
    setStep('category')
  }

  const handleSave = async () => {
    setSaving(true)
    const num = parseInt(amount.replace(/\D/g, ''))
    addExpense({
      id: generateId(),
      amount: num,
      categoryId: categoryId!,
      emotionId: emotionId!,
      isImpulsive: isImpulsive ?? false,
      trigger: trigger.trim() || undefined,
      note: note.trim() || undefined,
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    })
    await new Promise(r => setTimeout(r, 500))
    setSaving(false)
    setStep('success')
  }

  const formatDisplayAmount = (val: string) => {
    const num = val.replace(/\D/g, '')
    if (!num) return ''
    return new Intl.NumberFormat('es-CL').format(parseInt(num))
  }

  const selectedEmotion = emotionId ? EMOTIONS.find(e => e.id === emotionId) : null
  const selectedCategory = categoryId ? CATEGORIES.find(c => c.id === categoryId) : null

  if (step === 'success') {
    return (
      <Layout hideNav>
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-valor-gradient flex items-center justify-center mb-6 shadow-valor-lg">
            <CheckCircle size={40} className="text-white" />
          </div>
          <h2 className="font-display text-3xl font-bold text-valor-text mb-3">Registrado</h2>
          <p className="text-valor-muted mb-8">
            Tu gasto quedó guardado.{' '}
            {selectedEmotion ? `Notamos que te sentías ${selectedEmotion.label.toLowerCase()}.` : ''}
          </p>
          {selectedEmotion && (
            <div className="glass-card p-4 w-full mb-8">
              <p className="text-sm text-valor-muted">
                {selectedEmotion.id === 'estresado' || selectedEmotion.id === 'ansioso'
                  ? 'Registrar cuando estás estresado/a es un acto de autoconciencia. No hay nada malo en eso.'
                  : selectedEmotion.id === 'feliz'
                  ? 'Los gastos desde la alegría suelen tener menos arrepentimiento. Bien ahí.'
                  : 'Conocerte mejor es el primer paso hacia decisiones más conscientes.'}
              </p>
            </div>
          )}
          <div className="w-full space-y-3">
            <button onClick={() => { setStep('amount'); setAmount(''); setCategoryId(null); setEmotionId(null); setIsImpulsive(null); setTrigger(''); setNote('') }} className="btn-primary">
              Registrar otro gasto
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn-secondary">
              Ir al inicio
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout hideNav>
      <div className="min-h-screen flex flex-col px-5">
        {/* Header */}
        <div className="pt-12 pb-4 flex items-center gap-4">
          <button
            onClick={() => {
              if (step === 'amount') navigate(-1)
              else if (step === 'category') setStep('amount')
              else if (step === 'emotion') setStep('category')
              else if (step === 'details') setStep('emotion')
            }}
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center"
          >
            <ChevronLeft size={20} className="text-valor-muted" />
          </button>
          <div className="flex-1">
            <div className="flex gap-1">
              {(['amount', 'category', 'emotion', 'details'] as const).map((s, i) => (
                <div key={s} className={`flex-1 h-1 rounded-full transition-all ${
                  ['amount', 'category', 'emotion', 'details'].indexOf(step) >= i
                    ? 'bg-valor-gradient'
                    : 'bg-valor-border'
                }`} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 pb-8">
          {/* STEP: Amount */}
          {step === 'amount' && (
            <div>
              <h2 className="font-display text-3xl font-bold text-valor-text mb-1 mt-4">¿Cuánto gastaste?</h2>
              <p className="text-valor-muted text-sm mb-8">En pesos chilenos (CLP)</p>
              <div className="relative mb-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-display font-bold text-valor-muted">$</span>
                <input
                  type="number"
                  inputMode="numeric"
                  value={amount}
                  onChange={e => { setAmount(e.target.value); setAmountError('') }}
                  onKeyDown={e => e.key === 'Enter' && handleAmountNext()}
                  placeholder="0"
                  className="input-field text-3xl font-display font-bold pl-10"
                  autoFocus
                />
              </div>
              {amount && (
                <p className="text-valor-muted text-sm ml-1">${formatDisplayAmount(amount)} CLP</p>
              )}
              {amountError && <p className="text-red-400 text-sm mt-2">{amountError}</p>}
              <button onClick={handleAmountNext} className="btn-primary mt-8">
                Continuar
              </button>
            </div>
          )}

          {/* STEP: Category */}
          {step === 'category' && (
            <div>
              <h2 className="font-display text-3xl font-bold text-valor-text mb-1 mt-4">¿En qué gastaste?</h2>
              <p className="text-valor-muted text-sm mb-6">Elige la categoría más cercana</p>
              <div className="grid grid-cols-2 gap-3">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setCategoryId(cat.id); setStep('emotion') }}
                    className={`glass-card p-4 flex items-center gap-3 transition-all ${
                      categoryId === cat.id ? 'border-violet-500 bg-violet-500/10' : ''
                    }`}
                  >
                    <span className="text-2xl">{cat.emoji}</span>
                    <span className="text-sm font-medium text-valor-text text-left">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP: Emotion */}
          {step === 'emotion' && (
            <div>
              <h2 className="font-display text-3xl font-bold text-valor-text mb-1 mt-4">¿Cómo te sentías?</h2>
              <p className="text-valor-muted text-sm mb-6">Sin juicios. Solo observación.</p>
              <div className="grid grid-cols-2 gap-3">
                {EMOTIONS.map(em => (
                  <button
                    key={em.id}
                    onClick={() => { setEmotionId(em.id); setStep('details') }}
                    className={`glass-card p-4 flex items-center gap-3 transition-all ${
                      emotionId === em.id ? 'border-violet-500 bg-violet-500/10' : ''
                    }`}
                    style={emotionId === em.id ? { borderColor: em.color } : {}}
                  >
                    <span className="text-2xl">{em.emoji}</span>
                    <span className="text-sm font-medium text-valor-text">{em.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP: Details */}
          {step === 'details' && (
            <div>
              <h2 className="font-display text-3xl font-bold text-valor-text mb-1 mt-4">Un poco más</h2>
              <p className="text-valor-muted text-sm mb-6">Todo esto es opcional</p>

              {/* Resumen */}
              <div className="glass-card p-4 flex items-center gap-4 mb-6">
                <span className="text-3xl">{selectedCategory?.emoji}</span>
                <div className="flex-1">
                  <p className="font-display font-bold text-valor-text">
                    ${formatDisplayAmount(amount)} CLP
                  </p>
                  <p className="text-xs text-valor-muted">{selectedCategory?.label} · {selectedEmotion?.emoji} {selectedEmotion?.label}</p>
                </div>
              </div>

              {/* Impulsivo */}
              <div className="mb-5">
                <p className="text-sm font-semibold text-valor-text mb-3">¿Fue una compra planificada o impulsiva?</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsImpulsive(false)}
                    className={`chip-option justify-center ${isImpulsive === false ? 'selected' : ''}`}
                  >
                    <span>📋</span> Planificada
                  </button>
                  <button
                    onClick={() => setIsImpulsive(true)}
                    className={`chip-option justify-center ${isImpulsive === true ? 'selected' : ''}`}
                  >
                    <span>⚡</span> Impulsiva
                  </button>
                </div>
              </div>

              {/* Trigger */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-valor-text block mb-2">
                  ¿Qué detonó esta compra? <span className="text-valor-muted font-normal">(opcional)</span>
                </label>
                <input
                  type="text"
                  value={trigger}
                  onChange={e => setTrigger(e.target.value)}
                  placeholder="Ej: jornada difícil en el trabajo..."
                  className="input-field"
                  maxLength={100}
                />
              </div>

              {/* Note */}
              <div className="mb-8">
                <label className="text-sm font-semibold text-valor-text block mb-2">
                  Nota <span className="text-valor-muted font-normal">(opcional)</span>
                </label>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Algo que quieras recordar..."
                  className="input-field resize-none"
                  rows={3}
                  maxLength={200}
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary"
              >
                {saving ? 'Guardando...' : 'Guardar gasto ✓'}
              </button>
              <button onClick={() => setStep('emotion')} className="btn-ghost w-full mt-2">
                ← Volver
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
