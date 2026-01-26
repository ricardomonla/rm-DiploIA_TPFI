/**
 * layout.js - Motor SPA Auto-Generativo dtic-GEMA v1.3
 */

let PROJECT_DATA = {};
let MENU_DATA = [];
let CONTENT_DATA = {};
let LATEST_VERSION = 'v1.6.4';
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
                <video src="assets/video/avatar/gema-01.mp4" autoplay muted playsinline class="avatar-sidebar" id="headerAvatar" onclick="openAvatarTheater()"></video>
                <div class="status-dot-sidebar"></div>
            </div>
            <div class="version-tag" id="mainVersionBadge">${PROJECT_DATA.version}</div>
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
    const slug = item.path || item.id;

    // Simplificación drástica: El sidebar solo muestra hitos de Nivel 1
    // La navegación interna se maneja mediante botones en el contenido principal
    const isActive = (!window.location.hash && slug === 'consignas') ||
        window.location.hash.startsWith(`#${slug}`);

    return `
        <a href="#${slug}" class="nav-item ${isActive ? 'active' : ''}" ${videoAttr}>
            <i data-lucide="${item.icon}"></i>
            <span class="bullet-main" style="margin-right: 8px; font-weight: bold; color: inherit;">${parentIndex}</span>
            ${item.title}
        </a>
    `;
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
    const chatContainer = document.querySelector('.chat-container');
    const existingReport = document.querySelector('.report-container');

    if (chatContainer) chatContainer.style.display = 'flex';
    if (existingReport) existingReport.remove();

    // Inyectar botón de volver dinámico en el header del chat
    const headerActions = document.querySelector('.header-actions');
    if (headerActions) {
        // Limpiar botones previos
        const oldBtn = document.getElementById('chatReturnBtn');
        if (oldBtn) oldBtn.remove();

        const nav = getFlatNavigation();
        const idx = nav.findIndex(n => n.id === 'chatbot');
        const prev = nav[idx - 1];

        if (prev) {
            const returnBtn = document.createElement('a');
            returnBtn.id = 'chatReturnBtn';
            returnBtn.href = `#${prev.id}`;
            returnBtn.className = 'nav-sutil-btn prev';
            returnBtn.style = 'margin-right: 20px; text-decoration: none; display: flex; align-items: center; gap: 8px; font-size: 0.85rem;';
            returnBtn.onclick = (e) => handleNavClick(e, prev.id);
            returnBtn.innerHTML = `
                <i data-lucide="chevron-left" style="width: 16px; height: 16px;"></i>
                <span>Volver a <strong>${prev.title}</strong></span>
            `;
            headerActions.prepend(returnBtn);
            lucide.createIcons();
        }
    }
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
                <span class="version-badge version-tag-interactive" style="background: var(--primary-gradient); color: white; padding: 4px 12px; border-radius: 6px; font-weight: bold; font-size: 0.8rem; cursor: pointer;">${PROJECT_DATA.version}</span>
            </div>
        </header>

        ${data.studentInfo ? renderStudentInfo(data.studentInfo) : ''}
        
        <div class="dynamic-body">
            ${renderNavigation(id, 'top')}
            ${data.content.map((block, bIdx) => renderBlock(block, pageNumber, bIdx + 1)).join('')}
            ${renderNavigation(id, 'bottom')}
        </div>

        <footer style="margin-top: 50px; padding-top: 20px; border-top: 1px solid var(--border-glass); text-align: center; font-size: 0.8rem; color: var(--text-muted);">
            Documento de ${PROJECT_DATA.projectName} - ${PROJECT_DATA.institution}
        </footer>
    `;

    // Solo inyectar botón de exportación PDF en la sección de Entregas Finales
    if (id === 'entregas') {
        // Inyectar botón de PDF (Removido en v1.5 por generación estática)
        // injectPDFButton(data.version);
    }
    lucide.createIcons();

    // Scroll a sección si existe
    if (sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) mainContent.scrollTop = 0;
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
            return `
                <div class="action-item-card">
                    <div class="action-item-content">
                        <h4>${block.title}</h4>
                        ${block.body ? `<p>${block.body}</p>` : ''}
                    </div>
                    <a href="${block.action.link || block.action.src}" class="nav-item active action-btn" ${block.action.target ? `target="${block.action.target}"` : ''}>
                        <i data-lucide="${block.action.icon}"></i>
                        ${block.action.label}
                    </a>
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


function setupChangelog() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('#mainVersionBadge') || e.target.closest('.version-tag-interactive')) {
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

let theaterIndex = 0;
const theaterCycle = ['gema-00.mp4', 'gema-01.mp4', 'gema-02.mp4', 'gema-03.mp4', 'gema-04.mp4', 'gema-05.mp4'];

function openAvatarTheater() {
    if (document.querySelector('.theater-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'theater-overlay';
    overlay.innerHTML = `
        <div class="theater-container">
            <button class="close-theater"><i data-lucide="x"></i></button>
            <div class="theater-video-wrapper">
                <video id="theaterVideo" src="assets/video/avatar/${theaterCycle[theaterIndex]}" autoplay playsinline class="theater-video"></video>
            </div>
            <div class="theater-info">
                <h2>Modo Teatro GEMA</h2>
                <p>Monitorización en tiempo real de estados y expresiones coreográficas de la IA.</p>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    lucide.createIcons();

    const video = overlay.querySelector('#theaterVideo');

    // Lógica de Ciclo Infinito
    video.onended = () => {
        theaterIndex = (theaterIndex + 1) % theaterCycle.length;
        video.src = `assets/video/avatar/${theaterCycle[theaterIndex]}`;
        video.play();
    };

    // Controles de Cierre
    const closeTheater = () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 400);
    };

    setTimeout(() => overlay.classList.add('active'), 10);

    overlay.querySelector('.close-theater').onclick = closeTheater;
    overlay.onclick = (e) => { if (e.target === overlay) closeTheater(); };
    window.onkeydown = (e) => { if (e.key === 'Escape') closeTheater(); };
}
