import { serviceModel } from '../models/service.model.js';

export default class ServiceDaoMongo {
    async getServices() {
        try {
            return await serviceModel.find().lean();
        } catch (error) {
            throw new Error(`Error al obtener servicios: ${error.message}`);
        }
    }

    async getServiceById(id) {
        try {
            const service = await serviceModel.findById(id).lean();
            if (!service) {
                return { error: "Servicio no encontrado" };
            }
            return service;
        } catch (error) {
            return { error: "ID inválido o servicio no encontrado" };
        }
    }

    async addService(serviceData) {
        try {
            const { name, description, duration, price, category, available } = serviceData;

            if (!name || !description || duration === undefined || price === undefined || !category) {
                return { error: "Faltan campos obligatorios para crear el servicio" };
            }

            const newService = await serviceModel.create({
                name,
                description,
                duration: Number(duration),
                price: Number(price),
                category,
                available: available !== undefined ? Boolean(available) : true
            });

            return newService.toObject();
        } catch (error) {
            return { error: `Error al crear el servicio: ${error.message}` };
        }
    }

    async updateService(id, updatedData) {
        try {
            delete updatedData._id; // Evita modificar el ID
            const updated = await serviceModel.findByIdAndUpdate(id, updatedData, { new: true }).lean();
            
            if (!updated) {
                return { error: "Servicio no encontrado para actualizar" };
            }
            return updated;
        } catch (error) {
            return { error: "Error al actualizar el servicio" };
        }
    }

    async deleteService(id) {
        try {
            const deleted = await serviceModel.findByIdAndDelete(id).lean();
            if (!deleted) {
                return { error: "Servicio no encontrado para eliminar" };
            }
            return deleted;
        } catch (error) {
            return { error: "Error al eliminar el servicio" };
        }
    }
}