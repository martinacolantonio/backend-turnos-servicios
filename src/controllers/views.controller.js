import Service from '../dao/models/service.model.js';
import Booking from '../dao/models/booking.model.js';

export const renderServicesView = async (req, res) => {
    try {
        const services = await Service.find().lean();
        res.render('services', { 
            title: 'Listado de Servicios Médicos',
            services 
        });
    } catch (error) {
        res.status(500).send('Error al cargar los servicios');
    }
};

export const renderAvailabilityView = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('services.service').lean();
        const availability = bookings.map(b => ({
            date: b.date ? new Date(b.date).toLocaleDateString() : 'Fecha no especificada',
            timeslot: b.time || '10:00',
            status: b.status || 'Pendiente'
        }));

        res.render('availability', { 
            title: 'Disponibilidad de Turnos',
            availability 
        });
    } catch (error) {
        res.status(500).send('Error al cargar la disponibilidad');
    }
};