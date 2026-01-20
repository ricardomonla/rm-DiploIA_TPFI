# Registro de Avances: Optimización GEMA Chatbot v0.4.2
Fecha: 19/01/2026

## 1. Resumen de Optimización
Se ha transformado el chatbot original en un mini-sitio completamente independiente y reactivo, consolidando la identidad de **GEMA** como la asistente inteligente de la UTN FRLR.

### Mejoras Visuales y Dinámicas
- **Avatar Reactivo**: Implementación de un sistema de videos optimizados que cambian aleatoriamente en cada interacción. Los videos se reproducen una sola vez por mensaje para un comportamiento natural.
- **Identidad en Mensajes**: Cada respuesta del bot incluye su miniatura oficial.
- **Diseño Premium**: Interfaz glassmorphic con sombras profundas, bordes suavizados y tipografía modernizada.
- **Indicador de Escritura**: Animación de puntos pulsantes con texto contextual: *"GEMA está redactando una respuesta..."*.

### Funcionalidades y Experiencia
- **Chips de Sugerencia**: Accesos rápidos para consultas frecuentes.
- **Limpieza de Chat**: Botón de papelera para reinicio instantáneo de la sesión.
- **Validación de Identidad**: Verificación estricta de email institucional antes de procesar envíos.
- **Humanización**: Refinamiento lingüístico para un tono más empático y menos mecánico.

## 2. Independencia Técnica
- **Localización de Assets**: El sitio `www-chatbot` es ahora autónomo. Todos los medios se sirven desde `assets/media/`.
- **Rutas Relativas**: Eliminación de dependencias externas a `data/` o `www-entregables/`.

## 3. Validación Técnica
- **Servidor Local**: Pruebas exitosas en `http://localhost:7701` usando `app-run.sh`.
- **Auditoría de Navegación**: Confirmación de reproducción única de video y ausencia de errores 404.

## 4. Archivos Clave
- `www-chatbot/index.html`
- `www-chatbot/assets/css/style.css`
- `www-chatbot/assets/js/script.js`
- `www-chatbot/assets/media/` (Nuevos videos y avatar simplificados)
