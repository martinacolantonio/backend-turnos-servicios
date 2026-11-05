import ServicesRepository from '../repositories/services.repository.js';

const servicesRepository = new ServicesRepository();

export default class ServicesService {
    async getServices(query = {}) {
        // Opcional: podrías pasarle la query directo al repository/DAO para que filtre la BD, 
        // pero si lo hacés acá, nos aseguramos de que traiga todo de MongoDB:
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

    async getServiceById(id) {
        return await servicesRepository.getById(id);
    }

    async createService(serviceData) {
        const { name, description, duration, price, category, available } = serviceData;

        if (!name || !description || duration === undefined || price === undefined || !category || available === undefined) {
            throw new Error("Faltan campos obligatorios para crear el servicio");
        }

        // ❌ QUITAMOS el `id: Date.now().toString()` porque MongoDB usa su propio `_id`
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
        // Nos aseguramos de que no intenten modificar el id de mongo
        delete updatedData._id;
        delete updatedData.id;
        return await servicesRepository.update(id, updatedData);
    }

    async deleteService(id) {
        return await servicesRepository.delete(id);
    }
}