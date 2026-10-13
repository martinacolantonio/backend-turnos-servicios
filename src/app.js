import express from 'express';
import servicesRouter from './routes/services.router.js';
import bookingsRouter from './routes/bookings.router.js';

const app = express();

// Middlewares esenciales para que el servidor procese JSON y datos de URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Definición de las rutas principales de la API
app.use('/api/services', servicesRouter);
app.use('/api/bookings', bookingsRouter);

export default app;