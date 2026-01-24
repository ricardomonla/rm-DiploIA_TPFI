import json
import os
import re
from fpdf import FPDF
from fpdf.enums import XPos, YPos

class GEMAReport(FPDF):
    def header(self):
        # Inyección del Avatar de GEMA (si existe)
        avatar_path = "www-dtic-gema/assets/img/avatar/gema-avatar.png"
        if os.path.exists(avatar_path):
            self.image(avatar_path, 10, 8, 25)
        
        self.set_font('helvetica', 'B', 15)
        self.set_text_color(0, 51, 102) # Azul #003366
        self.cell(40) # Espacio para el avatar
        self.cell(0, 10, 'PROYECTO dtic-GEMA', new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')
        
        self.set_font('helvetica', 'I', 10)
        self.set_text_color(100, 100, 100)
        self.cell(40)
        self.cell(0, 5, 'Asistencia Estratégica TIC - Facultad X', new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')
        self.ln(10)
        
        # Línea de cabecera
        self.set_draw_color(0, 51, 102)
        self.set_line_width(0.5)
        self.line(10, 38, 200, 38)
        self.ln(15)

    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f'Página {self.page_no()}', align='C')

def clean_html(text):
    if not isinstance(text, str):
        return str(text)
    # Reemplazar <br> por saltos de línea
    text = re.sub(r'<br\s*/?>', '\n', text)
    # Eliminar cualquier tag HTML remanente
    text = re.sub(r'<[^>]*>', '', text)
    return text

def render_image(pdf, src, caption):
    # La ruta en content.json es relativa a assets, ajustamos para el script
    img_path = os.path.join("www-dtic-gema", src)
    if os.path.exists(img_path):
        # Intentar centrar la imagen
        pdf.ln(5)
        # Ancho máximo de 170mm para no romper márgenes
        pdf.image(img_path, x=20, w=170)
        pdf.ln(2)
        pdf.set_font('helvetica', 'I', 9)
        pdf.set_text_color(100, 100, 100)
        pdf.multi_cell(0, 5, clean_html(caption), align='C')
        pdf.ln(10)
    else:
        print(f"Advertencia: No se encontró la imagen {img_path}")

def generate_pdf(phase_id, filename):
    with open('www-dtic-gema/assets/data/content.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    phase = data.get(phase_id, {})
    if not phase:
        print(f"Error: No se encontró la fase {phase_id}")
        return

    pdf = GEMAReport()
    pdf.add_page()
    
    # Título de la Fase
    pdf.set_font('helvetica', 'B', 18)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 10, clean_html(phase.get('title', '')), new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='L')
    
    pdf.set_font('helvetica', 'I', 12)
    pdf.set_text_color(50, 50, 50)
    pdf.cell(0, 10, clean_html(phase.get('subtitle', '')), new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='L')
    pdf.ln(5)

    # Información del Estudiante
    if 'studentInfo' in phase:
        info = phase['studentInfo']
        pdf.set_fill_color(240, 245, 250)
        pdf.set_font('helvetica', 'B', 11)
        pdf.cell(0, 8, " Información del Proyecto", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='L', fill=True)
        pdf.set_font('helvetica', '', 10)
        pdf.set_text_color(0, 0, 0)
        pdf.cell(0, 7, f" Alumno: {clean_html(info.get('alumno', 'Lic. Ricardo MONLA'))}", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='L')
        pdf.cell(0, 7, f" Área: {clean_html(info.get('area', 'Facultad X'))}", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='L')
        pdf.cell(0, 7, f" Fecha de Versión: {clean_html(info.get('fecha', 'Enero 2026'))}", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='L')
        pdf.ln(10)

    # Contenido de la Fase
    for item in phase.get('content', []):
        type = item.get('type')
        
        if type == 'section':
            # Título de Sección
            pdf.set_font('helvetica', 'B', 14)
            pdf.set_text_color(0, 51, 102)
            pdf.set_draw_color(0, 51, 102)
            pdf.set_line_width(0.3)
            # Dibujar borde inferior manualmente para evitar deprecaciones
            pdf.cell(0, 10, clean_html(item.get('title', '')), new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='L')
            pdf.line(pdf.get_x(), pdf.get_y() - 1, pdf.get_x() + 190, pdf.get_y() - 1)
            pdf.ln(3)

            # Subtítulo de Sección (si tiene)
            if item.get('subtitle'):
                pdf.set_font('helvetica', 'B', 11)
                pdf.set_text_color(46, 125, 50) # Verde académico
                pdf.cell(0, 8, clean_html(item.get('subtitle')), new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='L')
                pdf.ln(1)

            # Cuerpo
            if item.get('body'):
                pdf.set_font('helvetica', '', 11)
                pdf.set_text_color(30, 41, 59)
                pdf.multi_cell(0, 6, clean_html(item.get('body')))
                pdf.ln(5)

            # Bloques Internos (Highlights, Grids, Lists, Images)
            if 'blocks' in item:
                for block in item['blocks']:
                    if block['type'] == 'highlight':
                        pdf.set_fill_color(248, 250, 252)
                        pdf.set_draw_color(0, 51, 102)
                        pdf.set_font('helvetica', 'B', 11)
                        pdf.set_text_color(0, 51, 102)
                        pdf.cell(0, 8, f" {clean_html(block['title'])}", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='L', fill=True)
                        pdf.set_font('helvetica', '', 10)
                        pdf.set_text_color(30, 41, 59)
                        pdf.multi_cell(0, 6, clean_html(block['body']))
                        pdf.ln(5)
                    elif block['type'] == 'image':
                        render_image(pdf, block.get('src'), block.get('caption'))

            # Listas
            if 'list' in item:
                pdf.set_font('helvetica', '', 10)
                pdf.set_text_color(30, 41, 59)
                for line in item['list']:
                    pdf.set_x(15)
                    pdf.multi_cell(180, 6, f"* {clean_html(line)}")
                pdf.ln(5)

            # Tablas
            if 'table' in item:
                table = item['table']
                pdf.set_font('helvetica', 'B', 9)
                pdf.set_fill_color(241, 245, 249)
                pdf.set_text_color(0, 51, 102)
                
                avail_width = 190
                cols = len(table['headers'])
                col_width = avail_width / cols
                
                for h in table['headers']:
                    pdf.cell(col_width, 10, clean_html(h), border=1, align='C', fill=True)
                pdf.ln()
                
                pdf.set_font('helvetica', '', 8)
                pdf.set_text_color(30, 41, 59)
                for row in table['rows']:
                    row_y = pdf.get_y()
                    max_h = 6 # Mínima altura
                    
                    # Cálculo de altura de celda más alta usando el método recomendado
                    for cell in row:
                        cell_lines = pdf.multi_cell(col_width, 6, clean_html(cell), dry_run=True, output="LINES")
                        cell_h = len(cell_lines) * 6
                        if cell_h > max_h: max_h = cell_h
                    
                    # Salto de página preventivo
                    if row_y + max_h > 270:
                        pdf.add_page()
                        row_y = pdf.get_y()

                    for i, cell in enumerate(row):
                        pdf.set_xy(10 + (i * col_width), row_y)
                        content = clean_html(cell)
                        # Multi_cell con altura forzada (max_h) simulada por celdas vacías si es necesario
                        pdf.multi_cell(col_width, 6, content, border=1, align='L')
                        # Ajustar Y para la siguiente fila si multi_cell avanzó demasiado (solo si es la última celda)
                    
                    pdf.set_y(row_y + max_h)

        elif type == 'image':
            render_image(pdf, item.get('src'), item.get('caption'))

    output_path = f"www-dtic-gema/assets/docs/{filename}"
    pdf.output(output_path)
    print(f"Reporte generado: {output_path}")

if __name__ == "__main__":
    os.makedirs("www-dtic-gema/assets/docs", exist_ok=True)
    generate_pdf('fase1', 'Reporte_Fase_1_Relevamiento.pdf')
    generate_pdf('fase2', 'Reporte_Fase_2_Diseño.pdf')
