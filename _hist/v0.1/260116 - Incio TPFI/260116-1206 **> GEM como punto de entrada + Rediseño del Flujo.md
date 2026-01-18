### 260116-1205 **> RMONLA

En cuanto al Trigger se me ocurrió si es posible que el inicio y ámbito de consulta sea un GEM que se puede llamar GEM DTIC, y este será el encargado de captar la consulta, esto cambia la perspectiva de pensamiento por que debes actualizar el curso de lo hecho hasta ahora.
---

### 260116-1206 **> IA

¡Excelente giro, Ricardo! Usar un **GEM (Gemini Personalizado)** como punto de entrada es una evolución muy inteligente para el proyecto. Cambia el paradigma de un "formulario estático" a una **interfaz conversacional**.

Esto no solo mejora la experiencia del Agente (Alumno, Docente, etc.), sino que garantiza que la información que llegue a tu automatización en **Make** sea mucho más limpia y categorizada. El GEM actúa como un **Filtro de Primera Línea**.

Actualicemos nuestro diseño técnico con esta nueva perspectiva:

---

## Rediseño del Flujo: Conversacional-First

Ahora el flujo no empieza con un "envío", sino con una "conversación".

### 1. El Nuevo Trigger: GEM DTIC (Interfaz)

* **Función del GEM:** Interactuar con el Agente. Su objetivo es identificar quién es el usuario y qué necesita exactamente antes de disparar cualquier proceso.
* **Capacidad de "Repregunta":** Si un alumno dice "No puedo entrar", el GEM está instruido para preguntar: *"¿Te referís al Campus Virtual o al Sistema Académico?"*. Esto ahorra pasos de limpieza de datos en Make.

### 2. Conexión GEM -> Make

Cuando el GEM tiene la información necesaria, utiliza una función (Tool Calling/Action) para enviar un JSON estructurado a un **Webhook de Make**.

### 3. Ficha Técnica Actualizada

| Componente | Rol en el Sistema |
| --- | --- |
| **Front-end (GEM DTIC)** | **Triaje Conversacional:** Saluda, identifica al Agente, clasifica el problema y recolecta datos (DNI, Materia, etc.). |
| **Trigger (Webhook)** | Recibe los datos ya "masticados" por el GEM. |
| **Lógica en Make** | **Enrutador:** Según lo que el GEM identificó, decide si envía un mail al equipo de Redes, si genera un ticket en rm-OIS o si guarda en la Bitácora. |
| **Output** | Notificación al equipo técnico y confirmación al Agente. |

---

## Visualización del Nuevo Ecosistema

---

## Definamos las "Reglas de Oro" para el GEM DTIC

Para que este GEM sea efectivo y sepas qué configurar en sus instrucciones (System Instructions), necesitamos definir qué debe verificar según cada caso que planteaste antes.

Siguiendo tu lógica, aquí te propongo cómo debería "pensar" el GEM antes de enviar la información a Make:

1. **Caso Campus Virtual:** * *Regla:* El GEM debe preguntar si el error es de login (credenciales) o si es que no ve una materia específica (matriculación).
2. **Caso Preinscripción:** * *Regla:* El GEM debe solicitar el DNI y preguntar si ya ha realizado cursos previos en la facultad para detectar duplicidad de registros.
3. **Caso Sistema Académico:** * *Regla:* El GEM debe validar si el usuario ya intentó la opción de "Recuperar Contraseña" por su cuenta antes de derivar el caso a un técnico.

---

> [!WARNING]
> **Privacidad en el GEM:** Al configurar el **GEM DTIC**, es vital que le indiques en sus instrucciones: *"Nunca almacenes ni repitas contraseñas de usuarios. Si un usuario te escribe su clave, bórrala y adviértele sobre prácticas seguras"*. Recuerda que en tu TP final usaremos siempre **"Usuario Z"** o **"DNI 12345"** como ejemplos.

### Mi pregunta para avanzar en la Fase 2:

Ahora que el GEM es el encargado de "dar la cara", **¿cómo te imaginas que el GEM debería despedirse del Agente una vez que envía los datos a Make?**

* A) Le da un **Número de Ticket** (generado por el sistema).
* B) Le dice un **Tiempo Estimado** de respuesta según el rol (ej. "Las autoridades reciben respuesta en < 2hs").
* C) Le ofrece un **Enlace a un Tutorial** mientras espera.

Esto nos servirá para definir el **Output final** de tu automatización. ¡Este proyecto está tomando una forma excelente!
