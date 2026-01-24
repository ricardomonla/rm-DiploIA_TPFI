# MASTER PLAN DE IMPLEMENTACIÓN v2.9: Arquitectura de Sidebar e Interactividad

Este documento define la reestructurización de la barra lateral para garantizar la visibilidad permanente de la información institucional y simplificar la navegación jerárquica.

## 1. Arquitectura de Barra Lateral (Sticky Footer)
Para evitar que el footer se pierda al expandir el menú, transformaremos la `.sidebar` en una estructura flex de tres bloques:
- **Bloque Superior (Fijo)**: Contiene el branding, avatar y badge de versión.
- **Bloque Central (Scroll Independiente)**: El contenedor de navegación (`.sidebar-nav`) tendrá `flex: 1` y `overflow-y: auto`. Esto permitirá que las ramas del menú se desplieguen libremente sin empujar el footer fuera de la pantalla.
- **Bloque Inferior (Fijo/Sticky)**: El mini-footer con el nombre del alumno e institución se mantendrá siempre anclado al fondo de la barra, visible en todo momento.

## 2. Toggle Unificado por Click
- **Simplificación del Click**: Se eliminará el requisito de hacer click en el chevron pequeño. 
- **Acción Doble**: Al hacer click en cualquier opción que tenga sub-niveles (ej. "Entregable E01"):
  1. Se navegará al contenido correspondiente.
  2. Se expandirá o colapsará la rama automáticamente.
- **Feedback Visual**: Los punteros y efectos hover se extenderán a toda la fila para indicar la interactividad total.

## 3. Protocolo de Memoria Estricto
- **Guardado Automático**: Al recibir "**OK procede**", se generará el archivo `data/memoria/260124_1128_plan_sidebar_architecture.md`.

---

## Protocolo de Ejecución (.antigravityrules)

> [!IMPORTANT]
> **Cambios Técnicos**: No se realizará ningún cambio técnico hasta que este Plan Maestro sea aprobado y se reciba el comando: **"OK procede"**.

## Tareas Detalladas (Tras aprobación)
1. **CSS (`style.css`)**:
   - Ajustar `.sidebar` a `display: flex; flex-direction: column; overflow: hidden;`.
   - Implementar scroll en `.sidebar-nav`.
   - Estilizar el footer para que tenga un fondo sólido o difuminado que destaque sobre el scroll.
2. **JS (`layout.js`)**:
   - Refactorizar `renderMenuItem` para inyectar el toggle de colapso en la lógica del click del link.
   - Ajustar la navegación para que los sub-niveles también sean colapsables por click.
3. **Validación**: Verificar que el footer no se mueva al abrir el TFI y que la navegación sea fluida.
