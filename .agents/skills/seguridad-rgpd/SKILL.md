---
name: seguridad-rgpd
description: Pautas legales de España/UE (RGPD, LOPDGDD, LSSI-CE, AI Act) y seguridad mínima para apps con usuarios, con la validación antes de publicar. Usar desde el diseño de cualquier app con usuarios, al añadir un proveedor que trate datos personales, y antes de cada lanzamiento.
---

# Cumplimiento y seguridad en apps con usuarios (España/UE)

Guía técnica, no asesoría legal. Si el proyecto es de pago o trata datos sensibles, revisión
profesional. Espíritu SOC 2 sin certificarse; referencia de marcos: vanta.com, usada como
checklist, no se contrata.

## Cuándo se aplica

- **Al diseñar:** recorre los bloques 1 a 7 y anota en la memoria del proyecto qué aplica y
  qué no (con el motivo). Lo que aplique entra en el plan, no se deja para el final.
- **Al añadir un proveedor** (base de datos, email, pagos, IA, analítica): bloque 2.
- **Antes de publicar:** bloque 8 completo, punto por punto, con evidencia (test, comando o
  captura), no "debería estar bien".

## 1. Datos personales (RGPD + LOPDGDD)

- [ ] Solo lo necesario, cada dato con su para qué. Lo opcional, marcado como opcional.
- [ ] Privacidad clara: qué se guarda, para qué, cuánto tiempo y con qué proveedores.
- [ ] Base legal: el servicio cubre lo imprescindible. Analítica y marketing necesitan
      consentimiento aparte, **sin casillas premarcadas**.
- [ ] Derechos desde la app: ver, exportar y borrar la cuenta completa.
- [ ] Edad mínima 14 años (España).
- [ ] Plazos de retención definidos.
- [ ] Brechas: AEPD en 72 h, y a los usuarios si el riesgo es alto.
- [ ] Registro de tratamientos (corto).

## 2. Proveedores

- [ ] DPA aceptado y el proveedor listado en la política de privacidad.
- [ ] Región UE siempre que se pueda.
- [ ] EE. UU. solo con Data Privacy Framework o cláusulas tipo.
- [ ] Nada de datos de usuario a terceros desde el navegador si lo puede hacer el servidor.

## 3. Cookies (LSSI-CE)

- [ ] Solo técnicas: basta con informar, sin banner.
- [ ] Analítica o publicidad: banner con aceptar **y** rechazar igual de visibles, y nada se
      carga antes de aceptar. Mejor aún: analítica sin cookies.

## 4. Páginas legales

- [ ] Aviso legal, Términos y Privacidad (y Cookies si toca), en el footer y en el registro.
- [ ] Registro con casilla "acepto" (no premarcada).
- Base de plantillas: módulo `legal` (adaptarlas a España; las de origen son de EE. UU.).

## 5. Seguridad mínima

**Acceso**
- [ ] OAuth o código por correo mejor que contraseñas. Si hay contraseñas: hash fuerte
      (argon2/bcrypt) y límite de intentos.
- [ ] Sesiones seguras: cookies `HttpOnly`, `Secure`, `SameSite`; caducidad y cierre de
      sesión que invalida en servidor; rotación tras login.
- [ ] Toda ruta no pública bloquea a quien no está autenticado (en servidor, no solo en la UI).
- [ ] Rutas y acciones de administración bloqueadas por rol en servidor, y 2FA en cuentas admin.

**Datos**
- [ ] Aislamiento por usuario en cada consulta, con test de que A no ve ni toca lo de B.
- [ ] IDOR: cambiar un id en la URL o en el body no da acceso a registros ajenos.
- [ ] RLS (Row Level Security) activado si la base de datos lo soporta y se accede desde
      el cliente (Postgres/Neon).
- [ ] Field tampering / mass assignment: el servidor ignora campos que el usuario no puede
      tocar (`role`, `userId`, `price`, `isAdmin`...). zod con esquemas estrictos.
- [ ] Respuestas de API recortadas: solo los campos que el cliente necesita, nunca el
      documento entero (ni hashes, tokens o datos de otros).
- [ ] Inyección (SQL/NoSQL): consultas parametrizadas u ORM; nada de concatenar entradas.

**Entradas y servidor**
- [ ] Validación con zod en todas las entradas: formularios, route handlers, server
      actions, webhooks.
- [ ] La lógica que importa (precios, permisos, cuotas) vive en el servidor, nunca en el cliente.
- [ ] CSP, cabeceras de seguridad y protección SSRF.
- [ ] Límites de uso en APIs, sobre todo en lo que cuesta dinero (IA, email, SMS).
- [ ] Subida de ficheros restringida: tipo y tamaño validados en servidor, nombre
      regenerado, sin ejecución, y buckets de almacenamiento privados por defecto con URLs
      firmadas.

**Secretos y operación**
- [ ] Secretos solo en variables de entorno. Revisar el diff antes de cada commit y
      escanear el historial de git en busca de secretos.
- [ ] Dependencias al día y escaneadas (Dependabot, `npm audit`).
- [ ] Repo protegido: ver módulo `repo-seguridad`.
- [ ] Backups con restauración probada.
- [ ] Logs sin datos sensibles (ni tokens, ni contraseñas, ni datos personales de más).
- [ ] Plan de incidentes de 1 página.

## 6. Accesibilidad (WCAG 2.2 AA)

- [ ] Contraste suficiente en los dos temas (claro y oscuro).
- [ ] Todo usable con teclado, con foco visible.
- [ ] Labels en los campos y errores que enseñan a arreglarlos.
- [ ] `prefers-reduced-motion` respetado.
- [ ] Texto alternativo en imágenes.

## 7. Si usa IA (AI Act)

- [ ] Avisar qué datos van al modelo.
- [ ] Salida validada con esquema.
- [ ] Sin herramientas innecesarias para el modelo.
- [ ] Límite de uso por usuario.
- [ ] Transparencia: "estás hablando con una IA".

## 8. Validación antes de publicar

No se publica sin todo esto marcado, cada punto con su evidencia:

**Legal**
- [ ] Páginas legales en footer y registro, con casilla "acepto"
- [ ] DPAs de todos los proveedores
- [ ] Borrado de cuenta completo, con test
- [ ] Exportación de datos funcionando

**Seguridad (los 20 checks)**
1. [ ] API keys ocultas: ninguna en el cliente ni en el bundle
2. [ ] RLS activado (si aplica)
3. [ ] Ataques IDOR probados
4. [ ] Secretos escaneados en el historial de git
5. [ ] Rutas de administración bloqueadas
6. [ ] Aislamiento entre usuarios probado (A≠B)
7. [ ] Rate limit en las APIs
8. [ ] Buckets de almacenamiento privados
9. [ ] Todas las entradas validadas
10. [ ] Rutas sin autenticar bloqueadas
11. [ ] Inyección SQL/NoSQL probada
12. [ ] Logs sin datos sensibles
13. [ ] Field tampering bloqueado
14. [ ] Subida de ficheros restringida
15. [ ] Lógica sensible en el servidor
16. [ ] Respuestas de API recortadas
17. [ ] Sesiones de auth seguras
18. [ ] Dependencias escaneadas
19. [ ] Acceso a registros probado (lectura y escritura de ajenos)
20. [ ] Ataca tu propia app: auditoría del módulo `auditoria` y sus hallazgos resueltos

**Resto**
- [ ] 2FA en cuentas de administración
- [ ] Revisión de accesibilidad
- [ ] Si usa IA: aviso y límites (bloque 7)
