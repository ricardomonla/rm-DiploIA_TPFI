# Guía: Crear Credenciales de Google (OAuth 2.0)

Esta guía te permite obtener el `CLIENT_ID` necesario para habilitar el botón "Acceder con Google" en tu entorno local.

## Paso 1: Acceder a Google Cloud Console
1. Ingresa a [Google Cloud Console](https://console.cloud.google.com/).
2. Inicia sesión con tu cuenta de Google (preferiblemente la institucional o de desarrollo).

## Paso 2: Crear un Nuevo Proyecto (Si no tienes uno)
1. En la barra superior, haz clic en el selector de proyectos (a la izquierda de la barra de búsqueda).
2. Haz clic en **"Nuevo Proyecto"**.
3. Nombre del proyecto: `GEMA-Chatbot-Dev` (o similar).
4. Haz clic en **Crear**.
5. Selecciona el proyecto recién creado.

## Paso 3: Configurar la Pantalla de Consentimiento (OAuth Consent Screen)
*(Si es la primera vez, debes configurar esto)*
1. En el menú de la izquierda (hamburguesa), ve a **APIs y servicios** > **Pantalla de consentimiento de OAuth**.
2. **User Type (Tipo de usuario):**
   - Elige **Externo** (External) si quieres que cualquiera con cuenta Google pueda probar (recomendado para dev rápida).
   - O **Interno** si tienes una organización de Google Workspace.
3. Clic en **Crear**.
4. **Información de la aplicación:**
   - Nombre: `GEMA Chatbot`
   - Correo de soporte: Tu email.
   - Datos de contacto del desarrollador: Tu email.
5. Clic en **Guardar y Continuar** en las pantallas siguientes (no necesitas añadir scopes especiales por ahora).

## Paso 4: Crear Credenciales (Client ID)
1. En el menú izquierdo, ve a **APIs y servicios** > **Credenciales**.
2. Clic en **+ CREAR CREDENCIALES** (arriba) > **ID de cliente de OAuth**.
3. **Tipo de aplicación:** Selecciona **Aplicación web**.
4. **Nombre:** `GEMA Localhost`.
5. **Orígenes autorizados de JavaScript (IMPORTANTE):**
   - Clic en **+ AGREGAR URI**.
   - Escribe: `http://localhost:7700`
   - *(Nota: Si usas otro puerto, agrégalo también).*
6. **URI de redireccionamiento autorizados:**
   - Para el botón "One Tap" o Sign-In simple, a veces no es obligatorio, pero es buena práctica poner: `http://localhost:7700`
7. Clic en **Crear**.

## Paso 5: Obtener el Client ID
1. Aparecerá una ventana emergente con "Se creó tu cliente de OAuth".
2. Copia el string bajo **"Tu ID de cliente"**.
   - Se verá algo como: `123456789-abcdefghijklmn.apps.googleusercontent.com`
3. **Pégalo en el chat** para que yo pueda configurar `index.html`.
