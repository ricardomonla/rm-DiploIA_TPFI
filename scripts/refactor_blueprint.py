import json
import copy

NEW_SPREADSHEET_ID = "1EnSQAuQnfPi7QAHBJPWV5o6-VqJ7bL2EANV3Hvix2U8"

def refactor_blueprint(input_file, output_file):
    with open(input_file, 'r') as f:
        bp = json.load(f)

    # Helper to find module by ID
    def get_module(id):
        for item in bp.get('flow', []):
            if item.get('id') == id:
                return item
        return None

    # Helper to update Google Sheet Module
    def update_gsheet_module(module, sheet_name, mode="search"):
        if not module: return
        mapper = module.get('mapper', {})
        mapper['spreadsheetId'] = NEW_SPREADSHEET_ID
        mapper['sheetId'] = sheet_name
        
        if mode == "search":
            # Search by Email (Column A in 'Usuarios', C in 'Tickets' - adjustment needed based on user input)
            # User said: Usuarios [Email, Dni...] -> Email is Col A
            # User said: Tickets [ID, Fecha, Email...] -> Email is Col C
            if sheet_name == "Usuarios":
                mapper['filter'] = [[{"a": "A", "b": "{{3.email}}", "o": "text:equal"}]]
            elif sheet_name == "Tickets":
                mapper['filter'] = [[{"a": "C", "b": "{{3.email}}", "o": "text:equal"}]]
                mapper['sortOrder'] = "desc"
                mapper['orderBy'] = "B" # Fecha
        
        if mode == "add":
            # Mapping for Adding Row to Tickets
            # [ID_Ticket, Fecha, Email, Consulta_Usuario, Respuesta_IA, Intencion, Estado]
            # Assumes columns A-G
            mapper['values'] = [
                "{{uuid}}",             # A: ID
                "{{now}}",              # B: Fecha
                "{{3.email}}",          # C: Email
                "{{3.descripcion}}",    # D: Consulta
                "{{11.response}}",      # E: Respuesta IA (parsed from JSON)
                "{{11.meta.intent}}",   # F: Intencion
                "Abierto"               # G: Estado
            ]
        
        module['mapper'] = mapper

    # 1. Update Module 4 (Validador) -> Search in 'Usuarios'
    # Originally 'Agentes', now 'Usuarios'.
    module_4 = get_module(4)
    update_gsheet_module(module_4, "Usuarios", mode="search")
    module_4['metadata']['designer']['name'] = "Validador Usuario"

    # 2. Create Module 12 (Buscador Historial) -> Search in 'Tickets'
    # Clone Module 4
    history_search = copy.deepcopy(module_4)
    history_search['id'] = 12
    history_search['metadata']['designer']['name'] = "Historial Tickets"
    history_search['metadata']['designer']['x'] = 897
    history_search['metadata']['designer']['y'] = 400
    update_gsheet_module(history_search, "Tickets", mode="search")
    
    # 3. Update Module 11 (Gemini Orquestador)
    # Find router and route 2
    router = get_module(5)
    if router and len(router.get('routes', [])) > 1:
        route2 = router['routes'][1]
        
        # Inject History Search at start of Route 2
        route2['flow'].insert(0, history_search)
        
        # Find Gemini (11)
        gemini_module = None
        for item in route2.get('flow', []):
            if item.get('id') == 11:
                gemini_module = item
                break
        
        if gemini_module:
            messages = gemini_module['mapper'].get('messages', [])
            if len(messages) >= 2:
                messages[0]['content'] = (
                    "Eres dtic-GEMA v1.9. "
                    "Responde SIEMPRE en JSON válido: { \"response\": \"...\", \"meta\": { \"intent\": \"...\", \"proactive\": true/false } }."
                )
                messages[1]['content'] = (
                    "Contexto: {{3.user_name}} ({{3.email}}). "
                    "Historial: [Ticket {{12.`0`}}: {{12.`6`}}]. "
                    "Mensaje: {{3.descripcion}}. "
                    "Si es INIT, saluda proactivamente usando el historial."
                )
            gemini_module['mapper']['messages'] = messages

    # 4. Save
    with open(output_file, 'w') as f:
        json.dump(bp, f, indent=4)
    print(f"Clean Blueprint generated at {output_file}")

if __name__ == "__main__":
    refactor_blueprint(
        '/home/rmonla/Documentos/GitHub/rm-DiploIA_TPFI/www-dtic-gema/assets/docs/blueprint.json',
        '/home/rmonla/Documentos/GitHub/rm-DiploIA_TPFI/www-dtic-gema/assets/docs/blueprint-v1.9-clean.json'
    )
