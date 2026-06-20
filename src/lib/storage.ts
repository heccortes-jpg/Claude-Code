import type { Expense, UserProfile } from '../types'
import { DEMO_EXPENSES } from '../data/demo'

const KEYS = {
  user: 'valor_user',
  expenses: 'valor_expenses',
  source: 'valor_source',
}

export function getUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(KEYS.user)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveUser(user: UserProfile): void {
  localStorage.setItem(KEYS.user, JSON.stringify(user))
}

export function deleteUser(): void {
  localStorage.removeItem(KEYS.user)
  localStorage.removeItem(KEYS.expenses)
}

export function getExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(KEYS.expenses)
    if (raw) return JSON.parse(raw)
    return DEMO_EXPENSES
  } catch {
    return DEMO_EXPENSES
  }
}

export function saveExpenses(expenses: Expense[]): void {
  localStorage.setItem(KEYS.expenses, JSON.stringify(expenses))
}

export function addExpense(expense: Expense): Expense[] {
  const expenses = getExpenses()
  const updated = [expense, ...expenses]
  saveExpenses(updated)
  return updated
}

export function updateExpense(id: string, data: Partial<Expense>): Expense[] {
  const expenses = getExpenses()
  const updated = expenses.map(e => (e.id === id ? { ...e, ...data } : e))
  saveExpenses(updated)
  return updated
}

export function deleteExpense(id: string): Expense[] {
  const expenses = getExpenses()
  const updated = expenses.filter(e => e.id !== id)
  saveExpenses(updated)
  return updated
}

export function getSource(): string {
  return localStorage.getItem(KEYS.source) ?? 'directo'
}

export function saveSource(source: string): void {
  if (source) localStorage.setItem(KEYS.source, source)
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
