# 🛡️ Protocolo y Configuración del Agente (v1.8.0)

Este archivo es el **Único Punto de Verdad (SSOT)** local de la aplicación.
Importa el protocolo base agnóstico desde: `../rm-OKIA/base-reglas.md`

## 0. 📥 VARIABLES DE ENTORNO (Configuración de App)
*Definir estas variables al instanciar el protocolo en una nueva app.*

- **`VAR_REPO_NAME`**: `rm-DiploIA_TPFI`
- **`VAR_WEB_ROOT`**: `www-dtic-gema/`
- **`VAR_MAIN_HTML`**: `index.html`
- **`VAR_PATH_MEMORIA`**: `data/memoria/`
- **`VAR_PATH_ASSETS`**: `www-dtic-gema/assets/`
- **`VAR_BRANDING_ID`**: `Glassmorphism / Facultad X`
- **`VAR_VERSION_FILE`**: `www-dtic-gema/assets/data/project.json`
- **`VAR_CHANGELOG_FILE`**: `www-dtic-gema/assets/data/changelog.json`
- **`VAR_README_FILE`**: `README.md`
- **`VAR_RUN_CMD`**: `./app-run.sh`

---
> [!IMPORTANT]
> El Agente DEBE seguir las **Reglas Fundamentales**, **Sistema de Comandos (OK)** y **Procedimientos Operativos** definidos en el archivo base externo (`../rm-OKIA/base-reglas.md`) antes de proceder.
