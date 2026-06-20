# QA & Revisión de Privacidad — Valor MVP
**Agente:** `valor-qa-privacy`
**Fecha:** 2026-06-20
**Versión revisada:** v0.1.0 — MVP beta

---

## 1. Flujo de Onboarding

**Archivo:** `src/pages/Onboarding.tsx`

### Lo que funciona
- El flujo de 4 pasos (nombre → objetivo → frecuencia → tono) es claro y progresivo.
- La barra de progreso `{step + 1}/4` da contexto al usuario sobre dónde está.
- La validación del nombre en `handleNameNext()` (línea 40-43) impide avanzar con campo vacío y muestra mensaje de error claro.
- Los botones "← Volver" en pasos 1, 2 y 3 permiten corregir respuestas anteriores.

### Bugs y riesgos reales
- **Bug — Pasos 1, 2 y 3 no requieren selección para guardar por defecto.** En `handleComplete()` (líneas 46-61), si el usuario llega al paso 3 sin haber seleccionado objetivo o frecuencia, se usan fallbacks silenciosos (`goal ?? 'otro'`, `frequency ?? 'algunas_veces'`, `tone ?? 'cercano'`). El botón "Entrar a Valor ✨" está `disabled={!tone}` (línea 214), lo que bloquea el guardado sin tono. Sin embargo, en el paso 1 el botón de avance es `disabled={!goal}` (línea 198) — si el usuario navega con "Volver" desde paso 2 y luego "Continuar" sin seleccionar, es bloqueado correctamente. El riesgo existe si la lógica de navegación se extiende en el futuro.
- **Riesgo de UX — Sin indicador de selección antes de continuar en pasos 1 y 2.** El chip seleccionado cambia visualmente con la clase `selected`, pero no hay texto de confirmación tipo "Elegiste: Gastos impulsivos". Si el usuario hace tap sin darse cuenta en un chip diferente, puede avanzar con una respuesta incorrecta sin notarlo.
- **Riesgo de UX — El onboarding no tiene salida explícita.** No hay botón para cerrar o saltar el flujo. Si alguien llega por error, debe usar el botón atrás del navegador, lo que podría romper la sesión o dejarla en estado incompleto.

### Mejoras opcionales
- Mostrar un resumen de las respuestas antes de guardar en el paso 3 aumentaría la confianza.
- Agregar `autocomplete="given-name"` al input del nombre en el paso 0 mejora la experiencia en móvil.

---

## 2. Registro de Gasto (flujo de 4 pasos)

**Archivo:** `src/pages/Register.tsx`

### Lo que funciona
- La validación del monto en `handleAmountNext()` (líneas 24-29) rechaza vacío, cero y montos mayores a $99.999.999.
- El formato visual en tiempo real (`formatDisplayAmount`, líneas 51-55) permite al usuario ver `$12.990 CLP` mientras escribe.
- El paso de "detalles" es correctamente opcional: trigger, nota e isImpulsive no bloquean el guardado.
- La pantalla de éxito tiene feedback emocional contextualizado y dos acciones claras.

### Bugs y riesgos reales
- **Bug — El input de monto es `type="number"` pero se procesa con `parseInt(amount.replace(/\D/g, ''))`** (línea 25 y 34). Los inputs numéricos en iOS/Android aceptan `e`, `+`, `-` y `.`, que podrían producir strings como `1e5` o `1.5`. El `parseInt` maneja bien la mayoría de casos, pero `1e5` produciría `NaN` al hacer `replace(/\D/g, '')` primero (elimina `e`), resultando en `10005` — un monto incorrecto silencioso. Recomendación: usar `type="text" inputMode="numeric"` consistentemente.
- **Bug — En el paso `category`, seleccionar una categoría avanza automáticamente** (`onClick={() => { setCategoryId(cat.id); setStep('emotion') }}`). Lo mismo ocurre en el paso `emotion`. Esto impide al usuario cambiar de idea después de hacer tap sin querer. No hay botón de confirmación explícito ni forma de volver atrás después de seleccionar (salvo el botón `←` del header).
- **Riesgo de UX — En `handleSave()` (línea 32-49), si `addExpense` falla (ej. localStorage lleno), no hay `try/catch`**. El error se silenciaría y el usuario vería "Guardando..." congelado sin feedback. El `setSaving(false)` no se ejecutaría nunca porque el error ocurre antes del `await`.
- **Riesgo de UX — El campo "¿Fue planificada o impulsiva?" (paso 4) no tiene valor por defecto visible.** El usuario puede guardar sin seleccionar ninguna opción (isImpulsive queda en `null`, que se guarda como `false` según línea 38: `isImpulsive: isImpulsive ?? false`). El comportamiento es correcto técnicamente, pero el usuario no sabe que su silencio equivale a "Planificada".

### Mejoras opcionales
- Agregar vibración háptica en la confirmación de éxito (API Vibration) mejoraría el feedback en móvil.
- El botón "Guardar gasto ✓" (línea 266) debería deshabilitarse si ya está guardando para evitar doble tap.

---

## 3. Dashboard

**Archivo:** `src/pages/Dashboard.tsx`

### Lo que funciona
- Los KPIs de la semana (total, emoción más frecuente, categoría mayor, % impulsivos) se calculan correctamente sobre `weekExpenses` con `useMemo`.
- Los estados vacíos para los KPIs usan `—` como fallback cuando no hay datos (líneas 69, 71, 74, 76).
- El saludo cambia según la hora del día (`getGreeting`, líneas 16-21) — detalle cuidado.

### Bugs y riesgos reales
- **Bug — El Dashboard no tiene estado vacío cuando no hay gastos en la semana.** Si `weekExpenses.length === 0`, se muestra "$0" en el total y "—" en los KPIs, pero no hay mensaje explicativo que invite al usuario a registrar su primer gasto. La card de "Último registro" correctamente no aparece (`{lastExpense && ...}`), pero el espacio queda visualmente hueco. El insight de `generateInsight` sí maneja el caso vacío correctamente.
- **Bug — La card de "Último registro" usa `expenses[0]` (línea 37), que es el gasto más reciente de todos los tiempos.** Si el usuario no tiene gastos esta semana pero tiene gastos anteriores, verá un "Último registro" que podría ser de hace meses. Podría confundir al usuario que ve la sección encabezada con "Tu semana".
- **Riesgo de UX — Los KPIs en el grid de 3 columnas tienen texto truncado con `truncate`** (líneas 71 y 76). En pantallas pequeñas (iPhone SE, 320px), etiquetas como "Compras online" o "Entretenimiento" quedan cortadas sin posibilidad de leer el texto completo. No hay tooltip ni alternativa.
- **Riesgo de UX — El botón de "Valor Premium" en el Dashboard navega a `/perfil` donde dice "Próximamente" y tiene botones de pago no funcionales.** El usuario puede sentirse engañado si espera poder contratar el servicio.

### Mejoras opcionales
- Agregar un estado vacío explícito cuando `weekExpenses.length === 0` con CTA a registrar.
- Incluir la fecha de inicio de semana en la card de totales para dar contexto.

---

## 4. Historial

**Archivo:** `src/pages/History.tsx`

### Lo que funciona
- El modal de confirmación de eliminación (líneas 208-226) está implementado con "Esta acción no se puede deshacer" — buena práctica.
- El estado vacío cuando no hay resultados de búsqueda está correctamente implementado con `EmptyState` y acción de "Limpiar filtros".
- La búsqueda funciona sobre `label` de categoría, `label` de emoción, `note` y `trigger`.

### Bugs y riesgos reales
- **Bug — Los filtros de emoción y categoría solo muestran los primeros 6 elementos** (`EMOTIONS.slice(0, 6)` en línea 101, `CATEGORIES.slice(0, 6)` en línea 119). Si hay más emociones o categorías definidas en los datos, no son accesibles desde los filtros. Actualmente hay 10 emociones y 10 categorías en `types/index.ts`, por lo que 4 opciones de cada tipo quedan inaccesibles.
- **Bug — El estado vacío cuando `expenses.length === 0` (sin filtros activos) muestra el mismo `EmptyState` que cuando no hay resultados de búsqueda** (mismo emoji "🔍", mismo título "Sin resultados"). El texto dice "No encontramos gastos con esos filtros" cuando en realidad no hay gastos registrados. El `EmptyState` no tiene acción de "Registrar primer gasto" en ese caso porque `hasFilters` es `false` y el `action` quedaría `undefined`.
- **Riesgo de UX — El botón de eliminar (ícono `Trash2`, 14px) tiene un área de tap muy pequeña** (`p-1` en línea 195). En móvil, el área mínima recomendada es 44x44px. Este botón está estimado en aprox. 22x22px incluyendo el padding, lo que genera errores de toque frecuentes.
- **Riesgo de UX — La búsqueda es sincrónica y se ejecuta en cada keystroke** sobre el array completo. Para un MVP con pocos datos esto es aceptable, pero no escala.

### Mejoras opcionales
- Diferenciar el estado vacío sin datos del estado vacío por filtros (distintos mensajes y CTAs).
- Aumentar el área de tap del botón eliminar a mínimo 44x44px.
- Mostrar el monto total del historial filtrado cuando hay resultados activos.

---

## 5. Mapa de Patrones

**Archivo:** `src/pages/Patterns.tsx`

### Lo que funciona
- El umbral de 3 registros mínimos antes de mostrar gráficos es una buena decisión de UX (línea 48).
- El estado vacío en `expenses.length < 3` tiene texto claro y CTA funcional a `/registrar`.
- Los gráficos usan `ResponsiveContainer` de Recharts, lo que garantiza que se adapten al ancho del contenedor.

### Bugs y riesgos reales
- **Bug — La sección "Relación emoción · categoría" (líneas 203-224) está incompleta.** El bloque mapea `emotionData.slice(0, 3)` pero dentro del `return` de cada emoción solo renderiza el encabezado (emoji, nombre, contador) sin contenido real de categorías asociadas. El filtro `emExpenses` en línea 208 usa `e.emotionId === em.name.toLowerCase()` cuando debería usar el `id` de la emoción, no su `label` en minúsculas. Esta comparación fallará para cualquier emoción cuyo label no coincida exactamente con su id (ej. "Estresado" vs "estresado" podría funcionar, pero "Compras online" vs "compras_online" no). La sección termina con un texto fijo "Registra más gastos para ver la relación completa" que no cambia aunque haya datos — lo que es engañoso.
- **Bug — El tooltip personalizado `CustomTooltip` (líneas 24-36) muestra los valores como `${p.value}k`**, asumiendo que todos los valores están en miles de CLP. Esto es consistente con `getWeeklyChartData` que divide por 1000, pero si un día tiene gastos menores a $1.000, el valor aparecerá como `0k` en lugar de el monto real.
- **Bug — El botón "Saber más — desde $2.990 CLP/mes" en el teaser Premium (línea 232) no tiene handler `onClick`**. Es un botón sin acción que no navega a ningún lado.
- **Riesgo de UX — El gráfico de barras semanales puede mostrar múltiples barras del mismo día de la semana** si hay datos de más de 7 días. Por ejemplo, si hay dos "Lun" en el rango, Recharts los mostrará como dos barras con el mismo label "Lun". Esto no ocurre con la implementación actual (que toma exactamente los últimos 7 días), pero es frágil si se cambia la fuente de datos.
- **Riesgo de UX — Los gráficos de barras horizontales de emociones y categorías calculan el porcentaje visual relativo al máximo** (`maxCount = emotionData[0]?.count ?? 1`). Si solo hay 1 registro con una emoción, esa barra aparece al 100% del ancho, lo que puede dar una impresión exagerada de patrón cuando en realidad hay muy pocos datos.

### Mejoras opcionales
- Completar la sección "Relación emoción · categoría" o removerla hasta tener la lógica lista.
- Agregar un mínimo de datos absolutos en las barras de emoción/categoría (ej. "solo 1 registro").

---

## 6. Estados Vacíos

### Análisis por pantalla

| Pantalla | Estado vacío | Observación |
|---|---|---|
| Landing | N/A | No requiere |
| Onboarding | N/A | Siempre tiene contenido |
| Dashboard | Parcial | Falta estado vacío explícito cuando no hay gastos de la semana |
| Register | N/A | No requiere |
| History | Implementado | Diferencia entre sin filtros y con filtros es ambigua (ver sección 4) |
| Patterns | Implementado correctamente | Umbral de 3 registros bien manejado |
| Profile | N/A | No requiere estado vacío |

### Problema identificado
- **El Dashboard no tiene un estado vacío de primera vez.** Un usuario recién registrado que borra los datos demo verá el dashboard con "$0" y KPIs en "—" sin ningún mensaje que explique qué hacer. La experiencia de primera vez está comprometida.
- **En Historial, cuando `expenses.length === 0` y `hasFilters === false`**, el `EmptyState` no tiene acción de registro. El usuario está atascado sin llamado a la acción claro.

---

## 7. Diseño Móvil

**Archivos revisados:** todos los pages y `src/components/`

### Problemas identificados
- **Touch targets pequeños — `Trash2` en History.tsx (línea 193-197):** El botón de eliminar usa `p-1` con un ícono de `size={14}`. El área resultante es aproximadamente 22x22px, muy por debajo del mínimo de 44x44px recomendado por Apple HIG y Material Design.
- **Touch targets pequeños — botón de eliminar en modal de historia:** El icono `Trash2` que abre el modal en Profile.tsx (línea 135-140) usa `p-2` con `size={18}`, lo que da aprox. 34x34px — justo por debajo del mínimo.
- **Scroll horizontal potencial en filtros de History:** La fila de botones de filtro usa `overflow-x-auto` (línea 74 de History.tsx). Si hay muchos filtros activos, el `Filtros (N)` y el botón `Limpiar` podrían requerir scroll horizontal que el usuario no espera.
- **`max-w-md mx-auto` en Landing y Onboarding pero no en todas las páginas con Layout:** Landing y Onboarding limitan el ancho a `max-w-md`, pero las páginas con `Layout` dependen de cómo ese componente maneje el ancho. Si `Layout` no aplica la misma restricción en tablets, algunas páginas podrían verse mal en dispositivos no móviles.
- **El textarea de "Nota" en Register.tsx (línea 255) tiene `resize-none`** pero en iOS puede aparecer con un manejador de resize si los estilos no se aplican correctamente.

---

## 8. Contraste Visual

### Análisis basado en clases CSS identificadas
- **`text-valor-muted` sobre `bg-valor-bg` (fondo oscuro):** Las clases `valor-muted` y `valor-bg` son tokens de diseño propios. Sin ver los valores exactos del tema, hay riesgo de baja relación de contraste si `valor-muted` es un gris muy claro sobre fondo muy oscuro. Textos secundarios como descripciones de categorías, fechas y labels de KPIs usan esta combinación extensamente.
- **`text-gray-600` en Landing.tsx (línea 78):** El texto "Beta · Acceso anticipado" usa `text-gray-600` que es un gris medio. Sobre fondo oscuro (`bg-valor-bg`), esto probablemente no cumpla WCAG AA (relación mínima 4.5:1 para texto normal). Es el único uso de `text-gray-600` en el codebase — el resto usa `text-valor-muted`.
- **`text-gray-700` en Profile.tsx (línea 147):** El texto de versión "v0.1.0 — MVP beta" usa `text-gray-700`. Sobre fondo oscuro, `gray-700` es aún más oscuro que `gray-600`, lo que lo hace casi invisible — posible bug de contraste.
- **Texto naranja `text-orange-400` para "Impulsivo"** en Dashboard y History: El naranja sobre fondos oscuros generalmente tiene buen contraste, pero debería verificarse en condiciones de poca luz.
- **Fondo oscuro y gradientes de color:** Los gradientes decorativos (`opacity-10`, `opacity-8` en Landing) no afectan la legibilidad, pero el `opacity-8` es una clase no estándar de Tailwind — probablemente no tenga efecto real (Tailwind usa incrementos de 5: `opacity-5`, `opacity-10`).

---

## 9. Errores de Formulario

### Register.tsx
- **Paso de monto:** Validación presente (`handleAmountNext`, líneas 24-29). Muestra error en rojo con `text-red-400`. Correcto.
- **Paso de categoría:** Sin botón de "Continuar" — la selección avanza automáticamente. No hay posibilidad de error de formulario.
- **Paso de emoción:** Igual que categoría — avance automático.
- **Paso de detalles:** No hay validación porque todo es opcional. Correcto, pero `isImpulsive` queda silenciosamente en `false` si no se selecciona (ver sección 2).
- **Error de guardado:** No hay manejo de error en `handleSave()` (líneas 32-49). Si `localStorage.setItem` falla (modo incógnito con storage bloqueado, cuota excedida), la app no muestra ningún mensaje de error.

### Onboarding.tsx
- **Paso de nombre:** Validación con mensaje de error presente. Correcto.
- **Pasos 1-2-3:** Botones deshabilitados mientras no hay selección. Correcto.

### Caso de formulario vacío
- En Register, si el usuario llega al paso de "detalles" sin monto (imposible en el flujo normal pero posible si el estado se altera), `handleSave()` usaría `NaN` como monto al hacer `parseInt('')`. No hay segunda validación en el guardado.

---

## 10. Eliminación de Datos

**Archivo:** `src/pages/Profile.tsx` y `src/lib/storage.ts`

### Lo que funciona
- El modal de confirmación requiere marcar un checkbox explícito (líneas 159-168) antes de habilitar el botón "Eliminar todo". Es una buena fricción intencional.
- El botón "Eliminar todo" está deshabilitado (`disabled={!deleteConfirmed}`) mientras el checkbox no está marcado.
- `deleteUser()` en `storage.ts` (líneas 23-26) elimina tanto `valor_user` como `valor_expenses` — cubre todos los datos del usuario.

### Bugs y riesgos reales
- **Bug — `deleteUser()` NO elimina `valor_source`** (línea 23-26 de storage.ts). La clave `valor_source` (que registra el canal de adquisición del usuario) persiste después de eliminar la cuenta. Si el usuario crea una nueva cuenta en el mismo dispositivo, esta información se mantiene y se asocia automáticamente al nuevo perfil (`existing?.source` en Onboarding.tsx línea 57).
- **Bug — Después de `deleteUser()`, la navegación va a `'/'` (Landing)**, donde el `useEffect` de Landing.tsx verifica `getUser()`. Como el usuario fue eliminado, mostrará correctamente la Landing. Sin embargo, si el usuario presiona "Atrás" en el navegador, podría regresar a una pantalla protegida que ahora redirige a `'/'` nuevamente, creando un loop visual perceptible.
- **Riesgo de UX — El modal de eliminación de cuenta no menciona qué datos específicos se eliminan.** Dice "todos tus registros y datos", pero el usuario podría tener dudas sobre si hay datos en servidores (que en este MVP no existen, pero la ambigüedad genera desconfianza).

### Eliminación de gasto individual (History.tsx)
- El modal de confirmación individual está bien implementado con mensaje claro y dos opciones.
- No hay opción de deshacer después de eliminar — es aceptable para MVP pero genera fricción si el usuario elimina por accidente.

---

## 11. Textos de Privacidad

### Inventario de declaraciones de privacidad en el código

| Archivo | Línea | Texto |
|---|---|---|
| Landing.tsx | 68-70 | "Valor no conecta cuentas bancarias, no vende datos y no reemplaza asesoría financiera o de salud mental." |
| Onboarding.tsx | 102-104 | "Solo lo usamos para personalizar tu experiencia. No lo compartimos." |
| Onboarding.tsx | 179-183 | "Valor no te juzga. Te ayuda a observar tus patrones. Tus datos son privados y solo tuyos." |
| Profile.tsx | 95 | "Valor no vende ni comparte tus datos personales con terceros." |
| Profile.tsx | 96 | "Ningún empleador puede ver tus registros individuales." |
| Profile.tsx | 97 | "Esta versión no conecta ni accede a cuentas bancarias." |
| Profile.tsx | 114-116 | "Valor no reemplaza asesoría financiera profesional ni apoyo de salud mental..." |

### Problemas identificados
- **Riesgo legal — "Tus datos son privados y solo tuyos"** (Onboarding.tsx, línea 182): Esta afirmación es técnicamente correcta en el MVP (datos solo en localStorage), pero es una promesa sin respaldo legal formal. Si en el futuro se agrega backend o analytics, esta afirmación se vuelve problemática sin haber sido actualizada.
- **Riesgo legal — "Ningún empleador puede ver tus registros individuales"** (Profile.tsx, línea 96): Esta es una afirmación técnica específica que implica un modelo B2B donde los empleadores están involucrados. Si Valor tiene o planea tener un producto B2B, esta promesa de aislamiento de datos individuales debe estar respaldada por arquitectura y contratos. En el MVP actual no hay backend, por lo que es correcta — pero genera una expectativa implícita sobre el futuro.
- **Ausencia de Política de Privacidad formal:** No hay link a una política de privacidad real en ningún lugar de la app. Para operar legalmente en Chile (Ley 19.628 sobre protección de datos, en proceso de actualización), incluso un MVP que solicita el nombre de usuario debería referenciar los términos de tratamiento de datos. La GDPR-like tendencia regulatoria en Latinoamérica hace esto cada vez más importante.
- **Ausencia de Términos de Uso:** El MVP no tiene ningún aviso de términos antes de que el usuario complete el onboarding.

---

## 12. Riesgos de Lenguaje Clínico

### Análisis de textos con connotación psicológica

- **Register.tsx, línea 76-79:** El mensaje de éxito para emociones `estresado` o `ansioso` dice: *"Registrar cuando estás estresado/a es un acto de autoconciencia."* — Este texto es positivo, no clínico. Adecuado.
- **insights.ts, línea 65-67:** *"Esta semana registraste más gastos asociados a estrés que la semana anterior. No significa que estés haciendo algo mal; puede ser una señal útil para observar."* — El mensaje es cuidadoso y neutral. Correcto.
- **insights.ts, línea 77-78:** *"Hay una coincidencia entre ansiedad y pedidos de delivery en tus registros."* — El uso de "coincidencia" en lugar de "causa" o "problema" es apropiado.
- **insights.ts, línea 80:** *"La ansiedad aparece frecuentemente asociada a tus gastos. Registrar más te ayudará a ver si hay un patrón claro."* — El uso de "ansiedad" como categoría descriptiva (que el propio usuario registró) es válido. Sin embargo, la frase podría ser percibida como un mini-diagnóstico si el usuario lo lee fuera de contexto.
- **Onboarding.tsx, línea 12:** El objetivo `'ansiedad_dinero'` con label "Ansiedad y dinero" y emoji "😰" es el nombre de un objetivo de onboarding. No es una etiqueta diagnóstica — es una descripción de experiencia. Aceptable, pero en la iteración siguiente podría reformularse como "Preocupación por el dinero" para reducir el peso clínico de la palabra "ansiedad".
- **Landing.tsx, línea 45:** *"Tus finanzas tienen emociones."* — Metáfora creativa, no clínica. Correcta.
- **Profile.tsx, línea 115:** *"Si estás en una situación difícil, busca ayuda especializada."* — Disclaimer apropiado y necesario.

### Veredicto general sobre lenguaje clínico
El lenguaje es mayormente cuidadoso y no clínico. El riesgo más alto es la palabra "ansiedad" usada como etiqueta de objetivo de onboarding y como emotionId. No es un bug, pero merece revisión antes de escalar.

---

## 13. Riesgos de Promesas Financieras

### Análisis de textos con implicaciones financieras

- **Landing.tsx, línea 47-49:** *"Valor te ayuda a entender la relación entre cómo te sientes y cómo gastas."* — Afirmación descriptiva, no prescriptiva. Correcta.
- **Landing.tsx, línea 53:** *"Descubre patrones que no sabías que tenías"* — Esta afirmación garantiza implícitamente que el usuario *tiene* patrones y que la app los *descubrirá*. Con 3 registros mínimos para activar Patrones, la promesa puede quedar vacía.
- **Patterns.tsx, línea 229:** *"Momentos del día con más gastos, predicción de patrones, comparación semanal detallada"* — La palabra **"predicción"** en el contexto de comportamiento financiero puede ser interpretada como promesa de resultado (predecirte el futuro financiero). Recomendación: cambiar a "identificación de tendencias" o similar.
- **Profile.tsx, líneas 77-83:** Los botones "$2.990/mes" y "$14.990 fundador" son interactivos pero no tienen handler — el usuario puede pensar que está iniciando un pago. La aclaración "Sin pagos reales aún" (línea 84) está en texto pequeño debajo de los botones, no en los propios botones.
- **Dashboard.tsx, línea 144-155:** La card de "Valor Premium" promete "Insights más profundos, patrones avanzados" sin detallar qué significa "más profundo". Es vago pero no prometedor de resultados financieros.

### Veredicto general sobre promesas financieras
No hay afirmaciones de ahorro garantizado ni de mejora financiera directa — lo cual es positivo. Los riesgos son de expectativas no cumplidas ("predecirte patrones") y de botones de pago no funcionales sin suficiente claridad.

---

## 14. Posibles Problemas de Confianza

### Factores que pueden generar desconfianza en el usuario

1. **Los datos demo aparecen como datos reales del usuario** (`storage.ts`, líneas 31-35): Si `localStorage` no tiene datos, `getExpenses()` retorna `DEMO_EXPENSES` silenciosamente. El usuario recién registrado verá el Dashboard con gastos pre-cargados sin ningún aviso de que son datos de ejemplo. Podría confundirlos con datos reales o sentirse manipulado al descubrir que no son suyos. Este es el problema de confianza más grave del MVP.

2. **Botones de pago sin funcionalidad en Profile.tsx (líneas 77-83):** Los botones "$2.990/mes" y "$14.990 fundador" no tienen `onClick`. El usuario que los presione no recibe ningún feedback. La aclaración "Sin pagos reales aún" está en texto muy pequeño (`text-xs`) y podría no ser leída.

3. **El botón "Saber más" en Dashboard (línea 150)** navega a `/perfil` pero el Premium ahí dice "Próximamente" — la experiencia de llegar a un dead-end erosiona la confianza.

4. **El botón "Saber más — desde $2.990 CLP/mes" en Patterns.tsx (línea 232) no tiene handler** — presionarlo no hace nada, lo que puede interpretarse como un bug.

5. **La fuente de adquisición se guarda automáticamente desde la URL** (`Landing.tsx`, líneas 11-13: `saveSource(de)`). El usuario no sabe que la app está registrando de dónde llegó. Esto no es per se peligroso, pero en el contexto de una app que promete privacidad, podría percibirse como tracking si se descubre.

6. **El nombre de usuario no tiene restricciones de contenido.** Un usuario podría poner un nombre con caracteres especiales, HTML o scripts. Aunque localStorage no ejecuta scripts, si en el futuro se renderiza sin sanitización en un backend, sería un riesgo XSS latente.

7. **`generateId()` usa `Date.now()` + caracteres aleatorios** (storage.ts, línea 71-73). No es un UUID estándar. Para un MVP es aceptable, pero si los IDs se exponen en URLs o APIs futuras, podrían ser predecibles en el componente de timestamp.

---

## 15. Lista Priorizada de Mejoras

### ALTA PRIORIDAD — Bugs reales o riesgos de confianza graves

| # | Problema | Archivo | Tipo |
|---|---|---|---|
| A1 | Los datos demo se muestran sin aviso como datos del usuario al ingresar por primera vez | `src/lib/storage.ts:31-35` | Bug de confianza |
| A2 | `deleteUser()` no elimina `valor_source` — datos residuales post-eliminación | `src/lib/storage.ts:23-26` | Bug de privacidad |
| A3 | No hay manejo de error en `handleSave()` — el guardado puede fallar silenciosamente | `src/pages/Register.tsx:32-49` | Bug funcional |
| A4 | Sección "Relación emoción · categoría" en Patrones está incompleta y usa lógica incorrecta de filtrado por ID | `src/pages/Patterns.tsx:203-224` | Bug funcional |
| A5 | Filtros de Historial solo muestran 6 de 10 emociones y 6 de 10 categorías | `src/pages/History.tsx:101,119` | Bug funcional |
| A6 | Botones de pago en Profile y Patterns sin handler `onClick` — dead-ends sin feedback | `src/pages/Profile.tsx:77-83`, `src/pages/Patterns.tsx:232` | Bug de UX |

### MEDIA PRIORIDAD — Riesgos de UX y privacidad importantes

| # | Problema | Archivo | Tipo |
|---|---|---|---|
| M1 | Dashboard sin estado vacío explícito para usuarios sin gastos en la semana | `src/pages/Dashboard.tsx` | Riesgo UX |
| M2 | `last expense` en Dashboard muestra el último gasto histórico aunque no sea de la semana actual | `src/pages/Dashboard.tsx:37` | Riesgo UX |
| M3 | Touch target del botón Trash2 en Historial es ~22x22px (mínimo 44x44px) | `src/pages/History.tsx:193-197` | Riesgo UX móvil |
| M4 | Ausencia de Política de Privacidad y Términos de Uso formales | Global | Riesgo legal |
| M5 | `isImpulsive` se guarda silenciosamente como `false` si no se selecciona en el paso de detalles | `src/pages/Register.tsx:38` | Riesgo UX / datos |
| M6 | El texto "predicción de patrones" en Premium puede interpretarse como promesa financiera | `src/pages/Patterns.tsx:229` | Riesgo legal/confianza |
| M7 | `text-gray-700` en versión de Profile.tsx es casi invisible sobre fondo oscuro | `src/pages/Profile.tsx:147` | Riesgo accesibilidad |
| M8 | Estado vacío en Historial sin filtros no tiene CTA para registrar primer gasto | `src/pages/History.tsx:154-160` | Riesgo UX |
| M9 | `type="number"` en input de monto acepta caracteres como `e` y `+` que pueden producir montos incorrectos | `src/pages/Register.tsx:133` | Riesgo funcional |
| M10 | El canal de adquisición (`?de=`) se guarda sin consentimiento explícito del usuario | `src/pages/Landing.tsx:11-13` | Riesgo privacidad |

### BAJA PRIORIDAD — Mejoras opcionales o refinamientos

| # | Mejora | Archivo | Tipo |
|---|---|---|---|
| B1 | Agregar aviso visible de "datos de demo" cuando el usuario ve la app por primera vez | `src/pages/Dashboard.tsx` | UX |
| B2 | El KPI de categoría más frecuente trunca etiquetas largas en pantallas pequeñas | `src/pages/Dashboard.tsx:71,76` | UX |
| B3 | Reemplazar `opacity-8` (clase no estándar de Tailwind) por `opacity-5` o `opacity-10` | `src/pages/Landing.tsx:34` | CSS bug menor |
| B4 | Agregar `autocomplete="given-name"` al input de nombre en Onboarding | `src/pages/Onboarding.tsx:92` | UX |
| B5 | Reformular "Ansiedad y dinero" en onboarding por "Preocupación por el dinero" | `src/pages/Onboarding.tsx:12` | Lenguaje |
| B6 | La selección automática de categoría/emoción avanza sin botón de confirmación | `src/pages/Register.tsx:163,185` | UX |
| B7 | Agregar indicador claro de que los botones de Premium son de registro de interés, no de pago | `src/pages/Profile.tsx:77-84` | Confianza |
| B8 | El insight de ansiedad+delivery puede sentirse como micro-diagnóstico con suficientes datos | `src/lib/insights.ts:77-78` | Lenguaje |
| B9 | No hay opción de "deshacer" después de eliminar un gasto individual | `src/pages/History.tsx` | UX |
| B10 | Agregar link a Política de Privacidad futura en el footer del modal de eliminación de cuenta | `src/pages/Profile.tsx` | Legal |

---

*Reporte generado por el agente `valor-qa-privacy`. Revisión basada exclusivamente en análisis estático del código fuente. Se recomienda complementar con pruebas en dispositivo físico (iPhone SE y Android mid-range) para validar los puntos de contraste visual y touch targets.*
