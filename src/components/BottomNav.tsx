import { useLocation, useNavigate } from 'react-router-dom'
import { Home, PlusCircle, History, BarChart2, User } from 'lucide-react'

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Inicio', Icon: Home },
  { path: '/historial', label: 'Historial', Icon: History },
  { path: '/registrar', label: 'Registrar', Icon: PlusCircle, primary: true },
  { path: '/patrones', label: 'Patrones', Icon: BarChart2 },
  { path: '/perfil', label: 'Perfil', Icon: User },
]

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="bottom-nav safe-area-bottom fixed bottom-0 left-0 right-0 z-50">
      <div className="flex items-center justify-around px-2 pt-2 pb-1 max-w-md mx-auto">
        {NAV_ITEMS.map(({ path, label, Icon, primary }) => {
          const active = location.pathname === path
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                primary
                  ? 'relative -mt-6'
                  : active
                  ? 'text-violet-400'
                  : 'text-gray-500'
              }`}
            >
              {primary ? (
                <div className="w-14 h-14 rounded-full bg-valor-gradient flex items-center justify-center shadow-valor-lg">
                  <Icon size={26} className="text-white" />
                </div>
              ) : (
                <>
                  <Icon
                    size={22}
                    className={active ? 'text-violet-400' : 'text-gray-500'}
                    strokeWidth={active ? 2.5 : 1.8}
                  />
                  <span className={`text-xs font-body ${active ? 'text-violet-400' : 'text-gray-500'}`}>
                    {label}
                  </span>
                </>
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
