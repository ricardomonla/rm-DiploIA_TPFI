### 260116-1001 **> RMONLA
Quiero que me generes o me expliques los pasos a serguir para armar un gem que me ayude a crear un trabajo final e base al pdf
---

### 260116-1002 **> IA

Hola, Ricardo. Es un gusto saludarte. Considerando que ya eres **Licenciado** y estás cursando esta **Diplomatura en IA para No Programadores**, crear un "Gem" personalizado es una excelente estrategia de "asistente de desarrollo".

Dado que trabajas en el área de **TIC de tu Facultad**, gestionas servidores **Debian**, usas **Proxmox** y lideras el proyecto **rm-OIS**, tienes una mina de oro de "puntos de dolor" reales para automatizar.

Aquí tienes los pasos detallados para configurar tu Gem y que se convierta en tu tutor para este Trabajo Práctico Final:

---

## 1. Configuración Estructural del Gem

Para que el Gem sea efectivo, debes configurarlo con las instrucciones del PDF. Sigue estos pasos en la interfaz de Gems de Gemini:

* **Nombre del Gem:** Tutor TP Final IA (UTN).
* **Instrucciones (System Prompt):** Copia y adapta el siguiente bloque en la sección de instrucciones:

> "Actúa como un consultor experto en automatización No-Code y tutor de la Diplomatura en IA de la UTN BA. Tu objetivo es guiar a Ricardo en el desarrollo de su Trabajo Práctico Final.
> 
> 
> **Tus funciones principales son:**
> 1.  **Fase 1 - Relevamiento:** Ayudar a identificar de 2 a 4 puntos de dolor en su entorno laboral (TIC Facultad, rm-OIS) o personal (ej. organización de eventos familiares).
> 2.  **Priorización:** Aplicar la matriz de Impacto vs. Esfuerzo para elegir un 'Quick Win' (Alto impacto / Bajo esfuerzo).
> 3.  **Diseño de Flujo:** Redactar los requerimientos en lenguaje natural definiendo Input, Proceso (con IA) y Output.
> 4.  **Fase 2 - Diseño Técnico:** Ayudar a elaborar la ficha técnica (Trigger, Nodos de Make, Lógica).
> 5.  **Criterios de Éxito:** Asegurar que la solución sea un MVP, que la IA no sea decorativa y que la lógica sea sólida.
> 
> 
> 
> **Restricción importante:** Recuérdale siempre a Ricardo no incluir nombres reales ni datos sensibles en los documentos finales, usando 'Empresa X' o 'Sistema Z'."
> 
> 

---

## 2. Pasos sugeridos para trabajar con tu Gem

Una vez creado el Gem, te sugiero seguir este orden de interacción para cumplir con las entregas:

### Paso A: Lluvia de Ideas y Priorización

Pídele al Gem: "Basado en mi trabajo en el área de TIC y mi proyecto rm-OIS, ayúdame a identificar 3 procesos manuales o repetitivos que puedan ser puntos de dolor" . Luego, usen la **matriz de priorización** para elegir el más viable como TP.

### Paso B: Definición del MVP y la IA

Una vez elegido el proceso, dile al Gem: "Diseñemos el flujo. Necesito que este flujo incluya IA Generativa de forma útil, no decorativa. ¿Cómo podemos integrar OpenAI o Gemini en Make para este caso?".

### Paso C: Redacción de Entregables

El Gem puede ayudarte a redactar los dos PDFs requeridos:

1. 
**Documento de relevamiento:** (Máximo 3 páginas).


2. 
**Ficha técnica:** (Una página) con la arquitectura de nodos.



---

## 3. Recomendaciones para la Implementación en Make

Tu Gem te servirá para entender la lógica, pero recuerda estos "Tips para el éxito" que menciona la consigna:

* 
**Menos es más:** Es mejor una automatización de 3 o 4 nodos que funcione perfecto a una gigante que falle.


* 
**Manejo de datos:** Asegúrate de entender cómo fluyen los datos entre nodos (mapping).


* 
**Blueprint:** No olvides que el tercer entregable es el archivo **.JSON** que exportas directamente desde Make.



---

¿Te gustaría que te ayude a redactar el primer mensaje para tu Gem basándonos en algún proceso específico que ya tengas en mente de tu trabajo en la Facultad?