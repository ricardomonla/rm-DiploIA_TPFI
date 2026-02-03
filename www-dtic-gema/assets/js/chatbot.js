/**
 * chatbot.js - Lógica de Interacción GEMA v1.8.1 (Dynamic DOM Support)
 */

// Configuración
const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/yl26qec8u2lric3yr17krrtiaxws5rkr';
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
        console.log("dtic-GEMA: Usuario autenticado", userProfile);
        updateUIForAuthenticatedUser();
        appendMessage('bot', `¡Hola **${userProfile.name}**! Qué bueno tenerte acá. Ahora que verifiqué tu identidad, ¿en qué te puedo ayudar?`);
    } catch (e) {
        console.error("Error al decodificar token", e);
    }
};

function updateUIForAuthenticatedUser() {
    const loginBtn = document.querySelector('.g_id_signin');
    const manualEmail = document.getElementById('manualEmailGroup');
    const manualDNI = document.getElementById('manualDNIGroup');
    const userInfo = document.getElementById('userInfoDisplay');
    const nameDisplay = document.getElementById('userNameDisplay');
    const emailInput = document.getElementById('userEmail');

    if (loginBtn) loginBtn.style.display = 'none';
    if (manualEmail) manualEmail.style.display = 'none';
    if (manualDNI) manualDNI.style.display = 'none';
    if (userInfo) userInfo.style.display = 'flex';
    if (nameDisplay) nameDisplay.textContent = userProfile.name;
    if (emailInput) emailInput.value = userProfile.email;
}

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
});

function initChatbot(formElement) {
    if (chatInitialized) return;
    chatInitialized = true;
    console.log("Chatbot v1.8.1: Initializing...");

    const userInput = document.getElementById('userInput');
    const clearChatBtn = document.getElementById('clearChat');
    const suggestedQuestionsContainer = document.getElementById('suggestedQuestions');

    // Señal visual de sistema activo
    if (userInput) userInput.placeholder = "GEMA v1.9.1-IA Activa";

    // Renderizar sugerencias
    renderSuggestions(suggestedQuestionsContainer, formElement, userInput);

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
    appendSystemMessage("GEMA está pensando la respuesta...");

    // Timeout Logic
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
        appendSystemMessage("Tiempo de espera agotado (15s).");
        showTyping(false);
    }, 15000);

    // Prepare Payload
    const emailInput = document.getElementById('userEmail');
    const dniInput = document.getElementById('userDNI');
    const email = emailInput ? emailInput.value : '';
    const dni = dniInput ? dniInput.value : '';

    if (!email.includes('@')) {
        clearTimeout(timeoutId);
        showTyping(false);
        appendMessage('bot', "Por favor, ingresa un email válido o inicia sesión con Google.");
        return;
    }

    // Payload v1.9.3 (Proactivo)
    const payload = {
        email,
        dni,
        session_id: getSessionId(),
        user_name: userProfile ? userProfile.name : 'Usuario',
        is_verified: !!userProfile,
        descripcion: message,
        fuente: "Chatbot GEMA v1.9-Dev-Proactive"
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

                if (isJson) {
                    let botMsg = "";
                    // Soporte para esquema v1.9 (data.response) y legacy (data.mensaje)
                    const rawMsg = data.response || data.mensaje || data.text || "";

                    if (data.ticket_id) {
                        botMsg = `¡Listo! He generado el ticket **#${data.ticket_id}**.\n\n${rawMsg}`;
                    } else if (data.meta && data.meta.action_type === 'ticket') {
                        botMsg = `¡Perfecto! ${rawMsg}`;
                    } else {
                        botMsg = rawMsg || "¡Entendido! He procesado tu solicitud.";
                    }
                    appendMessage('bot', botMsg);
                } else {
                    appendMessage('bot', text || "Mensaje recibido.");
                }
                updateHeaderAvatar();
            } else {
                appendSystemMessage(`Error servidor: ${response.status}`);
                appendMessage('bot', "Error en el servidor de IA.");
            }
        })
        .catch(error => {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') return; // Handled by timeout
            console.error(error);
            appendSystemMessage(`Error de red: ${error.message}`);
            appendMessage('bot', "Problema de conexión.");
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
    appendMessage('bot', `<em>🤖 ${text}</em>`);
}

function appendMessage(role, text) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

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
}

function showTyping(show) {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) typingIndicator.style.display = show ? 'flex' : 'none';
}
