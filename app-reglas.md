# 🤖 Configuración y Protocolos del Agente (IA-Optimized)

Este archivo define las directivas heurísticas y el sistema de comandos para la interacción con el repositorio **rm-DiploIA_TPFI**.

## 1. 🌐 Núcleo de Comunicación (Español-First)
- **Idioma Obligatorio:** Español para toda salida (Mensajes, Artefactos, Documentación, Commits).
- **Interpretación Heurística:** Priorizar la intención del usuario sobre el literalismo técnico. Tono: Profesional/Consultor.

## 2. 🏛️ Estándares de Arquitectura y Estética
- **UI/UX:** Estética "Premium", Glassmorphism y micro-animaciones fluidas.
- **Identidad:** Branding "Facultad X". Desvincular de marcas institucionales específicas.
- **Rondas de Diseño:** Las imágenes complejas (ej: Arquitectura) se iteran en "Rondas". La versión elegida se documenta en la memoria y se implementa en `assets/img/`.
- **Cache-Busting:** Al realizar cambios en lógica JS crítica, se debe incrementar el parámetro `?v=x.x.x` en `index.html`.

## 3. 📝 Gestión de Memoria Técnica (Protocolo Iterativo)
- **Ubicación:** `data/memoria/[vActual]/`.
- **Formato:** `v[X.Y.Z]_[descripcion_breve].md`.
- **Regla de Integridad (Aditividad):** Las actualizaciones son **estrictamente aditivas**. Queda prohibido resumir o modificar contenidos previos para preservar el rastro histórico íntegro.
- **Registro de Éxitos y Fracasos:** Cada ciclo debe incluir una tabla con el historial de intentos:
    - **Campos:** Iteración (n°), Táctica (qué se hizo), Resultado (Éxito/Fraso/Parcial), Aprendizaje (por qué).
    - **Persistencia:** No borrar iteraciones fallidas; son la base de la conclusión final.

## 4. ⚙️ Motor de Navegación (navigation.js)
- **Nivel 1 Principal:** El sidebar debe permanecer minimalista, mostrando solo hitos de Nivel 1 para evitar conflictos de eventos.
- **Resolución de Slugs:** Siempre se debe utilizar `MENU_DATA` para mapear los *Paths* (URL) a los *IDs* de contenido real, garantizando sincronización absoluta.
- **Navegación Secuencial:** Los botones "Continuar/Volver" deben disparar el evento `hashchange` para el control centralizado.

## 5. ⚡ Protocolo de Comandos "OK" (Sistema de Control)

### 🟢 "OK procede" (Disparador de Ejecución)
- **Mandato Plan-First:** Ningún cambio en el código sin un Plan de Implementación aprobado.
- **Sincronización:** Actualizar el archivo de memoria v[X.Y.Z] marcando tareas `[x]` al finalizar.

### 🟡 "OK versiona" (Sello de Versión)
1. Incrementar versionado oficial.
2. Síntesis de Changelog desde archivos de memoria.
3. Crear etiqueta Git: `vX.Y`.

### 💾 "OK guarda" (Persistencia de Sesión)
1. Registro universal de cambios (`git add .`).
2. Commit descriptivo en español.
3. Push al repositorio remoto.

---
> [!NOTE]
> Este archivo es el único punto de verdad para las reglas del agente. Referencias previas en `.agent/rules.md` quedan deprecadas.
