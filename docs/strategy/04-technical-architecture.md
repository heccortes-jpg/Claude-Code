# Arquitectura Técnica — Valor MVP

**Fecha:** 2026-06-20  
**Versión:** 0.1.0

---

## 1. Resumen ejecutivo

Valor MVP es una Single Page Application (SPA) estática construida sobre React + TypeScript + Vite. No requiere backend para la versión inicial: toda la persistencia es localStorage. La capa de servicios está diseñada para migrar a Supabase en la siguiente versión sin cambiar los componentes de UI.

---

## 2. Stack tecnológico

| Capa | Tecnología | Versión | Justificación |
|------|-----------|---------|--------------|
| UI | React | 18.3 | Ecosistema maduro, composable |
| Tipos | TypeScript | 5.2 | Seguridad, documentación inline |
| Build | Vite | 5.2 | Extremadamente rápido, HMR óptimo |
| Estilos | Tailwind CSS | 3.4 | Utility-first, tema personalizable |
| Routing | React Router | 6.23 | Estándar de facto para SPAs |
| Gráficos | Recharts | 2.12 | Composable, responsive, accesible |
| Iconos | Lucide React | 0.395 | Ligero, consistente |
| Persistencia | localStorage | nativa | Sin servidor requerido para MVP |

---

## 3. Arquitectura de datos

### Modelos principales

```typescript
Expense {
  id: string
  amount: number          // CLP
  categoryId: CategoryId
  emotionId: EmotionId
  isImpulsive: boolean
  trigger?: string        // detonante
  note?: string
  date: string            // ISO 8601
  createdAt: string       // ISO 8601
}

UserProfile {
  id: string
  name: string
  onboardingCompleted: boolean
  onboarding?: OnboardingAnswers
  createdAt: string
  source?: string         // ?de= tracking
}
```

### Claves de localStorage

| Clave | Contenido |
|-------|-----------|
| `valor_user` | UserProfile serializado |
| `valor_expenses` | Expense[] serializado |
| `valor_source` | string (canal de adquisición) |

### Migración a Supabase (v2)

Reemplazar las funciones en `src/lib/storage.ts` por llamadas a `@supabase/supabase-js`. La interfaz pública es idéntica, por lo que ningún componente de UI requiere cambios.

```typescript
// Hoy (localStorage)
export function getExpenses(): Expense[] { ... }

// Mañana (Supabase)
export async function getExpenses(): Promise<Expense[]> {
  const { data } = await supabase.from('expenses').select('*')
  return data ?? []
}
```

---

## 4. Estructura del proyecto

```
src/
├── components/     # UI reutilizable (BottomNav, Logo, Card, EmptyState...)
├── data/           # Catálogos estáticos (emociones, categorías, datos demo)
├── lib/            # Lógica sin estado de UI
│   ├── storage.ts  # CRUD de datos
│   └── insights.ts # Análisis, formateo, generación de insights
├── pages/          # Una por ruta
└── types/          # Tipos TypeScript compartidos
```

**Principio:** los `pages/` usan `lib/` y `components/`. Los `components/` no importan `pages/`. Los `lib/` no importan React.

---

## 5. Flujo de navegación

```
Landing (/)
    └── Onboarding (/onboarding)
            └── Dashboard (/dashboard) ← entrada principal
                    ├── Registrar (/registrar)
                    ├── Historial (/historial)
                    ├── Patrones (/patrones)
                    └── Perfil (/perfil)
```

Rutas protegidas con `RequireAuth` que verifica `user.onboardingCompleted`.

---

## 6. Sistema de datos demo

`src/data/demo.ts` contiene 20 gastos representativos generados dinámicamente con fechas relativas (`daysAgo`). Se carga cuando `localStorage` no tiene datos propios del usuario. Al registrar el primer gasto propio, se reemplaza la lista demo.

---

## 7. Análisis de insights

`src/lib/insights.ts` contiene lógica pura (sin efectos secundarios):

- `getTopEmotion(expenses)` — emoción más frecuente
- `getTopCategory(expenses)` — categoría con mayor gasto acumulado
- `getImpulsivePercentage(expenses)` — % de gastos impulsivos
- `generateInsight(expenses)` — texto contextual basado en patrones reales
- `getWeeklyChartData(expenses)` — datos para gráfico de 7 días
- `getEmotionChartData(expenses)` — distribución por emoción
- `getCategoryChartData(expenses)` — distribución por categoría

---

## 8. Tracking de fuente

El parámetro `?de=` en la URL se captura en Landing y se guarda en localStorage. Permite medir la eficacia de cada canal de adquisición sin herramientas externas.

Canales definidos: `whatsapp`, `linkedin`, `instagram`, `tiktok`, `referido`, `empresa`, `directo`

---

## 9. Diseño

- **Mobile-first**: max-width 448px en todos los layouts
- **Paleta**: fondo `#0D0B1E`, violeta `#8B5CF6`, fucsia `#C026D3`, rosado `#EC4899`
- **Glassmorphism**: backdrop-blur + rgba borders en todas las cards
- **Tipografía**: Plus Jakarta Sans (display) + Inter (cuerpo)
- **Bottom nav fijo**: acceso siempre visible a las 5 secciones principales

---

## 10. Limitaciones del MVP y deuda técnica

| Item | Impacto | Prioridad v2 |
|------|---------|-------------|
| Sin sincronización entre dispositivos | Alto si el usuario cambia de teléfono | Alta |
| Sin autenticación real | No puede hacer B2B2C aún | Alta |
| Bundle grande (~600KB) | TTI lento en redes lentas | Media |
| Sin notificaciones push | Reduce retención | Media |
| Sin modo offline explícito | No crítico para MVP | Baja |
| Sin tests automatizados | Riesgo de regresiones | Media |

---

## 11. Comandos de desarrollo

```bash
npm run dev      # Servidor de desarrollo (HMR)
npm run build    # Build de producción (TypeScript + Vite)
npm run preview  # Previsualizar build local
npm run lint     # Linting ESLint
```

---

## 12. Despliegue recomendado

**Vercel** (primera opción):
- Push a rama → deploy automático
- Preview URLs por PR
- CDN global incluido
- Configurar: `Output Directory: dist`, `Framework: Vite`

**Netlify** (alternativa):
- Necesita configurar `_redirects` para React Router:
  ```
  /* /index.html 200
  ```
