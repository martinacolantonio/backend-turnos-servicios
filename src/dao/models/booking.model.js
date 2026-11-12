import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    client: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, default: 'Pendiente' },
    services: [
        {
            service: { type: Schema.Types.ObjectId, ref: 'services', required: true },
            quantity: { type: Number, required: true, default: 1 }
        }
    ]
});

const Booking = model('bookings', bookingSchema);
export default Booking;