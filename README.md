# dtic-GEMA v0.3: Sistema Inteligente de Gestión TIC

**Sistema de Gestión Estratégica Mediante Automatización - UTN FRLR**

Este proyecto implementa un asistente inteligente para la Dirección de TIC que automatiza el triaje, clasificación y registro de tickets de soporte. La versión 0.3 evoluciona hacia una arquitectura web desacoplada para mayor control y flexibilidad.

## 🚀 Arquitectura v0.3

- **Frontend:** Interfaz de Chatbot Web Premium (Vanilla JS / CSS Glassmorphism).
- **Automatización:** Webhooks y flujo lógico en **Make.com**.
- **IA:** Engine de procesamiento basado en **Google Gemini**.
- **Persistencia:** Base de datos relacional en **Google Sheets**.
- **Documentación:** Portal de entregables web optimizado para impresión.

## 📂 Estructura del Proyecto

- `www-chatbot/`: Interfaz principal del usuario.
- `www-entregables/`: Portal de informes y ficha técnica (E01, E02).
- `docs/`: Documentación estática y planes de implementación.
- `_hist/`: Archivo histórico de versiones anteriores (v0.1, v0.2).

## 🛠️ Guía Rápida de Uso

1.  **Backend (Make):** Asegúrate de que el Webhook de Make esté activo y configurado para recibir datos.
2.  **Interfaz (Chatbot):** Abre `www-chatbot/index.html` en tu navegador.
3.  **Interacción:** Envía consultas desde el chat. Los datos viajarán al Webhook y se registrarán en la hoja de Sheets `dtic-GEMA_BD`.
4.  **Reportes:** Accede a `www-entregables/index.html` para generar los PDFs de los trabajos prácticos.

---
*Desarrollado por Lic. Ricardo Monla para el TP Final de la Diplomatura en IA Generativa.*
