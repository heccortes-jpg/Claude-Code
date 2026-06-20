import { BottomNav } from './BottomNav'

interface LayoutProps {
  children: React.ReactNode
  hideNav?: boolean
}

export function Layout({ children, hideNav = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-valor-bg max-w-md mx-auto relative">
      <div className={hideNav ? 'min-h-screen' : 'pb-24'}>
        {children}
      </div>
      {!hideNav && <BottomNav />}
    </div>
  )
}
