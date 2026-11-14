# Lecciones

Solo correcciones reales. Formato: corrección, causa, fix, regla.

## Desplegada en la cuenta de Vercel del trabajo (2026-11-07)
- **Corrección:** el deploy fue a la cuenta de Vercel del trabajo; se borró.
- **Causa:** usé la sesión de la CLI sin preguntar.
- **Regla:** esta landing se despliega desde el Vercel personal de Manuel. Antes de
  cualquier `vercel` aquí, confirmar la cuenta. Ver lessons del toolkit.

## Texto sobre las skills que prometía de más (2026-11-14)
- **Corrección:** Manuel pidió que la sección "Por qué existe" no se inventara nada de las skills.
- **Causa:** el primer borrador decía "comprobaciones de secretos antes de publicar" (esa
  auditoría es solo para publicar tk, no la hace en los proyectos) y "desde su repositorio"
  (Stripe y Graphify no se instalan desde un repo).
- **Fix:** cada frase se contrastó con el `SKILL.md` de `diseno-propio` y `seguridad-rgpd` y con
  `checklist()` de `src/session.mjs`; autores sacados del campo `repo` del catálogo.
- **Regla:** cualquier texto de la web sobre lo que hace una skill o un comando se verifica antes
  contra su `SKILL.md` o su código, y nombra la skill que lo hace.
