import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración de rutas para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Configuración del motor de plantillas Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Middlewares para JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Importar las rutas de vistas y API (ajusta según tus archivos de rutas)
import viewsRouter from './routes/views.router.js';
app.use('/views', viewsRouter);

// Ruta raíz de redirección opcional
app.get('/', (req, res) => {
    res.redirect('/views/services');
});

// Conexión a MongoDB Atlas e inicio del servidor
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conectado a la Base de Datos (MongoDB Atlas)');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });