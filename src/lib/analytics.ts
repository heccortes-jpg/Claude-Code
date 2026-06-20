const EVENTS_KEY = 'valor_events'

type EventName =
  | 'landing_view'
  | 'onboarding_start'
  | 'onboarding_complete'
  | 'expense_saved'
  | 'patterns_viewed'
  | 'premium_interest'
  | 'account_deleted'

interface ValorEvent {
  name: EventName
  ts: string
  props?: Record<string, string | number | boolean>
}

function getEvents(): ValorEvent[] {
  try {
    return JSON.parse(localStorage.getItem(EVENTS_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function track(name: EventName, props?: ValorEvent['props']): void {
  try {
    const events = getEvents()
    events.push({ name, ts: new Date().toISOString(), props })
    // Keep last 500 events only
    const trimmed = events.slice(-500)
    localStorage.setItem(EVENTS_KEY, JSON.stringify(trimmed))
  } catch {
    // Never throw — analytics must be silent
  }
}

export function getEventSummary(): Record<string, number> {
  const events = getEvents()
  return events.reduce<Record<string, number>>((acc, e) => {
    acc[e.name] = (acc[e.name] ?? 0) + 1
    return acc
  }, {})
}

export function getDaysSinceFirst(name: EventName): number | null {
  const events = getEvents().filter(e => e.name === name)
  if (!events.length) return null
  const first = new Date(events[0].ts)
  const now = new Date()
  return Math.floor((now.getTime() - first.getTime()) / (1000 * 60 * 60 * 24))
}
