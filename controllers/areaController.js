import asyncHandler from 'express-async-handler';
import Area from '../models/areaModel.js';

// @desc        Get all areas
// @route       GET /api/areas/
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
        throw new Error('Area not found.');
    }
});

// @desc        Update a area
// @route       PUT /api/areas/:id
// @access      Private/Admin
const updateArea = asyncHandler(async(req, res) => {
    const area = await Area.findById(req.params.id);

    if (area) {
        area.name = req.body.name || area.name;
        area.city = req.body.city || area.city;
        area.price = req.body.price || area.price;
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
        throw new Error('Area not found.');
    }
});

// @desc        Delete a area
// @route       DELETE /api/areas/:id
// @access      Private/Admin
const deleteArea = asyncHandler(async(req, res) => {
    const area = await Area.findById(req.params.id);

    if(area) {
        await area.remove();
        res.json({ message: `${area.name} area removed.` });
    } else {
        res.status(404);
        throw new Error('Area not found.');
    }
});

// @desc        Create a area
// @route       POST /api/areas/
// @access      Private/Admin
const addArea = asyncHandler(async(req, res) => {
    const {
        name,
        city,
        numSlots,
        price
    } = req.body;

    if(name && city && numSlots) {
        const area = new Area({
            name: name,
            city: city,
            slots: [],
            numSlots: numSlots,
            price: price
        });

        for(let i=1; i<=numSlots; i++) {
            area.slots.push({
                name: 'P'+i
            });
        }
        
        const createdArea = await area.save();
        res.status(201).json(createdArea);
    } else {
        res.status(400);
        throw new Error('Invalid area data.');
    }
})

// @desc        Manual slot update
// @route       PUT /api/areas/
// @access      Private/Admin
const updateSlot = asyncHandler(async(req, res) => {
    const area = await Area.findById(req.params.id);
    const slotName = req.params.slotName
    if(area){
        area['slots'].find(obj => obj.name === slotName)['filled'] = !(area['slots'].find(obj => obj.name === slotName)['filled']);
        const updatedSlot = await area.save();
        res.json(updatedSlot);
    } else {
        res.status(404);
        throw new Error('Area not found.');
    }
});

export { getAreas, getSlots, updateArea, deleteArea, addArea, updateSlot };