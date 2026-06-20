import type { Expense } from '../types'

const now = new Date()
const d = (daysAgo: number, hour = 12, minute = 0) => {
  const date = new Date(now)
  date.setDate(date.getDate() - daysAgo)
  date.setHours(hour, minute, 0, 0)
  return date.toISOString()
}

export const DEMO_EXPENSES: Expense[] = [
  { id: 'd1', amount: 12990, categoryId: 'delivery', emotionId: 'estresado', isImpulsive: true, trigger: 'Reunión difícil en el trabajo', date: d(0, 20, 30), createdAt: d(0, 20, 35) },
  { id: 'd2', amount: 3500, categoryId: 'transporte', emotionId: 'tranquilo', isImpulsive: false, date: d(0, 8, 15), createdAt: d(0, 8, 20) },
  { id: 'd3', amount: 45000, categoryId: 'ropa', emotionId: 'ansioso', isImpulsive: true, trigger: 'Quería sentirme mejor', note: 'Una polera que no necesitaba', date: d(1, 14, 0), createdAt: d(1, 14, 5) },
  { id: 'd4', amount: 8500, categoryId: 'alimentacion', emotionId: 'feliz', isImpulsive: false, date: d(1, 13, 30), createdAt: d(1, 13, 35) },
  { id: 'd5', amount: 29990, categoryId: 'compras_online', emotionId: 'aburrido', isImpulsive: true, trigger: 'Estaba en casa sin hacer nada', date: d(2, 22, 0), createdAt: d(2, 22, 5) },
  { id: 'd6', amount: 6990, categoryId: 'entretenimiento', emotionId: 'feliz', isImpulsive: false, note: 'Netflix mensual', date: d(3, 10, 0), createdAt: d(3, 10, 5) },
  { id: 'd7', amount: 15500, categoryId: 'delivery', emotionId: 'cansado', isImpulsive: true, trigger: 'Sin energía para cocinar', date: d(3, 21, 0), createdAt: d(3, 21, 5) },
  { id: 'd8', amount: 4200, categoryId: 'transporte', emotionId: 'estresado', isImpulsive: false, date: d(4, 7, 45), createdAt: d(4, 7, 50) },
  { id: 'd9', amount: 79000, categoryId: 'ropa', emotionId: 'frustrado', isImpulsive: true, trigger: 'Mal día, quería recompensarme', date: d(4, 18, 0), createdAt: d(4, 18, 5) },
  { id: 'd10', amount: 12000, categoryId: 'salud', emotionId: 'tranquilo', isImpulsive: false, date: d(5, 11, 0), createdAt: d(5, 11, 5) },
  { id: 'd11', amount: 9800, categoryId: 'alimentacion', emotionId: 'ansioso', isImpulsive: false, date: d(5, 13, 0), createdAt: d(5, 13, 5) },
  { id: 'd12', amount: 34500, categoryId: 'compras_online', emotionId: 'triste', isImpulsive: true, trigger: 'Me sentía sola', note: 'Libros que tal vez lea', date: d(6, 16, 0), createdAt: d(6, 16, 5) },
  { id: 'd13', amount: 5000, categoryId: 'hogar', emotionId: 'tranquilo', isImpulsive: false, date: d(7, 10, 0), createdAt: d(7, 10, 5) },
  { id: 'd14', amount: 22000, categoryId: 'delivery', emotionId: 'estresado', isImpulsive: true, trigger: 'Deadline de proyecto', date: d(7, 20, 0), createdAt: d(7, 20, 5) },
  { id: 'd15', amount: 18900, categoryId: 'entretenimiento', emotionId: 'feliz', isImpulsive: false, note: 'Concierto planeado hace meses', date: d(8, 19, 0), createdAt: d(8, 19, 5) },
  { id: 'd16', amount: 3200, categoryId: 'transporte', emotionId: 'cansado', isImpulsive: false, date: d(9, 8, 0), createdAt: d(9, 8, 5) },
  { id: 'd17', amount: 55000, categoryId: 'regalos', emotionId: 'feliz', isImpulsive: false, note: 'Cumpleaños de mamá', date: d(10, 12, 0), createdAt: d(10, 12, 5) },
  { id: 'd18', amount: 11500, categoryId: 'delivery', emotionId: 'aburrido', isImpulsive: true, date: d(11, 21, 30), createdAt: d(11, 21, 35) },
  { id: 'd19', amount: 6700, categoryId: 'alimentacion', emotionId: 'tranquilo', isImpulsive: false, date: d(12, 13, 0), createdAt: d(12, 13, 5) },
  { id: 'd20', amount: 42000, categoryId: 'compras_online', emotionId: 'ansioso', isImpulsive: true, trigger: 'Sentí que necesitaba algo nuevo', date: d(13, 23, 0), createdAt: d(13, 23, 5) },
]
