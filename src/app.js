import express from 'express';
import servicesRouter from './routes/services.router.js';

const app = express();

// Middlewares para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoints / Rutas
app.use('/api/services', servicesRouter);

// Ruta base por si entran a la raíz
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a la API del Sistema de Turnos y Reservas' });
});

export default app;