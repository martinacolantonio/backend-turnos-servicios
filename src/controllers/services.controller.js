import { ServiceService } from '../services/service.service.js';

const serviceService = new ServiceService();

export const getServicesController = async (req, res) => {
    try {
        const services = await serviceService.getServices();
        res.status(200).json({ status: 'success', payload: services });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const createServiceController = async (req, res) => {
    try {
        const newService = await serviceService.createService(req.body);
        
        // Si tienes Socket.io configurado, aquí puedes disparar la actualización en tiempo real:
        const io = req.app.get('socketio');
        if (io) {
            const updatedList = await serviceService.getServices();
            io.emit('update_services', updatedList);
        }

        res.status(201).json({ status: 'success', payload: newService });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};