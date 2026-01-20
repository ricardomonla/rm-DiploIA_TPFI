# Nueva Barra Lateral y Navegación Dinámica

He implementado una barra lateral moderna que funciona como centro de control para el sitio de entregables. Esta mejora facilita enormemente el acceso a los diferentes documentos y a sus secciones internas.

## Características Principales

*   **Navegación Global Fija**: Una barra lateral azul (UTN FRLR) que te permite saltar entre el Portal, E01 y E02 instantáneamente.
*   **ToC Dinámica**: La sección "En esta página" se genera automáticamente leyendo los encabezados (`h2`, `h3`) del documento actual.
*   **Scroll Suave**: Al hacer clic en un subtema, la página se desplaza suavemente hasta la sección deseada.
*   **Resaltado Inteligente**: La barra lateral indica visualmente qué página estás viendo y en qué sección te encuentras (mediante scroll tracking).

*   **Identidad Dinámica y Viva**: He transformado a **dtic-GEMA** de una imagen estática a una entidad animada mediante video. He integrado las animaciones MP4 proporcionadas, configurando un bucle fluido y un efecto de "respiración AI" mediante resplandor de neón.
*   **Memoria de Entidad**: Implementé una lógica de `localStorage` para que la animación del avatar evolucione secuencialmente (`00` → `01`...) al navegar por el menú principal, manteniendo su estado entre recargas de página.
*   **Mini-Sitio Autónomo**: He localizado todos los recursos externos (imágenes, videos, PDF y blueprints) dentro de la carpeta `www-entregables/assets/`. El sitio es 100% independiente.
*   **Coherencia Global**: He auditado y unificado la terminología en todo el sitio para asegurar que el flujo de trabajo sea coherente y fácil de entender en cada página.

## Visualización

````carousel
![Identidad dtic-GEMA](assets/img/index_welcome_sidebar_1768833197496.png)
<!-- slide -->
![Arquitectura Integrada](assets/img/arquitectura_gema_es.png)
````

## Cambios Técnicos

1.  **style.css**: Nueva estructura `flex` con sidebar fija y estilos interactivos.
2.  **navigation.js**: Lógica JS para poblar la ToC y gestionar el desplazamiento.
3.  **Archivos HTML**: Refactorizados para separar el contenido de la navegación e incluir IDs ancla.
4.  **Refactorización Modular (`layout.js`)**: Se implementó una inyección dinámica de la **Barra Lateral** y el **Pie de Página** para eliminar redundancia de código y facilitar el mantenimiento.

## Verificación Visual

Se ha confirmado que la estructura se mantiene consistente en todas las páginas:

````carousel
![Portal Principal](assets/img/index_page_verification_1768841246127.png)
<!-- slide -->
![Entregable E01](assets/img/e01_page_verification_1768841272326.png)
<!-- slide -->
![Consignas (Footer)](assets/img/consignas_footer_view_1768841692972.png)
````


## Validación Local (Servidores de Desarrollo)

Se ha verificado el correcto funcionamiento de los servidores locales ejecutados mediante `./app-run.sh`.

- **Puerto 7701**: Interfaz Chatbot (Operativa).
- **Puerto 7702**: Portal Entregables (Operativo).

![Verificación Navegador](assets/img/local_verification.webp)
