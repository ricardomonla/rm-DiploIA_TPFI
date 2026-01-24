# 🤖 Configuración y Protocolos del Agente (IA-Optimized)

Este archivo define las directivas heurísticas y el sistema de comandos para la interacción con el repositorio **rm-DiploIA_TPFI**.

## 1. 🌐 Núcleo de Comunicación (Español-Fisrt)
- **Idioma Obligatorio:** Español para toda salida (Mensajes, Artefactos, Documentación, Commits).
- **Interpretación Heurística:** Priorizar la intención del usuario sobre el literalismo técnico. Tono: Profesional/Consultor.

## 2. 🏛️ Estándares de Arquitectura y Estética
- **UI/UX:** Estética "Premium", Glassmorphism y micro-animaciones fluidas.
- **Identidad:** Branding "Facultad X". Desvincular de marcas institucionales específicas.

## 3. 📝 Gestión de Memoria Técnica (Rastro Histórico)
- **Ubicación:** `data/memoria/[vActual]/`.
- **Formato:** `v[X.Y.Z]_[descripcion_breve].md`.
- **Regla de Persistencia:** Las actualizaciones de contenido son **aditivas**. Queda prohibido eliminar información histórica sin permiso explícito.

## 4. ⚡ Protocolo de Comandos "OK" (Sistema de Control)

### 🟢 "OK procede" (Disparador de Ejecución)
1. Detectar versión actual de trabajo.
2. Guardar copia del **Master Plan** en `data/memoria/[vActual]/v[X.Y.Z]_[nombre].md`.
3. **Ejecución Técnica:** Realizar los cambios aprobados.
4. **Sincronización Mandatoria:** Actualizar el archivo de memoria v[X.Y.Z] marcando las tareas como completadas `[x]` al finalizar.

### 🟡 "OK versiona" (Sello de Versión)
1. **Restricción:** Único comando autorizado para incrementar versionado oficial en archivos core (`project.json`, `README.md`, `package.json`).
2. **Recopilación:** Leer sistemáticamente todos los archivos en `data/memoria/[vActual]/` para síntesis del Changelog.
3. Actualizar `data/changelog.json` y sincronizar con `www-dtic-gema/assets/data/changelog.json`.
4. Crear etiqueta (tag) Git: `vX.Y`.

### 🔴 "OK terminamos" (Cierre de Ciclo)
1. Generar `seguimiento_final_v[X.Y].md` en la carpeta de memoria.
2. Ejecutar "OK versiona".
3. Inicializar carpeta para la siguiente sub-versión.
4. Ejecutar "OK guarda".

### 💾 "OK guarda" (Persistencia de Sesión)
1. Registro universal de cambios (`git add .`).
2. Commit descriptivo en español.
3. Push al repositorio remoto.

### ⏳ "OK continuamos despues" (Punto de Control)
1. Resumen de estado en pensamientos internos.
2. Ejecutar "OK guarda".
