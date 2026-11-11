import productService from '../services/services.service.js';
import bookingService from '../services/bookings.service.js';

export const renderServicesView = async (req, res) => {
    try {
        const services = await productService.getAllServices(); 
        res.render('services', {
            title: 'Listado de Servicios',
            services: services.map(s => s.toObject ? s.toObject() : s)
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error interno del servidor");
    }
};

export const renderAvailabilityView = async (req, res) => {
    try {
        const availabilityData = await bookingService.getAllBookings ? await bookingService.getAllBookings() : [];
        res.render('availability', {
            title: 'Disponibilidad',
            availability: availabilityData.map(a => a.toObject ? a.toObject() : a)
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error interno del servidor");
    }
};