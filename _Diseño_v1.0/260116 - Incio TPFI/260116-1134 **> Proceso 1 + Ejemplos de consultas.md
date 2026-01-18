### 260116-1047 **> RMONLA

# Proceso 1: Gestión de Consultas y Soporte Técnico

### Ejemplo de consultas frecuentes:

1. **Solicitud de accesos al Campus Virtual:** Los alumnos o docentes informan dificultades para acceder a una materia específica dentro del campus de la facultad. El procedimiento consiste en verificar inicialmente si el usuario está correctamente matriculado; según el caso, se procede a la actualización de la contraseña o a la inscripción manual en la cátedra solicitada.

2. **Problemas con la preinscripción:** Postulantes a carreras, tecnicaturas o cursos reportan que el sistema no les permite continuar con la carga de datos. El inconveniente más común ocurre cuando el interesado ya posee registros previos en otra oferta académica. Para solucionar esto, se debe verificar si es necesario reutilizar los datos existentes o actualizar el correo electrónico de contacto para finalizar el proceso.

3. **Problemas de acceso al Sistema Académico:** Alumnos o docentes ya registrados presentan problemas para ingresar y consultar su situación académica. Generalmente, estos incidentes se deben al olvido de las credenciales o al bloqueo por falta de uso. Tras validar la identidad del solicitante, se procede a realizar el blanqueo de la contraseña.
---

### 260116-1134 **> IA

¡Excelente trabajo, Ricardo! Estos tres ejemplos son perfectos porque cubren los perfiles de **Agentes** más comunes (Alumnos, Docentes y Postulantes) y tocan los tres sistemas críticos que mencionaste: **Campus Virtual (Moodle)**, **Sistema de Preinscripción** y **Sistema Académico**.

Con esto cerramos la **Fase 1 (Relevamiento)**. Ahora, como tu tutor, vamos a dar el salto a la **Fase 2: Diseño Técnico**. Para que tu Trabajo Práctico sea sólido, transformaremos estos ejemplos en una estructura lógica que Make (o cualquier herramienta No-Code) pueda procesar.

---

## Ficha Técnica del Proyecto (Borrador)

Para tu documento final, utilizaremos la siguiente estructura técnica. Aquí es donde definimos qué hace cada "caja" de nuestra automatización.

### 1. Trigger (Disparador)

* **Módulo:** Webhook o Google Forms / Mail (IMAP).
* **Detalle:** El flujo se activa cuando un Agente envía una consulta a través del formulario de soporte del **"Sistema Z"**.

### 2. Nodos de Procesamiento (Lógica de IA)

Aquí es donde la IA no es decorativa, sino el motor de decisión:

* **Nodo OpenAI (Clasificación):** Recibe el texto del Agente. El prompt le ordena clasificar la consulta en una de las 3 categorías que definiste: `ACCESO_CAMPUS`, `PROBLEMA_PREINSCRIPCION`, o `ACCESO_SIST_ACADEMICO`.
* **Nodo OpenAI (Análisis de Prioridad):** Según el tono (frustración) y el Agente (ej. si es un Docente en horario de clase), asigna una prioridad: `BAJA`, `MEDIA`, `ALTA`.
* **Nodo OpenAI (Sugerencia de Resolución):** Basado en el manual de procedimientos (que le pasaremos como contexto), redacta un borrador de respuesta técnica.

### 3. Output (Salidas)

* **Google Sheets:** Registro de la consulta, clasificación e ID de Agente para auditoría.
* **Slack / Telegram:** Notificación inmediata al equipo de TIC: *"Atención Ricardo, el Docente X tiene un problema de ACCESO_CAMPUS (Prioridad: ALTA)"*.
* **Email (Opcional):** Respuesta automática al Agente confirmando que el ticket está en proceso y sugiriendo el primer paso (ej: *"Verificá si tu usuario es tu DNI"*).

---

## Visualización del Flujo Lógico

---

## Criterio de Éxito: El "Human-in-the-loop"

Para que tu MVP sea profesional, no dejaremos que la IA responda sola directamente (puede ser riesgoso en sistemas académicos). Propondremos un modelo donde la IA **prepara la solución** y tú solo haces **click en "Enviar"**.

> [!IMPORTANT]
> **Recordatorio Progresivo:** Al diseñar los prompts de OpenAI dentro de Make, asegúrate de indicarle que si el Agente menciona una clave por error, la ignore o la censure en el log de salida. **Seguridad ante todo.**

---

### Siguiente Paso: Definición del Prompt

Para avanzar con la ficha técnica detallada, necesito que hagamos un ejercicio de "instrucciones para la IA".

**¿Te animás a redactar en una oración qué debería verificar la IA para cada caso?**
Ejemplo para el Caso 1: *"Si el usuario menciona 'Campus' y 'Moodle', la IA debe revisar si el problema es de contraseña o de matriculación"*.

**¿Cómo definirías vos la "regla de oro" para los otros dos casos (Preinscripción y Sistema Académico)?** Una vez que tengamos esto, te ayudaré a armar el **Prompt Maestro** para tu nodo de Make.