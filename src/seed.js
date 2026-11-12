import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './dao/models/service.model.js';
import Booking from './dao/models/booking.model.js';

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

        // Limpiar colecciones anteriores
        await Service.deleteMany({});
        await Booking.deleteMany({});

        // Insertar servicios
        const insertedServices = await Service.insertMany(sampleServices);
        console.log('¡Servicios médicos cargados exitosamente!');

        // Insertar reservas de ejemplo usando las referencias (_id) de los servicios
        const sampleBookings = [
            {
                client: 'Martina Colantonio',
                email: 'martina@example.com',
                date: new Date('2026-03-10'),
                time: '10:00',
                status: 'Confirmado',
                services: [
                    { service: insertedServices[0]._id, quantity: 1 }
                ]
            },
            {
                client: 'Juan Pérez',
                email: 'juan@example.com',
                date: new Date('2026-03-11'),
                time: '14:30',
                status: 'Pendiente',
                services: [
                    { service: insertedServices[1]._id, quantity: 1 },
                    { service: insertedServices[3]._id, quantity: 1 }
                ]
            }
        ];

        await Booking.insertMany(sampleBookings);
        console.log('¡Reservas de ejemplo cargadas exitosamente con populate!');

        process.exit(0);
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
        process.exit(1);
    }
};

seedDB();