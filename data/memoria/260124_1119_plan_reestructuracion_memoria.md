# MASTER PLAN DE IMPLEMENTACIÓN v2.7: Gestión de Memoria y Datos Maestro

Este documento establece la estructura final de almacenamiento técnico y la jerarquía de sincronización de datos para el proyecto GEMA.

## 1. Reestructuración de Directorios
- **Fuente de Verdad Maestro**: `data/changelog.json` (Raíz). Todos los procesos de versionado (`OK versiona`) se alimentarán de este archivo.
- **Sincronización en Cascada**: Las actualizaciones se propagarán desde la carpeta superior `data/` hacia los assets del portal web (`www-dtic-gema/assets/data/`).
- **Memoria Técnica**: Se utilizará la carpeta raíz `data/memoria/` para el almacenamiento cronológico de los planes de implementación.

## 2. Protocolo de Memoria Estricto
- **Nomenclatura YYMMDD_HHMM**: Cada vez que se ejecute la orden "**OK procede**", se realizará un guardado previo del plan activo con este formato (ej. `260124_1119_plan_reestructuracion.md`).
- **Consolidación Final**: El comando "**OK terminamos**" generará o actualizará un archivo `seguimiento.md` en `data/memoria/` con el historial completo de la fase.

## 3. Comandos de Automatización (.antigravityrules)
- **OK procede**: Guardado en memoria + ejecución técnica.
- **OK versiona**: Sincronización Changlog (Maestro -> App) + README + Tags.
- **OK terminamos**: Cierre formal con seguimiento consolidado.

---

## Protocolo de Ejecución (.antigravityrules)

> [!IMPORTANT]
> **Cambios Técnicos**: No se realizará ningún cambio técnico hasta que este Plan Maestro consolidado sea aprobado y se reciba el comando: **"OK procede"**.

## Tareas Detalladas (Tras aprobación)
1. **Infraestructura**: Crear/Verificar directorios `data/` y `data/memoria/` en la raíz.
2. **Migración**: Mover `changelog.json` maestro a la carpeta superior.
3. **Automatización**: Ejecutar el primer guardado de memoria bajo el nuevo protocolo.
4. **Validación**: Verificar que el portal siga cargando los datos correctamente desde sus assets sincronizados.
