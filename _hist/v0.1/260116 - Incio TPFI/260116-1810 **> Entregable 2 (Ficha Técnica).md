### 260116-1810 **> RMONLA

Ok redactemos la Ficha Técnica (Entregable 2)

---

### 2601126-1813 **> IA

¡Excelente, Ricardo! Vamos con el segundo documento. La **Ficha Técnica** debe ser concisa, técnica y directa al grano. Es el documento que un desarrollador o supervisor leería para entender cómo está construida la "maquinaria" de tu automatización.

Aquí tienes el contenido para el **Entregable 2**. Está diseñado para ocupar una sola página.

---

# Entregable 2: Ficha Técnica de la Solución - dtic-GEMA

**Proyecto:** Automatización de Triaje y Soporte Técnico mediante IA Generativa.

**Plataforma de Automatización:** Make.com

**Modelo de IA:** Google Gemini 1.5 Pro

**Repositorio de Datos:** Google Sheets

---

## 1. Definición del Trigger (Disparador)

* **Tipo:** Webhook (Custom Webhook).
* **Módulo en Make:** `Webhooks - Custom Webhook`.
* **Origen:** Interfaz conversacional **GEMA FRLR** (Google Gemini).
* **Carga Útil (Payload):** JSON estructurado con los campos: `email`, `dni`, `carrera`, `sistema_afectado`, `descripcion_consulta`.

## 2. Frecuencia y Ejecución

* **Frecuencia:** Instantánea (Real-time). El flujo se dispara en el momento exacto en que el Agente termina la conversación con GEMA.
* **Modo de Ejecución:** Secuencial.

## 3. Arquitectura de Nodos (Lógica del Escenario)

El escenario en Make.com consta de los siguientes módulos interconectados:

1. **Nodo 1: Webhook Receptor:** Capta los datos de identidad y consulta enviados por GEMA FRLR.
2. **Nodo 2: Google Sheets (Search Rows):** Realiza una búsqueda en la hoja "Agentes" filtrando por `Email` y `DNI`. Esto garantiza la validación de identidad antes de procesar la solicitud.
3. **Nodo 3: Router (Control de Flujo):** * **Ruta A (Usuario Validado):** Continúa hacia el procesamiento de IA.
* **Ruta B (Error de Validación):** Filtro que detiene el proceso si los datos no coinciden, notificando al usuario.


4. **Nodo 4: Google AI Gemini (Process Data):** Actúa como el motor de decisión. Utiliza un *System Prompt* para:
* Categorizar la urgencia.
* Asignar el SLA (Tiempo de respuesta) según el Rol (Autoridad: 2h, Docente: 4h, Alumno: 24h).
* Generar un código de ticket alfanumérico (ej: `MOODLE-2026-001`).
* Redactar el "Sabías que..." basado en la carrera del agente.


5. **Nodo 5: Google Sheets (Add a Row):** Registra el incidente en la hoja "Tickets" con toda la metadata generada por la IA.
6. **Nodo 6: Webhook Response:** Devuelve a la interfaz GEMA FRLR la respuesta final procesada (Número de ticket + Solución/Tutorial + Dato de interés).

## 4. Descripción del Flujo de Datos

El flujo comienza con la validación de identidad. Una vez confirmado el agente, la IA (Gemini) no solo actúa como un transformador de texto, sino como un **analista de procesos**. Decide de forma autónoma la prioridad del ticket consultando las reglas de negocio predefinidas. Finalmente, el sistema cierra el ciclo de vida de la solicitud persistiendo los datos en una hoja de cálculo (Google Sheets), asegurando que el equipo de la Dirección de TIC tenga una bitácora centralizada para su resolución manual posterior.

---

> [!NOTE]
> **Criterio de Seguridad:** Toda la comunicación entre el Webhook y la base de datos se realiza mediante protocolos cifrados (HTTPS). No se almacenan credenciales de acceso de los usuarios en el cuerpo de la automatización.

---

### Instrucción para el Entregable 3 (El Blueprint)

Con estos dos documentos (Relevamiento y Ficha Técnica) ya tienes la parte teórica. Para el **Entregable 3**, recuerda que debes:

1. Entrar a **Make.com**.
2. Abrir tu escenario de **dtic-GEMA**.
3. En la barra de herramientas inferior, haz clic en el botón **"More"** (los tres puntos `...`).
4. Selecciona **"Export Blueprint"**.
5. Se descargará un archivo `.json`. Ese es el archivo que debes subir a tu Drive y enlazar en el Documento Portal.

**¿Hay algo más en lo que pueda ayudarte para que tu presentación sea perfecta?** ¡Vas por excelente camino!