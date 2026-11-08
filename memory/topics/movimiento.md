# Movimiento

Criterio de Emil Kowalski (skill `emil-design-eng`), aplicado el 2026-11-08. Detalle y
trampas en el [handover](../handovers-archive/HANDOVER-2026-11-08-animaciones.md).

## Reglas de esta landing
- Curvas: `ease-snappy` para lo que entra o responde a una pulsación, `ease-glide` para lo
  que se desplaza. Nunca las de serie ni `ease-in`.
- Duraciones: 160 ms pulsación, 200 ms selector y chevron, 400 a 500 ms solo en entradas de
  marketing (se ven una vez).
- Solo `transform`, `opacity` y sus primas (`scale`, `rotate`, `translate`). Nunca
  `transition-all`.
- Entradas al hacer scroll con `Revela`, por bloque (cabecera y contenido), nunca tarjeta a
  tarjeta. Si el envoltorio cae dentro de una rejilla, `min-w-0`.
- Estado oculto solo bajo `@media (scripting: enabled)`: sin JavaScript se ve todo.
- `prefers-reduced-motion`: solo opacidad; terminales completos.

## Fuera a propósito
- El cambio de tema (`.sin-transicion` lo deja instantáneo): solo se desliza el indicador.
- Hovers de enlaces del menú y del footer: color u opacidad, sin más.
- El scroll del menú: ya es suave.
