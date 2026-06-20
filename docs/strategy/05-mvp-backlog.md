# Backlog MVP — Valor

**Fecha:** 2026-06-20

---

## Pantallas construidas en v0.1.0 ✅

| Pantalla | Estado | Notas |
|---------|--------|-------|
| Landing | ✅ | Tracking ?de=, features, CTA |
| Onboarding (4 pasos) | ✅ | Nombre, objetivo, frecuencia, tono |
| Dashboard | ✅ | KPIs semanales, insight, accesos rápidos |
| Registro de gasto | ✅ | Monto, categoría, emoción, detalles |
| Historial | ✅ | Lista, búsqueda, filtros, eliminación con confirmación |
| Mapa de patrones | ✅ | Gráfico semanal, emociones, categorías, pie impulsivo |
| Perfil y privacidad | ✅ | Stats, premium, privacidad, eliminar cuenta |

---

## Funciones construidas en v0.1.0 ✅

- [x] Persistencia localStorage
- [x] 10 categorías de gasto
- [x] 10 emociones con colores
- [x] Registro impulsivo/planificado
- [x] Detonante y nota opcionales
- [x] 20 datos demo precargados
- [x] Generación automática de insights contextuales
- [x] Tracking de fuente por ?de=
- [x] Protección de rutas (RequireAuth)
- [x] Confirmación antes de eliminar
- [x] Estados vacíos con acción
- [x] Diseño mobile-first
- [x] Identidad visual Valor (gradientes, glassmorphism)
- [x] Logo SVG con degradado
- [x] Bottom navigation

---

## Backlog v0.2.0 — Autenticación y Backend

**Prioridad: Alta**

- [ ] Integración Supabase (auth + DB)
- [ ] Login con email/magic link
- [ ] Login con Google OAuth
- [ ] Sincronización entre dispositivos
- [ ] Exportar datos a CSV
- [ ] PWA (installable, offline básico)

---

## Backlog v0.3.0 — Retención y Monetización

**Prioridad: Media**

- [ ] Notificaciones push (recordatorio de registro)
- [ ] Comparación semana vs semana anterior
- [ ] Análisis por hora del día
- [ ] Racha de días con registro
- [ ] Plan Premium real (pasarela de pago)
- [ ] Modo oscuro/claro (actualmente solo oscuro)

---

## Backlog v0.4.0 — Insights avanzados

**Prioridad: Media**

- [ ] Predicción de patrones (ML básico)
- [ ] Alertas personalizadas ("esta semana gastaste más en delivery")
- [ ] Resumen mensual automático
- [ ] Etiquetas personalizadas
- [ ] Metas de gasto por categoría

---

## NO construir hasta validar ❌

- Conexión bancaria / Open Banking
- Dashboard corporativo con datos individuales
- Chatbot financiero
- Marketplace de productos financieros
- Redes sociales internas (compartir gastos)
- Recomendaciones financieras automatizadas garantizadas
- Integración con PREVIRED o liquidaciones de sueldo

---

## Hipótesis a validar con el MVP

1. ¿Los usuarios registran más de 3 gastos en la primera semana?
2. ¿El registro de emoción agrega valor percibido vs una app de gasto simple?
3. ¿El insight generado es relevante y no invasivo?
4. ¿El onboarding de 4 pasos tiene baja tasa de abandono?
5. ¿Existe disposición a pagar $2.990 CLP/mes por la versión premium?

---

## Métricas a medir desde el primer día

| Métrica | Cómo medir |
|---------|-----------|
| Visitas landing | Analytics URL |
| Onboarding completado | localStorage event |
| Primer gasto registrado | localStorage event |
| Gastos en día 7 | localStorage timestamp |
| Interés en Premium | Clics en botón premium |
| Fuente de adquisición | ?de= parameter |
