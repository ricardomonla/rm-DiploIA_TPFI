#!/bin/bash

# Matar procesos existentes en estos puertos
fuser -k 7700/tcp 7701/tcp 7702/tcp 2>/dev/null

echo "Iniciando servidores locales..."

# Portal Principal (Port 7700)
echo "Lanzando Portal Raíz en http://localhost:7700"
python3 -m http.server 7700 &
PID0=$!

# Servidor Chatbot (Port 7701)
echo "Lanzando www-chatbot en http://localhost:7701"
python3 -m http.server 7701 --directory www-chatbot &
PID1=$!

# Servidor Entregables (Port 7702)
echo "Lanzando www-entregables en http://localhost:7702"
python3 -m http.server 7702 --directory www-entregables &
PID2=$!

echo "Servidores activos (PIDs: $PID0, $PID1, $PID2)."
echo "Presiona [CTRL+C] para detener ambos servidores."

# Esperar para mantener el script vivo y poder cerrar ambos al salir
trap "kill $PID0 $PID1 $PID2" SIGINT
wait
