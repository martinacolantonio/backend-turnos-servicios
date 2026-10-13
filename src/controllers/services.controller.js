import ServicesService from '../services/services.service.js';

const servicesService = new ServicesService();

export const getServices = async (req, res) => {
    try {
        const services = await servicesService.getServices(req.query);
        res.json({ status: 'success', payload: services });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const getServiceById = async (req, res) => {
    try {
        const { sid } = req.params;
        const service = await servicesService.getServiceById(sid);
        if (!service) {
            return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
        }
        res.json({ status: 'success', payload: service });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const createService = async (req, res) => {
    try {
        const newService = await servicesService.createService(req.body);
        if (!newService) {
            return res.status(400).json({ status: 'error', message: 'Datos incompletos o inválidos para el servicio' });
        }
        res.status(201).json({ status: 'success', payload: newService });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const updateService = async (req, res) => {
    try {
        const { sid } = req.params;
        const updatedService = await servicesService.updateService(sid, req.body);
        if (!updatedService) {
            return res.status(404).json({ status: 'error', message: 'Servicio no encontrado para actualizar' });
        }
        res.json({ status: 'success', payload: updatedService });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const deleteService = async (req, res) => {
    try {
        const { sid } = req.params;
        const deletedService = await servicesService.deleteService(sid);
        if (!deletedService) {
            return res.status(404).json({ status: 'error', message: 'Servicio no encontrado para eliminar' });
        }
        res.json({ status: 'success', payload: deletedService });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};