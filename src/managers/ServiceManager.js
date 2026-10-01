import fs from 'fs';
import path from 'path';

export default class ServiceManager {
    constructor() {
        // O bien cargas desde un archivo JSON, o usas un array en memoria.
        // Aquí simularemos un array inicial o gestión básica.
        this.services = [];
    }

    async getServices(query = {}) {
        let results = [...this.services];
        
        if (query.category) {
            results = results.filter(s => s.category.toLowerCase() === query.category.toLowerCase());
        }
        if (query.available !== undefined) {
            const isAvailable = query.available === 'true';
            results = results.filter(s => s.available === isAvailable);
        }

        return results;
    }

    async getServiceById(id) {
        return this.services.find(s => s.id === id) || null;
    }

    async addService(serviceData) {
        // Validar campos obligatorios (por ejemplo: title, price, category)
        if (!serviceData.title || !serviceData.category || serviceData.price === undefined) {
            return null; // Faltan campos obligatorios
        }

        const newService = {
            id: Date.now().toString(), // Generación automática de ID único
            title: serviceData.title,
            description: serviceData.description || '',
            category: serviceData.category,
            price: Number(serviceData.price),
            available: serviceData.available !== undefined ? serviceData.available : true
        };

        this.services.push(newService);
        return newService;
    }

    async updateService(id, updateData) {
        const index = this.services.findIndex(s => s.id === id);
        if (index === -1) return null;

        // No permitir modificar el id
        delete updateData.id;

        this.services[index] = {
            ...this.services[index],
            ...updateData
        };

        return this.services[index];
    }

    async deleteService(id) {
        const index = this.services.findIndex(s => s.id === id);
        if (index === -1) return null;

        const deleted = this.services.splice(index, 1);
        return deleted[0];
    }
}