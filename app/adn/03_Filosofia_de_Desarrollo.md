# Filosofía de Desarrollo

**Prioridad:** 03
**Última Actualización:** 2026-02-05 (Consolidación v1.9)

## Instrucciones Operativas

*   **Login-First:** GEMA no interactúa con el backend (Make) ni muestra sugerencias hasta que la identidad del usuario está verificada.
*   **Context-First:** El saludo inicial no es estático ("Hola"). Debe consultar el historial (Tickets) para ofrecer una bienvenida personalizada ("Hola [User], veo que tu ticket X sigue abierto...").
*   **AI-First Response Path:** Nunca se deben usar respuestas estáticas de texto plano para errores o estados (ej. "Usuario no encontrado"). GEMA debe procesar cada interacción a través de un modelo de IA para garantizar una respuesta empática, fluida y contextual, incluso en los flujos de fallo.
*   **Estructura de Respuesta (JSON):** El backend **siempre** debe responder con un objeto JSON estructurado `{ response: "Texto", suggestions: ["A", "B"] }`. El frontend es responsable de renderizar esto visualmente.

*   **Eficiencia Visual:** Evitar la acumulación de mensajes "basura" (ej. "Pensando..."). Reemplazar mensajes de estado in-situ.
*   **Human-First (Google Identity):** El uso de Google Login no es solo un mecanismo de seguridad; es el pilar de la personalización. Permite identificar al humano de forma unívoca para que GEMA pueda consultar historiales de tickets y ofrecer una experiencia de "Sherpa Digital" desde la primera interacción (`INIT`).
*   **Contrato Estricto JSON (Make v1.9):** Toda comunicación entre GEMA y Make debe seguir el contrato `{ response, suggestions }`. Esto permite que el chatbot sea dinámico y ofrezca acciones inmediatas (botones) sin intervención manual.
*   **Método Sherpa (Manual Survival):** Ante fallos en la automatización (ej. errores de importación de blueprints), se prioriza la **corrección manual guiada**. El objetivo es alcanzar la funcionalidad real y luego exportar el resultado para que sirva como la nueva "Fuente de Verdad" técnica. No sacrificar el avance por fallos de herramientas.
