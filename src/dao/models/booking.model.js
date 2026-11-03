import mongoose from 'mongoose';

const bookingCollection = 'bookings';

const bookingSchema = new mongoose.Schema({
    services: [{
        service: { type: mongoose.Schema.Types.ObjectId, ref: 'services', required: true },
        quantity: { type: Number, required: true, default: 1 }
    }],
    total: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

export const bookingModel = mongoose.model(bookingCollection, bookingSchema);