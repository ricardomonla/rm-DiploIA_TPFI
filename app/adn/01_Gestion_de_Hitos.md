# Gestión de Hitos (Milestones)

**Prioridad:** 01
**Última Actualización:** 2026-02-04

## Instrucciones Operativas

*   **Actualización Automática:** No esperar a que el usuario lo solicite. Al completar una tarea significativa, actualizar inmediatamente el archivo del hito correspondiente en `app/hitos/` (anteriormente `data/memoria/`).
*   **Formato de Tabla:** Utilizar **tablas separadas** bajo encabezados H3 (`###`) para cada sub-sección de "Estado del Hito":
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
