import { Router } from 'express';
import { getAvailability } from '../controllers/availability.controller.js';

const router = Router();

// Endpoint para verificar disponibilidad y turnos
router.get('/', getAvailability);

export default router;