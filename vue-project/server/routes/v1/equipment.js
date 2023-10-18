import express from 'express'
import equipment from '../../persistence/equipment-repository.js'
import validator from "../../validators/equipment-validator.js";





const router = express.Router()

router.get('/equipments', async (req, res) => {
    res.status(200).json(await equipment.findEquipments())
})

router.get('/equipments/:equipId', async (req, res,next) => {
    const equipID = Number.parseInt(req.params.equipId)
    const err = validator.validateFindEquipment(equipID)
    if (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
    const find = await equipment.findEquipment(req.params.equipId)
        if (find) {
        res.status(200).json(await equipment.findEquipment(req.params.equipId))
    }
    else{
        res.status(404).json({message: 'equipment does not exist.'});
    }
})
router.post('/equipments', async(req,res,next)=>{
    const equipName = req.body.name
    const equipCategory = req.body.category
    const err = validator.validateCreateEquipments(equipName,equipCategory)
    if (err) {
        res.status(400).json({error: err});
        return next(err)
    }
    const create = await equipment.addEquipment(req.body)
    console.log(create)
    if (create) {
        res.status(201).json({message: 'equipment is created.'});
    } else {
        res.status(404).json({error: 'equipment could not be created.'});

    }

})
router.delete('/equipments/:equipId', async (req, res,next) => {


    const EquipId = Number.parseInt(req.params.equipId)
    const err = validator.validateDeleteEquipment(EquipId)
    if (err) {
        res.status(400).json({error: err});
        return next(err)
    }
    const del = await equipment.deleteEquipment(req.params.equipId);
    if (del) {
        res.status(202).json({message: 'Equipment has been successfully deleted.'});
    } else {
        res.status(404).json({error: 'Equipment does not exist or could not be deleted.'});
    }

})

router.patch('/equipments/:equipId/reservation', async (req, res,next) => {
    const EquipId = Number.parseInt(req.params.equipId)
    const equipTime = req.body.time
    const equipUserId = req.body.userId

    const EquipIdErr = await validator.validateFindEquipment(EquipId)
    if (EquipIdErr) {
        res.status(400).json({error: EquipIdErr});
        return next(EquipIdErr)
    }

    const userIdError = await  validator.validateUserID(equipUserId);

    if (userIdError) {
        res.status(400).json({ error: userIdError.message });
        return next(userIdError);
    }

    const errInfo = validator.validateModifyEquipments(equipTime)
    if (errInfo) {
        res.status(400).json({error: errInfo});
        return next(errInfo)
    }
    const modify = await equipment.setreservation(req.params.equipId, req.body.time, req.body.userId)
    console.log(modify)
    if (!modify) {
        res.status(202).json({message: 'equipment is modified.'});
    } else {
        res.status(404).json({error: 'equipment could not be modified.'});

    }

    // res.status(202).json(await equipment.setreservation(req.params.equipId, req.body.time, req.body.userId))
})

router.get('/equipments/:equipId/reservation', async (req, res) => { res.status(200).json(await equipment.getreservation(req.body)) })

router.get('/equipments/user/reservation/:userId', async (req, res) => { res.status(200).json(await equipment.findUserEquipmentsReservations(req.params.userId)) })
router.patch('/equipments/user/reservation/:userId', async (req, res) => {
    const del = await equipment.deleteUserEquipmentsReservations(req.params.userId);
    if (del) {
        res.status(202).json({message: 'All equipment reservations have been successfully deleted'})
    }
    else {
        // Not an error, user have no reservations
        res.status(202).json({message: 'Equipment reservations associated with this id  do not exist or could not be deleted.'});
    }
})

export default router