import type { Expense } from '../types'
import { getEmotion } from '../data/emotions'
import { getCategory } from '../data/categories'

export function formatCLP(amount: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatAmountInput(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return ''
  return new Intl.NumberFormat('es-CL').format(parseInt(digits))
}

export function formatRelativeDate(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  const todayStr = now.toDateString()
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  const yestStr = yesterday.toDateString()

  const timeStr = date.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })

  if (date.toDateString() === todayStr) return `Hoy · ${timeStr}`
  if (date.toDateString() === yestStr) return `Ayer · ${timeStr}`

  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays < 7) {
    const dayName = date.toLocaleDateString('es-CL', { weekday: 'long' })
    return `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} · ${timeStr}`
  }

  return date.toLocaleDateString('es-CL', { day: 'numeric', month: 'short' }) + ` · ${timeStr}`
}

export function getTopEmotion(expenses: Expense[]): string | null {
  if (!expenses.length) return null
  const counts: Record<string, number> = {}
  expenses.forEach(e => { counts[e.emotionId] = (counts[e.emotionId] ?? 0) + 1 })
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
  return top ? top[0] : null
}

export function getTopCategory(expenses: Expense[]): string | null {
  if (!expenses.length) return null
  const totals: Record<string, number> = {}
  expenses.forEach(e => { totals[e.categoryId] = (totals[e.categoryId] ?? 0) + e.amount })
  const top = Object.entries(totals).sort((a, b) => b[1] - a[1])[0]
  return top ? top[0] : null
}

export function getImpulsivePercentage(expenses: Expense[]): number {
  if (!expenses.length) return 0
  const impulsive = expenses.filter(e => e.isImpulsive).length
  return Math.round((impulsive / expenses.length) * 100)
}

export function getTotal(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.amount, 0)
}

export function getThisWeekExpenses(expenses: Expense[]): Expense[] {
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  return expenses.filter(e => new Date(e.date) >= weekAgo)
}

export function getLastWeekExpenses(expenses: Expense[]): Expense[] {
  const twoWeeksAgo = new Date()
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  return expenses.filter(e => {
    const date = new Date(e.date)
    return date >= twoWeeksAgo && date < oneWeekAgo
  })
}

export function generateInsight(expenses: Expense[]): string {
  if (!expenses.length) return 'Registra tu primer gasto para comenzar a descubrir tus patrones.'

  const thisWeek = getThisWeekExpenses(expenses)
  const lastWeek = getLastWeekExpenses(expenses)

  const stressedThisWeek = thisWeek.filter(e => e.emotionId === 'estresado').length
  const stressedLastWeek = lastWeek.filter(e => e.emotionId === 'estresado').length

  if (stressedThisWeek > stressedLastWeek && stressedThisWeek >= 2) {
    return 'Esta semana registraste más gastos asociados a estrés que la semana anterior. No significa que estés haciendo algo mal; puede ser una señal útil para observar.'
  }

  const impulsivePerc = getImpulsivePercentage(thisWeek)
  if (impulsivePerc > 50 && thisWeek.length >= 3) {
    return `${impulsivePerc}% de tus gastos esta semana fueron impulsivos. Observar ese patrón es el primer paso para entenderlo mejor.`
  }

  const topEmotion = getTopEmotion(expenses)
  if (topEmotion === 'ansioso') {
    const anxiousDelivery = expenses.filter(e => e.emotionId === 'ansioso' && e.categoryId === 'delivery').length
    if (anxiousDelivery >= 2) {
      return 'Hay una coincidencia entre ansiedad y pedidos de delivery en tus registros. No hay un juicio aquí, solo información que puede ser valiosa.'
    }
    return 'La ansiedad aparece frecuentemente asociada a tus gastos. Registrar más te ayudará a ver si hay un patrón claro.'
  }

  const topCat = getTopCategory(expenses)
  if (topCat) {
    const cat = getCategory(topCat)
    return `${cat.emoji} ${cat.label} es tu categoría con mayor gasto. ¿Hay algo en ese patrón que quieras explorar?`
  }

  return 'Sigue registrando para que Valor pueda mostrarte patrones más completos y útiles para ti.'
}

export function getWeeklyChartData(expenses: Expense[]) {
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  const data: { day: string; total: number; impulsivo: number; planificado: number }[] = []

  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dayStr = date.toISOString().split('T')[0]
    const dayExpenses = expenses.filter(e => e.date.startsWith(dayStr))
    const total = getTotal(dayExpenses)
    const impulsivo = getTotal(dayExpenses.filter(e => e.isImpulsive))
    data.push({
      day: days[date.getDay()],
      total: Math.round(total / 1000),
      impulsivo: Math.round(impulsivo / 1000),
      planificado: Math.round((total - impulsivo) / 1000),
    })
  }
  return data
}

export function getEmotionChartData(expenses: Expense[]) {
  const counts: Record<string, { count: number; total: number }> = {}
  expenses.forEach(e => {
    if (!counts[e.emotionId]) counts[e.emotionId] = { count: 0, total: 0 }
    counts[e.emotionId].count++
    counts[e.emotionId].total += e.amount
  })
  return Object.entries(counts)
    .map(([id, data]) => {
      const emotion = getEmotion(id)
      return { id, name: emotion.label, emoji: emotion.emoji, count: data.count, total: data.total, color: emotion.color }
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
}

export function getCategoryChartData(expenses: Expense[]) {
  const totals: Record<string, number> = {}
  expenses.forEach(e => { totals[e.categoryId] = (totals[e.categoryId] ?? 0) + e.amount })
  return Object.entries(totals)
    .map(([id, total]) => {
      const cat = getCategory(id)
      return { name: cat.label, emoji: cat.emoji, total, color: cat.color }
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 6)
}
