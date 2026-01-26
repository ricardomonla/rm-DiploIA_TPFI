import json
import os
import re
import datetime
from fpdf import FPDF
from fpdf.enums import XPos, YPos

def get_app_version():
    try:
        with open('www-dtic-gema/assets/data/changelog.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            if data and len(data) > 0:
                return data[0].get('version', 'v1.x')
    except Exception as e:
        print(f"Error leyendo versión: {e}")
    return "v1.x"

def get_project_name():
    try:
        with open('www-dtic-gema/assets/data/project.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data.get('projectName', 'GEMA')
    except Exception as e:
        print(f"Error leyendo nombre del proyecto: {e}")
    return "GEMA"

class GEMAReport(FPDF):
    def __init__(self, version="v1.x"):
        super().__init__()
        self.app_version = version
        self.gallery = []

    def header(self):
        avatar_path = "www-dtic-gema/assets/img/avatar/gema-avatar.png"
        if os.path.exists(avatar_path):
            self.image(avatar_path, 10, 8, 12) # Avatar mini para ganar espacio
        
        self.set_font('helvetica', 'B', 10) # Un poco más grande
        self.set_text_color(120, 120, 120)
        self.set_y(8)
        self.cell(0, 10, f'{self.app_version} | dtic-GEMA | Lic. Ricardo Monla', align='R')
        
        self.set_draw_color(230, 230, 230)
        self.set_line_width(0.1)
        self.line(10, 20, 200, 20)
        self.set_y(22)

    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.set_text_color(150, 150, 150)
        self.cell(0, 10, f'Página {self.page_no()}', align='C')

def clean_html(text):
    if not isinstance(text, str): return str(text)
    text = re.sub(r'<br\s*/?>', '\n', text)
    text = re.sub(r'<[^>]*>', '', text)
    return text

def add_to_gallery(pdf, src, caption):
    pdf.gallery.append({'src': src, 'caption': caption})
    pdf.set_font('helvetica', 'I', 9)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 6, f"> [Vincular: Ver Figura {len(pdf.gallery)} en la Galería al final]", ln=True)
    pdf.ln(2)

def render_evolution_brief(pdf, position='start'):
    # Nota de evolución con URL oficial e hipervínculo
    url = "https://ricardomonla.github.io/rm-DiploIA_TPFI/"
    
    # Colores más disruptivos (Fondo cian muy suave, borde azul profesional)
    pdf.set_fill_color(224, 242, 254) 
    pdf.set_draw_color(14, 165, 233)
    pdf.set_line_width(0.3)
    
    if position == 'end':
        pdf.ln(10)
        
    pdf.set_font('helvetica', 'B', 10)
    pdf.set_text_color(3, 105, 161)
    pdf.cell(0, 8, "  ! NOTA DE VIGENCIA SISTÉMICA", border='LTR', ln=True, fill=True)
    
    pdf.set_font('helvetica', '', 9)
    pdf.set_text_color(30, 41, 59)
    msg = f"Este documento representa una captura estática del proyecto. El ecosistema vivo y actualizado se encuentra en: "
    pdf.multi_cell(0, 5, msg, border='LR')
    
    # Fila del link con hipervínculo real y destacado
    pdf.set_font('helvetica', 'B', 9)
    pdf.set_text_color(2, 132, 199)
    pdf.cell(0, 7, f"  {url}", border='LBR', ln=True, link=url)
    pdf.ln( position == 'start' and 5 or 0)

def render_table(pdf, table):
    pdf.set_font('helvetica', 'B', 9)
    pdf.set_fill_color(241, 245, 249)
    pdf.set_text_color(0, 51, 102)
    
    col_width = 190 / len(table['headers'])
    for h in table['headers']:
        pdf.cell(col_width, 10, clean_html(h), border=1, align='C', fill=True)
    pdf.ln()
    
    pdf.set_font('helvetica', '', 8)
    pdf.set_text_color(30, 41, 59)
    for row in table['rows']:
        row_y = pdf.get_y()
        max_h = 0
        lines_data = []
        for cell in row:
            lines = pdf.multi_cell(col_width, 5, clean_html(cell), dry_run=True, output="LINES")
            h = len(lines) * 5
            max_h = max(max_h, h)
            lines_data.append(clean_html(cell))
        
        if row_y + max_h > 270:
            pdf.add_page()
            row_y = pdf.get_y()

        for i, cell_text in enumerate(lines_data):
            pdf.set_xy(10 + (i * col_width), row_y)
            pdf.multi_cell(col_width, max_h / (max_h/5 if max_h>0 else 1), cell_text, border=1)
        pdf.set_y(row_y + max_h)
    pdf.ln(5)

def generate_pdf(phase_id, filename, version):
    with open('www-dtic-gema/assets/data/content.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    phase = data.get(phase_id, {})
    if not phase: return

    pdf = GEMAReport(version=version)
    pdf.add_page()
    
    # Título Principal
    pdf.set_font('helvetica', 'B', 16) # Aumentado de 14
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 10, clean_html(phase.get('title', '')), ln=True)
    pdf.set_font('helvetica', 'I', 12) # Aumentado de 10
    pdf.cell(0, 8, clean_html(phase.get('subtitle', '')), ln=True)
    pdf.ln(2)

    # Info Estudiante (Compacto)
    if 'studentInfo' in phase:
        info = phase['studentInfo']
        pdf.set_font('helvetica', 'B', 9)
        pdf.set_text_color(0, 0, 0)
        pdf.cell(0, 5, f"Alumno: {clean_html(info.get('alumno'))} | Fecha: {clean_html(info.get('fecha'))}", ln=True)
        pdf.ln(2)
        if phase_id == 'fase1': render_evolution_brief(pdf, 'start')

    # Motor de Procesamiento de Bloques (REGLA DE ORO)
    for item in phase.get('content', []):
        type = item.get('type')
        
        if type == 'section':
            pdf.set_font('helvetica', 'B', 13) # Aumentado de 11
            pdf.set_text_color(0, 51, 102)
            pdf.cell(0, 10, clean_html(item.get('title', '')), ln=True)
            if item.get('subtitle'):
                pdf.set_font('helvetica', 'B', 11) # Aumentado de 9
                pdf.set_text_color(46, 125, 50)
                pdf.cell(0, 8, clean_html(item.get('subtitle')), ln=True)
            
            if item.get('body'):
                pdf.set_font('helvetica', '', 10) # Aumentado de 9
                pdf.set_text_color(30, 41, 59)
                pdf.multi_cell(0, 5, clean_html(item.get('body')))
            pdf.ln(2)

            # Bloques anidados (REGLA DE ORO)
            if 'blocks' in item:
                for block in item['blocks']:
                    if block['type'] == 'highlight':
                        pdf.set_fill_color(240, 245, 250)
                        pdf.set_font('helvetica', 'B', 11) # Aumentado
                        pdf.cell(0, 8, f" {clean_html(block['title'])}", fill=True, ln=True)
                        pdf.set_font('helvetica', '', 10) # 10
                        pdf.multi_cell(0, 6, clean_html(block['body']))
                        pdf.ln(3)
                    elif block['type'] == 'image':
                        add_to_gallery(pdf, block['src'], block['caption'])
            
            if 'grid' in item:
                pdf.set_font('helvetica', '', 9)
                for row_grid in item['grid']:
                    pdf.set_x(15)
                    pdf.multi_cell(180, 5, f"> {clean_html(row_grid[0])} {clean_html(row_grid[1])}")
                pdf.ln(3)

            if 'list' in item:
                pdf.set_font('helvetica', '', 10)
                pdf.set_text_color(30, 41, 59)
                for line in item['list']:
                    pdf.set_x(15)
                    pdf.multi_cell(180, 6, f"* {clean_html(line)}")
                pdf.ln(3)

            if 'table' in item: render_table(pdf, item['table'])

        elif type == 'image':
            add_to_gallery(pdf, item.get('src'), item.get('caption'))

    # Nota de vigencia al final para la Fase 2
    if phase_id == 'fase2':
        render_evolution_brief(pdf, 'end')

    # Galería Final
    if pdf.gallery:
        pdf.add_page()
        pdf.set_font('helvetica', 'B', 14)
        pdf.cell(0, 15, "GALERÍA DE FIGURAS TÉCNICAS", align='C', ln=True)
        for i, img in enumerate(pdf.gallery):
            img_path = os.path.join("www-dtic-gema", img['src'])
            if os.path.exists(img_path):
                if pdf.get_y() > 220: pdf.add_page()
                pdf.ln(2)
                # Escala óptima para 2 figuras por página (w=110)
                pdf.image(img_path, x=50, w=110) 
                pdf.set_font('helvetica', 'I', 8)
                pdf.cell(0, 10, f"Figura {i+1}: {clean_html(img['caption'])}", align='C', ln=True)
                pdf.ln(2)

    pdf.output(f"www-dtic-gema/assets/docs/{filename}")
    print(f"Generado: {filename}")

def update_content_json(phase_id, new_filename):
    path = 'www-dtic-gema/assets/data/content.json'
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Buscar en la sección entregables para actualizar el link
    if 'entregables' in data:
        for item in data['entregables'].get('content', []):
            if item.get('type') == 'section' and 'blocks' in item:
                for block in item['blocks']:
                    if block.get('type') == 'action_item':
                        # Comparar el título para saber qué fase es
                        title = block.get('title', '').lower()
                        if ('fase 1' in title and 'fase1' == phase_id) or \
                           ('fase 2' in title and 'fase2' == phase_id):
                            block['action']['link'] = f"assets/docs/{new_filename}"
                            print(f"Enlace actualizado en content.json para {phase_id}: {new_filename}")

    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    v = get_app_version()
    p_name = get_project_name()
    
    # Generar timestamp único para esta corrida
    now = datetime.datetime.now()
    ts = now.strftime("%Y%m%d_%H%M")
    fecha_legible = now.strftime("%d de %B de %Y").lower() 
    # Mapeo manual de meses si se prefiere en español exacto, pero fpdf usa locale si se configura.
    # Por ahora simplemente usaremos la fecha del sistema o un formato estándar.
    fecha_format = now.strftime("%d de %m de %Y")

    path = 'www-dtic-gema/assets/data/content.json'
    with open(path, 'r', encoding='utf-8') as f:
        content_data = json.load(f)
    
    # Actualizar fecha en Fase 1
    if 'fase1' in content_data and 'studentInfo' in content_data['fase1']:
        content_data['fase1']['studentInfo']['fecha'] = f"{now.day} de enero de {now.year}" # Hardcoded 'enero' por el contexto actual, o dinámico:
        print(f"Fecha actualizada en Fase 1: {content_data['fase1']['studentInfo']['fecha']}")

    with open(path, 'w', encoding='utf-8') as f:
        json.dump(content_data, f, ensure_ascii=False, indent=4)
    
    os.makedirs("www-dtic-gema/assets/docs", exist_ok=True)
    
    # Nueva nomenclatura
    f1_basename = f"{p_name}_{v}_Entregable1_{ts}.pdf"
    f2_basename = f"{p_name}_{v}_Entregable2_{ts}.pdf"
    
    generate_pdf('fase1', f1_basename, v)
    update_content_json('fase1', f1_basename)
    
    generate_pdf('fase2', f2_basename, v)
    update_content_json('fase2', f2_basename)
