import express from 'express'
import user from '../../persistence/users-repository.js'



const router = express.Router()

router.get('/users', async (req, res   ) => {res.status(200).json(await user.findUsers()) })
router.get('/users/:id', async (req, res) => {res.status(200).json(await user.findUser(req.params.id)) })
router.post('/users', async(req,res)=>{res.status(201).json(await user.addUser(req.body)) })
router.delete('/users/:id', async (req, res) => { res.status(200).json(await user.deleteUser(req.params.id)) })
router.patch('/users/:id/reservations', async (req, res) => { res.status(201).json(await user.modifyUser(req.body)) })


export default router