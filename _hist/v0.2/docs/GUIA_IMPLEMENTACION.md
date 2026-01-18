# Guía de Implementación: dtic-GEMA

Esta guía detalla los pasos para transferir la configuración local del repositorio a los servicios en la nube (Google Sheets, Make.com y Gemini Advanced).

## 🛠️ Prerrequisitos
-   Cuenta de Google (para Sheets y Gemini).
-   Cuenta de Make.com.
-   Archivos del repositorio (disponibles en tu carpeta local o GitHub).

---

## 1. Base de Datos (Google Sheets)
Vamos a crear el "cerebro" de datos del sistema.

1.  Crea una nueva hoja de cálculo en Google Sheets llamada **"dtic-GEMA_BD"**.
2.  **Importar Agentes:**
    *   Ve a `Archivo > Importar > Subir`.
    *   Sube el archivo local `data/agentes_mock.csv`.
    *   Selecciona "Reemplazar hoja actual" o "Insertar nuevas hojas". Renombra la hoja a **"Agentes"**.
3.  **Importar Conocimiento:**
    *   Repite el proceso con `data/conocimiento_mock.csv`.
    *   Renombra la hoja a **"Conocimiento"**.
4.  **Crear Hoja de Tickets:**
    *   Crea una hoja vacía llamada **"Tickets"**.
    *   En la fila 1, escribe los encabezados: `ID_Ticket`, `Fecha`, `Email`, `Apellido_Nombre`, `Carrera`, `Consulta`, `Prioridad_IA`, `Estado`.

### ID Google Sheet: `1gsRyE_cS0jPUR-UQUpIfQ674g3Ws08WnTY6Xbfcb69Q`   

---

## 2. Lógica de Negocio (Make.com)
Vamos a conectar el cerebro con la interfaz.

1.  Crea un **Nuevo Escenario** en Make.com.
2.  **Trigger (Webhook):**
    *   Agrega un módulo "Webhooks" -> "Custom webhook".
    *   Crea uno nuevo llamado `webhook-dtic-gema`.
    *   **¡COPIA LA URL DEL WEBHOOK!**  La necesitarás en el paso 3.

    ### URL Webhook: `https://hook.us2.make.com/yl26qec8u2lric3yr17krrtiaxws5rkr`
    
    > [!IMPORTANT]
    > **Paso Crítico: Determinar Estructura de Datos**
    > Para que aparezcan las variables "moradas", Make necesita recibir datos de prueba una vez.
    > 1. En el módulo Webhook, haz clic en **"Redetermine data structure"** (o asegúrate de que esté escuchando).
    > 2. Abre una terminal en tu computadora y ejecuta este comando (reemplaza la URL si cambió):
    > ```bash
    > curl -X POST https://hook.us2.make.com/yl26qec8u2lric3yr17krrtiaxws5rkr \
    > -H "Content-Type: application/json" \
    > -d '{"email": "alumno1@frlr.utn.edu.ar", "dni": "12345678", "carrera": "Sistemas", "sistema": "Campus", "descripcion": "Prueba"}'
    > ```
    > 3. Si dice "Successfully determined", ¡ya puedes seguir!


3.  **Módulo: Google Sheets - Search Rows (Validación):**
    *   Conecta este módulo al Webhook.
    *   **Conexión:** Selecciona tu cuenta de Google.
    *   **Spreadsheet:** `dtic-GEMA_BD`.
    *   **Sheet:** `Agentes`.
    *   **Filter:** `Email` (columna A) **Equal to** `email` (variable purpura que viene del Webhook).
    *   *Objetivo:* Buscar si el usuario existe en nuestra base de datos.

4.  **MóduloFlow Control: Router:**
    *   Añade un Router después del Search Rows. Esto dividirá el camino en dos.

5.  **Ruta A: Usuario Validado (Existe)**
    *   **Filtro (en la línea):** Haz clic en la línea entre el Router y el siguiente módulo.
        *   Label: `Usuario Encontrado`.
        *   Condition: `Total number of bundles` (del módulo Search Rows) **Greater than** `0`.
    *   **Módulo: Google Sheets - Add Row (Crear Ticket):**
        *   Agrega este módulo en la Ruta A.
        *   **Sheet:** `Tickets`.
        *   **Valores:**
            *   `ID_Ticket`: Usa una fórmula `uuid()` o `timestamp`.
            *   `Fecha`: Variable `now`.
            *   `Email`: Variable `email` (probablemente del Webhook).
            *   `Consulta`: Variable `descripcion`.
            *   `Estado`: `Abierto`.
    *   **Módulo: Webhook Response:**
        *   **Body:**
            ```json
            {
                "ticket_id": "{{ID_Ticket}}",
                "mensaje": "Ticket creado exitosamente. Tu prioridad es normal."
            }
            ```
        *   *Nota:* Puedes personalizar el mensaje usando campos de la búsqueda (ej. Nombre).

6.  **Ruta B: Usuario No Encontrado (Desconocido)**
    *   **Filtro:**
        *   Label: `No Encontrado`.
        *   Condition: `Total number of bundles` (del Search Rows) **Equal to** `0`.
    *   **Módulo: Webhook Response:**
        *   **Status:** 403 (Opcional, o 200 con mensaje de error).
        *   **Body:**
            ```json
            {
              "error": "No estás registrado en la base de alumnos. Contacta a bedelia."
            }
            ```

    


---

## 3. Interfaz del Asistente (Gemini)
Vamos a crear el Gem que hablará con los usuarios.

1.  Ve a [Gemini Gems](https://gemini.google.com/gems).
2.  Crea un nuevo Gem llamado **"dtic-GEMA_FRLR"**.
3.  **Instrucciones:**
    *   Copia y pega TODO el contenido del archivo local [`prompts/maestro.md`](../prompts/maestro.md).
4.  **Acciones (Actions):**
    *   **Paso Previo:** Asegúrate de tener las **Extensiones** habilitadas. Haz clic en el icono de engranaje (Configuración) > Extensiones > Activa **Google Workspace**.
    *   En el editor del Gem, busca la sección **"Herramientas"** o desplázate hasta el final debajo de "Conocimiento".
    *   Haz clic en **"+ Agregar acción"** (o "+ Agregar herramienta").
    *   En **Schema**, copia y pega el contenido de [`schemas/gem_action.json`](../schemas/gem_action.json).
    *   **IMPORTANTE:** En el campo de servidor/URL, pega la URL base de tu Webhook de Make (la parte antes de los parámetros, ej: `https://hook.us2.make.com`).

---

## ✅ Verificación
1.  Abre tu Gem **dtic-GEMA_FRLR**.
2.  Escribe: *"Hola, soy el alumno Juan, mi email es alumno1@frlr.utn.edu.ar y tengo un problema con el Campus."*
3.  El Gem debería:
    *   Reconocerte (por el prompt).
    *   Pedir tu DNI (si no lo diste).
    *   Intentar ejecutar la acción `registrar_ticket`.
4.  Verifica en **Make.com** que el módulo Webhook haya recibido los datos.
