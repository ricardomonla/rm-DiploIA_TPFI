# Documentación Técnica: Script de Servidores Locales
**Fecha**: 19/01/2026
**Componente**: Infraestructura de Desarrollo Local

## 1. Descripción General
Se ha implementado el script `app-run.sh` para simplificar la ejecución del entorno de desarrollo local. Este script automatiza la puesta en marcha de los servidores necesarios para visualizar tanto el chatbot como el portal de entregables.

## 2. Funcionalidad
El script realiza las siguientes acciones:
1.  **Limpieza de Puertos**: Verifica y detiene cualquier proceso que esté ocupando los puertos `7701` y `7702` para evitar conflictos de "Address already in use".
2.  **Servidor Chatbot**: Inicia un servidor HTTP de Python en el puerto **7701** sirviendo el directorio `www-chatbot`.
    *   URL: `http://localhost:7701`
3.  **Servidor Entregables**: Inicia un servidor HTTP de Python en el puerto **7702** sirviendo el directorio `www-entregables`.
    *   URL: `http://localhost:7702`
4.  **Gestión de Procesos**: Mantiene ambos servidores en ejecución en segundo plano y permite detenerlos simultáneamente mediante `CTRL+C` gracias a un "trap" de señal SIGINT.

## 3. Uso
Desde la raíz del proyecto, otorgar permisos de ejecución (solo la primera vez) y ejecutar:

```bash
chmod +x app-run.sh
./app-run.sh
```

## 4. Archivos Relacionados
*   `app-run.sh`: Código fuente del script (Shell/Bash).
