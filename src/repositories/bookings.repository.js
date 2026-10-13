import BookingsDao from '../dao/bookings.dao.js';

const bookingsDao = new BookingsDao();

export default class BookingsRepository {
    async getAll() {
        return await bookingsDao.getAll();
    }

    async getById(id) {
        return await bookingsDao.getById(id);
    }

    async create(bookingData) {
        return await bookingsDao.create(bookingData);
    }

    async update(id, updatedData) {
        return await bookingsDao.update(id, updatedData);
    }
}