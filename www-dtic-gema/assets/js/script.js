/* chatbot/assets/js/script.js */

const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const chatMessages = document.getElementById('chatMessages');
const typingIndicator = document.getElementById('typingIndicator');
const clearChatBtn = document.getElementById('clearChat');
const suggestedQuestionsContainer = document.getElementById('suggestedQuestions');
const headerAvatar = document.getElementById('headerAvatar');

// URL del Webhook de Make.com (Reutilizada de v0.2)
const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/yl26qec8u2lric3yr17krrtiaxws5rkr';

// Ruta de avatares comprimidos
const AVATAR_PATH = 'assets/video/avatar/';
const AVATAR_FILES = ['gema-00.mp4', 'gema-01.mp4', 'gema-02.mp4', 'gema-03.mp4', 'gema-04.mp4', 'gema-05.mp4'];

function updateHeaderAvatar() {
    const randomAvatar = AVATAR_FILES[Math.floor(Math.random() * AVATAR_FILES.length)];
    headerAvatar.src = AVATAR_PATH + randomAvatar;
    headerAvatar.play();
}

// Preguntas sugeridas iniciales
const SUGGESTIONS = [
    "¿Cómo saco mi certificado?",
    "¿Dónde está mi legajo?",
    "Horarios de atención TIC",
    "¿Cómo cambio mi contraseña?"
];

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderSuggestions();

    // Botón de limpiar chat
    clearChatBtn.addEventListener('click', () => {
        // En lugar de confirm() nativo que puede fallar en entornos automatizados, 
        // usamos una confirmación simple o directa para v0.4
        const hasMessages = chatMessages.children.length > 1; // Más que el saludo inicial
        if (hasMessages) {
            chatMessages.innerHTML = '';
            appendMessage('bot', '¡Entendido! He despejado nuestra conversación. ¿En qué más puedo apoyarte ahora?');
        }
    });
});

function renderSuggestions() {
    suggestedQuestionsContainer.innerHTML = '';
    SUGGESTIONS.forEach(text => {
        const chip = document.createElement('div');
        chip.className = 'suggestion-chip';
        chip.textContent = text;
        chip.onclick = () => {
            userInput.value = text;
            chatForm.dispatchEvent(new Event('submit'));
        };
        suggestedQuestionsContainer.appendChild(chip);
    });
}

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    // 1. Añadir mensaje del usuario a la UI
    appendMessage('user', message);
    userInput.value = '';
    suggestedQuestionsContainer.style.display = 'none'; // Ocultar sugerencias tras el primer mensaje
    updateHeaderAvatar(); // Cambio de avatar al preguntar

    // 2. Mostrar indicador de carga
    showTyping(true);

    try {
        const email = document.getElementById('userEmail').value;
        const dni = document.getElementById('userDNI').value;

        // Validación básica
        if (!email.includes('@')) {
            appendMessage('bot', '¡Ups! Parece que el correo electrónico no es válido. Por favor, asegúrate de usar tu cuenta institucional para que pueda ayudarte mejor.');
            showTyping(false);
            return;
        }

        const response = await fetch(MAKE_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                dni: dni,
                descripcion: message,
                fuente: "Chatbot GEMA v1.1"
            })
        });

        if (response.ok) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();

                // Intento extraer mensaje humano de varios campos posibles
                let botMsg = data.mensaje || data.response || data.text || data.output;

                // Si es un objeto complejo (como un ticket), lo humanizamos
                if (typeof data === 'object' && !botMsg) {
                    if (data.id || data.ticket) {
                        botMsg = `¡Listo! He generado el ticket **#${data.id || data.ticket}**. El equipo de TIC lo revisará a la brevedad.`;
                    } else {
                        botMsg = "He recibido tu solicitud y ya está en proceso. ¡Pronto tendrás novedades!";
                    }
                }

                appendMessage('bot', botMsg || "He procesado tu consulta correctamente.");
                updateHeaderAvatar(); // Cambio de avatar al responder
            } else {
                const text = await response.text();
                if (text.trim() === "Accepted") {
                    appendMessage('bot', "¡Excelente! Tu consulta ya ingresó al sistema **dtic-GEMA**. Estaré atenta a su avance.");
                } else {
                    appendMessage('bot', text || "He recibido tu mensaje. ¡Me pongo a trabajar en ello ahora mismo!");
                }
                updateHeaderAvatar(); // Cambio de avatar al responder
            }
        } else {
            appendMessage('bot', "Lo siento mucho, parece que algo no salió bien en mis servidores (Error " + response.status + "). ¿Podrías intentar enviarlo de nuevo?");
        }
    } catch (error) {
        console.error('Error:', error);
        appendMessage('bot', "No logro conectar con mi central. Por favor, verifica tu internet o aguarda un momento. ¡Gracias por tu paciencia!");
    } finally {
        showTyping(false);
    }
});

function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', role);

    const now = new Date();
    const timeString = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    // Avatar HTML
    const avatarHTML = role === 'bot'
        ? `<div class="avatar-msg"><img src="assets/img/avatar/gema-avatar.png" alt="GEMA"></div>`
        : '';

    // Markdown simple
    let formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`(.*?)`/g, '<code>$1</code>');

    msgDiv.innerHTML = `
        ${avatarHTML}
        <div class="msg-content">
            ${formattedText}
            <span class="timestamp">${timeString}</span>
        </div>
    `;

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping(show) {
    typingIndicator.style.display = show ? 'flex' : 'none';
}
