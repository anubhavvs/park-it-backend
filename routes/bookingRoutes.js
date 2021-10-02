import express from 'express';
import { createBooking } from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/:id/:slotName')
    .post(protect, createBooking);

export default router;