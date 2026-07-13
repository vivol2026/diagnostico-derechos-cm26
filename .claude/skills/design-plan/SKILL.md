---
name: design-plan
description: Se usa después de que el usuario aprueba el Spec (Approval Gate del skill design-spec). Convierte el spec aprobado en un plan de implementación y lo guarda en docs/plans/YYYY/MM/DD/title.md.
---

# Design Plan

Este skill traduce un spec ya aprobado en un plan de implementación concreto. No re-discute el problema ni el alcance — eso ya se cerró en el spec. Su trabajo es desglosar el "qué" del spec en el "cómo" técnico, en forma de tareas ejecutables.

## Cuándo usarlo

- Justo después de que el usuario aprueba el spec en el Approval Gate del skill `design-spec`.
- El usuario dice algo como "genera el plan", "aprobado, sigamos con el plan" o similar.
- No se debe usar si no hay un spec aprobado de referencia — en ese caso, usa primero `design-spec` (y antes, `brainstorming` si aún hay ambigüedad).

## Proceso

1. **Ubicar el spec aprobado.** Debe existir en `docs/specs/YYYY/MM/DD/title.md`. Si el usuario no lo referencia explícitamente, usa el spec más reciente relevante a la conversación actual. Si no se encuentra, pregunta antes de continuar — no inventes un plan sin spec de referencia.

2. **Definir el título y la ruta del archivo.**
   - Usa el mismo `title` (slug kebab-case) que el spec correspondiente, para que quede fácil de relacionar ambos documentos.
   - Ruta final: `docs/plans/YYYY/MM/DD/title.md`, con la fecha actual (ej. `docs/plans/2026/07/12/reset-password-sms.md`).
   - Crea las carpetas intermedias si no existen.

3. **Escribir el documento** con exactamente estas secciones, en este orden:

   1. **Objetivo** — qué se va a lograr con esta implementación, en 1-3 líneas (derivado del Overview del spec).
   2. **Contexto del Problema** — resumen breve de por qué se hace esto (tomado/adaptado del spec, no reescrito desde cero).
   3. **El Spec de referencia** — enlace/ruta al archivo del spec (`docs/specs/YYYY/MM/DD/title.md`) y un resumen de 2-3 líneas de lo que cubre.
   4. **Lista de Tareas a implementar con detalles** — desglose de tareas técnicas concretas y ordenadas. Cada tarea debe incluir: qué hay que hacer, en qué archivo/área del código (si ya se conoce), y qué señala que está terminada. Cubre también los casos de error/mitigaciones del spec como tareas explícitas, no solo el happy path.

4. **Confirmar con el usuario.** Indica la ruta del archivo creado y ofrece ajustar el plan antes de empezar a implementar. Al igual que el spec, el plan debe quedar validado por el usuario antes de iniciar la implementación real.

## Notas

- Este plan es técnico (a diferencia del spec, que es desde el punto de vista del usuario): aquí sí corresponde mencionar archivos, componentes, funciones o servicios concretos cuando se conozcan.
- No agregues secciones adicionales a las cuatro listadas salvo que el usuario lo pida explícitamente.
- Una vez implementado el plan, el siguiente paso natural es `verify-after-changes`.
