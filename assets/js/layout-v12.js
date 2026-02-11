/**
 * layout.js - Sistema Unificado de Navegación dtic-GEMA
 */

const NAV_LINKS = [
    { title: 'Chat en Vivo', icon: 'message-square', path: 'index.html' },
    { title: 'Consignas TP', icon: 'file-text', path: 'pags/consignas.html' },
    { title: 'Entregable E01', icon: 'clipboard-list', path: 'pags/e01.html' },
    { title: 'Entregable E02', icon: 'shield-check', path: 'pags/e02.html' }
];


document.addEventListener('DOMContentLoaded', () => {
    loadDependencies();
    initLayout();
    lucide.createIcons();
});

function loadDependencies() {
    // Cargar html2pdf.js dinámicamente si no está presente
    if (!document.getElementById('html2pdf_script')) {
        const script = document.createElement('script');
        script.id = 'html2pdf_script';
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        document.head.appendChild(script);
    }
}

async function initLayout() {
    const appWrapper = document.querySelector('.app-wrapper');
    if (!appWrapper) return;

    // Detectar profundidad del path para ajustar rutas relativas
    const isInSubDir = window.location.pathname.includes('/pags/');
    const base = isInSubDir ? '../' : '';

    // Renderizar Sidebar si no existe
    let sidebar = document.querySelector('.sidebar');
    if (!sidebar) {
        sidebar = document.createElement('aside');
        sidebar.className = 'sidebar';
        appWrapper.prepend(sidebar);
    }

    // Obtener la versión más reciente antes de renderizar
    let latestVersion = 'v1.1'; // Fallback
    try {
        const response = await fetch(`${base}assets/data/changelog.json?t=${Date.now()}`);
        if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) latestVersion = data[0].version;
        }
    } catch (e) { console.error('Error auto-detecting version:', e); }

    renderSidebar(sidebar, base, latestVersion);
    setupChangelog();

    // Inyectar botón de PDF en páginas de reporte
    if (document.querySelector('.report-container')) {
        injectPDFButton(latestVersion);
    }
}

function injectPDFButton(version) {
    const reportHeader = document.querySelector('.report-header');
    if (!reportHeader) return;

    // Evitar duplicados
    if (document.getElementById('btnPDF')) return;

    const btnWrapper = document.createElement('div');
    btnWrapper.style.marginTop = '15px';
    btnWrapper.innerHTML = `
        <button id="btnPDF" class="nav-item active" style="font-size: 0.8rem; padding: 6px 12px; border: none; cursor: pointer; width: auto; display: inline-flex;">
            <i data-lucide="file-down"></i>
            Descargar PDF (${version})
        </button>
    `;

    // Insertar después de la descripción en el header
    const headerLeft = reportHeader.querySelector('div:first-child');
    if (headerLeft) {
        headerLeft.appendChild(btnWrapper);
    }

    btnWrapper.querySelector('#btnPDF').addEventListener('click', generatePDF);
}

async function generatePDF() {
    const element = document.querySelector('.report-container');
    const title = document.querySelector('h1')?.innerText || 'entregable';

    // Feedback visual
    const btn = document.getElementById('btnPDF');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="loader"></i> Generando...';
    lucide.createIcons();

    const options = {
        margin: [10, 10, 10, 10],
        filename: `${title.toLowerCase().replace(/ /g, '_')}_gema.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        await html2pdf().set(options).from(element).save();
    } catch (err) {
        console.error('PDF Error:', err);
        alert('Hubo un error al generar el PDF. Por favor, intente con Imprimir (Ctrl+P)');
    } finally {
        btn.innerHTML = originalText;
        lucide.createIcons();
    }
}

function renderSidebar(sidebar, base, version) {
    const currentPath = window.location.pathname;

    sidebar.innerHTML = `
        <div class="sidebar-brand">
            <div class="avatar-wrapper" style="margin: 0 auto 10px;">
                <video src="${base}assets/video/avatar/gema-01.mp4" autoplay muted playsinline class="header-avatar" id="headerAvatar"></video>
            </div>
            <h2 style="color: var(--text-main); font-size: 1.1rem;">dtic-GEMA</h2>
            <span class="version-badge" style="color: #4facfe; font-size: 0.7rem; text-transform: uppercase; cursor: pointer; font-weight: bold; border: 1px solid rgba(79, 172, 254, 0.3); padding: 2px 8px; border-radius: 10px; background: rgba(79, 172, 254, 0.1);">${version}</span>
        </div>
        <nav class="sidebar-nav">
            ${NAV_LINKS.map(link => {
        const fullPath = base + link.path;
        const isActive = currentPath.endsWith(link.path) || (currentPath.endsWith('/') && link.path === 'index.html');
        return `
                    <a href="${fullPath}" class="nav-item ${isActive ? 'active' : ''}">
                        <i data-lucide="${link.icon}"></i>
                        ${link.title}
                    </a>
                `;
    }).join('')}
        </nav>
        
        <div style="margin-top: auto; padding-top: 20px; border-top: 1px solid var(--border-glass); font-size: 0.75rem; color: var(--text-muted); text-align: center;">
            Lic. Ricardo Monla<br>UTN FRLR © 2026
        </div>
    `;
    lucide.createIcons();
}

function setupChangelog() {
    // Usar delegación de eventos para mayor robustez
    document.addEventListener('click', (e) => {
        if (e.target.closest('.version-badge')) {
            openChangelogModal();
        }
    });
}

async function openChangelogModal() {
    // Si ya hay un modal abierto, no abrir otro
    if (document.querySelector('.modal-overlay')) return;

    // Detectar profundidad del path para ajustar rutas relativas
    const isInSubDir = window.location.pathname.includes('/pags/');
    const base = isInSubDir ? '../' : '';

    try {
        // Cache busting dinámico
        const response = await fetch(`${base}assets/data/changelog.json?t=${Date.now()}`);
        if (!response.ok) throw new Error('No se pudo cargar el historial');
        const changelogData = await response.json();

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="changelog-modal">
                <div class="changelog-header">
                    <h2>Historial de Versiones</h2>
                    <button class="close-modal"><i data-lucide="x"></i></button>
                </div>
                <div class="changelog-list">
                    ${changelogData.map((item, index) => `
                        <div class="changelog-item">
                            <details ${index === 0 ? 'open' : ''}>
                                <summary>
                                    <span>${item.version} - ${item.title}</span>
                                </summary>
                                <div class="changelog-content">
                                    <p style="font-size: 0.75rem; margin-bottom: 10px; color: #4facfe;">${item.date}</p>
                                    <ul>
                                        ${item.changes.map(change => `<li>${change}</li>`).join('')}
                                    </ul>
                                </div>
                            </details>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        lucide.createIcons();

        // Animar entrada
        setTimeout(() => modal.classList.add('active'), 10);

        const close = () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        };

        modal.querySelector('.close-modal').addEventListener('click', close);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) close();
        });

    } catch (error) {
        console.error('Changelog Error:', error);
        alert('Lo sentimos, no se pudo cargar el historial de versiones en este momento.');
    }
}
