/**
 * layout.js - Sistema Unificado de Navegación dtic-GEMA
 */

const NAV_LINKS = [
    { title: 'Chat en Vivo', icon: 'message-square', path: 'index.html' },
    { title: 'Consignas TP', icon: 'file-text', path: 'servicios/consignas.html' },
    { title: 'Entregable E01', icon: 'clipboard-list', path: 'servicios/e01.html' },
    { title: 'Entregable E02', icon: 'shield-check', path: 'servicios/e02.html' }
];

document.addEventListener('DOMContentLoaded', () => {
    initLayout();
    lucide.createIcons();
});

function initLayout() {
    const appWrapper = document.querySelector('.app-wrapper');
    if (!appWrapper) return;

    // Detectar profundidad del path para ajustar rutas relativas
    const isInSubDir = window.location.pathname.includes('/servicios/');
    const base = isInSubDir ? '../' : '';

    // Renderizar Sidebar si no existe (algunos archivos podrían tenerlo hardcodeado al inicio)
    let sidebar = document.querySelector('.sidebar');
    if (!sidebar) {
        sidebar = document.createElement('aside');
        sidebar.className = 'sidebar';
        appWrapper.prepend(sidebar);
    }

    renderSidebar(sidebar, base);
}

function renderSidebar(sidebar, base) {
    const currentPath = window.location.pathname;

    sidebar.innerHTML = `
        <div class="sidebar-brand">
            <div class="avatar-wrapper" style="margin: 0 auto 10px;">
                <video src="${base}assets/media/gema-01.mp4" autoplay muted playsinline class="header-avatar" id="headerAvatar"></video>
            </div>
            <h2 style="color: var(--text-main); font-size: 1.1rem;">dtic-GEMA</h2>
            <span style="color: var(--text-muted); font-size: 0.7rem; text-transform: uppercase;">v1.1</span>
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
}
