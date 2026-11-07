---
name: cierre
description: Cierra la sesión: handover, índice, topic file, lecciones y commit. Crea la estructura si el proyecto no la tiene.
---

Cierra la sesión actual documentándola. Sigue los pasos en orden y **no te salgas de ellos**.

## Atajo: proyectos con `toolkit.lock.json` y `tk` instalado

`tk close` hace lo mecánico: comprueba si hay algo que cerrar, crea el handover con los
commits y ficheros de la sesión, añade la línea al índice, archiva lo cerrado de
`pending.md` y pasa la checklist de seguridad según los módulos. Deja huecos marcados con
`<!-- tk:rellenar -->`. Tú pones el juicio:

1. Ejecuta `tk close` (opcional `--slug <tema>`). Si dice "Nada que cerrar", termina.
2. Rellena todos los huecos del handover y de `MEMORY.md` (Qué se hizo, Qué queda,
   Decisiones, gancho del índice). Concreto: ficheros, decisiones y por qué.
3. En `pending.md`, marca con ✅ o ⛔ lo cerrado y añade lo nuevo. Lección en
   `lessons.md` solo si hubo una corrección real. Actualiza el topic file si toca.
4. Atiende los `!` de la checklist o apúntalos en `pending.md`.
5. Ejecuta `tk close --commit`: se niega si queda algún hueco, y commitea solo `memory/`,
   sin push.

Sin `tk`, sigue los pasos de abajo a mano.

## Paso 0. ¿Hay algo que cerrar?

Mira el trabajo real de la sesión: `git status`, `git diff`, `git log` de hoy, y lo hablado en la conversación.

- Si la sesión fue **solo consulta** (leer, explicar, responder preguntas) y no produjo cambios ni decisiones nuevas: **dilo y no escribas nada.** Un handover que dice "hablamos de cosas" es ruido que ensucia el índice.
- Si hubo trabajo, decisiones, hallazgos o incidentes: continúa.

## Paso 1. Localizar dónde vive la memoria

En este orden: la memoria externa que indique el `AGENTS.md` del proyecto (si la hay) → `memory/` → `MEMORY.md` en raíz → `tasks/`.

La primera es memoria **fuera del repo con su propio git** (repos compartidos que retiraron
`memory/`). Ahí el commit del paso 4 se hace con
`git -C <esa carpeta>`, no en el repo del proyecto.

**Si no existe ninguna**, hay que crearla. Cuenta los autores del historial
(`git log --format='%ae' | sort -u | wc -l`) y propón, sin ejecutar todavía:

- **1 autor** → `memory/` en el repo (versionado, con historial y rollback).
- **Varios autores** → fuera del repo, para no meter notas personales en código de otros.
  En Claude: `~/.claude/projects/<slug-del-cwd>/memory/`, donde `<slug>` = la ruta absoluta
  con `/` sustituido por `-`. En otros agentes: `~/.toolkit-memoria/<slug>/` (no versionada).
- **No es un repo git** → crea los ficheros y no intentes commitear.

Pregunta antes de crear. Si dice que sí, crea **solo tres ficheros**:
`MEMORY.md` (índice), `pending.md` (lo que quede abierto) y el handover.
**No crees** `behavioral-guidelines.md` ni `subagentes.md`: duplican las reglas globales
y la lista de agentes que ya se inyecta sola. `lessons.md` solo cuando haya una lección real.

### Vault de Obsidian (solo al crear la estructura por primera vez)

Ofrece enlazar la memoria a un vault propio del proyecto, **uno por proyecto para que
ninguno se mezcle con otro** (cada vault es un grafo y una búsqueda independientes):

```
<padre-común>/<NombreVault>/memory  →  ../<repo>/memory
```

El symlink va **RELATIVO**, nunca absoluto: así resuelve en cualquier Mac sin depender
del nombre de usuario ni de la ruta del home. Exige que vault y repo compartan carpeta
padre. Al terminar, avisa de que hay **un paso manual una sola vez**: abrir Obsidian →
*Open folder as vault* → esa carpeta.

Nunca enlaces un proyecto dentro de un vault existente de otro proyecto.

### Defensas de iCloud (solo si el repo está bajo ~/Desktop o ~/Documents)

Si el repo está en una carpeta sincronizada por iCloud y su `.gitignore` no tiene los
patrones de duplicados, ofrece añadirlos: iCloud crea `"file 2.ts"` y ha llegado a
romper un `git fetch` entero vía `.git/refs/stash 2`:

```
* [0-9]
* [0-9].*
* [0-9][0-9]
* [0-9][0-9].*
```

Y el mismo check en `.husky/pre-commit` y `pre-push` si el repo usa husky.

## Paso 2. Escribir

1. **Handover** en `handovers-archive/HANDOVER-YYYY-MM-DD-<slug>.md` (créala si no existe).
   Fecha de hoy, real. Contenido: qué se hizo · números de PR y SHA · **cómo se verificó**
   (comandos y salidas reales, no "debería funcionar") · qué queda pendiente y de quién
   depende · trampas encontradas.
2. **Línea en el índice**, arriba: `- [Título](ruta) - gancho de una frase`.
   Una línea por entrada. El índice se inyecta en cada arranque: si crece sin control,
   avisa de que conviene recortarlo.
3. **Topic file del tema tocado**: actualiza el que exista; solo crea uno nuevo si el
   tema no tiene sitio. Enlázalo desde el índice.
4. **`lessons.md`**: solo si el usuario te corrigió o te estrellaste con algo real.
   Formato: **corrección → causa → fix → regla**. Nada de lecciones inventadas para
   rellenar.
5. **Podar `pending.md`.** Lo que la sesión cerró se marca con ✅ (hecho) o ⛔ (decidido no
   hacerlo) en el título de su sección `## `, y se archiva con el script:
   `tk close` lo archiva solo. Sin `tk`: mueve a mano esas secciones a `pending-archive.md`.
   Mueve enteras a `pending-archive.md` las secciones con ✅ o ⛔ en el título (respeta
   «⏳ Abierto» y «⛔ Decidido»). Por cada ⛔ que mueva, añade **una línea** a
   «## ⛔ Decidido: no volver a proponer» con la decisión y su fecha. Si lo cerrado era una
   viñeta de «⏳ Abierto», se quita la viñeta (y si fue una decisión, línea en «Decidido»).
   Sin `pending.md` en el proyecto, el script no hace nada.

Convierte fechas relativas a absolutas ("mañana" → la fecha). Escribe para alguien que
no estuvo en la sesión.

## Paso 3. Verificar antes de commitear

Tres comprobaciones. Son la diferencia entre una memoria que se mantiene y una que se
degrada hasta que hay que ordenarla a mano (pasó el 5/8/2026: 56 handovers sueltos en la
raíz y 8 enlaces muertos acumulados sin que nadie se enterara).

1. **Ningún handover en la raíz.** Su sitio es `handovers-archive/`:
   ```
   ls <memoria>/HANDOVER-*.md 2>/dev/null && echo "MAL: mover a handovers-archive/"
   ```
2. **Ningún enlace roto.** Valida los DOS formatos: los enlaces markdown
   `[texto](fichero.md)` y los wikilinks `[[fichero]]` de Obsidian.

```
cd <memoria> && python3 -c "
import os,re,glob
fich=glob.glob('*.md')+glob.glob('handovers-archive/*.md')
nom={os.path.splitext(f)[0] for f in fich}|{os.path.splitext(os.path.basename(f))[0] for f in fich}
roto=0
for f in fich:
    b=os.path.dirname(f); s=open(f,encoding='utf-8',errors='ignore').read()
    for t in re.findall(r'\]\(([^)]+\.md)\)', s):
        if t.startswith(('http','obsidian:')): continue
        if not os.path.exists(os.path.normpath(os.path.join(b,t))):
            roto+=1; print('ROTO md  ', f, '->', t)
    s=re.sub(r'\`\`\`.*?\`\`\`','',s,flags=re.S); s=re.sub(r'\`[^\`]*\`','',s)
    for t in re.findall(r'\[\[([^\]]+)\]\]', s):
        t=re.split(r'[|#^]',t)[0].strip()
        if t and t not in nom:
            roto+=1; print('ROTO wiki', f, '-> [['+t+']]')
print(roto, 'rotos')"
```
   Si el que rompiste es tuyo, arréglalo. Si ya estaba roto, **compruébalo contra HEAD**
   (`git ls-tree -r --name-only HEAD`) antes de atribuírtelo, y déjalo constar en el
   commit en vez de arreglar a ciegas contenido de otro.

   ⚠️ **Por qué se añadieron los wikilinks (16/9/2026).** Hasta ese día el chequeo
   solo miraba los enlaces `[texto](fichero.md)`, así que un `[[enlace]]` roto era INVISIBLE, justo el modo
   de fallo que esta comprobación existe para evitar. Al añadirlo salieron **30 rotos
   preexistentes**, todos wikilinks, ninguno de markdown. Se resuelven como Obsidian
   (por nombre de fichero en cualquier carpeta, y `[[a|alias]]`/`[[a#sección]]` cuentan
   como `a`) y se ignora lo que va dentro de código, o un regex como `[[0-9a-fA-F]]`
   se cuenta como enlace.

   **Es un ratchet: la cifra puede BAJAR, nunca subir.** El baseline de cada proyecto
   vive en su `MEMORY.md`, en una línea `Baseline enlaces rotos: N (fecha)`. Sin esa
   línea, compara contra HEAD: lo que ya estaba roto es el baseline, anótalo. Si sale más, algo has roto tú
   en esta sesión y se arregla antes de commitear. Si sale menos, ese es el baseline
   nuevo: actualiza la línea. No hace falta arreglar los heredados de golpe: son memorias
   que nunca se escribieron, no ficheros perdidos.
3. **El fichero que enlazas existe.** Al añadir la línea al índice, verifica la ruta.
   Una entrada que apunta a un handover que nunca se commiteó es peor que no tenerla:
   parece que la información existe.

## Paso 4. Commit

```
docs(memory): update - <qué contiene>
```

Sin fecha en el subject (el commit ya trae la suya). `git add` **solo** de los ficheros de
memoria, nunca `git add -A`. Sin co-author. **Y no hagas push**: dilo y que decida.

## Paso 5. Resumen

Cierra con un resumen de alto nivel: qué se cerró, qué queda abierto, qué necesita a
otra persona, y qué es lo primero que debería mirar la próxima sesión.
