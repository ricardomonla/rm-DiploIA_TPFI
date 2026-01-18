### 260116-1228 **> RMONLA

Me gustaría básicamente los 3, ya que también me gustaría considerar que el GEM podría preguntar el numero de ticket para saber si ya fue resuelto, en que estado está o internamente para el seguimiento. También el tiempo estimado de respuesta es muy interesante ya bque prepara al agente a esperar o no según el caso. Y lo de ofrece un tutorial deberia ser mas como que si el GEM lo resuelve indicar el tutorial de como continuar, y si depende de un encargado o similar se podría agregar un "Sabias que ..." que cuente de cosas relevantes a su tema por ejemplo para el alumno de ingeniería civil poder dar un dato de interés de esa area y si esta relacionado con la facultad mejor.  
---

### 260116-1234 **> IA

¡Excelente visión, Ricardo! Estás elevando el proyecto de una simple "automatización de tickets" a un **Asistente Virtual Inteligente de Alto Valor**.

Al integrar estas tres funciones (Seguimiento, Expectativa de Tiempo y Valor Agregado/Tutorial), el **GEM DTIC** no solo resuelve problemas, sino que mejora la relación de la Facultad con sus agentes.

Vamos a estructurar esta lógica para tu **Fase 2 (Diseño Técnico)**, porque esto impacta directamente en cómo configuraremos los "Nodos" en **Make** y las "Instrucciones" en el **GEM**.

---

### 1. El Flujo de Decisión del GEM (Modo Dual)

Tu GEM ahora debe tener dos modos principales de operación apenas inicia la charla:

* **A) Consulta de Seguimiento:** Si el usuario dice "Quiero saber cómo va mi trámite", el GEM debe pedir el **Número de Ticket**.
* *Acción de IA:* El GEM consulta a través de Make (en una planilla o base de datos) el estado del Ticket Z y le informa al agente.


* **B) Nueva Solicitud:** Si es un problema nuevo, el GEM recolecta los datos (DNI, Sistema, Rol).

---

### 2. El Output Personalizado (El factor "Wow" del TP)

Esta es la parte donde la IA deja de ser "decorativa" y se vuelve "generativa y contextual". Para tu TP, definiremos esta lógica de salida:

#### **Si el GEM resuelve el problema (Auto-servicio):**

* **Acción:** Entrega el tutorial paso a paso.
* **Ejemplo:** *"¡Listo, Usuario Z! He blanqueado tu acceso al Campus. Aquí tenés un tutorial de cómo ingresar por primera vez."*

#### **Si el GEM escala el problema (Depende de un técnico):**

* **Acción 1 (Expectativa):** *"He derivado tu caso al equipo técnico. Como sos **[Rol: Alumno]**, el tiempo estimado de respuesta es de 24 hs hábiles."*
* **Acción 2 (Dato de Interés - "Sabías que..."):** Aquí es donde la IA usa el contexto de la carrera.
* *Lógica del Prompt:* "Si el alumno es de Ingeniería Civil, busca un hito histórico de la Facultad de Ingeniería o un dato técnico relevante a la construcción sustentable."
* *Ejemplo:* *"¿Sabías que el edificio de nuestra Facultad fue premiado en 19XX por su estructura de hormigón armado? Mientras esperás, ¡es un buen dato para un futuro Ingeniero Civil!"*



---

### 3. Ficha Técnica Actualizada para el TP

Esta estructura es la que deberás volcar en tu documento final (recuerda usar nombres genéricos):

| Componente | Configuración Técnica |
| --- | --- |
| **Interfaz (GEM DTIC)** | **System Instructions:** Debe actuar como recepcionista técnico. Debe identificar: Rol, Sistema y Carrera. |
| **Conectividad** | **Action/Function Calling:** El GEM envía un JSON a Make con: `{agente, rol, carrera, sistema, descripcion}`. |
| **Cerebro (Make + OpenAI/Gemini)** | **Nodo Router:** <br>

<br> 1. Si es Ticket existente -> Busca en Google Sheets. <br>

<br> 2. Si es Ticket nuevo -> Registra y calcula tiempo de respuesta. |
| **Generador de "Sabías que"** | **Nodo IA Contextual:** Un prompt específico que recibe la `carrera` y genera el dato de interés antes de cerrar la sesión. |

---

### 4. Tu "Quick Win" se ha potenciado

Al principio buscábamos solo clasificar, ahora buscamos **Fidelizar al Agente**.

> [!CAUTION]
> **Recordatorio de Seguridad para el TP:** > En la sección de "Datos de Interés", asegúrate de indicar que el sistema **no accede a la ficha académica real** del alumno para buscar su carrera, sino que se la **pregunta amablemente** durante la charla en el GEM para mantener la privacidad. En los diagramas, llama a la base de datos como **"DB_Sucesos_Z"**.

---

### Próximo paso para la Fase 2:

Para armar el **Prompt Maestro** que irá dentro del GEM, necesito que elijas una de estas dos opciones para avanzar:

1. **Diseño de la Base de Conocimiento:** ¿Qué "datos de interés" o "tutoriales" básicos (de forma genérica) te gustaría que el sistema maneje primero?
2. **Lógica de Tiempos:** ¿Qué prioridades de tiempo te gustaría asignar? (Ej: Autoridades: 2hs, Docentes: 4hs, Alumnos: 24hs).

**¿Con cuál de estos dos puntos preferís que sigamos detallando la ficha técnica?**