---
name: brainstorming
description: Se usa siempre que se inicia un nuevo desarrollo (feature, componente, script, refactor grande, etc.). Hace preguntas para eliminar ambigüedades sobre el alcance y al final propone 2-3 alternativas de enfoque para que el usuario elija con cuál empezar.
---

# Brainstorming

Este skill se activa al comenzar un desarrollo nuevo, antes de escribir código. Su objetivo es evitar construir sobre supuestos equivocados: primero aclarar, después proponer caminos concretos.

## Cuándo usarlo

- El usuario pide construir algo nuevo (feature, endpoint, componente, script, integración).
- El requerimiento es vago, amplio, o mezcla varios objetivos posibles.
- No se debe usar para tareas triviales, ya acordadas explícitamente, o cuando el usuario ya dio el detalle suficiente y pide ir directo a implementar.

## Proceso

1. **Detectar ambigüedad.** Antes de proponer nada, identifica qué información falta para implementar sin adivinar. Piensa en:
   - Alcance: ¿qué SÍ y qué NO incluye este desarrollo?
   - Usuario/caso de uso: ¿quién lo usa y en qué contexto?
   - Restricciones técnicas: stack, integraciones existentes, dependencias obligatorias.
   - Criterios de éxito: ¿cómo se sabe que quedó bien?
   - Datos/estado: ¿de dónde vienen los datos, se persisten, hay modelo existente?

2. **Preguntar, no asumir.** Haz solo las preguntas que realmente cambian el enfoque de la implementación (evita preguntar por cosas triviales o ya evidentes en el contexto/código). Prioriza 2-4 preguntas clave en vez de un cuestionario largo. Usa AskUserQuestion cuando haya opciones discretas claras; usa texto libre cuando la respuesta sea abierta.

3. **Presentar alternativas.** Con las respuestas en mano, resume el problema en 1-2 frases y presenta 2 o 3 alternativas concretas para abordar el desarrollo. Cada alternativa debe incluir:
   - Nombre corto (ej. "Opción A: enfoque minimalista").
   - En qué consiste (2-3 líneas).
   - Principal trade-off (qué se gana / qué se sacrifica: velocidad, flexibilidad, complejidad, deuda técnica).

4. **Esperar decisión.** No empieces a implementar hasta que el usuario elija una alternativa (o pida una combinación/variante). Si el usuario ya tiene preferencia clara desde el inicio, puedes saltar directo a confirmarla en vez de forzar las 3 opciones.

## Notas

- Sé breve: esto es una conversación de alineación, no un documento formal. No generes archivos de diseño a menos que el usuario lo pida.
- Si el desarrollo es claramente pequeño y sin ambigüedad real, no fuerces el proceso completo — confirma en una línea y procede.
