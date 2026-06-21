import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { CATEGORIES } from '../data/categories'
import { EMOTIONS } from '../data/emotions'
import { addExpense, generateId } from '../lib/storage'
import { track } from '../lib/analytics'
import { formatAmountInput } from '../lib/insights'
import type { CategoryId, EmotionId } from '../types'
import { ChevronLeft, CheckCircle, Delete } from 'lucide-react'

type Step = 'amount' | 'category' | 'emotion' | 'details' | 'success'

const NUMPAD = [
  ['1','2','3'],
  ['4','5','6'],
  ['7','8','9'],
  ['000','0','⌫'],
]

export function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('amount')
  const [rawAmount, setRawAmount] = useState('')
  const [categoryId, setCategoryId] = useState<CategoryId | null>(null)
  const [emotionId, setEmotionId] = useState<EmotionId | null>(null)
  const [isImpulsive, setIsImpulsive] = useState<boolean | null>(null)
  const [trigger, setTrigger] = useState('')
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  const numericAmount = parseInt(rawAmount || '0')
  const displayAmount = rawAmount ? formatAmountInput(rawAmount) : '0'
  const isValidAmount = numericAmount > 0 && numericAmount <= 99_999_999

  const handleNumpad = (key: string) => {
    if (key === '⌫') {
      setRawAmount(prev => prev.slice(0, -1))
      return
    }
    if (key === '000') {
      setRawAmount(prev => prev === '' ? '' : prev + '000')
      return
    }
    if (rawAmount.length >= 8) return
    setRawAmount(prev => prev + key)
  }

  const handleSave = async () => {
    setSaving(true)
    setSaveError('')
    try {
      addExpense({
        id: generateId(),
        amount: numericAmount,
        categoryId: categoryId!,
        emotionId: emotionId!,
        isImpulsive: isImpulsive ?? false,
        trigger: trigger.trim() || undefined,
        note: note.trim() || undefined,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      })
      track('expense_saved', { emotionId: emotionId!, categoryId: categoryId!, isImpulsive: isImpulsive ?? false })
      await new Promise(r => setTimeout(r, 350))
      setStep('success')
    } catch {
      setSaveError('No se pudo guardar. Intenta de nuevo.')
    } finally {
      setSaving(false)
    }
  }

  const resetForm = () => {
    setStep('amount'); setRawAmount(''); setCategoryId(null)
    setEmotionId(null); setIsImpulsive(null); setTrigger(''); setNote(''); setSaveError('')
  }

  const goBack = () => {
    if (step === 'amount') navigate(-1)
    else if (step === 'category') setStep('amount')
    else if (step === 'emotion') setStep('category')
    else if (step === 'details') setStep('emotion')
  }

  const selectedEmotion = emotionId ? EMOTIONS.find(e => e.id === emotionId) : null
  const selectedCategory = categoryId ? CATEGORIES.find(c => c.id === categoryId) : null
  const stepIndex = { amount: 0, category: 1, emotion: 2, details: 3, success: 4 }

  /* ── Success ── */
  if (step === 'success') {
    return (
      <Layout hideNav>
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center page-enter">
          <div className="w-24 h-24 rounded-full bg-valor-gradient flex items-center justify-center mb-6 glow-pulse check-pop">
            <CheckCircle size={44} className="text-white" />
          </div>
          <h2 className="font-display text-3xl font-bold text-valor-text mb-2">¡Registrado!</h2>
          <p className="text-valor-muted mb-1 text-lg font-display font-semibold">
            ${formatAmountInput(rawAmount)} CLP
          </p>
          <p className="text-valor-muted text-sm mb-8">
            {selectedCategory?.emoji} {selectedCategory?.label} ·{' '}
            {selectedEmotion?.emoji} {selectedEmotion?.label}
          </p>
          {selectedEmotion && (
            <div className="glass-card p-4 w-full mb-8 text-left scale-enter">
              <p className="text-sm text-valor-muted leading-relaxed">
                {selectedEmotion.id === 'estresado' || selectedEmotion.id === 'ansioso'
                  ? 'Registrar cuando estás estresado/a es un acto de autoconciencia. No hay nada malo en eso.'
                  : selectedEmotion.id === 'feliz'
                  ? 'Los gastos desde la alegría suelen tener menos arrepentimiento. Bien ahí.'
                  : 'Conocerte mejor es el primer paso hacia decisiones más conscientes.'}
              </p>
            </div>
          )}
          <div className="w-full space-y-3">
            <button onClick={resetForm} className="btn-primary">Registrar otro gasto</button>
            <button onClick={() => navigate('/dashboard')} className="btn-secondary">Ir al inicio</button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout hideNav>
      <div className="min-h-screen flex flex-col px-5">
        {/* Header / progress */}
        <div className="pt-12 pb-4 flex items-center gap-4">
          <button onClick={goBack} className="w-11 h-11 rounded-full glass-card flex items-center justify-center flex-shrink-0" aria-label="Volver">
            <ChevronLeft size={20} className="text-valor-muted" />
          </button>
          <div className="flex-1 flex gap-1.5">
            {[0,1,2,3].map(i => (
              <div key={i} className={`flex-1 h-1 rounded-full transition-all duration-400 ${
                (stepIndex[step] ?? 0) >= i ? 'bg-valor-gradient' : 'bg-valor-border'
              }`} />
            ))}
          </div>
        </div>

        <div className="flex-1 pb-4 page-enter-fast">

          {/* ── STEP: Amount ── */}
          {step === 'amount' && (
            <div className="flex flex-col h-full">
              <div className="pt-4 pb-6">
                <p className="text-valor-muted text-sm mb-1">¿Cuánto gastaste?</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-display font-bold text-valor-muted pb-1">$</span>
                  <span className={`font-display font-extrabold leading-none transition-all ${
                    displayAmount.length > 7 ? 'text-4xl' : 'text-5xl'
                  } ${numericAmount > 0 ? 'text-valor-text' : 'text-valor-border'}`}>
                    {displayAmount}
                  </span>
                  <span className="text-lg text-valor-muted pb-1">CLP</span>
                </div>
                {numericAmount > 99_999_999 && (
                  <p className="text-red-400 text-sm mt-2">Monto demasiado alto</p>
                )}
              </div>

              {/* Numpad */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {NUMPAD.flat().map((key) => (
                  <button
                    key={key}
                    onClick={() => handleNumpad(key)}
                    className={`h-16 rounded-2xl flex items-center justify-center text-xl font-display font-semibold transition-all active:scale-95 ${
                      key === '⌫'
                        ? 'glass-card text-valor-muted'
                        : 'glass-card text-valor-text hover:bg-violet-500/10'
                    }`}
                    aria-label={key === '⌫' ? 'Borrar' : key}
                  >
                    {key === '⌫' ? <Delete size={22} className="text-valor-muted" /> : key}
                  </button>
                ))}
              </div>

              <button
                onClick={() => isValidAmount && setStep('category')}
                disabled={!isValidAmount}
                className="btn-primary disabled:opacity-30"
              >
                Continuar
              </button>
            </div>
          )}

          {/* ── STEP: Category ── */}
          {step === 'category' && (
            <div>
              <p className="text-valor-muted text-sm mt-4 mb-1">¿En qué gastaste?</p>
              <h2 className="font-display text-2xl font-bold text-valor-text mb-5">Elige la categoría</h2>
              <div className="grid grid-cols-2 gap-3 stagger">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setCategoryId(cat.id); setStep('emotion') }}
                    className={`glass-card p-4 flex items-center gap-3 text-left page-enter-fast ${
                      categoryId === cat.id ? 'border-violet-500 bg-violet-500/10' : ''
                    }`}
                  >
                    <span className="text-2xl">{cat.emoji}</span>
                    <span className="text-sm font-medium text-valor-text">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP: Emotion ── */}
          {step === 'emotion' && (
            <div>
              <p className="text-valor-muted text-sm mt-4 mb-1">¿Cómo te sentías?</p>
              <h2 className="font-display text-2xl font-bold text-valor-text mb-2">Sin juicios</h2>
              <p className="text-xs text-valor-muted mb-5">Solo observación honesta</p>
              <div className="grid grid-cols-2 gap-3 stagger">
                {EMOTIONS.map(em => (
                  <button
                    key={em.id}
                    onClick={() => { setEmotionId(em.id); setStep('details') }}
                    className={`glass-card p-4 flex items-center gap-3 page-enter-fast ${
                      emotionId === em.id ? 'bg-opacity-20' : ''
                    }`}
                    style={emotionId === em.id
                      ? { borderColor: em.color, background: em.bgColor }
                      : {}}
                  >
                    <span className="text-2xl">{em.emoji}</span>
                    <span className="text-sm font-medium text-valor-text">{em.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP: Details ── */}
          {step === 'details' && (
            <div>
              <p className="text-valor-muted text-sm mt-4 mb-1">Un poco más</p>
              <h2 className="font-display text-2xl font-bold text-valor-text mb-5">Todo es opcional</h2>

              {/* Resumen */}
              <div className="glass-card p-4 flex items-center gap-4 mb-5 scale-enter">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: selectedEmotion?.bgColor }}>
                  {selectedEmotion?.emoji}
                </div>
                <div className="flex-1">
                  <p className="font-display font-bold text-valor-text text-lg">${formatAmountInput(rawAmount)}</p>
                  <p className="text-xs text-valor-muted">{selectedCategory?.emoji} {selectedCategory?.label} · {selectedEmotion?.label}</p>
                </div>
              </div>

              {/* Impulsivo */}
              <div className="mb-5">
                <p className="text-sm font-semibold text-valor-text mb-3">¿Fue planificada o impulsiva?</p>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { val: false, emoji: '📋', label: 'Planificada' },
                    { val: true,  emoji: '⚡', label: 'Impulsiva' },
                  ] as const).map(({ val, emoji, label }) => (
                    <button
                      key={String(val)}
                      onClick={() => setIsImpulsive(val)}
                      className={`chip-option justify-center font-medium ${isImpulsive === val ? 'selected' : ''}`}
                    >
                      <span>{emoji}</span> {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm font-semibold text-valor-text block mb-2">
                  ¿Qué lo detonó? <span className="text-valor-muted font-normal">(opcional)</span>
                </label>
                <input
                  type="text"
                  value={trigger}
                  onChange={e => setTrigger(e.target.value)}
                  placeholder="Ej: jornada larga en el trabajo..."
                  className="input-field"
                  maxLength={100}
                />
              </div>

              <div className="mb-6">
                <label className="text-sm font-semibold text-valor-text block mb-2">
                  Nota <span className="text-valor-muted font-normal">(opcional)</span>
                </label>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Algo que quieras recordar..."
                  className="input-field resize-none"
                  rows={2}
                  maxLength={200}
                />
              </div>

              {saveError && <p className="text-red-400 text-sm mb-3">{saveError}</p>}

              <button onClick={handleSave} disabled={saving} className="btn-primary">
                {saving ? 'Guardando...' : 'Guardar gasto ✓'}
              </button>
              <button onClick={() => setStep('emotion')} className="btn-ghost w-full mt-2">← Volver</button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
