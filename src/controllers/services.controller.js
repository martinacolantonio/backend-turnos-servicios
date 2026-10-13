import ServiceManager from '../managers/ServiceManager.js';

const serviceManager = new ServiceManager();

export const getServices = async (req, res) => {
    try {
        const services = await serviceManager.getServices(req.query);
        res.json({ status: 'success', payload: services });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const getServiceById = async (req, res) => {
    try {
        const { sid } = req.params;
        const service = await serviceManager.getServiceById(sid);
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
        const newService = await serviceManager.addService(req.body);
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
        const updatedService = await serviceManager.updateService(sid, req.body);
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
        const deletedService = await serviceManager.deleteService(sid);
        if (!deletedService) {
            return res.status(404).json({ status: 'error', message: 'Servicio no encontrado para eliminar' });
        }
        res.json({ status: 'success', payload: deletedService });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};