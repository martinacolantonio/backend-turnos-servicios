import { Router } from 'express';
import ServiceManager from '../managers/ServiceManager.js';

const router = Router();
const serviceManager = new ServiceManager();

// GET /api/services (Acepta filtros por query params: ?category=..., ?available=...)
router.get('/', async (req, res) => {
    try {
        const services = await serviceManager.getServices(req.query);
        res.status(200).json({ status: 'success', payload: services });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// GET /api/services/:sid
router.get('/:sid', async (req, res) => {
    try {
        const { sid } = req.params;
        const service = await serviceManager.getServiceById(sid);
        
        if (!service) {
            return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
        }
        
        res.status(200).json({ status: 'success', payload: service });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// POST /api/services
router.post('/', async (req, res) => {
    try {
        const newService = await serviceManager.addService(req.body);
        
        if (!newService) {
            return res.status(400).json({ status: 'error', message: 'Faltan campos obligatorios o datos inválidos' });
        }
        
        res.status(201).json({ status: 'success', payload: newService });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// PUT /api/services/:sid
router.put('/:sid', async (req, res) => {
    try {
        const { sid } = req.params;
        const updatedService = await serviceManager.updateService(sid, req.body);
        
        if (!updatedService) {
            return res.status(404).json({ status: 'error', message: 'Servicio no encontrado para actualizar' });
        }
        
        res.status(200).json({ status: 'success', payload: updatedService });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// DELETE /api/services/:sid
router.delete('/:sid', async (req, res) => {
    try {
        const { sid } = req.params;
        const deletedService = await serviceManager.deleteService(sid);
        
        if (!deletedService) {
            return res.status(404).json({ status: 'error', message: 'Servicio no encontrado para eliminar' });
        }
        
        res.status(200).json({ status: 'success', payload: deletedService });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;