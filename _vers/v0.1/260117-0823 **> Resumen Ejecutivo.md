# Resumen Ejecutivo: Implementación del Sistema dtic-GEMA

**Proyecto:** Automatización de Triaje y Soporte Técnico Inteligente
**Ámbito:** Dirección de TIC - Facultad Regional (UTN FRLR)
**Responsable:** Lic. Ricardo Monla

---

### Introducción y Diagnóstico

La Dirección de TIC de la Facultad enfrenta una carga operativa crítica debido al volumen constante de consultas técnicas de baja complejidad provenientes de alumnos, docentes y autoridades. Procesos como la recuperación de credenciales en el Campus Virtual (Moodle), problemas de preinscripción y el soporte al Sistema Académico consumen tiempo técnico que podría destinarse a tareas de infraestructura y seguridad de alto valor.

### La Solución: dtic-GEMA_FRLR

Se propone la creación de **dtic-GEMA_FRLR**, un ecosistema de servicios basado en un **Gem** (asistente personalizado de Gemini) que funciona como una interfaz conversacional de primera línea. A diferencia de un chatbot tradicional, GEMA integra **IA Generativa** para razonar sobre las necesidades del usuario y ejecutar acciones automatizadas en tiempo real.

### Arquitectura y Funcionamiento

El sistema opera bajo un flujo de tres capas diseñado para ser escalable y seguro:

* **Interfaz Conversacional (GEM):** Realiza el triaje inicial, saluda de forma empática y recolecta datos clave como el Email institucional, DNI y Carrera.
* **Cerebro Lógico (Make.com + Gemini):** Procesa la información mediante una validación cruzada en bases de datos. Clasifica la intención del usuario y asigna prioridades de atención (SLAs) según el rol: 2 horas para autoridades y 24 horas para alumnos.
* **Gestión de Datos (Google Sheets):** Actúa como una base de conocimiento dinámica donde se registran tickets y se consultan tutoriales de autoservicio sin necesidad de modificar el código del sistema.

### Diferenciales y Valor Agregado

* **IA No Decorativa:** La IA analiza el contexto de la carrera del estudiante para ofrecer un "dato de interés" personalizado (por ejemplo, hitos de la ingeniería civil), mejorando la relación institucional mientras se procesa el ticket.
* **Seguridad y Privacidad:** El diseño incluye filtros estrictos para ignorar contraseñas y proteger datos sensibles, utilizando solo identificadores validados para la gestión académica.
* **Optimización de Recursos:** Se estima una reducción del **60% al 70%** en la carga de soporte de Nivel 1, permitiendo una gestión más ágil de la bitácora de tareas técnicas y el mantenimiento de servidores.

### Conclusión

**dtic-GEMA** representa un salto cualitativo hacia una Facultad más inteligente y conectada. Es una solución eficiente, de bajo costo de implementación (tecnología No-Code) y con un alto impacto en la satisfacción de la comunidad universitaria.

---
