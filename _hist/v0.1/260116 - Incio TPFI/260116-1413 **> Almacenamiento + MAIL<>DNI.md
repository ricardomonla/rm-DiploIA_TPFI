### 260116-1411 **> RMONLA

La Opción A: Google Sheets es la que usaremos.

Pero es posible que el GEM capture el mail que seguramente debe ser uno de gmail o alguno que identifica inicialmente al que consulta y este debería ser el que se relaciona con el DNI luego esto iniciaría todo

---

### 260116-1413 **> IA

¡Perfecto, Ricardo! **Google Sheets** es la opción ideal para un MVP: es transparente, fácil de auditar y se integra nativamente con Make sin complicaciones técnicas mayores.

La idea de usar el **Email** como llave inicial es brillante y muy profesional. En el mundo de la automatización, esto se llama **"Key Mapping"**. El correo electrónico identifica la identidad digital del Agente, y el **DNI** actúa como un factor de validación para asegurar que los registros del "Sistema Z" coincidan.

Con esto, ya tenemos la estructura completa de la **Fase 2: Diseño Técnico**. Aquí tienes la ficha técnica consolidada para tu Trabajo Práctico:

---

## Ficha Técnica: Sistema Inteligente de Gestión TIC (SIG-TIC)

### 1. Arquitectura de Datos (Google Sheets)

Para que el sistema funcione, necesitaremos un libro con tres hojas principales:

* **Hoja "Agentes":** Columnas: `Email`, `DNI`, `Nombre_Anonimizado`, `Rol` (Docente/Alumno/etc.), `Carrera`.
* **Hoja "Tickets":** Columnas: `ID_Ticket`, `Email`, `Fecha`, `Sistema`, `Estado`, `Resumen_IA`.
* **Hoja "Conocimiento":** Columnas: `Sistema`, `Tutorial_Link`, `Dato_Curioso_Carrera`.

### 2. Flujo Lógico de la Automatización (Make.com)

1. **Trigger (Webhook):** El **GEM DTIC** envía un paquete de datos: `Email`, `DNI` y la `Consulta_Texto`.
2. **Nodo de Búsqueda (Search Row):** Make busca en la hoja "Agentes" una fila donde coincidan el **Email** Y el **DNI**.
* *Si existe:* Extrae el `Rol` y la `Carrera`.
* *Si no existe:* Clasifica al usuario como "Postulante" o "Usuario Externo".


3. **Nodo de IA (Clasificador y Analista):** * **Prompt:** Analiza la `Consulta_Texto`, identifica el `Sistema` afectado (Moodle, Guaraní, etc.) y asigna una `Prioridad` según el `Rol` (recordando tus tiempos: Autoridad 2hs, Alumno 24hs).
4. **Nodo de IA (Generador de Respuesta):** * Redacta el mensaje de salida incluyendo el **Estado del Ticket**, el **Tutorial** correspondiente y el **"Sabías que..."** basado en la carrera encontrada.
5. **Output:** * Actualiza la hoja "Tickets".
* Envía la respuesta al GEM (o vía Email/Telegram al Agente).



---

## Criterios de Éxito (Para tu Defensa del TP)

* **IA No Decorativa:** La IA no solo "charla", sino que decide la prioridad del ticket y personaliza el contenido educativo ("Sabías que") de forma dinámica.
* **Lógica Sólida:** El cruce de Email + DNI asegura que la información académica no se entregue a cualquiera.
* **Escalabilidad:** Al estar basado en Google Sheets, cualquier no-programador puede actualizar los tutoriales sin tocar el código.

---

> [!CAUTION]
> **Recordatorio de Seguridad de Tutor:** > Cuando configures el nodo de búsqueda en Make, utiliza la función de **"Filtro"**. Asegúrate de documentar que los datos viajan cifrados vía HTTPS. En tu documento final, describe el proceso de identificación como: *"Se realiza una validación cruzada entre el Identificador Único (Email) y el Documento Identificatorio (DNI) en la Base de Datos Z"*.

---

### Siguiente Paso: El "Prompt Maestro"

Para terminar la Fase 2, lo más importante es el **System Prompt** que le pondrás al GEM para que sepa cómo pedir estos datos.

**¿Te gustaría que te ayude a redactar el "Prompt de Instrucciones" para tu GEM DTIC, definiendo cómo debe saludar y cómo debe solicitar el Email y DNI de forma amable pero eficiente?**