import BookingsRepository from '../repositories/bookings.repository.js';
import ServicesRepository from '../repositories/services.repository.js';

const bookingsRepository = new BookingsRepository();
const servicesRepository = new ServicesRepository();

export default class BookingsService {
    async createBooking(bookingData) {
        const { clientName, clientEmail, date, time, status, services } = bookingData;

        if (!clientName || !clientEmail || !date || !time) {
            return { error: "Faltan campos obligatorios del cliente (clientName, clientEmail, date, time)" };
        }

        const newBooking = {
            id: Date.now().toString(),
            clientName,
            clientEmail,
            date,
            time,
            status: status || "pendiente",
            services: Array.isArray(services) ? services : []
        };

        return await bookingsRepository.create(newBooking);
    }

    async getBookingById(id) {
        return await bookingsRepository.getById(id);
    }

    async addServiceToBooking(bookingId, serviceId) {
        const booking = await bookingsRepository.getById(bookingId);
        if (!booking) return { error: "Reserva no encontrada" };

        const serviceExists = await servicesRepository.getById(serviceId);
        if (!serviceExists) return { error: "El servicio que intentas agregar no existe" };

        const serviceIndex = booking.services.findIndex(s => s.service === serviceId);

        if (serviceIndex !== -1) {
            booking.services[serviceIndex].quantity += 1;
        } else {
            booking.services.push({ service: serviceId, quantity: 1 });
        }

        return await bookingsRepository.update(bookingId, booking);
    }
}