/* chatbot/assets/js/script.js */

const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const chatMessages = document.getElementById('chatMessages');
const typingIndicator = document.getElementById('typingIndicator');

// URL del Webhook de Make.com (Reutilizada de v0.2)
const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/yl26qec8u2lric3yr17krrtiaxws5rkr';

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    // 1. Añadir mensaje del usuario a la UI
    appendMessage('user', message);
    userInput.value = '';

    // 2. Mostrar indicador de carga
    showTyping(true);

    try {
        // Obtener datos del encabezado
        const email = document.getElementById('userEmail').value;
        const dni = document.getElementById('userDNI').value;

        // Enviar al Webhook de Make
        const response = await fetch(MAKE_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                dni: dni,
                descripcion: message,
                fuente: "Chatbot Web v0.3"
            })
        });

        if (response.ok) {
            const data = await response.json();
            // 3. Mostrar respuesta del bot
            // Asumimos que Make devuelve un objeto con un campo 'mensaje'
            appendMessage('bot', data.mensaje || "He recibido tu consulta. Estamos procesando tu ticket.");
        } else {
            appendMessage('bot', "Lo siento, tuve un problema al conectar con el servidor central. Intenta nuevamente más tarde.");
        }
    } catch (error) {
        console.error('Error:', error);
        appendMessage('bot', "Error de conexión. Verifica tu internet o contacta a soporte TIC.");
    } finally {
        showTyping(false);
    }
});

function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', role);

    // Simple soporte para "negritas" tipo markdown (opcional)
    const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    msgDiv.innerHTML = formattedText;

    chatMessages.appendChild(msgDiv);

    // Auto-scroll al final
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping(isTyping) {
    typingIndicator.style.display = isTyping ? 'block' : 'none';
}
