# Proyecto Final: Sistema Inteligente de Gestión TIC (dtic-GEMA)

**Trabajo Final Integrador - Diplomatura en Inteligencia Artificial**

## 📋 Descripción del Proyecto
**dtic-GEMA** (Gestión de Entradas con Modelos Avanzados) es un ecosistema de soporte inteligente diseñado para la **Dirección de TIC de la Facultad Regional (UTN FRLR)**. Utiliza IA Generativa para automatizar el triaje, clasificación y respuesta de consultas técnicas de alumnos, docentes y autoridades.

### Objetivos
*   **Reducir la carga operativa:** Filtrando consultas repetitivas (blanqueo de claves, fechas).
*   **Mejorar la experiencia de usuario:** Brindando respuestas inmediatas y personalizadas ("Sabías qué..." por carrera).
*   **Priorización Inteligente:** Clasificando tickets con SLAs diferenciados según el rol del usuario.

## 👤 Autor
*   **Responsable:** Lic. Ricardo Monla
*   **Contexto:** Dirección de TIC - Facultad Regional (UTN FRLR)

## 📂 Estructura del Repositorio
Este repositorio actúa como la **Fuente de la Verdad** y respaldo de configuración para la implementación No-Code.

| Directorio | Contenido |
| :--- | :--- |
| `/prompts` | **System Instructions** para los Gems (Personalidad, Reglas de Negocio). |
| `/schemas` | **Definiciones JSON** para las herramientas (Tool Calling) del Gem. |
| `/data` | **Datos de Prueba (Mock Data)** en CSV para poblar Google Sheets. |
| `/docs` | Documentación adicional del proyecto. |

## 🔗 Recursos y Entregables
Enlaces rápidos a la documentación oficial y herramientas del proyecto:

### Entregables
*   **E00 - Portal de Entregables:** [Docs](https://docs.google.com/document/d/11AzRAXEA1fCTRq_GAkLluZMotQM_Bg51TNkvHqDO_mE)
*   **E01 - Relevamiento y Diseño:** [Docs](https://docs.google.com/document/d/1yuPy40BAXGNHPeYfBqzzHeaa2H-vpVVM8mDh8yZQ-bw)
*   **E02 - Ficha Técnica:** [Docs](https://docs.google.com/document/d/1hi18UX_uSeXuELkJqJTxay6VfLZ_m2w1Aqs4EJH5x1k/edit?usp=drive_link)

### Herramientas
*   **Carpeta Drive del Proyecto:** [2601_DipoIA_TPFinal](https://drive.google.com/drive/folders/14YlQvuAahxo95qk4e5xzPqHVSqpu9eCz)
*   **GEM DiploIA - Tutor TP Final:** [Enlace al Gem](https://gemini.google.com/gem/1O0I-cRrVCCpCukC1_EQMN-7MPH2MZfwR)

## 🚀 Implementación
Para desplegar este proyecto:
1.  **Google Sheets:** Importar los archivos de `/data` para crear la estructura base.
2.  **Make.com:** Crear el escenario y conectar el Webhook usando el esquema de `/schemas`.
3.  **Gemini:** Crear un nuevo Gem y copiar el contenido de `/prompts/maestro.md` en las instrucciones.

---
*Repositorio configurado para el TP Final de DiploIA.*
