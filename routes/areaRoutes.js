import express from 'express';
import { deleteArea, getAreas, getSlots, updateArea, addArea, updateSlot } from '../controllers/areaController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/')    
    .get(protect, getAreas)
    .post(protect, admin, addArea);
router
    .route('/:id')
    .get(protect, getSlots)
    .put(protect, admin, updateArea)
    .delete(protect, admin, deleteArea);
router
    .route('/:id/slot/:slotName')
    .put(protect, admin, updateSlot);

export default router;