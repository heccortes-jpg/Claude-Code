import { useState, useEffect } from 'react'
import { Download, X } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallBanner() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [dismissed, setDismissed] = useState(() =>
    localStorage.getItem('valor_install_dismissed') === '1'
  )

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  if (!prompt || dismissed) return null

  const handleInstall = async () => {
    await prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') setPrompt(null)
  }

  const handleDismiss = () => {
    localStorage.setItem('valor_install_dismissed', '1')
    setDismissed(true)
  }

  return (
    <div className="glass-card p-4 flex items-center gap-3 fade-enter"
      style={{ borderColor: 'rgba(139,92,246,0.4)' }}>
      <div className="w-10 h-10 rounded-xl bg-valor-gradient flex items-center justify-center flex-shrink-0">
        <Download size={18} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-valor-text">Instalar Valor</p>
        <p className="text-xs text-valor-muted">Acceso directo desde tu pantalla de inicio</p>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={handleInstall}
          className="text-xs px-3 py-1.5 rounded-full bg-valor-gradient text-white font-semibold"
        >
          Instalar
        </button>
        <button onClick={handleDismiss} className="text-valor-muted p-1">
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
