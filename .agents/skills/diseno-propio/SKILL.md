---
name: diseno-propio
description: Hace que toda la interfaz salga del sistema de diseño del proyecto (DESIGN.md) y no de valores por defecto ni de modas. Usar antes de crear la primera pantalla, al construir o revisar cualquier UI, y cuando falte un color, tamaño o componente que el sistema no define.
---

# Diseño propio

Objetivo: que nadie pueda reconocer en la interfaz el tema por defecto de una librería ni el
estilo de "web hecha por IA". Todo sale de `DESIGN.md`; lo que no está ahí se pregunta.

## 1. Antes de la primera pantalla

1. **Lee `DESIGN.md` entero.** Si no existe o tiene tablas vacías, para y créalo con el
   usuario antes de escribir UI:
   - Pregunta si ya tiene sistema: un `DESIGN.md`, tokens (JSON o CSS) o un enlace de Figma.
   - Si no tiene, propón dos o tres referencias de getdesign.md con una frase sobre el carácter
     de cada una, y que elija. Adáptala al proyecto (nombre, contenido, idioma); no copies la
     marca de la referencia.
   - Deja escritos: color (con su uso), tipografía (familias, escala, pesos, interlineado),
     radios, espaciado, componentes y sus estados, movimiento, voz y qué no hacer.
2. **Pasa los tokens a código antes de maquetar:** variables CSS o tema de Tailwind. En los
   componentes no hay valores sueltos, solo tokens.
3. **shadcn:** `npx shadcn@latest init --base radix` y sustituye su tema por los tokens. Un
   componente de shadcn sin restilar no se entrega.

## 2. Mientras construyes

- **Todo valor visual sale de un token.** Si falta uno, pregunta en vez de inventarlo. Cuando
  el usuario decide, añádelo a `DESIGN.md` en el mismo cambio.
- **Jerarquía por contraste dentro de la escala:** peso, tamaño y color de la tabla
  tipográfica. Nada de tamaños intermedios inventados.
- **Una escala de radios y una de espaciado.** Sin mezclar.
- **Contenido real.** Nada de lorem ipsum, cifras, usuarios, testimonios ni logos de clientes
  inventados. Si falta un dato, un marcador visible: `[DATO]`.
- **Una sola librería de iconos.** Nunca emojis como iconos.
- **Sin efectos que el sistema no pida:** degradados morados o de arcoíris, glassmorphism,
  sombras grandes, blobs, todo centrado, rejillas bento por costumbre.
- **Accesible:** contraste WCAG 2.2 AA, foco visible, objetivos táctiles de 44px y
  `prefers-reduced-motion` respetado.
- **Modo oscuro:** solo si `DESIGN.md` lo define. Si se pide y no está, deriva la paleta de las
  reglas del sistema, escríbela en `DESIGN.md` como pendiente de revisar y dilo.
- **Marcas de terceros** (logos de agentes, integraciones): el fichero oficial sin alterar,
  respetando las normas de uso de cada marca.

## 3. Antes de dar una pantalla por terminada

- [ ] Ningún color, tamaño, radio o sombra fuera de `DESIGN.md` (busca hex y px sueltos en los
      componentes).
- [ ] No se reconoce el tema por defecto de la librería (radios, grises, fuente).
- [ ] Nada de contenido inventado.
- [ ] Se ve bien a 390, 768 y 1280 px.
- [ ] Revisada de verdad en el navegador, en los dos modos si existen, y sin errores en consola.

## 4. Con otras skills de diseño

Si el proyecto tiene `DESIGN.md`, manda `DESIGN.md`. No uses skills que elijan paletas,
tipografías o plantillas por su cuenta (por ejemplo, `design-taste-frontend` reparte paletas
al azar). Las de pulido y movimiento, como `emil-design-eng` o `apple-design`, sí encajan:
trabajan dentro del sistema.
