import fs from 'fs';
import path from 'path';
import ServiceManager from './ServiceManager.js';

const serviceManager = new ServiceManager();

export default class BookingManager {
    constructor() {
        this.path = path.resolve('src/data/bookings.json');
        this.initFile();
    }

    async initFile() {
        try {
            await fs.promises.access(this.path);
        } catch (error) {
            await fs.promises.mkdir(path.dirname(this.path), { recursive: true });
            await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
        }
    }

    async getBookings() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getBookingById(id) {
        const bookings = await this.getBookings();
        return bookings.find(b => b.id === id) || null;
    }

    async createBooking(bookingData) {
        const { clientName, clientEmail, date, time, status, services } = bookingData;

        if (!clientName || !clientEmail || !date || !time) {
            return { error: "Faltan campos obligatorios del cliente (clientName, clientEmail, date, time)" };
        }

        const bookings = await this.getBookings();

        const newBooking = {
            id: Date.now().toString(),
            clientName,
            clientEmail,
            date,
            time,
            status: status || "pendiente",
            services: Array.isArray(services) ? services : []
        };

        bookings.push(newBooking);
        await fs.promises.writeFile(this.path, JSON.stringify(bookings, null, 2));
        return newBooking;
    }

    async addServiceToBooking(bookingId, serviceId) {
        const bookings = await this.getBookings();
        const bookingIndex = bookings.findIndex(b => b.id === bookingId);
        if (bookingIndex === -1) return { error: "Reserva no encontrada" };

        // Validar que el servicio exista realmente
        const serviceExists = await serviceManager.getServiceById(serviceId);
        if (!serviceExists) return { error: "El servicio que intentas agregar no existe" };

        const booking = bookings[bookingIndex];

        // Verificar si el servicio ya está en la reserva para incrementar quantity
        const serviceIndex = booking.services.findIndex(s => s.service === serviceId);

        if (serviceIndex !== -1) {
            booking.services[serviceIndex].quantity += 1;
        } else {
            booking.services.push({ service: serviceId, quantity: 1 });
        }

        bookings[bookingIndex] = booking;
        await fs.promises.writeFile(this.path, JSON.stringify(bookings, null, 2));
        return booking;
    }
}