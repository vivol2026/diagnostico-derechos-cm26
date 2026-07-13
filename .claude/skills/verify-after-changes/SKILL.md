---
name: verify-after-changes
description: Se usa cuando Claude Code considera que ya terminó de implementar el plan/spec actual. Levanta el servidor, prueba en el navegador 5 casos importantes, y compara el resultado contra el plan y el spec (docs/specs/...) para arreglar lo que falte o dar luz verde.
---

# Verify After Changes

Este skill se activa al final de una implementación, cuando el código ya está escrito y toca comprobar que realmente cumple lo acordado — no basta con que compile o pase typecheck. No es para revisar el diseño ni el código estáticamente; es para **usar la funcionalidad de verdad** en el navegador.

## Cuándo usarlo

- Justo después de terminar de implementar un plan (especialmente si hubo un plan formal vía `EnterPlanMode`/`Plan`, o un spec generado con `design-spec`).
- Antes de reportar la tarea como completa o de hacer commit final.
- No se debe usar si el cambio no tiene superficie visible/ejecutable (solo docs, solo tests, config sin efecto en runtime) — ahí no hay nada que probar en navegador.

## Proceso

1. **Ubicar el plan y el spec de referencia.**
   - Busca el spec relevante en `docs/specs/YYYY/MM/DD/title.md` (el más reciente que corresponda a esta feature).
   - Busca el plan correspondiente en `docs/plans/YYYY/MM/DD/title.md` (generado por el skill `design-plan`, con el mismo `title` que el spec). Si hubo un plan formal vía `EnterPlanMode`/`Plan` sin pasar por `design-plan`, úsalo como referencia adicional.
   - Si no existe spec ni plan explícito, usa como referencia lo último acordado explícitamente con el usuario en la conversación.

2. **Levantar el servidor.**
   - Usa `preview_start` (Browser pane) con la configuración del proyecto en `.claude/launch.json`, o el skill `run` si ya existe uno definido para este proyecto.
   - Si no hay configuración de servidor, créala primero preguntando el comando correcto (no adivines el comando de arranque).
   - Verifica con `preview_logs` que el servidor levantó sin errores antes de continuar.

3. **Elegir 5 casos de prueba importantes.**
   - Deriva los casos directamente de la sección "Comportamiento esperado" y "Posibles Errores y Mitigaciones" del spec, y de los criterios del plan.
   - Prioriza: el flujo principal (golden path), 1-2 variaciones relevantes, y al menos 1 caso de error/límite mencionado en el spec.
   - Enumera los 5 casos explícitamente antes de ejecutarlos, para que quede claro qué se está validando.

4. **Probar cada caso en el navegador.**
   - Usa las herramientas del Browser pane (`navigate`, `computer`, `read_page`, `form_input`, `get_page_text`, `read_console_messages`, `read_network_requests`) para ejecutar cada caso real, no simulado.
   - Registra resultado (pasa/falla) y evidencia concreta (qué se vio, qué error apareció, qué request falló) para cada caso.
   - Revisa la consola y network en busca de errores silenciosos aunque la UI se vea bien.

5. **Comparar contra plan y spec.**
   - Por cada caso, indica si el comportamiento observado coincide con lo esperado en el spec/plan.
   - Si algo no cumple el objetivo: identifica la causa raíz, corrige el código, y vuelve a probar ese caso (y los que puedan haberse afectado) hasta que pase.
   - No marques un caso como resuelto sin haberlo vuelto a probar después del fix.

6. **Cerrar con veredicto.**
   - Si los 5 casos pasan: da luz verde explícita, resumiendo qué se probó y confirmando que coincide con el spec/plan.
   - Si algo quedó pendiente o fuera de alcance para arreglar ahora: dilo explícitamente, no lo des por bueno.

## Notas

- Este skill es de verificación de comportamiento real, no de calidad de código — para eso están `code-review` y `simplify`.
- Sé honesto sobre lo que no se pudo probar (ej. dependencias externas no disponibles) en vez de asumir que funciona.
- Si durante las pruebas aparece un problema fuera del alcance de la tarea actual, repórtalo pero no lo arregles sin confirmar con el usuario si corresponde hacerlo ahora.
