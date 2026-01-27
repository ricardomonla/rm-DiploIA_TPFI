import json
import os
import re
import datetime
import locale
from fpdf import FPDF
from fpdf.enums import XPos, YPos

# Intentar configurar locale para español (opcional para nombres de mes)
try:
    locale.setlocale(locale.LC_TIME, 'es_ES.UTF-8')
except:
    pass

def get_fecha_es():
    meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", 
             "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
    now = datetime.datetime.now()
    return f"{now.day} de {meses[now.month-1]} de {now.year}"

def get_app_version():
    try:
        path = os.path.join('www-dtic-gema', 'assets', 'data', 'project.json')
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data.get('version', 'v1.x')
    except Exception as e:
        print(f"Error leyendo versión: {e}")
    return "v1.x"

def get_project_name():
    try:
        path = os.path.join('www-dtic-gema', 'assets', 'data', 'project.json')
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data.get('projectName', 'GEMA')
    except Exception as e:
        print(f"Error leyendo nombre: {e}")
    return "GEMA"

class GEMAReport(FPDF):
    def __init__(self, version="v1.x"):
        super().__init__()
        self.app_version = version
        self.gallery = []

    def header(self):
        avatar_path = os.path.join("www-dtic-gema", "assets", "img", "avatar", "gema-avatar.png")
        if os.path.exists(avatar_path):
            self.image(avatar_path, 10, 8, 12)
        
        self.set_font('helvetica', 'B', 10)
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
    url = "https://ricardomonla.github.io/rm-DiploIA_TPFI/"
    pdf.set_fill_color(224, 242, 254) 
    pdf.set_draw_color(14, 165, 233)
    pdf.set_line_width(0.3)
    
    if position == 'end':
        pdf.ln(10)
        
    pdf.set_x(10)
    pdf.set_font('helvetica', 'B', 10)
    pdf.set_text_color(3, 105, 161)
    pdf.cell(0, 8, "  ! PROTOCOLO DE MEJORA CONTINUA", border='LTR', ln=True, fill=True)
    
    pdf.set_font('helvetica', '', 9)
    pdf.set_text_color(30, 41, 59)
    msg = f"Este documento representa una captura estática del proyecto. El ecosistema vivo y actualizado se encuentra en: "
    pdf.multi_cell(0, 5, msg, border='LR')
    
    pdf.set_x(10) 
    pdf.set_font('helvetica', 'B', 8)
    pdf.set_text_color(2, 132, 199)
    pdf.multi_cell(190, 7, f"  {url}", border='LBR', new_x=XPos.LMARGIN, new_y=YPos.NEXT, link=url)
    pdf.ln(position == 'start' and 5 or 0)

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
            pdf.multi_cell(col_width, max_h, cell_text, border=1)
        pdf.set_y(row_y + max_h)
    pdf.ln(5)

def generate_pdf(phase_id, filename, version, content_data):
    phase = content_data.get(phase_id, {})
    if not phase: return

    pdf = GEMAReport(version=version)
    pdf.add_page()
    
    pdf.set_font('helvetica', 'B', 16)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 10, clean_html(phase.get('title', '')), ln=True)
    pdf.set_font('helvetica', 'I', 12)
    pdf.cell(0, 8, clean_html(phase.get('subtitle', '')), ln=True)
    pdf.ln(2)

    if 'studentInfo' in phase:
        info = phase['studentInfo']
        pdf.set_font('helvetica', 'B', 9)
        pdf.set_text_color(0, 0, 0)
        pdf.cell(0, 5, f"Alumno: {clean_html(info.get('alumno'))} | Fecha: {clean_html(info.get('fecha'))}", ln=True)
        pdf.ln(2)
        if phase_id == 'fase1': render_evolution_brief(pdf, 'start')

    for item in phase.get('content', []):
        type = item.get('type')
        if type == 'section':
            pdf.set_font('helvetica', 'B', 13)
            pdf.set_text_color(0, 51, 102)
            pdf.cell(0, 10, clean_html(item.get('title', '')), ln=True)
            if item.get('subtitle'):
                pdf.set_font('helvetica', 'B', 11)
                pdf.set_text_color(46, 125, 50)
                pdf.cell(0, 8, clean_html(item.get('subtitle')), ln=True)
            
            if item.get('body'):
                pdf.set_font('helvetica', '', 10)
                pdf.set_text_color(30, 41, 59)
                pdf.multi_cell(0, 5, clean_html(item.get('body')))
            pdf.ln(2)

            if 'blocks' in item:
                for block in item['blocks']:
                    if block['type'] == 'highlight':
                        pdf.set_fill_color(240, 245, 250)
                        pdf.set_font('helvetica', 'B', 11)
                        pdf.cell(0, 8, f" {clean_html(block['title'])}", fill=True, ln=True)
                        pdf.set_font('helvetica', '', 10)
                        pdf.multi_cell(0, 6, clean_html(block['body']))
                        pdf.ln(3)
                    elif block['type'] == 'image':
                        add_to_gallery(pdf, block['src'], block['caption'])
            
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

    if phase_id == 'fase2': render_evolution_brief(pdf, 'end')

    if pdf.gallery:
        pdf.add_page()
        pdf.set_font('helvetica', 'B', 14)
        pdf.cell(0, 15, "GALERÍA DE FIGURAS TÉCNICAS", align='C', ln=True)
        for i, img in enumerate(pdf.gallery):
            img_path = os.path.join("www-dtic-gema", img['src'])
            if os.path.exists(img_path):
                if pdf.get_y() > 220: pdf.add_page()
                pdf.ln(2)
                pdf.image(img_path, x=50, w=110) 
                pdf.set_font('helvetica', 'I', 8)
                pdf.cell(0, 10, f"Figura {i+1}: {clean_html(img['caption'])}", align='C', ln=True)
                pdf.ln(2)

    output_path = os.path.join("www-dtic-gema", "assets", "docs", filename)
    pdf.output(output_path)
    print(f"Generado: {filename}")

def sync_references(content_data, phase_id, new_filename):
    if 'entregables' in content_data:
        for item in content_data['entregables'].get('content', []):
            if item.get('type') == 'section' and 'blocks' in item:
                for block in item['blocks']:
                    if block.get('type') == 'action_item':
                        title = block.get('title', '').lower()
                        if (f'fase 1' in title and phase_id == 'fase1') or \
                           (f'fase 2' in title and phase_id == 'fase2'):
                            block['action']['link'] = f"assets/docs/{new_filename}"

if __name__ == "__main__":
    v = get_app_version()
    p_name = get_project_name()
    now = datetime.datetime.now()
    fecha_es = get_fecha_es()
    ts = now.strftime("%Y%m%d_%H%M")
    
    path_content = os.path.join('www-dtic-gema', 'assets', 'data', 'content.json')
    with open(path_content, 'r', encoding='utf-8') as f:
        content_data = json.load(f)
    
    # 1. Actualizar fecha en Fase 1
    if 'fase1' in content_data and 'studentInfo' in content_data['fase1']:
        content_data['fase1']['studentInfo']['fecha'] = fecha_es

    # 2. Generar nombres de archivos
    f1_name = f"{p_name}_{v}_Entregable1_{ts}.pdf"
    f2_name = f"{p_name}_{v}_Entregable2_{ts}.pdf"
    
    # 3. Generar PDFs y Sincronizar (en memoria)
    os.makedirs(os.path.join("www-dtic-gema", "assets", "docs"), exist_ok=True)
    generate_pdf('fase1', f1_name, v, content_data)
    sync_references(content_data, 'fase1', f1_name)
    
    generate_pdf('fase2', f2_name, v, content_data)
    sync_references(content_data, 'fase2', f2_name)
    
    # 4. Una única escritura final al disco
    with open(path_content, 'w', encoding='utf-8') as f:
        json.dump(content_data, f, ensure_ascii=False, indent=4)
    print(f"Sincronización de content.json completada.")
