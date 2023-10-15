import express from 'express'
import room from '../../persistence/room-repository.js'
import validator from '../../validators/room-validator.js'

const router = express.Router()

router.get('/rooms', async (req, res) => {

    res.status(200).json(await room.findRooms())}
)

router.get('/rooms/:id', async (req, res) => {
    res.status(200).json(await room.findRoom(req.params.id)) }
)

router.post('/rooms', async (req, res) => { res.status(201).json(await room.addRoom(req.body)) })

router.delete('/rooms/:id', async (req, res,next) => {


        const id = Number.parseInt(req.params.id)
        const err = validator.validateDeleteRoom(id)
        if (err) {
            res.status(400).json({error: err});
            return next(err)
        }
        const del = await room.deleteRoom(req.params.id);
        if (del) {
            res.status(202).json({message: 'Room has been successfully deleted.'});
        } else {
            res.status(404).json({error: 'Room does not exist or could not be deleted.'});
        }


    }

)


router.get('/rooms/:id/reservations', async (req, res) => { res.status(200).json(await room.findReservations(req.params.id)) })

router.post('/rooms/:id/reservations', async (req, res) => { res.status(201).json(await room.createReservation(req.body)) })

router.delete('/rooms/:id/reservations/', async (req, res) => { res.status(202).json(await room.deleteReservation(req.params.id)) })

router.get('/rooms/user/reservations/:userId', async (req, res) => { res.status(200).json(await room.findUserRoomReservations(req.params.userId)) })

export default router