import express from 'express'
import room from '../../persistence/room-repository.js'

const router = express.Router()

router.get('/rooms', async (req, res) => res.status(200).json(await room.findRooms()))

router.get('/rooms/:id', async (req, res) => { res.status(200).json(await room.findRoom(req.params.id)) })

router.post('/rooms', async (req, res) => { res.status(201).json(await room.addRoom(req.body)) })

router.delete('/rooms/:id', async (req, res) => { res.status(200).json(await room.deleteRoom(req.params.id)) })

router.get('/rooms/:id/reservations', async (req, res) => { res.status(200).json(await room.findReservations(req.params.id)) })

router.post('/rooms/:id/reservations', async (req, res) => { res.status(201).json(await room.createReservation(req.body)) })

export default router