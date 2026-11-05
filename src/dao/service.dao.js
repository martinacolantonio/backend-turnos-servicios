import { serviceModel } from './models/service.model.js';

export default class ServiceDao {
    async getAll() {
        return await serviceModel.find().lean();
    }

    async getById(id) {
        return await serviceModel.findById(id).lean();
    }

    async create(data) {
        return await serviceModel.create(data);
    }

    async update(id, data) {
        return await serviceModel.findByIdAndUpdate(id, data, { new: true }).lean();
    }

    async delete(id) {
        return await serviceModel.findByIdAndDelete(id).lean();
    }
}