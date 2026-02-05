/**
 * chatbot.js - Lógica de Interacción GEMA v1.8.1 (Dynamic DOM Support)
 */

// Configuración
const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/tosnfu28xcpf5cty3p1y807ci7rpg4qd';
const AVATAR_PATH = 'assets/video/avatar/';
const AVATAR_FILES = ['gema-00.mp4', 'gema-01.mp4', 'gema-02.mp4', 'gema-03.mp4', 'gema-04.mp4', 'gema-05.mp4'];
const SUGGESTIONS = [
    "¿Cómo saco mi certificado?",
    "¿Dónde está mi legajo?",
    "Horarios de atención TIC",
    "¿Cómo cambio mi contraseña?"
];

// Gestión de Sesión v1.9
const getSessionId = () => {
    let sid = localStorage.getItem('gema_session_id');
    if (!sid) {
        sid = 'sess_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('gema_session_id', sid);
    }
    return sid;
};

// Estado Global v1.9
let userProfile = null;

// Callback de Google Identity
window.handleCredentialResponse = (response) => {
    try {
        const payload = JSON.parse(atob(response.credential.split('.')[1]));
        userProfile = {
            name: payload.name,
            email: payload.email,
            verified: payload.email_verified
        };
        // v1.9.4: Persistencia
        localStorage.setItem('gema_user_profile', JSON.stringify(userProfile));

        console.log("dtic-GEMA: Usuario autenticado", userProfile);
        updateUIForAuthenticatedUser();

        // v1.9: Iniciar handshake proactivo
        initHandshake();
    } catch (e) {
        console.error("Error al decodificar token", e);
    }
};

// v1.9.4: Restaurar sesión persistente
const restoreSession = () => {
    const storedProfile = localStorage.getItem('gema_user_profile');
    if (storedProfile) {
        try {
            userProfile = JSON.parse(storedProfile);
            console.log("dtic-GEMA: Sesión restaurada", userProfile);
            updateUIForAuthenticatedUser();
            unlockChatInterface();
        } catch (e) {
            console.error("Error restaurando sesión", e);
            localStorage.removeItem('gema_user_profile');
        }
    }
};

function unlockChatInterface() {
    // 1. Mostrar Sugerencias
    const suggestedQuestionsContainer = document.getElementById('suggestedQuestions');
    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');

    if (suggestedQuestionsContainer && chatForm && userInput) {
        renderSuggestions(suggestedQuestionsContainer, chatForm, userInput);
    }

    // 2. Actualizar mensaje de bienvenida (Opcional, o dejar el historial como está)
    // appendMessage('bot', `¡Gracias ${userProfile.name}! Ahora sí, ¿en qué puedo ayudarte?`);

    // 3. Habilitar input si estuviera deshabilitado (no es el caso actual pero buena práctica)
}

async function initHandshake() {
    unlockChatInterface(); // Desbloquear UI

    console.log("dtic-GEMA: Iniciando Handshake proactivo...");
    // Simulamos un submit con el mensaje 'INIT'
    sendToWebhook("INIT");
}

function updateUIForAuthenticatedUser() {
    const loginBtn = document.querySelector('.g_id_signin');
    // const manualEmail = document.getElementById('manualEmailGroup'); // Ya no existen en el DOM visual
    // const manualDNI = document.getElementById('manualDNIGroup'); // Ya no existen en el DOM visual
    const userInfo = document.getElementById('userInfoDisplay');
    const nameDisplay = document.getElementById('userNameDisplay');
    const emailDisplay = document.getElementById('userEmailDisplay');

    // Hidden inputs
    const emailInput = document.getElementById('userEmail');
    const dniInput = document.getElementById('userDNI'); // Google no da DNI, quedará vacío o se pedirá después

    if (loginBtn) loginBtn.style.display = 'none';

    // Mostrar info de sesión
    if (userInfo) userInfo.style.display = 'flex';
    if (nameDisplay) nameDisplay.textContent = userProfile.name;
    if (emailDisplay) emailDisplay.textContent = userProfile.email;

    if (emailInput) emailInput.value = userProfile.email;
    // dniInput.value se mantiene vacío o manual si hubiese lógica para ello
}

window.handleSignout = () => {
    google.accounts.id.disableAutoSelect();
    userProfile = null;
    userProfile = null;
    localStorage.removeItem('gema_session_id'); // Opcional: limpiar sesión local o mantenerla
    localStorage.removeItem('gema_user_profile'); // v1.9.4: Limpiar perfil persistente

    // Reset UI
    const loginBtn = document.querySelector('.g_id_signin');
    const userInfo = document.getElementById('userInfoDisplay');
    const suggestions = document.getElementById('suggestedQuestions');
    const userInput = document.getElementById('userInput');

    if (loginBtn) loginBtn.style.display = 'block';
    if (userInfo) userInfo.style.display = 'none';
    if (suggestions) suggestions.innerHTML = ''; // Limpiar sugerencias
    if (userInput) userInput.placeholder = "GEMA v1.9 Activa"; // Reset placeholder

    // Reset Chat message
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.innerHTML = ''; // Clear history

        // Restore Initial Greeting
        const initialMsg = `¡Hola! Soy **GEMA**, el Asistente Estratégico de la Dirección de TIC.
        <br><br>
        Antes de iniciar, necesito confirmar que sos una persona real. Por favor, <strong>inicia sesión con Google</strong> para continuar.`;

        appendMessage('bot', initialMsg);
    }
    console.log("dtic-GEMA: Usuario deslogueado y chat reiniciado.");
};

// Estado global del chat (no persistente por ahora)
let chatInitialized = false;

// Observador para detectar cuando el chat se inyecta en el DOM
const observer = new MutationObserver((mutations) => {
    const chatForm = document.getElementById('chatForm');
    if (chatForm && !chatInitialized) {
        initChatbot(chatForm);
    }
});

// Iniciar observación
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('.main-content') || document.body;
    observer.observe(mainContent, { childList: true, subtree: true });

    // Intento inicial por si ya está cargado
    const chatForm = document.getElementById('chatForm');
    if (chatForm) initChatbot(chatForm);

    restoreSession(); // v1.9.4
});

function initChatbot(formElement) {
    if (chatInitialized) return;
    chatInitialized = true;
    console.log("Chatbot v1.9: Initializing...");

    const userInput = document.getElementById('userInput');
    const clearChatBtn = document.getElementById('clearChat');
    const suggestedQuestionsContainer = document.getElementById('suggestedQuestions');

    // Señal visual de sistema activo
    if (userInput) userInput.placeholder = "GEMA v1.9 Activa";

    // Renderizar sugerencias SOLO si ya está logueado (raro en init, pero posible si persistimos sesión)
    if (userProfile) {
        renderSuggestions(suggestedQuestionsContainer, formElement, userInput);
    } else {
        // Asegurar que estén vacías si no hay login
        if (suggestedQuestionsContainer) suggestedQuestionsContainer.innerHTML = '';
    }

    // Listener de Limpiar Chat
    if (clearChatBtn) {
        clearChatBtn.replaceWith(clearChatBtn.cloneNode(true)); // Limpiar listeners viejos
        document.getElementById('clearChat').addEventListener('click', clearChat);
    }

    // Listener de Envío
    formElement.addEventListener('submit', (e) => handleChatSubmit(e, userInput, formElement));
}

function handleChatSubmit(e, userInput, form) {
    e.preventDefault();
    if (!userInput) return;

    const message = userInput.value.trim();
    if (!message) return;

    // UI Updates
    appendMessage('user', message);
    userInput.value = '';

    const suggestions = document.getElementById('suggestedQuestions');
    if (suggestions) suggestions.style.display = 'none';

    updateHeaderAvatar();
    showTyping(true);
    const thinkingMsgHtml = appendSystemMessage("GEMA está pensando la respuesta...");

    // Timeout Logic
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
        appendSystemMessage("Tiempo de espera agotado (15s).");
        showTyping(false);
    }, 15000);

    sendToWebhook(message, controller, timeoutId, thinkingMsgHtml);
}

function sendToWebhook(message, controller = null, timeoutId = null, thinkingMsg = null) {
    if (!controller) controller = new AbortController();

    // Prepare Payload
    const emailInput = document.getElementById('userEmail');
    const dniInput = document.getElementById('userDNI');
    const email = emailInput ? emailInput.value : '';
    const dni = dniInput ? dniInput.value : '';

    // v1.9-dev: Google Login Guard
    if (!userProfile) {
        if (timeoutId) clearTimeout(timeoutId);
        showTyping(false);

        // Si teníamos un mensaje de "pensando", lo actualizamos con la advertencia
        if (thinkingMsg) {
            updateMessageContent(thinkingMsg, "Antes de iniciar, necesito confirmar que sos una persona real. Por favor, inicia sesión con Google para continuar.");
        } else {
            appendMessage('bot', "Antes de iniciar, necesito confirmar que sos una persona real. Por favor, inicia sesión con Google para continuar.");
        }

        // Highlight Login Button (Visual Feedback)
        const loginBtn = document.querySelector('.g_id_signin');
        if (loginBtn) {
            loginBtn.style.border = "2px solid #00f2ff";
            loginBtn.style.boxShadow = "0 0 15px #00f2ff";
            setTimeout(() => {
                loginBtn.style.border = "";
                loginBtn.style.boxShadow = "";
            }, 3000);
        }
        return;
    }

    if (!email.includes('@')) {
        if (timeoutId) clearTimeout(timeoutId);
        showTyping(false);
        const errorText = "Por favor, ingresa un email válido o inicia sesión con Google.";
        if (thinkingMsg) updateMessageContent(thinkingMsg, errorText);
        else appendMessage('bot', errorText);
        return;
    }

    // Payload v1.9.3 (Proactivo & Enriquecido)
    const payload = {
        email,
        dni,
        session_id: getSessionId(),
        user_name: userProfile ? userProfile.name : 'Usuario',
        is_verified: !!userProfile,
        descripcion: message,
        fuente: "Chatbot GEMA v1.9-Dev-Proactive",
        // Metadata para ruteo inteligente en Make
        meta: {
            intent: message === 'INIT' ? 'handshake' : 'user_query',
            client_timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent
        }
    };

    // Fetch
    fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Format': 'structured'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
    })
        .then(async response => {
            clearTimeout(timeoutId);
            if (response.ok) {
                const text = await response.text();
                let data = {};
                let isJson = false;

                try {
                    data = JSON.parse(text);
                    isJson = true;
                } catch (e) { /* No es JSON */ }

                let botMsg = "";
                if (isJson) {
                    // Soporte para esquema proactivo v1.9 (data.response) y legacy (data.mensaje)
                    botMsg = data.response || data.mensaje || data.text || "Mensaje recibido.";

                    // Manejo de metadatos v1.9
                    if (data.meta && data.meta.intent === 'status_check') {
                        // Podríamos agregar un icono de lupa o similar acá
                    }
                } else {
                    botMsg = text || "Mensaje recibido.";
                }

                // Actualizar el mensaje de "Pensando..." con la respuesta final
                if (thinkingMsg) {
                    updateMessageContent(thinkingMsg, botMsg);
                } else {
                    appendMessage('bot', botMsg);
                }

                updateHeaderAvatar();
            } else {
                const errorMsg = "Error en el servidor de IA.";
                appendSystemMessage(`Error servidor: ${response.status}`);

                if (thinkingMsg) updateMessageContent(thinkingMsg, errorMsg);
                else appendMessage('bot', errorMsg);
            }
        })
        .catch(error => {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') return; // Handled by timeout
            console.error(error);
            // appendSystemMessage(`Error de red: ${error.message}`); // Opcional mostrar error técnico

            const connErrorMsg = "Problema de conexión.";
            if (thinkingMsg) updateMessageContent(thinkingMsg, connErrorMsg);
            else appendMessage('bot', connErrorMsg);
        })
        .finally(() => {
            showTyping(false);
        });
}

function renderSuggestions(container, form, input) {
    if (!container) return;
    container.innerHTML = '';
    SUGGESTIONS.forEach(text => {
        const chip = document.createElement('div');
        chip.className = 'suggestion-chip';
        chip.textContent = text;
        chip.onclick = () => {
            if (input) input.value = text;
            form.dispatchEvent(new Event('submit'));
        };
        container.appendChild(chip);
    });
}

function clearChat() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages && chatMessages.children.length > 1) {
        chatMessages.innerHTML = '';
        appendMessage('bot', 'Conversación reiniciada.');
    }
}

function updateHeaderAvatar() {
    const headerAvatar = document.getElementById('headerAvatar');
    if (!headerAvatar) return;
    try {
        const randomAvatar = AVATAR_FILES[Math.floor(Math.random() * AVATAR_FILES.length)];
        headerAvatar.src = AVATAR_PATH + randomAvatar;
        headerAvatar.play().catch(() => { });
    } catch (e) { }
}

function appendSystemMessage(text) {
    return appendMessage('bot', `<em>🤖 ${text}</em>`);
}

function updateMessageContent(msgElement, newText) {
    if (!msgElement) return;
    const contentDiv = msgElement.querySelector('.msg-content');
    if (contentDiv) {
        // Preservar timestamp si existe, o regenerarlo
        const now = new Date();
        const timeString = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

        // Detectar si el texto es HTML (ej. <em>) o texto plano
        // Para seguridad simple asumimos texto plano salvo que empiece con <

        // Animación suave de transición (opcional)
        contentDiv.style.opacity = '0';
        setTimeout(() => {
            contentDiv.innerHTML = `${newText}<span class="timestamp">${timeString}</span>`;
            contentDiv.style.opacity = '1';
        }, 150);
    }
}

function appendMessage(role, text) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return null;

    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', role);

    const now = new Date();
    const timeString = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    const avatarHTML = role === 'bot'
        ? `<div class="avatar-msg"><img src="assets/img/avatar/gema-avatar-web.webp" alt="GEMA"></div>`
        : '';

    msgDiv.innerHTML = `${avatarHTML}<div class="msg-content">${text}<span class="timestamp">${timeString}</span></div>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return msgDiv;
}

function showTyping(show) {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) typingIndicator.style.display = show ? 'flex' : 'none';
}
