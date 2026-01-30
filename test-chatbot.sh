#!/bin/bash

# script: test-chatbot.sh
# Propósito: Validar la integración del Chatbot GEMA con el webhook de Make.com

BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

MAKE_WEBHOOK_URL="https://hook.us2.make.com/yl26qec8u2lric3yr17krrtiaxws5rkr"

echo -e "${BLUE}🚀 Iniciando Testeo de Integración GEMA (v1.8.1)${NC}"
echo "----------------------------------------------------"

test_case() {
    local name=$1
    local payload=$2
    
    echo -ne "${YELLOW}🧪 Test: $name... ${NC}"
    
    RESPONSE=$(curl -s -w "\n%{http_code}" -X POST -H "Content-Type: application/json" -d "$payload" "$MAKE_WEBHOOK_URL")
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | head -n -1)

    if [[ "$HTTP_CODE" == "200" || "$HTTP_CODE" == "202" ]]; then
        echo -e "${GREEN}[PASS] (HTTP $HTTP_CODE)${NC}"
        echo -e "   📩 Respuesta: ${BODY:0:100}..."
        return 0
    else
        echo -e "${RED}[FAIL] (HTTP $HTTP_CODE)${NC}"
        echo -e "   ❌ Error: $BODY"
        return 1
    fi
}

# Caso 1: Flujo Positivo Estándar
test_case "Flujo Positivo (Email Válido)" '{
    "email": "alumno_test@frlr.utn.edu.ar",
    "dni": "99888777",
    "descripcion": "Prueba de funcionamiento desde script de testeo v1.8.1",
    "fuente": "Script Test GEMA"
}'

# Caso 2: Simulación de Error de Validación (Falta DNI)
# Nota: Enviamos el payload para ver cómo reacciona Make
test_case "Carga Incompleta (Simulación Error)" '{
    "email": "error@test.com",
    "descripcion": "Test de campo faltante",
    "fuente": "Script Test GEMA"
}'

echo "----------------------------------------------------"
echo -e "${BLUE}✨ Testeo finalizado.${NC}"
