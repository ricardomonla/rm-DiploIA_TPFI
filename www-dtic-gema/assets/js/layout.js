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
    initLayout();
    lucide.createIcons();
});

function initLayout() {
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

    renderSidebar(sidebar, base);
    setupChangelog();
}

function renderSidebar(sidebar, base) {
    const currentPath = window.location.pathname;

    sidebar.innerHTML = `
        <div class="sidebar-brand">
            <div class="avatar-wrapper" style="margin: 0 auto 10px;">
                <video src="${base}assets/video/avatar/gema-01.mp4" autoplay muted playsinline class="header-avatar" id="headerAvatar"></video>
            </div>
            <h2 style="color: var(--text-main); font-size: 1.1rem;">dtic-GEMA</h2>
            <span class="version-badge" style="color: #4facfe; font-size: 0.7rem; text-transform: uppercase; cursor: pointer; font-weight: bold; border: 1px solid rgba(79, 172, 254, 0.3); padding: 2px 8px; border-radius: 10px; background: rgba(79, 172, 254, 0.1);">v1.2</span>
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
        const response = await fetch(`${base}assets/data/changelog.json`);
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
