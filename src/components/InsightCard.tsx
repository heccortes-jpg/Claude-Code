interface InsightCardProps {
  text: string
}

export function InsightCard({ text }: InsightCardProps) {
  return (
    <div className="glass-card p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-valor-gradient rounded-l-2xl" />
      <div className="pl-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Insight</span>
          <span className="text-base">✨</span>
        </div>
        <p className="text-sm text-valor-text leading-relaxed">{text}</p>
      </div>
    </div>
  )
}
