interface EmptyStateProps {
  emoji?: string
  title: string
  description: string
  action?: { label: string; onClick: () => void }
}

export function EmptyState({ emoji = '🌱', title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="text-lg font-display font-semibold text-valor-text mb-2">{title}</h3>
      <p className="text-sm text-valor-muted leading-relaxed max-w-xs">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 btn-primary"
          style={{ width: 'auto', padding: '12px 24px' }}
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
