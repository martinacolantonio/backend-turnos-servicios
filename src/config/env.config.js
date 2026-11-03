import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT || !process.env.MONGO_URI) {
    console.error("❌ Error crítico: Faltan variables de entorno (PORT o MONGO_URI)");
    process.exit(1);
}

export default {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    nodeEnv: process.env.NODE_ENV || 'development'
};