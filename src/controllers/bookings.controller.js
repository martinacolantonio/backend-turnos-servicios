import BookingsService from '../services/bookings.service.js';

const bookingsService = new BookingsService();

export const createBooking = async (req, res) => {
    try {
        const result = await bookingsService.createBooking(req.body);
        if (result.error) {
            return res.status(400).json({ status: 'error', message: result.error });
        }
        res.status(201).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const getBookingById = async (req, res) => {
    try {
        const { bid } = req.params;
        const booking = await bookingsService.getBookingById(bid);
        if (!booking) {
            return res.status(404).json({ status: 'error', message: 'Reserva no encontrada' });
        }
        res.json({ status: 'success', payload: booking });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const addServiceToBooking = async (req, res) => {
    try {
        const { bid, sid } = req.params;
        const result = await bookingsService.addServiceToBooking(bid, sid);
        
        if (result.error) {
            return res.status(404).json({ status: 'error', message: result.error });
        }
        
        res.json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};