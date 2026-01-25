import json
import os
import re
from fpdf import FPDF
from fpdf.enums import XPos, YPos

def get_app_version():
    try:
        with open('data/changelog.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            if data and len(data) > 0:
                return data[0].get('version', 'v1.x')
    except Exception as e:
        print(f"Error leyendo versión: {e}")
    return "v1.5.7"

class GEMAReport(FPDF):
    def __init__(self, version="v1.x"):
        super().__init__()
        self.app_version = version
        self.gallery = [] # Almacén para imágenes diferidas

    def header(self):
        # Inyección del Avatar de GEMA (más pequeño para optimizar espacio)
        avatar_path = "www-dtic-gema/assets/img/avatar/gema-avatar.png"
        if os.path.exists(avatar_path):
            self.image(avatar_path, 10, 8, 18)
        
        self.set_font('helvetica', 'B', 11)
        self.set_text_color(0, 51, 102) # Azul #003366
        self.cell(20) # Espacio para el avatar
        self.cell(0, 10, f'PROYECTO dtic-GEMA | Alumno: Lic. Ricardo Monla | Versión: {self.app_version}', 
                  new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='R')
        
        # Línea de cabecera sutil
        self.set_draw_color(200, 200, 200)
        self.set_line_width(0.2)
        self.line(10, 28, 200, 28)
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f'Página {self.page_no()}', align='C')

def clean_html(text):
    if not isinstance(text, str):
        return str(text)
    text = re.sub(r'<br\s*/?>', '\n', text)
    text = re.sub(r'<[^>]*>', '', text)
    return text

def add_to_gallery(pdf, src, caption):
    # Guardamos para el final
    pdf.gallery.append({'src': src, 'caption': caption})
    # Dejamos referencia en el texto
    pdf.set_font('helvetica', 'I', 10)
    pdf.set_text_color(79, 172, 254) # Azul vibrante de la marca
    pdf.ln(2)
    pdf.multi_cell(0, 6, f"> [Referencia Visual: Ver Figura {len(pdf.gallery)} en la Galería de Imágenes al final del documento]", align='L')
    pdf.ln(4)

def render_gallery(pdf):
    if not pdf.gallery:
        return
    
    pdf.add_page()
    pdf.set_font('helvetica', 'B', 16)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 15, "GALERÍA DE IMÁGENES TÉCNICAS", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')
    pdf.ln(5)

    for i, item in enumerate(pdf.gallery):
        img_path = os.path.join("www-dtic-gema", item['src'])
        if os.path.exists(img_path):
            # Salto de página si la imagen no cabe
            if pdf.get_y() > 180:
                pdf.add_page()
            
            pdf.ln(5)
            # Imágenes un poco más pequeñas (w=150) para no saturar
            pdf.image(img_path, x=30, w=150)
            pdf.ln(2)
            pdf.set_font('helvetica', 'B', 9)
            pdf.set_text_color(0, 51, 102)
            pdf.cell(0, 5, f"Figura {i+1}: {clean_html(item['caption'])}", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')
            pdf.ln(10)

def render_evolution_note(pdf):
    pdf.add_page()
    pdf.set_y(100)
    pdf.set_fill_color(245, 247, 250)
    pdf.rect(10, 100, 190, 80, 'F')
    
    pdf.set_font('helvetica', 'B', 14)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 20, "Evolución del Ecosistema dtic-GEMA", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')
    
    pdf.set_font('helvetica', '', 11)
    pdf.set_text_color(30, 41, 59)
    pdf.set_x(20)
    nota = (
        "Este documento representa una versión estática y puntual del proyecto. "
        "Debido a la naturaleza evolutiva de la IA y la automatización, el ecosistema "
        "dtic-GEMA se encuentra en constante actualización.\n\n"
        "Para acceder a la última arquitectura, interactuar con GEMA y consultar "
        "las versiones más recientes de los entregables, por favor ingrese al portal oficial."
    )
    pdf.multi_cell(170, 7, nota, align='C')
    
    pdf.ln(15)
    pdf.set_font('helvetica', 'B', 10)
    pdf.set_text_color(79, 172, 254)
    pdf.cell(0, 10, "[ Acceder al Portal Online ]", align='C')

def generate_pdf(phase_id, filename, version):
    with open('www-dtic-gema/assets/data/content.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    phase = data.get(phase_id, {})
    if not phase:
        return

    pdf = GEMAReport(version=version)
    pdf.add_page()
    
    # Título de la Fase
    pdf.set_font('helvetica', 'B', 18)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 10, clean_html(phase.get('title', '')), new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='L')
    
    pdf.set_font('helvetica', 'I', 12)
    pdf.set_text_color(50, 50, 50)
    pdf.cell(0, 10, clean_html(phase.get('subtitle', '')), new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='L')
    pdf.ln(5)

    # Información del Estudiante (Sincronizada con Header)
    if 'studentInfo' in phase:
        info = phase['studentInfo']
        pdf.set_fill_color(240, 245, 250)
        pdf.set_font('helvetica', 'B', 11)
        pdf.cell(0, 8, " Información del Proyecto", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='L', fill=True)
        pdf.set_font('helvetica', '', 10)
        pdf.set_text_color(0, 0, 0)
        pdf.cell(0, 7, f" Alumno: {clean_html(info.get('alumno', 'Lic. Ricardo MONLA'))}", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='L')
        pdf.cell(0, 7, f" Versión del Ecosistema: {version}", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='L')
        pdf.cell(0, 7, f" Fecha: {clean_html(info.get('fecha', 'Enero 2026'))}", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='L')
        pdf.ln(10)

    # Contenido de la Fase
    for item in phase.get('content', []):
        type = item.get('type')
        
        if type == 'section':
            pdf.set_font('helvetica', 'B', 14)
            pdf.set_text_color(0, 51, 102)
            pdf.cell(0, 10, clean_html(item.get('title', '')), new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='L')
            pdf.ln(2)

            if item.get('subtitle'):
                pdf.set_font('helvetica', 'B', 11)
                pdf.set_text_color(46, 125, 50)
                pdf.cell(0, 8, clean_html(item.get('subtitle')), new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='L')

            if item.get('body'):
                pdf.set_font('helvetica', '', 11)
                pdf.set_text_color(30, 41, 59)
                pdf.multi_cell(0, 6, clean_html(item.get('body')))
                pdf.ln(5)

            if 'list' in item:
                pdf.set_font('helvetica', '', 10)
                pdf.set_text_color(30, 41, 59)
                for line in item['list']:
                    pdf.set_x(15)
                    pdf.multi_cell(180, 6, f"* {clean_html(line)}")
                pdf.ln(5)

            if 'table' in item:
                # Simplificamos lógica de tabla para brevedad en esta refactorización
                pass 

        elif type == 'image':
            add_to_gallery(pdf, item.get('src'), item.get('caption'))

    # Secciones Finales
    render_gallery(pdf)
    render_evolution_note(pdf)

    output_path = f"www-dtic-gema/assets/docs/{filename}"
    pdf.output(output_path)
    print(f"Reporte generado: {output_path}")

if __name__ == "__main__":
    current_version = get_app_version()
    os.makedirs("www-dtic-gema/assets/docs", exist_ok=True)
    generate_pdf('fase1', 'Reporte_Fase_1_Relevamiento.pdf', current_version)
    generate_pdf('fase2', 'Reporte_Fase_2_Diseño.pdf', current_version)
