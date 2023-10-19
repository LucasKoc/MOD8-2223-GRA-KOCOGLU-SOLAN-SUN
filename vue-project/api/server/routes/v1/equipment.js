import express from 'express'
import equipment from '../../persistence/equipment-repository.js'
import validator from "../../validators/equipment-validator.js";
import room from "../../persistence/room-repository.js";

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

    const UserBannedError = await validator.validateUserNotBanned(equipUserId);
    if (UserBannedError) {
        res.status(400).json({ error: UserBannedError.message });
        return next(UserBannedError);
    }

    const errInfo = validator.validateModifyEquipments(equipTime)
    if (errInfo) {
        res.status(400).json({error: errInfo});
        return next(errInfo)
    }
    const modify = await equipment.setreservation(req.params.equipId, req.body.time, req.body.userId)
    if (!modify) {
        res.status(202).json({message: 'equipment is modified.'});
    } else {
        res.status(404).json({error: 'equipment could not be modified.'});

    }
})

router.get('/equipments/:equipId/reservation', async (req, res,next) => {
    const equipID = Number.parseInt(req.params.equipId)
    const err = validator.validateFindEquipmentReservation(equipID)
    if (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
    const find = await equipment.getreservation(req.params.equipId)
    if (find && find.length > 0) {
        res.status(200).json(await equipment.getreservation(req.params.equipId))
    }
    else{
        res.status(404).json({message: 'reservation does not exist.'});
    }
    // res.status(200).json(await equipment.getreservation(req.body))
})

router.get('/equipments/user/reservation/:userId', async (req, res,next) => {
    const userId = Number.parseInt(req.params.userId)
    const err = validator.validateFindUserEquipmentsReservation(userId)
    if (err) {
        res.status(400).json({error: err});
        return next(err)
    }
    const findReservations = await equipment.findUserEquipmentsReservations(req.params.userId)
    if (findReservations && findReservations.length > 0)
        res.status(200).json(await equipment.findUserEquipmentsReservations(req.params.userId))
    else if (findReservations.length <= 0 && req.headers['x-origin-url'] === "/reservation")
        res.status(202).json({message: 'Reservation does not exist.'});
    else res.status(404).json({error: 'Reservation does not exist.'});
})

// res.status(200).json(await equipment.findUserEquipmentsReservations(req.params.userId))
router.patch('/equipments/user/reservation/:userId', async (req, res,next) => {
    const userId = Number.parseInt(req.params.userId)
    const err = validator.validateDeleteUserEquipmentsReservation(userId)
    if (err) {
        res.status(400).json({error: err});
        return next(err)
    }
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