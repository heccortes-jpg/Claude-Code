# Sistema de Marca — VALOR: Finanzas Emocionales
### Documento de Diseño Completo v1.0

---

## Índice

1. Propósito Emocional de Marca
2. Personalidad de Marca
3. Paleta de Colores Completa
4. Tipografías y Escala Tipográfica
5. Reglas de Uso del Logo
6. Diseño de Botones
7. Diseño de Tarjetas (Glassmorphism)
8. Diseño de Gráficos
9. Estados Vacíos
10. Estados de Carga
11. Estados de Error
12. Guía de Tono en Interfaz
13. Microcopy — 20 Ejemplos
14. Recomendaciones Mobile-First
15. Wireframes Textuales

---

## 1. Propósito Emocional de Marca

### Declaración Central

> **"Tus finanzas tienen emociones."**

VALOR nace de una verdad incómoda: la mayoría de las personas no fracasan en sus finanzas por falta de información, sino por falta de comprensión emocional. Sabemos cuánto cuesta el café, pero no sabemos por qué lo compramos cuando estamos ansiosos. Conocemos nuestro sueldo, pero no entendemos por qué desaparece antes del día 20.

VALOR es la primera app de finanzas personales para Chile y Latinoamérica que trata el dinero como lo que realmente es: un espejo del estado interno de sus usuarios.

### Misión

Ayudar a las personas a entender la relación entre sus emociones y sus decisiones financieras, para que puedan construir una vida con mayor intencionalidad y menos culpa.

### Visión

Un Latinoamérica donde hablar de dinero no genera vergüenza, donde las finanzas personales son una práctica de autoconocimiento, no de autopunición.

### El Problema que Resuelve

Las apps de finanzas tradicionales muestran números. VALOR muestra patrones. La diferencia es que los números juzgan — los patrones explican. Cuando un usuario ve que gasta más en delivery los domingos por la noche, no necesita que la app le diga "gastas demasiado." Necesita que la app le ayude a entender qué siente los domingos por la noche.

### Posicionamiento de Marca

VALOR no es una app de presupuesto. Es una app de autoconocimiento financiero.

- No compite con Fintual, Khipu ni con los bancos digitales.
- Compite con la ansiedad, la negación y el piloto automático emocional.

### Promesa al Usuario

"Te ayudamos a entender por qué haces lo que haces con tu dinero, sin juzgarte por ello."

---

## 2. Personalidad de Marca

La marca VALOR tiene cinco atributos de personalidad que guían cada decisión de diseño, tono y experiencia:

---

### Atributo 1: Empática, No Condescendiente

VALOR entiende que el dinero está cargado emocionalmente. Cada interacción reconoce que el usuario llega con historia, con estrés, con vergüenza acumulada. La app nunca dice "deberías". La app pregunta "¿qué sentías?".

**En diseño:** Colores cálidos, no alarmas rojas. Mensajes curiosos, no alertas.
**En tono:** Primera persona plural cuando da contexto ("Notamos que..."), segunda persona singular cuando celebra ("Lo lograste").

---

### Atributo 2: Honesta con Delicadeza

VALOR no miente para hacer sentir bien al usuario. Muestra la realidad, pero envuelta en contexto y sin crueldad. Si alguien gastó más de lo planeado, la app lo dice claramente, pero también muestra el patrón que lo explica.

**En diseño:** Datos precisos, visualizaciones sin distorsión. Nunca ocultar información negativa, pero siempre contextualizarla.
**En tono:** Directa sin ser agresiva. Fáctica sin ser fría.

---

### Atributo 3: Curiosa e Inteligente

VALOR no asume. Pregunta. Está genuinamente interesada en entender al usuario como individuo, no como categoría. Hace preguntas que nadie más hace: "¿Cuál era tu estado de ánimo cuando hiciste esta compra?"

**En diseño:** Gráficos que revelan patrones inesperados. Insights que sorprenden sin asustar.
**En tono:** Usa lenguaje de descubrimiento ("Encontramos algo interesante", "¿Habías notado esto?").

---

### Atributo 4: Premium sin Ser Exclusiva

VALOR se ve costosa y bien diseñada, pero no habla como una app para gente rica. El diseño premium es una declaración de respeto al usuario: "Tu relación con el dinero merece atención de calidad", no "esta app es para personas exitosas."

**En diseño:** Glassmorphism, gradientes violeta-rosado, tipografía cuidada. Sensación de profundidad y calidad.
**En tono:** Sin jerga financiera innecesaria. Sin términos que excluyan.

---

### Atributo 5: Transformadora, No Informativa

VALOR no quiere que el usuario sepa más sobre sus finanzas. Quiere que el usuario se entienda mejor a sí mismo. La diferencia es enorme: la información cambia lo que sabes, la transformación cambia cómo actúas.

**En diseño:** Cada pantalla tiene un propósito de acción o reflexión claro. No hay pantallas de "datos por si acaso".
**En tono:** Orienta hacia la próxima acción. Celebra el progreso, no la perfección.

---

## 3. Paleta de Colores Completa

### Filosofía de Color

El sistema de color de VALOR está construido alrededor de un universo nocturno profundo que evoca introspección, claridad y sofisticación. El violeta profundo como base crea distancia del mundo bancario azul-verde y conecta con la psicología del autoconocimiento y la creatividad.

---

### Colores Base (Fondos y Superficies)

| Nombre | HEX | RGB | Uso |
|--------|-----|-----|-----|
| Void | `#0D0A1A` | rgb(13, 10, 26) | Fondo más oscuro, behind-the-card |
| Deep Purple | `#110E22` | rgb(17, 14, 34) | Fondo principal de pantallas |
| Surface 1 | `#1A1530` | rgb(26, 21, 48) | Fondo de cards base |
| Surface 2 | `#221C3D` | rgb(34, 28, 61) | Cards elevadas, modales |
| Surface 3 | `#2D2550` | rgb(45, 37, 80) | Elementos hover, estados activos |
| Border Subtle | `#3D3460` | rgb(61, 52, 96) | Bordes sutiles, separadores |
| Border Strong | `#5B4E8A` | rgb(91, 78, 138) | Bordes en foco, elementos activos |

```css
/* Tailwind custom colors — agregar en tailwind.config.js */
colors: {
  'valor-void': '#0D0A1A',
  'valor-deep': '#110E22',
  'valor-surface-1': '#1A1530',
  'valor-surface-2': '#221C3D',
  'valor-surface-3': '#2D2550',
  'valor-border-subtle': '#3D3460',
  'valor-border-strong': '#5B4E8A',
}
```

---

### Colores de Marca (Primarios y Acento)

| Nombre | HEX | RGB | Uso |
|--------|-----|-----|-----|
| Violet 400 | `#A78BFA` | rgb(167, 139, 250) | Textos de acento, íconos secundarios |
| Violet 500 | `#8B5CF6` | rgb(139, 92, 246) | Color principal de marca, botones primarios |
| Violet 600 | `#7C3AED` | rgb(124, 58, 237) | Hover de botón primario |
| Violet 700 | `#6D28D9` | rgb(109, 40, 217) | Active/pressed de botón primario |
| Fuchsia 600 | `#C026D3` | rgb(192, 38, 211) | Acento fucsia, gradientes, categorías emocionales |
| Fuchsia 500 | `#D946EF` | rgb(217, 70, 239) | Íconos de emoción, highlights |
| Pink 500 | `#EC4899` | rgb(236, 72, 153) | Tercer color de gradiente, elementos cálidos |
| Pink 400 | `#F472B6` | rgb(244, 114, 182) | Texto rosado suave, métricas positivas |

```css
/* Gradiente principal de marca */
background: linear-gradient(135deg, #8B5CF6 0%, #C026D3 50%, #EC4899 100%);

/* Gradiente para texto (clip) */
background: linear-gradient(90deg, #8B5CF6, #EC4899);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;

/* Tailwind config */
'valor-violet': '#8B5CF6',
'valor-violet-hover': '#7C3AED',
'valor-fuchsia': '#C026D3',
'valor-pink': '#EC4899',
```

---

### Colores de Texto

| Nombre | HEX | Uso |
|--------|-----|-----|
| Text Primary | `#F6F2FD` | Títulos, texto principal |
| Text Secondary | `#C4B5FD` | Subtítulos, texto de apoyo |
| Text Tertiary | `#9C8EC1` | Placeholders, metadata, timestamps |
| Text Disabled | `#6B5E8A` | Elementos deshabilitados |
| Text On Brand | `#FFFFFF` | Texto sobre botones de color |

```css
'valor-text-primary': '#F6F2FD',
'valor-text-secondary': '#C4B5FD',
'valor-text-tertiary': '#9C8EC1',
'valor-text-disabled': '#6B5E8A',
```

---

### Colores Semánticos (Estados del Sistema)

| Nombre | HEX | Uso |
|--------|-----|-----|
| Success | `#34D399` | Confirmaciones, metas logradas, saldo positivo |
| Success Subtle | `#064E3B` | Fondo de banners de éxito |
| Warning | `#FBBF24` | Alertas de patrón, aproximación a límite |
| Warning Subtle | `#451A03` | Fondo de banners de advertencia |
| Danger | `#F87171` | Errores, excesos sobre presupuesto |
| Danger Subtle | `#450A0A` | Fondo de banners de error |
| Info | `#60A5FA` | Información neutral, tips |
| Info Subtle | `#0C1A3D` | Fondo de banners informativos |

**Nota importante:** El rojo de peligro se usa con mucha reserva. VALOR prefiere el naranja/amarillo de advertencia incluso en casos que otras apps llamarían "error", porque el marco emocional importa.

---

### Colores de Categorías Emocionales

Las emociones tienen su propio sistema de color para el mapa de patrones:

| Emoción | HEX | Descripción |
|---------|-----|-------------|
| Ansiedad | `#F59E0B` | Ámbar cálido |
| Aburrimiento | `#6B7280` | Gris neutro |
| Celebración | `#EC4899` | Rosa festivo |
| Estrés | `#EF4444` | Rojo suave (no alarma) |
| Comodidad | `#8B5CF6` | Violeta hogar |
| Impulsividad | `#F97316` | Naranja vivo |
| Planificación | `#34D399` | Verde sereno |
| Tristeza | `#93C5FD` | Azul melancólico |

---

## 4. Tipografías y Escala Tipográfica

### Familias Tipográficas

**Plus Jakarta Sans** — Para titulares y elementos de identidad
- Fuente: Google Fonts
- Pesos usados: 600 (SemiBold), 700 (Bold), 800 (ExtraBold)
- Uso: H1, H2, H3, nombres de marca, números de métricas grandes
- Personalidad: Moderna, geométrica sin ser fría, humanista

**Inter** — Para cuerpo y UI
- Fuente: Google Fonts
- Pesos usados: 400 (Regular), 500 (Medium), 600 (SemiBold)
- Uso: Párrafos, labels, botones, metadatos, formularios
- Personalidad: Legible, neutral, optimizada para pantallas

```css
/* globals.css o tailwind.config.js */
fontFamily: {
  'display': ['Plus Jakarta Sans', 'sans-serif'],
  'body': ['Inter', 'sans-serif'],
}
```

```html
<!-- _document.tsx o layout.tsx -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
```

---

### Escala Tipográfica Completa

| Token | Clase Tailwind | Tamaño | Peso | Familia | Tracking | Uso |
|-------|---------------|--------|------|---------|----------|-----|
| display-xl | `text-5xl font-display font-extrabold` | 48px | 800 | Plus Jakarta | -0.02em | Landing hero |
| display-lg | `text-4xl font-display font-bold` | 36px | 700 | Plus Jakarta | -0.01em | Titulares de sección |
| display-md | `text-3xl font-display font-bold` | 30px | 700 | Plus Jakarta | -0.01em | Nombres de pantalla |
| heading-xl | `text-2xl font-display font-semibold` | 24px | 600 | Plus Jakarta | 0 | Subtítulos principales |
| heading-lg | `text-xl font-display font-semibold` | 20px | 600 | Plus Jakarta | 0 | Encabezados de card |
| heading-md | `text-lg font-display font-semibold` | 18px | 600 | Plus Jakarta | 0 | Labels de sección |
| metric-xl | `text-5xl font-display font-bold tabular-nums` | 48px | 700 | Plus Jakarta | -0.02em | Saldo total principal |
| metric-lg | `text-3xl font-display font-semibold tabular-nums` | 30px | 600 | Plus Jakarta | -0.01em | Totales por categoría |
| metric-md | `text-2xl font-display font-semibold tabular-nums` | 24px | 600 | Plus Jakarta | 0 | Subtotales |
| body-lg | `text-base font-body font-normal` | 16px | 400 | Inter | 0 | Texto de párrafos |
| body-md | `text-sm font-body font-normal` | 14px | 400 | Inter | 0 | Descripciones, explicaciones |
| body-sm | `text-xs font-body font-normal` | 12px | 400 | Inter | 0.01em | Metadata, timestamps |
| label-lg | `text-sm font-body font-medium` | 14px | 500 | Inter | 0.01em | Labels de botones, tabs |
| label-md | `text-xs font-body font-medium` | 12px | 500 | Inter | 0.02em | Badges, chips |
| label-sm | `text-[10px] font-body font-semibold uppercase` | 10px | 600 | Inter | 0.08em | Microlabels, eyebrows |

---

### Reglas Tipográficas

1. **Nunca mezclar pesos en una misma línea** — si el contexto requiere énfasis, usar color, no peso diferente en la misma línea.
2. **Los números financieros siempre usan `tabular-nums`** — evita el "baile" visual al actualizar cifras.
3. **Alineación:** Títulos a la izquierda en móvil. Centrado solo para estados vacíos, onboarding y confirmaciones.
4. **Línea de interlineado:** `leading-tight` para métricas grandes, `leading-relaxed` para texto explicativo.
5. **Máxima longitud de línea:** 65-75 caracteres para cuerpo de texto. Usar `max-w-prose` o equivalente.

---

## 5. Reglas de Uso del Logo

### Construcción del Logo

El logotipo de VALOR se compone de dos elementos:

**1. Símbolo: Chevron Ascendente (^)**
- Un chevron (ángulo abierto hacia arriba) que representa crecimiento, claridad y dirección
- No es una flecha de bolsa de valores — es un símbolo de ascenso personal
- El chevron tiene grosor de trazo 2.5px a tamaño 24px
- Degradado: `from #8B5CF6 via #C026D3 to #EC4899` en dirección 135deg
- El ángulo del chevron es exactamente 45 grados

**2. Logotipo de texto: "VALOR"**
- Fuente: Plus Jakarta Sans ExtraBold (800)
- Todo en mayúsculas
- En versión oscura (uso principal): color `#F6F2FD`
- En versión de gradiente: clip del gradiente de marca sobre el texto
- Kerning manual: espaciado entre caracteres `-0.03em` para compactación profesional

**3. Tagline (opcional):**
- "Finanzas Emocionales" en Inter Medium, `#C4B5FD`, tamaño 60% del wordmark

### Composición del Logo

```
[^] VALOR
     Finanzas Emocionales  (opcional)
```

El símbolo y el texto se alinean al centro vertical. El símbolo ocupa el mismo cap-height que las letras mayúsculas de "VALOR".

---

### Variantes de Logo

| Variante | Uso | Descripción |
|----------|-----|-------------|
| Principal | App, dark backgrounds | Símbolo + texto en blanco `#F6F2FD` |
| Gradiente | Landing hero, splash screen | Símbolo + texto ambos en gradiente |
| Monocromo Claro | Documentos, export | Todo en `#F6F2FD` sin gradiente |
| Compact | Favicon, app icon | Solo el símbolo ^ con gradiente |
| Inline Small | Navegación, headers | Símbolo + texto sin tagline, tamaño reducido |

---

### Áreas de Protección

- El logo siempre debe tener un área de protección mínima de **1x** la altura del símbolo ^ en todos sus lados.
- No puede haber texto, iconos ni elementos visuales dentro de esta zona.

---

### Lo que NO se debe hacer con el Logo

- No rotar el chevron hacia abajo (implica caída)
- No usar el logo en fondos claros sin versión adaptada
- No cambiar el gradiente por colores planos en la versión gradiente
- No distorsionar ni estirar
- No usar el texto sin el símbolo (excepción: etiquetas muy pequeñas)
- No aplicar sombras externas al logo
- No usar el logo azul, verde ni ningún color fuera de la paleta

---

### Tamaños Mínimos

| Contexto | Tamaño mínimo | Variante recomendada |
|----------|--------------|---------------------|
| Pantalla móvil, header | 20px height | Inline Small |
| Pantalla móvil, splash | 48px height | Gradiente |
| Favicon / app icon | 16px | Compact |
| Tablet / desktop header | 28px height | Principal |

---

## 6. Diseño de Botones

### Filosofía de Botones

Los botones de VALOR siguen una jerarquía clara: solo puede haber un botón primario por pantalla. Los demás deben ser secundarios o ghost. Los botones destructivos se usan con extrema reserva y siempre con confirmación.

**Altura base:** 48px en mobile (touch-friendly). 44px en contextos secundarios.
**Border radius:** `rounded-xl` (12px) para botones de acción principal. `rounded-lg` (8px) para botones inline.
**Transiciones:** `transition-all duration-200 ease-out`
**Fuente:** Inter SemiBold, 14px, tracking 0.01em

---

### Botón Primario

```jsx
// Clase Tailwind
className="
  h-12 px-6
  bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500
  text-white font-semibold text-sm tracking-wide
  rounded-xl
  shadow-lg shadow-violet-500/30
  hover:shadow-xl hover:shadow-violet-500/40
  hover:scale-[1.02]
  active:scale-[0.98]
  transition-all duration-200 ease-out
  disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100
  focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#110E22]
"
```

**Especificaciones:**
- Gradiente: `from #7C3AED via #C026D3 to #EC4899`
- Sombra: `0 8px 24px rgba(139, 92, 246, 0.30)`
- Hover: sombra aumenta a `rgba(139, 92, 246, 0.40)`, scale 1.02
- Pressed: scale 0.98
- Disabled: opacity 40%, sin interacción

---

### Botón Secundario

```jsx
className="
  h-12 px-6
  bg-valor-surface-2
  border border-valor-border-subtle
  text-valor-text-secondary font-semibold text-sm
  rounded-xl
  hover:bg-valor-surface-3 hover:border-valor-border-strong hover:text-valor-text-primary
  active:scale-[0.98]
  transition-all duration-200 ease-out
  disabled:opacity-40 disabled:cursor-not-allowed
  focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:ring-offset-2 focus:ring-offset-[#110E22]
"
```

**Especificaciones:**
- Fondo: `#221C3D` (Surface 2)
- Borde: 1px `#3D3460`
- Hover: fondo `#2D2550`, borde `#5B4E8A`
- No tiene gradiente ni sombra de color

---

### Botón Ghost

```jsx
className="
  h-12 px-6
  bg-transparent
  text-violet-400 font-semibold text-sm
  rounded-xl
  hover:bg-violet-500/10 hover:text-violet-300
  active:scale-[0.98]
  transition-all duration-200 ease-out
  disabled:opacity-40 disabled:cursor-not-allowed
  focus:outline-none focus:ring-2 focus:ring-violet-400/50
"
```

**Uso:** Acciones terciarias, "Cancelar", "Más tarde", navegación de regreso.

---

### Botón Destructivo

```jsx
className="
  h-12 px-6
  bg-red-950/60
  border border-red-900/50
  text-red-400 font-semibold text-sm
  rounded-xl
  hover:bg-red-900/60 hover:border-red-800/50 hover:text-red-300
  active:scale-[0.98]
  transition-all duration-200 ease-out
  focus:outline-none focus:ring-2 focus:ring-red-500/50
"
```

**Uso:** Eliminar cuenta, borrar datos, desvincular. Siempre precedido de modal de confirmación con descripción de consecuencias.

**Regla de tono para botones destructivos:**
- El botón dice "Eliminar mi cuenta" NO "Confirmar eliminación"
- El modal de confirmación siempre incluye una frase que normaliza el arrepentimiento: "Puedes crear una cuenta nueva cuando quieras."

---

### Botón Icon-Only

```jsx
className="
  h-10 w-10
  bg-valor-surface-2
  border border-valor-border-subtle
  text-valor-text-secondary
  rounded-xl
  flex items-center justify-center
  hover:bg-valor-surface-3 hover:text-valor-text-primary
  active:scale-[0.95]
  transition-all duration-200 ease-out
"
// Siempre incluir aria-label
```

---

### Botón Texto Link

```jsx
className="
  text-violet-400 font-medium text-sm
  underline-offset-2
  hover:text-violet-300 hover:underline
  active:text-violet-500
  transition-colors duration-150
  focus:outline-none focus:ring-1 focus:ring-violet-400 rounded
"
```

---

## 7. Diseño de Tarjetas (Glassmorphism)

### Filosofía de Glassmorphism en VALOR

El glassmorphism de VALOR es **sobrio y funcional**, no decorativo. No usamos fondos borrosos de imágenes o gradientes extremos. El efecto de vidrio se logra con:
- Fondo semi-transparente sobre el deep purple de base
- Borde con gradiente sutil o opacidad reducida
- Sin `backdrop-filter: blur()` excesivo (máximo 12px para no degradar performance en móvil)

---

### Card Base (Nivel 1)

```jsx
className="
  bg-[#1A1530]/80
  backdrop-blur-sm
  border border-[#3D3460]/60
  rounded-2xl
  p-4
  shadow-[0_4px_24px_rgba(0,0,0,0.4)]
"
```

**Uso:** Cards de lista, items de historial, bloques de contenido secundario.

---

### Card Elevada (Nivel 2) — Para Dashboard

```jsx
className="
  bg-gradient-to-br from-[#221C3D]/90 to-[#1A1530]/90
  backdrop-blur-md
  border border-[#5B4E8A]/30
  rounded-2xl
  p-5
  shadow-[0_8px_32px_rgba(0,0,0,0.5)]
  relative overflow-hidden
"
// Pseudo-elemento decorativo (via before con CSS absoluto)
// before: gradient radial violeta en esquina superior derecha, opacity 15%
```

**Uso:** Card de saldo principal, card de insight destacado.

---

### Card de Métrica (KPI Card)

```jsx
className="
  bg-[#221C3D]/70
  backdrop-blur-sm
  border border-[#3D3460]/50
  rounded-xl
  p-4
  flex flex-col gap-1
"
// Estructura interna:
// - Label pequeño (text-xs text-[#9C8EC1] font-medium uppercase tracking-wider)
// - Valor grande (text-2xl font-display font-semibold text-[#F6F2FD] tabular-nums)
// - Delta/tendencia (text-xs con color semántico)
```

---

### Card de Transacción (List Item)

```jsx
className="
  bg-[#1A1530]/60
  border border-[#3D3460]/40
  rounded-xl
  p-3
  flex items-center gap-3
  hover:bg-[#221C3D]/70 hover:border-[#5B4E8A]/30
  active:scale-[0.99]
  transition-all duration-150
  cursor-pointer
"
// Estructura interna:
// [Icon container 40x40 rounded-xl bg gradient] [Texto flex-1] [Monto + emoción]
```

**Ícono de categoría:** Container 40x40px, `rounded-xl`, fondo con opacidad 20% del color de la categoría, ícono en el color de la categoría.

---

### Card Modal / Bottom Sheet

```jsx
className="
  bg-[#1A1530]
  border-t border-[#3D3460]/60
  rounded-t-3xl
  p-6 pb-safe
  shadow-[0_-8px_48px_rgba(0,0,0,0.6)]
"
// Drag handle: w-10 h-1 bg-[#3D3460] rounded-full mx-auto mb-4
```

---

### Card de Emoción (Emotion Badge)

```jsx
className="
  inline-flex items-center gap-1.5
  px-3 py-1
  bg-[color-de-emocion]/15
  border border-[color-de-emocion]/30
  text-[color-de-emocion] text-xs font-medium
  rounded-full
"
```

**Colores de emoción:** Ver tabla en sección 3 (Colores de Categorías Emocionales).

---

## 8. Diseño de Gráficos de Barras y Líneas

### Principios de Visualización en VALOR

1. **Los gráficos no son decoración** — cada gráfico debe responder una pregunta específica del usuario.
2. **Legibilidad sobre belleza** — si hay conflicto entre estético y legible en móvil, gana lo legible.
3. **Sin ejes sobrecargados** — solo los ejes mínimos necesarios. Grids muy sutiles.
4. **Colores semánticos y emocionales** — las barras usan el color de la emoción o categoría.

---

### Gráfico de Barras — Gasto por Categoría

```jsx
// Usando recharts o victory-native
// Configuración base:

const chartConfig = {
  bar: {
    fill: 'url(#barGradient)',    // gradiente violeta-fucsia
    radius: [6, 6, 0, 0],        // esquinas superiores redondeadas
    maxBarSize: 40,               // máx 40px de ancho en móvil
  },
  grid: {
    strokeDasharray: '3 3',
    stroke: '#3D3460',            // muy sutil
    opacity: 0.4,
  },
  xAxis: {
    tick: { fill: '#9C8EC1', fontSize: 11, fontFamily: 'Inter' },
    axisLine: false,
    tickLine: false,
  },
  yAxis: {
    tick: { fill: '#9C8EC1', fontSize: 11, fontFamily: 'Inter' },
    axisLine: false,
    tickLine: false,
    tickFormatter: (v) => `$${(v/1000).toFixed(0)}k`,
  },
  tooltip: {
    contentStyle: {
      backgroundColor: '#221C3D',
      border: '1px solid #3D3460',
      borderRadius: 12,
      color: '#F6F2FD',
      fontFamily: 'Inter',
      fontSize: 13,
    },
  },
}

// Definición del gradiente SVG (dentro del gráfico):
<defs>
  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={1} />
    <stop offset="100%" stopColor="#C026D3" stopOpacity={0.8} />
  </linearGradient>
</defs>
```

**Barras por emoción:** Cuando el gráfico muestra distribución emocional, cada barra tiene el color de la emoción correspondiente (ver tabla de emociones).

---

### Gráfico de Líneas — Tendencia de Gasto en el Tiempo

```jsx
const lineConfig = {
  line: {
    stroke: 'url(#lineGradient)',
    strokeWidth: 2.5,
    dot: false,                      // sin puntos en móvil
    activeDot: {                     // punto activo al tocar
      r: 5,
      fill: '#8B5CF6',
      stroke: '#F6F2FD',
      strokeWidth: 2,
    },
  },
  area: {
    fill: 'url(#areaGradient)',      // área bajo la línea
    fillOpacity: 1,
  },
}

// Gradientes:
<defs>
  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stopColor="#8B5CF6" />
    <stop offset="100%" stopColor="#EC4899" />
  </linearGradient>
  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
  </linearGradient>
</defs>
```

---

### Gráfico de Dona — Distribución por Categoría

```jsx
const donutConfig = {
  innerRadius: '60%',
  outerRadius: '85%',
  paddingAngle: 3,
  cornerRadius: 4,
  // Leyenda: abajo del gráfico, horizontal scrollable en móvil
  // Tooltip: centrado dentro del agujero de la dona con el label y porcentaje
}

// Centro del donut (absolute positioned):
// - Valor total: metric-lg
// - Label "total mes": label-sm
```

---

### Gráfico de Calendario de Calor — Mapa de Patrones

Visualiza la intensidad de gasto por día del mes:

```jsx
// Grid de 7 columnas (días de semana) x N filas (semanas)
// Cada celda: 36x36px en móvil, rounded-lg
// Color basado en intensidad: opacity de 20% a 100% del color de la emoción dominante del día
// Celda sin datos: bg-[#1A1530]
// Al tocar: bottom sheet con el desglose del día
```

---

### Reglas de Gráficos

- Siempre incluir un estado vacío cuando no hay datos (ver sección 9).
- El tooltip en móvil debe aparecer sobre el elemento, nunca cortado por el borde de pantalla.
- Usar `ResponsiveContainer` de recharts con `width="100%" height={220}` para gráficos de barra/línea.
- No usar más de 5 colores distintos en un mismo gráfico.
- Animación de entrada: `isAnimationActive={true}` con duración 800ms, easing `ease-out`.

---

## 9. Estados Vacíos

### Filosofía de Estados Vacíos

Los estados vacíos en VALOR son **invitaciones, no decepciones**. El usuario nuevo ve un estado vacío como la primera pantalla de algo que será suyo. El usuario recurrente sin datos ve un estado vacío como una pantalla limpia, un nuevo comienzo.

**Estructura de un estado vacío:**
1. Ilustración o ícono grande (48-64px, color de acento suave)
2. Título: curiosidad o posibilidad, máx 6 palabras
3. Cuerpo: qué podrá ver cuando haya datos, máx 2 líneas
4. CTA: acción específica (botón primario o ghost)

---

### Estado Vacío — Dashboard sin gastos registrados

```
[Ícono: gráfico de barras con signo de interrogación, violeta suave]

"Tu historia financiera comienza aquí"

Registra tu primer gasto y empieza a descubrir
los patrones que definen tu relación con el dinero.

[Botón primario: "Registrar primer gasto"]
```

---

### Estado Vacío — Historial sin resultados de búsqueda

```
[Ícono: lupa sobre fondo vacío]

"No encontramos nada con eso"

Intenta con otro término o revisa que
la fecha sea correcta.

[Botón ghost: "Limpiar filtros"]
```

---

### Estado Vacío — Mapa de patrones (primer mes)

```
[Ícono: mapa estelar/constelaciones, estilo abstracto violeta]

"Tu mapa emocional se está formando"

Necesitas al menos 7 días de registros para
ver los patrones que nos dicen algo real sobre ti.

[Botón ghost: "Entender cómo funciona"]
```

---

### Estado Vacío — Categoría sin gastos este mes

```
[Ícono: categoría con tachito vacío]

"Sin gastos en [Categoría] este mes"

Eso puede ser bueno, o simplemente que
aún no los has registrado.

[Sin CTA — el usuario ya sabe qué hacer]
```

---

### Estado Vacío — Presupuesto sin configurar

```
[Ícono: slider o ajuste, violeta]

"Aún no defines cuánto es suficiente"

Sin un límite, es difícil saber si estás
cerca o lejos. Solo toma un minuto.

[Botón primario: "Definir mi presupuesto"]
```

---

## 10. Estados de Carga

### Filosofía de Estados de Carga

La carga debe sentirse como algo que está pasando, no como que la app está rota. En VALOR, los estados de carga son suaves, respiran, y nunca muestran barras de progreso indeterminadas sin contexto.

---

### Skeleton Loading — Cards de Transacción

```jsx
// Clase base para skeleton
className="animate-pulse"

// Item de transacción skeleton:
<div className="flex items-center gap-3 p-3">
  <div className="h-10 w-10 rounded-xl bg-[#2D2550]/70" />
  <div className="flex-1 space-y-2">
    <div className="h-3.5 w-32 rounded-full bg-[#2D2550]/70" />
    <div className="h-3 w-20 rounded-full bg-[#221C3D]/70" />
  </div>
  <div className="h-4 w-16 rounded-full bg-[#2D2550]/70" />
</div>
```

**Animación:** `animate-pulse` de Tailwind — ciclo de opacidad 60-100% en 2s.
**Color:** `#2D2550` para el estado oscuro (unos tonos más claro que el fondo de la card).

---

### Skeleton Loading — Gráfico de Barras

```jsx
// Contenedor del gráfico con barras skeleton:
<div className="flex items-end gap-2 h-[160px] px-4 animate-pulse">
  {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.45].map((h, i) => (
    <div
      key={i}
      className="flex-1 rounded-t-lg bg-[#2D2550]/50"
      style={{ height: `${h * 100}%` }}
    />
  ))}
</div>
```

---

### Spinner — Para acciones puntuales (guardar, sincronizar)

```jsx
// Spinner inline dentro de botón
<div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />

// Spinner de pantalla completa (overlay) — usar solo en login/carga inicial
<div className="fixed inset-0 bg-[#0D0A1A]/80 backdrop-blur-sm flex items-center justify-center">
  <div className="flex flex-col items-center gap-4">
    <div className="h-8 w-8 border-3 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
    <p className="text-[#9C8EC1] text-sm font-medium">Cargando tu información...</p>
  </div>
</div>
```

---

### Loading de Gráfico Procesando

Cuando el mapa de patrones está calculando:

```
[Spinner pequeño violeta + texto]

"Analizando tus patrones..."

[Aparece solo si tarda más de 800ms, nunca inmediatamente]
```

---

### Transiciones de Carga

- **Fade in:** Cuando el contenido reemplaza el skeleton, usar `transition-opacity duration-300`
- **No usar loaders de barra de progreso** a menos que sea una operación medible (como importar CSV)
- **Mostrar skeletons inmediatamente**, nunca un div en blanco primero

---

## 11. Estados de Error

### Filosofía de Errores en VALOR

Un error en VALOR nunca es culpa del usuario. El sistema falló, la red tuvo un problema, algo salió mal — pero no el usuario. Los mensajes de error nunca usan palabras como "incorrecto", "inválido", "error" sin contexto humano.

---

### Error Inline — Campo de Formulario

```jsx
// Debajo del input, aparece con animation-slide-down
<p className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5">
  <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
  <span>Eso no parece un email válido. Revisa que tenga @ y un dominio.</span>
</p>

// El input en estado de error:
className="
  ... (clases base)
  border-red-700/60
  focus:border-red-500/60 focus:ring-red-500/20
"
```

**Tono:** Específico y útil. "Eso no parece un email" en vez de "Email inválido".

---

### Error de Red / Sin Conexión

```jsx
// Banner en la parte superior de la pantalla (full-width)
<div className="
  flex items-center gap-2 px-4 py-2.5
  bg-amber-950/80 border-b border-amber-900/50
  text-amber-300 text-sm font-medium
">
  <WifiOff className="h-4 w-4 flex-shrink-0" />
  <span>Sin conexión. Tus cambios se guardarán cuando vuelvas a conectarte.</span>
</div>
```

**Tono:** Informativo, no alarmante. El usuario sabe que sus datos están seguros.

---

### Error de Pantalla Completa — Fallo al Cargar Datos

```
[Ícono: nube con rayo, tono ámbar suave]

"Algo salió mal al cargar tu información"

No perdiste nada. Es un problema temporal
de nuestra parte.

[Botón primario: "Intentar de nuevo"]
[Botón ghost: "Volver al inicio"]

[Texto pequeño debajo: "Si el problema persiste, escríbenos."]
```

---

### Error de Servidor / 500

```
[Ícono: engranaje con alerta, violeta suave]

"Estamos trabajando en ello"

Nuestros servidores están pasando por
un momento difícil. Ya lo sabemos.

[Botón primario: "Reintentar"]

[Badge: "Estado del servicio: intervenido" — con link a status page]
```

---

### Error de Sesión Expirada

```
[Ícono: reloj con flecha circular]

"Tu sesión se cerró por seguridad"

Nada de qué preocuparse. Vuelve a entrar
y todo estará como lo dejaste.

[Botón primario: "Iniciar sesión"]
```

---

### Error de Validación en Registro de Gasto

Cuando el monto tiene formato incorrecto:

```
// Shake animation en el input
// Mensaje debajo: "Escribe solo el número, por ejemplo: 4500"
// Color del borde cambia a rosado-rojo suave, no rojo alarma
border-pink-900/60
```

---

## 12. Guía de Tono en Interfaz

### El Tono de VALOR en Tres Palabras

**Cálido. Directo. Respetuoso.**

---

### Lo que VALOR NO hace

| Prohibido | Por qué | Alternativa |
|-----------|---------|-------------|
| "Gastas demasiado en..." | Juzga | "Notamos un patrón interesante en..." |
| "¡Excelente! ¡Fantástico!" | Artificial, exclamativo | "Lo lograste." / "Bien hecho." |
| "Optimiza tus finanzas" | Jerga corporativa | "Entiende adónde va tu dinero" |
| "ROI", "activos", "pasivos" | Excluye | Explicar en lenguaje simple |
| "Error al guardar" | Frío, técnico | "No pudimos guardar eso. Intenta de nuevo." |
| "Presupuesto excedido" | Alarma | "Ya superaste tu límite de este mes en [categoría]" |
| "Ingresa tu contraseña" | Genérico | "Escribe tu contraseña" |
| "¿Estás seguro?" | Pasivo | "¿Quieres eliminar esto?" |
| Signos de exclamación múltiples | Infantiliza | Máximo un ! por pantalla, reservado para celebraciones reales |

---

### Principios de Tono

**1. Primera persona plural para contexto, segunda singular para acción**
- "Encontramos un patrón en tus gastos." (contexto, la app habla)
- "Tú defines cuándo y cómo cambiar." (autonomía del usuario)

**2. Verbos activos, no nominalizaciones**
- NO: "Realiza el registro de tu gasto"
- SÍ: "Registra este gasto"

**3. Tono específico por momento emocional del usuario**

| Momento | Tono | Ejemplo |
|---------|------|---------|
| Onboarding | Curioso, bienvenedor | "Cuéntanos un poco sobre ti" |
| Registro de gasto | Neutro, eficiente | "¿Cuánto fue?" |
| Dashboard positivo | Sereno, reconocedor | "Agosto fue tu mejor mes" |
| Dashboard con sobrecargo | Empático, no alarmista | "Marzo fue un mes de más gastos de lo usual" |
| Insight descubierto | Curioso, invitador | "¿Sabías que gastas más los viernes?" |
| Meta cumplida | Cálido, auténtico | "Lo lograste. Sin dramas." |
| Error | Claro, sin culpa | "Algo salió de nuestro lado. Ya lo sabemos." |

**4. Sin metáforas de batalla o competencia**
- NO: "Combate tus gastos", "Vence tus deudas"
- SÍ: "Entiende tus gastos", "Trabaja con tus finanzas"

**5. Celebraciones sin exceso**
Las celebraciones son genuinas, breves y sin confeti digital a menos que el logro sea extraordinario (primera meta cumplida, primer mes en verde, etc.).

---

## 13. Microcopy — 20 Ejemplos

### Botones

1. **Botón primario de onboarding (paso 1):**
   - "Empezar" *(no "Comenzar mi viaje financiero")*

2. **Botón de registro de gasto:**
   - "Agregar gasto" *(no "Registrar nueva transacción")*

3. **Botón de confirmación de eliminación:**
   - "Sí, eliminar" *(no "Confirmar")*

4. **Botón de cancelar en modal:**
   - "Mejor no" *(alternativa humana a "Cancelar", usar con contexto)*

5. **Botón de reintento:**
   - "Intentar de nuevo" *(no "Retry" ni "Reintentar")*

---

### Placeholders

6. **Input de monto:**
   - `Ej: 4.500` *(con punto de miles del sistema chileno)*

7. **Input de descripción del gasto:**
   - `¿En qué fue? (opcional)`

8. **Input de búsqueda en historial:**
   - `Buscar en tus gastos...`

9. **Input de nombre en onboarding:**
   - `¿Cómo te llamas?`

10. **Input de email:**
    - `tu@email.com`

---

### Mensajes de Éxito

11. **Gasto registrado:**
    - "Guardado. Ya es parte de tu historia."

12. **Meta de ahorro creada:**
    - "Meta creada. A trabajar en ello."

13. **Presupuesto configurado:**
    - "Listo. Ahora sabes cuánto es suficiente."

14. **Primera semana completada:**
    - "Una semana de registros. Ya podemos ver algo."

15. **Cuenta creada:**
    - "Bienvenido/a. Esto es tuyo."

---

### Mensajes de Sistema / Contexto

16. **Tooltip de emoción en gasto:**
    - "¿Qué sentías cuando hiciste esta compra?"

17. **Insight de patrón (viernes):**
    - "Los viernes gastas 40% más que el resto de la semana. ¿Tiene sentido para ti?"

18. **Label de categoría sin presupuesto:**
    - "Sin límite definido"

19. **Timestamp de sincronización:**
    - "Actualizado hace 3 minutos"

20. **Mensaje de empty state de insight:**
    - "Aún no tenemos suficiente para decirte algo real. Registra unos días más."

---

## 14. Recomendaciones Mobile-First

### Filosofía Mobile-First en VALOR

VALOR es una app de bolsillo. El registro de un gasto debe poder hacerse en 15 segundos, con una mano, mientras el usuario aún está en la caja. El diseño mobile-first no es "diseñar para teléfonos primero" — es "diseñar para momentos de vida real primero."

---

### Touch Targets

| Elemento | Tamaño mínimo | Recomendado |
|----------|--------------|-------------|
| Botón principal | 44px altura | 48px |
| Item de lista | 44px altura | 56px |
| Tab bar icon | 44x44px | 48x48px |
| Botón icon-only | 40x40px | 44x44px |
| Checkbox / switch | 20x20px touch area real, pero wrapper 44x44px | — |
| Link inline | padding 4px alrededor | — |

**Regla de oro:** Ningún elemento interactivo debe tener menos de 44px en su dimensión más pequeña, incluyendo padding de área de toque invisible.

```jsx
// Patrón para aumentar touch target sin afectar visual:
className="relative inline-flex items-center"
// Elemento real:
className="h-5 w-5"
// Pseudo-elemento de toque:
before:absolute before:inset-[-12px] before:content-['']
```

---

### Espaciado y Márgenes

| Contexto | Valor | Tailwind |
|----------|-------|---------|
| Padding horizontal de pantalla | 16px | `px-4` |
| Padding horizontal de pantalla (secciones importantes) | 20px | `px-5` |
| Gap entre cards de lista | 8px | `gap-2` |
| Gap entre secciones del dashboard | 20px | `gap-5` |
| Padding interno de card base | 16px | `p-4` |
| Padding interno de card elevada | 20px | `p-5` |
| Bottom padding (sobre tab bar) | 80px + safe-area | `pb-20 pb-safe` |
| Top padding (bajo status bar) | 48px + safe-area | `pt-12 pt-safe` |

```css
/* Safe area insets para notch y home indicator */
.pb-safe { padding-bottom: env(safe-area-inset-bottom); }
.pt-safe { padding-top: env(safe-area-inset-top); }
```

---

### Legibilidad en Móvil

1. **Tamaño mínimo de texto interactivo:** 14px. Nunca menos para botones o labels tocables.
2. **Tamaño mínimo de texto de apoyo:** 12px, con color `#9C8EC1` que tiene contraste suficiente sobre fondos oscuros.
3. **Contraste mínimo:** El texto primario `#F6F2FD` sobre `#110E22` tiene ratio 14.5:1 (muy superior al mínimo WCAG AA de 4.5:1).
4. **Interlineado:** `leading-relaxed` (1.625) para párrafos. `leading-tight` (1.25) para métricas y números.
5. **No truncar texto crítico** — montos, nombres de categorías y emociones nunca se cortan con ellipsis.

---

### Navegación Mobile

**Bottom Tab Bar:**
```jsx
className="
  fixed bottom-0 inset-x-0
  bg-[#0D0A1A]/95 backdrop-blur-md
  border-t border-[#3D3460]/40
  flex items-center justify-around
  px-4 pt-2
  pb-[calc(0.5rem+env(safe-area-inset-bottom))]
  h-[56px+safe-area-inset-bottom]
"

// Tab item:
className="flex flex-col items-center gap-0.5 min-w-[44px] py-1"
// Ícono: 24x24px
// Label: text-[10px] font-medium tracking-wide
// Active: text-violet-400, inactive: text-[#6B5E8A]
```

**Tabs del Dashboard:**
```jsx
// Scroll horizontal para tabs, no wrap
className="flex gap-2 overflow-x-auto scrollbar-none pb-1"
// Cada tab: shrink-0 para no colapsar
```

---

### Gestos y Interacciones

| Gesto | Acción en VALOR |
|-------|----------------|
| Swipe left en item de lista | Revelar opciones (editar, eliminar) |
| Swipe right en item de lista | Marcar como revisado |
| Long press en gráfico | Modo de inspección detallada |
| Pull to refresh | Sincronizar datos |
| Swipe down en modal | Cerrar bottom sheet |
| Tap en card de insight | Expandir explicación |

---

### Performance Mobile

1. **Imágenes:** Usar `next/image` con formato WebP. Lazy loading por defecto.
2. **Animaciones:** Solo `transform` y `opacity` para animaciones de 60fps. Evitar `top/left/margin` animados.
3. **Listas largas:** Virtualizar con `react-window` o `@tanstack/virtual` para el historial.
4. **Gráficos:** Cargar recharts con `dynamic(() => import('recharts'), { ssr: false })` para no bloquear el bundle inicial.
5. **Esqueletos:** Mostrar inmediatamente (0ms), nunca esperar 200ms antes de mostrar loading.

---

### Formulario de Registro de Gasto — Optimizado para Móvil

```
Objetivo: 5 toques máximo para registrar un gasto completo

Tap 1: Botón flotante (+) en dashboard
Tap 2: Input de monto (teclado numérico aparece automáticamente)
[Escribir: 4500]
Tap 3: Selección de categoría (grid de iconos, 1 tap)
Tap 4: Emoción (selector horizontal de 5 emociones, 1 tap)
Tap 5: "Guardar"

Total: 5 toques + escribir el número
```

**El teclado:**
```jsx
// Forzar teclado numérico
inputMode="decimal"
// Para montos en CLP (sin decimales):
inputMode="numeric"
pattern="[0-9]*"
```

---

## 15. Wireframes Textuales

### Notación de Wireframes

```
[ELEMENTO]          = Componente visual
|texto|             = Contenido de texto
{acción}            = Elemento interactivo
═══                 = Separador de sección
···                 = Espacio / padding
▓▓▓                 = Área de color / gradiente
░░░                 = Área de imagen / ilustración
```

---

### 15.1 Landing Page (Web)

```
┌─────────────────────────────────────────────┐
│  [HEADER]                                   │
│  ···  [^] VALOR  ···············  {Entrar}  │
├─────────────────────────────────────────────┤
│                                             │
│  [HERO — fondo Void #0D0A1A]                │
│                                             │
│  ···                                        │
│  [Label: "Finanzas Emocionales"]            │
│                                             │
│  |Tus finanzas|                             │
│  |tienen emociones.|    ← display-xl        │
│                         gradiente violeta-rosado
│                                             │
│  |Deja de mirar números y empieza a|        │
│  |entender por qué gastas como gastas.|     │
│  body-lg, color text-secondary              │
│                                             │
│  {Empezar gratis}  {Ver cómo funciona}      │
│  [botón primario]  [botón ghost]            │
│                                             │
│  ▓▓▓ [Gráfico demo animado: barras de       │
│  ▓▓▓  categorías con etiquetas de emoción]  │
│  ▓▓▓  (glassmorphism card, floating)        │
│                                             │
├─────────────────────────────────────────────┤
│  [SECCIÓN: El problema]                     │
│                                             │
│  |No es falta de información.|              │
│  |Es falta de autoconocimiento.|            │
│                                             │
│  [3 cards horizontales en desktop / stack en mobile]
│  [Card 1] Ves números, no patrones         │
│  [Card 2] Sabes el qué, no el por qué      │
│  [Card 3] Cambias sin entender             │
│                                             │
├─────────────────────────────────────────────┤
│  [SECCIÓN: Cómo funciona]                   │
│                                             │
│  |Registra| → |Conecta emoción| → |Descubre|│
│                                             │
│  [Steps numerados con ilustraciones]        │
│                                             │
├─────────────────────────────────────────────┤
│  [SECCIÓN: Screenshots mobile]              │
│  [3 pantallas flotantes: Dashboard, Mapa,   │
│   Registro] sobre fondo violeta profundo    │
│                                             │
├─────────────────────────────────────────────┤
│  [FOOTER CTA]                               │
│  |Empieza a entenderte.|                    │
│  {Crear cuenta gratis}                      │
│                                             │
│  [Enlace a Términos] [Enlace a Privacidad]  │
│  © 2026 VALOR. Chile.                       │
└─────────────────────────────────────────────┘
```

---

### 15.2 Onboarding (4 Pasos, Mobile)

```
┌─────────────────────────────┐
│  PASO 1/4                   │
│                             │
│  [Indicador de pasos: ●○○○] │
│                             │
│  ░░░ [Ilustración: persona  │
│  ░░░  mirando su teléfono   │
│  ░░░  con expresión curiosa]│
│                             │
│  |Hola. Somos VALOR.|       │
│                             │
│  |Aquí vas a entender por   │
│  |qué gastas como gastas.   │
│  |No te vamos a juzgar.|    │
│                             │
│  {Empezar}  ← botón primario│
└─────────────────────────────┘

┌─────────────────────────────┐
│  PASO 2/4                   │
│  [●●○○]                     │
│                             │
│  |¿Cómo te llamas?|         │
│                             │
│  [Input: ¿Cómo te llamas?]  │
│                             │
│  |Solo para que esto se     │
│  |sienta personal, no       │
│  |burocrático.|             │
│  text-tertiary, body-sm     │
│                             │
│  {Continuar}                │
└─────────────────────────────┘

┌─────────────────────────────┐
│  PASO 3/4                   │
│  [●●●○]                     │
│                             │
│  |¿Cómo describes tu        │
│  |relación con el dinero?|  │
│                             │
│  [4 opciones de chip:]      │
│  {Caótica}  {Tensa}         │
│  {Ordenada} {Evitativa}     │
│                             │
│  |No hay respuesta correcta.│
│  |Esto nos ayuda a mostrar  │
│  |lo que importa primero.|  │
│                             │
│  {Continuar}                │
└─────────────────────────────┘

┌─────────────────────────────┐
│  PASO 4/4                   │
│  [●●●●]                     │
│                             │
│  |Ya está, [Nombre].|       │
│                             │
│  |Tu espacio está listo.    │
│  |Registra tu primer gasto  │
│  |cuando quieras.|          │
│                             │
│  ░░░ [Animación sutil:      │
│  ░░░  dashboard vacío       │
│  ░░░  con estados vacíos]   │
│                             │
│  {Ir a mi dashboard}        │
└─────────────────────────────┘
```

---

### 15.3 Dashboard Principal (Mobile)

```
┌─────────────────────────────┐
│  [STATUS BAR]               │
├─────────────────────────────┤
│  [HEADER]                   │
│  Hola, María  ···  [🔔] [⚙]│
│  Jueves, 20 de junio        │
├─────────────────────────────┤
│  [CARD PRINCIPAL — Saldo /  │
│   Gasto del Mes]            │
│  ┌───────────────────────┐  │
│  │ [glass, elevated]     │  │
│  │                       │  │
│  │ GASTO ESTE MES        │  │
│  │ $482.300              │  │ ← metric-xl, gradiente
│  │                       │  │
│  │ ↑ 12% vs mes anterior │  │ ← danger text-sm
│  │                       │  │
│  │ ─────────────────     │  │
│  │ Presupuesto: $600.000 │  │
│  │ [Barra de progreso    │  │
│  │  80% violeta]         │  │
│  └───────────────────────┘  │
├─────────────────────────────┤
│  [TABS DE PERÍODO]          │
│  {Semana} {Mes} {Año}       │
│  ← scroll horizontal        │
├─────────────────────────────┤
│  [GRÁFICO DE BARRAS]        │
│  ┌───────────────────────┐  │
│  │ [glass base]          │  │
│  │ Gasto por categoría   │  │
│  │                       │  │
│  │  ▓  ▓▓ ▓  ▓▓▓ ▓  ▓   │  │
│  │  C  A  T  E  G  O     │  │
│  └───────────────────────┘  │
├─────────────────────────────┤
│  [INSIGHT DESTACADO]        │
│  ┌───────────────────────┐  │
│  │ 💡 Patrón detectado   │  │
│  │                       │  │
│  │ Gastas más los        │  │
│  │ viernes. ¿Sabías?     │  │
│  │           {Ver más →} │  │
│  └───────────────────────┘  │
├─────────────────────────────┤
│  [ÚLTIMAS TRANSACCIONES]    │
│  Recientes       {Ver todo} │
│  ───────────────────────    │
│  [🍕] Uber Eats     -$8.500 │
│       Ansiedad · Hace 2h    │
│  ─────────────────────      │
│  [⛽] Copec         -$45.000│
│       Rutina · Ayer         │
│  ─────────────────────      │
│  [👗] Zara          -$29.990│
│       Celebración · Lun     │
├─────────────────────────────┤
│  [TAB BAR]                  │
│  🏠     📊     ➕     📅    👤│
│  Inicio  Patro  +   Histor Perfil│
└─────────────────────────────┘
```

---

### 15.4 Registro de Gasto (Bottom Sheet / Modal)

```
┌─────────────────────────────┐
│  [Overlay oscuro 60%]       │
│                             │
│  ┌───────────────────────┐  │
│  │ [Bottom Sheet]        │  │
│  │ ──── [drag handle] ─  │  │
│  │                       │  │
│  │ Nuevo gasto           │  │
│  │                       │  │
│  │ ¿Cuánto fue?          │  │
│  │ ┌─────────────────┐   │  │
│  │ │  $  _________   │   │  │
│  │ │  (teclado numérico)  │  │
│  │ └─────────────────┘   │  │
│  │                       │  │
│  │ Categoría             │  │
│  │ [Grid 4x2 de iconos]  │  │
│  │ 🍕 🚗 🏠 👗           │  │
│  │ 🎮 💊 📚 ✈️           │  │
│  │                       │  │
│  │ ¿Qué sentías?         │  │
│  │ [Row horizontal:]     │  │
│  │ 😰  😴  🎉  😤  😌    │  │
│  │ Ans Abur Cel Est Com  │  │
│  │                       │  │
│  │ Descripción (opcional)│  │
│  │ [Input: ¿En qué fue?] │  │
│  │                       │  │
│  │ {Guardar gasto}       │  │
│  │                       │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

---

### 15.5 Historial de Gastos

```
┌─────────────────────────────┐
│  [HEADER]                   │
│  ← Historial                │
│                             │
│  [BÚSQUEDA]                 │
│  [🔍 Buscar en tus gastos...│
│                             │
│  [FILTROS — scroll horizontal]
│  {Todos} {Este mes} {Comida}│
│  {Ansiedad} {+Filtros}      │
│                             │
│  ═══════════════════════════│
│  JUNIO 2026                 │
│  ─────────────────────      │
│  [🍕] Uber Eats    -$8.500  │
│       Jun 20 · Ansiedad     │
│  ─────────────────────      │
│  [⛽] Copec       -$45.000  │
│       Jun 19 · Rutina       │
│  ─────────────────────      │
│  [👗] Zara        -$29.990  │
│       Jun 18 · Celebración  │
│                             │
│  ═══════════════════════════│
│  MAYO 2026                  │
│  ─────────────────────      │
│  [🍺] Bar con amigos -$18.000
│       May 31 · Celebración  │
│  [···más items···]          │
│                             │
│  [Paginación o infinite     │
│   scroll con skeleton]      │
│                             │
│  [TAB BAR]                  │
└─────────────────────────────┘
```

---

### 15.6 Mapa de Patrones Emocionales

```
┌─────────────────────────────┐
│  [HEADER]                   │
│  ← Tus Patrones             │
│                             │
│  [SELECTOR DE PERÍODO]      │
│  {Jun 2026} ←  →            │
│                             │
│  ═══════════════════════════│
│  [CALENDARIO DE CALOR]      │
│  ┌───────────────────────┐  │
│  │ L  M  X  J  V  S  D   │  │
│  │ ░  ░  ▒  ░  ▓  ▒  ░   │  │
│  │ ░  ▒  ░  ░  ▓  ░  ░   │  │
│  │ ▒  ░  ▓  ░  ▓  ▒  ░   │  │
│  │ ░  ░  ░  ▒  ▓  ░  ░   │  │
│  │                       │  │
│  │ Intensidad: baja ░ alta▓ │
│  └───────────────────────┘  │
│                             │
│  ═══════════════════════════│
│  DISTRIBUCIÓN EMOCIONAL     │
│                             │
│  [Dona chart]               │
│  ┌───────────────────────┐  │
│  │      ╔═══╗            │  │
│  │   ╔══╝   ╚══╗         │  │
│  │   ║  Ans    ║         │  │
│  │   ║  42%    ║         │  │
│  │   ╚══╗   ╔══╝         │  │
│  │      ╚═══╝            │  │
│  │                       │  │
│  │ ● Ansiedad  42%       │  │
│  │ ● Celebración  28%    │  │
│  │ ● Rutina  18%         │  │
│  │ ● Otras  12%          │  │
│  └───────────────────────┘  │
│                             │
│  ═══════════════════════════│
│  INSIGHTS DETECTADOS        │
│                             │
│  ┌───────────────────────┐  │
│  │ Los viernes gastas    │  │
│  │ más y con más         │  │
│  │ ansiedad.             │  │
│  │ ¿Tiene sentido?  {Sí} │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ Tu gasto de celebración│ │
│  │ subió 60% este mes.   │  │
│  │ ¿Fue un buen mes?     │  │
│  └───────────────────────┘  │
│                             │
│  [TAB BAR]                  │
└─────────────────────────────┘
```

---

### 15.7 Perfil de Usuario

```
┌─────────────────────────────┐
│  [HEADER]                   │
│  Mi Perfil                  │
│                             │
│  [AVATAR + INFO]            │
│  ┌───────────────────────┐  │
│  │ [glass elevated]      │  │
│  │                       │  │
│  │  [Avatar 64px circular│  │
│  │   con iniciales en    │  │
│  │   gradiente violeta]  │  │
│  │                       │  │
│  │  María González        │  │
│  │  maria@email.com      │  │
│  │  Miembro desde Jun 2026│ │
│  └───────────────────────┘  │
│                             │
│  ═══════════════════════════│
│  ESTADÍSTICAS               │
│                             │
│  [3 metric cards en row]    │
│  ┌──────┐┌──────┐┌──────┐  │
│  │  45  ││  3   ││  92% ││  │
│  │gastos││meses ││regist.│  │
│  └──────┘└──────┘└──────┘  │
│                             │
│  ═══════════════════════════│
│  CONFIGURACIÓN              │
│                             │
│  [Lista de settings:]       │
│  Presupuesto mensual     →  │
│  Categorías personalizadas→ │
│  Notificaciones          →  │
│  Exportar mis datos      →  │
│  ─────────────────────      │
│  Privacidad y seguridad  →  │
│  Términos de uso         →  │
│  ─────────────────────      │
│  [Botón ghost: "Cerrar sesión"]
│                             │
│  ─────────────────────      │
│  [Botón destructivo:        │
│   "Eliminar mi cuenta"]     │
│                             │
│  [TAB BAR]                  │
└─────────────────────────────┘
```

---

## Apéndice: Variables CSS Globales Recomendadas

```css
/* globals.css */

:root {
  /* Fondos */
  --color-void: #0D0A1A;
  --color-deep: #110E22;
  --color-surface-1: #1A1530;
  --color-surface-2: #221C3D;
  --color-surface-3: #2D2550;
  --color-border-subtle: #3D3460;
  --color-border-strong: #5B4E8A;

  /* Marca */
  --color-violet: #8B5CF6;
  --color-violet-hover: #7C3AED;
  --color-fuchsia: #C026D3;
  --color-pink: #EC4899;

  /* Texto */
  --color-text-primary: #F6F2FD;
  --color-text-secondary: #C4B5FD;
  --color-text-tertiary: #9C8EC1;
  --color-text-disabled: #6B5E8A;

  /* Semánticos */
  --color-success: #34D399;
  --color-warning: #FBBF24;
  --color-danger: #F87171;
  --color-info: #60A5FA;

  /* Gradiente principal */
  --gradient-brand: linear-gradient(135deg, #7C3AED 0%, #C026D3 50%, #EC4899 100%);
  --gradient-text: linear-gradient(90deg, #8B5CF6, #EC4899);

  /* Sombras */
  --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.4);
  --shadow-card-elevated: 0 8px 32px rgba(0, 0, 0, 0.5);
  --shadow-brand: 0 8px 24px rgba(139, 92, 246, 0.30);
  --shadow-brand-hover: 0 12px 32px rgba(139, 92, 246, 0.40);

  /* Tipografía */
  --font-display: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Inter', sans-serif;

  /* Radios */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-full: 9999px;

  /* Transiciones */
  --transition-fast: all 150ms ease-out;
  --transition-base: all 200ms ease-out;
  --transition-slow: all 300ms ease-out;
}
```

---

## Apéndice: Configuración Tailwind Recomendada

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        valor: {
          void: '#0D0A1A',
          deep: '#110E22',
          surface: {
            1: '#1A1530',
            2: '#221C3D',
            3: '#2D2550',
          },
          border: {
            subtle: '#3D3460',
            strong: '#5B4E8A',
          },
          violet: '#8B5CF6',
          'violet-hover': '#7C3AED',
          fuchsia: '#C026D3',
          pink: '#EC4899',
          text: {
            primary: '#F6F2FD',
            secondary: '#C4B5FD',
            tertiary: '#9C8EC1',
            disabled: '#6B5E8A',
          },
        },
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #7C3AED 0%, #C026D3 50%, #EC4899 100%)',
        'gradient-text': 'linear-gradient(90deg, #8B5CF6, #EC4899)',
        'gradient-card': 'linear-gradient(135deg, rgba(34,28,61,0.9) 0%, rgba(26,21,48,0.9) 100%)',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-elevated': '0 8px 32px rgba(0, 0, 0, 0.5)',
        'brand': '0 8px 24px rgba(139, 92, 246, 0.30)',
        'brand-hover': '0 12px 32px rgba(139, 92, 246, 0.40)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'scale-in': 'scaleIn 0.15s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

---

*Documento generado para VALOR — Finanzas Emocionales. Versión 1.0. Junio 2026.*
*Aplicable directamente a React + Tailwind CSS. Todos los valores de color, espaciado y tipografía son implementables sin adaptación.*
