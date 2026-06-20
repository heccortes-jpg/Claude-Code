# VALOR — Finanzas Emocionales

> Tus finanzas tienen emociones.

Valor es una aplicación de bienestar financiero para Chile y Latinoamérica. Ayuda a registrar gastos asociados a emociones para descubrir patrones de consumo, sin juicios ni lenguaje financiero complejo.

---

## Stack tecnológico

- **React 18** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS** — estilos con tema personalizado
- **React Router v6** — navegación
- **Recharts** — gráficos
- **Lucide React** — iconos
- **localStorage** — persistencia local (sin backend requerido)

---

## Instalación y desarrollo

```bash
# Clonar el repositorio
git clone <repo-url>
cd valor-app

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar producción
npm run preview
```

El servidor de desarrollo inicia en `http://localhost:5173`

---

## Variables de entorno

Esta versión MVP no requiere variables de entorno. Todo funciona con localStorage.

Para versiones futuras con Supabase:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Estructura del proyecto

```
src/
├── components/       # Componentes reutilizables
│   ├── BottomNav.tsx
│   ├── EmptyState.tsx
│   ├── InsightCard.tsx
│   ├── Layout.tsx
│   └── Logo.tsx
├── data/             # Datos estáticos y demo
│   ├── categories.ts
│   ├── demo.ts
│   └── emotions.ts
├── lib/              # Lógica de negocio
│   ├── insights.ts   # Análisis y generación de insights
│   └── storage.ts    # CRUD localStorage
├── pages/            # Pantallas de la app
│   ├── Landing.tsx
│   ├── Onboarding.tsx
│   ├── Dashboard.tsx
│   ├── Register.tsx
│   ├── History.tsx
│   ├── Patterns.tsx
│   └── Profile.tsx
├── types/            # Tipos TypeScript
│   └── index.ts
├── App.tsx           # Rutas
├── main.tsx
└── index.css         # Estilos globales + clases utilitarias
```

---

## Pantallas del MVP

| Ruta | Pantalla | Descripción |
|------|---------|-------------|
| `/` | Landing | Presentación + tracking de fuente con `?de=` |
| `/onboarding` | Onboarding | 4 pasos de personalización |
| `/dashboard` | Dashboard | KPIs semanales + insight + acceso rápido |
| `/registrar` | Registro | Flujo de 4 pasos para registrar un gasto |
| `/historial` | Historial | Lista con filtros y eliminación |
| `/patrones` | Patrones | Gráficos: semanal, emociones, categorías |
| `/perfil` | Perfil | Datos, privacidad, premium, eliminación de cuenta |

---

## Tracking de fuente

La app captura automáticamente el parámetro `?de=` para análisis de adquisición:

```
https://tu-dominio.com/?de=whatsapp
https://tu-dominio.com/?de=linkedin
https://tu-dominio.com/?de=instagram
https://tu-dominio.com/?de=tiktok
https://tu-dominio.com/?de=referido
https://tu-dominio.com/?de=empresa
```

---

## Datos demo

La app incluye 20 gastos de demostración en `src/data/demo.ts` para que la experiencia sea usable desde el primer acceso. Estos se reemplazan automáticamente cuando el usuario registra sus propios gastos.

---

## Despliegue

La app es un SPA estático que puede desplegarse en:
- **Vercel** — `vercel deploy`
- **Netlify** — arrastrar la carpeta `dist/`
- **GitHub Pages** — con configuración de SPA redirect

Asegurarse de configurar el redirecto de rutas al `index.html` para que React Router funcione correctamente.

---

## Aviso importante

Valor no reemplaza asesoría financiera profesional ni apoyo de salud mental. No conecta cuentas bancarias. No vende datos de usuarios. No entrega información individual a empleadores.

---

## Próximas versiones

Ver `docs/strategy/05-mvp-backlog.md` para el backlog priorizado.

## Documentos estratégicos

| Documento | Contenido |
|-----------|-----------|
| `docs/strategy/00-project-audit.md` | Auditoría inicial |
| `docs/strategy/01-brand-system.md` | Sistema de marca |
| `docs/strategy/02-growth-marketing.md` | Estrategia de crecimiento |
| `docs/strategy/03-commercial-market.md` | Estrategia comercial |
| `docs/strategy/04-technical-architecture.md` | Arquitectura técnica |
| `docs/strategy/05-mvp-backlog.md` | Backlog priorizado |
| `docs/strategy/06-qa-privacy-review.md` | QA y privacidad |
| `docs/strategy/07-lead-synthesis.md` | Síntesis ejecutiva |
