<!-- toolkit:public v0.0.0 -->
## Flujo de sesión (obligatorio)
- Al empezar: ejecuta `tk start` y lee lo que imprime (si no tienes `tk`, lee
  `memory/MEMORY.md`). Lee `memory/pending.md` antes de proponer trabajo.
- Al terminar una sesión con cambios: skill `cierre`. Con `tk`: `tk close`, rellena los
  huecos que deja y `tk close --commit` (commit de memory/ sin push). No termines sin hacerlo.
- Una memoria es una foto del momento: comprueba ficheros y funciones contra el código antes
  de darlos por ciertos.

## Skills de este proyecto
- `cierre`: Deja handover, pendientes y lecciones para que la siguiente sesión sepa qué seguir
- `seguridad-rgpd`: RGPD, LOPDGDD, LSSI-CE, AI Act y seguridad mínima, con lo que bloquea un lanzamiento
- `shadcn`: Añadir, componer y arreglar componentes shadcn (sobre Radix y tu DESIGN.md)
- `diseno-propio`: Toda la UI sale de DESIGN.md; si falta un token se pregunta; checklist anti-genérico

Además, desde la instalación global de cada máquina: `systematic-debugging`, `verification-before-completion`, `emil-design-eng`, `next-best-practices`, `vercel-react-best-practices`, `nuevo-proyecto`, `grill-me`, `find-skills`, `humanizer`.

## Diseño
- No generes diseños genéricos de shadcn. Toda UI sale de `DESIGN.md`; si falta un token,
  pregunta en vez de inventarlo.
- shadcn sobre Radix: `npx shadcn@latest init --base radix`.
- Antes de la primera pantalla y al revisar UI: skill `diseno-propio` (y su checklist).

## Módulos
Guía de cada módulo (qué incluye, decisiones, instalación y cumplimiento) en
`docs/toolkit/modulos/`. Léela antes de tocar esa parte.
<!-- /toolkit:public -->

<!-- toolkit:profile manuelt15 -->
## Reglas del autor
- Antes de implementar algo no trivial, plan con criterios verificables y confirmación.
- Mínimo código que resuelve el problema: sin features ni abstracciones no pedidas. Cambios
  quirúrgicos, respetando el estilo del fichero.
- Nada se da por terminado sin demostrar que funciona (tests, logs o ejecución real).
- Preguntar antes de añadir una dependencia que no se haya pedido.
- Secretos solo en variables de entorno; nunca commitear `.env` ni credenciales.
- Sin co-author del agente en los commits. Nada de push a `main` ni deploy a producción sin
  confirmación explícita.
- Textos (app, documentos, commits, respuestas): sin raya larga ni separadores decorativos.
  Usar punto, coma, dos puntos o paréntesis.
- Tras una corrección, documentar el patrón en `memory/lessons.md`.
- Apps con usuarios en España/UE: aplicar `seguridad-rgpd` al planear y antes de lanzar.
<!-- /toolkit:profile -->

<!-- toolkit:project -->
## Este proyecto
Landing de tk: explica qué es el toolkit, cómo se usa y cómo instalarlo

- Arquitectura: Landing
- Módulos: repo-seguridad, diseno, next-react, legal
- Memoria: `memory/`
<!-- /toolkit:project -->

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
