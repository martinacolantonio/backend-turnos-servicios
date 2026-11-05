import ServiceDao from '../dao/service.dao.js';

const serviceDao = new ServiceDao();

export default class ServicesRepository {
    async getAll() {
        return await serviceDao.getAll();
    }

    async getById(id) {
        return await serviceDao.getById(id);
    }

    async create(data) {
        return await serviceDao.create(data);
    }

    async update(id, data) {
        return await serviceDao.update(id, data);
    }

    async delete(id) {
        return await serviceDao.delete(id);
    }
}