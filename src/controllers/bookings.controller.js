import Booking from '../dao/models/booking.model.js';

export const getBookingById = async (req, res) => {
    try {
        const { bid } = req.params;
        const booking = await Booking.findById(bid).populate('services.service');

        if (!booking) {
            return res.status(404).json({ 
                status: 'error', 
                message: 'Reserva no encontrada' 
            });
        }

        return res.status(200).json({ 
            status: 'success', 
            payload: booking 
        });
    } catch (error) {
        return res.status(500).json({ 
            status: 'error', 
            message: error.message 
        });
    }
};

export const createBooking = async (req, res) => {
    try {
        const { client, email, date, time, services } = req.body;
        const newBooking = await Booking.create({
            client,
            email,
            date,
            time,
            services
        });

        return res.status(201).json({ 
            status: 'success', 
            payload: newBooking 
        });
    } catch (error) {
        return res.status(400).json({ 
            status: 'error', 
            message: error.message 
        });
    }