# Propuesta Técnica: dtic-GEMA v0.3 (Interfaz Chatbot)

El objetivo de la v0.3 es superar la limitación técnica de Gemini Gems ("Add Action") implementando una **interfaz de Chatbot Web personalizada**. Esto nos dará control total sobre la interacción y la llamada a la lógica de Make.com.

## Arquitectura Propuesta

![Arquitectura dtic-GEMA v0.3](../data/capturas/arquitectura_v03.png)

## Componentes Reutilizables de v0.2
*   **Base de Datos (Google Sheets):** La hoja `dtic-GEMA_BD` con sus tablas de "Agentes", "Conocimiento" y "Tickets" se mantiene sin cambios.
*   **Lógica de Make:** El escenario actual con Webhook receptor y procesamiento de datos sigue siendo el corazón del sistema.

## Nuevos Componentes (v0.3)
1.  **Frontend Chatbot:** Una página web simple (`index.html` + `style.css` + `script.js`) que actúe como cara visible.
2.  **Integración Directa:** El script de la web enviará los datos directamente al Webhook de Make.com.
3.  **Prompt Maestro:** El contenido de `maestro.md` se utilizará para configurar la respuesta de la IA dentro del flujo de Make (usando el módulo de Gemini dentro del escenario).

## Plan de Acción Inicial
1.  **Configurar el Escenario en Make:** Preparar el Webhook para recibir datos desde la interfaz web.
2.  **Desarrollar el Chatbot Web:** Crear `index.html`, `style.css` y `script.js` con una estética premium.
3.  **Vincular con Make:** Implementar la lógica de envío (fetch) desde el chatbot al Webhook.
