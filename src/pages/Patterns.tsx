import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { EmptyState } from '../components/EmptyState'
import { InsightCard } from '../components/InsightCard'
import { getExpenses } from '../lib/storage'
import {
  formatCLP, getWeeklyChartData, getEmotionChartData,
  getCategoryChartData, getImpulsivePercentage, generateInsight
} from '../lib/insights'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-valor-muted uppercase tracking-wider mb-3">
      {children}
    </h3>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass-card-solid p-3 text-xs">
        <p className="text-valor-muted mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color ?? p.fill }}>${p.value}k</p>
        ))}
      </div>
    )
  }
  return null
}

export function Patterns() {
  const navigate = useNavigate()
  const expenses = getExpenses()

  const weeklyData = useMemo(() => getWeeklyChartData(expenses), [expenses])
  const emotionData = useMemo(() => getEmotionChartData(expenses), [expenses])
  const categoryData = useMemo(() => getCategoryChartData(expenses), [expenses])
  const impulsivePerc = useMemo(() => getImpulsivePercentage(expenses), [expenses])
  const insight = useMemo(() => generateInsight(expenses), [expenses])

  if (expenses.length < 3) {
    return (
      <Layout>
        <div className="px-5 pt-12">
          <h1 className="font-display text-2xl font-bold text-valor-text mb-6">Mapa de Patrones</h1>
          <EmptyState
            emoji="🗺️"
            title="Aún estás construyendo tu mapa"
            description="Registra algunos gastos más para descubrir patrones. Con 3 registros ya empiezan a aparecer las primeras señales."
            action={{ label: 'Registrar un gasto', onClick: () => navigate('/registrar') }}
          />
        </div>
      </Layout>
    )
  }

  const pieData = [
    { name: 'Impulsivo', value: impulsivePerc, color: '#C026D3' },
    { name: 'Planificado', value: 100 - impulsivePerc, color: '#34D399' },
  ]

  return (
    <Layout>
      <div className="px-5 pt-12 pb-4 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-valor-text">Mapa de Patrones</h1>
          <p className="text-valor-muted text-sm">{expenses.length} registros analizados</p>
        </div>

        {/* Insight principal */}
        <InsightCard text={insight} />

        {/* Weekly chart */}
        <div>
          <SectionTitle>Gastos últimos 7 días (miles CLP)</SectionTitle>
          <div className="glass-card p-4">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weeklyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" tick={{ fill: '#A78BFA', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#A78BFA', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="planificado" stackId="a" fill="#8B5CF6" radius={[0, 0, 4, 4]} />
                <Bar dataKey="impulsivo" stackId="a" fill="#EC4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 justify-center mt-2">
              <span className="text-xs text-valor-muted flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#8B5CF6' }} />
                Planificado
              </span>
              <span className="text-xs text-valor-muted flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#EC4899' }} />
                Impulsivo
              </span>
            </div>
          </div>
        </div>

        {/* Impulsive vs planned pie */}
        <div>
          <SectionTitle>Impulsivo vs. Planificado</SectionTitle>
          <div className="glass-card p-4">
            <div className="flex items-center">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <p className="text-2xl font-display font-bold text-pink-400">{impulsivePerc}%</p>
                  <p className="text-xs text-valor-muted">Impulsivos</p>
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-green-400">{100 - impulsivePerc}%</p>
                  <p className="text-xs text-valor-muted">Planificados</p>
                </div>
              </div>
            </div>
            {impulsivePerc >= 50 && (
              <p className="text-xs text-valor-muted mt-3 text-center">
                Más de la mitad de tus gastos son impulsivos. No es un juicio — es información.
              </p>
            )}
          </div>
        </div>

        {/* Emotions chart */}
        <div>
          <SectionTitle>Gastos por emoción</SectionTitle>
          <div className="glass-card p-4">
            <div className="space-y-3">
              {emotionData.map(em => {
                const maxCount = emotionData[0]?.count ?? 1
                const pct = (em.count / maxCount) * 100
                return (
                  <div key={em.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-valor-text">{em.emoji} {em.name}</span>
                      <span className="text-xs text-valor-muted">{em.count} · {formatCLP(em.total)}</span>
                    </div>
                    <div className="h-2 bg-valor-border rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: em.color }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Categories chart */}
        <div>
          <SectionTitle>Gastos por categoría</SectionTitle>
          <div className="glass-card p-4">
            <div className="space-y-3">
              {categoryData.map(cat => {
                const maxTotal = categoryData[0]?.total ?? 1
                const pct = (cat.total / maxTotal) * 100
                return (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-valor-text">{cat.emoji} {cat.name}</span>
                      <span className="text-xs text-valor-muted font-semibold">{formatCLP(cat.total)}</span>
                    </div>
                    <div className="h-2 bg-valor-border rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: cat.color }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Emotion + category cross */}
        <div>
          <SectionTitle>Relación emoción · categoría</SectionTitle>
          <div className="glass-card p-4">
            {emotionData.slice(0, 3).map(em => {
              const emExpenses = expenses.filter(e => e.emotionId === em.name.toLowerCase() ||
                e.emotionId === emotionData.find(x => x.name === em.name)?.name)
              return (
                <div key={em.name} className="mb-4 last:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span>{em.emoji}</span>
                    <span className="text-sm font-semibold text-valor-text">{em.name}</span>
                    <span className="text-xs text-valor-muted">({em.count} registros)</span>
                  </div>
                </div>
              )
            })}
            <p className="text-xs text-valor-muted text-center">
              Registra más gastos para ver la relación completa entre emociones y categorías.
            </p>
          </div>
        </div>

        {/* Premium teaser */}
        <div className="glass-card p-5 text-center border-violet-500/30">
          <p className="text-violet-400 font-semibold mb-2">✦ Análisis avanzado en Valor Premium</p>
          <p className="text-xs text-valor-muted mb-4">
            Momentos del día con más gastos, predicción de patrones, comparación semanal detallada y mucho más.
          </p>
          <button className="btn-primary" style={{ background: 'linear-gradient(135deg, #8B5CF6, #C026D3)' }}>
            Saber más — desde $2.990 CLP/mes
          </button>
        </div>
      </div>
    </Layout>
  )
}
