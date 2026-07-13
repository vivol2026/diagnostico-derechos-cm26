---
name: design-spec
description: Se usa después de tener claridad sobre el problema y lo que se quiere construir (típicamente después del skill brainstorming, cuando ya se eligió un enfoque). Diseña y escribe un archivo de especificación desde el punto de vista del usuario en docs/specs/YYYY/MM/DD/title.md.
---

# Design Spec

Este skill convierte un problema ya entendido (y, si aplica, un enfoque ya elegido) en un documento de especificación formal, escrito desde el punto de vista del usuario. No es para explorar ideas — para eso está el skill `brainstorming`. Este skill asume que la ambigüedad principal ya fue resuelta.

## Cuándo usarlo

- El usuario dice algo como "escribe el spec", "documenta esto", "hagamos el design-spec" o ya cerró una conversación de brainstorming y quiere pasar a formalizar.
- No se debe usar si todavía hay ambigüedad real sobre el alcance o el enfoque — en ese caso, usa primero `brainstorming`.

## Proceso

1. **Reunir el contexto disponible.** Usa lo ya discutido en la conversación (problema, usuario objetivo, alcance, alternativa elegida). Si falta algo esencial para llenar una sección, pregunta puntualmente antes de escribir — no inventes contenido para rellenar secciones.

2. **Definir el título y la ruta del archivo.**
   - `title` es un slug corto en kebab-case derivado del nombre de la feature/desarrollo (ej. "Reset de contraseña por SMS" → `reset-password-sms`).
   - La fecha (YYYY/MM/DD) es la fecha actual, cada parte en su propia carpeta.
   - Ruta final: `docs/specs/YYYY/MM/DD/title.md` (ej. `docs/specs/2026/07/12/reset-password-sms.md`).
   - Crea las carpetas intermedias si no existen.

3. **Escribir el documento** con exactamente estas secciones, en este orden:

   1. **Overview** — resumen de 2-4 líneas: qué se va a construir y por qué, en lenguaje simple.
   2. **Usuario objetivo** — quién usa esto, en qué contexto, qué rol o segmento.
   3. **Contexto del Problema** — qué dolor o necesidad existe hoy, por qué importa resolverlo ahora.
   4. **Alcance de la V1** — qué incluye esta primera versión y qué queda explícitamente fuera.
   5. **Comportamiento esperado** — cómo se comporta el sistema desde la perspectiva del usuario (flujos, estados, casos principales). Preferir lenguaje de "cuando el usuario hace X, pasa Y" sobre detalle de implementación técnica.
   6. **Posibles Errores y Mitigaciones** — qué puede salir mal desde el punto de vista del usuario (inputs inválidos, fallas de red, casos límite) y cómo se mitiga o comunica cada uno.

4. **Approval Gate.** Al terminar de escribir el spec, no continúes automáticamente a planificar ni a implementar. Indica la ruta del archivo creado y pregunta explícitamente al usuario si:
   - **Iterar** — el spec necesita cambios (falta algo, algo está mal planteado, hay que ajustar alcance). Aplica los cambios pedidos, actualiza el mismo archivo, y vuelve a pasar por este gate.
   - **Aprobar y continuar** — el spec queda aprobado tal cual. En ese caso, invoca el skill `design-plan` para generar el plan de implementación a partir de este spec.

   No asumas aprobación implícita (ej. que el usuario no objete no cuenta como aprobación) — pide una confirmación explícita antes de pasar a `design-plan`.

## Notas

- El documento es desde el punto de vista del usuario: evita jerga de implementación (nombres de clases, arquitectura interna) salvo que sea estrictamente necesario para explicar un comportamiento visible.
- Sé concreto y evita relleno: cada sección debe aportar información que un lector nuevo necesite, no texto genérico.
- No agregues secciones adicionales a las seis listadas salvo que el usuario lo pida explícitamente.
- Nunca saltes el Approval Gate, incluso si el spec parece obviamente correcto.
