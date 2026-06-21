import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { InsightCard } from '../components/InsightCard'
import { Logo } from '../components/Logo'
import { InstallBanner } from '../components/InstallBanner'
import { getUser, getExpenses } from '../lib/storage'
import { getEmotion } from '../data/emotions'
import { getCategory } from '../data/categories'
import {
  formatCLP, getTopEmotion, getTopCategory,
  getImpulsivePercentage, getTotal, getThisWeekExpenses,
  generateInsight
} from '../lib/insights'
import { Plus, TrendingUp, Zap } from 'lucide-react'
import { isUsingDemoData } from '../lib/storage'

function getGreeting(name: string): string {
  const hour = new Date().getHours()
  if (hour < 12) return `Buenos días, ${name} ☀️`
  if (hour < 18) return `Hola, ${name} 👋`
  return `Buenas noches, ${name} 🌙`
}

export function Dashboard() {
  const navigate = useNavigate()
  const user = getUser()
  const expenses = getExpenses()

  const weekExpenses = useMemo(() => getThisWeekExpenses(expenses), [expenses])
  const weekTotal = useMemo(() => getTotal(weekExpenses), [weekExpenses])
  const topEmotionId = useMemo(() => getTopEmotion(weekExpenses), [weekExpenses])
  const topCategoryId = useMemo(() => getTopCategory(weekExpenses), [weekExpenses])
  const impulsivePerc = useMemo(() => getImpulsivePercentage(weekExpenses), [weekExpenses])
  const insight = useMemo(() => generateInsight(expenses), [expenses])

  const topEmotion = topEmotionId ? getEmotion(topEmotionId) : null
  const topCategory = topCategoryId ? getCategory(topCategoryId) : null
  const lastExpense = expenses[0]
  const lastEmotion = lastExpense ? getEmotion(lastExpense.emotionId) : null
  const lastCategory = lastExpense ? getCategory(lastExpense.categoryId) : null

  const name = user?.name?.split(' ')[0] ?? 'tú'
  const usingDemo = isUsingDemoData()

  return (
    <Layout>
      <div className="px-5 pt-12 space-y-5 page-enter">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-valor-muted text-sm">{getGreeting(name)}</p>
            <h1 className="font-display text-2xl font-bold text-valor-text">Tu semana</h1>
          </div>
          <Logo size="sm" />
        </div>

        {/* Total card */}
        <div className="glass-card p-5 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)' }} />
          <p className="text-valor-muted text-sm mb-1">Total esta semana</p>
          <p className="font-display text-4xl font-extrabold text-valor-text">
            {formatCLP(weekTotal)}
          </p>
          <p className="text-xs text-valor-muted mt-1">{weekExpenses.length} registro{weekExpenses.length !== 1 ? 's' : ''}</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="glass-card p-3 text-center">
            <div className="text-xl mb-1">{topEmotion?.emoji ?? '—'}</div>
            <p className="text-xs text-valor-muted leading-tight">Emoción más frecuente</p>
            <p className="text-xs font-semibold text-valor-text mt-1 truncate">{topEmotion?.label ?? '—'}</p>
          </div>
          <div className="glass-card p-3 text-center">
            <div className="text-xl mb-1">{topCategory?.emoji ?? '—'}</div>
            <p className="text-xs text-valor-muted leading-tight">Mayor categoría</p>
            <p className="text-xs font-semibold text-valor-text mt-1 truncate">{topCategory?.label ?? '—'}</p>
          </div>
          <div className="glass-card p-3 text-center">
            <div className="text-xl mb-1">
              <span className={`font-display text-xl font-bold ${impulsivePerc >= 50 ? 'text-orange-400' : 'text-green-400'}`}>
                {impulsivePerc}%
              </span>
            </div>
            <p className="text-xs text-valor-muted leading-tight">Gastos impulsivos</p>
          </div>
        </div>

        {/* Install banner */}
        <InstallBanner />

        {/* Demo data notice */}
        {usingDemo && (
          <div className="glass-card p-3 border-yellow-500/20 flex items-start gap-2"
            style={{ borderColor: 'rgba(234,179,8,0.25)', background: 'rgba(234,179,8,0.06)' }}>
            <span className="text-base flex-shrink-0">🧪</span>
            <p className="text-xs text-yellow-300/80 leading-relaxed">
              Estás viendo datos de ejemplo. Registra tu primer gasto real para empezar tu propio mapa emocional.
            </p>
          </div>
        )}

        {/* Insight */}
        <InsightCard text={insight} />

        {/* Last expense */}
        {lastExpense && (
          <div>
            <p className="text-xs text-valor-muted font-semibold uppercase tracking-wider mb-2">Último registro</p>
            <div className="glass-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{ background: lastEmotion?.bgColor }}>
                  {lastEmotion?.emoji}
                </div>
                <div>
                  <p className="text-sm font-semibold text-valor-text">{lastCategory?.label}</p>
                  <p className="text-xs text-valor-muted">{lastEmotion?.label}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display font-bold text-valor-text">{formatCLP(lastExpense.amount)}</p>
                {lastExpense.isImpulsive && (
                  <span className="text-xs text-orange-400 flex items-center gap-1 justify-end">
                    <Zap size={10} /> Impulsivo
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quick actions */}
        <div>
          <p className="text-xs text-valor-muted font-semibold uppercase tracking-wider mb-2">Accesos rápidos</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/registrar')}
              className="glass-card p-4 flex flex-col items-center gap-2 hover:border-violet-500 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-valor-gradient flex items-center justify-center">
                <Plus size={20} className="text-white" />
              </div>
              <span className="text-sm font-medium text-valor-text">Registrar gasto</span>
            </button>
            <button
              onClick={() => navigate('/patrones')}
              className="glass-card p-4 flex flex-col items-center gap-2 hover:border-violet-500 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-valor-gradient flex items-center justify-center">
                <TrendingUp size={20} className="text-white" />
              </div>
              <span className="text-sm font-medium text-valor-text">Ver patrones</span>
            </button>
          </div>
        </div>

        {/* CTA premium hint */}
        <div className="glass-card p-4 border-violet-500/30 text-center">
          <p className="text-xs text-valor-muted">
            <span className="text-violet-400 font-semibold">✦ Valor Premium</span>
            {' '}— Insights más profundos, patrones avanzados y acceso anticipado.{' '}
            <button
              onClick={() => navigate('/perfil')}
              className="text-violet-400 underline"
            >
              Saber más
            </button>
          </p>
        </div>
      </div>
    </Layout>
  )
}
