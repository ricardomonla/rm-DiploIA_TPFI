## 🚀 Fase 1: Preparación de la Infraestructura de Datos

El primer paso es construir los cimientos en la nube donde residirá el conocimiento del sistema.

1. **Configuración de Google Sheets:**
* Crear el libro "dtic-GEMA_BD".
* **Hoja 1 (Agentes):** Cargar una lista de prueba con Emails, DNIs y Roles (Alumno/Docente/Autoridad).
* **Hoja 2 (Conocimiento):** Cargar los tutoriales de Moodle, Preinscripción y Sistema Académico.
* **Hoja 3 (Tickets):** Dejarla vacía con los encabezados para que Make empiece a escribir.


2. **Preparación de Make.com:**
* Crear un nuevo escenario llamado "Ecosistema dtic-GEMA".
* Generar el **Webhook Personalizado** y copiar la URL (la necesitaremos para el Gem).



---

## 🧠 Fase 2: Configuración del "Cerebro" (dtic-GEMA_FRLR)

Aquí es donde le damos vida a la interfaz conversacional en Gemini.

1. **Creación del Gem:**
* Ingresar a la interfaz de Gems y crear uno nuevo llamado **dticGEMA_FRLR**.
* Pegar el **Prompt Maestro** en la sección de instrucciones.


2. **Conexión Técnica (Tool Calling):**
* Configurar la "Acción" dentro del Gem para que apunte a la URL del Webhook de Make.
* Definir el esquema JSON para que el Gem envíe: `{email, dni, carrera, sistema, descripcion}`.



---

## 🔗 Fase 3: Orquestación del Flujo Lógico en Make

Es el momento de conectar los "globos" para que la información fluya correctamente.

* **Paso A (Validación):** Conectar el Webhook al módulo de Google Sheets "Search Rows" para validar Email y DNI.
* **Paso B (El Router):** Configurar el filtro de seguridad. Si el Email no coincide con el DNI en la planilla, el flujo se detiene o envía una alerta de "Usuario No Encontrado".
* **Paso C (La Inteligencia):** Insertar el módulo de Gemini 1.5 en Make para procesar la prioridad y generar el "Sabías que..." según la carrera recibida.
* **Paso D (Cierre):** Configurar el "Webhook Response" para que GEMA le devuelva al usuario el número de ticket y el tiempo estimado de respuesta (2hs o 24hs).

---

## 🛡️ Fase 4: Pruebas de Estrés y Seguridad (QA)

Antes de abrirlo a toda la facultad, realizaremos pruebas controladas.

| Prueba | Acción Esperada |
| --- | --- |
| **Ingreso de Password** | GEMA debe detectar la clave, ignorarla y advertir al usuario. |
| **DNI Incorrecto** | El sistema debe identificar que los datos no coinciden y no otorgar información privilegiada. |
| **Prioridad de Autoridad** | Verificar que si el rol es "Autoridad", el ticket se marque con respuesta en < 2hs. |

---

## 📅 Fase 5: Lanzamiento Gradual

1. **Semana 1 (Piloto Interno):** Uso exclusivo por el equipo de la Dirección de TIC para registrar tareas en la Bitácora de Sucesos.
2. **Semana 2 (Beta Cerrada):** Acceso a un grupo selecto de alumnos de Ingeniería Civil para probar el "Sabías que..." y la descarga de tutoriales.
3. **Semana 3 (Producción):** Publicación del enlace del Gem en el Campus Virtual y el Sistema Académico de la UTN FRLR.

---

¿Te gustaría que te ayude a redactar el **primer mensaje de bienvenida** que dirá **dticGEMA FRLR** para que los alumnos se sientan motivados a usarla desde el primer día?