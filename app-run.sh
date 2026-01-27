#!/bin/bash

# Colores ANSI para estética premium
BLUE='\033[0;34m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuración de puerto (default 7700)
PORT=${1:-7700}

# Función de limpieza al salir
cleanup() {
    echo -e "\n${RED}🛑 Deteniendo servidores en puerto $PORT...${NC}"
    fuser -k $PORT/tcp 2>/dev/null
    exit 0
}

# Capturar señales de interrupción (CTRL+C)
trap cleanup SIGINT SIGTERM

# Limpieza previa de puerto
fuser -k $PORT/tcp 2>/dev/null

# Leer versión desde project.json (Fuente de Verdad)
PROJECT_JSON="www-dtic-gema/assets/data/project.json"
VERSION=$(grep -oP '"version":\s*"\K[^"]+' "$PROJECT_JSON" 2>/dev/null || echo "v1.7")

echo -e "${CYAN}🚀 Iniciando Ecosistema dtic-GEMA ${VERSION}...${NC}"
echo -e "${BLUE}📂 Directorio raíz:${NC} $(pwd)"
echo -e "${BLUE}🌐 URL:${NC} ${GREEN}http://localhost:$PORT${NC}"

# Verificar si python3 está instalado
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Error: python3 no está instalado. Por favor, instálalo para continuar.${NC}"
    exit 1
fi

# Gestión de Servidor
if curl -s --head --fail "http://localhost:$PORT" > /dev/null; then
    echo -e "${YELLOW}ℹ️ El servidor ya está en ejecución en el puerto $PORT.${NC}"
    SERVER_PID=$(lsof -t -i:$PORT | head -n 1)
else
    # Lanzar servidor en background
    python3 -m http.server $PORT &>/dev/null &
    SERVER_PID=$!
fi

# Bucle de verificación de identidad (Retry Loop para robustez)
echo -ne "${CYAN}🔍 Verificando identidad del servicio...${NC}"
MAX_RETRIES=5
RETRY_COUNT=0
IDENTIFIED=false

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    sleep 1
    if curl -s "http://localhost:$PORT" | grep -q "dtic-GEMA"; then
        IDENTIFIED=true
        break
    fi
    ((RETRY_COUNT++))
    echo -ne "${YELLOW}.${NC}"
done
echo ""

if [ "$IDENTIFIED" = true ]; then
    echo -e "${GREEN}✅ Identidad confirmada: Portal dtic-GEMA operativo.${NC}"
else
    echo -e "${YELLOW}⚠️ Advertencia: El servicio no respondió con la marca esperada tras $MAX_RETRIES intentos.${NC}"
fi

echo -e "${GREEN}✨ Servidor activo (PID: $SERVER_PID) en puerto $PORT.${NC}"
echo -e "${CYAN}💡 Presiona [CTRL+C] para detener todo el ecosistema.${NC}"

# Mantener el script vivo
wait $SERVER_PID
