import fs from 'fs';
import path from 'path';

export default class BookingsDao {
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

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getById(id) {
        const bookings = await this.getAll();
        return bookings.find(b => b.id === id) || null;
    }

    async create(bookingData) {
        const bookings = await this.getAll();
        bookings.push(bookingData);
        await fs.promises.writeFile(this.path, JSON.stringify(bookings, null, 2));
        return bookingData;
    }

    async update(id, updatedData) {
        const bookings = await this.getAll();
        const index = bookings.findIndex(b => b.id === id);
        if (index === -1) return null;

        bookings[index] = { ...bookings[index], ...updatedData };
        await fs.promises.writeFile(this.path, JSON.stringify(bookings, null, 2));
        return bookings[index];
    }
}