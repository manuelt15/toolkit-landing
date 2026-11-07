---
id: diseno
title: Diseño
when: Cualquier proyecto con interfaz
gives: Componentes shadcn sobre Radix construidos desde tu sistema de diseño, skills de diseño y movimiento, y un lint que impide saltarse el sistema
costs: Dependencias de shadcn y @shadcn/lint; definir DESIGN.md antes de la primera pantalla
requires: []
conflicts: []
skills: [shadcn, design-taste-frontend, emil-design-eng, apple-design, animation-vocabulary, improve-animations, find-animation-opportunities, review-animations, pick-ui-library]
---

# Módulo: diseño

## Qué incluye
| Pieza | Tipo | Para qué |
|---|---|---|
| shadcn/ui | Componentes + skill oficial | Base de componentes que son tuyos (se copian al proyecto) |
| Taste Skill (Leonxlnx) | Skills | Evitar frontends genéricos ("anti-slop") |
| Skills de Emil Kowalski | Skills | Animación, detalle de UI, `emil-design-eng`, `apple-design`... |
| `@shadcn/lint` | Linter (npm) | Que el agente no se salte el sistema de diseño (colores crudos, restyle) |
| getdesign.md | Referencia | Estructura de DESIGN.md y ejemplos de marcas reales |
| Apple HIG | Referencia | https://developer.apple.com/design/human-interface-guidelines |
| Vercel Design Guidelines | Referencia | https://vercel.com/design/guidelines |

## Cuándo
Cualquier proyecto con interfaz.

## Reglas
- **Primero tu sistema de diseño.** Antes de generar ninguna pantalla se pide el del usuario:
  un `DESIGN.md`, los tokens (color, tipografía, radios, espaciado) o un enlace de Figma. Se
  vuelca en el `DESIGN.md` del proyecto.
- Si no tiene: se rellena `DESIGN.md` con él partiendo de una referencia de getdesign.md.
  Nunca se arranca con el tema por defecto de shadcn.
- **Radix por defecto.** shadcn se inicia con `--base radix` (el CLI usa Base UI si no se dice).
- **Nada genérico.** Va al `AGENTS.md` del proyecto: "No generes diseños genéricos de shadcn.
  Toda UI sale de DESIGN.md; si falta un token, pregunta en vez de inventarlo."

## Decisiones
- ¿Sistema propio, importado (Figma, tokens) o partir de un DESIGN.md de getdesign.md?
- ¿Qué variante de Taste? (`design-taste-frontend` por defecto; hay minimalist, brutalist, soft...)

## Instalación
```bash
npx shadcn@latest init --base radix
npx skills add shadcn-ui/ui --skill shadcn -a <agente>
npx skills add Leonxlnx/taste-skill --skill design-taste-frontend -a <agente>
npx skills@latest add emilkowalski/skills -a <agente>
npm install -D @shadcn/lint eslint @typescript-eslint/parser
```
Después: `plantillas/DESIGN.md` al proyecto y rellenarlo.

## Notas
- Varias skills de Emil ya estaban instaladas en global (`~/.claude/skills`). Con este módulo
  pasan a instalarse por proyecto; las globales se pueden quitar cuando todo esté migrado.
- getdesign.md tiene partes de pago (DESIGN.md privados, Catalog Pass). Lo gratuito basta.
