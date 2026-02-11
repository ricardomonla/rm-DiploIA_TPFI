/**
 * navigation.js - Motor de Navegación Centralizado dtic-GEMA
 * Versión Simplificada con Resolución de Slugs (v1.6.4)
 */

/**
 * Control central de rutas SPA (Hash-based).
 * Sincroniza el contenido y el estado visual del sidebar.
 */
function handleRouting() {
    const fullHash = window.location.hash.replace('#', '');
    const segments = fullHash.split('/');
    const rawPath = segments[0] || 'consignas';
    const sectionId = segments[1];

    // 1. Resolver el ID real de la página a partir del Slug (path)
    // Esto es crítico cuando el 'path' es 'entregas' pero el id de contenido es 'entregables'
    const menuItem = (typeof MENU_DATA !== 'undefined')
        ? MENU_DATA.find(m => m.path === rawPath || m.id === rawPath)
        : null;

    const pageId = menuItem ? menuItem.id : rawPath;

    // 2. Limpiar estados previos en el sidebar
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

    // 3. Marcar link activo (Nivel 1)
    // Buscamos el enlace que represente a este hito (usando el slug original para el href)
    const displaySlug = menuItem ? (menuItem.path || menuItem.id) : rawPath;
    const activeLink = document.querySelector(`.sidebar-nav a[href="#${displaySlug}"]`);

    if (activeLink) {
        activeLink.classList.add('active');
    }

    // 4. Actualizar Avatar (global)
    const videoSrc = activeLink?.getAttribute('data-video');
    if (typeof updateAvatar === 'function' && videoSrc && videoSrc !== 'undefined') {
        updateAvatar(videoSrc);
    }

    // 5. Renderizar lógica de vista
    if (pageId === 'chatbot') {
        if (typeof showChatbot === 'function') showChatbot();
    } else {
        if (typeof renderDynamicContent === 'function') renderDynamicContent(pageId, sectionId);
    }

    // 6. Sincronizar título
    document.title = `dtic-GEMA TPFI`;
}

/**
 * Obtiene la lista plana de navegación secuencial (Nivel 1).
 */
function getFlatNavigation() {
    if (typeof MENU_DATA === 'undefined') return [];
    return MENU_DATA.map(item => ({
        id: item.id,
        title: item.title,
        path: item.path || item.id,
        external: item.external,
        url: item.url
    }));
}

/**
 * Genera los botones de navegación "Anterior" y "Siguiente".
 */
function renderNavigation(currentId, position) {
    const nav = getFlatNavigation();
    if (nav.length === 0) return '';

    // Encontrar el índice usando ID o Path
    let idx = nav.findIndex(n => n.id === currentId || n.path === currentId);
    if (idx === -1) return '';

    const prev = nav[idx - 1];
    const next = nav[idx + 1];

    if (position === 'top' && prev) {
        const targetPath = prev.path || prev.id;
        // Check if previous is external (unlikely for top nav but good practice)
        if (prev.external) {
            return `
                <div class="nav-auto-top">
                    <a href="${prev.url}" class="nav-sutil-btn prev" target="_blank">
                        <i data-lucide="chevron-left"></i>
                        <span>Volver a <strong>${prev.title}</strong></span>
                        <i data-lucide="external-link" style="width: 14px; margin-left: 5px; opacity: 0.5;"></i>
                    </a>
                </div>
            `;
        }
        return `
            <div class="nav-auto-top">
                <a href="#${targetPath}" class="nav-sutil-btn prev" onclick="handleNavClick(event, '${targetPath}')">
                    <i data-lucide="chevron-left"></i>
                    <span>Volver a <strong>${prev.title}</strong></span>
                </a>
            </div>
        `;
    }

    if (position === 'bottom' && next) {
        const targetPath = next.path || next.id;

        if (next.external || next.id === 'chatbot') {
            return `
                <div class="nav-auto-bottom">
                    <a href="${next.url || 'www-dtic-gema/index.html'}" class="nav-sutil-btn next" target="_blank">
                        <span>Ir al Aplicativo <strong>${next.title}</strong></span>
                        <i data-lucide="external-link" style="width: 16px; margin-left: 5px;"></i>
                    </a>
                </div>
            `;
        }

        return `
            <div class="nav-auto-bottom">
                <a href="#${targetPath}" class="nav-sutil-btn next" onclick="handleNavClick(event, '${targetPath}')">
                    <span>Continuar a <strong>${next.title}</strong></span>
                    <i data-lucide="chevron-right"></i>
                </a>
            </div>
        `;
    }
    return '';
}

/**
 * Puente de eventos: Captura clics en botones de navegación y sincroniza el sidebar.
 */
function handleNavClick(event, targetId) {
    event.preventDefault();
    window.location.hash = targetId;
}
