import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { getUser, saveSource } from '../lib/storage'
import { track } from '../lib/analytics'
import { ChevronRight, Shield, BarChart2, Heart } from 'lucide-react'

export function Landing() {
  const navigate = useNavigate()

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
    if (user?.onboardingCompleted) {
      navigate('/dashboard')
    } else {
      track('onboarding_start')
      navigate('/onboarding')
    }
  }

  return (
    <div className="min-h-screen bg-valor-bg flex flex-col relative overflow-hidden max-w-md mx-auto">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)' }} />
      <div className="absolute bottom-20 left-0 w-64 h-64 rounded-full opacity-8 blur-3xl"
        style={{ background: 'radial-gradient(circle, #C026D3, transparent)' }} />

      {/* Header */}
      <header className="px-6 pt-16 pb-4">
        <Logo size="lg" showTagline />
      </header>

      {/* Hero */}
      <main className="flex-1 px-6 pt-8">
        <h1 className="font-display text-4xl font-extrabold text-valor-text leading-tight mb-4">
          Tus finanzas<br />
          <span className="valor-gradient-text">tienen emociones.</span>
        </h1>
        <p className="text-valor-muted text-lg leading-relaxed mb-10">
          Valor te ayuda a entender la relación entre cómo te sientes y cómo gastas. Sin juicios. Sin sermones.
        </p>

        {/* Features */}
        <div className="space-y-3 mb-10">
          {[
            { icon: <Heart size={18} />, text: 'Registra gastos y emociones en segundos' },
            { icon: <BarChart2 size={18} />, text: 'Descubre patrones que no sabías que tenías' },
            { icon: <Shield size={18} />, text: 'Tus datos son tuyos. Siempre.' },
          ].map((item, i) => (
            <div key={i} className="glass-card p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-valor-gradient flex items-center justify-center flex-shrink-0 text-white">
                {item.icon}
              </div>
              <span className="text-valor-text text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Privacy notice */}
        <p className="text-xs text-valor-muted text-center mb-6 px-4">
          Valor no conecta cuentas bancarias, no vende datos y no reemplaza asesoría financiera o de salud mental.
        </p>

        {/* CTA */}
        <button onClick={handleStart} className="btn-primary mb-4">
          Comenzar gratis
          <ChevronRight size={20} />
        </button>

        <p className="text-center text-xs text-gray-600">
          Beta · Acceso anticipado
        </p>
      </main>

      <div className="h-8" />
    </div>
  )
}
