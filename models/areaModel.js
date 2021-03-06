import mongoose from 'mongoose';

const slotSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        filled: {
            type: Boolean,
            required: true,
            default: false
        }
    }
)

const areaSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        city: {
            type: String,
            required: true
        },
        slots: [slotSchema],
        numSlots: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const Area = mongoose.model('Area', areaSchema);

export default Area;