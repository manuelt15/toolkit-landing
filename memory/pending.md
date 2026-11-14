# Pendientes

## ⏳ Abierto

- Actualizar `content/catalog.json` cuando cambie el catálogo de toolkit-public. La sección
  "Por qué existe" depende de él: autores (campo `repo`) y el número de skills propias.
- Módulo `repo-seguridad`: Gitleaks en cada commit, .env fuera de git y protecciones de GitHub con gh-secure. Pasos en `docs/toolkit/modulos/repo-seguridad.md`.
- Módulo `diseno`: falta `@shadcn/lint` (paso del módulo). Pasos en `docs/toolkit/modulos/diseno.md`.
- Instalar la skill `grill-me`: `npx skills add mattpocock/skills --skill grill-me -g -a claude-code -a codex -a hermes-agent -y`

## ⛔ Decidido: no volver a proponer

- 2026-11-07: sin aviso legal completo ni páginas legales: proyecto gratuito sin actividad
  económica, sin cookies, analítica ni formularios. Contacto por issues de GitHub.
- 2026-11-07: los 6 avisos de `npm audit` vienen de la CLI `shadcn`, que no entra en la web
  compilada. No se tocan (el "arreglo" sería bajar shadcn a 1.0.0).
