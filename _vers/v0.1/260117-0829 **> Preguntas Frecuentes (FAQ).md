# Guía de Preguntas Frecuentes: Proyecto dtic-GEMA_FRLR

<details>
<summary><b>1. ¿Por qué se optó por un GEM conversacional en lugar de un formulario web tradicional?</b></summary>

* El uso de un GEM cambia el paradigma de un "formulario estático" a una interfaz conversacional, lo que mejora significativamente la experiencia del agente (alumno o docente).
* Funciona como un **filtro de primera línea** inteligente que garantiza que la información que llega a la automatización en Make esté limpia y correctamente categorizada.
* Permite la capacidad de "repregunta": si un usuario es impreciso, el GEM puede clarificar si el problema es de login o de matriculación antes de disparar el proceso.

</details>

<details>
<summary><b>2. ¿Cómo garantiza el sistema la seguridad y privacidad de los datos sensibles?</b></summary>

* El sistema tiene instrucciones críticas (System Prompt) de **nunca solicitar ni almacenar contraseñas**; si un usuario escribe una, la IA debe ignorarla y advertir sobre prácticas seguras.
* Se implementa una validación cruzada entre el **Email y el DNI** en la base de datos para asegurar la identidad antes de entregar información sobre estados de trámites o accesos.
* Toda la documentación y los ejemplos de prueba utilizan datos anonimizados (ej. "Usuario Z", "DNI 12345") para cumplir con los estándares de protección de datos de la Facultad.

</details>

<details>
<summary><b>3. ¿Cuál es el rol específico de la IA en el flujo de trabajo (Make.com)?</b></summary>

* La IA actúa como un **cerebro analítico** que determina la prioridad del ticket basándose en el rol del usuario (asignando 2 horas de respuesta para autoridades y 24 horas para alumnos).
* Identifica de forma generativa la carrera del alumno para ofrecer un dato de interés ("Sabías que...") que aporte valor institucional a la interacción.
* No es un elemento decorativo; es el motor que decide, según la descripción del problema, qué tutorial o solución de la base de conocimiento es la más adecuada para el caso.

</details>

<details>
<summary><b>4. ¿Cómo se gestiona el mantenimiento y la escalabilidad de la base de conocimiento?</b></summary>

* El sistema es altamente escalable porque utiliza **Google Sheets** como repositorio central de tutoriales y soluciones.
* Esto permite que cualquier integrante de la Dirección de TIC, sin conocimientos de programación, pueda actualizar un procedimiento o un enlace a un tutorial sin necesidad de modificar el flujo lógico en Make.

</details>

<details>
<summary><b>5. ¿Qué sucede si el sistema no encuentra al usuario en la base de datos (Ruta B)?</b></summary>

* El **Nodo Router** en Make detecta la falta de coincidencia y desvía el flujo para clasificar al usuario como "Postulante" o "Usuario Externo".
* En este caso, el sistema evita entregar información interna y deriva el caso a una verificación manual por parte del equipo de TIC para asegurar la integridad de los datos académicos.

</details>

---

### Notas clave para tu defensa:

> El proyecto destaca por su enfoque **"Human-in-the-loop"**, donde la IA prepara la solución técnica (triaje Nivel 1) para reducir la carga operativa de la Dirección de TIC en un 60-70%, permitiendo que el equipo humano se enfoque en casos de mayor complejidad.

---
