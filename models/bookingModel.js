import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        bookedCity: {
            type: String,
            required: true
        },
        bookedArea: {
            type: String,
            required: true
        },
        bookedSlot: {
            type: String,
            required: true
        },
        price: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;