# Gestión de Hitos (Milestones)

**Prioridad:** 01
**Última Actualización:** 2026-02-04

## Instrucciones Operativas

*   **Formato de Doble Capa:** Los documentos de hito deben dividirse en dos bloques principales:
    1.  `## 1. Novedades y Estado del Hito`: Contiene las tablas dinámicas de progreso (`Aciertos`, `Pendientes`, `Próximos Pasos`). Es lo primero que lee el humano para saber "en qué estamos".
    2.  `## 2. Detalles Técnicos y Contratos`: Contiene las definiciones estáticas (JSON, Diagramas, Lógica). Es la "Fuente de Verdad" para que el Sherpa/IA pueda programar sin ambigüedades.
*   **Fuente Única de Verdad (SSOT):** Todo el planeamiento, tareas y avances deben residir dentro del documento del Hito. Evitar crear archivos de "plan" externos. Si hay un plan de implementación, debe estar integrado en la sección de Detalles Técnicos.
*   **Actualización Automática:** No esperar a que el usuario lo solicite. Al completar una tarea significativa, actualizar inmediatamente el hito.
*   **Tablas de Estado:** Mantener el formato:
    -   `### Aciertos ✅` -> columnas: `| Hora | Detalle |`
    -   `### Pendientes ⏳` -> columnas: `| Prioridad | Tarea |`
    -   `### Próximos Pasos 🚀` -> columnas: `| Orden | Acción |`
*   **Timestamps:** Incluir timestamps `[HH:MM]` en la columna "Hora" de "Aciertos".
*   **Encadenamiento:** La sección `Próximos Pasos` del hito N debe mencionar explícitamente el inicio del hito N+1.

## Procedimiento de Finalización (Subir Avances)
Al finalizar una sesión operativa, seguir este protocolo para asegurar la integridad del repositorio:

1.  **Saneamiento:** Asegurar que no queden archivos temporales no deseados.
2.  **Commit General:** Crear un commit que englobe todos los cambios de la sesión (Hito, Código, Documentación).
    *   Comando: `git add . && git commit -m "update: avances [Hito X.Y] - [Breve descripción]"`
3.  **Push:** Enviar cambios al repositorio remoto inmediatamente.
    *   Comando: `git push`
4.  **Confirmación:** Notificar explícitamente "Avances subidos al repositorio".

## Protocolo de Cierre de Versión
Al finalizar un ciclo de desarrollo (ej. `v1.9`), se debe ejecutar el siguiente procedimiento:

1.  **Hito de Cierre:** El último hito de la versión (ej. `1.9.7`) debe dedicarse exclusivamente al cierre.
2.  **Consolidación (Merge):** Fusionar la rama de desarrollo (ej. `rmonla/rm-DiploIA_TPFI`) a la rama principal (`main` o `master`) si aplica, o asegurar que la rama actual quede en estado "estable".
3.  **Etiquetado (Tagging):** Crear un tag de git SemVer para la versión estable.
    *   Comando: `git tag -a v1.9.0-stable -m "Release v1.9.0: [Nombre Versión]"`
    *   Push: `git push origin v1.9.0-stable`
4.  **Fuente de Verdad (SSOT):** El documento del Hito de Cierre debe registrar:
    *   Hash del commit final.
    *   Nombre del Tag generado.
    *   **Generation del Changelog Humanizado:**
        *   No limitarse a listar commits técnicos.
        *   Redactar un resumen narrativo que explique el *valor* de cada cambio (Arquitectura, UX, Seguridad, Académico).
        *   Usar categorías claras (feat, fix, docs) pero con descripciones ricas y contextuales.
5.  **Archivado (Renaming):** Una vez cerrado, cambiar el nombre del directorio de hitos de desarrollo a su forma estable o abreviada.
    *   Ejemplo: `app/hitos/1.9-dev` -> `app/hitos/1.9-stbl` (o `-stable`).
6.  **Limpieza:** Eliminar ramas de características (feature branches) ya fusionadas.
