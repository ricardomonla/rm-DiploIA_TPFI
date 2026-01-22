# PROYECTO dtic-GEMA: Sistema Inteligente de Gestión TIC
**Diplomatura en IA para No Programadores - Institución X**

---

## 👤 Información del Estudiante
*   **Alumno:** Lic. Ricardo MONLA
*   **Área de Aplicación:** Dirección de TIC - Facultad X
*   **Fecha:** Enero 2026

---

## 1. FASE 1: Relevamiento y Análisis del Proceso

### 1.1 Contexto General
La Dirección de TIC de la Facultad X es el área encargada de la infraestructura, sistemas y soporte técnico de la institución. Cabe destacar que, debido a la estructura actual, **la mayor parte de estas tareas son llevadas a cabo por un único integrante**, lo que genera una carga operativa crítica al tener que equilibrar el mantenimiento de servidores, redes y el soporte directo a usuarios.

### 1.2 Identificación de Puntos de Dolor y Alcance
En el día a día de la Dirección de TIC se gestionan múltiples servicios como el control de servidores, registro de sucesos y tareas administrativas. Sin embargo, para este proyecto de automatización inteligente, se han seleccionado **los 3 procesos que generan mayor conflicto y volumen de interrupciones diarias**, ya que son los más aptos para una automatización inmediata que libere tiempo para las tareas de infraestructura más complejas.

#### Punto de Dolor 1: Gestión de Accesos al Campus Virtual (Moodle)
... [resto de puntos]
*   **Problema Central:** Alumnos y docentes informan dificultades para matricularse o pérdida de accesos en el Campus Virtual.
*   **Consecuencias:** Carga operativa excesiva para verificar matriculaciones manuales y blanquear contraseñas.
*   **Métricas de Dolor:** Se reciben aproximadamente 20 tickets diarios enfocados en accesos. Cada atención manual toma 10-15 min.

#### Punto de Dolor 2: Soporte a la Preinscripción y Sistema Académico
*   **Problema Central:** Postulantes bloqueados por datos preexistentes o usuarios olvidados en el sistema académico.
*   **Consecuencias:** Necesidad de validación de identidad (DNI+Email) constante antes de cualquier acción.

### 1.3 Priorización y Selección del "Quick Win"

| Punto de Dolor | Impacto (Alto/Medio/Bajo) | Esfuerzo (Bajo/Medio/Alto) | Volumen (Frecuencia) | Decisión |
| :--- | :---: | :---: | :---: | :--- |
| Gestión de Consultas | Alto | Bajo (IA Clasificadora) | Alto (Diario) | **Seleccionado** |
| Bitácora de Tareas | Medio | Bajo | Medio | Tarea Interna |
| Gestión de Accesos AD | Muy Alto | Alto | Bajo | Fase 3 |

**Justificación:** Se seleccionó la **Gestión de Consultas (Proceso 1)** como Quick Win porque, al ser un área operada por una sola persona, automatizar el 80% de las dudas recurrentes permite recuperar casi **4 horas diarias** de productividad. Esto es vital para poder atender otros servicios críticos del área (como el control de servidores y mantenimiento de red) que actualmente se ven postergados por la atención manual de soporte.

---

## 2. FASE 2: Diseño de la Solución No Code

### 2.1 Diseño del Flujo (Lenguaje Natural)
*   **Input (Entrada):** El usuario ingresa Email Institucional y DNI.
*   **Process (Proceso):** 
    1.  Validación de identidad contra la base `dtic-GEMA_BD`.
    2.  Clasificación de perfiles y urgencia (Autoridad: Priority 1).
    3.  Categorización del problema: `ACCESO_CAMPUS`, `PROBLEMA_PREINSCRIPCION` o `ACCESO_SIST_ACADEMICO`.
    4.  Generación de "Dato de Valor": Sabías que... (basado en la carrera del alumno).
*   **Output (Salida):** Número de ticket, registro en BD y notificación instantánea al equipo de TIC.

### 2.2 Ficha Técnica del Escenario (Make)
La persistencia se gestiona en **Google Sheets** con 3 hojas maestros:
1.  **Agentes:** Datos de validación (Rol/Carrera).
2.  **Tickets:** Registro histórico y auditoría.
3.  **Conocimiento:** Tutoriales y FAQ que alimentan a la IA.

---

## 3. Implementación de IA Generativa

### 3.1 Ingeniería de Prompts (Prompt Maestro)
El sistema utiliza un orquestador en Make que llama a Gemini con instrucciones de comportamiento:
*   **Seguridad:** NUNCA pide ni revela contraseñas.
*   **Adaptatividad:** Tono conciso para autoridades y didáctico para alumnos.
*   **SLAs Inyectados:** Autoridades < 2hs / Docentes-Alumnos < 24hs.

---

## 4. Verificación y Resultados
Se proyecta una reducción del **60% al 70%** en la carga operativa de Nivel 1. El sistema permite que el técnico humano intervenga solo en la resolución final ("Click to respond"), habiendo recibido el ticket ya clasificado y priorizado.

---

## 5. Conclusiones y Aprendizajes
La arquitectura desacoplada y el enfoque **"Human-in-the-loop"** garantizan seguridad institucional. El aprendizaje clave fue superar la rigidez de los asistentes estándar mediante un backend flexible en Make que centraliza el conocimiento.

---
*Documento Final - Enriquecido con Análisis de Historial (v0.1 & v0.2) - Anonimizado para Defensa - 22/01/2026*
