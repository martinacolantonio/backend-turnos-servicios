import ServicesDao from '../dao/services.dao.js';

const servicesDao = new ServicesDao();

export default class ServicesRepository {
    async getAll() {
        return await servicesDao.getAll();
    }

    async getById(id) {
        return await servicesDao.getById(id);
    }

    async create(serviceData) {
        return await servicesDao.create(serviceData);
    }

    async update(id, updatedData) {
        return await servicesDao.update(id, updatedData);
    }

    async delete(id) {
        return await servicesDao.delete(id);
    }
}