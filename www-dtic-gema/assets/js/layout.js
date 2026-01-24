/**
 * layout.js - Motor SPA Auto-Generativo dtic-GEMA v1.3
 */

let PROJECT_DATA = {};
let MENU_DATA = [];
let CONTENT_DATA = {};
let LATEST_VERSION = 'v1.0'; // Fallback
let avatarDebounceTimer = null;

document.addEventListener('DOMContentLoaded', async () => {
    loadDependencies();
    await loadData();
    await initLayout();
    lucide.createIcons();
});

function loadDependencies() {
    if (!document.getElementById('html2pdf_script')) {
        const script = document.createElement('script');
        script.id = 'html2pdf_script';
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        document.head.appendChild(script);
    }
}

async function loadData() {
    try {
        const t = Date.now();
        // Primero obtener la versión más reciente
        await fetchLatestVersion(t);

        const [project, menu, content] = await Promise.all([
            fetch(`assets/data/project.json?t=${t}`).then(r => r.json()),
            fetch(`assets/data/menu.json?t=${t}`).then(r => r.json()),
            fetch(`assets/data/content.json?t=${t}`).then(r => r.json())
        ]);

        // Sincronizar versión: El Changelog manda.
        PROJECT_DATA = {
            ...project,
            version: LATEST_VERSION || project.version
        };
        CONTENT_DATA = content;
        MENU_DATA = menu;
    } catch (e) {
        console.error('Error cargando datos:', e);
    }
}

async function fetchLatestVersion(t) {
    try {
        const response = await fetch(`assets/data/changelog.json?t=${t || Date.now()}`);
        if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
                LATEST_VERSION = data[0].version;
            }
        }
    } catch (e) {
        console.error('Error al detectar versión:', e);
    }
}

async function initLayout() {
    const appWrapper = document.querySelector('.app-wrapper');
    if (!appWrapper) return;

    let sidebar = document.querySelector('.sidebar');
    if (!sidebar) {
        sidebar = document.createElement('aside');
        sidebar.className = 'sidebar';
        appWrapper.prepend(sidebar);
    }

    renderSidebar(sidebar);
    setupChangelog();

    // Manejo de rutas SPA simples (hashes)
    window.addEventListener('hashchange', handleRouting);
    handleRouting();
}

function renderSidebar(sidebar) {
    const avatarPath = "assets/img/gema-avatar.png"; // Assuming a default avatar path for the new header structure
    sidebar.innerHTML = `
        <div class="sidebar-header">
            <div class="logo-container">
                <video src="assets/video/avatar/gema-01.mp4" autoplay muted playsinline class="avatar-sidebar" id="headerAvatar" onclick="updateAvatar('gema-01.mp4')"></video>
                <div class="status-dot-sidebar"></div>
            </div>
            <div class="version-tag">${PROJECT_DATA.version}</div>
        </div>
        <nav class="sidebar-nav">
            ${MENU_DATA.map((item, index) => renderMenuItem(item, index + 1)).join('')}
        </nav>
        <div class="sidebar-footer">
            <div class="footer-info">
                <strong>${PROJECT_DATA.projectName}</strong>
                <span>Facultad X</span>
            </div>
            <i data-lucide="shield-check" class="footer-icon"></i>
        </div>
    `;
    lucide.createIcons();
}

function renderMenuItem(item, parentIndex) {
    const videoAttr = item.avatarVideo ? `data-video="${item.avatarVideo}"` : '';

    if (item.type === 'direct') {
        const isActive = (!window.location.hash && item.id === 'chatbot') || window.location.hash === `#${item.id}`;
        return `
            <a href="#${item.id}" class="nav-item ${isActive ? 'active' : ''}" ${videoAttr}>
                <i data-lucide="${item.icon}"></i>
                <span class="bullet-main" style="margin-right: 8px; font-weight: bold; color: inherit;">${parentIndex}</span>
                ${item.title}
            </a>
        `;
    }

    if (item.type === 'parent') {
        const firstChildId = item.children && item.children.length > 0 ? item.children[0].id : '';
        return `
            <div class="nav-group">
                <div class="nav-item parent" onclick="handleParentClick(this, '${item.id}', '${firstChildId}')">
                    <i data-lucide="${item.icon}"></i>
                    <span class="bullet-main" style="margin-right: 8px; font-weight: bold; color: #4facfe;">${parentIndex}</span>
                    ${item.title}
                    <i data-lucide="chevron-down" class="chevron"></i>
                </div>
                <div class="sub-menu">
                    ${item.children.map((child, subIndex) => {
            const childNumber = `${parentIndex}.${subIndex + 1}`;
            const childVideo = child.avatarVideo || item.avatarVideo || '';
            const childVideoAttr = childVideo ? `data-video="${childVideo}"` : '';
            return `
                        <div class="nav-group-sub">
                            <div class="nav-item-wrapper" onclick="this.closest('.nav-group-sub').classList.toggle('open');" style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
                                <a href="#${item.id}/${child.id}" class="nav-item sub" ${childVideoAttr} style="flex: 1; pointer-events: auto;">
                                    <span class="bullet" style="margin-right: 8px; font-weight: bold; color: #4facfe;">${childNumber}</span>
                                    ${child.title}
                                </a>
                                ${child.subsections ? `<i data-lucide="chevron-down" class="chevron sub-chevron"></i>` : ''}
                            </div>
                            ${child.subsections ? `
                                <div class="sub-sub-menu">
                                    ${child.subsections.map((subSub, subSubIndex) => `
                                        <a href="#${item.id}/${child.id}/${subSub.id}" class="nav-item sub-sub">
                                            <span class="bullet" style="margin-right: 8px; opacity: 0.6;">${childNumber}.${subSubIndex + 1}</span>
                                            ${subSub.title}
                                        </a>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    `}).join('')}
                </div>
            </div>
        `;
    }
    return '';
}

function handleParentClick(element, parentId, firstChildId) {
    const group = element.parentElement;
    const wasOpen = group.classList.contains('open');

    // Toggle expansión
    group.classList.toggle('open');

    // Navegación: Ir al padre (Punto principal)
    window.location.hash = parentId;
}

function handleRouting() {
    const fullHash = window.location.hash.replace('#', '');
    const segments = fullHash.split('/');
    const pageId = segments[0] || 'consignas';
    const sectionId = segments[1];

    // 1. Limpiar estados previos
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-group, .nav-group-sub').forEach(el => el.classList.remove('open'));

    // 2. Marcar link activo (buscando el hash exacto o el ID base)
    let activeLink = document.querySelector(`a[href="#${fullHash}"]`);
    if (!activeLink && pageId) {
        // Buscar el ítem padre si no hay link directo a la subsección
        activeLink = document.querySelector(`a[href="#${pageId}"]`);
    }

    // Caso especial: Si es una sección raíz (padre), el activeLink podría ser el div.parent
    if (!activeLink && pageId) {
        const parentItem = Array.from(document.querySelectorAll('.nav-item.parent')).find(el => {
            const onclick = el.getAttribute('onclick');
            return onclick && onclick.includes(`'${pageId}'`);
        });
        if (parentItem) activeLink = parentItem;
    }

    if (activeLink) {
        activeLink.classList.add('active');
        // Abrir ancestros para que el menú refleje la posición
        expandParents(activeLink);

        // Si el link activo es un padre o está dentro de un grupo, asegurar que esté abierto
        const group = activeLink.closest('.nav-group');
        if (group) group.classList.add('open');
    }

    // Actualizar Avatar (buscando el atributo data-video en el link activo)
    const videoSrc = activeLink?.getAttribute('data-video');
    if (videoSrc && videoSrc !== 'undefined') {
        updateAvatar(videoSrc);
    }

    if (pageId === 'chatbot') {
        showChatbot();
    } else {
        renderDynamicContent(pageId, sectionId);
    }

    // Sincronizar título de la pestaña con la institución
    document.title = `GEMA Chat - ${PROJECT_DATA.institution}`;
}

function expandParents(element) {
    let parent = element.parentElement;
    while (parent && !parent.classList.contains('sidebar-nav')) {
        if (parent.classList.contains('nav-group') || parent.classList.contains('nav-group-sub')) {
            parent.classList.add('open');
        }
        parent = parent.parentElement;
    }
}

function updateAvatar(videoName) {
    if (avatarDebounceTimer) clearTimeout(avatarDebounceTimer);

    avatarDebounceTimer = setTimeout(() => {
        const video = document.getElementById('headerAvatar');
        if (video && videoName) {
            const newSrc = `assets/video/avatar/${videoName}`;
            if (!video.src.includes(newSrc)) {
                video.style.opacity = '0.7';
                setTimeout(() => {
                    video.src = newSrc;
                    video.style.opacity = '1';
                    video.play();
                }, 150);
            }
        }
    }, 400); // Rango de tiempo para evitar cambios rápidos
}

function showChatbot() {
    const mainContent = document.querySelector('.main-content');
    // Si ya estamos en el chatbot (index.html real), no ocultar nada, 
    // pero en el modo SPA, el index.html es la base.
    // Asumiendo que el HTML del chatbot está en el DOM pero oculto o visible según el hash
    const chatContainer = document.querySelector('.chat-container');
    const existingReport = document.querySelector('.report-container');

    if (chatContainer) chatContainer.style.display = 'flex';
    if (existingReport) existingReport.remove();
}

function renderDynamicContent(id, sectionId) {
    const data = CONTENT_DATA[id];
    if (!data) return;

    // Calcular numeración proactiva comparando con MENU_DATA
    let pageNumber = "";
    MENU_DATA.forEach((item, pIdx) => {
        if (item.id === id) {
            pageNumber = `${pIdx + 1}`;
        } else if (item.children) {
            item.children.forEach((child, cIdx) => {
                if (child.id === id) pageNumber = `${pIdx + 1}.${cIdx + 1}`;
            });
        }
    });

    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) chatContainer.style.display = 'none';

    const mainContent = document.querySelector('.main-content');
    let reportContainer = document.querySelector('.report-container');

    if (!reportContainer) {
        reportContainer = document.createElement('div');
        reportContainer.className = 'report-container';
        mainContent.appendChild(reportContainer);
    }

    reportContainer.innerHTML = `
        <header class="report-header">
            <div>
                <div class="project-mini-header" style="font-size: 0.75rem; color: #4facfe; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; font-weight: bold;">
                    ${PROJECT_DATA.institution} | ${PROJECT_DATA.projectName}
                </div>
                <h1><span style="color: #4facfe; margin-right: 15px;">${pageNumber}</span>${data.title}</h1>
                <p style="color: var(--text-muted); margin-top: 5px;">${data.subtitle}</p>
                <div id="pdfBtnContainer"></div>
            </div>
            <div style="text-align: right;">
                <span class="version-badge" style="background: var(--primary-gradient); color: white; padding: 4px 12px; border-radius: 6px; font-weight: bold; font-size: 0.8rem;">${PROJECT_DATA.version}</span>
            </div>
        </header>

        ${data.studentInfo ? renderStudentInfo(data.studentInfo) : ''}
        
        <div class="dynamic-body">
            ${data.content.map((block, bIdx) => renderBlock(block, pageNumber, bIdx + 1)).join('')}
        </div>

        <footer style="margin-top: 50px; padding-top: 20px; border-top: 1px solid var(--border-glass); text-align: center; font-size: 0.8rem; color: var(--text-muted);">
            Documento de ${PROJECT_DATA.projectName} - ${PROJECT_DATA.institution}
        </footer>
    `;

    // Solo inyectar botón de exportación PDF en la sección de Entregas Finales
    if (id === 'entregas') {
        injectPDFButton(data.version);
    }
    lucide.createIcons();

    // Scroll a sección si existe
    if (sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else {
        window.scrollTo(0, 0);
    }
}

function renderStudentInfo(info) {
    return `
        <section class="student-info" style="margin-bottom: 40px; padding: 20px; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid var(--border-glass);">
            <h2 style="font-size: 1.1rem; margin: 0 0 15px; border: none; padding: 0; color: var(--text-main);">👤 Información del Proyecto y Estudiante</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.9rem;">
                <div><strong>Alumno:</strong> ${info.alumno}</div>
                <div><strong>Área:</strong> ${info.area}</div>
                <div><strong>Fecha:</strong> ${info.fecha}</div>
                <div><strong>Proyecto:</strong> ${info.proyecto}</div>
            </div>
        </section>
    `;
}

function renderBlock(block, pageNumber, blockIndex) {
    const sectionNumber = pageNumber ? `${pageNumber}.${blockIndex}` : "";
    switch (block.type) {
        case 'section':
            return `
                <section ${block.id ? `id="${block.id}"` : ''}>
                    <h2><span style="color: #4facfe; opacity: 0.7; margin-right: 12px; font-size: 0.9em;">${sectionNumber}</span>${block.title}</h2>
                    ${block.subtitle ? `<h3>${block.subtitle}</h3>` : ''}
                    ${block.body ? `<p>${block.body}</p>` : ''}
                    ${block.list ? `<ul class="process-list">${block.list.map(li => `<li>${li}</li>`).join('')}</ul>` : ''}
                    ${block.table ? renderTable(block.table) : ''}
                    ${block.blocks ? block.blocks.map((b, i) => renderBlock(b, sectionNumber, i + 1)).join('') : ''}
                    ${block.footer_action ? renderBlock({ ...block.footer_action, type: 'footer_action' }) : ''}
                    ${block.footer_motto ? `<div style="margin-top: 20px; font-style: italic; color: var(--text-muted); font-size: 0.9rem;">${block.footer_motto}</div>` : ''}
                </section>
            `;
        case 'highlight':
            return `
                <div class="highlight-box">
                    <h4 style="color: #4facfe; margin-bottom: 10px;">${block.title}</h4>
                    ${block.body ? `<p>${block.body}</p>` : ''}
                    ${block.items ? `<ul>${block.items.map(li => `<li>${li}</li>`).join('')}</ul>` : ''}
                </div>
            `;
        case 'table':
            return renderTable(block.table);
        case 'image':
            return `
                <div style="margin: 30px 0; border-radius: 15px; overflow: hidden; border: 1px solid var(--border-glass);">
                    <img src="${block.src}" alt="${block.caption}" style="width: 100%; display: block;">
                    <div style="background: rgba(0,0,0,0.4); padding: 10px 20px; font-size: 0.85rem; color: var(--text-muted);">${block.caption}</div>
                </div>
            `;
        case 'code':
            return `
                <div style="background: #1e293b; padding: 25px; border-radius: 12px; border-left: 4px solid #4facfe; font-family: 'Fira Code', monospace; font-size: 0.9rem; color: #e2e8f0; white-space: pre-wrap;">${block.code}</div>
            `;
        case 'grid':
            return `
                <div class="highlight-box" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    ${block.grid.map(col => `<div>${col[0]}<br>${col[1]}</div>`).join('')}
                </div>
            `;
        case 'footer_action':
            return `
                <div style="margin-top: 40px; text-align: center;">
                    <p style="text-align: center; color: var(--text-muted);">${block.text}</p>
                    <a href="${block.link}" class="nav-item active" style="display: inline-flex; width: auto; margin-top: 10px;" ${block.target ? `target="${block.target}"` : ''}>
                        <i data-lucide="${block.icon}"></i>
                        ${block.label}
                    </a>
                </div>
            `;
        case 'action_item':
            const isJS = block.action.type === 'js';
            return `
                <div class="action-item-card">
                    <div class="action-item-content">
                        <h4>${block.title}</h4>
                        ${block.body ? `<p>${block.body}</p>` : ''}
                    </div>
                    ${isJS ? `
                        <button onclick="${block.action.onclick}" class="nav-item active action-btn" style="border:none; cursor:pointer;">
                            <i data-lucide="${block.action.icon}"></i>
                            ${block.action.label}
                        </button>
                    ` : `
                        <a href="${block.action.link}" class="nav-item active action-btn" ${block.action.target ? `target="${block.action.target}"` : ''}>
                            <i data-lucide="${block.action.icon}"></i>
                            ${block.action.label}
                        </a>
                    `}
                </div>
            `;
        default: return '';
    }
}

function renderTable(table) {
    return `
        <table class="matrix-table">
            <thead>
                <tr>${table.headers.map(h => `<th>${h}</th>`).join('')}</tr>
            </thead>
            <tbody>
                ${table.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
            </tbody>
        </table>
    `;
}

function injectPDFButton(version) {
    const container = document.getElementById('pdfBtnContainer');
    if (!container) return;

    const btn = document.createElement('button');
    btn.id = 'btnPDF';
    btn.className = 'nav-item active';
    btn.style.cssText = 'font-size: 0.8rem; padding: 6px 12px; border: none; cursor: pointer; width: auto; display: inline-flex; margin-top: 15px;';
    btn.innerHTML = `<i data-lucide="file-down"></i> Descargar PDF (${LATEST_VERSION})`;

    container.innerHTML = '';
    container.appendChild(btn);
    btn.addEventListener('click', generatePDF);
}

async function generatePDF(forcePageId = null, forceFileName = null) {
    // Si se pide una página específica, navegar a ella primero (opcional, o renderizar modo oculto)
    if (forcePageId && typeof forcePageId === 'string') {
        const [pId, sId] = forcePageId.split('/');
        renderDynamicContent(pId, sId);
    }

    const container = document.querySelector('.report-container');
    if (!container) return;

    // 1. Inyectar Cabecera Académica (Avatar GEMA)
    const headerHTML = `
        <div id="pdfHeader" class="pdf-only-header" style="display:none; text-align: center; margin-bottom: 30px; border-bottom: 2px solid #003366; padding-bottom: 20px;">
            <img src="assets/img/avatar/gema-avatar.png" style="width: 80px; height: 80px; margin-bottom: 10px;">
            <h2 style="color: #003366; margin: 0; font-size: 1.6rem; text-transform: uppercase;">Proyecto dtic-GEMA</h2>
            <p style="color: #666; font-size: 0.9rem; margin: 5px 0;">Asistencia Estratégica TIC - Facultad X</p>
        </div>
    `;
    container.insertAdjacentHTML('afterbegin', headerHTML);

    const pdfHeader = document.getElementById('pdfHeader');
    const title = document.querySelector('h1')?.innerText || 'entregable';
    const fileName = forceFileName || `${title.toLowerCase().replace(/[: ]/g, '_')}_gema.pdf`;

    // 2. Activar Modo PDF (Clásico)
    container.classList.add('pdf-mode');
    pdfHeader.style.display = 'block';

    const options = {
        margin: [15, 15, 15, 15],
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
        await html2pdf().set(options).from(container).save();
    } catch (err) {
        console.error('PDF Error:', err);
        alert('Error al generar PDF. Use Ctrl+P.');
    } finally {
        // 3. Revertir cambios
        pdfHeader.remove();
        container.classList.remove('pdf-mode');
        lucide.createIcons();
    }
}

function setupChangelog() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('#mainVersionBadge')) {
            openChangelogModal();
        }
    });
}

async function openChangelogModal() {
    if (document.querySelector('.modal-overlay')) return;
    try {
        const response = await fetch(`assets/data/changelog.json?t=${Date.now()}`);
        const data = await response.json();
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="changelog-modal">
                <div class="changelog-header">
                    <h2>Historial de Versiones</h2>
                    <button class="close-modal"><i data-lucide="x"></i></button>
                </div>
                <div class="changelog-list">
                    ${data.map((item, index) => `
                        <div class="changelog-item">
                            <details ${index === 0 ? 'open' : ''}>
                                <summary><span>${item.version} - ${item.title}</span></summary>
                                <div class="changelog-content">
                                    <p style="font-size: 0.75rem; margin-bottom: 10px; color: #4facfe;">${item.date}</p>
                                    <ul>${item.changes.map(c => `<li>${c}</li>`).join('')}</ul>
                                </div>
                            </details>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        lucide.createIcons();
        setTimeout(() => modal.classList.add('active'), 10);
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
    } catch (e) { console.error(e); }
}
