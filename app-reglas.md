# 🛡️ Protocolo y Configuración del Agente (v1.7.1)

Este archivo es el **Único Punto de Verdad (SSOT)** para la interacción entre el Usuario y el Agente en el repositorio **rm-DiploIA_TPFI**.

## 1. 📋 REGLAS FUNDAMENTALES (Restricciones Innegociables)
- **🌐 Español-First**: Idioma obligatorio para toda salida (Mensajes, Artefactos, Código, Commits, Memoria).
- **🎨 Estética Premium**: Diseños basados en Glassmorphism, micro-animaciones fluidas y branding "Facultad X".
- **📝 Memoria Aditiva**: Las actualizaciones son estrictamente aditivas. Prohibido resumir o borrar rastro histórico.
- **🚀 Plan-First**: Prohibido realizar cambios técnicos en el código sin un Plan de Implementación (`implementation_plan.md`) aprobado.

## ⚡ 2. SISTEMA DE COMANDOS "OK" (Action Triggers)
Los comandos "OK" son órdenes de acción precisas que disparan procedimientos.

| Comando | ID Procedimiento | Comandos Anidados | Acción Principal |
| :--- | :--- | :--- | :--- |
| **🟢 "OK inicia hito"** | `PROC-INIC-HITO` | - | Inicializa un nuevo hito técnico y su memoria. |
| **🔵 "OK ejecuta hito"** | `PROC-EJEC-TECN` | - | Ejecuta los cambios técnicos aprobados en el plan. |
| **🔴 "OK cierra hito"** | `PROC-CIER-HITO` | `OK guarda` | Finaliza el hito actual (Documentación y Git). |
| **🟡 "OK versiona"** | `PROC-SELL-VERS` | - | **Sello Manual**: Incremento acumulativo de versión. |
| **💾 "OK guarda"** | `PROC-PERS-GIT` | - | Persistencia Git inmediata (Add, Commit, Push). |

## ⚙️ 3. PROCEDIMIENTOS OPERATIVOS (Operational Procedures)

### 📂 `PROC-INIC-HITO` (Inicialización)
1. Crear/Actualizar carpeta en `data/memoria/vX.Y/`.
2. Crear archivo `vX.Y.Z_nombre_hito.md` con contexto y objetivos en español.
3. Inicializar tabla de iteraciones (Iteración 0).

### 🛠️ `PROC-EJEC-TECN` (Ejecución)
1. Re-leer `implementation_plan.md` y `task.md`.
2. Aplicar cambios en archivos según el plan aprobado.
3. Marcar tareas como completadas `[x]` en `task.md` y memoria técnica.

### 🏁 `PROC-CIER-HITO` (Cierre)
1. Validar que todas las tareas del hito estén en `[x]`.
2. Generar/Finalizar el `walkthrough.md` consolidado.
3. Cambiar estado de memoria técnica a `[x] Completado`.
4. Disparar comando anidado: **`OK guarda`**. (El versionado es manual).

### 🏷️ `PROC-SELL-VERS` (Versionado Acumulativo)
> [!NOTE]
> Acción manual para evitar el versionado excesivo. Se ejecuta por orden explícita.
1. Actualizar `version` en `project.json` e `index.html`.
2. Aplicar cache-busting (parámetro `?v=X.Y.Z`).
3. Sincronizar número de versión en la interfaz visual del portal.

### 🌐 `PROC-PERS-GIT` (Persistencia)
1. Ejecutar `git add .`.
2. Crear commit descriptivo en español citando el hito actual y la acción realizada.
3. Ejecutar `git push` al origen.

## 🧠 4. HEURÍSTICAS DE EFICIENCIA (Agent-Only Heuristics)
- **🔍 Check de Pre-Vuelo**: Validar que la respuesta sea 100% en español y contenga el "OK" correspondiente.
- **🔄 Sincronización proactiva**: Al recibir "OK inicia hito", consultar si hay tareas pendientes del hito anterior.
- **🛠️ Prioridad de Datos**: Editar `content.json` siempre antes que `script.js` para cambios de contenido.
- **🚫 Bloqueo de Idioma**: Respetar el entorno de trabajo 100% hispanoparlante sin excepciones.

---
> [!IMPORTANT]
> El cumplimiento de este protocolo garantiza la estabilidad y calidad del proyecto.
