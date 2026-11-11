import productService from '../services/services.service.js';
import bookingService from '../services/bookings.service.js';

// Obtener todos los servicios (API REST)
export const getServices = async (req, res) => {
    try {
        const services = await productService.getAllServices();
        res.status(200).json({ status: 'success', payload: services });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Obtener un servicio por ID (API REST)
export const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await productService.getServiceById(id);
        if (!service) {
            return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
        }
        res.status(200).json({ status: 'success', payload: service });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Crear un servicio nuevo (API REST + Socket.io en tiempo real)
export const createService = async (req, res) => {
    try {
        const newService = await productService.createService(req.body);

        const io = req.app.get('socketio');
        if (io) {
            const updatedServices = await productService.getAllServices();
            io.emit('updateServices', updatedServices);
        }

        res.status(201).json({ status: 'success', payload: newService });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Actualizar un servicio
export const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await productService.updateService(id, req.body);
        
        const io = req.app.get('socketio');
        if (io) {
            const updatedServices = await productService.getAllServices();
            io.emit('updateServices', updatedServices);
        }

        res.status(200).json({ status: 'success', payload: updated });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Eliminar un servicio
export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        await productService.deleteService(id);

        const io = req.app.get('socketio');
        if (io) {
            const updatedServices = await productService.getAllServices();
            io.emit('updateServices', updatedServices);
        }

        res.status(200).json({ status: 'success', message: 'Servicio eliminado' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};