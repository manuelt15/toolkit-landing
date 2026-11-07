---
id: repo-seguridad
title: Seguridad del repo
when: Al crear el repo, en todos los proyectos
gives: Gitleaks en cada commit, .env fuera de git y protecciones de GitHub con gh-secure
costs: Gitleaks y pre-commit instalados; gh con permisos de admin en el repo
requires: []
conflicts: []
skills: []
---

# Módulo: seguridad del repo

## Qué incluye
| Pieza | Tipo | Para qué |
|---|---|---|
| gh-secure (GitHub Security Lab) | Extensión de `gh` | Activa protección de ramas, reporte privado de vulnerabilidades, secret scanning con push protection, Dependabot y CodeQL |
| Gitleaks | CLI (MIT) | Detecta secretos en local: en cada commit (hook pre-commit) y en todo el historial. Funciona igual en repos privados |

## Cuándo
Al crear el repo en GitHub, en todos los proyectos. Repasarlo antes de publicar.

## Instalación y uso (verificado)
```bash
gh extension install GitHubSecurityLab/gh-secure
gh secure --yes --dry-run
gh secure --yes
gh secure status
```
Requiere `gh` autenticado y permisos de admin en el repo.

## Repos privados
gh-secure está pensado para repos **públicos** (allí todo es gratis). En privados, secret
scanning y code scanning dependen del plan de GitHub; protección de ramas y Dependabot sí
funcionan. Ejecuta primero `--dry-run` y `gh secure status` para ver qué aplica.
Por eso en privados Gitleaks es la red principal contra secretos.

## Gitleaks (verificado en su README)
Instalación, una vez por Mac:
```bash
brew install gitleaks
```

Escanear el historial (antes de hacer público un repo, o al adoptar uno existente):
```bash
gitleaks git -v --redact
```
`--redact` evita que el secreto salga en claro en la terminal.

Hook pre-commit en cada repo, con el framework [pre-commit](https://pre-commit.com/#install)
(dependencia aparte). `.pre-commit-config.yaml` en la raíz:
```yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.24.2
    hooks:
      - id: gitleaks
```
Después `pre-commit autoupdate` (sube `rev` a la última versión) y `pre-commit install`.
Saltarlo en un commit concreto: `SKIP=gitleaks git commit ...`.

Falsos positivos: `.gitleaksignore` con el fingerprint del hallazgo, o comentario
`gitleaks:allow` en la línea.

Gitleaks está "feature complete": solo recibe parches de seguridad. Sus autores mantienen
ahora [Betterleaks](https://github.com/betterleaks/betterleaks) (ver referencias).

## Además, en cada repo
- `.gitignore` con `.env*` (salvo `.env.example`).
- Hook pre-commit de Gitleaks.
- Escaneo de secretos en el historial (`gitleaks git`) antes de hacer público un repo.
- Push directo a `main` solo con confirmación (regla global de AGENTS.md).
