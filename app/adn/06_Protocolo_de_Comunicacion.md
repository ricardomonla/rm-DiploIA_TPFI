# 06. Protocolo de Comunicación

**Prioridad:** 06
**Última Actualización:** 2026-02-07

## 1. El Contrato Universal

Para garantizar la estabilidad del sistema, toda comunicación entre la **Capa 2** (Frontend) y la **Capa 3** (Backend) debe seguir este protocolo estricto.

### A. Petición (Request: GEMA -> Make)
Enviado vía POST al Webhook de Make.

```json
{
  "email": "usuario@ejemplo.com",
  "dni": "12345678",
  "session_id": "sess_uuid",
  "user_name": "Nombre de Usuario",
  "user_name": "Nombre de Usuario",
  "token": "google_jwt_token_secure",
  "is_verified": true,
  "descripcion": "El texto del usuario o comando 'INIT'",
  "meta": {
    "intent": "handshake | user_query"
  }
}
```

> **Human-First Policy:** El campo `is_verified` y el `token` son **OBLIGATORIOS**. La Capa 3 rechazará cualquier petición anónima para proteger la integridad de los datos académicos.

*   **`meta.intent`**: Define el camino lógico en Make.
    *   `handshake`: Se envía al cargar el chat por primera vez.
    *   `user_query`: Se envía ante cada consulta del usuario.

### B. Respuesta (Response: Make -> GEMA)
El backend **DEBE** responder con un JSON válido y el header `Content-Type: application/json`.

```json
{
  "response": "Cadena de texto con la respuesta de la IA (soporta Markdown básico).",
  "suggestions": [
    "Botón Sugerencia 1",
    "Botón Sugerencia 2"
  ]
}
```

---

## 2. Reglas de Validación
1.  **Uniformidad:** Incluso en caso de error, el backend debe enviar un JSON con el campo `response`.
2.  **Sugerencias:** El array `suggestions` puede estar vacío `[]`, pero el campo debe existir.
3.  **No Texto Plano:** Queda prohibido enviar fragmentos de texto fuera de la estructura JSON, ya que rompería el parseo del frontend.

---

## 3. Evolución del Protocolo
Cualquier cambio en esta estructura requiere una actualización coordinada en `chatbot.js` (Capa 2) y en los módulos `Webhook Respond` de Make (Capa 3).
