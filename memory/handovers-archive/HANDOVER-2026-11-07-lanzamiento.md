# Handover 2026-11-07: lanzamiento de la landing

## Qué se hizo
- Pasos de "Cómo funciona" con icono (lucide, baldosa squircle al 30 %) y "Paso N" en vez
  del número; un icono por módulo (`MODULE_ICONS` en `app/page.tsx`, `Blocks` si falta).
- Catálogo sincronizado con toolkit-public (faltaba `diseno-propio`: 41 a 42 skills).
- Móvil: los terminales de "Sesiones" ensanchaban la página a 472 px (hijos de grid sin
  `min-w-0`). Arreglado; terminal a 11 px en pantallas pequeñas.
- Favicon `app/icon.svg` con variante oscura, `app/apple-icon.png` (180 px), fuera el
  `favicon.ico` de Next. Título "tk: proyectos con agentes".
- `seguridad-rgpd`: cabeceras en `next.config.ts`, `text-faint` a `text-muted` para pasar
  AA, `npm audit` revisado (ver pending).
- `NPM_LIVE = false`: "Pronto en npm" y sin enlaces a GitHub ni npm hasta publicar.
- README nuevo con portada (`docs/img/portada.jpg`).
- Repo `manuelt15/toolkit-landing` creado y hecho público por Manuel; historial reescrito a
  `manuelt15 <195821676+manuelt15@users.noreply.github.com>` (y `user.name`/`user.email`
  locales fijados a eso). Último commit `e654554`.
- Publicada por Manuel en su Vercel personal: https://toolkit-landing-delta.vercel.app
  (despliega desde `main`). Un deploy previo en la cuenta del trabajo se borró.

## Cómo se verificó
- Lint y build limpios tras cada cambio; servidor local en :3123.
- Panel a 320, 375, 414, 768, 1024 y 1440 px: `scrollWidth == clientWidth`, ningún elemento
  fuera del viewport; capturas en móvil de todas las secciones.
- `curl -sI`: las cuatro cabeceras de seguridad; en Vercel, 200, título nuevo y
  "Pronto en npm".
- Historial en GitHub: denylist 0, gitleaks limpio.

## Qué queda
- `NPM_LIVE = true` tras publicar tk (ver pending).

## Trampas
- Ver lessons: la CLI de Vercel de este Mac es la cuenta del trabajo.
- `pkill -f "next start"` no mata el servidor (el proceso se llama `next-server`): cerrar por
  puerto con `kill $(lsof -ti tcp:3123)`.
- Chrome headless no baja de ~500 px de ancho: para móvil, medir en el panel del navegador.
