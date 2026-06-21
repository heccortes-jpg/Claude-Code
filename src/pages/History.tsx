import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { EmptyState } from '../components/EmptyState'
import { getExpenses, deleteExpense } from '../lib/storage'
import { getEmotion } from '../data/emotions'
import { getCategory } from '../data/categories'
import { EMOTIONS } from '../data/emotions'
import { CATEGORIES } from '../data/categories'
import { formatCLP, formatRelativeDate } from '../lib/insights'
import type { EmotionId, CategoryId } from '../types'
import { Search, Trash2, Zap, X } from 'lucide-react'

export function History() {
  const navigate = useNavigate()
  const [expenses, setExpenses] = useState(() => getExpenses())
  const [search, setSearch] = useState('')
  const [filterEmotion, setFilterEmotion] = useState<EmotionId | ''>('')
  const [filterCategory, setFilterCategory] = useState<CategoryId | ''>('')
  const [filterImpulsive, setFilterImpulsive] = useState<'all' | 'impulsive' | 'planned'>('all')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let list = [...expenses]
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(e =>
        getCategory(e.categoryId).label.toLowerCase().includes(q) ||
        getEmotion(e.emotionId).label.toLowerCase().includes(q) ||
        (e.note ?? '').toLowerCase().includes(q) ||
        (e.trigger ?? '').toLowerCase().includes(q)
      )
    }
    if (filterEmotion) list = list.filter(e => e.emotionId === filterEmotion)
    if (filterCategory) list = list.filter(e => e.categoryId === filterCategory)
    if (filterImpulsive === 'impulsive') list = list.filter(e => e.isImpulsive)
    if (filterImpulsive === 'planned') list = list.filter(e => !e.isImpulsive)
    return list
  }, [expenses, search, filterEmotion, filterCategory, filterImpulsive])

  const hasFilters = filterEmotion || filterCategory || filterImpulsive !== 'all'

  const handleDelete = (id: string) => {
    const updated = deleteExpense(id)
    setExpenses(updated)
    setDeleteConfirm(null)
  }

  return (
    <Layout>
      <div className="px-5 pt-12 pb-4">
        <h1 className="font-display text-2xl font-bold text-valor-text mb-1">Historial</h1>
        <p className="text-valor-muted text-sm mb-4">{expenses.length} registro{expenses.length !== 1 ? 's' : ''} en total</p>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-valor-muted" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar gastos..."
            className="input-field pl-10"
          />
        </div>

        {/* Filter toggle */}
        <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-1">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex-shrink-0 text-xs px-3 py-2 rounded-full border transition-all ${
              hasFilters
                ? 'border-violet-500 bg-violet-500/20 text-violet-300'
                : 'border-valor-border text-valor-muted'
            }`}
          >
            Filtros {hasFilters && `(${[filterEmotion, filterCategory, filterImpulsive !== 'all'].filter(Boolean).length})`}
          </button>
          {hasFilters && (
            <button
              onClick={() => { setFilterEmotion(''); setFilterCategory(''); setFilterImpulsive('all') }}
              className="flex-shrink-0 text-xs px-3 py-2 rounded-full border border-red-500/30 text-red-400 flex items-center gap-1"
            >
              <X size={12} /> Limpiar
            </button>
          )}
        </div>

        {showFilters && (
          <div className="glass-card p-4 mb-4 space-y-4">
            {/* Emotion filter */}
            <div>
              <p className="text-xs font-semibold text-valor-muted uppercase tracking-wider mb-2">Emoción</p>
              <div className="flex flex-wrap gap-2">
                {EMOTIONS.map(em => (
                  <button
                    key={em.id}
                    onClick={() => setFilterEmotion(filterEmotion === em.id ? '' : em.id)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1 ${
                      filterEmotion === em.id ? 'border-violet-500 bg-violet-500/20 text-violet-300' : 'border-valor-border text-valor-muted'
                    }`}
                  >
                    {em.emoji} {em.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category filter */}
            <div>
              <p className="text-xs font-semibold text-valor-muted uppercase tracking-wider mb-2">Categoría</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setFilterCategory(filterCategory === cat.id ? '' : cat.id)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1 ${
                      filterCategory === cat.id ? 'border-violet-500 bg-violet-500/20 text-violet-300' : 'border-valor-border text-valor-muted'
                    }`}
                  >
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Impulsive filter */}
            <div>
              <p className="text-xs font-semibold text-valor-muted uppercase tracking-wider mb-2">Tipo</p>
              <div className="flex gap-2">
                {([['all', 'Todos'], ['impulsive', '⚡ Impulsivos'], ['planned', '📋 Planificados']] as const).map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setFilterImpulsive(val)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      filterImpulsive === val ? 'border-violet-500 bg-violet-500/20 text-violet-300' : 'border-valor-border text-valor-muted'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* List */}
        {filtered.length === 0 ? (
          <EmptyState
            emoji="🔍"
            title="Sin resultados"
            description="No encontramos gastos con esos filtros. Prueba cambiando los criterios."
            action={hasFilters ? { label: 'Limpiar filtros', onClick: () => { setFilterEmotion(''); setFilterCategory(''); setFilterImpulsive('all'); setSearch('') } } : undefined}
          />
        ) : (
          <div className="space-y-3 stagger">
            {filtered.map((expense, idx) => {
              const emotion = getEmotion(expense.emotionId)
              const category = getCategory(expense.categoryId)
              return (
                <div key={expense.id} className="glass-card p-4 page-enter-fast" style={{ animationDelay: `${Math.min(idx, 5) * 50}ms` }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                        style={{ background: emotion.bgColor }}
                      >
                        {emotion.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-valor-text">{category.label}</span>
                          {expense.isImpulsive && (
                            <span className="text-xs text-orange-400 flex items-center gap-0.5">
                              <Zap size={10} /> Impulsivo
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-valor-muted">{emotion.label} · {formatRelativeDate(expense.date)}</p>
                        {expense.trigger && (
                          <p className="text-xs text-valor-muted mt-1 truncate">"{expense.trigger}"</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-display font-bold text-valor-text">{formatCLP(expense.amount)}</p>
                      <button
                        onClick={() => setDeleteConfirm(expense.id)}
                        className="mt-1 w-11 h-11 flex items-center justify-center text-gray-500 hover:text-red-400 transition-colors -mr-2"
                        aria-label="Eliminar registro"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm px-5 pb-8">
          <div className="glass-card-solid w-full p-6 space-y-4">
            <h3 className="font-display text-lg font-bold text-valor-text">¿Eliminar este registro?</h3>
            <p className="text-sm text-valor-muted">Esta acción no se puede deshacer.</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary">Cancelar</button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="btn-primary"
                style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)' }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
