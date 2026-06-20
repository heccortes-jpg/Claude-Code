import type { Category } from '../types'

export const CATEGORIES: Category[] = [
  { id: 'alimentacion', label: 'Alimentación', emoji: '🍽️', color: '#FBBF24' },
  { id: 'delivery', label: 'Delivery', emoji: '🛵', color: '#FB923C' },
  { id: 'transporte', label: 'Transporte', emoji: '🚌', color: '#60A5FA' },
  { id: 'ropa', label: 'Ropa', emoji: '👗', color: '#EC4899' },
  { id: 'entretenimiento', label: 'Entretenimiento', emoji: '🎭', color: '#A78BFA' },
  { id: 'compras_online', label: 'Compras online', emoji: '📦', color: '#C026D3' },
  { id: 'salud', label: 'Salud', emoji: '💊', color: '#34D399' },
  { id: 'hogar', label: 'Hogar', emoji: '🏠', color: '#94A3B8' },
  { id: 'regalos', label: 'Regalos', emoji: '🎁', color: '#F472B6' },
  { id: 'otros', label: 'Otros', emoji: '📋', color: '#8B5CF6' },
]

export const getCategory = (id: string): Category =>
  CATEGORIES.find(c => c.id === id) ?? CATEGORIES[CATEGORIES.length - 1]
