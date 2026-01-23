### 260116-1012 **> RMONLA

# Definición de Procesos - Dirección de TIC

A continuación, se detallan los tres procesos principales redefinidos:

### 1. Solicitudes y Consultas de Agentes
Este proceso abarca la atención y resolución de dudas planteadas por los diversos **agentes** de la Facultad:
* **Alumnos y Docentes.**
* **Personal Nodocente.**
* **Autoridades.**
El objetivo es gestionar cualquier consulta técnica o administrativa que los usuarios generen en su interacción con los sistemas de la institución.

### 2. Bitácora de Tareas y Sucesos
Registro detallado de las actividades operativas y eventos técnicos diarios de la **Dirección de TIC**. Entre las tareas registradas se incluyen:
* Resolución de incidencias en servidores.
* Control y verificación de backups.
* Elevación y gestión de grabaciones de clases.
* Registro de soluciones aplicadas a solicitudes de agentes internos y externos.

### 3. Gestión de Altas y Bajas de Usuarios/Permisos
Administración centralizada de credenciales y niveles de acceso:
* **Internamente:** Definición de roles, grupos y permisos de usuarios dentro del dominio.
* **Externamente:** Gestión de roles y permisos para alumnos y docentes en el Campus Virtual (Moodle).
---

### 260116-1046 **> IA

Excelente, Ricardo. Con estos ajustes, el panorama está mucho más claro y aterrizado a la realidad de la **Dirección de TIC**. El concepto de "Agentes" y la distinción entre el "Dominio" (interno) y "Moodle" (externo) le dan la profundidad necesaria para un excelente Trabajo Práctico Final.

Vamos a aplicar la **Matriz de Impacto vs. Esfuerzo** sobre estas tres opciones refinadas para encontrar nuestro **Quick Win**:

---

## 1. Evaluación de Procesos (Matriz Priorización)

| Proceso | Impacto | Esfuerzo (No-Code/IA) | Clasificación |
| --- | --- | --- | --- |
| **1. Consultas de Agentes** | **Alto:** Mejora el tiempo de respuesta y organiza el flujo de trabajo según el rol (Alumno, Docente, etc.). | **Bajo:** Clasificar texto y sugerir respuestas es una tarea nativa de los LLMs. | **Quick Win (Ganancia Rápida)** |
| **2. Bitácora de Sucesos** | **Medio/Alto:** Centraliza el conocimiento técnico y genera reportes de gestión automáticos. | **Bajo:** Es principalmente transformación de texto y extracción de entidades. | **Tarea de Mantenimiento / Valor Interno** |
| **3. Gestión de Altas/Bajas** | **Muy Alto:** Crítico para la seguridad y el acceso a plataformas. | **Alto:** Requiere integraciones complejas (APIs de Moodle, Active Directory) y validaciones estrictas. | **Proyecto Mayor** |

### Mi recomendación de Tutor:

Para el alcance de la Diplomatura, el **Proceso 1 (Solicitudes y Consultas de Agentes)** es el candidato ideal. Nos permite demostrar cómo la IA puede razonar sobre diferentes perfiles de usuario y priorizar según la jerarquía o urgencia del "Agente".

---

## 2. Diseño del Flujo (Fase 1 - Relevamiento)

Si estás de acuerdo, trabajaremos sobre el **Proceso 1**. Aquí está el diseño de requerimientos en lenguaje natural:

### **Título del Proyecto:** Automatización de Triaje y Respuesta para el Centro de Servicios TIC.

* **Input (Entrada):**
* Un Agente (Alumno, Docente, Nodocente o Autoridad) completa un formulario o envía un correo describiendo su problema.
* Datos: Rol del agente, descripción de la consulta, sistema afectado (ej. Moodle, Red, SIU).


* **Proceso con IA (El "Cerebro"):**
1. **Clasificación de Perfil:** La IA identifica quién escribe y qué nivel de prioridad tiene (ej. una Autoridad con problemas de acceso en rectorado suele ser prioridad 1).
2. **Análisis de Intención:** Determinar si es un reclamo técnico, una solicitud de información o una queja.
3. **Generación de Respuesta/Acción:** La IA busca en una base de conocimientos (o en un set de instrucciones) y redacta una respuesta preliminar para el técnico de TIC o para el Agente.


* **Output (Salida):**
* Notificación al equipo de TIC en Slack/Telegram/Correo con el resumen clasificado.
* Respuesta automática al Agente confirmando recepción y dando una solución probable (o pidiendo más datos).
* Registro estructurado en una planilla (Google Sheets) para estadísticas.



---

> [!CAUTION]
> **Recordatorio de Seguridad:** En el desarrollo de los prompts y en la documentación de tu "Sistema Z", evita usar direcciones de correo reales de los agentes o nombres de servidores específicos (ej. no uses `server-db-01.facultad.edu.ar`, usa `Servidor_X`).

### Próximo paso:

¿Te sentís cómodo avanzando con el **Proceso 1 (Solicitudes de Agentes)** como tu tema central del TP, o preferís que exploremos el diseño técnico de la **Bitácora (Proceso 2)**?

**Si elegís el Proceso 1, ¿podrías darme 2 o 3 ejemplos de consultas típicas que recibís (sin datos reales)?** Esto me ayudará a redactar la lógica de los Nodos de Make en el siguiente paso.