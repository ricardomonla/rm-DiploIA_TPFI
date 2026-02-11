# 05. Arquitectura y Flujos de Trabajo

**Prioridad:** 05
**Última Actualización:** 2026-02-07

## 1. Arquitectura de 3 Capas

El sistema opera bajo una arquitectura de tres capas claramente definidas, donde la inteligencia y el procesamiento de datos se centralizan en la nube (Capa 3).

### Capa 1: Usuario (Interfaz Humana)
*   **Componente:** Navegador Web / Dispositivo Móvil.
*   **Responsabilidad:** Entrada de datos (texto/voz), visualización de respuestas y navegación por sugerencias.
*   **Identidad:** Verificada vía Google Identity.

### Capa 2: dtic-GEMA (Chatbot Web / Middleware)
*   **Componente:** `chatbot.js`, `index.html`, `styles.css`.
*   **Responsabilidad:** 
    *   Gestión de la interfaz de usuario (HUD).
    *   Orquestación del handshake de identidad.
    *   Parseo de respuestas JSON estructuradas.
    *   Renderizado de componentes dinámicos (botones de sugerencia).
    *   Renderizado de componentes dinámicos (botones de sugerencia).
    *   **Despliegue Dual:** El aplicativo GEMA (`www-dtic-gema`) reside en una carpeta aislada, separado físicamente del Portal de Documentación TPFI (Raíz), simulando un entorno de producción limpio.
### Capa 3: Make (Cerebro Interprete y Elaborador)
*   **Componente:** Blueprints de Make.com (v1.9+).
*   **Responsabilidad:**
    *   **Intérprete:** Reconocimiento de intención (`meta.intent`).
    *   **AI Optimizer:** Refinamiento de la consulta para acceso a base de conocimientos (RAG).
    *   **Buscador:** Recuperación de información desde la BD (Google Sheets).
    *   **Cerebro IA:** Generación de respuestas empáticas mediante Gemini.
    *   **Elaborador:** Construcción del contrato JSON final.

---

## 2. Diagrama de Flujo Completo (v1.9)

```mermaid
graph TD
    subgraph "Capa 1: Usuario"
        U[Usuario / Interfaz] 
    end

    subgraph "Capa 2: dtic-GEMA (Chatbot Web)"
        G1[Inicio / Handshake] --> G2[Captura Prompt / Consulta]
        G3[Renderizado JSON: Texto + Botones]
    end

    subgraph "Capa 3: Make (Cerebro & IA)"
        M1[Webhook: Recepción JSON] --> M2{Intención?}
        
        M2 -- "handshake" --> M3[Búsqueda Ticket/Perfil]
        M3 --> M4[Gemini: Saludo Contextual]
        
        M2 -- "user_query" --> M5[AI: Optimizador de Búsqueda]
        M5 --> M6[Sheets: Buscar por Tag o Palabras Claves]
        M6 --> M7["Gemini: Respuesta Final (RAG)"]
        
        M4 --> M8[Webhook Respond: JSON Final]
        M7 --> M8
    end

    U <--> G1
    G2 --> M1
    M8 --> G3
    G3 -.-> U
```

---

## 3. Principio de Funcionamiento
Toda la lógica "pesada" y la toma de decisiones reside en la **Capa 3**. La **Capa 2** debe ser lo más liviana posible (thin client), limitándose a presentar la información que el "Cerebro" le instruye a través del protocolo de comunicación.
