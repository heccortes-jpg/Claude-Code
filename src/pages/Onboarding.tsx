import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { getUser, saveUser, generateId } from '../lib/storage'
import type { OnboardingGoal, OnboardingFrequency, OnboardingTone } from '../types'
import { ChevronRight } from 'lucide-react'

type Step = 0 | 1 | 2 | 3

const GOALS: { id: OnboardingGoal; label: string; emoji: string }[] = [
  { id: 'gastos_impulsivos', label: 'Gastos impulsivos', emoji: '⚡' },
  { id: 'ansiedad_dinero', label: 'Ansiedad y dinero', emoji: '😰' },
  { id: 'organizacion', label: 'Organización financiera', emoji: '📊' },
  { id: 'habitos', label: 'Hábitos de consumo', emoji: '🔄' },
  { id: 'otro', label: 'Otro', emoji: '🤔' },
]

const FREQUENCIES: { id: OnboardingFrequency; label: string; emoji: string }[] = [
  { id: 'todos_los_dias', label: 'Todos los días', emoji: '📅' },
  { id: 'algunas_veces', label: 'Algunas veces por semana', emoji: '📆' },
  { id: 'cuando_gaste_mucho', label: 'Solo cuando sienta que gasté de más', emoji: '🤷' },
]

const TONES: { id: OnboardingTone; label: string; emoji: string; desc: string }[] = [
  { id: 'directo', label: 'Directo', emoji: '🎯', desc: 'Datos claros, sin rodeos' },
  { id: 'cercano', label: 'Cercano', emoji: '🤝', desc: 'Amigable y conversacional' },
  { id: 'reflexivo', label: 'Reflexivo', emoji: '🌙', desc: 'Pausado y contemplativo' },
  { id: 'minimalista', label: 'Minimalista', emoji: '◽', desc: 'Simple y sin distracciones' },
]

export function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>(0)
  const [name, setName] = useState('')
  const [goal, setGoal] = useState<OnboardingGoal | null>(null)
  const [frequency, setFrequency] = useState<OnboardingFrequency | null>(null)
  const [tone, setTone] = useState<OnboardingTone | null>(null)
  const [nameError, setNameError] = useState('')

  const handleNameNext = () => {
    if (!name.trim()) { setNameError('Ingresa tu nombre para continuar'); return }
    setNameError('')
    setStep(1)
  }

  const handleComplete = () => {
    const existing = getUser()
    saveUser({
      id: existing?.id ?? generateId(),
      name: name.trim() || 'Usuario',
      onboardingCompleted: true,
      onboarding: {
        goal: goal ?? 'otro',
        frequency: frequency ?? 'algunas_veces',
        tone: tone ?? 'cercano',
      },
      createdAt: existing?.createdAt ?? new Date().toISOString(),
      source: existing?.source,
    })
    navigate('/dashboard', { replace: true })
  }

  const progress = ((step + 1) / 4) * 100

  return (
    <div className="min-h-screen bg-valor-bg flex flex-col max-w-md mx-auto px-6">
      {/* Progress */}
      <div className="pt-12 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <Logo size="sm" />
          <div className="flex-1 h-1 bg-valor-border rounded-full overflow-hidden">
            <div
              className="h-full bg-valor-gradient rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-valor-muted">{step + 1}/4</span>
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1">
        {step === 0 && (
          <div>
            <h2 className="font-display text-3xl font-bold text-valor-text mb-2">
              Hola 👋
            </h2>
            <p className="text-valor-muted mb-8">
              ¿Cómo te llaman?
            </p>
            <input
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); setNameError('') }}
              onKeyDown={e => e.key === 'Enter' && handleNameNext()}
              placeholder="Tu nombre"
              className="input-field text-2xl font-display font-semibold mb-2"
              autoFocus
              maxLength={30}
            />
            {nameError && <p className="text-red-400 text-sm mt-1">{nameError}</p>}
            <p className="text-xs text-valor-muted mt-3">
              Solo lo usamos para personalizar tu experiencia. No lo compartimos.
            </p>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="font-display text-3xl font-bold text-valor-text mb-2">
              ¿Qué quieres entender mejor?
            </h2>
            <p className="text-valor-muted mb-6 text-sm">
              Esto nos ayuda a darte los insights más relevantes para ti.
            </p>
            <div className="chip-selector">
              {GOALS.map(g => (
                <button
                  key={g.id}
                  className={`chip-option ${goal === g.id ? 'selected' : ''}`}
                  onClick={() => setGoal(g.id)}
                >
                  <span className="text-xl">{g.emoji}</span>
                  <span>{g.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="font-display text-3xl font-bold text-valor-text mb-2">
              ¿Con qué frecuencia?
            </h2>
            <p className="text-valor-muted mb-6 text-sm">
              No hay respuesta incorrecta. Registra a tu propio ritmo.
            </p>
            <div className="chip-selector">
              {FREQUENCIES.map(f => (
                <button
                  key={f.id}
                  className={`chip-option ${frequency === f.id ? 'selected' : ''}`}
                  onClick={() => setFrequency(f.id)}
                >
                  <span className="text-xl">{f.emoji}</span>
                  <span>{f.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="font-display text-3xl font-bold text-valor-text mb-2">
              ¿Qué tono prefieres?
            </h2>
            <p className="text-valor-muted mb-6 text-sm">
              Así te hablaremos dentro de la app.
            </p>
            <div className="chip-selector">
              {TONES.map(t => (
                <button
                  key={t.id}
                  className={`chip-option ${tone === t.id ? 'selected' : ''}`}
                  onClick={() => setTone(t.id)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{t.emoji} {t.label}</span>
                    <span className="text-xs text-valor-muted mt-0.5">{t.desc}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Privacy statement */}
            <div className="glass-card p-4 mt-6">
              <p className="text-sm text-valor-muted text-center">
                🔒 Valor no te juzga. Te ayuda a observar tus patrones.
                <br />
                <span className="text-xs mt-1 block">Tus datos son privados y solo tuyos.</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="py-8 space-y-3">
        {step === 0 && (
          <button onClick={handleNameNext} className="btn-primary">
            Continuar <ChevronRight size={20} />
          </button>
        )}
        {step === 1 && (
          <>
            <button onClick={() => setStep(2)} disabled={!goal} className="btn-primary disabled:opacity-40">
              Continuar <ChevronRight size={20} />
            </button>
            <button onClick={() => setStep(0)} className="btn-ghost w-full">← Volver</button>
          </>
        )}
        {step === 2 && (
          <>
            <button onClick={() => setStep(3)} disabled={!frequency} className="btn-primary disabled:opacity-40">
              Continuar <ChevronRight size={20} />
            </button>
            <button onClick={() => setStep(1)} className="btn-ghost w-full">← Volver</button>
          </>
        )}
        {step === 3 && (
          <>
            <button onClick={handleComplete} disabled={!tone} className="btn-primary disabled:opacity-40">
              Entrar a Valor ✨
            </button>
            <button onClick={() => setStep(2)} className="btn-ghost w-full">← Volver</button>
          </>
        )}
      </div>
    </div>
  )
}
