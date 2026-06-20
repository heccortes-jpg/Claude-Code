import type { Emotion } from '../types'

export const EMOTIONS: Emotion[] = [
  { id: 'tranquilo', label: 'Tranquilo/a', emoji: '😌', color: '#34D399', bgColor: 'rgba(52,211,153,0.15)' },
  { id: 'feliz', label: 'Feliz', emoji: '😊', color: '#FBBF24', bgColor: 'rgba(251,191,36,0.15)' },
  { id: 'ansioso', label: 'Ansioso/a', emoji: '😰', color: '#F87171', bgColor: 'rgba(248,113,113,0.15)' },
  { id: 'estresado', label: 'Estresado/a', emoji: '😤', color: '#FB923C', bgColor: 'rgba(251,146,60,0.15)' },
  { id: 'aburrido', label: 'Aburrido/a', emoji: '😑', color: '#94A3B8', bgColor: 'rgba(148,163,184,0.15)' },
  { id: 'triste', label: 'Triste', emoji: '😢', color: '#60A5FA', bgColor: 'rgba(96,165,250,0.15)' },
  { id: 'impulsivo', label: 'Impulsivo/a', emoji: '⚡', color: '#C026D3', bgColor: 'rgba(192,38,211,0.15)' },
  { id: 'cansado', label: 'Cansado/a', emoji: '😴', color: '#A78BFA', bgColor: 'rgba(167,139,250,0.15)' },
  { id: 'frustrado', label: 'Frustrado/a', emoji: '😠', color: '#EF4444', bgColor: 'rgba(239,68,68,0.15)' },
  { id: 'otro', label: 'Otro', emoji: '🤔', color: '#8B5CF6', bgColor: 'rgba(139,92,246,0.15)' },
]

export const getEmotion = (id: string): Emotion =>
  EMOTIONS.find(e => e.id === id) ?? EMOTIONS[EMOTIONS.length - 1]
