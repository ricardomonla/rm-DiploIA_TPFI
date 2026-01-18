### 260116-1454 **> RMONLA
Usaremos Google Sheets y Gemini conectados con Make


Ahora vamos a armar el Diagrama de Nodos de Make

---

### 260116-1456 **> IA

¡Excelente, Ricardo! Vamos a diseñar el "esqueleto" de tu automatización en **Make.com**. Este diagrama es el corazón técnico de tu TP Final y demuestra cómo **dtic-GEMA** integra la interfaz con la lógica de datos.

Aquí tienes la configuración paso a paso de los nodos:

---

## Diagrama de Nodos: Flujo "dtic-GEMA"

Este es el orden lógico que deberás configurar en el lienzo de Make:

### 1. Trigger: Custom Webhook (El Receptor)

* **Función:** Recibe el paquete JSON desde **GEMA FRLR**.
* **Datos que recibe:** `email`, `dni`, `carrera`, `sistema_afectado`, `descripcion_consulta`.
* **Por qué es clave:** Es la puerta de entrada de toda la información.

### 2. Nodo Google Sheets: Search Rows (Validación de Identidad)

* **Acción:** Busca en la hoja **"Agentes"** el `email` Y el `dni`.
* **Lógica:** Si encuentra una coincidencia, recupera el `Nombre_Real` (para uso interno) y el `Rol` (Alumno/Docente/Autoridad).

### 3. Nodo Router (El Divisor de Caminos)

El Router dividirá el flujo en dos posibles situaciones:

* **Ruta A (Usuario Registrado):** Continúa el proceso con los datos del agente.
* **Ruta B (Usuario No Encontrado):** Envía una alerta o clasifica como "Postulante/Externo" para que el equipo de TIC verifique manualmente.

### 4. Nodo Gemini (El Cerebro Analítico)

Este es el módulo de **Google AI (Gemini)** dentro de Make.

* **Prompt de Entrada:** Toma la `descripcion_consulta`, el `Rol` y la `Carrera`.
* **Tareas del Nodo:**
1. Determina la **Prioridad** (usando tus reglas: 2hs, 4hs, 24hs).
2. Genera el **"Sabías que..."** basado en la carrera.
3. Busca la solución en el "Knowledge Base" (puede ser otro nodo de búsqueda o contexto en el prompt).



### 5. Nodo Google Sheets: Add a Row (Registro de Ticket)

* **Acción:** Crea una nueva fila en la hoja **"Tickets"**.
* **Datos:** `ID_Ticket` (autogenerado), `Email`, `Fecha_Actual`, `Prioridad_IA`, `Estado: Pendiente`.

### 6. Nodo Webhook Response (El Cierre de GEMA)

* **Acción:** Envía la respuesta final de vuelta a la interfaz de **GEMA FRLR**.
* **Contenido:** El mensaje redactado por la IA con el número de ticket, tiempo de espera y el dato curioso.

---

## Representación Visual del Flujo

---

## Configuración Técnica de los Nodos (Ficha para el TP)

| Nodo | Módulo en Make | Configuración Clave |
| --- | --- | --- |
| **01** | **Webhooks** | `Custom Webhook` (Genera la URL para el GEM). |
| **02** | **Google Sheets** | `Search Rows` (Filtro: `Email` [Equal to] `Value`). |
| **03** | **Gemini** | `Create a Prompt Response` (Usar modelo Gemini 1.5 o superior). |
| **04** | **Google Sheets** | `Add a Row` (Mapear los resultados de Gemini y el Webhook). |
| **05** | **Webhooks** | `Webhook Response` (Status 200 + Body con el texto de la IA). |

---

> [!IMPORTANT]
> **Defensa del Trabajo:** Al explicar este diagrama, menciona que el uso del **Router** permite que el sistema sea seguro, ya que si el DNI no coincide con el Email, el sistema no entrega información sensible, cumpliendo con la protección de datos que venimos trabajando.

---

### Tu última pieza del rompecabezas:

Para que el diagrama de Make sea perfecto, solo nos falta definir el **Formato del ID de Ticket**.

**¿Cómo te gustaría que GEMA FRLR entregue el número de seguimiento?**

* **Opción A:** Un número secuencial simple (ej. Ticket #123).
* **Opción B:** Un código alfanumérico relacionado con el sistema (ej. Moodle-2026-X).
* **Opción C:** Que Gemini genere un nombre clave divertido (ej. "Caso Átomo-45").

**¿Cuál de estas opciones preferís para cerrar la lógica de salida?** Una vez que elijas, habremos completado toda la Fase 2 y estarás listo para el montaje.