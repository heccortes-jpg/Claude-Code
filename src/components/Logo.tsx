interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showTagline?: boolean
}

const sizes = {
  sm: { svg: 24, text: 'text-lg', sub: 'text-xs' },
  md: { svg: 32, text: 'text-2xl', sub: 'text-sm' },
  lg: { svg: 48, text: 'text-4xl', sub: 'text-base' },
}

export function Logo({ size = 'md', showTagline = false }: LogoProps) {
  const s = sizes[size]
  return (
    <div className="flex items-center gap-3">
      <svg width={s.svg} height={s.svg} viewBox="0 0 32 32" fill="none">
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#C026D3" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        <path
          d="M6 24 L16 8 L26 24"
          stroke="url(#logoGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 20 L16 8 L22 20"
          stroke="url(#logoGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
      </svg>
      <div>
        <div className={`${s.text} font-display font-extrabold tracking-tight valor-gradient-text`}>
          VALOR
        </div>
        {showTagline && (
          <div className={`${s.sub} text-valor-muted font-body`}>
            Finanzas Emocionales
          </div>
        )}
      </div>
    </div>
  )
}
