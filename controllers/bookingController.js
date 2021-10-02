import asyncHandler from 'express-async-handler';
import Area from '../models/areaModel.js';
import Booking from '../models/bookingModel.js';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = asyncHandler(async(req, res) => {
    const area = await Area.findById(req.params.id);
    const slotName = req.params.slotName;
    if(area){
        if(area['slots'].find(obj => obj.name === slotName)['filled'] === false) {
            const booking = new Booking({
                user: req.user._id,
                bookedArea: area['name'],
                bookedCity: area['city'],
                bookedSlot: slotName
            })
            const createdBooking = await booking.save();
            area['slots'].find(obj => obj.name === slotName)['filled'] = true;
            await area.save();
            res.json(createdBooking);
        } else {
            res.status(404);
            throw new Error('Slot not empty.')
        }
    } else {
        res.status(404);
        throw new Error('Area not found.');
    }
});

export { createBooking };