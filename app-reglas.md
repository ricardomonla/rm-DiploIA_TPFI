# 🛡️ Protocolo y Configuración del Agente (v1.7.1)

Este archivo es el **Único Punto de Verdad (SSOT)** para la interacción entre el Usuario y el Agente.

## 0. 📥 VARIABLES DE ENTORNO (Configuración de App)
*Definir estas variables al instanciar el protocolo en una nueva app.*

- **`VAR_REPO_NAME`**: `rm-DiploIA_TPFI`
- **`VAR_WEB_ROOT`**: `www-dtic-gema/`
- **`VAR_MAIN_HTML`**: `index.html`
- **`VAR_PATH_MEMORIA`**: `data/memoria/`
- **`VAR_PATH_ASSETS`**: `www-dtic-gema/assets/`
- **`VAR_BRANDING_ID`**: `Glassmorphism / Facultad X`
- **`VAR_VERSION_FILE`**: `www-dtic-gema/assets/data/project.json`
- **`VAR_CHANGELOG_FILE`**: `www-dtic-gema/assets/data/changelog.json`
- **`VAR_README_FILE`**: `README.md`
- **`VAR_RUN_CMD`**: `./app-run.sh`

---

## 1. 📋 REGLAS FUNDAMENTALES (Restricciones Innegociables)
- **🌐 Español-First**: Idioma obligatorio para toda salida (Mensajes, Artefactos, Código, Commits, Memoria).
- **🎨 Estética Premium**: Diseños basados en **`VAR_BRANDING_ID`** y micro-animaciones fluidas.
- **📝 Memoria Aditiva**: Las actualizaciones en **`VAR_PATH_MEMORIA`** son estrictamente aditivas. Prohibido borrar rastro histórico.
- **🏷️ Versionado Acumulativo**: Prohibido el versionado automático. El incremento de versión (`OK versiona`) es una acción manual y consensuada.
- **🚀 Plan-First**: Prohibido realizar cambios técnicos en el código sin un Plan de Implementación aprobado.

## ⚡ 2. SISTEMA DE COMANDOS "OK" (Action Triggers)
Los comandos "OK" son órdenes de acción directas y minimalistas.

| Comando | ID Procedimiento | Comandos Anidados | Acción Principal |
| :--- | :--- | :--- | :--- |
| **🟢 "OK inicia"** | `PROC-INIC-HITO` | - | Inicializa un nuevo hito técnico y su memoria. |
| **🔵 "OK procede"** | `PROC-EJEC-TECN` | - | Ejecuta cambios aprobados o continúa tareas. |
| **🚀 "OK run [args]"** | `PROC-RUN-APP` | - | Ejecuta **`VAR_RUN_CMD`** con argumentos opcionales. |
| **🧹 "OK limpia [dir]"** | `PROC-LIMP-DIR` | - | **Seguridad**: Inicia un plan de limpieza de optimización. |
| **🔴 "OK cierra"** | `PROC-CIER-HITO` | `OK guarda` | Cierre, Optimización de Metadatos y Persistencia. |
| **🟡 "OK versiona"** | `PROC-SELL-VERS` | - | **Sello Manual**: Incremento de versión oficial. |
| **💾 "OK guarda"** | `PROC-PERS-GIT` | - | Persistencia Git inmediata (Add, Commit, Push). |

## ⚙️ 3. PROCEDIMIENTOS OPERATIVOS (Operational Procedures)

### 📂 `PROC-INIC-HITO` (Inicialización)
1. **Validación de Cierre**: Buscar memorias con estado `[/]` en **`VAR_PATH_MEMORIA`**.
2. De existir una abierta, solicitar ejecución de **`OK cierra`** antes de proceder.
3. Crear registro histórico y tabla de iteraciones en **`VAR_PATH_MEMORIA`**.

### 🛠️ `PROC-EJEC-TECN` (Ejecución y Sincronización)
1. Aplicar cambios técnicos según el plan aprobado.
2. **Sincronía**: Volcar el registro de verificación (`walkthrough.md`) en la memoria activa de **`VAR_PATH_MEMORIA`**.

### 🏁 `PROC-CIER-HITO` (Cierre y Optimización)
1. **Reflexión**: Re-leer el hito para optimizar **Título**, **Contexto** y **Nombre de archivo**.
2. Cambiar estado a `[x] Completado` y disparar **`OK guarda`**.

### 🏷️ `PROC-SELL-VERS` (Versionado de Entrega)
1. **Metadata**: Incrementar valor de versión en **`VAR_VERSION_FILE`**.
2. **Historial**: Inyectar el resumen del hito cerrado desde **`VAR_PATH_MEMORIA`** en **`VAR_CHANGELOG_FILE`**.
3. **Docs**: Sincronizar el encabezado y novedades principales en el archivo apuntado por **`VAR_README_FILE`**.
4. **UI**: Sincronizar versión en los puntos de visualización de UI y aplicar técnicas de cache-busting en **`VAR_MAIN_HTML`**.

### 🏃 `PROC-RUN-APP` (Ejecución de Script)
1. Lanzar **`VAR_RUN_CMD`** pasando los argumentos opcionales.
2. Notificar estado de ejecución al usuario.

### 🧹 `PROC-LIMP-DIR` (Limpieza Segura)
1. **Planificación Obligatoria**: Crear `implementation_plan.md` justificando la optimización.
2. **Impacto**: Validar estabilidad antes de ejecutar cualquier acción destructiva.

### 🌐 `PROC-PERS-GIT` (Persistencia)
1. Sincronizar cambios con el repositorio **`VAR_REPO_NAME`** mediante commit descriptivo.

## 🧠 4. HEURÍSTICAS DE EFICIENCIA (Agent-Only Heuristics)
- **🔍 Check de Pre-Vuelo**: Validar Español 100% y Comando OK antes de cada ejecución.
- **🔄 Sincronía de Artefactos**: Mantener alineados todos los documentos de soporte con el hito en curso.
- **🛠️ Prioridad de Datos**: Modificar estructuras de datos antes que la lógica de renderizado.

---
> [!IMPORTANT]
> Las Secciones 1-4 son agnósticas. Toda especificidad de la App reside en la **SECCIÓN 0**.
