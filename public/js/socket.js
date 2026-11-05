// Inicializar la conexión con Socket.io del lado del cliente
const socket = io();

// Confirmación de conexión en la consola del navegador
socket.on('connect', () => {
    console.log('🟢 Conectado al servidor de WebSockets con ID:', socket.id);
});

// Escuchar eventos en tiempo real enviados desde el servidor (ej: actualización de servicios o reservas)
socket.on('update_services', (data) => {
    console.log('🔄 Datos actualizados recibidos en tiempo real:', data);
    
    // Aquí puedes actualizar el DOM de forma dinámica si lo deseas
    // Por ejemplo, si manejas una lista de servicios en el DOM:
    const servicesContainer = document.getElementById('services-container');
    if (servicesContainer && data) {
        // Lógica opcional para renderizar dinámicamente sin recargar la página
    }
});