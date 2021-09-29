import express from 'express';
import { deleteSlot, getAreas, getSlots, updateArea } from '../controllers/areaController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/all', protect, getAreas);
router
    .route('/:id')
    .get( protect, getSlots)
    .put(protect, admin, updateArea)

router.delete('/:id/:slotId', protect, admin, deleteSlot);

export default router;