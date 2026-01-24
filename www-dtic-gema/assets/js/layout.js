/**
 * layout.js - Motor SPA Auto-Generativo dtic-GEMA v1.3
 */

let PROJECT_DATA = {};
let MENU_DATA = [];
let CONTENT_DATA = {};

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
        const [project, menu, content] = await Promise.all([
            fetch(`assets/data/project.json?t=${t}`).then(r => r.json()),
            fetch(`assets/data/menu.json?t=${t}`).then(r => r.json()),
            fetch(`assets/data/content.json?t=${t}`).then(r => r.json())
        ]);
        PROJECT_DATA = project;
        MENU_DATA = menu;
        CONTENT_DATA = content;
    } catch (e) {
        console.error('Error cargando datos:', e);
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
    sidebar.innerHTML = `
        <div class="sidebar-brand">
            <div class="avatar-wrapper" style="margin: 0 auto 10px;">
                <video src="assets/video/avatar/gema-01.mp4" autoplay muted playsinline class="header-avatar" id="headerAvatar"></video>
            </div>
            <h2 style="color: var(--text-main); font-size: 1.1rem;">${PROJECT_DATA.projectName}</h2>
            <span class="version-badge" id="mainVersionBadge" style="color: #4facfe; font-size: 0.7rem; text-transform: uppercase; cursor: pointer; font-weight: bold; border: 1px solid rgba(79, 172, 254, 0.3); padding: 2px 8px; border-radius: 10px; background: rgba(79, 172, 254, 0.1);">${PROJECT_DATA.version}</span>
        </div>
        <nav class="sidebar-nav">
            ${MENU_DATA.map((item, index) => renderMenuItem(item, index + 1)).join('')}
        </nav>
        <div style="margin-top: auto; padding-top: 20px; border-top: 1px solid var(--border-glass); font-size: 0.75rem; color: var(--text-muted); text-align: center;">
            ${PROJECT_DATA.student.name}<br>${PROJECT_DATA.institution} © 2026
        </div>
    `;
    lucide.createIcons();
}

function renderMenuItem(item, index) {
    if (item.type === 'direct') {
        const isActive = (!window.location.hash && item.id === 'chatbot') || window.location.hash === `#${item.id}`;
        return `
            <a href="#${item.id}" class="nav-item ${isActive ? 'active' : ''}" data-video="${item.avatarVideo}">
                <i data-lucide="${item.icon}"></i>
                ${item.title}
            </a>
        `;
    }

    if (item.type === 'parent') {
        const hasActiveChild = item.children.some(child => window.location.hash === `#${child.id}`);
        return `
            <div class="nav-group ${hasActiveChild ? 'open' : ''}">
                <div class="nav-item parent" onclick="this.parentElement.classList.toggle('open')">
                    <i data-lucide="${item.icon}"></i>
                    ${item.title}
                    <i data-lucide="chevron-down" class="chevron"></i>
                </div>
                <div class="sub-menu">
                    ${item.children.map((child, subIndex) => `
                        <a href="#${child.id}" class="nav-item sub ${window.location.hash === `#${child.id}` ? 'active' : ''}" data-video="${child.avatarVideo}">
                            <span class="bullet">${index}.${subIndex + 1}</span>
                            ${child.title}
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }
    return '';
}

function handleRouting() {
    const hash = window.location.hash.replace('#', '') || 'chatbot';
    const mainContent = document.querySelector('.main-content');

    // Actualizar estados de navegación
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const activeLink = document.querySelector(`a[href="#${hash}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
        // Actualizar Avatar Reactivo
        const videoSrc = activeLink.getAttribute('data-video');
        updateAvatar(videoSrc);
    }

    if (hash === 'chatbot') {
        showChatbot();
    } else {
        renderDynamicContent(hash);
    }
}

function updateAvatar(videoName) {
    const video = document.getElementById('headerAvatar');
    if (video && videoName) {
        const newSrc = `assets/video/avatar/${videoName}`;
        if (!video.src.includes(newSrc)) {
            video.src = newSrc;
            video.play();
        }
    }
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

function renderDynamicContent(id) {
    const data = CONTENT_DATA[id];
    if (!data) return;

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
                <h1>${data.title}</h1>
                <p style="color: var(--text-muted); margin-top: 5px;">${data.subtitle}</p>
                <div id="pdfBtnContainer"></div>
            </div>
            <div style="text-align: right;">
                <span class="version-badge" style="background: var(--primary-gradient); color: white; padding: 4px 12px; border-radius: 6px; font-weight: bold; font-size: 0.8rem;">${data.version}</span>
            </div>
        </header>

        ${data.studentInfo ? renderStudentInfo(data.studentInfo) : ''}
        
        <div class="dynamic-body">
            ${data.content.map(block => renderBlock(block)).join('')}
        </div>

        <footer style="margin-top: 50px; padding-top: 20px; border-top: 1px solid var(--border-glass); text-align: center; font-size: 0.8rem; color: var(--text-muted);">
            Documento de ${PROJECT_DATA.projectName} - ${PROJECT_DATA.institution}
        </footer>
    `;

    injectPDFButton(data.version);
    lucide.createIcons();
    window.scrollTo(0, 0);
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

function renderBlock(block) {
    switch (block.type) {
        case 'section':
            return `
                <section>
                    <h2>${block.title}</h2>
                    ${block.subtitle ? `<h3>${block.subtitle}</h3>` : ''}
                    ${block.body ? `<p>${block.body}</p>` : ''}
                    ${block.list ? `<ul class="process-list">${block.list.map(li => `<li>${li}</li>`).join('')}</ul>` : ''}
                    ${block.table ? renderTable(block.table) : ''}
                    ${block.blocks ? block.blocks.map(b => renderBlock(b)).join('') : ''}
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
                    <a href="${block.link}" class="nav-item active" style="display: inline-flex; width: auto; margin-top: 10px;">
                        <i data-lucide="${block.icon}"></i>
                        ${block.label}
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

function injectPDFButton(version) {
    const container = document.getElementById('pdfBtnContainer');
    if (!container) return;

    const btn = document.createElement('button');
    btn.id = 'btnPDF';
    btn.className = 'nav-item active';
    btn.style.cssText = 'font-size: 0.8rem; padding: 6px 12px; border: none; cursor: pointer; width: auto; display: inline-flex; margin-top: 15px;';
    btn.innerHTML = `<i data-lucide="file-down"></i> Descargar PDF (${version})`;

    container.innerHTML = '';
    container.appendChild(btn);
    btn.addEventListener('click', generatePDF);
}

async function generatePDF() {
    const element = document.querySelector('.report-container');
    const title = document.querySelector('h1')?.innerText || 'entregable';
    const btn = document.getElementById('btnPDF');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i data-lucide="loader"></i> Generando...';
    lucide.createIcons();

    const options = {
        margin: [10, 10, 10, 10],
        filename: `${title.toLowerCase().replace(/[: ]/g, '_')}_gema.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        await html2pdf().set(options).from(element).save();
    } catch (err) {
        console.error('PDF Error:', err);
        alert('Error al generar PDF. Use Ctrl+P.');
    } finally {
        btn.innerHTML = originalText;
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
