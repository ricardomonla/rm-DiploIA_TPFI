import json
import os
import re
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

class GEMAReport(FPDF):
    def __init__(self, version="v1.x"):
        super().__init__()
        self.app_version = version
        self.gallery = []

    def header(self):
        avatar_path = "www-dtic-gema/assets/img/avatar/gema-avatar.png"
        if os.path.exists(avatar_path):
            self.image(avatar_path, 10, 8, 12) # Avatar mini para ganar espacio
        
        self.set_font('helvetica', 'B', 9) # Fuente más pequeña
        self.set_text_color(120, 120, 120)
        self.set_y(8)
        self.cell(0, 10, f'dtic-GEMA | Lic. Ricardo Monla | Versión: {self.app_version}', align='R')
        
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

def render_evolution_brief(pdf):
    # Nota de evolución con URL oficial
    pdf.set_fill_color(248, 250, 252)
    pdf.set_draw_color(79, 172, 254)
    pdf.set_line_width(0.2)
    pdf.set_font('helvetica', 'B', 8)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 5, " ! NOTA DE VIGENCIA SISTÉMICA", border='LTR', ln=True, fill=True)
    pdf.set_font('helvetica', 'I', 8)
    pdf.set_text_color(50, 50, 50)
    msg = "Este documento es estático. El ecosistema vivo se actualiza en: https://ricardomonla.github.io/rm-DiploIA_TPFI/"
    pdf.multi_cell(0, 4, msg, border='LBR')
    pdf.ln(3)

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
    
    # Título Principal (Compacto)
    pdf.set_font('helvetica', 'B', 14)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 8, clean_html(phase.get('title', '')), ln=True)
    pdf.set_font('helvetica', 'I', 10)
    pdf.cell(0, 6, clean_html(phase.get('subtitle', '')), ln=True)
    pdf.ln(2)

    # Info Estudiante (Compacto)
    if 'studentInfo' in phase:
        info = phase['studentInfo']
        pdf.set_font('helvetica', 'B', 9)
        pdf.set_text_color(0, 0, 0)
        pdf.cell(0, 5, f"Alumno: {clean_html(info.get('alumno'))} | Fecha: {clean_html(info.get('fecha'))}", ln=True)
        pdf.ln(1)
        if phase_id == 'fase1': render_evolution_brief(pdf)

    # Motor de Procesamiento de Bloques (REGLA DE ORO)
    for item in phase.get('content', []):
        type = item.get('type')
        
        if type == 'section':
            pdf.set_font('helvetica', 'B', 11) # Reducción
            pdf.set_text_color(0, 51, 102)
            pdf.cell(0, 8, clean_html(item.get('title', '')), ln=True)
            if item.get('subtitle'):
                pdf.set_font('helvetica', 'B', 9)
                pdf.set_text_color(46, 125, 50)
                pdf.cell(0, 6, clean_html(item.get('subtitle')), ln=True)
            
            if item.get('body'):
                pdf.set_font('helvetica', '', 9) # Reducción
                pdf.set_text_color(30, 41, 59)
                pdf.multi_cell(0, 4.5, clean_html(item.get('body')))
            pdf.ln(2)

            # Bloques anidados (REGLA DE ORO)
            if 'blocks' in item:
                for block in item['blocks']:
                    if block['type'] == 'highlight':
                        pdf.set_fill_color(240, 245, 250)
                        pdf.set_font('helvetica', 'B', 10)
                        pdf.cell(0, 7, f" {clean_html(block['title'])}", fill=True, ln=True)
                        pdf.set_font('helvetica', '', 9)
                        pdf.multi_cell(0, 5, clean_html(block['body']))
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
                pdf.set_font('helvetica', '', 9)
                pdf.set_text_color(30, 41, 59)
                for line in item['list']:
                    pdf.set_x(15)
                    pdf.multi_cell(180, 5, f"* {clean_html(line)}")
                pdf.ln(3)

            if 'table' in item: render_table(pdf, item['table'])

        elif type == 'image':
            add_to_gallery(pdf, item.get('src'), item.get('caption'))

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

if __name__ == "__main__":
    v = get_app_version()
    os.makedirs("www-dtic-gema/assets/docs", exist_ok=True)
    generate_pdf('fase1', 'Entregable_Fase_1_Relevamiento.pdf', v)
    generate_pdf('fase2', 'Entregable_Fase_2_Diseño.pdf', v)
