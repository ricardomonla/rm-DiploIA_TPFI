console.log("DEBUG BOMB INITIALIZED");
// alert("DEBUG BOMB: Script loaded"); // Comentado para no bloquear al agente si no maneja diálogos, pero el console log debe salir.

setInterval(() => {
    const input = document.getElementById('userInput');
    if (input) {
        if (input.placeholder !== "DEBUG BOMB ACTIVE") {
            console.log("DEBUG BOMB: Element found, updating styles...");
            input.placeholder = "DEBUG BOMB ACTIVE";
            input.style.backgroundColor = "#ff0000"; // Rojo intenso
            input.style.color = "#ffffff";
            input.value = "DEBUG MODE ON";
        }
    } else {
        console.log("DEBUG BOMB: Waiting for input element...");
    }
}, 1000);
