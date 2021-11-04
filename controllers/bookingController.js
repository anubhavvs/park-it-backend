import asyncHandler from 'express-async-handler';
import Area from '../models/areaModel.js';
import Booking from '../models/bookingModel.js';

// @desc    Create new booking
// @route   POST /api/bookings/:areaId/:slotName
// @access  Private
const createBooking = asyncHandler(async(req, res) => {
    const area = await Area.findById(req.params.id);
    const slotName = req.params.slotName;
    const slotTime = req.body.slotTime;
    if(area){
        if(area['slots'].find(obj => obj.name === slotName)['filled'] === false) {
            const booking = new Booking({
                user: req.user._id,
                bookedArea: area['name'],
                bookedCity: area['city'],
                bookedSlot: slotName,
                slotTime: slotTime
            })
            const createdBooking = await booking.save();
            area['slots'].find(obj => obj.name === slotName)['filled'] = true;
            await area.save();
            res.json(createdBooking);
        } else {
            res.status(409);
            throw new Error('Slot not empty.')
        }
    } else {
        res.status(404);
        throw new Error('Area not found.');
    }
});

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin

const getAllBookings = asyncHandler(async(req, res) => {
    const bookings = await Booking.find().populate('user');
    res.json(bookings);
});

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private

const getBookings = asyncHandler(async(req, res) => {
    const bookings = await Booking.find({user: req.user._id});
    res.json(bookings);
});

export { createBooking, getAllBookings, getBookings };