# 08 — Launch Checklist: Primeros Usuarios

## 1. Despliegue en Vercel (10 minutos)

### Paso a paso

1. Ve a **https://vercel.com** → Sign up con tu cuenta de GitHub (`heccortes-jpg`)
2. Click **"Add New… → Project"**
3. En "Import Git Repository" busca **`heccortes-jpg/Claude-Code`** → click **Import**
4. Configura el proyecto:
   - **Framework Preset**: Vite
   - **Root Directory**: `.` (raíz del repo)
   - **Build Command**: `npm run build` *(ya viene por defecto)*
   - **Output Directory**: `dist`
   - **Branch**: `claude/nice-wozniak-5nzrs2`
5. Click **Deploy** → espera ~2 minutos
6. Vercel te da una URL tipo `valor-app-heccortes.vercel.app`

### Dominio personalizado (opcional, gratis en Vercel)
- En Settings → Domains → agrega `valor.app` o `usavalor.com` si tienes uno
- Si no tienes dominio, la URL de Vercel funciona perfectamente para los primeros usuarios

### Variables de entorno
- No necesitas ninguna — la app usa solo localStorage

---

## 2. Links de tracking pre-construidos

Reemplaza `TU-URL` con tu URL de Vercel.

| Canal | Link |
|-------|------|
| WhatsApp personal | `TU-URL?de=wa_personal` |
| WhatsApp grupo trabajo | `TU-URL?de=wa_trabajo` |
| LinkedIn post | `TU-URL?de=linkedin` |
| Instagram bio | `TU-URL?de=ig` |
| Email | `TU-URL?de=email` |
| Slack/Discord | `TU-URL?de=slack` |

Ejemplo real: `https://valor-app.vercel.app?de=wa_personal`

---

## 3. Mensaje para WhatsApp (copia y pega)

### Versión corta (amigos cercanos)
```
Oye, estoy probando una app que hice para entender mejor mis gastos — 
no solo cuánto gastas sino *por qué* (si estabas aburrido, ansioso, celebrando, etc).

¿La pruebas y me dices qué te parece? Solo toma 2 minutos:
👉 TU-URL?de=wa_personal

Feedback honesto bienvenido 🙏
```

### Versión grupo (colegas / equipo)
```
🧪 Experimento: estoy construyendo una app de finanzas personales 
que mapea el estado emocional detrás de cada gasto.

La idea: si sabes que gastas más cuando estás estresado, 
puedes actuar antes — no después.

¿Alguien la prueba esta semana y me da 5 minutos de feedback?
👉 TU-URL?de=wa_trabajo

(es gratis, sin registro de email, sin datos en servidor)
```

---

## 4. Post para LinkedIn

```
Llevo semanas construyendo algo que me obsesiona:

¿Cuántas veces compraste algo por ansiedad, aburrimiento o FOMO 
y solo te diste cuenta después?

Valor es una app que registra el estado emocional detrás de cada gasto.
No para juzgarte — para que veas los patrones antes de que te controlen.

Versión beta disponible ahora. Sin registro, sin datos en servidor, 
100% en tu teléfono.

👉 TU-URL?de=linkedin

¿Le preguntas a alguien que siempre dice "no sé en qué gasté el sueldo"? 
Etiquétalo 👇

#FinanzasPersonales #Bienestar #ProductoDigital #Beta
```

---

## 5. Preguntas de feedback (enviar a los primeros 10 testers)

Manda estas preguntas por WhatsApp después de que prueben la app:

```
Gracias por probar Valor 🙏 3 preguntas rápidas:

1. ¿Qué fue lo primero que hiciste al abrirla?
2. ¿Hubo algo confuso o que no entendiste?
3. Del 1 al 10, ¿se lo recomendarías a alguien que quiere 
   controlar mejor sus gastos?

(No necesito respuestas perfectas — la primera reacción es la más valiosa)
```

---

## 6. Métricas a revisar después de la primera semana

Puedes ver los eventos guardados abriendo la app en tu teléfono y escribiendo esto en la consola del navegador:

```js
JSON.parse(localStorage.getItem('valor_events') || '[]')
```

Eventos que rastreamos:
- `landing_view` — llegaron a la app
- `onboarding_start` — tocaron "Comenzar"
- `onboarding_complete` — terminaron el onboarding
- `expense_saved` — registraron al menos un gasto
- `patterns_viewed` — exploraron sus patrones
- `premium_interest` — tocaron un botón de Valor Premium

**Tasa de activación clave**: `onboarding_complete` / `landing_view`  
**Tasa de retención proxy**: usuarios con 3+ `expense_saved`

---

## 7. Próximos hitos post-lanzamiento

| Hito | Trigger |
|------|---------|
| Iteración UX | 5+ feedbacks recibidos |
| Notificaciones push | 20+ usuarios activos |
| Backend / auth | 50+ usuarios, pedido explícito de sync |
| Valor Premium real (pago) | 10 personas dicen "pagaría por esto" |
| App Store / Play Store | 100+ usuarios activos |
