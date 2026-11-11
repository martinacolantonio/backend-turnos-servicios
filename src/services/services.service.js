import ServicesRepository from '../repositories/services.repository.js';

const servicesRepository = new ServicesRepository();

class ServicesService {
    async getServices(query = {}) {
        let services = await servicesRepository.getAll();

        if (query.category) {
            services = services.filter(s => s.category.toLowerCase() === query.category.toLowerCase());
        }
        if (query.available !== undefined) {
            const isAvailable = query.available === 'true' || query.available === true;
            services = services.filter(s => s.available === isAvailable);
        }

        return services;
    }

    async getAllServices(query = {}) {
        return await this.getServices(query);
    }

    async getServiceById(id) {
        return await servicesRepository.getById(id);
    }

    async createService(serviceData) {
        const { name, description, duration, price, category, available } = serviceData;

        if (!name || !description || duration === undefined || price === undefined || !category || available === undefined) {
            throw new Error("Faltan campos obligatorios para crear el servicio");
        }

        const newService = {
            name,
            description,
            duration: Number(duration),
            price: Number(price),
            category,
            available: Boolean(available)
        };

        return await servicesRepository.create(newService);
    }

    async updateService(id, updatedData) {
        delete updatedData._id;
        delete updatedData.id;
        return await servicesRepository.update(id, updatedData);
    }

    async deleteService(id) {
        return await servicesRepository.delete(id);
    }
}

// 👇 IMPORTANTE: Exportamos una instancia de la clase, no la clase en sí
export default new ServicesService();