# [TÍTULO DEL PROYECTO: Ejemplo "dtic-GEMA"]
**Diplomatura en IA para No Programadores - UTN FRLR**

---

## 👤 Información del Estudiante
*   **Alumno:** [Tu Nombre Completo]
*   **Área de Aplicación:** [Ej. Dirección de TIC]
*   **Fecha:** [Fecha de Entrega]

---

## 1. FASE 1: Relevamiento y Análisis del Proceso

### 1.1 Contexto General
[Describe brevemente el entorno donde se aplica la solución. Qué hace tu área y qué objetivos persigue.]

### 1.2 Identificación de Puntos de Dolor
[Describe entre 2 y 4 procesos manuales. Para cada uno incluye:]

#### Punto de Dolor 1: [Nombre del Proceso]
*   **Problema Central:** [Ej. Carga manual de tickets de soporte]
*   **Consecuencias:** [Ej. Pérdida de tiempo, errores en la prioridad, falta de registro]
*   **Métricas de Dolor:** [Ej. 20 tickets/día, 15 min por ticket = 5 horas/día de trabajo manual]

#### Punto de Dolor 2: [Nombre del Proceso]
*   **Problema Central:** [...]
*   **Consecuencias:** [...]
*   **Métricas de Dolor:** [...]

### 1.3 Priorización y Selección del "Quick Win"
[Usa la siguiente matriz para justificar tu elección]

| Punto de Dolor | Impacto (Alto/Medio/Bajo) | Esfuerzo (Bajo/Medio/Alto) | Volumen (Frecuencia) | Decisión |
| :--- | :---: | :---: | :---: | :--- |
| [Proceso 1] | | | | |
| [Proceso 2] | | | | |

**Justificación:** [Explica por qué el proceso seleccionado es un "Quick Win" (Alto Impacto / Bajo-Medio Esfuerzo).]

---

## 2. FASE 2: Diseño de la Solución No Code

### 2.1 Diseño del Flujo (Lenguaje Natural)
*   **Input (Entrada):** [¿Qué dispara el proceso? Ej. Nuevo mensaje de WhatsApp]
*   **Process (Proceso):** [Pasos lógicos: 1. Clasificar con IA, 2. Guardar en Sheet, etc.]
*   **Output (Salida):** [Resultado final: Ej. Notificación al técnico y registro en BD]
*   **Herramientas:** Make, Gemini, Google Sheets, WhatsApp/Chatbot.

### 2.2 Ficha Técnica del Escenario (Make)
*   **Trigger:** [Ej. Webhook / Watch New Row]
*   **Frecuencia:** [Ej. Instantánea / Cada 15 minutos]
*   **Descripción de Nodos:**
    1.  **Nodo [Nombre]:** [Breve descripción de su función]
    2.  **Nodo [Nombre]:** [...]

---

## 3. Implementación de IA Generativa

### 3.1 Ingeniería de Prompts
[Este punto vale el 20% de la nota. Detalla el prompt utilizado en Gemini/GPT]

**System Prompt:**
```text
[Pega aquí las instrucciones que le das a la IA]
```

**Variables Mapeadas:**
*   `{{campo_input}}`: [Descripción]

---

## 4. Verificación y Resultados
[Incluye aquí capturas de pantalla o descripciones de pruebas]
*   **Captura del Escenario:** [Imagen del flujo en Make]
*   **Ejemplo de Ejecución:** [Muestra un input real y la respuesta generada por el sistema]

---

## 5. Conclusiones y Aprendizajes
*   **Logros:** [Ej. Reducción del 80% en tiempo de triaje]
*   **Dificultades:** [Qué problemas encontraste y cómo los resolviste]
*   **Próximos Pasos (Escalabilidad):** [¿Cómo podría crecer este proyecto?]

---
*Desarrollado para el TP Final de la Diplomatura en IA Generativa - 2026*
