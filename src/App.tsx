import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Onboarding } from './pages/Onboarding'
import { Dashboard } from './pages/Dashboard'
import { Register } from './pages/Register'
import { History } from './pages/History'
import { Patterns } from './pages/Patterns'
import { Profile } from './pages/Profile'
import { NotFound } from './pages/NotFound'
import { getUser } from './lib/storage'

function RequireAuth({ children }: { children: React.ReactNode }) {
  const user = getUser()
  if (!user?.onboardingCompleted) return <Navigate to="/" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/registrar" element={<RequireAuth><Register /></RequireAuth>} />
        <Route path="/historial" element={<RequireAuth><History /></RequireAuth>} />
        <Route path="/patrones" element={<RequireAuth><Patterns /></RequireAuth>} />
        <Route path="/perfil" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
