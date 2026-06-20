import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'

export function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-valor-bg flex flex-col items-center justify-center px-6 text-center max-w-md mx-auto">
      <div className="text-6xl mb-6">🌀</div>
      <Logo size="md" showTagline />
      <h1 className="font-display text-5xl font-extrabold valor-gradient-text mt-6 mb-3">404</h1>
      <p className="text-valor-muted mb-8">Esta página no existe o fue movida.</p>
      <button onClick={() => navigate('/')} className="btn-primary" style={{ maxWidth: '240px' }}>
        Volver al inicio
      </button>
    </div>
  )
}
