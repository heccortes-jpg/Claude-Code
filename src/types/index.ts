export type EmotionId =
  | 'tranquilo'
  | 'ansioso'
  | 'estresado'
  | 'aburrido'
  | 'triste'
  | 'feliz'
  | 'impulsivo'
  | 'cansado'
  | 'frustrado'
  | 'otro'

export type CategoryId =
  | 'alimentacion'
  | 'delivery'
  | 'transporte'
  | 'ropa'
  | 'entretenimiento'
  | 'compras_online'
  | 'salud'
  | 'hogar'
  | 'regalos'
  | 'otros'

export interface Emotion {
  id: EmotionId
  label: string
  emoji: string
  color: string
  bgColor: string
}

export interface Category {
  id: CategoryId
  label: string
  emoji: string
  color: string
}

export interface Expense {
  id: string
  amount: number
  categoryId: CategoryId
  emotionId: EmotionId
  isImpulsive: boolean
  trigger?: string
  note?: string
  date: string
  createdAt: string
}

export type OnboardingGoal =
  | 'gastos_impulsivos'
  | 'ansiedad_dinero'
  | 'organizacion'
  | 'habitos'
  | 'otro'

export type OnboardingFrequency =
  | 'todos_los_dias'
  | 'algunas_veces'
  | 'cuando_gaste_mucho'

export type OnboardingTone =
  | 'directo'
  | 'cercano'
  | 'reflexivo'
  | 'minimalista'

export interface OnboardingAnswers {
  goal: OnboardingGoal
  frequency: OnboardingFrequency
  tone: OnboardingTone
}

export interface UserProfile {
  id: string
  name: string
  onboardingCompleted: boolean
  onboarding?: OnboardingAnswers
  createdAt: string
  source?: string
}
