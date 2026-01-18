### 260116-1242 **> RMONLA

El punto 2 con los tiempos que propones me parece bien por lo que lo dejaría así.

Ahora podemos desarrollar mas el punto 1, Diseño de la Base de Conocimiento. 
---

### 260116-1244 **> IA


¡Excelente elección, Ricardo! Definir los tiempos de respuesta (SLAs) según el rol del Agente le da un marco de profesionalismo total a tu **Dirección de TIC**.

Ahora, entremos de lleno en la **Fase 2 - Diseño de la Base de Conocimiento (KB)**. Para que tu TP sea robusto, no vamos a "hardcodear" (escribir fijo) todo dentro del GEM, sino que diseñaremos una estructura que la IA pueda consultar. Esto hace que tu sistema sea escalable: si mañana cambia un procedimiento, solo editás una planilla y no todo el flujo.

Aquí te propongo la estructura de las **3 Tablas de Conocimiento** para tu "Sistema Z":

---

## 1. Estructura de la Base de Conocimiento (KB)

### Tabla A: Repositorio de Soluciones y Tutoriales

Esta tabla es la que el GEM consulta para el auto-servicio.

| Categoría | Problema Detectado | Solución / Tutorial (Output) |
| --- | --- | --- |
| **Campus Virtual** | Error de contraseña | "Link al PDF: Cómo blanquear clave en Moodle Z" |
| **Campus Virtual** | No ve una materia | "Instrucciones: Verificar inscripción en Guaraní Y" |
| **Preinscripción** | Datos duplicados | "Procedimiento: Enviar foto de DNI para unificar legajo" |
| **Sist. Académico** | Usuario bloqueado | "Link: Formulario de desbloqueo automático" |

### Tabla B: Generador de Valor ("Sabías que...")

Para el toque de personalización que buscás según la carrera del agente.

| Carrera / Área | Dato de Interés (Curiosidad) | Relación con la Facultad |
| --- | --- | --- |
| **Ing. Civil** | "El hormigón autorreparable usa bacterias para sellar grietas." | "En nuestro Laboratorio X se hacen ensayos de resistencia de materiales." |
| **Tecnicaturas** | "La demanda de perfiles técnicos creció un 40% este año." | "Nuestros egresados tienen salida laboral en el Polo Tecnológico Z." |
| **General** | "El primer servidor de la facultad tenía menos potencia que tu reloj." | "Hoy gestionamos más de X terabytes de información académica." |

### Tabla C: Registro y Seguimiento (La Bitácora)

Esta es la tabla que "lee y escribe" Make para el seguimiento de tickets.

| Ticket ID | Fecha | Agente (Rol) | Estado | Resolución Estimada |
| --- | --- | --- | --- | --- |
| **T-1001** | 16/01/26 | Alumno | En Curso | 24 hs (17/01/26) |
| **T-1002** | 16/01/26 | Autoridad | Resuelto | Finalizado |

---

## 2. Dinámica del Conocimiento: ¿Cómo interactúan?

Para tu diseño técnico en el TP, la lógica sería esta:

1. **Identificación:** El GEM le pregunta al agente: *"¿Sos alumno de qué carrera?"* o *"¿Tenés un número de ticket?"*.
2. **Consulta:** * Si hay ticket: Make busca en la **Tabla C** y devuelve el estado.
* Si es problema nuevo: Make busca en la **Tabla A** la solución.


3. **Cierre con Valor:** Antes de despedirse, el GEM toma la carrera del usuario, busca en la **Tabla B** el "Sabías que" correspondiente y lo presenta de forma amigable.

---

## 3. Criterio de Éxito para el TP: IA "No Decorativa"

En tu documento, destacaremos que la IA se encarga de:

* **Interpretar la carrera:** Aunque el alumno diga "estudio para hacer puentes", la IA entiende que es *Ingeniería Civil* y busca el dato correcto.
* **Redacción Empática:** No devuelve un link seco, sino que construye el mensaje: *"¡Interesante, futuro ingeniero! Mientras nuestro equipo revisa tu acceso al Campus, te cuento que el hormigón..."*

---

> [!IMPORTANT]
> **Recordatorio de Seguridad:** En tu entrega final, cuando captures pantallas de estas tablas, asegúrate de que los campos de "DNI" o "Nombres" tengan datos de ejemplo como `Juan Pérez - 99.999.999` o simplemente `Alumno_Ejemplo`.

### Siguiente paso para cerrar la Fase 2:

Ya tenemos la lógica y la base de conocimiento. Para terminar la **Ficha Técnica**, solo nos falta definir la **Herramienta de Almacenamiento**.

**¿Dónde te sentirías más cómodo guardando estas tablas para que Make las lea?**

* **Opción A:** Google Sheets (Lo más sencillo y visual).
* **Opción B:** Airtable (Más potente, funciona como una base de datos real).
* **Opción C:** Notion (Si ya lo usas para organizar tu trabajo en TIC).

**¿Con cuál de estas opciones preferís que hagamos el diagrama final de nodos?**