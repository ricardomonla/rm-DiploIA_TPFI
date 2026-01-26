# Plan de Implementación: Coherencia de Numeración y Navegación Proactiva

Este plan resuelve la discrepancia entre la numeración de la barra lateral y los títulos internos, asegurando una jerarquía académica consistente y automatizada.

## 1. Numeración Jerárquica Automatizada
Para garantizar coherencia total, eliminaremos la numeración manual de los archivos de datos (`menu.json` y `content.json`).
- **Inyección por Software**: El motor `layout.js` calculará la numeración dinámicamente:
  - **Menú**: Los items se numerarán durante el renderizado (ej. TFI = 1 -> E01 = 1.1).
  - **Contenidos**: El título del documento y sus secciones internas recibirán el prefijo numérico correspondiente inyectado por el SPA en tiempo real.
- **Resultado**: Si cambias el orden de un entregable en el JSON, toda la numeración (menú y páginas) se actualizará sola sin errores.

## 2. Navegación Proactiva (Carga de Primer Hijo)
- Al cliquear una categoría "Padre" (TFI), el sistema:
  1. Desplegará la rama.
  2. Navegará proactivamente al primer documento hijo (ej. Consignas).
  3. Marcará visualmente ambos niveles como activos/abiertos.

---

## Tareas Detalladas
1. **Saneamiento de Datos**: 
   - Limpiar prefijos numéricos estáticos en `menu.json` y `content.json`.
2. **Refactorización de `layout.js`**:
   - Actualizar `renderMenuItem` para generar numeración dinámica.
   - Modificar `renderDynamicContent` para inyectar el número jerárquico en los títulos `<h1>` y `<h2>`.
   - Implementar la redirección automática al primer hijo en categorías padre.
3. **Validación**: Verificar que el "1.1" del menú coincida exactamente con el "1.1" del reporte.
