import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';

import availabilityRouter from './routes/availability.router.js';
import { renderServicesView, renderAvailabilityView } from './controllers/views.controller.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Base de datos conectada con éxito a MongoDB Atlas'))
    .catch(error => console.error('Error al conectar a la base de datos:', error));

// Configuración de Handlebars con la carpeta layouts explícita
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos apuntando a la carpeta public en la raíz
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de API
app.use('/api/availability', availabilityRouter);

// Rutas de Vistas
app.get('/', renderServicesView);
app.get('/services', renderServicesView);
app.get('/availability', renderAvailabilityView);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});