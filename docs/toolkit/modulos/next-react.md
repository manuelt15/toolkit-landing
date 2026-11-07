---
id: next-react
title: Next.js y React
when: Proyectos con Next.js
gives: Convenciones de App Router y reglas de rendimiento de React
costs: Nada
requires: []
conflicts: []
skills: [next-best-practices, vercel-react-best-practices]
---

# Módulo: Next.js y React

## Qué incluye
| Pieza | Tipo | Para qué |
|---|---|---|
| `next-best-practices` | Skill (Vercel) | Convenciones de App Router, RSC, datos, metadata, route handlers |
| `vercel-react-best-practices` | Skill (Vercel) | Rendimiento en React/Next |

## Cuándo
Proyectos con Next.js (tu stack por defecto con TypeScript).

## Instalación
```bash
npx skills add vercel-labs/openreview --skill next-best-practices -a <agente>
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices -a <agente>
```
(Comandos deducidos de las URLs de skills.sh: comprobar en la página antes de ejecutar.)

## Notas
- Si ya las tienes en global, el arranque pregunta si las quieres también en el proyecto.
- Seguridad de serie en Next: cabeceras y CSP en la config, zod en route handlers y server
  actions. Ver `seguridad-rgpd`.
