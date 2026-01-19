/* portal-entregables/assets/js/layout.js */

document.addEventListener('DOMContentLoaded', () => {
    renderSidebar();
    renderFooter();
});

function renderSidebar() {
    const sidebarRoot = document.getElementById('sidebar-root');
    if (!sidebarRoot) return;

    // Determinar si estamos en consignas.html para personalizar el ToC
    const isConsignas = window.location.pathname.includes('consignas.html');

    // Contenido del ToC variable
    let tocContent = '';
    if (isConsignas) {
        tocContent = `
            <div class="toc-container">
                <p class="toc-header">Documento</p>
                <ul class="toc-list">
                    <li><a href="assets/docs/consigna_tp.pdf" download class="toc-link">↓ Descargar PDF</a></li>
                </ul>
            </div>
        `;
    } else {
        tocContent = `
            <div class="toc-container">
                <p class="toc-header">En esta página</p>
                <ul class="toc-list" id="tocList">
                    <!-- Se generará dinámicamente por navigation.js -->
                </ul>
            </div>
        `;
    }

    // HTML del Sidebar
    const sidebarHTML = `
        <aside class="sidebar no-print">
            <div class="sidebar-profile">
                <div class="avatar-container">
                    <video src="assets/img/avatar/dtic-GEMA_01.mp4" class="sidebar-avatar" autoplay muted playsinline></video>
                </div>
                <div class="profile-name">dtic-GEMA</div>
                <div class="profile-title">Entidad de Asistencia Virtual</div>
            </div>
            <nav class="sidebar-nav">
                <a href="index.html" class="sidebar-nav-item">Portal Principal</a>
                <a href="consignas.html" class="sidebar-nav-item">Consignas TP Final</a>
                <a href="e01.html" class="sidebar-nav-item">Entregable E01</a>
                <a href="e02.html" class="sidebar-nav-item">Entregable E02</a>
                <a href="e03.html" class="sidebar-nav-item">Entregable E03</a>
            </nav>
            ${tocContent}
        </aside>
    `;

    sidebarRoot.innerHTML = sidebarHTML;

    // Marcar activo después de insertar
    highlightActiveLink();
}

function renderFooter() {
    const footerRoot = document.getElementById('footer-root');
    if (!footerRoot) return;

    const currentYear = new Date().getFullYear(); // Dinámico por si acaso, o fijo Enero 2026

    // Estandarización del Footer
    footerRoot.innerHTML = `
        <footer>
            <p>dtic-GEMA | Lic. Ricardo Monla | DiploIA TP Final | Enero 2026</p>
        </footer>
    `;
}

function highlightActiveLink() {
    const currentPath = window.location.pathname;
    // Si es raíz (/) o index.html, machear index.html
    // Simplificación: buscar href que esté contenido en el path

    const navItems = document.querySelectorAll('.sidebar-nav-item');
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        // Lógica básica de active
        if (currentPath.includes(href) || (currentPath.endsWith('/') && href === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}
