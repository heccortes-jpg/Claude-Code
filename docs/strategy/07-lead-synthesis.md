# Síntesis del Lead — Valor MVP

**Fecha:** 2026-06-20  
**Autor:** Lead Product Builder

---

## 1. Qué existía antes

El repositorio estaba completamente vacío. Sin commits, sin código, sin estructura. Punto de partida cero.

---

## 2. Qué se construyó

### Aplicación MVP completa

| Elemento | Descripción |
|---------|-------------|
| **Stack** | React 18 + TypeScript + Vite + Tailwind CSS |
| **Pantallas** | 7 (Landing, Onboarding, Dashboard, Registro, Historial, Patrones, Perfil) |
| **Componentes** | 6 compartidos (Logo, Layout, BottomNav, EmptyState, InsightCard, Card) |
| **Módulos de lógica** | 2 (storage.ts, insights.ts) |
| **Tipos** | 1 archivo central con 8+ tipos |
| **Datos demo** | 20 gastos representativos con fechas relativas |
| **Build** | Verificado sin errores de TypeScript ni Vite |

### Documentos estratégicos

| Documento | Agente | Estado |
|-----------|--------|--------|
| 00-project-audit.md | Lead | ✅ |
| 01-brand-system.md | valor-brand-designer | ✅ |
| 02-growth-marketing.md | valor-growth-marketing | ✅ |
| 03-commercial-market.md | valor-commercial-market | ✅ |
| 04-technical-architecture.md | Lead | ✅ |
| 05-mvp-backlog.md | Lead | ✅ |
| 06-qa-privacy-review.md | valor-qa-privacy | ✅ |
| 07-lead-synthesis.md | Lead | ✅ |

---

## 3. Decisiones clave

### Stack: No reinventar

El stack React + Vite + Tailwind es maduro, rápido de desplegar y ampliamente conocido. No se usa Next.js porque no hay necesidad de SSR en un MVP sin SEO crítico. No se usa Supabase todavía porque añade fricción de configuración innecesaria para validar.

### Persistencia: localStorage primero

Decisión deliberada. La app funciona sin internet, sin cuenta, sin backend. El usuario tiene control total de sus datos. La migración a Supabase en v2 solo requiere cambiar `src/lib/storage.ts`.

### Diseño: Mobile-first obligatorio

Máximo 448px de ancho en todos los layouts. Bottom nav fijo. Touch targets de ≥44px. El usuario objetivo usa smartphone, no desktop.

### Idioma: Español de Chile

Formato de moneda CLP (`Intl.NumberFormat('es-CL')`). Vocabulario cercano. Sin anglicismos innecesarios.

---

## 4. Qué NO se construyó (y por qué)

| No construido | Por qué |
|--------------|---------|
| Autenticación | Agrega fricción. Primero validar retención |
| Backend / API | Sin usuarios validados, sin necesidad |
| Pagos reales | Sin datos de disposición a pagar aún |
| Dashboard empresarial | Riesgo legal y ético sin validación |
| Chatbot IA | Complejidad innecesaria para v0 |
| Conexión bancaria | Regulación y privacidad: fuera de MVP |
| Notificaciones push | Requiere PWA + service worker |

---

## 5. Modelo comercial recomendado

### Fase 0 (actual): Validación gratuita
- App disponible sin pago
- Capturar emails / interés en lista de espera
- Medir retención a 7 días

### Fase 1 (30-60 días): Oferta fundador
- Pago único $14.990 CLP para acceso de por vida al plan premium
- Límite de 100 fundadores para crear urgencia
- Sin implementar pagos reales todavía: validar demanda con formulario de interés

### Fase 2 (60-90 días): Suscripción
- $2.990 CLP/mes con plan gratuito limitado
- Premium: insights avanzados, exportación, comparación histórica

### Fase 3 (90+ días): B2B2C
- Explorar con 2-3 empresas piloto
- Solo si B2C tiene retención comprobada
- Datos agregados anónimos, nunca individuales al empleador

---

## 6. Conflictos resueltos

| Conflicto | Resolución |
|-----------|-----------|
| Branding vs. funcionalidad | Ambos: diseño premium SIN sacrificar usabilidad |
| Supabase vs. localStorage | localStorage en v0, Supabase en v1 |
| B2C vs. B2B2C | B2C primero, siempre |
| Precio alto vs. bajo | Probar ambos con oferta fundador ($14.990) y mensual ($2.990) |
| Privacidad vs. análisis | Datos locales, insights generados en el cliente |

---

## 7. Plan de implementación por sprints

### Sprint actual (Semana 1): ✅ Completado
- Auditoría del repositorio
- Construcción del MVP completo
- Documentos estratégicos (branding, marketing, comercial, técnico, QA)

### Sprint 2 (Semana 2-3): Despliegue y primeros usuarios
- Desplegar en Vercel
- Configurar dominio
- Lanzar en WhatsApp y LinkedIn con ?de= tracking
- Capturar lista de espera manual (Notion o Google Forms)
- Meta: 50 personas que prueben la app

### Sprint 3 (Semana 4-6): Iteración post-feedback
- Revisar los 5 hallazgos de mayor impacto del QA
- Ajustar insights según feedback de usuarios reales
- Implementar PWA básica
- Meta: 10 usuarios activos en día 7

### Sprint 4 (Mes 2): Autenticación
- Integrar Supabase Auth (magic link)
- Migrar datos de localStorage a cloud
- Meta: usuarios pueden cambiar de dispositivo

### Sprint 5 (Mes 3): Monetización
- Implementar Stripe o Transbank
- Activar plan Premium
- Meta: 5 pagos reales validados

---

## 8. Próximos pasos priorizados

**Esta semana:**
1. Desplegar la app en Vercel
2. Configurar un dominio memorable
3. Compartir con 10 personas cercanas para feedback inicial

**Próxima semana:**
1. Crear contenido de lanzamiento (post LinkedIn, Reel)
2. Abrir lista de interés en Premium
3. Analizar primeros datos de retención

**Próximos 30 días:**
1. Iterar diseño y copy basado en feedback real
2. Iniciar conversaciones B2B2C con 2-3 empresas objetivo
3. Evaluar si tiene sentido implementar autenticación
4. Publicar primer reporte de métricas interno

---

## 9. Criterios de éxito del MVP

| Métrica | Meta mínima | Meta ideal |
|---------|-------------|-----------|
| Onboarding completado | >60% de quienes inician | >80% |
| Primer gasto registrado | >50% de quienes completan onboarding | >70% |
| Gastos en día 7 | >20% retención | >35% |
| Gastos promedio por usuario activo | ≥5 registros por semana | ≥10 |
| Interés declarado en Premium | >15% de usuarios activos | >30% |
