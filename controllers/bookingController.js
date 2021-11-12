import asyncHandler from 'express-async-handler';
import Area from '../models/areaModel.js';
import Booking from '../models/bookingModel.js';
import User from '../models/userModel.js';

// @desc    Create new booking
// @route   POST /api/bookings/:areaId/:slotName
// @access  Private
const createBooking = asyncHandler(async(req, res) => {
    const area = await Area.findById(req.params.id);
    const user = await User.findById(req.user._id);
    const slotName = req.params.slotName;
    const slotTime = req.body.slotTime;
    if(area){
        if(area['slots'].find(obj => obj.name === slotName)['filled'] === false) {
            const booking = new Booking({
                user: req.user._id,
                bookedArea: area['name'],
                bookedCity: area['city'],
                bookedSlot: slotName,
                slotTime: slotTime,
                status: 'REACH ON TIME'
            })
            const createdBooking = await booking.save();
            area['slots'].find(obj => obj.name === slotName)['filled'] = true;
            await area.save();
            user.activeBooking = true;
            await user.save();
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
// @route   GET /api/bookings/all
// @access  Private/Admin

const getAllBookings = asyncHandler(async(req, res) => {
    const bookings = await Booking.find().populate('user');
    res.json(bookings);
});

// @desc    Get user bookings
// @route   GET /api/bookings/
// @access  Private

const getBookings = asyncHandler(async(req, res) => {
    const bookings = await Booking.find({user: req.user._id});
    if(bookings.length > 0) {
        res.json(bookings);
    } else {
        res.status(404);
        throw new Error('No bookings found.')
    }
});

// @desc    Get booking by id
// @route   GET /api/bookings/:id
// @access  Private

const getBooking = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const booking = await Booking.findOne({user: req.user._id, _id: id});
    if(booking){
        res.json(booking);
    } else {
        res.status(404);
        throw new Error('Booking not found.');
    }
});

// @desc    Update booking status
// @route   GET /api/bookings/:id
// @access  Private

const updateBooking = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const user = await User.findById(req.user._id);
    const booking = await Booking.findOne({user: req.user._id, _id: id});
    if(booking) {
        booking.paid = true;
        user.activeBooking = false;
        await booking.save();
        await user.save();
        res.status(200);
    } else {
        res.status(404);
        throw new Error('Booking not found.');
    }
})

export { createBooking, getAllBookings, getBookings, getBooking, updateBooking };