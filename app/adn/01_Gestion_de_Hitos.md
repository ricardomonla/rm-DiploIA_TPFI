# Gestión de Hitos (Milestones)

**Prioridad:** 01
**Última Actualización:** 2026-02-04

## Instrucciones Operativas

*   **Formato de Doble Capa:** Los documentos de hito deben dividirse en dos bloques principales:
    1.  `## 1. Novedades y Estado del Hito`: Contiene las tablas dinámicas de progreso (`Aciertos`, `Pendientes`, `Próximos Pasos`). Es lo primero que lee el humano para saber "en qué estamos".
    2.  `## 2. Detalles Técnicos y Contratos`: Contiene las definiciones estáticas (JSON, Diagramas, Lógica). Es la "Fuente de Verdad" para que el Sherpa/IA pueda programar sin ambigüedades.
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
