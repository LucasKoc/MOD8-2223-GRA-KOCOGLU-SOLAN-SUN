import express from 'express'
import equipment from '../../persistence/equipment-repository.js'



const router = express.Router()

router.get('/equipments', async (req, res) => {res.status(200).json(await equipment.findEquipments()) })
router.get('/equipments/:id', async (req, res) => {res.status(200).json(await equipment.findEquipment(req.params.id)) })
router.post('/equipments', async(req,res)=>{res.status(201).json(await equipment.addEquipment(req.body)) })
router.delete('/equipments/:id', async (req, res) => { res.status(200).json(await equipment.deleteEquipment(req.params.id)) })

router.patch('/equipments/:id/reservation', async (req, res) => { res.status(202).json(await equipment.setreservation(req.params.id, req.body.time, req.body.user_id)) })

router.get('/equipments/:id/reservation', async (req, res) => { res.status(200).json(await equipment.getreservation(req.body)) })


export default router