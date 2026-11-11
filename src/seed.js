import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './dao/models/service.model.js';

dotenv.config();

const sampleServices = [
    {
        name: 'Resonancia Magnética Nuclear',
        description: 'Estudio por imágenes de alta definición con tecnología avanzada sin radiación ionizante.',
        duration: 45,
        price: 45000,
        category: 'Diagnóstico por Imágenes',
        available: true
    },
    {
        name: 'Laboratorio Bioquímico Completo',
        description: 'Hemograma completo, perfil lipídico, glucemia y función renal/hepática.',
        duration: 15,
        price: 18000,
        category: 'Laboratorio',
        available: true
    },
    {
        name: 'Ecografía Obstétrica 4D',
        description: 'Control ecográfico detallado en tiempo real con entrega de soporte digital.',
        duration: 30,
        price: 32000,
        category: 'Diagnóstico por Imágenes',
        available: true
    },
    {
        name: 'Electrocardiograma (ECG)',
        description: 'Registro gráfico de la actividad eléctrica del corazón en reposo.',
        duration: 20,
        price: 15000,
        category: 'Cardiología',
        available: true
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado a MongoDB Atlas para la carga de datos...');

        await Service.deleteMany({});
        await Service.insertMany(sampleServices);

        console.log('¡Servicios médicos cargados exitosamente en la base de datos!');
        process.exit(0);
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
        process.exit(1);
    }
};

seedDB();