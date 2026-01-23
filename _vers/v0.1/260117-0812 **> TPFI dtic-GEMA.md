# Proyecto Final: Sistema Inteligente de Gestión TIC (dtic-GEMA)

**Nombre del Asistente:** dtic-GEMA_FRLR
**Autor:** Lic. Ricardo (Dirección de TIC - Facultad Regional)

---

## 1. Fase 1: Relevamiento y Problemática

### Contexto Laboral

El proyecto se desarrolla en el área de **TIC de la Facultad**, en un entorno que gestiona servidores Debian, Proxmox y el sistema rm-OIS. Se identifica una alta carga operativa en la atención de consultas técnicas recurrentes de alumnos, docentes y autoridades.

### Identificación del "Punto de Dolor"

El proceso crítico elegido para automatizar es la **Gestión de Consultas y Soporte Técnico**. Actualmente, la clasificación de tickets y la respuesta inicial consumen tiempo valioso del equipo técnico en tareas repetitivas como blanqueo de claves o dudas de matriculación.

### Matriz de Impacto vs. Esfuerzo

* **Impacto:** **Alto**. Mejora el tiempo de respuesta y organiza el flujo de trabajo según la jerarquía del agente.
* **Esfuerzo:** **Bajo/Medio**. La clasificación de texto y la sugerencia de respuestas son tareas nativas de los Modelos de Lenguaje (LLM).
* **Clasificación:** *Quick Win* (Ganancia Rápida).

---

## 2. Fase 2: Diseño Técnico (Arquitectura del Sistema)

### El Ecosistema Conversacional

El sistema utiliza un **GEM (Gemini Personalizado)** como interfaz de entrada (Front-end), actuando como un filtro de primera línea que recolecta datos antes de disparar la automatización.

### Estructura de Datos (Google Sheets)

Para que el sistema sea escalable y no dependa de código rígido, se utilizan tres tablas de conocimiento:

1. **Hoja "Agentes":** Validación de identidad (Email, DNI, Rol, Carrera).
2. **Hoja "Tickets":** Registro histórico y seguimiento (ID, Estado, Resumen IA).
3. **Hoja "Conocimiento":** Repositorio de tutoriales y "Sabías que..." (datos de interés por carrera).

### Configuración del "Prompt Maestro" (System Instructions)

El GEM **GEMA FRLR** está configurado con las siguientes directrices:

* **Identificación:** Solicitar obligatoriamente Email y DNI.
* **Clasificación:** Identificar si es una Nueva Consulta (Campus, Preinscripción, Sist. Académico) o Seguimiento.
* **Seguridad:** Ignorar y advertir si el usuario ingresa contraseñas.
* **Personalidad:** Profesional y empática, ajustando el tono según el Rol (Alumno/Autoridad).

---

## 3. Implementación en Make.com (Flujo de Nodos)

La automatización en Make.com orquestra la lógica entre la interfaz y la base de datos.

### Diagrama de Flujo Lógico

**Descripción de los Nodos:**

1. **Webhook (Trigger):** Recibe el JSON de GEMA FRLR con los datos del agente.
2. **Google Sheets (Search):** Realiza una validación cruzada entre Email y DNI.
3. **Router:** * *Ruta A:* Usuario Validado (continúa el proceso).
* *Ruta B:* Usuario No Encontrado (clasifica como Externo/Postulante).


4. **Módulo Gemini (IA):**
* Determina la prioridad (Autoridad: 2hs / Alumno: 24hs).
* Genera el "Sabías que..." basado en la carrera del alumno.


5. **Google Sheets (Add Row):** Registra el ticket con un ID único.
6. **Webhook Response:** Devuelve a la interfaz el mensaje final con el número de ticket y el dato de valor agregado.

---

## 4. Criterios de Éxito y Seguridad

* **IA No Decorativa:** La IA no solo "charla", sino que decide la prioridad del ticket, clasifica la problemática y personaliza el contenido educativo de forma dinámica.
* **Privacidad (Data Privacy):** El sistema utiliza la técnica de "anonimización" en la documentación (Usuario Z, Sistema X). La validación DNI+Email asegura que no se entregue información a personas no autorizadas.
* **Escalabilidad:** Al estar basado en Google Sheets, cualquier no-programador de la Dirección de TIC puede actualizar los tutoriales o datos de interés sin modificar la automatización.

---

> **Nota para la defensa:** Este MVP demuestra cómo reducir la carga operativa de soporte en un estimado del 60-70% mediante el triaje automático de Nivel 1.