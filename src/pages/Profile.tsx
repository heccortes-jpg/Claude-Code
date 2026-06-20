import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Logo } from '../components/Logo'
import { getUser, deleteUser } from '../lib/storage'
import { getExpenses } from '../lib/storage'
import { formatCLP, getTotal } from '../lib/insights'
import { Shield, Trash2, Lock, Eye, Database, ChevronRight, ExternalLink } from 'lucide-react'

export function Profile() {
  const navigate = useNavigate()
  const user = getUser()
  const expenses = getExpenses()
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)
  const [deleteConfirmed, setDeleteConfirmed] = useState(false)

  const totalSpent = getTotal(expenses)
  const totalExpenses = expenses.length

  const handleDeleteAccount = () => {
    deleteUser()
    navigate('/', { replace: true })
  }

  return (
    <Layout>
      <div className="px-5 pt-12 space-y-5">
        {/* User header */}
        <div className="glass-card p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-valor-gradient flex items-center justify-center text-2xl font-display font-bold text-white">
            {user?.name?.charAt(0)?.toUpperCase() ?? '?'}
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-valor-text">{user?.name ?? 'Usuario'}</h2>
            <p className="text-sm text-valor-muted">Miembro desde {new Date(user?.createdAt ?? Date.now()).toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card p-4 text-center">
            <p className="font-display text-2xl font-bold text-valor-text">{totalExpenses}</p>
            <p className="text-xs text-valor-muted">Registros totales</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="font-display text-lg font-bold text-valor-text">{formatCLP(totalSpent)}</p>
            <p className="text-xs text-valor-muted">Total registrado</p>
          </div>
        </div>

        {/* Premium */}
        <div className="glass-card p-5 border-violet-500/40" style={{ borderColor: 'rgba(139,92,246,0.4)' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400">✦</span>
            <h3 className="font-display text-base font-bold text-valor-text">Valor Premium</h3>
            <span className="text-xs bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full">Próximamente</span>
          </div>
          <p className="text-sm text-valor-muted mb-4">
            Insights más profundos, análisis avanzados, exportación de datos y acceso prioritario a nuevas funciones.
          </p>
          <div className="space-y-2 mb-4">
            {[
              'Análisis emocional avanzado',
              'Comparación semanal y mensual',
              'Exportar datos a CSV',
              'Soporte prioritario',
            ].map(f => (
              <div key={f} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-violet-500/20 flex items-center justify-center">
                  <span className="text-violet-400 text-xs">✓</span>
                </div>
                <span className="text-sm text-valor-muted">{f}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="btn-primary flex-1" style={{ minHeight: '44px', padding: '10px' }}>
              $2.990/mes
            </button>
            <button className="btn-secondary flex-1" style={{ minHeight: '44px', padding: '10px' }}>
              $14.990 fundador
            </button>
          </div>
          <p className="text-xs text-valor-muted text-center mt-2">Sin pagos reales aún — registra tu interés</p>
        </div>

        {/* Privacy section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Shield size={16} className="text-violet-400" />
            <h3 className="text-sm font-semibold text-valor-muted uppercase tracking-wider">Privacidad y datos</h3>
          </div>
          <div className="space-y-2">
            {[
              { icon: <Lock size={16} />, title: 'Tus datos te pertenecen', desc: 'Valor no vende ni comparte tus datos personales con terceros.' },
              { icon: <Eye size={16} />, title: 'Sin acceso de empleadores', desc: 'Ningún empleador puede ver tus registros individuales.' },
              { icon: <Database size={16} />, title: 'Sin conexión bancaria', desc: 'Esta versión no conecta ni accede a cuentas bancarias.' },
            ].map(item => (
              <div key={item.title} className="glass-card p-4 flex gap-3">
                <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center flex-shrink-0 text-violet-400">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-valor-text">{item.title}</p>
                  <p className="text-xs text-valor-muted mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="glass-card p-4">
          <p className="text-xs text-valor-muted text-center leading-relaxed">
            Valor no reemplaza asesoría financiera profesional ni apoyo de salud mental. Si estás en una situación difícil, busca ayuda especializada.
          </p>
        </div>

        {/* Source */}
        {user?.source && (
          <div className="glass-card p-3">
            <p className="text-xs text-valor-muted">Llegaste a Valor desde: <span className="text-violet-400">{user.source}</span></p>
          </div>
        )}

        {/* Danger zone */}
        <div>
          <h3 className="text-sm font-semibold text-red-500/70 uppercase tracking-wider mb-3">Zona de eliminación</h3>
          <div className="glass-card p-4 border-red-500/20" style={{ borderColor: 'rgba(239,68,68,0.2)' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-valor-text">Eliminar mi cuenta</p>
                <p className="text-xs text-valor-muted mt-0.5">Borra todos tus datos permanentemente</p>
              </div>
              <button
                onClick={() => setShowDeleteAccount(true)}
                className="p-2 text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pb-4">
          <Logo size="sm" />
          <p className="text-xs text-gray-700 mt-1">v0.1.0 — MVP beta</p>
        </div>
      </div>

      {/* Delete account modal */}
      {showDeleteAccount && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm px-5 pb-8">
          <div className="glass-card-solid w-full p-6">
            <h3 className="font-display text-lg font-bold text-valor-text mb-2">¿Eliminar cuenta?</h3>
            <p className="text-sm text-valor-muted mb-4">
              Todos tus registros y datos serán eliminados permanentemente. Esta acción no se puede deshacer.
            </p>
            <label className="flex items-start gap-3 mb-5 cursor-pointer">
              <input
                type="checkbox"
                checked={deleteConfirmed}
                onChange={e => setDeleteConfirmed(e.target.checked)}
                className="mt-0.5 accent-red-500"
              />
              <span className="text-sm text-valor-muted">
                Entiendo que perderé todos mis datos y no hay vuelta atrás.
              </span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => { setShowDeleteAccount(false); setDeleteConfirmed(false) }} className="btn-secondary">
                Cancelar
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={!deleteConfirmed}
                className="btn-primary disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)' }}
              >
                Eliminar todo
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
