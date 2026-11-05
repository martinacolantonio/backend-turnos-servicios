import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import http from 'http';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import viewsRouter from './routes/views.router.js';

// Configuración de rutas para ES Modules (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server); // Instancia de Socket.io

const PORT = process.env.PORT || 8080;

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public'))); // Archivos estáticos (CSS, JS del cliente)

// Configuración del motor de vistas Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Guardar io de forma global para usarlo en los controladores o API cuando necesites emitir eventos
app.set('socketio', io);

// Usar el router de vistas
app.use('/views', viewsRouter);

// Conexión a la Base de Datos (con soporte para memoria RAM local)
const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri || mongoUri.includes('127.0.0.1') || mongoUri.includes('localhost')) {
      const mongod = await MongoMemoryServer.create();
      mongoUri = mongod.getUri();
      console.log('🧠 Usando base de datos temporal en memoria RAM');
    }

    await mongoose.connect(mongoUri);
    console.log('📦 Conectado exitosamente a la Base de Datos');

    // Escucha de conexiones de Socket.io
    io.on('connection', (socket) => {
      console.log('⚡ Nuevo cliente conectado via Socket.io:', socket.id);
      
      socket.on('disconnect', () => {
        console.log('❌ Cliente desconectado:', socket.id);
      });
    });

    // Iniciar servidor HTTP con soporte para Socket.io
    server.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
  }
};

connectDB();