import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { getUser, saveSource } from '../lib/storage'
import { track } from '../lib/analytics'
import { ChevronRight, Shield, BarChart2, Heart, Zap, Lock, Eye, Sparkles } from 'lucide-react'

const SCENARIOS = [
  { emoji: '😫', emotion: 'Estrés del lunes', spend: '$38.000 en delivery', color: '#8B5CF6' },
  { emoji: '😔', emotion: 'Soledad de sábado', spend: '$52.000 en ropa que no usas', color: '#C026D3' },
  { emoji: '🎉', emotion: 'Euforia del sueldo', spend: '$89.000 en 48 horas', color: '#EC4899' },
  { emoji: '😤', emotion: 'Pelea con alguien', spend: '$24.000 en snacks y cafeína', color: '#8B5CF6' },
]

const STEPS = [
  { n: '01', emoji: '💸', title: 'Algo pasa y gastas', desc: 'Estás en una emoción — y el gasto llega casi automático.' },
  { n: '02', emoji: '📱', title: 'Registras en 10 segundos', desc: 'Monto, categoría y cómo te sentías. Sin sermones.' },
  { n: '03', emoji: '🧠', title: 'El patrón aparece solo', desc: 'Valor conecta los puntos que tú no podías ver.' },
]

const FEATURES = [
  { icon: <Heart size={20} />, title: 'Registro emocional', desc: '10 emociones. Registra el estado detrás de cada gasto en segundos, no minutos.' },
  { icon: <BarChart2 size={20} />, title: 'Mapa de patrones', desc: 'Ve en qué emoción gastas más, qué categorías lo disparan y cuánto es impulsivo.' },
  { icon: <Zap size={20} />, title: 'Insights automáticos', desc: 'Valor lee tus datos y te da frases concretas. Sin dashboards que leer.' },
  { icon: <Shield size={20} />, title: '100% privado', desc: 'Sin cuenta bancaria. Sin servidor. Tus datos viven en tu teléfono y solo en él.' },
  { icon: <Lock size={20} />, title: 'Sin employer access', desc: 'Ningún empleador, aseguradora ni tercero puede ver tus registros.' },
  { icon: <Eye size={20} />, title: 'Sin juicios', desc: 'Valor no califica si gastas bien o mal. Solo muestra lo que ya estaba ahí.' },
]

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    el.querySelectorAll('.reveal-up').forEach(node => obs.observe(node))
    return () => obs.disconnect()
  }, [])
  return ref
}

export function Landing() {
  const navigate = useNavigate()
  const pageRef = useReveal()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const de = params.get('de')
    if (de) saveSource(de)
    track('landing_view', de ? { source: de } : undefined)
    const user = getUser()
    if (user?.onboardingCompleted) navigate('/dashboard', { replace: true })
  }, [navigate])

  const handleStart = () => {
    const user = getUser()
    if (user?.onboardingCompleted) { navigate('/dashboard'); return }
    track('onboarding_start')
    navigate('/onboarding')
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-valor-bg flex flex-col relative overflow-hidden">

      {/* Ambient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="orb-pulse absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18), transparent 70%)' }} />
        <div className="orb-pulse absolute top-1/3 -left-32 w-72 h-72 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(192,38,211,0.12), transparent 70%)', animationDelay: '2s' }} />
        <div className="orb-pulse absolute bottom-1/4 right-0 w-64 h-64 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.1), transparent 70%)', animationDelay: '4s' }} />
      </div>

      <div className="max-w-md mx-auto w-full flex flex-col relative z-10">

        {/* ── NAV ── */}
        <nav className="px-6 pt-12 pb-2 flex items-center justify-between">
          <Logo size="md" showTagline />
          <button
            onClick={handleStart}
            className="text-sm font-semibold text-valor-violet px-4 py-2 rounded-full"
            style={{ border: '1px solid rgba(139,92,246,0.35)' }}
          >
            Entrar →
          </button>
        </nav>

        {/* ── HERO ── */}
        <section className="px-6 pt-12 pb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full text-xs font-semibold text-valor-muted page-enter"
            style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
            <Sparkles size={12} className="text-violet-400" />
            Beta abierta · Acceso gratuito
          </div>

          {/* Headline */}
          <h1 className="font-display text-[2.6rem] leading-[1.1] font-extrabold text-valor-text mb-5 page-enter"
            style={{ animationDelay: '60ms' }}>
            Antes de cambiar cómo gastas,<br />
            <span className="valor-gradient-text">necesitas saber por qué.</span>
          </h1>

          <p className="text-valor-muted text-lg leading-relaxed mb-8 page-enter"
            style={{ animationDelay: '120ms' }}>
            Valor conecta tus gastos con tus emociones. Sin banco. Sin juicios. Sin datos en la nube.
          </p>

          {/* CTA */}
          <button onClick={handleStart} className="btn-primary mb-3 page-enter"
            style={{ animationDelay: '180ms' }}>
            Comenzar gratis — toma 2 minutos
            <ChevronRight size={20} />
          </button>
          <p className="text-center text-xs text-valor-muted/60 page-enter" style={{ animationDelay: '220ms' }}>
            Sin registro de email · Sin tarjeta · Sin apps extras
          </p>

          {/* App preview card */}
          <div className="mt-10 reveal-up">
            <div className="glass-card p-5 border-glow">
              <p className="text-xs text-valor-muted mb-3 uppercase tracking-wider font-semibold">Último registro</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-2xl"
                    style={{ background: 'rgba(139,92,246,0.15)' }}>
                    😫
                  </div>
                  <div>
                    <p className="text-sm font-bold text-valor-text">Delivery · Comida</p>
                    <p className="text-xs text-valor-muted">Estrés laboral · Hoy 13:22</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display font-extrabold text-valor-text text-lg">$23.990</p>
                  <span className="text-xs text-orange-400 flex items-center gap-1 justify-end">
                    <Zap size={10} /> Impulsivo
                  </span>
                </div>
              </div>
              {/* Mini bar visual */}
              <div className="space-y-1.5">
                <p className="text-xs text-valor-muted">Esta semana — estrés representó el 68% de tus gastos</p>
                <div className="h-2 rounded-full bg-valor-surface overflow-hidden">
                  <div className="h-full rounded-full float-x"
                    style={{ width: '68%', background: 'linear-gradient(90deg, #8B5CF6, #C026D3)' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ¿TE RECONOCES? ── */}
        <section className="px-6 pb-14">
          <div className="reveal-up">
            <p className="text-xs text-valor-muted font-semibold uppercase tracking-wider mb-1">El patrón invisible</p>
            <h2 className="font-display text-2xl font-extrabold text-valor-text mb-2">
              ¿Te reconoces en alguno de estos?
            </h2>
            <p className="text-sm text-valor-muted mb-6">
              No es falta de voluntad. Es que nadie te había mostrado la conexión.
            </p>
          </div>
          <div className="space-y-3">
            {SCENARIOS.map((s, i) => (
              <div key={i} className={`reveal-up delay-${i + 1} premium-card glass-card p-4 flex items-center gap-4`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${s.color}18` }}>
                  {s.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-valor-muted mb-0.5">{s.emotion}</p>
                  <p className="text-sm font-bold text-valor-text truncate">→ {s.spend}</p>
                </div>
                <div className="w-1.5 h-8 rounded-full flex-shrink-0"
                  style={{ background: `linear-gradient(to bottom, ${s.color}, transparent)` }} />
              </div>
            ))}
          </div>
          <div className="reveal-up delay-4 mt-5">
            <div className="glass-card p-4 text-center"
              style={{ background: 'rgba(139,92,246,0.07)' }}>
              <p className="text-sm text-valor-text font-medium">
                Valor no te dice que pares.<br />
                <span className="text-valor-violet font-semibold">Te dice qué está pasando antes de que pares.</span>
              </p>
            </div>
          </div>
        </section>

        {/* ── CÓMO FUNCIONA ── */}
        <section className="px-6 pb-14">
          <div className="reveal-up">
            <p className="text-xs text-valor-muted font-semibold uppercase tracking-wider mb-1">Cómo funciona</p>
            <h2 className="font-display text-2xl font-extrabold text-valor-text mb-8">
              Simple a propósito.
            </h2>
          </div>
          <div className="space-y-4">
            {STEPS.map((step, i) => (
              <div key={i} className={`reveal-up delay-${i + 1} flex gap-4 items-start`}>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-valor-gradient flex items-center justify-center text-xl">
                    {step.emoji}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-px h-8 mt-2" style={{ background: 'linear-gradient(to bottom, rgba(139,92,246,0.4), transparent)' }} />
                  )}
                </div>
                <div className="pt-1.5 pb-4">
                  <span className="text-xs text-valor-violet font-mono font-bold">{step.n}</span>
                  <h3 className="font-display text-base font-bold text-valor-text mb-1">{step.title}</h3>
                  <p className="text-sm text-valor-muted">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="px-6 pb-14">
          <div className="reveal-up">
            <p className="text-xs text-valor-muted font-semibold uppercase tracking-wider mb-1">Todo incluido, gratis</p>
            <h2 className="font-display text-2xl font-extrabold text-valor-text mb-6">
              Lo que incluye Valor.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {FEATURES.map((f, i) => (
              <div key={i} className={`reveal-up delay-${(i % 4) + 1} premium-card glass-card p-4 flex gap-4`}>
                <div className="w-9 h-9 rounded-xl bg-valor-gradient flex items-center justify-center flex-shrink-0 text-white">
                  {f.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-valor-text mb-0.5">{f.title}</p>
                  <p className="text-xs text-valor-muted leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRIVACIDAD ── */}
        <section className="px-6 pb-14">
          <div className="reveal-up">
            <div className="glass-card p-6" style={{ border: '1px solid rgba(139,92,246,0.3)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-valor-gradient flex items-center justify-center">
                  <Shield size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-valor-text">Diseñado para que no confíes en nosotros</p>
                  <p className="text-xs text-valor-muted">Y eso es exactamente el punto</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  'Tus datos nunca salen de tu teléfono',
                  'Sin cuenta bancaria ni acceso a movimientos',
                  'Sin empleadores ni aseguradoras en el loop',
                  'Sin publicidad personalizada con tus datos',
                  'Sin obligación de crear una cuenta',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(139,92,246,0.2)' }}>
                      <span className="text-valor-violet text-[10px]">✓</span>
                    </div>
                    <span className="text-xs text-valor-muted">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PREMIUM TEASER ── */}
        <section className="px-6 pb-14">
          <div className="reveal-up">
            <div className="glass-card p-5 relative overflow-hidden"
              style={{ border: '1px solid rgba(139,92,246,0.35)', background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(192,38,211,0.07))' }}>
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent)' }} />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400 text-base">✦</span>
                <h3 className="font-display text-base font-bold text-valor-text">Valor Premium</h3>
                <span className="text-xs bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full font-medium">Próximamente</span>
              </div>
              <p className="text-sm text-valor-muted mb-4 leading-relaxed">
                Análisis avanzado, comparación temporal, exportación CSV y acceso anticipado. Pensado para quienes ya quieren el siguiente nivel.
              </p>
              <div className="flex justify-between text-xs text-valor-muted/70">
                <span>~$2.990/mes</span>
                <span>o $14.990 precio fundador</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="px-6 pb-16">
          <div className="reveal-up text-center mb-8">
            <h2 className="font-display text-3xl font-extrabold text-valor-text mb-3 leading-tight">
              Hay una versión de ti<br />
              <span className="valor-gradient-text">que ya sabe por qué gasta.</span>
            </h2>
            <p className="text-valor-muted text-sm mb-2">
              Valor es la herramienta para conocerla.
            </p>
          </div>
          <div className="reveal-up delay-1">
            <button onClick={handleStart} className="btn-primary mb-3">
              Comenzar ahora — es gratis
              <ChevronRight size={20} />
            </button>
            <p className="text-center text-xs text-valor-muted/50">
              Beta · Sin email · Sin tarjeta · Sin sorpresas
            </p>
          </div>

          {/* Legal */}
          <div className="reveal-up delay-2 mt-10 pt-8" style={{ borderTop: '1px solid rgba(139,92,246,0.1)' }}>
            <div className="flex items-center justify-center mb-4">
              <Logo size="sm" />
            </div>
            <p className="text-xs text-valor-muted/50 text-center leading-relaxed">
              Valor no reemplaza asesoría financiera ni apoyo de salud mental.<br />
              Si estás en una situación difícil, busca ayuda especializada.
            </p>
            <p className="text-xs text-valor-muted/30 text-center mt-3">v0.1.0 — MVP beta · Chile 🇨🇱</p>
          </div>
        </section>

      </div>
    </div>
  )
}
