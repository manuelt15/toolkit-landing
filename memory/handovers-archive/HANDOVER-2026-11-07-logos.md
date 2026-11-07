# Handover 2026-11-07: logos

## Qué se hizo
- Logos de "Funciona con" sin caja: solo el símbolo de cada marca a 24px junto al nombre.
- Claude y Codex: trazo sacado de los iconos de skills.sh (quitado el cuadro negro, recortado a
  su contorno con getBBox). Claude en su naranja (#D97757); Codex en negro y en blanco para oscuro.
- Hermes: ilustración vectorial oficial del repo de Nous Research (MIT), negra y blanca.
- Comprobado en el navegador en claro y en oscuro; lint y build limpios.

## Qué queda
- Lo de memory/pending.md (paleta oscura, repo y seguridad, legal antes de publicar).

## Decisiones
- Nada de iconos en caja: con este sistema se ven forzados. Logo de OpenAI siempre en blanco y negro (su norma).

## Cambios (generado por tk close)

Commits desde el último cierre:
- fe74167 feat: logos de agentes sin caja (solo el símbolo), con versión clara y oscura

```
DESIGN.md                       |   5 +-
 app/page.tsx                    |  31 ++++++-----
 public/agents/claude-code.svg   |   1 -
 public/agents/claude.svg        |   1 +
 public/agents/codex-black.svg   |   1 +
 public/agents/codex-white.svg   |   1 +
 public/agents/codex.svg         |   1 -
 public/agents/hermes-black.svg  | 104 ++++++++++++++++++++++++++++++++++++
 public/agents/hermes-white.svg  | 113 ++++++++++++++++++++++++++++++++++++++++
 public/agents/nous-research.svg |  10 ----
 10 files changed, 238 insertions(+), 30 deletions(-)
```
