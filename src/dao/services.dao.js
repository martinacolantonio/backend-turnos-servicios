import fs from 'fs';
import path from 'path';

export default class ServicesDao {
    constructor() {
        this.path = path.resolve('src/data/services.json');
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
        const services = await this.getAll();
        return services.find(s => s.id === id) || null;
    }

    async create(serviceData) {
        const services = await this.getAll();
        services.push(serviceData);
        await fs.promises.writeFile(this.path, JSON.stringify(services, null, 2));
        return serviceData;
    }

    async update(id, updatedData) {
        const services = await this.getAll();
        const index = services.findIndex(s => s.id === id);
        if (index === -1) return null;

        services[index] = { ...services[index], ...updatedData };
        await fs.promises.writeFile(this.path, JSON.stringify(services, null, 2));
        return services[index];
    }

    async delete(id) {
        const services = await this.getAll();
        const index = services.findIndex(s => s.id === id);
        if (index === -1) return null;

        const deleted = services.splice(index, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(services, null, 2));
        return deleted[0];
    }
}