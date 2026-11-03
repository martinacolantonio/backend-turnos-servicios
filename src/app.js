import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;
    
    // Si apunta a localhost o memoria local, levanta la base temporal RAM
    if (!mongoUri || mongoUri.includes('127.0.0.1') || mongoUri.includes('localhost')) {
      const mongod = await MongoMemoryServer.create();
      mongoUri = mongod.getUri();
      console.log('🧠 Usando base de datos temporal en memoria RAM');
    }

    await mongoose.connect(mongoUri);
    console.log('📦 Conectado exitosamente a la Base de Datos');

    // Iniciar servidor Express una vez conectada la BD
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
  }
};

connectDB();