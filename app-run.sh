#!/bin/bash

# Matar procesos existentes en el puerto 7700
fuser -k 7700/tcp 2>/dev/null

echo "Iniciando Servidor dtic-GEMA v1.1..."

# Portal Unificado (Port 7700)
echo "Lanzando Portal en http://localhost:7700"
python3 -m http.server 7700 &
PID0=$!

echo "Servidor activo (PID: $PID0)."
echo "El portal principal redirigirá automáticamente a la aplicación unificada."
echo "Presiona [CTRL+C] para detener el servidor."

# Esperar para mantener el script vivo
trap "kill $PID0" SIGINT
wait
