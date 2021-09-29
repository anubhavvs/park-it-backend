import asyncHandler from 'express-async-handler';
import Area from '../models/areaModel.js';

// @desc        Get all areas
// @route       GET /api/areas/all
// @access      Private
const getAreas = asyncHandler(async(req, res) => {
    const areas = await Area.find({})
    res.json(areas);
});

// @desc        Get slots by area
// @route       GET /api/areas/:id
// @access      Private
const getSlots = asyncHandler(async(req, res) => {
    const area = await Area.findById(req.params.id);

    if (area) {
        res.json(area['slots']);
    } else {
        res.status(404);
        throw new Error('Area not found');
    }
});

// @desc        Update a area
// @route       PUT /api/areas/:id
// @access      Private
const updateArea = asyncHandler(async(req, res) => {
    const area = await Area.findById(req.params.id);

    if (area) {
        area.name = req.body.name || area.name;
        area.city = req.body.city || area.city;
        if(req.body.numSlots && req.body.numSlots > area.numSlots) {
            for(let i=area.numSlots+1; i<=req.body.numSlots; i++){
                area.slots.push({
                    name: 'P'+i
                })
            }
            area.numSlots = area.slots.length;
        }
        const updatedArea = await area.save();

        res.json(updatedArea);
    } else {
        res.status(404);
        throw new Error('Area not found');
    }
});

// @desc        Update a area
// @route       DELETE /api/areas/:id/:slotId
// @access      Private
const deleteSlot = asyncHandler(async(req, res) => {
    const area = await Area.findById(req.params.id);

    if(area) {
        const slotId = req.params.slotId 
        console.log(slotId)
        /*
        if(slotId) {
            res.send(slotId);
        } else {
            res.status(404);
            throw new Error('Slot not found');
        }*/
    } else {
        res.status(404);
        throw new Error('Area not found');
    }
})
export { getAreas, getSlots, updateArea, deleteSlot };