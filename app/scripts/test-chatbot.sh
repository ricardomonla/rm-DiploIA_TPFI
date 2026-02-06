#!/bin/bash

# script: test-chatbot.sh
# Propósito: Validar la integración del Chatbot GEMA con el webhook de Make.com

BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

MAKE_WEBHOOK_URL="https://hook.us2.make.com/tosnfu28xcpf5cty3p1y807ci7rpg4qd"

echo -e "${BLUE}🚀 Consola de Pruebas GEMA (v1.9)${NC}"
echo "----------------------------------------------------"

test_case() {
    local name=$1
    local payload=$2
    
    echo -e "${YELLOW}🧪 Ejecutando: $name...${NC}"
    
    RESPONSE=$(curl -s -w "\n%{http_code}" -X POST -H "Content-Type: application/json" -d "$payload" "$MAKE_WEBHOOK_URL")
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | head -n -1)

    if [[ "$HTTP_CODE" == "200" || "$HTTP_CODE" == "202" ]]; then
        echo -e "${GREEN}✅ Éxito (HTTP $HTTP_CODE)${NC}"
        # Intentamos parsear con jq, si falla mostramos crudo
        RESPONSE_TEXT=$(echo "$BODY" | jq -r '.response' 2>/dev/null || echo "$BODY")
        SUGGESTIONS_TEXT=$(echo "$BODY" | jq -r '.suggestions | join(", ")' 2>/dev/null || echo "N/A")
        
        echo -e "${BLUE}🤖 GEMA dice:${NC} $RESPONSE_TEXT"
        echo -e "${BLUE}💡 Sugerencias:${NC} $SUGGESTIONS_TEXT"
    else
        echo -e "${RED}❌ Error (HTTP $HTTP_CODE)${NC}"
        echo -e "   Detalle: $BODY"
        echo -e "   ${YELLOW}Tip: Verifica que el escenario en Make.com esté 'ON' y el Webhook Respond bien configurado.${NC}"
    fi
    echo "----------------------------------------------------"
}

run_case_1() {
    test_case "Usuario con Ticket (Contextual)" '{
        "email": "alumno_test@frlr.utn.edu.ar",
        "dni": "99888777",
        "user_name": "Tester Alumno",
        "meta": { "intent": "handshake" }
    }'
}

run_case_2() {
    test_case "Usuario sin Ticket (Bienvenida)" '{
        "email": "nuevo_usuario@gmail.com",
        "dni": "12341234",
        "user_name": "Nuevo Visitante",
        "meta": { "intent": "handshake" }
    }'
}

run_case_3() {
    test_case "Consulta de Conocimiento (RAG)" '{
        "email": "alumno_rag@frlr.utn.edu.ar",
        "dni": "11222333",
        "user_name": "Consultor RAG",
        "text": "¿Cómo me conecto al WIFI de la facultad?",
        "meta": { "intent": "user_query" }
    }'
}

# --- Lógica de Parámetros ---
if [ ! -z "$1" ]; then
    case "$1" in
        1) run_case_1 ;;
        2) run_case_2 ;;
        3) run_case_3 ;;
        *) echo -e "${RED}Error: El test '$1' no es válido (Usa 1, 2 o 3).${NC}" ; exit 1 ;;
    esac
    echo -e "${BLUE}✨ Ejecución por parámetro finalizada.${NC}"
    exit 0
fi

# --- Menú Interactivo ---
export PS3=$'\n'"${YELLOW}Seleccione el caso de prueba [1-4]: ${NC}"
options=("Usuario con Ticket (Contextual)" "Usuario sin Ticket (Bienvenida)" "Consulta de Conocimiento (RAG)" "Salir")

select opt in "${options[@]}"
do
    case $opt in
        "Usuario con Ticket (Contextual)") run_case_1 ;;
        "Usuario sin Ticket (Bienvenida)") run_case_2 ;;
        "Consulta de Conocimiento (RAG)") run_case_3 ;;
        "Salir") break ;;
        *) echo -e "${RED}Opción inválida $REPLY${NC}" ;;
    esac
done

echo "----------------------------------------------------"
echo -e "${BLUE}✨ Consola de Pruebas finalizada.${NC}"
