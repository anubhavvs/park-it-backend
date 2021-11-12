import express from 'express';
import { createBooking, getAllBookings, getBookings, getBooking, updateBooking } from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/:id/:slotName')
    .post(protect, createBooking)
router
    .route('/all')
    .get(protect, admin, getAllBookings);
router
    .route('/')
    .get(protect, getBookings);
router
    .route('/:id')
    .get(protect, getBooking)
    .put(protect, updateBooking);

export default router;