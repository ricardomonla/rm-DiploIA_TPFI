# Guía de Configuración: Make + Gemini

Para que **dtic-GEMA** hable, debemos elegir la opción correcta y rellenar los campos con cuidado.

## Paso 1: Elegir la Acción
De la lista que me mostraste, selecciona la primera opción:

👉 **Create a Chat Prompt (Gemini)**

*(Esta es la opción estándar para "chatear" texto con texto. Las otras son para imágenes o video).*

---

## Paso 2: Configurar los Campos
Al hacer clic, se abrirá una ventana de configuración. Complétala así:

### A. Connection
Selecciona la conexión de Google que arreglamos antes (la que tiene permisos de Vertex AI).

### B. Model
En la lista de modelos, busca y selecciona:
*   `gemini-1.5-flash-001` (Es el más rápido y barato, ideal para chatbots).
*   *Si no aparece, prueba `gemini-pro`.*

### C. Messages (Aquí ocurre la magia)
Verás una sección llamada `Messages` o `Prompt`. Debemos agregar 2 ítems (Add Item):

#### Ítem 1: El Cerebro (System Instruction)
*   **Role**: Selecciona `User` (ya que no aparece System).
*   **Content**: (Copia y pega TODO ESTO):
    ```text
    Eres dtic-GEMA, la Asistente Virtual Inteligente de la Dirección de TIC de la UTN Facultad Regional La Rioja.
    Tu identidad es femenina, profesional, empática y altamente eficiente. No eres un simple bot; eres una entidad digital diseñada para resolver problemas y facilitar la vida de alumnos y docentes.

    TUS OBJETIVOS:
    1. Recibir consultas de usuarios (Alumnos o Docentes).
    2. Validar su identidad (ya has recibido confirmación de que existen en la BD).
    3. Responder con claridad, calidez y precisión técnica.
    4. Generar confianza mediante un trato humano ("Cyber-Empathy").

    TU TONO DE VOZ:
    - Profesional pero cercano. Evita el lenguaje robótico estándar ("Su consulta ha sido recibida").
    - Usa frases como: "He procesado tu solicitud", "Entiendo tu problema", "Estoy aquí para ayudarte".
    - Muestra proactividad.
    - Usa negritas (Markdown) para resaltar datos importantes como Números de Ticket o Pasos a seguir.

    RESTRICCIONES:
    - Nunca inventes información. Si no conoces la respuesta, indica que derivarás el caso a un "soporte humano especializado".
    - Sé concisa. Nadie quiere leer muros de texto.
    - Siempre firma como: "dtic-GEMA | Asistente Virtual".
    ```

#### Ítem 2: El Mensaje del Usuario (User Message)
*   Agrega otro ítem.
*   **Role**: Selecciona `User`.
*   **Content**: Aquí vamos a combinar texto fijo con las "burbujas" de variables de Make. Escribe algo así:

    ```text
    Datos del Usuario:
    - Email: {{3.email}}
    - DNI: {{3.dni}}
    - Consulta Original: {{3.descripcion}}

    Instrucción:
    Responde a este usuario confirmando que su ticket ha sido generado. Analiza su consulta y dale una respuesta preliminar o indícale los tiempos de espera.
    ```
    *(Tip: Copia el texto fijo, pero los `{{...}}` reemplázalos arrastrando las burbujas moradas del Webhook).*

### D. Response Format (Opcional)
Déjalo como `text/plain` o vacío.

---

## Paso 3: Probar
Dale OK para guardar el nodo.
Luego haz clic derecho en el nodo y selecciona **"Run this module only"**.
Te pedirá datos de prueba. Escribe cualquier cosa (ej. "Hola, prueba") y mira si devuelve una respuesta en verde.
