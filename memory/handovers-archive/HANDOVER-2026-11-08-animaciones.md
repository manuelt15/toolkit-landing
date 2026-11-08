# Handover 2026-11-08: animaciones con el criterio de Emil

## Qué se hizo
Commit `3d7fee7`, en producción (https://toolkit-landing-delta.vercel.app).
- Curvas en `@theme` de `app/globals.css`: `--ease-snappy` (0.23, 1, 0.32, 1) y
  `--ease-glide` (0.77, 0, 0.175, 1), usables como `ease-snappy` y `ease-glide`.
- Portada: `.entra` (keyframes `entrada`, 400 ms, una vez al cargar) en titular, texto,
  botones y fila de agentes, escalonados con `--d` (0, 60, 120, 240 ms).
- `components/site/revela.tsx`: marca `data-dentro` una vez con `IntersectionObserver`.
  Cada `Section` tiene dos `Revela` (cabecera y contenido); el terminal de la portada va en
  su propio `Revela` con `min-w-0`.
- Terminal: cada línea es `.linea` con `--i`; salen cada 70 ms cuando su `Revela` entra.
- Pulsación `active:scale-[0.97]` (160 ms) en los CTA, en "Instalar" del menú y en el chip de
  npm (cuando `NPM_LIVE`).
- Selector de tema: indicador `.indicador-tema` que se desliza (`translateX`, 200 ms,
  `ease-glide`); excepción a `.sin-transicion` en `globals.css` para que no se congele.
- Acordeón: un solo `ChevronDownIcon` que gira 180°; `transition-all` a `transition-colors`.
- `prefers-reduced-motion`: solo opacidad, sin desplazamiento, terminales completos.
- Fuera a propósito: cambio de tema, hovers de enlaces y scroll del menú.

## Cómo se verificó
- Lint, `tsc` y build limpios; CSS compilado con las utilidades y la curva propia.
- Navegador del panel con la build de producción: retardos (0,45 a 1,15 s en las líneas),
  indicador 68 a 34 px con 200 ms incluso durante el cambio a oscuro, chevron a 147° a mitad
  del cierre, los 12 bloques marcados tras entrar por `#modulos` y saltar al final, terminal
  de la portada que en móvil espera al scroll, 0 px de desborde de 320 a 1440.
- Chrome headless con `--force-prefers-reduced-motion`: solo opacidad.
- Producción: HTML con `entra` y 13 `revela`; CSS con `@keyframes entrada`, `ease-snappy`,
  `indicador-tema` y `scripting:enabled`.
- Sin probar en Safari ni en un móvil físico.

## Trampas
- Tailwind 4: `active:scale-*` y `rotate-*` usan las propiedades `scale` y `rotate`, no
  `transform`. Una transición `[..., transform]` no anima la pulsación: usar `scale`.
  (`transition-transform` sí incluye `translate, scale, rotate`.)
- `IntersectionObserver` no avisa de un elemento que salta de debajo a encima de la pantalla
  sin cruzarla (scroll rápido, enlace del menú): `rootMargin` superior enorme
  (`100000px 0px -15% 0px`) para que lo de arriba cuente como visto.
- Un envoltorio dentro de una rejilla vuelve a necesitar `min-w-0` aunque el hijo tuviera
  `overflow-hidden` (pasó con el terminal de la portada: 6 px de desborde).
- El panel del navegador oculto no pinta: sin pintado no corren `IntersectionObserver` ni las
  transiciones y las lecturas salen viejas. Hacer una captura antes de medir.
- Navegar a `#ancla` en la misma URL no recarga: añadir un `?v=` para probar una build nueva.
- Chrome headless con `--virtual-time-budget` no ejecuta bien el observador: el terminal sale
  vacío aunque en tiempo real funcione.
