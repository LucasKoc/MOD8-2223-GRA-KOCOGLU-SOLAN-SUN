import express from 'express'
import room from '../../persistence/room-repository.js'
import validator from '../../validators/room-validator.js'

const router = express.Router()

router.get('/rooms', async (req, res) => {

    res.status(200).json(await room.findRooms())}
)

router.get('/rooms/:roomId', async (req, res,next) => {
    const roomID = Number.parseInt(req.params.roomId)
    const err = validator.validateFindRoom(roomID)
    if (err) {
      res.status(400).json({ error: err })
      return next(err)
    }
    const find = await room.findRoom(req.params.roomId)
    if (find) {
        res.status(200).json(await room.findRoom(req.params.roomId))
    }
    else{
        res.status(404).json({message: 'Room does not exist.'});
    }
})

router.post('/rooms', async (req, res,next  ) => {
    const name = req.body.roomname
    const description = req.body.roomtype
    const err = validator.validateCreateRoom(name,description)
    if (err) {
        res.status(400).json({error: err});
        return next(err)
    }
    const create = await room.addRoom(req.body)
    if (create) {
        res.status(201).json({message: 'Room is created.'});
    } else {
        res.status(404).json({error: 'Room could not be created.'});

    }
})

router.delete('/rooms/:roomId', async (req, res,next) => {


        const roomId = Number.parseInt(req.params.roomId)
        const err = validator.validateDeleteRoom(roomId)
        if (err) {
            res.status(400).json({error: err});
            return next(err)
        }
        const del = await room.deleteRoom(req.params.roomId);
        if (del) {
            res.status(202).json({message: 'Room has been successfully deleted.'});
        } else {
            res.status(404).json({error: 'Room does not exist or could not be deleted.'});
        }
    }
)

router.get('/rooms/:roomId/reservations', async (req, res,next) => {

    const roomId = Number.parseInt(req.params.roomId)
    const err = validator.validateFindRoomReservation(roomId)
    if (err) {
        res.status(400).json({error: err});
        return next(err)
    }
    const findReservations = await room.findReservations(req.params.roomId)
    if (findReservations && findReservations.length > 0){
        res.status(200).json(await room.findReservations(req.params.roomId))
    }
    else{
        res.status(404).json({message: 'Reservation does not exist.'});
    }

})

router.post('/rooms/reservations', async (req, res,next) => {
    const identity = req.body.roomId
    const date = req.body.date
    const time = req.body.time
    const userId = req.body.userId

    const userIdError = await validator.validateUserID(userId);
    const RoomIDError = await validator.validateRoomId(identity);
    if (RoomIDError) {
        res.status(400).json({ error: RoomIDError.message });
        return next(RoomIDError);
    }

    if (userIdError) {
        res.status(400).json({ error: userIdError.message });
        return next(userIdError);
    }
    const err = validator.validateCreateRoomReservation(date,time)
    if (err) {
        res.status(400).json({error: err});
        return next(err)
    }

    const create =(await room.createReservation(req.body))
    if (create) {
        res.status(201).json({message: 'Reservation is created.'})
    } else {
        res.status(404).json({error: 'Reservation could not be created.'});

    }

})


router.get('/rooms/user/reservations/:userId', async (req, res,next) => {

    const userId = Number.parseInt(req.params.userId)
    const err = validator.validateFindUserRoomReservation(userId)
    if (err) {
        res.status(400).json({error: err});
        return next(err)
    }
    const findReservations = await room.findUserRoomReservations(req.params.userId)
    if (findReservations && findReservations.length > 0){
        res.status(200).json(await room.findUserRoomReservations(req.params.userId))
    }
    else{
        res.status(404).json({message: 'Reservation does not exist.'});
    }
})
// res.status(200).json(await room.findUserRoomReservations(req.params.userId))

router.delete('/rooms/:roomId/reservations/:resId', async (req, res,next) => {
        const resId = Number.parseInt(req.params.resId)
        const err = validator.validateDeleteRoomReservation(resId)
        if (err) {
        res.status(400).json({error: err});
        return next(err)
        }
        const del = await room.deleteReservation(req.params.resId, req.params.roomId);
        if (del) {
            res.status(202).json({message: 'Reservation has been successfully deleted'})
        } else {
            res.status(404).json({error: 'Reservation does not exist or could not be deleted.'});
        }
    }
)
export default router