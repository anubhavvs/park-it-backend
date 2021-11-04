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
            type: Number,
            default: null
        },
        slotTime: {
            type: String,
            required: true
        },
        startTime: {
            type: Date,
            default: null
        },
        endTime: {
            type: Date,
            default: null
        },
        paid: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;