# Solución Error 403: Vertex AI en Make

El error que ves en la pantalla (`[403] Request had insufficient authentication scopes`) ocurre porque tu conexión de Google en Make **no tiene permiso para "hablar" con la Inteligencia Artificial de Google (Vertex AI)**.

Esto se soluciona en 3 pasos simples dentro de Google Cloud Console.

## Paso 1: Habilitar la API de Vertex AI
Make está intentando conectarse a tu proyecto, pero la "puerta" de la IA está cerrada. Debemos abrirla.

1.  Ve a [Google Cloud Console](https://console.cloud.google.com/).
2.  Asegúrate de estar en el mismo proyecto o cuenta que estás usando en Make.
3.  En la barra de búsqueda superior, escribe: **"Vertex AI API"**.
4.  Selecciona el resultado que dice **"Vertex AI API"** (con el ícono azul).
5.  Haz clic en el botón azul **"HABILITAR"** (ENABLE).
    *   *Nota: Puede pedirte que vincules una cuenta de facturación si es la primera vez. Vertex AI tiene una capa gratuita, pero requiere tarjeta.*

## Paso 2: Crear una Conexión Correcta en Make
A veces la conexión "por defecto" de Google en Make es solo para Drive/Sheets y no para AI.

1.  En tu escenario de Make, en el nodo de Vertex AI.
2.  Haz clic en **Add** (al lado de Connection).
3.  **NO** uses la conexión vieja. Crea una nueva.
4.  Si tienes opciones avanzadas ("Advanced Settings" o "Show advanced settings"), busca si puedes marcar scopes manualmente. Si no, simplemente intenta loguearte de nuevo **DESPUÉS** de haber habilitado la API del Paso 1.
5.  Google te mostrará una pantalla de permisos. **Asegúrate de marcar TODAS las casillas** que solicitan acceso a Cloud Platform o Vertex AI.

## Paso 3: Verificar el "GCP Project"
Una vez reconectado:
1.  En el campo **GCP Project** del nodo en Make.
2.  Debería dejarte seleccionar tu proyecto de la lista (o pegarlo manualmente si lo conoces).
3.  Si dice "Failed to load data" nuevamente, significa que el Paso 1 no se completó (la API sigue inactiva) o elegiste el proyecto incorrecto en la conexión.

---
**¿Cómo sé si funcionó?**
El campo "GCP Project" dejará de estar en rojo y podrás seleccionar un modelo (ej. `gemini-1.5-flash` o `gemini-pro`) en el campo "Model".
