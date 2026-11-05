import ServicesService from '../services/services.service.js';

const servicesService = new ServicesService();

export const renderServices = async (req, res) => {
    try {
        // Traemos los servicios reales desde MongoDB a través del servicio
        const services = await servicesService.getServices();

        res.render('services', { 
            title: 'Listado de Servicios',
            services 
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const renderAvailability = async (req, res) => {
    try {
        // Si ya tenés el bookingService, lo importás acá. Por ahora pasamos un array o datos reales.
        const bookings = []; 

        res.render('availability', { 
            title: 'Disponibilidad y Reservas',
            bookings 
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};