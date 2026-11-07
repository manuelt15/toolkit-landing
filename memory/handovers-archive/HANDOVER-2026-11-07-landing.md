# Handover 2026-11-07: landing

## Qué se hizo
- Proyecto montado con `tk` desde una carpeta vacía (preset landing, perfil manuelt15, identidad personal, comandos de terceros solo del proyecto).
- `DESIGN.md` a partir del sistema aportado por Manuel (referencia getdesign.md, estilo Mobbin): tokens en `app/globals.css`, Inter (sustituto de Saans), sin rayas largas.
- App Next 16 (create-next-app aparte, incorporada sin pisar los ficheros de tk) y shadcn sobre Radix (`radix-nova`): button, badge, accordion.
- Landing en `app/page.tsx`: hero con terminal, "Funciona con" (logos de skills.sh), cómo funciona, sesiones, 15 módulos y 5 tipos de proyecto leídos de `content/catalog.json`, seguridad, instalar con aviso "Próximamente en npm", preguntas y footer.
- Modo claro, oscuro y sistema: script en `<head>` sin parpadeo, control segmentado en la nav, transiciones desactivadas al cambiar. Paleta oscura derivada y escrita en `DESIGN.md`.
- `design-taste-frontend` quitada (skills.sh la marca de riesgo crítico y elige paletas al azar); en su lugar la skill propia `diseno-propio`.
- Revisado en el navegador: claro, oscuro y estrecho, sin errores de consola; lint y build limpios.

## Qué queda
- Revisar la paleta oscura de `DESIGN.md` (derivada, pendiente de ok de Manuel).
- Repo en GitHub y módulo repo-seguridad (Gitleaks en pre-commit, gh-secure).
- Legal antes de publicar: aviso legal (LSSI), sin cookies ni analítica hoy.
- Dominio y despliegue, cuando tk esté en npm (la sección Instalar lo dice).

## Decisiones
- Logos de agentes: los de la marquesina de skills.sh, sin alterar, en squircle, en gris con color al pasar.
- `content/catalog.json` es una copia del catálogo de toolkit-public: actualizarla al cambiar el catálogo.
- Taste fuera del proyecto: con DESIGN.md propio manda DESIGN.md.

## Cambios (generado por tk close)

Commits desde el último cierre:
- c4e1aaf feat: landing de tk (Next 16, shadcn sobre Radix, DESIGN.md propio, modo claro/oscuro/sistema)
