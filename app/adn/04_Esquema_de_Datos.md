# 04. Esquema de Datos y Fuentes de Verdad

**Propósito:** Definir la estructura de las bases de datos y fuentes de información que alimentan a GEMA.
**Ubicación:** Google Sheets (Backend) y Archivos Locales (Semilla).

---

## 1. Tabla de Usuarios (Maestro)
Fuente de verdad para la autenticación y personalización.

| Columna | Tipo | Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| **Email** | String (Key) | Correo institucional (ID principal). | `alumno@frlr.utn.edu.ar` |
| **Dni** | Number | Documento de identidad. | `99888777` |
| **Legajo** | Number | Número de legajo académico/administrativo. | `25001` |
| **Nombre** | String | Nombre completo del usuario. | `Juan Perez` |
| **Rol** | Enum | Perfil del usuario en el sistema. | `Alumno`, `Docente`, `No Docente` |
| **Verificado** | Boolean | Si el usuario ha validado su identidad. | `TRUE` |
| **Ultima_Conexion** | DateTime | Timestamp del último login. | `2026-02-05 17:30:00` |

---

## 2. Tabla de Tickets (Transaccional)
Registro histórico de interacciones y gestiones.

| Columna | Tipo | Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| **ID_Ticket** | String (Key) | Identificador único del ticket. | `TKY-1001` |
| **Fecha** | Date | Fecha de creación del ticket. | `2026-02-01` |
| **Email** | String (FK) | Relación con la tabla Usuarios. | `alumno@frlr.utn.edu.ar` |
| **Consulta_Usuario**| Text | Texto original de la consulta. | `Problemas con acceso al Campus` |
| **Respuesta_IA** | Text | Respuesta generada por GEMA. | `Para resetear tu clave...` |
| **Intencion** | String | Clasificación de la intención (Tag). | `Soporte Técnico` |
| **Estado** | Enum | Estado actual de la gestión. | `Abierto`, `Cerrado`, `En Progreso`, `Pendiente` |

---

## 3. Tabla de Conocimientos (RAG)
Base de conocimiento para el contexto de la IA.

| Columna | Tipo | Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| **Tag** | String (Key) | Etiqueta corta para búsqueda vector/filtros. | `WIFI` |
| **Palabras_Clave**| Text | Sinónimos y términos de búsqueda. | `contraseña, internet, clave, eduroam` |
| **Pregunta_Clave** | String | Pregunta frecuente canónica. | `¿Cuál es la contraseña del WiFi?` |
| **Respuesta_Estandar**| Text | Respuesta aprobada y validada. | `La red es Eduroam...` |
| **Enlace_Referencia** | URL | Link a documentación oficial o trámite. | `https://frlr.utn.edu.ar/wifi` |

---

## Notas de Integración
- **Make.com:** Utiliza estas hojas como "Data Store" principal.
- **RAG:** La tabla Conocimientos alimenta el contexto del LLM.
- **Handshake:** GEMA cruza `Email` (Usuarios) con `Email` (Tickets) para dar el saludo contextual.
