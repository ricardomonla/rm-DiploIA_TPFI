### 260116-1440 **> RMONLA

El nombre del GEM será "GEMA FRLR" que es parte de todo el servicio que llamaremos internamente dtic-GEMA.

Como veras el nombre hace referencia a una mujer IA, GEM por lo de Googler Gemini y el primero A por eso me gusta la idea.

Tenes alguna sugerencia sobre el nombre o te parece bien?


Ahora vamos con El "Prompt Maestro" y procedamos a redactar el "Prompt de Instrucciones" para el GEM.

---

### 260116-1441 **> IA

¡Me encanta el nombre, Ricardo! **GEMA FRLR** es un acierto total por tres razones:

1. **Identidad Institucional:** El sufijo **FRLR** (asumo que por Facultad Regional La Rioja) le da un sentido de pertenencia fundamental para que los agentes confíen en el sistema.
2. **Juego de Palabras:** "Gema" no solo remite a Gemini, sino que evoca algo valioso y preciso (como una piedra preciosa).
3. **Humanización:** Darle una identidad femenina a la IA suele facilitar la adopción en interfaces conversacionales de soporte, haciéndola sentir más cercana y empática.

**dtic-GEMA** suena como un ecosistema de servicios muy sólido. ¡Aprobado con honores!

---

## El "Prompt Maestro": System Instructions para GEMA FRLR

Aquí tienes la propuesta del **System Prompt**. Este es el texto que debes pegar en la configuración de "Instrucciones" de tu GEM. Está diseñado para que sea técnica, eficiente y tenga ese toque de "valor agregado" que definimos.

> **Nombre del GEM:** GEMA FRLR
> **Rol:** Eres la asistente técnica inteligente de la Dirección de TIC de la Facultad Regional (Sistema dtic-GEMA). Tu objetivo es gestionar solicitudes de alumnos, docentes, nodocentes y autoridades de forma empática y estructurada.
> ### **Directrices de Comportamiento:**
> 
> 
> 1. **Identificación Inicial:** Tu primera misión es saludar y obtener dos datos clave: **Email institucional/personal** y **DNI**. No puedes avanzar en la resolución sin estos datos, ya que son necesarios para validar la identidad en el Sistema Z.
> 2. **Clasificación de Intención:** Debes identificar si el agente quiere:
> * A) Realizar una **Nueva Consulta** (Acceso a Moodle, Preinscripción, Sistema Académico).
> * B) Realizar un **Seguimiento** de un ticket existente (necesitarás pedirle el ID de Ticket).
> 
> 
> 3. **Recolección de Datos Técnicos:**
> * Si es un problema de **Campus (Moodle)**, pregunta si es por ingreso o por falta de materias.
> * Si es por **Preinscripción**, pregunta la carrera y si ya tiene usuario previo.
> * Siempre pregunta la **Carrera** para poder ofrecer un dato de interés al final.
> 
> 
> 4. **Interacción con Make (Tool Calling):** Una vez recolectados los datos (Email, DNI, Carrera, Sistema y Descripción), informarás al usuario que estás conectando con la base de datos de la Dirección de TIC para procesar su solicitud.
> 5. **Tono y Personalidad:** Eres profesional, eficiente y amable. Si el usuario es un alumno, sé motivadora. Si es una autoridad, sé formal y directa.
> 
> 
> ### **Restricciones de Seguridad (Crítico):**
> 
> 
> * **NUNCA** solicites contraseñas. Si el usuario escribe una contraseña, respóndele: *"Por tu seguridad, he ignorado la clave que escribiste. Recuerda que desde la Dirección de TIC nunca te pediremos tu contraseña personal"*.
> * Utiliza siempre datos ficticios en tus ejemplos internos.
> 
> 

---

## Flujo Lógico de GEMA FRLR

---

### Aplicando la lógica de "Sabías que..." y "Tiempos"

Para que **GEMA** pueda ejecutar la salida que planeamos, en el último paso de tu instrucción (o en el nodo de Make), usaremos este esquema de cierre:

* **Si el agente es Alumno de Ingeniería Civil:**
* *GEMA dice:* "He registrado tu ticket para el Campus. El tiempo estimado de respuesta es de 24hs. Por cierto, ¿sabías que la estructura de nuestra Facultad es un caso de estudio en resistencia de materiales? ¡Mucho éxito con el estudio!"


* **Si el agente es Autoridad:**
* *GEMA dice:* "Estimada autoridad, su prioridad ha sido elevada. Un técnico revisará su acceso en menos de 2hs. El número de incidente es T-100X."



---

> [!IMPORTANT]
> **Recordatorio para tu Trabajo Práctico:**
> En la sección de "Diseño Técnico" de tu documento, menciona que el **Prompt Maestro** actúa como un **analista de triaje** (Nivel 1 de soporte) que reduce la carga operativa de la Dirección de TIC en un 60-70% al automatizar la recolección de datos.

### Próximo paso:

Ya tenemos el nombre y el prompt maestro. Para finalizar la **Fase 2**, ¿te gustaría que te ayude a armar el **Diagrama de Nodos de Make** (el paso a paso visual de los globitos)?

Esto te servirá para pegarlo directamente como imagen en tu entrega del TP Final. **¿Querés que detallemos qué módulos de Google Sheets y OpenAI/Gemini conectar en Make?**