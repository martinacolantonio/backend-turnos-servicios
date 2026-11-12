import Booking from '../dao/models/booking.model.js';
import Service from '../dao/models/service.model.js';

// Consultar turnos disponibles / ocupados y servicios habilitados
export const getAvailability = async (req, res) => {
    try {
        const { date, category } = req.query;

        // Filtrar servicios disponibles
        let serviceFilter = { available: true };
        if (category) serviceFilter.category = category;
        const availableServices = await Service.find(serviceFilter);

        // Si pasan una fecha por query (ej: ?date=2026-03-10), buscamos los turnos ya ocupados para ese día
        let bookedSlots = [];
        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            const existingBookings = await Booking.find({
                date: { $gte: startOfDay, $lte: endOfDay },
                status: { $ne: 'Cancelado' }
            }).select('time date services client');

            bookedSlots = existingBookings;
        }

        return res.status(200).json({
            status: 'success',
            payload: {
                message: "Consulta de disponibilidad de turnos y servicios",
                dateRequested: date || "No especificada (muestra servicios habilitados)",
                availableServices,
                bookedSlots
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};