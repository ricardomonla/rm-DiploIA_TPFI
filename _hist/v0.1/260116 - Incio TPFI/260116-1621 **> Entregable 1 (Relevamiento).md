### 260116-1619 **> RMONLA

Redacte el contenido detallado del Entregable 1

### 260116-1621 **> IA

¡Claro que sí, Ricardo! Aquí tienes el contenido detallado para el **Entregable 1**. Está redactado de forma profesional, siguiendo los pasos académicos requeridos y respetando la restricción de confidencialidad que mencionamos al principio.

Puedes copiar este contenido en un documento y guardarlo como **PDF**.

---

# Entregable 1: Relevamiento y Diseño de Proceso - Proyecto dtic-GEMA

**Diplomatura en IA Generativa y No-Code** **Alumno:** Ricardo [Tu Apellido]

**Área de Aplicación:** Dirección de TIC - Facultad Y (FRLR)

---

## 1. Relevamiento e Identificación de Puntos de Dolor

En el entorno operativo de la Dirección de TIC de la Facultad Y, se han identificado procesos críticos que presentan ineficiencias debido a su naturaleza manual y repetitiva. A continuación, se describen los tres puntos de dolor principales:

1. **Gestión de Consultas de Agentes (Triaje Manual):** El área recibe un flujo constante de solicitudes de alumnos, docentes y autoridades sobre sistemas como el Campus Virtual o el Sistema Académico. Actualmente, un técnico debe leer cada mensaje, identificar al usuario, clasificar el problema y derivarlo, lo que genera demoras y saturación de los canales de comunicación.
2. **Registro de Bitácora de Tareas y Sucesos:** La documentación de resoluciones técnicas, backups y mantenimiento de servidores se realiza de forma fragmentada. La falta de un sistema inteligente que extraiga información clave de los sucesos diarios dificulta la creación de reportes de gestión y el seguimiento de incidentes recurrentes.
3. **Administración de Accesos (Altas y Bajas):** La gestión de roles en el dominio interno y en la plataforma Moodle requiere validaciones manuales de identidad y cumplimiento de requisitos. Este proceso es propenso a errores humanos y consume tiempo valioso durante los inicios de cada semestre académico.

---

## 2. Priorización y Elección del Quick Win

Para determinar el punto de partida del Trabajo Práctico, se aplicó la **Matriz de Impacto vs. Esfuerzo**, evaluando la viabilidad de una solución No-Code potenciada con IA Generativa.

| Proceso | Impacto | Esfuerzo | Clasificación |
| --- | --- | --- | --- |
| **1. Consultas de Agentes** | **Alto** | **Bajo** | **Quick Win** |
| 2. Bitácora de Sucesos | Medio | Bajo | Mejora Incremental |
| 3. Gestión de Accesos | Muy Alto | Alto | Proyecto Complejo |

### Justificación del Quick Win:

Se selecciona el **Proceso 1 (Consultas de Agentes)** como el objetivo del proyecto **dtic-GEMA**.

* **Impacto:** Mejora la experiencia de toda la comunidad universitaria (Agentes) de forma inmediata.
* **Esfuerzo:** La tecnología de LLM (Gemini) es altamente eficiente para clasificar texto y automatizar respuestas basadas en conocimiento previo, permitiendo un despliegue rápido sin integraciones de bajo nivel.

---

## 3. Diseño del Flujo en Lenguaje Natural

El proyecto **dtic-GEMA** implementa un asistente inteligente denominado **GEMA FRLR**. El flujo se define bajo los siguientes requerimientos:

### A. Input (Entrada de Datos)

El Agente inicia una interacción conversacional con **GEMA FRLR**. El sistema solicita obligatoriamente:

* Identificación: **Email** y **DNI** (Claves de validación).
* Contexto: **Carrera** y **Rol** del agente.
* Consulta: Descripción en lenguaje natural del problema o número de ticket para seguimiento.

### B. Proceso con IA (Lógica dtic-GEMA)

1. **Validación:** El sistema busca al agente en la base de datos "Sistema Z" (Google Sheets).
2. **Análisis de Intención:** La IA (Gemini) determina si la consulta es técnica (ej. bloqueo de clave) o administrativa (ej. falta de matriculación).
3. **Priorización:** Se asigna un tiempo estimado de respuesta (SLA) basado en el rol (ej. Autoridades: 2hs, Alumnos: 24hs).
4. **Personalización:** La IA genera una respuesta que incluye un tutorial de auto-ayuda y un dato de valor ("Sabías que...") relacionado con la carrera del agente.

### C. Output (Salida)

* **Para el Agente:** Recibe un número de ticket alfanumérico (ej. MOODLE-2026-X) y la información de resolución.
* **Para la Dirección de TIC:** Registro automático en la hoja de "Tickets" y notificación de casos críticos.

---

> [!NOTE]
> **Nota de Confidencialidad:** En cumplimiento con las normativas de seguridad de la información, este documento utiliza términos genéricos (Sistema Z, Facultad Y) y datos de ejemplo. No se han incluido nombres reales de agentes ni direcciones IP de servidores institucionales.

---

**Sugerencia del Tutor:** Con este texto ya tienes listo el primer documento. El siguiente paso es la **Ficha Técnica (Entregable 2)**, que es más visual y técnica. ¿Te gustaría que la redactemos ahora?