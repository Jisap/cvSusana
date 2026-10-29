# CV Susana — landing + versiones ATS

Landing personal y generador de versiones del currículum para una asesora de
ventas con más de una década de experiencia en firmas de moda. Cada versión se
adapta a una familia de ofertas y se puede guardar como PDF ATS.

> **Importante:** el contenido actual de `src/data/cv.ts` es un ejemplo
> realista, no los datos reales de Susana. Hay que sustituir nombre, contacto,
> empresas, fechas y métricas antes de publicar.

## URLs

| Ruta | Contenido |
| --- | --- |
| `/` | Landing moderna con el CV completo (contenido maestro) |
| `/cv` | Versión ATS por defecto (retail de lujo) |
| `/cv/retail-lujo` | Client Advisor / asesora de ventas en lujo |
| `/cv/dependienta` | Dependienta / Sales Assistant |
| `/cv/visual-merchandising` | Visual merchandiser / asesora de imagen |
| `/cv/supervision-tienda` | Supervisión / coordinación de tienda |
| `/ats` | Analizador: pega una oferta y recomienda versión + carencias |

## Stack

| Pieza | Para qué |
| --- | --- |
| Astro 7 | HTML estático, rutas por archivos, cero JS por defecto |
| Tailwind CSS 4 | Landing y herramienta ATS, tokens en CSS |
| TypeScript strict | Validación del contenido y de la lógica ATS |
| `@astrojs/check` | Typecheck de `.astro` y `.ts` |

El build es 100 % estático. No hay backend: el analizador ATS se ejecuta en el
navegador con los datos incrustados en la página.

## Comandos

```sh
npm install
npm run dev          # http://localhost:4321
npm run build        # dist/
npm run preview
npm run check        # typecheck
```

Servidor en segundo plano:

```sh
astro dev --background
astro dev status
astro dev logs
astro dev stop
```

## Estructura

```text
src/
├─ data/
│  ├─ cv.ts                 ← contenido maestro: experiencia, skills, formación
│  └─ variants.ts           ← versiones ATS: titulares, keywords y presupuestos
├─ lib/
│  └─ ats.ts                ← selección de contenido, análisis y auditoría
├─ layouts/
│  └─ BaseLayout.astro
├─ components/
│  ├─ SiteHeader.astro
│  ├─ Hero.astro
│  ├─ Section.astro
│  ├─ Experience.astro
│  ├─ Skills.astro
│  ├─ Education.astro
│  ├─ SiteFooter.astro
│  └─ ATSDocument.astro     ← plantilla imprimible compartida por /cv/*
├─ pages/
│  ├─ index.astro           → /
│  ├─ ats.astro             → /ats
│  ├─ cv.astro              → /cv (variante por defecto)
│  └─ cv/[variant].astro    → /cv/:variant (getStaticPaths)
└─ styles/
   └─ global.css
```

## Modelo: un maestro, varias versiones

`cv.ts` guarda **todo** lo que Susana ha hecho. `variants.ts` no duplica el
contenido: define cómo seleccionarlo para cada tipo de oferta.

Cada variante tiene:

```ts
{
  id: 'retail-lujo',
  label: 'Retail de lujo',
  headline: 'Asesora de ventas senior · Client Advisor',
  summary: 'Resumen orientado a la oferta...',
  keywords: ['venta consultiva', 'clientela vip', 'crm', 'inglés', ...],
  priorityTags: ['ventas', 'vip', 'fidelizacion', 'crm', ...],
  maxDetailedRoles: 3,
  maxBulletsPerRole: 4,
}
```

La landing siempre muestra el maestro completo. Las páginas `/cv/*` construyen
una versión reducida en build time con `buildCV()`.

## Cómo sintetizar una experiencia larga en dos folios

La regla práctica para retail con 12+ años:

1. **Guarda todo en el maestro.** No borres experiencia; el maestro permite
   versionar y recordar logros.
2. **Detalla solo los últimos 10–12 años.** Las variantes muestran como máximo
   3 puestos. El resto se convierte en una línea dentro de «Experiencia
   anterior» con el campo `condensed`.
3. **Presupuesto de viñetas.** 3–4 por puesto reciente y 9–12 en total. Cada
   viñeta debe aportar algo distinto; si repite «atención al cliente», se
   fusiona.
4. **Agrupa funciones, no empresas.** «Reposición, inventario y control de
   stock» en una sola viñeta con métrica, en lugar de repetir la misma tarea en
   tres tiendas.
5. **Verbo + qué + cómo + resultado.** Ejemplo débil: «Atención al cliente y
   ventas». Ejemplo útil: «Desarrollé una cartera de 120 clientes VIP con CRM y
   logré una recompra del 64 %».
6. **Cuantifica lo que sea cierto.** Ticket medio, conversión, recompra,
   objetivos, m² de tienda, tamaño de equipo, unidades por transacción. Si no
   hay dato, no se inventa: se describe el alcance.
7. **El tercio superior vende.** Titular, resumen y habilidades deben reflejar
   las palabras exactas de la oferta que se persigue.
8. **Una versión por familia de puesto.** No uses el mismo CV para lujo,
   dependienta, visual merchandising y supervisión: cambian las prioridades.

El proyecto automatiza el presupuesto: `maxDetailedRoles` y
`maxBulletsPerRole` recortan por prioridad, y los puestos antiguos se condensan
siempre. `/ats` muestra la estimación de páginas y avisa si una versión se pasa
de dos.

## Lógica ATS implementada

### 1. Construcción de la versión (`buildCV`)

- Toma los `maxDetailedRoles` puestos más recientes.
- Puntúa cada viñeta: prioridad (`1` alta, `3` baja), coincidencia con
  `priorityTags` de la variante y si contiene cifras.
- Conserva las mejores `maxBulletsPerRole` en su orden original.
- Convierte el resto de puestos en líneas condensadas (`condensed`).
- Reordena grupos y habilidades según las `keywords` de la variante.
- Calcula qué palabras clave de la variante aparecen (`keywordsFound`) y
  cuáles faltan (`keywordsMissing`).

### 2. Auditoría (`auditCV`)

Cada tarjeta de `/ats` muestra avisos automáticos:

- palabras clave de la variante que no aparecen;
- más de 12 viñetas seleccionadas;
- viñetas de más de 240 caracteres;
- viñetas sin cifras;
- estimación superior a dos páginas;
- puestos antiguos sin línea condensada.

La estimación de páginas es heurística (caracteres / 3300) y sirve como alarma,
no como medida exacta. El PDF real se comprueba con la vista de impresión.

### 3. Analizador de ofertas (`/ats`)

Al pegar una oferta:

1. Normaliza el texto (minúsculas, sin acentos, sin signos).
2. Elimina palabras vacías y genéricas de las ofertas.
3. Extrae términos únicos y su frecuencia.
4. Aplica un pequeño diccionario de sinónimos retail
   (`dependienta` ↔ `vendedora` ↔ `sales assistant`).
5. Compara los términos contra cada versión del CV en dos planos:
   - **CV completo**: lo que verá el reclutador.
   - **Evidencia**: skills, experiencia, formación e idiomas, sin el resumen
     orientado (evita que el resumen maquille la recomendación).
6. Calcula el encaje con las keywords propias de cada variante.
7. Puntúa: `45 % CV + 35 % evidencia + 20 % encaje` y ordena las versiones.

El resultado muestra la versión recomendada, el ranking, los términos que
faltan y las coincidencias. Todo ocurre en el navegador y reutiliza
`analyzeText()` de `src/lib/ats.ts`, así que no hay dos implementaciones que se
puedan desincronizar.

> El analizador es orientativo. Ningún ATS puntúa igual y ningún truco supera
> a un CV claro con experiencia real. Añade un término solo si puedes
> defenderlo en una entrevista.

## Editar contenido

### Añadir o cambiar un puesto

```ts
{
  role: 'Asesora de ventas senior',
  company: 'Firma de moda de lujo',
  location: 'Madrid',
  start: '2019',
  end: 'Presente',
  summary: 'Una línea de contexto.',
  tags: ['Lujo', 'CRM', 'Clientela VIP'],
  bullets: [
    {
      text: 'Superé el objetivo anual entre un 112 % y un 128 %.',
      tags: ['ventas', 'kpi', 'objetivos'],
      priority: 1,
    },
  ],
}
```

- `priority: 1` = imprescindible; `2` = importante; `3` = prescindible.
- `tags` se comparan con `priorityTags` de cada variante.
- Los puestos que queden fuera de `maxDetailedRoles` necesitan `condensed`:

```ts
{
  role: 'Dependienta',
  company: 'Firma de complementos',
  location: 'Valencia',
  start: '2009',
  end: '2011',
  bullets: [],
  condensed: 'Atención al cliente, reposición y caja en tienda de centro comercial.',
}
```

### Crear una variante

Añade un objeto a `src/data/variants.ts`:

```ts
{
  id: 'mi-variante',
  label: 'Nombre visible',
  focus: 'Para qué tipo de oferta sirve.',
  headline: 'Titular que verá el ATS.',
  summary: 'Resumen con las keywords principales, siempre verdadero.',
  keywords: ['atención al cliente', 'caja', 'tpv'],
  priorityTags: ['atencion', 'caja', 'tpv'],
  maxDetailedRoles: 3,
  maxBulletsPerRole: 3,
}
```

La ruta `/cv/mi-variante` se genera automáticamente y aparece en `/ats`. Para
cambiar la versión por defecto, edita `defaultVariantId`.

### Ajustar keywords y sinónimos

- `keywords` de cada variante: lo que debe contener sí o sí esa versión.
- `STOPWORDS` en `src/lib/ats.ts`: palabras que el analizador ignora.
- `SYNONYM_GROUPS`: equivalencias que cuentan como coincidencia (por ejemplo,
  `caja` / `cobro` / `cash desk`).
- Si una variante muestra `keywordsMissing`, añade el término de forma natural
  al resumen, skills o experiencia; no lo pegues en una lista al final.

## Generar el PDF

1. Abre la variante, por ejemplo `/cv/retail-lujo`.
2. Pulsa «Imprimir / Guardar PDF».
3. Elige A4, márgenes predeterminados y «Guardar como PDF».
4. Desactiva «Gráficos de fondo» si el navegador lo permite.
5. Comprueba que el PDF tiene texto seleccionable y no pasa de dos páginas.

La plantilla `ATSDocument.astro` usa una sola columna, encabezados semánticos,
fechas en texto, listas reales y `break-inside: avoid` para no partir puestos
entre páginas.

## Recordatorio de Astro

- **Rutas por archivos**: `src/pages/index.astro` → `/`;
  `src/pages/cv/[variant].astro` + `getStaticPaths()` → una página por variante.
- **Script de servidor**: lo que va entre `---` se ejecuta en build. Debajo,
  HTML con expresiones `{}`.
- **Props**: `interface Props` + `Astro.props` (ver `Section.astro`).
- **Slots**: `<slot />` inserta contenido hijo (`BaseLayout`, `Section`).
- **Estilos con scope**: un `<style>` dentro de `.astro` afecta solo a ese
  componente. `global.css` se importa una vez en el layout.
- **JS de cliente**: un `<script>` se empaqueta y solo se envía si la página lo
  usa. `/ats` lo usa para el analizador y `/cv` para imprimir.
- **Datos en build**: `buildCV()` se ejecuta al generar el sitio; los PDF son
  siempre coherentes con `cv.ts` y `variants.ts`.

## Recordatorio de Tailwind 4

- Instalado con `astro add tailwind` → plugin `@tailwindcss/vite` en
  `astro.config.mjs`. No hay `tailwind.config.js`.
- `@import "tailwindcss";` al inicio de `global.css`.
- Tokens en `@theme { ... }`: `--color-accent` genera `bg-accent`,
  `text-accent`, `border-accent`, etc.
- Opacidad sobre tokens: `bg-surface/80`, `border-line/70`.
- Modo oscuro automático con `prefers-color-scheme`. No hay toggle.

## Checklist antes de publicar

- [ ] Sustituir todos los datos de ejemplo en `cv.ts`.
- [ ] Verificar que cada métrica es real.
- [ ] Revisar el titular y el resumen de cada variante.
- [ ] Confirmar que las variantes existen para las ofertas que se persiguen.
- [ ] Generar cada PDF y comprobar que tiene 1–2 páginas.
- [ ] Pegar el PDF en un lector de texto y confirmar el orden de lectura.
- [ ] Probar `/ats` con 3–4 ofertas reales.
- [ ] Cambiar `title`/`description` si cambia el enfoque.
- [ ] `npm run check` y `npm run build`.
- [ ] Desplegar `dist/` (Netlify, Vercel, Cloudflare Pages o GitHub Pages).

## Próximos pasos

1. Facilitar los datos reales: empresas, fechas, métricas, idiomas y formación.
2. Decidir qué variantes quiere mantener Susana (lujo, dependienta, visual,
   supervisión) y eliminar las que no use.
3. Ajustar las keywords con 5–10 ofertas reales de su mercado.
4. Opcional: foto en la landing (nunca en `/cv`), dominio propio y analítica.
