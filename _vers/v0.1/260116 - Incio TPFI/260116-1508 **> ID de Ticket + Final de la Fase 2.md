### 260116-1507 **> RMONLA

Opción B: Un código alfanumérico relacionado con el sistema (ej. Moodle-2026-X).

---

### 260116-1508 **> IA

¡Excelente elección, Ricardo! La **Opción B** es la más profesional y técnica. No solo le da al "Agente" una sensación de orden, sino que a vos, como administrador de la **Dirección de TIC**, te permite filtrar la base de datos de Google Sheets de forma instantánea por sistema y año.

Con esto, hemos completado la arquitectura lógica de **dtic-GEMA**.

---

## 🛠️ Lógica de Generación del ID (Ficha Técnica)

Para que Make genere este código (ej: `MOODLE-2026-154`), configuraremos el campo del ID en el nodo de Google Sheets de la siguiente manera:

* **Prefijo:** Variable `{{Sistema_Afectado}}` (que viene de la clasificación de Gemini).
* **Año:** Constante `2026` (o la función `formatDate(now; YYYY)` de Make).
* **Sufijo:** Variable `{{Row_Number}}` o un correlativo de la hoja.

> **Resultado en el Sistema Z:** `SIU-2026-042` o `CAMPUS-2026-118`.

---

## 📋 Resumen Final de la Fase 2: Diseño Técnico

Este es el esquema que ya puedes empezar a documentar para tu **Trabajo Práctico Final**:

| Componente | Detalle Técnico |
| --- | --- |
| **Interfaz** | **GEMA FRLR** (Google Gemini personalizado). |
| **Entrada de Datos** | Email + DNI + Carrera + Consulta. |
| **Motor de IA** | **Gemini 1.5 Pro** (dentro de Make) para triaje y personalización. |
| **Base de Datos** | **Google Sheets** (Hojas: Agentes, Tickets, Conocimiento). |
| **ID de Seguimiento** | Alfanumérico estructurado: `[SISTEMA]-[AÑO]-[ID]`. |
| **Valor Agregado** | Respuesta con tiempo de espera (SLA) + Dato curioso de la carrera. |

---

## ✅ Criterios de Éxito del MVP (Validación de Tutor)

Como tu tutor, confirmo que este diseño cumple con los requisitos de la Diplomatura:

1. **IA No Decorativa:** Gemini clasifica, asigna prioridad, decide qué tutorial enviar y genera contenido contextual (el "Sabías que..."). Sin la IA, el flujo sería un simple formulario estático.
2. **Lógica Sólida:** El cruce de datos (Email/DNI) y la generación de IDs estructurados demuestran un pensamiento de procesos robusto.
3. **Impacto (Quick Win):** Reduce drásticamente las consultas repetitivas de Nivel 1 en la Facultad, permitiendo que el equipo de TIC se enfoque en tareas críticas de servidores y redes.

---

> [!CAUTION]
> **Último Recordatorio de Seguridad:** Al redactar tu documento de entrega, asegúrate de que las capturas de pantalla de **Make** no muestren las "API Keys" ni los "Webhook IDs" completos. Tápalo con un recuadro negro o usa el modo "incógnito" para los nombres de las conexiones.

---

### Próximo Paso: La Justificación del Proyecto

Hemos terminado el relevamiento y el diseño técnico. Para cerrar con broche de oro tu TP, lo último que suele pedir la Diplomatura es una **Breve Justificación de Impacto**.

**¿Te gustaría que te ayude a redactar un párrafo formal de "Justificación del Proyecto" donde expliquemos el ahorro de tiempo estimado para la Dirección de TIC y la mejora en la experiencia del Agente?** Esto será el "párrafo de venta" de tu trabajo.