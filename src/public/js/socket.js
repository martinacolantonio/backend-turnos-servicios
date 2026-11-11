const socket = io();

// Escuchar evento cuando se crea o modifica un servicio
socket.on('updateServices', (services) => {
    const container = document.getElementById('services-container');
    if (!container) return;

    container.innerHTML = '';

    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.id = `service-${service._id}`;
        card.innerHTML = `
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <p><strong>Duración:</strong> ${service.duration} min</p>
            <p><strong>Precio:</strong> $${service.price}</p>
            <p><strong>Categoría:</strong> ${service.category}</p>
            <p><strong>Disponibilidad:</strong> ${service.available ? 'Disponible' : 'No disponible'}</p>
        `;
        container.appendChild(card);
    });
});