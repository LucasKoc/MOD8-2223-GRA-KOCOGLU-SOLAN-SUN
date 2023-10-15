import express from 'express'
import room from '../../persistence/room-repository.js'
import validator from '../../validators/room-validator.js'

const router = express.Router()

router.get('/rooms', async (req, res) => {

    res.status(200).json(await room.findRooms())}
)

router.get('/rooms/:roomId', async (req, res) => {
    res.status(200).json(await room.findRoom(req.params.roomId)) }
)

router.post('/rooms', async (req, res) => { res.status(201).json(await room.addRoom(req.body)) })

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

router.get('/rooms/:roomId/reservations', async (req, res) => { res.status(200).json(await room.findReservations(req.params.roomId)) })

router.post('/rooms/:roomId/reservations', async (req, res) => { res.status(201).json(await room.createReservation(req.body)) })

router.get('/rooms/user/reservations/:userId', async (req, res) => { res.status(200).json(await room.findUserRoomReservations(req.params.userId)) })

router.delete('/rooms/user/reservations/:userId', async (req, res,next) => {
    // TODO : Assert Validator
        /*const userId = Number.parseInt(req.params.userId)
        const err = validator.validateDeleteUserRoomReservation(userId)
        if (err) {
        res.status(400).json({error: err});
        return next(err)
        }*/
        const del = await room.deleteUserRoomReservations(req.params.userId);
        if (del) {
            res.status(202).json({message: 'All room reservations have been successfully deleted'})
        } else {
            // Not an error, user have no reservations
            res.status(202).json({error: 'Room reservations associated with this id do not exist or could not be deleted.'});
        }
    }
)

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