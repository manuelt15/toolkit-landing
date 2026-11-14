# Handover 2026-11-14: Por qué existe y tk en npm

## Qué se hizo

- Sección **"Por qué existe"** (`id="por-que"`) tras la fila "Funciona con": título, entradilla,
  tres tarjetas (`WHY` en `app/page.tsx`) y chips "Con skills de" con los 20 orígenes de las
  skills de terceros (`AUTHORS`, del campo `repo` de `content/catalog.json`, ordenados por número
  de skills; un origen sin `/` enlaza a su web, p. ej. docs.stripe.com).
- `NPM_LIVE = true`: badge "En npm: @manuelt15/toolkit" y enlaces a repo, npm e issues en el pie.
- README: la sección nueva en "Qué cuenta" y la nota de `NPM_LIVE` al día.
- Commit `90ede2b` en main, push con el ok de Manuel; con él subió `5eaa188` (memoria de las
  animaciones, que estaba pendiente).

## Cómo se verificó

- `tsc --noEmit` y lint sin errores; `npm run build` compila.
- Navegador local a 375 px y escritorio: 0 px de desborde, chips en varias filas sin romper.
- Producción (toolkit-landing-delta.vercel.app): "Por qué existe" y "En npm: @manuelt15/toolkit"
  presentes, 0 "Pronto en npm", enlace al repo presente.

## Pendiente

Nada nuevo de la web. El catálogo sigue copiándose a mano desde toolkit-public.

## Trampas

- El primer texto prometía cosas que las skills no hacen: ver lessons.md.
