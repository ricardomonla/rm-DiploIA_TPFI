/* portal-entregables/assets/js/navigation.js */

document.addEventListener('DOMContentLoaded', () => {
    const tocList = document.getElementById('tocList');
    const content = document.querySelector('.container section');
    const headers = content.querySelectorAll('h2, h3');
    const sidebarNav = document.querySelector('.sidebar-nav');

    // 1. Marcar el ítem de navegación activo basado en la URL
    const currentPath = window.location.pathname;
    const navItems = sidebarNav.querySelectorAll('.sidebar-nav-item');
    navItems.forEach(item => {
        if (currentPath.includes(item.getAttribute('href'))) {
            item.classList.add('active');
        }
    });

    // 2. Generar ToC basada en los encabezados
    headers.forEach((header, index) => {
        // Crear ID si no existe
        if (!header.id) {
            header.id = `section-${index}`;
        }

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${header.id}`;
        a.textContent = header.textContent.replace(/^\d+\.\s*/, ''); // Limpiar números si existen
        a.classList.add('toc-link');

        if (header.tagName === 'H3') {
            a.classList.add('toc-h3');
        }

        li.appendChild(a);
        tocList.appendChild(li);
    });

    // 3. Resaltar sección activa al hacer scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.toc-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    headers.forEach(header => observer.observe(header));

    // 4. Animación secuencial persistente del avatar
    const avatarVideo = document.querySelector('.sidebar-avatar');
    const STORAGE_KEY = 'dtic-gema-avatar-index';

    // Lista de animaciones disponibles
    const animations = [
        'assets/img/avatar/dtic-GEMA_00.mp4',
        'assets/img/avatar/dtic-GEMA_01.mp4',
        'assets/img/avatar/dtic-GEMA_02.mp4',
        'assets/img/avatar/dtic-GEMA_03.mp4',
        'assets/img/avatar/dtic-GEMA_04.mp4',
        'assets/img/avatar/dtic-GEMA_05.mp4'
    ];

    // Inicializar o recuperar índice
    let animationIndex = parseInt(localStorage.getItem(STORAGE_KEY));
    if (isNaN(animationIndex)) animationIndex = 0;

    // Función para reproducir la animación actual
    const playCurrentAnimation = () => {
        if (!avatarVideo) return;

        // Asegurar que el índice esté dentro de los límites
        if (animationIndex >= animations.length || animationIndex < 0) {
            animationIndex = 0;
        }

        const videoSrc = animations[animationIndex];

        // Actualizar source
        avatarVideo.src = videoSrc;
        avatarVideo.load();

        // Intentar reproducción automática
        const playPromise = avatarVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => {
                // Silenciar error de autoplay si ocurre interacción pendiente
                console.log('Auto-play blocked by browser:', e);
            });
        }
    };

    // Al cargar la página, reproducir la animación correspondiente
    playCurrentAnimation();

    // Al hacer clic en navegación principal, actualizar índice y guardar
    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            // Calcular el siguiente índice
            const nextIndex = (animationIndex + 1) % animations.length;

            // Guardar inmediatamente
            localStorage.setItem(STORAGE_KEY, nextIndex);

            // Actualizar variable local por si la navegación es spa o muy rápida (opcional)
            animationIndex = nextIndex;
        });
    });
});
